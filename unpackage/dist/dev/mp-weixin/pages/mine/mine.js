"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const tuiIcon = () => "../../node-modules/thorui-uni/lib/thorui/tui-icon/tui-icon.js";
const tuiFooter = () => "../../node-modules/thorui-uni/lib/thorui/tui-footer/tui-footer.js";
const _sfc_main = {
  components: {
    tuiIcon,
    tuiFooter
  },
  data() {
    return {
      top: 0,
      // 标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0,
      isLogin: false,
      user: {
        img: "/static/未登录.png",
        // 默认头像路径
        title: "未登录"
      }
    };
  },
  onLoad() {
    const user = common_vendor.index.getStorageSync("user");
    if (user && user.title) {
      this.isLogin = true;
      this.user = user;
    } else {
      this.isLogin = false;
      this.user = {
        img: "/static/未登录.png",
        title: "未登录"
      };
    }
  },
  methods: {
    navigateTo() {
      if (!this.isLogin) {
        common_vendor.index.redirectTo({
          url: "/pages/login/login"
        });
      }
    },
    navigateToOrder() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "请先登录后使用",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/wodedingdan/wodedingdan"
      });
    },
    navigateToFavorites() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "请先登录后使用",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/wodeshoucan/wodeshoucan"
      });
    },
    navigateToHistory() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "请先登录后使用",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/lishifabu/lishifabu"
      });
    },
    contactUs() {
      common_vendor.index.showModal({
        title: "请联系",
        content: "邮箱:2072794161@qq.com"
      });
    },
    navigateToUserGuide() {
      common_vendor.index.navigateTo({
        url: "/pages/yonghuxvzhi/yonghuxvzhi"
      });
    },
    navigateToAddressManagement() {
      if (!this.isLogin) {
        common_vendor.index.showToast({
          title: "请先登录后使用",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/dizhiguanli/dizhiguanli"
      });
    },
    logout() {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出当前账号吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.removeStorageSync("user");
            this.isLogin = false;
            this.user = {
              img: "/static/未登录.png",
              title: "未登录"
            };
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.user.img,
    b: common_vendor.o((...args) => $options.navigateTo && $options.navigateTo(...args)),
    c: common_vendor.t($data.user.title),
    d: common_assets._imports_1,
    e: common_vendor.o((...args) => $options.navigateToOrder && $options.navigateToOrder(...args)),
    f: common_assets._imports_1$1,
    g: common_vendor.o((...args) => $options.navigateToFavorites && $options.navigateToFavorites(...args)),
    h: common_assets._imports_2$1,
    i: common_vendor.o((...args) => $options.navigateToHistory && $options.navigateToHistory(...args)),
    j: common_assets._imports_3$2,
    k: common_vendor.o((...args) => $options.contactUs && $options.contactUs(...args)),
    l: common_assets._imports_4$2,
    m: common_vendor.o((...args) => $options.navigateToUserGuide && $options.navigateToUserGuide(...args)),
    n: common_assets._imports_5$2,
    o: common_vendor.o((...args) => $options.navigateToAddressManagement && $options.navigateToAddressManagement(...args)),
    p: common_assets._imports_6$1,
    q: common_vendor.o((...args) => $options.contactUs && $options.contactUs(...args)),
    r: common_assets._imports_7$1,
    s: common_vendor.o((...args) => $options.contactUs && $options.contactUs(...args)),
    t: $data.isLogin
  }, $data.isLogin ? {
    v: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
