// 距离当前时间
export const getTimeAgo = (date = '') => {
	if (!date) return '';
	if (typeof date === 'string') date = new Date(date);
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 24;
	const month = day * 30;
	const year = day * 365;
	const timeElapsed = Date.now() - date.getTime();
	if (timeElapsed < minute) {
		return '刚刚';
	} else if (timeElapsed < hour) {
		const minutes = Math.floor(timeElapsed / minute);
		return `${minutes} 分钟前`;
	} else if (timeElapsed < day) {
		const hours = Math.floor(timeElapsed / hour);
		return `${hours} 小时前`;
	} else if (timeElapsed < month) {
		const days = Math.floor(timeElapsed / day);
		return `${days} 天前`;
	} else if (timeElapsed < year) {
		const months = Math.floor(timeElapsed / month);
		return `${months} 个月前`;
	} else {
		const years = Math.floor(timeElapsed / year);
		return `${years} 年前`;
	}
};
// 根据id去重
export const uniqueArray = (array = []) =>
	Array.from(new Set(array.map(obj => obj.id))).map(id => {
		return array.find(obj => obj.id === id);
	});
// 清理参数
export const cleanParams = function (params = {}) {
	const obj = {};
	Object.keys(params).forEach(d => {
		if (params[d] || params[d] === 0) {
			obj[d] = params[d];
		}
	});
	return obj;
};
// 转换为queryString
export const queryString = query => {
	return Object.keys(query).reduce((prve, next) => {
		const str = prve ? '&' : '?';
		prve += `${str}${next}=${encodeURIComponent(query[next])}`;
		return prve;
	}, '');
};
// 随机字符串
export const createId = (len = 5) => {
	if (len > 11) len = 11;
	let str = Math.random().toString(36).substr(2);
	return str.substr(0, len);
};
