<template>
	<div id="edit">
		<el-button type="primary" @click="addMessage">新增消息</el-button>
		<el-form>
			<div class="message" v-for="(item,index) in messages" :key="index">
				<el-form-item label="类型">
					<el-radio-group v-model="item.type">
						<el-radio :label="1">文本</el-radio>
						<el-radio :label="2">图片</el-radio>
						<el-radio :label="3">视频</el-radio>
						<el-radio :label="4">链接</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item v-if="item.type == 1 || item.type == 4" label="内容">
					<el-input type="textarea" v-model="item.content" :autosize="{ minRows: 2, maxRows: 8}" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item v-if="item.type == 2" label="内容">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="false"
						:on-success="res=>{item.content = res.url}"
						:before-upload="beforeAvatarUpload">
						<img v-if="item.content" :src="item.content" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item v-if="item.type == 3" label="内容">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/uploadVideo"
						:show-file-list="false"
						:before-upload="beforeUploadVideo"
						:on-success="res=>{item.content = res.url}">
						<img v-if="item.content" src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-04-08/21/yuelvhuizprWwRkYss1586352852.jpg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

					<el-button v-if="item.content"  type="primary" @click="videoPlay(item.content)">点击查看</el-button>
				</el-form-item>
				<el-form-item v-if="item.type == 1" label="短链">
					<el-input v-model="item.shortUrl" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="是否要发送">
					<el-radio-group v-model="item.isSend">
						<el-radio :label="0">不发送</el-radio>
						<el-radio :label="1">要发送</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="是否定时发送">
					<el-radio-group v-model="item.isTimingSend">
						<el-radio :label="0">否</el-radio>
						<el-radio :label="1">是</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="定时发送时间" v-if="item.isTimingSend==1" prop="timingSendTime">
					<el-date-picker
						v-model="item.timingSendTime"
						type="datetime"
						value-format="yyyy-MM-dd HH:mm:ss"
						placeholder="请选择定时发送时间">
					</el-date-picker>
				</el-form-item>

				<el-button type="danger" @click="delMessage(index,item.id)">删除</el-button>
			</div>
		
		</el-form>


		<el-dialog :visible.sync="videoDialog" :before-close="videoDialogVisibleClick">
			<video id="video" style="margin: 0 auto;width: 100%;" height="400" :src="videoUrl"  autoplay="autoplay" controls="controls">您的浏览器不支持视频</video>
		</el-dialog>
		<router-link to="/operate/robot-message">
			<el-button type="primary">返回</el-button>
		</router-link>
		<el-button type="primary" @click="addCommunitySendInfo">保存</el-button>
	</div>
</template>

<script>
  import {
    getCommunitySendInfo,
    addCommunitySendInfo,
    upCommunitySendInfo,
    delCommunitySendInfo
  } from '@/api/shops'
  export default {
    name: 'edit',
	data(){
      return {
        messages:[{
          type: 0,
          content: '',
          isSend: ''
        }],
		videoUrl:'',
        videoDialog:false
	  }
	},
	created(){
      if(this.$route.query.randomStr){
        this.getCommunitySendInfo()
	  }
	},
	methods:{
      videoPlay(url){
        this.videoUrl = url;
        this.videoDialog = true
	  },
      videoDialogVisibleClick(){
        let video = document.getElementById("video");
        video.pause();
        this.videoDialog = false;
      },
      // 图片上传前的检查
      beforeAvatarUpload(file) {
        if (file.size / 1024 / 1024 >  1) {
          this.$message({
            message: "图片请保持在1M以内",
            type: "error"
          })
          return false;
        }
      },
      //上传前回调
      beforeUploadVideo(file) {
        var fileSize = file.size / 1024 / 1024 < 50;
        console.log(file.type, "filetype");
        if (["video/mp4", "video/ogg", "video/flv", "video/avi", "video/wmv", "video/rmvb", "video/mov"].indexOf(file.type) == -1) {
          this.$message.error("请上传正确的视频格式");
          return false;
        }
        if (!fileSize) {
          this.$message.error("视频大小不能超过50MB");
          return false;
        }
      },
      getCommunitySendInfo(){
        getCommunitySendInfo({randomStr:this.$route.query.randomStr}).then(res=>{
          if(res.data.code == 200){
			this.messages = res.data.data
		  }else{
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
		  }
		})
	  },
      addCommunitySendInfo(){

        let url = this.$route.query.randomStr ? upCommunitySendInfo : addCommunitySendInfo
        url({data: this.messages}).then(res=>{
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
			this.$router.push('/operate/robot-message')
          }else{
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
		})
	  },
      delMessage(index,id){
        if(this.messages.length==1 && this.$route.query.randomStr){
          this.$message.warning('编辑至少保留一条');
          return
		}
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$route.query.randomStr && id){
            delCommunitySendInfo({id:id}).then(res=>{
              if(res.data.code == 200){
                this.messages.splice(index,1)
                this.$message.success(res.data.msg)
              }else{
                this.$message.error(res.data.msg || '数据加载失败,请检查网络')
              }
            })
          }else{
            this.messages.splice(index,1)
            this.$message.success('删除成功！')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

	  },
      addMessage(){
        this.messages.push({
          type: 0,
          content: '',
          isSend: ''
        })
	  }
	}
  }
</script>

<style scoped>
#edit{
	padding: 20px;
}
	.message{
		width: 45%;
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 15px;
		margin: 20px;
	}
	.el-form{
		display: flex;
		flex-wrap: wrap;
	}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
