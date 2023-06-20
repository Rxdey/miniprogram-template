<template>
	<view class="Header-box" :style="HeaderBoxStyle">
		<view class="header-fixed-box" :style="{background: headerBgColor}">
			<view class="header-main-box">
				<view v-if="!noLeft" @click="headerLeftClick" class="header-left-box header-operation">
					<slot name="left">
						<image v-if="whiteback" class="header-left-back" src="../img/icon-back-white.png" />
						<image v-else class="header-left-back" src="../img/blackLeft.png" />
					</slot>
				</view>
				<view class="header-title" :style="{color: headerTitleColor}">
					<slot name="center">
						{{ headerTitle }}
					</slot>
				</view>
				<view @click="headerRightClick" :style="{paddingRight: rightPadding, color: rightColor}" class="header-right-box header-operation">
					<slot name="right">
						{{ rightText }}
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	/**
	 * header 页面导航栏
	 * @description 自定义页面导航栏
	 * @property {Boolean} autoBack 是否自动返回(默认值: true)
	 * @property {Boolean} noLeft 是否没有左侧内容(默认值: false)，如果为true则不会出现返回箭头及左侧自定义插槽内容。
	 * @property {String} bgColor 背景色，默认为黑色箭头白色背景，白色箭头透明背景。
	 * @property {String} title 导航栏标题(默认值: "")，如果不设置页面标题则会默认读取pages.json中相应页面的navigationBarTitleText属性。
	 * @property {String} titleColor 导航栏标题颜色，默认同箭头颜色一致
	 * @property {Boolean} whiteback 是否为白色返回箭头(默认值: false)，默认黑色返回箭头。
	* @property {String} rightText 右侧文字(默认值："")，如果需要自定义右侧内容则可以使用名为right的具名插槽。
	 * @property {String} rightPadding 右侧padding(默认值: "30rpx")。
	 * @property {String} rightColor 右侧字体颜色(默认值: #000)。
	 * @property {Boolean} placeholder 是否生成一个等高元素，防止塌陷(默认值: false)。
	 * @example <header title="页面标题"></header>
	 */
	import pages from "@/pages.json";
	import { toRefs, ref, onMounted, watch, watchEffect } from "vue";
	
	//  使用状态栏信息 hooks
	import useNavbarInfo from '../hooks/useNavbarInfo.js';
	let {headerPaddingHeightPX, navHeightPX, headerPaddingBottomHeightPX} = useNavbarInfo();
	
	let props = defineProps({
		// 右侧文字
		rightText: {
			default: "",
			type: String
		},
		// 背景色
		bgColor: {
			default: "",
			type: String
		},
		//是否有标题颜色
		titleColor: {
			default: '',
			type: String
		},
		// 是否为白色返回箭头
		whiteback: {
			default: false,
			type: Boolean
		},
		// 是否没有返回
		noLeft: {
			default: false,
			type: Boolean
		},
		// 页面标题
		title: {
			default: '',
			type: String
		},
		// 右侧padding
		rightPadding: {
			default: '30rpx'
		},
		// 右侧颜色
		rightColor:{
			default: '#000',
			type: String
		},
		// 是否自动返回
		autoBack: {
			default: true,
			type: Boolean
		},
		// 是否生成一个等高元素，防止塌陷
		placeholder: {
			default: false,
			type: Boolean
		}
	})
	
	let emit = defineEmits(['leftClick', 'rightClick']);
	
	// 导航栏标题
	let headerTitle = ref("");
	// 导航栏题颜色
	let headerTitleColor = ref("");
	// 导航栏背景色
	let headerBgColor = ref("");
	// 导航栏盒子样式
	let HeaderBoxStyle = ref({});

	// 监听数据源 在使用数据源变化时执行操作
	watchEffect(()=>{
		// 获取当前页面路由标题
		if (props.title) {
		 	headerTitle.value = props.title;
		} else {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let url = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
			let page = pages.pages.filter(page=> page.path == url)[0]; // 通过过滤找出当前页面
			let title = page.style.navigationBarTitleText; // 获取当前页面标题
			headerTitle.valu = title; // 赋值标题
		}
		
		// 页面导航栏背景色
		if(!props.bgColor) {
			// 如果为白色箭头
			if(props.whiteback) {
				headerBgColor.value = 'rgba(0, 0, 0, 0)';
			} else {
				headerBgColor.value = '#fff';
			}
		} else {
			headerBgColor.value = props.bgColor;
		}
		
		// 页面导航栏标题颜色 根据箭头颜色使用不同的颜色
		if(!props.titleColor) {
			// 如果为白色箭头
			if(props.whiteback) {
				headerTitleColor.value = '#fff';
			} else {
				headerTitleColor.value = '#000';
			}
		} else {
			headerTitleColor.value = props.titleColor;
		}
	
		// 生成元素用来防止坍塌 
		if(props.placeholder) {
			HeaderBoxStyle.value = {
				paddingTop: headerPaddingHeightPX.value,
				paddingBottom: headerPaddingBottomHeightPX.value
			}
		} else {
			HeaderBoxStyle.value = {}
		}
	})
	
	let headerRightClick = ()=>{
		// 组件绑定click事件
		emit("rightClick");
	}
	// 返回事件
	let headerLeftClick = () =>{
		// 自定义左侧点击事件
		emit("leftClick")
		
		// 如果使用自动返回
		if(props.autoBack) {
			// #ifndef H5
			uni.navigateBack();
			// #endif
			// #ifdef H5
			history.back();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.Header-box {
		position: relative;
		.header-fixed-box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: v-bind(headerPaddingHeightPX);
			padding-bottom: v-bind(headerPaddingBottomHeightPX);
			z-index: 9;

			.header-main-box {
				position: absolute;
				bottom: v-bind(headerPaddingBottomHeightPX);
				left: 0;
				right: 0;
				text-align: center;
				height: v-bind(navHeightPX);
				color: white;

				.header-title {
					width: 70%;
					height: 100%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 32rpx;
					line-height: 1;
				}

				.header-operation {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 12%;
					position: absolute;
					bottom: 0;
					white-space: nowrap;
					color: #333 !important;

					.header-left-back {
						width: 33rpx;
						height: 32rpx;
					}

					&.header-left-box {
						left: 0;
					}

					&.header-right-box {
						width: auto;
						right: 0;
					}
				}
			}
		}
	}
</style>
