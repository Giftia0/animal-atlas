"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_zPaging_components_zPaging_js_zPagingUtils = require("../z-paging-utils.js");
const uni_modules_zPaging_components_zPaging_js_zPagingEnum = require("../z-paging-enum.js");
const scrollerModule = {
  props: {
    usePageScroll: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("usePageScroll", false)
    },
    scrollable: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollable", true)
    },
    showScrollbar: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showScrollbar", true)
    },
    scrollX: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollX", false)
    },
    scrollToTopBounceEnabled: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollToTopBounceEnabled", false)
    },
    scrollToBottomBounceEnabled: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollToBottomBounceEnabled", true)
    },
    scrollWithAnimation: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollWithAnimation", false)
    },
    scrollIntoView: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("scrollIntoView", "")
    }
  },
  data() {
    return {
      scrollTop: 0,
      oldScrollTop: 0,
      scrollViewStyle: {},
      scrollViewContainerStyle: {},
      scrollViewInStyle: {},
      pageScrollTop: -1,
      scrollEnable: true,
      privateScrollWithAnimation: -1,
      cacheScrollNodeHeight: -1
    };
  },
  watch: {
    oldScrollTop(newVal) {
      !this.usePageScroll && this._scrollTopChange(newVal, false);
    },
    pageScrollTop(newVal) {
      this.usePageScroll && this._scrollTopChange(newVal, true);
    },
    usePageScroll: {
      handler(newVal) {
        this.loaded && this.autoHeight && this._setAutoHeight(!newVal);
      },
      immediate: true
    },
    finalScrollTop(newVal) {
      if (!this.useChatRecordMode) {
        this.renderPropScrollTop = newVal < 6 ? 0 : 10;
      }
    }
  },
  computed: {
    finalScrollWithAnimation() {
      if (this.privateScrollWithAnimation !== -1) {
        const scrollWithAnimation = this.privateScrollWithAnimation === 1;
        this.privateScrollWithAnimation = -1;
        return scrollWithAnimation;
      }
      return this.scrollWithAnimation;
    },
    finalScrollViewStyle() {
      if (this.superContentZIndex != 1) {
        this.scrollViewStyle["z-index"] = this.superContentZIndex;
        this.scrollViewStyle["position"] = "relative";
      }
      return this.scrollViewStyle;
    },
    finalScrollTop() {
      return this.usePageScroll ? this.pageScrollTop : this.oldScrollTop;
    },
    finalIsOldWebView() {
      return this.isOldWebView && !this.usePageScroll;
    }
  },
  methods: {
    scrollToTop(animate, checkReverse = true) {
      this.$nextTick(() => {
        this._scrollToTop(animate, false);
      });
    },
    scrollToBottom(animate, checkReverse = true) {
      this.$nextTick(() => {
        this._scrollToBottom(animate);
      });
    },
    scrollIntoViewById(sel, offset, animate) {
      this._scrollIntoView(sel, offset, animate);
    },
    scrollIntoViewByNodeTop(nodeTop, offset, animate) {
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(() => {
        this._scrollIntoViewByNodeTop(nodeTop, offset, animate);
      });
    },
    scrollToY(y, offset, animate) {
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(() => {
        this._scrollToY(y, offset, animate);
      });
    },
    scrollIntoViewByIndex(index, offset, animate) {
      this._scrollIntoView(index, offset, animate);
    },
    scrollIntoViewByView(view, offset, animate) {
      this._scrollIntoView(view, offset, animate);
    },
    updatePageScrollTop(value) {
      this.pageScrollTop = value;
    },
    updatePageScrollTopHeight() {
      this._updatePageScrollTopOrBottomHeight("top");
    },
    updatePageScrollBottomHeight() {
      this._updatePageScrollTopOrBottomHeight("bottom");
    },
    updateLeftAndRightWidth() {
      if (!this.finalIsOldWebView)
        return;
      this.$nextTick(() => this._updateLeftAndRightWidth(this.scrollViewContainerStyle, "zp-page"));
    },
    updateScrollViewScrollTop(scrollTop, animate = true) {
      this.privateScrollWithAnimation = animate ? 1 : 0;
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(() => {
        this.scrollTop = scrollTop;
        this.oldScrollTop = this.scrollTop;
      });
    },
    _onScrollToUpper() {
      this.$emit("scrolltoupper");
      this.$emit("scrollTopChange", 0);
      this.$nextTick(() => {
        this.oldScrollTop = 0;
      });
      if (!this.useChatRecordMode || this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore)
        return;
      this._onLoadingMore("click");
    },
    _onScrollToLower(e) {
      (!e.detail || !e.detail.direction || e.detail.direction === "bottom") && this._onLoadingMore("toBottom");
    },
    _scrollToTop(animate = true, isPrivate = true) {
      if (this.usePageScroll) {
        this.$nextTick(() => {
          common_vendor.index.pageScrollTo({
            scrollTop: 0,
            duration: animate ? 100 : 0
          });
        });
        return;
      }
      this.privateScrollWithAnimation = animate ? 1 : 0;
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(() => {
        this.scrollTop = 0;
        this.oldScrollTop = this.scrollTop;
      });
    },
    async _scrollToBottom(animate = true) {
      if (this.usePageScroll) {
        this.$nextTick(() => {
          common_vendor.index.pageScrollTo({
            scrollTop: Number.MAX_VALUE,
            duration: animate ? 100 : 0
          });
        });
        return;
      }
      try {
        this.privateScrollWithAnimation = animate ? 1 : 0;
        const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container");
        const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
        const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
        const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
        if (pagingContainerH > scrollViewH) {
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            this.scrollTop = pagingContainerH - scrollViewH + this.virtualPlaceholderTopHeight;
            this.oldScrollTop = this.scrollTop;
          });
        }
      } catch (e) {
      }
    },
    _scrollIntoView(sel, offset = 0, animate = false, finishCallback) {
      try {
        this.scrollTop = this.oldScrollTop;
        this.$nextTick(() => {
          this._getNodeClientRect("#" + sel.replace("#", ""), this.$parent).then((node) => {
            if (node) {
              let nodeTop = node[0].top;
              this._scrollIntoViewByNodeTop(nodeTop, offset, animate);
              finishCallback && finishCallback();
            }
          });
        });
      } catch (e) {
      }
    },
    _scrollIntoViewByNodeTop(nodeTop, offset = 0, animate = false) {
      this._scrollToY(nodeTop, offset, animate, true);
    },
    _scrollToY(y, offset = 0, animate = false, addScrollTop = false) {
      this.privateScrollWithAnimation = animate ? 1 : 0;
      if (this.usePageScroll) {
        common_vendor.index.pageScrollTo({
          scrollTop: y - offset,
          duration: animate ? 100 : 0
        });
      } else {
        if (addScrollTop) {
          y += this.oldScrollTop;
        }
        this.scrollTop = y - offset;
        this.oldScrollTop = this.scrollTop;
      }
    },
    _scroll(e) {
      this.$emit("scroll", e);
      const scrollTop = e.detail.scrollTop;
      this.finalUseVirtualList && this._updateVirtualScroll(scrollTop, this.oldScrollTop - scrollTop);
      this.oldScrollTop = scrollTop;
      const scrollDiff = e.detail.scrollHeight - this.oldScrollTop;
      !this.isIos && this._checkScrolledToBottom(scrollDiff);
    },
    _doCheckScrollViewShouldFullHeight(totalData) {
      if (this.autoFullHeight && this.usePageScroll && this.isTotalChangeFromAddData) {
        this.$nextTick(() => {
          this._checkScrollViewShouldFullHeight((scrollViewNode, pagingContainerNode) => {
            this._preCheckShowNoMoreInside(totalData, scrollViewNode, pagingContainerNode);
          });
        });
      } else {
        this._preCheckShowNoMoreInside(totalData);
      }
    },
    async _checkScrollViewShouldFullHeight(callback) {
      try {
        const scrollViewNode = await this._getNodeClientRect(".zp-scroll-view");
        const pagingContainerNode = await this._getNodeClientRect(".zp-paging-container-content");
        if (!scrollViewNode || !pagingContainerNode)
          return;
        const scrollViewHeight = pagingContainerNode[0].height;
        const scrollViewTop = scrollViewNode[0].top;
        if (this.isAddedData && scrollViewHeight + scrollViewTop <= this.windowHeight) {
          this._setAutoHeight(true, scrollViewNode);
          callback(scrollViewNode, pagingContainerNode);
        } else {
          this._setAutoHeight(false);
          callback(null, null);
        }
      } catch (e) {
        callback(null, null);
      }
    },
    _scrollTopChange(newVal, isPageScrollTop) {
      this.$emit("scrollTopChange", newVal);
      this.$emit("update:scrollTop", newVal);
      this._checkShouldShowBackToTop(newVal);
      const scrollTop = this.isIos ? newVal > 5 ? 6 : 0 : newVal;
      if (isPageScrollTop) {
        this.wxsPageScrollTop = scrollTop;
      } else {
        this.wxsScrollTop = scrollTop;
      }
    },
    _updatePageScrollTopOrBottomHeight(type) {
      if (!this.usePageScroll)
        return;
      this._doCheckScrollViewShouldFullHeight(this.realTotalData);
      const node = `.zp-page-${type}`;
      const marginText = `margin${type.slice(0, 1).toUpperCase() + type.slice(1)}`;
      let safeAreaInsetBottomAdd = this.safeAreaInsetBottom;
      this.$nextTick(() => {
        let delayTime = 0;
        setTimeout(() => {
          this._getNodeClientRect(node).then((res) => {
            if (res) {
              let pageScrollNodeHeight = res[0].height;
              if (type === "bottom") {
                if (safeAreaInsetBottomAdd) {
                  pageScrollNodeHeight += this.safeAreaBottom;
                }
              } else {
                this.cacheTopHeight = pageScrollNodeHeight;
              }
              this.$set(this.scrollViewStyle, marginText, `${pageScrollNodeHeight}px`);
            } else if (safeAreaInsetBottomAdd) {
              this.$set(this.scrollViewStyle, marginText, `${this.safeAreaBottom}px`);
            }
          });
        }, delayTime);
      });
    }
  }
};
exports.scrollerModule = scrollerModule;
