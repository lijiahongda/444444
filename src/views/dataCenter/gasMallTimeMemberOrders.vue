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
         <el-select v-model="searchCondition.isMemberGoods" placeholder="包含大礼包" clearable class="right bot">
            <el-option
            v-for="item in isMemberGoods"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
        <!-- <el-input v-model="searchCondition.mobile" placeholder="请输入用户手机号" style="width:200px" class="right bot"></el-input> -->

        <el-button type="primary" class="right" @click="getList">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table  :data="list" :fit="true" border class="table" v-loading="loading"> 
        <el-table-column prop="hour" label="小时"  align="center"></el-table-column>
        <el-table-column prop="goodsNum" label="订单量"  align="center"></el-table-column>
        <el-table-column prop="gmv" label="GMV" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope" align="center">
              <el-button type="text" @click="deltail(scope.row.hour)" size="small">查看详情</el-button>
                <!-- <router-link :to="{path:'',query:{id:scope.row.memberId}}" target="_blank">
                    <el-button type="text" size="small">查看详情</el-button>
                </router-link> -->
            </template>
        </el-table-column>
    </el-table>
  
  </div>
</template>
<script>
import {getMallOrderStatisticsType,getMallOrderStatisticsByHours} from '@/api/order' // 接口
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
        // mobile:''
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
        list:[]
    
    }
  },
  created(){
	  this.getList();
    this.getMallOrderStatisticsType();
  },
  methods: {
    // 列表数据
    getList() {
      this.loading = true;
      getMallOrderStatisticsByHours(this.searchCondition).then(res => {
        if(res.data.code === 200){
			      this.list = res.data.data //* 加个一层  没用的注释 为了推代码
            this.loading = false;
		    }
      })
    },
    // 搜索
    getMallOrderStatisticsType() {
      // this.loading = true;
      getMallOrderStatisticsType().then(res => {
        if(res.data.code === 200){
            this.typeList = res.data.data //* 加个一层  没用的注释 为了推代码
            // this.loading = false
          }
      })
    },
    deltail(hour){
      // this.searchCondition.timeDate.split(",");
      // console.log(this.searchCondition.timeDate.split(","))////

      var startTime='';
       var endTime='';
      if(this.searchCondition.timeDate)
      {
         startTime=this.searchCondition.timeDate[0];
         endTime=this.searchCondition.timeDate[1];
      }

      let routeUrl=this.$router.resolve({  
            path: '/user-center/gasMallTimeMemberOrders-detail',  
            query: {   
                hour: hour,
                startTime:startTime,
                endTime:endTime,
            }  
        }) 
         window.open(routeUrl .href, '_blank'); 
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
