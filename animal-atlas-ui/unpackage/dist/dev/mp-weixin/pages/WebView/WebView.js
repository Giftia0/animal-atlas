"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "WebView",
  setup(__props) {
    const url = common_vendor.ref("");
    common_vendor.onLoad((params) => {
      url.value = params.url;
      console.log(url.value);
    });
    return (_ctx, _cache) => {
      return {
        a: url.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/WebView/WebView.vue"]]);
wx.createPage(MiniProgramPage);
