<template>
	<view class="container">
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<view class="left-scroll-view-item" v-for="(type, index) in college" :key="type"
					@click="selectType(type, index)" :class="{active: currentIndex === index}">
					{{ type }}
				</view>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y>
				<view class="bottom-box" v-for="item in filteredItems" :key="item.id">
					<view class="tuijian">
						<img :src="item.img" alt="Book Cover" class="fengmian" />
						<view class="right">
							<view class="title">
								{{ item.id }}
							</view>
							<view class="smalltext">
								适用专业: {{ item.type }}
							</view>
							<view class="smalltext">
								价格: <span
									style="color: crimson; font-weight: bolder; font-size: 36rpx;">&nbsp;{{ item.jiage }}&nbsp;</span>元
							</view>
							<view class="smalltext">
								ISBN码:{{ item.isbn }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {
				college: [],
				allItems: [],
				selectedType: '',
				wh: 0,
				currentIndex: 0
			};
		},
		computed: {
			...mapState(['items']),
			filteredItems() {
				if (this.selectedType) {
					return this.allItems.filter(item => item.type === this.selectedType);
				}
				return this.allItems;
			}
		},
		created() {
			// 页面加载时请求后端数据
			uni.request({
				url: 'http://localhost:3000/api/bookdate',
				method: 'GET',
				success: (res) => {
					const data = res.data;
					const teshujiaoyuCollege = data.find(college => college.names === '特殊教育学院');
					if (teshujiaoyuCollege) {
						this.college = [...new Set(teshujiaoyuCollege.foods.map(food => food.type))];
						this.allItems = teshujiaoyuCollege.foods;
						console.log('college:', this.college);
						console.log('allItems:', this.allItems);
					} else {
						console.error('特殊教育学院数据未找到');
					}
				},
				fail: () => {
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					});
				}
			});
		},
		methods: {
			selectType(type, index) {
				this.selectedType = type;
				this.currentIndex = index;
			}
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync();
			// 为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight;
			console.log('窗口高度:', this.wh);
		}
	};
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.scroll-view-container {
		display: flex;
		flex-grow: 1;
		overflow: hidden;
	}

	.left-scroll-view {
		width: 120px;
		border-right: 1px solid #ccc;
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.left-scroll-view-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 14px;
			border-bottom: 1px solid #ddd;
			transition: background-color 0.3s;
			position: relative;
			min-height: 80px;
			/* 增加高度 */
			padding: 10px 0;
			/* 增加内边距 */

			&.active {
				background-color: #ffffff;

				&::before {
					content: ' ';
					display: block;
					width: 6rpx;
					height: 100%;
					background-color: #65a29f;
					position: absolute;
					left: 0;
					top: 0;
				}
			}
		}
	}

	.right-scroll-view {
		flex-grow: 1;
		padding: 10px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
		overflow-y: auto;
	}

	.selected-college {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 10px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s;

		&:hover {
			transform: translateY(-5px);
		}

		img {
			max-width: 100%;
			height: auto;
			border-radius: 4px;
			margin-bottom: 10px;
		}

		h3 {
			margin: 0 0 10px;
			font-size: 18px;
		}

		p {
			margin: 5px 0;
			font-size: 14px;
		}
	}

	.smalltext {
		line-height: 55rpx;
		font-size: 30rpx;
		color: gray;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bottom-box {
		width: 96%;
		margin: 1rpx auto;
		margin-top: 15rpx;
		border: 3rpx solid #f3f3f3;
		border-radius: 25rpx;
		box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
		padding-top: 30rpx;
	}

	.tuijian {
		padding-top: 20rpx;
		background-color: #fff;
		margin: 2rpx auto;
		height: 250rpx;
		margin-bottom: 30rpx;
		width: 95%;
		box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
		background-color: #f3f3f3;
		display: flex;
		box-shadow: 5rpx 10rpx 10rpx gray;
		flex: 1;
	}

	.fengmian {
		width: 160rpx;
		box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
		height: 180rpx;
		margin: 20rpx;
	}

	.right {
		margin-left: 50rpx;
		line-height: 55rpx;
	}

	.title {
		font-size: 40rpx;
		color: #000;
		font-weight: bold;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>