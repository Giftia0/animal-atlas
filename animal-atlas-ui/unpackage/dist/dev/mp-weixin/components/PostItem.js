"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const _sfc_main = {
  __name: "PostItem",
  props: ["info"],
  setup(__props) {
    const props = __props;
    const info = common_vendor.computed$1(() => {
      return props.info;
    });
    const imgs = common_vendor.computed$1(() => {
      return props.info.imgList.slice(0, 3);
    });
    const avatarUrl = common_vendor.computed$1(() => {
      return info.value.invitation.userAvatar == null ? "../static/default-avatar.png" : config.resourceURL + info.value.invitation.userAvatar;
    });
    const preImg = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: info.value.imgList.map((item) => {
          return config.resourceURL + item.url;
        })
      });
    };
    const timeFormatter = (time) => {
      let lag = (new Date() - new Date(time)) / 1e3 / 60;
      if (lag < 1)
        return "\u521A\u521A";
      if (lag < 60)
        return Math.floor(lag) + " \u5206\u949F\u524D";
      if (lag < 60 * 12)
        return Math.floor(lag / 60) + " \u5C0F\u65F6\u524D";
      return time.slice(0, 10) + " " + time.slice(11, 16);
    };
    const intoPost = (id) => {
      console.log(info.value.invitation.id);
      common_vendor.index.navigateTo({
        url: "/pages/PostPage/PostPage?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.t(common_vendor.unref(info).invitation.username),
        c: common_vendor.t(timeFormatter(common_vendor.unref(info).invitation.postTime)),
        d: common_vendor.t(common_vendor.unref(info).invitation.title),
        e: common_vendor.t(common_vendor.unref(info).invitation.content),
        f: common_vendor.f(common_vendor.unref(imgs), (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.unref(config.resourceURL) + item.url,
            c: common_vendor.o$1(($event) => preImg(index), index)
          };
        }),
        g: common_vendor.o$1(($event) => intoPost(common_vendor.unref(info).invitation.id))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e21999db"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/components/PostItem.vue"]]);
wx.createComponent(Component);
