<!--suppress ALL -->
<template>
	<div class="app-container">
		
		<!--搜索部分-->
		<div class="new_tab"> 
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column  type="index" width="50" label="编号" align="center">
				</el-table-column>
				<el-table-column prop="main_title" label="标题" align="center">
				</el-table-column>
				<el-table-column prop="start_place" label="出发地	" align="center">
				</el-table-column>
				<el-table-column prop="end_place" label="目的地" align="center">
				</el-table-column>
				<el-table-column prop="price" label="人均消费" align="center">
  				</el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope" align="center">
						<router-link :to="{path:'/cust/caseShow',query:{id:scope.row.customized_id}}">
							<el-button type="text" size="small">查看详情</el-button>
						</router-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal"
			 background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令ist
	import {customizedProductGetList} from '@/api/cust'
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
		  startTime:'',
		  endTime:'',
		  type:'',
		  status:'',
		  params:''
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
			var obj = '/'+this.pageIndex + '/' + this.pageSize;
			customizedProductGetList(obj).then(res=>{
				if(res.data.code == 200){
					this.list = res.data.data.data;
					this.total = res.data.total || res.data.data.totalRaw;
					this.pageTotal = res.data.data.totalRaw;
				}
			})
        },
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        onEmpty() {
            this.pageIndex
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
