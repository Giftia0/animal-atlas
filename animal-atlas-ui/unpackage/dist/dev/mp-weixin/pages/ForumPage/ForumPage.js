"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const http_api_post = require("../../http/api/post.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (common_vendor.unref(PostItem) + _easycom_z_paging)();
}
const PostItem = () => "../../components/PostItem.js";
const _sfc_main = {
  __name: "ForumPage",
  setup(__props) {
    const userS = store_user.userStore();
    const postList = common_vendor.ref([]);
    const paging = common_vendor.ref(null);
    const queryList = (pageNo, pageSize, from) => {
      http_api_post.getPostList(pageNo, pageSize).then((res) => {
        console.log(postList.value);
        console.log(res.data.data);
        paging.value.complete(res.data.data);
      });
      console.log(paging.value);
    };
    const goPost = () => {
      common_vendor.index.navigateTo({
        url: "/pages/EditPost/EditPost"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(postList.value, (item, k0, i0) => {
          return {
            a: "07040e55-1-" + i0 + ",07040e55-0",
            b: common_vendor.p({
              info: item
            })
          };
        }),
        b: common_vendor.sr(paging, "07040e55-0", {
          "k": "paging"
        }),
        c: common_vendor.o$1(queryList),
        d: common_vendor.o$1(($event) => postList.value = $event),
        e: common_vendor.p({
          ["default-page-size"]: 5,
          modelValue: postList.value
        }),
        f: common_vendor.unref(userS).user != null
      }, common_vendor.unref(userS).user != null ? {
        g: common_vendor.o$1(($event) => goPost())
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07040e55"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/ForumPage/ForumPage.vue"]]);
wx.createPage(MiniProgramPage);
