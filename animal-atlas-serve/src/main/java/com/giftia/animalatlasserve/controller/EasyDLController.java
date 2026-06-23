package com.giftia.animalatlasserve.controller;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.domain.Animal;
import com.giftia.animalatlasserve.service.AnimalService;
import com.giftia.animalatlasserve.util.EasyDLUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/easydl")
public class EasyDLController {

    @Autowired
    AnimalService animalService;

    @PostMapping("/animal")
    public Result<JSONObject> animalIdentification(MultipartFile file) throws IOException {
        JSONObject jsonObject = EasyDLUtil.identificationMerge(file);
        List identification = (List) jsonObject.get("identification");
        List spices = (List) jsonObject.get("spices");
        System.out.println(identification);
        List<Map<String, Object>> identificationResults = new ArrayList<>();
        identification.forEach(item -> {
            JSONObject temp = (JSONObject) JSON.toJSON(item);
            String name = temp.getString("name");
            String score = temp.getString("score");
            Animal animal = animalService.getById(name);
            Map<String, Object> map = new HashMap<>();
            map.put("animal", animal);
            map.put("score", score);
            identificationResults.add(map);
        });
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("identification", identificationResults);
        jsonObj.put("spices", spices);
        return Result.success("识别成功", jsonObj);
    }
}
