package com.giftia.animalatlasserve.controller;

import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.util.QiNiuUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/common")
public class CommonController {

    @PostMapping("/uploadImg/{folder}")
    public Result<String> upload(MultipartFile file,@PathVariable String folder) throws IOException {
        String url = QiNiuUtil.saveImage(file, folder);
        return Result.success("上传成功",url);
    }
}
