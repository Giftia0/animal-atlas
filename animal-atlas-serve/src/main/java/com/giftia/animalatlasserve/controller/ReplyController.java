package com.giftia.animalatlasserve.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.common.TokenThreadLocal;
import com.giftia.animalatlasserve.domain.Invitation;
import com.giftia.animalatlasserve.domain.Reply;
import com.giftia.animalatlasserve.domain.ReplyDTO;
import com.giftia.animalatlasserve.domain.User;
import com.giftia.animalatlasserve.service.InvitationService;
import com.giftia.animalatlasserve.service.ReplyService;
import com.giftia.animalatlasserve.service.UserService;
import com.giftia.animalatlasserve.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @Autowired
    InvitationService invitationService;

    @Autowired
    UserService userService;

    @GetMapping("/getReplyList/post/{id}")
    public Result<List<ReplyDTO>> getReplyList(@PathVariable Long id) {

        List<ReplyDTO> list = new ArrayList<>();
        LambdaQueryWrapper<Reply> lqw = new LambdaQueryWrapper<>();
        lqw.eq(Reply::getBelong, id);
        lqw.eq(Reply::getType, 0);
        //帖子回复列表
        List<Reply> replies = replyService.list(lqw);
        replies.forEach(item -> {
            ReplyDTO replyDTO = new ReplyDTO();
            replyDTO.setReply(item);
            lqw.clear();
            lqw.eq(Reply::getBelong, item.getId());
            lqw.eq(Reply::getType, 1);
            List<Reply> innerReplyList = replyService.list(lqw);
            replyDTO.setReplyNum(innerReplyList.size());
            replyDTO.setReplyList(innerReplyList);
            list.add(replyDTO);
        });
        System.out.println(list);
        return Result.success("获取帖子回复成功",list);
    }

    @PostMapping("/addReply/post/{id}")
    public Result<ReplyDTO> addReply(@RequestBody String content,@PathVariable Long id){
        System.out.println(content);
        System.out.println(id);

        String token = TokenThreadLocal.get();
        Long userId = null;
        String username = null;
        if (token != null) {
            DecodedJWT jwt = JWTUtil.verifyToken(token);
            System.out.println(jwt);
            userId = Long.valueOf(jwt.getClaim("id").asString());
            username = jwt.getClaim("username").asString();
        }


        Reply reply = new Reply();
        reply.setBelong(id);
        Invitation invitation = invitationService.getById(id);
        reply.setBelongName(invitation.getUsername());
        reply.setContent(content);
        reply.setType(0);
        User user = userService.getById(userId);
        reply.setUserAvatar(user.getAvatar());
        reply.setUsername(user.getUsername());
        reply.setUserId(user.getId());
        replyService.save(reply);
        Reply byId = replyService.getById(reply);
        ReplyDTO replyDTO = new ReplyDTO();
        replyDTO.setReply(byId);
        return Result.success("评论成功",replyDTO);
    }
}
