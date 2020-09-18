<template>
	<div id="page">
		<el-form ref="form" :rules="rules" :model="form" label-width="150px" styel="width: 30%">
			<el-form-item label="默认文字颜色" prop="unselected_font_color" class="background_color">
				<el-input readonly maxlength="8" v-model="form.unselected_font_color" placeholder="请选择背景颜色"></el-input>
				<el-color-picker v-model="form.unselected_font_color" @change="colorChange1" class="color_name"></el-color-picker>
			</el-form-item>
			<el-form-item label="选中文字颜色" prop="selected_font_color" class="background_color">
				<el-input readonly maxlength="8" v-model="form.selected_font_color" placeholder="请选择背景颜色"></el-input>
				<el-color-picker v-model="form.selected_font_color" @change="colorChange2" class="color_name"></el-color-picker>
			</el-form-item>
			<el-form-item label="顶部默认图"  required>
				<el-upload
					:class="{hide1:hideUploads.hideUpload1}"
					list-type="picture-card"
					action="https://api2.yuelvhui.com/app/third/upload"
					:limit="1"
					:auto-upload="true"
					:on-exceed="handleOnExceed"
					:file-list="fileList"
					:on-preview="handlePictureCardPreview"
					:on-success="handleAvatarSuccess"
					:on-remove="handleRemove"
					:before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="顶部切换图"  required>
				<el-upload
					:class="{hide1:hideUploads.hideUpload2}"
					list-type="picture-card"
					action="https://api2.yuelvhui.com/app/third/upload"
					:limit="1"
					:auto-upload="true"
					:on-exceed="handleOnExceed"
					:file-list="fileList1"
					:on-preview="handlePictureCardPreview"
					:on-success="handleAvatarSuccess1"
					:on-remove="handleRemove1"
					:before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
		</el-form>
		<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
		<router-link :to="{path:'/operate/themeSetting'}">
			<el-button>返回列表</el-button>
		</router-link>
	</div>
</template>

<script>
  import {
    addTopConfiguration,
    getTopConfigurationInfo,
    updTopConfiguration
  } from '@/api/shops'
  export default {
    name: 'add',
	data(){
      return{
        color1:'',
        color2:'',
		 form:{},
        hideUploads:{
          hideUpload1: false,
          hideUpload2: false,
        },
        dialogVisible: false,
        dialogImageUrl: '',
        fileList:[],
        fileList1:[],
         rules:{
           unselected_font_color:[
             { required: true, message: '请输入默认文字颜色', trigger: 'blur' },
           ],
           selected_font_color:[
             { required: true, message: '请输入选中文字颜色', trigger: 'blur' },
           ],
		 }
      }
	},
    mounted() {
      if (this.$route.query.id) {
        this.handleView()
      }
    },
	methods:{
      handleView(){
        getTopConfigurationInfo({id:this.$route.query.id}).then(res=>{
          if(res.data.code == 200) {
            this.form = res.data.data;
            this.fileList = [
              { name: "food.jpg", url: res.data.data.top_img }
            ];
            this.fileList1 = [
              { name: "food.jpg", url: res.data.data.cutover_img }
            ];
          }
        })
      },
      // 颜色值
      colorChange1(val){
        this.form.unselected_font_color = val
      },
      colorChange2(val){
        this.form.selected_font_color = val
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt = file.size / 1024 < 300;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt) {
          this.$message.error('上传头像图片大小不能超过 300K!');
        }
        return isJPG && isLt;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleOnExceed(file,fileList) {
        this.$message({
          type:"error",
          message:"只能上传一张图片"
        })
      },
      handleRemove(){
        this.hideUploads.hideUpload1 = false;
        this.form.top_img = '';
      },
      handleRemove1(){
        this.hideUploads.hideUpload2 = false;
        this.form.cutover_img = '';
      },
      handleAvatarSuccess(res, file) {
        if(file.response.url){
          this.form.top_img = file.response.url;
          this.hideUploads.hideUpload1 = true;
        } else {
          tthis.form.top_img = '';
          this.fileList = [];
          this.$message.error('图片上传失败，请重新上传')
        }
      },
      handleAvatarSuccess1(res, file) {
        if(file.response.url){
          this.form.cutover_img = file.response.url;
          this.hideUploads.hideUpload1 = true;
        } else {
          this.form.cutover_img = '';
          this.fileList = [];
          this.$message.error('图片上传失败，请重新上传')
        }
      },
      onSubmit(formName) {
        let url = ''
        if (this.$route.query.id) {
          url = updTopConfiguration
        } else {
          url = addTopConfiguration
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            url(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success('操作成功')
                this.loading = false
                this.$router.push({ path: '/operate/themeSetting' })
              } else {
                this.$message.error(res.data.msg)
                this.loading = false
              }
            }).catch(res => {
              this.loading = false
            })
          } else {
            return false
          }
        })

      }
	}
  }
</script>

<style scoped>
	#page{
		padding: 20px;
	}
	.background_color{position: relative;width: 405px;}
	.color_name{position: absolute;right: 0;top: 0;}
	.hide1 .el-upload--picture-card,.hide2 .el-upload--picture-card,
	.hideUpload_1  .el-upload--picture-card,
	.hideUpload_2 .el-upload--picture-card,
	.hideUpload_3 .el-upload--picture-card,
	.hideUpload_4 .el-upload--picture-card,
	.hideUpload_1_iphone  .el-upload--picture-card,
	.hideUpload_2_iphone .el-upload--picture-card,
	.hideUpload_3_iphone .el-upload--picture-card,
	.hideUpload_4_iphone .el-upload--picture-card,
	.hideUpload_5_iphone .el-upload--picture-card
	{
		display: none;
	}
</style>
