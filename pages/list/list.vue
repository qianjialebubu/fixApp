<template>
  <view class="container">
    <view class="header">
      <view class="title">图像修复</view>
    </view>
    <view class="content">
      <image class="image-preview" :src="imageUrl" mode="aspectFit" v-if="imageUrl" />
      <view class="buttons">
        <button class="button" @click="uploadImage">上传</button>
        <button class="button" @click="repairImage">修复</button>
        <button class="button" @click="downloadImage" :disabled="!repairedImageUrl">下载</button>
      </view>
      <view class="result" v-if="repairedImageUrl">
        <view class="result-title">修复后的图片：</view>
        <image class="repaired-image" :src="repairedImageUrl" mode="aspectFit" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '', // 上传的图片地址
      repairedImageUrl: '', // 修复后的图片地址
      ossConfig: {
        accessKeyId: '填写自己的accessKeyId',
        accessKeySecret: '填写自己的accessKeySecret',
        endpoint: '填写自己的endpoint',
        bucket: '填写自己的bucket',
      },
    };
  },
  methods: {
    uploadImage() {
		console.log("从本地上传到显示页面中")
		       let this_ = this
				const MpUploadOssHelper = require("@/utils/uploadOssHelper.js");
				const mpHelper = new MpUploadOssHelper({
				// 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户并授权。
          accessKeyId: '填写自己的accessKeyId',
          accessKeySecret: '填写自己的accessKeySecret',
					// 限制参数的生效时间，单位为小时，默认值为1。
					timeout: 1,
					// 限制上传文件大小，单位为MB，默认值为10。
					maxSize: 100,
		      });
						  // 生成参数。
			  const formData = mpHelper.createUploadParams();
			  uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					let imageLength = tempFilePaths.length
					tempFilePaths.forEach(async (item, index) => { //js遍历数组
						uni.showLoading({
							title: "上传中",
							mask: true,
							
						})
						await this.getFileInfo({filePath:item})
							.then(async (info)=>{
								let fileType
								let fileNameArr=[]
								fileNameArr.push(info.digest)
								let fileTypeArr=item.split(".")
								fileType=fileTypeArr[fileTypeArr.length-1]
								fileNameArr.push(fileType)
								console.log("上传图片",fileNameArr.join("."))
								//let ObjectStorageParams=
								let bucket="blog-bu" //阿里云上传的地址
								let url="https://"+bucket+".oss-cn-beijing.aliyuncs.com"
								let path="collection"+"/"
								let fileName=fileNameArr.join(".")
								formData.key=path+fileName
								uni.uploadFile({
									url: url, //仅为示例，非真实的接口地址
									filePath: item,
									name: 'file',
									formData: formData,
									success: (res) => {
										console.log(res);
										console.log(url+"/"+path+fileName);//这个就是所需要显示的图片路径了
									},
									fail: (err) => {
										uni.showToast({
											icon:'error',
											title: "上传失败",
											mask: true,
											duration:2000
										})
									}
								});
							})
							.catch((err)=>{
								
							})
					});
				}
			  });

  //     uni.chooseImage({
  //       count: 1,
		// sizeType: ['compressed'],
		// sourceType: ['album', 'camera'],
  //       success: (res) => {
  //         const tempFilePaths = res.tempFilePaths;
  //         this.imageUrl = tempFilePaths[0];
		//   console.log(res,this.imageUrl)
		//   console.log(res,this.imageUrl)
  //         this.uploadToOSS(tempFilePaths[0]);
  //       },
  //     });
    },
    // uploadToOSS(filePath) {
    //   const fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
    //   const aliyunFileKey = `${this.ossConfig.bucket}/${fileName}`;
    //   const date = new Date().toUTCString();

    //   const signature = this.calculateSignature('PUT', '', '', date, `/${aliyunFileKey}`);
    //   const authorization = `OSS ${this.ossConfig.accessKeyId}:${signature}`;

    //   uni.uploadFile({
    //     url: `https://${this.ossConfig.bucket}.${this.ossConfig.endpoint}/${aliyunFileKey}`,
    //     method: 'PUT',
    //     header: {
    //       'Content-Type': 'application/octet-stream',
    //       'x-oss-date': date,
    //       Authorization: authorization,
    //     },
    //     filePath: filePath,
    //     success: (res) => {
    //       console.log('Upload success:', res);
    //     },
    //     fail: (err) => {
    //       console.log('Upload failed:', err);
    //     },
    //   });
    // },
    
	calculateSignature(method, contentMd5, contentType, date, canonicalizedOSSHeaders, canonicalizedResource) {
      const stringToSign =
        `${method}\n${contentMd5}\n${contentType}\n${date}\n${canonicalizedOSSHeaders}${canonicalizedResource}`;
      const signature = uni.request({
        url: 'http://192.168.3.184:8000/generateSignature',
        method: 'POST',
        data: {
          stringToSign: stringToSign,
          accessKeySecret: this.ossConfig.accessKeySecret,
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: (res) => {
          console.log('Signature success:', res);
          const data = res.data;
          if (data && data.signature) {
            return data.signature;
          }
        },
        fail: (err) => {
          console.log('Signature failed:', err);
        },
      });

      return signature;
    },
    repairImage() {
      uni.request({
        url: 'http://192.168.3.184:8000/fixPic',
        method: 'POST',
        data: {
          url: this.imageUrl,
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: (res) => {
          console.log('Repair success:', res);
          const data = res.data;
          if (data && data.url_pic) {
            this.repairedImageUrl = data.url_pic;
          }
        },
        fail: (err) => {
          console.log('Repair failed:', err);
        },
      });
    },
    downloadImage() {
      const downloadUrl = this.repairedImageUrl;
      uni.downloadFile({
        url: downloadUrl,
        success: (res) => {
          const filePath = res.tempFilePath;
          uni.saveImageToPhotosAlbum({
            filePath: filePath,
            success: () => {
              uni.showToast({
                title: '保存成功',
                icon: 'success',
              });
            },
            fail: () => {
              uni.showToast({
                title: '保存失败',
                icon: 'none',
              });
            },
          });
        },
        fail: (err) => {
          console.log('Download failed:', err);
        },
      });
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
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.content {
  width: 100%;
}

.image-preview {
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.button {
  flex: 1;
  height: 40px;
  background-color: #0088cc;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
}

.result {
  margin-top: 20px;
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.repaired-image {
  width: 300px;
  height: 300px;
}
</style>
