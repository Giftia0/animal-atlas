"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
const store_user = require("./store/user.js");
if (!Math) {
  "./pages/Atlas/Atlas.js";
  "./pages/MyInfo/MyInfo.js";
  "./pages/LoginPage/LoginPage.js";
  "./pages/AnimalDetail/AnimalDetail.js";
  "./pages/ForumPage/ForumPage.js";
  "./pages/SettingPage/SettingPage.js";
  "./pages/UpdateAnimal/UpdateAnimal.js";
  "./pages/EditPost/EditPost.js";
  "./pages/PostPage/PostPage.js";
  "./pages/PersonInfo/PersonInfo.js";
  "./pages/AnimalIdentification/AnimalIdentification.js";
  "./pages/WebView/WebView.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    store_user.userStore().getUserInfo();
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/workspace/Project/animal-atlas/animal-atlas-ui/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
