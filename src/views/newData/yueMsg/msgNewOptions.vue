<template>
  <div class="msgUpdate">
    <el-form ref="info" :model="info" label-width="100px">
        <el-form-item label="产品标题">
            <el-input maxlength="32" v-model="info.title" placeholder="请输入产品标题，长度限制在32个字符以内"></el-input>
        </el-form-item>
        <el-form-item label="产品类型">
            <div style="display: inline-block;margin-right: 20px" v-for="(item,index) in typeList" :key='index'>
                <el-radio @change="isCheckout(item.typeId,item.status)" width="200px" v-model="info.typeId" :label="item.typeId">{{ item.name }}</el-radio>
            </div>
        </el-form-item>


        <el-form-item label="产品名称" v-show="isShowName">
            <el-input maxlength="32" v-model="info.content" placeholder="请输入产品名称，长度限制在32个字符以内"></el-input>
        </el-form-item>
        <el-form-item label="产品ID" v-show="isShowId">
            <el-input v-model="info.pid" placeholder="请输入产品产品ID"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
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
            <el-button type="primary" @click="onSubmit()">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { msgNewType, msgAdd, msgNewUpdate} from '@/api/yueMessage' // 接口

export default {
  name: 'msgUpdate',
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      typeList: [],
      radio: '',
      info:{
        typeId: '',
        coverPic: '',//图片
      },
      isShowName: false,
      isShowId: false,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
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
    isCheckout(id,index){
        if(index == 3){
            this.isShowName = false
            this.isShowId = false
        }
        else if(index == 1){
            this.isShowName = true
            this.isShowId = true
        }
        else{
            this.isShowName = false
            this.isShowId = true
        }
    },
    getType() {
      let _this = this;
      msgNewType().then(res => {
      if (res.data.code == 200) {
        this.typeList = res.data.data;
      } else {
        alert("获取消息类型列表失败");
      }
      }).catch(error => {
      alert("获取消息类型列表失败");
      });
    },
    isCheckout(id,index){
        if(index == 3){
            this.isShowName = false
            this.isShowId = false
        }
        else if(index == 1){
            this.isShowName = true
            this.isShowId = true
        }
        else{
            this.isShowName = false
            this.isShowId = true
        }
    },
    getInfo() {
      let self = this;
      self.loading = true;
      let data = `${this.info.aid}`;
      msgNewUpdate(data).then(res => {
          if (res.data.code == 200) {
            self.loading = false
            self.info.typeId = res.data.data.type_id
            self.info.content = res.data.data.content
            self.info.coverPic = res.data.data.cover_pic
            self.fileList.push({
              name:'test',
              url:res.data.data.cover_pic
            })
            self.info.pid = res.data.data.pid
            self.info.title = res.data.data.title
            self.isCheckout(res.data.data.type_id,res.data.data.status)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      let self = this
      self.loading = true
      msgAdd(self.info).then((res) => {
          if(res.data.code == 200){
              self.loading = false
              self.$message({
                  type: 'success',
                  message: '保存成功!'
              })
              self.$router.push({ path:'/yueMsg/msgNew' })
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
    width: 800px;
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
