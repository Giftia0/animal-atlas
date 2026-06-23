package com.giftia.animalatlasserve.util;


import com.alibaba.fastjson2.JSONObject;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public class QiNiuUtil {
    private static final Logger logger = LoggerFactory.getLogger(QiNiuUtil.class);

    // 设置好账号的ACCESS_KEY和SECRET_KEY
    static String ACCESS_KEY = "<REDACTED_ACCESS_KEY>";
    static String SECRET_KEY = "<REDACTED_SECRET_KEY>";

    // 要上传的空间（创建空间的名称）
    static String bucketName = "animal-atlas";

    // 密钥配置
    static Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);

    // 构造一个带指定Zone对象的配置类,不同的七云牛存储区域调用不同的zone
    static Configuration cfg = new Configuration(Region.huadong());
    // ...其他参数参考类注释
    static UploadManager uploadManager = new UploadManager(cfg);

    // 使用的是测试域名
    private static final String QINIU_IMAGE_DOMAIN = "cdn.giftia.cn";

    // 简单上传，使用默认策略，只需要设置上传的空间名就可以了
    public static String getUpToken() {
        return auth.uploadToken(bucketName);
    }

    public static String saveImage(MultipartFile file, String folder) throws IOException {
        try {
            System.out.println(folder);
            int dotPos = file.getOriginalFilename().lastIndexOf(".");
            if (dotPos < 0) {
                return null;
            }
            String fileExt = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
            // 判断是否是合法的文件后缀
            if (!FileUtil.isFileAllowed(fileExt)) {
                return null;
            }

            String fileName = folder + "/" + UUID.randomUUID().toString().replaceAll("-", "") + "." + fileExt;
            // 调用put方法上传
            Response res = uploadManager.put(file.getBytes(), fileName, getUpToken());
            // 打印返回的信息
            if (res.isOK() && res.isJson()) {
                // 返回这张存储照片的地址
                return "/" + JSONObject.parseObject(res.bodyString()).get("key");
            } else {
                logger.error("七牛异常:" + res.bodyString());
                return null;
            }
        } catch (QiniuException e) {
            // 请求失败时打印的异常的信息
            logger.error("七牛异常:" + e.getMessage());
            return null;
        }
    }

}

