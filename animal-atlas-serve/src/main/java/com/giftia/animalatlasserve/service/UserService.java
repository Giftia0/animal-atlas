package com.giftia.animalatlasserve.service;

import com.giftia.animalatlasserve.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author asus
* @description 针对表【user】的数据库操作Service
* @createDate 2023-01-17 15:43:23
*/
public interface UserService extends IService<User> {
    public boolean sendCode(String phone);
    public boolean verifyCode(String phone, String code);
}
