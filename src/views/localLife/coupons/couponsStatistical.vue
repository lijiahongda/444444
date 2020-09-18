<template>
	<section class="app-container" id="staticWidth">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="优惠券数据总览" name="first">
<!--				数据卡片-->
				<el-row class="mainStyle couponStatisticalCardStyle" v-loading="couponStatisticalLoading" element-loading-text="拼命加载中">
					<el-col :span="8" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>优惠券总实例:</div>
							<div class="money"> {{couponInstance + '个' ||'暂无数据' }}</div>
						</div>
					</el-col>
					<el-col :span="16" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>优惠券总量:</div>
							<div class="money">¥ {{couponTotal + '张' ||'暂无数据' }}</div>
						</div>
					</el-col>
				</el-row>
				<el-row class="mainStyle couponStatisticalCardStyle" v-loading="couponStatisticalLoading" element-loading-text="拼命加载中">
					<el-col :span="6" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>总发放量:</div>
							<div class="money"> {{totalVolumes + '张 ｜ ' + totalVolumesPercentage + '%' ||'暂无数据' }}</div>
						</div>
					</el-col>
					<el-col :span="6" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>总使用量:</div>
							<div class="money">¥ {{TotalAmount + '元 | ' + TotalAmountPercentage + '%' ||'暂无数据' }}</div>
						</div>
					</el-col>
					<el-col :span="6" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>总过期量:</div>
							<div class="money">¥ {{totalOverdueAmount + '元 | ' + totalOverdueAmountPercentage + '%' ||'暂无数据' }}</div>
						</div>
					</el-col>
					<el-col :span="6" style="padding:0px 10px 0px 10px;">
						<div class="grid-content card-item">
							<div>优惠总金额:</div>
							<div class="money">¥ {{TotalDiscountAmount + '元' ||'暂无数据' }}</div>
						</div>
					</el-col>
				</el-row>
<!--				优惠券领用仪表-->
				<el-container class="mainStyle couponStatisticalCardStyle">
					<el-header>
						<el-row>
							<el-col :span="4" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<div style="font-width: 700;">优惠券领用仪表</div>
								</div>
							</el-col>
						</el-row>
					</el-header>
					<el-main>
						<div v-if="CouponClaimStatisticsHuanBai" class="TemporarilyDataStyle">暂无数据</div>
						<div v-else class="CouponClaimStatisticsHuanBaiDiv">
							<template>
								<swiper :options="swiperOption" ref="mySwiper">
									<swiper-slide  v-for="(item,index) in CouponClaimStatisticsHuanBaiList" :key="index">
										<div
											class="CouponClaimStatisticsHuanBai"
											ref="CouponClaimStatisticsHuanBai"
											style="display:block;margin:0;height:150px;">
										</div>
										<el-button type="text" @click="couponsShelve(1)">查看详情</el-button>
									</swiper-slide>
									<div class="swiper-button-prev" slot="button-prev" @click="prev"></div>
									<div class="swiper-button-next" slot="button-next" @click="next"></div>
								</swiper>
							</template>
						</div>
					</el-main>
				</el-container>
<!--				优惠券领用统计-->
				<el-container class="mainStyle couponStatisticalCardStyle">
					<el-header>
						<el-row>
							<el-col :span="4" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<div style="font-width: 700;">优惠券领用统计</div>
								</div>
							</el-col>
							<el-col :span="20" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<el-radio-group v-model="CouponClaimStatistics" @change="CouponClaimStatisticsChange">
										<el-radio-button label="-1">以天为单位</el-radio-button>
										<el-radio-button label="2">以周为单位</el-radio-button>
									</el-radio-group>
									<el-select v-model="CouponTimeway"
											   placeholder="请选择"
											   clearable
											   style="width: 160px;"
											   @change="CouponTimewayChange">
										<el-option label='相对时间'
												   value='1'/>
										<el-option label='绝对时间'
												   value='2'/>
									</el-select>
									<el-select v-if="CouponTimewayShow" v-model="CouponRelativeTime"
											   placeholder="请选择"
											   clearable
											   style="width: 160px;"
											   @change="CouponRelativeTimeChange">
										<el-option label='近7天'
												   value='7'/>
										<el-option label='近15天'
												   value='15'/>
										<el-option label='近30天'
												   value='30'/>
										<el-option label='近60天'
												   value='60'/>
									</el-select>
									<span v-else style="display: inline-block;width:280px;vertical-align: top;">
										<template>
											<label style="font-size: 12px;">开始时间:</label>
											<el-date-picker v-model="activityStart_time"
															type="datetime"
															value-format="yyyy-MM-dd HH:mm:ss"
															placeholder="开始时间"
															style="width: 210px;margin-bottom:10px "/>
											<br>
											<label style="font-size: 12px;">结束时间:</label>
											<el-date-picker v-model="activityEnd_time"
															type="datetime"
															value-format="yyyy-MM-dd HH:mm:ss"
															placeholder="结束时间"
															style="width: 210px;"/>
										</template>
									</span>
								</div>
							</el-col>
						</el-row>
					</el-header>
					<el-main>
						<div v-if="CouponClaimStatisticsZhe" class="TemporarilyDataStyle">暂无数据</div>
						<div
							v-else
							:key="CouponClaimStatisticsZheKey"
							id="CouponClaimStatisticsZheLine"
							ref="CouponClaimStatisticsZheLine"
							style="width:100%;display:block;margin:0 auto; height:300px;">
						</div>
						<div class="TransferDeliveryPlatform">
							<ul class="TransferDeliveryPlatformUl clearfix">
								<li v-for="(item,index) in CouponClaimStatisticsList" :key="index">
									<span class="PlatformTransfer" :style="{'background-color':item.backgroundColor}"></span>
									<span class="order">{{item.PlatformName}}</span>
								</li>
							</ul>
						</div>
					</el-main>
				</el-container>
<!--				本地生活订单统计-->
				<el-container class="mainStyle couponStatisticalCardStyle">
					<el-header>
						<el-row>
							<el-col :span="4" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<div style="font-width: 700;">本地生活订单统计图</div>
								</div>
							</el-col>
							<el-col :span="20" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<el-radio-group v-model="CouponClaimStatisticsOrder" @change="CouponClaimStatisticsOrderChange">
										<el-radio-button label="-1">以天为单位</el-radio-button>
										<el-radio-button label="2">以周为单位</el-radio-button>
									</el-radio-group>
									<el-select v-model="CouponTimewayOrder"
											   placeholder="请选择"
											   clearable
											   style="width: 160px;"
											   @change="CouponTimewayOrderChange">
										<el-option label='相对时间'
												   value='1'/>
										<el-option label='绝对时间'
												   value='2'/>
									</el-select>
									<el-select v-if="CouponTimewayOrderShowOrder" v-model="CouponRelativeTimeOrder"
											   placeholder="请选择"
											   clearable
											   style="width: 160px;"
											   @change="CouponRelativeTimeOrderChange">
										<el-option label='近7天'
												   value='7'/>
										<el-option label='近15天'
												   value='15'/>
										<el-option label='近30天'
												   value='30'/>
										<el-option label='近60天'
												   value='60'/>
									</el-select>
									<span v-else style="display: inline-block;width:280px;vertical-align: top;">
										<template>
											<label style="font-size: 12px;">开始时间:</label>
											<el-date-picker v-model="activityOrderStart_time"
															type="datetime"
															value-format="yyyy-MM-dd HH:mm:ss"
															placeholder="开始时间"
															style="width: 210px;margin-bottom:10px "/>
											<br>
											<label style="font-size: 12px;">结束时间:</label>
											<el-date-picker v-model="activityOrderEnd_time"
															type="datetime"
															value-format="yyyy-MM-dd HH:mm:ss"
															placeholder="结束时间"
															style="width: 210px;"/>
										</template>
									</span>
									<el-select v-model="CouponInterestsOrder"
											   placeholder="请选择权益"
											   clearable
											   style="width: 120px;"
											   @change="CouponInterestsOrderChange">
										<el-option label='机票'
												   value='1'/>
										<el-option label='火车票'
												   value='2'/>
										<el-option label='曹操出行'
												   value='3'/>
										<el-option label='生活充值'
												   value='4'/>
										<el-option label='加油充值'
												   value='5'/>
										<el-option label='演艺门票'
												   value='6'/>
									</el-select>
								</div>
							</el-col>
						</el-row>
					</el-header>
					<el-main>
						<div v-if="CouponClaimStatisticsOrderZhe" class="TemporarilyDataStyle">暂无数据</div>
						<div
							v-else
							:key="CouponClaimStatisticsOrderZheKey"
							id="CouponClaimStatisticsOrderZheLine"
							ref="CouponClaimStatisticsOrderZheLine"
							style="width:100%;display:block;margin:0 auto; height:300px;">
						</div>
						<div class="TransferDeliveryPlatform">
							<ul class="TransferDeliveryPlatformUl clearfix">
								<li v-for="(item,index) in DCouponClaimStatisticsList" :key="index">
									<span class="PlatformTransfer" :style="{'background-color':item.backgroundColor}"></span>
									<span class="order">{{item.PlatformName}}</span>
								</li>
							</ul>
						</div>
					</el-main>
				</el-container>
<!--				领券渠道统计图-->
				<el-container class="mainStyle couponStatisticalCardStyle">
					<el-header>
						<el-row>
							<el-col :span="4" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<div style="font-width: 700;">领券渠道统计图</div>
								</div>
							</el-col>
						</el-row>
					</el-header>
					<el-main>
						<div v-if="CouponClaimStatisticsHuan" class="TemporarilyDataStyle">暂无数据</div>
						<el-row v-else>
							<el-col :span="12" style="padding:0px 10px 0px 10px;">
								<div class="grid-content">
									<div
										id="CouponRedemptionChannelsBai"
										ref="CouponRedemptionChannelsBai"
										style="width:100%;display:block;margin:0 auto; height:300px;">
									</div>
								</div>
							</el-col>
							<el-col :span="12" style="padding:0px 10px 0px 10px;">
								<div class="grid-content" style="margin-top: 60px;">
									<div class="CouponRedemptionChannelsListStyle" v-for="(item,index) in CouponRedemptionChannelsList" :key="index">
										<span class="CouponRedemptionChannelsRound" :style="{'background-color':item.color}"></span>
										<span class="nameWidth">{{item.name}}</span>
										<span class="percentageWidth">{{item.percentage}}</span>
										<span> ｜ </span>
										<span>{{item.number + '张'}}</span>
									</div>
								</div>
							</el-col>
						</el-row>
					</el-main>
				</el-container>
			</el-tab-pane>
			<el-tab-pane label="所有优惠券" name="second">
				<el-form label-width="120px" :inline="true" class="demo-form-inline">
					<el-form-item label="优惠券名称：">
						<el-input v-model="couponsName" placeholder="请输入优惠券名称"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="" type="primary" @click="couponsSearch">搜索</el-button>
					</el-form-item>
					<el-form-item label="优惠券类型：">
						<el-select v-model="couponsType" placeholder="请选择" style="width: 180px;">
							<el-option
								v-for="(item,index) in couponsTypeOptions"
								:key="index"
								:label="item.label"
								:value="item.value"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker v-model="coupons_time"
										type="datetime"
										value-format="yyyy-MM-dd"
										placeholder="创建时间"
										style="width: 160px;"/>
					</el-form-item>
				</el-form>
				<el-table :data="couponsOrderList.list"  border style="width: 100%;margin-top:20px;" v-loading="refundOrderLoading"  element-loading-text="拼命加载中">
					<el-table-column prop="" align="center" label="优惠券配图" fixed="left">
						<template slot-scope="scope">
							<el-image :src="scope.row.couponsImage"></el-image>
						</template>
					</el-table-column>
					<el-table-column prop="couponsName" align="center" label="优惠券名" width="120"></el-table-column>
					<el-table-column prop="couponsType" align="center" label="类型"></el-table-column>
					<el-table-column prop="couponsWay" align="center" label="领取方式"></el-table-column>
					<el-table-column prop="couponsNumber" align="center" label="数量"></el-table-column>
					<el-table-column prop="couponsBrought" align="center" label="已领"></el-table-column>
					<el-table-column prop="couponsBeenUsed" label="已用" align="center" width="120"></el-table-column>
					<el-table-column prop="couponsShelfTime" align="center" label="上架时间"></el-table-column>
					<el-table-column prop="couponsCreationTime" align="center" label="创建时间"></el-table-column>
					<el-table-column fixed="right" label="操作" align="center" width="130">
							<template slot-scope="scope">
								<el-button
									@click="couponsShelves(scope.row,0)"
									type="text"
									size="small"
									v-if="scope.row.ShelfOperation == 0">
									上架
								</el-button>
								<el-button
									@click="couponsShelves(scope.row,1)"
									type="text"
									size="small"
									v-else-if="scope.row.ShelfOperation == 1">
									下架
								</el-button>
								<el-button
									@click="couponsEditor(scope.row)"
									type="text"
									size="small">
									编辑
								</el-button>
								<el-button
									@click="couponsDetails(scope.row,2)"
									type="text"
									size="small">
									详情
								</el-button>
							</template>
						</el-table-column>
				</el-table>
				<!--				分页-->
				<div class="pagination-container" style="text-align:right;margin-bottom:50px">
					<el-pagination
						:current-page="couponsOrderList.page"
						:page-size="couponsOrderList.pageSize"
						:total="couponsOrderList.total"
						background
						layout="total, sizes, prev, pager, next, jumper"
						@size-change="couponsOrderListSizeChange"
						@current-change="couponsOrderListCurrentChange"
						@prev-click="couponsOrderListOnClickPrev"
						@next-click="couponsOrderListOnClickNext"
					/>
				</div>
			</el-tab-pane>
		</el-tabs>
<!--		上下架弹窗ShelfOperation-->
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
	import 'swiper/swiper-bundle.css'
	import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

    export default {
        name: "couponsStatistical",
		data(){
        	return {
				activeName:'first',
				refundOrderLoading:false,//所有优惠券tabLoading
				couponStatisticalLoading:false,//哟回去统计卡片loading
				//优惠券数据总览
				//卡片
				couponInstance:'12',//优惠券总实例
				couponTotal:'12322',//优惠券总量
				totalVolumes:'123423',//总发放量
				totalVolumesPercentage:'35',
				TotalAmount:'12322',//总使用量
				TotalAmountPercentage:'15',
				totalOverdueAmount:'12322',//总过期量
				totalOverdueAmountPercentage:'25',
				TotalDiscountAmount:'123222',//优惠总金额
				//优惠券领用统计
				CouponClaimStatisticsHuanBai:false,
				CouponClaimStatisticsHuanBaiList:[
					{
						color:'#38a8da',
						name:'优惠券名称1',
						number:'20'
					},{
						color:'#75D48C',
						name:'优惠券名称2',
						number:'50'
					},{
						color:'#FCDB6B',
						name:'优惠券名称3',
						number:'30'
					},{
						color:'#4EA4FF',
						name:'优惠券名称4',
						number:'60'
					},
					{
						color:'#38a8da',
						name:'优惠券名称5',
						number:'20'
					},{
						color:'#75D48C',
						name:'优惠券名称6',
						number:'50'
					},{
						color:'#FCDB6B',
						name:'优惠券名称7',
						number:'30'
					},{
						color:'#4EA4FF',
						name:'优惠券名称8',
						number:'60'
					}
				],
				swiperOption: {
					// loop:true,
					initialSlide:0,//默认第0页
					slidesPerView:5,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				},
				CouponClaimStatistics:'-1',//优惠券领用统计model -1天2周
				CouponTimeway:'1',//优惠券时间方式	1相对时间（展示7，15，30，60）	2绝对时间（展示具体开始结束时间）
				CouponRelativeTime:'7',//相对时间绑定值 7，15，30，60
				CouponTimewayShow:true,
				activityStart_time:'',//绝对开始时间
				activityEnd_time:'',//绝对结束时间
				CouponClaimStatisticsZhe:false,//折线图无数据
				CouponClaimStatisticsList:[
					{
						index:1,
						PlatformName:'领取',
						backgroundColor:'#64B0F2',
					},
					{
						index:2,
						PlatformName:'核销',
						backgroundColor:'#A2E1B1',
					}
				],
				CouponClaimStatisticsZheKey:0,
				//本地生活订单统计图
				CouponClaimStatisticsOrder:'-1',
				CouponTimewayOrder:'1',
				CouponTimewayOrderShowOrder:true,
				CouponRelativeTimeOrder:'7',
				activityOrderStart_time:'',
				activityOrderEnd_time:'',
				CouponInterestsOrder:'1',
				CouponClaimStatisticsOrderZhe:false,//折线图无数据
				DCouponClaimStatisticsList:[
					{
						index:1,
						PlatformName:'订单量',
						backgroundColor:'#64B0F2',
					},
				],
				CouponClaimStatisticsOrderZheKey:0,
				//领券渠道统计图
				CouponClaimStatisticsHuan:false,
				CouponRedemptionChannelsList:[
					//'#E062AE','#FF9F7F','#FFDB5C','#68E0E3','#37A2DA'
					{
						color:'#E062AE',
						name:'领券渠道1',
						percentage:'36%',
						number:'4544',
					},
					{
						color:'#FF9F7F',
						name:'领券渠道2',
						percentage:'20%',
						number:'4544',
					},
					{
						color:'#FFDB5C',
						name:'领券渠道3',
						percentage:'26%',
						number:'4544',
					},
					{
						color:'#68E0E3',
						name:'领券渠道4',
						percentage:'10%',
						number:'4544',
					},
					{
						color:'#37A2DA',
						name:'领券渠道5',
						percentage:'9%',
						number:'4544',
					},
				],
				//所有优惠券
				couponsName:'',//优惠券名称
				couponsType:'1',//优惠券类型
				couponsTypeOptions:[
					{
						value:'1',
						label:'满减券'
					},
					{
						value:'2',
						label:'折扣券'
					},
				],//优惠券类型
				coupons_time:'',//优惠券创建时间
				couponsOrderList:{
					list:[
						{
							couponsImage:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//配图
							couponsName:'双11优惠券',//名称
							couponsType:'满减券',//类型
							couponsWay:'发放',//领取方式
							couponsNumber:'100',//数量
							couponsBrought:'20',//已领
							couponsBeenUsed:'5',//已用
							couponsShelfTime:'2020-09-01',//上架时间
							couponsCreationTime:'2020-08-22',//创建时间
							ShelfOperation:0
						},
						{
							couponsImage:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//配图
							couponsName:'双11优惠券',//名称
							couponsType:'满减券',//类型
							couponsWay:'发放',//领取方式
							couponsNumber:'100',//数量
							couponsBrought:'20',//已领
							couponsBeenUsed:'5',//已用
							couponsShelfTime:'2020-09-01',//上架时间
							couponsCreationTime:'2020-08-22',//创建时间
							ShelfOperation:1
						},
						{
							couponsImage:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//配图
							couponsName:'双11优惠券',//名称
							couponsType:'满减券',//类型
							couponsWay:'发放',//领取方式
							couponsNumber:'100',//数量
							couponsBrought:'20',//已领
							couponsBeenUsed:'5',//已用
							couponsShelfTime:'2020-09-01',//上架时间
							couponsCreationTime:'2020-08-22',//创建时间
							ShelfOperation:0
						},
						{
							couponsImage:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//配图
							couponsName:'双11优惠券',//名称
							couponsType:'满减券',//类型
							couponsWay:'发放',//领取方式
							couponsNumber:'100',//数量
							couponsBrought:'20',//已领
							couponsBeenUsed:'5',//已用
							couponsShelfTime:'2020-09-01',//上架时间
							couponsCreationTime:'2020-08-22',//创建时间
							ShelfOperation:1
						},
						{
							couponsImage:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//配图
							couponsName:'双11优惠券',//名称
							couponsType:'满减券',//类型
							couponsWay:'发放',//领取方式
							couponsNumber:'100',//数量
							couponsBrought:'20',//已领
							couponsBeenUsed:'5',//已用
							couponsShelfTime:'2020-09-01',//上架时间
							couponsCreationTime:'2020-08-22',//创建时间
							ShelfOperation:0
						},
					],
					page:1,
					pageSize:10,
					total:10
				},//优惠券列表
				ShelfOperationTitle:'优惠券上架',//上下架弹窗title
				ShelfOperationBtnTitle:'上架',//上下架弹窗btn
				ShelfOperationDialog:false,//上下架弹窗
				ShelfOperationLabel:'上架原因：',//上下架原因label
				ShelfOperationInput:'请输入上架原因',//input输入框提示
				ShelfOperationWhy:'',//上下架原因绑定值
			}
		},
		components: {
			Swiper,
			SwiperSlide
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.$swiper
			}
		},
		created() {

		},
		mounted() {
			this.$nextTick(function () {
				this.calculateEcharts();
				this.type = this.$route.query ? this.$route.query.type : '';
				if (this.type == 1) {
					this.activeName = 'first'; //优惠券数据总揽
					this.getCouponClaimStatisticsHuanBai();
					this.getCouponClaimStatisticsZheData();//优惠券领用统计折线图
					this.getCouponClaimStatisticsOrderZheData();//本地生活订单统计图折线图
					this.getCouponClaimStatisticsHuanData();//领券渠道统计图
					console.log('this is current swiper instance object', this.swiper)
					this.swiper.slideTo(3, 1000, false)
				} else if (this.type == 2) {
					this.activeName = 'second'; //优惠券列表
					this.getCouponsList();//全部优惠券列表
				}  else {
					this.activeName = 'first'; //订单统计
					this.getCouponClaimStatisticsHuanBai();
					this.getCouponClaimStatisticsZheData();//优惠券领用统计折线图
					this.getCouponClaimStatisticsOrderZheData();//本地生活订单统计图折线图
					this.getCouponClaimStatisticsHuanData();//领券渠道统计图
					console.log('this is current swiper instance object', this.swiper)
					this.swiper.slideTo(3, 1000, false)
				}
			});
		},
		methods:{
			handleClick(tab,event){
				console.log(tab);
				if(tab.index == '0'){ //优惠券数据总览
					console.log('this is current swiper instance object', this.swiper)
					this.swiper.slideTo(3, 1000, false);
					this.getCouponClaimStatisticsHuanBai();
					this.getCouponClaimStatisticsZheData();//优惠券领用统计折线图
					this.getCouponClaimStatisticsOrderZheData();//本地生活订单统计图折线图
					this.getCouponClaimStatisticsHuanData();//领券渠道统计图
				}else if(tab.index == '1'){//所有优惠券
					this.getCouponsList();//全部优惠券列表
				}
			},
			prev(){
				this.swiper.slidePrev();
			},
			next(){
				this.swiper.slideNext();
			},
			calculateEcharts() {
				//获取这个组件的窗口宽度
				this.initWidth = document.getElementById('staticWidth').offsetWidth;
			},
			//优惠券数据统计
			getCouponClaimStatisticsHuanBai(){
				let that = this;
				for(let i = 0;i<this.CouponClaimStatisticsHuanBaiList.length;i++){
					let myEcharts = that.$echarts.init(that.$refs.CouponClaimStatisticsHuanBai[i]);
					myEcharts.setOption({
						color:[this.CouponClaimStatisticsHuanBaiList[i].color,'#F0F2F5'],
						graphic: [{ //环形图中间添加文字
							type: 'text', //通过不同top值可以设置上下显示
							left: 'center',
							top: '45%',
							style: {
								text: this.CouponClaimStatisticsHuanBaiList[i].name+'\n\n'+this.CouponClaimStatisticsHuanBaiList[i].number + '%',
								textAlign: 'center',
								fill: '#747475', //文字的颜色
								width: 30,
								height: 30,
								fontSize: 12,
								fontFamily: "Microsoft YaHei"
							}
						}],
						series: [
							{
								name: '',
								type: 'pie',
								radius: ['50%', '70%'],
								hoverAnimation:false,
								avoidLabelOverlap: false,
								label: {
									show: false,
									position: 'center'
								},
								labelLine: {
									show: false
								},
								data: [
									{value: this.CouponClaimStatisticsHuanBaiList[i].number, name: ''},
									{value:100-this.CouponClaimStatisticsHuanBaiList[i].number,name:''}
								]
							}
						]
					});
					myEcharts.resize(
						{
							width:(this.initWidth)/5,
							height:150
						}
					);
					myEcharts.on("mouseover", function (params){
						myEcharts.dispatchAction({
							type: 'downplay'
						});
					});
				};
			},
			getDirection() {
				let windowWidth = window.innerWidth;
				console.log(windowWidth);
				let direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

				return direction;
			},
			//优惠券百分比图查看详情
			couponsShelve(type){
				this.$router.push({path: '/coupons/couponsStatisticalDetail', query: {row:'row',type:type}});
			},
			//优惠券领用统计	-1天2周
			CouponClaimStatisticsChange(val){
				console.log(val);
			},
			CouponTimewayChange(val){
				console.log(val);
				if(val == '1'){ //相对时间
					this.CouponTimewayShow = true;
				}else if(val == '2'){//绝对时间
					this.CouponTimewayShow = false;
				}
			},
			//相对时间change 7,15,30,60
			CouponRelativeTimeChange(val){

			},
			//优惠券领用统计折线图
			getCouponClaimStatisticsZheData(){
				let xLineData = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日',]
				let myChart = this.$echarts.init(this.$refs.CouponClaimStatisticsZheLine)
				myChart.setOption({
					color: ['#64B0F2'],
					tooltip: {
						trigger: "axis",
						formatter:function(params){
							let tipText="";
							params.forEach(function(item,index){
								tipText += item.data.date
									+ '</br>'
									+ '领取：'
									+ item.data.receive
									+ '张'
									+ '</br>'
									+ '核销:'
									+ item.data.verification
									+ '张';
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
							smooth: false, //是否以弧线展示折线
							itemStyle : {
								normal : {
									color:'#64B0F2',  //折线折点颜色
									lineStyle:{
										width:2  //折线宽度
									}
								}
							},
							data:[
								{
									value:'123',
									receive:'123',
									verification:'321',
									date:'1日'
								},
								{
									value:'150',
									receive:'150',
									verification:'321',
									date:'2日'
								},{
									value:'130',
									receive:'130',
									verification:'321',
									date:'3日'
								},{
									value:'180',
									receive:'180',
									verification:'321',
									date:'4日'
								},{
									value:'200',
									receive:'200',
									verification:'321',
									date:'5日'
								},{
									value:'230',
									receive:'230',
									verification:'321',
									date:'6日'
								},{
									value:'120',
									receive:'120',
									verification:'321',
									date:'7日'
								},{
									value:'80',
									receive:'80',
									verification:'321',
									date:'8日'
								},{
									value:'60',
									receive:'60',
									verification:'321',
									date:'9日'
								},{
									value:'100',
									receive:'100',
									verification:'321',
									date:'10日'
								}
							]
						},
						{
							name: '',
							type: 'line',
							smooth: false, //是否以弧线展示折线
							itemStyle : {
								normal : {
									color:'#A2E1B1',  //折线折点颜色
									lineStyle:{
										width:2  //折线宽度
									}
								}
							},
							data:[
								{
									value:'160',
									receive:'160',
									verification:'321',
									date:'1日'
								},
								{
									value:'180',
									receive:'180',
									verification:'321',
									date:'2日'
								},{
									value:'160',
									receive:'160',
									verification:'321',
									date:'3日'
								},{
									value:'200',
									receive:'200',
									verification:'321',
									date:'4日'
								},{
									value:'220',
									receive:'220',
									verification:'321',
									date:'5日'
								},{
									value:'120',
									receive:'120',
									verification:'321',
									date:'6日'
								},{
									value:'140',
									receive:'140',
									verification:'321',
									date:'7日'
								},{
									value:'100',
									receive:'100',
									verification:'321',
									date:'8日'
								},{
									value:'80',
									receive:'80',
									verification:'321',
									date:'9日'
								},{
									value:'60',
									receive:'60',
									verification:'321',
									date:'10日'
								}
							]
						}
					]
				});
				let resize = {
					width: this.initWidth,
					height: 270
				};
				myChart.resize(resize);
			},
			//本地生活订单统计图
			CouponClaimStatisticsOrderChange(val){//-1天2周

			},
			CouponTimewayOrderChange(val){//1相对时间2绝对时间
				console.log(val);
				if(val == '1'){
					this.CouponTimewayOrderShowOrder = true;
				}else if(val == '2'){
					this.CouponTimewayOrderShowOrder = false;
				}
			},
			CouponRelativeTimeOrderChange(val){//7,15,30,60

			},
			CouponInterestsOrderChange(val){//机票，火车票，曹操出行，生活充值，加油打折，演艺门票

			},
			getCouponClaimStatisticsOrderZheData(){
				let xLineData = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日',]
				let myChart = this.$echarts.init(this.$refs.CouponClaimStatisticsOrderZheLine);
				myChart.setOption({
					color: ['#64B0F2'],
					tooltip: {
						trigger: "axis",
						formatter:function(params){
							let tipText="";
							params.forEach(function(item,index){
								tipText += item.data.date
									+ '</br>'
									+ '订单量：'
									+ item.data.orderNum;
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
							smooth: false, //是否以弧线展示折线
							itemStyle : {
								normal : {
									color:'#64B0F2',  //折线折点颜色
									lineStyle:{
										width:2  //折线宽度
									}
								}
							},
							data:[
								{
									value:'123',
									orderNum:'123',
									date:'1日'
								},
								{
									value:'150',
									orderNum:'150',
									date:'2日'
								},{
									value:'130',
									orderNum:'130',
									date:'3日'
								},{
									value:'180',
									orderNum:'180',
									date:'4日'
								},{
									value:'200',
									orderNum:'200',
									date:'5日'
								},{
									value:'230',
									orderNum:'230',
									date:'6日'
								},{
									value:'120',
									orderNum:'120',
									date:'7日'
								},{
									value:'80',
									orderNum:'80',
									date:'8日'
								},{
									value:'60',
									orderNum:'60',
									date:'9日'
								},{
									value:'100',
									orderNum:'100',
									date:'10日'
								}
							]
						}
					]
				});
				let resize = {
					width: this.initWidth,
					height: 270
				};
				myChart.resize(resize);
			},
			//领券渠道统计图（环形图）
			getCouponClaimStatisticsHuanData(){
				let myChart = this.$echarts.init(this.$refs.CouponRedemptionChannelsBai);
				myChart.setOption({
					color:['#E062AE','#FF9F7F','#FFDB5C','#68E0E3','#37A2DA'],
					graphic: [{ //环形图中间添加文字
						type: 'text', //通过不同top值可以设置上下显示
						left: 'center',
						top: '45%',
						style: {
							text: '领券量'+'\n\n'+'123324张',
							textAlign: 'center',
							fill: '#747475', //文字的颜色
							width: 30,
							height: 30,
							fontSize: 20,
							fontFamily: "Microsoft YaHei"
						}
					}],
					series: [
						{
							name: '',
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center'
							},
							labelLine: {
								show: false
							},
							data: [
								{value: 335, name: '领券渠道1'},
								{value: 310, name: '领券渠道2'},
								{value: 234, name: '领券渠道3'},
								{value: 135, name: '领券渠道4'},
								{value: 1548, name: '领券渠道5'}
							]
						}
					]
				});
				let resize = {
					width: (this.initWidth)/2,
					height: 270
				};
				myChart.resize(resize);
			},
			//全部优惠券
			//get优惠券列表
			getCouponsList(){

			},
			//创建优惠券
			couponsCouponsBtn(val){
				console.log(val);
				if(val == 0){ //创建优惠券

				}else if(val == 1){//查看优惠券详情

				}
			},
			//搜索
			couponsSearch(){

			},
			//优惠券上下架
			couponsShelves(row,type){
				this.ShelfOperationDialog = true;
				this.ShelfOperationRow = row;//存储这条数据
				if(type == 0){//上架		如果优惠券数量低于10要提示
					this.ShelfOperationType = 0;
					this.ShelfOperationTitle = '优惠券上架';
					this.ShelfOperationBtnTitle = '上架';
					this.ShelfOperationLabel = '上架原因：';
					this.ShelfOperationInput = '请输入上架原因';
				}else if(type == 1){//下架
					this.ShelfOperationType = 1;
					this.ShelfOperationTitle = '优惠券下架';
					this.ShelfOperationBtnTitle = '下架';
					this.ShelfOperationLabel = '下架原因：';
					this.ShelfOperationInput = '请输入下架原因';
				}
			},
			//上下架确认
			ShelfOperationConfirm(){
				if(this.ShelfOperationType == 0){
					//发起上架接口
				}else if(this.ShelfOperationType == 1){
					//发起下架接口
				}
				//关闭弹窗
				this.ShelfOperationDialog = false;
			},
			//优惠券编辑
			couponsEditor(row){
				console.log(row);
				this.$router.push({path:'/coupons/CouponEditor',query:{row:row}});
			},
			//优惠券查看详情
			couponsDetails(row,type){
				console.log(row);
				this.$router.push({path: '/coupons/couponsStatisticalDetail', query: {row:row,type:type}});
			},
			//分页
			//每页条数change
			couponsOrderListSizeChange(val){
				console.log(val);
			},
			//当前页发生改变change
			couponsOrderListCurrentChange(val){
				console.log(val);
			},
			//分页点击上一页change
			couponsOrderListOnClickPrev(val){
				console.log(val);
			},
			//分页点击下一页change
			couponsOrderListOnClickNext(val){
				console.log(val);
			}
		}
	}
</script>

<style scoped>
	.app-container{
		background-color:#f0f2f4;
		padding: 10px;
	}
	.mainStyle {
		padding: 20px 20px 0 20px;
		margin-bottom: 20px;
	}
	.couponStatisticalCardStyle{
		width:100%;
		background-color:#fff;
		box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.2);
		border-radius: 5px;
		padding: 5px;
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

	.money { /* 卡片数字金额样式 */
		line-height: 30px;
		/*color: rgba(212, 48, 48, 1);*/
		font-size: 20px;
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
	.TemporarilyDataStyle {
		margin: 0 auto;
		line-height: 300px;
	}
	.CouponRedemptionChannelsRound{
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.CouponRedemptionChannelsListStyle{
		margin-left:20px;
		margin-bottom: 20px;
	}
	.nameWidth{
		display: inline-block;
		width: 120px;
	}
	.percentageWidth{
		display: inline-block;
		width: 30px;
	}
	.CouponClaimStatisticsHuanBaiDiv{
		display: flex;
		position: relative;
		font-size: 40px;
		color: #ccc;
	}
	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
