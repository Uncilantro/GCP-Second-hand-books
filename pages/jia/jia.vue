<template>
    <view class="container">
        <view class="navbar">
            <view @click="switchPage('buy')" :class="{ active: currentPage === 'buy' }">我要买书</view>
            <view @click="switchPage('sell')" :class="{ active: currentPage === 'sell' }">我要卖书</view>

        </view>
        <!-- 卖书表单 -->
        <view class="form-box" v-if="currentPage === 'sell'">
            <view class="panel">
                <view class="cell">
                    <view class="label">卖出书籍名称</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入书籍名称" v-model="sellForm.bookName" type="text" />
                    </view>
                </view>
                <view class="cell image-box">
                    <view v-if="sellForm.bookImage" class="preview-image">
                        <image :src="sellForm.bookImage" mode="aspectFill" style="width: 100px; height: 100px;" />
                    </view>
                </view>
                <button @click="chooseImage('sell')">选择图片</button>
                <view class="cell">
                    <view class="label">校区</view>
                    <view class="input-box">
                        <picker :value="sellForm.campusIndex" :range="campuses"
                            @change="handleCampusChange('sell', $event)">
                            <view class="select">{{ campuses[sellForm.campusIndex] }}</view>
                        </picker>
                    </view>
                </view>
                <view class="cell">
                    <view class="label">价格</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入价格" v-model="sellForm.bookPrice" type="number" />
                    </view>
                </view>
                <view class="cell">
                    <view class="label">电话</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入您的电话号码" v-model="sellForm.bookPhone" type="digit" />
                    </view>
                </view>
                <view class="cell">
                    <view class="label">请输入卖书备注</view>
                    <view class="input-box">
                        <textarea class="input" v-model="sellForm.bookContact" placeholder="请输入信息"></textarea>
                    </view>
                </view>
            </view>
            <button type="primary" size="default"
                :disabled="!(sellForm.bookName && sellForm.bookPhone && sellForm.bookImage && sellForm.bookContact && sellForm.bookPrice)"
                :loading="buttonLoading" @click="submitBook('sell')">
                立即发布
            </button>
        </view>

        <!-- 买书表单 -->
        <view class="form-box" v-if="currentPage === 'buy'">
            <view class="panel">
                <view class="cell">
                    <view class="label">想买书籍名称</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入书籍名称" v-model="buyForm.bookName" type="text" />
                    </view>
                </view>
                <view class="cell image-box">
                    <view v-if="buyForm.bookImage" class="preview-image">
                        <image :src="buyForm.bookImage" mode="aspectFill" style="width: 100px; height: 100px;" />
                    </view>
                </view>
                <button @click="chooseImage('buy')">选择图片</button>
                <view class="cell">
                    <view class="label">校区</view>
                    <view class="input-box">
                        <picker :value="buyForm.campusIndex" :range="campuses"
                            @change="handleCampusChange('buy', $event)">
                            <view class="select">{{ campuses[buyForm.campusIndex] }}</view>
                        </picker>
                    </view>
                </view>
                <view class="cell">
                    <view class="label">价格</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入价格" v-model="buyForm.bookPrice" type="number" />
                    </view>
                </view>
                <view class="cell">
                    <view class="label">电话</view>
                    <view class="input-box">
                        <input class="input" placeholder="请输入您的电话号码" v-model="buyForm.bookPhone" type="digit" />
                    </view>
                </view>
                <view class="cell">
                    <view class="label">请输入想买书籍备注</view>
                    <view class="input-box">
                        <textarea class="input" v-model="buyForm.bookContact" placeholder="请输入信息"></textarea>
                    </view>
                </view>
            </view>
            <button type="primary" size="default"
                :disabled="!(buyForm.bookName && buyForm.bookPhone && buyForm.bookImage && buyForm.bookContact && buyForm.bookPrice)"
                :loading="buttonLoading" @click="submitBook('buy')">
                立即发布
            </button>
        </view>
    </view>
</template>

<script setup>
    import {
        ref, onMounted
    } from 'vue';
    // 表单数据
    const sellForm = ref({
        bookName: '',
        bookPrice: '',
        campusIndex: 0,
        bookPhone: '',
        bookContact: '',
        bookImage: ''
    });

    const buyForm = ref({
        bookName: '',
        bookPrice: '',
        campusIndex: 0,
        bookPhone: '',
        bookContact: '',
        bookImage: ''
    });

    const campuses = ['科教城西区', '科教城东区'];
    const buttonLoading = ref(false);
    const currentPage = ref('sell');

    onMounted(() => {
        const user = uni.getStorageSync('user');
        if (!user || !user.title) {
            uni.showToast({
                title: '该功能需要登录后使用',
                icon: 'none',
                duration: 5000
            });
            setTimeout(() => {
                uni.redirectTo({ url: '/pages/login/login' });
            }, 200);
        }
    });

    // 切换页面
    function switchPage(page) {
        currentPage.value = page;
    }

    // 处理校区选择变化
    function handleCampusChange(type, event) {
        if (type === 'sell') {
            sellForm.value.campusIndex = event.detail.value;
        } else if (type === 'buy') {
            buyForm.value.campusIndex = event.detail.value;
        }
    }

    // 选择图片
    async function chooseImage(type) {
        const result = await uni.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera']
        });
        if (type === 'sell') {
            sellForm.value.bookImage = result.tempFilePaths[0];
        } else if (type === 'buy') {
            buyForm.value.bookImage = result.tempFilePaths[0];
        }
    }

    // 提交书籍信息到后端
    async function submitBook(type) {
        buttonLoading.value = true;
        const form = type === 'sell' ? sellForm.value : buyForm.value;
        const bookData = {
            img: form.bookImage || 'https://tse3-mm.cn.bing.net/th/id/OIP-C.0-vJS5KbFZwCSWe-dWqKrwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
            title: `${form.bookName} ${form.bookPhone}`,
            type: type === 'sell' ? '我要卖书' : '我要买书',
            contact: form.bookContact,
            image: form.bookImage,
            xiaoqv: campuses[form.campusIndex],
            jiage: parseFloat(form.bookPrice),
            phone: parseInt(form.bookPhone),
            name: form.bookName
        };
        uni.request({
            url: 'http://localhost:3000/api/fabu',
            method: 'POST',
            data: bookData,
            success: (res) => {
                uni.showToast({ title: '发布成功', icon: 'success' });
                setTimeout(() => {
                    uni.showToast({ title: '请耐心等待管理员审核', icon: 'none', duration: 3000 });
                }, 800);
                // 清空表单
                if (type === 'sell') {
                    sellForm.value = { bookName: '', bookPrice: '', campusIndex: 0, bookPhone: '', bookContact: '', bookImage: '' };
                } else {
                    buyForm.value = { bookName: '', bookPrice: '', campusIndex: 0, bookPhone: '', bookContact: '', bookImage: '' };
                }
            },
            fail: () => {
                uni.showToast({ title: '发布失败', icon: 'none' });
            },
            complete: () => {
                buttonLoading.value = false;
            }
        });
    }
</script>

<style scoped>
    /* 基础样式 */
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #f9f9f9;
    }

    .navbar {
        display: flex;
        height: 110rpx;
        text-align: center;
        margin-top: 10rpx;
        line-height: 70rpx;
        justify-content: space-around;
        background-color: #ffffff;
        box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    .navbar view {
        padding: 10rpx 20rpx;
        border: none;
        outline: none;
        background-color: transparent;
        transition: all 0.3s ease;
    }

    .navbar .active {
        color: #ffffff;
        margin-top: 15rpx;
        height: 60rpx;
        background-color: #328d64;
        border-radius: 40rpx;
        font-weight: bold;
    }

    .content {
        flex: 1;
        overflow-y: auto;
        padding: 20rpx;
    }

    .form-box {
        padding: 32rpx;
        background-color: #ffffff;
        border-radius: 16rpx;
        box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
        margin-bottom: 32rpx;
    }

    .panel {
        margin-top: 32rpx;
    }

    .cell {
        display: flex;
        align-items: center;
        padding: 24rpx 32rpx;
        border-bottom: 1rpx solid #ebedf0;
    }

    .cell:last-child {
        border-bottom: none;
    }

    .label {
        text-align: left;
        width: 150rpx;
        font-size: 24rpx;
        color: #333333;
    }

    .input-box {
        flex: 1;
        margin-left: 16rpx;
    }

    .input {
        width: 100%;
        height: 50rpx;
        padding: 10rpx;
        border: 1rpx solid #dcdfe6;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #606266;
    }

    .textarea {
        width: 100%;
        height: 100rpx;
        padding: 10rpx;
        border: 1rpx solid #dcdfe6;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #606266;
        resize: none;
    }

    .image-box {
        position: relative;
        display: flex;
        justify-content: center;
        margin-left: 250rpx;
        width: 120rpx;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        height: 150rpx;
        border: 1rpx solid #dcdfe6;
        border-radius: 8rpx;
        box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
        overflow: hidden;
    }

    .preview-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .select {
        width: 100%;
        height: 50rpx;
        padding: 10rpx;
        border: 1rpx solid #dcdfe6;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #606266;
        background-color: #ffffff;
    }

    .button {
        width: 200rpx;
        height: 50rpx;
        margin-top: 20rpx;
        background-color: #40a9ff;
        color: #ffffff;
        border: none;
        border-radius: 4rpx;
        font-size: 28rpx;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .button.loading::after {
        content: '';
        display: inline-block;
        width: 16rpx;
        height: 16rpx;
        border: 2rpx solid #ffffff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 10rpx;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>