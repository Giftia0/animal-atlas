"use strict";
const common_vendor = require("../common/vendor.js");
const userStore = common_vendor.defineStore("user", {
  state: () => ({
    user: {
      id: "",
      role: "",
      phone: "",
      username: "",
      avatar: ""
    }
  }),
  getters: {},
  actions: {
    getUserInfo() {
      let token = common_vendor.index.getStorageSync("token");
      this.user = token == "" ? null : common_vendor.o(token);
    }
  }
});
exports.userStore = userStore;
