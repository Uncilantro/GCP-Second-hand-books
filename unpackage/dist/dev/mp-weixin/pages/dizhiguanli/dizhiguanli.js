"use strict";
const common_vendor = require("../../common/vendor.js");
const uniPopup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
const _sfc_main = {
  components: {
    uniPopup
  },
  data() {
    return {
      addresses: [
        {
          name: "张三",
          phone: "13800000000",
          detail: "北京市海淀区中关村大街1号"
        },
        {
          name: "李四",
          phone: "13900000000",
          detail: "上海市浦东新区陆家嘴环路1000号"
        }
      ],
      editAddressData: {},
      newAddressData: {}
    };
  },
  methods: {
    openEditPopup(index) {
      this.editAddressData = {
        ...this.addresses[index],
        index
      };
      this.$refs.editPopup.open();
    },
    closeEditPopup() {
      this.$refs.editPopup.close();
    },
    saveEditAddress() {
      const {
        index,
        ...address
      } = this.editAddressData;
      this.addresses.splice(index, 1, address);
      this.closeEditPopup();
    },
    openAddPopup() {
      this.newAddressData = {};
      this.$refs.addPopup.open();
    },
    closeAddPopup() {
      this.$refs.addPopup.close();
    },
    saveNewAddress() {
      this.addresses.push(this.newAddressData);
      this.closeAddPopup();
    },
    deleteAddress(index) {
      this.addresses.splice(index, 1);
    }
  }
};
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.addresses, (address, index, i0) => {
      return {
        a: common_vendor.t(address.name),
        b: common_vendor.t(address.phone),
        c: common_vendor.t(address.detail),
        d: common_vendor.o(($event) => $options.openEditPopup(index), index),
        e: common_vendor.o(($event) => $options.deleteAddress(index), index),
        f: index
      };
    }),
    b: common_vendor.o((...args) => $options.openAddPopup && $options.openAddPopup(...args)),
    c: $data.editAddressData.name,
    d: common_vendor.o(($event) => $data.editAddressData.name = $event.detail.value),
    e: $data.editAddressData.phone,
    f: common_vendor.o(($event) => $data.editAddressData.phone = $event.detail.value),
    g: $data.editAddressData.detail,
    h: common_vendor.o(($event) => $data.editAddressData.detail = $event.detail.value),
    i: common_vendor.o((...args) => $options.closeEditPopup && $options.closeEditPopup(...args)),
    j: common_vendor.o((...args) => $options.saveEditAddress && $options.saveEditAddress(...args)),
    k: common_vendor.sr("editPopup", "c85f7a2d-0"),
    l: common_vendor.p({
      type: "center"
    }),
    m: $data.newAddressData.name,
    n: common_vendor.o(($event) => $data.newAddressData.name = $event.detail.value),
    o: $data.newAddressData.phone,
    p: common_vendor.o(($event) => $data.newAddressData.phone = $event.detail.value),
    q: $data.newAddressData.detail,
    r: common_vendor.o(($event) => $data.newAddressData.detail = $event.detail.value),
    s: common_vendor.o((...args) => $options.closeAddPopup && $options.closeAddPopup(...args)),
    t: common_vendor.o((...args) => $options.saveNewAddress && $options.saveNewAddress(...args)),
    v: common_vendor.sr("addPopup", "c85f7a2d-1"),
    w: common_vendor.p({
      type: "center"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c85f7a2d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dizhiguanli/dizhiguanli.js.map
