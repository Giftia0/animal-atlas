<template>
	<view><web-view :src="url"></web-view></view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

const url = ref('');

onLoad(params => {
	url.value = params.url;
	console.log(url.value)
});
</script>

<style scoped></style>
