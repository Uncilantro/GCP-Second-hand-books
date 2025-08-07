"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const tuiTabs = () => "../../node-modules/thorui-uni/lib/thorui/tui-tabs/tui-tabs.js";
const _sfc_main = {
  components: {
    tuiTabs
  },
  data() {
    return {
      currentTab: 0,
      tabs: [
        {
          name: "我要买书"
        },
        {
          name: "我要卖书"
        }
      ],
      fabuData: [],
      // fabu.js数据
      bookData: []
      // bookdate.js数据
    };
  },
  computed: {
    filteredData() {
      const typeMap = {
        0: "我要买书",
        1: "我要卖书"
      };
      if (!Array.isArray(this.fabuData))
        return [];
      return this.fabuData.filter((item) => item.type === typeMap[this.currentTab]);
    }
  },
  methods: {
    change(e) {
      this.currentTab = e.index;
    },
    addTofavorite(book) {
      common_vendor.index.__f__("log", "at pages/school/school.vue:64", "Adding to favorite:", book);
      let favorite = common_vendor.index.getStorageSync("myFavorite") || [];
      favorite.push(book);
      common_vendor.index.setStorageSync("myFavorite", favorite);
      common_vendor.index.showToast({
        title: "已添加到收藏夹",
        icon: "success"
      });
    }
  },
  onLoad() {
    const user = common_vendor.index.getStorageSync("user");
    if (!user || !user.title) {
      common_vendor.index.showToast({
        title: "该功能需要登录后使用",
        icon: "none",
        duration: 1500
      });
      setTimeout(() => {
        common_vendor.index.redirectTo({ url: "/pages/login/login" });
      }, 200);
      return;
    }
    common_vendor.index.request({
      url: "http://localhost:3000/api/fabu",
      method: "GET",
      success: (res) => {
        if (Array.isArray(res.data)) {
          this.fabuData = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          this.fabuData = res.data.data;
        } else {
          this.fabuData = [];
        }
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "获取发布数据失败",
          icon: "none"
        });
        this.fabuData = [];
      }
    });
    common_vendor.index.request({
      url: "http://localhost:3000/api/bookdate",
      method: "GET",
      success: (res) => {
        if (Array.isArray(res.data)) {
          this.bookData = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          this.bookData = res.data.data;
        } else {
          this.bookData = [];
        }
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "获取书籍数据失败",
          icon: "none"
        });
        this.bookData = [];
      }
    });
  }
};
if (!Array) {
  const _component_tui_tabs = common_vendor.resolveComponent("tui-tabs");
  _component_tui_tabs();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.change),
    b: common_vendor.p({
      sliderWidth: "150",
      sliderHeight: "80",
      sliderRadius: "25rpx",
      ["selected-color"]: "#fff",
      bold: "true",
      sliderBgColor: "#328d64",
      height: "90",
      tabs: $data.tabs,
      currentTab: $data.currentTab
    }),
    c: common_vendor.f($options.filteredData, (item, index, i0) => {
      return common_vendor.e({
        a: item.img,
        b: common_vendor.t(item.title),
        c: item.jiage !== void 0
      }, item.jiage !== void 0 ? {
        d: common_vendor.t(item.jiage)
      } : {}, {
        e: item.xiaoqv
      }, item.xiaoqv ? {
        f: common_vendor.t(item.xiaoqv)
      } : {}, {
        g: item.phone
      }, item.phone ? {
        h: common_vendor.t(item.phone)
      } : {}, {
        i: common_vendor.t(item.contact),
        j: item.image,
        k: common_vendor.o(($event) => $options.addTofavorite(item), index),
        l: index
      });
    }),
    d: common_assets._imports_1$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/school/school.js.map
