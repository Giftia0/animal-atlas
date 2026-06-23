<template>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">昵称</view>
		<input style="width: 500rpx;" v-model="formData.data.name" />
	</view>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">性别</view>
		<radio-group @change="sexChange">
			<radio value="male" :checked="!isfemale" color="#047ff2" />
			雄 &emsp;
			<radio value="female" :checked="isfemale" color="#f8449e" />
			雌
		</radio-group>
	</view>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">绰号</view>
		<input style="width: 500rpx;" v-model="formData.data.nick" />
	</view>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">出没地</view>
		<input style="width: 500rpx;" v-model="formData.data.place" />
	</view>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">生日</view>
		<input style="width: 500rpx;" v-model="formData.data.birthday" />
	</view>
	<view class="input">
		<view class="label" style="margin-right: 30rpx;">状态</view>
		<switch color="#FFCC33" style="transform:scale(0.7)" @change="statusChange" :checked="isExp" />
		{{ formData.data.status }}
	</view>
	<view class="textarea" v-if="isExp">
		<view class="label" style="margin-right: 30rpx;">异常信息</view>
		<textarea auto-height="true" v-model="formData.data.statusInfo"></textarea>
	</view>
	<view class="textarea">
		<view class="label" style="margin-right: 30rpx;">介绍</view>
		<textarea auto-height="true" v-model="formData.data.introduction"></textarea>
	</view>

	<button @click="update()" v-if="!isAddMode">修改</button>
	<button @click="confirmDel()" v-if="!isAddMode" type="warn">删除</button>
	<button @click="insert()" v-if="isAddMode">新增</button>
	<button @click="uploadImg(formData.data.id)" v-if="!isAddMode">上传图片</button>
	<uni-file-picker title="添加图片" v-model="imageValue" :imageStyles="imageStyles" fileMediatype="image" mode="grid" @select="selectImg" @delete="deleteImg" />
	<MyLoading v-if="isLoading"></MyLoading>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { resourceURL } from '../../config.js';
import { baseURL } from '../../http/index.js';
import { MyLoading } from '../../components/MyLoading.vue';
import { getAnimalInfo, updateAnimal, getAnimalPhoto, addAnimal, deleteAnimal } from '../../http/api/animal.js';

const isLoading = ref(false);
const isAddMode = ref(false);

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
			url: baseURL + '/animal/uploadImg/' + id,
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
					if (isAddMode) uni.navigateBack();
				}
			}
		});
	});
};

onLoad(params => {
	if (params.id == null) {
		console.log('isAddMode');
		isAddMode.value = true;
		return;
	}
	isLoading.value = true;
	getAnimalInfo(params.id).then(res => {
		formData.data = res.data.data;
		console.log(formData.data);
		isLoading.value = false;
	});
});

const formData = reactive({
	data: {
		id: '',
		sex: 'male',
		name: '',
		nick: '',
		place: '',
		birthday: '',
		status: '正常',
		species: '',
		introduction: '',
		statusInfo: ''
	}
});

const isfemale = computed(() => {
	return formData.data.sex == 'female';
});
const isExp = computed(() => {
	return formData.data.status == '异常';
});

function sexChange(e) {
	console.log(e);
	formData.data.sex = e.detail.value;
	console.log(formData.data);
}
function statusChange(e) {
	console.log(e);
	formData.data.status = e.detail.value ? '异常' : '正常';
	console.log(formData.data);
}

const log = () => {
	console.log('00000');
	console.log(formData.data);
	const key = '4S5BZ-ZYL3W-PKWRW-34QC5-YUM33-ZGBHK'; //使用在腾讯位置服务申请的key
	const referer = '动物图鉴'; //调用插件的app的名称
	const location = JSON.stringify({
		latitude: 39.89631551,
		longitude: 116.323459711
	});
	const category = '生活服务,娱乐休闲';

	wx.navigateTo({
		url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&category=' + category
	});
};

const update = () => {
	console.log(formData.data);
	isLoading.value = true;
	updateAnimal(formData.data).then(res => {
		console.log(res);
		isLoading.value = false;
		uni.showToast({
			icon: 'success',
			title: '修改成功'
		});
		setTimeout(() => {
			uni.navigateBack();
		}, 1500);
	});
};

const insert = () => {
	isLoading.value = true;
	addAnimal(formData.data).then(res => {
		console.log(res);
		isLoading.value = false;
		uploadImg(res.data.data);
		uni.showToast({
			title: '新增成功',
			icon: 'success'
		});
	});
	setTimeout(() => {
		uni.switchTab({
			url: '/pages/Atlas/Atlas'
		});
	}, 1500);
};

const deleteA = () => {
	isLoading.value = true;
	deleteAnimal(formData.data.id).then(res => {
		isLoading.value = false;
		uni.showToast({
			title: '删除成功',
			icon: 'success'
		});
		getApp().globalData.deleteId = formData.data.id;
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/Atlas/Atlas'
			});
		}, 1500);
	});
};

const confirmDel = () => {
	uni.showModal({
		title: '确定删除该动物？',
		success(res) {
			if (res.confirm) deleteA();
		}
	});
};
</script>

<style scoped lang="scss">
.input {
	border-bottom: 2rpx solid $border-color;
	margin-bottom: 6rpx;
	display: flex;
	padding: 20rpx;
	background-color: white;
	height: 70rpx;
	align-items: center;
}
.textarea {
	min-height: 70rpx;
	border-bottom: 2rpx solid $border-color;
	margin-bottom: 6rpx;
	display: flex;
	padding: 20rpx;
	background-color: white;
	align-items: center;
}
.label {
	width: 100rpx;
}
.photo-item {
	display: flex;
	// justify-content: space-around;
	flex-wrap: wrap;
	margin: 15rpx;
	.photo-time {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		font-size: 20px;
		font-weight: 600;
		.clock-icon {
			width: 80rpx;
			height: 80rpx;
			margin-right: 25rpx;
		}
	}
	.photo {
		width: 225rpx;
		height: 225rpx;
		margin-bottom: 15rpx;
		margin-right: 15rpx;
	}
}
</style>
