package com.example.imageparser.controllers;

import com.example.imageparser.service.SortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SortController {

    @GetMapping("/sort")
    public String mergeSort() {
        // Перевірка чи користувач аутентифікований
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            // Якщо користувач аутентифікований, відобразити сторінку /sort
            return "sortTemplates/sortTemplate";
        } else {
            // Якщо користувач не аутентифікований, перенаправити на сторінку авторизації або виконати інші дії
            return "redirect:/login"; // Наприклад, перенаправлення на сторінку входу
        }
    }


}


//TODO
//Зробити так щоб коли вже токен був збережений в куках, то щоб ендпоінт /login перенаправляв зарзу на контент