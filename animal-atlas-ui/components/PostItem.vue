<template>
	<view class="post-item" @click="intoPost(info.invitation.id)">
		<view class="header">
			<image class="avatar" :src="avatarUrl"></image>
			<view class="info">
				<view class="name">{{ info.invitation.username }}</view>
				<view class="time">{{ timeFormatter(info.invitation.postTime) }}</view>
			</view>
			<image class="more-icon" src="../static/icon/post-item/more.png"></image>
		</view>
		<view class="title">{{ info.invitation.title }}</view>
		<view class="content text van-multi-ellipsis--l3">{{ info.invitation.content }}</view>
		<view class="imgBox"><image :key="index" v-for="(item, index) in imgs" lazy-load="true" class="img" :src="resourceURL + item.url" @click.native.stop="preImg(index)" mode="aspectFill"></image></view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { resourceURL } from '../config.js';

const props = defineProps(['info']);
const info = computed(() => {
	return props.info;
});
const imgs = computed(() => {
	return props.info.imgList.slice(0, 3);
});

const avatarUrl = computed(() => {
	return info.value.invitation.userAvatar == null ? '../static/default-avatar.png' : resourceURL + info.value.invitation.userAvatar;
});

const preImg = index => {
	uni.previewImage({
		current: index,
		urls: info.value.imgList.map(item => {
			return resourceURL + item.url;
		})
	});
};

const timeFormatter = time => {
	let lag = (new Date() - new Date(time)) / 1000 / 60;
	let result;
	if (lag < 1) return '刚刚';
	if (lag < 60) return Math.floor(lag) + ' 分钟前';
	if (lag < 60 * 12) return Math.floor(lag / 60) + ' 小时前';
	return time.slice(0,10) + " " + time.slice(11,16);
};

const intoPost = (id) => {
	console.log(info.value.invitation.id)
	uni.navigateTo({
		url:'/pages/PostPage/PostPage?id=' + id
	})
}
</script>

<style scoped lang="scss">
.post-item {
	background-color: white;
	margin: 25rpx;
	padding: 25rpx;
	border-radius: 20px;
	.header {
		display: flex;
		align-items: center;
		.name {
			font-weight: 600;
		}
		.time {
			font-size: 10px;
		}
		.avatar {
			width: 80rpx;
			height: 80rpx;
			margin-right: 15rpx;
			border-radius: 50%;
			border: 1px solid $main-color;
		}
	}
	.title {
		font-weight: 600;
		margin: 20rpx 0;
	}
	.content {
		font-size: 14px;
		color: #232323;
	}
	.imgBox {
		display: flex;
		// justify-content: space-between;
		margin-top: 20rpx;
		.img {
			width: 205rpx;
			height: 205rpx;
			border-radius: 12rpx;
			margin-right: 10rpx;
		}
	}
}
.more-icon {
	margin-left: auto;
	margin-bottom: 20rpx;
	width: 50rpx;
	height: 50rpx;
}
</style>
