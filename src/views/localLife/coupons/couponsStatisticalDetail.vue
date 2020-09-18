<template>
	<section class="app-container">
		<div style="margin-bottom:20px;">
			<router-link v-if="routeReturn" :to="{path:'/coupons/couponsStatistical',query:{type:1}}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
			<router-link v-else :to="{path:'/coupons/couponsStatistical',query:{type:2}}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
		</div>
<!--		优惠券选择-->
		<el-select v-model="couponsName" placeholder="请选择优惠券名称" style="width: 180px;">
			<el-option
				v-for="(item,index) in couponsNameOptions"
				:key="index"
				:label="item.label"
				:value="item.value"
			>
			</el-option>
		</el-select>
<!--		优惠券详情-->
		<div class="SetmealList details"
			 v-loading="couponsDetailLoading"
			 element-loading-text="拼命加载中">
			<div class="list">
				<p>优惠券配图：</p>
				<span style="display: inline-block;margin-top:80px;width: 100px;height: 100px;">
					<el-image :src="couponsDetailIamge" style="width: 100%;"></el-image>
				</span>
			</div>
			<div class="list" style="margin-top:80px;">
				<p>优惠券名称：</p>
				<span>{{couponsDetailName || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>优惠券类型：</p>
				<span>{{couponsDetailType || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>有效期：</p>
				<span>{{couponsDetailDate || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>优惠券数量：</p>
				<span>{{couponsDetailNumber || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>可使用城市：</p>
				<span>{{couponsDetailCity || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>可使用渠道：</p>
				<span>{{couponsDetailChannel || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>可使用权益：</p>
				<span>{{couponsDetailInterests || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>使用条件：</p>
				<span>{{couponsDetailConditions || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>领取方式：</p>
				<span>{{couponsDetailWay || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>限领级别：</p>
				<span>{{couponsDetailLevel || '暂无数据'}}</span>
			</div>
			<div class="list">
				<p>限领数量：</p>
				<span>{{couponsDetailLimitNumber || '暂无数据'}}</span>
			</div>
		</div>
<!--		操作日志-->
		<p class="SetmealListTitle">操作日志</p>
		<div class="SetmealList" style="padding:10px;">
			<el-table :data="couponsOperationList"  border style="width: 100%;margin-top:20px;" v-loading="couponsOperationLoading"
					  element-loading-text="拼命加载中">
				<el-table-column prop="couponsType" align="center" label="操作类型" width="120"></el-table-column>
				<el-table-column prop="couponsOperationName" align="center" label="操作人"></el-table-column>
				<el-table-column prop="couponsOperationTime" align="center" label="操作时间" width="120"></el-table-column>
				<el-table-column prop="couponsOperationNote" align="center" label="操作备注"></el-table-column>
			</el-table>
		</div>
<!--		领券记录-->
		<p class="SetmealListTitle">领券记录</p>
		<div class="SetmealList"
			 v-loading="couponsReceiveLoading"
			 element-loading-text="拼命加载中">
			<el-container
				style="width:100%;border-radius: 5px;padding: 5px;">
				<el-main class="mainStyle">
					<el-row :gutter="20">
						<el-col :span="6">
							<div class="grid-content card-item">
								<div>领券总量</div>
								<div class="money"> {{couponsReceiveCard.TotalSpiritDog||'暂无数据' }}</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content card-item">
								<div>使用总量</div>
								<div class="money">¥ {{couponsReceiveCard.UsingTotal||'暂无数据' }}</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content card-item">
								<div>过期总量</div>
								<div class="money">¥ {{couponsReceiveCard.OverdueAmount||'暂无数据' }}</div>
							</div>
						</el-col>
						<el-col :span="6">
							<div class="grid-content card-item">
								<div>优惠总金额</div>
								<div class="money">¥ {{couponsReceiveCard.TotalDiscountAmount||'暂无数据' }}</div>
							</div>
						</el-col>
					</el-row>
				</el-main>
			</el-container>
		</div>
<!--		优惠券明细表-->
		<div class="SetmealList" style="padding:10px">
			<el-form label-width="120px" :inline="true" class="demo-form-inline">
				<el-form-item label="优惠券状态：" label-width="140px">
					<el-select v-model="couponsStatus" placeholder="请选择" style="width: 180px;" @change="couponsStatusChange">
						<el-option
							v-for="(item,index) in couponsStatusOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券类型：" label-width="140px">
					<el-select v-model="couponsType" placeholder="请选择" style="width: 180px;" @change="couponsTypeChange">
						<el-option
							v-for="(item,index) in couponsTypeOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-table :data="couponsList.list"  border style="width: 100%;margin-top:20px;" v-loading="couponsListLoading"
					  element-loading-text="拼命加载中">
				<el-table-column prop="UserName" align="center" label="用户名" width="120"></el-table-column>
				<el-table-column prop="UserMobile" align="center" label="用户手机号"></el-table-column>
				<el-table-column prop="couponsName" align="center" label="优惠券名"></el-table-column>
				<el-table-column prop="couponsType" align="center" label="优惠券类型"></el-table-column>
				<el-table-column prop="couponsPrice" align="center" label="优惠券金额"></el-table-column>
				<el-table-column prop="couponsGetWay" align="center" label="领取方式"></el-table-column>
				<el-table-column prop="couponsDontUse" align="center" label="是否使用"></el-table-column>
				<el-table-column prop="couponsOrderNumber" align="center" label="使用订单号"></el-table-column>
				<el-table-column prop="couponsCreationTime" align="center" label="领券时间"></el-table-column>
				<el-table-column prop="couponsOverdueTime" align="center" label="过期时间"></el-table-column>
				<el-table-column prop="couponsStatus" align="center" label="状态"></el-table-column>
			</el-table>
			<!--				分页-->
			<div class="pagination-container" style="text-align:right;margin-bottom:50px">
				<el-pagination
					:current-page="couponsList.page"
					:page-size="couponsList.pageSize"
					:total="couponsList.total"
					background
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="couponsListSizeChange"
					@current-change="couponsListCurrentChange"
					@prev-click="couponsListOnClickPrev"
					@next-click="couponsListOnClickNext"
				/>
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        name: "couponsStatisticalDetail",
		data(){
        	return {
				routeReturn:true,//1返回数据总揽页，2返回数据列表页
				couponsName:'0',//优惠券名称model
				couponsNameOptions:[
					{
						value:'0',
						label:'优惠券名称1'
					},
					{
						value:'1',
						label:'优惠券名称2'
					},
					{
						value:'2',
						label:'优惠券名称3'
					},
					{
						value:'3',
						label:'优惠券名称4'
					},
				],//优惠券名称
				couponsDetailLoading:false,//优惠券详情loading
				couponsOperationLoading:false,//优惠券操作日志loading
				couponsReceiveLoading:false,//领券记录loading
				couponsListLoading:false,//优惠券明细表loading
				couponsDetailIamge:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg',//优惠券配图
				couponsDetailName:'优惠券名称1',//优惠券名称
				couponsDetailType:'满减',//优惠券类型
				couponsDetailDate:'自领取之日起10天',//有效期
				couponsDetailNumber:'3000张',//优惠券数量
				couponsDetailCity:'北京，上海',//可使用城市
				couponsDetailChannel:'悦淘，直订',//可使用渠道
				couponsDetailInterests:'机票，火车票，出行，加油',//可使用权益
				couponsDetailConditions:'满足200可使用一张，最多使用一张，不可与其他优惠券一起使用',//使用条件
				couponsDetailWay:'发放',//领取方式
				couponsDetailLevel:'注册会员，白金会员，黑金会员',//限领级别
				couponsDetailLimitNumber:'1张',//限领数量
				couponsOperationList:[
					{
						couponsType:'创建优惠券',//操作类型
						couponsOperationName:'******',//操作人
						couponsOperationTime:'2020-09-01',//操作时间
						couponsOperationNote:'*******'//操作备注
					},
					{
						couponsType:'发布优惠券',//操作类型
						couponsOperationName:'******',//操作人
						couponsOperationTime:'2020-09-01',//操作时间
						couponsOperationNote:'*******'//操作备注
					},
					{
						couponsType:'下架优惠券',//操作类型
						couponsOperationName:'******',//操作人
						couponsOperationTime:'2020-09-01',//操作时间
						couponsOperationNote:'*******'//操作备注
					},
					{
						couponsType:'上架优惠券',//操作类型
						couponsOperationName:'******',//操作人
						couponsOperationTime:'2020-09-01',//操作时间
						couponsOperationNote:'*******'//操作备注
					},
				],//优惠券操作日志list
				couponsReceiveCard:{
					TotalSpiritDog:'1232张',
					UsingTotal:'1232张｜65%',
					OverdueAmount:'1234张｜35%',
					TotalDiscountAmount:'1322元'
				},//领券记录卡片
				couponsStatus:1,
				couponsStatusOptions:[
					{
						value:1,
						label:'已领取'
					},
					{
						value:2,
						label: '已使用'
					},
					{
						value:3,
						label: '已过期'
					},
					{
						value:4,
						label: '未使用'
					},
				],
				couponsType:1,//优惠券类型model
				couponsTypeOptions: [
					{
						value:1,
						label:'满减券'
					},
					{
						value:2,
						label: '折扣券'
					},
				],//优惠券类型sel
				couponsList:{
					list:[
						{
							UserName:'张三',//用户名
							UserMobile:'23456789',//用户手机号
							couponsName:'优惠券1',//优惠券名
							couponsType:'满减券',//优惠券类型
							couponsPrice:'10元',//优惠券金额
							couponsGetWay:'自动发放',//领取方式
							couponsDontUse:'已使用',//是否使用
							couponsOrderNumber:'4324567',//使用订单号
							couponsCreationTime:'2020-09-01',//领券时间
							couponsOverdueTime:'2020-09-20',//国旗时间
							couponsStatus:'已领取'//状态
						},
						{
							UserName:'张三',
							UserMobile:'23456789',
							couponsName:'优惠券1',
							couponsType:'满减券',
							couponsPrice:'10元',
							couponsGetWay:'自动发放',
							couponsDontUse:'已使用',
							couponsOrderNumber:'4324567',
							couponsCreationTime:'2020-09-01',
							couponsOverdueTime:'2020-09-20',
							couponsStatus:'已领取'
						},
						{
							UserName:'张三',
							UserMobile:'23456789',
							couponsName:'优惠券1',
							couponsType:'满减券',
							couponsPrice:'10元',
							couponsGetWay:'自动发放',
							couponsDontUse:'已使用',
							couponsOrderNumber:'4324567',
							couponsCreationTime:'2020-09-01',
							couponsOverdueTime:'2020-09-20',
							couponsStatus:'已领取'
						},
						{
							UserName:'张三',
							UserMobile:'23456789',
							couponsName:'优惠券1',
							couponsType:'满减券',
							couponsPrice:'10元',
							couponsGetWay:'自动发放',
							couponsDontUse:'已使用',
							couponsOrderNumber:'4324567',
							couponsCreationTime:'2020-09-01',
							couponsOverdueTime:'2020-09-20',
							couponsStatus:'已领取'
						},
						{
							UserName:'张三',
							UserMobile:'23456789',
							couponsName:'优惠券1',
							couponsType:'满减券',
							couponsPrice:'10元',
							couponsGetWay:'自动发放',
							couponsDontUse:'已使用',
							couponsOrderNumber:'4324567',
							couponsCreationTime:'2020-09-01',
							couponsOverdueTime:'2020-09-20',
							couponsStatus:'已领取'
						},
					],
					page:1,
					pageSize:10,
					total:10
				}
			}
		},
		created() {
			this.row = this.$route.query ? this.$route.query.row : '';
			this.type = this.$route.query ? this.$route.query.type : '';
			if(this.row){
				this.getCouponsDetail();
			}
			if(this.type == 1){ //数据总览
				this.routeReturn = true;
			}else if(this.type == 2){//数据列表
				this.routeReturn = false;
			}
		},
		mounted() {

		},
		methods:{
        	//get优惠券详情
			getCouponsDetail(){

			},
			//优惠券明细表change
			couponsStatusChange(val){//优惠券状态
				console.log(val);
			},
			couponsTypeChange(val){//优惠券类型
				console.log(val);
			},
			//分页
			//每页条数change
			couponsListSizeChange(val){
				console.log(val);
				this.couponsList.pageSize = val;
			},
			//当前页数change
			couponsListCurrentChange(val){
				console.log(val);
				this.couponsList.page = val;
			},
			//上一页
			couponsListOnClickPrev(val){
				console.log(val);
				this.couponsList.page = val;
			},
			//下一页
			couponsListOnClickNext(val){
				console.log(val);
				this.couponsList.page = val;
			}
		}
	}
</script>

<style scoped>
.app-container{
	background-color:#f0f2f4;
	padding: 10px;
}
.SetmealList{
	background-color:#fff;
	margin-top:20px;
	border-radius: 5px;
	width:100%;
}
.SetmealListTitle{

}
.details .list{
	display: flex;
	font-size: 14px;
	align-items: center;
	height: 40px;
}
.details .list p{
	width: 200px;
	text-align: right;
	margin-right: 20px;
	font-weight: 500;
}
.mainStyle{
	padding:20px 20px 0 20px;
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
</style>
