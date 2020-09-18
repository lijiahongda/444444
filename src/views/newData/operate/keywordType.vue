<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="forms" label-width="120px" :inline="true">
			<el-form-item label="分类名称：">
					<el-input v-model="name" placeholder="请输入分类名称" style="width:200px;" clearable @clear="onSearch"   @keyup.enter.native="onSearch"  prefix-icon="el-icon-search"/>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<el-button type="primary" @click="onConfirm()">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="ksc_sort" label="排序" align="center">
				</el-table-column>
				<el-table-column fixed prop="ksc_name" label="分类名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
					<el-button type="text" size="small" @click="onConfirm(scope.row.id)">编辑</el-button>
					<el-button type="text" size="small" @click="onDel(scope.row.id)">删除</el-button>
					
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="分类名称:" :label-width="formLabelWidth">
					<el-input v-model="form.ksc_name" autocomplete="off" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="排序:" :label-width="formLabelWidth">
					<el-input v-model="form.ksc_sort" autocomplete="off" placeholder="请输入排序,数字越大越靠前"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {deleteKeywordCate,updateKeywordCate,getKeywordCate,getKeywordCates,addKeywordCate } from '@/api/shops'
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
		  formLabelWidth:"90px",
		  dialogFormVisible:false,
		  form:{
			  ksc_name:"",
			  ksc_sort:"",
		  },
		  name:"",///搜索名字
		  titleName:"新增分类",
		  typeId:"",
		  loading:true,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
			getKeywordCates({ksc_name:this.name,page:this.pageIndex}).then(res=>{
				if(res.data.code == 200){
				  this.loading = false;
				  this.list = res.data.data;
				  this.total = res.data.totalPage;
				  this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize) || 0;
				}else{
					this.loading = false;
				}
			})
        },
		//保存
		onConfirm(type){
			if(type){
				this.typeId =1;
				this.titleName = "修改分类"
				getKeywordCate({id:type}).then(res=>{
					if(res.data.code == 200){
						this.form = res.data.data;
					}
				})
			}else{
				this.titleName = "新增分类"
			}
			this.dialogFormVisible = true;
		},
        onSubmit() {
			if(this.form.name === '' ){
				this.$message.error("名称不能为空")
				return false;
			}
			if(this.form.sort === '' ){
				this.$message.error("排序不能为空")
				return false;
			}
			if(this.typeId != 1){
				addKeywordCate(this.form).then(res=>{
					if(res.data.code == 200){
						this.dialogFormVisible = false;
						this.$message.success(res.data.msg || "添加成功")
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了~")
					}
				})
			}else{
				updateKeywordCate(this.form).then(res=>{
					if(res.data.code == 200){
						this.dialogFormVisible = false;
						this.$message.success(res.data.msg || "编辑成功")
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了~")
					}
				})
			}
            
        },
		onDel(id){
			deleteKeywordCate({id:id}).then(res=>{
				if(res.data.code == 200){
					this.$message.success(res.data.msg || "删除成功")
					this.getList()
				}else{
					this.$message.error(res.data.msg || "网络开小差了~")
				}
			})
		},
		// 关闭
		closeBox(){
			this.form = {
				name:"",
				sort:"",
			}
		},
        // 搜索
        onSearch() {
			this.loading = true
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
