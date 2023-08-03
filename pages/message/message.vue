<template>
  <view>
    <view>
      <view class="container">
        <view class="left-column">
			<view>
				<text class="text-container-left">图片修复前  </text>
			</view>
          <view v-for="(item, index) in history" :key="index">
            <!-- <text class="text-container-left">第{{index+1}}张图片修复前  </text> -->
            <br>
            <view class="image-container">
              <image class="image-preview" :src="item" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <view class="right-column">
			<text class="text-container-right">图片修复后</text>
          <view v-for="(item, index) in historyafter" :key="index">
            <!-- <text class="text-container-right">第{{index+1}}张图片修复后</text> -->
            <br>
            <view class="image-container">
              <image class="image-preview" :src="item" mode="aspectFit"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import CryptoJS from 'crypto-js';
import Vue from 'vue';

export default {
  data() {
    return {
      history: [], // 历史记录数组，
      historyafter: []
    };
  },
  created(){
	  // 订阅事件，在事件总线中保存生成的 OSSimagerootafter 值到历史记录数组
	    this.$bus.$on('OSSimagerootbefore', value => {
	      console.log(value);
	      this.history.push(value);
	    });
	    this.$bus.$on('OSSimagerootafter', value => {
	      console.log(value);
	      this.historyafter.push(value);
	    });
	  },
	  beforeDestroy() {
	    // 取消订阅事件
	    this.$bus.$off('OSSimagerootbefore');
	  }
  };
//   mounted() {
    
// };
</script>

<style>
.text-container-left {
  position: absolute;
  top: 20rpx;
  left: 12.5%;
}

.text-container-right {
  position: absolute;
  top: 20rpx;
  right: 12.5%;
}

.image-preview {
  width: 360rpx;
  height: 360rpx;
  margin-bottom: 40rpx;
  border: 4rpx solid #ff0000;
  /* 设置边框样式 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  text-align: center;
}

.container {
  display: flex;
  flex-direction: row;
}

.left-column {
  background-color: #c6fffe;
  flex: 1;
  height: 100vh;
  /* 或者你想要的高度 */
}

.right-column {
  background-color: #d2ffe7;
  flex: 1;
  height: 100vh;
  /* 或者你想要的高度 */
}

.image-container {
  position: relative;
  top: 20rpx;
}
</style>
