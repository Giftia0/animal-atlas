"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const http_index = require("../../http/index.js");
if (!Array) {
  const _easycom_movable_swiper2 = common_vendor.resolveComponent("movable-swiper");
  _easycom_movable_swiper2();
}
const _easycom_movable_swiper = () => "../../components/movable-swiper/movable-swiper.js";
if (!Math) {
  _easycom_movable_swiper();
}
const _sfc_main = {
  __name: "AnimalIdentification",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const imgUrl = common_vendor.ref("");
    const result = common_vendor.reactive({
      data: {}
    });
    const scoreFormatter = (score) => {
      let head = score.substring(2, 4);
      if (head[0] == "0")
        head = score.substring(3, 4);
      let tail = score.substring(4, 5);
      return head + "." + tail + "%";
    };
    const goBaike = (url) => {
      common_vendor.index.navigateTo({
        url: "/pages/WebView/WebView?url=" + url
      });
    };
    const gotoDetail = (id) => {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/AnimalDetail/AnimalDetail?id=" + id
      });
    };
    const choose = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          console.log(res.tempFilePaths[0]);
          imgUrl.value = res.tempFilePaths[0];
          isLoading.value = true;
          common_vendor.index.uploadFile({
            url: http_index.baseURL + "/easydl/animal",
            filePath: res.tempFilePaths[0],
            name: "file",
            header: {
              Authorization: common_vendor.index.getStorageSync("token")
            },
            success: (uploadFileRes) => {
              let temp = JSON.parse(uploadFileRes.data);
              result.data = temp.data;
              isLoading.value = false;
              console.log(result.data);
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {}, {
        b: imgUrl.value == ""
      }, imgUrl.value == "" ? {
        c: common_vendor.o$1(($event) => choose())
      } : {
        d: imgUrl.value,
        e: common_vendor.o$1(($event) => choose())
      }, {
        f: imgUrl.value != "" && !isLoading.value
      }, imgUrl.value != "" && !isLoading.value ? {
        g: common_vendor.w(({
          movSlotData
        }, s0, i0) => {
          return common_vendor.e({
            a: movSlotData
          }, movSlotData ? {
            b: common_vendor.t(movSlotData.name),
            c: common_vendor.t(scoreFormatter(movSlotData.score)),
            d: common_vendor.t(movSlotData.baike_info.description),
            e: common_vendor.o$1(($event) => goBaike(movSlotData.baike_info.baike_url))
          } : {}, {
            f: i0,
            g: s0
          });
        }, {
          name: "d",
          path: "g",
          vueId: "bf264f6a-0"
        }),
        h: common_vendor.p({
          dataList: result.data.spices,
          height: "360rpx"
        })
      } : {}, {
        i: imgUrl.value != "" && !isLoading.value
      }, imgUrl.value != "" && !isLoading.value ? {
        j: common_vendor.f(result.data.identification, (item, index, i0) => {
          return {
            a: common_vendor.unref(config.resourceURL) + item.animal.img,
            b: common_vendor.t(item.animal.name),
            c: common_vendor.t(scoreFormatter(item.score)),
            d: index,
            e: common_vendor.o$1(($event) => gotoDetail(item.animal.id), index)
          };
        })
      } : {}, {
        k: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bf264f6a"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/AnimalIdentification/AnimalIdentification.vue"]]);
wx.createPage(MiniProgramPage);
