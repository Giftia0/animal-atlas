package com.giftia.animalatlasserve.service;

import com.giftia.animalatlasserve.domain.Animal;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author asus
* @description 针对表【animal】的数据库操作Service
* @createDate 2023-01-24 05:48:59
*/
public interface AnimalService extends IService<Animal> {
    public List<Animal> getRandomData(List<Long> dataList, Integer num);

    public void increaseLikeNum(Long userId, Long animalId);

    public void decreaseLikeNum(Long userId, Long animalId);

}
