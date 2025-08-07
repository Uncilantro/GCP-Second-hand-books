<template>
	<view class="userInfoContainer">
		<view class="topBox">
			<image :src="user.img" class="avatar" @click="navigateTo"></image>
			<view class="nickName">{{ user.title }}</view>
		</view>
		<view class="iconList">
			<view class="iconItem" @click="navigateToOrder">
				<image class="iconimage" src="../../static/ic_加入购物车2.png" mode=""></image>
				<view class="iconText">我的订单</view>
			</view>
			<view class="iconItem" @click="navigateToFavorites">
				<image class="iconimage" src="../../static/赞.png" mode=""></image>
				<view class="iconText">我的收藏</view>
			</view>
			<view class="iconItem" @click="navigateToHistory">
				<image class="iconimage" src="../../static/历史订单-copy-copy.png" mode=""></image>
				<view class="iconText">历史发布</view>
			</view>
			<view class="iconItem" @click="contactUs">
				<image class="iconimage" src="../../static/联系客服.png" mode=""></image>
				<view class="iconText">联系客服</view>
			</view>
		</view>
		<view class="cellList">
			<navigator @click="navigateToUserGuide" url="addressAdmin/addressAdmin" class="cellItem cellAccess"
				hover-class="cellActive">
				<view class="cellBody">
					<image style="height: 40rpx; width: 40rpx; top: 10rpx; margin-right: 10rpx; position: relative;"
						src="../../static/用户须知.png" mode=""></image>
					用户须知
				</view>
				<view class="cellArrow"></view>
			</navigator>
			<navigator @click="navigateToAddressManagement" url="addressAdmin/addressAdmin" class="cellItem cellAccess"
				hover-class="cellActive">
				<view class="cellBody">
					<image style="height: 40rpx; width: 40rpx; top: 10rpx; margin-right: 10rpx; position: relative;"
						src="../../static/地址.png" mode=""></image>
					地址管理
				</view>
				<view class="cellArrow"></view>
			</navigator>
			<navigator url="myCart/myCart" class="cellItem cellAccess" hover-class="cellActive">
				<view @click="contactUs" class="cellBody">
					<image style="height: 40rpx; width: 40rpx; top: 10rpx; margin-right: 10rpx; position: relative;"
						src="../../static/兼职.png" mode=""></image>
					提出意见
				</view>
				<view class="cellArrow"></view>
			</navigator>
			<navigator @click="contactUs" url="" class="cellItem cellAccess" hover-class="cellActive">
				<view class="cellBody">
					<image style="height: 40rpx; width: 40rpx; top: 10rpx; margin-right: 10rpx; position: relative;"
						src="../../static/加入我们.png" mode=""></image>
					加入我们
				</view>
				<view class="cellArrow"></view>
			</navigator>
			<button v-if="isLogin" @click="logout" class="logoutButton">退出帐号</button>
		</view>
	</view>
</template>

<script>
	import tuiIcon from '../../node_modules/thorui-uni/lib/thorui/tui-icon/tui-icon.vue';
	import tuiFooter from '../../node_modules/thorui-uni/lib/thorui/tui-footer/tui-footer.vue';

	export default {
		components: {
			tuiIcon,
			tuiFooter
		},
		data() {
			return {
				top: 0, // 标题图标距离顶部距离
				opacity: 0,
				scrollTop: 0,
				isLogin: false,
				user: {
					img: '/static/未登录.png', // 默认头像路径
					title: '未登录'
				}
			};
		},
		onLoad() {
			const user = uni.getStorageSync('user');
			if (user && user.title) {
				this.isLogin = true;
				this.user = user;
			} else {
				this.isLogin = false;
				this.user = {
					img: '/static/未登录.png',
					title: '未登录'
				};
			}
		},
		methods: {
			navigateTo() {
				if (!this.isLogin) {
					uni.redirectTo({
						url: '/pages/login/login'
					});
				}
			},
			navigateToOrder() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录后使用',
						icon: 'none',
						duration: 1500
					});
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/login/login' });
					}, 200);
					return;
				}
				uni.navigateTo({
					url: '/pages/wodedingdan/wodedingdan'
				});
			},
			navigateToFavorites() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录后使用',
						icon: 'none',
						duration: 1500
					});
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/login/login' });
					}, 200);
					return;
				}
				uni.navigateTo({
					url: '/pages/wodeshoucan/wodeshoucan'
				});
			},
			navigateToHistory() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录后使用',
						icon: 'none',
						duration: 1500
					});
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/login/login' });
					}, 200);
					return;
				}
				uni.navigateTo({
					url: '/pages/lishifabu/lishifabu'
				});
			},
			contactUs() {
				uni.showModal({
					title: '请联系',
					content: '邮箱:2072794161@qq.com',
				});
			},
			navigateToUserGuide() {
				uni.navigateTo({
					url: '/pages/yonghuxvzhi/yonghuxvzhi'
				});
			},
			navigateToAddressManagement() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请先登录后使用',
						icon: 'none',
						duration: 1500
					});
					setTimeout(() => {
						uni.redirectTo({ url: '/pages/login/login' });
					}, 200);
					return;
				}
				uni.navigateTo({
					url: '/pages/dizhiguanli/dizhiguanli'
				});
			},
			logout() {
				uni.showModal({
					title: '确认退出',
					content: '确定要退出当前账号吗？',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('user');
							this.isLogin = false;
							this.user = {
								img: '/static/未登录.png',
								title: '未登录'
							};
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.iconimage {
		width: 100rpx;
		height: 100rpx;
		padding-top: 20rpx;
	}

	.userInfoContainer {
		height: 100%;
		background-color: #f4f4f4;

		.topBox {
			height: 300rpx;
			background-image: url("https://tse1-mm.cn.bing.net/th/id/OIP-C.-Gh4oo_12XzILX_j7gOHcgHaE_?w=237&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7");
			opacity: 0.8;
			display: flex;
			flex: 2;

			.avatar {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				border: 2px solid white;
				box-shadow: 0 1px 5px black;
				margin-top: 50rpx;
				background-color: #fff;
				object-fit: cover;
			}

			.nickName {
				color: #fff;
				font-weight: bolder;
				font-size: 80rpx;
				margin-top: 80rpx;
				margin-left: 50rpx;
			}
		}

		.iconList {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			width: 90%;
			border-radius: 25rpx;
			margin-top: 10rpx;
			padding-top: 10rpx;
			position: relative;
			left: 5%;
			border: 1rpx solid #f3f3f3;
			background-color: #fff;
			box-shadow: 5rpx 5rpx 5rpx 0 rgba(0, 0, 0, 0.5);
		}

		.iconItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;
		}

		.iconText {
			margin-top: 10rpx;
		}

		.cellList {
			margin-top: 20rpx;

			.cellItem {
				height: 45px;
				display: flex;
				padding-bottom: 5rpx;
				border-bottom: 2rpx solid #ccc;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				padding: 0 10px;
			}

			.cellBody {
				line-height: 100rpx;
				text-align: center;
			}

			.cellArrow {
				width: 0;
				height: 0;
				border-top: 10rpx;
				border-bottom: 10rpx;
				border-left: 10rpx solid #666;
			}
		}

		.logoutButton {
			border: 0;
			border-radius: 0;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 38rpx;
			color: #e94f4f;
			background-color: #fff;
		}
	}
</style>