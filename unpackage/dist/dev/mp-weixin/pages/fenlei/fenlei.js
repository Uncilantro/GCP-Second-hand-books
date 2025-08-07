"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    dropxingxi() {
      common_vendor.index.navigateTo({
        url: "/pages/zhuanye/zhuanye"
      });
    },
    dropjidian() {
      common_vendor.index.navigateTo({
        url: "/pages/zhinengzhizhao/zhinengzhizhao"
      });
    },
    droptesu() {
      common_vendor.index.navigateTo({
        url: "/pages/teshujiaoyu/teshujiaoyu"
      });
    },
    droplvyou() {
      common_vendor.index.navigateTo({
        url: "/pages/lvyou/lvyou"
      });
    },
    dropshipin() {
      common_vendor.index.navigateTo({
        url: "/pages/shiping/shiping"
      });
    },
    dropshangwu() {
      common_vendor.index.navigateTo({
        url: "/pages/shuzishangmao/shuzishangmao"
      });
    },
    dropyishu() {
      common_vendor.index.navigateTo({
        url: "/pages/yishuyuxinmeiti/yishuyuxinmeiti"
      });
    },
    dropguanli() {
      common_vendor.index.navigateTo({
        url: "/pages/gonggongguanli/gonggongguanli"
      });
    },
    dropchengjian() {
      common_vendor.index.navigateTo({
        url: "/pages/zhihuichengjian/zhihuichengjian"
      });
    },
    dropguangshang() {
      common_vendor.index.navigateTo({
        url: "/pages/guangshangyue/guangshangyue"
      });
    },
    dropwangchuan() {
      common_vendor.index.navigateTo({
        url: "/pages/wangluoxinwenyuchuanbo/wangluoxinwenyuchuanbo"
      });
    },
    dropqita() {
      common_vendor.index.navigateTo({
        url: "/pages/qita/qita"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$4,
    b: common_vendor.o((...args) => $options.dropxingxi && $options.dropxingxi(...args)),
    c: common_assets._imports_1$2,
    d: common_vendor.o((...args) => $options.dropjidian && $options.dropjidian(...args)),
    e: common_assets._imports_2,
    f: common_vendor.o((...args) => $options.droptesu && $options.droptesu(...args)),
    g: common_assets._imports_3$1,
    h: common_vendor.o((...args) => $options.droplvyou && $options.droplvyou(...args)),
    i: common_assets._imports_4$1,
    j: common_vendor.o((...args) => $options.dropshipin && $options.dropshipin(...args)),
    k: common_assets._imports_5$1,
    l: common_vendor.o((...args) => $options.dropshangwu && $options.dropshangwu(...args)),
    m: common_assets._imports_6,
    n: common_vendor.o((...args) => $options.dropyishu && $options.dropyishu(...args)),
    o: common_assets._imports_7,
    p: common_vendor.o((...args) => $options.dropguanli && $options.dropguanli(...args)),
    q: common_assets._imports_8,
    r: common_vendor.o((...args) => $options.dropchengjian && $options.dropchengjian(...args)),
    s: common_assets._imports_9,
    t: common_vendor.o((...args) => $options.dropguangshang && $options.dropguangshang(...args)),
    v: common_assets._imports_10,
    w: common_vendor.o((...args) => $options.dropwangchuan && $options.dropwangchuan(...args)),
    x: common_assets._imports_11,
    y: common_vendor.o((...args) => $options.dropqita && $options.dropqita(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/fenlei/fenlei.js.map
