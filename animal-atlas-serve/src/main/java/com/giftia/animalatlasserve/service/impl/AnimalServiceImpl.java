package com.giftia.animalatlasserve.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.giftia.animalatlasserve.domain.Animal;
import com.giftia.animalatlasserve.domain.LikeRecord;
import com.giftia.animalatlasserve.mapper.LikeRecordMapper;
import com.giftia.animalatlasserve.service.AnimalService;
import com.giftia.animalatlasserve.mapper.AnimalMapper;
import com.giftia.animalatlasserve.service.LikeRecordService;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author asus
 * @description 针对表【animal】的数据库操作Service实现
 * @createDate 2023-01-24 05:48:59
 */
@Service
public class AnimalServiceImpl extends ServiceImpl<AnimalMapper, Animal>
        implements AnimalService {

    @Autowired
    private AnimalMapper mapper;

    @Autowired
    private LikeRecordService likeRecordService;

    @Override
    public List<Animal> getRandomData(List<Long> dataList, Integer num) {
        List<Animal> list = new ArrayList<>();
        Integer total = mapper.count();

        //全部查询完了
        if (dataList.size() >= total)
            return null;

        if (dataList.size() + num >= total){
            List<Animal> remains = mapper.getRemains(dataList, total - dataList.size());
            list.addAll(remains);
            return list;
        }

        while (list.size() < num) {
            if (dataList.size() > total * 0.6) {

                List<Animal> remains = mapper.getRemains(dataList, num - list.size());
                list.addAll(remains);
                break;
            }
            //随机查一条
            Integer random = RandomUtils.nextInt(0,total);
            Animal animal = mapper.getOneRandom(random);

            if (!list.contains(animal) && !dataList.contains(animal.getId()))
                list.add(animal);
        }

        return list;
    }

    @Override
    @Transactional
    public void increaseLikeNum(Long userId, Long animalId){
        Animal animal = this.getById(animalId);
        animal.setLikeNum(animal.getLikeNum() + 1);
        this.updateById(animal);
        LikeRecord likeRecord = new LikeRecord();
        likeRecord.setUserId(userId);
        likeRecord.setAnimalId(animalId);
        likeRecordService.save(likeRecord);
    }

    @Override
    @Transactional
    public void decreaseLikeNum(Long userId, Long animalId){
        Animal animal = this.getById(animalId);
        animal.setLikeNum(animal.getLikeNum() - 1);
        this.updateById(animal);
        LambdaQueryWrapper<LikeRecord> lqw = new LambdaQueryWrapper<>();
        lqw.eq(LikeRecord::getAnimalId,animalId).eq(LikeRecord::getUserId,userId);
        likeRecordService.remove(lqw);
    }
}




