"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_post = require("../../http/api/post.js");
const http_api_reply = require("../../http/api/reply.js");
const config = require("../../config.js");
require("../../http/index.js");
if (!Math) {
  (ReplyItem + MyLoading)();
}
const ReplyItem = () => "../../components/ReplyItem.js";
const MyLoading = () => "../../components/MyLoading.js";
const _sfc_main = {
  __name: "PostPage",
  setup(__props) {
    const info = common_vendor.reactive({
      data: {}
    });
    common_vendor.onLoad((params) => {
      console.log(params.id);
      http_api_post.getPostInfo(params.id).then((res) => {
        console.log(res.data.data);
        info.data = res.data.data;
      });
      http_api_reply.getReplyById(params.id).then((res) => {
        console.log(res.data.data);
        replyList.value = res.data.data;
      });
    });
    const avatarUrl = common_vendor.computed$1(() => {
      return info.data.invitation.userAvatar == null ? "../static/default-avatar.png" : config.resourceURL + info.data.invitation.userAvatar;
    });
    const timeFormatter = (time) => {
      let lag = (new Date() - new Date(time)) / 1e3 / 60;
      if (lag < 60)
        return Math.floor(lag) + " \u5206\u949F\u524D";
      if (lag < 60 * 12)
        return Math.floor(lag / 60) + " \u5C0F\u65F6\u524D";
      return time.slice(0, 10) + " " + time.slice(11, 16);
    };
    const mode = common_vendor.ref(1);
    const replyList = common_vendor.ref([]);
    const input = common_vendor.ref("");
    const sendReply = () => {
      if (input.value == "")
        return;
      isLoading.value = true;
      http_api_reply.addReply(info.data.invitation.id, input.value).then((res) => {
        console.log(res.data.data);
        replyList.value.push(res.data.data);
        console.log(replyList.value);
        input.value = "";
        isLoading.value = false;
      });
    };
    const isLoading = common_vendor.ref(false);
    const changeMode = () => {
      if (mode.value == 1)
        mode.value = 2;
      else if (mode.value == 2)
        mode.value = 1;
      replyList.value.reverse();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.t(info.data.invitation.username),
        c: common_vendor.t(timeFormatter(info.data.invitation.postTime)),
        d: common_vendor.t(info.data.invitation.title),
        e: common_vendor.t(info.data.invitation.content),
        f: common_vendor.f(info.data.imgList, (item, k0, i0) => {
          return {
            a: common_vendor.unref(config.resourceURL) + item.url
          };
        }),
        g: common_vendor.t(replyList.value.length),
        h: mode.value != 1
      }, mode.value != 1 ? {
        i: common_vendor.o$1(changeMode)
      } : {}, {
        j: mode.value == 1
      }, mode.value == 1 ? {
        k: common_vendor.o$1(changeMode)
      } : {}, {
        l: mode.value != 2
      }, mode.value != 2 ? {
        m: common_vendor.o$1(changeMode)
      } : {}, {
        n: mode.value == 2
      }, mode.value == 2 ? {
        o: common_vendor.o$1(changeMode)
      } : {}, {
        p: common_vendor.f(replyList.value, (item, k0, i0) => {
          return {
            a: "eb89edaf-0-" + i0,
            b: common_vendor.p({
              reply: item
            })
          };
        }),
        q: input.value,
        r: common_vendor.o$1(($event) => input.value = $event.detail.value),
        s: common_vendor.o$1(($event) => sendReply()),
        t: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb89edaf"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/PostPage/PostPage.vue"]]);
wx.createPage(MiniProgramPage);
