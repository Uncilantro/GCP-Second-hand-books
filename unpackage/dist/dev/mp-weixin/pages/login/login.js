"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    const isUsernameMoved = common_vendor.ref(false);
    const isPasswordMoved = common_vendor.ref(false);
    common_vendor.useRouter();
    const accountData = common_vendor.ref([]);
    function handleLogin() {
      if (!accountData.value.length) {
        common_vendor.index.showToast({
          title: "账号数据未加载",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      const account = accountData.value.find((item) => item.content.account === username.value);
      if (account) {
        if (account.content.password === password.value) {
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success",
            duration: 1e3
          });
          common_vendor.index.setStorageSync("user", {
            img: account.content.img,
            title: account.content.title
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/mine/mine"
            });
          }, 1e3);
        } else {
          common_vendor.index.showToast({
            title: "密码错误",
            icon: "none",
            duration: 2e3
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "用户名不存在",
          icon: "none",
          duration: 2e3
        });
      }
    }
    function moveLabel(inputType) {
      if (inputType === "username") {
        isUsernameMoved.value = true;
      } else if (inputType === "password") {
        isPasswordMoved.value = true;
      }
    }
    function resetLabel(inputType) {
      if (inputType === "username" && !username.value) {
        isUsernameMoved.value = false;
      } else if (inputType === "password" && !password.value) {
        isPasswordMoved.value = false;
      }
    }
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "http://localhost:3000/api/login",
        method: "GET",
        success: (res) => {
          if (Array.isArray(res.data)) {
            accountData.value = res.data;
          } else if (res.data && Array.isArray(res.data.data)) {
            accountData.value = res.data.data;
          } else {
            accountData.value = [];
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "获取账号数据失败",
            icon: "none"
          });
          accountData.value = [];
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => moveLabel("username")),
        b: common_vendor.o(($event) => resetLabel("username")),
        c: username.value,
        d: common_vendor.o(($event) => username.value = $event.detail.value),
        e: isUsernameMoved.value ? 1 : "",
        f: common_vendor.o(($event) => moveLabel("password")),
        g: common_vendor.o(($event) => resetLabel("password")),
        h: password.value,
        i: common_vendor.o(($event) => password.value = $event.detail.value),
        j: isPasswordMoved.value ? 1 : "",
        k: common_vendor.o(handleLogin),
        l: common_vendor.o(handleLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
