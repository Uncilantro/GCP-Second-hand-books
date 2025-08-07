"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      allBooksArry: [],
      // 保存所有后端数据
      bookdateArry: [],
      // 当前展示的书籍
      dexin: 0,
      loading: false,
      page: 1,
      // 当前页数
      pageSize: 11
      // 每页数据量
      // showPopup: false
    };
  },
  created() {
  },
  methods: {
    // 定义跳转页面
    drophot() {
      common_vendor.index.navigateTo({
        url: "/pages/huore/huore"
      });
    },
    dropnew() {
      common_vendor.index.navigateTo({
        url: "/pages/newpublish/newpublish"
      });
    },
    dropcheap() {
      common_vendor.index.navigateTo({
        url: "/pages/lowestprice/lowestprice"
      });
    },
    dropcoupon() {
      common_vendor.index.navigateTo({
        url: "/pages/coupon(youhui)/coupon(youhui)"
      });
    },
    dropmap() {
      common_vendor.index.navigateTo({
        url: "/pages/schoolmap/schoolmap"
      });
    },
    // 默认组件
    showPopup(item) {
      common_vendor.index.showModal({
        title: "提示",
        content: `您选择了书籍: ${item.id}`,
        showCancel: true,
        // 是否显示取消按钮
        cancelText: "取消",
        // 取消按钮的文字
        confirmText: "确定",
        // 确定按钮的文字
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/index/index.vue:153", "用户点击了确定");
          } else if (res.cancel) {
            common_vendor.index.__f__("log", "at pages/index/index.vue:155", "用户点击了取消");
          }
        }
      });
    },
    gosearch() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:161", "搜索关键词:", this.searchKeyword);
      if (this.searchKeyword) {
        common_vendor.index.navigateTo({
          url: "../search/search?keyword=" + encodeURIComponent(this.searchKeyword)
        });
      } else if (this.searchKeyword == "") {
        common_vendor.index.showToast({
          title: "搜索框不能为空",
          // 提示内容
          icon: "error",
          // 图标类型
          duration: 1500,
          // 显示持续时间，单位为毫秒
          mask: false
          // 是否显示透明蒙层，防止触摸穿透
        });
      } else {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "none"
        });
      }
    },
    loadMoreData() {
      this.loading = true;
      setTimeout(() => {
        const currentCount = this.bookdateArry.length;
        const nextBooks = this.allBooksArry.slice(currentCount, currentCount + 10);
        if (nextBooks.length > 0 && currentCount < 40) {
          const maxCount = Math.min(currentCount + 10, 40);
          this.bookdateArry = this.allBooksArry.slice(0, maxCount);
          this.loading = false;
        } else {
          common_vendor.index.showToast({
            title: "没有更多了",
            icon: "none"
          });
          this.loading = false;
        }
      }, 500);
    },
    addToCollection(book) {
      const user = common_vendor.index.getStorageSync("user");
      if (!user || !user.title) {
        common_vendor.index.showToast({
          title: "该功能需要登录使用",
          icon: "none",
          duration: 2500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 800);
        return;
      }
      let collection = common_vendor.index.getStorageSync("myCollection") || [];
      collection.push(book);
      common_vendor.index.setStorageSync("myCollection", collection);
      common_vendor.index.showToast({
        title: "已添加到购物车",
        icon: "success"
      });
    },
    addToCart(book) {
      const user = common_vendor.index.getStorageSync("user");
      if (!user || !user.title) {
        common_vendor.index.showToast({
          title: "该功能需要登录使用",
          icon: "none",
          duration: 1500
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
        return;
      }
      let cart = common_vendor.index.getStorageSync("myCart") || [];
      cart.push(book);
      common_vendor.index.setStorageSync("myCart", cart);
      common_vendor.index.showToast({
        title: "已添加到购物车",
        icon: "success"
      });
    },
    fetchBookData() {
      this.loading = true;
      common_vendor.index.request({
        url: "http://localhost:3000/api/bookdate",
        // 后端接口地址
        method: "GET",
        success: (res) => {
          let flatBooks = [];
          res.data.forEach((item) => {
            if (Array.isArray(item.foods)) {
              flatBooks.push(...item.foods);
            }
          });
          const seen = /* @__PURE__ */ new Set();
          const uniqueBooks = [];
          flatBooks.forEach((book) => {
            if (!seen.has(book.isbn)) {
              seen.add(book.isbn);
              uniqueBooks.push(book);
            }
          });
          this.allBooksArry = uniqueBooks;
          this.bookdateArry = this.allBooksArry.slice(0, 10);
          this.loading = false;
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "获取数据失败",
            icon: "none"
          });
          this.loading = false;
        }
      });
    }
  },
  onLoad() {
    this.fetchBookData();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.dexin = 0;
    this.bookdateArry = this.allBooksArry.slice(0, 10);
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  onReachBottom() {
    this.loadMoreData();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.searchKeyword,
    b: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    c: common_assets._imports_0,
    d: common_vendor.o((...args) => $options.gosearch && $options.gosearch(...args)),
    e: common_assets._imports_0$1,
    f: common_vendor.o((...args) => $options.drophot && $options.drophot(...args)),
    g: common_assets._imports_0$2,
    h: common_vendor.o((...args) => $options.dropnew && $options.dropnew(...args)),
    i: common_assets._imports_3,
    j: common_vendor.o((...args) => $options.dropcheap && $options.dropcheap(...args)),
    k: common_assets._imports_4,
    l: common_vendor.o((...args) => $options.dropcoupon && $options.dropcoupon(...args)),
    m: common_assets._imports_5,
    n: common_vendor.o((...args) => $options.dropmap && $options.dropmap(...args)),
    o: common_vendor.f($data.bookdateArry, (item, index, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.id),
        c: common_vendor.t(item.type),
        d: common_vendor.t(item.jiage),
        e: common_vendor.t(item.isbn),
        f: common_vendor.o(($event) => $options.addToCollection(item), index),
        g: index,
        h: common_vendor.o(($event) => $options.showPopup(item), index)
      };
    }),
    p: common_assets._imports_0$3,
    q: common_assets._imports_1,
    r: $data.loading
  }, $data.loading ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
