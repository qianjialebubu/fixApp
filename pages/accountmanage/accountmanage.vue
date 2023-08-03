<template>
  <view class="container">
    <view class="header">
      <image class="icon" src="/static/me/zhanghaoguanli.png"></image>
      <text class="title">账号管理</text>
    </view>
    <view class="content">
      <view class="item">
        <text class="label">用户名：</text>
        <text v-if="!editing" class="value">{{ username }}</text>
        <input v-else class="input" v-model="username" placeholder="请输入用户名"></input>
      </view>
      <view class="item">
        <text class="label">手机号：</text>
        <text v-if="!editing" class="value">{{ phone }}</text>
        <input v-else class="input" v-model="phone" placeholder="请输入手机号"></input>
      </view>
      <view class="item">
        <text class="label">邮箱：</text>
        <text v-if="!editing" class="value">{{ email }}</text>
        <input v-else class="input" v-model="email" placeholder="请输入邮箱"></input>
      </view>
      <view class="item">
        <text class="label">密码：</text>
        <text class="value">******</text>
      </view>
      <button v-if="!editing" class="edit-button" @tap="toggleEditing">编辑账号</button>
      <button v-else class="edit-button" @tap="saveAccount">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: 'qjl',
      phone: '158********',
      email: 'qjl@qq.com',
      editing: false
    };
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;
    },
    saveAccount() {
      // 保存账号操作
      // 可以在这里将修改后的个人信息提交到服务器等处理逻辑
      this.toggleEditing();
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
  width: 100px;
  color: #999;
}

.value {
  flex: 1;
  text-align: right;
}

.input {
  flex: 1;
  height: 30px;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 4px;
}

.edit-button {
  /* padding: 10px 20px; */
  background-color: #FF4949;
  color: #fff;
  border-radius: 4px;
}
</style>
