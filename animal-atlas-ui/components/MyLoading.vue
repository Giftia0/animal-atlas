<template>
	<view class="my-loading">
		<van-toast id="van-toast">
			<view class="loading">
				<image src="../../static/loading.gif"></image>
				<view class="text">loading...</view>
			</view>
		</van-toast>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';
const Toast = require('../wxcomponents/vant/toast/toast.js').Toast;
const { proxy } = getCurrentInstance();

onMounted(() => {
	Toast({
		duration: 0,
		context: proxy
	});
});
</script>

<style>
.loading {
	background-color: #e7dfdd;
	border-radius: inherit;
	overflow: hidden;
}
.my-loading view {
	padding: 0;
}
.my-loading image {
	display: block;
	width: 280rpx;
	height: 210rpx;
}
.my-loading .text {
	background-color: #e7dfdd;
	height: 70rpx;
	width: 100%;
	text-align: center;
	color: #00b7d5;
}
</style>
