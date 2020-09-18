<template>
    <div class="app-container">
      <el-form style="margin-bottom:20px;" ref="form" :inline="true" class="demo-form-inline">
		  <el-form-item>
			<el-date-picker
				v-model="timeArray"
				type="daterange"
				range-separator="-"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd hh:mm:ss"
				start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker>
		  </el-form-item>
		  <el-form-item>
			<el-select v-model="form.type_id" placeholder="请选择文章类型">
				<el-option
					v-for="item in activityState"
					:key="item.type_id"
          :label="item.type_name"
          :value="item.type_id">
				</el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
			<el-input v-model="form.act_name" placeholder="活动标题"></el-input>
		  </el-form-item>
			<el-form-item>
				<el-button @click="getList" type="primary">查询</el-button>
				<router-link to="/shop/textAdd"><el-button type="primary">新增</el-button></router-link>
			</el-form-item>
      </el-form>
        <el-table v-loading="loading" v-if="!switchChart" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column width="500" prop="title" label="文章标题" align="center"></el-table-column>
            <el-table-column width="200" prop="created_at" label="添加时间" sortable align="center"></el-table-column>
            <el-table-column prop="type_name" label="类型名称" sortable align="center"></el-table-column>
            <el-table-column label="状态" align="center" sortable>
              <template slot-scope="scope">
                {{ scope.row.state?'上架':'下架' }}
              </template>
            </el-table-column>
            <el-table-column width="250" fixed="right" prop="refundTotal" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				<el-button
                  size="mini"
                  type="info"
                  @click="updateState(scope.row.aid, scope.$index,scope.row.state)">{{scope.row.state?'下架':'上架'}}</el-button>
              </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[10,20,30,40]"
          :page-size="searchCondition.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
        <!-- <hotelCharts v-if="switchChart"/> -->
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { statistics, getTypeList, articlList, deleteArticl } from '@/api/shop' // 接口

export default {
    name: 'textList',
    data() {
      return {
        addAdvertisingBtnName:'添加广告',
        searchCondition: {
          page:1,
          pageSize: 20
        },
        total: null,
        loading: false,
        switchChart: false,
        list: [],
        timeArray: [],    
        activityState: '',
        form:{
          type_id:'',//文章类型
          title:'',//文章标题
          start_time:'',//起始时间
          end_time:'',//结束时间
        },
      }
    },
    created() {
		this.searchCondition.page = 1
    this.searchCondition.pageSize = 20
    this.getActivity()
		this.getList()
    },
    methods: {
       //查看详情
        addAdvertisingClick(orderNo) {
            this.$router.push({ path: '/advert/update' })
        },
        // 文章类型
        getActivity(){
          var self = this
          getTypeList({pageSize:10000}).then((res) => {
            if(res.data.code==200){
              self.activityState=res.data.data
            }
          }).catch((error) => {
            console.log(error)
          })
        },
        // 列表数据
        getList() {
          var _this = this;
          _this.loading = true
          let data = {
            page: _this.searchCondition.page,
            pageSize: _this.searchCondition.pageSize,
          }
          console.log(_this.timeArray)
          if(_this.form.type_id){ data['type_id'] = _this.form.type_id }
          if(_this.form.title){ data['title'] = _this.form.title }
          if(_this.timeArray != null && _this.timeArray.length > 0){ data['start_time'] = _this.timeArray[0];data['end_time'] = _this.timeArray[1]; }

          articlList(data).then(res => {
            if(res.data.code==200){
              _this.list= res.data.data.result
              _this.total = res.data.data.total;
              _this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
              this.getList()
        },
        //广告编辑
        handleEdit(index, row) {
          this.$router.push({ path: '/shop/textAdd', query: { aid: row.aid }})
        },
        // 上下架
      updateState(cid,index,state){
        var self = this
        
        if(state==0){
          state=1
        }else{
          state=0
        }
        
        self.axios({
          method: 'post',
          url: '/apis/api/article/huidian/updateState',
          responseType: 'json',
          data:{
            aid:cid,
            state:state,
          },
        }).then((res) => {
          if(res.data.code==200){
            self.list[index].state=state
          }
        }).catch((error) => {
          console.log(error)
        })
    },
        //广告删除
        handleDelete(index, row) {
          console.log(index, row);
          let _this = this;
          _this.loading = true
          deleteArticl({ aid: row.aid }).then(res => {
            if (res.data.code == 200) {
                _this.loading = false
                _this.getList()
              }
            }).catch(error => {
              console.log(error)
            });
        },
    }
}
</script>
<style type="scss">
</style>
