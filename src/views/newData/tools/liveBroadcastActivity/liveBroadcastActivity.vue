<!--suppress ALL -->
<template>
  <div class="app-container"
       v-loading="loading">
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item label="直播用户ID">
        <el-input v-model="searchCondition.live_people_id"
                  clearable
                  placeholder="请输入直播用户ID" />
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model="searchCondition.act_type"
                   clearable>
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">搜索</el-button>
        <router-link target="_blank"
                     :to="{path:'/tools/liveBroadcastActivity/liveBroadcastActivityAdd'}">
          <el-button>新增直播活动</el-button>
        </router-link>
        <router-link target="_blank"
                     :to="{path:'live-banner-list'}">
          <el-button type="success">banner管理</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <!--搜索部分-->
    <el-table :data="list"
              :fit="true"
              border
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID"
                       width="100"
                       align="center"></el-table-column>
      <el-table-column prop="act_name"
                       label="名称"
                       width="100"
                       align="center"></el-table-column>
      <el-table-column prop="live_people_id"
                       label="直播用户ID"
                       width="100"
                       align="center"></el-table-column>
      <el-table-column prop=""
                       label="上下架状态"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.is_online == 1 ? '上架' : '下架'}}
        </template>
      </el-table-column>
      <el-table-column prop="act_type_name"
                       label="活动分类"
                       width="100"
                       align="center"></el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       align="center">
        <template slot-scope="scope"
                  align="center">
          <el-button type="text"
                     size="small"
                     @click="onLine(scope.row.id,scope.row.is_online)">
            {{scope.row.is_online == 1 ? '下架' : '上架'}}</el-button>
          <router-link target="_blank"
                       :to="{path:'/tools/liveBroadcastActivity/liveBroadcastActivityAdd',query:{id:scope.row.id}}">
            <el-button type="text"
                       size="small">编辑</el-button>
          </router-link>
          <!-- <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="searchCondition.page"
                     :page-size="searchCondition.limit"
                     :total="commonTotal"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>

    <h2>公共</h2>
    <!--搜索部分-->
    <el-table :data="commonList"
              :fit="true"
              border
              style="width: 100%">
      <el-table-column prop="act_name"
                       label="名称"
                       width="100"
                       align="center"></el-table-column>
      <el-table-column prop="id"
                       label="直播用户ID"
                       width="100"
                       align="center"></el-table-column>
      <el-table-column prop=""
                       label="上下架状态"
                       width="200"
                       align="center">
        <template slot-scope="scope">
          {{scope.row.is_online == 1 ? '上架' : '下架'}}
        </template>
      </el-table-column>
      <el-table-column prop="act_type_name"
                       label="活动分类"
                       width="100"
                       align="center"></el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       align="center">
        <template slot-scope="scope"
                  align="center">
          <el-button type="text"
                     size="small"
                     @click="onLine(scope.row.id,scope.row.is_online)">
            {{scope.row.is_online == 1 ? '下架' : '上架'}}</el-button>
          <router-link target="_blank"
                       :to="{path:'/tools/liveBroadcastActivity/liveBroadcastActivityAdd',query:{id:scope.row.id}}">
            <el-button type="text"
                       size="small">编辑</el-button>
          </router-link>
          <!-- <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-size="searchCondition.limit" :total="commonTotal"
				background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div> -->

  </div>
</template>
<script>
import {
  getExclusiveLiveList,
  updateLiveNewEventsIsOnline
} from '@/api/shops' // 接口

// 订单状态
// 支付状态发货状态

// 订单来源
// const orderSource = [
//     { key: 1, display_name: '悦旅会APP' },
//     { key: 2, display_name: '环球悦旅APP' },
//     { key: 3, display_name: '悦店APP' },
//     { key: 4, display_name: '大人APP' },
//     { key: 5, display_name: '悦旅大人(小程序)' },
// ]


export default {
  data () {
    return {
      loading: true,
      formLabelWidth: '140px',
      form: {},
      searchCondition: {
        page: 1
      },
      options: [{
        value: '3',
        label: '直播'
      }, {
        value: '6',
        label: '直播回放'
      }],
      commonTotal: 0,
      commonList: [],
      total: 0,
      list: [],

    }
  },
  mounted () {
    this.getExclusiveLiveList();
  },
  methods: {
    // 列表数据
    getExclusiveLiveList () {
      getExclusiveLiveList(this.searchCondition).then(res => {
        if (res.data.code === 200) {
          //私有
          this.list = res.data.data.private_list.data
          this.commonTotal = res.data.data.private_list.count
          //公共
          this.commonList = res.data.data.public_list
          this.loading = false
        } else {
          this.$message.error(res.data.msg);
          this.loading = false
        }
      })
    },
    onLine (id, is_online) {
      this.loading = true;
      let params = {
        id: id,
        is_online: is_online == 1 ? 0 : 1
      }
      updateLiveNewEventsIsOnline(params).then(res => {
        if (res.data.code === 200) {
          this.getExclusiveLiveList();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    handleDelete (id) {
      console.log(444)
      this.loading = true;
      let params = {
        id: id
      }
      deleteLiveEvents(params).then(res => {
        if (res.data.code === 200) {
          this.getExclusiveLiveList();
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    onSubmit () {
      this.searchCondition.page = 1
      this.getExclusiveLiveList()
    },
    // 搜索
    handleFilter () {
      this.searchCondition.page = 1
    },
    // 分页
    handleSizeChange (val) { },
    handleCurrentChange (val) {
      this.searchCondition.page = val
      this.getExclusiveLiveList()
    }
  }
}

</script>
<style type="scss" scoped="scoped">
</style>
