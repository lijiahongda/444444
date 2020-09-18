<template>
	<div class="app-container">
		<!--搜索部分-->
		<div class="filter-container">
			<el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" style="width: 220px;"/>
			<el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" style="width: 220px;"/>
			<el-select v-model="searchCondition.splId" filterable placeholder="请选择" style="width: 250px;">
				<el-option
					v-for="item in supplisers"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">导出全部</el-button>
		</div>
		<!-- 表格 -->
		<el-table
			:data="list"
			border
			:fit="true"
			style="width: 100%">
			<el-table-column align="center" prop="createTime" label="商品名" width="200"/>
			<el-table-column align="center" prop="createTime" label="子订单号" width="200"/>
			<el-table-column align="center" prop="createTime" label="支付单号" width="200"/>
			<el-table-column align="center" prop="createTime" label="退款单号" width="200"/>
			<el-table-column align="center" prop="createTime" label="退款金额" />
			<el-table-column align="center" prop="createTime" label="支付方式" />
			<el-table-column align="center" prop="createTime" label="退款开始时间" width="200"/>
			<el-table-column align="center" prop="createTime" label="退款完成时间" width="200"/>
			<el-table-column align="center" prop="createTime" label="客服经理审核通过时间" width="200"/>
			<el-table-column align="center" prop="createTime" label="退款状态" />
		</el-table>
		<div class="pagination-container"
			 align="center" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-sizes="[20]" :page-size="searchCondition.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
		</div>
	</div>
</template>
<script>
  import { orderWorkList,getSuppliserList } from '@/api/order'
  import { exportRefundOrderGoodsList } from '@/api/dataCenter' // 接口
  export default {
    data() {
      return {
        searchCondition: {
          page: 1, // 请求页数
          endTime:'',
          splId:'',
          startTime:'',
        },
        list:[],
        total: null,
        downloadLoading: false,
        supplisers:[]
      }
    },
    created(){
      this.getSuppliserList()
    },
    methods: {
      getSuppliserList(){
        getSuppliserList({pageSize:2000}).then(res=>{
			if(res.data.code == 200){
              this.supplisers = res.data.data
			}else{
			  this.$message.error(res.data.msg)
			}
		})
	  },
      // 列表数据
      getList() {
        orderWorkList(this.searchCondition).then(response => {
          if(response.data.code === 200){
            this.list = response.data.data.list
            this.total = response.data.data.total
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      // 搜索
      handleFilter() {
        this.searchCondition.page = 1
        this.getList()
      },
      // 导出
      handleDownload() {
        this.loading = true;
        let params = {
          startTime: this.searchCondition.startTime,
          endTime: this.searchCondition.endTime,
          splId: this.searchCondition.splId
		}
        exportRefundOrderGoodsList(params).then(res=>{
			if(res.data.code == 400){
              this.$message.warning(res.data.msg)
			}else{
              let query = `startTime=${this.searchCondition.startTime}&endTime=${this.searchCondition.endTime}&splId=${this.searchCondition.splId}`
              window.location.href=`http://order-api.yuelvhui.com/admin/exportRefundOrderGoodsList?${query}`
			}
		})

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v =>
          filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          })
        )
      },
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
      }
    }
  }
</script>
<style>
</style>
