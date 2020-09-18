<template>
	<section class="app-container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="外卖统计" name="first">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="外卖平台">
						<el-select v-model="DeliveryPlatform" placeholder="请选择">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间">
						<el-date-picker
							v-model="orderTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						>
						</el-date-picker>
					</el-form-item>
					<div class="clearfix">
						<el-button class="floatRight" type="primary" @click="OrderStatisticalOnSubmit">查询</el-button>
					</div>
				</el-form>
				<!--				订单量，订单总金额，订单佣金总额，毛利-->
				<el-container v-loading="statisticalLoading" element-loading-text="拼命加载中"
							  style="width:100%;background-color:#f7f7f7;box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);border-radius: 5px;padding: 5px;">
					<el-header class="headerStyle" style="height: 40px;line-height: 40px;">
						<!--				<span>{{start_time}}</span>-->
						<!--				<span> - </span>-->
						<!--				<span>{{end_time}}</span>-->
					</el-header>
					<el-main class="mainStyle">
						<el-row :gutter="24">
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>订单量:</div>
									<div class="money"> {{orderQuantity + '单' ||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>订单总金额:</div>
									<div class="money">¥ {{TotalOrderAmount + '元' ||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>订单返佣金额:</div>
									<div class="money">¥ {{CommissionOrders + '元' ||'暂无数据' }}</div>
								</div>
							</el-col>
							<el-col :span="6">
								<div class="grid-content card-item">
									<div>毛利:</div>
									<div class="money">¥ {{GrossProfit + '元' ||'暂无数据' }}</div>
								</div>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
				<!--				柱状图-->
				<div class="brokenLine SetmealList" v-loading="zhuLoading" element-loading-text="拼命加载中">
					<div class="top_class">
						<el-select v-model="ZhuLineChartPlatformSele" placeholder="请选择" @change="getlineChartPlatformZhu" style="margin-right: 20px;">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div v-if="TemporarilyData" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLine"
						ref="home_DoubleLine"
						style="width:97%;display:block;margin:0 auto; height:300px;">
					</div>
				</div>
				<!-- 折线 -->
				<div class="brokenLine SetmealList" v-loading="zheLoading" element-loading-text="拼命加载中">
					<div class="top_class">
						<p>
							<span :class="timeCom== -1 ?'activ':''" @click="company(-1)">以天为单位</span>
							<span :class="timeCom== 2 ?'activ':''" @click="company(2)">以周为单位</span>
						</p>
						<el-select v-model="lineChartSele" placeholder="请选择" @change="getBrokenlineData">
							<el-option
								v-for="(item,index) in brokenLineShowWay"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div v-if="TemporarilyDataZhe" class="TemporarilyDataStyle">暂无数据</div>
					<div
						v-else
						id="home_DoubleLin"
						ref="home_DoubleLin"
						style="width:100%;display:block;margin:0 auto; height:300px;">
					</div>
					<!--					外卖平台切换-->
					<div class="TransferDeliveryPlatform">
						<ul class="TransferDeliveryPlatformUl clearfix">
							<li v-for="(item,index) in DeliveryPlatformList" :key="index" @click="DeliveryPlatformSwitch(index,item.backgroundColor)">
								<span class="PlatformTransfer" :style="{'background-color':item.backgroundColor}"></span>
								<span class="order">{{item.PlatformName}}</span>
							</li>
						</ul>
					</div>
				</div>
				<!--				饼图-->
				<div class="brokenLine SetmealList" v-loading="bingLoading" element-loading-text="拼命加载中">
					<div class="top_class">
						<el-select v-model="lineChartDateSele" placeholder="请选择" @change="getlineChartDate" style="margin-right: 20px;">
							<el-option
								v-for="(item,index) in brokenLineShowWay"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="lineChartPlatformSele" placeholder="请选择" @change="getlineChartPlatform" style="margin-right: 20px;">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-select v-model="lineChartAreaSele" placeholder="请选择" @change="getlineChartArea">
							<el-option
								v-for="(item,index) in brokenLineArea"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div v-if="TemporarilyDataBing" class="TemporarilyDataStyle">暂无数据</div>
					<div class="clearfix" v-else>
						<div
							class="BingChart"
							id="home_DoubleL"
							ref="home_DoubleL"
							style="width:80%;float:left;margin:0 auto; height:300px;">
						</div>
						<div class="cityRanking">
							<p>订单量前top10</p>
							<ul class="cityRankingUl">
								<li v-for="(item,index) in cityRanking" :key="index">{{item.index + '、' +item.name + ':' + item.number + '个' }}</li>
							</ul>
							<p style="color: blue;cursor: pointer;font-size: 14px;">查看更多</p>
						</div>
					</div>
				</div>
				<!--				漏斗图-->
				<div class="brokenLine SetmealList" v-loading="louLoading" element-loading-text="拼命加载中" style="height: 300px;">
					<div class="top_class">
						<el-select v-model="LouLineChartDateSele" placeholder="请选择" @change="getlineChartDateLou" style="margin-right: 20px;">
							<el-option
								v-for="(item,index) in brokenLineShowWay"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<el-row>
						<el-col :span="12">
							<div class="grid-content bg-purple" style="font-size:12px;color:#646464;">
								<!--						梯形-->
									<div class="LouWrapChild">
										<div class="mask1"></div><p class="maskFont1">外卖入口点击量</p>
										<div class="mask2"></div><p class="maskFont2">外卖列表页打开次数</p>
										<div class="mask3"></div><p class="maskFont3">美团，饿了么外卖，饿了么买菜被点击次数</p>
										<div class="mask4"></div><p class="maskFont4">订单量</p>
									</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content bg-purple-light" style="font-size:12px;color:#646464;">
								<!--						数据-->
									<!--							外卖入口点击量-->
									<div class="LouDataList">
										<span class="LouDataListLineStylePublic LouDataListLineStyle1"></span>
										<span class="LouDataListDataStylePublic LouDataListDataStyle1">{{takeawayEntrance}}次</span>
									</div>
									<!--							外卖列表页打开次数-->
									<div class="LouDataList">
										<span class="LouDataListLineStylePublic LouDataListLineStyle2"></span>
										<span class="LouDataListDataStylePublic LouDataListDataStyle2">{{TakeoutListOpenTime}}次</span>
									</div>
									<!--							美团，饿了么外卖，饿了么买菜被点击次数-->
									<div class="LouDataList">
										<span class="LouDataListLineStylePublic LouDataListLineStyle3"></span>
										<ul class="LouDataListDataStylePublic LouDataListDataStyle3 LouDataList_ul">
											<li>美团：{{Clicks.mt}}</li>
											<li>饿了么外卖：{{Clicks.elmTackOut}}</li>
											<li>饿了么买菜：{{Clicks.BuyVegetables}}</li>
											<li>总点击次数：{{Clicks.TotalClicks}}</li>
										</ul>
									</div>
									<!--							订单量-->
									<div class="LouDataList">
										<span class="LouDataListLineStylePublic LouDataListLineStyle4"></span>
										<ul class="LouDataListDataStylePublic LouDataListDataStyle4 LouDataList_ul">
											<li>美团：{{orderAmount.mt}}</li>
											<li>饿了么外卖：{{orderAmount.elmTackOut}}</li>
											<li>饿了么买菜：{{orderAmount.BuyVegetables}}</li>
											<li>总点击量：{{orderAmount.TotalClicks}}</li>
										</ul>
									</div>
							</div>
						</el-col>
					</el-row>
<!--					<div class="clearfix" style="margin-top: 30px;">-->

<!--						</div>-->

<!--					</div>-->
<!--					<div v-if="TemporarilyDataLou" class="TemporarilyDataStyle">暂无数据</div>-->
<!--					<div-->
<!--						v-else-->
<!--						id="home_DoubleLi"-->
<!--						ref="home_DoubleLi"-->
<!--						style="width:100%;display:block;margin:0 auto; height:300px;">-->
<!--					</div>-->
				</div>
			</el-tab-pane>
			<el-tab-pane label="订单列表明细" name="second">
				<el-form label-width="120px" :inline="true" class="demo-form-inline">
					<el-form-item label="外卖平台:">
						<el-select v-model="orderListDeliveryPlatform" placeholder="请选择">
							<el-option
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="订单时间:">
						<el-date-picker
							v-model="orderlistOrderTime"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
						>
						</el-date-picker>
					</el-form-item>
					<div class="clearfix">
						<el-button class="floatRight" type="primary" @click="orderListOnSubmit">查询</el-button>
					</div>
				</el-form>
				<!--				订单量，订单总金额，订单佣金总额，毛利-->
				<div class="detail">
					<div class="title">昨日新增</div>
					<el-container v-loading="statisticalLoading" element-loading-text="拼命加载中"
								  style="width:100%;background-color:#f7f7f7;box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);border-radius: 5px;padding: 5px;">
						<el-header class="headerStyle" style="height: 40px;line-height: 40px;">
							<!--				<span>{{start_time}}</span>-->
							<!--				<span> - </span>-->
							<!--				<span>{{end_time}}</span>-->
						</el-header>
						<el-main class="mainStyle">
							<el-row :gutter="24">
								<el-col :lg="{span: '4-8'}" class="card-panel-col">
									<div class="grid-content card-item">
										<div>订单量:</div>
										<div class="money"> {{orderQuantity + '单' ||'暂无数据' }}</div>
									</div>
								</el-col>
								<el-col :lg="{span: '4-8'}" class="card-panel-col">
									<div class="grid-content card-item">
										<div>订单总金额:</div>
										<div class="money">¥ {{TotalOrderAmount + '元' ||'暂无数据' }}</div>
									</div>
								</el-col>
								<el-col :lg="{span: '4-8'}" class="card-panel-col">
									<div class="grid-content card-item">
										<div>佣金金额:</div>
										<div class="money">¥ {{CommissionOrders + '元' ||'暂无数据' }}</div>
									</div>
								</el-col>
								<el-col :lg="{span: '4-8'}" class="card-panel-col">
									<div class="grid-content card-item">
										<div>返佣总金额:</div>
										<div class="money">¥ {{CommissionOrders + '元' ||'暂无数据' }}</div>
									</div>
								</el-col>
								<el-col :lg="{span: '4-8'}" class="card-panel-col">
									<div class="grid-content card-item">
										<div>毛利:</div>
										<div class="money">¥ {{GrossProfit + '元' ||'暂无数据' }}</div>
									</div>
								</el-col>
							</el-row>
						</el-main>
					</el-container>
				</div>
				<div class="detail">
					<div class="title">订单列表</div>
					<el-table
						v-loading="orderListLoading"
						element-loading-text="拼命加载中"
						:data="orderListTableData.list"
						style="width: 100%" border>
						<el-table-column prop="order_code" label="订单编号" fixed></el-table-column>
						<el-table-column prop="orderSource" label="订单来源"></el-table-column>
						<el-table-column prop="orderPrice" label="订单金额"></el-table-column>
						<el-table-column prop="settlementPrice" label="结算金额"></el-table-column>
						<el-table-column prop="orderStatus" label="订单状态"></el-table-column>
						<el-table-column prop="PlaceOrderTime" label="下单时间"></el-table-column>
						<el-table-column prop="city" label="会员所在城市"  width="120"></el-table-column>
						<el-table-column prop="mobile" label="会员手机号"  width="120"></el-table-column>
						<el-table-column prop="CPSCommissionPrice" label="CPS佣金金额"  width="120"></el-table-column>
						<el-table-column prop="CPSCommissionStatus" label="CPS佣金状态"  width="120"></el-table-column>
						<el-table-column prop="commissionPrice" label="返佣金额"></el-table-column>
						<el-table-column prop="maoli_price" label="毛利"></el-table-column>
					</el-table>
					<!--	分页-->
					<div class="pagination-container" style="text-align:right;margin-bottom:50px" v-if="showPage">
						<el-pagination
							:current-page="orderListTableData.page"
							:page-size="orderListTableData.pageSize"
							:total="orderListTableData.total"
							background
							layout="total, sizes, prev, pager, next, jumper"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							@prev-click="onClickPrev"
							@next-click="onClickNext"
						/>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script>
    export default {
        name: "takeOutOrderList",
		data(){
        	return {
				activeName:'first',
				DeliveryPlatform:'',//外卖平台model
				options:[
					{
						value:1,
						label:'美团外卖'
					},
					{
						value:2,
						label:'饿了么外卖'
					},
					{
						value:3,
						label:'饿了么买菜'
					}
				],
				orderTime:'',//订单时间model
				statisticalLoading:false,//订单统计卡片loading
				orderQuantity:'123',//订单量
				TotalOrderAmount:'432',//订单总金额
				CommissionOrders:'11',//订单返佣金额
				GrossProfit:'432',//毛利
				zhuLoading:false,//柱状图loading
				zheLoading:false,//折线图loading
				bingLoading:false,//饼图loading
				louLoading:false,//漏斗图loading
				TemporarilyData:false,//柱状图无数据
				TemporarilyDataZhe:false,//折线图无数据
				TemporarilyDataBing:false,//饼图无数据
				TemporarilyDataLou:false,//漏斗图无数据
				ZhuLineChartPlatformSele:1,//柱状图平台选择
				DeliveryPlatformList:[
					{
						index:1,
						PlatformName:'美团订单量',
						backgroundColor:'#EFC5AF',
					},
					{
						index:2,
						PlatformName:'饿了么外卖订单量',
						backgroundColor:'#9AC4E1',
					},
					{
						index:3,
						PlatformName:'饿了么买菜美团订单量',
						backgroundColor:'#BFCFAC',
					}
				],
				timeCom:-1,//折线图选择单位	-1天，2周
				lineChartSele:7,//折线天数sle 7/14/30/90
				brokenLineShowWay:[
					{
						value:7,
						label:'7天'
					},
					{
						value:14,
						label:'14天'
					},
					{
						value:30,
						label:'30天'
					},
					{
						value:90,
						label:'90天'
					}
				],
				lineChartDateSele:7,//饼图时间选择
				lineChartPlatformSele:1,//饼图外卖平台选择
				lineChartAreaSele:0,//饼图区域选择
				brokenLineArea:[
					{
						value:0,
						label:'全国'
					},
					{
						value:1,
						label:'北京'
					},
					{
						value:2,
						label:'上海'
					},
					{
						value:3,
						label:'运城'
					},
					{
						value:4,
						label:'燕郊'
					},
				],
				cityRanking:[
					{
						index:1.,
						name:'山西省',
						number:'12'
					},
					{
						index:2.,
						name:'山西省',
						number:'11'
					},
					{
						index:3,
						name:'山西省',
						number:'13'
					},
					{
						index:4.,
						name:'山西省',
						number:'14'
					},
					{
						index:5.,
						name:'山西省',
						number:'15'
					},
					{
						index:6.,
						name:'山西省',
						number:'16'
					},
					{
						index:7.,
						name:'山西省',
						number:'17'
					},
					{
						index:8,
						name:'山西省',
						number:'18'
					},
					{
						index:9,
						name:'山西省',
						number:'19'
					},
					{
						index:10,
						name:'山西省',
						number:'20'
					}
				],
				LouLineChartDateSele:7,//漏斗图时间选择
				//漏斗图侧边数据
				takeawayEntrance:'12331',//外卖入口点击量
				TakeoutListOpenTime:'12331',//外卖列表页打开量
				Clicks:{
					mt:'765次，18%',
					elmTackOut:'365次，6%',
					BuyVegetables:'65次，1%',
					TotalClicks:'1195次，28%'
				},//美团，饿了么外卖，饿了么买菜被点击次数
				orderAmount:{
					mt:'156次，20%',
					elmTackOut:'123次，33%',
					BuyVegetables:'15次，23%',
					TotalClicks:'347次，29%'
				},//订单量
				orderListLoading:false,//订单loading
				orderListTableData:{
					list:[
						{
							order_code:'12345',
							orderSource:'美团',
							orderPrice:'¥12',
							settlementPrice:'¥8',
							orderStatus:'已送达',
							PlaceOrderTime:'2020-08-22',
							city:'北京',
							mobile:'1234567890',
							CPSCommissionPrice:'¥1',
							CPSCommissionStatus:'佣金已到账',
							commissionPrice:'¥2',
							maoli_price:'¥1'
						},
						{
							order_code:'12345',
							orderSource:'美团',
							orderPrice:'¥12',
							settlementPrice:'¥8',
							orderStatus:'已送达',
							PlaceOrderTime:'2020-08-22',
							city:'北京',
							mobile:'1234567890',
							CPSCommissionPrice:'¥1',
							CPSCommissionStatus:'佣金已到账',
							commissionPrice:'¥2',
							maoli_price:'¥1'
						},
						{
							order_code:'12345',
							orderSource:'美团',
							orderPrice:'¥12',
							settlementPrice:'¥8',
							orderStatus:'已送达',
							PlaceOrderTime:'2020-08-22',
							city:'北京',
							mobile:'1234567890',
							CPSCommissionPrice:'¥1',
							CPSCommissionStatus:'佣金已到账',
							commissionPrice:'¥2',
							maoli_price:'¥1'
						},
						{
							order_code:'12345',
							orderSource:'美团',
							orderPrice:'¥12',
							settlementPrice:'¥8',
							orderStatus:'已送达',
							PlaceOrderTime:'2020-08-22',
							city:'北京',
							mobile:'1234567890',
							CPSCommissionPrice:'¥1',
							CPSCommissionStatus:'佣金已到账',
							commissionPrice:'¥2',
							maoli_price:'¥1'
						},
						{
							order_code:'12345',
							orderSource:'美团',
							orderPrice:'¥12',
							settlementPrice:'¥8',
							orderStatus:'已送达',
							PlaceOrderTime:'2020-08-22',
							city:'北京',
							mobile:'1234567890',
							CPSCommissionPrice:'¥1',
							CPSCommissionStatus:'佣金已到账',
							commissionPrice:'¥2',
							maoli_price:'¥1'
						},
					],
					page:1,
					pageSize:10,
					total:10
				},
				orderListDeliveryPlatform:'',//订单明细列表外卖平台
				orderlistOrderTime:'',//订单明细列表订单时间
				showPage:false,//订单列表分页--数据加载完成后加载分页，否则分页先渲染完成会出错
			}
		},
		mounted() {
			this.getStatisticalData();//订单统计数据统计
			this.getZhuData();//柱状图
			this.getZheDataList(1,'#EFC5AF');//折线图数据
			this.getBingData();
			// this.getBingDataList();//饼图
			this.getLouData();//漏斗图
		},
		methods:{
			handleClick(tab, event){
				console.log(tab, event);
				if (tab.index == '0') { //订单统计
					this.getStatisticalData();//数据统计
					this.getZhuData();//柱状图
					this.getZheDataList(1,'#EFC5AF');//折线图数据
					this.getBingDataList();//饼图
					this.getLouData();//漏斗图
				} else if (tab.index == '1') {//订单列表明细
					this.getOrderListStatisticalData();//订单统计数据
					this.getOrderListTableData();//订单明细table
				}
			},
			//订单统计页查询btn
			OrderStatisticalOnSubmit(){

			},
			//订单统计中的统计卡片
			getStatisticalData(){

			},
			//get柱状图数据
			getZhuData(){
				let myChart = this.$echarts.init(this.$refs.home_DoubleLine);
				myChart.setOption({
					color: ['#3398DB'],
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: 'shadow'
						},
						formatter: '{b0}</br>{a0}:{c0}单</br>{a1}:{c1}元<br/>{a2}:{c2}元<br/>{a3}:{c3}元<br/>{a4}:{c4}元<br/>{a5}:{c5}元' // 这里是鼠标移上去的显示数据
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: ['1月','2月','3月','4月','5月','6月','7月',],
							axisTick: {
								alignWithLabel: true
							}
						}
					],
					yAxis: [
						{
							type: "value",
						}
					],
					series: [
						{
							name: '订单总GMV',
							type: 'bar',
							barWidth: '60%',
							data: [123,321,456,654,567,326,986]
						},
						{
							name: '订单量总和',
							type: 'bar',
							data: [12,32,23,42,14,23,35]
						},
						{
							name: '客单量',
							type: 'bar',
							data: [12,32,23,42,14,23,35]
						},
						{
							name: '佣金总和',
							type: 'bar',
							data: [12,32,23,42,14,23,35]
						},
						{
							name: '返佣总和',
							type: 'bar',
							data: [12,32,23,42,14,23,35]
						},
						{
							name: '毛利',
							type: 'bar',
							data: [12,32,23,42,14,23,35]
						}
					]
				})
			},
			//柱状图外卖平台切换
			getlineChartPlatformZhu(val){
				console.log(val);
			},
			//get折线图数据
			getZheDataList(index,color){
				console.log(index);
				let xData = [1,2,3,4,5,6,7];
				let seriesData = [{
					value:'12345',
					date:1,
					orderSum:'123',//订单量总和
					orderTotalPrice:'12345',//订单量总金额
					guestUnitPrice:'88',//客单价
					commissionSumPrice:'24',//佣金总和
					TotalCommission:'12',//返佣总和
					GrossProfit:'123'//毛利
				},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						value:'12345',
						date:1,
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},];
				this.getZheData(xData,color,seriesData);//绘制折线图
			},
			//绘制折线图数据
			getZheData(xAxis,seriesColor,seriesData){
				let myChart = this.$echarts.init(this.$refs.home_DoubleLin)
				myChart.setOption({
					tooltip: {
						trigger: "axis",
						formatter: function (params) {
							let tipText = "";
							params.forEach(function (item, index) {
								tipText += item.data.date
									+ '日'
									+ '</br>'
									+ '订单量总和：'
									+ item.data.orderSum
									+ '单'
									+ '</br>'
									+ '订单量总GMV:'
									+ item.data.orderTotalPrice
									+ '元'
									+ '</br>'
									+ '客单价:'
									+ item.data.guestUnitPrice
									+ '元'
									+ '</br>'
									+ '佣金总和:'
									+ item.data.commissionSumPrice
									+ '元'
									+ '</br>'
									+ '返佣总和:'
									+ item.data.TotalCommission
									+ '元'
									+ '</br>'
									+ '毛利:'
									+ item.data.GrossProfit
									+ '元';
							});
							return tipText;
						}
					},
					xAxis: [
						{
							type: 'category',
							data: xAxis,
						}
					],
					yAxis: [
						{
							type: "value",
						}
					],
					series: [{
						name: '',
						type: 'line',
						smooth: true, //是否以弧线展示折线
						itemStyle: {
							normal: {
								color: seriesColor,  //折线折点颜色
								lineStyle: {
									width: 2  //折线宽度
								}
							}
						},
						data:seriesData
					}]
				})
			},
			//折线图展示方式选择事件	-1天	2周
			company(val){
				console.log(val);
			},
			//折线图天数change
			getBrokenlineData(val){
				console.log(val);
			},
			//折线图下方平台切换
			DeliveryPlatformSwitch(index,color){
				console.log(index);
				console.log(color);
				this.getZheDataList(index,color);//折线图数据
			},
			//get饼图数据
			getBingDataList(){
				let legendData = ['陕西省','山西省','河北省','河南省','山东省','北京市'];
				let seriesData = [
					{
						name:'陕西省',
						value:'12345',
						city:'陕西省',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						name:'山西省',
						value:'12345',
						city:'山西省',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						name:'河北省',
						value:'12345',
						city:'河北省',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						namr:'河南省',
						value:'12345',
						city:'河南省',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						name:'山东省',
						value:'12345',
						city:'山东省',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					},
					{
						name:'北京市',
						value:'12345',
						city:'北京市',
						orderSum:'123',//订单量总和
						orderTotalPrice:'12345',//订单量总金额
						guestUnitPrice:'88',//客单价
						commissionSumPrice:'24',//佣金总和
						TotalCommission:'12',//返佣总和
						GrossProfit:'123'//毛利
					}
				]
				this.getBingData(legendData,seriesData);
			},
			//绘制饼图
			getBingData(){
				let myChart = this.$echarts.init(this.$refs.home_DoubleL)
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter:function (params) {
							console.log(params);
							let tipText = "";
							tipText += params.data.name
									+ '</br>'
									+ '订单量：'
									+ params.data.orderSum
									+ '单'
									+ '</br>'
									+ '订单量总GMV:'
									+ params.data.orderTotalPrice
									+ '元'
									+ '</br>'
									+ '客单价:'
									+ params.data.guestUnitPrice
									+ '元'
									+ '</br>'
									+ '订单量占比:'
									+ params.data.commissionSumPrice
									+ '%'
									+ '</br>'
									+ '订单GMV:'
									+ params.data.TotalCommission
									+ '元';
							return tipText;
						}
					},
					series: [{
						name: '订单量top10排名',
						type: 'pie',
						radius:'55%',
						hoverAnimation:false, // 是否开启 hover 在扇区上的放大动画效果
						data:[
							{
								name:'陕西省',
								value:'150',
								orderSum:'123',//订单量总和
								orderTotalPrice:'150',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							},
							{
								name:'山西省',
								value:'123',
								orderSum:'123',//订单量总和
								orderTotalPrice:'123',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							},
							{
								name:'河北省',
								value:'450',
								orderSum:'123',//订单量总和
								orderTotalPrice:'450',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							},
							{
								name:'河南省',
								value:'120',
								orderSum:'123',//订单量总和
								orderTotalPrice:'120',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							},
							{
								name:'山东省',
								value:'180',
								orderSum:'123',//订单量总和
								orderTotalPrice:'180',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							},
							{
								name:'北京市',
								value:'160',
								orderSum:'123',//订单量总和
								orderTotalPrice:'160',//订单量总金额
								guestUnitPrice:'88',//客单价
								commissionSumPrice:'24',//佣金总和
								TotalCommission:'12',//返佣总和
							}
						],
					}]
				})
			},
			//饼图天数change
			getlineChartDate(val){
				console.log(val);
			},
			//饼图外卖平台change
			getlineChartPlatform(val){
				console.log(val);
			},
			//饼图区域change
			getlineChartArea(val){
				console.log(val);
			},
			//get漏斗图数据
			getLouData(){

			},
			//漏斗图天数change
			getlineChartDateLou(val){
				console.log(val);
			},
			//分页每页条数change
			handleSizeChange(val) {
				console.log(val);
			},
			//分页当前页发生change
			handleCurrentChange(val) {
				console.log(val);
			},
			//分页点击上一页change
			onClickPrev(val) {
				console.log(val);
			},
			//分页点击下一页change
			onClickNext(val) {
				console.log(val);
			},
			//订单明细列表get统计数据
			getOrderListStatisticalData(){

			},
			//订单明细列表查询btn
			orderListOnSubmit(){

			},
			//get订单明细列表table
			getOrderListTableData(){

			},
		}
	}
</script>

<style scoped>

	.app-container {
		background-color: #f0f2f4;
	}
	.money { /* 卡片数字金额样式 */
		line-height: 30px;
		/*color: rgba(212, 48, 48, 1);*/
		font-size: 20px;
	}

	.headerStyle {
		border-bottom: 1px solid #dfdfdf;
	}

	.clearfix {
	&
	:after {
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
	/*统计卡片*/
	.mainStyle {
		padding: 20px 10px 0 10px;
	}

	.grid-content {
		min-height: 36px;
	}

	.card-item {
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
	.el-col-lg-4-8 {
		width: 20%;
	}
	/*	柱状图 ,折线图，漏斗图*/
	.SetmealList {
		background-color: #fff;
		margin-top: 20px;
		padding-top: 40px;
		border-radius: 10px;
		width: 100%;
		box-shadow: 4px 4px 5px #888888;
	}
	.brokenLine {
		position: relative;
	}
	/*柱状图上方选择sel*/
	.top_class {
		position: absolute;
		right: 10%;
		top: 5px;
		display: flex;
		align-items: center;
		z-index: 999999;
	}
	.top_class p {
		display: flex;
		align-items: center;
		margin-right: 20px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.top_class p span {
		height: 35px;
		line-height: 35px;
		padding: 0 10px;
		cursor: pointer;
	}
	.top_class p span.activ {
		background: #409EFF;
	}
	/*折线图*/
	/*折线图外卖平台切换*/
	.TransferDeliveryPlatform{
		text-align:center;
	}
	.TransferDeliveryPlatformUl{
		padding:0;
		margin:0 0 20px 0;
		list-style:none;
		display:inline-block;
		height:15px;
		vertical-align:top;
	}
	.TransferDeliveryPlatformUl li{
		float: left;
		position: relative;
		height: 50px;
		margin-right: 20px;
		cursor: pointer;
	}
	/*span1*/
	.PlatformTransfer{
		position: absolute;
		display: inline-block;
		width: 50px;
		height: 2px;
		top: 50%;
		margin-top: -15px;
	}
	/*span2*/
	.order{
		margin-left: 60px;
	}
	/*饼图*/
	.BingChart{
		float: left;
		width: 50%;
	}
	.cityRanking{
		float: left;
		width: 20%;
	}
	.cityRankingUl{
		padding:0;
		margin:0 0 20px 0;
		list-style:none;
	}
	.cityRankingUl li{
		font-size: 12px;
		margin-bottom: 5px;
	}
	/*漏斗图*/
	.LouWrapChild{
		position: relative;
		left: 50%;
		margin-left: -70px;
	}
	.maskFont1,.maskFont2,.maskFont3,.maskFont4{
		position: absolute;
		color: #fff;
		font-size: 12px;
	}
	.mask1{
		width:340px;
		height:0;
		border-top: 60px solid #646464;
		border-right: 23px solid transparent;
		border-left:23px solid transparent;
		text-align: center;
		/*line-height: 60px;*/
	}
	.maskFont1{
		margin-top: -40px;
		margin-left: 130px;
	}
	.mask2{
		width:294px;
		height:0;
		border-top: 50px solid #868686;
		border-right: 20px solid transparent;
		border-left:20px solid transparent;
		/*line-height: 50px;*/
		margin-left: 23px;
	}
	.maskFont2{
		margin-top: -35px;
		margin-left: 120px;
	}
	.mask3{
		width:254px;
		height:0;
		border-top: 40px solid #AEAEAE;
		border-right: 16px solid transparent;
		border-left:16px solid transparent;
		/*line-height: 40px;*/
		margin-left: 43px;
	}
	.maskFont3{
		margin-top: -30px;
		margin-left: 55px;
	}
	.mask4{
		width:221px;
		height:0;
		border-top: 30px solid #D8D8D8;
		border-right: 12px solid transparent;
		border-left:12px solid transparent;
		/*line-height: 30px;*/
		margin-left: 60px;
	}
	.maskFont4{
		margin-top: -22px;
		margin-left: 150px;
	}
	.LouData{
		float: left;
		width: 50%;
		font-size:12px;
		color:#646464;
	}
	/*漏斗图数据*/
	.LouDataList{
		position: relative;
		/*left:50px;*/
	}
	.LouDataList_ul{
		padding:0;
		margin:0 0 0px 0;
		list-style:none;
		display:inline-block;
	}
	/*线*/
	.LouDataListLineStylePublic{
		position: absolute;
		display: inline-block;
		background-color:#646464;
		width:150px;
		height: 1px;
	}
	.LouDataListLineStyle1{
		margin-top: 30px;
	}
	.LouDataListLineStyle2{
		margin-top: 85px;
	}
	.LouDataListLineStyle3{
		margin-top: 130px;
	}
	.LouDataListLineStyle4{
		margin-top: 165px;
	}
	/*数据*/
	.LouDataListDataStylePublic{
		position: absolute;
		left:160px;
	}
	.LouDataListDataStyle1{
		margin-top: 25px;
	}
	.LouDataListDataStyle2{
		margin-top: 80px;
	}
	.LouDataListDataStyle3{
		margin-top: 105px;
	}
	.LouDataListDataStyle4{
		margin-top: 160px;
	}
	/*统计图无数据样式*/
	.TemporarilyDataStyle {
		margin: 0 auto;
		line-height: 300px;
	}
	.detail{
		margin: 20px 0 20px 0;
	}
	.detail .title {
		font-size: 18px;
		font-weight: 800;
		margin-bottom: 10px;
	}
	.details .list p {
		width: 200px;
		text-align: right;
		margin-right: 20px;
		font-weight: 600;
	}
</style>
