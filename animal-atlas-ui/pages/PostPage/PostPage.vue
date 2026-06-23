<template>
	<view class="post-page">
		<view class="post-header">
			<image class="avatar" :src="avatarUrl"></image>
			<view class="info">
				<view class="name">{{ info.data.invitation.username }}</view>
				<view class="time">{{ timeFormatter(info.data.invitation.postTime) }}</view>
			</view>
		</view>
		<view class="inner">
			<view class="title">{{ info.data.invitation.title }}</view>
			<view class="content">{{ info.data.invitation.content }}</view>
		</view>
		<view class="imgs"><image class="img" mode="widthFix" :src="resourceURL + item.url" v-for="item in info.data.imgList"></image></view>
		<view class="reply-header">
			<view class="all">
				全部评论
				<text class="cnt">( {{ replyList.length }} 条 )</text>
			</view>
			<view class="mode">
				<view class="mode-item" @click="changeMode" v-if="mode != 1">楼层</view>
				<view class="mode-item checked" @click="changeMode" v-if="mode == 1">楼层</view>
				<view class="mode-item" @click="changeMode" v-if="mode != 2">最新</view>
				<view class="mode-item checked" @click="changeMode" v-if="mode == 2">最新</view>
			</view>
		</view>
		<view class="reply-box">
			<template v-for="item in replyList">
				<ReplyItem :reply="item"></ReplyItem>
			</template>
		</view>
		<view class="reply-input">
			<view class="reply-input-inner">
				<textarea v-model="input" class="text" show-confirm-bar="false" auto-height="true" maxlength="300"></textarea>
				<image @click="sendReply()" class="send-btn" src="../../static/icon/forum/plane.png"></image>
			</view>
		</view>
		<MyLoading v-if="isLoading"></MyLoading>
	</view>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { onShow, onLoad } from '@dcloudio/uni-app';
import { getPostInfo } from '../../http/api/post.js';
import { getReplyById, addReply } from '../../http/api/reply.js';
import { resourceURL } from '../../config.js';
import ReplyItem from '../../components/ReplyItem.vue';
import MyLoading from '../../components/MyLoading.vue';

const info = reactive({
	data: {}
});

onLoad(params => {
	console.log(params.id);
	getPostInfo(params.id).then(res => {
		console.log(res.data.data);
		info.data = res.data.data;
	});
	getReplyById(params.id).then(res => {
		console.log(res.data.data);
		replyList.value = res.data.data;
	});
});

const avatarUrl = computed(() => {
	return info.data.invitation.userAvatar == null ? '../static/default-avatar.png' : resourceURL + info.data.invitation.userAvatar;
});

const timeFormatter = time => {
	let lag = (new Date() - new Date(time)) / 1000 / 60;
	let result;
	if (lag < 60) return Math.floor(lag) + ' 分钟前';
	if (lag < 60 * 12) return Math.floor(lag / 60) + ' 小时前';
	return time.slice(0, 10) + ' ' + time.slice(11, 16);
};

const mode = ref(1);
const replyList = ref([]);

const input = ref('');
const sendReply = () => {
	if (input.value == '') return;
	isLoading.value = true;
	addReply(info.data.invitation.id, input.value).then(res => {
		console.log(res.data.data);
		replyList.value.push(res.data.data);
		console.log(replyList.value);
		input.value = '';
		isLoading.value = false;
	});
};

const isLoading = ref(false);

const changeMode = () => {
	if (mode.value == 1) mode.value = 2;
	else if (mode.value == 2) mode.value = 1;
	replyList.value.reverse();
};


</script>

<style scoped lang="scss">
.reply-input {
	position: fixed;
	bottom: 0;
	padding: 20rpx 20rpx;
	background-color: $main-color;
	.reply-input-inner {
		padding: 20rpx 10rpx;
		border-radius: 30rpx;
		background-color: white;
		display: flex;
		align-items: flex-end;
		.text {
			width: 630rpx;
		}
		.send-btn {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
	}
}
.post-page {
	background-color: white;
}
.post-header {
	display: flex;
	align-items: center;
	padding: 0 40rpx;
	padding-top: 40rpx;
	.name {
		font-weight: 600;
		font-size: 18px;
	}
	.time {
		font-size: 14px;
	}
	.avatar {
		width: 100rpx;
		height: 100rpx;
		margin-right: 15rpx;
		border-radius: 50%;
		border: 1px solid $main-color;
	}
}
.inner {
	padding: 40rpx;
	.title {
		font-weight: 600;
		font-size: 20px;
		margin: 18rpx 0;
	}
	.content {
		font-size: 16px;
		color: #232323;
	}
}
.imgs {
	padding: 0 40rpx;
	.img {
		width: 670rpx;
		margin-bottom: 40rpx;
	}
}
.reply-header {
	padding: 40rpx;
	border-top: 6px solid #f0f0f0;
	display: flex;
	align-items: center;
	.all {
		font-weight: 600;
		font-size: 20px;
		.cnt {
			margin-left: 10rpx;
			font-weight: 400;
			font-size: 16px;
		}
	}
	.mode {
		width: 200rpx;
		display: flex;
		margin-left: auto;
		background-color: #eeeeee;
		padding: 10rpx;
		border-radius: 30rpx;
		justify-content: space-between;
		.mode-item {
			border-radius: 20rpx;
			padding: 0 20rpx;
			// margin: 0 10rpx;
			color: #636363;
			font-size: 30rpx;
		}
		.mode-item .checked {
			color: white;
		}
	}
}
.checked {
	background-color: white;
}
.reply-box {
	padding-bottom: 100rpx;
}
</style>
