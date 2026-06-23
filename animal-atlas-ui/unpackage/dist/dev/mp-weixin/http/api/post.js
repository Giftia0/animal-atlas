"use strict";
const http_index = require("../index.js");
const addPost = (post) => {
  return http_index.myRequest({
    url: "/post/addPost",
    method: "post",
    data: post
  });
};
const getPostList = (pageNo, pageSize) => {
  return http_index.myRequest({
    url: "/post/getPostList/" + pageNo + "/" + pageSize,
    method: "get"
  });
};
const getPostInfo = (id) => {
  return http_index.myRequest({
    url: "/post/getPostInfo/" + id,
    method: "get"
  });
};
exports.addPost = addPost;
exports.getPostInfo = getPostInfo;
exports.getPostList = getPostList;
