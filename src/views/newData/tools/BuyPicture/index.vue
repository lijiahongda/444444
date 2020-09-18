<template>
  <div style="padding:20px">
    <el-button type="primary"  @click="addLog">新增</el-button>
    <el-table :data="tableData.list"  border style="width: 100%">
        <el-table-column align="center" label="类型"  prop="type"></el-table-column>
        <el-table-column align="center" label="名称"  prop="name"></el-table-column> 

      	<el-table-column align="center" prop="image" fixed label="图片" width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 50px;"
              :src="scope.row.image"
              :fit="'fill'"></el-image>   
          </template>
        </el-table-column>

        <el-table-column align="center"  prop="" label="操作" width="220">id
            <template slot-scope="scope">
                <el-button  type="primary" @click="handleDetail(scope.row.id)">编辑</el-button>
                <el-button  type="primary" @click="delMustBuyImage(scope.row.id,scope.$index)">删除</el-button>
            </template>
        </el-table-column>
      
    </el-table>
    <div class="pagination-container"  style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="tableData.pageSize"
                     :current-page="tableData.page"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <el-dialog title="详情信息"
               :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth">
            <el-radio-group v-model="form.type">
              <el-radio label="1">399会员</el-radio>
              <el-radio label="2">499会员</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
					 <el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" prop="">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						list-type="picture-card" 
						:on-success="handleAvatarSuccess"
						:on-remove="handleRemoveImg"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:limit="1"
						:file-list="image">
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">建议图片小于5M</div>
					</el-upload>
				</el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getMustBuyImages,getMustBuyImageInfo,addMustBuyImage,upMustBuyImage,delMustBuyImage} from '@/api/order'
export default {
  data () {
    return {
      tableData: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      fy: {
        page: 1, //当前页
        page_size: 10, //每页条数
      },
      handleStatus: '',
      form: {
        id:'',
        type:'',
        name:'',
        image:'',
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex,

      },
      // 上传图片
      image:[],
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    onSearch () {
      this.obj.page = 1;
      this.getList()
      // this.obj
    },
    getList () {
      getMustBuyImages().then((res) => {
        if (res.data.code == 200) {
          // alert(111)
          this.tableData = res.data.data
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
          return
        }

      })
    },
     // 删除
    delMustBuyImage (id, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          id: id
        }
        delMustBuyImage(obj).then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data,111111111)
            // this.tableData.splice(index, 1)
            this.getList()
          }
        })
      }).catch(() => {
      });
    },
     submit () {
       
       console.log(this.form, '23232')
       if(this.form.id){
          upMustBuyImage(this.form).then((res) => {
            if (res.data.code == 200) {
              // alert(111)
               this.dialogFormVisible=false
               this.getList();
            } else {
              this.$message.error(res.data.message || '数据加载失败,请检查网络')
              return
            }
        })
       }else{
          addMustBuyImage(this.form).then((res) => {
            if (res.data.code == 200) {
              this.dialogFormVisible=false
              this.getList();
            } else {
              this.$message.error(res.data.message || '数据加载失败,请检查网络')
              return
            }
        })

       }
      
    },


    addLog () {
     this.form={};
     this.image=[];
     this.dialogFormVisible=true;
    },


    
    handleDetail (id) {
      getMustBuyImageInfo({id:id}).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data;
          this.dialogFormVisible = true;
          // 上传图片
           this.image=[];
            // console.log(this.searchObj, '232323333')
            if(this.form.image){
              var imgListIcon = this.form.image.split(' ');
              this.image = imgListIcon.map(function(imgObj) {
                return {
                  'name': "",
                  'url': imgObj
                }
              })
            }

        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
        }
      })
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList()
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
        this.form.image = res.url
    },
    handleRemoveImg() {
      this.form.image = ''
      this.imgFileList = []
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
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传1个文件`)
    },

  }
}

</script>
<style scoped="scoped" lang="scss">
.el-table {
  margin-top: 20px;
}
</style>
