<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-button type="primary" @click='dialogVisible = true' class="add">添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="logo" label="上传图片" width="100">
        <template slot-scope="scope">
          <img style="height: 80px;width: 80px;" :src="scope.row.logo" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="describe" label="描述"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="buttonText" label="按钮文案"></el-table-column>
      <el-table-column prop="id" label="操作" align="center"  width="80">
        <template slot-scope="scope" align="center">
          <el-button type="text" size="small" @click="showeditShare(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="small" @click="onDel(scope.$index,scope.row.powerId,list)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="seachData.page"
    ></el-pagination>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="500">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            action="https://api2.yuelvhui.com/app/third/upload"
            list-type="picture-card"
            :limit='limit'
            :on-exceed="overSizeOfDetail"
            :on-success="uploadSuccessOfDetail"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe" type="textarea"
  :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="按钮文案">
          <el-input v-model="form.buttonText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShare()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogVisibleEdit" width="500">
      <el-form ref="form" :model="editData" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editData.title"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            action="https://api2.yuelvhui.com/app/third/upload"
            list-type="picture-card"
            :limit='limit'
            :file-list='editFileList'
            :on-exceed="overSizeOfDetail"
            :on-success="uploadSuccessOfDetailEdit"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editData.describe" type="textarea"
  :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="editData.type"></el-input>
        </el-form-item>
        <el-form-item label="按钮文案">
          <el-input v-model="editData.buttonText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editShare()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getShareList,addShare,editShare} from "@/api/share";

export default {
  directives: {},
  data() {
    return {
      tableData: [],
      pageTotal: 10,
      seachData: {
        page: 1,
        pageSize: 10
      },
      limit:1,
      form:{}, // 添加的数据
      uploadImg:'', // 上传的图片
      editData:{}, 
      editFileList:{}, // 编辑默认的图片
      dialogVisible: false,
      dialogVisibleEdit:false
    };
  },
  created() {
    this.getShareList();
  },
  methods: {
    getShareList() {
      getShareList(this.seachData).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.pageTotal = res.data.count
        } else {
          this.$message.error(res.data.msg)
        }
      });
    },
    handleSizeChange(val) {
      this.seachData.page = 1;
      this.getShareList();
    },
    handleCurrentChange(val) {
      this.seachData.page = val;
      this.getShareList();
    },
    addShare(){
      // this.form.logo=this.uploadImg
      addShare(this.form).then((res)=>{
        if (res.data.code==200) {
          this.dialogVisible = false
          this.$message.success(res.data.msg)
          this.getShareList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片上传成功
    uploadSuccessOfDetail(res) {
      this.form.logo = res.url;
    },
    overSizeOfDetail(){
      this.$message.error('上传图片不能超过1张')
    },
    showeditShare(data){
      console.log(data)
      this.editData=data
      this.editFileList=[{
        name:'img',
        url:data.logo
      }]
      this.dialogVisibleEdit=true
    },
    editShare(){
      editShare(this.editData).then((res)=>{
        if (res.data.code==200) {
          this.dialogVisibleEdit = false
          this.$message.success(res.data.msg)
          this.getShareList()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 图片上传成功-编辑
    uploadSuccessOfDetailEdit(res) {
      this.editData.logo = res.url;
    },
  }
};
</script>
<style type="scss">
  .add{
    margin-bottom: 10px;
  }
</style>
