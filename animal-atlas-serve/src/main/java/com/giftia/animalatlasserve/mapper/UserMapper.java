package com.giftia.animalatlasserve.mapper;

import com.giftia.animalatlasserve.domain.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author asus
* @description 针对表【user】的数据库操作Mapper
* @createDate 2023-01-18 22:49:17
* @Entity com.giftia.animalatlasserve.domain.User
*/
@Mapper
public interface UserMapper extends BaseMapper<User> {

}




