"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      college: [],
      allItems: [],
      selectedType: "",
      wh: 0,
      currentIndex: 0
    };
  },
  computed: {
    ...common_vendor.mapState(["items"]),
    filteredItems() {
      if (this.selectedType) {
        return this.allItems.filter((item) => item.type === this.selectedType);
      }
      return this.allItems;
    }
  },
  created() {
    common_vendor.index.request({
      url: "http://localhost:3000/api/bookdate",
      method: "GET",
      success: (res) => {
        const data = res.data;
        const shuzishangmaoCollege = data.find((college) => college.names === "数字商贸学院");
        if (shuzishangmaoCollege) {
          this.college = [...new Set(shuzishangmaoCollege.foods.map((food) => food.type))];
          this.allItems = shuzishangmaoCollege.foods;
          common_vendor.index.__f__("log", "at pages/shuzishangmao/shuzishangmao.vue:71", "college:", this.college);
          common_vendor.index.__f__("log", "at pages/shuzishangmao/shuzishangmao.vue:72", "allItems:", this.allItems);
        } else {
          common_vendor.index.__f__("error", "at pages/shuzishangmao/shuzishangmao.vue:74", "数字商贸学院数据未找到");
        }
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
    selectType(type, index) {
      this.selectedType = type;
      this.currentIndex = index;
    }
  },
  onLoad() {
    const sysInfo = common_vendor.index.getSystemInfoSync();
    this.wh = sysInfo.windowHeight;
    common_vendor.index.__f__("log", "at pages/shuzishangmao/shuzishangmao.vue:96", "窗口高度:", this.wh);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.college, (type, index, i0) => {
      return {
        a: common_vendor.t(type),
        b: type,
        c: common_vendor.o(($event) => $options.selectType(type, index), type),
        d: $data.currentIndex === index ? 1 : ""
      };
    }),
    b: $data.wh + "px",
    c: common_vendor.f($options.filteredItems, (item, k0, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.id),
        c: common_vendor.t(item.type),
        d: common_vendor.t(item.jiage),
        e: common_vendor.t(item.isbn),
        f: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shuzishangmao/shuzishangmao.js.map
