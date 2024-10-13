package com.example.imageparser.configuration;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTGenerator tokenGenerator;
    private final CustomUserDetails customUserDetailsService;

    @Autowired
    public JWTAuthenticationFilter(JWTGenerator tokenGenerator, CustomUserDetails customUserDetails) {
        this.tokenGenerator = tokenGenerator;
        this.customUserDetailsService = customUserDetails;
    }


    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Отримання поточного URI запиту
        String requestURI = request.getRequestURI();

        // Пропускаємо запити на загальнодоступні сторінки або статичні ресурси
        if (isPublicEndpoint(requestURI) || isStaticResource(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }



        // Отримання JWT токену з cookie
        String token = getJWTFromCookie(request);

        if (StringUtils.hasText(token) && tokenGenerator.validateToken(token)) {
            String username = tokenGenerator.getUsernameFromJWT(token);

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }

    // Метод для перевірки, чи є запит на статичний ресурс
    private boolean isStaticResource(String uri) {
        return uri.startsWith("/css/") || uri.startsWith("/js/") || uri.startsWith("/images/") ||
                uri.endsWith(".css") || uri.endsWith(".js") || uri.endsWith(".png") || uri.endsWith(".jpg");
    }

    // Метод для перевірки, чи є запит публічним ендпоінтом
    private boolean isPublicEndpoint(String uri) {
        return uri.equals("/login") || uri.equals("/register") || uri.equals("/authenticate");
    }

    public String getJWTFromCookie(HttpServletRequest request) {
        // Отримання cookie з запиту
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
