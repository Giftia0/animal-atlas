"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../store/user.js");
const http_api_user = require("../../http/api/user.js");
const config = require("../../config.js");
require("../../http/index.js");
const _sfc_main = {
  __name: "MyInfo",
  setup(__props) {
    common_vendor.onShow(() => {
      http_api_user.getUserInfo().then((res) => {
        user.value = res.data.data;
      });
    });
    var user = common_vendor.ref();
    const avatarUrl = common_vendor.computed$1(() => {
      if (user.value == null)
        return "../../static/default-avatar.png";
      return user.value.avatar == null ? "../../static/default-avatar.png" : config.resourceURL + user.value.avatar;
    });
    const username = common_vendor.computed$1(() => {
      return user.value != null ? user.value.username : "\u767B\u5F55/\u6CE8\u518C";
    });
    const goToLogin = () => {
      if (user.value != null)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/LoginPage/LoginPage"
      });
    };
    const goToSetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/SettingPage/SettingPage"
      });
    };
    const goToPerson = () => {
      common_vendor.index.navigateTo({
        url: "/pages/PersonInfo/PersonInfo"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o$1(($event) => goToLogin()),
        c: common_vendor.t(common_vendor.unref(username)),
        d: common_vendor.o$1(($event) => goToLogin()),
        e: common_vendor.o$1(($event) => goToPerson()),
        f: common_vendor.o$1(($event) => goToSetting())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35112905"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/MyInfo/MyInfo.vue"]]);
wx.createPage(MiniProgramPage);
