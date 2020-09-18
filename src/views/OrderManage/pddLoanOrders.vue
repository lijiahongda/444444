<template>
  <div id="outsideOrders"
       v-loading="loading">
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item>
        <el-date-picker v-model="searchCondition.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="申请日期时间"
                        style="width: 150px;" />
        <el-date-picker v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="申请日期时间"
                        style="width: 150px;" />
      </el-form-item>
      <el-select v-model="searchCondition.ext1"
                 clearable
                 placeholder="请选择">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item.value"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">点我可以搜索</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20" class="order_list">
			<el-col class="sku_num">合计：<span>{{tableData.total}}</span></el-col>
		</el-row>
    <el-table :data="tableData.list"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="id"
                       fixed
                       label="序号"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="mid"
                       label="用户ID"> </el-table-column>
      <el-table-column align="center"
                       prop="name"
                       label="用户名称"></el-table-column>
      <el-table-column align="center"
                       prop="mobile"
                       label="用户手机号"> </el-table-column>
      <el-table-column align="center"
                       prop="ext1"
                       label="优惠券状态"> </el-table-column>                    
      <el-table-column align="center"
                       prop="orderCreateTime"
                       label="申请时间"> </el-table-column>
    </el-table>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="searchCondition.page"
                     :page-sizes="[20]"
                     :page-size="searchCondition.limit"
                     :total="tableData.total"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import {
  getPddLoanOrders,
} from '@/api/order' // 接口
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      selBlous: false,
      selBlousList: [],
      selBlousTotal: '',
      blousPage: 1,
      orderNo: '',
      searchCondition: {
        page: 1
      },
      options: [
        {id:0,value:'未使用'},//0 未使用 1已使用  2已作废
        {id:1,value:'已使用'},
        {id:2,value:'已作废'},
      ]
    }
  },
  created () {
    this.getPddLoanOrders();
  },
  methods: {
    getPddLoanOrders () {
      this.loading = true;
      getPddLoanOrders(this.searchCondition).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
    },
    onSubmit () {
      this.searchCondition.page = 1
      this.getPddLoanOrders()
    },
    handleClick (row) {
      console.log(row);
    },
    handleCurrentChange (val) {
      this.searchCondition.page = val;
      this.getPddLoanOrders();
    },

  },

}

</script>
<style scoped>
#outsideOrders {
  padding: 20px;
}
</style>

<style type="scss" scoped="scoped">
    .goodsName{
        display: block;
    }
	.order_list{
		margin: 30px 0;
	}
    .order_list .sku_num,.order_list span[data-v-1bad5b9a]{
        color: #999;
		font-size: 16px;
        line-height:36px
    }
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>

