<template>
    <view class="bgd"> </view>
    <view class="topbox">
        <view class="top-title">广&nbsp;城&nbsp;智&nbsp;慧&nbsp;书&nbsp;丛</view>
        <view class="searcher">
            <input type="text" class="search" placeholder="请输入要搜索的书籍" v-model="searchKeyword" />
            <image src="../../static/搜索.png" mode="" class="icon-search" @click="gosearch"></image>
        </view>
        <view class="bottom">
            <view class="navcroll">
                <view class="xianzhi-box" @click="drophot">
                    <image class="xianzhi" src="../../static/热门.png" mode=""></image>
                    <text class="text">火热书籍</text>
                </view>
                <view class="xianzhi-box" @click="dropnew">
                    <image class="xianzhi" src="../../static/最新red.png" mode=""></image>
                    <text class="text">最新发布</text>
                </view>
                <view class="xianzhi-box" @click="dropcheap">
                    <image class="xianzhi" src="../../static/价格最低.png" mode=""></image>
                    <text class="text">价格最低</text>
                </view>
                <view class="xianzhi-box" @click="dropcoupon">
                    <image class="xianzhi" src="../../static/优惠券.png" mode=""></image>
                    <text class="text">优惠券</text>
                </view>
                <view class="xianzhi-box" @click="dropmap">
                    <image class="xianzhi" src="../../static/地图.png" mode=""></image>
                    <text class="text">校园地图</text>
                </view>
            </view>
        </view>
        <view class="lunbobigbox">
            <text class="schoolaction">校园风采</text>
            <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color='gray'
                indicator-active-color='#fff'>
                <swiper-item>
                    <view class="swiper-item">
                        <image src="https://tse1-mm.cn.bing.net/th/id/OIP-C.b7lyDYN8b6f2UGstNxDo9AHaFj?w=240&h=180&c=7&r=0&o=7&dpr=2.1&pid=1.7&rm=3" class="lunbo" mode="">
                        </image>

                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="swiper-item">
                        <image src="https://guangdong.eol.cn/gdgd/202310/W020231013603559203930.jpg" class="lunbo"
                            mode=""></image>

                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="swiper-item">
                        <image src="https://tse1-mm.cn.bing.net/th/id/OIP-C.5_fo5bH5kLDEg0y5i3aVHQHaE8?w=232&h=180&c=7&r=0&o=7&dpr=2.1&pid=1.7&rm=3" class="lunbo" mode="">
                        </image>

                    </view>
                </swiper-item>
            </swiper>
        </view>
    </view>

    <text class="tuijianbook">推荐书籍</text>

    <view class="bottom-box" v-for="(item, index) in bookdateArry" :key="index" @click="showPopup(item)">
        <view class="tuijian">
            <image class="huore" src="../../static/火.png" mode=""></image>
            <image :src="item.img" class="fengmian"></image>
            <view class="right">
                <view class="title">
                    {{item.id}}
                </view>
                <view class="smalltext">
                    适用专业: {{item.type}}
                </view>
                <view class="smalltext">
                    价格: <span
                        style="color: crimson; font-weight: bolder; font-size: 36rpx;">&nbsp;{{item.jiage}}&nbsp;</span>元
                </view>
                <view class="smalltext" style="word-break: break-all; white-space: normal;">
                    ISBN码:{{item.isbn}}
                </view>
            </view>
            <view class="buttons">
                <image class="shoucan" @click.stop="addToCollection(item)" src="../../static/ic_加入购物车2.png"
                    mode=""></image>
                <!-- <button size="mini" class="add-to-collection"
                
                    @click.stop="addToCollection(item.foods[dexin])">收藏</button>
                <button size="mini" class="add-to-cart" @click.stop="addToCart(item.foods[dexin])">购物车</button> -->
            </view>
        </view>
    </view>

    <view v-if="loading" class="loading">
        <text>加载中...</text>
    </view>
</template>

<script>

    export default {
        data() {
            return {
                searchKeyword: '',
                allBooksArry: [], // 保存所有后端数据
                bookdateArry: [], // 当前展示的书籍
                dexin: 0,
                loading: false,
                page: 1, // 当前页数
                pageSize: 11, // 每页数据量
                // showPopup: false
            };
        },
        created() {
        },
        methods: {
            // 定义跳转页面
            drophot() {
                uni.navigateTo({
                    url: '/pages/huore/huore'
                });
            },
            dropnew() {
                uni.navigateTo({
                    url: '/pages/newpublish/newpublish'
                });
            },
            dropcheap() {
                uni.navigateTo({
                    url: '/pages/lowestprice/lowestprice'
                });
            },
            dropcoupon() {
                uni.navigateTo({
                    url: '/pages/coupon(youhui)/coupon(youhui)'
                });
            },
            dropmap() {
                uni.navigateTo({
                    url: '/pages/schoolmap/schoolmap'
                });
            },
            // 默认组件
            showPopup(item) {
                uni.showModal({
                    title: '提示',
                    content: `您选择了书籍: ${item.id}`,
                    showCancel: true, // 是否显示取消按钮
                    cancelText: '取消', // 取消按钮的文字
                    confirmText: '确定', // 确定按钮的文字
                    success: function(res) {
                        if (res.confirm) {
                            console.log('用户点击了确定');
                        } else if (res.cancel) {
                            console.log('用户点击了取消');
                        }
                    }
                });
            },
            gosearch() {
                console.log('搜索关键词:', this.searchKeyword); // 添加日志输出
                if (this.searchKeyword) {
                    uni.navigateTo({
                        url: '../search/search?keyword=' + encodeURIComponent(this.searchKeyword)
                    });
                } else if (this.searchKeyword == "") {
                    uni.showToast({
                        title: '搜索框不能为空', // 提示内容
                        icon: 'error', // 图标类型
                        duration: 1500, // 显示持续时间，单位为毫秒
                        mask: false // 是否显示透明蒙层，防止触摸穿透
                    });
                } else {
                    uni.showToast({
                        title: '请输入搜索内容',
                        icon: 'none'
                    });
                }
            },
            loadMoreData() {
                this.loading = true;
                setTimeout(() => {
                    const currentCount = this.bookdateArry.length;
                    const nextBooks = this.allBooksArry.slice(currentCount, currentCount + 10);
                    if (nextBooks.length > 0 && currentCount < 40) {
                        // 最多只显示40本
                        const maxCount = Math.min(currentCount + 10, 40);
                        this.bookdateArry = this.allBooksArry.slice(0, maxCount);
                        this.loading = false;
                    } else {
                        uni.showToast({
                            title: '没有更多了',
                            icon: 'none'
                        });
                        this.loading = false;
                    }
                }, 500);
            },
            addToCollection(book) {
                const user = uni.getStorageSync('user');
                if (!user || !user.title) {
                    uni.showToast({
                        title: '该功能需要登录使用',
                        icon: 'none',
                        duration: 2500
                    });
                    setTimeout(() => {
                        uni.redirectTo({ url: '/pages/login/login' });
                    }, 800);
                    return;
                }
                let collection = uni.getStorageSync('myCollection') || [];
                collection.push(book);
                uni.setStorageSync('myCollection', collection);
                uni.showToast({
                    title: '已添加到购物车',
                    icon: 'success'
                });
            },
            addToCart(book) {
                const user = uni.getStorageSync('user');
                if (!user || !user.title) {
                    uni.showToast({
                        title: '该功能需要登录使用',
                        icon: 'none',
                        duration: 1500
                    });
                    setTimeout(() => {
                        uni.redirectTo({ url: '/pages/login/login' });
                    }, 200);
                    return;
                }
                let cart = uni.getStorageSync('myCart') || [];
                cart.push(book);
                uni.setStorageSync('myCart', cart);
                uni.showToast({
                    title: '已添加到购物车',
                    icon: 'success'
                });
            },
            fetchBookData() {
                this.loading = true;
                uni.request({
                    url: 'http://localhost:3000/api/bookdate', // 后端接口地址
                    method: 'GET',
                    success: (res) => {
                        // 扁平化所有foods
                        let flatBooks = [];
                        res.data.forEach(item => {
                            if (Array.isArray(item.foods)) {
                                flatBooks.push(...item.foods);
                            }
                        });
                        // 按ISBN去重
                        const seen = new Set();
                        const uniqueBooks = [];
                        flatBooks.forEach(book => {
                            if (!seen.has(book.isbn)) {
                                seen.add(book.isbn);
                                uniqueBooks.push(book);
                            }
                        });
                        this.allBooksArry = uniqueBooks;
                        // 只显示前10本
                        this.bookdateArry = this.allBooksArry.slice(0, 10);
                        this.loading = false;
                    },
                    fail: () => {
                        uni.showToast({
                            title: '获取数据失败',
                            icon: 'none'
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
            // 只重置前10本
            this.bookdateArry = this.allBooksArry.slice(0, 10);
            setTimeout(() => {
                uni.stopPullDownRefresh();
            }, 1000);
        },
        onReachBottom() {
            this.loadMoreData();
        }
    };
</script>

<style lang="scss">
    .shoucan {
        position: relative;
        z-index: 100;
        float: right;
        top: 60rpx;
        right: 20rpx;
        width: 100rpx;
        height: 100rpx;
    }

    // .add-to-cart {
    //     position: relative;
    //     top: 20rpx;
    //     width: 150rpx;
    //     z-index: 100;
    //     float: right;
    //     font-size: 16rpx;
    //     margin-right: 10rpx;
    //     background-color: #5ea586;
    //     color: #fff;
    // }

    // .add-to-collection {
    //     position: relative;
    //     margin-top: 40rpx;
    //     width: 150rpx;
    //     float: right;
    //     z-index: 100;
    //     margin-right: 10rpx;
    //     background-color: #5ea586;
    //     color: #fff;
    // }

    .loading {
        text-align: center;
        margin-top: 20rpx;
        color: #999;
    }

    .huore {
        width: 50rpx;
        height: 50rpx;
        position: absolute;
    }

    .smalltext {
        line-height: 55rpx;
        font-size: 30rpx;
        color: gray;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bottom-box {
        width: 96%;
        margin: 1rpx auto;
        margin-top: 15rpx;
        border: 3rpx solid #f3f3f3;
        border-radius: 25rpx;
        box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
        padding-top: 30rpx;
    }

    .tuijianbook {
        position: relative;
        color: #fff;
        padding: 10rpx;
        margin-left: 30rpx;
        font-weight: bolder;
        width: 800rpx;
        background-color: #5ea586;
        border-radius: 0 0 25rpx 25rpx;
        line-height: 100rpx;
    }

    .lunbobigbox {
        border-radius: 15rpx;
        border: 15rpx solid #f3f3f3;
        box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
        padding: 5rpx;
        // align-items: center;
        background-color: #5ea586;
    }

    .schoolaction {
        font-size: 35rpx;
        color: #fff;
        text-align: center;
        line-height: 50rpx;
        font-weight: bolder;

        margin-left: 25rpx;
    }

    .bottom {
        margin-top: 150rpx;
    }

    .top-title {
        font-size: 50rpx;
        font-weight: bolder;
        color: white;
        width: 100%;
        height: 100rpx;
        position: relative;
        top: 100rpx;
        text-align: center;
        z-index: 100;
    }

    .bgdimg {
        width: 100%;
        height: 100%;
    }

    .bgd {
        width: 100%;
        height: 350rpx;
        border-radius: 0rpx 0rpx 50rpx 50rpx;
        background-image: url("https://ts1.cn.mm.bing.net/th/id/R-C.5f655a350c88ccf08f3f5acf4df742bd?rik=Syt8%2b9Ru%2bGsZwQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f40173%2f9284.jpg_wh300.jpg!%2ffh%2f300%2fquality%2f90&ehk=ZWr8z3WyLzLNHAMhovkqXJymXn0Bx8aoPXWzIJrVPmY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1");
        position: absolute;
        opacity: 0.8;
    }

    .swiper-item {
        width: 100%;
        height: 110%;
        top: 200rpx;
        border-radius: 15rpx;


        object-fit: contain;
        background-color: #fff;
    }

    .lunbo {
        margin: 0rpx 0 0rpx 0rpx;
        border-radius: 0 0 15rpx 15rpx;
        width: 100%;
        height: 100%;
        box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
        position: relative;
    }

    .searcher {
        z-index: 100;
        position: relative;
        top: 100rpx;
        left: 20rpx;
        width: 700rpx;
        height: 85rpx;
        box-shadow: 10rpx 10rpx 10rpx;
        border-radius: 35rpx;
        display: flex;
    }

    .search {
        padding: 20rpx;
        width: 800rpx;
        border-radius: 50rpx;
        background-color: #f3f3f3;
    }

    .icon-search {
        width: 80rpx;
        height: 50rpx;
        margin: 15rpx;
    }

    .navcroll {

        display: flex;
        overflow-x: auto;
        height: 190rpx;
    }

    .xianzhi-box {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        font-size: 10rpx;
        margin-top: 60rpx;
    }

    .xianzhi {
        width: 90rpx;
        height: 90rpx;
    }

    .text {
        font-size: 25rpx;
        font-weight: bold;
        color: #65a29f;
        text-align: center;
    }

    .tuijian {
        padding-top: 20rpx;
        background-color: #fff;
        margin: 2rpx auto;
        height: 250rpx;
        margin-bottom: 30rpx;
        width: 95%;
        box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
        background-color: #f3f3f3;
        display: flex;
        box-shadow: 5rpx 10rpx 10rpx gray;
        flex: 1;
    }

    .fengmian {
        width: 160rpx;
        box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
        height: 180rpx;
        margin: 20rpx;
    }

    .right {
        margin-left: 50rpx;
        line-height: 55rpx;
    }

    .title {
        font-size: 40rpx;
        color: #000;
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>