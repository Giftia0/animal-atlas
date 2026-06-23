"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://192.168.43.122:8080";
const myRequest = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseURL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        Authorization: common_vendor.index.getStorageSync("token")
      },
      success: (res) => {
        const code = res.data.code;
        console.log(code);
        if (code != 200) {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "error"
          });
        }
        if (code == 401) {
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/LoginPage/LoginPage"
            });
          }, 1500);
        }
        if (code == 403) {
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
        resolve(res);
      },
      fail: (err) => {
        console.log("************fail");
        console.log(err);
        reject(err);
      }
    });
  });
};
exports.baseURL = baseURL;
exports.myRequest = myRequest;
