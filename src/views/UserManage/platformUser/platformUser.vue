<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="filter-container">
      <el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="timeChange"/>
      <el-input v-model="searchCondition.keyWord" placeholder="手机号/姓名/昵称" style="width: 200px;" class="" @keyup.enter.native="handleFilter" prefix-icon='el-icon-search'/>
      <el-input v-model="searchCondition.email" placeholder="邮箱" style="width: 200px;" class="" @keyup.enter.native="handleFilter" prefix-icon='el-icon-search'/>
			<el-select v-model="searchCondition.memberType" clearable placeholder="会员类型" style="width: 200px;">
				<el-option v-for="item in memberTypes" :key="item.key" :label="item.display_name" :value="item.key" />
			</el-select>
      <el-button class="" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
		<el-row :gutter="20" class="order_list">
			<el-col class="sku_num">用户总数：<span v-html="total"></span></el-col>
			<el-col class="sku_num" >精英卡总数：<span v-html="listCount.eliteCardNum"></span></el-col>
			<el-col class="sku_num" >未购卡：<span v-html="listCount.noBuyCardNum"></span></el-col>

        <!-- `member_type` tinyint(2) DEFAULT '0' COMMENT '会员类型0普通会员1体验会员2精英会员3黑卡会员', -->

      <el-col class="sku_num" >普通会员：<span v-html="listCount.memberType0"></span></el-col>
			<el-col class="sku_num" >体验会员：<span v-html="listCount.memberType1"></span></el-col>
			<el-col class="sku_num" >精英会员：<span v-html="listCount.memberType2"></span></el-col>
			<el-col class="sku_num" >黑卡会员：<span v-html="listCount.memberType3"></span></el-col>

		</el-row>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      style="width: 100%" v-loading="loading">
      <el-table-column
	    align="center"
        prop="trueName"
        label="姓名/昵称"
        width="100">
		<template slot-scope="scope">
			{{scope.row.trueName ? scope.row.trueName : scope.row.nickName ? scope.row.nickName : '暂无' }}
		</template>
      </el-table-column>
      <el-table-column
	    align="center"
        prop="mobile"
        label="绑定手机号"
        width="110"/>
      <el-table-column
	    align="center"
        prop="joinTime"
        label="注册时间"
        width="155">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="cardDate"
        label="开卡日期"
        width="155">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="cardType"
        label="会员类型"
        width="80">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="memberType"
        label="新会员类型"
        width="95">
      </el-table-column>
      <el-table-column
	    align="center"
        prop="parentName"
        label="上级姓名"
        width="100"/>
		<el-table-column
	    align="center"
        prop="parentMobile"
        label="上级手机号"
        width="110"/>
      <el-table-column
	    align="center"
        prop="integral.total"
        label="悦旅币总数"
        width="90">
      </el-table-column>
	  <el-table-column
	    align="center"
        prop="integral.available"
        label="可用悦旅币"
        width="90">
      </el-table-column>
	  <el-table-column
	    align="center"
        prop="integral.consum"
        label="已消费悦旅币"
        width="90">
      </el-table-column>
	   <el-table-column
	    align="center"
        prop="integral.expire"
        label="已过期悦旅币"
        width="90">
      </el-table-column>
      <el-table-column
	  	align="center"
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row.mid)">查看详情</el-button>
          <el-button type="primary" @click="delCheckInfo(scope.row.mid)">清除认证信息</el-button>
          <!-- <el-button type="text" size="small" @click="DeliverGoods(scope.row)">启用 </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" style="text-align:right;">
      <el-pagination v-show="total>0" :current-page="searchCondition.page" :page-sizes="[20]" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle, userList } from '@/api/article'

import {delCheckInfo} from '@/api/remoteSearch'

// 城市
const city = [
  { key: '北京', display_name: '北京' },
  { key: '上海', display_name: '上海' },
  { key: '广州', display_name: '广州' }
]
// 购卡类型
const cardType = [
  { key: '0', display_name: '未购卡' },
  { key: '1', display_name: '精英卡' },
]

const memberTypes = [
  { key: '0', display_name: '普通会员' },
  { key: '1', display_name: '体验会员' },
  { key: '2', display_name: '精英会员' },
  { key: '3', display_name: '黑卡会员' },
]


// 账户状态
const AccountState = [
  { key: '已启用', display_name: '已启用' },
  { key: '已禁用', display_name: '已禁用' }
]
// 会员类型
const memberType = [
  { key: '精英卡', display_name: '精英卡' },
  { key: '大人卡', display_name: '大人卡' },
  { key: '注册用户', display_name: '注册用户' }
]
// 不知道具体干啥的 等待问龙爷  城市
const cityKeyValue = city.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
// 不知道具体干啥的 等待问龙爷  账户状态
const AccountStateKeyValue = AccountState.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

// 不知道具体干啥的 等待问龙爷 会员类型
const memberTypeKeyValue = memberType.reduce((acc, cur) => {
  acc[cur.key] = cur.display_Suppliername
  return acc
}, {})
export default {
  // 不知道具体干啥的 等待问龙爷 城市
  cityFilter(type) {
    return cityKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 账户状态
  AccountStateFilter(type) {
    return AccountStateKeyValue[type]
  },
  // 不知道具体干啥的 等待问龙爷 会员类型
  memberTypeFilter(type) {
    return memberTypeKeyValue[type]
  },
  data() {
    return {
      searchCondition: {
        page: 1, // 请求页数
				cardType:'',
	  },
		listCount:{},
	  list:[],
      total: null,
      city, // 城市
      AccountState, // 账户状态
      memberType, // 会员类型
      cardType,// 会员类型
      memberTypes,
      tableData: [],
			loading:false,
    }
  },
  created(){
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
      userList(this.searchCondition).then(response => {
        if(response.data.code === 200){
			this.list = response.data.data.list //* 加个一层  没用的注释 为了推代码
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
    handleUpdate(id) {
      this.$router.push({path:'/userManage/user-info',query:{id: id}})
    },
    handleCurrentChange(val) {
      this.searchCondition.page = val
      this.getList()
    },


    delCheckInfo(mid){
     this.$confirm('确定要清除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var obj = {
                    mid:mid
                }
                delCheckInfo(obj).then(res => {
                    if (res.data.code == 200)
                    {
                      	this.$message.success(res.data.msg)
                        this.getUserInfo()
                    }else{
                      	this.$message.error(res.data.msg)
                    }
                })
            }).catch(() => {
            });

  },
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
