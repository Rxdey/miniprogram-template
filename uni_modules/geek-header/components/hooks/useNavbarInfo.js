import { ref } from 'vue';
import {
	onLoad,
	onReady
} from '@dcloudio/uni-app';

export default function useNavbarInfo() {
	// 目前运行的环境
	const type = uni.getSystemInfoSync().uniPlatform;
	// 胶囊高度仅在小程序端支持时使用 其他端使用100
	let cachetInfo = ref({
		height: 0,
		top: 0,
		width: 0
	});
	// 胶囊高度仅在小程序端支持时使用 否则使用固定高度
	if (type != 'app' && type != 'web' && type != 'mp-lark') {
		cachetInfo.value = wx.getMenuButtonBoundingClientRect();
	} else {
		cachetInfo.value.height = 50;
	}
	// 沉浸式状态栏高度 如果时小程序则获取需要加上小程序的胶囊高度距离沉浸式导航栏的高度
	let statusBarHeight = ref(0);
	// 安全区域上方高度
	let safeAreaInsetTop = ref(0);
	// 安全区域下方高度
	let safeAreaInsetBottom = ref(0);

	// 胶囊的宽度
	let cachetWidthPX = ref(0)
	// 导航栏高度
	let navHeightPX = ref(0);
	// 沉浸式状态栏高度带px
	let statusBarHeightPX = ref(0);
	// 安全区域上方高度带px
	let safeAreaInsetTopPX = ref(0);
	// 安全区域下方高度带px
	let safeAreaInsetBottomPX = ref(0);
	// 自定义头部内边距高度
	let headerPaddingHeightPX = ref(0);
	
	// 自定义头部内边距推荐距离仅在小程序端支持时使用
	let headerPaddingBottomHeightPX = ref(0);
	if (type != 'app' && type != 'web' && type != 'mp-lark') {
		headerPaddingBottomHeightPX.value = cachetInfo.value.height * 0.3 + 'px';
	} else {
		headerPaddingBottomHeightPX.value = 0 + 'px';
	}

	onLoad(() => {
		// 沉浸式状态栏高度 如果时小程序则获取需要加上小程序的胶囊高度距离沉浸式导航栏的高度
		statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight + (cachetInfo.value.top ? cachetInfo.value.top - uni.getSystemInfoSync().statusBarHeight : 0);
		// 安全区域上方高度
		safeAreaInsetTop.value = uni.getSystemInfoSync().safeAreaInsets.top;
		// 安全区域下方高度
		safeAreaInsetBottom.value = uni.getSystemInfoSync().safeAreaInsets.bottom;

		// 胶囊的宽度
		cachetWidthPX.value = cachetInfo.value.width + 15 + 'px';
		// 导航栏高度
		navHeightPX.value = cachetInfo.value.height + 'px';
		// 沉浸式状态栏高度带px
		statusBarHeightPX.value = statusBarHeight.value + 'px';
		// 安全区域上方高度带px
		safeAreaInsetTopPX.value = safeAreaInsetTop.value + 'px';
		// 安全区域下方高度带px
		safeAreaInsetBottomPX.value = safeAreaInsetBottom.value + 'px';
		// 自定义头部内边距高度
		headerPaddingHeightPX.value = (statusBarHeight.value + cachetInfo.value.height) + 'px';
	})

	return {
		cachetWidthPX,
		navHeightPX,
		statusBarHeightPX,
		safeAreaInsetTopPX,
		safeAreaInsetBottomPX,
		headerPaddingHeightPX,
		headerPaddingBottomHeightPX
	};
}
