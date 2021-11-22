<template>
	<view class="insects">
		
		<view class="top" :style="{height:setHeight-10 + 'px',
		 backgroundImage:'url(' + src + ')'
		}">
		<view class="logMessage" @click="logMessage()">
			<image class="logMessage-img" src="../../static/pages/garden/abayu.png"></image>
		</view>
			<view class="attribute" @click="alertI()">
				<view class="growth">
					<view class="growth-left">
						<image class="growth-img" src="../../static/pages/garden/group.png"></image>
					</view>
					<view class="growth-right">
						<view class="growth-value" :style="'width:'+growth*2+'rpx'">
						</view>
						<view class="growth-mask"></view>
					</view>
				</view>
				<view class="hunger">
					<view class="hunger-left">
						<image v-if="hunger>20" class="hunger-img" src="../../static/pages/garden/hunger.png"></image>
						<image v-else class="hunger-img" src="../../static/pages/garden/hunger.png"></image>
					</view>
					<view class="hunger-right">
						<view class="hunger-value" :style="'width:'+hunger*2+'rpx'"></view>
						<view class="hunger-mask"></view>
					</view>
				</view>
			</view>
			<view class="shop" @tap="goShopping">
				<image class="shop-img" src="../../static/pages/garden/shop.png"></image>
			</view>

		</view>

		<beetles v-if="species==1"></beetles>
		<butterfly v-else-if="species==2"></butterfly>
		<fireflies v-else-if="species==3"></fireflies>
		<view class="food" @click="consumptionFoods()">
			<image v-if="species!=1" class="food-img" src="../../static/pages/garden/honey.png"></image>
			<image v-else class="food-img" src="../../static/pages/garden/bee.png"></image>
		</view>
		<view class="food-sum">
			X{{foodSum}}
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :duration="2000" :before-close="true" @close="close"
				@confirm="confirm">
				当前没有可投喂的食物，点击确认去商城购买。
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import beetles from "../../components/beetles.vue"
	import fireflies from "../../components/fireflies.vue"
	import butterfly from "../../components/butterfly.vue"
	export default {
		data() {
			return {
				growth: 0,
				hunger: 0,
				setHeight: 0,
				src: require('../../static/pages/garden/background.jpg'),
				foodSum: 0,
				species: 100,
				visible: true,
				datas: {}
			}
		},
		components: {
			beetles,
			fireflies,
			butterfly
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.setHeight = res.windowHeight
				}
			})
			this.searchUserIn()
		},
		onShow() {
			this.reflesh()
		},
		methods: {
			async logMessage() {
				const res = await this.$myRequest({
					method: 'GET',
					url: '/users/text',
				});
				uni.showModal({
					content: res.data.motto,
					showCancel: false,
					confirmText:"和阿巴一起加油吧！"
				});
			},
			async reflesh() {
				const res = await this.$myRequest({
					method: 'GET',
					url: '/pet/get',
				});
				if (this.growth != res.data.growth || this.hunger != res.data.hunger || this.foodSum != res.data
					.useAnimals == 1 ? res.data.insect : res.data.honey || this.species != res.data.useAnimals || this
					.src != res.data.useBackground) {
					this.growth = res.data.growth;
					this.hunger = res.data.hunger;
					this.foodSum = res.data.useAnimals == 1 ? res.data.insect : res.data.honey;
					this.species = res.data.useAnimals
					this.src = res.data.useBackground
				}
			},
			goShopping: function() {
				uni.navigateTo({
					url: "../shop/shop"
				});
			},
			async searchUserIn() {
				const res = await this.$myRequest({
					method: 'GET',
					url: '/pet/get',
				});
				if (res.statusCode == 200) {
					this.growth = res.data.growth;
					this.hunger = res.data.hunger;
					this.foodSum = res.data.useAnimals == 1 ? res.data.insect : res.data.honey;
					this.species = res.data.useAnimals
					this.src = res.data.useBackground
					uni.setStorage({
						key: "coin",
						data: res.data.coin
					})

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
				uni.navigateTo({
					url: "../shop/shop"
				});
			},
			async consumptionFoods() {

				if (this.foodSum > 0) {
					if (this.hunger < 100) {
						let params = {
							type: this.species == 1 ? "insect" : "honey",
							useAnimals: this.species
						}
						const res = await this.$myRequest({
							method: 'post',
							url: '/pet/feed',
							data: {
								params
							}
						});

						if (res.data.code == 200) {
							uni.showToast({
								title: "饥饿+20",
								duration: 2000,
							});
						} else {
							uni.showToast({
								title: res.errMsg,
								duration: 2000,
								icon: "success",
							});
						}

						uni.showToast({
							title: res.data.mes,
							duration: 2000,
							icon: "success",
						});
						uni.reLaunch({
							url: "../garden/garden",
						})
					} else {
						uni.showToast({
							title: "再喂会把你的宠物撑坏的！",
							duration: 2000,
							icon: "error",
						});
					}
				} else {
					this.$refs.popup.open()
				}

			},
			alertI() {
				let msg = "您当前的成长值是：" + this.growth + "，您当前的饥饿值是：" + this.hunger +
					"。成长值会随着宠物每日完成任务而成长，饥饿值会随着时间而下降，当饥饿值为0时，停止成长。您可以通过商店购买宠物的食物维持饥饿值！";
				uni.showModal({
					content: msg,
					showCancel: false
				});
			}

		}
	}
</script>

<style scoped>
	.insects {
		display: inline-block;
		width: 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 20upx 0;
	}

	/* 状态值 */
	.growth {
		display: flex;
		flex-direction: row;
	}

	.hunger {
		display: flex;
		flex-direction: row;
		margin-top: 10upx;
	}

	.growth-left,
	.hunger-left {
		flex: 0 0 auto;
		width: 70upx;
		height: 70upx;
		overflow: hidden;
		border: 7upx solid #E69A6F;
		border-radius: 50%;
		z-index: 10;
		background-color: white;
	}

	.hunger-left {
		border: 7upx solid #B3BCCC;
	}

	.growth-img {
		height: 70upx;
		width: 70upx;
		transform: scale(1.5);
	}

	.hunger-img {
		height: 70upx;
		width: 70upx;
		transform: scale(0.7);
	}

	.growth-right,
	.hunger-right {
		position: relative;
		margin: 10upx 0 10upx -17upx;
		width: 200upx;
		height: 50upx;
		border: 7upx solid #EF7850;
		border-radius: 0 30upx 30upx 0;
		background-color: white;
	}

	.growth-mask,
	.hunger-mask {
		position: absolute;
		position: relative;
		width: 50upx;
		height: 50upx;
		background-color: white;
		left: 0;
		opacity: 0.2;
		border-radius: 0 30upx 30upx 0;
		background-image: linear-gradient(120deg, #f3f0f6, #767676, #f3f0f6);
		animation: mymove 0.1s linear normal;
		display: none;
	}

	@keyframes mymove {
		from {
			left: 0;
			display: block;
		}

		to {
			left: 150upx;
			display: none;
		}
	}

	.hunger-right {
		border: 7upx solid #a5aec5;
	}

	.growth-value {
		position: absolute;
		left: 1upx;
		top: 0;
		height: 50upx;
		border-radius: 0 32upx 32upx 0;
		background-image: linear-gradient(30deg, #4FAE70, #B2F755);
	}

	.hunger-value {
		position: absolute;
		left: 1upx;
		top: 0;
		height: 50upx;
		border-radius: 0 32upx 32upx 0;
		background-image: linear-gradient(30deg, #d80000, #ff5f58);
	}

	/* 商店 */
	.shop {
		height: 100upx;
		width: 100upx;
		border: 7upx solid #5BA5EF;
		background-color: white;
		border-radius: 50%;
	}

	.shop-img {
		height: 100upx;
		width: 100upx;
		transform: scale(0.8);
	}

	.logMessage {
		height: 130upx;
		width: 200upx;
		position: absolute;
		right: 0;
		top: 150upx;
	}

	.logMessage-img {
		height: 100%;
		width: 100%;
	}

	/* 喂食 */
	.food {
		width: 100upx;
		height: 100upx;
		overflow: hidden;
		border: 7upx solid #E69A6F;
		border-radius: 50%;
		z-index: 10;
		background-color: white;
		position: absolute;
		right: 20upx;
		bottom: 40upx;
	}

	.food-img {
		height: 100upx;
		width: 100upx;
		transform: scale(0.8);
	}

	.food-sum {
		width: 80upx;
		overflow: hidden;
		text-align: center;
		background-color: #FFFFFF;
		border-radius: 15upx;
		position: absolute;
		padding: 0 10upx;
		right: 27upx;
		bottom: 24upx;
		font-size: 30upx;
		font-weight: bold;
		font-family: 'Courier New', Courier, monospace;
		color: transparent;
		-webkit-text-stroke: 1px #aa6e5a;
		z-index: 10;
		opacity: 0.9;
	}
</style>
