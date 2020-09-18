<template>
	<section class="app-container">
		<div class="">
			<div style="margin-bottom:20px;">
				<router-link :to="{path:'/cps/financialCPS',query:{type:3}}">
					<el-button type="primary">返回列表</el-button>
				</router-link>
			</div>
			<el-form label-width="120px" :inline="true" class="demo-form-inline">
				<el-form-item label="返佣时间:">
					<el-date-picker
						v-model="CommissionTime"
						type="month"
						placeholder="选择月"
						value-format="yyyy-M"
						:picker-options="pickerOptions"
						@change="CommissionTimeChange">
					</el-date-picker>
				</el-form-item>
				<br>
				<el-form-item label="返佣状态及金额:">
					<el-row  v-for="(item,index) in StateCommissionLists" :key="index">
						<el-col :span="12">
							<div class="grid-content bg-purple-dark">
								<span>{{item.state}} :</span>
								<el-input v-model="item.text" placeholder="请输入金额" style="width: 150px;"/>
							</div>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<div class="clearfix">
				<el-button class="floatRight" @click="CommissionTimeConfirm" type="primary">确定</el-button>
			</div>
			<el-table
				:data="commissionAmountTable"
				border
				style="width: 100%"
				v-loading="CommissionRecordDataLoading"
				element-loading-text="拼命加载中">
				<el-table-column prop="date" align="center" label="返佣金额有效期" fixed="left"></el-table-column>
				<el-table-column prop="amount" align="center" label="返佣金额"></el-table-column>
				<el-table-column prop="update_time" align="center" label="更新时间"></el-table-column>
			</el-table>
		</div>
	</section>
</template>

<script>
	import {
		CreditCardRebateList,
		addCommissionInformation
	} from '@/api/financialCps' // 接口
    export default {
        name: "CommissionRecordEditor",
		data(){
			return {
				CommissionRecordDataLoading:false,//佣金记录dialogueTable数据
				CommissionTime:"",//佣金记录编辑中的返佣时间
				commissionAmount:"",//佣金编辑中返佣方式里金额数据
				commissionAmountSelect:"",//佣金编辑中返佣金额方式下拉
				StateCommissionLists:[],//佣金记录弹窗 返佣状态及金额sel
				commissionAmountTable:[],//佣金记录中tab数据
				pickerOptions:{  //禁用当前日期之前的日期
					disabledDate(time){
						//Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
			}
		},
		created() {
			this.row = this.$route.query ? this.$route.query.row : '';
			this.type = this.$route.query ? this.$route.query.type : '';
			if (this.row) {
				this.getCommissionList(this.row.bank_id);
			}
			if(this.row.point_type === 1){  //初审
				this.StateCommissionLists = [
					{
						state:'初审',
						text:''
					}
				]
			}else if(this.row.point_type === 2){//激活
				this.StateCommissionLists = [
					{
						state:'激活',
						text:''
					}
				]
			}else if(this.row.point_type === 3){//首刷
				this.StateCommissionLists = [
					{
						state:'首刷',
						text:''
					}
				]
			}else if(this.row.point_type === 4){//初审 + 激活
				this.StateCommissionLists = [
					{
						state:'初审',
						text:''
					},
					{
						state:'激活',
						text:''
					}
				]
			}else if(this.row.point_type === 5){//初审 + 首刷
				this.StateCommissionLists = [
					{
						state:'初审',
						text:''
					},
					{
						state:'首刷',
						text:''
					}
				]
			}
		},
		methods:{
			//信用卡返佣列表
			getCommissionList(id){
				this.CommissionRecordDataLoading = true;
				//信用卡返佣列表
				let CreditCardRebateListData = {
					bank_id:id
				}
				CreditCardRebateList(CreditCardRebateListData).then(res=>{
					this.CommissionRecordDataLoading = false;
					if(res.data.code === 200){
						this.commissionAmountTable = res.data.data;
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//佣金记录时间选择
			CommissionTimeChange(val){
				//
			},
			//佣金记录弹框中确认按钮
			CommissionTimeConfirm(){
				const loading = this.$loading({
					lock: true,
					text: '信息提交中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let _this = this;
				//选择时间
				if(this.CommissionTime == ''){
					return this.$message.error('请选择时间');
				}
				let amountData = [];
				console.log(_this.StateCommissionLists)
				for(let i=0;i<(_this.StateCommissionLists).length;i++){
					amountData.push((_this.StateCommissionLists)[i].text)
				}

				let addCommissionInformationData = {
					bank_id:this.CommissionRecordBankId,
					date:this.CommissionTime,
					amount:amountData//this.StateCommissionLists  text
				};

				addCommissionInformation(addCommissionInformationData).then(res=>{
					loading.close();
					if(res.data.code === 200){
						this.$message.success(res.data.msg);
						//更新表格
						this.getCommissionList();
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
	.block{
		margin-bottom: 10px;
	}
</style>
