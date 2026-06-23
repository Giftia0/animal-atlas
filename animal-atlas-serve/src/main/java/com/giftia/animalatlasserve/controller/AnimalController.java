package com.giftia.animalatlasserve.controller;

import com.alibaba.fastjson2.JSONObject;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.giftia.animalatlasserve.common.Auth;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.common.TokenThreadLocal;
import com.giftia.animalatlasserve.domain.Animal;
import com.giftia.animalatlasserve.domain.AnimalImg;
import com.giftia.animalatlasserve.domain.LikeRecord;
import com.giftia.animalatlasserve.mapper.AnimalMapper;
import com.giftia.animalatlasserve.service.AnimalImgService;
import com.giftia.animalatlasserve.service.AnimalService;
import com.giftia.animalatlasserve.service.LikeRecordService;
import com.giftia.animalatlasserve.util.JWTUtil;
import com.giftia.animalatlasserve.util.QiNiuUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/animal")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private AnimalImgService animalImgService;

    @Autowired
    private LikeRecordService likeRecordService;

    @PostMapping("/getAnimalRandom/{num}")
    public Result<List<Animal>> getAnimalInfoByRandom(@RequestBody List<Long> list, @PathVariable Integer num) {
        List<Animal> randomData = animalService.getRandomData(list, num);
        return Result.success("获取数据成功", randomData);
    }

    @GetMapping("/getAnimalInfo/{id}")
    public Result<Animal> getAnimalInfo(@PathVariable Long id) {
        Animal animal = animalService.getById(id);
        return Result.success("获取信息成功", animal);
    }

    @PostMapping("/changeLike/{userId}/{animalId}")
    public Result<Boolean> changeLike(@PathVariable Long userId, @PathVariable Long animalId) {
        LambdaQueryWrapper<LikeRecord> lqw = new LambdaQueryWrapper<>();
        lqw.eq(LikeRecord::getAnimalId, animalId).eq(LikeRecord::getUserId, userId);
        LikeRecord one = likeRecordService.getOne(lqw);
        if (one != null) {
            animalService.decreaseLikeNum(userId, animalId);
            return Result.success("取消点赞", false);
        }
        animalService.increaseLikeNum(userId, animalId);
        return Result.success("点赞成功", true);
    }

    @GetMapping("/getLikeStatus/{userId}/{animalId}")
    public Result<Boolean> getLikeStatus(@PathVariable Long userId, @PathVariable Long animalId) {
        LambdaQueryWrapper<LikeRecord> lqw = new LambdaQueryWrapper<>();
        lqw.eq(LikeRecord::getAnimalId, animalId).eq(LikeRecord::getUserId, userId);
        LikeRecord one = likeRecordService.getOne(lqw);
        if (one != null) return Result.success("已点赞", true);
        return Result.success("未点赞", false);
    }

    @Auth("admin")
    @PutMapping("/updateAnimal")
    public Result updateAnimal(@RequestBody Animal animal) {
        animalService.updateById(animal);
        return Result.success("更新成功");
    }

    @GetMapping("/getAnimalPhoto/{id}")
    public Result updateAnimal(@PathVariable Long id) {
        LambdaQueryWrapper<AnimalImg> lqw = new LambdaQueryWrapper<>();
        lqw.orderByDesc(AnimalImg::getCreateTime);
        lqw.eq(AnimalImg::getAnimalId, id);
        List<AnimalImg> list = animalImgService.list(lqw);
        System.out.println(list);
        List<List<AnimalImg>> orderList = new ArrayList<>();
        List<AnimalImg> tempList = new ArrayList<>();

        Calendar lastCalendar = null;
        for (AnimalImg item : list) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(item.getCreateTime());
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            item.setCreateTime(new Date(item.getCreateTime().getTime() + 1000 * 60 * 60 * 8));

            if (lastCalendar == null || calendar.equals(lastCalendar)) {
                System.out.println("last:" + lastCalendar + "  " + "now:" + calendar);
                tempList.add(item);
                lastCalendar = calendar;
                System.out.println(tempList);
            } else {
                orderList.add(new ArrayList<>(tempList));
                tempList.clear();
                tempList.add(item);
                lastCalendar = null;
            }
        }
        if (!tempList.isEmpty()) orderList.add(tempList);
        System.out.println(orderList);
        LambdaQueryWrapper<AnimalImg> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(AnimalImg::getAnimalId, id);
        String count = String.valueOf(animalImgService.count(lambdaQueryWrapper));
        return Result.success(count, orderList);
    }

    @Auth("admin")
    @PostMapping("/uploadImg/{id}")
    public Result<String> upload(MultipartFile file, @PathVariable Long id) throws IOException {
        System.out.println(TokenThreadLocal.get());
        String token = TokenThreadLocal.get();
        Long userId = null;
        String username = null;
        if (token != null) {
            DecodedJWT jwt = JWTUtil.verifyToken(token);
            System.out.println(jwt);
            userId = Long.valueOf(jwt.getClaim("id").asString());
            username = jwt.getClaim("username").asString();
        }
        String url = QiNiuUtil.saveImage(file, "animal");
        AnimalImg animalImg = new AnimalImg();
        animalImg.setAnimalId(id);
        animalImg.setCreateUser(userId);
        animalImg.setCreateName(username);
        animalImg.setUrl(url);
        animalImgService.save(animalImg);
        Animal animal = animalService.getById(id);
        if(animal.getImg() == null) {
            animal.setImg(url);
            animalService.updateById(animal);
        }
        return Result.success("上传成功", url);
    }

    @Auth("admin")
    @DeleteMapping("/deleteAnimalImg/{id}")
    public Result deleteAnimalImg(@PathVariable Long id) throws IOException {
        animalImgService.removeById(id);
        return Result.success("删除成功");
    }

    @PostMapping("/addAnimal")
    public Result<Long> addAnimal(@RequestBody Animal animal) {
        animalService.save(animal);
        return Result.success("新增成功", animal.getId());
    }

    @DeleteMapping("/deleteAnimal/{id}")
    public Result deleteAnimal(@PathVariable Long id){
        animalService.removeById(id);
        return Result.success("删除成功");
    }


}
