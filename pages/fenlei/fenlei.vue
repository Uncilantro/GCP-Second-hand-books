<template>
	<view class="select">
		请选择你的学院
	</view>
	<view class="containerbottom">


		<view class="big1">
			<view class="small1" @click="dropxingxi">
				<image src="../../static/微信图片_20241016014036.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					信息工程学院
				</view>
			</view>
			<view class="small1" @click="dropjidian">
				<image src="../../static/微信图片_202410160140405.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					智能制造学院
				</view>
			</view>
			<view class="small1" @click="droptesu">
				<image src="../../static/微信图片_20241016014039.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					特殊教育学院
				</view>
			</view>
			<view class="small1" @click="droplvyou">
				<image src="../../static/微信图片_20241016014040.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					旅游学院
				</view>
			</view>
		</view>
		<view class="big1">
			<view class="small1" @click="dropshipin">
				<image src="../../static/微信图片_20241016014041.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					食品健康学院
				</view>
			</view>
			<view class="small1">
			</view>
			<view class="small1">
			</view>
			<view class="small1" @click="dropshangwu">
				<image src="../../static/微信图片_20241016014047.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					数字商贸学院
				</view>
			</view>
		</view>
		<view class="big1">
			<view class="small1" @click="dropyishu">
				<image src="../../static/微信图片_20241016014045.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					艺术与新媒体学院
				</view>
			</view>
			<view class="small1">
			</view>
			<view class="small1">
			</view>
			<view class="small1" @click="dropguanli">
				<image src="../../static/微信图片_202410160140391.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					公共管理学院
				</view>
			</view>
		</view>
		<view class="big1">
			<view class="small1" @click="dropchengjian">
				<image src="../../static/微信图片_202410160140401.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					智慧城建学院
				</view>
			</view>
			<view class="small1" @click="dropguangshang">
				<image src="../../static/微信图片_202410160140402.jpg" mode="" class="imagesmall"></image>
				<view class="textxueyuan">
					关山月中国画学院
				</view>
			</view>
			<view class="small1" @click="dropwangchuan">
				<image style="border-radius: 100%;" src="../../static/微信图片_202410160140404.jpg" mode=""
					class="imagesmall"></image>
				<view class="textxueyuan">
					网络新闻与传播学院
				</view>
			</view>
			<view class="small1" @click="dropqita">
				<image src="../../static/加.png" mode="" class="imagesmallest"></image>
				<view class="textxueyuan">
					其他学院
				</view>
			</view>
		</view>
		<view class="centerpic">
			<image class="centerpicer"
				src="https://ts4.cn.mm.bing.net/th?id=OIP-C.e77JQfA_lOUmPJJDxbPHMQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
				mode=""></image>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			dropxingxi() {
				uni.navigateTo({
					url: '/pages/zhuanye/zhuanye'
				})
			},
			dropjidian() {
				uni.navigateTo({
					url: '/pages/zhinengzhizhao/zhinengzhizhao'
				})
			},
			droptesu() {
				uni.navigateTo({
					url: '/pages/teshujiaoyu/teshujiaoyu'
				})
			},
			droplvyou() {
				uni.navigateTo({
					url: '/pages/lvyou/lvyou'
				})
			},
			dropshipin() {
				uni.navigateTo({
					url: '/pages/shiping/shiping'
				})
			},
			dropshangwu() {
				uni.navigateTo({
					url: '/pages/shuzishangmao/shuzishangmao'
				})
			},
			dropyishu() {
				uni.navigateTo({
					url: '/pages/yishuyuxinmeiti/yishuyuxinmeiti'
				})
			},
			dropguanli() {
				uni.navigateTo({
					url: '/pages/gonggongguanli/gonggongguanli'
				})
			},
			dropchengjian() {
				uni.navigateTo({
					url: '/pages/zhihuichengjian/zhihuichengjian'
				})
			},
			dropguangshang() {
				uni.navigateTo({
					url: '/pages/guangshangyue/guangshangyue'
				})
			},
			dropwangchuan() {
				uni.navigateTo({
					url: '/pages/wangluoxinwenyuchuanbo/wangluoxinwenyuchuanbo'
				})
			},
			dropqita() {
				uni.navigateTo({
					url: '/pages/qita/qita'
				})
			}
		}
	}
</script>
<style>
	.imagesmallest {
		background-color: #ccc;
		border-radius: 50%;
		width: 160rpx;
		height: 150rpx;
		margin-left: 15rpx;
		margin-top: 20rpx;
		z-index: 100;
	}

	.textxueyuan {
		font-size: 18rpx;
		line-height: 10rpx;
		text-align: center;
		font-weight: bold;
	}

	.select {
		font-weight: bolder;
		color: #255d40;
		text-align: center;
		height: 100rpx;
		border-radius: 25rpx 25rpx 0 0;
		padding-top: 40rpx;
		margin: 1rpx auto;
		width: 96%;
		font-size: 40rpx;
		background-color: #f3f3f3;
	}

	.containerbottom {
		width: 95%;
		margin: 0 auto;
		border: 2rpx solid #ccc;
		border-radius: 0 0 25rpx 25rpx;
		box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);

	}

	.imagesmall {
		border-radius: 50%;
		width: 160rpx;
		height: 150rpx;
		margin-left: 15rpx;
		margin-top: 20rpx;
		z-index: 100;

	}

	.centerpic {
		width: 48%;
		height: 400rpx;
		position: absolute;
		border-radius: 100%;
		/*      box-shadow: 5rpx 5rpx 5rpx 5rpx; */
		left: 25%;
		top: 340rpx;
	}

	.centerpicer {
		width: 375rpx;
		height: 400rpx;
		border-radius: 100%;
	}

	.big1 {
		width: 100%;
		height: 200rpx;
		display: flex;
		flex: 1;
	}

	.small1 {
		width: 25%;
	}

	.small1:hover {
		transform: scale(1.05, 1.0);
		border: 2rpx solid #ccc;
		box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
		border-radius: 15rpx;
		z-index: 100;
	}
</style>