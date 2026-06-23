"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _component_van_toast = common_vendor.resolveComponent("van-toast");
  _component_van_toast();
}
const _sfc_main = {
  __name: "MyLoading",
  setup(__props) {
    const Toast = require("../wxcomponents/vant/toast/toast.js").Toast;
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      Toast({
        duration: 0,
        context: proxy
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          id: "van-toast"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/components/MyLoading.vue"]]);
wx.createComponent(Component);
