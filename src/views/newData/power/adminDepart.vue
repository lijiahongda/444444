<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<el-col>
					<el-input v-model="departmentName" placeholder="部门名称查询" style="width:300px;" clearable />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<el-button type="primary" @click="onAdd(1)">新增部门</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="departmentName" label="部门名称" align="center"></el-table-column>
				<el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onAdd(2,scope.row.departmentId)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.$index,scope.row.departmentId,list)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="total" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.departmentName" autocomplete="off" placeholder="请输入部门名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getDepartments,addDepartment,getDepartment,upDepartment,delDepartment} from '@/api/admin'

export default {
    directives: {
        waves
    },
    data() {
        return {
			form:{
				departmentName:"",
				departmentId:''
			},
            total: null,
            switchChart: false,
            list: [],
			formLabelWidth:"120px",
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  loading:true,
		  status:'',
		  params:'',
		  label_name:"",
		  departmentName:'',//搜索条件角色名
		  titleName:"新增部门",
		  dialogFormVisible:false,
		  departType:'',//添加或者编辑的判断字段
        }
    },
    created() {
        this.getList();
    },
    methods: {
		// 关闭弹窗   important
		closeBox(){
			this.departType ='';
			this.form={
				departmentName:"",
				departmentId:''
			}
		},
		// 部门弹窗
		onAdd(type,id){
			if(type == 1){
				this.dialogFormVisible = true;
			}else{
				this.dialogFormVisible = true;
				this.departType = 2;
				this.titleName = "编辑部门"
				getDepartment({departmentId:id}).then(res=>{
					if(res.data.code ==200){
						this.form = res.data.data
					}
				})
			}
		},
		// 保存部门
		onConfirm(){
			if(this.departType){
				console.log(this.form,'this.form')
				upDepartment(this.form).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'编辑成功')
						this.dialogFormVisible = false;
						this.departType = '';
						this.getList()
					}else{
						this.$message({message: res.data.msg,type: 'error'});
					}
				})
			}else{
				addDepartment({departmentName:this.form.departmentName}).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'保存成功')
						this.dialogFormVisible = false;
						this.getList()
					}else{
						this.$message({message: res.data.msg,type: 'error'});
					}
				})
			}
			
		},
        // 列表数据
        getList() {
			getDepartments({page:`${this.pageIndex}`,keyWord:this.departmentName}).then(res=>{
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
		onDel(idx,id,list){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delDepartment({departmentId:id}).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'删除成功')
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
