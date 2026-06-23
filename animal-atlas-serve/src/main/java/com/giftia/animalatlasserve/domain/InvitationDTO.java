package com.giftia.animalatlasserve.domain;

import lombok.Data;

import java.util.List;

@Data
public class InvitationDTO {
    private Invitation invitation;
    private List<InvitationImg> imgList;
}
