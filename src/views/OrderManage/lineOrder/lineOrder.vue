<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 150px;"/>
      <el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 150px;"/>
      <el-select v-model="searchCondition.payStatus" placeholder="支付状态" style="width: 108px;">
        <el-option v-for="item in payState" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-select v-model="searchCondition.supplierId" placeholder="供应商" style="width: 108px;">
        <el-option v-for="item in Supplier" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id"/>
      </el-select>
      <el-input v-model="searchCondition.orderSn" placeholder="订单编号" style="width: 200px;"/>
	  <el-input v-model="searchCondition.contcatsTel" placeholder="用户手机" style="width: 200px;"/>
	  <el-input v-model="searchCondition.proudctName" placeholder="线路名称" style="width: 200px;"/>

      <el-button v-waves class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button v-waves class="" type="primary" @click="clear">清空条件</el-button>
      <!-- <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">导出全部</el-button> -->
    </div>
    <!-- 表格 -->
    <el-table
      :data="lineLists"
      border
	  :fit="true"
      style="width: 100%">
      <el-table-column
	  	align="center"
        prop="createdAt"
        label="下单时间"
        width="200"/>
      <el-table-column
	  	align="center"
        prop="isMvp"
        label="是否会员"
        width="100"/>
      <el-table-column
	  	align="center"
		width="400"
        prop="proudctName"
        label="预定线路名称"/>
      <el-table-column
	  	align="center"
        prop="productCode"
        label="线路编号"
        width="100"/>
      <el-table-column
	  	align="center"
        prop="supplierName"
        label="供应商"
        width="120">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="contactsName"
        label="联系人姓名"
        width="100">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="contcatsTel"
        label="联系人电话"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="travelNum"
        label="出行人数"
        width="80">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="actualPrice"
        label="支付金额"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="departAndDest"
		width="200"
        label="出发地/目的地">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="orderSn"
        label="订单编号"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="paySn"
        label="支付单号"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        prop="payStatus"
        label="支付状态"
        width="200">
      </el-table-column>
      <el-table-column
	  	align="center"
        label="操作"
        width="">
        <template slot-scope="scope">
          <router-link to="/orderManage/line-detail">
            <router-link :to="'line-detail?id=' + scope.row.orderSn">
              <el-button type="text" size="small">查看详情</el-button>
            </router-link>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination v-show="total>0" :current-page="searchCondition.page" :page-sizes="[20]" :total="total" background layout="total, sizes, prev, pager, next, jumper"  @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { lineList, supplierList } from '@/api/line'
// 支付状态
const payState = [
  { key: 0, display_name: '待支付' },
  { key: 200, display_name: '已支付' },
  { key: 500, display_name: '已取消' }
]

// 不知道具体干啥的 等待问龙爷 支付状态
const payStateKeyValue = payState.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  directives: {
    waves
  },
  // 不知道具体干啥的 等待问龙爷 支付状态
  payStateFilter(type) {
    return payStateKeyValue[type]
  },

  data() {
    return {
		searchCondition: {
			page: 1, // 请求页数
		},
		lineLists: [],//线路列表
		total: null,
		payState, // 支付状态
		Supplier:[], // 供应商
		downloadLoading: false,
		tableData: [
			{
				topLevel: '跟团游',
				taxonomy: '周边游',
				subCategory: '京津周边游'
			},
			{
				topLevel: '跟团游',
				taxonomy: '周边游',
				subCategory: '京津周边游'
			},
			{
				topLevel: '跟团游',
				taxonomy: '周边游',
				subCategory: '京津周边游'
			},
			{
				topLevel: '跟团游',
				taxonomy: '周边游',
				subCategory: '京津周边游'
			}
		]
    }
  },
  created(){
	this.getSupplierList()
	this.getList()
  },
  methods: {
    // 列表数据
    getList() {
      this.listLoading = true
      lineList(this.searchCondition).then(response => {
        if(response.data.code === 200){
			this.lineLists = response.data.data.list
        	this.total = response.data.data.total
			// Just to simulate the time of the request
			setTimeout(() => {
			this.listLoading = false
			}, 1.5 * 1000)
		}
      })
	},
	clear(){
		this.searchCondition = {
			page: 1
		}
	},
	getSupplierList(){
		supplierList().then(res=>{
			if(res.data.code === 200){
				this.Supplier = res.data.data
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
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = [
          'id',
          'title',
          'author',
          'pageviews',
          'display_time'
        ]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
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
    // 查看详情
    handleUpdate() {
      this.$router.push({ path: '/line-detail', query: { id: 1 }})
    },
    handleCurrentChange(val) {
      this.searchCondition.page = val
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
