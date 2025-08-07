<template>
    <view class="address-manage">
        <view class="address-list">
            <view class="address-item" v-for="(address, index) in addresses" :key="index">
                <view class="address-info">
                    <text class="name">{{ address.name }}</text>
                    <text class="phone">{{ address.phone }}</text>
                    <text class="detail">{{ address.detail }}</text>
                </view>
                <view class="address-actions">
                    <button class="edit-btn" @click="openEditPopup(index)">编辑</button>
                    <button class="delete-btn" @click="deleteAddress(index)">删除</button>
                </view>
            </view>
        </view>
        <button class="add-address-btn" @click="openAddPopup">新增地址</button>

        <!-- 编辑地址弹出层 -->
        <uni-popup ref="editPopup" type="center">
            <view class="popup-content">
                <view class="popup-title">编辑地址</view>
                <view class="form-item">
                    <text>姓名:</text>
                    <input v-model="editAddressData.name" placeholder="请输入姓名" />
                </view>
                <view class="form-item">
                    <text>电话:</text>
                    <input v-model="editAddressData.phone" placeholder="请输入电话" />
                </view>
                <view class="form-item">
                    <text>详细地址:</text>
                    <input v-model="editAddressData.detail" placeholder="请输入详细地址" />
                </view>
                <view class="popup-buttons">
                    <button class="cancel-btn" @click="closeEditPopup">取消</button>
                    <button class="save-btn" @click="saveEditAddress">保存</button>
                </view>
            </view>
        </uni-popup>

        <!-- 新增地址弹出层 -->
        <uni-popup ref="addPopup" type="center">
            <view class="popup-content">
                <view class="popup-title">新增地址</view>
                <view class="form-item">
                    <text>姓名:</text>
                    <input v-model="newAddressData.name" placeholder="请输入姓名" />
                </view>
                <view class="form-item">
                    <text>电话:</text>
                    <input v-model="newAddressData.phone" placeholder="请输入电话" />
                </view>
                <view class="form-item">
                    <text>详细地址:</text>
                    <input v-model="newAddressData.detail" placeholder="请输入详细地址" />
                </view>
                <view class="popup-buttons">
                    <button class="cancel-btn" @click="closeAddPopup">取消</button>
                    <button class="save-btn" @click="saveNewAddress">保存</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

    export default {
        components: {
            uniPopup
        },
        data() {
            return {
                addresses: [{
                        name: '张三',
                        phone: '13800000000',
                        detail: '北京市海淀区中关村大街1号'
                    },
                    {
                        name: '李四',
                        phone: '13900000000',
                        detail: '上海市浦东新区陆家嘴环路1000号'
                    }
                ],
                editAddressData: {},
                newAddressData: {}
            };
        },
        methods: {
            openEditPopup(index) {
                this.editAddressData = {
                    ...this.addresses[index],
                    index
                };
                this.$refs.editPopup.open();
            },
            closeEditPopup() {
                this.$refs.editPopup.close();
            },
            saveEditAddress() {
                const {
                    index,
                    ...address
                } = this.editAddressData;
                this.addresses.splice(index, 1, address);
                this.closeEditPopup();
            },
            openAddPopup() {
                this.newAddressData = {};
                this.$refs.addPopup.open();
            },
            closeAddPopup() {
                this.$refs.addPopup.close();
            },
            saveNewAddress() {
                this.addresses.push(this.newAddressData);
                this.closeAddPopup();
            },
            deleteAddress(index) {
                this.addresses.splice(index, 1);
            }
        }
    };
</script>

<style scoped>
    .address-manage {
        padding: 20rpx;
    }

    .address-list {
        margin-bottom: 20rpx;
    }

    .address-item {
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .address-info {
        flex: 1;
    }

    .name,
    .phone,
    .detail {
        display: block;
        margin-bottom: 10rpx;
    }

    .name {
        font-size: 32rpx;
        font-weight: bold;
    }

    .phone {
        font-size: 28rpx;
        color: #555;
    }

    .detail {
        font-size: 24rpx;
        color: #777;
    }

    .address-actions {
        display: flex;
        flex-direction: column;
    }

    .edit-btn,
    .delete-btn {
        background-color: #6aaf90;
        color: #fff;
        border: none;
        padding: 10rpx 20rpx;
        border-radius: 5rpx;
        margin-bottom: 10rpx;
        font-size: 24rpx;
    }

    .add-address-btn {
        background-color: #6aaf90;
        color: #fff;
        border: none;
        padding: 20rpx 0;
        width: 100%;
        border-radius: 10rpx;
        font-size: 32rpx;
    }

    /* 弹出层样式 */
    .popup-content {
        background-color: #fff;
        border-radius: 10rpx;
        padding: 20rpx;
        width: 600rpx;
    }

    .popup-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }

    .form-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
    }

    .form-item text {
        width: 150rpx;
        font-size: 28rpx;
    }

    .form-item input {
        flex: 1;
        padding: 10rpx;
        border: 1rpx solid #ccc;
        border-radius: 5rpx;
        font-size: 28rpx;
    }

    .popup-buttons {
        display: flex;
        justify-content: flex-end;
    }

    .cancel-btn,
    .save-btn {
        background-color: #6aaf90;
        color: #fff;
        border: none;
        padding: 10rpx 20rpx;
        border-radius: 5rpx;
        margin-left: 10rpx;
        font-size: 28rpx;
    }
</style>