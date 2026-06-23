"use strict";
const http_index = require("../index.js");
const getReplyById = (id) => {
  return http_index.myRequest({
    url: "/reply/getReplyList/post/" + id,
    method: "get"
  });
};
const addReply = (id, content) => {
  return http_index.myRequest({
    url: "/reply/addReply/post/" + id,
    method: "post",
    data: content
  });
};
exports.addReply = addReply;
exports.getReplyById = getReplyById;
