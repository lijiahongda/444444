<template>
	<div id="page" v-loading="loading">
		<el-form ref="form" :model="form" label-width="120px" style="width:600px;" :rules="rules" :disabled="$route.query.type">
			<el-form-item label="标题" prop="live_banner_title">
				<el-input v-model="form.live_banner_title"></el-input>
			</el-form-item>
			<el-form-item label="是否跳转" prop="is_href">
				<el-radio v-model="form.is_href" :label="1">是</el-radio>
				<el-radio v-model="form.is_href" :label="0">否</el-radio>
			</el-form-item>
			<el-form-item label="跳转地址" v-if="form.is_href"  prop="live_banner_href">
				<el-input v-model="form.live_banner_href"></el-input>
			</el-form-item>
			<el-form-item label="开始时间" prop="start_time">
				<el-date-picker
					v-model="form.start_time"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="请选择活动开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="介绍时间" prop="end_time">
				<el-date-picker
					v-model="form.end_time"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="请选择活动开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="banner图" prop="live_banner_src">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					list-type="picture-card"
					:on-success="handleAvatarSuccess"
					:on-remove="handleRemoveImg"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					:limit="1"
					:file-list="imgFileList"
				>
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item  v-if="!$route.query.type">
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<router-link target="_blank" :to="{path:'live-banner-list'}">
					<el-button  type="">返回列表</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<router-link  v-if="$route.query.type" target="_blank" :to="{path:'live-banner-list'}">
			<el-button  type="">返回列表</el-button>
		</router-link>
	</div>
</template>

<script>
  import { addLiveBanner,updLiveBanner,getLiveBannerInfo} from '@/api/shops' // 接口
  export default {
    name: 'liveBannerDetail',
	data(){
      return{
        form:{},
        imgFileList:[],
		loading:false,
        rules: {
          live_banner_title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          live_banner_src: [
            { required: true, message: '请上传banner图', trigger: 'blur' }
          ],
          start_time: [
            { required: true, message: '请选择开始时间', trigger: 'blur' }
          ],
          end_time: [
            { required: true, message: '请选择结束时间', trigger: 'blur' }
          ],
          is_href: [
            { required: true, message: '请选择是否跳转', trigger: 'blur' }
          ],
          live_banner_href: [
            { required: true, message: '请输入跳转地址', trigger: 'blur' }
          ],
        }
	  }
	},
	created(){
      if(this.$route.query.id){
        this.getLiveBannerInfo();
	  }
	},
	methods:{
      getLiveBannerInfo(){
        this.loading = true;
        getLiveBannerInfo({live_banner_id: this.$route.query.id}).then(res=>{
          if(res.data.code == 200){
            this.loading = false
			this.form= res.data.data;
            this.imgFileList.push({
			  url: this.form.live_banner_src
			})
          }else{
            this.$message.error(res.data.msg)
            this.loading = false
          }
		})
	  },
      onSubmit(){
        this.loading = true;
        let url = this.$route.query.id ? updLiveBanner : addLiveBanner;
        if(this.$route.query.id){
          this.form.live_banner_id = this.$route.query.id;
        }
        url(this.form).then(res=>{
          if(res.data.code == 200){
            this.loading = false
            this.$message.success(res.data.msg)
            this.$router.push({path:'live-banner-list'})
		  }else{
            this.$message.error(res.data.msg)
            this.loading = false
		  }
		})
	  },
      beforeAvatarUpload(file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        if (!isImg) {
          this.$message.error('检查图片格式是否正确!')
        }
        return isImg && isLt5M
      },
      handleAvatarSuccess(res, file) {
        if (res.code === 200) {
          this.form.live_banner_src = res.url
        } else {
          this.form.live_banner_src = ''
          this.imgFileList = []
          this.$message.error('上传失败请重新上传!')
        }
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多上传1个文件`)
      },
      handleRemoveImg() {
        this.form.live_banner_src = ''
        this.imgFileList = []
      },
	}
  }
</script>

<style scoped>
 #page{
	 padding: 20px
 }
</style>
