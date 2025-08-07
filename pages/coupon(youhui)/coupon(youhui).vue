<template>
    <view class="topboxyouhui">
        <!--        <image class="leftimage" src="../../static/优惠券.png" mode=""></image>
        <view class="right">
            <view class="value">5元优惠券</view>
        </view>
        <view class="rightuse">
            <view class="textuse">
                使用
            </view>

        </view> -->
        <!-- v-if="collection.length > 0" -->
    </view>
    <view class="no-collection">
        暂无优惠券
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
    .rightuse {
        background-color: #f3f3f3;
        width: 150rpx;
        height: 140rpx;
        border-radius: 0 15rpx 15rpx 0;
        position: relative;
        top: 27rpx;
        font-size: 50rpx;
        border: 5rpx solid #1296db;

        .textuse {
            font-weight: bolder;
            padding-top: 30rpx;
            padding-left: 20rpx;
            color: #1296db;
        }

    }

    .topboxyouhui {
        display: flex;
        flex: 1;

        .leftimage {
            width: 200rpx;
            height: 200rpx;
        }

        .right {
            width: 400rpx;
            height: 147rpx;
            position: relative;
            background-color: #1296db;
            top: 27rpx;
            margin-left: -50rpx;

            .value {
                color: #fff;
                font-weight: bolder;
                font-size: 40rpx;
                margin-top: 40rpx;
                margin-left: 50rpx;
            }

        }

    }

    .nocoupon {
        font-size: 50rpx;
        height: 600rpx;
        width: 100%;
        position: relative;
        top: 600rpx;
        font-weight: bolder;
        color: #CCC;
        text-align: center;
        margin: 0% auto;
    }

    .no-collection {
        text-align: center;
        font-size: 18px;
        color: #999;
        margin-top: 50px;
    }
</style>