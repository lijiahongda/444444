<template>
  <div>
    <!--	筛选条件-->
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item label="商品编码："
                    label-width="100px">
        <el-select v-model="form.backTypes"
                   placeholder="请选择"
                   clearable
                   style="width: 220px;">
          <el-option label="10"
                     value="10" />
          <el-option label="20"
                     value="12" />
          <el-option label="30"
                     value="15" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称："
                    label-width="100px">
        <el-select v-model="form.orderStatus"
                   placeholder="在线状态"
                   clearable
                   style="width: 220px;">
          <el-option label="在线"
                     value="10" />
          <el-option label="离线"
                     value="12" />
          <el-option label="离开"
                     value="15" />
          <el-option label="隐身"
                     value="16" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品渠道："
                    label-width="100px">
        <el-select v-model="form.orderStatus"
                   placeholder="订单状态"
                   clearable
                   style="width: 220px;">
          <el-option label="是"
                     value="10" />
          <el-option label="否"
                     value="12" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品分类："
                    label-width="100px">
        <el-select v-model="form.orderStatus"
                   placeholder="订单状态"
                   clearable
                   style="width: 220px;">
          <el-option label="是"
                     value="10" />
          <el-option label="否"
                     value="12" />
        </el-select>
      </el-form-item>
      <el-form-item label="查询时间："
                    label-width="100px">
        <el-date-picker v-model="value1"
                        type="date"
                        placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="供应商："
                    label-width="100px">
        <el-select v-model="form.orderStatus"
                   placeholder="订单状态"
                   clearable
                   style="width: 220px;">
          <el-option label="是"
                     value="10" />
          <el-option label="否"
                     value="12" />
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label-width="100px"
                    style="padding-left:20px;">
        <el-button type="primary"
                   @click="onSearch"
                   plain
                   style="width:100px;margin-right:20px;">查询</el-button>
        <el-button type="info"
                   @click="onSearch"
                   plain
                   style="width:100px;">重置</el-button>
      </el-form-item>
    </el-form>
    <!--	表格-->
    <el-table :data="goodsList"
              border
              style="width:100%">
      <el-table-column prop="spu_id"
                       align="center"
                       label="商品编码"
                       fixed="left"></el-table-column>
      <el-table-column prop="name"
                       align="center"
                       label="商品名称"></el-table-column>
      <el-table-column prop="create_time"
                       align="center"
                       label="上架时间"></el-table-column>
      <el-table-column prop="category"
                       align="center"
                       label="商品分类"></el-table-column>
      <el-table-column prop="orderNum"
                       align="center"
                       label="下单次数"></el-table-column>
      <el-table-column prop="payNum"
                       align="center"
                       label="付款人数"></el-table-column>
      <el-table-column prop="orderPrice"
                       align="center"
                       label="下单金额"></el-table-column>
      <el-table-column prop="cost"
                       align="center"
                       label="成本"></el-table-column>
      <el-table-column prop="grossProfit"
                       align="center"
                       label="毛利"></el-table-column>
      <el-table-column prop="goodsChannel"
                       align="center"
                       label="商品渠道"></el-table-column>
      <el-table-column prop="spl_id"
                       align="center"
                       label="供应商"></el-table-column>
      <el-table-column prop="is_sell"
                       align="center"
                       label="是否售卖"></el-table-column>
      <el-table-column prop="saleRate"
                       align="center"
                       label="销售率"></el-table-column>
      <el-table-column prop="purchaseRate"
                       align="center"
                       label="复购率"></el-table-column>
      <el-table-column prop="collectionRate"
                       align="center"
                       label="收藏率"></el-table-column>
      <el-table-column fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--	分页-->
    <div class="pagination-container"
         style="text-align:right;margin-bottom:50px;padding-right:20px;">
      <el-pagination :current-page="page"
                     :page-size="pageSize"
                     :total="total"
                     background
                     layout="prev, pager, next, total, sizes, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>

  </div>
</template>
<script>
import { getGoodsList } from "@/api/shopComms"; // 接口

export default {
  name: "AllOrders",
  data () {
    return {
      value1: "",
      order: "",
      start_time: "2020.7.24",
      end_time: "2020.7.31",
      form: {
        backTypes: "", //银行
        orderStatus: "", //订单状态
        start_time: "", //默认时间为近7天
        end_time: "",
      },
      receiptTotal: {
        orderQuantity: "", //订单量
        totalAmount: "", //返佣总额
        UserCommission: "", //用户返佣
        GrossProfit: "", //毛利
      },
      //选择的收款时间段
      selectGatheringTime: [],
      goodsList: [], //商品列表
      page: 1, //当前页数
      pageSize: 10, //没页显示条数的选项
      total: 20, //总条数
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    //获取商品列表
    getList () {
      let _self = this;
      let params = {
        page: _self.page,
        pageSize: _self.pageSize,
      };
      getGoodsList(params).then((res) => {
        _self.goodsList = res.data.data.list;
        _self.total = res.data.data.count;
      });
    },
    //查看详情
    handleClick (e) {
      console.log(e);
      this.$router.push({
        path: "/selfSupport/Commodity/CommodityDetails",
        query: { id: e.id },
      });
    },
    onSearch () {
      console.log("这是搜索按钮被点击了");
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getList();
    },
  },
};
</script>

<style scoped>
.el-form--inline {
  margin-top: 30px !important;
}
.el-form-item {
  margin-bottom: 10px;
  margin-left: 0;
}
.app-container {
  padding: 10px;
}
</style>
