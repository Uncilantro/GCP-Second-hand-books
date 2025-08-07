<template>
    <view class="titlemap">广城校外导航</view>
    <view class="mapxiaowai">
        <map id="map" class="map" :show-location="true" :latitude="latitude" :longitude="longitude"></map>
    </view>
    <view class="titlemap">广城校内地图</view>
    <image class="map" src="https://img.picui.cn/free/2024/10/23/6717e9f44e757.jpg" mode=""></image>
</template>

<script>
    const img = '../../static';
    export default {
        data() {
            return {
                latitude: 23.299977,
                longitude: 113.660241,
            };
        },
        onReady() {
            this._mapContext = uni.createMapContext("map", this);

            // 请求用户授权
            uni.authorize({
                scope: 'scope.userLocation',
                success: () => {
                    // 用户同意授权
                    this.initMap();
                },
                fail: () => {
                    // 用户拒绝授权
                    uni.showModal({
                        title: '提示',
                        content: '需要您的位置信息才能正常使用地图功能，请在设置中开启授权。',
                        showCancel: false,
                        confirmText: '去设置',
                        success: (res) => {
                            if (res.confirm) {
                                uni.openSetting({
                                    success: (res) => {
                                        if (res.authSetting['scope.userLocation']) {
                                            this.initMap();
                                        } else {
                                            uni.showToast({
                                                title: '位置授权失败，请手动开启',
                                                icon: 'none'
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
                // 仅调用初始化，才会触发 on.("markerClusterCreate", (e) => {})
                this._mapContext.initMarkerCluster({
                    enableDefaultStyle: false,
                    zoomOnClick: true,
                    gridSize: 60,
                    complete(res) {
                        console.log('initMarkerCluster', res);
                    }
                });

                this._mapContext.on("markerClusterCreate", (e) => {
                    console.log("markerClusterCreate", e);
                });

                this.addMarkers();
            },
            addMarkers() {
                const positions = [{
                        latitude: 23.099994,
                        longitude: 113.324520
                    },
                    {
                        latitude: 23.099994,
                        longitude: 113.322520
                    },
                    {
                        latitude: 23.099994,
                        longitude: 113.326520
                    },
                    {
                        latitude: 23.096994,
                        longitude: 113.329520
                    }
                ];

                const markers = [];

                positions.forEach((p, i) => {
                    console.log(i);
                    markers.push(
                        Object.assign({}, {
                            id: i + 1,
                            iconPath: img,
                            width: 50,
                            height: 50,
                            joinCluster: true, // 指定了该参数才会参与聚合
                            label: {
                                width: 50,
                                height: 30,
                                borderWidth: 1,
                                borderRadius: 10,
                                bgColor: '#ffffff',
                                content: `label ${i + 1}`
                            }
                        }, p)
                    );
                });

                this._mapContext.addMarkers({
                    markers,
                    clear: false,
                    complete(res) {
                        console.log('addMarkers', res);
                    }
                });
            }
        }
    }
</script>

<style>
    .mapxiaowai {
        width: 100%;
        height: 400rpx;
    }

    .titlemap {
        line-height: 100rpx;
        text-align: center;
        background-color: #5ea586;
        font-weight: bolder;
        color: white;
        font-size: 30rpx;
    }

    .map {
        width: 100%;
        height: 400rpx;
    }
</style>