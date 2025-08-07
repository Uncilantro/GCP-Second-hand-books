<template>
    <view>
        <view v-if="favorite.length > 0">
            <view v-for="(item, index) in favorite" :key="index" class="item">
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
                    <button class="delete-button" @click="removeFromCollection(index)">删除</button>
                </view>
            </view>
        </view>
        <view v-else class="no-collection">
            暂无收藏
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                favorite: []
            };
        },
        created() {
            this.loadCollection();
        },
        methods: {
            loadCollection() {
                const favorite = uni.getStorageSync('myFavorite');
                if (favorite) {
                    this.favorite = favorite;
                }
            },
            removeFromCollection(index) {
                this.favorite.splice(index, 1);
                uni.setStorageSync('myFavorite', this.favorite);
                uni.showToast({
                    title: '已从收藏夹移除',
                    icon: 'success'
                });
            }
        }
    };
</script>

<style>
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
        border-radius: 50rpx;
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

    .item-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .item-title {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .item-contact {
        margin-bottom: 5px;
    }

    .item-image {
        width: 100px;
        height: 100px;
        border-radius: 5px;
    }

    .delete-button {
        position: relative;
        bottom: 120rpx;
        left: 100rpx;
        width: 200rpx;
        height: 100rpx;
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #ff4d4d;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .delete-button:hover {
        background-color: #ff1a1a;
    }

    .no-collection {
        text-align: center;
        font-size: 18px;
        color: #999;
        margin-top: 50px;
    }
</style>