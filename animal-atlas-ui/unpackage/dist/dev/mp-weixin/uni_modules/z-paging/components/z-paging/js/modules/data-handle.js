"use strict";
const common_vendor = require("../../../../../../common/vendor.js");
const uni_modules_zPaging_components_zPaging_js_zPagingUtils = require("../z-paging-utils.js");
const uni_modules_zPaging_components_zPaging_js_zPagingConstant = require("../z-paging-constant.js");
const uni_modules_zPaging_components_zPaging_js_zPagingEnum = require("../z-paging-enum.js");
const uni_modules_zPaging_components_zPaging_js_zPagingInterceptor = require("../z-paging-interceptor.js");
const dataHandleModule = {
  props: {
    defaultPageNo: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("defaultPageNo", 1),
      observer: function(newVal) {
        this.pageNo = newVal;
      }
    },
    defaultPageSize: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("defaultPageSize", 10),
      validator: (value) => {
        if (value <= 0)
          uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.consoleErr("default-page-size\u5FC5\u987B\u5927\u4E8E0\uFF01");
        return value > 0;
      }
    },
    dataKey: {
      type: [Number, String, Object],
      default: function() {
        return uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("dataKey", null);
      }
    },
    useCache: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("useCache", false)
    },
    cacheKey: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("cacheKey", null)
    },
    cacheMode: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("cacheMode", uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.CacheMode.Default)
    },
    autowireListName: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autowireListName", "")
    },
    autowireQueryName: {
      type: String,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autowireQueryName", "")
    },
    auto: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("auto", true)
    },
    reloadWhenRefresh: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("reloadWhenRefresh", true)
    },
    autoScrollToTopWhenReload: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoScrollToTopWhenReload", true)
    },
    autoCleanListWhenReload: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoCleanListWhenReload", true)
    },
    showRefresherWhenReload: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showRefresherWhenReload", false)
    },
    showLoadingMoreWhenReload: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("showLoadingMoreWhenReload", false)
    },
    createdReload: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("createdReload", false)
    },
    localPagingLoadingTime: {
      type: [Number, String],
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("localPagingLoadingTime", 200)
    },
    useChatRecordMode: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("useChatRecordMode", false)
    },
    autoHideKeyboardWhenChat: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("autoHideKeyboardWhenChat", true)
    },
    concat: {
      type: Boolean,
      default: uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.gc("concat", true)
    },
    value: {
      type: Array,
      default: function() {
        return [];
      }
    },
    modelValue: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      currentData: [],
      totalData: [],
      realTotalData: [],
      totalLocalPagingList: [],
      dataPromiseResultMap: {
        reload: null,
        complete: null,
        localPaging: null
      },
      isSettingCacheList: false,
      pageNo: 1,
      currentRefreshPageSize: 0,
      isLocalPaging: false,
      isAddedData: false,
      isTotalChangeFromAddData: false,
      privateConcat: true,
      myParentQuery: -1,
      firstPageLoaded: false,
      pagingLoaded: false,
      loaded: false,
      isUserReload: true,
      fromEmptyViewReload: false,
      queryFrom: "",
      listRendering: false,
      listRenderingTimeout: null
    };
  },
  computed: {
    pageSize() {
      return this.defaultPageSize;
    },
    finalConcat() {
      return this.concat && this.privateConcat;
    },
    finalUseCache() {
      if (this.useCache && !this.cacheKey) {
        uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.consoleErr("use-cache\u4E3Atrue\u65F6\uFF0C\u5FC5\u987B\u8BBE\u7F6Ecache-key\uFF0C\u5426\u5219\u7F13\u5B58\u65E0\u6548\uFF01");
      }
      return this.useCache && !!this.cacheKey;
    },
    finalCacheKey() {
      return this.cacheKey ? `${uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.cachePrefixKey}-${this.cacheKey}` : null;
    },
    isFirstPage() {
      return this.pageNo === this.defaultPageNo;
    }
  },
  watch: {
    totalData(newVal, oldVal) {
      this._totalDataChange(newVal, oldVal);
    },
    currentData(newVal, oldVal) {
      this._currentDataChange(newVal, oldVal);
    },
    useChatRecordMode(newVal, oldVal) {
      if (newVal) {
        this.nLoadingMoreFixedHeight = false;
      }
    },
    value: {
      handler(newVal) {
        this.realTotalData = newVal;
      },
      immediate: true
    },
    modelValue: {
      handler(newVal) {
        this.realTotalData = newVal;
      },
      immediate: true
    }
  },
  methods: {
    complete(data, success = true) {
      this.customNoMore = -1;
      return this.addData(data, success);
    },
    completeByKey(data, dataKey = null, success = true) {
      if (dataKey !== null && this.dataKey !== null && dataKey !== this.dataKey) {
        this.isFirstPage && this.endRefresh();
        return new Promise((resolve) => resolve());
      }
      this.customNoMore = -1;
      return this.addData(data, success);
    },
    completeByTotal(data, total, success = true) {
      if (total == "undefined") {
        this.customNoMore = -1;
      } else {
        const dataTypeRes = this._checkDataType(data, success, false);
        data = dataTypeRes.data;
        success = dataTypeRes.success;
        if (total >= 0 && success) {
          return new Promise((resolve, reject) => {
            this.$nextTick(() => {
              let nomore = false;
              const realTotalDataCount = this.pageNo == this.defaultPageNo ? 0 : this.realTotalData.length;
              const dataLength = this.privateConcat ? data.length : 0;
              let exceedCount = realTotalDataCount + dataLength - total;
              if (exceedCount >= 0) {
                nomore = true;
                exceedCount = this.defaultPageSize - exceedCount;
                if (this.privateConcat && exceedCount > 0 && exceedCount < data.length) {
                  data = data.splice(0, exceedCount);
                }
              }
              this.completeByNoMore(data, nomore, success).then((res) => resolve(res)).catch(() => reject());
            });
          });
        }
      }
      return this.addData(data, success);
    },
    completeByNoMore(data, nomore, success = true) {
      if (nomore != "undefined") {
        this.customNoMore = nomore == true ? 1 : 0;
      }
      return this.addData(data, success);
    },
    addData(data, success = true) {
      if (!this.fromCompleteEmit) {
        this.disabledCompleteEmit = true;
        this.fromCompleteEmit = false;
      }
      const currentTimeStamp = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime();
      const disTime = currentTimeStamp - this.requestTimeStamp;
      let minDelay = this.minDelay;
      if (this.isFirstPage && this.finalShowRefresherWhenReload) {
        minDelay = Math.max(400, minDelay);
      }
      const addDataDalay = this.requestTimeStamp > 0 && disTime < minDelay ? minDelay - disTime : 0;
      this.$nextTick(() => {
        setTimeout(() => {
          this._addData(data, success, false);
        }, this.delay > 0 ? this.delay : addDataDalay);
      });
      return new Promise((resolve, reject) => {
        this.dataPromiseResultMap.complete = { resolve, reject };
      });
    },
    addDataFromTop(data, toTop = true, toTopWithAnimate = true) {
      data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
      this.totalData = [...data, ...this.totalData];
      if (toTop) {
        setTimeout(() => {
          this._scrollToTop(toTopWithAnimate);
        }, uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.delayTime);
      }
    },
    resetTotalData(data) {
      this.isTotalChangeFromAddData = true;
      data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
      this.totalData = data;
    },
    addChatRecordData(data, toBottom = true, toBottomWithAnimate = true) {
      data = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
      if (!this.useChatRecordMode)
        return;
      this.isTotalChangeFromAddData = true;
      this.totalData = [...this.totalData, ...data];
      if (toBottom) {
        setTimeout(() => {
          this._scrollToBottom(toBottomWithAnimate);
        }, uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.delayTime);
      }
    },
    setLocalPaging(data, success = true) {
      this.isLocalPaging = true;
      this.$nextTick(() => {
        this._addData(data, success, true);
      });
      return new Promise((resolve, reject) => {
        this.dataPromiseResultMap.localPaging = { resolve, reject };
      });
    },
    reload(animate = this.showRefresherWhenReload) {
      if (animate) {
        this.privateShowRefresherWhenReload = animate;
        this.isUserPullDown = true;
      }
      if (!this.showLoadingMoreWhenReload) {
        this.listRendering = true;
      }
      this.$nextTick(() => {
        this._preReload(animate, false);
      });
      return new Promise((resolve, reject) => {
        this.dataPromiseResultMap.reload = { resolve, reject };
      });
    },
    refresh() {
      if (!this.realTotalData.length)
        return this.reload();
      const disPageNo = this.pageNo - this.defaultPageNo + 1;
      if (disPageNo >= 1) {
        this.loading = true;
        this.privateConcat = false;
        const totalPageSize = disPageNo * this.pageSize;
        this.currentRefreshPageSize = totalPageSize;
        this._emitQuery(this.defaultPageNo, totalPageSize, uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.QueryFrom.Refresh);
        this._callMyParentQuery(this.defaultPageNo, totalPageSize);
      }
      return new Promise((resolve, reject) => {
        this.dataPromiseResultMap.reload = { resolve, reject };
      });
    },
    updateCache() {
      if (this.finalUseCache && this.totalData.length) {
        this._saveLocalCache(this.totalData.slice(0, Math.min(this.totalData.length, this.pageSize)));
      }
    },
    clean() {
      this._reload(true);
      this._addData([], true, false);
    },
    clear() {
      this.clean();
    },
    doChatRecordLoadMore() {
      this.useChatRecordMode && this._onLoadingMore("click");
    },
    _preReload(animate = this.showRefresherWhenReload, isFromMounted = true) {
      this.isUserReload = true;
      this.loadingType = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.LoadingType.Refresher;
      if (animate) {
        this.privateShowRefresherWhenReload = animate;
        if (this.useCustomRefresher) {
          this._doRefresherRefreshAnimate();
        } else {
          this.refresherTriggered = true;
        }
      } else {
        this._refresherEnd(false, false, false, false);
      }
      this._reload(false, isFromMounted);
    },
    _reload(isClean = false, isFromMounted = false, isUserPullDown = false) {
      this.isAddedData = false;
      this.insideOfPaging = -1;
      this.cacheScrollNodeHeight = -1;
      this.pageNo = this.defaultPageNo;
      this._cleanRefresherEndTimeout();
      !this.privateShowRefresherWhenReload && !isClean && this._startLoading(true);
      this.firstPageLoaded = true;
      this.isTotalChangeFromAddData = false;
      if (!this.isSettingCacheList) {
        this.totalData = [];
      }
      if (!isClean) {
        this._emitQuery(this.pageNo, this.defaultPageSize, isUserPullDown ? uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.QueryFrom.UserPullDown : uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.QueryFrom.Reload);
        let delay = 0;
        setTimeout(this._callMyParentQuery, delay);
        if (!isFromMounted && this.autoScrollToTopWhenReload) {
          this._scrollToTop(false);
        }
      }
      this.$nextTick(() => {
      });
    },
    _addData(data, success, isLocal) {
      this.isAddedData = true;
      this.fromEmptyViewReload = false;
      this.isTotalChangeFromAddData = true;
      this.refresherTriggered = false;
      this._endSystemLoadingAndRefresh();
      const tempIsUserPullDown = this.isUserPullDown;
      if (this.showRefresherUpdateTime && this.isFirstPage) {
        uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.setRefesrherTime(uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime(), this.refresherUpdateTimeKey);
        this.$refs.refresh && this.$refs.refresh.updateTime();
      }
      if (!isLocal && tempIsUserPullDown && this.isFirstPage) {
        this.isUserPullDown = false;
      }
      let dataTypeRes = this._checkDataType(data, success, isLocal);
      data = dataTypeRes.data;
      success = dataTypeRes.success;
      let delayTime = uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.delayTime;
      this.loadingForNow = false;
      setTimeout(() => {
        this.pagingLoaded = true;
        this.$nextTick(() => {
          !isLocal && this._refresherEnd(delayTime > 0, true, tempIsUserPullDown);
        });
      }, delayTime);
      if (this.isFirstPage) {
        this.isLoadFailed = !success;
        this.$emit("isLoadFailedChange", this.isLoadFailed);
        if (this.finalUseCache && success && (this.cacheMode === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.CacheMode.Always ? true : this.isSettingCacheList)) {
          this._saveLocalCache(data);
        }
      }
      this.isSettingCacheList = false;
      if (success) {
        if (!(this.privateConcat === false && this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore)) {
          this.loadingStatus = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Default;
        }
        if (isLocal) {
          this.totalLocalPagingList = data;
          const localPageNo = this.defaultPageNo;
          const localPageSize = this.queryFrom !== uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.QueryFrom.Refresh ? this.defaultPageSize : this.currentRefreshPageSize;
          this._localPagingQueryList(localPageNo, localPageSize, 0, (res) => {
            this.completeByTotal(res, this.totalLocalPagingList.length);
          });
        } else {
          let dataChangeDelayTime = 0;
          setTimeout(() => {
            this._currentDataChange(data, this.currentData);
            this._callDataPromise(true, this.totalData);
          }, dataChangeDelayTime);
        }
      } else {
        this._currentDataChange(data, this.currentData);
        this._callDataPromise(false);
        this.loadingStatus = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.Fail;
        if (this.loadingType === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.LoadingType.LoadingMore) {
          this.pageNo--;
        }
      }
    },
    _totalDataChange(newVal, oldVal, eventThrow = true) {
      if ((!this.isUserReload || !this.autoCleanListWhenReload) && this.firstPageLoaded && !newVal.length && oldVal.length) {
        return;
      }
      this._doCheckScrollViewShouldFullHeight(newVal);
      if (!this.realTotalData.length && !newVal.length) {
        eventThrow = false;
      }
      this.realTotalData = newVal;
      if (eventThrow) {
        this.$emit("input", newVal);
        this.$emit("update:modelValue", newVal);
        this.$emit("update:list", newVal);
        this.$emit("listChange", newVal);
        this._callMyParentList(newVal);
      }
      this.firstPageLoaded = false;
      this.isTotalChangeFromAddData = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this._getNodeClientRect(".zp-paging-container-content").then((res) => {
            res && this.$emit("contentHeightChanged", res[0].height);
          });
        }, this.isIos ? 100 : 300);
      });
    },
    _currentDataChange(newVal, oldVal) {
      newVal = [...newVal];
      if (!this.isFirstPage) {
        this.listRendering = true;
        this.listRenderingTimeout && clearTimeout(this.listRenderingTimeout);
        this.$nextTick(() => {
          this.listRenderingTimeout = setTimeout(() => {
            this.listRendering = false;
          }, uni_modules_zPaging_components_zPaging_js_zPagingConstant.c.delayTime);
        });
      } else {
        this.listRendering = false;
      }
      this.finalUseVirtualList && this._setCellIndex(newVal, this.totalData.length === 0);
      this.useChatRecordMode && newVal.reverse();
      if (this.isFirstPage && this.finalConcat) {
        this.totalData = [];
      }
      if (this.customNoMore !== -1) {
        if (this.customNoMore === 1 || !newVal.length) {
          this.loadingStatus = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore;
        }
      } else {
        if (!newVal.length || newVal.length && newVal.length < this.defaultPageSize) {
          this.loadingStatus = uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore;
        }
      }
      if (!this.totalData.length) {
        if (this.finalConcat) {
          this.totalData = newVal;
        }
        if (this.useChatRecordMode) {
          this.$nextTick(() => {
            this._scrollToBottom(false);
          });
        }
      } else {
        if (this.useChatRecordMode) {
          const idIndex = newVal.length;
          let idIndexStr = `z-paging-${idIndex}`;
          this.totalData = [...newVal, ...this.totalData];
          if (this.pageNo !== this.defaultPageNo) {
            this.privateScrollWithAnimation = 0;
            this.$emit("update:chatIndex", idIndex);
            setTimeout(() => {
              this._scrollIntoView(idIndexStr, 30 + Math.max(0, this.cacheTopHeight), false, () => {
                this.$emit("update:chatIndex", 0);
              });
            }, this.usePageScroll ? this.isIos ? 50 : 100 : 200);
          } else {
            this.$nextTick(() => {
              this._scrollToBottom(false);
            });
          }
        } else {
          if (this.finalConcat) {
            const currentScrollTop = this.oldScrollTop;
            this.totalData = [...this.totalData, ...newVal];
            if (!this.isIos && !this.refresherOnly && !this.usePageScroll && newVal.length) {
              this.loadingMoreTimeStamp = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime();
              this.$nextTick(() => {
                this.scrollToY(currentScrollTop);
              });
            }
          } else {
            this.totalData = newVal;
          }
        }
      }
      this.privateConcat = true;
    },
    _localPagingQueryList(pageNo, pageSize, localPagingLoadingTime, callback) {
      pageNo = Math.max(1, pageNo);
      pageSize = Math.max(1, pageSize);
      const totalPagingList = [...this.totalLocalPagingList];
      const pageNoIndex = (pageNo - 1) * pageSize;
      const finalPageNoIndex = Math.min(totalPagingList.length, pageNoIndex + pageSize);
      const resultPagingList = totalPagingList.splice(pageNoIndex, finalPageNoIndex - pageNoIndex);
      setTimeout(() => callback(resultPagingList), localPagingLoadingTime);
    },
    _saveLocalCache(data) {
      common_vendor.index.setStorageSync(this.finalCacheKey, data);
    },
    _setListByLocalCache() {
      this.totalData = common_vendor.index.getStorageSync(this.finalCacheKey) || [];
      this.isSettingCacheList = true;
    },
    _callMyParentList(newVal) {
      if (this.autowireListName.length) {
        const myParent = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getParent(this.$parent);
        if (myParent && myParent[this.autowireListName]) {
          myParent[this.autowireListName] = newVal;
        }
      }
    },
    _callMyParentQuery(customPageNo = 0, customPageSize = 0) {
      if (this.autowireQueryName) {
        if (this.myParentQuery === -1) {
          const myParent = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getParent(this.$parent);
          if (myParent && myParent[this.autowireQueryName]) {
            this.myParentQuery = myParent[this.autowireQueryName];
          }
        }
        if (this.myParentQuery !== -1) {
          customPageSize > 0 ? this.myParentQuery(customPageNo, customPageSize) : this.myParentQuery(this.pageNo, this.defaultPageSize);
        }
      }
    },
    _emitQuery(pageNo, pageSize, from) {
      this.queryFrom = from;
      this.requestTimeStamp = uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.getTime();
      this.$emit("query", ...uni_modules_zPaging_components_zPaging_js_zPagingInterceptor.interceptor._handleQuery(pageNo, pageSize, from));
    },
    _callDataPromise(success, totalList) {
      for (const key in this.dataPromiseResultMap) {
        const obj = this.dataPromiseResultMap[key];
        success ? !!obj && obj.resolve({ totalList, noMore: this.loadingStatus === uni_modules_zPaging_components_zPaging_js_zPagingEnum.Enum.More.NoMore }) : !!obj && obj.reject();
      }
    },
    _checkDataType(data, success, isLocal) {
      const dataType = Object.prototype.toString.call(data);
      if (dataType === "[object Boolean]") {
        success = data;
        data = [];
      } else if (dataType === "[object Null]") {
        data = [];
      } else if (dataType !== "[object Array]") {
        data = [];
        if (dataType !== "[object Undefined]") {
          uni_modules_zPaging_components_zPaging_js_zPagingUtils.u.consoleErr(`${isLocal ? "setLocalPaging" : "complete"}\u53C2\u6570\u7C7B\u578B\u4E0D\u6B63\u786E\uFF0C\u7B2C\u4E00\u4E2A\u53C2\u6570\u7C7B\u578B\u5FC5\u987B\u4E3AArray!`);
        }
      }
      return { data, success };
    }
  }
};
exports.dataHandleModule = dataHandleModule;
