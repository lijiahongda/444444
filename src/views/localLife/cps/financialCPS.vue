<template>
	<section class="app-container" id="staticWidth">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="全部订单" name="first">
				<!--	筛选条件-->
				<el-form ref="form" label-width="120px" :inline="true">
					<el-form-item label="订单号：" label-width="80px">
						<el-input
							v-model="form.order"
							placeholder="请输入订单号" style="width: 180px;"/>
					</el-form-item>
					<el-form-item label="银行：" label-width="80px">
						<el-select v-model="form.backTypes"
								   placeholder="请选择"
								   clearable
								   style="width: 180px;">
							<el-option
								v-for="(item,index) in backList"
								:label="item.name"
								:value="item.bank_id"
								:key="index"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间：" label-width="90px">
						<el-col>
							<el-form-item prop="startTime"
										  style="margin-right:0">
								<el-date-picker v-model="form.start_time"
												type="datetime"
												value-format="yyyy-MM-dd HH:mm:ss"
												placeholder="起始时间"
												style="width: 180px;" />
							</el-form-item>
							<span>至</span>
							<el-form-item prop="endTime">
								<el-date-picker v-model="form.end_time"
												type="datetime"
												value-format="yyyy-MM-dd HH:mm:ss"
												placeholder="截止时间"
												style="width: 180px;" />
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-row style="float: right;margin-right: 20px;" class="clearfix">
						<el-form-item>
							<el-button type="primary" @click="AllOrderSearch" plain >查询</el-button>
						</el-form-item>
					</el-row>
				</el-form>
				<!--昨日新增		订单量，返佣金额，用户返佣，毛利-->
				<el-container
					v-loading="orderStatisticalLoading"
					element-loading-text="拼命加载中"
					style="background-color:#f7f7f7;box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);border-radius: 5px;padding: 5px;margin-top:70px;">
					<el-header class="headerStyle" style="height: 40px;line-height: 40px;">
						<!--				<span>{{start_time}}</span>-->
						<!--				<span> - </span>-->
						<!--				<span>{{end_time}}</span>-->
					</el-header>
					<el-main class="mainStyle" >
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>订单量:</div>
									<div class="money"> {{receiptTotal.orderQuantity||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>返佣总额:</div>
									<div class="money">¥ {{receiptTotal.totalAmount||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>用户返佣:</div>
									<div class="money">¥ {{receiptTotal.UserCommission||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>毛利:</div>
									<div class="money">¥ {{receiptTotal.GrossProfit||'暂无数据' }}</div>
								</div>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
				<!--	表格-->
				<el-table :data="list.list"  border style="width: 100%;margin-top:20px;" v-loading="orderStatisticalLoading" element-loading-text="拼命加载中">
					<el-table-column prop="order_sn" align="center" label="订单ID" fixed="left"></el-table-column>
					<el-table-column prop="mobile" align="center" label="会员手机号" fixed="left"></el-table-column>
					<el-table-column prop="bank_name" align="center" label="信用卡名称"></el-table-column>
					<el-table-column prop="third_create_time" align="center" label="申请时间"></el-table-column>
					<el-table-column prop="point_type" align="center" label="结算点"></el-table-column>
					<el-table-column prop="promotion_amount" align="center" label="返佣金额"></el-table-column>
					<el-table-column prop="method_type" align="center" label="结算方式"></el-table-column>
					<el-table-column prop="order_status" fixed="right" label="订单状态" align="center"></el-table-column>
				</el-table>
				<!--	分页-->
				<div class="pagination-container" style="text-align:right;margin-bottom:50px">
					<el-pagination
						:current-page="list.page"
						:page-size="list.pageSize"
						:total="list.total"
						background
						layout="total, sizes, prev, pager, next, jumper"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						@prev-click="onClickPrev"
						@next-click="onClickNext"
					/>
				</div>
			</el-tab-pane>
			<el-tab-pane label="订单统计" name="second">
				<!--筛选条件-->
				<el-form ref="form" label-width="120px" :inline="true">
					<el-form-item label="银行：" label-width="80px">
						<el-select v-model="form1.backTypes"
								   placeholder="请选择"
								   clearable
								   style="width: 160px;">
							<el-option
								v-for="(item,index) in backList"
								:label="item.name"
								:value="item.bank_id"
								:key="index"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="订单状态：" label-width="100px">
						<el-select v-model="form1.orderStatus"
								   placeholder="订单状态"
								   clearable
								   style="width: 160px;">
							<el-option label='待支付'
									   value='1'/>
							<el-option label='已支付'
									   value='2'/>
							<el-option label='已结算'
									   value='5'/>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间：" label-width="100px">
						<el-col>
							<el-form-item prop="startTime"
										  style="margin-right:0">
								<el-date-picker
									v-model="form1.formTime"
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
				<!--		订单量，返佣金额，用户返佣，毛利-->
				<el-container
					v-loading="StatisticalDataLoading"
					element-loading-text="拼命加载中"
					style="width:100%;background-color:#f7f7f7;box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);border-radius: 5px;padding: 5px;">
					<el-header class="headerStyle" style="height: 40px;line-height: 40px;">
						<!--				<span>{{start_time}}</span>-->
						<!--				<span> - </span>-->
						<!--				<span>{{end_time}}</span>-->
					</el-header>
					<el-main class="mainStyle">
						<el-row :gutter="20">
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>订单量:</div>
									<div class="money"> {{receiptTotal1.orderQuantity||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>返佣总额:</div>
									<div class="money">¥ {{receiptTotal1.totalAmount||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>用户返佣:</div>
									<div class="money">¥ {{receiptTotal1.UserCommission||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>毛利:</div>
									<div class="money">¥ {{receiptTotal1.GrossProfit||'暂无数据' }}</div>
								</div>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
				<!--		柱状图-->
				<div class="SetmealList"
					 v-loading="zhuDataLoading"
					 element-loading-text="拼命加载中">
					<div v-if="TemporarilyData" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLine"
						ref="home_DoubleLine"
						style="width:100%;display:block;margin:0 auto;height:300px;">
					</div>
				</div>
				<!--		折线图-->
				<div class="SetmealList"
					 v-loading="zheDataLoading"
					 element-loading-text="拼命加载中">
					<el-row :gutter="20">
						<el-col :span="14" :offset="12" style="padding:20px 0 0 0;">
							<div class="grid-content bg-purple">
								<el-radio-group v-model="PointDiagramDisplay" @change="DisplayModeChange">
									<el-radio-button label="-1">以天为单位</el-radio-button>
									<el-radio-button label="2">以周为单位</el-radio-button>
								</el-radio-group>
								<el-select v-model="lineChartSele"
										   placeholder="请选择"
										   clearable
										   style="width: 160px;"
										   @change="gatheringTimeChange">
									<el-option label='近7天'
											   value='7'/>
									<el-option label='近14天'
											   value='14'/>
									<el-option label='近30天'
											   value='30'/>
									<el-option label='近90天'
											   value='90'/>
								</el-select>
							</div>
						</el-col>
					</el-row>
					<div v-if="TemporarilyDataZhe" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLin"
						ref="home_zhebleLine"
						style="width:100%;display:block;margin:0 auto; height:300px;">
					</div>
				</div>
				<!--		漏斗图-->
				<div class="SetmealList"
					 v-loading="louDataLoading"
					 element-loading-text="拼命加载中">
					<div v-if="TemporarilyDataLou" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLi"
						ref="home_loubleLine"
						style="width:100%;display:block;margin:0 auto;height:300px;">
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="信用卡信息" name="third">
					<!--	筛选条件-->
					<el-form ref="form" label-width="120px" :inline="true" style="margin-top:30px ;">
						<el-form-item label="信用卡名称：" label-width="100px">
							<el-input
								v-model="form2.order"
								placeholder="请输入信用卡名称" style="width: 160px;"/>
						</el-form-item>
						<el-form-item label="结算点类型：" label-width="100px">
							<el-select v-model="form2.SettlementPointsTypes"
									   placeholder="请选择"
									   clearable
									   style="width: 160px;">
								<el-option
									v-for="(item,index) in options"
									:key="index"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="在线状态：" label-width="85px">
							<el-select v-model="form2.onlineStatus"
									   placeholder="在线状态"
									   clearable
									   style="width: 160px;">
								<el-option label='在线'
										   value='1'/>
								<el-option label='离线'
										   value='2'/>
							</el-select>
						</el-form-item>
						<el-form-item label="地域限制：" label-width="100px">
							<el-select v-model="form2.RegionalRestrictions"
									   placeholder="地域限制"
									   clearable
									   style="width: 160px;">
								<el-option label='是'
										   value='1'/>
								<el-option label='否'
										   value='2'/>
							</el-select>
						</el-form-item>
						<el-row style="float: right;margin-right: 20px;" class="clearfix">
							<el-form-item>
								<el-button type="primary" @click="onSearch" plain>查询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="addData(0)" plain>添加数据</el-button>
							</el-form-item>
						</el-row>
					</el-form>
					<!--		表格-->
					<el-table v-loading="creditCardListLoading"
							  element-loading-text="拼命加载中"
							  :data="creditCardList.list"
							  border
							  style="width: 100%;margin-top:50px;">
						<el-table-column prop="bank_id" align="center" label="银行ID" fixed="left"></el-table-column>
						<el-table-column prop="bank_name" align="center" label="信用卡名称"></el-table-column>
						<el-table-column prop="bank_name" align="center" label="结算点"></el-table-column>
						<el-table-column prop="amount" align="center" label="返佣金额"></el-table-column>
						<el-table-column prop="date" align="center" label="返佣金额有效期" width="160px;"></el-table-column>
						<el-table-column prop="method_type" align="center" label="结算方式"></el-table-column>
						<el-table-column prop="is_limit" fixed="right" label="是否有地域限制" align="center" width="160px;"></el-table-column>
						<el-table-column prop="is_online" fixed="right" label="是否在线" align="center"></el-table-column>
						<el-table-column prop="operation" fixed="right" label="操作" align="center">
							<template slot-scope="scope" align="center">
								<el-button
									@click="CommissionRecordShelves(scope.row,0)"
									type="text"
									size="small"
									v-if="showCommissionRecordShelves">
									上架
								</el-button>
								<el-button
									@click="CommissionRecordShelves(scope.row,1)"
									type="text"
									size="small"
									v-else>
									下架
								</el-button>
								<el-button
									@click="CommissionRecordDialog(scope.row)"
									type="text"
									size="small">
									佣金记录
								</el-button>
								<el-button
									@click="editorDialog(scope.row,1)"
									type="text"
									size="small">
									编辑
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!--		分页-->
					<div class="pagination-container" style="text-align:right;margin-bottom:50px">
						<el-pagination
							:current-page="creditCardList.page"
							:page-size="creditCardList.pageSize"
							:total="creditCardList.total"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="handleSizeChangeX"
							@current-change="handleCurrentChangeX"
							@prev-click="onClickPrevX"
							@next-click="onClickNextX"
						/>
					</div>
			</el-tab-pane>
			<el-tab-pane label="返现规则" name="four">
				<el-container class="CashbackRules">
					<el-main class="CashbackRulesMain">
						<el-form ref="form" label-width="120px" :inline="true" style="margin-top:30px;width: 800px;" class="clearfix">
							<el-form-item label="返现规则：" label-width="100px">
								<el-input
									:rows="7"
									type="textarea"
									style="width: 500px"
									placeholder="请输入返现规则"
									v-model="CashbackRulesText">
								</el-input>
							</el-form-item>
							<br>
							<el-form-item label="" label-width="100px">
								<span style="display: inline-block;width: 100px;"></span>
								<span style="font-size:12px;color:#ccc;">此段内容会在信用卡申请首页"返现规则"中展示</span>
							</el-form-item>
							<br>
							<el-row style="float: right;margin-right: 20px;">
								<el-form-item>
									<el-button type="primary" @click="CashbackRulesBtn" plain>提交</el-button>
								</el-form-item>
							</el-row>
						</el-form>
					</el-main>
				</el-container>
			</el-tab-pane>
		</el-tabs>
<!--		上下架弹窗-->
		<el-dialog
			:title="ShelfOperationTitle"
			:visible.sync="ShelfOperationDialog"
			width="30%">
			<el-form label-width="90px" :inline="true" class="demo-form-inline">
				<el-form-item :label="ShelfOperationLabel">
					<el-input
						type="textarea"
						:rows="2"
						:placeholder="ShelfOperationInput"
						v-model="ShelfOperationWhy">
					</el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ShelfOperationDialog = false">取 消</el-button>
				<el-button type="primary" @click="ShelfOperationConfirm">{{ShelfOperationBtnTitle}}</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import {
	getBackCardList,
	CreditCardList,
	editorBackCard,
	addBackCard,
	getPointype,
	BackCard,
	editorBackCard1,
	getOrderList,
	CreditCardStatistics,
	OrderStatisticalZhu,
	OrderStatisticalSan,
	OrderStatisticalLou
} from '@/api/financialCps' // 接口
export default {
name: "financialCPS",
	data() {
		return{
			activeName:'first',
			//全部订单loading
			orderStatisticalLoading:false,//订单统计loading
			//订单统计loading
			StatisticalDataLoading:false,//统计数据loading
			zhuDataLoading:false,//柱状图loading
			zheDataLoading:false,//折线图loading
			louDataLoading:false,//漏斗图loading
			//信用卡信息loading
			creditCardListLoading:false,//信用卡列表
			backList:[],//银行列表
			//全部订单查询数据
			form: {
				order: '',//订单号
				backTypes:'',//银行
				start_time:'',
				end_time:''
			},
			//订单列表统计数据
			receiptTotal: {
				orderQuantity: "",//订单量
				totalAmount: "", //返佣总额
				UserCommission: "",//用户返佣
				GrossProfit: ""//毛利
			},
			list: {
				list:[],
				page:1,//当前页数
				pageSize:10,//每页显示条数的选项
				total:20	//总条数
			},
			//订单统计
			TemporarilyData:false,
			TemporarilyDataLou:false,
			TemporarilyDataZhe:false,
			brokenLineShowWay:[{
				value: '7',
				label: '近7天'
			},{
				value: '14',
				label: '近14天'
			},{
				value: '30',
				label: '近30天'
			},{
				value: '90',
				label: '近90天'
			}],
			form1: {
				backTypes: '',//银行
				orderStatus: '',//订单状态
				formTime: '',//默认时间为近7天
			},
			receiptTotal1: {
				orderQuantity: "",//订单量
				totalAmount: "", //返佣总额
				UserCommission: "",//用户返佣
				GrossProfit: ""//毛利
			},
			PointDiagramDisplay:-1,//折线图展示方式，天或者周
			lineChartSele:'7',//近7天数据
			//信用卡信息
			options:[],//结算点类型
			pickerOptions:{  //禁用当前日期之前的日期
				disabledDate(time){
					//Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			start_time: "",
			end_time: "",
			form2: {
				order:'',//信用卡名称
				backTypes: '',//银行
				orderStatus: '',//订单状态
				SettlementPointsTypes:'',//结算点类型
				onlineStatus:'',//在线状态
				RegionalRestrictions:''//是否地域限制
			},
			creditCardList: {
				list:[],
				page:1,//当前页数
				pageSize:10,//没页显示条数的选项
				total:10	//总条数
			},
			showCommissionRecordShelves:1,//上下架显示
			//返现规则
			CashbackRulesText:'',
			//上下架弹窗
			ShelfOperationTitle:'上架',
			ShelfOperationDialog:false,
			ShelfOperationLabel:'上架原因',
			ShelfOperationInput:'请输入上架原因',
			ShelfOperationWhy:'',
			ShelfOperationBtnTitle:'上架确认',
		}
	},
	created() {
		this.type = this.$route.query ? this.$route.query.type : '';
		if (this.type == 1) {
			this.activeName = 'first'; //全部订单
			this.getBackCardLists();//银行列表
			this.getOrderList(1,10);//所有订单列表
		} else if (this.type == 2) {
			this.activeName = 'second'; //订单统计
		} else if (this.type == 3) {
			this.activeName = 'third'; //信用卡信息
			this.getCardList(1,10);//get信用卡列表
			this.getPointype();//结算点
			this.getPointype1();//结算点类型
		} else {
			this.activeName = 'first'; //全部订单
			this.getBackCardLists();//银行列表
			this.getOrderList(1,10);//所有订单列表
		}
	},
	mounted() {
		this.calculateEcharts();
	},
	methods:{
		calculateEcharts() {
			//获取这个组件的窗口宽度
			this.initWidth = document.getElementById('staticWidth').offsetWidth;
			console.log(this.initWidth);
		},
		//	tab	切换事件
		handleClick(tab, event) {
			console.log(tab, event);
			if(tab.index == '0'){//全部订单
				this.getOrderList(1,10);//所有订单列表
			}else if(tab.index == '1'){//订单统计
				this.setLineOption()//柱状图
				this.setScatterOption(-1,7)//折线
				this.setFunnelOption()//漏斗
				this.getStatisticsData()//数据统计
			}else if(tab.index == '2'){//信用卡信息
				this.getCardList(1,10);//get信用卡列表
				this.getPointype();//结算点
				this.getPointype1();//结算点类型
			}
		},
		//get银行卡列表
		getBackCardLists(){
			getBackCardList().then(res=>{
				if(res.data.code === 200){
					this.backList = res.data.data;
				}else{

				}
			})
		},
		//get结算点
		getPointype(){
			getPointype().then(res=>{
				if(res.data.code === 200){
					this.options2 = res.data.data;
					this.options = res.data.data;
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//get结算点类型
		getPointype1(){
			editorBackCard1().then(res=>{
				if(res.data.code === 200){
					this.options1 = res.data.data;
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//全部订单
		AllOrderSearch(){//搜索查询
			this.getOrderList(this.list.page,this.list.pageSize);//所有订单列表
		},
		//get订单列表和数据统计
		getOrderList(page,pageSize){
			this.orderStatisticalLoading = true;
			//渲染页面前清空数据
			this.list = {};
			let getOrderListData = {
				bank_id:this.form.backTypes,
				order_sn:this.form.order,
				startTime:this.form.start_time,
				endtime:this.form.end_time,
				page:page,
				pageSize:pageSize
			}
			getOrderList(getOrderListData).then(res=>{
				this.orderStatisticalLoading = false;
				if(res.data.code === 200){
					this.receiptTotal.orderQuantity = res.data.data.order_num;//订单量
					this.receiptTotal.totalAmount =  res.data.data.promotion_amount_total;//返佣总额
					this.receiptTotal.UserCommission =  res.data.data.user_amount_total;//用户返佣
					this.receiptTotal.GrossProfit = res.data.data.maoli_amount_total;//毛利

					for(let i=0;i<(res.data.data.list).length;i++){
						(res.data.data.list)[i].method_type = '自动结算' + (res.data.data.list)[i].method_type;
					}
					this.list.list = res.data.data.list;
					this.list.page = res.data.data.page;//当前页数
					this.list.pageSize = res.data.data.pageSize;//每页显示的条数
					this.list.total = res.data.data.total;//总条数
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//分页
		handleSizeChange(val) {
			this.list.pageSize = val;
			this.getOrderList(this.list.page,val);
		},
		handleCurrentChange(val) {
			this.list.page = val;
			this.getOrderList(val,this.list.pageSize);
		},
		//分页点击上一页change
		onClickPrev(val){
			this.list.page = val;
			this.getOrderList(val,this.list.pageSize);
		},
		//分页点击下一页change
		onClickNext(val){
			this.list.page = val;
			this.getOrderList(val,this.list.pageSize);
		},
		//订单统计
		OrderStatisticalSearch (){//查询数据
			this.getStatisticsData();//查询数据统计
		},
		//get数据统计
		getStatisticsData(){
			this.StatisticalDataLoading = true;
			let _this = this;
			let getStatisticsData = {};
			if(_this.form1.formTime == ''){
				getStatisticsData = {
					bank_id:_this.form1.backTypes,//银行
					order_status:_this.form1.orderStatus,//订单状态
					startTime:'',//开始时间
					endTime:''//结束时间
				}
			}else if(_this.form1.formTime != ''){
				getStatisticsData = {
					bank_id:_this.form1.backTypes,//银行
					order_status:_this.form1.orderStatus,//订单状态
					startTime:(_this.form1.formTime)[0],//开始时间
					endTime:(_this.form1.formTime)[1]//结束时间
				}
			}

			CreditCardStatistics(getStatisticsData).then(res=>{
				this.StatisticalDataLoading = false;
				if(res.data.code === 200){
					_this.receiptTotal.orderQuantity = res.data.data.orderCount;
					_this.receiptTotal.totalAmount = res.data.data.promotion_amount_total;
					_this.receiptTotal.UserCommission = res.data.data.user_amount_total;
					_this.receiptTotal.GrossProfit = res.data.data.maoli_amount_total;
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//柱状图
		setLineOption() {
			this.zhuDataLoading = true;
			OrderStatisticalZhu().then(res=>{
				this.zhuDataLoading = false;
				if(res.data.code === 200){
					this.loading = false;
					console.log(res.data.length);
					if(res.data.length == 0 || 'undefined'){
						this.TemporarilyData = true;
					}else{
						let xLineData = [];
						let orderTotalAmount = [];//订单总量
						let SumOrders = [];//佣金总和
						let returnedOrders = [];//返佣总和
						let GrossProfit = [];//毛利
						for(let i=0;i<(res.data.data.length);i++){
							xLineData.push((res.data.data)[i].month);
							orderTotalAmount.push((res.data.data)[i].order_num);
							SumOrders.push((res.data.data)[i].promotion_amount);
							if((res.data.data)[i].refund_price == null){
								(res.data.data)[i].refund_price = 0;
							}
							returnedOrders.push((res.data.data)[i].estimate_promotion_amount);
							GrossProfit.push((res.data.data)[i].maoli_promotion_amount);
						}

						// 基于准备好的dom，初始化echarts实例
						let myChart = this.$echarts.init(this.$refs.home_DoubleLine)
						// 绘制图表
						myChart.setOption({
							color: ['#3398DB'],
							tooltip: {
								trigger: "axis",
								axisPointer: {
									type: 'cross',
									label: {
										backgroundColor: '#283b56'
									}
								},
								formatter: '{b0}月</br>{a0}:{c0}个</br>{a1}:{c1}元<br/>{a2}:{c2}元<br/>{a3}:{c3}元' // 这里是鼠标移上去的显示数据
							},
							xAxis: [
								{
									type: 'category',
									data: xLineData,
								}
							],
							yAxis: [
								{
									type: "value",
								}
							],
							series: [
								{
									name: '订单总量',
									type: 'bar',
									stack: '总量',
									label: {
										show: false,
										position: 'insideRight'
									},
									data: orderTotalAmount
								},
								{
									name: '佣金总和',
									type: 'bar',
									stack: '总量',
									label: {
										show: false,
										position: 'insideRight'
									},
									data: SumOrders
								},
								{
									name: '返佣总和',
									type: 'bar',
									stack: '总量',
									label: {
										show: false,
										position: 'insideRight'
									},
									data: returnedOrders
								},{
									name: '毛利',
									type: 'bar',
									stack: '总量',
									label: {
										show: false,
										position: 'insideRight'
									},
									data:GrossProfit
								}
							]
						})
						let resize = {
							width: this.initWidth,
							height: 270
						};
						myChart.resize(resize);
					}
				}else{
					this.$message.error(res.data.msg);
				}
			});
		},
		//折线图
		setScatterOption(DisplayMode,date) {//参数为显示方式和时间
			this.zheDataLoading = true;
			let _this = this;
			let getLineChartData = {};
			if(_this.form1.formTime == '' || _this.PointDiagramDisplay == -1){ //订单选择时间和折线图显示方式
				getLineChartData = {
					order_status:_this.orderStatusValue,//订单状态
					start_time:'',//开始时间
					end_time:'',//结束时间
					cycle:DisplayMode,//显示方式	-1天2周
					day:date//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
				};
			}else if(_this.form1.formTime == '' || _this.PointDiagramDisplay == 2){
				getLineChartData = {
					order_status:_this.orderStatusValue,//订单状态
					start_time:'',//开始时间
					end_time:'',//结束时间
					cycle:DisplayMode,//显示方式	-1天2周
					day:''//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
				};
			}else if(_this.form1.formTime != '' || _this.PointDiagramDisplay == -1){
				getLineChartData = {
					order_status:_this.orderStatusValue,//订单状态
					start_time:(_this.form1.formTime)[0],//开始时间
					end_time:(_this.form1.formTime)[1],//结束时间
					cycle:DisplayMode,//显示方式	-1天2周
					day:date//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
				};
			}else if(_this.form1.formTime!= '' || _this.PointDiagramDisplay == 2){
				getLineChartData = {
					order_status:_this.orderStatusValue,//订单状态
					start_time:(_this.form1.formTime)[0],//开始时间
					end_time:(_this.form1.formTime)[1],//结束时间
					cycle:DisplayMode,//显示方式	-1天2周
					day:''//请求多少天数据 7天，14天，30天，90天，显示方式时周时不传day值
				};
			}

			OrderStatisticalSan(getLineChartData).then(res=>{
				this.zheDataLoading = false;
				if(res.data.code === 200){
					if(res.data.data.length == 0){
						this.TemporarilyDataZhe = true;
					}else{
						let xLineData = [];
						for(let i=0;i<(res.data.data.length);i++){
							xLineData.push((res.data.data)[i].date);
							if((res.data.data)[i].refund_price == null){
								(res.data.data)[i].refund_price = 0;
							}
						}
						// 基于准备好的dom，初始化echarts实例
						let myChart = this.$echarts.init(this.$refs.home_zhebleLine)
						myChart.setOption({
							color: ['#3398DB'],
							tooltip: {
								trigger: "axis",
								formatter:function(params){
									let tipText="";
									params.forEach(function(item,index){
										tipText += item.data.date
											+ '日'
											+ '</br>'
											+ '订单总量：'
											+ item.data.order_num
											+ '单'
											+ '</br>'
											+ '佣金总和:'
											+ item.data.promotion_amount
											+ '元'
											+ '</br>'
											+ '返佣总和:'
											+ item.data.user_promotion_amount
											+ '元'
											+ '</br>'
											+ '毛利:'
											+ item.data.maoli_promotion_amount
											+ '元';
									});
									return tipText;
								}
							},
							xAxis: [
								{
									type: 'category',
									data: xLineData,
								}
							],
							yAxis: [
								{
									type: "value",
								}
							],
							series: [
								{
									name: '',
									type: 'line',
									smooth: true, //是否以弧线展示折线
									itemStyle : {
										normal : {
											color:'#3398DB',  //折线折点颜色
											lineStyle:{
												width:2  //折线宽度
											}
										}
									},
									data:res.data.data
								}
							]
						})
						let resize = {
							width: this.initWidth,
							height: 270
						};
						myChart.resize(resize);
					}
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//折线图显示方式（周/天）
		DisplayModeChange(val){
			this.setScatterOption(val,this.lineChartSele);//参数为显示方式和时间
		},
		//收款折线时间选择事件
		gatheringTimeChange(val) {
			this.setScatterOption(this.PointDiagramDisplay,val);//参数为显示方式和时间
		},
		//漏斗图
		setFunnelOption() {
			this.louDataLoading = true;
			OrderStatisticalLou().then(res=>{
				if(res.data.code === 200){
					this.louDataLoading = true;
					if(res.data.data.enter == 0 && res.data.data.login.count == 0 && res.data.data.open.count == 0){
						this.TemporarilyDataLou = true;
					}else{
						// 基于准备好的dom，初始化echarts实例
						let myChart = this.$echarts.init(this.$refs.home_loubleLine)
						// 绘制图表
						myChart.setOption({
							title: {
								text: ``
							},
							tooltip: {

							},
							series: [
								{
									name:'',
									type:'funnel',
									left: '10%',
									top: 60,
									//x2: 80,
									bottom: 60,
									width: '80%',
									// height: {totalHeight} - y - y2,
									min: 0,
									max: 100,
									minSize: '0%',
									maxSize: '100%',
									sort: 'descending',
									gap: 2,
									label: {
										show: true,
										position: 'inside'
									},
									labelLine: {
										length: 10,
										lineStyle: {
											width: 1,
											type: 'solid'
										}
									},
									itemStyle: {
										borderColor: '#fff',
										borderWidth: 1
									},
									emphasis: {
										label: {
											fontSize: 20
										}
									},
									data: [
										{value: res.data.data.enter, name: '信用卡入口点击量'},
										{value: res.data.data.open.count + ' | ' + res.data.data.open.rate, name: '银行页打开量'},
										{value: res.data.data.login.count + ' | ' + res.data.data.login.rate, name: '银行单元点击登出量'}
									]
								}
							]
						})
						let resize = {
							width: this.initWidth,
							height: 270
						};
						myChart.resize(resize);
					}
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//信用卡信息
		//get信用卡列表
		getCardList(page,pageSize){
			this.creditCardListLoading = true;
			let getCardListData = {
				bank_name:this.form2.order,//银行id
				point_type: this.form2.SettlementPointsTypes,
				is_limit: this.form2.RegionalRestrictions,
				is_online: this.form2.onlineStatus,
				page:page,
				pageSize:pageSize
			}
			CreditCardList(getCardListData).then(res=>{
				this.creditCardListLoading = false;
				if(res.data.code === 200){
					this.creditCardList.list = res.data.data.list;
					this.creditCardList.page = res.data.data.page;//当前页数
					this.creditCardList.pageSize = res.data.data.pageSize;//每页显示的条数
					this.creditCardList.total = res.data.data.total;//总条数
				}else{
					this.$message.error(res.data.msg);
				}
			})
		},
		//添加数据按钮
		addData(type){
			this.$router.push({path: '/cps/CreditCardEditor', query: {type:type}});
		},
		//每页显示多少
		handleSizeChangeX(val) {
			console.log(`每页 ${val} 条`);
			this.creditCardList.pageSize = val;
			this.getCardList(this.creditCardList.page,val);
		},
		handleCurrentChangeX(val) {
			console.log(`当前页: ${val}`);
			this.creditCardList.page = val;
			this.getCardList(val,this.creditCardList.pageSize);
		},
		//分页点击上一页change
		onClickPrevX(val){
			this.creditCardList.page = val;
			this.getCardList(val,this.creditCardList.pageSize);
		},
		//分页点击下一页change
		onClickNextX(val){
			this.creditCardList.page = val;
			this.getCardList(val,this.creditCardList.pageSize);
		},
		//佣金记录弹窗
		CommissionRecordDialog(row){
			this.$router.push({path: '/cps/CommissionRecordEditor', query: {row: row}});
		},
		//信用卡编辑弹窗
		editorDialog(row,type){
			this.$router.push({path: '/cps/CreditCardEditor', query: {row: row,type:type}});
		},
		//上下架
		CommissionRecordShelves(row,type){
			this.ShelfOperationDialog = true;
			this.row = row;
			if(type == 0){//上架
				this.ShelfOperationTitle = '上架';
				this.ShelfOperationLabel = '上架原因';
				this.ShelfOperationInput = '请输入上架原因';
				this.ShelfOperationBtnTitle = '上架确认';
			}else if(type == 1){//下架
				this.ShelfOperationTitle = '下架';
				this.ShelfOperationLabel = '下架原因';
				this.ShelfOperationInput = '请输入下架原因';
				this.ShelfOperationBtnTitle = '下架确认';
			}
		},
		//上架确认
		ShelfOperationConfirm(){

		},
		//搜索点击按钮
		onSearch(){
			this.getCardList(1,10);
		},
		//返现规则确认
		CashbackRulesBtn(){

		}
	}
}
</script>

<style scoped>
	.app-container{
		background-color:#f0f2f4;
		padding: 10px;
	}
.headerStyle{
	border-bottom: 1px solid #dfdfdf;
}
.mainStyle{
	padding:20px 20px 0 20px;
}
	/*	柱状图 ,折线图，漏斗图*/
	.SetmealList{
		background-color:#fff;
		margin-top:20px;
		border-radius: 10px;
		width:100%;
		box-shadow: 4px 4px 5px #888888;
	}
.money {/* 卡片数字金额样式 */
	line-height: 30px;
	/*color: rgba(212, 48, 48, 1);*/
	font-size: 20px;
}
.el-row {
	margin-bottom: 20px;
	&:last-child {
	 	margin-bottom: 0;
 	}
}
.card-item{
	min-height: 85px;
	color: rgba(80, 80, 80, 1);
	border-radius: 8px;
	border: rgba(229, 229, 229, 1) solid 1px;
	text-align: left;
	font-size: 14px;
	line-height: 150%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 15px;
}
.el-form--inline{
	margin-top:30px !important;
}
.el-form-item{
	margin-bottom: 10px;
	margin-left: 0;
}
.graph-doubleLine-warp{
	margin-top: 50px;
}
.grid-content {
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
}
button{
	outline: none;
	-webkit-tap-highlight-color:rgba(255,255,255,0);
}
.list_item{
	width: 50%;
}
.list_item .title{
	margin: 40px 0 10px 0;
	font-weight: bold;
}
@media only screen and (max-width: 1000px) {
	.list_item{
		width: 100%;
	}
	/deep/ .el-dialog{
		width: 90%;
	}
}
.backTypes{
	float: left;
}
.selectTime{
	float: left;
	width: 180px;
	height: 36px;
	line-height: 36px;
	padding-left: 5px;
	border-radius: 5px;
	border: 1px solid #ccc;
}
.btn_text button{
	margin-bottom: 10px;
	margin-left: 0;
}

.avatar-uploader .el-upload {
	border: 1px dashed #d0dae5;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 100px;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.backLogo {
	font-size: 16px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
.block{
	margin-bottom: 10px;
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

	.TemporarilyDataStyle{
		text-align: center;
		line-height: 300px;
	}
	.floatRight{
		float: right;
		margin: 20px;
	}
/*	返现规则*/
	.CashbackRules{
		height:100vh;
		background-color:#f0f2f4;
	}
</style>
