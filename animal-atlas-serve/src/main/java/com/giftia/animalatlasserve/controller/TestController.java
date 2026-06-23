package com.giftia.animalatlasserve.controller;

import com.giftia.animalatlasserve.common.Auth;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Auth({"123","456"})
    @GetMapping("/get")
    public void testGet(){
        System.out.println("get");
    }
}
