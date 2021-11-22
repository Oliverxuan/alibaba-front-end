<template>
	<view class="background" :style="{height:setHeight + 'px',
	 backgroundImage:'url(' + src + ')'
	}">
		<view class="card-list">
			<view class="card">
				<img src="../../static/pages/garden/honey.png" @click="cardImgClick('这是花蜜，你可以用它来喂萤火虫和蝴蝶！')" />
				<view class="content">
					<view class="introduction">花蜜</view>
					<view class="cost">
						<img src="../../static/coin.png" />
						<view class="cost-context">
							1/个
						</view>
					</view>
					<view class="buy">
						<img class="buy-img" src="../../static/pages/garden/buy.png" @click="buyFood('honey')" />
					</view>
				</view>
			</view>
			<view class="card">
				<img src="../../static/pages/garden/bee.png" @click="cardImgClick('这是蚜虫，你可以用它来喂瓢虫！')" />
				<view class="content">
					<view class="introduction">蚜虫</view>
					<view class="cost">
						<img src="../../static/coin.png" />
						<view class="cost-context">
							1/个
						</view>
					</view>
					<view class="buy">
						<img class="buy-img" src="../../static/pages/garden/buy.png" @click="buyFood('insect')" />
					</view>
				</view>
			</view>

			<template v-for="item in list">
				<view class="card">
					<img :src="item.src" @click="cardImgClick(item.introduction)" />
					<view class="content">
						<view class="introduction">{{item.name}}</view>
						<view class="cost">
							<img src="../../static/coin.png" />
							<view class="cost-context">
								{{item.cost}}
							</view>
						</view>
						<view v-if="!item.isHave" class="buy" @click="buyStatic(item.b_id,item.cost)">
							<img class="buy-img" src="../../static/pages/garden/buy.png" />
						</view>
						<view v-if="item.isHave">
							<view v-if="!item.isuse" class="use" @click="changeStatic(item.b_id)">使用</view>
							<view v-if="item.isuse" class="useing">正在用</view>
						</view>
					</view>
				</view>
			</template>

		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="请输入想要购买的数值!" mode="input" message="成功消息" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				setHeight: 0,
				src: require('../../static/pages/garden/background1.jpg'),
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.setHeight = res.windowHeight
				}
			})
			this.getStoreList()
		},
		methods: {
			async buyStatic(a, b) {
				if (uni.getStorageSync("coin") >= b) {
					let params = {
						b_id: a
					}
					let res = await this.$myRequest({
						method: 'post',
						url: '/pet/store/buy/static',
						data: params
					})
					if (res.data.code == 200) {
						uni.reLaunch({
							url: "../shop/shop",
						})
						uni.showToast({
							title: res.data.mes,
							duration: 2000,
							icon: "success",
						});
					} else {
						uni.showToast({
							title: res.errMsg,
							duration: 2000,
							icon: "error",
						});
					}
				}
				uni.showToast({
					title: "钱不够呀～",
					duration: 2000,
					icon:"error",
				});
			},
			 async changeStatic(a, ) {
			 	let params = {
			 		b_id: a
			 	}
			 	let res = await this.$myRequest({
			 		method: 'post',
			 		url: '/pet/store/change/static',
			 		data: params
			 	})
			 	if (res.data.code == 200) {
			 		uni.reLaunch({
			 			url: "../garden/garden",
			 		})
			 		uni.showToast({
			 			title: res.data.mes,
			 			duration: 2000,
			 			icon: "success",
			 		});
			 	} else {
			 		uni.showToast({
			 			title: res.errMsg,
			 			duration: 2000,
			 			icon: "error",
			 		});
			 	}
			 },
			cardImgClick(e) {
				uni.showModal({
					content: e,
					showCancel: false
				});
			},
			async getStoreList() {
				let res = await this.$myRequest({
					method: 'post',
					url: '/pet/store',
				})
				if (res.data.code == 200) {
					this.list = res.data.store
				}
			},
			buyFood(type) {
				uni.setStorage({
					key: "type",
					data: type,
				})
				this.$refs.popup.open()
			},
			async buyFoods(value) {
				let params = {
					type: uni.getStorageSync("type"),
					num: value
				}
				let res = await this.$myRequest({
					method: 'post',
					url: '/pet/store/buy/food',
					data: params
				})
				if (res.data.code == 200) {
					this.$refs.popup.close()
					uni.showToast({
						title: res.data.mes,
						duration: 2000,
						icon: "success",
					});
				}
			},
			close() {
				this.$refs.popup.close()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(value) {
				if (!isNaN(value / 1)) {
					let coin = uni.getStorageSync("coin");
					if (value > coin) {
						uni.showModal({
							content: "当前的阿巴币不足，多去完成自己的计划吧！",
							showCancel: false
						});
					} else {
						this.buyFoods(value)
					}
				} else {
					uni.showModal({
						content: "你在逗我吗？我们论个卖！",
						showCancel: false
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.background {
		background-repeat: repeat;
		overflow-y: auto;
	}

	.card-list {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20upx 20upx;
		-moz-column-count: 2;
		-webkit-column-count: 2;
		column-count: 2;
		// justify-content: space-between;
		justify-content: flex-start;

	}

	.card {
		width: 350upx;
		height: 400upx;
		overflow: hidden;
		background-color: #FFFFFF;
		margin-bottom: 10upx;
		border-radius: 20upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		box-shadow: 1px 2px 2px 0 #aaa;
		-webkit-transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
		transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);

		>img {
			height: 320upx;
			width: 320upx;
			margin: 10upx 15upx;
			border-radius: 20upx;
		}

		.content {
			width: 315upx;
			height: 40upx;
			flex: 0 0 auto;
			overflow: hidden;
			border-top: 0.5upx solid #cbcdd1;
			border-radius: 0 0 20upx 20upx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 7upx 20upx;

			.cost {
				width: 100upx;
				padding: 7upx 0 0 4upx;
				overflow: hidden;
				display: flex;
				flex-wrap: nowrap;

				img {
					height: 35upx;
					width: 35upx;
				}

				.cost-context {
					font-size: 20upx;
					margin-left: 2upx;
					line-height: 35upx;
				}
			}

			.buy {
				img {
					height: 40upx;
					width: 40upx;
				}
			}

			.useing {
				color: #b3bccc;
			}

			.use {
				border-radius: 10upx;
				background-color: #ea6040;
				padding: 0 10upx;
				line-height: 40upx;
				height: 40upx;
				color: #FFFFFF;
			}
		}
	}

	.card:nth-child(2n+1) {
		margin-right: 10upx;
	}
</style>
