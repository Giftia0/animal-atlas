"use strict";
const http_index = require("../index.js");
const getCode = (phone) => {
  return http_index.myRequest({
    url: "/user/getCheckCode/" + phone
  });
};
const loginByCode = (phone, code) => {
  return http_index.myRequest({
    method: "post",
    url: "/user/loginByCheckCode",
    data: {
      phone,
      code
    }
  });
};
const getUserInfo = () => {
  return http_index.myRequest({
    url: "/user/getUserInfo"
  });
};
const updateUserInfo = (user) => {
  return http_index.myRequest({
    method: "post",
    url: "/user/updateUserInfo",
    data: user
  });
};
exports.getCode = getCode;
exports.getUserInfo = getUserInfo;
exports.loginByCode = loginByCode;
exports.updateUserInfo = updateUserInfo;
