<template>
  <div class="msgUpdate">
    <el-form ref="info" :rules="rules" :model="info" label-width="120px">
		<el-form-item label="悦消息标题" prop="title">
        <el-input v-model="info.title" placeholder="请输入标题，长度限制在32个字符以内"></el-input>
    </el-form-item>
    <el-form-item label="悦消息类型" prop="type_id">
        <el-select v-model="info.type_id" placeholder="请选择悦消息类型">
          <el-option v-for="(item,index) in typeList"
          :key="index"
          :label="item.type_name"
          :value="item.type_id"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="悦消息副标题" prop="summary">
        <el-input maxlength="32" v-model="info.summary" placeholder="请输入副标题，长度限制在32个字符以内"></el-input>
    </el-form-item>


    <el-form-item label="封面图" prop="cover_pic">
						<el-upload :action="uploadUrl" :limit="1" list-type="picture-card" :file-list="fileListOfDetailTwo" :on-success="uploadSuccessOfDetail"
						 :on-exceed="overSizeOfDetail1" :before-upload="uploadBeforeOfDetail" :on-preview="handlePictureCardPreview"
						 :on-remove="handleRemoveOfDetail">
							<i class="el-icon-plus"></i>

							<div slot="tip" class="el-upload__tip" style="color: #green;">
								请选择300KB以内的图片
							</div>
						</el-upload>

						<el-input v-model="info.cover_pic" style="display: none;" />
		</el-form-item>

		<el-form-item label="内容" prop="content">
      <div class="control" style="display:block;">
				<Tinymce v-model="info.content" :height="300" placeholder="输入内容" style="width: 70%;min-width: 600px;"></Tinymce>
      </div>
		</el-form-item>

    	<el-form-item label="日期" prop="production_date">
						<el-date-picker
							v-model="info.created_at"
							type="datetime"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="日期"
							style="width: 450px;"
						/>
					</el-form-item>
        <el-form-item>
            <el-button type="primary" @click=" $route.query.aid ? update('info') : save('info')" v-text="$route.query.aid ? '修改' :'创建'"></el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import Tinymce from '@/components/Tinymce'
import { getTypeList,getLlist,detailOption,msgCreated,msgUpdated } from '@/api/yueMessage' // 接口

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
      loading: false,
      uploadUrl:'https://api2.yuelvhui.com/app/third/upload',
      fileListOfDetailTwo: [],
      dialogImageUrl: '',
			dialogVisible: false,
      typeList: [],
      info:{
        title: '',//标题
        summary: '',//副标题
        content: '',//富文本内容存储,
        type_id: '',
        aid: ''
      },
      rules: {
          title: [
            { required: true, message: '请输入悦消息标题', trigger: 'blur' },
            { max: 32, message: '不超过32个字符', trigger: 'blur' }
          ],
          type_id: [
            { required: true, message: '请选择悦消息类型', trigger: 'change' }
          ],
          summary: [
            { required: true, message: '请输入悦消息副标题', trigger: 'blur' },
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
    this.info.aid = "";
    if(this.$route.query.aid) {
      this.info.aid = this.$route.query.aid;
      this.getInfo(this.$route.query.aid)
    }
  },
  methods: {
    save(formName){
      let _this = this
      _this.loading = true
      // this.info.content = this.$refs.content.getUEContent()
      console.log(_this.info)
      this.$refs[formName].validate((valid) => {
        if (valid) {
            msgCreated(_this.info).then((res) => {
                if(res.data.code == 200){
                  _this.loading = false
                    _this.$message.success('创建成功')
                    _this.$router.push({ path: '/yueMsg/msgList' })
                }
            }).catch((error) => {
                console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    update(formName){
      let _this = this
      _this.loading = true
      // this.info.content = this.$refs.content.getUEContent()
      console.log(_this.info)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          msgUpdated(_this.info).then((res) => {
              if(res.data.code == 200){
                  _this.loading = false
                  _this.$message.success('修改成功')
                  _this.$router.push({ path: '/yueMsg/msgList' })
              }
          }).catch((error) => {
              console.log(error)
          })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
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
            this.info = res.data.data;
              this.info.aid = this.$route.query.aid;
            // self.info.title = res.data.data.title
            // self.info.summary = res.data.data.summary
            // self.info.content = res.data.data.content
            // self.info.created_at = res.data.data.created_at
            self.info.type_id = res.data.data.typeId
            var imgListTwo = res.data.data.cover_pic.split(' ');
						this.fileListOfDetailTwo =  imgListTwo.map(function(imgObj) {
							return {
								'name': "",
								'url': imgObj
							}
						})


          }
        })
        .catch(error => {
          console.log(error);
        });
    },

      // 图片上传成功
			uploadSuccessOfDetail(res) {
				this.info.cover_pic = res.url;
      },

      overSizeOfDetail1(files, fileList) {
				this.$message({
					message: "上传图片不能超过1张",
					type: 'error',
				})
      },

      // 图片上传前的检查
			uploadBeforeOfDetail(file) {
				if (file.size / 1024 > 300) {
					this.$message({
						message: "图片请保持在750*350px,300KB以内",
						type: 'error',
					})
					return false
				}
      },

      handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
      },

      handleRemoveOfDetail(file, fileList) {
				this.info.cover_pic = "";
			},


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
