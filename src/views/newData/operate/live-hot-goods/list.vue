<template>
	<div class="page">
		<router-link :to="{path:'/operate/live-hot-goods/add'}">
			<el-button type="primary" >新增</el-button>
		</router-link>
		<el-table
			:data="tableData.list"
			border
			style="width: 100%">
			<el-table-column align="center" prop="activity_title" label="标题" > </el-table-column>
			<el-table-column align="center" prop="activity_desc" label="简介" width="180"></el-table-column>
			<el-table-column align="center" prop="created_time" label="创建时间" width="180"> </el-table-column>
			<el-table-column align="center"  label="操作" width="150" fixed="right">
				<template slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>

				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:page-size="searchCondition.limit"
				:total="tableData.total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script>
  import {
    getLiveSellWellList,
  } from '@/api/shops'
  export default {
    name: 'list',
	data(){
      return{
        dialogTableVisible: false,
        searchCondition:{
          page:1
		},
        tableData:{
          list:[]
		}
	  }
	},
	created(){
      this.getLiveSellWellList();
	},
	methods:{
      getLiveSellWellList(){
        getLiveSellWellList(this.searchCondition).then(res=>{
          if(res.data.code == 200) {
            this.tableData = res.data.data;
		  }
		})
	  },
      handleEdit(row){
        this.$router.push({path: '/operate/live-hot-goods/add',query:{id:row.id}})
	  },
      handleCurrentChange(val){
        this.searchCondition.page = val;
        this.getLiveSellWellList()
	  }
	}
  }
</script>

<style scoped>
	.page{
		padding: 20px;
	}
</style>
