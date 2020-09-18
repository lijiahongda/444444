<template>
	<section class="orderDetails">
		<!-- 订单信息 -->
		<div style="margin-bottom:20px;">
			<router-link :to="{path:'/train-order'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
		</div>
		<el-row class="mb20">
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">订单基本信息</el-col>
				<el-table :data="orderBaseInfo" border style="width: 100%">
					<el-table-column prop="orderNo" align="center" label="订单编号"></el-table-column>
					<el-table-column prop="midOrdersn" align="center" label="中台订单编号"></el-table-column>
					<el-table-column prop="createTime" align="center" label="订单创建时间"></el-table-column>
                    <el-table-column prop="trainNumber" align="center" label="车次"></el-table-column>
					<el-table-column label="车次时间"  align="center" width="220">
						<template slot-scope="scope">
							<span>发车时间：{{scope.row.departDate}} {{scope.row.startTime}}</span><br>
							<span>到达时间：{{scope.row.arrivalDate}}  {{scope.row.endTime}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="fromStation" align="center" label="始发站"></el-table-column>
                    <el-table-column prop="toStation" align="center" label="终点站"></el-table-column>
					<el-table-column prop="orderStatus" align="center" label="订单状态"></el-table-column>
                    <el-table-column prop="memberMobile" align="center" label="手机号"></el-table-column>
                    <el-table-column prop="memberTruename" align="center" label="会员姓名"></el-table-column>
<!--					<el-table-column label="订单操作记录" align='center' fixed="right">-->
<!--						<template slot-scope="scope">-->
<!--							<el-button size="mini" trigger="hover" type="primary" plain @click="editUserInfo(scope.row.ordersn)">查看记录</el-button>-->
<!--						</template>-->
<!--					</el-table-column>-->
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">子单信息</el-col>
				<el-table :data="orderTrainOccupantInfo" border style="width: 100%">
					<el-table-column prop="ordersnSon" align="center" label="子订单编号"></el-table-column>
					<el-table-column prop="truename" align="center" label="姓名"></el-table-column>
					<el-table-column prop="mobile" align="center" label="电话"></el-table-column>
					<el-table-column prop="cardType" align="center" label="证件类型"></el-table-column>
					<el-table-column prop="cardId" align="center" label="证件号码"></el-table-column>
					<el-table-column prop="sex" align="center" label="性别"></el-table-column>

					<el-table-column prop="passengerType" align="center" label="旅客类型"></el-table-column>

                    <el-table-column prop="seatName" align="center" label="坐类型"></el-table-column>

                    <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>

                    <el-table-column prop="salePrice" align="center" label="价格"></el-table-column>

                    <el-table-column prop="seatInfo" align="center" label="座位信息"></el-table-column>

                    <el-table-column prop="ticketNo" align="center" label="车票号码"></el-table-column>
					<el-table-column prop="adminRefundStatus" align="center" label="退款状态"></el-table-column>
					<el-table-column label="退款操作"  align="center" width="180px" fixed="right">
						<template slot-scope="scope">
							<div v-if="scope.row.orderStatus == '购票成功' &&scope.row.adminRefundStatus == '无'">
								<el-button  type="primary" plain @click="checkTrainRefund(scope.row,1)">同意</el-button>
								<el-button  type="" plain @click="checkTrainRefund(scope.row,2)">拒绝</el-button>
							</div>
						</template>
					</el-table-column>

				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">支付信息</el-col>
				<el-table :data="orderBaseInfo" border style="width: 100%">

					<el-table-column prop="orderAmount" align="center" label="订单金额"></el-table-column>
					<el-table-column prop="actualPay" align="center" label="实际支付金额"></el-table-column>
					<el-table-column prop="payTime" align="center" label="支付时间"></el-table-column>
					<el-table-column prop="payFormNo" align="center" label="支付单号"></el-table-column>
					<el-table-column prop="payMode" align="center" label="支付方式">
					</el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">退款信息
				</el-col>
				<el-table :data="orderTrainOccupantInfo" border style="width: 100%">
                    <el-table-column prop="refundStatus" align="center" label="退款状态"></el-table-column>
					<el-table-column prop="refunds" align="center" label="应退款"></el-table-column>
					<el-table-column prop="refundFee" align="center" label="退款手续费"></el-table-column>
					<el-table-column prop="startRefundTime" align="center" label="开始退款时间"></el-table-column>
					<el-table-column prop="endRefundTime" align="center" label="完成退款时间"></el-table-column>
                    <el-table-column prop="refundFormNo" align="center" label="收银台退款单号"></el-table-column>

				</el-table>
			</el-row>
			<!-- <el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">第三方推送信息</el-col>
				<el-table :data="handleInfo" border style="width: 100%">
					<el-table-column prop="ordersn_son" align="center" label="子订单编号"></el-table-column>
					<el-table-column prop="goods_name" align="center" label="商品名称"></el-table-column>
					<el-table-column prop="push_status_name" align="center" label="推送状态"></el-table-column>
					<el-table-column prop="tuikuan" align="center" label="是否退款"></el-table-column>
					<el-table-column prop="push_price" align="center" label="扣款金额"></el-table-column>
					<el-table-column prop="channel_name" align="center" label="渠道名称"></el-table-column>
				</el-table>
			</el-row> -->
		</el-row>
		<el-dialog title="收货人信息" :visible.sync="dialogFormVisible">
			<el-form :model="obj">
				<el-form-item label="收货人姓名">
					<el-input v-model="obj.receiver_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货人电话">
					<el-input v-model="obj.receiver_tel" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="收货地址">
					<el-input v-model="obj.receiver_address" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="添加物流信息" :visible.sync="addLowInfo">
			<el-form :model="lowList">
				<el-form-item label="物流公司">
					<el-input v-model="lowList.logistice_company" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="快递单号">
					<el-input v-model="lowList.logistice_number" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="运费">
					<el-input v-model="lowList.logistice_money" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addLowInfo = false">取 消</el-button>
				<el-button type="primary" @click="onLow">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="查看物流信息" :visible.sync="logistics">
			<el-table :data="activities">
				<el-table-column property="logisticeCompany" label="物流公司" width="150"></el-table-column>
				<el-table-column property="logisticeNumber" label="物流单号" width="200"></el-table-column>
				<el-table-column property="logisticeMoney" label="运费"></el-table-column>
				<el-table-column property="logisticeRemark" label="备注"></el-table-column>
			</el-table>
			 <el-timeline v-if="timeInfo">
				<el-timeline-item
				  v-for="(activity, index) in timeInfo"
				  :key="index"
				  :timestamp="activity.msgTime">
				  {{activity.content}}
				</el-timeline-item>
			  </el-timeline>
		</el-dialog>
		<el-dialog title="确认发货" :visible.sync="isSend">
			<el-form>
				<el-form-item label="备注信息">
					<el-input type="textarea" v-model="confirmSend.send_remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isSend = false">取 消</el-button>
				<el-button type="primary" @click="onSend">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="" :visible.sync="seeShow">
			<el-form>
				<el-form-item label="备注信息:">
					<el-col>{{send_remark}}</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary"  @click="seeShow = false">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="添加酒店码" :visible.sync="addCodeInfo">
			<el-form :model="codeInfo">
				<el-form-item label="酒店码">
					<el-input v-model="codeInfo.code" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addCodeInfo = false">取 消</el-button>
				<el-button type="primary" @click="addCode">确 定</el-button>
			</div>
		 </el-dialog>


	</section>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
		getTrainOrderInfo,
      checkTrainRefund
	} from '@/api/order'

	export default {
		directives: {
			waves
		},
		data() {
			return {
				dialogFormVisible: false,
				orderNo: '', //订单编号
				peopleList: [],
				styleObject: {},
				s_showByRow: true,
				details: {},
				orderBaseInfo: [],
				receiverInfo: [],
				orderTrainOccupantInfo: [],
				orderPayInfo: [],
				handleInfo:[],//推送信息
				ordersn: "",
				obj: {
					ordersn: '',
					receiver_address: '',
					receiver_name: '',
					receiver_tel: '',
				},
				addLowInfo: false,
				addCodeInfo:false,
				lowList: {
					record_id: "",
					logistice_company: "",
					logistice_number: "",
					logistice_money: "",
				},
				activities: [], //物流信息
				logistics: false,
				isSend: false,
				seeShow:false,
				confirmSend: {
					record_id: "",
					send_remark: "",
				},
				send_remark:"",//备注信息
				timeInfo:"",//物流详情
				codeInfo:{},
			}
		},
		computed: {
			rowCount: function() {
				return Math.ceil(this.tableData.length / 2)
			}
		},
		created() {
			this.orderNo = this.$route.query ? this.$route.query.orderNo : this.$router.query ? this.$router.query.orderNo : ''
			if (this.orderNo) {
				this.getInfo()
			}
			this.styleObject = this.tableStyle
			if (this.showByRow !== undefined) {
				this.s_showByRow = this.showByRow
			}
		},
		methods: {
			// 确认发货
			isConfirmSend(id) {
				this.isSend = true;
				this.record_id = id
			},
			onSend(){
				this.confirmSend.record_id = this.record_id;
				confirmSend(this.confirmSend).then(res=>{
					if(res.data.code == 200){
						this.isSend = false;
						this.$message.success(res.data.msg ||"发货成功" )
						this.getInfo()
					}else{
						this.$message.error(res.data.msg ||"发货失败")
					}
				})
			},
			// 查看备注信息
			seeSend(id){
				this.seeShow = true;
				getLogistices({
					record_id: id
				}).then(res => {
					this.send_remark = res.data.data.list[0].send_remark;
				})
			},
		  //退款
          checkTrainRefund(row,type){
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
                  this.checkTrainRefundAffirm(params);
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
                this.checkTrainRefundAffirm(params);
			  }


		  },
          checkTrainRefundAffirm(value){
            checkTrainRefund(value).then(res=>{
              if(res.data.code == 200){
                this.$message.success('操作成功');
                this.getInfo();
              }
            })
		  },
			//确认物流信息
			onLow(id) {
				this.lowList.record_id = this.record_id;
				addLogistice(this.lowList).then(res => {
					if (res.data.code == 200) {
						this.addLowInfo = false;
						this.$message.success(res.data.msg ||"添加成功")
						this.getInfo()
					}else{
						this.$message.error(res.data.msg ||"添加失败")
					}
				})
			},

			addCode()
			{
				this.codeInfo.record_id = this.record_id;
				// console.log(this.codeInfo);return
				updateOrderGoodsHotelCode(this.codeInfo).then(res => {
					if (res.data.code == 200) {
						this.addCodeInfo = false;
						this.$message.success(res.data.msg ||"添加成功")
						this.getInfo()
					}else{
						this.$message.error(res.data.msg ||"添加失败")
					}
				})
			},


			addLow(id) {
				this.addLowInfo = true;
				this.record_id = id;
			},

			clickAddCode(id) {
				this.addCodeInfo = true;
				this.record_id = id;
			},
			//差看物流信息
			isLow(id) {
				this.logistics = true;
				getLogistices({
					record_id: id
				}).then(res => {
					this.activities = res.data.data.list;
					this.timeInfo = res.data.data.list[0].logisticeInfo.orderTrack || '';
				})
			},
			onEdit() {
				this.dialogFormVisible = true;
				this.obj.receiver_address = this.details.receiver_address
				this.obj.receiver_name = this.details.receiver_name
				this.obj.receiver_tel = this.details.receiver_tel
			},
			onSubmit() {
				updateReceiver(this.obj).then(res => {
					if (res.data.code == 200) {
						this.dialogFormVisible = false;
						this.$message({
							type: "success",
							message: res.data.msg || '成功'
						})
						this.details.receiver_address = this.obj.receiver_address
						this.details.receiver_name = this.obj.receiver_name
						this.details.receiver_tel = this.obj.receiver_tel
						this.receiverInfo = [];
						this.receiverInfo.push(this.details)
					} else {
						this.$message({
							type: "error",
							message: res.data.msg || '失败'
						})
					}
				})
			},
			getInfo() {
				let params = {
					ordersn: this.orderNo
				}
				getTrainOrderInfo(params).then(res => {
					if (res.data.code === 200) {
                        this.orderTrainOccupantInfo = res.data.data.orderTrainOccupantInfo
                        this.orderBaseInfo.push(res.data.data.orderBaseInfo)



						// this.details = res.data.data.receiverInfo;
						// this.obj.ordersn = res.data.data.orderBaseInfo.ordersn;
						// this.receiverInfo.push(res.data.data.receiverInfo)

						// this.orderPayInfo = res.data.data.orderPayInfo
						// this.handleInfo = res.data.data.handleInfo
					}else{
						this.$message.error(res.data.msg || "网络错误")
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.orderDetails {
		font-size: 14px;
		padding: 20px;
		margin: 40px 30px;
		border: 1px solid #DBDBDB;
		border-radius: 8px;
	}

	.low_info {
		cursor: pointer;
	}

	.search-row .title {
		margin: 40px 0 30px;
		font-size: 18px;
		font-weight: bold;
	}
	.el-table__header-wrapper{overflow:hidden}
	.el-timeline{margin-top:35px}
</style>
