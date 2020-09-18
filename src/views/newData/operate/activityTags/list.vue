<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="标签名称：">
				<el-col>
					<el-input v-model="obj.keyWord" placeholder="请输入标签名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<el-button type="primary" @click="addTag">添加活动标签</el-button>

			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table :data="list" :fit="true" v-loading="loading"  border style="width: 100%;">
				<el-table-column fixed prop="id" label="标签ID" align="center">
				</el-table-column>
				<el-table-column fixed prop="name" label="标签名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>

						<el-button type="text" size="small" @click="delActivitiesTag(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="obj.page" :page-sizes="[10]" :page-size="pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"  @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="title" :visible.sync="dialogFormVisible" @closed="form={}">
			<el-form :model="form">
				<el-form-item label="标签名称" label-width="150px">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addActivitiesTag">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {getActivitiesTagList,addActivitiesTag,upActivitiesTag,delActivitiesTag} from '@/api/shops'
  export default {
    directives: {
      waves
    },
    data() {
      return {
        total: null,
        loading:false,
        dialogFormVisible:false,
		title:'',
        list: [],
		form:{},
        pageIndex:1,
        pageSize:10,
        obj:{
          page:this.pageIndex,
          keyWord:'',
        },
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      onEdit(row){
        this.form = row;
        this.dialogFormVisible = true;
        this.title = '编辑标签'
      },
      addTag(){
        this.dialogFormVisible = true;
        this.title = '新增标签'
	  },
      delActivitiesTag(id){
        this.$confirm('是否继续删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          delActivitiesTag({id:id}).then(res=>{
            if(res.data.code == 200){
              this.$message.success(res.data.msg)
              this.getList();
            }else{
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

	  },
      addActivitiesTag(){
        this.loading = true;
        let url = this.title == '新增标签'? addActivitiesTag : upActivitiesTag
        url(this.form).then(res=>{
          if(res.data.code == 200){
            this.$message.success(res.data.msg)
            this.form = {};
            this.getList();
		  }else{
            this.$message.error(res.data.msg)
		  }
          this.dialogFormVisible = false;
		})
	  },
      // 列表数据
      getList() {
        this.loading=true;
        getActivitiesTagList(this.obj).then(res=>{
          if(res.data.code==200){
            this.loading=false;
            this.list = res.data.data.list
            this.total = res.data.data.total;
          }
        })
      },
      //保存
      onSearch(type,row){//type=1添加 type=2编辑
        this.obj.page = 1;
        this.getList()
      },
      // 删除
      onDel(row){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteActivities({id:`${row.id}`}).then(res=>{
            if(res.data.code==200){
              this.$message({
                message:"删除成功",
                type:"success"
              })
              this.getList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 分页
      handleSizeChange(val) {
        this.obj.page= 1;
        this.getList()
      },
      handleCurrentChange(val) {
        this.obj.page = val
        this.getList()
      }
    }
  }
</script>
<style type="scss">
	.goodsName{
		display: block;
	}
</style>
