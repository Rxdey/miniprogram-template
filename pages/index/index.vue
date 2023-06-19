<template>
	<view class="container">
		home
	</view>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

onLoad((option) => {
	console.log(option);
})

</script>

<style>
	.container {
		padding: 0;
	}
</style>
