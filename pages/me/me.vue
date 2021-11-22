<template>
	<view class="center">
		<view class="center_top" :style="'background-image: url('+avatar+')'"><view class="mask"></view></view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header" @click="changeAvatar" :style="'background-image: url('+avatar+')'" ></view>
					<text>{{ userName }}</text>
					<image v-show="isToken" @click="toLogin" src="../../static/me/login.png" mode=""></image>
					
				</view>
				<view class="order_status">
					<view class="status" @click="head(index)" v-for="(item,index) in status">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item" @click="itemClick(index)" v-for="(item, index) in menus">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isToken: true,
			userName: '请登陆后使用～',
			avatar:`${this.$BASE_URL}/users/5/avatar`,
			id:5,
			status: [
				{
					key: 1,
					name: '我的计划',
					url: '../../static/me/pc.png'
				},
				{
					key: 2,
					name: '新建待办',
					url: '../../static/me/iconfont/day.png'
				},
				{
					key: 3,
					name: '我的宠物',
					url: '../../static/me/iconfont/pet.png'
				}
			],
			menus: [
				{
					name: '我的信息',
					icon: '../../static/me/iconfont/pinfo.png',
					key: 1
				},
				{
					name: '宠物信息',
					icon: '../../static/me/iconfont/petinfo.png',
					key: 2
				},
				{
					name: '其他',
					icon: '../../static/me/iconfont/other.png',
					key: 3
				},
				{
					name: '设置',
					icon: '../../static/me/iconfont/setting.png',
					key: 4
				},
				{
					name: '注销登录',
					icon: '../../static/me/iconfont/out.png',
					key: 5
				}
			]
		};
	},
	methods: {
		head(index){
			console.log(index)
			switch (index) {
				case 0:
				if(!uni.getStorageSync('userToken')){
					uni.showToast({
						title:"请先登陆呀～",
						duration:2000,
						icon:"none"
					})
					return;
				}
				uni.reLaunch({
					url: '../index/index'
				});
				break;
				case 1:
				if(!uni.getStorageSync('userToken')){
					uni.showToast({
						title:"请先登陆呀～",
						duration:2000,
						icon:"none"
					})
					return;
				}
					uni.reLaunch({
						url: '../index/index'
					});
					break;
					case 2:
					if(!uni.getStorageSync('userToken')){
						uni.showToast({
							title:"请先登陆呀～",
							duration:2000,
							icon:"none"
						})
						return;
					}
						uni.reLaunch({
							url: '../garden/garden'
						});
						break;
				default:
					uni.showToast({
						title: '还未开发哦～',
						duration: 2000,
						icon: 'none'
					});
			}
		},
		changeAvatar(fn){
			let baseUrl = this.$BASE_URL;
			console.log(baseUrl)
			uni.showModal({
				content:"更换我的头像",
				
				success: function (res) {
				        if (res.confirm) {
							uni.chooseImage({
								count:1,
								success: (res) => {
									const tempFilePaths = res.tempFilePaths;
									uni.uploadFile({
										url:`${baseUrl}/upload/avatar`,
										filePath:tempFilePaths[0],
										name:'avatar',
										header:{
											"Authorization":uni.getStorageSync("userToken")
										},
										 success: (uploadFileRes) => {
											console.log(uploadFileRes.data);
											uni.reLaunch({
												//app 适用
												url:"../me/me",
												//网页 适用
												// window.location.reload();
											})
										}
									})
								}
							})
				            console.log('用户点击确定1');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
			})
		},
		getAvatar(){
			let aid = uni.getStorageSync("userId");
			if(!aid){
				this.avatar=`${this.$BASE_URL}/users/5/avatar`
				return;
			}
			uni.request({
				url:`${this.$BASE_URL}/users/${aid}/avatar`,
				method:"GET",
				success: (res) => {
					if(res.data === "isAvatar"){
						this.avatar = `${this.$BASE_URL}/users/5/avatar`
						return;
						}
						this.avatar = `${this.$BASE_URL}/users/${aid}/avatar`
						return;
				},
				fail() {
					return;
				}
			})
			
			
			if(!aid){
				this.avatar=`${this.$BASE_URL}/users/5/avatar`
				return;
			}
			
		},
		toLogin() {
			uni.navigateTo({
				url:"../login/login"
			})
		},
		
		itemClick(index) {
			console.log(index)
			switch (index) {
				case 4:
					uni.clearStorage();
					uni.showToast({
						title: '已退出登录～',
						duration: 2000,
						icon: 'success',
						success() {
							uni.reLaunch({
								url: '../me/me'
							});
						}
					});
					break;
				default:
					uni.showToast({
						title: '还未开发哦～',
						duration: 2000,
						icon: 'none'
					});
			}
		}
	},
	onShow() {
		uni.redirectTo({
			url:"../me/me"
		})
	},
	onPullDownRefresh() {
		uni.showToast({
			title:"刷新一下～",
			duration: 1000,
			icon: 'none'
		})
		 setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		//app 适用
		uni.reLaunch({
			url:"../me/me",
		})
		//网页 适用
		// window.location.reload();
	},
	onLoad() {
	
		this.getAvatar();
		uni.getStorage({
			key: 'userName',
			success: res => {
				this.userName = res.data;
			}
		});
		uni.getStorage({
			key: 'userToken',
			success: res => {
				if (res.data) {
					this.isToken = true;
				}
				this.isToken = false;
			}
		});
	},
	computed: {}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.profily,
.profily_header {
	border-radius: 8px;
}

.center {
	height: 100%;

	&_top {
		height: 18%;
		
		// me页面背景
		background: url('../../static/me/head.jpeg') no-repeat 0% 50%;
		background-size: cover;

		// background: #E6E6E6;
		.mask {
			background: rgba(0, 0, 0, 0.4);
			height: 100%;
		}
	}

	&_box_bg {
		background: #f9f9f9;
		position: relative;

		.profily {
			position: absolute;
			width: 90%;
			// border:1px solid #F7F7F7;
			margin: 0 auto;
			top: -100upx;
			left: 5%;
			background: #fefefe;
			padding: 35upx;
			box-sizing: border-box;
			box-shadow: 0px 2px 5px #ededed;
		}
	}
}

.base {
	display: flex;
	align-items: center;
	border-bottom: 2px solid #f6f6f6;
	padding-bottom: 35upx;
	position: relative;
	.profily_header {
		height: 120upx;
		width: 120upx;
		//用户头像
		background-image: url('../../static/me/head.jpeg');
		background-size: 100%;
	}

	text {
		margin-left: 20px;
		font-size: 30upx;
	}

	image {
		position: absolute;
		height: 40upx;
		width: 40upx;
		right: 0px;
		top: 0px;
	}
}

.order_status {
	display: flex;
	justify-content: space-between;
	margin-top: 35upx;

	.status {
		width: 140upx;
		font-size: 24upx;
		text-align: center;
		letter-spacing: 0.5px;
		display: flex;
		flex-direction: column;
		.icon {
			width: 50upx;
			height: 50upx;
			margin: 0 auto;
			margin-bottom: 5px;
		}
	}
}

.baiban {
	background: #fefefe;
	height: 300upx;
}

.center_menu {
	width: 100%;
	display: inline-block;

	.menu_item {
		font-size: 28upx;
		letter-spacing: 1px;
		padding: 14px 5%;
		background: #fefefe;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #efefef;

		&:hover {
			background: #f6f6f6 !important;
		}

		&::after {
			content: '';
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: 5%;
			//信息栏右侧图标
			background: url('../../static/me/iconfont/circle.png') no-repeat;
			background-size: 100%;
		}

		text:nth-of-type(1) {
			margin-left: 10px;
		}

		image {
			width: 40upx;
			height: 40upx;
		}

		&:nth-of-type(4) {
			margin-top: 10px;
		}
	}
}
</style>
