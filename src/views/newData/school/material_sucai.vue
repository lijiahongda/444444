<template>
  <div class="matrialUpdate">
    <el-form ref="info" :rules="rules" :model="info" label-width="100px">
		    <el-form-item label="标题" prop="title">
            <el-input v-model="info.title" placeholder="请输入标题，长度限制在32个字符以内"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="info.author" placeholder="请输入标题作者"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="cover_pic">
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
            <el-button type="primary" @click=" $route.query.aid ? update('info') : save('info')" v-text="$route.query.aid ? '修改' :'创建'"></el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { getTypeList,getLlist,detailOption,updateArticl,createdArticl } from '@/api/school' // 接口

export default {
  name: 'matrialUpdate',
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      typeList: [],
      info: {
        title: "", //标题
        author: "", //作者
        content: "", //富文本内容存储,
        type_id: 10004,
        type_name:"",
        aid: "",
        cover_pic:""
      },

      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { max: 32, message: '不超过32个字符', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入标题作者', trigger: 'blur' },
          ],
          cover_pic: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
        }
    }
  },
  computed: {

  },
  created() {
    this.getType();
    this.info.aid = "";
    if(this.$route.query.aid) {
      this.info.aid = this.$route.query.aid;
      this.getInfo(this.$route.query.aid)
    }
  },
  methods: {
    save(formName){
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
            _this.loading = true
            console.log(_this.info)
            _this.loading = true
            createdArticl(_this.info).then((res) => {
                if(res.data.code == 200){
                    _this.$message.success('创建成功')
                    _this.loading = true
                    _this.$router.push({ path:'/school/article_sucai' })
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
    update(formName){
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
            _this.loading = true
            console.log(_this.info)
            _this.loading = true
            updateArticl(_this.info).then((res) => {
                if(res.data.code == 200){
                    _this.$message.success('修改成功')
                    _this.loading = true
                    _this.$router.push({ path:'/school/article_sucai' })
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
      detailOption(data).then(res => {
          if (res.data.code == 200) {
            self.loading = false;
            self.info.title = res.data.data.title;
            self.info.author = res.data.data.author;
            self.info.content = res.data.data.content;
            self.info.created_at = res.data.data.created_at;
            self.info.type_id = res.data.data.typeId;
            self.info.type_name = res.data.data.typeName;
            self.info.cover_pic = res.data.data.cover_pic
            if (res.data.data.cover_pic != "") {
              self.fileList.push({
                name: "food",
                url: res.data.data.cover_pic
              });
              console.log(self.fileList);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {

    },

    handleAvatarSuccess(res, file) {
      this.info.cover_pic = file.response.url
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
  .matrialUpdate {
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
