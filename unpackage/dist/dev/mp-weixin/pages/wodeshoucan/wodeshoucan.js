"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      favorite: []
    };
  },
  created() {
    this.loadCollection();
  },
  methods: {
    loadCollection() {
      const favorite = common_vendor.index.getStorageSync("myFavorite");
      if (favorite) {
        this.favorite = favorite;
      }
    },
    removeFromCollection(index) {
      this.favorite.splice(index, 1);
      common_vendor.index.setStorageSync("myFavorite", this.favorite);
      common_vendor.index.showToast({
        title: "已从收藏夹移除",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.favorite.length > 0
  }, $data.favorite.length > 0 ? {
    b: common_vendor.f($data.favorite, (item, index, i0) => {
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
        k: common_vendor.o(($event) => $options.removeFromCollection(index), index),
        l: index
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wodeshoucan/wodeshoucan.js.map
