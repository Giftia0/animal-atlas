package com.giftia.animalatlasserve.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.giftia.animalatlasserve.domain.User;
import com.giftia.animalatlasserve.service.UserService;
import com.giftia.animalatlasserve.mapper.UserMapper;
import com.giftia.animalatlasserve.util.UniSmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author asus
 * @description 针对表【user】的数据库操作Service实现
 * @createDate 2023-01-17 15:43:23
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public boolean sendCode(String phone) {
        if (redisTemplate.opsForValue().get(phone) != null) {
            return false;
        }
        String code = RandomStringUtils.randomNumeric(6);
        redisTemplate.opsForValue().set(phone, code, 600, TimeUnit.SECONDS);
        UniSmsUtil.sendCheckCode(phone, code);
        return true;
    }

    @Override
    public boolean verifyCode(String phone, String code) {
        Object object = redisTemplate.opsForValue().getAndDelete(phone);
        if (object == null || !code.equals(object.toString())) {
            return false;
        }
        return true;
    }


}




