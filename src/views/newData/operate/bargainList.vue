<template>
    <div class="app-container">
      <el-dialog title="活动记录" :visible.sync="dialogTableVisible">
        <el-table :data="tableData">
          <el-table-column property="nickname" label="姓名" width="150"></el-table-column>
          <el-table-column property="teams" label="成团人数/已参团人数" width="200"></el-table-column>
          <el-table-column property="found_time" label="开团时间" width="200"></el-table-column>
          <el-table-column property="status" label="状态"></el-table-column>
        </el-table>
      </el-dialog>
      <el-form style="margin-bottom:20px;" :model="form" ref="form" :inline="true" class="demo-form-inline">
				<el-form-item>
						<el-date-picker
							v-model="form.act_starttime"
							type="datetime"
							placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" >
						</el-date-picker>
					</el-form-item>
				<el-form-item>
					<el-date-picker
						v-model="form.act_endtime"
						type="datetime"
						placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
		  <el-form-item>
        <el-select v-model="form.act_status" placeholder="请选择活动状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="form.keyword" placeholder="活动标题/商品名称"></el-input>
		  </el-form-item>
			<el-form-item>
			  <el-button @click="getList" type="primary">查询</el-button>
			  <router-link to="/operate/bargainAdd"><el-button type="primary">新增砍价</el-button></router-link>
				<router-link to="/shopMall-order">
					<el-button type="primary">砍价订单</el-button>
				</router-link>
			</el-form-item>
      </el-form>
        <el-table v-if="!loading" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column prop="sort" label="排序" align="center">
              <template slot-scope="scope">
                <el-input @change="changeorder(scope.$index,scope.row.id)" v-model="scope.row.sort" placeholder="请输入序号"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="推广渠道" align="center" width="120">
							<template slot-scope="scope">
								<p v-for="item in scope.row.pop_channels">{{item.name}}</p>
							</template>
						</el-table-column>
            <el-table-column prop="act_name" label="活动标题" align="center"></el-table-column>
            <el-table-column width="300px" prop="goods_name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="origin_price" label="初始价格" align="center"></el-table-column>
            <el-table-column prop="bargain_price" label="商品低价" align="center"></el-table-column>
            <el-table-column width="200px" label="活动时间" align="center">
              <template slot-scope="scope">
                <span v-html="scope.row.act_time"></span>
              </template>
            </el-table-column>
            <el-table-column prop="act_goods_stock" label="活动库存" align="center"></el-table-column>
            <el-table-column prop="buy_limit" label="限购数量" align="center"></el-table-column>
			      <el-table-column prop="success_count" label="已购数量" align="center"></el-table-column>
			      <el-table-column prop="help_total" label="砍价人数" align="center"></el-table-column>
			      <el-table-column prop="" label="上线状态" align="center">
							<template slot-scope="scope">
								<span v-if='scope.row.is_online == 0' style="color: #f00;">下线</span>
								<span v-else style="color: green;">上线</span>
							</template>
						</el-table-column>
			      <el-table-column prop="act_status" label="活动状态" align="center"></el-table-column>
            <el-table-column fixed="right" prop="refundTotal" width="200px" label="操作" align="center">
              <template slot-scope="scope">
								<el-button @click="updateBargainIsOnline(scope.$index, scope.row,list)" size="mini"><span v-html='scope.row.is_online == 0 ? "上线" : "下线"'></span></el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="Record(scope.row.id)">活动记录</el-button> -->
              </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="form.page"
          :page-sizes="[10]"
          :page-size="10"
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
// import hotelCharts from './hotelCharts' // 图表
import { bargainsList ,updateBargainSort,updateBargainIsOnline} from '@/api/shops' // 接口

export default {
    name: 'gropList',
    data() {
      return {
        tableData: '',
        dialogTableVisible: false,
        searchCondition: {
          page:1,
        },
        input:'',
        total : null,
        loading: false,
        list: [],


        timeArray:[],
        form:{
          act_status:'',//活动状态
          keyword:'',//商品名称或标题
          act_starttime:'',//起始时间
          act_endtime:'',//结束时间
					page:1,
					pageSize:20
        },
        options: [{//活动状态
                value: '0',
                label: '所有活动'
              }, {
                value: '1',
                label: '未开起'
              }, {
                value: '2',
                label: '进行中'
              }, {
                value: '3',
                label: '已结束'
            }],
        value: ''
      }
    },
    created() {
		this.form.page = 1
		// this.searchCondition.pageSize = 20
		this.getList()
    },
    methods: {
			//上下线
			updateBargainIsOnline(idx,row,list){
				let isId = '';
				if(row.is_online == 0){
					isId = 1
				}else{
					isId = 0
				}
				let obj = {
					id:row.id,
					is_online:isId
				}
				updateBargainIsOnline(obj).then(res=>{
					if(res.data.code == 200){
						let text = '';
						if(row.is_online == 0){
							list[idx].is_online = 1;
							text = '上线成功'
						}else{
							list[idx].is_online = 0
							text = '下线成功'
						}
						this.$message({
							message:text ||'操作成功',
							type:'success'
						})
					}else{
						this.$message({
							message:res.data.msg || '操作失败',
							type:'error'
						})
					}
				})
			},
      // 查看记录
        Record(cid){
          let data = {
            id: cid,
            status: 0
          }
          teamList(data).then((res) => {
              if(res.data.code==200){
                if(res.data.data.length==0){
                  alert('暂无记录')
                }else{
                  this.dialogTableVisible = true
                  this.tableData = res.data.data
                }
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
            page: _this.form.page,
            pageSize: _this.form.pageSize,
          }
					data = _this.form
					console.log(data,"datadatadatadata")
          bargainsList(data).then(res => {
            if (res.data.code === 200){
                _this.list = res.data.data
                _this.total = JSON.parse(res.data.count)
                _this.loading = false
            }
          })
        },
        // 修改排序
      changeorder (index,gid) {
        var self = this
        console.log({'id': gid,'sort':self.list[index].sort});
        updateBargainSort({'id': gid,'sort':self.list[index].sort}).then((response) => {
          if (response.data.code == 200) {
            self.$message({
              message: '修改排序成功',
              type: 'success',
              duration: 5000
            })
          }
          else {
            self.$message({
              message: response.data.msg,
              type: 'warning',
              duration: 5000
            })
          }
        }).catch((error) => {
          console.log(error)
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
        //广告编辑
        handleEdit(index, row) {
          this.$router.push({ path: '/operate/bargainAdd', query: { id: row.id }})
        },
        //广告删除
        handleDelete(index, row) {
          console.log(index, row);
        }
    }
}
</script>
<style type="scss">
</style>
