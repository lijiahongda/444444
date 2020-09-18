<template>
  <div class="app-container">
    <!--搜索部分-->
     <div class="block">
        <el-date-picker class="right bot"
            v-model="searchCondition.startTime"
            type="datetime"
           value-format="yyyy-MM-dd hh:mm"
            placeholder="下单开始日期"
            style="width: 210px;" />
        <el-date-picker class="right bot"
            v-model="searchCondition.endTime"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="下单结束日期"
            style="width: 210px;"/> 
        <el-input v-model="searchCondition.ordersnSon" placeholder="请输入订单号" class="right bot" style="width: 200px;"></el-input>
        
        <el-button type="primary" class="right" @click="getList">搜索</el-button>

       <el-row :gutter="20" class="color">
			<el-col>商品总数：<span>{{list.total}}</span></el-col>
		</el-row> 
    </div>
    <!-- 表格 -->
    <el-table  :data="list.list" :fit="true" border class="table" v-loading="loading" > 
        <el-table-column fixed prop="ordersnSon" label="订单号" align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"  align="center"></el-table-column>
        <el-table-column prop="goodsId" label="会员ID"  align="center"></el-table-column>
        <el-table-column prop="memberMobile" label="会员手机号" align="center"></el-table-column>
        <el-table-column prop="memberTruename" label="会员真实姓名" align="center"></el-table-column>
        <el-table-column prop="payFormNo" label="支付单号" align="center"></el-table-column>
        <el-table-column prop="payStatus" label="支付状态" align="center"></el-table-column>
        <el-table-column prop="actualPrice" label="支付金额" align="center"></el-table-column>
        <el-table-column prop="goodsCouponAverage" label="优惠金额" align="center"></el-table-column>
        <el-table-column prop="payTime" label="支付时间" align="center"></el-table-column>
        <el-table-column prop="payType" label="支付类型" align="center"></el-table-column>
        <el-table-column prop="receiverName" label="收货人" align="center"></el-table-column>
        <el-table-column prop="receiverTel" label="收货手机号" align="center"></el-table-column>
    </el-table>
    
    <div class="pagination-container" style="text-align:right;">
        <el-pagination
            :current-page="list.page"
            :page-size="list.pageSize"
            :total="list.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
        />
    </div>

  </div>
</template>
<script>
import { getMallOrderStatisticsByProductId} from '@/api/order' // 接口
// import { getFirstCategorys} from '@/api/shops' // 接口

const isMemberGoods = [
    { id: '0', name: '否' },
    { id: '1', name: '是' },
   
]
const isMemberGoodsTypes = [
    { id: '1', name: '399大礼包' },
    { id: '2', name: '499大礼包' },
   
]
export default {
  data() {
    return {
     searchCondition: {
        page: 1,
        startTime:'',
        endTime:'',
        ordersnSon:'',
    },
   
    loading:false,
    //   搜索日期
    pickerOptions: {
        shortcuts: [
        {
        text: '最近3天',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
            picker.$emit('pick', [start, end]);
        },
        },
        {
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
    list:[],
    goodsId:0,
    
    }
  },
  created(){
        this.goodsId = this.$route.query ? this.$route.query.goodsId : this.$router.query ? this.$router.query
				.goodsId : ''
        if (this.goodsId) {
            this.getList()
        }
    // this.getMallOrderStatisticsType();
    // this.getFirstCategorys();
    // this.getSupplierMenuLists();
  },
  methods: {
    // 列表数据 单件商品订单统计
    getList() {
      this.loading = true;
      this.searchCondition.goodsId=this.goodsId
      getMallOrderStatisticsByProductId(this.searchCondition).then(res => {
        if(res.data.code === 200){
            console.log(res.data,111111111,"商城订单接口")
            this.list = res.data.data//* 加个一层  没用的注释 为了推代码
			this.loading = false
		}
      })
    },

   // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
    },
   

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
   .color{
       color:#333;
       font-size: 16px;
       line-height: 30px;
       display: flex;
       align-items: center;
   }
   .el-col-24{
       width: auto;
   }
</style>
