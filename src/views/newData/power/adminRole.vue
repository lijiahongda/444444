<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<el-col>
					<el-input v-model="roleName" placeholder="角色名称查询" style="width:300px;" clearable />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<el-button type="primary" @click="onAdd(1)">新增角色</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
				<el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onAdd(2,scope.row.roleId)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.$index,scope.row.roleId,list)" v-if="scope.row.roleId != 1">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="total" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getRoles,delRole} from '@/api/admin'

export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
            switchChart: false,
            list: [],
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  loading:true,
		  status:'',
		  params:'',
		  label_name:"",
		  roleName:''//搜索条件角色名
        }
    },
    created() {
		
        this.getList();
    },
    methods: {
		onAdd(type,roleId){
			if(type == 1){
				this.$router.push('/power/adminRoleAdd')
			}else{
				this.$router.push('/power/adminRoleAdd?roleId='+roleId)
			}
		},
        // 列表数据
        getList() {
			getRoles({page:`${this.pageIndex}`,keyWord:this.roleName}).then(res=>{
				if(res.data.code==200){
					this.loading = false;
					this.list = res.data.data.list;
					this.total = res.data.data.total;
				}else{
					this.loading = false;
					this.$message.success(res.data.msg ||"网络开小差了~")
				}
			})
        },
		// 删除
		onDel(idx,roleId,list){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delRole({roleId:roleId}).then(res=>{
					if(res.data.code ==200 ){
						this.$message({
							type: 'success',
							message: '删除成功'
						});
						// list.splice(idx,1)
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
			row.label_name = row.label_name_new;
		},
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        // 搜索
        handleFilter() {
			this.loading =true;
            this.pageIndex = 1;
			this.getList()
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
