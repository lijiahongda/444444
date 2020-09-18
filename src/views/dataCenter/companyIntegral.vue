<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <!-- <el-input v-model="searchCondition.keyWord" placeholder="手机号/姓名/昵称" style="width: 200px;" class="" @keyup.enter.native="handleFilter" prefix-icon='el-icon-search'/> -->
			<!-- <el-select v-model="searchCondition.memberType" clearable placeholder="会员类型" style="width: 200px;">
				<el-option v-for="item in memberTypes" :key="item.key" :label="item.display_name" :value="item.key" />
			</el-select> -->

            <el-select v-model="searchCondition.type" clearable placeholder="会员类型" style="width: 200px;">
				<el-option v-for="item in typeList" :key="item.key" :label="item.display_name" :value="item.key" />
			</el-select>
      <el-button class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
		<!-- <el-row :gutter="20" class="order_list">
			<el-col class="sku_num">用户总数：<span v-html="total"></span></el-col>
			<el-col class="sku_num" >精英卡总数：<span v-html="listCount.eliteCardNum"></span></el-col>
			<el-col class="sku_num" >未购卡：<span v-html="listCount.noBuyCardNum"></span></el-col>
		</el-row> -->
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      style="width: 100%" v-loading="loading">

      <el-table-column align="center" prop="company_name" label="分公司"></el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>

      <el-table-column align="center" prop="integral" label="成长值"></el-table-column>

      <el-table-column align="center" prop="task" label="真实销卡" ></el-table-column>

      <el-table-column align="center" prop="white" label="白金会员数"></el-table-column>

      <el-table-column align="center" prop="black" label="黑金会员数"></el-table-column>
      
    </el-table>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination v-show="total>0" :current-page="searchCondition.page" :page-sizes="[20]" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import {getCompanyIntegral} from '@/api/admin'

const memberTypes = [
  { key: '0', display_name: '普通会员' },
  { key: '1', display_name: '体验会员' },
  { key: '2', display_name: '精英会员' },
  { key: '3', display_name: '黑卡会员' },
]
//0分公司 2小创客 3大创客
const typeList = [
  { key: '0', display_name: '分公司' },
  { key: '2', display_name: '小创客' },
  { key: '3', display_name: '大创客' },
]

export default {
  data() {
    return {
      searchCondition: {
        page: 1, // 请求页数
        type:'0',
        startTime:'',
        endTime:'',
	  },
	  list:[],
      total: 0,
    //   memberTypes,
      typeList,
      tableData: [],
	  loading:false,
    }
  },
  created(){
    // const end = new Date();
    //   const start = new Date();
    //   const start2 = new Date();
      // console.log(this.timeDur,'dsafdsaf')
      // 折线图时间
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      this.searchCondition.startTime=`${yy}-${mm}-${dd}`+' 00:00:00'
      this.searchCondition.endTime=`${yy}-${mm}-${dd}`+' 23:59:59'

    //   this.timeDur= [`${yy}-${mm}-${dd}`,`${yy}-${mm}-${dd}`]

	this.getList()
  },
  methods: {
		//点击清除时间
    timeChange(){
        this.loading = true;
        this.searchCondition.page =1;
        this.getList()
    },
    // 列表数据
    getList() {
      this.loading = true;
      getCompanyIntegral(this.searchCondition).then(response => {
        if(response.data.code === 200){
			this.list = response.data.data //* 加个一层  没用的注释 为了推代码
			this.total = response.data.data.total;
			this.listCount =response.data.data.listCount;
			setTimeout(() => {
				this.loading = false
			}, 1.5 * 1000)
		}
      })
    },
    // 搜索
    handleFilter() {
	    this.loading = true;
	    this.searchCondition.page = 1
	    this.getList()
    },
    // 查看详情
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
    }
  }
}
</script>
<style scoped="scoped">
	.order_list{
		margin: 30px 0;
		font-size: 1rem;
		color: #999;
		font-size: 16px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>
