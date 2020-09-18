<template>
<div class="lottery">
	<el-button type="plain" @click="addLottery">新增抽奖活动</el-button>
	<el-table
		:data="tableData"
		v-loading="loading"
		style="width: 100%"
		border stripe :fit="true">
		<el-table-column
			prop="activity_name"
			label="活动名称"
			align="center">
		</el-table-column>
		<el-table-column
			prop=""
			label="活动时间"
			align="center"
			width="300">
			<template slot-scope="scope">
				{{scope.row.start_time}}-{{scope.row.end_time}}
			</template>
		</el-table-column>
		<el-table-column label="操作" width="180" align="center">
			<template slot-scope="scope">
				<el-button @click="edit(scope.row)">编辑</el-button>
				<!-- <el-button @click="delRow(scope.row)">删除</el-button> -->
			</template>
		</el-table-column>
	</el-table>
</div>
</template>

<script>
  import {
    getLotteryList
  } from '@/api/order'
  export default {
    name: 'lottery',
	data(){
      return {
        loading: false,
        tableData:[]
	  }
	},
	created(){
      this.getLotteryList()
	},
	methods:{
      getLotteryList(){
        getLotteryList().then(res=>{
          if(res.data.code === 200){
            this.tableData = res.data.data
		  }
		})
	  },
      addLottery(){
        this.$router.push({path: '/operate/add-lottery'})
	  },
	  edit(row){
		  this.$router.push({path: '/operate/add-lottery',query:{id:row.la_id}})
	  },

	}
  }
</script>

<style scoped>
.lottery{
	padding: 20px;
}
	.el-button{
		margin-bottom: 20px;
	}
</style>
