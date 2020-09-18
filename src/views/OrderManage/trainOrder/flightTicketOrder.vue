<template>
	<div style="padding: 0 20px">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="选择日期：">
				<el-col>
					<el-date-picker
						v-model="searchCondition.startDate"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="下单日期时间"
						style="width: 150px;"
					/>
					<el-date-picker
						v-model="searchCondition.endDate"
						type="date"
						value-format="yyyy-MM-dd"
						placeholder="下单日期时间"
						style="width: 150px;"
					/>
				</el-col>
			</el-form-item>
			<el-form-item label="订单号：">
				<el-col>
					<el-input
						v-model="searchCondition.orderNo"
						placeholder="请输入订单号"
						style="width:300px;"
					/>
				</el-col>
			</el-form-item>
			<el-form-item label="支付单号：">
				<el-col>
					<el-input
						v-model="searchCondition.payNo"
						placeholder="请输入支付单号"
						style="width:300px;"
					/>
				</el-col>
			</el-form-item>
			<el-form-item label="三方单号：">
				<el-col>
					<el-input
						v-model="searchCondition.thirdNo"
						placeholder="请输入三方单号"
						style="width:300px;"
					/>
				</el-col>
			</el-form-item>
			<el-form-item label="手机号：">
				<el-col>
					<el-input
						v-model="searchCondition.mobile"
						placeholder="请输入手机号"
						style="width:300px;"
					/>
				</el-col>
			</el-form-item>
			<el-form-item label="支付状态">
				<el-col>
					<el-select v-model="searchCondition.status" placeholder="支付状态" style="width: 300px;">
						<el-option
							v-for="(item ,index) in orderStatus"
							:key = "index"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">点我搜索</el-button>
				<el-button type="danger" @click="onEmpty">点我清空条件</el-button>
			</el-form-item>
		</el-form>

		<div>
			<el-table
				:data="flightOrderList"
				border
				style="width: 100%">
				<el-table-column
					prop="order_no"
					label="订单编号"
					width="">
				</el-table-column>
				<el-table-column
					prop="external_no"
					label="三方单号"
					width="">
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="下单时间"
					width="180">
				</el-table-column>
				<el-table-column
					prop="pay_number"
					label="支付单号"
					width="170">
				</el-table-column>
				<el-table-column
					prop="pay_type_text"
					label="支付方式"
					width="120">
				</el-table-column>
				<el-table-column
					prop="actual_price"
					label="实际支付金额"
					width="120">
				</el-table-column>
				<el-table-column
					prop="pay_status_text"
					label="支付状态"
					width="100">
				</el-table-column>
				<el-table-column
					prop="contact_phone"
					label="会员手机号"
					width="160">
				</el-table-column>
				<el-table-column
					prop="order_status_text"
					label="订单状态"
					width="100">
				</el-table-column>
				<el-table-column
					label="操作"
					width="100"  fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="showOrderPayInfo(scope.row)">查询支付信息</el-button>
						<el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
					</template>
				</el-table-column>
				<el-table-column
					prop="third_price"
					label="支付航空管家价格"
					width="150">
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="searchCondition.page"
				:page-sizes="[10, 15, 20, 25]"
				:page-size="searchCondition.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
		<div>
			<el-drawer
				style="overflow-y: auto;height: 140vh;padding:20px;margin-bottom:20px;"
				title="订单详情信息"
				append-to-body
				:visible.sync="showDrawer"
				size="90%">
				<div>
					<!--机票详情的组件-->
					<flightTicketOrderDetail :orderNo="orderDetailId"></flightTicketOrderDetail>
				</div>
			</el-drawer>
		</div>
		<div>
		<el-dialog title="机票订单支付信息" :visible.sync="dialogFormVisible">
			{{form.orderNo}}
			<div slot="footer" class="dialog-footer">
			</div>
		</el-dialog>
		</div>
	</div>

</template>

<script>
  import { getFlightOrderList, getFlightOrderStatus, getOrderPayInfo} from '@/api/order' // 接口
  import flightTicketOrderDetail from '@/views/OrderManage/trainOrder/flightTicketOrderDetail.vue' // 接口

  export default {
    name: 'flightTicketOrder',
    data() {
      return {
        searchCondition: {
          'startDate': '',
          'endDate': '',
          'status': '',
          'payNo': '',
          'type': '',
          'orderNo': '',
          'thirdNo': '',
          'mobile': '',
          'page': 1,
		  "pageSize":15
		},
		form: {
			'orderNo': '',
		},
        orderStatus: [],
		showDrawer: false,  //是否显示抽屉
		dialogFormVisible: false, //层级显示
        total: 0,		//总条数
        flightOrderList: [], //机票订单列表

        orderDetailId: '' //查看详情的订单的id
      }
    },
    components: {
      flightTicketOrderDetail
    },
    methods: {
      onSubmit() {
        this.searchCondition.page = 1
        this.getFlightOrder()
      },
      onEmpty() {
        this.searchCondition = {
          page: 1,
		  pageSize:10
        }
        this.getFlightOrder()
      },
      handleSizeChange(val) {
        this.searchCondition.pageSize = val
        this.getFlightOrder()
      },
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getFlightOrder()
      },
      getFlightOrder() {
        let params = this.searchCondition
        getFlightOrderList(params).then(res => {
          if (res.data.code === 200) {
            this.flightOrderList = res.data.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
        })
      },
      showDetail(val) {
        this.$router.push({path:'/flightTicketOrderDetail',query:{order_no: val.order_no}})
        // this.showDrawer = true
        // this.orderDetailId = val.order_no
	  },
	  showOrderPayInfo(val) {
		this.dialogFormVisible = true;
		let item={};
		item.orderNo = val.external_no;
		getOrderPayInfo(item).then((res) => {
			this.form.orderNo = res.data;
        })
	  },
      getStatus() {
        getFlightOrderStatus().then((res) => {
          if (res.data.code === 200) {
            this.orderStatus = res.data.data
          } else {
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
        })
      }
    },
    created() {
      this.getFlightOrder()
      this.getStatus()
    }
  }
</script>

<style scoped>
	.el-input {
		width: 280px;
	}
</style>
