<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="活动名称：">
				<el-col>
					<el-input v-model="activity_name" placeholder="请输入活动名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onConfirm(1)">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="" label="活动名称" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.activity_name" class="edit-input" size="small" />
						<span v-else>{{ row.activity_name }}</span>
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
	import {getActivitys,addActivity,updateActivity,deleteActivity} from '@/api/cust'
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
		  activity_name:''
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
			getActivitys({page:`${this.pageIndex}`}).then(res=>{
				if(res.data.code==200){
					let dataList = res.data.data.result;
					this.list = dataList.map((item)=>{
						this.$set(item, 'edit', false);
						item.activity_name_new = item.activity_name;
						return item
					})
					this.total = res.data.data.total;
					this.pageTotal = res.data.data.count
				}
			})
        },
		//保存
		onConfirm(type,row){//type=1添加 type=2编辑
			var obj={};
			if(type == 2){
				row.edit = false;
				obj.activity_name = row.activity_name;
				obj.id = row.id;
				updateActivity(obj).then(res=>{
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
				if(this.activity_name != ""){
					obj.activity_name = this.activity_name;
				}else{
					this.$message({
						message:"请输入活动名称",
						type:"error"
					})
					return false;
				}
				addActivity(obj).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.activity_name="";
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
				deleteActivity({id:`${row.id}`}).then(res=>{
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
			row.activity_name = row.activity_name_new;
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
