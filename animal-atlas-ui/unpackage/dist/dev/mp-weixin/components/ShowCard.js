"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const _sfc_main = {
  __name: "ShowCard",
  props: ["id", "imgURL", "sex", "name", "nick", "place", "birthday", "status", "introduction"],
  setup(__props) {
    const props = __props;
    const img = common_vendor.computed$1(() => {
      return props.imgURL != null && props.imgURL != "" ? config.resourceURL + props.imgURL : "../static/no-img.png";
    });
    const statusColor = common_vendor.computed$1(() => {
      if (props.status == "\u6B63\u5E38")
        return "color: green;";
      if (props.status == "\u5F02\u5E38")
        return "color: red;";
    });
    const sexURL = common_vendor.computed$1(() => {
      if (props.sex == "male")
        return "../static/icon/atlas/male.png";
      if (props.sex == "female")
        return "../static/icon/atlas/female.png";
    });
    const toDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/AnimalDetail/AnimalDetail?id=" + props.id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(img),
        b: common_vendor.t(props.name || "\u672A\u77E5"),
        c: common_vendor.unref(sexURL),
        d: common_vendor.t(props.nick || "\u65E0"),
        e: common_vendor.t(props.place || "\u672A\u77E5"),
        f: common_vendor.t(props.birthday || "\u672A\u77E5"),
        g: common_vendor.t(props.status || "\u672A\u77E5"),
        h: common_vendor.s(common_vendor.unref(statusColor)),
        i: common_vendor.t(props.introduction || "\u65E0"),
        j: common_vendor.o$1(($event) => toDetail())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/components/ShowCard.vue"]]);
wx.createComponent(Component);
