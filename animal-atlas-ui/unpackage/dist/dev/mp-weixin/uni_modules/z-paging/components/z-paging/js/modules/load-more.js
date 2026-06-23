"use strict";
const uni_modules_zPaging_components_zPaging_js_zPagingUtils = require("../z-paging-utils.js");
const uni_modules_zPaging_components_zPaging_js_zPagingEnum = require("../z-paging-enum.js");
const loadMoreModule = {
  props: {
    loadingMoreCustomStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreCustomStyle", {});
      }
    },
    loadingMoreTitleCustomStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreTitleCustomStyle", {});
      }
    },
    loadingMoreLoadingIconCustomStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreLoadingIconCustomStyle", {});
      }
    },
    loadingMoreLoadingIconType: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreLoadingIconType", "flower")
    },
    loadingMoreLoadingIconCustomImage: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreLoadingIconCustomImage", "")
    },
    loadingMoreLoadingAnimated: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreLoadingAnimated", true)
    },
    loadingMoreEnabled: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreEnabled", true)
    },
    toBottomLoadingMoreEnabled: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("toBottomLoadingMoreEnabled", true)
    },
    loadingMoreDefaultAsLoading: {
      type: [Boolean],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreDefaultAsLoading", false)
    },
    loadingMoreDefaultText: {
      type: [String, Object],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreDefaultText", null)
    },
    loadingMoreLoadingText: {
      type: [String, Object],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreLoadingText", null)
    },
    loadingMoreNoMoreText: {
      type: [String, Object],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreNoMoreText", null)
    },
    loadingMoreFailText: {
      type: [String, Object],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreFailText", null)
    },
    hideNoMoreInside: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("hideNoMoreInside", false)
    },
    hideNoMoreByLimit: {
      type: Number,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("hideNoMoreByLimit", 0)
    },
    showDefaultLoadingMoreText: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showDefaultLoadingMoreText", true)
    },
    showLoadingMoreNoMoreView: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showLoadingMoreNoMoreView", true)
    },
    showLoadingMoreNoMoreLine: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showLoadingMoreNoMoreLine", true)
    },
    loadingMoreNoMoreLineCustomStyle: {
      type: Object,
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("loadingMoreNoMoreLineCustomStyle", {});
      }
    },
    insideMore: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("insideMore", false)
    },
    lowerThreshold: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("lowerThreshold", "100rpx")
    }
  },
  data() {
    return {
      M: uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More,
      loadingStatus: uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Default,
      loadingStatusAfterRender: uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Default,
      loadingMoreTimeStamp: 0,
      loadingMoreDefaultSlot: null,
      showLoadingMore: false,
      customNoMore: -1
    };
  },
  computed: {
    zLoadMoreConfig() {
      return {
        status: this.loadingStatusAfterRender,
        defaultAsLoading: this.loadingMoreDefaultAsLoading,
        defaultThemeStyle: this.finalLoadingMoreThemeStyle,
        customStyle: this.loadingMoreCustomStyle,
        titleCustomStyle: this.loadingMoreTitleCustomStyle,
        iconCustomStyle: this.loadingMoreLoadingIconCustomStyle,
        loadingIconType: this.loadingMoreLoadingIconType,
        loadingIconCustomImage: this.loadingMoreLoadingIconCustomImage,
        loadingAnimated: this.loadingMoreLoadingAnimated,
        showNoMoreLine: this.showLoadingMoreNoMoreLine,
        noMoreLineCustomStyle: this.loadingMoreNoMoreLineCustomStyle,
        defaultText: this.finalLoadingMoreDefaultText,
        loadingText: this.finalLoadingMoreLoadingText,
        noMoreText: this.finalLoadingMoreNoMoreText,
        failText: this.finalLoadingMoreFailText,
        hideContent: !this.loadingMoreDefaultAsLoading && this.listRendering
      };
    },
    finalLoadingMoreThemeStyle() {
      return this.loadingMoreThemeStyle.length ? this.loadingMoreThemeStyle : this.defaultThemeStyle;
    },
    showLoadingMoreDefault() {
      return this._showLoadingMore("Default");
    },
    showLoadingMoreLoading() {
      return this._showLoadingMore("Loading");
    },
    showLoadingMoreNoMore() {
      return this._showLoadingMore("NoMore");
    },
    showLoadingMoreFail() {
      return this._showLoadingMore("Fail");
    },
    showLoadingMoreCustom() {
      return this._showLoadingMore("Custom");
    }
  },
  methods: {
    pageReachBottom() {
      !this.useChatRecordMode && this._onLoadingMore("toBottom");
    },
    doLoadMore(type) {
      this._onLoadingMore(type);
    },
    _checkScrolledToBottom(scrollDiff, checked = false) {
      if (this.checkScrolledToBottomTimeOut) {
        clearTimeout(this.checkScrolledToBottomTimeOut);
        this.checkScrolledToBottomTimeOut = null;
      }
      if (this.cacheScrollNodeHeight === -1) {
        this._getNodeClientRect(".zp-scroll-view").then((res) => {
          if (res) {
            const pageScrollNodeHeight = res[0].height;
            this.cacheScrollNodeHeight = pageScrollNodeHeight;
            if (scrollDiff - pageScrollNodeHeight <= this.finalLowerThreshold) {
              this._onLoadingMore("toBottom");
            }
          }
        });
      } else {
        if (scrollDiff - this.cacheScrollNodeHeight <= this.finalLowerThreshold) {
          this._onLoadingMore("toBottom");
        } else if (scrollDiff - this.cacheScrollNodeHeight <= 500 && !checked) {
          this.checkScrolledToBottomTimeOut = setTimeout(() => {
            this._getNodeClientRect(".zp-scroll-view", true, true).then((res) => {
              this.oldScrollTop = res[0].scrollTop;
              const newScrollDiff = res[0].scrollHeight - this.oldScrollTop;
              this._checkScrolledToBottom(newScrollDiff, true);
            });
          }, 150);
        }
      }
    },
    _onLoadingMore(from = "click") {
      if (from === "toBottom" && !this.scrollToBottomBounceEnabled && this.scrollEnable) {
        this.scrollEnable = false;
        this.$nextTick(() => {
          this.scrollEnable = true;
        });
      }
      this.$emit("scrolltolower", from);
      if (from === "toBottom" && (!this.toBottomLoadingMoreEnabled || this.useChatRecordMode))
        return;
      if (this.refresherOnly || !this.loadingMoreEnabled || !(this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Default || this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Fail) || this.loading)
        return;
      if (!this.isIos && !this.refresherOnly && !this.usePageScroll) {
        const currentTimestamp = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime();
        if (this.loadingMoreTimeStamp > 0 && currentTimestamp - this.loadingMoreTimeStamp < 100) {
          this.loadingMoreTimeStamp = 0;
          return;
        }
      }
      this._doLoadingMore();
    },
    _doLoadingMore() {
      if (this.pageNo >= this.defaultPageNo && this.loadingStatus !== uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore) {
        this.pageNo++;
        this._startLoading(false);
        if (this.isLocalPaging) {
          this._localPagingQueryList(this.pageNo, this.defaultPageSize, this.localPagingLoadingTime, (res) => {
            this.completeByTotal(res, this.totalLocalPagingList.length);
          });
        } else {
          this._emitQuery(this.pageNo, this.defaultPageSize, uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.QueryFrom.LoadingMore);
          this._callMyParentQuery();
        }
        this.loadingType = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.LoadingType.LoadingMore;
      }
    },
    _preCheckShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode) {
      if (this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore && this.hideNoMoreByLimit > 0 && newVal.length) {
        this.showLoadingMore = newVal.length > this.hideNoMoreByLimit;
      } else if (this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore && this.hideNoMoreInside && newVal.length || this.insideMore && this.insideOfPaging !== false && newVal.length) {
        this.$nextTick(() => {
          this._checkShowNoMoreInside(newVal, scrollViewNode, pagingContainerNode);
        });
        if (this.insideMore && this.insideOfPaging !== false && newVal.length) {
          this.showLoadingMore = newVal.length;
        }
      } else {
        this.showLoadingMore = newVal.length;
      }
    },
    async _checkShowNoMoreInside(totalData, oldScrollViewNode, oldPagingContainerNode) {
      try {
        const scrollViewNode = oldScrollViewNode || await this._getNodeClientRect(".zp-scroll-view");
        if (this.usePageScroll) {
          if (scrollViewNode) {
            const scrollViewTotalH = scrollViewNode[0].top + scrollViewNode[0].height;
            this.insideOfPaging = scrollViewTotalH < this.windowHeight;
            if (this.hideNoMoreInside) {
              this.showLoadingMore = !this.insideOfPaging;
            }
            this._updateInsideOfPaging();
          }
        } else {
          const pagingContainerNode = oldPagingContainerNode || await this._getNodeClientRect(".zp-paging-container-content");
          const pagingContainerH = pagingContainerNode ? pagingContainerNode[0].height : 0;
          const scrollViewH = scrollViewNode ? scrollViewNode[0].height : 0;
          this.insideOfPaging = pagingContainerH < scrollViewH;
          if (this.hideNoMoreInside) {
            this.showLoadingMore = !this.insideOfPaging;
          }
          this._updateInsideOfPaging();
        }
      } catch (e) {
        this.insideOfPaging = !totalData.length;
        if (this.hideNoMoreInside) {
          this.showLoadingMore = !this.insideOfPaging;
        }
        this._updateInsideOfPaging();
      }
    },
    _showLoadingMore(type) {
      if (!this.showLoadingMoreWhenReload && (!(this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Default ? this.nShowBottom : true) || !this.realTotalData.length))
        return false;
      if ((!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Loading) && !this.showLoadingMore || !this.loadingMoreEnabled && (!this.showLoadingMoreWhenReload || this.isUserPullDown || this.loadingStatus !== uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Loading) || this.refresherOnly) {
        return false;
      }
      if (this.useChatRecordMode && type !== "Loading")
        return false;
      if (!this.$slots)
        return false;
      if (type === "Custom") {
        return this.showDefaultLoadingMoreText && !(this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore && !this.showLoadingMoreNoMoreView);
      }
      const res = this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More[type] && this.$slots[`loadingMore${type}`] && (type === "NoMore" ? this.showLoadingMoreNoMoreView : true);
      return res;
    }
  }
};
exports.loadMoreModule = loadMoreModule;
