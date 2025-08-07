"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "jia",
  setup(__props) {
    const sellForm = common_vendor.ref({
      bookName: "",
      bookPrice: "",
      campusIndex: 0,
      bookPhone: "",
      bookContact: "",
      bookImage: ""
    });
    const buyForm = common_vendor.ref({
      bookName: "",
      bookPrice: "",
      campusIndex: 0,
      bookPhone: "",
      bookContact: "",
      bookImage: ""
    });
    const campuses = ["科教城西区", "科教城东区"];
    const buttonLoading = common_vendor.ref(false);
    const currentPage = common_vendor.ref("sell");
    common_vendor.onMounted(() => {
      const user = common_vendor.index.getStorageSync("user");
      if (!user || !user.title) {
        common_vendor.index.showToast({
          title: "该功能需要登录后使用",
          icon: "none",
          duration: 5e3
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/login/login" });
        }, 200);
      }
    });
    function switchPage(page) {
      currentPage.value = page;
    }
    function handleCampusChange(type, event) {
      if (type === "sell") {
        sellForm.value.campusIndex = event.detail.value;
      } else if (type === "buy") {
        buyForm.value.campusIndex = event.detail.value;
      }
    }
    async function chooseImage(type) {
      const result = await common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"]
      });
      if (type === "sell") {
        sellForm.value.bookImage = result.tempFilePaths[0];
      } else if (type === "buy") {
        buyForm.value.bookImage = result.tempFilePaths[0];
      }
    }
    async function submitBook(type) {
      buttonLoading.value = true;
      const form = type === "sell" ? sellForm.value : buyForm.value;
      const bookData = {
        img: form.bookImage || "https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        title: `${form.bookName} ${form.bookPhone}`,
        type: type === "sell" ? "我要卖书" : "我要买书",
        contact: form.bookContact,
        image: form.bookImage,
        xiaoqv: campuses[form.campusIndex],
        jiage: parseFloat(form.bookPrice),
        phone: parseInt(form.bookPhone),
        name: form.bookName
      };
      common_vendor.index.request({
        url: "http://localhost:3000/api/fabu",
        method: "POST",
        data: bookData,
        success: (res) => {
          common_vendor.index.showToast({ title: "发布成功", icon: "success" });
          setTimeout(() => {
            common_vendor.index.showToast({ title: "请耐心等待管理员审核", icon: "none", duration: 3e3 });
          }, 800);
          if (type === "sell") {
            sellForm.value = { bookName: "", bookPrice: "", campusIndex: 0, bookPhone: "", bookContact: "", bookImage: "" };
          } else {
            buyForm.value = { bookName: "", bookPrice: "", campusIndex: 0, bookPhone: "", bookContact: "", bookImage: "" };
          }
        },
        fail: () => {
          common_vendor.index.showToast({ title: "发布失败", icon: "none" });
        },
        complete: () => {
          buttonLoading.value = false;
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => switchPage("buy")),
        b: currentPage.value === "buy" ? 1 : "",
        c: common_vendor.o(($event) => switchPage("sell")),
        d: currentPage.value === "sell" ? 1 : "",
        e: currentPage.value === "sell"
      }, currentPage.value === "sell" ? common_vendor.e({
        f: sellForm.value.bookName,
        g: common_vendor.o(($event) => sellForm.value.bookName = $event.detail.value),
        h: sellForm.value.bookImage
      }, sellForm.value.bookImage ? {
        i: sellForm.value.bookImage
      } : {}, {
        j: common_vendor.o(($event) => chooseImage("sell")),
        k: common_vendor.t(campuses[sellForm.value.campusIndex]),
        l: sellForm.value.campusIndex,
        m: campuses,
        n: common_vendor.o(($event) => handleCampusChange("sell", $event)),
        o: sellForm.value.bookPrice,
        p: common_vendor.o(($event) => sellForm.value.bookPrice = $event.detail.value),
        q: sellForm.value.bookPhone,
        r: common_vendor.o(($event) => sellForm.value.bookPhone = $event.detail.value),
        s: sellForm.value.bookContact,
        t: common_vendor.o(($event) => sellForm.value.bookContact = $event.detail.value),
        v: !(sellForm.value.bookName && sellForm.value.bookPhone && sellForm.value.bookImage && sellForm.value.bookContact && sellForm.value.bookPrice),
        w: buttonLoading.value,
        x: common_vendor.o(($event) => submitBook("sell"))
      }) : {}, {
        y: currentPage.value === "buy"
      }, currentPage.value === "buy" ? common_vendor.e({
        z: buyForm.value.bookName,
        A: common_vendor.o(($event) => buyForm.value.bookName = $event.detail.value),
        B: buyForm.value.bookImage
      }, buyForm.value.bookImage ? {
        C: buyForm.value.bookImage
      } : {}, {
        D: common_vendor.o(($event) => chooseImage("buy")),
        E: common_vendor.t(campuses[buyForm.value.campusIndex]),
        F: buyForm.value.campusIndex,
        G: campuses,
        H: common_vendor.o(($event) => handleCampusChange("buy", $event)),
        I: buyForm.value.bookPrice,
        J: common_vendor.o(($event) => buyForm.value.bookPrice = $event.detail.value),
        K: buyForm.value.bookPhone,
        L: common_vendor.o(($event) => buyForm.value.bookPhone = $event.detail.value),
        M: buyForm.value.bookContact,
        N: common_vendor.o(($event) => buyForm.value.bookContact = $event.detail.value),
        O: !(buyForm.value.bookName && buyForm.value.bookPhone && buyForm.value.bookImage && buyForm.value.bookContact && buyForm.value.bookPrice),
        P: buttonLoading.value,
        Q: common_vendor.o(($event) => submitBook("buy"))
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-610f95c2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/jia/jia.js.map
