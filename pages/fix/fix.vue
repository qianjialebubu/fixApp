<template>
  <view class="container">
    <view class="header">
      <view class="title">图像修复</view>
    </view>

	<view class="dropdown">
	  <view class="dropdown-header" @click="toggleDropdown">
	    <text class="dropdown-label">选择模型：</text>
	    <text class="dropdown-value">{{ moduleOptions[module - 1] }}</text>
	    <text class="dropdown-icon">{{ showDropdown ? '▲' : '▼' }}</text>
	  </view>
	  <view class="dropdown-list" v-show="showDropdown">
	    <view class="dropdown-item" v-for="(option, index) in moduleOptions" :key="index" @click="selectModule(index + 1)">
	      {{ option }} 
	    </view>
	  </view>
	</view>
		
    <view class="content">
		<view class="canvas-container">
			<view class="image-container">
				<image class="image-preview"   :src="imageUrl" mode="aspectFit" v-if="!OSSimagerootafter"/>
				<canvas class="canvas" canvas-id="myCanvas1" ref="canvas" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></canvas>
				<br>
				<!-- <text v-if="OSSimagerootafter" class="centered-text">修复之后</text> -->
				<image class="image-preview" :src="OSSimagerootafter" mode="aspectFit" v-if="OSSimagerootafter" />
			</view>
			
		</view>
	  <!-- <text v-if="imageUrl" class="centered-text">修复之前</text> -->
      
	 <!-- <image src="https://blog-bu.oss-cn-beijing.aliyuncs.com/blog_static_resource/portrait_dailylift20230308164616.jpg" mode="aspectFit"></image> -->
      <slider class="slider" block-size="24" :min="1" :max="25" :step="1" @change="handleSliderChange" ></slider>
	  <view class="buttons-icon">
			<image src="../../static/buttonicon/album.png" class="icon-button" @click="uploadImage">
			<image src="../../static/pen1.png" @click="toggleDrawingMode" class="icon-button" v-if="!drawingMode"></image>
			<image src="../../static/pen2.png" @click="toggleDrawingMode" class="icon-button" v-if="drawingMode"></image>
			<image src="../../static/buttonicon/fixbutton.png" class="icon-button" @click="fix">	
			<image src="../../static/buttonicon/down.png" class="icon-button" @click="download">
			<image src="../../static/buttonicon/clear.png" class="icon-button" @click="clear">
			<image src="../../static/buttonicon/share.png" class="icon-button" @click="share">
			<!-- <button @click="toggleDrawingMode">{{ drawingMode ? '取消涂抹' : '开始涂抹' }}</button> -->

	 </view>
	  <view class="buttons">
        <!-- <button class="button-up" @click="uploadImage">相册</button>
		<button class="button-fix" @click="fix">补图</button>
		<button class="button-down" @click="download">保存</button>
		<button class="button-clear" @click="clear">清空</button> -->
		<text>相册</text>
		<text v-if="!drawingMode">绘图</text>
		<text v-if="drawingMode">取消</text>
		<text>补图</text>
		<text>保存</text>
		<text>清空</text>
		<text>分享</text>
      </view>
	  
    </view>
  </view>
</template>

<script>
	import CryptoJS from 'crypto-js';
	import Vue from 'vue';
export default {
  data() {
    return {
	  drawingMode: false,
	  isDrawing: false,
	  lastX: 0,
	  lastY: 0,
	  canvasWidth: 0,
	  canvasHeight: 0,
	  lineWidth: 5,
      imageUrl: '', // 上传到微信服务器的缓存图片地址
	  OSSimagerootbrfore: '', // 修复之前的图像上传到阿里云服务器的地址
	  OSSimagerootafter: '', // 修复之后的图像上传到阿里云服务器的地址
	  fixerr: '',
	  module: 1,
	  fixbeforetimemil:'',
	  fixbeforetime: '',
	  fixaftertimemil: '',
	  timeInterval: '',
	  showDropdown: false,
	  maskToOss: '',
	  moduleOptions: ['celeba', 'place2', 'psv'],
      ossConfig: {
        accessKeyId: '填写自己的accessKeyId',
        accessKeySecret: '填写自己的accessKeySecret',
        endpoint: '填写自己的endpoint',
        bucket: '填写自己的bucket',
      },
    };
  },
  methods: {
	  // 绑定事件
	  handleSliderChange($event){
		  this.lineWidth = $event.mp.detail.value;
		  console.log(this.lineWidth)
	  },
	  //开始触摸
	  handleTouchStart(e) {
	    if (this.drawingMode) {
	      this.isDrawing = true;
	      this.lastX = e.touches[0].x;
	      this.lastY = e.touches[0].y;

	    }
	  },
	  //触摸移动
	  handleTouchMove(e) {
	    if (this.drawingMode && this.isDrawing) {
	      const currentX = e.touches[0].x;
	      const currentY = e.touches[0].y;
	  
	      const context = uni.createCanvasContext('myCanvas1', this);
	      context.setStrokeStyle('#ffffff');
	      context.setLineWidth(this.lineWidth);
	      context.setLineCap('round');
	      context.beginPath();
	      context.moveTo(this.lastX, this.lastY);
	      context.lineTo(currentX, currentY);
	      context.stroke();
	      context.closePath();
	      context.draw(true);
	  
	      this.lastX = currentX;
	      this.lastY = currentY;
	    }
	  },
	  //触摸结束
	  handleTouchEnd() {
	    if (this.drawingMode) {
	      this.isDrawing = false;
	    }
	  },
	  upmasktooss(){
		  if (!this.drawingMode) {
			console.log("上传掩膜")
		    const canvas = this.$refs.canvas;
		    const scaleFactor = 256 / this.canvasWidth; // 缩放因子
		    const saveWidth = 256;
		    const saveHeight = this.canvasHeight * scaleFactor;
		    uni.canvasToTempFilePath({
		      canvasId: 'myCanvas1',
		      destWidth: saveWidth,
		      destHeight: saveHeight,
		      success: res => {
		  			  const tempFilePath = res.tempFilePath;
		  			  filePath: res.tempFilePath,
		  			  console.log(tempFilePath)
		  			  this.uploadToOSSMask(tempFilePath)
		      },
		      fail: err => {
		        console.log(err);
		      }
		    }, canvas);
		  }
	  },
	  //上传到阿里云oss中
	  uploadToOSSMask(filePath) {
	    const aliyunFileKey = `${this.ossConfig.bucket}/${Date.now()}.png`;
	    uni.uploadFile({
	      url: `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}`,
	      filePath: filePath,
	      name: 'file',
	      formData: {
	        key: aliyunFileKey,
	        policy: this.generatePolicy(),
	        OSSAccessKeyId: this.ossConfig.accessKeyId,
	        success_action_status: '200',
	        signature: this.generateSignature(aliyunFileKey),
	      },
	      success: (res) => {
	        console.log('掩膜上传成功:', res);
	  	  // 这里有时候会为空
	  	    console.log(res.statusCode)
	  		const uploadedImageUrl = `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}/${aliyunFileKey}`;
	  		this.maskToOss =uploadedImageUrl
	  		console.log(this.maskToOss)
	  		if(res.statusCode==200){
	  			// this.generateOSSimagerootafter() 
	  			// uni.showToast({
	  			// 	title: "上传成功",
	  			// 	//将值设置为 success 或者直接不用写icon这个参数
	  			// 	icon: 'success',
	  			// 	//显示持续时间为 2秒
	  			// 	duration: 2000
	  			// })
	  			return;
	  		}else{
	  			console.log("上传路径")
	  			console.log(filePath)
	  			this.uploadToOSSMask(filePath)
	  			
	  			// uni.showToast({
	  			// 	title: "上传失败,请稍后重试",
	  			// 	//将值设置为 success 或者直接不用写icon这个参数
	  			// 	icon: 'none',
	  			// 	//显示持续时间为 2秒
	  			// 	duration: 2000
	  			// })
	  		}
	  		
	      },
	      fail: (err) => {
	        console.log('Upload failed:', err);
	      },
	    });
	  },
	  toggleDrawingMode(){
		  this.drawingMode = !this.drawingMode;
		  console.log(this.drawingMode)
		  if( !this.drawingMode){
			  this.upmasktooss();
		  }
		  
	  },
	  
	  toggleDropdown() {
	    this.showDropdown = !this.showDropdown;
	  },
	  selectModule(index) {
	    this.module = index;
	    this.showDropdown = false;
	  },
	  clearcan(){
		  // 清空画布
		  const context = uni.createCanvasContext('myCanvas1', this);
		  console.log(context)
		  console.log(this.canvasWidth)
		  context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		  context.draw(true, () => {
		  	 
		  });
	  },
	// 清空显示区域的图像
	clear(){
		this.clearcan()
		
		
		console.log("清理")
		this.imageUrl = '';
		this.OSSimagerootbrfore = '';
		this.OSSimagerootafter = '';
		this.maskToOss = '';
		

	},
	// 分享图片
	share(){
		console.log("分享") 
		wx.showShareImageMenu({  //分享给朋友
		 path: this.imageUrl,
		 success: (res) => {
			 console.log("分享成功：", res);
		 },
		 fail: (err) => {
			 console.log("分享取消：", err);
		 },
	 })
		
	},
	download(){
		const imageUrl = this.OSSimagerootafter; // 替换为你的OSS图片地址
		  uni.downloadFile({
			url: imageUrl,
			success: async (response) => {
			  const tempFilePath = response.tempFilePath; // 下载后的临时文件路径
			  try {
				await uni.saveImageToPhotosAlbum({ filePath: tempFilePath }); // 保存图片到相册

				uni.showToast({
				  title: '图片下载成功',
				  icon: 'success'
				});
			  } catch (error) {
				uni.showToast({
				  title: '图片下载失败',
				  icon: 'none'
				});
			  }
			},
			fail: (error) => {
			  uni.showToast({
				title: '图片下载失败',
				icon: 'none'
			  });
			}
		  });
		
		
	},
	fix(){
		uni.showToast({
			title: "开始修复",
			//将值设置为 success 或者直接不用写icon这个参数
			icon: "loading",
			//显示持续时间为 2秒
			
			duration: 6000
		}),
		
		// const uploadedImageUrl = `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}/${aliyunFileKey}`;
		uni.request({
		url: 'http://192.168.3.184:8000/fixPic1',
		
		// url: ' https://abd9-111-160-70-245.ngrok-free.app/fixpic1',
		method: 'POST',
		data: {
		  imageUrl: this.OSSimagerootbrfore,
		  module: this.module,
		  maskoss: this.maskToOss
		},
		success: (res) => {
		  console.log('修复成功', res.data.url_pic);
		  this.OSSimagerootafter = res.data.url_pic
		  this.showMessage()
		  this.generateOSSimagerootafter1()
		  this.clearcan()
		  // Process the response data as needed
		},
		fail: (err) => {
		  console.log('Fix failed:', err);
		  
		},
		
	  })
	  
	},
	 
	showMessage(){
		if(!this.OSSimagerootafter){
			uni.showToast({
				title: "请稍后重试",
				//将值设置为 success 或者直接不用写icon这个参数
				icon: "error",
				//显示持续时间为 2秒
				duration: 2000
			})
		}
		
	},
    uploadImage() {
	  console.log("上传图片")
	  uni.showToast({
	  	title: "上传中",
	  	//将值设置为 success 或者直接不用写icon这个参数
	  	icon: "loading",
	  	//显示持续时间为 2秒
	  	duration: 2000
	  })
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          this.imageUrl = tempFilePaths[0];
		  console.log(this.imageUrl)
          this.uploadToOSS(this.imageUrl);
		  
        },
      });
    },
	generateOSSimagerootafter() {
	  console.log("调用钩子函数，发送修复前的图片")
	  const currentDate = new Date();
	  const year = currentDate.getFullYear();
	  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	  const day = String(currentDate.getDate()).padStart(2, '0');
	  const hours = String(currentDate.getHours()).padStart(2, '0');
	  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
	  const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	  console.log(currentTime)
	  this.fixbeforetime = currentTime
	  this.fixbeforetimemil = currentDate
	  
	  const OSSimagerootbrfore = this.OSSimagerootbrfore;

	  // 发布事件，将 OSSimagerootafter 值传递给 message 页面
	  this.$bus.$emit('OSSimagerootbefore', OSSimagerootbrfore);
	  
	  console.log(OSSimagerootbrfore)
	},
	generateOSSimagerootafter1() {
	  
	  const OSSimagerootafter = this.OSSimagerootafter;
	  // 发布事件，将 OSSimagerootafter 值传递给 message 页面
	  this.$bus.$emit('OSSimagerootafter', OSSimagerootafter);
	  const currentDate = new Date();
	  this.fixaftertimemil = currentDate
	  this.timeInterval = this.fixaftertimemil-this.fixbeforetimemil
	  this.$bus.$emit('logsend', {startTime:this.fixbeforetime,timeIn1: this.timeInterval});
	  uni.request({
	  	url:'http://192.168.3.184:8000/insertlog',
		method:'POST',
		data:{
			creattime:this.fixbeforetime,
			content:this.timeInterval
		}
	  })
	  console.log("调用钩子函数，发送修复后的图片")
	},
	// 上传到阿里云OSS中
    uploadToOSS(filePath) {
	  console.log("调用上传接口")
	  console.log(filePath)
      const aliyunFileKey = `${this.ossConfig.bucket}/${Date.now()}.png`;
      uni.uploadFile({
        url: `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}`,
        filePath: filePath,
        name: 'file',
        formData: {
          key: aliyunFileKey,
          policy: this.generatePolicy(),
          OSSAccessKeyId: this.ossConfig.accessKeyId,
          success_action_status: '200',
          signature: this.generateSignature(aliyunFileKey),
        },
        success: (res) => {
          console.log('上传成功:', res);
		  // 这里有时候会为空
		    console.log(res.statusCode)
			const uploadedImageUrl = `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}/${aliyunFileKey}`;
			this.OSSimagerootbrfore = uploadedImageUrl;
			console.log(this.OSSimagerootbrfore)
			if(res.statusCode==200){
				this.generateOSSimagerootafter() 
				uni.showToast({
					title: "上传成功",
					//将值设置为 success 或者直接不用写icon这个参数
					icon: 'success',
					//显示持续时间为 2秒
					duration: 2000
				})
				return;
			}else{
				console.log("上传路径")
				console.log(filePath)
				this.uploadToOSS(filePath)
				
				// uni.showToast({
				// 	title: "上传失败,请稍后重试",
				// 	//将值设置为 success 或者直接不用写icon这个参数
				// 	icon: 'none',
				// 	//显示持续时间为 2秒
				// 	duration: 2000
				// })
			}
			
        },
        fail: (err) => {
          console.log('Upload failed:', err);
        },
      });
    },
    generatePolicy() {
      const policy = {
        expiration: new Date(Date.now() + 3600 * 1000).toISOString(), // Set the expiration time to one hour from now
        conditions: [
          ['content-length-range', 0, 1024 * 1024], // Limit the file size to 1MB
        ],
      };
      return Buffer.from(JSON.stringify(policy)).toString('base64');
    },
    generateSignature(aliyunFileKey) {
      const policyBase64 = this.generatePolicy();
      const signature = CryptoJS.HmacSHA1(policyBase64, this.ossConfig.accessKeySecret);
      return signature.toString(CryptoJS.enc.Base64);
    },
  },
  mounted() {
    const query = uni.createSelectorQuery();
    query.select('.canvas')
      .boundingClientRect()
      .exec(rect => {
        this.canvasWidth = rect[0].width;
        this.canvasHeight = rect[0].height;
      });
  }
};
</script>

<style>
.slider {
	width: 600rpx;
  }
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 40rpx;
  background-color: #e0ffff;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 60rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
}

.content {
  width: 100%;
}

.image-preview {
  width: 100%;
    height: 100%;
  margin-bottom: 40rpx;
  margin-left: 32rpx;
  
  border: 4rpx solid #ff0000;
  /* 设置边框样式 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  text-align: center;
}
.buttons {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 40rpx; */
  margin-left: 56rpx;
  margin-right: 50rpx;
  
}
.buttons-icon {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 40rpx; */
  margin-left: 40rpx;
  margin-right: 30rpx;
  
}


.button {
  flex: 1;
  height: 80rpx;
  background-color: #0088cc;
  color: #fff;
  border: none;
  border-radius: 40rpx;
  font-size: 32rpx;
}
.button-up {
	flex: 1;
	height: 80rpx;
	background-color: #ff0000;
	color: #fff;
	border: none;
	border-radius: 40rpx;
	font-size: 32rpx;
  transition: background-color 0.3s ease-in-out; /* 按钮背景色过渡效果 */
  background: linear-gradient(to bottom right, #007AFF, #00D5FF); /* 渐变背景色 */
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.button-fix {
	flex: 1;
	height: 80rpx;
	background-color: #ff0000;
	color: #fff;
	border: none;
	border-radius: 40rpx;
	font-size: 32rpx;
  transition: background-color 0.3s ease-in-out; /* 按钮背景色过渡效果 */
  background: linear-gradient(to bottom right, #00D5FF, #007AFF); /* 渐变背景色 */
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.button-down {
	flex: 1;
	height: 80rpx;
	background-color: #ff0000;
	color: #fff;
	border: none;
	border-radius: 40rpx;
	font-size: 32rpx;
  transition: background-color 0.3s ease-in-out; /* 按钮背景色过渡效果 */
  background: linear-gradient(to bottom right, #007AFF, #00D5FF); /* 渐变背景色 */
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
  
}
.button-clear{
	flex: 1;
	height: 80rpx;
	background-color: #ff0000;
	color: #fff;
	border: none;
	border-radius: 40rpx;
	font-size: 32rpx;
	transition: background-color 0.3s ease-in-out; /* 按钮背景色过渡效果 */
	background: linear-gradient(to bottom right, #00D5FF, #007AFF); /* 渐变背景色 */
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.dropdown {
  position: relative;
  margin-bottom: 20rpx;

}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #badcd9;
  cursor: pointer;
  width: 400rpx; /* 设置固定宽度 */

}

.dropdown-label {
  font-weight: bold;
  
}

.dropdown-value {
  margin-right: 20rpx;
}

.dropdown-icon {
  font-size: 24rpx;
}

.dropdown-list {
  position: absolute;
   top: 100%;
   left: 0;
   width: 100%;
   max-height: 400rpx;
   overflow-y: auto;
   background-color: #fff;
   border: 2rpx solid #ccc;
   border-top: none;
   z-index: 9999; /* 设置层级为较高的值 */
}

.dropdown-item {
  padding: 20rpx;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-button{
  width: 100rpx;
  height: 100rpx;
}
.canvas {
  position: absolute;
  /* top: 274rpx; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #007AFF; */
  
  
  /* margin-bottom: 40rpx; */
  margin-left: 32rpx;
  
  /* border: 4rpx solid #ff0000; */
  /* 设置边框样式 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  text-align: center;
	
}
.canvas-container{
	  position: relative;
	  width: 600rpx;
	  height: 600rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
}
.image-container {
  position: relative;
  width: 600rpx;
  height: 600rpx;
}
</style>