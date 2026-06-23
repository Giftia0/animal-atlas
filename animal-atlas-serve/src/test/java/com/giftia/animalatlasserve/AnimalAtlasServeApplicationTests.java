package com.giftia.animalatlasserve;

import com.alibaba.fastjson2.JSONObject;
import com.giftia.animalatlasserve.domain.Animal;
import com.giftia.animalatlasserve.domain.AnimalImg;
import com.giftia.animalatlasserve.mapper.AnimalMapper;
import com.giftia.animalatlasserve.mapper.UserMapper;
import com.giftia.animalatlasserve.service.AnimalImgService;
import com.giftia.animalatlasserve.service.AnimalService;
import com.giftia.animalatlasserve.util.Base64Util;
import com.giftia.animalatlasserve.util.EasyDLUtil;
import com.giftia.animalatlasserve.util.FileUtil;
import com.giftia.animalatlasserve.util.UniSmsUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class AnimalAtlasServeApplicationTests {

    @Autowired
    UserMapper userMapper;

    @Autowired
    AnimalService animalService;

    @Autowired
    AnimalImgService animalImgService;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    AnimalMapper animalMapper;

    @Test
    void contextLoads() {
    }

    @Test
    void sendCode() {
//        UniSmsUtil uniSmsUtil = new UniSmsUtil();
//        uniSmsUtil.sendCheckCode("<REDACTED_PHONE>","1234");
    }

    @Test
    void userMapperTest() {
//        userMapper.selectCount();
        System.out.println(userMapper);
    }

    @Test
    void redisTest() {
        redisTemplate.opsForValue().set("<REDACTED_PHONE>", "123456");
        System.out.println(redisTemplate.opsForValue().get("<REDACTED_PHONE>"));
//        redisTemplate.
    }

    @Test
    void getDataRandom() {
        //        animalService.getRandomData(new Integer[]{1, 5, 7,8,9,10},5);
        List list = new ArrayList<>();
        list.add(new Long(1));
        Long aLong = new Long(1);
        System.out.println(list.contains(aLong));
        System.out.println(animalMapper.count());
    }

    @Test
    void testLike() {
//        Animal animal = new Animal();
//        animal.setId(22L);
//        animal.setLikeNum(999);
//        animalService.updateById(animal);
        animalService.increaseLikeNum(1L, 5L);
    }

    @Test
    void upload() throws IOException {
//        File tempFile = File.createTempFile("http://cdn.giftia.cn/animal/test.jpg", ".jpg");
//        System.out.println(tempFile);
        try {
            String destUrl = "http://cdn.giftia.cn/animal/test.jpg";
            HttpURLConnection httpUrl = (HttpURLConnection) new URL(destUrl).openConnection();
            httpUrl.connect();
            File file = FileUtil.inputStreamToFile(httpUrl.getInputStream(), "url.png");
            System.out.println("111====>>>>" + file.getPath());
            httpUrl.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    void easydlTest() throws FileNotFoundException, MalformedURLException {
        RestTemplate restTemplate = new RestTemplate();
        String tokenUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=X6GO2thy1yzAFVdlBqwA6ojP&client_secret=c62nqSrYqSg1c86dPSy7zsfrUFhGShc5";
        ResponseEntity<JSONObject> response = restTemplate.postForEntity(tokenUrl, null, JSONObject.class);
        String access_token = String.valueOf(response.getBody().get("access_token"));
//        System.out.println(access_token);
        String url = "https://aip.baidubce.com/rpc/2.0/easydl/dataset/addentity?access_token=" + access_token;
        System.out.println(url);
        Map<String, Object> map = new HashMap<>();
        map.put("type", "IMAGE_CLASSIFICATION");
        map.put("dataset_id", "1812594");

        String base64 = Base64Util.GetImageStrFromUrl("http://cdn.giftia.cn/animal/e16b1540c49e4916a4f3f<REDACTED_PHONE>.jpg");
//        System.out.println(base64);
        map.put("entity_content", base64);
        map.put("entity_name", "66666666.jpg");
        Map<String, String> labelMap = new HashMap<>();
        labelMap.put("label_name", "test");
        ArrayList<Map<String, String>> labels = new ArrayList<>();
        labels.add(labelMap);
        map.put("labels", labels);
        System.out.println(map);
        ResponseEntity<JSONObject> entity = restTemplate.postForEntity(url, map, JSONObject.class);
        System.out.println(entity);
    }

    @Test
    void testEasyDL() throws MalformedURLException {
        EasyDLUtil.getAccessToken();
//        System.out.println(EasyDLUtil.access_token);
        String datasetId = EasyDLUtil.createDataset();
//        EasyDLUtil.datasetAdd("http://cdn.giftia.cn/animal/e16b1540c49e4916a4f3f<REDACTED_PHONE>.jpg","hello",datasetId);
//
        List<AnimalImg> imgList = animalImgService.list();
        imgList.forEach(img -> {
            String label = String.valueOf(img.getAnimalId());
            String url = "http://cdn.giftia.cn" + img.getUrl();
            System.out.println(url);
            EasyDLUtil.datasetAdd(url, label, datasetId);
        });
    }
}
