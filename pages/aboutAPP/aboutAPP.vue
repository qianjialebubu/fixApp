<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="/static/me/guanyvwo1.png"></image>
      <text class="title">图像修复APP</text>
    </view>
    <view class="list">
      <view class="item">
		<image class="icon" src="/static/aboutAPP/banben.png"></image>
        <text class="label">版本号</text>
        <text class="value">1.0.0</text>
      </view>
      <view class="item">
		<image class="icon" src="/static/aboutAPP/author.png"></image>
        <text class="label">作者</text>
        <text class="value">qjl</text>
      </view>
      <view class="item">
		<image class="icon" src="/static/aboutAPP/phone.png"></image>
        <text class="label">联系方式</text>
        <text class="value">2077103562@qq.com</text>
      </view>
      <view class="item">
		<image class="icon" src="/static/aboutAPP/school.png"></image>
        <text class="label">机构</text>
        <text class="value">天津理工大学</text>
      </view>
	  <view class="item">
	  	<image class="icon" src="/static/aboutAPP/adress.png"></image>
	    <text class="label">地址</text>
	    <text class="value">天津市西青区</text>
	  </view>
    </view>
  </view>
</template>

<style>
.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 80rpx;
  height: 80rpx;
  margin-right: 10rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
}

.list {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.label {
  width: 100px;
  color: #999;
}

.value {
  flex: 1;
  text-align: right;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

</style>
