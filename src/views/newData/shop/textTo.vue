<template>
    <div class="app-container">
      <el-dialog title="提交内容" :visible.sync="dialogTableVisible">
        <div v-html="content"></div>
      </el-dialog>
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
			<el-select v-model="form.check_result" placeholder="活动状态">
				<el-option
					v-for="item in activityState"
					:key="item.value"
          :label="item.label"
          :value="item.value">
				</el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item>
			<el-button @click="getList" type="primary">查询</el-button>
		  </el-form-item>
      </el-form>
        <el-table v-loading="loading" v-if="!switchChart" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column width="500" prop="mobile" label="手机号" align="center"></el-table-column>
            <el-table-column width="200" prop="created_at" label="时间" align="center"></el-table-column>
            <el-table-column prop="check_result" label="状态" align="center"></el-table-column>
            <el-table-column width="250" fixed="right" prop="refundTotal" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button
                  v-if="scope.row.check_result=='待审核'"
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index,2 ,scope.row)">通过</el-button>
				        <el-button
                  v-if="scope.row.check_result=='待审核'"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index,3 ,scope.row)">驳回</el-button>
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
import { checkList, checkDetail, checkArticl  } from '@/api/shop' // 接口

export default {
    name: 'textTo',
    data() {
      return {
        addAdvertisingBtnName:'添加广告',
        searchCondition: {
          page:1,
          pageSize: 20
        },
        form:{
          check_result:'活动状态',//状态
          start_time:'',//起始时间
          end_time:'',//结束时间
        },
        timeArray: [],
        total: null,
        loading: false,
        switchChart: false,
        list: [],
        activityState:[{//活动状态
            value: '0',
            label: '所有活动'
          }, {
            value: '1',
            label: '待审核'
          }, {
            value: '2',
            label: '通过'
          }, {
            value: '3',
            label: '失败'
        }],
        dialogTableVisible: false,
        content: ''
      }
    },
    created() {
		this.searchCondition.page = 1
    this.searchCondition.pageSize = 20
		this.getList()
    },
    methods: {
       //查看详情
        addAdvertisingClick(orderNo) {
            this.$router.push({ path: '/advert/update' })
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
          if(_this.form.check_result){ data['check_result'] = _this.form.check_result }
          if(_this.timeArray != null && _this.timeArray.length > 0){ data['start_time'] = _this.timeArray[0];data['end_time'] = _this.timeArray[1]; }

          checkList(data).then(res => {
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
          console.log(index, row);
          var _this = this  
          checkDetail({aid: row.aid}).then((res) => {
            if(res.data.code==200){
              _this.dialogTableVisible = true
              _this.content= res.data.content
            }
          }).catch((error) => {
            console.log(error)
          })
        },
        //广告删除
        handleDelete(index, type, row) {
          // 2-通过，3-失败
          var self = this
          console.log(row)
          checkArticl({ aid:row.aid, check_result:type }).then((res) => {
            if(res.data.code==200){
              if(type==2){
                self.list[index].check_result='通过'
              }else{
                self.list[index].check_result='失败'
              }
            }
          }).catch((error) => {
            console.log(error)
          })
        }
    }
}
</script>
<style type="scss">
</style>
