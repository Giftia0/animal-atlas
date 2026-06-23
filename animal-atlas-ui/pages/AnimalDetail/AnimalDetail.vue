<template>
	<view class="animal-detail">
		<view class="detail-main">
			<view class="detail-img">
				<swiper class="swiper" circular>
					<swiper-item>
						<view class="swiper-item">
							<image :src="animalInfo.data.img == null ? '../../static/no-img.png' : resourceURL + animalInfo.data.img" mode="aspectFill"></image>
						</view>
					</swiper-item>
					<template v-for="(row, index) in photoList" :key="index">
						<swiper-item v-for="item in row" :key="item.id">
							<view class="swiper-item"><image :src="resourceURL + item.url" mode="aspectFill"></image></view>
						</swiper-item>
					</template>
				</swiper>
			</view>
			<view class="info-header">
				<view class="header-row-1">
					<view class="animal-name">{{ animalInfo.data.name }}</view>
					<image class="sex-img" :src="sexURL"></image>
					<view class="like-num">{{ animalInfo.data.likeNum }}</view>
					<image class="like-it" :src="likeItImg" @click="changeLikeStatus()"></image>
				</view>
			</view>
			<view class="detail-info">
				<view class="info-item">
					<view class="info-label">绰号</view>
					<view class="info-inner">{{ animalInfo.data.nick || '无' }}</view>
				</view>
				<view class="info-item">
					<view class="info-label">出没地</view>
					<view class="info-inner">{{ animalInfo.data.place || '未知' }}</view>
				</view>
				<view class="info-item">
					<view class="info-label">生日</view>
					<view class="info-inner">{{ animalInfo.data.birthday || '未知' }}</view>
				</view>
				<view class="info-item">
					<view class="info-label">状态</view>
					<view class="info-inner">{{ animalInfo.data.status || '未知' }}</view>
				</view>
				<view class="info-item">
					<view class="info-label">品种</view>
					<view class="info-inner">{{ animalInfo.data.species || '未知' }}</view>
				</view>
				<view class="info-item block" v-if="animalInfo.data.status != '正常' && animalInfo.data.status != null">
					<view class="info-label">状态信息</view>
					<view class="info-inner">{{ animalInfo.data.statusInfo }}</view>
				</view>
				<view class="info-item block">
					<view class="info-label">简介</view>
					<view class="info-inner introduction">{{ animalInfo.data.introduction || '暂无' }}</view>
				</view>
			</view>
			<view class="btn-row"><view class="btn" v-if="canEdit" @click="goToUpdate()">修改</view></view>
		</view>

		<view class="photo-wall">
			<view class="photo-header">
				<image class="animal-avatar" :src="resourceURL + animalInfo.data.img"></image>
				<view class="photo-brief">
					<view class="photo-who">{{ animalInfo.data.name }}的相册</view>
					<view class="photo-count">共有 {{ photoCnt }} 张照片</view>
				</view>
				<button type="warn" @click="isDelMode = false" v-if="isDelMode && canEdit" style="margin-left: 150rpx;font-size: 26rpx;">完成删除</button>
			</view>
			<view class="photo-item" v-for="(row, index) in photoList" :key="index">
				<view class="photo-time">
					<image class="clock-icon" src="../../static/icon/animal-detail/clock.png"></image>
					{{ row[0].createTime.substring(0, 10) }}
				</view>
				<view class="imgBox" v-for="item in row" :key="item.id" style="position: relative;">
					<image
						v-if="isDelMode && canEdit"
						@click="deleteImg(item.id)"
						src="../../static/icon/login/close.png"
						style="width: 50rpx;height: 50rpx;position: absolute;left: 175rpx;background-color: rgba(255, 255, 255, 0.5);"
					></image>
					<image class="photo" mode="aspectFill" :src="resourceURL + item.url" @longpress="intoDelMode" @click="previewImg(item)"></image>
				</view>
			</view>
		</view>
	</view>
	<MyLoading v-if="isLoading"></MyLoading>
</template>

<script setup>
import { resourceURL } from '../../config.js';
import { onLoad, onShow } from '@dcloudio/uni-app';
import MyLoading from '../../components/MyLoading.vue';
import { getAnimalInfo, getLikeStatus, changeLike, getAnimalPhoto, deleteAnimalImg } from '../../http/api/animal.js';
import { ref, computed, reactive } from 'vue';
import { userStore } from '../../store/user.js';

const isLoading = ref(false);

const user = userStore().user;
const likeStaus = ref(false);
var likeDisable = false;

var first = true;
onLoad(params => {
	isLoading.value = true;
	getAnimalInfo(params.id).then(res => {
		animalInfo.data = res.data.data;
		console.log(animalInfo.data);
	});
	if (user != null)
		getLikeStatus(user.id, params.id).then(res => {
			likeStaus.value = res.data.data;
			if (likeStaus.value == true) likeItImg.value = '../../static/icon/animal-detail/like.png';
			console.log(res);
		});
	getAnimalPhoto(params.id).then(res => {
		console.log(res.data.data);
		photoList.value = res.data.data;
		photoCnt.value = res.data.msg;
		first = false;
		isLoading.value = false;
	});
});

onShow(() => {
	if (first == true) return;
	getAnimalInfo(animalInfo.data.id).then(res => {
		animalInfo.data = res.data.data;
		console.log(animalInfo.data);
	});
	getAnimalPhoto(animalInfo.data.id).then(res => {
		console.log(res.data.data);
		photoList.value = res.data.data;
		photoCnt.value = res.data.msg;
	});
});

const likeItImg = ref('../../static/icon/animal-detail/no-like.png');
const changeLikeStatus = () => {
	if (likeDisable) {
		//操作频繁
		return;
	}
	likeDisable = true;
	setTimeout(() => {
		likeDisable = false;
	}, 800);
	if (likeStaus.value == false) {
		//点赞
		animalInfo.data.likeNum += 1;
		likeItImg.value = '../../static/gif/like.gif';
		setTimeout(() => {
			likeItImg.value = '../../static/icon/animal-detail/like.png';
		}, 800);
		likeStaus.value = true;
	} else {
		//取消点赞
		animalInfo.data.likeNum -= 1;
		likeStaus.value = false;
		likeItImg.value = '../../static/icon/animal-detail/no-like.png';
	}
	changeLike(user.id, animalInfo.data.id).then(res => {
		likeStaus.value = res.data.data;
		console.log(likeStaus.value);
	});
};

const animalInfo = reactive({
	data: {}
});
const sexURL = computed(() => {
	if (animalInfo.data.sex == 'male') return '../../static/icon/atlas/male.png';
	if (animalInfo.data.sex == 'female') return '../../static/icon/atlas/female.png';
});

const goToUpdate = () => {
	uni.navigateTo({
		url: '/pages/UpdateAnimal/UpdateAnimal?id=' + animalInfo.data.id
	});
};

const photoCnt = ref(0);
const photoList = ref([]);

const isDelMode = ref(false);
const intoDelMode = () => {
	isDelMode.value = true;
	console.log(preImgList.value);
};
const canEdit = computed(() => {
	return user != null && user.role == 'admin';
});

const deleteImg = id => {
	console.log(id);
	deleteAnimalImg(id).then(res => {
		if (res.data.code == 200) {
			getAnimalPhoto(animalInfo.data.id).then(res => {
				photoList.value = res.data.data;
				photoCnt.value = res.data.msg;
			});
		}
	});
};

const preImgList = computed(() => {
	return photoList.value.flat();
});

const previewImg = item => {
	let urls = preImgList.value.map(e => {
		return resourceURL + e.url;
	});
	uni.previewImage({
		current: preImgList.value.indexOf(item),
		urls
	});
};
</script>

<style scoped lang="scss">
.photo-header {
	border: 2px solid #eeeeee;
	background-color: white;
	height: 100rpx;
	display: flex;
	align-items: center;
	padding: 30rpx;
	.animal-avatar {
		border: 2px solid $main-color;
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	}
	.photo-brief {
		margin-left: 30rpx;
		.photo-who {
			font-size: 20px;
			font-weight: 600;
		}
	}
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
.info-header {
	padding: 30rpx 0;
}
.header-row-1 {
	display: flex;
	align-items: center;
	position: relative;
}
.animal-name {
	font-size: 50rpx;
	font-weight: 600;
	letter-spacing: 8rpx;
	margin-right: 10rpx;
}
.sex-img {
	width: 50rpx;
	height: 50rpx;
}
.like-num {
	color: #ff7778;
	font-size: 22px;
	margin-top: 20rpx;
	margin-left: auto;
	margin-right: 125rpx;
}
.like-it {
	position: absolute;
	width: 364rpx;
	height: 250rpx;
	left: 320rpx;
	top: -120rpx;
	transform: rotateY(180deg);
}
.detail-info {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}
.info-item {
	width: 150rpx;
	.introduction {
		font-size: 12px;
	}
}

.block {
	width: 630rpx;
	grid-column: span 3;
}
.info-label {
	border-bottom: 5px solid $main-color;
	padding-bottom: 2px;
	margin-bottom: 4px;
	margin-top: 32rpx;
	color: rgb(55, 55, 55);
}
.info-inner {
	font-size: 16px;
}

.detail-main {
	padding: 50rpx;
	// height: 1300rpx;
	background-image: linear-gradient($main-color, $main-color 25%, white 25%);
}
.detail-img {
	// margin: 0 50rpx 50rpx 50rpx;
}
.swiper {
	width: 650rpx;
	height: 400rpx;
	border-radius: 10px;
	overflow: hidden;
}
.swiper-item,
image {
	width: 100%;
	height: 100%;
}
.btn-row {
	margin-top: 50rpx;
}
.btn {
	width: 150rpx;
	color: red;
	height: 70rpx;
	border-radius: 8px;
	border: 1px solid red;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
