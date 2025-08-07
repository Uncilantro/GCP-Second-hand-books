<template>
    <view>
        <view v-if="collection.length > 0" class="bookbox" v-for="book in collection" :key="book.id">
            <image :src="book.img" mode="aspectFill" class="bookimage"></image>
            <view class="bookright">
                <view class="item-title">
                    {{ book.title || book.id }}
                    <text v-if="book.jiage !== undefined" class="tag tag-price">￥{{ book.jiage }}</text>
                    <text v-if="book.xiaoqv" class="tag tag-xiaoqv">{{ book.xiaoqv }}</text>
                    <text v-if="book.phone" class="tag tag-phone">{{ book.phone }}</text>
                </view>
                <view class="item-contact">{{ book.contact }}</view>
                <image :src="book.image" class="item-image" v-if="book.image" />
            </view>
            <image class="yichu" src="../../static/移出购物车.png" @click="removeFromCollection(book)" mode=""></image>
        </view>
        <view v-else class="no-collection">
            暂无订单
        </view>

        <view class="checkout-bar" v-if="collection.length > 0">
            <view class="total-info">
                <view>共 {{ totalBooks }} 本书</view>
                <view>总价：￥{{ totalPrice }}</view>
            </view>
        </view>
        <view v-if="collection.length > 0" class="trade-tip">出于安全考虑，目前只支持校内线下交易</view>
    </view>
</template>

<script>
    import {
        ref,
        computed,
        onMounted
    } from "vue";
    import {
        onLoad
    } from "@dcloudio/uni-app";

    // 模拟生成支付参数
    const generateMockPayParams = (totalPrice) => {
        return {
            appId: 'wxc7f155a01020bd49', // 确保这里是你在微信开放平台注册的小程序 AppID
            timeStamp: new Date().getTime().toString(),
            nonceStr: Math.random().toString(36).substr(2, 15),
            package: `prepay_id=your_prepay_id_${new Date().getTime()}`, // 替换为你的预支付订单号
            signType: 'MD5',
            paySign: 'your_pay_sign' // 替换为你的支付签名
        };
    };

    export default {
        setup() {
            const collection = ref([]);

            onMounted(() => {
                const storedCollection = uni.getStorageSync('myCollection');
                if (storedCollection) {
                    collection.value = storedCollection;
                    console.log('Loaded collection:', collection.value); // 调试信息
                } else {
                    console.log('No collection found in storage'); // 调试信息
                }
            });

            const removeFromCollection = (book) => {
                const index = collection.value.findIndex(item => item.id === book.id);
                if (index !== -1) {
                    collection.value.splice(index, 1);
                    uni.setStorageSync('myCollection', collection.value);
                    uni.showToast({
                        title: '已从收藏中移除',
                        icon: 'success'
                    });
                }
            };

            const addToCart = (book) => {
                let cart = uni.getStorageSync('myCart') || [];
                cart.push(book);
                uni.setStorageSync('myCart', cart);
                uni.showToast({
                    title: '已添加到购物车',
                    icon: 'success'
                });
            };

            const totalBooks = computed(() => collection.value.length);
            const totalPrice = computed(() => collection.value.reduce((sum, book) => sum + parseFloat(book.jiage), 0)
                .toFixed(2));

            // 移除支付相关功能
            return {
                collection,
                removeFromCollection,
                addToCart,
                totalBooks,
                totalPrice
            };
        }
    };
</script>

<style lang="scss">
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

    .trade-tip {
        text-align: center;
        color: #888;
        font-size: 24rpx;
        margin: 20rpx 0 40rpx 0;
    }
    .no-collection {
        text-align: center;
        font-size: 18px;
        color: #999;
        margin-top: 50px;
    }

    .yichu {
        width: 100rpx;
        height: 100rpx;
        position: relative;
        left: 10rpx;
        top: 120rpx;
        z-index: 100;
    }

    .value {
        font-size: 36rpx;
        font-weight: bolder;
        color: red;
    }

    .bookright {
        line-height: 100rpx;
        width: 400rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #797979;
        margin-left: 40rpx;

    }

    .booktitle {
        font-weight: bolder;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;

        .title {
            color: black;
            font-size: 36rpx;
        }
    }

    .bookbox {
        width: 90%;
        height: 350rpx;
        box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
        padding: 20rpx;
        margin: 40rpx auto;
        border-radius: 30rpx;
        border: 5rpx solid #ccc;
        display: flex;
        flex: 1;
    }

    .bookimage {
        width: 200rpx;
        height: 300rpx;
        margin-top: 20rpx;
    }

    .checkout-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        background-color: #f4f4f4;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -5rpx 10rpx rgba(0, 0, 0, 0.1);

        .total-info {
            font-size: 32rpx;
            color: #333;
        }

        .checkout-button {
            background-color: #007aff;
            color: #fff;
            font-size: 32rpx;
            padding: 10rpx 40rpx;
            border: none;
            border-radius: 10rpx;
        }
    }
</style>