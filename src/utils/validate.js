/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
	const valid_map = ['admin', 'liguanchao', 'jiangtingting', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
	const urlregex =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
	return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
	const reg = /^[a-z]+$/
	return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
	const reg = /^[A-Z]+$/
	return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
	const reg = /^[A-Za-z]+$/
	return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}
// 设置登录时间
export function set(key, value) {
	var curTime = new Date().getTime();
	localStorage.setItem(key, JSON.stringify({
		data: value,
		time: curTime
	}));
}
// h获取登录时间
export function get(key, exp) {
	var data = localStorage.getItem(key);
	if (data) {
		var dataObj = JSON.parse(data);
		if (new Date().getTime() - dataObj.time > exp) {
			console.log('登录信息已过期');
			return true;
		} else {
			//console.log("data="+dataObj.data);
			//console.log(JSON.parse(dataObj.data));
			var dataObjDatatoJson = JSON.parse(dataObj.data)
			return dataObjDatatoJson;
		}
	}else{
		return true;
	}
}