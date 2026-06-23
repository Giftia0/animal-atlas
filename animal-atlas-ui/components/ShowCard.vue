<template>
	<view class="show-card" @click="toDetail()">
		<!--  -->
		<view class="inner">
			<image class="img" :src="img" mode="aspectFill"></image>
			<view class="info">
				<view class="header">
					<text class="name">{{ props.name || '未知' }}</text>
					<image class="sex" :src="sexURL"></image>
				</view>
				<view class="info-items">
					<view class="info-item">
						<image class="icon" src="../static/icon/atlas/nick.png"></image>
						{{ props.nick || '无' }}
					</view>
					<view class="info-item">
						<image class="icon" src="../static/icon/atlas/place.png"></image>
						{{ props.place || '未知' }}
					</view>
					<view class="info-item">
						<image class="icon" src="../static/icon/atlas/birthday.png"></image>
						{{ props.birthday || '未知' }}
					</view>
					<view class="info-item">
						<image class="icon" src="../static/icon/atlas/status.png"></image>
						<text :style="statusColor">{{ props.status || '未知' }}</text>
					</view>
				</view>
				<view class="footer">
					<view><image class="icon" src="../static/icon/atlas/introduction.png"></image></view>
					<view class="text van-multi-ellipsis--l2">{{ props.introduction || '无' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { resourceURL } from '../config.js';

const props = defineProps(['id', 'imgURL', 'sex', 'name', 'nick', 'place', 'birthday', 'status', 'introduction']);

const img = computed(() => {
	return (props.imgURL != null && props.imgURL != '') ? resourceURL + props.imgURL : '../static/no-img.png';
});

const statusColor = computed(() => {
	if (props.status == '正常') return 'color: green;';
	if (props.status == '异常') return 'color: red;';
});

const sexURL = computed(() => {
	if (props.sex == 'male') return '../static/icon/atlas/male.png';
	if (props.sex == 'female') return '../static/icon/atlas/female.png';
});

const toDetail = () => {
	uni.navigateTo({
		url: '/pages/AnimalDetail/AnimalDetail?id=' + props.id
	});
};
</script>

<style lang="scss">
.show-card {
	width: 750rpx;
	padding: 40rpx 0;
	.inner {
		width: 600rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		overflow: hidden;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.6);
		.img {
			width: 600rpx;
			height: 600rpx;
			display: block;
		}
		.info {
			width: 520rpx;
			height: 250rpx;
			background-color: white;
			padding: 10rpx 40rpx;
			.header {
				height: 70rpx;
				display: flex;
				align-items: center;
				.name {
					font-size: 40rpx;
					font-weight: 900;
					letter-spacing: 8rpx;
				}
				.sex {
					margin-left: 10rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}
			.info-items {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.info-item {
					width: 250rpx;
					margin-bottom: 10rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
				}
			}
			.icon {
				width: 40rpx;
				height: 40rpx;
			}
			.footer {
				display: flex;
				margin-top: 10rpx;
				.icon {
					margin-right: 10rpx;
				}
				.text {
					font-size: 13px;
				}
			}
		}
	}
}
</style>
