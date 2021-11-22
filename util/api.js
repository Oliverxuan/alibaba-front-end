//本地环境（测试环境）
// const BASE_URL = "http://121.5.114.161:6415"

//线上环境（正式环境）
 // const BASE_URL = "http://121.5.114.161:6400"
 
export const BASE_URL = "http://121.5.114.161:6400"

export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				Authorization: uni.getStorageSync("userToken") || {}
			},
			success: res => {
				if (res.statusCode == 400 || res.statusCode == 500) {
					return uni.showToast({
						title: "获取数据失败！"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求失败"
				})
				reject(err)
			}
		})
	})
}
