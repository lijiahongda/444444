<template>
  <div class="textAdd">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="标题" prop="title">
			    <el-input v-model="form.title" placeholder="请输入标题，20字以内" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type_id">
          <el-select v-model="form.type_id" placeholder="请选择">
            <el-option
              v-for="item in goods_supplier"
              :key="item.type_id"
              :label="item.type_name"
              :value="item.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图" prop="cover_pic">
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
        <el-form-item label="内容" prop="content">
          <div class="control" style="display:block;">
								<tinymce v-model="form.content" :height="300" placeholder="输入商品详情" />
              </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click=" $route.query.aid ? update('form') : save('form')" v-text="$route.query.aid ? '修改' :'创建'"></el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import Tinymce from '@/components/Tinymce';
import { getTypeList, articlLists, updateArticl, addArticl } from '@/api/shop'

export default {
  name: 'textAdd',
  directives: {
    waves
  },
  components: { Tinymce },
  data() {
    return {
      form:{
          title:'',//标题
          content:'',//内容
          type_id:'',//id
          cover_pic:'',////图片
        },
	      value:'',
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        goods_supplier:[],//类型列表
        rules: {
          title: [
            { required: true, message: '请输入标题，20字以内', trigger: 'blur' },
            { max: 20, message: '不超过20个字符', trigger: 'blur' }
          ],
          type_id: [
            { required: true, message: '请选择类型', trigger: 'blur' },
          ],
          cover_pic: [
            { required: true, message: '请上传缩略图', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请补充内容', trigger: 'blur' },
          ],
        }
    }
  },
  computed: {

  },
  created() {
    this.getType()
    if(this.$route.query.aid) {
      this.getList(this.$route.query.aid)
    }
  },
  methods: {
    save(formName){
      let _this = this
      // this.form.content = this.$refs.content.getUEContent()
      _this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
            _this.loading = true;
            addArticl(_this.form).then((res) => {
                if(res.data.code == 200){
                    _this.loading = false
                    _this.$message.success('创建成功')
                    _this.$router.push({path: '/shop/textList'});
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
      _this.loading = true
      // this.form.content = this.$refs.content.getUEContent()
      this.$refs[formName].validate((valid) => {
        if (valid) {
            _this.loading = true
            updateArticl(_this.form).then((res) => {
                if(res.data.code == 200){
                    _this.loading = false
                    _this.$message.success('修改成功')
                    _this.$router.push({path: '/shop/textList'});
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
    // 回显
    getList(aid){
        let _this = this;
        articlLists({ aid: aid }).then((res) => {
            if (res.data.code == 200) {
                _this.form = res.data.data
                _this.form['aid'] = _this.$route.query.aid
								let url = res.data.data.cover_pic.split(",");
								console.log(url,"url")
								url.map(item=>{
									_this.fileList.push({
									  name: '',
									  url: item
									})
								})
            }
        }).catch((error) => {
            console.log(error)
        })
    },
    onSubmit() {
      console.log('submit!');
    },
    getType() {
      let _this = this;
      getTypeList().then(res => {
        if (res.data.code == 200) {
          this.goods_supplier = res.data.data;
        } else {
          alert("获取消息类型列表失败");
        }
      }).catch(error => {
        alert("获取消息类型列表失败");
      });
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
    },
    handleAvatarSuccess(res, file) {
      this.form.cover_pic = file.response.url
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl)
    },
  }
}
</script>
<style scope lang="scss">
  .textAdd {
    margin: 20px;
    width: 80%;
    box-sizing: border-box;
    padding: 20px;
  }
  .input-common {
	width:450px;
	display:flex;
	justify-content: space-between;
  }
</style>
