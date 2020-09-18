<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="专题名称：">
				<el-col>
					<el-input v-model="obj.keyword" placeholder="请输入专题名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<router-link to="/operate/couponAdd">
					<el-button type="primary">添加专题</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="id" label="专题ID" align="center">
				</el-table-column>
				<el-table-column fixed prop="ac_name" label="专题名称" align="center">
				</el-table-column>
				<el-table-column prop="created_at" label="添加时间" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
							<el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="obj.page" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"  @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getActivitiesCoupons,deleteActivitiesCoupons} from '@/api/shops'
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
		  activity_name:'',
		   obj:{
		  	page:this.pageIndex,
		  	keyword:'',
		  }
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
		onEdit(id){
			this.$router.push('/operate/couponAdd?id='+id)
		},
        // 列表数据
        getList() {
			getActivitiesCoupons(this.obj).then(res=>{
				if(res.data.code==200){
					let dataList = res.data.data;
					this.list = dataList
					this.total = res.data.count;
					this.pageTotal = res.data.count
				}
			})
        },
		//保存
		onSearch(type,row){//type=1添加 type=2编辑
			this.obj.page = 1;
			this.getList()
		},
		// 删除
		onDel(row){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				deleteActivities({id:`${row.id}`}).then(res=>{
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
        // 分页
        handleSizeChange(val) {
			this.obj.page= 1;
			this.getList()
		},
        handleCurrentChange(val) {
            this.obj.page = val
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
