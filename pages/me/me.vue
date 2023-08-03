<template>
  <view>
    <view class="header">
      <image class="avatar" :src="userAvatar"></image>
    </view>
    <view class="list">
      <view class="item" @tap="goToAccountManagement">
        <image class="icon" src="/static/me/zhanghaoguanli.png"></image>
        <text class="title">账号管理</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
      <view class="item" @tap="goToLogInformation">
        <image class="icon" src="/static/me/rizhi.png"></image>
        <text class="title">日志信息</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
      <view class="item" @tap="goToCameraSettings">
        <image class="icon" src="/static/me/camera.png"></image>
        <text class="title">相机设置</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
      <view class="item" @tap="goToFeedback">
        <image class="icon" src="/static/me/idea.png"></image>
        <text class="title">意见反馈</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
      <view class="item" @tap="goToAboutApp">
        <image class="icon" src="/static/me/guanyvwo1.png"></image>
        <text class="title">关于APP</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
      <view class="item" @tap="clearCache">
        <image class="icon" src="/static/me/cache.png"></image>
        <text class="title">清除缓存</text>
        <image class="arrow" src="/static/arrow-right.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userAvatar: '/static/man.png' // 用户头像路径
    };
  },
  methods: {
    goToAccountManagement() {
		uni.navigateTo({
			url:'/pages/accountmanage/accountmanage'
		})
      // 跳转到账号管理界面
      // 使用uni.navigateTo或uni.redirectTo实现页面跳转
    },
    goToLogInformation() {
		console.log("日志")
		uni.navigateTo({
			url:'/pages/log/log'
		})
      // 跳转到日志信息界面
      // 使用uni.navigateTo或uni.redirectTo实现页面跳转
    },
    goToCameraSettings() {
		console.log("相机")
		uni.navigateTo({
			url:'/pages/camera/camera'
		})
      // 跳转到相机设置界面
      // 使用uni.navigateTo或uni.redirectTo实现页面跳转
    },
    goToFeedback() {
		uni.navigateTo({
			url:'/pages/connectme/connectme'
		})
      // 跳转到意见反馈界面
      // 使用uni.navigateTo或uni.redirectTo实现页面跳转
    },
    goToAboutApp() {
		console.log("关于APP")
		uni.navigateTo({
			url:'/pages/aboutAPP/aboutAPP'
		})
      // 跳转到关于APP界面
      // 使用uni.navigateTo或uni.redirectTo实现页面跳转
    },
    clearCache() {
		console.log("清除缓存")
		uni.navigateTo({
			url:'/pages/clearcache/clearcache'
		})
      // 清除缓存操作
    }
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.list {
  margin-top: 20px;
}

.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.title {
  flex: 1;
}

.arrow {
  width: 20px;
  height: 20px;
}
</style>
