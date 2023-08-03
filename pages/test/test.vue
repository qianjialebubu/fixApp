<template>
  <view class="container">
    <view class="header">
      <!-- <image class="logo" src="/static/logo.png" mode="aspectFit" /> -->
      <view class="title">图像修复</view>
    </view>
    <view class="content">
      <view class="section">
        <view class="section-content">什么是图像修复？</view>
        <view class="section-content-1">
          图像修复是一种利用计算机算法和技术对受损或缺失的图像进行恢复和修复的系统。它可以自动分析图像中的缺陷，并尝试恢复丢失的细节、修复噪点和损坏的区域。
        </view>
      </view>
      <view class="section">
        <view class="section-content">系统特点</view>
        <view class="section-content-box">
			 
          <view class="section-feature">
			  <view>
				  <text>自动识别图像缺陷</text>
			  </view>
			  <image class="image-index" src="/static/index/shibie.png"></image>
		  </view>
		  <view class="section-feature">
			  <view>
				  <text>恢复图像细节纹理</text>
			  </view>
			  <image class="image-index" src="/static/index/wenli.png"></image>
		  </view>
		  <view class="section-feature">
			  <view>
				  <text>去除图像噪点伪影</text>
			  </view>
			  <image class="image-index" src="/static/index/quzao.png"></image>
		  </view>
		  <view class="section-feature">
			  <view>
				  <text>多种修复算法选择</text>
			  </view>
			  <image class="image-index" src="/static/index/suanfa.png"></image>
		  </view>
		  <view class="section-feature">
			  <view>
				  <text>恢复图像结构损失</text>
			  </view>
			  <image class="image-index" src="/static/index/funny.png"></image>
		  </view>
		  <view class="section-feature">
			  <view>
				  <text>用户友好界面操作</text>
			  </view>
			  <image class="image-index" src="/static/index/jiaohu.png"></image>
		  </view>
        </view>
      </view>
      <view class="section">
        <view class="section-content">应用领域</view>
        <view class="section-content-box">
			<view class="section-feature-app">
			  <view>
				  <text>照片上色修复</text>
			  </view>
			  <image class="image-index-app" src="/static/index/oldpic.png" mode="aspectFit"></image>
			</view>
			<view class="section-feature-app">
			  <view>
				  <text>文物艺术修复</text>
			  </view>
			  <image class="image-index-app" src="/static/index/art.png" mode="aspectFit"></image>
			</view>
			<view class="section-feature-app">
			  <view>
				  <text>图像物体去除</text>
			  </view>
			  <image class="image-index-app" src="/static/index/shuiyin2.png" mode="aspectFit"></image>
			</view>
			<view class="section-feature-app">
			  <view>
				  <text>视频修复增强</text>
			  </view>
			  <image class="image-index-app" src="/static/index/shipin.png" mode="aspectFit"></image>
			</view>
<!--          <view class="section-area">数字图像修复</view>
          <view class="section-area">文物艺术修复</view>
          <view class="section-area">医学图像恢复</view>
          <view class="section-area">视频修复增强</view> -->
          <!-- <view class="section-area">手机图像增强</view> -->
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="footer-text" @click="goToMore()">了解更多</view>
      <view class="arrow" >›</view>
    </view>
  </view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onShow() {
			console.log('Index')
		},
		
		onLoad() {

		},
		onPullDownRefresh() {
			console.log("页面下拉刷新")
		},
		methods: {
			goToMore(){
				console.log("更多")
				uni.navigateTo({
					url: "/pages/moreKnow/moreKnow"
				})
			}

		}
	}
</script> -->

<style>
.image-index{
	width: 240rpx;
	height: 240rpx;
	margin-right: 20rpx;
}
.section-content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20rpx;
}

.section-feature, .section-area {
  font-size: 32rpx;
  padding: 20rpx;
  margin: 10rpx;
  border-radius: 20rpx;
  background-color: lightblue;
  box-shadow: inset 0px 2rpx 6rpx rgba(0, 0, 0, 0.5);
}
/* .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 40rpx;
  background-color: lightcyan;
} */

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
}

.title {
  font-size: 48rpx;
  margin-top: 20rpx;
  /* left: 159px;
  top: 17.63px;
  width: 136px;
  height: 64px; */
  opacity: 1;
  /** 文本1 */
  font-size: 32rpx;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 64rpx;
  color: rgba(0, 0, 0, 1.0);
  text-align: left;
  vertical-align: top;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  background-color: lightcyan;
}

.content {
  width: 100%;
  flex: 1; /* Fill available vertical space */
}

/* .content {
  width: 100%;
} */

.section {
  margin-bottom: 40rpx;
}

/* 副标题的样式 */
.section-title {
	
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.section-content {
	font-size: 36rpx;
	font-weight: bold;
	/* margin-bottom: 10px; */

	width: 360rpx;
	/* height: 85.12px; */
	opacity: 1;
	border-radius: 18rpx;
	background: linear-gradient(90deg, rgba(255, 241, 162, 1) 0%, rgba(255, 222, 105, 1) 100%);
	
	border: 2rpx solid rgba(255, 255, 255, 1);
	
	box-shadow:inset 0px 2rpx 6rpx  rgba(0, 0, 0, 0.5);
  /* font-size: 14px;
  line-height: 1.5;
  background-color: lightgreen; */
}
.section-content-1{
	left: 0px;
	top: 0px;
	opacity: 1;
	border-radius: 20rpx;
	background: linear-gradient(90deg, rgba(242, 186, 230, 1.0) 0%, rgba(168, 174, 251, 1.0) 100%), linear-gradient(180deg, rgba(167, 76, 242, 1) 0%, rgba(117, 101, 251, 1) 100%), rgba(216, 216, 216, 1);
}
.section-content-2{
	/*blue-mask*/
	left: 0px;
	top: 0px;
	opacity: 1;
	border-radius: 20rpx;
	background: linear-gradient(135.42deg, rgba(23, 234, 217, 1) 0%, rgba(85, 195, 234, 1.0) 100%), linear-gradient(180deg, rgba(41, 249, 153, 1) 0%, rgba(0, 126, 246, 1) 100%), rgba(255, 255, 255, 1);

}
.section-content-3{
	/*orange-mask*/
	
	left: 0px;
	top: 0px;
	opacity: 1;
	border-radius: 20rpx;
	background: linear-gradient(270deg, rgba(250, 217, 97, 1) 0%, rgba(247, 144, 59, 1.0) 100%), rgba(255, 255, 255, 1);

}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 60rpx;
  color: #00ff00;
  
}

.footer-text {
  font-size: 32rpx;
  margin-right: 10rpx;
  color: #00007f;
  
}

.arrow {
  font-size: 40rpx;
  color: #0088cc;
}
.section-feature-app{
	width: 600rpx;
	height: 600rpx;
	font-size: 32rpx;
	padding: 20rpx;
	margin: 10rpx;
	border-radius: 20rpx;
	background-color: lightblue;
	box-shadow: inset 0px 2rpx 6rpx rgba(0, 0, 0, 0.5);
}
.image-index-app{
	width: 600rpx;
	height: 600rpx;
	margin-right: 20rpx;
}
</style>




