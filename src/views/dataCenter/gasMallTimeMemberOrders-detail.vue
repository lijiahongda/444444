<template>
  <div class="app-container">
    <!--搜索部分-->
     <div class="block">
         <el-form ref="form" label-width="120px" :inline="true" >
          <!-- <el-form-item >
                  <el-date-picker
                      v-model="searchCondition.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="下单日期时间"
                      style="width: 150px;" />
                  <el-date-picker
                      v-model="searchCondition.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="下单日期时间"
                      style="width: 150px;"/>
          </el-form-item> -->
      <!-- </el-form-item> -->
			<el-form-item >
              <el-input
                  v-model="searchCondition.keyword"
                  placeholder="商品名称/订单编号" style="width: 300px;"/>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="search">点我可以搜索</el-button>
          <!-- <el-button type="danger" @click="onEmpty">点我清空条件</el-button> -->
      </el-form-item>
  </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="orderGoodsList" border style="width: 100%">
					<el-table-column prop="ordersn_son" align="center" label="子订单编号" width="180"></el-table-column>
					<el-table-column prop="goods_name" align="center" label="商品名称" width="300"></el-table-column>
					<el-table-column prop="goods_id" align="center" label="商品编号"></el-table-column>
					<el-table-column prop="goods_num" align="center" label="订购数量"></el-table-column>
					<el-table-column prop="goods_spec" align="center" label="商品规格"width="150" ></el-table-column>
					<el-table-column prop="goods_price_orig" align="center" label="商品原价"></el-table-column>
					<el-table-column prop="goods_price_member" align="center" label="会员价"></el-table-column>
					<el-table-column prop="goodsBalanceAverage" align="center" label="使用余额金额"></el-table-column>
					<el-table-column prop="actual_price" align="center" label="售卖价格"></el-table-column>
					<el-table-column prop="supplier_name" align="center" label="供应商" width="200"></el-table-column>
					<el-table-column prop="receiving_time" align="center" label="确认收货时间"></el-table-column>
					<el-table-column prop="refund_status" align="center" label="退款状态"></el-table-column>
					<el-table-column prop="is_send" align="center" label="发货状态">
					</el-table-column>
          <el-table-column prop="created_at" align="center" width="200px" label="下单时间">
					</el-table-column>
				</el-table>
        
        <div class="pagination-container" style="text-align:right;margin-bottom:50px">
        <el-pagination
            :current-page="searchCondition.page"
            :page-sizes="[10]"
            :page-size="searchCondition.limit"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        </div>
  </div>
</template>
<script>
import {getMallOrderStatisticsByHoursDetail} from '@/api/order' // 接口

export default {
  data() {
    return {
     searchCondition: {
        page: 1,
        sort:'',
        startTime:'',
        endTime:'',
        hour:'',
        keyword:'',
    },
    loading:false,
    //   搜索日期
     pickerOptions: {
          shortcuts: [
           {
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
            },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
        },
        orderGoodsList:[],
        hour:'',
        startTime:'',
        endTime:'',
        total:0,
    }
  },
  created(){
    this.hour = this.$route.query ? this.$route.query.hour : this.$router.query ? this.$router.query
    .hour : '';
     this.startTime = this.$route.query ? this.$route.query.startTime : this.$router.query ? this.$router.query
    .startTime : '';
     this.endTime = this.$route.query ? this.$route.query.endTime : this.$router.query ? this.$router.query
    .endTime : '';
    if(this.hour)
    {  
        // console.log(this.$route.query, '323232')
        this.searchCondition.hour=this.hour
        this.searchCondition.startTime=this.startTime
        this.searchCondition.endTime=this.endTime
        this.getList();
    }
	  
    // this.getMallOrderStatisticsType();
  },
  methods: {
    // 列表数据
    getList() {
      this.loading = true;
      getMallOrderStatisticsByHoursDetail(this.searchCondition).then(res => {
        if(res.data.code === 200){
          this.orderGoodsList= res.data.data.list;
          this.total  = res.data.data.total;
          this.loading = false;
        } else if( res.data.code === 400){
          this.$message.error(res.data.msg)
        }
      })
    },
    // 搜索
    handleSizeChange(val) {},
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
    },

    search(){
      // alert(1)
      console.log(this.searchCondition, '9999')
      this.getList()
    }


  }
}
</script>
<style scoped="scoped">
	.right{
        margin-right:20px;
    }
    .bot{
        margin-bottom: 30px
    }
    .el-date-editor .el-range-separator{
        padding:0!important
    }
    .el-range-editor--medium.el-input__inner {
        height: auto;
    }
    .table{
        margin-top:30px;
    }
</style>
