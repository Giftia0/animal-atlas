<template>
	<view class="btn" @click="goToLogout()">退出登录</view>
</template>

<script setup>
import { userStore } from '../../store/user.js';
const goToLogout = () => {
	uni.removeStorageSync('token');
	userStore().getUserInfo();
	uni.switchTab({
		url: '/pages/MyInfo/MyInfo'
	});
};
</script>

<style scoped>
.btn {
	margin: 0 auto;
	width: 600rpx;
	color: red;
	height: 80rpx;
	border-radius: 8px;
	border: 1px solid red;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50rpx;
}
</style>
