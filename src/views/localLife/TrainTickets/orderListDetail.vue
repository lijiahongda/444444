<template>
	<section class="app-container">
		<div class="clearfix">
			<div style="margin-bottom:20px;">
				<router-link :to="{path:'/TrainTickets/dataStatistics',query:{type:2}}">
					<el-button type="primary">返回列表</el-button>
				</router-link>
			</div>
			<div class="details" v-loading="TrainTicketsLoading" element-loading-text="拼命加载中">
				<div class="detailsTitle">基本信息</div>
				<div class="list">
					<p>订单编号：</p>
					<span>{{dialogDetailsOrderNumber || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>三方单号：</p>
					<span>{{dialogDetailsThreeOrder || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单创建时间：</p>
					<span>{{dialogDetailsOrderStartTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>会员手机号：</p>
					<span>{{dialogDetailsMemberNumber || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单状态：</p>
					<span>{{dialogDetailsOrderStatus || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>联系人姓名：</p>
					<span>{{dialogDetailsContactName || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>联系人电话：</p>
					<span>{{dialogDetailsContactNumber || '暂无数据'}}</span>
				</div>
				<div class="detailsTitle">出票信息</div>
				<div class="list">
					<p>出票时间：</p>
					<span>{{dialogDetailsTicketTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>车票数量：</p>
					<span>{{dialogDetailsTicketNumber || '暂无数据'}}</span>
				</div>
<!--				<div class="list">-->
<!--					<p>火车类型：</p>-->
<!--					<span>{{dialogDetailsTicketStatus || '暂无数据'}}</span>-->
<!--				</div>-->
				<div class="list">
					<p>车次：</p>
					<span>{{dialogDetailsTrains || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>出发城市：</p>
					<span>{{dialogDetailsDepartureCity || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>到达城市：</p>
					<span>{{dialogDetailSarriveCity || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>出发时间：</p>
					<span>{{dialogDetailsDepartureTime || '暂无数据'}}</span>
				</div>
				<div class="detailsTitle">支付信息</div>
				<div class="list">
					<p>支付单号：</p>
					<span>{{dialogDetailsPaymentOrder || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付时间：</p>
					<span>{{dialogDetailsPaymentTime || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付渠道：</p>
					<span>{{dialogDetailsPaymentChannel || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>订单总价：</p>
					<span>{{dialogDetailsOrderPrice || '暂无数据'}}</span>
				</div>
				<div class="list">
					<p>支付状态：</p>
					<span>{{dialogDetailsPaymentStatus || '暂无数据'}}</span>
				</div>
			</div>
			<!--			所有车票信息-->
			<div class="" v-loading="TrainTicketsLoading" element-loading-text="拼命加载中">
				<p class="PassengerInformationStyle">所有车票信息</p>
				<el-table
					:data="PassengerInformationData"
					style="width: 100%" border>
					<el-table-column
						prop="child_order_sn"
						label="子订单号"
						fixed="left">
					</el-table-column>
					<el-table-column
						prop="ticket_no"
						label="车票号码">
					</el-table-column>
					<el-table-column
						prop="passenger_name"
						label="姓名">
					</el-table-column>
					<el-table-column
						prop="passenger_card_type_name"
						label="证件类型">
					</el-table-column>
					<el-table-column
						prop="passenger_id_card"
						label="证件号码"
						width="180">
					</el-table-column>
					<el-table-column
						prop="passenger_mobile"
						label="联系电话" width="140px">
					</el-table-column>
					<el-table-column
						prop="passenger_type_name"
						label="乘车人" width="100px">
					</el-table-column>
					<el-table-column
						prop="ticket_sale_price"
						label="车票价格(元)"
						width="100">
					</el-table-column>
					<el-table-column
						prop="ticket_seat_name"
						label="座位类型">
					</el-table-column>
					<el-table-column
						prop="ticket_car_number"
						label="车厢">
					</el-table-column>
					<el-table-column
						prop="ticket_seat_number"
						label="座位号">
					</el-table-column>
<!--					<el-table-column-->
<!--						prop="depart_date"-->
<!--						label="出发时间">-->
<!--					</el-table-column>-->
					<el-table-column
						prop="order_status_name"
						label="车票状态"
						fixed="right">
					</el-table-column>
				</el-table>
			</div>
<!--			退款流水-->
			<div class="" v-if="showRefundWater" v-loading="TrainTicketsLoading" element-loading-text="拼命加载中">
				<p class="PassengerInformationStyle">退款流水</p>
				<el-table
					:data="CancellationWaterData"
					style="width: 100%" border>
					<el-table-column
						prop="refund_time"
						label="退款时间"
						fixed="left">
					</el-table-column>
					<el-table-column
						prop="update_time"
						label="退款到账时间"
						fixed="left">
					</el-table-column>
					<el-table-column
						prop="order_no"
						label="退款单号">
					</el-table-column>
					<el-table-column
						prop="data_status_name"
						label="退款状态">
					</el-table-column>
					<el-table-column
						prop="reason"
						label="退款原因">
					</el-table-column>
				</el-table>
			</div>
			<!--			客服信息备注-->
			<div class="">
				<!--		以往客服信息		-->
				<p class="PassengerInformationStyle">客服信息备注</p>
				<el-container style="margin-bottom: 20px;" v-for="(item,index) in PassengerInformationList" :key="index">
					<el-main class="" style="background-color:#fff;width:800px;" >
						<p style="text-align: left;margin-bottom: 10px;">{{item.operation_remark}}</p>
						<div class="" style="text-align: right;">
							<span>{{item.operation_user_name}}</span>
							&nbsp;&nbsp;&nbsp;&nbsp&nbsp
							<span>{{item.update_time}}</span>
						</div>
					</el-main>
				</el-container>
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="ordertExtarea">
				</el-input>
			</div>
			<!--			客服信息提交按钮-->
			<div class="floatRight">
				<el-button type="primary" @click="CustomerServiceSub">提交客服信息</el-button>
			</div>
		</div>
	</section>
</template>

<script>
	import {getTrainTicketsListDetail,getInformationService,SetInformationService} from '@/api/financialCps'
    export default {
        name: "orderListDetail",
		data(){
        	return {
				TrainTicketsLoading:false,
				dialogDetailsOrderNumber:'',//订单编号
				dialogDetailsThreeOrder:'',//三方单号
				dialogDetailsOrderStartTime:'',//订单创建时间
				dialogDetailsMemberNumber:'',//会员手机号
				dialogDetailsOrderStatus:'',//订单状态
				dialogDetailsContactName:'',//联系人姓名
				dialogDetailsContactNumber:'',//联系人电话
				dialogDetailsTicketTime:'',//出票时间
				dialogDetailsTicketNumber:"",//车票数量
				// dialogDetailsTicketStatus:'',//火车类型
				dialogDetailsTrains:'',//车次
				dialogDetailsDepartureCity:'',//出发城市
				dialogDetailSarriveCity:'',//到达城市
				dialogDetailsDepartureTime:'',//出发时间
				dialogDetailsPaymentOrder:'',//支付单号
				dialogDetailsPaymentTime:'',//支付时间
				dialogDetailsPaymentChannel:'',//支付渠道
				dialogDetailsOrderPrice:'',//订单总价
				dialogDetailsPaymentStatus:'',//支付状态
				PassengerInformationData:[],//所有车票信息表
				PassengerInformationList:[],//以往客服信息表
				CancellationWaterData:[],//退款流水表
				showRefundWater:false,//是否展示退款流水表	只有退票成功的订单才展示
				ordertExtarea:'',//新客服信息输入框
			}
		},
		created() {
			this.row = this.$route.query ? this.$route.query.row : '';
			if (this.row) {
				this.getOrderDetail(this.row.order_id);//get订单详情
				this.getInformationServiceData(this.row.ordersn);//get客服信息
			}
		},
		methods:{
			//get订单详情
			getOrderDetail(orderId){
				this.TrainTicketsLoading = true;
				let getTrainTicketsListDetailData = {
					'id':orderId
				};
				getTrainTicketsListDetail(getTrainTicketsListDetailData).then(res=>{
					this.TrainTicketsLoading = false;
					if(res.data.code == 200){
						this.dialogDetailsOrderNumber = res.data.data.master_order_info.ordersn;//订单编号
						this.dialogDetailsThreeOrder = res.data.data.master_order_info.mid_ordersn;//三方单号
						this.dialogDetailsOrderStartTime = res.data.data.master_order_info.created_at;//订单创建时间
						this.dialogDetailsMemberNumber = res.data.data.master_order_info.contact_tel;//会员手机号
						this.dialogDetailsOrderStatus = res.data.data.master_order_info.order_status_name;//订单状态
						this.dialogDetailsContactName = res.data.data.master_order_info.contact_name;//联系人姓名
						this.dialogDetailsContactNumber = res.data.data.master_order_info.contact_tel;//联系人电话
						this.dialogDetailsTicketTime = res.data.data.master_order_info.updated_at;//出票时间
						this.dialogDetailsTicketNumber = res.data.data.master_order_info.passenger_number;//车票数量
						// this.dialogDetailsTicketStatus = res.data.data.master_order_info.ticket_seat_name;//火车类型
						this.dialogDetailsTrains = res.data.data.master_order_info.train_number;//车次
						this.dialogDetailsDepartureCity = res.data.data.master_order_info.from_station;//出发城市
						this.dialogDetailSarriveCity = res.data.data.master_order_info.to_station;//到达城市
						this.dialogDetailsDepartureTime = res.data.data.master_order_info.depart_date;//出发时间
						this.dialogDetailsPaymentOrder = res.data.data.master_order_info.pay_form_no;//支付单号
						this.dialogDetailsPaymentTime = res.data.data.master_order_info.pay_time;//支付时间
						this.dialogDetailsPaymentChannel = res.data.data.master_order_info.pay_mode_name;//支付渠道
						this.dialogDetailsOrderPrice = res.data.data.master_order_info.order_amount;//订单总价
						this.dialogDetailsPaymentStatus = res.data.data.master_order_info.pay_status_name;//支付状态
						for(let i=0;i<res.data.data.child_order_info.length;i++){
							res.data.data.child_order_info[i].depart_date = res.data.data.depart_date;
						}
						this.PassengerInformationData = res.data.data.child_order_info;//所有车票信息表
						console.log(res.data.data.refund_list);
						console.log((res.data.data.refund_list).length);
						if((res.data.data.refund_list).length != 0){
							this.showRefundWater = true;
							this.CancellationWaterData = res.data.data.refund_list;//退款流水
						}else{
							this.showRefundWater = false;
						}

					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//get客服信息
			getInformationServiceData(id){
				let getInformationServiceData = {
					master_order_no:id
				};
				getInformationService(getInformationServiceData).then(res=>{
					if(res.data.code == 200){
						this.PassengerInformationList = res.data.data;//以往客服信息表
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//客服信息提交按钮
			CustomerServiceSub(){
				const loading = this.$loading({
					lock: true,
					text: '客服信息提交中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let adminUserId = JSON.parse(localStorage.getItem('userInfo')).adminUserId;
				let SetInformationServiceData = {
					master_order_no:this.row.ordersn,
					operation_user_id:adminUserId,
					operation_remark:this.ordertExtarea
				};
				SetInformationService(SetInformationServiceData).then(res=>{
					loading.close();
					if(res.data.code == 200){
						this.$message.success(res.data.msg);
						this.ordertExtarea = '';//清空记录
						this.getInformationServiceData(this.row.ordersn);//更新客服信息
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
		}
	}
</script>

<style scoped>
	.clearfix {
	&:after {
		 visibility: hidden;
		 display: block;
		 font-size: 0;
		 content: " ";
		 clear: both;
		 height: 0;
	 }
	}
	.floatRight{
		float: right;
		margin: 20px;
	}
</style>
