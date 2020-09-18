<template>
<div style="padding:20px">
  <el-table
    :data="getOrCodeImagesList"
    border
    stripe
    style="width: 100%">
      <el-table-column fixed prop="id" label="序号" width="100"  align="center"></el-table-column>
			<el-table-column prop="" label="图片" align="center">
				<template slot-scope="scope">
          <img width="200" :src="scope.row.image" alt="">
        </template>
			</el-table-column>
      <el-table-column prop="" label="" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="handClick(scope.row.id,scope.row.image,scope.row.name)">编辑</el-button>
        </template>
			</el-table-column>
      
    
  </el-table>
  <el-dialog title="编辑二维码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="名称">
          <el-input style="width:200px" v-model="tkList.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item class="block" label="请选择背景色">
            <el-color-picker v-model="tkList.backgroundColor"></el-color-picker>
            <span>{{tkList.color}}</span>
        </el-form-item>
        <el-form-item label="请选择图片">
        <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
						   :on-remove="handleRemove2"
						   :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
					<img v-if="tkList.image" :src="tkList.image" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataImage(tkList)">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import { getOrCodeImages,getOrCodeImage,upOrCodeImage } from '@/api/order' // 接口
  export default {
    data() {
      return {
        getOrCodeImagesList: [],
        tkList:{
          image :'',
          name:'',
          id:'',
          backgroundColor:null
        },
        dialogVisible: false
      }
    },
    created () {
      this.getOrCodeImages()
    },
    methods: {
      // 获取列表
      getOrCodeImages(){
        getOrCodeImages().then((res) => {
          if(res.data.code == 200){
            this.getOrCodeImagesList = res.data.data.list
          }
        })
      },
      // 编辑
      handClick(id,picPath,name){
        this.dialogVisible = true
        this.tkList.image = picPath
        this.tkList.id = id
        this.tkList.name = name
      },
      // 上传图片
      handleRemove2(){
				this.tkList.image=''
      },
      handleAvatarSuccess2(res) {
				if (res.code === 200) {
          this.$set(this.tkList,'image',res.url)
				} else {
					this.$set(this.tkList,'image','')
				}

      },
      beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				return isJPG;
      },
      //更新图片
      updataImage(opt){
        upOrCodeImage(opt).then((res) => {
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$message.success('更新成功')
            this.getOrCodeImages()
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      // 关闭弹窗
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style>
.avatar{
  width: 200px;
  margin: 0 auto;
}
.block span{
  vertical-align: middle;
  display: inline-block;
  line-height: 20px;
}
</style>