"use strict";
const common_vendor = require("../../common/vendor.js");
const http_index = require("../../http/index.js");
const http_api_animal = require("../../http/api/animal.js");
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
  __name: "UpdateAnimal",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const isAddMode = common_vendor.ref(false);
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
          url: http_index.baseURL + "/animal/uploadImg/" + id,
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
              if (isAddMode)
                common_vendor.index.navigateBack();
            }
          }
        });
      });
    };
    common_vendor.onLoad((params) => {
      if (params.id == null) {
        console.log("isAddMode");
        isAddMode.value = true;
        return;
      }
      isLoading.value = true;
      http_api_animal.getAnimalInfo(params.id).then((res) => {
        formData.data = res.data.data;
        console.log(formData.data);
        isLoading.value = false;
      });
    });
    const formData = common_vendor.reactive({
      data: {
        id: "",
        sex: "male",
        name: "",
        nick: "",
        place: "",
        birthday: "",
        status: "\u6B63\u5E38",
        species: "",
        introduction: "",
        statusInfo: ""
      }
    });
    const isfemale = common_vendor.computed$1(() => {
      return formData.data.sex == "female";
    });
    const isExp = common_vendor.computed$1(() => {
      return formData.data.status == "\u5F02\u5E38";
    });
    function sexChange(e) {
      console.log(e);
      formData.data.sex = e.detail.value;
      console.log(formData.data);
    }
    function statusChange(e) {
      console.log(e);
      formData.data.status = e.detail.value ? "\u5F02\u5E38" : "\u6B63\u5E38";
      console.log(formData.data);
    }
    const update = () => {
      console.log(formData.data);
      isLoading.value = true;
      http_api_animal.updateAnimal(formData.data).then((res) => {
        console.log(res);
        isLoading.value = false;
        common_vendor.index.showToast({
          icon: "success",
          title: "\u4FEE\u6539\u6210\u529F"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      });
    };
    const insert = () => {
      isLoading.value = true;
      http_api_animal.addAnimal(formData.data).then((res) => {
        console.log(res);
        isLoading.value = false;
        uploadImg(res.data.data);
        common_vendor.index.showToast({
          title: "\u65B0\u589E\u6210\u529F",
          icon: "success"
        });
      });
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/Atlas/Atlas"
        });
      }, 1500);
    };
    const deleteA = () => {
      isLoading.value = true;
      http_api_animal.deleteAnimal(formData.data.id).then((res) => {
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "\u5220\u9664\u6210\u529F",
          icon: "success"
        });
        getApp().globalData.deleteId = formData.data.id;
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/Atlas/Atlas"
          });
        }, 1500);
      });
    };
    const confirmDel = () => {
      common_vendor.index.showModal({
        title: "\u786E\u5B9A\u5220\u9664\u8BE5\u52A8\u7269\uFF1F",
        success(res) {
          if (res.confirm)
            deleteA();
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formData.data.name,
        b: common_vendor.o$1(($event) => formData.data.name = $event.detail.value),
        c: !common_vendor.unref(isfemale),
        d: common_vendor.unref(isfemale),
        e: common_vendor.o$1(sexChange),
        f: formData.data.nick,
        g: common_vendor.o$1(($event) => formData.data.nick = $event.detail.value),
        h: formData.data.place,
        i: common_vendor.o$1(($event) => formData.data.place = $event.detail.value),
        j: formData.data.birthday,
        k: common_vendor.o$1(($event) => formData.data.birthday = $event.detail.value),
        l: common_vendor.o$1(statusChange),
        m: common_vendor.unref(isExp),
        n: common_vendor.t(formData.data.status),
        o: common_vendor.unref(isExp)
      }, common_vendor.unref(isExp) ? {
        p: formData.data.statusInfo,
        q: common_vendor.o$1(($event) => formData.data.statusInfo = $event.detail.value)
      } : {}, {
        r: formData.data.introduction,
        s: common_vendor.o$1(($event) => formData.data.introduction = $event.detail.value),
        t: !isAddMode.value
      }, !isAddMode.value ? {
        v: common_vendor.o$1(($event) => update())
      } : {}, {
        w: !isAddMode.value
      }, !isAddMode.value ? {
        x: common_vendor.o$1(($event) => confirmDel())
      } : {}, {
        y: isAddMode.value
      }, isAddMode.value ? {
        z: common_vendor.o$1(($event) => insert())
      } : {}, {
        A: !isAddMode.value
      }, !isAddMode.value ? {
        B: common_vendor.o$1(($event) => uploadImg(formData.data.id))
      } : {}, {
        C: common_vendor.o$1(selectImg),
        D: common_vendor.o$1(deleteImg),
        E: common_vendor.o$1(($event) => imageValue.value = $event),
        F: common_vendor.p({
          title: "\u6DFB\u52A0\u56FE\u7247",
          imageStyles,
          fileMediatype: "image",
          mode: "grid",
          modelValue: imageValue.value
        }),
        G: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bddf2912"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/UpdateAnimal/UpdateAnimal.vue"]]);
wx.createPage(MiniProgramPage);
