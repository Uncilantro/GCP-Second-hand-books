<template>
	<view class="lowtop">
		<image class="lowicon" src="../../static/价格最低白.png" mode=""></image>
		<view class="lowtitle">
			价格最低排行榜
		</view>
	</view>
	<view class="no-collection" v-if="sortedItems.length === 0">
		暂无用户数据
	</view>
	<view v-else>
		<view v-for="(item, idx) in sortedItems.slice(0, 100)" :key="item.isbn || idx" class="print-item rank-item">
			<view class="rank-badge">{{ idx + 1 }}</view>
			<image :src="item.img" class="print-item-img" />
			<view class="print-item-content">
				<view class="print-item-title">{{ item.id }}</view>
				<view class="print-item-price">价格: {{ item.jiage }} 元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allData: []
			};
		},
		computed: {
			sortedItems() {
				let allItems = [];
				if (Array.isArray(this.allData)) {
					this.allData.forEach(college => {
						if (Array.isArray(college.foods)) {
							allItems.push(...college.foods);
						}
					});
				}
				// 只保留有价格的
				allItems = allItems.filter(item => typeof item.jiage === 'number' && !isNaN(item.jiage));
				// 按价格升序排列
				return allItems.sort((a, b) => a.jiage - b.jiage);
			}
		},
		onLoad() {
			// 页面加载时请求后端数据
			uni.request({
				url: 'http://localhost:3000/api/bookdate',
				method: 'GET',
				success: (res) => {
					this.allData = res.data;
				},
				fail: () => {
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					});
				}
			});
		}
	}
</script>

<style lang="scss">
	.lowtop {
		position: relative;
		top: 10rpx;
		display: flex;
		flex: 1;
		border-radius: 20rpx;
		background-color: #17257c;
		box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
		width: 80%;
		height: 220rpx;
		margin: 0% auto;

		.lowicon {
			width: 180rpx;
			height: 180rpx;
			position: relative;
			top: 20rpx;
			left: 20rpx;
		}

		.lowtitle {
			color: white;
			font-weight: bolder;
			font-size: 40rpx;
			top:80rpx;
			position: relative;
			align-items: center;
			margin-left: 40rpx;
		}
	}


	.rank-item {
		display: flex;
		align-items: center;
		margin: 30rpx 0 30rpx 0;
		padding: 30rpx 20rpx 30rpx 20rpx;
		background: linear-gradient(135deg, #f8fafc 60%, #e6f0fa 100%);
		border-radius: 24rpx;
		box-shadow: 0 8rpx 24rpx rgba(50, 141, 100, 0.10), 0 2rpx 8rpx rgba(0,0,0,0.08);
		position: relative;
		transition: box-shadow 0.2s;
	}
	.rank-item:hover {
		box-shadow: 0 12rpx 32rpx rgba(50, 141, 100, 0.18), 0 4rpx 16rpx rgba(0,0,0,0.12);
	}
	.rank-badge {
		width: 48rpx;
		height: 48rpx;
		background: #328d64;
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(50, 141, 100, 0.18);
	}
	.print-item-img {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 16rpx;
		box-shadow: 0 2rpx 8rpx rgba(50, 141, 100, 0.10);
	}
	.print-item-content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.print-item-title {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 10rpx;
		font-weight: bold;
		flex: 1;
	}
	.print-item-price {
		font-size: 28rpx;
		color: #328d64;
		margin-bottom: 10rpx;
		font-weight: bold;
		flex: 1;
	}

	.print-item-img {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}

	.print-item-content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.print-item-title {
		font-size: 32rpx;
		color: #333;
		margin-bottom: 10rpx;
		flex: 1;
	}

	.print-item-price {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
		flex: 1;
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
</style>