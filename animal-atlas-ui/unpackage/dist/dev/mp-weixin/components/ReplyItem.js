"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const _sfc_main = {
  __name: "ReplyItem",
  props: ["reply"],
  setup(__props) {
    const props = __props;
    console.log(props.reply.reply);
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
    const avatarUrl = common_vendor.computed$1(() => {
      return props.reply.reply.userAvatar == null ? "../static/default-avatar.png" : config.resourceURL + props.reply.reply.userAvatar;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.t(props.reply.reply.username),
        c: common_vendor.t(props.reply.reply.content),
        d: common_vendor.t(timeFormatter(props.reply.reply.postTime))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-af574358"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/components/ReplyItem.vue"]]);
wx.createComponent(Component);
