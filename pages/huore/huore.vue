<template>
    <view class="huoretop">
        <image class="huoreicon" src="../../static/热门.png" mode=""></image>
        <view class="huoretitle">
            火热书籍排行榜
        </view>
    </view>
    <!--    <view v-if="collection.length > 0" class="topboxyouhui">
    </view> -->
    <view class="no-collection">
        暂无用户数据
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .huoretop {
        position: relative;
        top: 10rpx;
        display: flex;
        flex: 1;
        border-radius: 20rpx;
        background-color: #5ea586;
        width: 80%;
        box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
        height: 220rpx;
        margin: 0% auto;

        .huoreicon {
            width: 200rpx;
            height: 200rpx;
        }

        .huoretitle {
            color: #fff;
            font-weight: bolder;
            display: flex;
            font-size: 40rpx;
            align-items: center;
            margin-left: 20rpx;
        }
    }

    .no-collection {
        text-align: center;
        font-size: 18px;
        color: #999;
        margin-top: 50px;
    }
</style>