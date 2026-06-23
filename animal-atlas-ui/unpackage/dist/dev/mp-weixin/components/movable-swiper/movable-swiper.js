"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "MovableSwiper",
  props: {
    dataList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    height: {
      type: String,
      default: "360rpx"
    }
  },
  data() {
    return {
      canMove: true,
      movType: 0,
      touchIndex: 0,
      clientX: 0,
      moveX: 0,
      movList: [
        { id: 0, indexClass: "one", conClass: "", x: 0, data: null },
        { id: 1, indexClass: "two", conClass: "", x: 0, data: null },
        { id: 2, indexClass: "three", conClass: "", x: 0, data: null },
        { id: 3, indexClass: "four", conClass: "", x: 0, data: null },
        { id: 4, indexClass: "left", conClass: "", x: -750, data: null }
      ],
      dataIndex: 0
    };
  },
  mounted() {
  },
  watch: {
    dataList: {
      handler(newDataList, oldDataList) {
        this.movInit();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    movInit() {
      let _nowId = this.movList.filter((item) => item.indexClass.indexOf("four") != -1)[0].id;
      if (this.dataList.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u65E0\u6570\u636E"
        });
      } else {
        this.dataIndex = 0;
        this.movList[_nowId].data = this.dataList[this.dataIndex];
      }
    },
    onTouchstart(e) {
      if (!this.canMove || this.dataList.length == 0) {
        return;
      }
      this.clientX = parseInt(e.touches[0].clientX);
    },
    onTouchmove(e) {
      if (!this.canMove || this.dataList.length == 0) {
        return;
      }
      this.moveX = parseInt(e.touches[0].clientX);
      if (this.movType == 0) {
        if (this.moveX > this.clientX + 20) {
          if (this.dataIndex == 0) {
            return;
          }
          this.movType = 1;
          this.touchIndex = this.movList.filter((item) => item.indexClass.indexOf("left") != -1)[0].id;
          this.movList[this.touchIndex].data = this.dataList[this.dataIndex - 1];
        } else if (this.moveX < this.clientX - 20) {
          if (this.dataIndex == this.dataList.length - 1) {
            return;
          }
          this.movType = 2;
          this.touchIndex = this.movList.filter((item) => item.indexClass.indexOf("four") != -1)[0].id;
          let _nextId = this.movList.filter((item) => item.indexClass.indexOf("three") != -1)[0].id;
          this.movList[_nextId].data = this.dataList[this.dataIndex + 1];
        }
      } else if (this.movType == 1) {
        this.movList[this.touchIndex].x = this.moveX - this.clientX - 750 <= 0 ? this.moveX - this.clientX - 750 : 0;
      } else if (this.movType == 2) {
        this.movList[this.touchIndex].x = this.moveX - this.clientX <= 0 ? this.moveX - this.clientX : 0;
      }
    },
    onTouchend(e) {
      if (this.movType == 1) {
        if (this.moveX - this.clientX < 50) {
          this.movList[this.touchIndex].x = -750;
          this.movType = 0;
        } else {
          this.switchCard();
        }
      } else if (this.movType == 2) {
        if (this.moveX - this.clientX > -50) {
          this.movList[this.touchIndex].x = 0;
          this.movType = 0;
        } else {
          this.switchCard();
        }
      }
    },
    switchCard() {
      this.canMove = false;
      if (this.movType == 1) {
        for (let i = 0; i < this.movList.length; i++) {
          let _thisClass = this.movList[i].indexClass.split(" ")[0];
          switch (_thisClass) {
            case "one":
              setTimeout(() => {
                this.movList[i].conClass = "";
                this.movList[i].indexClass = "left";
                this.movList[i].x = -750;
                this.dataIndex -= 1;
                this.canMove = true;
              }, 200);
              break;
            case "two":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "one";
              }, 100);
              break;
            case "three":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "two";
              }, 100);
              break;
            case "four":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "three";
              }, 100);
              break;
            case "left":
              this.movList[i].conClass = "";
              this.movList[i].indexClass = "four animate";
              this.movList[i].x = 0;
              setTimeout(() => {
                this.movList[i].indexClass = "four";
              }, 100);
              break;
          }
        }
      } else if (this.movType == 2) {
        for (let i = 0; i < this.movList.length; i++) {
          let _thisClass = this.movList[i].indexClass.split(" ")[0];
          switch (_thisClass) {
            case "one":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "two";
              }, 100);
              break;
            case "two":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "three";
              }, 100);
              break;
            case "three":
              setTimeout(() => {
                this.movList[i].conClass = "animate";
                this.movList[i].indexClass = "four";
              }, 100);
              break;
            case "four":
              this.movList[i].conClass = "";
              this.movList[i].indexClass = "left animate";
              this.movList[i].x = -750;
              setTimeout(() => {
                this.movList[i].indexClass = "left";
                this.dataIndex += 1;
                this.canMove = true;
              }, 200);
              break;
            case "left":
              this.movList[i].conClass = "";
              this.movList[i].indexClass = "one";
              this.movList[i].x = 0;
              break;
          }
        }
      }
      this.movType = 0;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.movList, (item, index, i0) => {
      return {
        a: "d-" + i0,
        b: common_vendor.r("d", {
          movSlotData: item.data
        }, i0),
        c: common_vendor.n(item.conClass),
        d: common_vendor.n(item.indexClass),
        e: item.x + "rpx",
        f: index
      };
    }),
    b: $props.height,
    c: common_vendor.o$1((...args) => $options.onTouchstart && $options.onTouchstart(...args)),
    d: common_vendor.o$1((...args) => $options.onTouchmove && $options.onTouchmove(...args)),
    e: common_vendor.o$1((...args) => $options.onTouchend && $options.onTouchend(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/components/movable-swiper/movable-swiper.vue"]]);
wx.createComponent(Component);
