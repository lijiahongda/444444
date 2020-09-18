<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="商户类型：">
					<el-input v-model="supplierName" placeholder="请输入商户类型" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onConfirm(1)">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="" label="商户类型" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.supplierName" class="edit-input" size="small" />
						<span v-else>{{ row.supplierName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="{row}" align="center">
					<el-button v-if="row.edit" type="text" size="small" @click="onConfirm(2,row)">保存</el-button>
					<el-button v-if="!row.edit" type="text" size="small" @click="row.edit=!row.edit">编辑</el-button>
					
					<el-button v-if="row.edit" type="text" size="small" @click="onCancel(row)">取消</el-button>
					<el-button type="text" size="small" @click="onDel(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {supplierList,createSupplier,updateSupplier,deleteSupplier} from '@/api/mall'
export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
			phone:'',
            switchChart: false,
            list: [],
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  startTime:'',
		  endTime:'',
		  type:'',
		  status:'',
		  params:'',
		  supplierName:"",
        }
    },
    created() {
		
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
			supplierList().then(res=>{
				if(res.data.code == 200){
				  let dataList = res.data.list;
				  this.list = dataList.map((item)=>{
					this.$set(item, 'edit', false);
					item.supplierName_new = item.supplierName;
					return item
				  })
				  this.total = res.data.totalPage;
				  this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize) || 0;
				}
			})
        },
		//保存
		onConfirm(type,row){//type=1添加 type=2编辑
			var obj={};
			if(type == 2){
				row.edit = false;
				obj.supplierName = row.supplierName;
				obj.id = row.id;
				updateSupplier(obj).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
					}else{
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					}
				})
			}else{
				if(this.supplierName != ""){
					obj.supplierName = this.supplierName;
				}else{
					this.$message({
						message:"请输入商户名称",
						type:"error"
					})
					return false;
				}
				createSupplier(obj).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.supplierName = "";
						this.pageIndex = 1;
						this.getList()
					}else{
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					}
				})
			}
		},
		// 删除
		onDel(row){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				deleteSupplier({id:`${row.id}`}).then(res=>{
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
		//取消
		onCancel(row){
			row.edit = false;
			row.supplierName = row.supplierName_new;
		},
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        // 搜索
        handleFilter() {
            this.pageIndex = 1
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.pageIndex = val
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
