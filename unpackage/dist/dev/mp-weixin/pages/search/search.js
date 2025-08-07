"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      keyword: "",
      searchResults: [],
      allData: []
    };
  },
  onLoad(options) {
    const encodedKeyword = options.keyword;
    const decodedKeyword = decodeURIComponent(encodedKeyword);
    this.keyword = decodedKeyword;
    common_vendor.index.request({
      url: "http://localhost:3000/api/bookdate",
      method: "GET",
      success: (res) => {
        this.allData = res.data;
        this.performSearch();
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      }
    });
  },
  methods: {
    performSearch() {
      let flatBooks = [];
      this.allData.forEach((college) => {
        if (Array.isArray(college.foods)) {
          flatBooks.push(...college.foods);
        }
      });
      const kw = this.keyword.trim().toLowerCase();
      this.searchResults = flatBooks.filter((food) => {
        return food.id && food.id.toLowerCase().includes(kw) || food.type && food.type.toLowerCase().includes(kw) || food.contact && food.contact.toLowerCase().includes(kw) || food.isbn && String(food.isbn).toLowerCase().includes(kw);
      });
    },
    addToCollection(book) {
      let collection = common_vendor.index.getStorageSync("myCollection") || [];
      collection.push(book);
      common_vendor.index.setStorageSync("myCollection", collection);
      common_vendor.index.showToast({
        title: "已添加到购物车",
        icon: "success"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.keyword),
    b: $data.searchResults.length > 0
  }, $data.searchResults.length > 0 ? {
    c: common_vendor.f($data.searchResults, (result, index, i0) => {
      return {
        a: result.img,
        b: common_vendor.t(result.id),
        c: common_vendor.t(result.type),
        d: common_vendor.t(result.jiage),
        e: common_vendor.t(result.isbn),
        f: common_vendor.o(($event) => $options.addToCollection(result[_ctx.dexin]), index),
        g: index,
        h: common_vendor.o((...args) => _ctx.showPopup && _ctx.showPopup(...args), index)
      };
    }),
    d: common_assets._imports_0$3,
    e: common_assets._imports_1
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
