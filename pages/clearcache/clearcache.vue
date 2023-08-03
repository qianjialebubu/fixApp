<template>
  <view class="container">
    <view class="header">
      <image class="icon" src="/static/me/cache.png"></image>
      <text class="title">清除缓存</text>
    </view>
    <view class="content">
      <view class="item">
        <text class="label">当前缓存大小：</text>
        <text class="value">{{ cacheSize }}</text>
      </view>
      <view class="item">
        <text class="label">清除缓存：</text>
        <button class="clear-button" @tap="clearCache">清除</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cacheSize: '' // 当前缓存大小
    };
  },
  onShow() {
    this.updateCacheSize();
  },
  methods: {

    clearCache() {
         // 清除缓存操作
         uni.clearStorage({
           success: () => {
             this.cacheSize = '0KB';
             uni.showToast({
               title: '缓存已清除',
               icon: 'none'
             });
           }
         });
       },
	updateCacheSize() {
	  // 获取并更新当前缓存大小
	  uni.getStorageInfo({
	    success: (res) => {
	      this.cacheSize = (res.currentSize / 1024).toFixed(2) + 'KB';
	    }
	  });
	},
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 10rpx;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.label {
  width: 150px;
  color: #999;
}

.value {
  flex: 1;
  text-align: right;
}

.clear-button {
  /* padding: 10px 20px; */
  background-color: #FF4949;
  color: #fff;
  border-radius: 4px;
  left: 90rpx;
  
  
}
</style>
