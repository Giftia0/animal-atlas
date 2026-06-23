"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "SettingPage",
  setup(__props) {
    const goToLogout = () => {
      common_vendor.index.removeStorageSync("token");
      store_user.userStore().getUserInfo();
      common_vendor.index.switchTab({
        url: "/pages/MyInfo/MyInfo"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o$1(($event) => goToLogout())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cd20b12f"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/SettingPage/SettingPage.vue"]]);
wx.createPage(MiniProgramPage);
