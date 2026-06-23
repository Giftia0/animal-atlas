package com.giftia.animalatlasserve.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.giftia.animalatlasserve.common.Auth;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.common.TokenThreadLocal;
import com.giftia.animalatlasserve.domain.*;
import com.giftia.animalatlasserve.mapper.InvitationImgMapper;
import com.giftia.animalatlasserve.service.InvitationImgService;
import com.giftia.animalatlasserve.service.InvitationService;
import com.giftia.animalatlasserve.service.UserService;
import com.giftia.animalatlasserve.util.JWTUtil;
import com.giftia.animalatlasserve.util.QiNiuUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/post")
public class InvitationController {

    @Autowired
    InvitationService invitationService;

    @Autowired
    InvitationImgService invitationImgService;
    @Autowired
    UserService userService;

    @Auth({"user", "admin"})
    @PostMapping("/addPost")
    public Result<Long> addPost(@RequestBody Invitation invitation) {
        String token = TokenThreadLocal.get();
        DecodedJWT jwt = JWTUtil.verifyToken(token);
        Long userId = Long.valueOf(jwt.getClaim("id").asString());
        System.out.println(userId);
        User user = userService.getById(userId);
        invitation.setUserId(user.getId());
        invitation.setUsername(user.getUsername());
        invitation.setUserAvatar(user.getAvatar());
        invitationService.save(invitation);
        return Result.success("发布成功", invitation.getId());
    }

    @Auth({"user", "admin"})
    @PostMapping("/uploadImg/{id}")
    public Result<String> upload(MultipartFile file, @PathVariable Long id, HttpServletRequest request) throws IOException {
        System.out.println(file);
        String token = TokenThreadLocal.get();
        Long userId = null;
        String username = null;
        if (token != null) {
            DecodedJWT jwt = JWTUtil.verifyToken(token);
            System.out.println(jwt);
            userId = Long.valueOf(jwt.getClaim("id").asString());
            username = jwt.getClaim("username").asString();
        }
        String url = QiNiuUtil.saveImage(file, "post");
        InvitationImg invitationImg = new InvitationImg();
        invitationImg.setInvitationId(id);
        invitationImg.setUserId(userId);
        invitationImg.setUsername(username);
        invitationImg.setUrl(url);
        invitationImgService.save(invitationImg);
        return Result.success("上传成功", url);
    }

    @GetMapping("/getPostList/{pageNo}/{pageSize}")
    public Result<List<InvitationDTO>> getPostList(@PathVariable Integer pageNo, @PathVariable Integer pageSize) {
        System.out.println(pageNo);
        System.out.println(pageSize);
        LambdaQueryWrapper<Invitation> lqw = new LambdaQueryWrapper<>();
        lqw.orderByDesc(Invitation::getPostTime);
        lqw.last("limit " + (pageNo - 1) * pageSize + "," + pageSize);
        List<Invitation> list = invitationService.list(lqw);
        System.out.println(list);
        List<InvitationDTO> invitationDTOList = new ArrayList<>();
        LambdaQueryWrapper<InvitationImg> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        list.forEach(item->{
//            item.setPostTime(new Date(item.getPostTime().getTime() + 1000 * 60 * 60 * 8));
            lambdaQueryWrapper.clear();
            lambdaQueryWrapper.eq(InvitationImg::getInvitationId,item.getId());
            List<InvitationImg> imgList = invitationImgService.list(lambdaQueryWrapper);
            InvitationDTO invitationDTO = new InvitationDTO();
            invitationDTO.setInvitation(item);
            invitationDTO.setImgList(imgList);
            invitationDTOList.add(invitationDTO);
        });
        return Result.success("获取帖子列表成功",invitationDTOList);
    }

    @GetMapping("/getPostInfo/{id}")
    public Result<InvitationDTO> getPostInfo(@PathVariable String id){
        Invitation invitation = invitationService.getById(id);
        LambdaQueryWrapper<InvitationImg> lqw = new LambdaQueryWrapper<>();
        lqw.eq(InvitationImg::getInvitationId,id);
        List<InvitationImg> list = invitationImgService.list(lqw);
        InvitationDTO invitationDTO = new InvitationDTO();
        invitationDTO.setInvitation(invitation);
        invitationDTO.setImgList(list);
        return Result.success("获取帖子成功",invitationDTO);
    }
}
