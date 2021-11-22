<template>
	<view class="box-canvas">
	    <view class="leg left"></view>
	    <view class="leg right"></view>
	    <view class="feeler left"></view>
	    <view class="feeler right"></view>
	    <view class="head"></view>
	    <view class="body">
	      <view class="spot left"></view>
	      <view class="spot right"></view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* 瓢虫 */
	.box-canvas{
	  position: absolute;
	  left: 10.5%;
	  top: 200upx;
	  margin: auto;
	  display: block;
	  width: 600upx;
	  transform: scale(2);
	}
	
	.body {
	  position: absolute;
	  left: 50%;
	  top: 150upx;
	  transform: translateX(-50%);
	  width: 180upx;
	  height: 200upx;
	  background: #F82222;
	  border-radius: 50%;
	  overflow: hidden;
	  border: 2px solid #F82222;
	}
	
	/* White dot at top of body */
	.body::before {
	  content: '';
	  position: absolute;
	  width: 70upx;
	  height: 70upx;
	  background: white;
	  border-radius: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}
	
	/* Stripe in middle body */
	.body::after {
	  content: '';
	  position: absolute;
	  width: 2upx;
	  height: 200upx;
	  background: #B21C1C;
	  left: 50%;
	  transform: translateX(-50%);
	}
	
	.spot {
	  position: absolute;
	  width: 50upx;
	  height: 50upx;
	  background: black;
	  border-radius: 50%;
	  top: 50%;
	}
	
	.spot.left {
	  left: 25%;
	  transform: translate(-25%, -50%);
	}
	
	.spot.right {
	  right: 25%;
	  transform: translate(25%, -50%);
	}
	
	/* Top smaller dot */
	.spot::before {
	  content: '';
	  position: absolute;
	  width: 25upx;
	  height: 25upx;
	  background: black;
	  border-radius: 50%;
	  top: -35upx;
	}
	
	.spot.left::before {
	  left: -5upx;
	}
	
	.spot.right::before {
	  right: -5upx;
	}
	
	/* Lower small spots */
	.spot::after {
	  content: '';
	  position: absolute;
	  width: 25upx;
	  height: 25upx;
	  background: black;
	  border-radius: 50%;
	  top: 60upx;
	}
	
	.spot.left::after {
	  left: -5upx;
	}
	
	.spot.right::after {
	  right: -5upx;
	}
	
	.head {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  top: 90upx;
	  width: 90upx;
	  height: 90upx;
	  background: black;
	  border-radius: 50% 50% 0 0;
	  border: 2upx solid black;
	  overflow: hidden;
	}
	
	/* Left white head spot */
	.head::before {
	  content: '';
	  position: absolute;
	  transform: translateX(-50%);
	  width: 50upx;
	  height: 50upx;
	  background: white;
	  border-radius: 50%;
	}
	
	/* Right white head spot */
	.head::after {
	  content: '';
	  position: absolute;
	  right: 0;
	  transform: translateX(50%);
	  width: 50upx;
	  height: 50upx;
	  background: white;
	  border-radius: 50%;
	}
	
	.feeler {
	  position: absolute;
	  height: 50upx;
	  width: 20upx;
	  border-top: 3upx solid black;
	  top: 55upx;
	}
	
	.feeler.left {
	  left: 43%;
	  transform: rotate(-45deg) translateX(-43%);
	  border-right: 5upx solid black;
	  border-radius: 0 50%;
	}
	
	.feeler.right {
	  right: 43%;
	  transform: rotate(45deg) translateX(43%);
	  border-left: 5upx solid black;
	  border-radius: 50% 0;
	}
	
	/* Circle on end of feelers */
	.feeler::after {
	  content: '';
	  position: absolute;
	  width: 10upx;
	  height: 10upx;
	  background: black;
	  border-radius: 50%;
	  top: -5upx;
	}
	
	.feeler.left::after {
	  left: -5upx;
	  top: -5upx;
	}
	
	.feeler.right::after {
	  right: -5upx;
	}
	
	/* Middle leg */
	.leg {
	  position: absolute;
	  top: 250upx;
	  width: 50upx;
	  height: 10upx;
	  border: 5upx solid black;
	  border-radius: 50% 50% 20% 20%;
	  border-bottom: 0;
	}
	
	.leg.left {
	  left: 32%;
	  transform: translateX(-30%);
	}
	
	.leg.right {
	  right: 32%;
	  transform: translateX(30%);
	}
	
	/* Top legs */
	.leg::before {
	  content: '';
	  position: absolute;
	  top: -50upx;
	  width: 50upx;
	  height: 10upx;
	  border: 5upx solid black;
	  border-radius: 50% 50% 20% 20%;
	   border-bottom: 0;
	}
	
	.leg.left::before {
	  left: 5upx;
	  transform: rotate(20deg);
	}
	
	.leg.right::before {
	  right: 5upx;
	  transform: rotate(-20deg);
	}
	
	/* Bottom legs */
	.leg::after {
	  content: '';
	  position: absolute;
	  top: 50upx;
	  width: 50upx;
	  height: 10upx;
	  border: 5px solid black;
	  border-radius: 50% 50% 20% 20%;
	   border-bottom: 0;
	}
	
	.leg.left::after {
	  left: 8upx;
	  transform: rotate(-20deg);
	}
	
	.leg.right::after {
	  right: 8upx;
	  transform: rotate(20deg);
	}
</style>
