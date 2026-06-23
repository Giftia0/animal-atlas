"use strict";
const common_vendor = require("../../../../common/vendor.js");
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("dataChange");
};
const AREA_SIZE = 75;
const IMG_SIZE = 300;
const _sfc_main = {
  name: "qf-image-cropper",
  options: {
    styleIsolation: "isolated"
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: IMG_SIZE
    },
    height: {
      type: Number,
      default: IMG_SIZE
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    showAngle: {
      type: Boolean,
      default: true
    },
    areaScale: {
      type: Number,
      default: 0.3
    },
    maxScale: {
      type: Number,
      default: 5
    },
    bounce: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    choosable: {
      type: Boolean,
      default: true
    },
    angleSize: {
      type: Number,
      default: 20
    },
    angleBorderWidth: {
      type: Number,
      default: 2
    },
    radius: {
      type: Number,
      default: 0
    },
    fileType: {
      type: String,
      default: "png"
    },
    delay: {
      type: Number,
      default: 1e3
    }
  },
  emits: ["crop"],
  data() {
    return {
      maskList: [
        { id: "crop-mask-block-1" },
        { id: "crop-mask-block-2" },
        { id: "crop-mask-block-3" },
        { id: "crop-mask-block-4" }
      ],
      gridList: [
        { id: "crop-grid-1" },
        { id: "crop-grid-2" },
        { id: "crop-grid-3" },
        { id: "crop-grid-4" }
      ],
      angleList: [
        { id: "crop-angle-1" },
        { id: "crop-angle-2" },
        { id: "crop-angle-3" },
        { id: "crop-angle-4" }
      ],
      imgSrc: "",
      imgWidth: IMG_SIZE,
      imgHeight: IMG_SIZE,
      widthPercent: AREA_SIZE,
      heightPercent: AREA_SIZE,
      area: {},
      oldWidth: 0,
      oldHeight: 0,
      sys: common_vendor.index.getSystemInfoSync(),
      scaleWidth: 0,
      scaleHeight: 0,
      rotate: 0,
      offsetX: 0,
      offsetY: 0,
      use2d: false,
      canvansWidth: 0,
      canvansHeight: 0
    };
  },
  computed: {
    initData() {
      return {
        timestamp: new Date().getTime(),
        area: {
          ...this.area,
          bounce: this.bounce,
          showBorder: this.showBorder,
          showGrid: this.showGrid,
          showAngle: this.showAngle,
          angleSize: this.angleSize,
          angleBorderWidth: this.angleBorderWidth,
          minScale: this.areaScale,
          widthPercent: this.widthPercent,
          heightPercent: this.heightPercent,
          radius: this.radius
        },
        sys: this.sys,
        img: {
          maxScale: this.maxScale,
          src: this.imgSrc,
          width: this.oldWidth,
          height: this.oldHeight,
          oldWidth: this.oldWidth,
          oldHeight: this.oldHeight
        }
      };
    },
    imgProps() {
      return {
        width: this.width,
        height: this.height,
        src: this.src
      };
    }
  },
  watch: {
    imgProps: {
      handler(val) {
        this.imgWidth = Number(val.width) || IMG_SIZE;
        this.imgHeight = Number(val.height) || IMG_SIZE;
        let use2d = true;
        let canvansWidth = this.imgWidth;
        let canvansHeight = this.imgHeight;
        let size = Math.max(canvansWidth, canvansHeight);
        let scalc = 1;
        if (size > 1365) {
          scalc = 1365 / size;
        }
        this.canvansWidth = canvansWidth * scalc;
        this.canvansHeight = canvansHeight * scalc;
        this.use2d = use2d;
        this.initArea();
        val.src && this.initImage(val.src);
      },
      immediate: true
    }
  },
  methods: {
    dataChange(e) {
      this.scaleWidth = e.width;
      this.scaleHeight = e.height;
      this.rotate = e.rotate;
      this.offsetX = e.x;
      this.offsetY = e.y;
    },
    initArea() {
      this.sys.offsetBottom = common_vendor.index.upx2px(100) + this.sys.safeAreaInsets.bottom;
      this.sys.windowTop = 0;
      this.sys.navigation = true;
      let wp = this.widthPercent;
      let hp = this.heightPercent;
      if (this.imgWidth > this.imgHeight) {
        hp = hp * this.imgHeight / this.imgWidth;
      } else if (this.imgWidth < this.imgHeight) {
        wp = wp * this.imgWidth / this.imgHeight;
      }
      const size = this.sys.windowWidth > this.sys.windowHeight ? this.sys.windowHeight : this.sys.windowWidth;
      const width = size * wp / 100;
      const height = size * hp / 100;
      const left = (this.sys.windowWidth - width) / 2;
      const right = left + width;
      const top = (this.sys.windowHeight + this.sys.windowTop - this.sys.offsetBottom - height) / 2;
      const bottom = this.sys.windowHeight + this.sys.windowTop - this.sys.offsetBottom - top;
      this.area = { width, height, left, right, top, bottom };
      this.scaleWidth = width;
      this.scaleHeight = height;
    },
    chooseImage() {
      if (common_vendor.index.chooseMedia) {
        common_vendor.index.chooseMedia({
          count: 1,
          mediaType: ["image"],
          success: (res) => {
            this.resetData();
            this.initImage(res.tempFiles[0].tempFilePath);
          }
        });
        return;
      }
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.resetData();
          this.initImage(res.tempFiles[0].path);
        }
      });
    },
    resetData() {
      this.imgSrc = "";
      this.rotate = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.initArea();
    },
    initImage(url) {
      common_vendor.index.getImageInfo({
        src: url,
        success: (res) => {
          this.imgSrc = res.path;
          let scale = res.width / res.height;
          let areaScale = this.area.width / this.area.height;
          if (scale > 1) {
            if (scale >= areaScale) {
              this.scaleWidth = this.scaleHeight / res.height * this.scaleWidth * (res.width / this.scaleWidth);
            } else {
              this.scaleHeight = res.height * this.scaleWidth / res.width;
            }
          } else {
            if (scale <= areaScale) {
              this.scaleHeight = this.scaleWidth / res.width * this.scaleHeight / (this.scaleHeight / res.height);
            } else {
              this.scaleWidth = res.width * this.scaleHeight / res.height;
            }
          }
          this.oldWidth = this.scaleWidth;
          this.oldHeight = this.scaleHeight;
        },
        fail: (err) => {
          console.error(err);
        }
      });
    },
    drawClipImage(ctx, radius, scale, drawImage) {
      if (radius > 0) {
        ctx.save();
        ctx.beginPath();
        const w = this.canvansWidth;
        const h = this.canvansHeight;
        if (w === h && radius >= w / 2) {
          ctx.arc(w / 2, h / 2, w / 2, 0, 2 * Math.PI);
        } else {
          if (w !== h) {
            radius = Math.min(w / 2, h / 2, radius);
          }
          ctx.moveTo(radius, 0);
          ctx.arcTo(w, 0, w, h, radius);
          ctx.arcTo(w, h, 0, h, radius);
          ctx.arcTo(0, h, 0, 0, radius);
          ctx.arcTo(0, 0, w, 0, radius);
          ctx.closePath();
        }
        ctx.clip();
        drawImage && drawImage(true);
        ctx.restore();
      } else {
        drawImage && drawImage(false);
      }
    },
    drawRotateImage(ctx, rotate, scale) {
      if (rotate !== 0) {
        const x = this.scaleWidth * scale / 2;
        const y = this.scaleHeight * scale / 2;
        ctx.translate(x, y);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.translate(-x, -y);
      }
    },
    drawImage(ctx, image, callback) {
      const scale = this.canvansWidth / this.area.width;
      this.drawClipImage(ctx, this.radius, scale, () => {
        this.drawRotateImage(ctx, this.rotate, scale);
        const r = this.rotate / 90;
        ctx.drawImage(
          image,
          [
            this.offsetX - this.area.left,
            this.offsetY - this.area.top,
            -(this.offsetX - this.area.left),
            -(this.offsetY - this.area.top)
          ][r] * scale,
          [
            this.offsetY - this.area.top,
            -(this.offsetX - this.area.left),
            -(this.offsetY - this.area.top),
            this.offsetX - this.area.left
          ][r] * scale,
          this.scaleWidth * scale,
          this.scaleHeight * scale
        );
      });
    },
    draw2DImage(canvas, ctx, src, callback) {
      if (canvas) {
        const image = canvas.createImage();
        image.onload = () => {
          this.drawImage(ctx, image);
          callback && setTimeout(callback, this.delay);
        };
        image.onerror = (err) => {
          console.error(err);
          common_vendor.index.hideLoading();
        };
        image.src = src;
      } else {
        this.drawImage(ctx, src);
        setTimeout(() => {
          ctx.draw(false, callback);
        }, 200);
      }
    },
    canvasToTempFilePath(canvas, canvasId) {
      common_vendor.index.canvasToTempFilePath({
        canvas,
        canvasId,
        x: 0,
        y: 0,
        width: this.canvansWidth,
        height: this.canvansHeight,
        destWidth: this.imgWidth,
        destHeight: this.imgHeight,
        fileType: this.fileType,
        success: (res) => {
          this.handleImage(res.tempFilePath);
        },
        fail: (err) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "\u88C1\u526A\u5931\u8D25\uFF0C\u751F\u6210\u56FE\u7247\u5F02\u5E38\uFF01", icon: "none" });
        }
      }, this);
    },
    cropClick() {
      common_vendor.index.showLoading({ title: "\u88C1\u526A\u4E2D...", mask: true });
      if (!this.use2d) {
        const ctx = common_vendor.index.createCanvasContext("imgCanvas", this);
        ctx.clearRect(0, 0, this.canvansWidth, this.canvansHeight);
        this.draw2DImage(null, ctx, this.imgSrc, () => {
          this.canvasToTempFilePath(null, "imgCanvas");
        });
        return;
      }
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select("#imgCanvas").fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node;
        const dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, this.canvansWidth, this.canvansHeight);
        this.draw2DImage(canvas, ctx, this.imgSrc, () => {
          this.canvasToTempFilePath(canvas);
        });
      });
    },
    handleImage(tempFilePath) {
      common_vendor.index.hideLoading();
      this.$emit("crop", { tempFilePath });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.use2d
  }, $data.use2d ? {
    b: `${$data.canvansWidth}px`,
    c: `${$data.canvansHeight}px`
  } : {
    d: `${$data.canvansWidth}px`,
    e: `${$data.canvansHeight}px`
  }, {
    f: $data.imgSrc
  }, $data.imgSrc ? {
    g: $data.imgSrc
  } : {}, {
    h: common_vendor.f($data.maskList, (item, index, i0) => {
      return {
        a: item.id,
        b: item.id
      };
    }),
    i: $props.showBorder
  }, $props.showBorder ? {} : {}, {
    j: $props.radius > 0
  }, $props.radius > 0 ? {} : {}, {
    k: $props.showGrid
  }, $props.showGrid ? {
    l: common_vendor.f($data.gridList, (item, index, i0) => {
      return {
        a: item.id,
        b: item.id
      };
    })
  } : {}, {
    m: $props.showAngle
  }, $props.showAngle ? {
    n: common_vendor.f($data.angleList, (item, index, i0) => {
      return {
        a: item.id,
        b: item.id
      };
    }),
    o: common_vendor.s({
      width: `${$props.angleSize}px`,
      height: `${$props.angleSize}px`
    })
  } : {}, {
    p: $options.initData,
    q: $props.rotatable && !!$data.imgSrc
  }, $props.rotatable && !!$data.imgSrc ? {} : {}, {
    r: !$props.choosable
  }, !$props.choosable ? {
    s: common_vendor.o$1((...args) => $options.cropClick && $options.cropClick(...args))
  } : !!$data.imgSrc ? {
    v: common_vendor.o$1((...args) => $options.chooseImage && $options.chooseImage(...args)),
    w: common_vendor.o$1((...args) => $options.cropClick && $options.cropClick(...args))
  } : {
    x: common_vendor.o$1((...args) => $options.chooseImage && $options.chooseImage(...args))
  }, {
    t: !!$data.imgSrc
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7129956f"], ["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue"]]);
wx.createComponent(Component);
