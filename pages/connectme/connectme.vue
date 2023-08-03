<template>
  <view class="container">
    <image class="background-image" src="/static/background.jpg"></image>
    <view class="form-group">
      <view class="input-group">
        <image class="icon" src="/static/connectme/name.png"></image>
        <view class="input-wrapper">
          <view class="label">姓名:</view>
          <input class="input" type="text" v-model="name" placeholder="请输入您的姓名" />
        </view>
      </view>
    </view>
    <view class="form-group">
      <view class="input-group">
        <image class="icon" src="/static/connectme/email.png"></image>
        <view class="input-wrapper">
          <view class="label">电子邮件:</view>
          <input class="input" type="email" v-model="email" placeholder="请输入您的电子邮件" />
        </view>
      </view>
    </view>
    <view class="form-group">
      <view class="input-group">
        <image class="icon" src="/static/connectme/vocation.png"></image>
        <view class="input-wrapper">
          <view class="label">职业:</view>
          <view class="custom-select">
            <input class="input" type="text" :value="selectedOccupation" readonly @click="toggleOccupationPicker" />
            <view class="select-options" v-show="showOccupationPicker">
              <scroll-view scroll-y class="options-container">
                <view class="option" v-for="(occupation, index) in occupationOptions" :key="index" @click="selectOccupation(index)">
                  {{ occupation }}
                </view>
              </scroll-view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="form-group">
      <view class="input-group">
        <image class="icon" src="/static/connectme/message.png"></image>
        <view class="input-wrapper">
          <view class="label">消息:</view>
          <textarea class="textarea" v-model="message" placeholder="请输入您的消息"></textarea>
        </view>
      </view>
    </view>
    <view class="button-group">
      <button class="button" :style="{ backgroundColor: buttonColor }" @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      occupationOptions: ['学生', '其他'],
      selectedOccupation: '',
      message: '',
      buttonColor: '#007AFF', // 默认按钮背景色
      showOccupationPicker: false
    };
  },
  methods: {
    sendMessage() {
      // 在这里编写发送消息的逻辑
      console.log('姓名:', this.name);
      console.log('电子邮件:', this.email);
      console.log('职业:', this.selectedOccupation);
      console.log('消息:', this.message);
	  console.log('发送请求给后端')
	  uni.request({
	  // url: 'http://uuch2d.natappfree.cc/fixPic1',
	  url: 'http://192.168.3.184:8000/sendEmail',
	  // url: ' https://abd9-111-160-70-245.ngrok-free.app/fixpic1',
	  method: 'POST',
	  data: {
	    name: this.name,
		email: this.email,
		selectedOccupation: this.selectedOccupation,
		message: this.message
	  },
	  success: (res) => {
	    console.log('sendEmail:', res);
	    // Process the response data as needed
	  },
	  fail: (err) => {
	    console.log('sendEmail:', err);
	    
	  },})

      // 这里可以添加发送消息的代码，比如调用后端接口或者发送电子邮件等

      // 清空输入框
      this.name = '';
      this.email = '';
      this.selectedOccupation = '';
      this.message = '';

      uni.showToast({
        title: '消息发送成功',
        icon: 'success'
      });
    },
    selectOccupation(index) {
      this.selectedOccupation = this.occupationOptions[index];
      this.showOccupationPicker = false;
    },
    toggleOccupationPicker() {
      this.showOccupationPicker = !this.showOccupationPicker;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左对齐 */
  padding: 20rpx;
  min-height: 100vh; /* 设置最小高度为视口高度 */
  background-color: #F9F9F9; /* 背景色 */
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3; /* 背景图片透明度 */
}

.form-group {
  margin-bottom: 20rpx;
  width: 100%; /* 设置宽度为100% */
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #FFFFFF; /* 输入框背景色 */
  border-radius: 8rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
  width: 100%; /* 设置宽度为100% */
}

.icon {
  width: 64rpx;
  height: 64rpx;
  margin-left: 10rpx;
}

.input-wrapper {
  display: flex;
  align-items: center;
  padding-left: 10rpx;
  width: 100%; /* 设置宽度为100% */
}

.label {
  font-size: 28rpx;
  color: #333333;
  width: 80rpx; /* 设置固定宽度 */
}

.textarea {
  flex: 1;
  padding: 10rpx;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 28rpx;
  color: #333333;
}

.input {
  height: 60rpx;
}

.textarea {
  min-height: 120rpx;
  resize: vertical; /* 可以垂直调整高度 */
}

.custom-select {
  position: relative;
  cursor: pointer;
}

.custom-select .input {
  width: 100%;
  height: 60rpx;
  padding-right: 36rpx; /* 为下拉箭头留出位置 */
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 28rpx;
  color: #333333;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 10rpx;
  z-index: 999;
  width: 100%; /* 设置宽度为100% */
}

.options-container {
  max-height: 160rpx; /* 设置最大高度 */
  overflow-y: scroll; /* 添加垂直滚动条 */
}

.option {
  font-size: 28rpx;
  color: #333333;
  padding: 10rpx 0;
  cursor: pointer;
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%; /* 设置宽度为100% */
}

.button {
	flex: 1;
	height: 80rpx;
	background-color: #ff0000;
	border: none;
	border-radius: 40rpx;
	font-size: 32rpx;
  padding: 10rpx 20rpx;
  color: #FFFFFF;

  border-radius: 8rpx;
  transition: background-color 0.3s ease-in-out; /* 按钮背景色过渡效果 */
  background: linear-gradient(to bottom right, #007AFF, #00D5FF); /* 渐变背景色 */
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>