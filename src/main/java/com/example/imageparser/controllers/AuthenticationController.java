package com.example.imageparser.controllers;

import com.example.imageparser.configuration.JWTGenerator;
import com.example.imageparser.models.CustomUser;
import com.example.imageparser.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegisterPage() {
        return "registerPage";
    }


    @PostMapping("/registerUser")
    public String registerUser(@ModelAttribute CustomUser user, Model model) {

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return "redirect:/register?error=passwordMismatch";
        }

        try {
            authenticationService.registerUser(user);
        } catch (DataIntegrityViolationException e) {
            // Повернення на сторінку реєстрації з помилкою про існуючий email
            model.addAttribute("error", "emailExists");
            return "redirect:/register";
        }

        return "redirect:/login";
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<String> checkEmail(@RequestParam String email) {
        // Перевірка, чи існує електронна адреса в базі даних
        if (authenticationService.findByEmail(email) != null) {
            // Якщо існує, повернути відповідь "exists"
            return ResponseEntity.ok("exists");
        } else {
            // Якщо не існує, повернути відповідь "not exists"
            return ResponseEntity.ok("not exists");
        }
    }
}
