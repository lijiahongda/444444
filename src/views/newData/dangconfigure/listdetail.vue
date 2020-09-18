<template>
	<div class="danghome">
		<div class="top">
			<p style="float:left">分类名称：{{recommendName}}</p>
			<el-button type="primary" round style="float: right;" @click='addbook'>新增书籍</el-button>
		</div>
		<div class="content">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column  prop="id" label="序号">
				</el-table-column>
				<el-table-column prop="" label="书籍封面">
					<template slot-scope="scope">
						<img :src='scope.row.imageUrl' style="width:80px;height:100px"/>
					</template>
				</el-table-column>
				<el-table-column prop="bookName" label="书籍名称">
				</el-table-column>
				<el-table-column prop="categoryName" label="所属分类">
				</el-table-column>
				<el-table-column prop="" label="是否首页展示">
					<template slot-scope="scope">
						<span v-show="scope.row.isTop==1">是</span>
						<span v-show="scope.row.isTop==0">否</span>
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="当前顺序">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="delclass(scope.row.id)">删除</el-button>
						<el-button type="text" size="small" @click="editclass(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="" :visible.sync="dialogFormVisible">
			<el-form :model='form'>
				<el-form-item label="排序:" :label-width="formLabelWidth">
					<el-input v-model="form.sorts" autocomplete="off" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="是否首页展示:" :label-width="formLabelWidth">
						<el-radio v-model='form.radio' :label="1">是</el-radio>
						<el-radio v-model='form.radio' :label="0">否</el-radio>
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
	import {getDdRecommendBookList, delDdRecommendBook,upDdRecommendBook} from '@/api/admin'
	export default {
		data() {
			return {
				tableData: [],
				sort:'',
				page:1,
				pageSize:20,
				recommendName:'',
				form:{
					radio:'',
					sorts:0
				},
				dialogFormVisible:false,
				formLabelWidth:'120px',
				cid:'',
				total:0
			}
		},
		methods: {
			// 获取列表数据
			getList(cid) {
				var data={
					page:this.page,
					pageSize:this.pageSize,
					category_id:cid
				}
				getDdRecommendBookList(data).then(res=>{
					console.log(res.data)
					if(res.data.code==200){
						this.tableData=res.data.data.list
						this.total=res.data.data.total
						this.page=res.data.data.page
						this.pageSize=res.data.data.pageSize
					}
				})
			},
			// 添加书籍
			addbook() {
				this.$router.push({path:'/dangconfigure/dangaddbook',query:{id:this.$route.query.id,recommendName:this.recommendName}});
				// console.log(this.recommendName)
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.loading = true;
			    this.page = val;
			    this.getList(this.$route.query.id)
			},
			// 删除本条数据
			delclass(id) {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					 delDdRecommendBook({id:id}).then(res=>{
						if(res.data.code==200){
							  this.$message({
								  message:"删除成功",
								  type:"success"
							  })
							  this.getList(this.$route.query.id)
						}else{
						  this.$message({
							  message:"删除失败,请重试",
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
			editclass(row){
				this.cid=row.id
				this.form.radio=row.isTop
				this.form.sorts=row.sort
				console.log(row)
				this.dialogFormVisible=true
			},
			onSubmit(){
				var data={
					id:this.cid,
					top_status:this.form.radio,
					sort:this.form.sorts,
					recommend_category_id:this.$route.query.id
				}
				upDdRecommendBook(data).then(res=>{
					if(res.data.code==200){
						this.$message({
							message:"修改成功",
							type:"success"
						})
						this.dialogFormVisible=false
						this.getList(this.$route.query.id)
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
			if (this.$route.query.id) {
				this.getList(this.$route.query.id)
			}
			this.recommendName=this.$route.query.recommendName
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
