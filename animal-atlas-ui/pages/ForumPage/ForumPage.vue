<template>
	<z-paging ref="paging" v-model="postList" @query="queryList" :default-page-size="5"><PostItem v-for="item in postList" :info="item"></PostItem></z-paging>
	<view v-if="userS.user != null" class="add-btn" @click="goPost()"><image class="add-icon" src="../../static/icon/forum/add-post.png"></image></view>
</template>

<script setup>
import { ref } from 'vue';
import { PostItem } from '../../components/PostItem.vue';
import { userStore } from '../../store/user.js';
import { getPostList } from '../../http/api/post.js';

const userS = userStore();

const postList = ref([]);

const paging = ref(null);

const queryList = (pageNo, pageSize, from) => {
	getPostList(pageNo, pageSize).then(res => {
		console.log(postList.value);
		console.log(res.data.data);
		paging.value.complete(res.data.data);
	});
	console.log(paging.value);
};

const goPost = () => {
	uni.navigateTo({
		url: '/pages/EditPost/EditPost'
	});
};
</script>

<style scoped lang="scss">
.add-btn {
	width: 100rpx;
	height: 100rpx;
	background: linear-gradient(45deg, #00ffff, $main-color);
	border-radius: 50%;
	position: fixed;
	bottom: 50rpx;
	right: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.add-icon {
	width: 60%;
	height: 60%;
}
</style>
