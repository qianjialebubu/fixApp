<template>
  <view class="repair-info-container">
    
    <scroll-view class="list-container" scroll-y>
      <view class="list-item" v-for="(item, index) in repairList" :key="index">
        <view class="item-content">
          <view class="item-title">{{ item.title }}</view>
          <view class="item-description">{{ item.description }}</view>
        </view>
        <button class="item-button" @click="openExternalLink(item.link)">查看详情</button>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      repairList: [
        {
          title: '数据集介绍',
          description: '这里是数据集介绍的详细描述。',
          link: 'https://example.com/dataset'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },,
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        },
        {
          title: '经典算法介绍',
          description: '这里是经典算法介绍的详细描述。',
          link: 'https://example.com/classical-algorithms'
        }
        // 添加更多的列表项
      ]
    };
  },
  methods: {
    openExternalLink(link) {
      // 在新窗口中打开外部链接
      uni.navigateTo({
        url: `/pages/external-link?link=${encodeURIComponent(link)}`
      });
    }
  }
};
</script>

<style scoped>
.repair-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.list-container {
  width: 90%;
  max-height: 90vh;
}

.list-item {
	
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.item-content {
  flex: 1;
}

.item-title {
  
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.item-description {
  font-size: 28rpx;
  color: #666;
}

.item-button {
  width: 200rpx;
  height: 60rpx;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}
</style>
