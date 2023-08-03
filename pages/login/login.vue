<!-- <template>
  <view class="container">
    <view class="logo">Logo</view>
    <view class="form">
      <input v-model="account" type="text" placeholder="账号" />
      <input v-model="password" type="password" placeholder="密码" />
      <button @click="login">登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.account === 'ctsj' && this.password === '4lf') {
        // 登录成功，跳转到首页
        uni.switchTab({
          url: '/pages/index/index',
        });
      } else {
        uni.showToast({
          title: '账号或密码错误',
          icon: 'none',
        });
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  font-size: 24px;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 120px;
  height: 30px;
  font-size: 14px; /* 调整字号 */
  background-color: #0088cc;
  color: #fff;
  border: none;
  border-radius: 5px;
}
</style>

 -->
<template>
  <view class="login-container">
    <!-- <image class="background-image" src="/static/background1.jpg"></image> -->
    <view class="login-form">
      <image class="logo" src="/static/loginway.png" mode="aspectFit"></image>
	  
      <input
        class="input-field"
        type="text"
        placeholder="请输入账号"
        v-model="username"
      ></input>
      <input
        class="input-field"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      ></input>
      <button class="login-button" @click="login">登录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
	  uni.request({
	  	url:'http://192.168.3.184:8000/login',
		method: 'POST',
		data:{
			username: this.username,
			password: this.password
		},
		success: (res) => {
			console.log("登录成功")
			console.log(res)
			if(res.data.code == 200){
				uni.showToast({
					title: '登录成功',
					icon: 'success'
				  });
				  uni.switchTab({
				    url: '/pages/index/index',
				  });
			}else{
				uni.showToast({
				title: '登录失败，请检查用户名和密码',
				icon: 'none'
			  });
			}
		}
	  })	
		
		
		
      // 处理登录逻辑
  //     if (this.username === 'admin' && this.password === 'admin') {
  //       uni.showToast({
  //         title: '登录成功',
  //         icon: 'success'
  //       });
		// uni.switchTab({
		//   url: '/pages/index/index',
		// });
  //     } else {
  //       uni.showToast({
  //         title: '登录失败',
  //         icon: 'none'
  //       });
  //     }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 80rpx;
  border-radius: 20rpx;
  box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.logo {
  width: 240rpx;
  height: 240rpx;
  margin-bottom: 40rpx;
}

.input-field {
  width: 480rpx;
  height: 80rpx;
  padding: 16rpx;
  margin-bottom: 40rpx;
  border: 2rpx solid #ccc;
  border-radius: 8rpx;
}

.login-button {
  width: 480rpx;
  height: 80rpx;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 32rpx;
}
</style>

