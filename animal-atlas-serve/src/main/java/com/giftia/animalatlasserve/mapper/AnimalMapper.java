package com.giftia.animalatlasserve.mapper;

import com.giftia.animalatlasserve.domain.Animal;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author asus
* @description 针对表【animal】的数据库操作Mapper
* @createDate 2023-01-24 05:48:59
* @Entity com.giftia.animalatlasserve.domain.Animal
*/
@Mapper
public interface AnimalMapper extends BaseMapper<Animal> {
    public Animal getOneRandom(Integer random);

    public List<Animal> getRemains(List<Long> list,Integer num);

    public Integer count();

}




