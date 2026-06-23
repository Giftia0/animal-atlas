"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const http_api_user = require("../../http/api/user.js");
const http_index = require("../../http/index.js");
if (!Array) {
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _easycom_qf_image_cropper2 = common_vendor.resolveComponent("qf-image-cropper");
  (_component_van_action_sheet + _easycom_qf_image_cropper2)();
}
const _easycom_qf_image_cropper = () => "../../uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.js";
if (!Math) {
  (MyLoading + _easycom_qf_image_cropper)();
}
const MyLoading = () => "../../components/MyLoading.js";
const _sfc_main = {
  __name: "PersonInfo",
  setup(__props) {
    common_vendor.ref(null);
    const isLoading = common_vendor.ref(false);
    const user = common_vendor.reactive({
      data: {}
    });
    common_vendor.onShow(() => {
      http_api_user.getUserInfo().then((res) => {
        console.log(res.data.data);
        user.data = res.data.data;
      });
    });
    const avatarUrl = common_vendor.computed$1(() => {
      return user.data.avatar == null ? "../../static/default-avatar.png" : config.resourceURL + user.data.avatar;
    });
    const iscrop = common_vendor.ref(false);
    const cropSrc = common_vendor.ref("");
    const show = common_vendor.ref(false);
    const actions = [
      {
        name: "\u67E5\u770B\u5934\u50CF"
      },
      {
        name: "\u4FEE\u6539\u5934\u50CF"
      }
    ];
    function handleCrop(e) {
      console.log(e.tempFilePath);
      isLoading.value = true;
      common_vendor.index.uploadFile({
        url: http_index.baseURL + "/user/updateAvatar",
        filePath: e.tempFilePath,
        name: "file",
        header: {
          Authorization: common_vendor.index.getStorageSync("token")
        },
        success: (res) => {
          let data = JSON.parse(res.data);
          user.data = data.data;
          isLoading.value = false;
        }
      });
      iscrop.value = false;
    }
    function toggleActionSheet(e) {
      let name = e.detail.name;
      if (name == "\u67E5\u770B\u5934\u50CF") {
        common_vendor.index.previewImage({
          current: 0,
          urls: [avatarUrl.value]
        });
      }
      if (name == "\u4FEE\u6539\u5934\u50CF") {
        common_vendor.index.chooseImage({
          count: 1,
          success: function(res) {
            console.log(res.tempFilePaths);
            cropSrc.value = res.tempFilePaths[0];
            iscrop.value = true;
          }
        });
      }
      show.value = !show.value;
    }
    const opendialog = () => {
      common_vendor.index.showModal({
        title: "\u4FEE\u6539\u7528\u6237\u540D",
        editable: true,
        showCancel: true,
        success: function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
            user.data.username = res.content;
            http_api_user.updateUserInfo(user.data).then((res2) => {
              console.log(res2.data);
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o$1(toggleActionSheet),
        c: common_vendor.t(user.data.username),
        d: common_vendor.o$1(opendialog),
        e: common_vendor.t(user.data.phone),
        f: common_vendor.t(user.data.role),
        g: common_vendor.t(user.data.createTime.slice(0, 10)),
        h: isLoading.value
      }, isLoading.value ? {} : {}, {
        i: common_vendor.o$1(toggleActionSheet),
        j: common_vendor.o$1(toggleActionSheet),
        k: common_vendor.o$1(toggleActionSheet),
        l: common_vendor.p({
          show: show.value,
          actions,
          cancelText: "\u53D6\u6D88"
        }),
        m: iscrop.value
      }, iscrop.value ? {
        n: common_vendor.o$1(handleCrop),
        o: common_vendor.p({
          src: cropSrc.value,
          width: 500,
          height: 500
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02e870ee"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/PersonInfo/PersonInfo.vue"]]);
wx.createPage(MiniProgramPage);
