<template>
  <view class="container">
    <view class="header">
      <image class="icon" src="/static/me/camera.png"></image>
      <text class="title">相机权限</text>
    </view>
    <view class="content">
      <view class="item">
        <text class="label">相机权限状态：</text>
        <text class="value">{{ cameraPermission }}</text>
      </view>
      <button class="button" @tap="openCamera">打开相机</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cameraPermission: ''
    };
  },
  methods: {
    openCamera() {
      uni.getSetting({
        success: (res) => {
          if (res.authSetting['scope.camera']) {
            // 相机权限已开启
            this.cameraPermission = '已开启';
            uni.showToast({
              title: '相机已打开',
              icon: 'none'
            });
          } else {
			  this.cameraPermission = '未开启';
            // 相机权限未开启，引导用户去设置页面开启
            uni.showModal({
              title: '提示',
              content: '请前往设置页面开启相机权限',
              confirmText: '去设置',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  uni.openSetting();
                }
              }
            });
          }
        }
      });
    }
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
  margin-right: 10px;
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
  color: #333;
}

.value {
  flex: 1;
  text-align: right;
}

.button {
  /* padding: 10px 20px; */
  background-color: #1AAD19;
  color: #fff;
  border-radius: 4px;
}
</style>
