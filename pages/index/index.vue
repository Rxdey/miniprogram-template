<template>
	<view class="page">
		<geek-header noLeft bgColor="rgba(0,0,0,0)" placeholder></geek-header>
		<view class="container">
			<SearchBar v-model="searchValue" @search="onSearch"/>


		</view>
	</view>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const searchValue = ref('');

const onSearch = (val) => {
	console.log(val);
};

onLoad((option) => {
	console.log(option);
});
// scoped
</script>

<style lang="scss">
@import './index.scss';
</style>
