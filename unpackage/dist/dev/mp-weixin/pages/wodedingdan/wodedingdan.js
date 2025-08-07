"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  setup() {
    const collection = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      const storedCollection = common_vendor.index.getStorageSync("myCollection");
      if (storedCollection) {
        collection.value = storedCollection;
        common_vendor.index.__f__("log", "at pages/wodedingdan/wodedingdan.vue:61", "Loaded collection:", collection.value);
      } else {
        common_vendor.index.__f__("log", "at pages/wodedingdan/wodedingdan.vue:63", "No collection found in storage");
      }
    });
    const removeFromCollection = (book) => {
      const index = collection.value.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        collection.value.splice(index, 1);
        common_vendor.index.setStorageSync("myCollection", collection.value);
        common_vendor.index.showToast({
          title: "已从收藏中移除",
          icon: "success"
        });
      }
    };
    const addToCart = (book) => {
      let cart = common_vendor.index.getStorageSync("myCart") || [];
      cart.push(book);
      common_vendor.index.setStorageSync("myCart", cart);
      common_vendor.index.showToast({
        title: "已添加到购物车",
        icon: "success"
      });
    };
    const totalBooks = common_vendor.computed(() => collection.value.length);
    const totalPrice = common_vendor.computed(() => collection.value.reduce((sum, book) => sum + parseFloat(book.jiage), 0).toFixed(2));
    return {
      collection,
      removeFromCollection,
      addToCart,
      totalBooks,
      totalPrice
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.collection.length > 0
  }, $setup.collection.length > 0 ? {
    b: common_vendor.f($setup.collection, (book, k0, i0) => {
      return common_vendor.e({
        a: book.img,
        b: common_vendor.t(book.title || book.id),
        c: book.jiage !== void 0
      }, book.jiage !== void 0 ? {
        d: common_vendor.t(book.jiage)
      } : {}, {
        e: book.xiaoqv
      }, book.xiaoqv ? {
        f: common_vendor.t(book.xiaoqv)
      } : {}, {
        g: book.phone
      }, book.phone ? {
        h: common_vendor.t(book.phone)
      } : {}, {
        i: common_vendor.t(book.contact),
        j: book.image
      }, book.image ? {
        k: book.image
      } : {}, {
        l: common_vendor.o(($event) => $setup.removeFromCollection(book), book.id),
        m: book.id
      });
    }),
    c: common_assets._imports_0$6
  } : {}, {
    d: $setup.collection.length > 0
  }, $setup.collection.length > 0 ? {
    e: common_vendor.t($setup.totalBooks),
    f: common_vendor.t($setup.totalPrice)
  } : {}, {
    g: $setup.collection.length > 0
  }, $setup.collection.length > 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wodedingdan/wodedingdan.js.map
