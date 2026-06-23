package com.giftia.animalatlasserve.util;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import jakarta.validation.constraints.NotNull;
import okhttp3.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class EasyDLUtil {

    private static String api_key = "<REDACTED_API_KEY>";
    private static String secret_key = "<REDACTED_SECRET_KEY>";
    public static String access_token;

    private static RestTemplate restTemplate = new RestTemplate();

    private static OkHttpClient client = new OkHttpClient();


    public static void getAccessToken() {
        String tokenUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + api_key + "&client_secret=" + secret_key;
        Map response = restTemplate.postForObject(tokenUrl, null, Map.class);
        EasyDLUtil.access_token = response.get("access_token").toString();
        client.dispatcher().setMaxRequestsPerHost(100);
        client.dispatcher().setMaxRequests(100);
    }

    public static void datasetAdd(String imgUrl, String label, String datasetId) {
        String base64 = Base64Util.GetImageStrFromUrl(imgUrl);
        String filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);

        Map<String, String> labelMap = new HashMap<>();
        labelMap.put("label_name", label);
        ArrayList<Map<String, String>> labels = new ArrayList<>();
        labels.add(labelMap);

        Map<String, Object> params = new HashMap<>();
        params.put("type", "IMAGE_CLASSIFICATION");
        params.put("dataset_id", datasetId);
        params.put("entity_content", base64);
        params.put("entity_name", filename);
        params.put("labels", labels);

        String url = "https://aip.baidubce.com/rpc/2.0/easydl/dataset/addentity?access_token=" + EasyDLUtil.access_token;

        restTemplate.postForEntity(url, params, Map.class);

    }

    public static String createDataset() {
        String url = "https://aip.baidubce.com/rpc/2.0/easydl/dataset/create?access_token=" + EasyDLUtil.access_token;
        Map<String, Object> params = new HashMap<>();

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String datasetName = formatter.format(date);
        params.put("dataset_name", datasetName);
        params.put("type", "IMAGE_CLASSIFICATION");

        Map response = restTemplate.postForObject(url, params, Map.class);

        return response.get("dataset_id").toString();
    }

    public static Object animalSpices(MultipartFile file, String imgUrl) throws IOException {
        String requestUrl = "https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=" + EasyDLUtil.access_token;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("content-type", "application/x-www-form-urlencoded");
        MultiValueMap<String, Object> params = new LinkedMultiValueMap();
        params.add("url", imgUrl);
        params.add("top_num", 5);
        params.add("baike_num", 5);
        HttpEntity<MultiValueMap> httpEntity = new HttpEntity<>(params, httpHeaders);

        JSONObject response = restTemplate.postForObject(requestUrl, httpEntity, JSONObject.class);
        return response.get("result");
    }

    public static Object animalIdentification(MultipartFile file, String imgUrl) throws IOException {
        String requestUrl = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/animal-atlas-release?input_type=url&access_token=" + EasyDLUtil.access_token;
        Map<String, Object> params = new HashMap<>();
        params.put("url", imgUrl);
        params.put("top_num", 5);
        JSONObject response = restTemplate.postForObject(requestUrl, params, JSONObject.class);
        return response.get("results");
    }

    public static JSONObject identificationMerge(MultipartFile file) throws IOException {
        EasyDLUtil.getAccessToken();
        String imgUrl = QiNiuUtil.saveImage(file, "identification");
        imgUrl = "http://cdn.giftia.cn" + imgUrl;
        EasyDLUtil.animalSpices(file, imgUrl);
        Object spices = EasyDLUtil.animalSpices(file, imgUrl);
        Object identification = EasyDLUtil.animalIdentification(file, imgUrl);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("identification", identification);
        jsonObject.put("spices", spices);
        return jsonObject;
    }
}
