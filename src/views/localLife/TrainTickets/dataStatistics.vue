<template>
	<section class="app-container" id="staticWidth">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="订单统计" name="first">
				<el-form ref="form" label-width="120px" :inline="true">
					<el-form-item label="订单状态：" label-width="100px">
						<el-select v-model="form.orderStatus"
								   placeholder="订单状态"
								   clearable
								   style="width: 160px;">
							<el-option v-for="(item,index) in options" :key="index" :label='item.label' :value='item.value'/>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间：" label-width="100px">
						<el-col>
							<el-form-item prop="startTime"
										  style="margin-right:0">
								<el-date-picker
									v-model="form.formTime"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
								>
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-row style="float: right;margin-right: 20px;" class="clearfix">
						<el-form-item class="btn_text">
							<el-button type="primary" @click="OrderStatisticalSearch" plain >查询</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="订单列表明细" name="second">
<!--				筛选条件-->
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="订单号">
						<el-input v-model="orderListNumber" placeholder="请输入订单号" style="width: 160px;"></el-input>
					</el-form-item>
					<el-form-item label="三方单号">
						<el-input v-model="orderListThreeNumber" placeholder="请输入三方单号" style="width: 160px;"></el-input>
					</el-form-item>
					<el-form-item label="支付单号">
						<el-input v-model="orderListPaymentOrder" placeholder="请输入支付单号" style="width: 160px;"></el-input>
					</el-form-item>
					<el-form-item label="订单状态">
						<el-select v-model="orderStatusValue" placeholder="请选择订单状态" style="width: 160px;">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
								clearable>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间">
						<el-col>
							<el-form-item prop="startTime" style="margin-right:0">
								<el-date-picker v-model="start_time"
												type="datetime"
												value-format="yyyy-MM-dd"
												placeholder="起始时间"
												style="width: 160px;"/>
							</el-form-item>
							<span>至</span>
							<el-form-item prop="endTime">
								<el-date-picker v-model="end_time"
												type="datetime"
												value-format="yyyy-MM-dd"
												placeholder="结束时间"
												style="width: 160px;"/>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="会员手机号">
						<el-input v-model="orderListMemberPhoneNumber" placeholder="请输入会员手机号" width="160px;"></el-input>
					</el-form-item>
						<div class="clearfix">
							<el-button class="floatRight" type="primary" @click="orderListOnSubmit">查询</el-button>
						</div>
				</el-form>
<!--				列表-->
				<div class="detail">
					<div class="title">订单列表</div>
					<el-table :data="orderList.list"  border style="width: 100%;margin-top:20px;" v-loading="orderListLoading" element-loading-text="拼命加载中">
						<el-table-column prop="ordersn" align="center" label="订单编号" fixed="left"></el-table-column>
						<el-table-column prop="mid_ordersn" align="center" label="中台订单号" width="120"></el-table-column>
						<el-table-column prop="mid_ordersn" align="center" label="三方单号"></el-table-column>
						<el-table-column prop="created_at" align="center" label="下单时间"></el-table-column>
						<el-table-column prop="pay_form_no" align="center" label="支付单号"></el-table-column>
						<el-table-column prop="actual_pay" align="center" label="支付金额"></el-table-column>
						<el-table-column prop="pay_status_name" align="center" label="支付状态"></el-table-column>
						<el-table-column prop="contact_tel" label="会员手机号" align="center" width="120"></el-table-column>
						<el-table-column prop="order_status_name" align="center" label="订单状态"></el-table-column>
						<el-table-column prop="passenger_number" align="center" label="出票数量"></el-table-column>
						<el-table-column prop="train_number" align="center" label="车次"></el-table-column>
						<el-table-column prop="from_station" align="center" label="出发城市"></el-table-column>
						<el-table-column prop="to_station" align="center" label="到达城市"></el-table-column>
						<el-table-column prop="depart_date" align="center" label="出发时间"></el-table-column>
						<el-table-column fixed="right" label="操作" align="center" width="130">
							<template slot-scope="scope">
								<el-button
									@click="showOrderDetails(scope.row,2)"
									type="text"
									size="small">
									查看订单详情
								</el-button>
<!--								<el-button-->
<!--									v-if="scope.row.is_refund==1"-->
<!--									@click="OrderRefund(scope.row,0)"-->
<!--									type="text"-->
<!--									size="small">-->
<!--									查看退款详情-->
<!--								</el-button>-->
								<el-button
									v-if="scope.row.is_refund==1"
									@click="OrderRefund(scope.row,1)"
									type="text"
									size="small">
									退票
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
<!--				分页-->
				<div class="pagination-container" style="text-align:right;margin-bottom:50px">
					<el-pagination
						:current-page="orderList.page"
						:page-size="orderList.pageSize"
						:total="orderList.total"
						background
						layout="total, sizes, prev, pager, next, jumper"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						@prev-click="onClickPrev"
						@next-click="onClickNext"
					/>
				</div>
			</el-tab-pane>
<!--			<el-tab-pane label="退票退款" name="third">-->
<!--				&lt;!&ndash;				筛选条件&ndash;&gt;-->
<!--				<el-form :inline="true" class="demo-form-inline">-->
<!--					<el-form-item label="订单号">-->
<!--						<el-input v-model="refundOrderListNumber" placeholder="请输入订单号" style="width: 160px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="三方单号">-->
<!--						<el-input v-model="refundOrderListThreeNumber" placeholder="请输入三方单号" style="width: 160px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="支付单号">-->
<!--						<el-input v-model="refundOrderListPaymentOrder" placeholder="请输入支付单号" style="width: 160px;"></el-input>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="退票状态">-->
<!--						<el-select v-model="refundOrderStatusValue" placeholder="请选择退票状态" style="width: 160px;">-->
<!--							<el-option-->
<!--								v-for="(item,index) in refundOptions"-->
<!--								:key="index"-->
<!--								:label="item.label"-->
<!--								:value="item.value"-->
<!--								clearable>-->
<!--							</el-option>-->
<!--						</el-select>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="订单时间">-->
<!--						<el-col>-->
<!--							<el-form-item prop="startTime" style="margin-right:0">-->
<!--								<el-date-picker v-model="refundStart_time"-->
<!--												type="datetime"-->
<!--												value-format="yyyy-MM-dd"-->
<!--												placeholder="起始时间"-->
<!--												style="width: 160px;"/>-->
<!--							</el-form-item>-->
<!--							<span>至</span>-->
<!--							<el-form-item prop="endTime">-->
<!--								<el-date-picker v-model="refundEnd_time"-->
<!--												type="datetime"-->
<!--												value-format="yyyy-MM-dd"-->
<!--												placeholder="结束时间"-->
<!--												style="width: 160px;"/>-->
<!--							</el-form-item>-->
<!--						</el-col>-->
<!--					</el-form-item>-->
<!--					<el-form-item label="会员手机号">-->
<!--						<el-input v-model="refundOrderListMemberPhoneNumber" placeholder="请输入会员手机号" width="160px;"></el-input>-->
<!--					</el-form-item>-->
<!--&lt;!&ndash;					<el-form-item>&ndash;&gt;-->
<!--						<div class="clearfix">-->
<!--							<el-button class="floatRight" type="primary" @click="refundOrderListOnSubmit">查询</el-button>-->
<!--						</div>-->
<!--&lt;!&ndash;					</el-form-item>&ndash;&gt;-->
<!--				</el-form>-->
<!--				&lt;!&ndash;				列表&ndash;&gt;-->
<!--				<div class="detail">-->
<!--					<div class="title">订单列表</div>-->
<!--					<el-table :data="refundOrderList.list"  border style="width: 100%;margin-top:20px;" v-loading="refundOrderLoading">-->
<!--						<el-table-column prop="orderNumber" align="center" label="订单编号" fixed="left"></el-table-column>-->
<!--						<el-table-column prop="mid_ordersn" align="center" label="中台订单号" width="120"></el-table-column>-->
<!--						<el-table-column prop="bank_name" align="center" label="三方单号"></el-table-column>-->
<!--						<el-table-column prop="third_create_time" align="center" label="下单时间"></el-table-column>-->
<!--						<el-table-column prop="point_type" align="center" label="支付单号"></el-table-column>-->
<!--						<el-table-column prop="promotion_amount" align="center" label="支付金额"></el-table-column>-->
<!--						<el-table-column prop="order_status" label="会员手机号" align="center" width="120"></el-table-column>-->
<!--						<el-table-column prop="bank_name" align="center" label="出票数量"></el-table-column>-->
<!--						<el-table-column prop="mobile" align="center" label="退票数量"></el-table-column>-->
<!--						<el-table-column prop="third_create_time" align="center" label="车次"></el-table-column>-->
<!--						<el-table-column prop="third_create_time" align="center" label="退款金额"></el-table-column>-->
<!--						<el-table-column prop="mobile" align="center" label="订单状态"></el-table-column>-->
<!--						<el-table-column fixed="right" label="操作" align="center" width="130">-->
<!--							<template slot-scope="scope">-->
<!--								<el-button-->
<!--									@click="refundShowOrderDetails(scope.row,0)"-->
<!--									type="text"-->
<!--									size="small">-->
<!--									查看订单详情-->
<!--								</el-button>-->
<!--								<el-button-->
<!--									@click="immediateRefund(scope.row,1)"-->
<!--									type="text"-->
<!--									size="small">-->
<!--									立即退款-->
<!--								</el-button>-->
<!--							</template>-->
<!--						</el-table-column>-->
<!--					</el-table>-->
<!--				</div>-->
<!--				&lt;!&ndash;				分页&ndash;&gt;-->
<!--				<div class="pagination-container" style="text-align:right;margin-bottom:50px">-->
<!--					<el-pagination-->
<!--						:current-page="refundOrderList.page"-->
<!--						:page-size="refundOrderList.pageSize"-->
<!--						:total="refundOrderList.total"-->
<!--						background-->
<!--						layout="total, sizes, prev, pager, next, jumper"-->
<!--						@size-change="refundHandleSizeChange"-->
<!--						@current-change="refundHandleCurrentChange"-->
<!--						@prev-click="refundOnClickPrev"-->
<!--						@next-click="refundOnClickNext"-->
<!--					/>-->
<!--				</div>-->
<!--			</el-tab-pane>-->
		</el-tabs>
	</section>
</template>

<script>
	import {
		getTrainTicketsList
	} from '@/api/financialCps'
export default {
    name: 'dataInfo',
    components: {

    },
    data() {
        return {
			activeName:'first',
			OrderPopupTitle:'',//订单详情dialogTitle
			dialogOrderDetail:false,//订单详情是否显示
			//订单统计
			form:{
				orderStatus:'',//订单状态
				formTime:''//订单时间
			},
			//订单列表明细
			orderListNumber:'',//订单号
			orderListThreeNumber:'',//三方订单号
			orderListPaymentOrder:'',//支付单号
			orderStatusValue:'',//订单状态绑定值
			options:[
				{
					value: '11',
					label: '全部'
				},
				{
					value: '0',
					label: '待扣位'
				},{
					value: '1',
					label: '出票成功'
				},{
					value: '2',
					label: '扣位成功'
				},{
					value: '3',
					label: '订单已取消'
				},{
					value: '4',
					label: '已退订'
				},{
					value: '5',
					label: '部分退单'
				},
			],//订单状态选择值
			start_time:'',//开始时间
			end_time:'',//结束时间
			orderListMemberPhoneNumber:'',//会员手机号
			orderListLoading:false,
			orderList:{
				list:[],
				page:1,
				pageSize:10,
				total:10
			},
			//退票退款
			refundOrderLoading:false,
			refundOrderListNumber:'',//订单号
			refundOrderListThreeNumber:'',//三方单号
			refundOrderListPaymentOrder:'',//支付单号
			refundOrderStatusValue:'',//退票状态
			refundOptions:[
				{
					value: '',
					label: '申请退票'
				},{
					value: '',
					label: '退票成功'
				},{
					value: '',
					label: '退款成功'
				}
			],
			refundStart_time:'',//退票开始时间
			refundEnd_time:'',//退票结束时间
			refundOrderListMemberPhoneNumber:'',//会员手机号
			refundOrderList:{
				list:[],
				page:1,
				pageSize:10,
				total:10
			},
        }
    },
	//created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
	// mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    created() {
		this.type = this.$route.query ? this.$route.query.type : '';
		if(this.type == 1){//订单统计
			this.activeName = 'first';
		}else if(this.type == 2){//订单列表
			this.activeName = 'second';
			this.getTrainTicketList(1,10);//火车票订单列表
		}else if(this.type == 3){//tuiptk
			this.activeName = 'third';
		}
    },
    methods: {
		handleClick(tab, event){
			console.log(tab, event);
			if(tab.index == '0'){//订单统计

			}else if(tab.index == '1'){//订单列表
				this.getTrainTicketList();//火车票订单列表
			}else if(tab.index == '2'){//退票退款

			}
		},
		//订单统计查询
		OrderStatisticalSearch(){

		},
		//get火车票订单
		getTrainTicketList(page,pageSize){
			this.orderListLoading = true;
			if(this.orderStatusValue == '11'){
				this.orderStatusValue = '';//全部状态传空
			}
			let obj = {};
			this.orderListNumber != '' || this.orderListNumber != undefined ? obj.master_order_no = this.orderListNumber : null;
			console.log(obj);
			let getTrainTicktsListData = {
				'page':page,
				'pageSize':pageSize,
				'master_order_no':this.orderListNumber,//订单编号
				'trade_no':this.orderListThreeNumber,//三方单号
				'pay_form_no':this.orderListPaymentOrder,//悦淘收银台支付单号
				'order_status':this.orderStatusValue,//订单状态	默认不传取全部订单
				'contact_tel':'',//订单联系人手机号码
				'start_time':this.start_time,//订单创建开始时间
				'end_time':this.end_time,//订单创建结束时间
				'mobile':this.orderListMemberPhoneNumber,//会员手机号码
			}
			getTrainTicketsList(getTrainTicktsListData).then(res=>{
				this.orderListLoading = false;
				if(res.data.code == 200){
					this.orderList.list = res.data.data.list;
					this.orderList.page = res.data.data.page;
					this.orderList.pageSize = res.data.data.pageSize;
					this.orderList.total = res.data.data.total;

				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//订单列表明细查询按钮
		orderListOnSubmit(){
			console.log('点我查询数据');
			this.getTrainTicketList(1,10);
		},
		//分页
		//每页条数发生改变时
		handleSizeChange(val) {
			this.orderList.pageSize = val;
			this.getTrainTicketList(1,val);//火车票订单列表
		},
		//当前页发生改变change
		handleCurrentChange(val) {
			this.orderList.page = val;
			this.getTrainTicketList(val,10);//火车票订单列表
		},
		//分页点击上一页change
		onClickPrev(val){
			this.orderList.page = val;
			this.getTrainTicketList(val,10);//火车票订单列表
		},
		//分页点击下一页change
		onClickNext(val){
			this.orderList.page = val;
			this.getTrainTicketList(val,10);//火车票订单列表
		},
		//订单列表查看详情dialog
		showOrderDetails(row){
			this.$router.push({path: '/TrainTickets/orderListDetail', query: {row:row}});
		},
		//订单列表页退票按钮
		OrderRefund(row,type){

			this.$router.push({path: '/TrainTickets/RefundListDetail', query: {row:row,type:type}});
		},
		//退票列表查询
		refundOrderListOnSubmit(){

		},
		//分页
		//每页条数发生改变时
		refundHandleSizeChange(val) {
			this.orderList.pageSize = val;

		},
		//当前页发生改变change
		refundHandleCurrentChange(val) {
			this.orderList.page = val;

		},
		//分页点击上一页change
		refundOnClickPrev(val){
			this.orderList.page = val;

		},
		//分页点击下一页change
		refundOnClickNext(val){
			this.orderList.page = val;

		},
		//退票退款列表查看详情dialog
		refundShowOrderDetails(row,type){
			this.$router.push({path: '/TrainTickets/RefundListDetail', query: {row:row,type:type}});
		},
		//退票退款列表立即退款dialog
		immediateRefund(row,type){
			this.$router.push({path: '/TrainTickets/RefundListDetail', query: {row:row,type:type}});
		},
		//客服信息提交按钮
		CustomerServiceSub(){

		},
		//取消确认退款
		CancelConfirmationRefund(){
			this.dialogRefund = false;//关闭弹窗
		},
		//确认退款
		serviceInformationSubmission(){

		}
    }
}
</script>
<style>
	.app-container{
		background-color:#f0f2f4;
	}
	.el-form-item__label{
		width:85px;
	}
	.detail{
		width:100%;
	}
	.detail .title{
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 10px;
	}
	.details .list{
		display: flex;
		align-items: center;
		height: 40px;
	}
	.details .list p{
		width: 200px;
		text-align: right;
		margin-right: 20px;
		font-weight: 600;
	}
	.detailsTitle{
		color: #000000;
		font-size: 18px;
		font-weight: 700;
		margin-left: 20px;
	}
	.PassengerInformationStyle{
		color: #000000;
		font-size: 18px;
		font-weight: 700;
	}
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
