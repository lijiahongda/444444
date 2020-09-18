<template>
	<div class="danghome">
		<div class="top">
			<el-button type="primary" round style="float: right;" @click='addclass'>添加推荐分类</el-button>
		</div>
		<div class="content">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="id" label="序号">
				</el-table-column>
				<el-table-column prop="recommendName" label="推荐名称">
				</el-table-column>
				<el-table-column prop="bookNum" label="书籍数">
				</el-table-column>
				<el-table-column prop="createTime" label="配置时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看列表详情</el-button>
						<el-button type="text" size="small" @click="delclass(scope.row.id)">删除</el-button>
						<el-button type="text" size="small" @click="detailclass(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="修改分类名称" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form>
				<el-form-item label="分类名称:" :label-width="formLabelWidth">
					<el-input v-model="formname" autocomplete="off" placeholder="请输入分类名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="page" :page-sizes="[20]" :page-size="pageSize" :total="total" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script>
	import {
		getDdRecommendCategoryList,delDdRecommendCategory,upDdRecommendCategory,
	} from '@/api/admin'
	export default {
		data() {
			return {
				tableData: [],
				page:1,
				pageSize:20,
				dialogFormVisible:false,
				formname:'',
				cid:'',
				formLabelWidth:'90px',
				total:0
				// form:{}
			}
		},
		methods: {
			// 获取列表数据
			getList() {
				var data={
					page:this.page,
					pageSize:this.pageSize
				}
				getDdRecommendCategoryList(data).then(res=>{
					console.log(res.data)
					if(res.data.code==200){
						this.tableData=res.data.data.list
						this.total=res.data.data.total
						this.page=res.data.data.page
						this.pageSize=res.data.data.pageSize
					}
				})
			},
			// 添加分类
			addclass() {
				this.$router.push('/dangconfigure/dangaddclass');
			},
			// 查看详情
			handleClick(row) {
				this.$router.push({path:'/dangconfigure/listdetail',query:{id:row.id,recommendName:row.recommendName}})
			},
			// 删除本条数据
			delclass(id) {
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					// this.tableData.splice(id,1)
					delDdRecommendCategory({id:id}).then(res=>{
						console.log(res)
						if(res.data.code==200){
							  this.$message({
								  message:"删除成功",
								  type:"success"
							  })
							  this.getList()
						}else{
						  this.$message({
							  message:res.data.msg,
							  type:"error"
						  })
						}
					})
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });
				});
			},
			detailclass(row){
				// getCategory({id:type}).then(res=>{
				// 	if(res.data.code == 200){
				// 		this.form = res.data.data;
				// 	}
				// })
				this.formname=row.recommendName
				this.cid=row.id
				// console.log(this.tableData[0])
				console.log(row)
				this.dialogFormVisible=true
				// var data={
				// 	id:id,
				// 	category_name:this.formname
				// }
				// upDdRecommendCategory(data).then(res=>{
				// 	console.log(res)
				// })
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.loading = true;
			    this.page = val;
			    this.getList()
			},
			closeBox(){
				this.formname=''
			},
			onSubmit(){
				var data={
					id:this.cid,
					category_name:this.formname
				}
				upDdRecommendCategory(data).then(res=>{
					if(res.data.code==200){
						this.$message({
							message:"修改成功",
							type:"success"
						})
						this.dialogFormVisible=false
						this.getList()
					}else{
						this.$message({
							message:'修改错误，请重试',
							type:"error"
						})
					}
				})
			}
		},
		mounted() {
			this.getList()
		},
	}
</script>

<style scoped lang="scss">
	.top {
		margin: 10px;
		height: 38px
	}

	.content {
		margin: 10px;
	}
</style>
