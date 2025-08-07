<template>
	<view class="newtop">
	    <image class="newicon" src="../../static/最新red.png" mode=""></image>
	    <view class="newtitle">
	        最新书籍排行榜
	    </view>
		<view class="no-collection" v-if="latestData.length === 0">
			暂无用户数据
		</view>
	</view>
	<view v-for="(item, index) in latestData" :key="index" class="print-item">
		<image :src="item.image" class="print-item-img" />
		<view class="print-item-content">
			<view class="print-item-title">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latestData: [],
				loading: false
			};
		},
		methods: {
			fetchLatestData() {
				this.loading = true;
				uni.request({
					url: 'http://localhost:3000/api/fabu',
					method: 'GET',
					success: (res) => {
						this.latestData = res.data;
						this.loading = false;
					},
					fail: () => {
						uni.showToast({
							title: '连接服务器失败',
							icon: 'none'
						});
						this.loading = false;
					}
				});
			}
		},
		onLoad() {
			this.fetchLatestData();
		}
	}
</script>

<style lang="scss">
	.newtop {
	    position: relative;
	    top: 10rpx;
	    position: relative;
	    display: flex;
	    flex: 1;
	    border-radius: 20rpx;
	    background-color: #f3f3f3;
	    box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
	    width: 80%;
	    height: 220rpx;
	    margin: 0% auto;
	
	    .newicon {
	        width: 200rpx;
	        height: 200rpx;
	        position: relative;
	        left: 20rpx;
	        z-index: 100;
	    }
	
	    .newtitle {
	        color: firebrick;
	        font-weight: bolder;
	        display: flex;
	        font-size: 40rpx;
	        align-items: center;
	        margin-left: 40rpx;
	    }
	}
	
	.print-page {
		padding: 20rpx;
	}

	.print-header {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.no-collection {
		text-align: center;
		font-size: 18px;
		color: #999;
		margin-top: 50px;
	}

	.print-item {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	.print-item-img {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}

	.print-item-content {
		flex: 1;
	}

	.print-item-title {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.print-item-contact {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
	}
</style>