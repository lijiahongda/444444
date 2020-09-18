<template>
	<section class="orderDetails">
		<!-- 订单信息 -->
		<div style="margin-bottom:20px;">
			<router-link v-if="orderType==5" :to="{path:'/Integral-order'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
			<router-link v-else :to="{path:'/shopMall-order'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>

			<span v-if="orderType==5">
				<el-button @click="upSendRemarkElg(sendRemark_record_id)" type="primary">添加备注</el-button>
			</span>
		</div>
		<el-row class="mb20">  
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">订单基本信息</el-col>
				<el-table :data="orderBaseInfo" border style="width: 100%">
					<el-table-column prop="ordersn" align="center" label="订单编号"></el-table-column>
					<el-table-column prop="mchId" align="center" label="商户号"></el-table-column>
					<el-table-column prop="created_at" align="center" label="订单创建时间"></el-table-column>
					<el-table-column prop="created_at" align="center" label="下单时间"></el-table-column>
					<el-table-column prop="order_source" align="center" label="订单来源"></el-table-column>
					<el-table-column prop="order_type" align="center" label="订单类型"></el-table-column>
					<el-table-column prop="order_status" align="center" label="订单状态"></el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">商品信息</el-col>
				<el-table :data="orderGoodsInfo" border style="width: 100%">
					<el-table-column prop="ordersn_son" align="center" label="子订单编号"></el-table-column>
					<el-table-column prop="goods_name" align="center" label="商品名称"></el-table-column>
					<el-table-column prop="goods_id" align="center" label="商品编号"></el-table-column>
					<el-table-column prop="goods_num" align="center" label="订购数量"></el-table-column>
					<el-table-column prop="goods_spec" align="center" label="商品规格"></el-table-column>
					<el-table-column prop="goods_price_orig" align="center" label="商品原价"></el-table-column>
					<el-table-column prop="goods_price_member" align="center" label="会员价"></el-table-column>
					<el-table-column prop="goodsBalanceAverage" align="center" label="使用余额金额"></el-table-column>
					<el-table-column prop="actual_price" align="center" label="售卖价格"></el-table-column>
					<el-table-column prop="supplier_name" align="center" label="供应商"></el-table-column>
					<el-table-column prop="receiving_time" align="center" label="确认收货时间"></el-table-column>
					<el-table-column prop="growth_value" align="center" label="订单成长值"></el-table-column>
					<el-table-column prop="refund_status" align="center" label="退款状态"></el-table-column>
					<el-table-column prop="is_send" align="center" label="发货状态">
					</el-table-column>
					<el-table-column prop="order_status" align="center" label="确认发货" width="120">
						<template slot-scope="scope">
							<el-button type="primary" @click="isConfirmSend(scope.row.record_id)"
								v-if="scope.row.is_send == '未发货'">确认发货</el-button>
							<p v-else class="low_info" @click="seeSend(scope.row.record_id)">备注信息</p>
						</template>
					</el-table-column>

					<el-table-column label="物流信息" align='center' fixed="right" width="150">
						<template slot-scope="scope">
							<el-button type="primary" v-if="scope.row.logistices_st == 0"
								@click="addLow(scope.row.record_id)">添加物流信息</el-button>
							<p class="low_info" v-else @click="isLow(scope.row.record_id)">查看物流信息</p>
						</template>
					</el-table-column>

					<el-table-column label="酒店码" align='center' fixed="right" width="150">
						<template slot-scope="scope">
							<!-- <span> 308941,334180,354286,354285,354283-->
							<span
								v-if="scope.row.goods_id==308941||scope.row.goods_id==334180 ||scope.row.goods_id==354286 ||scope.row.goods_id==354285 ||scope.row.goods_id==354283">
								<el-button type="primary" v-if="scope.row.code==null"
									@click="clickAddCode(scope.row.record_id)">添加酒店码</el-button>
								<p class="low_info" v-else>{{scope.row.code}}</p>
							</span>

						</template>
					</el-table-column>

					<el-table-column label="查看分佣" align='center' fixed="right" width="150">
						<template slot-scope="scope">
							<el-button class="low_info" @click="clickselBlous(scope.row.ordersn_son)">查看分佣明细</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作" v-if="role == 1" align='center' fixed="right" width="150">
						<template slot-scope="scope">
							<el-button size="mini" trigger="hover" type="primary" plain
								@click="refund(scope.row.ordersn_son)"> 发起退款 </el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">支付信息</el-col>
				<el-table :data="orderPayInfo" border style="width: 100%">
					<el-table-column prop="" align="center" label="订单编号">
						<template slot-scope='scope'>
							<span v-if="scope.$index == 0">主-{{scope.row.ordersn}}</span>
							<span v-else>子-{{scope.row.ordersn}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_price_orig" align="center" label="订单金额"></el-table-column>
					<el-table-column prop="actual_price" align="center" label="商品实际支付金额"></el-table-column>
					<el-table-column prop="pay_time" align="center" label="支付时间"></el-table-column>
					<el-table-column prop="pay_form_no" align="center" label="支付单号"></el-table-column>
					<el-table-column prop="coin" align="center" label="悦旅币抵扣"></el-table-column>
					<el-table-column prop="coupon_amount" align="center" label="优惠券抵扣"></el-table-column>
					<el-table-column prop="total_freight" align="center" label="运费"></el-table-column>
					<el-table-column prop="pay_type" align="center" label="支付方式">
					</el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">用户信息及物流信息
					<!-- <el-button type="primary" round @click="onEdit" style="margin-left: 30px;">修改收货人信息</el-button> -->
				</el-col>
				<el-table :data="receiverInfo" border style="width: 100%">
					<el-table-column prop="truename" align="center" label="会员真实姓名"></el-table-column>
					<el-table-column prop="mobile" align="center" label="会员手机号">

						<template slot-scope="scope" align="center">
							<router-link :to="{path:'userManage/user-info',query:{id:scope.row.mid}}" target="_blank">
								<el-button type="text" size="small">{{scope.row.mobile}}</el-button>
							</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="receiver_name" align="center" label="收货人姓名"></el-table-column>
					<el-table-column prop="receiver_tel" align="center" label="收货人电话"></el-table-column>
					<el-table-column prop="receiver_address" align="center" label="收货地址"></el-table-column>
				</el-table>
			</el-row>
			<el-row :gutter="24" class="search-row">
				<el-col :span="24" class="title">第三方推送信息</el-col>
				<el-table :data="handleInfo" border style="width: 100%">
					<el-table-column prop="ordersn_son" align="center" label="子订单编号"></el-table-column>
					<el-table-column prop="goods_name" align="center" label="商品名称"></el-table-column>
					<el-table-column prop="push_status_name" align="center" label="推送状态"></el-table-column>
					<!-- <el-table-column prop="tuikuan" align="center" label="是否退款"></el-table-column>
					<el-table-column prop="push_price" align="center" label="扣款金额"></el-table-column> -->
					<el-table-column prop="channel_name" align="center" label="渠道名称"></el-table-column>
				</el-table>
			</el-row>
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
		<el-dialog title="退款信息" :visible.sync="tkLowInfo" v-loading='loading'>
			<!-- <el-form :model="lowList" :rules="rules" ref="tkList"> -->
			<el-form ref="tkList" label-width="220px" :model="tkList" :rules="rules">
				<el-form-item label="退款原因" prop="reason">
					<el-select v-model="tkList.reason" placeholder="请选择" style="width: 300px;">
						<el-option v-for="item in reasonList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户退款说明" prop="reasonDesc">
					<el-input v-model="tkList.reasonDesc" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="退款图片" prop="picPath">
					<!-- <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="false" :on-remove="handleRemove2" :on-success="handleAvatarSuccess2"
						:before-upload="beforeAvatarUpload">
						<img v-if="tkList.picPath" :src="tkList.picPath" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload> -->
					<el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="3"
						:auto-upload="true" :on-exceed="handleOnExceed" :file-list="tkList.picArrPath"
						:on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="视频文件" prop="videoUrl">

					<el-row>
						<el-col :span="10">
							<el-upload class="upload-demo"
								action="https://open.yuelvhui.com/open/UploadAlibabaCloudVideo" ref="upVideo"
								:on-remove="handleRemove" :before-upload="beforeUpload" :on-success="handleVideoSuccess"
								:on-exceed="handleExceed" :on-preview="handlePreview" :limit="1" list-type="picture"
								:file-list="videoFileList">
								<div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
								<el-button size="small" type="primary">选择文件</el-button>
							</el-upload>
							<el-dialog title="预览视频" :visible.sync="showDialog" width="30%" :before-close="closeDialog">
								<div style="padding: 20px;height: 450px;">
									<video style="width: 100%;" :src="tkList.videoUrl" controls ref="videoReview">
										您的浏览器不支持视频,请升级浏览器,或更换浏览器重试
									</video>
								</div>
								<span slot="footer" class="dialog-footer">
									<el-button type="primary" @click="closeDialog">确 定</el-button>
								</span>
							</el-dialog>
						</el-col>
					</el-row>

				</el-form-item>
				<el-form-item label="用户申请退款钱" prop="applyPrice">
					<el-input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="tkList.applyPrice"
						autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="实际打款" prop="adminRefundPrice">
					<el-input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="tkList.adminRefundPrice"
						autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="运费" prop="freight">
					<el-input v-model="tkList.freight" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="app用户发起退换货类型" prop="type">
					<el-select v-model="tkList.type" name="" id="" style="width: 300px;">
						<el-option :key="2" :label="'仅退款'" :value="2"></el-option>
						<el-option :key="3" :label="'退款退货'" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="客户退货应退回的地址">
					<el-input v-model="tkList.recedeAddress" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<!--<el-form-item label="退货收货人姓名">
					<el-input v-model="tkList.recedePeople" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="退货收货人电话">
					<el-input oninput="value=value.replace(/[^\d\.]/g,'')" v-model="tkList.recedeMobile" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>-->
				<el-form-item label="单号，这个是订单的子单号" prop="subOrderNo">
					<el-input v-model="tkList.subOrderNo" :disabled="true" autocomplete="off" style="width: 300px;">
					</el-input>
				</el-form-item>
				<!--<el-form-item label="物流单号">
					<el-input v-model="tkList.logisticsNum" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="物流公司">
					<el-input v-model="tkList.expressName" autocomplete="off" style="width: 300px;"></el-input>
				</el-form-item>-->

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tkLowInfo = false">取 消</el-button>
				<el-button type="primary" @click="refundClick('tkList')">确 定</el-button>
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
				<el-table-column property="logisticeInfo2" label="备注"></el-table-column>
				<el-table-column property="receivingTime" label="收货时间"></el-table-column>
			</el-table>
			<el-timeline v-if="timeInfo">
				<el-timeline-item v-for="(activity, index) in timeInfo" :key="index" :timestamp="activity.time">
					{{activity.context}}
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

		<el-dialog title="备注信息" :visible.sync="sendRemark">
			<el-form>
				<el-form-item label="备注信息">
					<el-input type="textarea" v-model="sendRemarkInfo.send_remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="sendRemark = false">取 消</el-button>
				<el-button type="primary" @click="upSendRemark">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="" :visible.sync="seeShow">
			<el-form>
				<el-form-item label="备注信息:">
					<el-col>{{send_remark}}</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="seeShow = false">确 定</el-button>
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


		<el-dialog title="分佣" :visible.sync="selBlous" width="998px">
			<el-table :data="selBlousList" border style="width: 100%">

				<!-- <el-table-column prop="identity" align="center" label="身份"></el-table-column>
				<el-table-column prop="amount" align="center" label="分佣金额"></el-table-column>
				<el-table-column prop="memberMobile" align="center" label="姓名"></el-table-column>
				<el-table-column prop="createTime" align="center" label="分佣时间"></el-table-column> -->

				<el-table-column property="fidName" label="购买用户人" ></el-table-column>
        		<el-table-column property="midName" label="上级" ></el-table-column>
				<el-table-column property="orderSn" label="订单号" ></el-table-column>
				<el-table-column property="content" label="积分来源"></el-table-column>
				<el-table-column property="integral" label="积分"></el-table-column>
				<el-table-column property="type" label="类型"></el-table-column>
				<el-table-column property="status" label="成长值状态"></el-table-column>
				<el-table-column property="taskStatus" label="佣金状态(悦呗)"></el-table-column>
				<el-table-column property="create_time" label="时间"></el-table-column>
			</el-table>

			<div class="pagination-container" style="text-align:right;">
				<el-pagination :current-page="blousPage" :page-sizes="[20]" :page-size="20" :total="selBlousTotal"
					background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2"
					@current-change="handleCurrentChange2" />
			</div>

		</el-dialog>


	</section>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
		getMallOrderInfo,
		updateReceiver,
		getLogistices,
		addLogistice,
		confirmSend,
		updateOrderGoodsHotelCode,
		upSendRemark,
		refundLogistice,
		getRefundAddress
	} from '@/api/order'

	import {
		getOrderGoodsBonus,
		getAdminUserRole
	} from '@/api/admin'

	export default {
		directives: {
			waves
		},
		data() {
			return {
				showDialog: false,
				videoFileList: [],
				dialogFormVisible: false,
				tkLowInfo: false,
				selBlous: false,
				orderNo: '', //订单编号
				peopleList: [],
				styleObject: {},
				s_showByRow: true,
				details: {},
				orderBaseInfo: [],
				receiverInfo: [],
				orderGoodsInfo: [],
				orderPayInfo: [],
				handleInfo: [], //推送信息
				ordersn: "",
				obj: {
					ordersn: '',
					receiver_address: '',
					receiver_name: '',
					receiver_tel: '',
				},
				addLowInfo: false,
				addCodeInfo: false,
				lowList: {
					record_id: "",
					logistice_company: "",
					logistice_number: "",
					logistice_money: "",
				},
				tkList: {
					reason: '',
					reasonDesc: '',
					picPath: [],
					picArrPath: [],
					applyPrice: '',
					type: '',
					recedeAddress: '',
					recedePeople: '',
					recedeMobile: '',
					subOrderNo: '',
					logisticsNum: '',
					expressName: '',
					adminRefundPrice: '',
					freight: ''
				},
				isHaveTo: '',
				reasonList: [{
					value: '1',
					label: '商品质量问题'
				}, {
					value: '2',
					label: '物流太慢'
				}, {
					value: '3',
					label: '7天内退货'
				}, {
					value: '4',
					label: '不想要了'
				}, {
					value: '5',
					label: '其它'
				}],
				activities: [], //物流信息
				rules: {
					reason: [{
						required: true,
						message: '请填入必填项',
						trigger: 'blur'
					}],
					reasonDesc: [{
						required: true,
						message: '请填入必填项',
						trigger: 'blur'
					}],
					picPath: [{
						required: true,
						message: '请填入必填项',
						trigger: 'blur'
					}],
					applyPrice: [{
						required: true,
						pattern: /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/,
						message: '请填入必填项',
						trigger: 'blur'
					}],
					adminRefundPrice: [{
						required: true,
						pattern: /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/,
						message: '请填入必填项',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请填入必填项',
						trigger: 'blur'
					}]
					// recedeMobile: [{ required: true, message: '请填入必填项', trigger: 'blur' }],
					// recedeAddress: [{ required: true, message: '请填入必填项', trigger: 'blur' }],
					// recedePeople: [{required: true, message: '请填入必填项', trigger: 'blur' }]
				},
				logistics: false,
				sendRemark: false,
				isSend: false,
				seeShow: false,
				confirmSend: {
					record_id: "",
					send_remark: "",
				},
				send_remark: "", //备注信息
				timeInfo: "", //物流详情
				codeInfo: {},
				selBlousList: [],
				selBlousTotal: 0,
				blousPage: 1,
				orderNo: '',
				role: '',
				orderType: '',
				sendRemark_record_id: 0,
				sendRemarkInfo: {},
				dialogVisible: false,
				dialogImageUrl: '',
				loading: false,
			}
		},
		created() {
			this.orderNo = this.$route.query ? this.$route.query.orderNo : this.$router.query ? this.$router.query
				.orderNo : ''
			if (this.orderNo) {
				this.getInfo()
			}
			this.styleObject = this.tableStyle
			if (this.showByRow !== undefined) {
				this.s_showByRow = this.showByRow
			}
			this.getAdminUserRole();
		},
		methods: {
			//发起退款
			refund(ordersn_son) {
				this.tkLowInfo = true
				this.tkList.subOrderNo = ordersn_son
				getRefundAddress({
					subOrderNo: this.tkList.subOrderNo
				}).then(res => {
					if (res.data.code == 200) {
						this.tkList.recedeAddress = res.data.address
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			getAdminUserRole() {
				getAdminUserRole().then(res => {
					if (res.data.code == 200) {
						this.role = res.data.roleType;
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			refundClick() {
				this.$refs['tkList'].validate((valid) => {
					if (valid) {
						refundLogistice(this.tkList).then(res => {
							if (res.data.code == 200) {
								this.tkLowInfo = false;
								this.$message.success(res.data.msg)
								this.$refs['tkList'].resetFields()
							} else {
								this.$message.error(res.data.msg)
							}
						})
					} else {
						return false;
					}
				});
			},
			closeDialog() {
				this.showDialog = false
				this.$refs['videoReview'].pause()
			},
			handleExceed(files, fileList) {
				this.$message.warning(`最多上传1个文件`)
			},
			handlePreview(file) {
				console.log(file)
				this.showDialog = true
			},
			beforeUpload(file) {
				const isVideo = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb',
					'video/mov'
				].indexOf(file.type) == -1
				const isLt30M = file.size / 1024 / 1024 < 30
				if (isVideo) {
					this.$message.error('请上传正确的视频格式')
					return false
				}
				if (!isLt30M) {
					this.$message.error('上传视频大小不能超过 30MB!')
					return false
				}
				this.videoLoading = this.$loading({
					lock: true,
					text: '视频上传转码中,请稍候...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList)
			},
			handleVideoSuccess(res, file) {
				if (res.code == 200) {
					let videoId = res.data
					let url = 'https://open.yuelvhui.com/open/getVideoInfo?video_id=' + videoId
					this.axios({
						method: 'post',
						url: url
					}).then((item) => {
						if (!item.data.data.CoverURL) {
							this.timeOut = setInterval(this.handleVideoSuccess(res, file), 5000)

						} else {
							clearInterval(this.timeOut)
							this.videoLoading.close()
							this.$message.success('视频上传成功!')
							this.tkList.videoUrl = item.data.data.PlayURL
							this.tkList.videoCover = item.data.data.CoverURL
							this.videoFileList = [{
								name: file.name,
								url: item.data.data.CoverURL
							}]
						}

					})
				} else {
					this.videoLoading.close()
					this.$message.error('视频上传失败,请删除重试!')
					this.$refs.upVideo.clearFiles() //上传失败 清除文件列表
				}

			},
			handleOnExceed(file, fileList) {
				this.$message({
					type: "error",
					message: "最多上传两张图片"
				})
			},
			handleAvatarSuccess1(res, file, fileList) {
				console.log(fileList)
				let _this = this
				fileList.map(item => {
					if (item.response) {
						_this.tkList.picArrPath.push({
							url: item.response.url
						})
					}

				})
				console.log(_this.tkList.picArrPath)
				setTimeout(function () {
					_this.loading = false
					_this.tkList.picPath = []
					console.log(_this.tkList.picPath, '++++')
					_this.tkList.picArrPath.map(item => {
						_this.tkList.picPath.push(item.url)
					})
					console.log(_this.tkList.picPath, '++++----')
				}, 1000)
			},
			// handleRemove2() {
			// 	this.tkList.picPath = ''
			// },
			// handleAvatarSuccess2(res) {
			// 	if (res.code === 200) {
			// 		this.$set(this.tkList, 'picPath', res.url)
			// 	} else {
			// 		this.$set(this.tkList, 'picPath', '')
			// 	}

			// },
			beforeAvatarUpload(file) {
				this.loading = true
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				return isJPG;
			},
			// 确认发货//确认索引
			isConfirmSend(id) {
				this.isSend = true;
				this.record_id = id
			},
			onSend() {
				this.confirmSend.record_id = this.record_id;
				confirmSend(this.confirmSend).then(res => {
					if (res.data.code == 200) {
						this.isSend = false;
						this.$message.success(res.data.msg || "发货成功")
						this.getInfo()
					} else {
						this.$message.error(res.data.msg || "发货失败")
					}
				})
			},
			// 查看备注信息
			seeSend(id) {
				this.seeShow = true;
				getLogistices({
					record_id: id
				}).then(res => {
					this.send_remark = res.data.data.list[0].send_remark;
				})
			},

			clickselBlous(orderNo) {
				this.orderNo = "";
				this.selBlous = true;
				this.orderNo = orderNo;
				getOrderGoodsBonus({
					orderNo: orderNo
				}).then(res => {
					if (res.data.code === 200) {
						this.selBlousList = res.data.data.list
						this.selBlousTotal = res.data.data.total
					}

				})
			},

			handleSizeChange2(val) {},
			handleCurrentChange2(val) {
				this.blousPage = val
				this.clickselBlous(this.orderNo)
			},


			//确认物流信息
			onLow(id) {
				this.lowList.record_id = this.record_id;
				addLogistice(this.lowList).then(res => {
					if (res.data.code == 200) {
						this.addLowInfo = false;
						this.$message.success(res.data.msg || "添加成功")
						this.getInfo()
					} else {
						this.$message.error(res.data.msg || "添加失败")
					}
				})
			},

			addCode() {
				this.codeInfo.record_id = this.record_id;
				// console.log(this.codeInfo);return
				updateOrderGoodsHotelCode(this.codeInfo).then(res => {
					if (res.data.code == 200) {
						this.addCodeInfo = false;
						this.$message.success(res.data.msg || "添加成功")
						this.getInfo()
					} else {
						this.$message.error(res.data.msg || "添加失败")
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
					this.timeInfo = res.data.data.list[0].logisticeInfo || '';
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
				getMallOrderInfo(params).then(res => {
					if (res.data.code === 200) {
						this.orderType = res.data.data.orderBaseInfo.orderType;
						this.sendRemark_record_id = res.data.data.orderGoodsInfo[0].record_id
						this.details = res.data.data.receiverInfo;
						this.obj.ordersn = res.data.data.orderBaseInfo.ordersn;
						this.orderBaseInfo.push(res.data.data.orderBaseInfo)
						this.receiverInfo.push(res.data.data.receiverInfo)
						this.orderGoodsInfo = res.data.data.orderGoodsInfo
						this.orderPayInfo = res.data.data.orderPayInfo
						this.handleInfo = res.data.data.handleInfo
					} else {
						this.$message.error(res.data.msg || "网络错误")
					}
				})
			},
			upSendRemarkElg(record_id) {
				this.sendRemark_record_id = record_id;
				this.sendRemark = true;

			},

			upSendRemark() {
				this.sendRemarkInfo.record_id = this.sendRemark_record_id

				upSendRemark(this.sendRemarkInfo).then(res => {
					if (res.data.code === 200) {

					} else {
						this.$message.error(res.data.msg || "网络错误")
					}
				})

			},

		},
		computed: {
			rowCount: function () {
				return Math.ceil(this.tableData.length / 2)
			}
		},
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

	.el-table__header-wrapper {
		overflow: hidden
	}

	.el-timeline {
		margin-top: 35px
	}

	.customWidth {
		width: 998px;
	}

	.el-button+.el-button {
		margin: 10px 0 0 0;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}



	.avatar-uploader {
		float: left;
		border-radius: 5px;
		margin-left: 10px;
	}

	.el-form-item__content .avatar-uploader {
		float: none
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload img {
		width: 100px;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

</style>
