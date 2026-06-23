"use strict";
const uni_modules_zPaging_components_zPaging_js_zPagingUtils = require("../z-paging-utils.js");
const backToTopModule = {
  props: {
    autoShowBackToTop: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoShowBackToTop", false)
    },
    backToTopThreshold: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("backToTopThreshold", "400rpx")
    },
    backToTopImg: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("backToTopImg", "")
    },
    backToTopWithAnimate: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("backToTopWithAnimate", true)
    },
    backToTopBottom: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("backToTopBottom", "160rpx")
    },
    backToTopStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("backToTopStyle", {});
      }
    },
    enableBackToTop: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("enableBackToTop", true)
    }
  },
  data() {
    return {
      backToTopClass: "zp-back-to-top zp-back-to-top-hide",
      lastBackToTopShowTime: 0,
      showBackToTopClass: false
    };
  },
  computed: {
    finalEnableBackToTop() {
      return this.usePageScroll ? false : this.enableBackToTop;
    },
    finalBackToTopThreshold() {
      return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.convertToPx(this.backToTopThreshold);
    },
    finalBackToTopStyle() {
      const backToTopStyle = this.backToTopStyle;
      if (!backToTopStyle.bottom) {
        backToTopStyle.bottom = this.windowBottom + uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.convertToPx(this.backToTopBottom) + "px";
      }
      if (!backToTopStyle.position) {
        backToTopStyle.position = this.usePageScroll ? "fixed" : "absolute";
      }
      return backToTopStyle;
    }
  },
  methods: {
    _backToTopClick() {
      !this.backToTopWithAnimate && this._checkShouldShowBackToTop(0);
      this.scrollToTop(this.backToTopWithAnimate);
    },
    _checkShouldShowBackToTop(scrollTop) {
      if (!this.autoShowBackToTop) {
        this.showBackToTopClass = false;
        return;
      }
      if (scrollTop > this.finalBackToTopThreshold) {
        if (!this.showBackToTopClass) {
          this.showBackToTopClass = true;
          this.lastBackToTopShowTime = new Date().getTime();
          setTimeout(() => {
            this.backToTopClass = "zp-back-to-top zp-back-to-top-show";
          }, 300);
        }
      } else {
        if (this.showBackToTopClass) {
          this.backToTopClass = "zp-back-to-top zp-back-to-top-hide";
          setTimeout(() => {
            this.showBackToTopClass = false;
          }, new Date().getTime() - this.lastBackToTopShowTime < 500 ? 0 : 300);
        }
      }
    }
  }
};
exports.backToTopModule = backToTopModule;
