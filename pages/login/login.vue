<template>
	<view class="body">
		<view class="wrapper">
			<form @submit.prevent="handleLogin">
				<h1 class="title">登录</h1>
				<view class="input-box">
					<i class="fas fa-envelope icon"></i>
					<input type="text" v-model="username" id="usernameInput" required ref="usernameInputRef"
						@focus="moveLabel('username')" @blur="resetLabel('username')" />
					<label :class="{ moved: isUsernameMoved }" for="usernameInput">Username</label>
				</view>
				<view class="input-box">
					<i class="fas fa-lock icon"></i>
					<input type="password" v-model="password" id="passwordInput" required ref="passwordInputRef"
						@focus="moveLabel('password')" @blur="resetLabel('password')" />
					<label :class="{ moved: isPasswordMoved }" for="passwordInput">Password</label>
				</view>
				<button class="btn" @click="handleLogin">登录</button>
				<!-- <view class="signup-link" @click="naviga">
					<p> <a href="#">立即注册</a></p>
				</view> -->
			</form>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const isUsernameMoved = ref(false);
const isPasswordMoved = ref(false);
const router = useRouter();
const accountData = ref([]);

const defaultAccount = 'testuser';
const defaultPassword = '123456';

function naviga() {
    uni.navigateTo({
        url: '/pages/zuce/zuce'
    })
}

function handleLogin() {
    if (!accountData.value.length) {
        uni.showToast({
            title: '账号数据未加载',
            icon: 'none',
            duration: 2000
        });
        return;
    }
    const account = accountData.value.find(item => item.content.account === username.value);
    if (account) {
        if (account.content.password === password.value) {
            uni.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
            });
            // 存储用户信息
            uni.setStorageSync('user', {
                img: account.content.img,
                title: account.content.title
            });
            setTimeout(() => {
                uni.switchTab({
                    url: '/pages/mine/mine'
                });
            }, 1000);
        } else {
            uni.showToast({
                title: '密码错误',
                icon: 'none',
                duration: 2000
            });
        }
    } else {
        uni.showToast({
            title: '用户名不存在',
            icon: 'none',
            duration: 2000
        });
    }
}

function forgotman() {
    alert('Please email 1145029428@qq.com to request a password reset');
}

function moveLabel(inputType) {
    if (inputType === 'username') {
        isUsernameMoved.value = true;
    } else if (inputType === 'password') {
        isPasswordMoved.value = true;
    }
}

function resetLabel(inputType) {
    if (inputType === 'username' && !username.value) {
        isUsernameMoved.value = false;
    } else if (inputType === 'password' && !password.value) {
        isPasswordMoved.value = false;
    }
}

onMounted(() => {
    // 页面加载时请求后端账号数据
    uni.request({
        url: 'http://localhost:3000/api/login',
        method: 'GET',
        success: (res) => {
            if (Array.isArray(res.data)) {
                accountData.value = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                accountData.value = res.data.data;
            } else {
                accountData.value = [];
            }
        },
        fail: () => {
            uni.showToast({
                title: '获取账号数据失败',
                icon: 'none'
            });
            accountData.value = [];
        }
    });
    // 移除测试账号密码弹窗
});
</script>

<style scoped>
	.title {
		color: #4e987a;
		font-weight: bolder;
		font-size: 60rpx;
		letter-spacing: 2px;
	}

	.body {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #e8f5e9 0%, #56a081 60%, #4e987a 100%);
	}

	.wrapper {
		position: relative;
		width: 340px;
		max-width: 70vw;
		height: 420px;
		background: #fff;
		border-radius: 18px;
		box-shadow: 0 8px 32px 0 rgba(86,160,129,0.12);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px 24px 32px 24px;
	}

	.wrapper h1 {
		font-size: 2em;
		color: #4e987a;
		text-align: center;
		margin-bottom: 24px;
	}

	.input-box {
		position: relative;
		width: 100%;
		margin: 24px 0 0 0;
		border-bottom: 2px solid #56a081;
	}

	.input-box label {
		position: absolute;
		top: 50%;
		left: 5px;
		transform: translateY(-50%);
		font-size: 1em;
		pointer-events: none;
		transition: 0.5s;
		color: #56a081;
	}

	.input-box input {
		width: 100%;
		height: 48px;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1em;
		color: #222;
		padding: 0 40px 0 5px;
	}

	.input-box label.moved {
		top: -5px;
		font-size: 12px;
		color: #4e987a;
	}

	.wrapper .input-box .icon {
		position: absolute;
		right: 8px;
		font-size: 1.2em;
		color: #56a081;
		line-height: 57px;
	}

	.wrapper .row {
		margin: 8px 0 16px;
		font-size: 0.9em;
		color: #56a081;
		display: flex;
		justify-content: flex-end;
	}

	.wrapper .row a {
		color: #56a081;
		text-decoration: none;
		transition: color 0.2s;
	}
	.wrapper .row a:hover {
		color: #4e987a;
		text-decoration: underline;
	}

	.wrapper .btn {
		width: 100%;
		height: 44px;
		background: linear-gradient(90deg, #56a081 0%, #4e987a 100%);
		outline: none;
		border: none;
		border-radius: 40px;
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		color: #fff;
		margin-top: 24px;
		box-shadow: 0 2px 8px 0 rgba(86,160,129,0.10);
		transition: background 0.2s;
	}
	.btn:hover {
		background: linear-gradient(90deg, #4e987a 0%, #56a081 100%);
	}

	.wrapper .signup-link {
		font-size: 0.9em;
		color: #56a081;
		text-align: center;
		margin: 25px 0 10px;
	}
	.wrapper .signup-link a {
		color: #56a081;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s;
	}
	.wrapper .signup-link a:hover {
		color: #4e987a;
		text-decoration: underline;
	}

	.wechat-login {
		margin-top: 30px;
		display: flex;
		justify-content: center;
	}
	.wechat-btn {
		background: #56a081;
		color: #fff;
		border: none;
		border-radius: 40px;
		padding: 0 30px;
		height: 44px;
		display: flex;
		align-items: center;
		font-size: 16px;
		box-shadow: 0 2px 8px 0 rgba(86,160,129,0.10);
		transition: background 0.2s;
	}
	.wechat-btn:hover {
		background: #4e987a;
	}
	.wechat-icon {
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}

	@media (max-width: 400px) {
		.wrapper {
			width: 96vw;
			max-width: 96vw;
			height: 520px;
			padding: 24px 8px 16px 8px;
		}
		.wrapper .input-box {
			width: 90vw;
		}
	}
</style>