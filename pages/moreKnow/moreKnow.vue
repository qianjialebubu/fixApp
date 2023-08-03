<template>
  <view class="info-container">
    <!-- 左边的滚动列表 -->
    <scroll-view class="outer-scroll" scroll-y>
      <view class="list-container">
        <view class="group-container" v-for="(group, groupIndex) in infoList" :key="groupIndex">
          <view class="group-title">{{ group.title }}</view> 
          <scroll-view class="inner-scroll" scroll-y>
            <view class="list-item" v-for="(item, itemIndex) in group.items" :key="itemIndex">
              <view class="item-header" @click="toggleExpand(groupIndex, itemIndex)">
                <text class="item-title">{{ item.title }}</text>
                <text class="item-arrow">{{ item.expanded ? '▲' : '▼' }}</text>
				
              </view>
              <view class="item-content" v-show="item.expanded">
                <text>{{ item.content }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        {
          title: '图像修复常用数据集',
          items: [
            {
              title: 'CelebA',
              content:
                'CelebA 数据集是一个大规模的人脸图像数据集，包含超过 200,000 张名人人脸图像。这个数据集广泛用于人脸相关的计算机视觉任务，包括图像修复。CelebA 数据集提供了带有各种属性标签的图像，这使得可以进行更细粒度的图像修复任务，如去除眼镜、修复遮挡等。',
              expanded: false
            },
            {
              title: 'Places2',
              content:
                'Places2 数据集是一个用于场景理解的大规模图像数据库，包含超过 10 万张高分辨率的图像。这个数据集包含了各种不同的场景图像，如室内、室外、城市、自然景观等。Places2 数据集可以用于图像修复任务，特别是室内和室外环境中的场景修复。',
              expanded: false
            },
            {
              title: 'ImageNet',
              content:
                'ImageNet 是一个广泛使用的大规模图像数据库，包含超过 1400 万张标注图像。尽管 ImageNet 通常用于图像分类和目标识别任务，但也可以在图像修复中使用。通过从 ImageNet 中选择相关的图像子集，可以构建用于图像修复任务的数据集。',
              expanded: false
            },
            {
              title: 'psv',
              content:
                '巴黎街景数据集（Paris StreetView Dataset）是一个用于计算机视觉和机器学习研究的大规模图像数据集，由巴黎市政府和 INRIA（法国国家计算机科学与自动化研究所）共同创建和发布。该数据集提供了大量的街景图像，可用于诸如图像分类、目标检测、场景理解等任务的训练和评估。',
              expanded: false
            },
            {
              title: '数据集的使用',
              content:
                '这里是关于数据集的使用方法的详细内容。你可以在这里描述数据集的处理流程、数据预处理方法等信息。',
              expanded: false
            }
            // 添加更多的数据集相关信息项...
          ]
        },
        {
          title: '经典算法',
          items: [
            {
              title: '均值滤波（Mean Filter)',
              content:
                '使用图像中像素周围邻域的平均值来修复受损像素。均值滤波可以平滑图像并填补丢失的像素。',
              expanded: false
            },
            {
              title: '中值滤波（Median Filter)',
              content:
                '使用图像中像素周围邻域的中值来修复受损像素。中值滤波可以有效地去除椒盐噪声并恢复受损的像素。',
              expanded: false
            },
            {
              title: '双边滤波（Bilateral Filter）',
              content:
                '考虑像素之间的空间距离和像素值之间的相似性来修复图像。双边滤波可以保留边缘信息的同时平滑图像。',
              expanded: false
            },
            {
              title: '图像插值（Image Interpolation）',
              content:
                '通过在已知像素之间进行插值来修复丢失或受损的像素。常用的插值方法包括最近邻插值、双线性插值和双立方插值。',
              expanded: false
            },
            {
              title: '基于偏微分方程（PDE）的方法',
              content:
                '通过求解偏微分方程来修复图像。常用的PDE方法包括全变分（Total Variation）去噪和扩散过程（Diffusion Process）。',
              expanded: false
            },
            {
              title: '基于学习的方法',
              content:
                '利用机器学习和深度学习技术来学习图像修复模型。这些方法可以通过大量训练数据学习图像的结构和纹理，并进行准确的图像修复。。',
              expanded: false
            }
            // 添加更多的算法相关信息项...
          ]
        },

		{
			title: '深度学习算法实例',
			items: [
			  {
			    title: '图像去噪（Image Denoising）',
			    content:
			      '使用自编码器（Autoencoder）或变分自编码器（Variational Autoencoder）等模型进行图像去噪，去除图像中的噪声和干扰。',
			    expanded: false
			  },
			  {
			    title: '图像超分辨率重建（Image Super-Resolution）',
			    content:
			      '通过深度卷积神经网络（CNN）等模型，将低分辨率图像恢复为高分辨率图像，提高图像的清晰度和细节。',
			    expanded: false
			  },
			  {
			    title: '图像修复和填充（Image Inpainting）',
			    content:
			      '使用生成对抗网络（GAN）等模型，通过学习图像的上下文信息，将损坏或缺失的部分进行修复和填充，使图像看起来完整和自然。',
			    expanded: false
			  },
			  {
			    title: '图像去雾（Image Dehazing）',
			    content:
			      '通过深度学习算法，去除图像中的雾霾效果，使图像更清晰和真实。',
			    expanded: false
			  },
			  {
			    title: '图像去模糊（Image Deblurring）',
			    content:
			      '使用卷积神经网络等模型，对模糊图像进行修复，恢复图像的清晰度和细节。',
			    expanded: false
			  },
			  {
			    title: '色彩恢复（Color Restoration）',
			    content:
			      '通过深度学习算法，对黑白或受损的图像进行色彩恢复，使图像呈现出真实的颜色。',
			    expanded: false
			  }
			  // 添加更多的算法相关信息项...
			]
		}
        // 添加更多的信息组...
      ]
    };
  },
  methods: {
    toggleExpand(groupIndex, itemIndex) {
      this.infoList[groupIndex].items[itemIndex].expanded = !this.infoList[groupIndex].items[itemIndex].expanded;
    }
  }
};
</script>

<style scoped>
.info-container {
  display: flex;
  background-color: #e0ffff;
}

.outer-scroll {
  flex: 1;
  padding-right: 20rpx;
  overflow: hidden;
  background-color: #e0ffff;
}

.list-container {
  padding-right: 20rpx;
}

.group-container {
  margin-bottom: 20rpx;
}

.group-title {
  font-size: 48rpx;
  margin-top: 20rpx;
  font-weight: bold;
  text-align: center;
  color: #161919;
}

.inner-scroll {
  max-height: 400rpx; /* 设置内层滚动容器的最大高度 */
  background-color: #e0ffff;
}

.list-item {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #f5ffdb;
}

.item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
}

.item-title {
  font-weight: bold;
  color: #252b2b;
}

.item-arrow {
  font-size: 32rpx;
}

.item-content {
  margin-top: 20rpx;
}

.button {
  width: 240rpx;
  height: 80rpx;
  margin-left: 20rpx;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

</style>
