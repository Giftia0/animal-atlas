"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_user = require("../../http/api/user.js");
const store_user = require("../../store/user.js");
require("../../http/index.js");
if (!Math) {
  MyLoading();
}
const MyLoading = () => "../../components/MyLoading.js";
const _sfc_main = {
  __name: "LoginPage",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const isDisable = common_vendor.computed$1(() => {
      if (loginForm.data.phone.length == 11 && loginForm.data.checkCode.length == 6)
        return false;
      return true;
    });
    const loginForm = common_vendor.reactive({
      data: {
        phone: "",
        checkCode: ""
      }
    });
    const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    const getCheckCode = () => {
      if (sendState == "disable")
        return;
      tip.value = "";
      if (!phoneReg.test(loginForm.data.phone)) {
        tip.value = "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u624B\u673A\u53F7";
        return;
      }
      isLoading.value = true;
      http_api_user.getCode(loginForm.data.phone).then((res) => {
        console.log(res);
        isLoading.value = false;
        common_vendor.index.showToast({
          icon: "success",
          title: "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001"
        });
        sendState = "disable";
        console.log(sendState);
        let i = 60;
        let time = setInterval(() => {
          sendBtn.value = "\u5DF2\u53D1\u9001(" + i-- + ")";
        }, 1e3);
        setTimeout(() => {
          clearInterval(time);
          sendState = "avaliable";
          sendBtn.value = "\u83B7\u53D6\u9A8C\u8BC1\u7801";
        }, 6e4);
      });
    };
    const login = () => {
      if (!phoneReg.test(loginForm.data.phone)) {
        tip.value = "\u8BF7\u8F93\u5165\u6709\u6548\u7684\u624B\u673A\u53F7";
        return;
      }
      if (!loginForm.data.checkCode.length == 6) {
        tip.value = "\u65E0\u6548\u9A8C\u8BC1\u7801";
        return;
      }
      isLoading.value = true;
      http_api_user.loginByCode(loginForm.data.phone, loginForm.data.checkCode).then((res) => {
        isLoading.value = false;
        common_vendor.index.setStorageSync("token", res.data.data);
        store_user.userStore().getUserInfo();
        common_vendor.index.navigateBack();
      });
    };
    const tip = common_vendor.ref("");
    var sendBtn = common_vendor.ref("\u83B7\u53D6\u9A8C\u8BC1\u7801");
    var sendState = "avaliable";
    common_vendor.watch(loginForm.data, (value, old) => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginForm.data.phone,
        b: common_vendor.o$1(($event) => loginForm.data.phone = $event.detail.value),
        c: loginForm.data.phone != "",
        d: common_vendor.o$1(($event) => loginForm.data.phone = ""),
        e: common_vendor.t(common_vendor.unref(sendBtn)),
        f: common_vendor.o$1(($event) => getCheckCode()),
        g: loginForm.data.checkCode,
        h: common_vendor.o$1(($event) => loginForm.data.checkCode = $event.detail.value),
        i: loginForm.data.checkCode != "",
        j: common_vendor.o$1(($event) => loginForm.data.checkCode = ""),
        k: common_vendor.t(tip.value),
        l: common_vendor.unref(isDisable) ? 1 : "",
        m: common_vendor.o$1(($event) => login()),
        n: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-314e8b73"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/LoginPage/LoginPage.vue"]]);
wx.createPage(MiniProgramPage);
