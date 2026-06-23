<template>
	<view class="loginForm">
		<image class="logo" src="../../static/logo.png"></image>
		<view class="input">
			<textarea id="phone" v-model="loginForm.data.phone" type="text" placeholder="请输入手机号" always-embed />
			<image class="icon" v-show="loginForm.data.phone != ''" src="../../static/icon/login/close.png" @click="loginForm.data.phone = ''"></image>
			<view class="send-btn" @click="getCheckCode()">{{ sendBtn }}</view>
		</view>
		<view class="input">
			<textarea id="code" v-model="loginForm.data.checkCode" class="code-input" type="text" placeholder="请输入验证码" always-embed />
			<image class="icon" v-show="loginForm.data.checkCode != ''" src="../../static/icon/login/close.png" @click="loginForm.data.checkCode = ''"></image>
		</view>
		<view class="tip">{{ tip }}</view>
		<view class="login-btn" :class="{ disable: isDisable }" @click="login()">登录</view>
	</view>
	<MyLoading v-if="isLoading"></MyLoading>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { getCode, loginByCode } from '../../http/api/user.js';
import { userStore } from '../../store/user.js';
import MyLoading from '../../components/MyLoading.vue'

const isLoading = ref(false);
const isDisable = computed(() => {
	if (loginForm.data.phone.length == 11 && loginForm.data.checkCode.length == 6) return false;
	return true;
});

const loginForm = reactive({
	data: {
		phone: '',
		checkCode: ''
	}
});

// 手机号正则
const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const getCheckCode = () => {
	//如果被禁用
	if (sendState == 'disable') return;
	tip.value = '';
	//手机号校验
	if (!phoneReg.test(loginForm.data.phone)) {
		tip.value = '请输入有效的手机号';
		return;
	}
	//获取验证码
	isLoading.value = true;
	getCode(loginForm.data.phone).then(res => {
		console.log(res);
		isLoading.value = false;
		//提示信息
		uni.showToast({
			icon: 'success',
			title: '验证码已发送'
		});
		//禁用按钮
		sendState = 'disable';
		console.log(sendState);
		//倒计时
		let i = 60;
		let time = setInterval(() => {
			sendBtn.value = '已发送(' + i-- + ')';
		}, 1000);
		setTimeout(() => {
			clearInterval(time);
			sendState = 'avaliable';
			sendBtn.value = '获取验证码';
		}, 60000);
	});
};

const login = () => {
	if (!phoneReg.test(loginForm.data.phone)) {
		tip.value = '请输入有效的手机号';
		return;
	}
	if (!loginForm.data.checkCode.length == 6) {
		tip.value = '无效验证码';
		return;
	}
	isLoading.value = true;
	loginByCode(loginForm.data.phone, loginForm.data.checkCode).then(res => {
		// console.log(res);
		isLoading.value = false;
		uni.setStorageSync('token', res.data.data);
		userStore().getUserInfo();
		uni.navigateBack();
		// uni.switchTab({
		// 	url: '/pages/MyInfo/MyInfo'
		// });
	});
};

//提示信息
const tip = ref('');

//发送验证码按钮
var sendBtn = ref('获取验证码');
var sendState = 'avaliable';

watch(loginForm.data, (value, old) => {});
</script>

<style scoped lang="scss">
.logo {
	width: 180rpx;
	height: 180rpx;
	margin-bottom: 100rpx;
}
.loginForm {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	background-color: white;
	padding-top: 150rpx;
}
.input {
	width: 650rpx;
	border-bottom: 2rpx solid $border-color;
	margin-bottom: 50rpx;
	display: flex;
}

#phone {
	width: 400rpx;
	height: 35px;
}
#code {
	width: 550rpx;
	height: 35px;
	margin-right: auto;
}
.send-btn {
	justify-self: flex-end;
	margin-left: auto;
}
.login-btn {
	background-color: $dil-color;
	color: $main-color;
	width: 650rpx;
	height: 80rpx;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.icon {
	width: 50rpx;
	height: 50rpx;
}
.disable {
	background-color: #cdfffc;
	color: $dil-color;
}

.tip {
	color: red;
	font-size: 28rpx;
	margin-top: -40rpx;
	margin-left: 50rpx;
	margin-right: auto;
	height: 50rpx;
}
.send-btn {
	color: $main-color;
}
</style>
