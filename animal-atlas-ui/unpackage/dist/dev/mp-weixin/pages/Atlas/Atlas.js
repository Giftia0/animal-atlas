"use strict";
const common_vendor = require("../../common/vendor.js");
const http_api_animal = require("../../http/api/animal.js");
const store_user = require("../../store/user.js");
require("../../http/index.js");
if (!Array) {
  const _easycom_z_paging2 = common_vendor.resolveComponent("z-paging");
  _easycom_z_paging2();
}
const _easycom_z_paging = () => "../../uni_modules/z-paging/components/z-paging/z-paging.js";
if (!Math) {
  (MyLoading + ShowCard + _easycom_z_paging)();
}
const MyLoading = () => "../../components/MyLoading.js";
const ShowCard = () => "../../components/ShowCard.js";
const _sfc_main = {
  __name: "Atlas",
  setup(__props) {
    common_vendor.onShow(() => {
      console.log(getApp().globalData.deleteId);
      let deleteId = getApp().globalData.deleteId;
      if (deleteId != null) {
        animalList.value = animalList.value.filter((item) => {
          return item.id != deleteId;
        });
      }
    });
    const isLoading = common_vendor.ref(false);
    var dataList = [];
    const animalList = common_vendor.ref([]);
    const paging = common_vendor.ref(null);
    const queryList = (pageNo, pageSize, from) => {
      if (from == 0)
        dataList = [];
      http_api_animal.getAnimal(dataList, pageSize).then((res) => {
        console.log(dataList);
        paging.value.complete(res.data.data);
        let data = res.data.data;
        if (data == null) {
          return;
        }
        data.forEach((item) => {
          dataList.push(item.id);
        });
        console.log(animalList.value);
      });
      console.log(paging.value);
    };
    const canAdd = common_vendor.computed$1(() => {
      return store_user.userStore().user != null && store_user.userStore().user.role == "admin";
    });
    const goAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/UpdateAnimal/UpdateAnimal"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {}, {
        b: common_vendor.f(animalList.value, (item, index, i0) => {
          return {
            a: item.id,
            b: item.id,
            c: "263a4294-2-" + i0 + ",263a4294-1",
            d: common_vendor.p({
              id: item.id,
              imgURL: item.img,
              name: item.name,
              sex: item.sex,
              birthday: item.birthday,
              place: item.place,
              nick: item.nick,
              status: item.status,
              introduction: item.introduction
            })
          };
        }),
        c: common_vendor.sr(paging, "263a4294-1", {
          "k": "paging"
        }),
        d: common_vendor.o$1(queryList),
        e: common_vendor.o$1(($event) => animalList.value = $event),
        f: common_vendor.p({
          ["default-page-size"]: 5,
          modelValue: animalList.value
        }),
        g: common_vendor.unref(canAdd)
      }, common_vendor.unref(canAdd) ? {
        h: common_vendor.o$1(goAdd)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-263a4294"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/Atlas/Atlas.vue"]]);
wx.createPage(MiniProgramPage);
