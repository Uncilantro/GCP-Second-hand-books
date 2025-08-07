<template>
    <view v-for="(item, index) in filteredData" :key="index" class="item">
        <image :src="item.img" class="item-img" />
        <view class="item-content">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-contact">{{ item.contact }}</view>
            <image :src="item.image" class="item-image" />
        </view>
    </view>
</template>

<script>
export default {
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
      // 删除：data: neirong
      fabuData: [],  // 新增：存储后端数据
      loading: false  // 新增：加载状态
    };
  },
  computed: {
    filteredData() {
      // 只显示名字为“测试用户”的数据
      return this.fabuData.filter(item => item.title && item.title.includes('测试用户'));
    }
  },
  mounted() {
    this.loading = true;
    // 新增：API请求获取数据
    uni.request({
      url: 'http://localhost:3000/api/fabu',
      method: 'GET',
      success: (res) => {
        this.fabuData = res.data;
        this.loading = false;
      },
      fail: () => {
        uni.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
        this.loading = false;
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
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        position: relative;
        top: -120rpx;
        /* 移除 margin-bottom: 250rpx; */
    }

    .item-content {
        flex: 1;
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
</style>
