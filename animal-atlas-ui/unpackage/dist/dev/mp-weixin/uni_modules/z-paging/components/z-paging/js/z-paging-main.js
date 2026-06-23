"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_zPaging_components_zPaging_js_zPagingStatic = require("./z-paging-static.js");
const uni_modules_zPaging_components_zPaging_js_zPagingConstant = require("./z-paging-constant.js");
const uni_modules_zPaging_components_zPaging_js_zPagingUtils = require("./z-paging-utils.js");
const uni_modules_zPaging_components_zPaging_js_modules_commonLayout = require("./modules/common-layout.js");
const uni_modules_zPaging_components_zPaging_js_modules_dataHandle = require("./modules/data-handle.js");
const uni_modules_zPaging_components_zPaging_js_modules_i18n = require("./modules/i18n.js");
const uni_modules_zPaging_components_zPaging_js_modules_nvue = require("./modules/nvue.js");
const uni_modules_zPaging_components_zPaging_js_modules_empty = require("./modules/empty.js");
const uni_modules_zPaging_components_zPaging_js_modules_refresher = require("./modules/refresher.js");
const uni_modules_zPaging_components_zPaging_js_modules_loadMore = require("./modules/load-more.js");
const uni_modules_zPaging_components_zPaging_js_modules_loading = require("./modules/loading.js");
const uni_modules_zPaging_components_zPaging_js_modules_scroller = require("./modules/scroller.js");
const uni_modules_zPaging_components_zPaging_js_modules_backToTop = require("./modules/back-to-top.js");
const uni_modules_zPaging_components_zPaging_js_modules_virtualList = require("./modules/virtual-list.js");
const uni_modules_zPaging_components_zPaging_js_zPagingEnum = require("./z-paging-enum.js");
const zPagingRefresh = () => "../components/z-paging-refresh.js";
const zPagingLoadMore = () => "../components/z-paging-load-more.js";
const zPagingEmptyView = () => "../../z-paging-empty-view/z-paging-empty-view.js";
const systemInfo = common_vendor.index.getSystemInfoSync();
const _sfc_main = {
  name: "z-paging",
  components: {
    zPagingRefresh,
    zPagingLoadMore,
    zPagingEmptyView
  },
  mixins: [
    uni_modules_zPaging_components_zPaging_js_modules_commonLayout.commonLayoutModule,
    uni_modules_zPaging_components_zPaging_js_modules_dataHandle.dataHandleModule,
    uni_modules_zPaging_components_zPaging_js_modules_i18n.i18nModule,
    uni_modules_zPaging_components_zPaging_js_modules_nvue.nvueModule,
    uni_modules_zPaging_components_zPaging_js_modules_empty.emptyModule,
    uni_modules_zPaging_components_zPaging_js_modules_refresher.refresherModule,
    uni_modules_zPaging_components_zPaging_js_modules_loadMore.loadMoreModule,
    uni_modules_zPaging_components_zPaging_js_modules_loading.loadingModule,
    uni_modules_zPaging_components_zPaging_js_modules_scroller.scrollerModule,
    uni_modules_zPaging_components_zPaging_js_modules_backToTop.backToTopModule,
    uni_modules_zPaging_components_zPaging_js_modules_virtualList.virtualListModule
  ],
  data() {
    return {
      base64Arrow: uni_modules_zPaging_components_zPaging_js_zPagingStatic.zStatic.base64Arrow,
      base64Flower: uni_modules_zPaging_components_zPaging_js_zPagingStatic.zStatic.base64Flower,
      base64BackToTop: uni_modules_zPaging_components_zPaging_js_zPagingStatic.zStatic.base64BackToTop,
      loadingType: uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.LoadingType.Refresher,
      requestTimeStamp: 0,
      chatRecordLoadingMoreText: "",
      wxsPropType: "",
      renderPropScrollTop: -1,
      checkScrolledToBottomTimeOut: null,
      cacheTopHeight: -1,
      insideOfPaging: -1,
      isLoadFailed: false,
      isIos: systemInfo.platform === "ios",
      disabledBounce: false,
      fromCompleteEmit: false,
      disabledCompleteEmit: false,
      wxsIsScrollTopInTopRange: true,
      wxsScrollTop: 0,
      wxsPageScrollTop: 0,
      wxsOnPullingDown: false
    };
  },
  props: {
    delay: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("delay", 0)
    },
    minDelay: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("minDelay", 0)
    },
    pagingStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("pagingStyle", {});
      }
    },
    height: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("height", "")
    },
    width: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("width", "")
    },
    bgColor: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("bgColor", "")
    },
    pagingContentStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("pagingContentStyle", {});
      }
    },
    autoHeight: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoHeight", false)
    },
    autoHeightAddition: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoHeightAddition", "0px")
    },
    defaultThemeStyle: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("defaultThemeStyle", "black")
    },
    fixed: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("fixed", true)
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("safeAreaInsetBottom", false)
    },
    useSafeAreaPlaceholder: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("useSafeAreaPlaceholder", false)
    },
    topZIndex: {
      type: Number,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("topZIndex", 99)
    },
    superContentZIndex: {
      type: Number,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("superContentZIndex", 1)
    },
    contentZIndex: {
      type: Number,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("contentZIndex", 10)
    },
    autoFullHeight: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoFullHeight", true)
    },
    watchTouchDirectionChange: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("watchTouchDirectionChange", false)
    }
  },
  created() {
    if (this.createdReload && !this.refresherOnly && this.auto) {
      this._startLoading();
      this._preReload();
    }
  },
  mounted() {
    this.wxsPropType = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime().toString();
    this.renderJsIgnore;
    if (!this.createdReload && !this.refresherOnly && this.auto) {
      this.$nextTick(this._preReload);
    }
    this.finalUseCache && this._setListByLocalCache();
    let delay = 0;
    delay = 100;
    this.$nextTick(() => {
      this.systemInfo = common_vendor.index.getSystemInfoSync();
      !this.usePageScroll && this.autoHeight && this._setAutoHeight();
      this.loaded = true;
    });
    this.updatePageScrollTopHeight();
    this.updatePageScrollBottomHeight();
    this.updateLeftAndRightWidth();
    if (this.finalRefresherEnabled && this.useCustomRefresher) {
      this.$nextTick(() => {
        this.isTouchmoving = true;
      });
    }
    this._onEmit();
    this.finalUseVirtualList && this._virtualListInit();
    this.$nextTick(() => {
      setTimeout(() => {
        this._getCssSafeAreaInsetBottom(() => this.safeAreaInsetBottom && this.updatePageScrollBottomHeight());
      }, delay);
    });
  },
  destroyed() {
    this._offEmit();
  },
  unmounted() {
    this._offEmit();
  },
  watch: {
    defaultThemeStyle: {
      handler(newVal) {
        if (newVal.length) {
          this.finalRefresherDefaultStyle = newVal;
        }
      },
      immediate: true
    },
    autoHeight(newVal) {
      this.loaded && !this.usePageScroll && this._setAutoHeight(newVal);
    },
    autoHeightAddition(newVal) {
      this.loaded && !this.usePageScroll && this.autoHeight && this._setAutoHeight(newVal);
    }
  },
  computed: {
    finalPagingStyle() {
      const pagingStyle = this.pagingStyle;
      if (!this.systemInfo)
        return pagingStyle;
      const { windowTop, windowBottom } = this;
      if (!this.usePageScroll && this.fixed) {
        if (windowTop && !pagingStyle.top) {
          pagingStyle.top = windowTop + "px";
        }
        if (windowBottom && !pagingStyle.bottom) {
          pagingStyle.bottom = windowBottom + "px";
        }
      }
      if (this.bgColor.length && !pagingStyle["background"]) {
        pagingStyle["background"] = this.bgColor;
      }
      if (this.height.length && !pagingStyle["height"]) {
        pagingStyle["height"] = this.height;
      }
      if (this.width.length && !pagingStyle["width"]) {
        pagingStyle["width"] = this.width;
      }
      return pagingStyle;
    },
    finalLowerThreshold() {
      return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.convertToPx(this.lowerThreshold);
    },
    finalPagingContentStyle() {
      if (this.contentZIndex != 1) {
        this.pagingContentStyle["z-index"] = this.contentZIndex;
        this.pagingContentStyle["position"] = "relative";
      }
      return this.pagingContentStyle;
    },
    renderJsIgnore() {
      if (this.usePageScroll && this.useChatRecordMode || !this.refresherEnabled || !this.useCustomRefresher) {
        this.$nextTick(() => {
          this.renderPropScrollTop = 10;
        });
      }
      return 0;
    },
    windowHeight() {
      var _a;
      return ((_a = this.systemInfo) == null ? void 0 : _a.windowHeight) || 0;
    },
    windowBottom() {
      var _a;
      if (!this.systemInfo)
        return 0;
      let windowBottom = ((_a = this.systemInfo) == null ? void 0 : _a.windowBottom) || 0;
      if (this.safeAreaInsetBottom && !this.useSafeAreaPlaceholder) {
        windowBottom += this.safeAreaBottom;
      }
      return windowBottom;
    },
    isIosAndH5() {
      return false;
    }
  },
  methods: {
    getVersion() {
      return `z-paging v${uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.version}`;
    },
    setSpecialEffects(args) {
      this.setListSpecialEffects(args);
    },
    setListSpecialEffects(args) {
      this.nFixFreezing = args && Object.keys(args).length;
      if (this.isIos) {
        this.privateRefresherEnabled = 0;
      }
      !this.usePageScroll && this.$refs["zp-n-list"].setSpecialEffects(args);
    },
    _doVibrateShort() {
      common_vendor.index.vibrateShort();
    },
    async _setAutoHeight(shouldFullHeight = true, scrollViewNode = null) {
      let heightKey = "min-height";
      heightKey = "min-height";
      try {
        if (shouldFullHeight) {
          let finalScrollViewNode = scrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
          let finalScrollBottomNode = await this._getNodeClientRect(".zp-page-bottom");
          if (finalScrollViewNode) {
            const scrollViewTop = finalScrollViewNode[0].top;
            let scrollViewHeight = this.windowHeight - scrollViewTop;
            scrollViewHeight -= finalScrollBottomNode ? finalScrollBottomNode[0].height : 0;
            const additionHeight = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.convertToPx(this.autoHeightAddition);
            const finalHeight = scrollViewHeight + additionHeight - (this.insideMore ? 1 : 0) + "px !important";
            this.$set(this.scrollViewStyle, heightKey, finalHeight);
            this.$set(this.scrollViewInStyle, heightKey, finalHeight);
          }
        } else {
          this.$delete(this.scrollViewStyle, heightKey);
          this.$delete(this.scrollViewInStyle, heightKey);
        }
      } catch (e) {
      }
    },
    _updateInsideOfPaging() {
      this.insideMore && this.insideOfPaging === true && setTimeout(this.doLoadMore, 200);
    },
    _cleanTimeout(timeout) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      return timeout;
    },
    _onEmit() {
      common_vendor.index.$on(uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.errorUpdateKey, () => {
        this.loading && this.complete(false);
      });
      common_vendor.index.$on(uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.completeUpdateKey, (data) => {
        setTimeout(() => {
          if (this.loading) {
            if (!this.disabledCompleteEmit) {
              const type = data.type || "normal";
              const list = data.list || data;
              const rule = data.rule;
              this.fromCompleteEmit = true;
              switch (type) {
                case "normal":
                  this.complete(list);
                  break;
                case "total":
                  this.completeByTotal(list, rule);
                  break;
                case "nomore":
                  this.completeByNoMore(list, rule);
                  break;
                case "key":
                  this.completeByKey(list, rule);
                  break;
              }
            } else {
              this.disabledCompleteEmit = false;
            }
          }
        }, 1);
      });
    },
    _offEmit() {
      common_vendor.index.$off(uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.errorUpdateKey);
      common_vendor.index.$off(uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.completeUpdateKey);
    }
  }
};
exports._sfc_main = _sfc_main;
