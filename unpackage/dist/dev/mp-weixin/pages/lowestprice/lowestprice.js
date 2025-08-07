"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      allData: []
    };
  },
  computed: {
    sortedItems() {
      let allItems = [];
      if (Array.isArray(this.allData)) {
        this.allData.forEach((college) => {
          if (Array.isArray(college.foods)) {
            allItems.push(...college.foods);
          }
        });
      }
      allItems = allItems.filter((item) => typeof item.jiage === "number" && !isNaN(item.jiage));
      return allItems.sort((a, b) => a.jiage - b.jiage);
    }
  },
  onLoad() {
    common_vendor.index.request({
      url: "http://localhost:3000/api/bookdate",
      method: "GET",
      success: (res) => {
        this.allData = res.data;
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "获取数据失败",
          icon: "none"
        });
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: $options.sortedItems.length === 0
  }, $options.sortedItems.length === 0 ? {} : {
    c: common_vendor.f($options.sortedItems.slice(0, 100), (item, idx, i0) => {
      return {
        a: common_vendor.t(idx + 1),
        b: item.img,
        c: common_vendor.t(item.id),
        d: common_vendor.t(item.jiage),
        e: item.isbn || idx
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lowestprice/lowestprice.js.map
