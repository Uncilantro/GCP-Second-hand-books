<template>
	<view>


		<view class="bigtitle">您的搜索关键词为: {{ keyword }}
			<view class="smalltitile">
				搜索结果如下
			</view>
		</view>


		<view class="bottom-box" v-for="(result, index) in searchResults" :key="index" @click="showPopup"
			v-if="searchResults.length > 0">
			<view class="tuijian">
				<image class="huore" src="../../static/火.png" mode=""></image>
				<image :src="result.img" class="fengmian"></image>
				<view class="right">
					<view class="title">
						{{ result.id }}
					</view>
					<view class="smalltext">
						适用专业: {{ result.type }}
					</view>
					<view class="smalltext">
						价格: <span
							style="color: crimson; font-weight: bolder; font-size: 36rpx;">&nbsp;{{ result.jiage }}&nbsp;</span>元
					</view>
					<view class="smalltext">
						ISBN码:{{ result.isbn }}
					</view>
				</view>
				<view class="buttons">
					<image class="shoucan" @click.stop="addToCollection(result[dexin])"
						src="../../static/ic_加入购物车2.png" mode=""></image>
				</view>
			</view>
		</view>

		<view v-else>
			<text>没有找到相关结果</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				searchResults: [],
				allData: []
			};
		},
		onLoad(options) {
			const encodedKeyword = options.keyword;
			const decodedKeyword = decodeURIComponent(encodedKeyword);
			this.keyword = decodedKeyword;
			// 页面加载时请求后端数据
			uni.request({
				url: 'http://localhost:3000/api/bookdate',
				method: 'GET',
				success: (res) => {
					this.allData = res.data;
					this.performSearch();
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
			performSearch() {
				// 扁平化所有foods
				let flatBooks = [];
				this.allData.forEach(college => {
					if (Array.isArray(college.foods)) {
						flatBooks.push(...college.foods);
					}
				});
				// 模糊匹配：关键词出现在id/type/contact等字段即可
				const kw = this.keyword.trim().toLowerCase();
				this.searchResults = flatBooks.filter(food => {
					return (
						(food.id && food.id.toLowerCase().includes(kw)) ||
						(food.type && food.type.toLowerCase().includes(kw)) ||
						(food.contact && food.contact.toLowerCase().includes(kw)) ||
						(food.isbn && String(food.isbn).toLowerCase().includes(kw))
					);
				});
			},
			addToCollection(book) {
				let collection = uni.getStorageSync('myCollection') || [];
				collection.push(book);
				uni.setStorageSync('myCollection', collection);
				uni.showToast({
					title: '已添加到购物车',
					icon: 'success'
				});
			}
		}
	}
</script>

<style>
	.shoucan {
		position: relative;
		z-index: 100;
		float: right;
		top: 60rpx;
		right: 20rpx;
		width: 100rpx;
		height: 100rpx;
	}
	
	.smalltitile {
		text-align: center;
		line-height: 60rpx;
		color: #fff;
	}

	.bigtitle {
		padding-top: 20rpx;
		width: 100%;
		height: 100rpx;
		position: relative;
		text-align: center;
		background-color: #3c7f54;
		color: #fff;
		font-weight: bolder;
	}

	.fengmian {
		width: 160rpx;
		box-shadow: 15rpx 15rpx 15rpx 0 rgba(0, 0, 0, 0.5);
		height: 180rpx;
		margin: 20rpx;
	}

	.huore {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
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