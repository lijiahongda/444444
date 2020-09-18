<template>
	<div style="padding:20px;">
		<div>
			<router-link :to="{path:'/flightTicketOrder'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
			<h3>订单基本信息</h3>
			<el-table
				:data="orderDetail"
				border
				style="width: 100%">
				<el-table-column
					prop="order_no"
					label="订单编号"
					width="200">
				</el-table-column>
				<el-table-column
					prop="pay_number"
					label="支付单号"
					width="200">
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="订单创建时间"
					width="180">
				</el-table-column>
				<el-table-column
					label="出发地">
					<template slot-scope="order">
						{{order.row.dep_city}}{{order.row.dep_airport_name}}
					</template>
				</el-table-column>
				<el-table-column
					label="目的地">
					<template slot-scope="order">
						{{order.row.arr_city}}{{order.row.arr_airport_name}}
					</template>
				</el-table-column>
				<el-table-column
					label="航班信息">
					<template slot-scope="order">
						{{order.row.air_company_name}}{{order.row.flight_no}}
					</template>
				</el-table-column>
				<el-table-column
					prop="order_status_text"
					label="订单状态">
				</el-table-column>
				<el-table-column
					prop="mobile"
					label="手机号">
				</el-table-column>
				<el-table-column
					label="会员姓名"
					width="80">
					<template slot-scope="order">
						{{order.row.get_member_info? order.row.get_member_info.truename: ''}}
					</template>
				</el-table-column>

			</el-table>
		</div>
		<div>
			<h3>子单信息</h3>
			<el-table
				:data="orderDetail[0].get_order_sub"
				border
			>
				<el-table-column
					prop="order_son"
					label="子订单编号"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名"
					width="180">
				</el-table-column>
				<el-table-column
					prop="phone"
					label="电话">
				</el-table-column>
				<el-table-column
					prop="id_type_text"
					label="证件类型">
				</el-table-column>
				<el-table-column
					prop="id_card"
					label="证件号码">
				</el-table-column>
				<el-table-column
					label="性别">
					<template slot-scope="subOrder">
						{{subOrder.row.gender===1?'男':'女'}}
					</template>
				</el-table-column>
				<el-table-column
					prop="type_text"
					label="旅客类型">
				</el-table-column>
				<el-table-column
					prop="create_time"
					label="创建时间">
				</el-table-column>
				<el-table-column
					prop="total_price"
					label="价格">
				</el-table-column>
				<el-table-column
					label="是否改签">
					<template slot-scope="subOrder">
						{{subOrder.row.is_tickets_change ===1 ?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column prop="admin_refund_status" align="center" label="退款状态"></el-table-column>
				<el-table-column label="退款操作"  align="center" width="180px" fixed="right">
					<template slot-scope="scope">
						<div v-if="orderDetail[0].pay_status_text=='已支付' && scope.row.admin_refund_status == '无'">
							<el-button  type="primary" plain @click="checkFlightRefund(scope.row,1)">同意</el-button>
							<el-button  type="" plain @click="checkFlightRefund(scope.row,2)">拒绝</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<h3>支付信息</h3>
			<el-table
				:data="orderDetail"
				border>
				<el-table-column
					prop="total_price"
					label="订单金额"
					width="180">
				</el-table-column>
				<el-table-column
					prop="pay_time"
					label="支付时间"
					width="180">
				</el-table-column>
				<el-table-column
					prop="total_price"
					label="实际支付金额"
					width="180">
				</el-table-column>
				<el-table-column
					prop="pay_number"
					label="支付单号"
					>
				</el-table-column>
				<el-table-column
					prop="pay_type_text"
					label="支付方式"
					>
				</el-table-column>
				<el-table-column
					prop="coupon_id"
					label="优惠券使用">
				</el-table-column>

			</el-table>
		</div>
		<div>
			<h3>退款信息</h3>
			<el-table
				:data="get_order_sub"
				border>
				<el-table-column
					prop="admin_refund_status"
					label="退款状态"
					width="180">
				</el-table-column>
				<el-table-column
					prop="refund_price"
					label="应退款">
				</el-table-column>
				<el-table-column
					prop="change_price"
					label="退款手续费">
				</el-table-column>
				<el-table-column
					prop="refund_price"
					label="改签退款金额">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
  import { getFlightOrderList,checkFlightRefund } from '@/api/order' // 接口
  export default {
    name: 'flightTicketOrderDetail',
    data() {
      return {
        orderDetail: [{}],
        get_order_sub:[],
        orderNo:'',
      }
    },
    created() {
      this.orderNo = this.$route.query.order_no;
      this.getFlightOrder(this.orderNo)
    },
    methods: {
      getFlightOrder(orderNo) {
        let params = {
          page: 1,
          pageSize: 1,
          orderNo,
          type: 1
        }
        getFlightOrderList(params).then(res => {
          if (res.data.code === 200) {
            this.orderDetail = res.data.data.data
			this.get_order_sub = res.data.data.data[0].get_order_sub;
            console.log(this.get_order_sub,999)
          } else {
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
        })
      },
      //退款
      checkFlightRefund(row,type){
        if(type==1){
          this.$prompt('请输入退款金额', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            let params = {
              type:1,
              id:row.id,
              adminRefundPrice: value
            }
            this.checkFlightRefundAffirm(params);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        } else {
          let params = {
            type:2,
            id:row.id
          }
          this.checkFlightRefundAffirm(params);
        }


      },
      checkFlightRefundAffirm(value){
        checkFlightRefund(value).then(res=>{
          if(res.data.code == 200){
            this.$message.success('操作成功');
            this.getFlightOrder(this.orderNo)
          }
        })
      },
    },
    watch: {
      orderNo(newV, oldV) {
        this.getFlightOrder(newV)
      }
    }
  }
</script>

<style scoped>

</style>
