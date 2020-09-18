<template>
	<section class="app-container">
		<div style="margin-bottom:20px;">
			<router-link :to="{path:'/coupons/couponsStatistical',query:{type:2}}">
				<el-button type="primary">返回列表</el-button>
			</router-link>
		</div>
		<div class="SetmealList details">
<!--			基础信息-->
			<div>
				<span class="informationRound"></span>
				<span class="SetmealListTitle">基础信息</span>
			</div>
			<el-form>
				<el-form-item label="优惠券配图：" label-width="140px">
					<div style="border:1px dashed #ccc;width: 100px;height: 100px;text-align: center;">
						<img v-if="couponImageShow" :src="couponImageUrl" class="avatar">
						<span v-else class="backLogo">优惠券配图</span>
					</div>
					<el-upload
						class="upload-demo"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="showFileList"
						:on-success="uploadSuccessUserAll"
						:on-progress="couponProgressUrl"
						style="color:#409EFF;margin-top:-65px;margin-bottom: 30px;"
					>
						<span size="small" type="primary" style="margin-left: 150px;">上传图片</span>
					</el-upload>
				</el-form-item>
				<el-form-item label="优惠券名称：" label-width="140px">
					<el-input
						placeholder="优惠券名称"
						v-model="couponsName"
						:disabled="true"
						style="width: 180px;">
					</el-input>
				</el-form-item>
				<el-form-item label="优惠券类型：" label-width="140px">
					<el-select v-model="couponsType" placeholder="请选择" style="width: 180px;" :disabled="true">
						<el-option
							v-for="(item,index) in couponsTypeOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="面值：" label-width="140px">
					<el-input
						placeholder="优惠券面值"
						v-model="couponsFaceValue"
						:disabled="true"
						style="width: 180px;">
					</el-input>
					<span v-if="unitType">元</span>
					<span v-else>折</span>
				</el-form-item>
				<el-form-item label="有效期：" label-width="140px">
<!--					可以选择相对时间，也可以选择绝对时间,绝对时间为某活动所配		是必填项-->
					<el-select v-model="couponsTimeType" placeholder="请选择" style="width: 180px;" @change="couponsTimeTypeChange">
						<el-option
							v-for="(item,index) in couponsTimeTypeOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="timeShowType" label="自领取之日计算：" label-width="140px">
					<el-select v-model="couponsDateCalculate" placeholder="请选择" style="width: 180px;">
						<el-option
							v-for="(item,index) in couponsDateCalculateOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
					<span>日计算</span>
				</el-form-item>
				<el-row style="margin-left: 60px;" v-else>
					<el-form-item label="开始时间：" style="margin-right:0">
						<el-date-picker v-model="activityStart_time"
										type="datetime"
										value-format="yyyy-MM-dd HH:mm:ss"
										placeholder="开始时间"
										style="width: 210px;"/>
					</el-form-item>
					<el-form-item label="结束时间：">
						<el-date-picker v-model="activityEnd_time"
										type="datetime"
										value-format="yyyy-MM-dd HH:mm:ss"
										placeholder="结束时间"
										style="width: 210px;"/>
					</el-form-item>
				</el-row>
				<el-form-item label="数量：" label-width="140px">
					<el-input
						placeholder="优惠券数量"
						v-model="couponsNumber"
						:disabled="true"
						style="width: 180px;">
					</el-input>
				</el-form-item>
			</el-form>
<!--			使用范围-->
			<div>
				<span class="informationRound"></span>
				<span class="SetmealListTitle">使用范围</span>
			</div>
			<el-form>
				<el-form-item label="" label-width="140px">
					<el-radio-group v-model="UsingRange" @change="UsingRangeChange">
						<el-radio :label="1">全国</el-radio>
						<el-radio :label="2">特定城市</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="城市：" label-width="140px" v-if="showCity">
					<el-button @click="AddCity" type="primary" style="margin-bottom: 10px;">添加</el-button>
					<div v-for="(item,index) in list" :key="index" style="margin-bottom: 10px;">
						<el-select v-model="item.Id1" placeholder="请选择" @change="saveList($event,index)">
							<el-option v-for="(item,index) in provinceOptions" :key="index" :value="item.value" :label="item.label"></el-option>
						</el-select>
						<el-select v-model="item.Id2" placeholder="请选择">
							<el-option v-for="(item,index) in item.cityOptions" :key="index" :value="item.value" :label="item.label"></el-option>
						</el-select>
						<el-button type="danger" icon="el-icon-delete" circle @click="deleteCity(index)"></el-button>
					</div>
				</el-form-item>
				<el-form-item label="渠道：" label-width="140px">
					<el-checkbox-group v-model="couponChannel" @change="couponChannelChange">
						<el-checkbox v-for="(item,index) in couponChannelOptions" :key="index" :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="可使用权益：" label-width="140px" @change="couponInterestsChange">
					<el-checkbox-group v-model="couponInterests">
						<el-checkbox v-for="(item,index) in couponInterestsOptions" :key="index" :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
<!--			使用条件-->
			<div>
				<span class="informationRound"></span>
				<span class="SetmealListTitle">使用条件</span>
			</div>
			<el-form>
				<el-form-item label="" label-width="140px">
					<el-radio-group v-model="ConditionsUse" @change="ConditionsUseChange">
						<el-radio :label="1">无门槛</el-radio>
						<el-radio :label="2">满X使用1张</el-radio>
						<el-radio :label="3">每满X使用1张</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item v-if="MeetAmountShow" label="满足金额：" style="margin-left: 60px;">
					<el-input
						placeholder="请输入满足金额"
						v-model="MeetAmount"
						style="width: 180px;">
					</el-input>
					<span>元</span>
				</el-form-item>
				<el-form-item v-if="UseNumberShow" label="最多使用：" style="margin-left: 60px;">
					<el-input
						placeholder="请输入最多使用张数"
						v-model="UseNumber"
						style="width: 180px;">
					</el-input>
					<span>张</span>
				</el-form-item>
				<el-form-item label="" label-width="140px">
					<el-checkbox v-model="mergeUse">是否可与其他优惠券一起使用</el-checkbox>
				</el-form-item>
			</el-form>
<!--			推广方式-->
			<div>
				<span class="informationRound"></span>
				<span class="SetmealListTitle">推广方式</span>
			</div>
			<el-form>
				<el-form-item label="领取方式：" label-width="140px">
					<el-checkbox-group v-model="couponGetWay"  @change="couponGetWayChange">
						<el-checkbox v-for="(item,index) in couponGetWayOptions" :key="index" :label="item.id">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="限领级别：" label-width="140px">
					<el-select v-model="couponsLimitGetLevel" placeholder="请选择" style="width: 180px;">
						<el-option
							v-for="(item,index) in couponsLimitGetLevelOptions"
							:key="index"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="限领数量" label-width="140px">
					<el-radio-group v-model="LimitNumber" @change="LimitNumberChange">
						<el-radio :label="1">活动期间限领一张</el-radio>
						<el-radio :label="2">活动期间每天限领一张</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
<!--			btn-->
			<div class="clearfix">
				<el-button class="floatRight" type="primary" @click="couponsRelease">保存并发布</el-button>
				<el-button class="floatRight" type="primary" @click="couponsSave">保存</el-button>
				<el-button class="floatRight" type="primary" @click="cancelEditor(2)">取消</el-button>
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        name: "CouponEditor",
		data(){
        	return {

				//基础信息
				couponImageShow:false,//显示图片还是显示优惠券图片上传
				couponImageUrl:'',//优惠券配图
				showFileList:false,//上传不显示文件列表
				couponLogUrl:'',//上传成功后存储优惠券图片
				couponsName:'优惠券名称1',//优惠券名称
				couponsType:'1',//类型
				couponsTypeOptions:[
					{
						label:'满减券',
						value:'1'
					},
					{
						label:'折扣券',
						value:'2'
					}
				],
				couponsFaceValue:'98',//面值	如果类型为满减券，单位为元，如果是折扣券，单位是折
				unitType:true,//true是满减，单位为元，false是折扣，单位为折
				timeShowType:true,//有效期是相对时间还是绝对时间？
				couponsTimeType:'1',//相对时间有效期
				couponsTimeTypeOptions:[
					{
						label:'相对时间',
						value:'1'
					},
					{
						label:'绝对时间',
						value:'2'
					}
				],
				//绝对时间有效期
				activityStart_time:'',//开始时间
				activityEnd_time:'',//结束时间
				couponsDateCalculate:'1',//自领取之日计算
				couponsDateCalculateOptions:[
					{
						value:'1',
						label:'7'
					},
					{
						value:'2',
						label:'10'
					},
					{
						value:'3',
						label:'15'
					},
				],
				couponsNumber:'',// 数量
				UsingRange:1,//使用范围
				showCity:false,//全国还是特定城市
				//城市
				list:[
					{
						Id1:'',//省
						Id2:'',//市
						cityOptions:[
							{
								value:'1',
								label:'朝阳区'
							},
							{
								value:'2',
								label:'通州区'
							},
						]
					}
				],
				list1:[],
				provinceOptions:[
					{
						value:'1',
						label:'北京'
					},
					{
						value:'2',
						label:'上海'
					},
				],
				couponChannelOptions:[
					{
						id:1,
						name:'悦淘APP'
					},
					{
						id:2,
						name:'悦淘小程序'
					}
				],
				couponChannel:[1,2],//渠道
				couponInterestsOptions:[
					{
						id:1,
						name:'机票'
					},
					{
						id:2,
						name:'火车票'
					},
					{
						id:3,
						name:'视频充值'
					},
					{
						id:4,
						name:'手机充值'
					},
					{
						id:5,
						name:'曹操出行'
					},
					{
						id:6,
						name:'加油'
					},
				],
				couponInterests:[1,2,3,4,5,6],//可使用权益
				ConditionsUse:1,//使用条件
				MeetAmount:'',//满足金额
				MeetAmountShow:false,
				UseNumber:'',//最多使用
				UseNumberShow:true,
				mergeUse:true,//是否可与其他优惠券一起使用
				couponGetWay:[1,2,3,4,5],//领取方式
				couponGetWayOptions: [
					{
						id:1,
						name:'新人获得'
					},
					{
						id:2,
						name:'客服关怀'
					},
					{
						id:3,
						name:'活动领取'
					},
					{
						id:4,
						name:'领券中心领取'
					},
					{
						id:5,
						name:'拉新领取'
					},
				],
				couponsLimitGetLevel:'1',//限领级别
				couponsLimitGetLevelOptions:[
					{
						label:'注册会员',
						value:'1'
					},
					{
						label:'白金会员',
						value:'2'
					},
					{
						label:'黑金会员',
						value:'3'
					},
				],
				LimitNumber:1,//限领数量
			}
		},
		created() {

		},
		mounted() {
        	this.getCouponEditor();
		},
		methods:{
        	//get优惠券详情
			getCouponEditor(){

			},
			// 优惠券图片上传成功的钩子
			uploadSuccessUserAll(res){
				console.log(res);
				this.couponImageShow = true;
				this.couponImageUrl = res.url;
			},
			//优惠券图片上传时的钩子
			couponProgressUrl(file){
				console.log(file);
			},
			//时间方式change
			couponsTimeTypeChange(val){
				console.log(val);
				if(val == '1'){ //相对时间
					this.timeShowType = true;
				}else if(val == '2'){//绝对时间
					this.timeShowType = false;
				}
			},
			//使用范围change
			UsingRangeChange(val){
				console.log(val);
				if(val == '1'){//全国
					this.showCity = false;
				}else if(val == '2'){//特定城市
					this.showCity = true;
				}
			},
			//添加省市
			AddCity(){
				this.list.push({Id1:'',Id2:'',cityOptions:[]});
			},
			//删除省市
			deleteCity(index){
				if(index != 0){
					this.list.splice(index,1);
				}else{
					this.$message.error('已经是最后一个选项了，不能进行删除！');
				}
			},
			//省份改变
			saveList(event,index){
				console.log(index);
				(this.list)[index].cityOptions = [
					{
						value:'1',
						label:'运城'
					},
					{
						value:'2',
						label:'大同'
					}
				]
			},
			//渠道change
			couponChannelChange(val){
				console.log(val);
				this.couponChannel = val;
			},
			//可使用权益change
			couponInterestsChange(val){
				console.log(val);
				this.couponInterests = val;
			},
			//使用条件change
			ConditionsUseChange(val){
				console.log(val);
				if(val == '1'){ //无门槛	显示最多使用inp
					this.MeetAmountShow = false;
					this.UseNumberShow = true;
				}else if(val == '2'){//满X使用1张	显示满足金额和最多使用inp
					this.MeetAmountShow = true;
					this.UseNumberShow = true;
				}else if(val == '3'){//每满X使用一张	显示满足金额和最多使用inp
					this.MeetAmountShow = true;
					this.UseNumberShow = true;
				}
			},
			//领取方式change
			couponGetWayChange(val){
				console.log(val);
			},
			//限领数量change
			LimitNumberChange(val){
				console.log(val);
			},
        	//取消编辑
			cancelEditor(type){
				this.$router.push({path:'/coupons/couponsStatistical',query:{type:type}});
			},
			//保存编辑
			couponsSave(){

			},
			//保存并发布
			couponsRelease(){

			},
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
		padding: 20px;
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
	.floatLeft{
		float: left;
		margin: 20px;
	}
.informationRound{
	display: inline-block;
	width:10px ;
	height: 10px;
	border-radius: 50%;
	background-color: #F68500;
}
	.backLogo {
		font-size: 16px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
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
	.avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
</style>
