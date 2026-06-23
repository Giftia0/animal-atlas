<template>
	<view class="animal-identification">
		<view class="img-box">
			<view class="line" v-if="isLoading"></view>
			<image v-if="imgUrl == ''" class="add-icon" mode="aspectFit" @click="choose()" src="../../static/icon/identification/add-img.png"></image>
			<image v-else class="img" :src="imgUrl" mode="aspectFill" @click="choose()"></image>
		</view>

		<view class="spices-box" v-if="imgUrl != '' && !isLoading">
			<movable-swiper :dataList="result.data.spices" height="360rpx">
				<template v-slot="{ movSlotData }">
					<view v-if="movSlotData" style="height: 360rpx;position: relative;">
						<view class="header">
							<view class="spices">{{ movSlotData.name }}</view>
							<view class="odds">{{ scoreFormatter(movSlotData.score) }}</view>
						</view>
						<view class="body">{{ movSlotData.baike_info.description }}</view>
						<view class="footer" @click="goBaike(movSlotData.baike_info.baike_url)">前往百科>>></view>
					</view>
				</template>
			</movable-swiper>
		</view>
		<view class="animal-list" v-if="imgUrl != '' && !isLoading">
			<view class="animal-item" v-for="(item, index) in result.data.identification" :key="index" @click="gotoDetail(item.animal.id)">
				<image class="animal-img" :src="resourceURL + item.animal.img" mode="aspectFill"></image>
				<view class="animal-name">{{ item.animal.name }}</view>
				<view class="animal-odds">{{ scoreFormatter(item.score) }}</view>
			</view>
		</view>

		<image v-if="isLoading" src="../../static/gif/loading.gif" style="width: 500rpx; height: 500rpx; margin-top: 50rpx;"></image>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { resourceURL } from '../../config.js';
import { baseURL } from '../../http/index.js';

const isLoading = ref(false);

const imgUrl = ref('');
const result = reactive({
	data: {}
});

const scoreFormatter = score => {
	let head = score.substring(2, 4);
	if (head[0] == '0') head = score.substring(3, 4);
	let tail = score.substring(4, 5);
	return head + '.' + tail + '%';
};

const goBaike = url => {
	uni.navigateTo({
		url: '/pages/WebView/WebView?url=' + url
	});
};

const gotoDetail = id => {
	console.log(id);
	uni.navigateTo({
		url: '/pages/AnimalDetail/AnimalDetail?id=' + id
	});
};

const choose = () => {
	uni.chooseImage({
		count: 1,
		success(res) {
			console.log(res.tempFilePaths[0]);
			imgUrl.value = res.tempFilePaths[0];
			isLoading.value = true;
			uni.uploadFile({
				url: baseURL + '/easydl/animal',
				filePath: res.tempFilePaths[0],
				name: 'file',
				header: {
					Authorization: uni.getStorageSync('token')
				},
				success: uploadFileRes => {
					// console.log(JSON.parse(uploadFileRes.data));
					let temp = JSON.parse(uploadFileRes.data);
					result.data = temp.data;
					isLoading.value = false;
					console.log(result.data);
				}
			});
		}
	});
};
</script>

<style scoped lang="scss">
.animal-list {
	width: 600rpx;
	background-color: white;
	border-radius: 20rpx;
	box-shadow: 0 0 30rpx 30rpx rgba(68, 68, 68, 0.4);
	padding: 0 30rpx;
	margin-bottom: 50rpx;
	.animal-item {
		height: 160rpx;
		display: flex;
		font-size: 36rpx;
		font-weight: 900;
		align-items: center;
		border-bottom: 2rpx solid #e8e8e8;
		.animal-img {
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			border-radius: 10%;
		}
		.animal-odds {
			margin-left: auto;
		}
	}
}

.animal-identification {
	min-height: 94vh;
	background-image: url('http://cdn.giftia.cn/background.jpg');
}
.body {
	font-size: 28rpx;
	margin: 30rpx;
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 5;
}
.footer {
	color: #6c6c6c;
	display: flex;
	justify-content: flex-end;
	padding-right: 40rpx;
	position: absolute;
	bottom: 20rpx;
	right: 0;
}
.header {
	display: flex;
	font-size: 40rpx;
	font-weight: 900;
	justify-content: space-between;
	border: 2rpx solid #e3e3e3;
	padding: 20rpx;
	.spices {
		margin-left: 20rpx;
	}
	.odds {
		margin-right: 10rpx;
	}
}
.spices-box {
	margin-top: 60rpx;
	transform: scale(0.95);
}
.animal-identification {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 75rpx;
}
.img-box {
	width: 600rpx;
	height: 600rpx;
	border: 20rpx solid $main-color;
	border-radius: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	position: relative;
	background-color: white;
}
.add-icon {
	width: 400rpx;
	height: 400rpx;
}
.img {
	width: 600rpx;
	height: 600rpx;
}
.line {
	position: absolute;
	top: 0;
	height: 5rpx;
	width: 610rpx;
	box-shadow: 0px -18px 50px 10px $main-color;
	background-color: $main-color;
	animation-name: scan;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
}
@keyframes scan {
	from {
		transform: translateY(-100rpx);
	}
	to {
		transform: translateY(730rpx);
	}
}
</style>
