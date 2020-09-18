<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<el-col>
					<el-input v-model="positionName" placeholder="职位名称查询" style="width:300px;" clearable />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<el-button type="primary" @click="onAdd(1)">新增职位</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="departmentName" label="所属部门" align="center"></el-table-column>
				<el-table-column prop="positionName" label="职位名称" align="center"></el-table-column>
				<el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onAdd(2,scope.row.positionId)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.$index,scope.row.positionId,list)">删除</el-button>
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
					<el-input v-model="form.positionName" autocomplete="off" placeholder="请输入职位名称"></el-input>
				</el-form-item>
				<el-form-item label="部门" :label-width="formLabelWidth">
					<el-select v-model="form.departmentId" placeholder="请选择部门">
					  <el-option v-for="(item,index) in departmentList" :key="index" :label="item.departmentName" :value="item.departmentId"></el-option>
					</el-select>
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
	import {getPositions,addPosition,getPosition,upPosition,delPosition,getDepartmentsMenu} from '@/api/admin'

export default {
    directives: {
        waves
    },
    data() {
        return {
			form:{
				positionName:"",
				departmentId:"",
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
		  positionName:'',//搜索条件角色名
		  titleName:"新增职位",
		  dialogFormVisible:false,
		  departmentList:[],//b部门下拉列表
		  departType:'',//是否编辑
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
				positionName:"",
				departmentId:"",
			}
		},
		// 部门弹窗
		onAdd(type,id){
			//部门下拉
			getDepartmentsMenu().then(res=>{
				if(res.data.code == 200){
					this.departmentList = res.data.data
				}
			})
			if(type == 1){
				this.dialogFormVisible = true;
			}else{
				this.dialogFormVisible = true;
				this.departType = 2;
				this.titleName = "编辑职位"
				getPosition({positionId:id}).then(res=>{
					if(res.data.code ==200){
						this.form = res.data.data
					}
				})
			}
		},
		// 保存z职位
		onConfirm(){
			if(this.departType){
				console.log(this.form,'this.form')
				upPosition(this.form).then(res=>{
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
				addPosition(this.form).then(res=>{
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
			getPositions({page:`${this.pageIndex}`,keyWord:this.positionName}).then(res=>{
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
				delPosition({positionId:id}).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'删除成功')
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
