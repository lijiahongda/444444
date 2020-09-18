<template>
    <div class="app-container">
      <el-dialog title="提交内容" :visible.sync="dialogTableVisible">
        <div v-html="content"></div>
      </el-dialog>
      <el-form style="margin-bottom:20px;" ref="form" :inline="true" class="demo-form-inline">
		  <el-form-item>
					<el-date-picker
						v-model="form.start_time"
						type="datetime"
						placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" >
					</el-date-picker>
        </el-form-item>
			<el-form-item>
				<el-date-picker
					v-model="form.end_time"
					type="datetime"
					placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
				</el-date-picker>
			</el-form-item>
		  <el-form-item>
			<el-select v-model="form.check_result" placeholder="评论状态" clearable>
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
            <el-table-column width="500" prop="comment" label="评论内容" align="center"></el-table-column>
            <el-table-column width="200" prop="created_at" label="时间" align="center"></el-table-column>
            <el-table-column prop="check_result" label="状态" align="center"></el-table-column>
            <el-table-column width="250" fixed="right" prop="refundTotal" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.check_result=='待审核'"
                  size="mini"
                  type="primary"
                  @click="handleDeal(scope.$index,scope.row)">通过</el-button>
				        <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="form.page"
          :page-sizes="[10,20,30,40]"
          :page-size="form.pageSize"
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

import { getCommentList, dealComment, deleteComment  } from '@/api/shops' // 接口

export default {
    name: 'shopComment',
    data() {
      return {
        form:{
          check_result:'',//状态
          start_time:'',//起始时间
          end_time:'',//结束时间
          page:1,
          pageSize: 20
        },
        timeArray: [],
        total: null,
        loading: false,
        switchChart: false,
        list: [],
        activityState:[{//评论状态
            value: '0',
            label: '所有评论'
          }, {
            value: '1',
            label: '待审核'
          }, {
            value: '2',
            label: '已通过'
          }],
        dialogTableVisible: false,
        content: ''
      }
    },
    created() {
      this.form.page = 1
		  this.getList()
    },
    methods: {
        // 列表数据
        getList() {
           var _this = this;
           _this.loading = true
          let data = this.form;
          getCommentList(data).then(res => {
            if(res.data.code==200){
              _this.list  = res.data.result
              _this.total = res.data.total;
              _this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.form.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.form.pageSize = val
              this.getList()
        },
        //删除
        handleDelete(index, row) {
          var self = this
          console.log(row)
          deleteComment({ id:row.id}).then((res) => {
            if(res.data.code==200){
                this.getList()
            }
          }).catch((error) => {
            console.log(error)
          })
        },
        handleDeal(index, row) {
          // 2-通过，3-失败
          var self = this
          console.log(row)
          dealComment({ id:row.id}).then((res) => {
            if(res.data.code==200){
                self.list[index].check_result='已通过'
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
