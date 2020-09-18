<!--suppress ALL -->
<template>
  <div class="app-container">
    <p style="color: red">{{msg}}</p>
    <!--搜索部分-->
    <el-table v-if="!switchChart"
              :data="list"
              :fit="true"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column fixed
                       prop=""
                       label="支付单号"
                       width="100"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.payFormNo ? scope.row.payFormNo : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="商品名称"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.goodsName ? scope.row.goodsName : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="订单编号"
                       width="140"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ordersnSon ? scope.row.ordersnSon : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="退给用户的运费"
                       align="center">
        <template slot-scope="scope">
          <span>{{scope.row.freight ? scope.row.freight : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="退款状态"
                       width="100"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.refundStatus ? scope.row.refundStatus : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="支付方式"
                       width="100"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.payType ? scope.row.payType : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="商品退款金额"
                       align="center"
                       width="110">
        <template slot-scope="scope">
          {{scope.row.actualPrice ? scope.row.actualPrice : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop=""
                       label="实际退款金额"
                       align="center"
                       width="110">
        <template slot-scope="scope">
          {{scope.row.adminRefundPrice ? scope.row.adminRefundPrice : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="商品使用优惠券金额"
                       align="center"
                       width="110">
        <template slot-scope="scope">
          {{scope.row.goodsCouponAverage ? scope.row.goodsCouponAverage : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="申请类型"
                       width="100"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.refundType ? scope.row.refundType : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="申请时间"
                       align="center"
                       width="160">
        <template slot-scope="scope">
          {{scope.row.createTime ? scope.row.createTime : '-' }}
        </template>
      </el-table-column>

      <el-table-column prop=""
                       label="审核状态"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.checkStatus ? scope.row.checkStatus : '-' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100"
                       align="center">
        <template slot-scope="scope"
                  align="center">
          <router-link target="_blank"
                       :to="{path:'refundOrder-detail',query:{ordersnSon:scope.row.ordersnSon}}">
            <el-button type="text"
                       size="small">查看详情</el-button>
          </router-link>

          <!-- <el-button type="text" size="small" v-if="scope.row.refundStatus === 31" @click="handleApprove(scope.row)">审核</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button :disabled="disabled"
                 @click="createRefundSettlement">生成退款结算单</el-button>
    </div>

  </div>
</template>
<script>
import { getServiceList, checkRefund, getEligibilityRefundOrders, createRefundSettlement, getAdminUserRole } from '@/api/admin' // 接口
import { getTabChannels } from '@/api/shops' // 接口
export default {
  data () {
    return {
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: '140px',
      form: {},
      searchCondition: {
        page: 1,
        role: this.role
      },
      msg: '',
      total: null,
      downloadLoading: false,
      tableData: [
        { date: "2018-10-01" }
      ],
      switchChart: false,
      list: [],
      role: '',
      orderCount: {},
      options2: [{
        value: '31',
        label: '待审核'
      }, {
        value: '35',
        label: '审核通过'
      }],
      isMemberGoods: [{
        value: '0',
        label: '否'
      }, {
        value: '1',
        label: '是'
      }],
      disabled: false
    }
  },
  mounted () {

    this.getTabChannels();
    this.getAdminUserRole();
  },
  methods: {
    // 列表数据
    getList () {
      getEligibilityRefundOrders({ role: this.role }).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.data.list
          this.msg = res.data.data.msg
          this.orderCount = res.data.data.countList
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getAdminUserRole () {
      getAdminUserRole().then(res => {
        if (res.data.code == 200) {
          this.role = res.data.roleType;
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    createRefundSettlement () {
      createRefundSettlement({ role: this.role, refundSetOrderInfo: this.multipleSelection }).then(res => {

        this.disabled = true
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.$router.push({ path: '/refund-payment-list' })
        } else {
          this.$message.error(res.data.msg + ' , 请刷新页面重试');
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 推广渠道
    getTabChannels () {
      getTabChannels().then(res => {
        console.log(res)
        this.orderSource = res.data;
      })
    },
    onSubmit () {
      this.searchCondition.page = 1
      this.getList()
    },
    onEmpty () {
      this.searchCondition = {
        page: 1,
      }
    },
    // 搜索
    handleFilter () {
      this.searchCondition.page = 1
    },
    //准备审核
    handleApprove (row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 审核
    handleCheck (status) {
      let params = {
        recordId: this.form.recordId,
        adminRefundContent: this.form.adminRefundContent,
        adminRefundPrice: this.form.adminRefundPrice,
        checkType: status,
        adminServiceType: this.form.adminServiceType,
      }
      checkRefund(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功');
          this.dialogFormVisible = false;
          this.getList();
        }
      })
    },
    // 分页
    handleSizeChange (val) { },
    handleCurrentChange (val) {
      this.searchCondition.page = val
      this.getList()
    }
  }
}
</script>
<style type="scss" scoped="scoped">
.goodsName {
  display: block;
}
.order_list {
  margin: 30px 0;
  font-size: 1rem;
  color: #999;
  font-size: 16px;
}
.order_list span {
  font-size: 18px;
  color: #666;
}
.sku_num {
  float: left;
  width: auto;
}
.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
