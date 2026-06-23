<template>
	<view class="person-info">
		<view class="item" @click="toggleActionSheet">
			<view class="label">头像</view>
			<image class="avatar content" :src="avatarUrl"></image>
		</view>
		<view class="item" @click="opendialog">
			<view class="label">用户名</view>
			<view class="content">{{ user.data.username }}</view>
		</view>
		<view class="item">
			<view class="label">手机号</view>
			<view class="content">{{ user.data.phone }}</view>
		</view>
		<view class="item">
			<view class="label">角色</view>
			<view class="content">{{ user.data.role }}</view>
		</view>
		<view class="item">
			<view class="label">注册时间</view>
			<view class="content">{{ user.data.createTime.slice(0, 10) }}</view>
		</view>

		<MyLoading v-if="isLoading"></MyLoading>
		<van-action-sheet :show="show" :actions="actions" cancel-text="取消" @close="toggleActionSheet" @cancel="toggleActionSheet" @select="toggleActionSheet" />
		<qf-image-cropper v-if="iscrop" :src="cropSrc" :width="500" :height="500" @crop="handleCrop"></qf-image-cropper>
	</view>
</template>

<script setup>
import { resourceURL } from '../../config.js';
import { reactive, computed, ref, getCurrentInstance } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getUserInfo, updateUserInfo } from '../../http/api/user.js';
import { baseURL } from '../../http/index.js';
import MyLoading from '../../components/MyLoading.vue';

const mypop = ref(null);
const isLoading = ref(false);

const user = reactive({
	data: {}
});

onShow(() => {
	getUserInfo().then(res => {
		console.log(res.data.data);
		user.data = res.data.data;
	});
});

const avatarUrl = computed(() => {
	return user.data.avatar == null ? '../../static/default-avatar.png' : resourceURL + user.data.avatar;
});

const iscrop = ref(false);
const cropSrc = ref('');
const show = ref(false);
const actions = [
	{
		name: '查看头像'
	},
	{
		name: '修改头像'
	}
];
function handleCrop(e) {
	console.log(e.tempFilePath);
	isLoading.value = true;
	uni.uploadFile({
		url: baseURL + '/user/updateAvatar',
		filePath: e.tempFilePath,
		name: 'file',
		header: {
			Authorization: uni.getStorageSync('token')
		},
		success: res => {
			let data = JSON.parse(res.data);
			user.data = data.data;
			isLoading.value = false;
		}
	});
	iscrop.value = false;
}
function toggleActionSheet(e) {
	let name = e.detail.name;
	if (name == '查看头像') {
		uni.previewImage({
			current: 0,
			urls: [avatarUrl.value]
		});
	}
	if (name == '修改头像') {
		uni.chooseImage({
			count: 1,
			success: function(res) {
				console.log(res.tempFilePaths);
				cropSrc.value = res.tempFilePaths[0];
				iscrop.value = true;
			}
		});
	}
	show.value = !show.value;
}

const opendialog = () => {
	uni.showModal({
		title: '修改用户名',
		editable: true,
		showCancel: true,
		success: function(res) {
			if (res.confirm) {
				console.log('用户点击确定');
				user.data.username = res.content;
				updateUserInfo(user.data).then(res=>{
					console.log(res.data)
				});
			}
		}
	});
};
</script>

<style scoped lang="scss">
.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 40rpx;
	background-color: white;
	border-bottom: 2px solid #d1d1d1;
	color: #464646;
	.avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}
}
</style>
