<template>
	<view class="atlas">
		<MyLoading v-if="isLoading"></MyLoading>
		<z-paging ref="paging" v-model="animalList" @query="queryList" :default-page-size="5">
			<ShowCard
				v-for="(item, index) in animalList"
				:key="item.id"
				:id="item.id"
				:imgURL="item.img"
				:name="item.name"
				:sex="item.sex"
				:birthday="item.birthday"
				:place="item.place"
				:nick="item.nick"
				:status="item.status"
				:introduction="item.introduction"
			></ShowCard>
		</z-paging>
		<view v-if="canAdd" @click="goAdd" class="add-btn"><image class="add-icon" src="../../static/icon/atlas/add.png"></image></view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import MyLoading from '../../components/MyLoading.vue';
import ShowCard from '../../components/ShowCard.vue';
import { getAnimal } from '../../http/api/animal.js';
import { userStore } from '../../store/user.js';

onShow(() => {
	console.log(getApp().globalData.deleteId);
	let deleteId = getApp().globalData.deleteId;
	if (deleteId != null) {
		animalList.value = animalList.value.filter(item => {
			return item.id != deleteId;
		});
	}
});

const isLoading = ref(false);
var dataList = [];
const animalList = ref([]);

const paging = ref(null);

const queryList = (pageNo, pageSize, from) => {
	if (from == 0) dataList = [];
	getAnimal(dataList, pageSize).then(res => {
		console.log(dataList);
		paging.value.complete(res.data.data);
		let data = res.data.data;
		if (data == null) {
			//暂无数据
			return;
		}
		data.forEach(item => {
			dataList.push(item.id);
		});
		// animalList.value.push(...data);
		console.log(animalList.value);
	});
	console.log(paging.value);
};

const canAdd = computed(() => {
	return userStore().user != null && userStore().user.role == 'admin';
});
const goAdd = () => {
	uni.navigateTo({
		url: '/pages/UpdateAnimal/UpdateAnimal'
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
