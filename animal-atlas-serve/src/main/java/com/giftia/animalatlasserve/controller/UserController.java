package com.giftia.animalatlasserve.controller;

import com.alibaba.fastjson2.JSONObject;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.giftia.animalatlasserve.common.Reg;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.common.TokenThreadLocal;
import com.giftia.animalatlasserve.domain.User;
import com.giftia.animalatlasserve.service.UserService;
import com.giftia.animalatlasserve.util.JWTUtil;
import com.giftia.animalatlasserve.util.QiNiuUtil;
import jakarta.validation.constraints.Pattern;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/updateUserInfo")
    public Result<User> updateUserInfo(@RequestBody User user){
        userService.updateById(user);
        return Result.success("");
    }

    @PostMapping("/updateAvatar")
    public Result<User> updateUserInfo(MultipartFile file) throws IOException {
        String token = TokenThreadLocal.get();
        Long userId = null;
        if (token != null) {
            DecodedJWT jwt = JWTUtil.verifyToken(token);
            System.out.println(jwt);
            userId = Long.valueOf(jwt.getClaim("id").asString());
        }
        String avatar = QiNiuUtil.saveImage(file, "avatar");
        System.out.println(userId);
        User user = userService.getById(userId);
        user.setAvatar(avatar);
        userService.updateById(user);
        return Result.success("头像修改成功",user);
    }

    @GetMapping("/getUserInfo")
    public Result<User> getUserInfo() {
        String token = TokenThreadLocal.get();
        Long userId = null;
        if (token != null) {
            DecodedJWT jwt = JWTUtil.verifyToken(token);
            System.out.println(jwt);
            userId = Long.valueOf(jwt.getClaim("id").asString());
        }
        User user = userService.getById(userId);
        return Result.success("获取信息成功", user);
    }

    @GetMapping("/getCheckCode/{phone}")
    public Result getCheckCode(@PathVariable @Pattern(regexp = Reg.PHONE, message = "无效手机号") String phone) {
        boolean flag = userService.sendCode(phone);
        if (flag) {
            return Result.success("验证码已发送");
        }
        return Result.error("请稍后再试");
    }

    @PostMapping("/loginByCheckCode")
    public Result loginByCheckCode(@RequestBody JSONObject jsonObject) {
        String phone = jsonObject.get("phone").toString();
        String code = jsonObject.get("code").toString();
//        System.out.println("phone ==== >" + phone);
//        System.out.println("code ==== >" + code);
        //校验验证码
        if (!userService.verifyCode(phone, code))
            return Result.error("无效验证码");
        LambdaQueryWrapper<User> lqw = new LambdaQueryWrapper<>();
        lqw.eq(User::getPhone, phone);

        User user = userService.getOne(lqw);
        //该手机号未注册
        if (user == null) {
            //注册
            user = new User();
            user.setPhone(phone);
            user.setRole("user");
            String randomName;
            do {
                randomName = RandomStringUtils.randomAlphanumeric(12);
                lqw.clear();
                lqw.eq(User::getUsername, randomName);
            } while (userService.count(lqw) != 0);
            user.setUsername(randomName);
            userService.save(user);
        }
        //登录
        Map map = new HashMap<>();
        map.put("id", user.getId().toString());
        map.put("role", user.getRole());
        map.put("phone", user.getPhone());
        map.put("username", user.getUsername());
        map.put("avatar", user.getAvatar());
        String token = JWTUtil.getToken(map);
        return Result.success("登录成功", token);
    }
}
