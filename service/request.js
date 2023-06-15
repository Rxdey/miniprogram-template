export const baseUrl = "http://127.0.0.1";

const defaultConfigs = {
	url: "/",
	header: {
		// 'content-type': 'application/x-www-form-urlencoded'
		"content-type": "application/json", // 小程序默认值
	},
	timeout: 60 * 1000,
	method: "GET",
	dataType: "json",
	responseType: "text",
};
/**
 * 请求简单封装
 * @param {Object} configs request配置
 * @param {Object} data 请求参数
 * @param {Boolean} loading 是否显示加载框
 * @param {Boolean} loadingMsg 加载框提示文字
 * @param {Boolean} toast 后台有时候提示不准确，可关闭
 */
const request = (configs, data = {}, { loading = true, loadingMsg = "加载中", toast = true } = {}) => {
	if (!configs.url) return;
	const setting = {
		...defaultConfigs,
		...configs,
		method: configs.method.toUpperCase(),
	}; // 简单的merge下
	setting.header = {
		...defaultConfigs.header,
		...configs.header,
		// token: wx.getStorageSync("token"),
		// userCode: wx.getStorageSync("userCode"),
	};
	// 如果没有设置baseUrl 默认使用公共baseUrl
	setting.url = baseUrl + setting.url;
	// console.warn("请求url："+setting.url);
	// console.warn("请求参数",data);
	loading &&
		wx.showLoading({
			title: loadingMsg,
			mask: true,
		});
	return new Promise(resolve => {
		wx.request({
			...setting,
			data,
			success: function (res) {
				// 500等错误也会进success
				const { statusCode = 200 } = res;
				const actions = {
					200: "",
					500: "系统异常",
					404: "请求地址不存在",
				};
				if (actions[statusCode]) {
					setTimeout(() => {
						wx.showToast({
							title: actions[statusCode],
							icon: "none",
							duration: 2000,
						});
					}, 0);
					resolve(false);
					return;
				}
				resolve(res.data);
			},
			fail: function (err) {
				resolve(false);
				loading && wx.hideLoading();
				setTimeout(() => {
					wx.showToast({
						title: err.errMsg || "系统异常",
						icon: "none",
						duration: 3000,
					});
				}, 0);
			},
			complete: function (res) {
				loading && wx.hideLoading();
			},
		});
	});
};

export default request;
