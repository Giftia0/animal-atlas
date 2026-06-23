<template>
	<view class="edit-post">
		<view class="title input">
			<input style="width: 700rpx;" v-model="postData.data.title" maxlength="20" placeholder="请输入帖子标题" />
			<text style="color: #969696;">{{ postData.data.title.length }}/20</text>
		</view>
		<view class="textarea">
			<view class="textarea-inner">
				<textarea auto-height="true" style="width: 700rpx;" v-model="postData.data.content" placeholder="帖子内容" maxlength="1000"></textarea>
			</view>
			<uni-file-picker v-model="imageValue" :imageStyles="imageStyles" fileMediatype="image" mode="grid" @select="selectImg" @delete="deleteImg" />
		</view>
		<view class="btn-row"><button @click="insert">发帖</button></view>
	</view>
	<MyLoading v-if="isLoading"></MyLoading>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { addPost } from '../../http/api/post.js';
import { MyLoading } from '../../components/MyLoading.vue';
import { baseURL } from '../../http/index.js'

const isLoading = ref(false);

const postData = reactive({
	data: {
		title: '',
		content: ''
	}
});

const imageValue = ref([]);
const imageStyles = {
	border: {
		color: '#61afef',
		width: 2,
		style: 'dashed',
		radius: '10px'
	}
};
const imgList = ref([]);
function selectImg(e) {
	console.log(e);
	e.tempFilePaths.forEach(item => {
		imgList.value.push(item);
	});
}
function deleteImg(e) {
	console.log(e);
	console.log(imgList.value.indexOf(e.tempFilePath));
	imgList.value.splice(imgList.value.indexOf(e.tempFilePath), 1);
}

const uploadImg = id => {
	let flag = imgList.value.length;
	if (flag == 0) return;
	isLoading.value = true;
	imgList.value.forEach(item => {
		uni.uploadFile({
			url: baseURL + '/post/uploadImg/' + id,
			filePath: item,
			name: 'file',
			header: {
				Authorization: uni.getStorageSync('token')
			},
			success: uploadFileRes => {
				console.log(uploadFileRes.data);
				flag -= 1;
				if (flag == 0) {
					isLoading.value = false;
					imgList.value = [];
					imageValue.value = [];
					uni.showToast({
						icon: 'success',
						title: '上传成功'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1500);
				}
			}
		});
	});
};

const insert = () => {
	if (postData.data.title == '') return;
	addPost(postData.data).then(res => {
		console.log(res);
		uploadImg(res.data.data)
	});
};

function log() {
	console.log('********************');
	console.log(postData.data);
	console.log(imgList.value);
}
</script>

<style scoped lang="scss">
.edit-post {
	background-color: white;
	min-height: 100vh;
}
.input {
	border-bottom: 2rpx solid #969696;
	display: flex;
	padding: 20rpx;
	background-color: white;
	height: 70rpx;
	align-items: center;
}
.textarea {
	min-height: 70rpx;
	border-bottom: 2rpx solid $border-color;
	padding: 20rpx;
	background-color: white;
	margin-bottom: 100rpx;
}
.textarea-inner {
	margin-bottom: 100rpx;
}
.btn-row {
	position: fixed;
	bottom: 0;
	width: 750rpx;
	z-index: 5;
}
</style>
