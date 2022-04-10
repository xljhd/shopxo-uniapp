const request = {}
var headers = {}
// import utils from 'utils/index.js'
var jumpTimeStamp = null;
request.globalRequest = (url, method, data, showLoading = true, header = null) => {
	try {
		headers['Content-type'] = 'application/json;charset=utf-8';
		var token = uni.getStorageSync('token');
		if (!header) {
			headers['ACCESSTOKEN'] = token;
		}else{
			headers = header;
		}
		if (method == 'POST') {
			// const language = uni.getStorageSync('language') || "zh-cn";
			// data['language'] = language;
			if (data) {
				data = JSON.stringify(data);
			}
		}
		if (showLoading) {
			uni.showLoading({
				title: ''
			});
		}
		console.log('----------请求开始-----------');
		console.log('请求地址：' + url);
		console.log('请求头：' + JSON.stringify(headers));
		console.log('请求体：' + data);
		console.log('----------请求结束-----------');
		return uni.request({
			url: url,
			method: method,
			data: data,
			header: headers
		}).then(res => {
			uni.hideLoading();
			if (res[1].data.code == 200 && res[1].statusCode == 200) {
				var resData = res[1].data;
				if(resData.data){
					// resData = utils.handleItemPriceValue(resData);
					var token = resData.data.token;
					if (token) {
						uni.setStorageSync('token', token);
					}
				}
				
				console.log('----------响应开始【正常】-----------');
				console.log('响应内容：' + JSON.stringify(res[1].data));
				console.log('----------响应结束【正常】-----------');
				return resData;
			} else {
				throw res[1].data;
			}
		}).catch(parmas => {
			uni.hideLoading();
			uni.$emit('z-paging-error-emit');
			console.log('----------响应开始【错误】-----------');
			console.log('错误内容：' + parmas);
			console.log('----------响应结束【错误】-----------');
			if (parmas.msg === '重新登录' || parmas.msg === '用户不存在！' ||  parmas.msg === '登录过期|请重新登录'||  parmas.msg === '无效token'||  parmas.msg === '无效TOKEN') {
				uni.clearStorage('token');
				uni.clearStorage('userPhone');
				uni.showToast({
					title: '请重新登录',
					icon: 'none'
				})
				// toLogin();
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return Promise.reject()
			}
			switch (parmas.code) {
				case 401:
					uni.clearStorageSync()
					break
				default:
					{
						let errMsg = parmas.msg ? parmas.msg : '请求失败';
						uni.showToast({
							title: errMsg,
							duration: 150 * errMsg.length,
							icon: 'none'
						})
						return Promise.reject()
						break
					}

			}
		})
	} catch (e) {
		uni.showToast({
			title: e.message,
			icon: 'none'
		})
		uni.clearStorageSync();
	}

}

function toLogin() {
	let currentTimeStamp = (new Date()).getTime();
	if (jumpTimeStamp && currentTimeStamp - jumpTimeStamp <= 1000) {
		return;
	}
	jumpTimeStamp = currentTimeStamp;
	let pages = getCurrentPages();
	if(utils.isLoginType() == 2){
		if(pages.length > 1){
			uni.redirectTo({
				 url: '/pages/login/login'
			})
		}else{
			uni.navigateTo({
				 url: '/pages/login/login'
			})
		}
	}else{
		if(pages.length > 1){
			uni.redirectTo({
				 url: '/pages/login/hLogin'
			})
		}else{
			uni.navigateTo({
				 url: '/pages/login/hLogin'
			})
		}
	}

}


export default request
