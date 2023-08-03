<template>
  <view class="container">
    <view class="header">
      <image class="icon" src="/static/me/rizhi.png"></image>
      <text class="title">日志信息</text>
    </view>
	<view>
		<button  class="edit-button  " @click="refresh">刷新</button>
		<button  class="delete-button  " @click="deletelog">删除</button>
	</view>
    <view class="content">
      <view v-if="logs.length === 0" class="empty">
        <text class="empty-text">暂无日志信息</text>
      </view>
      <view v-else>
        <view v-for="(log, index) in logs" :key="index" class="log-item">
			<text class="log-time">{{log[0]}}</text>
			<text class="log-message">耗时：{{ (log[1]/1000).toFixed(1) }}秒</text> 
          <!-- <text class="log-time">{{ log.time }}</text>
          <text class="log-message">{{ log.message }}</text> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      logs: [],
    };
  },
  created() {
    this.$bus.$on('logsend', value => {
      const newLog = {
        time: value.startTime,
        message: value.timeIn1
      };
      this.$set(this.logs, this.logs.length, newLog);
    });
	
  },
  methods:{
	  deletelog(){
		  uni.request({
		  	url:'http://192.168.3.184:8000/deletelog',
			method:'GET'
		  }),
		  uni.showToast({
		  	title: "删除成功",
		  	//将值设置为 success 或者直接不用写icon这个参数
		  	icon: 'none',
		  	//显示持续时间为 2秒
		  	duration: 2000
		  })
	  },

	  refresh(){
		  uni.request({
		  	url:'http://192.168.3.184:8000/getlog',
			method:'POST',
			data:{
				'method':'getlog'
			},
			success: (res) => {
				
				this.logs=res.data.result
				console.log(this.logs)
			}
		  })
		  
	  }
  }
};
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

.log-item {
/*  margin-bottom: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; */
	  display: flex;
	  justify-content: space-between;
}
/*  */
.log-time {
  color: #999;
  text-align: left;
}

.log-message {
  margin-top: 8px;
  /* left: 20rpx; */
  text-align: right;
}

.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.empty-text {
  color: #999;
}

.edit-button {
  /* padding: 10px 20px; */
  background-color: #55ffff;
  color: #000000;
  border-radius: 4px;
}
.delete-button {
  /* padding: 10px 20px; */
  background-color: #ff0000;
  color: #ffffff;
  border-radius: 4px;
}
</style>
