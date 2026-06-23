"use strict";
const common_vendor = require("../../common/vendor.js");
const config = require("../../config.js");
const http_api_animal = require("../../http/api/animal.js");
const store_user = require("../../store/user.js");
require("../../http/index.js");
if (!Math) {
  MyLoading();
}
const MyLoading = () => "../../components/MyLoading.js";
const _sfc_main = {
  __name: "AnimalDetail",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const user = store_user.userStore().user;
    const likeStaus = common_vendor.ref(false);
    var likeDisable = false;
    var first = true;
    common_vendor.onLoad((params) => {
      isLoading.value = true;
      http_api_animal.getAnimalInfo(params.id).then((res) => {
        animalInfo.data = res.data.data;
        console.log(animalInfo.data);
      });
      if (user != null)
        http_api_animal.getLikeStatus(user.id, params.id).then((res) => {
          likeStaus.value = res.data.data;
          if (likeStaus.value == true)
            likeItImg.value = "../../static/icon/animal-detail/like.png";
          console.log(res);
        });
      http_api_animal.getAnimalPhoto(params.id).then((res) => {
        console.log(res.data.data);
        photoList.value = res.data.data;
        photoCnt.value = res.data.msg;
        first = false;
        isLoading.value = false;
      });
    });
    common_vendor.onShow(() => {
      if (first == true)
        return;
      http_api_animal.getAnimalInfo(animalInfo.data.id).then((res) => {
        animalInfo.data = res.data.data;
        console.log(animalInfo.data);
      });
      http_api_animal.getAnimalPhoto(animalInfo.data.id).then((res) => {
        console.log(res.data.data);
        photoList.value = res.data.data;
        photoCnt.value = res.data.msg;
      });
    });
    const likeItImg = common_vendor.ref("../../static/icon/animal-detail/no-like.png");
    const changeLikeStatus = () => {
      if (likeDisable) {
        return;
      }
      likeDisable = true;
      setTimeout(() => {
        likeDisable = false;
      }, 800);
      if (likeStaus.value == false) {
        animalInfo.data.likeNum += 1;
        likeItImg.value = "../../static/gif/like.gif";
        setTimeout(() => {
          likeItImg.value = "../../static/icon/animal-detail/like.png";
        }, 800);
        likeStaus.value = true;
      } else {
        animalInfo.data.likeNum -= 1;
        likeStaus.value = false;
        likeItImg.value = "../../static/icon/animal-detail/no-like.png";
      }
      http_api_animal.changeLike(user.id, animalInfo.data.id).then((res) => {
        likeStaus.value = res.data.data;
        console.log(likeStaus.value);
      });
    };
    const animalInfo = common_vendor.reactive({
      data: {}
    });
    const sexURL = common_vendor.computed$1(() => {
      if (animalInfo.data.sex == "male")
        return "../../static/icon/atlas/male.png";
      if (animalInfo.data.sex == "female")
        return "../../static/icon/atlas/female.png";
    });
    const goToUpdate = () => {
      common_vendor.index.navigateTo({
        url: "/pages/UpdateAnimal/UpdateAnimal?id=" + animalInfo.data.id
      });
    };
    const photoCnt = common_vendor.ref(0);
    const photoList = common_vendor.ref([]);
    const isDelMode = common_vendor.ref(false);
    const intoDelMode = () => {
      isDelMode.value = true;
      console.log(preImgList.value);
    };
    const canEdit = common_vendor.computed$1(() => {
      return user != null && user.role == "admin";
    });
    const deleteImg = (id) => {
      console.log(id);
      http_api_animal.deleteAnimalImg(id).then((res) => {
        if (res.data.code == 200) {
          http_api_animal.getAnimalPhoto(animalInfo.data.id).then((res2) => {
            photoList.value = res2.data.data;
            photoCnt.value = res2.data.msg;
          });
        }
      });
    };
    const preImgList = common_vendor.computed$1(() => {
      return photoList.value.flat();
    });
    const previewImg = (item) => {
      let urls = preImgList.value.map((e) => {
        return config.resourceURL + e.url;
      });
      common_vendor.index.previewImage({
        current: preImgList.value.indexOf(item),
        urls
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: animalInfo.data.img == null ? "../../static/no-img.png" : common_vendor.unref(config.resourceURL) + animalInfo.data.img,
        b: common_vendor.f(photoList.value, (row, index, i0) => {
          return {
            a: common_vendor.f(row, (item, k1, i1) => {
              return {
                a: common_vendor.unref(config.resourceURL) + item.url,
                b: item.id
              };
            }),
            b: index
          };
        }),
        c: common_vendor.t(animalInfo.data.name),
        d: common_vendor.unref(sexURL),
        e: common_vendor.t(animalInfo.data.likeNum),
        f: likeItImg.value,
        g: common_vendor.o$1(($event) => changeLikeStatus()),
        h: common_vendor.t(animalInfo.data.nick || "\u65E0"),
        i: common_vendor.t(animalInfo.data.place || "\u672A\u77E5"),
        j: common_vendor.t(animalInfo.data.birthday || "\u672A\u77E5"),
        k: common_vendor.t(animalInfo.data.status || "\u672A\u77E5"),
        l: common_vendor.t(animalInfo.data.species || "\u672A\u77E5"),
        m: animalInfo.data.status != "\u6B63\u5E38" && animalInfo.data.status != null
      }, animalInfo.data.status != "\u6B63\u5E38" && animalInfo.data.status != null ? {
        n: common_vendor.t(animalInfo.data.statusInfo)
      } : {}, {
        o: common_vendor.t(animalInfo.data.introduction || "\u6682\u65E0"),
        p: common_vendor.unref(canEdit)
      }, common_vendor.unref(canEdit) ? {
        q: common_vendor.o$1(($event) => goToUpdate())
      } : {}, {
        r: common_vendor.unref(config.resourceURL) + animalInfo.data.img,
        s: common_vendor.t(animalInfo.data.name),
        t: common_vendor.t(photoCnt.value),
        v: isDelMode.value && common_vendor.unref(canEdit)
      }, isDelMode.value && common_vendor.unref(canEdit) ? {
        w: common_vendor.o$1(($event) => isDelMode.value = false)
      } : {}, {
        x: common_vendor.f(photoList.value, (row, index, i0) => {
          return {
            a: common_vendor.t(row[0].createTime.substring(0, 10)),
            b: common_vendor.f(row, (item, k1, i1) => {
              return common_vendor.e(isDelMode.value && common_vendor.unref(canEdit) ? {
                a: common_vendor.o$1(($event) => deleteImg(item.id), item.id)
              } : {}, {
                b: common_vendor.unref(config.resourceURL) + item.url,
                c: common_vendor.o$1(intoDelMode, item.id),
                d: common_vendor.o$1(($event) => previewImg(item), item.id),
                e: item.id
              });
            }),
            c: index
          };
        }),
        y: isDelMode.value && common_vendor.unref(canEdit),
        z: isLoading.value
      }, isLoading.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1398fdb6"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/pages/AnimalDetail/AnimalDetail.vue"]]);
wx.createPage(MiniProgramPage);
