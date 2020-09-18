<template>
	<div style="padding:20px">
		<el-button type="primary" @click="addConfig">新增配置</el-button>
		<el-table :data="tableData.list" border style="width: 100%">
			<el-table-column  align="center" label="id" width="80" prop="id"></el-table-column>
			<el-table-column  align="center" label="展示价格"  prop="showMoney"></el-table-column>
			<el-table-column  align="center" label="支付价格"  prop="actualMoney"></el-table-column>
			<el-table-column  align="center" prop="created_at" label="创建时间" width="180"></el-table-column>
			<el-table-column prop="" label="操作" width="180">id
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination  @current-change="handleCurrentChange"
						   :current-page="tableData.page" :page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<el-dialog title="配置信息" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="展示价格" :label-width="formLabelWidth">
					<el-input v-model="form.showMoney" type='number' autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="支付价格" :label-width="formLabelWidth">
					<el-input v-model="form.actualMoney" type='number' autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSave(handleStatus)">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import {
    getBalanceList,
    addBalance,
    upBalance,
    delBalance
  } from '@/api/shops'
  export default {
    data() {
      return {
        tableData: [],
        formLabelWidth: '120px',
        dialogFormVisible:false,
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
		handleStatus: '',
		form:{},
        total: 0, //总条数
        pageIndex: 1,
        obj: {
          page: this.pageIndex,
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      addConfig(){
        this.dialogFormVisible = true;
        this.handleStatus = 1;
	  },
      handleSave(status){
        let url = status == 1 ? addBalance : upBalance
        url(this.form).then(res=>{
		  if(res.data.code == 200){
		    this.$message.success(res.data.msg)
            this.getList()
		  }else{
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
		  }
		  this.form = {}
		})
        this.dialogFormVisible = false;
	  },
      onSearch() {
        this.obj.page = 1;
        this.getList(this.obj)
      },
      handleDel(id){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBalance({ id: id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.getList()
            } else {
              this.$message.error(res.data.message || '数据加载失败,请检查网络')
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
	  },
      getList() {
        getBalanceList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }

        })
      },
      handleEdit(row) {
        this.form = row
        this.dialogFormVisible = true;
        this.handleStatus = 2;
      },
      handleCurrentChange(val) {
        this.obj.page = val;
        this.getList()
      },
    }
  }

</script>
<style scoped="scoped" lang="scss">
.el-table{
	margin-top: 20px;
}
</style>
