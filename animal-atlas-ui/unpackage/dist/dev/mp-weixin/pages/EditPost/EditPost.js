"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_post = require("../../http/api/post.js");
const http_index = require("../../http/index.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (_easycom_uni_file_picker + common_vendor.unref(MyLoading))();
}
const MyLoading = () => "../../components/MyLoading.js";
const _sfc_main = {
  __name: "EditPost",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const postData = common_vendor.reactive({
      data: {
        title: "",
        content: ""
      }
    });
    const imageValue = common_vendor.ref([]);
    const imageStyles = {
      border: {
        color: "#61afef",
        width: 2,
        style: "dashed",
        radius: "10px"
      }
    };
    const imgList = common_vendor.ref([]);
    function selectImg(e) {
      console.log(e);
      e.tempFilePaths.forEach((item) => {
        imgList.value.push(item);
      });
    }
    function deleteImg(e) {
      console.log(e);
      console.log(imgList.value.indexOf(e.tempFilePath));
      imgList.value.splice(imgList.value.indexOf(e.tempFilePath), 1);
    }
    const uploadImg = (id) => {
      let flag = imgList.value.length;
      if (flag == 0)
        return;
      isLoading.value = true;
      imgList.value.forEach((item) => {
        common_vendor.index.uploadFile({
          url: http_index.baseURL + "/post/uploadImg/" + id,
          filePath: item,
          name: "file",
          header: {
            Authorization: common_vendor.index.getStorageSync("token")
          },
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
            flag -= 1;
            if (flag == 0) {
              isLoading.value = false;
              imgList.value = [];
              imageValue.value = [];
              common_vendor.index.showToast({
                icon: "success",
                title: "\u4E0A\u4F20\u6210\u529F"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1500);
            }
          }
        });
      });
    };
    const insert = () => {
      if (postData.data.title == "")
        return;
      http_api_post.addPost(postData.data).then((res) => {
        console.log(res);
        uploadImg(res.data.data);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: postData.data.title,
        b: common_vendor.o$1(($event) => postData.data.title = $event.detail.value),
        c: common_vendor.t(postData.data.title.length),
        d: postData.data.content,
        e: common_vendor.o$1(($event) => postData.data.content = $event.detail.value),
        f: common_vendor.o$1(selectImg),
        g: common_vendor.o$1(deleteImg),
        h: common_vendor.o$1(($event) => imageValue.value = $event),
        i: common_vendor.p({
          imageStyles,
          fileMediatype: "image",
          mode: "grid",
          modelValue: imageValue.value
        }),
        j: common_vendor.o$1(insert),
        k: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9ae65d8"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/EditPost/EditPost.vue"]]);
wx.createPage(MiniProgramPage);
