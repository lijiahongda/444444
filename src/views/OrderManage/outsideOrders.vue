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
                        placeholder="下单日期时间"
                        style="width: 150px;" />
        <el-date-picker v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="下单日期时间"
                        style="width: 150px;" />
      </el-form-item>
      <el-select v-model="searchCondition.orderSource"
                 clearable
                 placeholder="请选择">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item"
                   :value="index">
        </el-option>
      </el-select>
      <!--			<el-form-item>-->
      <!--				<el-select v-model="searchCondition.payStatus" placeholder="支付状态" clearable >-->
      <!--					<el-option-->
      <!--						v-for="item in payState"-->
      <!--						:key="item.key"-->
      <!--						:label="item.display_name"-->
      <!--						:value="item.key"-->
      <!--					/>-->
      <!--				</el-select>-->
      <!--			</el-form-item>-->

      <!--			<el-form-item>-->
      <!--				<el-select v-model="searchCondition.orderSource" placeholder="订单来源" clearable >-->
      <!--					<el-option-->
      <!--						v-for="item in orderSource"-->
      <!--						:key="item.id"-->
      <!--						:label="item.name"-->
      <!--						:value="item.id"-->
      <!--					/>-->
      <!--				</el-select>-->
      <!--			</el-form-item>-->

      <el-form-item>
        <el-input v-model="searchCondition.keyWord"
                  clearable
                  placeholder="订单编号/手机号"
                  style="width: 300px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">点我可以搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="otherorder()">上传订单</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.list"
              border
              style="width: 100%">
      <el-table-column align="center"
                       prop="goodsName"
                       fixed
                       label="商品名称"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="orderSn"
                       label="订单号"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       prop="orderSource"
                       label="来源"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="orderStatus"
                       label="订单状态"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       prop="jdOrderStatus"
                       label="京东订单状态"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       prop="orderCreateTime"
                       label="下单时间"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="name"
                       label="支付方式"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       prop="orderAmount"
                       label="付款金额（元)"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="promotionAmount"
                       label="订单佣金（元)"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       prop="centsStatus"
                       label="佣金状态"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop="memberMobile"
                       label="会员手机号"
                       width="180"> </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="80"
                       fixed="right">
        <template slot-scope="scope">
          <el-button @click="getOrderGoodsBonus(scope.row.orderSn)"
                     type="text"
                     size="small">详情</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="分佣"
               :visible.sync="selBlous"
               width="998px">
      <el-table :data="selBlousList"
                border
                style="width: 100%">
        <el-table-column prop="identity"
                         align="center"
                         label="身份"></el-table-column>
        <el-table-column prop="amount"
                         align="center"
                         label="分佣金额"></el-table-column>
        <el-table-column prop="memberMobile"
                         align="center"
                         label="姓名"></el-table-column>
        <el-table-column prop="createTime"
                         align="center"
                         label="分佣时间"></el-table-column>
      </el-table>

      <div class="pagination-container"
           style="text-align:right;">
        <el-pagination :current-page="blousPage"
                       :page-size="20"
                       :total="selBlousTotal"
                       background
                       layout="total, sizes, prev, pager, next, jumper"
                       @current-change="handleCurrentChange2" />
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {
  getOrderGoodsBonus
} from '@/api/admin'
import {
  getPddOrders,
  getOrherOrderSources
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
      options: []
    }
  },
  mounted () {
    this.getOrherOrderSources()
  },
  methods: {
    getPddOrders () {
      this.loading = true;
      getPddOrders(this.searchCondition).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
    },
    getOrderGoodsBonus (orderNo) {
      this.orderNo = orderNo;
      getOrderGoodsBonus({
        orderNo: orderNo,
        page: this.blousPage
      }).then(res => {
        if (res.data.code === 200) {
          this.selBlous = true;
          this.selBlousList = res.data.data.list
          this.selBlousTotal = res.data.data.total
        }

      })
    },
    getOrherOrderSources () {
      getOrherOrderSources().then(res => {
        this.options = res.data
        console.log(this.options)
      })
    },
    handleCurrentChange2 (val) {
      this.blousPage = val
      this.clickselBlous(this.orderNo)
    },
    onSubmit () {
      this.searchCondition.page = 1
      this.getPddOrders()
    },
    handleClick (row) {
      console.log(row);
    },
    handleCurrentChange (val) {
      this.searchCondition.page = val;
      this.getPddOrders();
    },
    otherorder () {
      this.$router.push('/importOtherOrder')
    }

  },
  created () {
    this.getPddOrders();
  }
}

</script>
<style scoped>
#outsideOrders {
  padding: 20px;
}
</style>
