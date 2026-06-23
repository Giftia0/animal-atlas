package com.giftia.animalatlasserve.domain;

import lombok.Data;

import java.util.List;

@Data
public class ReplyDTO {
    Reply reply;
    List<Reply> replyList;
    Integer replyNum;
    List<ReplyImg> imgList;
}
