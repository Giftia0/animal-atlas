<template>
	<view class="reply-item">
		<view class="header">
			<image class="avatar" :src="avatarUrl"></image>
			<view class="info">
				<view class="name">{{ props.reply.reply.username }}</view>
			</view>

			<image class="more-icon" src="../static/icon/post-item/more.png"></image>
		</view>
		<view class="reply-inner">{{ props.reply.reply.content }}</view>
		<view class="footer">
			<view class="time">{{ timeFormatter(props.reply.reply.postTime) }}</view>
			<view class="icon-bar">
				<image class="icon" src="../static/icon/forum/praise.png"></image>
				27
				<image class="icon" src="../static/icon/forum/reply.png"></image>
				5
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { resourceURL } from '../config.js';
const props = defineProps(['reply']);
console.log(props.reply.reply);

const timeFormatter = time => {
	let lag = (new Date() - new Date(time)) / 1000 / 60;
	let result;
	if (lag < 1) return '刚刚';
	if (lag < 60) return Math.floor(lag) + ' 分钟前';
	if (lag < 60 * 12) return Math.floor(lag / 60) + ' 小时前';
	return time.slice(0, 10) + ' ' + time.slice(11, 16);
};

const avatarUrl = computed(() => {
	return props.reply.reply.userAvatar == null ? '../static/default-avatar.png' : resourceURL + props.reply.reply.userAvatar;
});
</script>

<style scoped lang="scss">
.reply-item {
	padding: 40rpx 0;
}
.header {
	padding: 0 40rpx;
	display: flex;
	align-items: center;
	.name {
		font-weight: 600;
	}
	.time {
		font-size: 10px;
	}
	.avatar {
		width: 90rpx;
		height: 90rpx;
		margin-right: 15rpx;
		border-radius: 50%;
		border: 1px solid $main-color;
	}
}
.more-icon {
	margin-left: auto;
	margin-bottom: 20rpx;
	width: 50rpx;
	height: 50rpx;
}
.reply-inner {
	padding: 0 40rpx;
	margin-left: 110rpx;
	width: 500rpx;
	word-wrap: break-word;
}
.footer {
	display: flex;
	align-items: center;
	margin-top: 20rpx;
	margin-left: 150rpx;
	font-size: 24rpx;
	color: #919191;
}
.icon-bar {
	margin-left: auto;
	margin-right: 120rpx;
	display: flex;
	align-items: center;
	color: #bfbfbf;
	font-size: 28rpx;
}
.icon {
	width: 40rpx;
	height: 40rpx;
	margin-left: 50rpx;
	margin-right: 15rpx;
}
</style>
