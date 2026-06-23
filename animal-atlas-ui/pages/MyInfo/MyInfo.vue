<template>
	<view class="user-bar">
		<image class="user-avatar" :src="avatarUrl" @click="goToLogin()"></image>
		<view class="user-name" @click="goToLogin()">{{ username }}</view>
	</view>
	<view class="about-list">
		<view class="about-item" @click="goToPerson()">
			<image class="icon" src="../../static/icon/user/person-info.png"></image>
			<view class="text">个人资料</view>
		</view>
		<view class="about-item">
			<image class="icon" src="../../static/icon/user/about-us.png"></image>
			<view class="text">关于我们</view>
		</view>
		<view class="about-item" @click="goToSetting()">
			<image class="icon" src="../../static/icon/user/setting.png"></image>
			<view class="text">设置</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { userStore } from '../../store/user.js';
import { getUserInfo } from '../../http/api/user.js';
import { onShow } from '@dcloudio/uni-app';
import { resourceURL } from '../../config.js';

onShow(() => {
	getUserInfo().then(res => {
		user.value = res.data.data;
	});
});

var user = ref();

const avatarUrl = computed(() => {
	if (user.value == null) return '../../static/default-avatar.png';
	return user.value.avatar == null ? '../../static/default-avatar.png' : resourceURL + user.value.avatar;
});
const username = computed(() => {
	return user.value != null ? user.value.username : '登录/注册';
});

const goToLogin = () => {
	if(user.value != null) return;
	uni.navigateTo({
		url: '/pages/LoginPage/LoginPage'
	});
};

const goToSetting = () => {
	uni.navigateTo({
		url: '/pages/SettingPage/SettingPage'
	});
};

const goToPerson = () => {
	uni.navigateTo({
		url: '/pages/PersonInfo/PersonInfo'
	});
};
</script>

<style scoped lang="scss">
.user-bar {
	display: flex;
	align-items: center;
	width: 101%;
	height: 200rpx;
	background-color: $main-color;
}

.user-avatar {
	width: 120rpx;
	height: 120rpx;
	border: 6rpx solid white;
	border-radius: 50%;
	margin-left: 40rpx;
	background-color: #eaeaea;
}

.user-name {
	color: white;
	padding: 50rpx;
}

.about-item {
	padding-left: 40rpx;
	height: 80rpx;
	background-color: white;
	display: flex;
	align-items: center;
	border-bottom: 3rpx solid $border-color;
	.icon {
		width: 40rpx;
		height: 40rpx;
	}
	.text {
		margin-left: 50rpx;
	}
}
</style>
