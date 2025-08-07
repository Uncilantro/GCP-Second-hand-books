"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      latestData: [],
      loading: false
    };
  },
  methods: {
    fetchLatestData() {
      this.loading = true;
      common_vendor.index.request({
        url: "http://localhost:3000/api/fabu",
        method: "GET",
        success: (res) => {
          this.latestData = res.data;
          this.loading = false;
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "连接服务器失败",
            icon: "none"
          });
          this.loading = false;
        }
      });
    }
  },
  onLoad() {
    this.fetchLatestData();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: $data.latestData.length === 0
  }, $data.latestData.length === 0 ? {} : {}, {
    c: common_vendor.f($data.latestData, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/newpublish/newpublish.js.map
