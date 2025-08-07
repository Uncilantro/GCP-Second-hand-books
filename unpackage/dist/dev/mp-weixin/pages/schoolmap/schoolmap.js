"use strict";
const common_vendor = require("../../common/vendor.js");
const img = "../../static";
const _sfc_main = {
  data() {
    return {
      latitude: 23.299977,
      longitude: 113.660241
    };
  },
  onReady() {
    this._mapContext = common_vendor.index.createMapContext("map", this);
    common_vendor.index.authorize({
      scope: "scope.userLocation",
      success: () => {
        this.initMap();
      },
      fail: () => {
        common_vendor.index.showModal({
          title: "提示",
          content: "需要您的位置信息才能正常使用地图功能，请在设置中开启授权。",
          showCancel: false,
          confirmText: "去设置",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.openSetting({
                success: (res2) => {
                  if (res2.authSetting["scope.userLocation"]) {
                    this.initMap();
                  } else {
                    common_vendor.index.showToast({
                      title: "位置授权失败，请手动开启",
                      icon: "none"
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  },
  methods: {
    initMap() {
      this._mapContext.initMarkerCluster({
        enableDefaultStyle: false,
        zoomOnClick: true,
        gridSize: 60,
        complete(res) {
          common_vendor.index.__f__("log", "at pages/schoolmap/schoolmap.vue:64", "initMarkerCluster", res);
        }
      });
      this._mapContext.on("markerClusterCreate", (e) => {
        common_vendor.index.__f__("log", "at pages/schoolmap/schoolmap.vue:69", "markerClusterCreate", e);
      });
      this.addMarkers();
    },
    addMarkers() {
      const positions = [
        {
          latitude: 23.099994,
          longitude: 113.32452
        },
        {
          latitude: 23.099994,
          longitude: 113.32252
        },
        {
          latitude: 23.099994,
          longitude: 113.32652
        },
        {
          latitude: 23.096994,
          longitude: 113.32952
        }
      ];
      const markers = [];
      positions.forEach((p, i) => {
        common_vendor.index.__f__("log", "at pages/schoolmap/schoolmap.vue:96", i);
        markers.push(
          Object.assign({}, {
            id: i + 1,
            iconPath: img,
            width: 50,
            height: 50,
            joinCluster: true,
            // 指定了该参数才会参与聚合
            label: {
              width: 50,
              height: 30,
              borderWidth: 1,
              borderRadius: 10,
              bgColor: "#ffffff",
              content: `label ${i + 1}`
            }
          }, p)
        );
      });
      this._mapContext.addMarkers({
        markers,
        clear: false,
        complete(res) {
          common_vendor.index.__f__("log", "at pages/schoolmap/schoolmap.vue:120", "addMarkers", res);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/schoolmap/schoolmap.js.map
