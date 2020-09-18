<template>
  <div class="app-container">
    <!--搜索部分-->
     <div class="block">
        <!-- <el-date-picker
            v-model="searchCondition.startTime"
            type="datetime"
           value-format="yyyy-MM-dd hh:mm"
            placeholder="下单开始日期"
            style="width: 210px;" />
        <el-date-picker
            v-model="searchCondition.endTime"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm"
            placeholder="下单结束日期"
            style="width: 210px;"/> -->
        

            <!-- <span class="demonstration">带快捷选项</span> -->
            <el-date-picker class="bot right"
                v-model="searchCondition.timeDate"
                type="datetimerange"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>


        <el-select v-model="searchCondition.sort" class="right bot" placeholder="请选择" clearable>
            <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
         <el-select v-model="searchCondition.isMemberGoods" placeholder="包含大礼包" clearable class="bot right">
            <el-option
            v-for="item in isMemberGoods"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
        <el-select v-model="searchCondition.isMemberGoodsType" placeholder="大礼包选择" clearable class="bot right">
            <el-option
            v-for="item in isMemberGoodsTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
        <el-select v-model="searchCondition.goodsCategory" placeholder="类目" clearable class="bot right">
            <el-option
                v-for="item in firstCategorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
        </el-select>
        <el-select class="right"
            v-model="searchCondition.splId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入供应商"
            :remote-method="remoteMethod"
            clearable
            :loading="loading">
            <el-option 
            v-for="item in supplierList" 
            :key="item.id" 
            :label="item.supplierName" 
            :value="item.id" />
        </el-select>

        <el-button type="primary" class="right" @click="getList">搜索</el-button>
        <router-link :to="{path:'/user-center/gasMallByMemberOrders'}">
            <el-button type="primary">用户订单统计</el-button>
        </router-link>
        <!-- <el-button type="primary" >用户订单统计</el-button> -->

       <el-row :gutter="20" class="color">
			<el-col>商品总数：<span>{{list.total}}</span></el-col>
            <el-col>商城订单的 GMV的统计：<span>{{list.totalGmv}}</span></el-col>
		</el-row> 
    </div>
    <!-- 表格 -->
    <el-table  :data="list.list" :fit="true" border class="table" v-loading="loading"> 
        <el-table-column prop="goodsId" label="商品ID"  align="center"></el-table-column>
        <el-table-column prop="category" label="商品类目"  align="center"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="" label="商品图片" align="center">
            <template slot-scope="scope">
                 <el-image
                    style="width: 100px;"
                    :src="scope.row.goodsImg"
                    :fit="'fill'">
                </el-image>
            </template>
        </el-table-column>
        <el-table-column prop="goodsNum" label="销量" align="center"></el-table-column>
        <el-table-column prop="gmv" label="Gmv" align="center"></el-table-column>
        <el-table-column prop="goodsPriceBuy" label="原价" align="center"></el-table-column>
        <el-table-column prop="goodsTotalPrice" label="售价" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope" align="center">
                <router-link :to="{path:'/user-center/gasMallOrderDetails',query:{goodsId:scope.row.goodsId}}" target="_blank">
                    <el-button type="text" size="small">查看详情</el-button>
                </router-link>
            </template>
        </el-table-column>
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
import { getMallOrderStatistics,getMallOrderStatisticsType,getSupplierMenuLists} from '@/api/order' // 接口
import { getFirstCategorys} from '@/api/shops' // 接口

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
        sort:'',
        timeDate:[],
        goodsCategory:'',
        splId:'',
        // startTime:'',
        // endTime:""
    },
    firstCategorys:[],
    isMemberGoods,
    isMemberGoodsTypes,
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
    // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
    // value2: '',



    typeList: [],
    list:[],
    supplierList:[]
    
    }
  },
  created(){
	this.getList();
    this.getMallOrderStatisticsType();
    this.getFirstCategorys();
    this.getSupplierMenuLists();
  },
  methods: {
    // 列表数据
    getList() {
      this.loading = true;
      getMallOrderStatistics(this.searchCondition).then(res => {
        if(res.data.code === 200){
            console.log(res.data,111111111,"商城订单接口")
            this.list = res.data.data //* 加个一层  没用的注释 为了推代码
			this.loading = false
		}
      })
    },
    // 供应商
    getSupplierMenuLists() {
    //   this.loading = true;
      getSupplierMenuLists({}).then(res => {
        if(res.data.code === 200){
            console.log(res.data,111111111,"商城订单接口")
			this.supplierList = res.data.data //* 加个一层  没用的注释 为了推代码
		    // this.loading = false
		}
      })
    },
    // 搜索
    getMallOrderStatisticsType() {
    //   this.loading = true;
      getMallOrderStatisticsType().then(res => {
        if(res.data.code === 200){
            console.log(res.data,111111111,"商城订单接口")
			this.typeList = res.data.data //* 加个一层  没用的注释 为了推代码
			// this.loading = false
		}
      })
    },
    remoteMethod(query) {
      console.log(query.length)
      if (query.length>1) {
        this.loading = true;
        getSupplierMenuLists({
          supplierName: query
        }).then(res => {
          if (res.data.code === 200){
            this.loading = false;
            this.supplierList = res.data.data.filter(item => {
              return item.supplierName.indexOf(query) > -1;
            });
          } else {
            this.supplierList = [];
            this.$message.warning(res.data.msg);
            this.loading = false;
          }
        })
      }
    },
   

    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
    },
    // 类目
    getFirstCategorys(){
        getFirstCategorys({'channel_id':0}).then(res=>{
            this.firstCategorys = res.data.data;
        })
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
