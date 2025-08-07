<template>
    <view>
        <tui-tabs sliderWidth="150" sliderHeight="80" sliderRadius="25rpx" selected-color="#fff" bold="true"
            sliderBgColor="#328d64" height="90" :tabs="tabs" :currentTab="currentTab" @change="change"
            class="nav-container"></tui-tabs>

        <view v-for="(item, index) in filteredData" :key="index" class="item">
            <image :src="item.img" class="item-img" />
            <view class="item-content">
                <view class="item-title">
                  {{ item.title }}
                  <text v-if="item.jiage !== undefined" class="tag tag-price">￥{{ item.jiage }}</text>
                  <text v-if="item.xiaoqv" class="tag tag-xiaoqv">{{ item.xiaoqv }}</text>
                  <text v-if="item.phone" class="tag tag-phone">{{ item.phone }}</text>
                </view>
                <view class="item-contact">{{ item.contact }}</view>
                <image :src="item.image" class="item-image" />
                <view class="dianzanbox" @click.stop="addTofavorite(item)">
                    <image class="dianzan" src="../../static/赞.png" mode=""></image>
                    <view class="shoucantext">加入收藏夹</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import tuiTabs from "../../node_modules/thorui-uni/lib/thorui/tui-tabs/tui-tabs.vue";

    export default {
        components: {
            tuiTabs
        },
        data() {
            return {
                currentTab: 0,
                tabs: [{
                        name: '我要买书'
                    },
                    {
                        name: '我要卖书'
                    }
                ],
                fabuData: [], // fabu.js数据
                bookData: []  // bookdate.js数据
            };
        },
        computed: {
            filteredData() {
                // 只展示fabuData，和原有逻辑一致
                const typeMap = {
                    0: '我要买书',
                    1: '我要卖书'
                };
                if (!Array.isArray(this.fabuData)) return [];
                return this.fabuData.filter(item => item.type === typeMap[this.currentTab]);
            }
        },
        methods: {
            change(e) {
                this.currentTab = e.index; // 确保当前选中的标签索引被正确更新
            },
            addTofavorite(book) {
                console.log('Adding to favorite:', book); // 调试信息
                let favorite = uni.getStorageSync('myFavorite') || [];
                favorite.push(book);
                uni.setStorageSync('myFavorite', favorite);
                uni.showToast({
                    title: '已添加到收藏夹',
                    icon: 'success'
                });
            }
        },
        onLoad() {
            // 登录校验
            const user = uni.getStorageSync('user');
            if (!user || !user.title) {
                uni.showToast({
                    title: '该功能需要登录后使用',
                    icon: 'none',
                    duration: 1500
                });
                setTimeout(() => {
                    uni.redirectTo({ url: '/pages/login/login' });
                }, 200);
                return;
            }
            // 页面加载时分别请求后端数据
            uni.request({
                url: 'http://localhost:3000/api/fabu',
                method: 'GET',
                success: (res) => {
                    if (Array.isArray(res.data)) {
                        this.fabuData = res.data;
                    } else if (res.data && Array.isArray(res.data.data)) {
                        this.fabuData = res.data.data;
                    } else {
                        this.fabuData = [];
                    }
                },
                fail: () => {
                    uni.showToast({
                        title: '获取发布数据失败',
                        icon: 'none'
                    });
                    this.fabuData = [];
                }
            });
            uni.request({
                url: 'http://localhost:3000/api/bookdate',
                method: 'GET',
                success: (res) => {
                    if (Array.isArray(res.data)) {
                        this.bookData = res.data;
                    } else if (res.data && Array.isArray(res.data.data)) {
                        this.bookData = res.data.data;
                    } else {
                        this.bookData = [];
                    }
                },
                fail: () => {
                    uni.showToast({
                        title: '获取书籍数据失败',
                        icon: 'none'
                    });
                    this.bookData = [];
                }
            });
        }
    };
</script>

<style>
    .dianzanbox {
        display: flex;
        width: 250rpx;
        position: relative;
        top: 70rpx;
        float: right;
        border-radius: 30rpx;
        padding: 10rpx;
        border: 5rpx solid #ccc;
        box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);

    }

    .shoucantext {
        font-weight: bold;
        font-size: 26rpx;
        color: #d81e06;
        margin-left: 15rpx;
        display: flex;
        align-items: center;

    }

    .dianzan {
        width: 100rpx;
        height: 100rpx;


    }

    .item {
        margin: 10px;
        padding: 10px;
        box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
        border: 1px solid #ccc;
        border-radius: 15px;
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        box-sizing: border-box;
    }

    .item-img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        margin-bottom: 250rpx;
        border-radius: 50rpx;
    }

    .item-content {
        flex: 1;
    }

    .item-title {
        font-weight: bold;
        margin-bottom: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
    }

    .tag {
        display: inline-block;
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 10px;
        margin-left: 5px;
        margin-top: 2px;
        white-space: nowrap;
        max-width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .tag-price {
        background: #e6f7e6;
        color: #328d64;
        border: 1px solid #b2e2b2;
    }
    .tag-xiaoqv {
        background: #e6f0fa;
        color: #3a6ea5;
        border: 1px solid #b3cde8;
    }
    .tag-phone {
        background: #fff7e6;
        color: #b26a00;
        border: 1px solid #ffe0b2;
    }

    .item-contact {
        margin-bottom: 5px;
    }

    .item-image {
        width: 100px;
        height: 100px;
        border-radius: 5px;
    }
</style>