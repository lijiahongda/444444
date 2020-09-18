<template>
  <div class="app-container">
    <!--搜索部分-->
     <div class="block">
         <el-date-picker class="right bot"
            v-model="searchCondition.timeDate"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
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
        <el-select v-model="searchCondition.goodsCategory" placeholder="类目" clearable class="bot right">
            <el-option
                v-for="item in firstCategorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
        </el-select>
        <el-button type="primary" class="right" @click="getList">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table  :data="list.list" :fit="true" border class="table" v-loading="loading"> 
        <el-table-column prop="name" label="类目名称" align="center"></el-table-column>
        <el-table-column prop="channelName" label="渠道名称" align="center"></el-table-column>
        <el-table-column prop="count" label="订单量" align="center"></el-table-column>
        <el-table-column prop="gmv" label="Gmv" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope" align="center">
                <router-link :to="{path:'/user-center/gasMallClassOrders-detail',query:{goodsCategory:scope.row.goodsCategory}}" target="_blank">
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
import {getMallOrderStatisticsType,getMallOrderStatisticsByCategory} from '@/api/order' // 接口
import { getFirstCategorys} from '@/api/shops' // 接口
const isMemberGoods = [
    { id: '0', name: '否' },
    { id: '1', name: '是' },
   
]
export default {
  data() {
    return {
      searchCondition: {
          page: 1,
          sort:'',
          timeDate:[],
          // startTime:'',
          // endTime:"",
          mobile:'',
          goodsCategory:'',
      },
      isMemberGoods,
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
        typeList: [],
        list:[],
        firstCategorys:[]//类目 
      }
  },
  created(){
	  this.getList();
    this.getMallOrderStatisticsType();
    this.getFirstCategorys();
  },
  methods: {
    // 列表数据
    getList() {
      this.loading = true;
      getMallOrderStatisticsByCategory(this.searchCondition).then(res => {
        if(res.data.code === 200){
            console.log(res.data,111111111,"类目商城订单接口")
			      this.list = res.data.data //* 加个一层  没用的注释 为了推代码
		        this.loading = false
		      }
      })
    },
    // 搜索
    getMallOrderStatisticsType() {
      // this.loading = true;
      getMallOrderStatisticsType().then(res => {
        if(res.data.code === 200){
            // console.log(res.data,111111111,"商城订单接口")
			      this.typeList = res.data.data //* 加个一层  没用的注释 为了推代码
			 	    // this.loading = false
		    }
      })
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
</style>
