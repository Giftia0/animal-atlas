package com.giftia.animalatlasserve.common;

import com.giftia.animalatlasserve.domain.AnimalImg;
import com.giftia.animalatlasserve.service.AnimalImgService;
import com.giftia.animalatlasserve.util.EasyDLUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class Task
{
    @Autowired
    AnimalImgService animalImgService;

    @Scheduled(cron="0 0 4 ? * SAT")   //每周六凌晨4点
    public void execute(){
        EasyDLUtil.getAccessToken();
        String datasetId = EasyDLUtil.createDataset();

        List<AnimalImg> imgList = animalImgService.list();
        imgList.forEach(img -> {
            String label = String.valueOf(img.getAnimalId());
            String url = "http://cdn.giftia.cn" + img.getUrl();
            System.out.println(url);
            EasyDLUtil.datasetAdd(url, label, datasetId);
        });
    }
}
