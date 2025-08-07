"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
      // 删除：data: neirong
      fabuData: [],
      // 新增：存储后端数据
      loading: false
      // 新增：加载状态
    };
  },
  computed: {
    filteredData() {
      return this.fabuData.filter((item) => item.title && item.title.includes("测试用户"));
    }
  },
  mounted() {
    this.loading = true;
    common_vendor.index.request({
      url: "http://localhost:3000/api/fabu",
      method: "GET",
      success: (res) => {
        this.fabuData = res.data;
        this.loading = false;
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "数据加载失败",
          icon: "none"
        });
        this.loading = false;
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.filteredData, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.contact),
        d: item.image,
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lishifabu/lishifabu.js.map
