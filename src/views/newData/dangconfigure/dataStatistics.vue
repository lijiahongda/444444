<template>
	<div class="dangstatistics">
		<!-- <div class="top">
			<p class="title">首页点击</p>
			<div class="statistics">
				<div class="top_one">
					<div class="fication">儿童类</div>
					<p>11.1-11.7</p>
					<p>点击量：9.9万</p>
				</div>
				<div class="top_one">
					<div class="fication"> 老年类</div>
					<p>11.1-11.7</p>
					<p>点击量：9.9万</p>
				</div>
				<div class="top_one">
					<div class="fication">工具类</div>
					<p>11.1-11.7</p>
					<p>点击量：9.9万</p>
				</div>
				<div class="top_one">
					<div class="fication">全部分类</div>
					<p>11.1-11.7</p>
					<p>点击量：9.9万</p>
				</div>
			</div>
		</div>
		<div class="content">
			<p class="title">一周内分类点击量从高到低</p>
			<el-table :data="tableData" border style="width: 96%;margin:0 auto;">
				<el-table-column prop="date" label="序号" width="180">
				</el-table-column>
				<el-table-column prop="name" label="一级分类名称" width="180">
				</el-table-column>
				<el-table-column prop="address" label="二级分类名称">
				</el-table-column>
				<el-table-column prop="address" label="点击量">
				</el-table-column>
			</el-table>
			<div class="pagination-container" style="text-align:right;">
				<el-pagination :current-page="pages" :page-sizes="[10]" :page-size="pageSizes" :total="totals" background
				 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChanges" @current-change="handleCurrentChanges" />
			</div>
		</div> -->
		<div class="footer">
			<p class="title">一周内购买量从高到低</p>
			<el-table :data="tableDatas" border style="width: 96%;margin:0 auto;">
				<el-table-column prop="goods_id" label="序号" width="180">
				</el-table-column>
				<el-table-column prop="c1_name" label="一级分类名称" width="180">
				</el-table-column>
				<el-table-column prop="c2_name" label="二级分类名称">
				</el-table-column>
				<el-table-column prop="goods_name" label="书籍名称">
				</el-table-column>
				<el-table-column prop="num" label="数量">
				</el-table-column>
			</el-table>
			<div class="pagination-container" style="text-align:right;">
				<el-pagination :current-page="page" :page-sizes="[10]" :page-size="pageSize" :total="total" background
				 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>

	</div>
</template>

<script>
	import {getDdPurchases} from '@/api/admin'
	export default {
		data() {
			return {
				tableData:[],
				tableDatas:[],
				channel_id:8,
				page:1,
				pageSize:10,
				total:0,
				pages:1,
				pageSizes:10,
				totals:0
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList(){
				var data={
					page:this.page,
					pageSize:this.pageSize,
					channel_id:this.channel_id
				}
				getDdPurchases(data).then(res=>{
					console.log(res)
					if(res.data.code==200){
						this.tableDatas=res.data.data.list
						this.total=res.data.data.total
						this.page=res.data.data.page
						this.pageSize=res.data.data.pageSize
					}else{
						console.log(res.data)
					}
				})
			},
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.loading = true;
			    this.page = val;
			    this.getList()
			},
			handleSizeChanges(val) {},
			handleCurrentChanges(val) {
				this.loading = true;
			    this.pages = val;
			    // this.getLists()
			},
		}
	}
</script>

<style scoped lang="scss">
	.dangstatistics{
		margin-left:24px;
	}
	.statistics{
		display: flex;
		width:96%;
		margin:0 auto;
	}
.fication{
	width:100px;
	height:100px;
	border: 1px solid #000000;
	border-radius: 50%;
	text-align: center;
	line-height: 100px;
	margin:0 auto;
}
.title{
	font-size: 20px;
	line-height:40px;
	font-weight:600
}
.top_one{
	// margin-right: 30px;
	// width:150px;
	flex: 1;
	text-align: center;
}
</style>
