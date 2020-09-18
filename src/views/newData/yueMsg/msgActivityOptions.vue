<template>
  <div class="msgUpdate">
    <el-form ref="info" :rules="rules" :model="info" label-width="100px">
		    <el-form-item label="活动名称" prop="title">
            <el-input v-model="info.title" placeholder="请输入标题，长度限制在32个字符以内"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="content">
          <div class="control" style="display:block;">
						<Tinymce v-model="info.content" :height="300" placeholder="输入内容" style="width: 70%;min-width: 600px;"></Tinymce>
          </div>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            list-type="picture-card"
            action="https://api2.yuelvhui.com/app/third/upload"
            :limit="1"
            :auto-upload="true"
            :on-exceed="handleOnExceed"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('info')">创建</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import Tinymce from "@/components/Tinymce";
import { getTypeList,getLlist,detailOption,msgAdd,msgNewUpdate } from '@/api/yueMessage' // 接口

export default {
  name: 'msgUpdate',
  directives: {
    waves
  },
  components:{
    Tinymce
  },
  data() {
    return {
      imageUrl: '',
      loading: false,
      typeList: [],
      info:{
        title: '',//标题
        content: '',
        coverPic: '',//图片
        typeId: 1000
      },
      dialogImageUrl:'',
      dialogVisible:false,
      fileList:[],
      rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 32, message: '不超过32个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
        }
    }
  },
  computed: {

  },
  created() {
    this.getType();
    if(this.$route.query.aid) {
      this.info.aid = this.$route.query.aid;
      this.getInfo(this.$route.query.aid)
    }
  },
  methods: {
	getType() {
		let _this = this;
		getTypeList().then(res => {
		if (res.data.code == 200) {
			this.typeList = res.data.data;
		} else {
			alert("获取消息类型列表失败");
		}
		}).catch(error => {
		alert("获取消息类型列表失败");
		});
  },
  getInfo() {
      let self = this;
      self.loading = true;
      let data = `${this.info.aid}`;
      msgNewUpdate(data).then(res => {
          if (res.data.code == 200) {
            self.loading = false
            self.info.title = res.data.data.title
            self.info.content = res.data.data.content
            self.info.coverPic = res.data.data.cover_pic
            self.info.aid = res.data.data.aid
            self.fileList.push({
              name:'image',
              url:res.data.data.summary
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.loading = true
          msgAdd(self.info).then((res) => {
              if(res.data.code == 200){
                  self.loading = false
                  self.$message({
                      type: 'success',
                      message: '保存成功!'
                  })
                  self.$router.push({ path:'/yueMsg/msgActivity' })
              }
              else{
                  self.$message({
                      type: 'success',
                      message: res.data.msg
                  })
              }
            }).catch((error) => {
                console.log(error)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.info.coverPic = file.response.url;
      // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
      const isLt = file.size / 1024 < 50;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 50K!');
      }
      return isJPG && isLt;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleOnExceed(file,fileList) {
      alert('最多上传一张图片')
    }
  }
}
</script>
<style scope lang="scss">
  .msgUpdate {
    margin: 20px;
    width: 700px;
    box-sizing: border-box;
    padding: 20px;
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
