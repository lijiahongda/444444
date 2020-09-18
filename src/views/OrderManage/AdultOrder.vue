<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 150px;"/>
      <el-date-picker v-model="searchCondition.EndTime" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期时间" style="width: 150px;"/>
      <el-input v-model="searchCondition.mobile" placeholder="用户手机" style="width: 200px;"/>
      <el-input v-model="searchCondition.payFormNo" placeholder="支付单号" style="width: 200px;"/>
      <el-input v-model="searchCondition.orderNo" placeholder="订单编号" style="width: 200px;"/>
      <el-button class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">导出全部</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="payTime"
        label="下单时间"
        width="200"/>
      <el-table-column
        prop="orderNo"
        label="订单编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="payFormNo"
        label="支付单号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名/昵称"
        width="200">
        <span slot-scope="scope">
          {{scope.row.name ? scope.row.name : scope.row.nickname }}
        </span>

      </el-table-column>

      <el-table-column
        prop="mobile"
        label="手机号"
        width="200"/>
      <el-table-column
        prop="price"
        label="支付金额"
        width="200">
      </el-table-column>
      <el-table-column
        prop="payStatus"
        label="支付状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="paySource"
        label="支付方式"
        width="200">
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination :current-page="searchCondition.page" :page-sizes="[20]" :page-size="searchCondition.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { getJYKList, } from '@/api/article'
// 支付方式
const PaymentMethod = [
  { key: '微信', display_name: '微信' },
  { key: '支付宝', display_name: '支付宝' },
  { key: '银联', display_name: '银联' }
]
// 订单来源
const OrderSource = [
  { key: 'ios', display_name: 'ios' },
  { key: 'Android', display_name: 'Android' },
  { key: 'PC', display_name: 'PC' },
  { key: '小程序', display_name: '小程序' }
]
// 订单状态
const OrderState = [
  { key: '已取消', display_name: '已取消' },
  { key: '待确认', display_name: '待确认' },
  { key: '已确认', display_name: '已确认' },
  { key: '待入住', display_name: '待入住' },
  { key: '已入住', display_name: '已入住' },
  { key: '未入住', display_name: '未入住' },
  { key: '待退款', display_name: '待退款' },
  { key: '退款中', display_name: '退款中' },
  { key: '已退款', display_name: '已退款' }
]
// 不知道具体干啥的 等待问龙爷  订单来源
const OrderSourceKeyValue = OrderSource.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// 不知道具体干啥的 等待问龙爷 支付方式
const PaymentMethodKeyValue = PaymentMethod.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// 不知道具体干啥的 等待问龙爷 订单状态
const OrderStateKeyValue = OrderState.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  // 不知道具体干啥的 等待问龙爷 支付方式
  PaymentMethodFilter(type) {
    return PaymentMethodKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 订单来源
  OrderSourceFilter(type) {
    return OrderSourceKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 订单状态
  OrderStateFilter(type) {
    return OrderSourceKeyValue[type]
  },
  data() {
    return {
      searchCondition: {
        page: 1, // 请求页数
        typeId: 205,
      },
      list:[],
      total: null,
      PaymentMethod, // 支付方式
      OrderSource, // 订单来源
      OrderState, // 订单状态
      downloadLoading: false,
    }
  },
  created(){
    this.getList()
  },
  methods: {
    // 列表数据
    getList() {
      getJYKList(this.searchCondition).then(response => {
        if(response.data.code === 200){
          this.list = response.data.data.list
          this.total = response.data.data.total
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
