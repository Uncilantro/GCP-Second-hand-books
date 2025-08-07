<template>
    <view class="container">
        <view class="content">
            <view class="header">

                <text class="title">用户需知</text>
                <image class="iconxvzhi" src="../../static/用户须知 (1).png" mode=""></image>
            </view>
            <view class="body">
                <view class="section">
                    <text class="section-title">欢迎使用我们的小程序</text>
                    <view class="section-content">
                        感谢您选择我们的小程序！在使用小程序前，请仔细阅读以下条款和条件。
                    </view>
                </view>
                <view class="section">
                    <text class="section-title">服务条款</text>
                    <view class="section-content">
                        1. 本应用提供的所有服务仅供个人使用，不得用于商业目的。<br>
                        2. 用户必须遵守所有适用的法律和法规。<br>
                        3. 用户不得进行任何破坏或干扰本应用的行为。
                    </view>
                </view>
                <view class="section">
                    <text class="section-title">隐私政策</text>
                    <view class="section-content">
                        我们尊重用户的隐私，并承诺不会未经用户同意收集、使用或泄露个人信息。
                    </view>
                </view>
                <view class="section">
                    <text class="section-title">免责声明</text>
                    <view class="section-content">
                        本应用提供的信息仅供参考，不构成任何建议或保证。我们不对因使用本应用而产生的任何损失或损害负责。
                    </view>
                </view>
            </view>
            <view class="footer">
                <button class="accept-button" @click="acceptTerms">我已阅读并同意以上条款</button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        methods: {
            acceptTerms() {
                // 处理用户同意条款后的逻辑
                console.log('用户已同意条款');
                // 可以跳转到主页面或其他操作
                uni.switchTab({
                    url: '/pages/index/index'
                });
            }
        }
    };
</script>

<style lang="scss">
    .iconxvzhi {
        width: 50rpx;
        height: 50rpx;
        position: relative;
        top: 10rpx;
        margin-left: 10rpx;

    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #f7f7f7;
    }

    .content {
        flex-grow: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .header {
        margin-bottom: 20px;
        text-align: center;
    }

    .title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }

    .body {
        flex-grow: 1;
        overflow-y: auto;
    }

    .section {
        margin-bottom: 20px;
    }

    .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }

    .section-content {
        font-size: 14px;
        color: #666;
        line-height: 1.5;
    }

    .footer {
        margin-top: 20px;
        text-align: center;
    }

    .accept-button {
        width: 80%;
        background-color: #65a29f;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #559a95;
        }
    }
</style>