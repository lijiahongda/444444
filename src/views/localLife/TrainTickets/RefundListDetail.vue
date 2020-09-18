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
				<div class="list">
					<p>火车类型：</p>
					<span>{{dialogDetailsTicketStatus || '暂无数据'}}</span>
				</div>
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
<!--				<div class="detailsTitle">退票信息</div>-->
<!--				<div class="list">-->
<!--					<p>退票状态：</p>-->
<!--					<span>{{dialogDetailsPaymentOrder || '暂无数据'}}</span>-->
<!--				</div>-->
<!--				<div class="list">-->
<!--					<p>申请时间：</p>-->
<!--					<span>{{dialogDetailsPaymentTime || '暂无数据'}}</span>-->
<!--				</div>-->
<!--				<div class="list">-->
<!--					<p>支付渠道：</p>-->
<!--					<span>{{dialogDetailsPaymentChannel || '暂无数据'}}</span>-->
<!--				</div>-->
<!--				<div class="list">-->
<!--					<p>退票总额：</p>-->
<!--					<span>{{dialogDetailsOrderPrice || '暂无数据'}}</span>-->
<!--				</div>-->
<!--				<div class="list">-->
<!--					<p>退票数量：</p>-->
<!--					<span>{{dialogDetailsPaymentStatus || '暂无数据'}}</span>-->
<!--				</div>-->
				<div class="list" v-if="showPassengerInformation">
					<p>退票备注：</p>
					<el-input
						type="textarea"
						:rows="2"
						placeholder="请输入退票备注"
						v-model="RefundDetailsNote">
					</el-input>
				</div>
			</div>
			<!--			退票提交按钮-->
			<div class="floatRight" v-if="showPassengerInformation">
				<el-button type="primary" @click="CancelConfirmationRefund(3)">取消</el-button>
				<el-button type="primary" @click="serviceInformationSubmission">确认退款</el-button>
			</div>
		</div>
	</section>
</template>

<script>
	import {
		getTrainTicketsListDetail,getTrainTicketsListRefund
	} from '@/api/financialCps'
    export default {
        name: "RefundListDetail",
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
				dialogDetailsTicketStatus:'',//火车类型
				dialogDetailsTrains:'',//车次
				dialogDetailsDepartureCity:'',//出发城市
				dialogDetailSarriveCity:'',//到达城市
				dialogDetailsDepartureTime:'',//出发时间
				dialogDetailsPaymentOrder:'',//支付单号
				dialogDetailsPaymentTime:'',//支付时间
				dialogDetailsPaymentChannel:'',//支付渠道
				dialogDetailsOrderPrice:'',//订单总价
				dialogDetailsPaymentStatus:'',//支付状态
				showPassengerInformation:false,//退票按钮是否显示
				PassengerInformationData:[],//所有车票信息表
				PassengerInformationList:[],//以往客服信息表
				ordertExtarea:'',//新客服信息输入框
				RefundDetailsNote:'',//退票备注
			}
		},
		created() {
			this.row = this.$route.query ? this.$route.query.row : '';
			this.type = this.$route.query ? this.$route.query.type : '';
			if (this.row) {
				this.getOrderDetail(this.row.id);//get订单详情
			}
			if(this.type == 1){ //0查看详情	1确认退款
				this.showPassengerInformation = true;//显示退款按钮和退款备注
			}else if(this.typw == 0){
				this.showPassengerInformation = false;
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
						this.dialogDetailsTicketStatus = res.data.data.master_order_info.ticket_seat_name;//火车类型
						this.dialogDetailsTrains = res.data.data.master_order_info.train_number;//车次
						this.dialogDetailsDepartureCity = res.data.data.master_order_info.from_station;//出发城市
						this.dialogDetailSarriveCity = res.data.data.master_order_info.to_station;//到达城市
						this.dialogDetailsDepartureTime = res.data.data.master_order_info.depart_date;//出发时间
						this.dialogDetailsPaymentOrder = res.data.data.master_order_info.pay_form_no;//支付单号
						this.dialogDetailsPaymentTime = res.data.data.master_order_info.pay_time;//支付时间
						this.dialogDetailsPaymentChannel = res.data.data.master_order_info.pay_mode_name;//支付渠道
						this.dialogDetailsOrderPrice = res.data.data.master_order_info.order_amount;//订单总价
						this.dialogDetailsPaymentStatus = res.data.data.master_order_info.pay_status_name;//支付状态
						// this.dialogDetailsPaymentOrder = res.data.data.master_order_info.refund_status_name;//退票状态
						// this.dialogDetailsPaymentTime = res.data.data.master_order_info.start_refund_time;//申请时间
						// this.dialogDetailsPaymentChannel = res.data.data.master_order_info.pay_mode_name;//支付渠道
						// this.dialogDetailsOrderPrice = res.data.data.master_order_info;//退票总额
						// this.dialogDetailsPaymentStatus = res.data.data.master_order_info;//退票数量
						this.RefundDetailsNote = '';//退票备注
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//取消确认退款
			CancelConfirmationRefund(type){
				this.$router.push({path: '/TrainTickets/dataStatistics', query: {tyoe:type}});
			},
			//确认退款
			serviceInformationSubmission(){
				const loading = this.$loading({
					lock: true,
					text: '退款确认中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let getTrainTicketsListRefundData = {
					orderNo:this.row.ordersn,
					adminUserId:JSON.parse(localStorage.getItem('userInfo')).adminUserId,
					// refundNote:''//退款备注
				};
				getTrainTicketsListRefund(getTrainTicketsListRefundData).then(res=>{
					loading.close();
					if(res.data.code == 200){
						this.$message.success(res.data.msg);
					}else{
						this.$message.error(res.data.msg);
					}
				})
			}
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
