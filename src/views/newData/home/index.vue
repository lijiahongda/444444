<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<div class="startTime">开始时间：</div>
				<div class="selectTime" @click="selectData">{{selectedValue}}</div>
				<div class="pickerPop" @touchmove.prevent>
					<mt-datetime-picker ref="datePicker" v-model="dateVal" class="myPicker" type="datetime" @confirm="dateConfirm()">
					</mt-datetime-picker>
				</div>
			</el-form-item>
			<el-form-item>
				<div class="startTime">结束时间：</div>
				<div class="selectTime" @click="selectData1">{{selectedValue1}}</div>
				<div class="pickerPop">
					<mt-datetime-picker ref="datePicker1" v-model="dateVal1" class="myPicker" type="datetime" @confirm="dateConfirm1()">
					</mt-datetime-picker>
				</div>
			</el-form-item>
			<el-form-item>
				<div class="btn_text">
					<el-button type="primary" @click="onSearch" plain>搜索</el-button>
					<el-button type="danger" @click="onDanger" plain>清空</el-button>
					<el-button type="primary"  @click="onSearch(0)" plain>今天</el-button>
					<el-button type="primary"  @click="onSearch(1)" plain>昨天</el-button>
					<el-button type="primary"  @click="onSearch(6)" plain>最近7天</el-button>
					<el-button type="primary" @click="onSearch(29)" plain>最近30天</el-button>
				</div>
			</el-form-item>
		</el-form>
		<div class="list_item"  v-loading = "loading">
			<el-row class="title">注册用户：</el-row>
			<el-row>
				<el-table border :data="list.regist_num">
					<el-table-column prop="name" label="注册来源" align="center"></el-table-column>
					<el-table-column prop="num" label="注册用户数" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>
		<!-- <div class="list_item"  v-loading = "loading">
			<el-row class="title">会员卡：</el-row>
			<el-row>
				<el-table border :data="member_num">
					<el-table-column prop="total_mem_num" label="会员卡" align="center"></el-table-column>
					<el-table-column prop="online_mem_num" label="线上开卡" align="center"></el-table-column>
					<el-table-column prop="downline_mem_num" label="线下开卡" align="center"></el-table-column>
					<el-table-column prop="branch_company_mem_num" label="分公司直推" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div> -->


		<div class="list_item"  v-loading = "loading">
			<el-row class="title">会员：</el-row>
			<el-row>
				<el-table border :data="list.member_data.memberGrop">
					<el-table-column prop="memberCount" label="会员数" align="center"></el-table-column>
					<el-table-column prop="integrals" label="成长值统计" align="center">
						<template slot-scope="scope">
								<router-link :to="{path:'gropOrderGoods'}">
									<span style="color:blue">
										{{scope.row.integrals ? scope.row.integrals : scope.row.integrals ? scope.row.integrals : '0' }}
									</span>
								</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="taskMemberCount" label="销卡创客数" align="center"></el-table-column>
					<el-table-column prop="ygTaskCount" label="预估销卡量" align="center"></el-table-column>
					<el-table-column prop="taskCount" label="真实销卡量" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">会员统计：</el-row>
			<el-row>
				<el-table border :data="list.member_data.memberData">
					<el-table-column prop="name" label="会员类型" align="center"></el-table-column>
					<el-table-column prop="addMemberCount" label="新增人数" align="center"></el-table-column>
					<el-table-column prop="totalMemberCount" label="总计人数" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">商城：</el-row>
			<el-row>
				<el-table border :data="list.mall_num">
					<el-table-column prop="channel_name" label="供应商" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="order_num" label="订单量" align="center"></el-table-column>
					<el-table-column prop="actual_price" label="收入" align="center"></el-table-column>
					<el-table-column prop="buy_price" label="支出" align="center"></el-table-column>
					<el-table-column prop="reduce_price" label="盈利" align="center"></el-table-column>
					<!-- <el-table-column prop="" label="TOP10商品" width="120" align="center"></el-table-column> -->
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">399大礼包</el-row>
			<el-row>
				<el-table border :data="list.sendGoods_num" :span-method="colSpanMethod">
					<el-table-column prop="name" label="分类" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="title" label="名称" align="center"></el-table-column>
					<el-table-column prop="goodsNum" label="数量" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">悦店商城：</el-row>
			<el-row>
				<el-table border :data="list.ydMall_num">
					<el-table-column prop="channel_name" label="供应商" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="order_num" label="订单量" align="center"></el-table-column>
					<el-table-column prop="actual_price" label="收入" align="center"></el-table-column>
					<el-table-column prop="buy_price" label="支出" align="center"></el-table-column>
					<el-table-column prop="reduce_price" label="盈利" align="center"></el-table-column>
					<!-- <el-table-column prop="" label="TOP10商品" width="120" align="center"></el-table-column> -->
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">悦店大礼包</el-row>
			<el-row>
				<el-table border :data="list.ydSendGoods_num" :span-method="colSpanMethod">
					<el-table-column prop="name" label="分类" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="title" label="名称" align="center"></el-table-column>
					<el-table-column prop="goodsNum" label="数量" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>


		<div class="list_item" v-loading = "loading">
			<el-row class="title">酒店：</el-row>
			<el-row>
				<el-table border :data="list.hotel_num">
					<el-table-column prop="channel_name" label="供应商" fixed align="center"></el-table-column>
					<el-table-column prop="order_num" label="订单量" align="center"></el-table-column>
					<el-table-column prop="actual_price" label="收入" align="center"></el-table-column>
					<el-table-column prop="buy_price" label="支出" align="center"></el-table-column>
					<el-table-column prop="reduce_price" label="盈利" align="center"></el-table-column>
					<!-- <el-table-column prop="" label="TOP10酒店" width="120" align="center">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="onShow">查看</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</el-row>
		</div>
		<div class="list_item" v-loading = "loading">
			<el-row class="title">线路：</el-row>
			<el-row>
				<el-table border :data="list.line_num">
					<el-table-column prop="name" label="供应商" align="center"></el-table-column>
					<el-table-column prop="num" label="兑换订单" align="center"></el-table-column>
				<!-- 	<el-table-column prop="" label="TOP10线路" align="center">
						
					</el-table-column> -->
				</el-table>
				</table>
			</el-row>
		</div>
		<div class="list_item" v-loading = "loading">
			<el-row class="title">大人：</el-row>
			<el-row>
				<el-table border :data="leader_num">
					<!-- <el-table-column prop="" label="新用户访问" width="120" align="center"></el-table-column> -->
					<el-table-column prop="infix_leader_num" label="新增大人" align="center"></el-table-column>
					<el-table-column prop="wxbind_num" label="授权人数" align="center"></el-table-column>
					<el-table-column prop="infix_phone_num" label="绑定手机" align="center"></el-table-column>
					<!-- <el-table-column prop="" label="活跃人数" align="center"></el-table-column> -->
				</el-table>
			</el-row>
		</div>
		
		<div class="list_item"  v-loading = "loading">
			<el-row class="title">商城old统计：</el-row>
			<el-row>
				<el-table border :data="list.old_mall_num">
					<el-table-column prop="channel_name" label="供应商" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="order_num" label="订单量" align="center"></el-table-column>
					<el-table-column prop="actual_price" label="收入" align="center"></el-table-column>
					<el-table-column prop="buy_price" label="支出" align="center"></el-table-column>
					<el-table-column prop="reduce_price" label="盈利" align="center"></el-table-column>
					<!-- <el-table-column prop="" label="TOP10商品" width="120" align="center"></el-table-column> -->
				</el-table>
			</el-row>
		</div>

		<div class="list_item"  v-loading = "loading">
			<el-row class="title">三方订单统计：</el-row>
			<el-row>
				<el-table border :data="list.cps_order">
					<el-table-column prop="orderSource" label="三方名称" fixed="left" align="center">
					</el-table-column>
					<el-table-column prop="count" label="订单数" align="center"></el-table-column>
					<el-table-column prop="orderAmount" label="销售金额" align="center"></el-table-column>
					<el-table-column prop="memberAverageAmount" label="客单价" align="center"></el-table-column>
					<el-table-column prop="promotionAmount" label="佣金" align="center"></el-table-column>
				</el-table>
			</el-row>
		</div>

		<el-dialog title="TOP10" :visible.sync="dialogTableVisible"  @touchmove.prevent>
			<el-table :data="gridData" border>
				<el-table-column property="date" label="排名"  align="center" width="50"></el-table-column>
				<el-table-column property="name" label="商品名称"  align="center"></el-table-column>
				<el-table-column property="address" label="数量" align="center" width="50"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	import { operateInfo } from '@/api/order' // 接口
	import {selectCoupon,switchCoupon,sendCoupon} from '@/api/mall'
export default {
    data() {
        return {
		  form:{
			  start_time:'',
			  end_time:'',
		  },
		  list:{
			  member_data:{memberGrop:[],memberData:[]},
		  },
		  isOn:false,//按钮是否选中
		  loading:true,
		 	dateVal: '', // 默认是当前日期
            selectedValue: '',
			dateVal1: '', // 默认是当前日期
			selectedValue1: '',
			dialogTableVisible:false,
			gridData:[],
			regist_num:[],//注册用户member_num
			member_num:[],//会员卡
			leader_num:[],//大人
        }
    },
    created() {
		 this.getList()
    },
    methods: {
		// 搜索
		onSearch(e){
			this.loading =true;
			// console.log(this.formatDateMin(new Date()),'111')
			var obj = this.timeForMat(e);
			if(e == 0){
				this.selectedValue = this.form.start_time = obj.t2 +' 00:00:00';
				this.selectedValue1 = this.form.end_time = this.formatDateMin(new Date());
			}else if(e == 1){
				this.selectedValue1 =  this.form.end_time =this.formatDateMin(new Date(),true)+' 00:00:00';
				this.selectedValue = this.form.start_time = obj.t2 +' 00:00:00';
			}else if(e == 6 || e == 29){
				this.selectedValue1 = this.form.end_time = this.formatDateMin(new Date());
			    this.selectedValue = this.form.start_time = obj.t2 +' 00:00:00';
			}else{
				this.getList(this.form)
				return false;
			}
			this.getList(this.form,1)
		},
		//作 
		timeForMat(count) {
				// 拼接时间
				let time1 = new Date()
				time1.setTime(time1.getTime()+ (24 * 60 * 60 * 1000))
				let Y1 = time1.getFullYear()
				let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
				let D1 = (time1.getDate() > 10 ? (time1.getDate()+1) : '0' + time1.getDate())
				console.log(D1)
				let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
				let time2 = new Date()
				time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
				let Y2 = time2.getFullYear()
				let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
				let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
				let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
				return {
					t1: timer1,
					t2: timer2
				}
			},
		// 時間轉換我
		formatDateMin (secs,time) {
			var t = new Date(secs)
			var year = t.getFullYear()
			var month = t.getMonth() + 1
			if (month < 10) { month = '0' + month }
			var date = t.getDate()
			if (date < 10) { date = '0' + date }
			var hour = t.getHours()
			if (hour < 10) { hour = '0' + hour }
			var minute = t.getMinutes()
			if (minute < 10) { minute = '0' + minute }
			var second = t.getSeconds()
			if (second < 10) { second = '0' + second }
			if(time){
				return year + '-' + month + '-' + date;
			}else{
				return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
			}
		},
		// 字符串转date
		parserDate(date) {  
			var t = Date.parse(date);  
			if (!isNaN(t)) {  
				return new Date(Date.parse(date.replace(/-/g, "/")));  
			} else {  
				return new Date();  
			}  
		},
		selectData () { // 打开时间选择器
            // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
			
            if (this.selectedValue) {
                this.dateVal = this.parserDate(this.selectedValue)
            } else {
                this.dateVal = new Date()
            }
            this.$refs['datePicker'].open()
        },
		selectData1 () { // 打开时间选择器
		    // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
		    if (this.selectedValue1) {
		        this.dateVal1 = this.parserDate(this.selectedValue1)
		    } else {
		        this.dateVal1 = new Date()
		    }
		    this.$refs['datePicker1'].open()
		},
		dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.selectedValue = this.formatDateMin(this.dateVal)
        },
		dateConfirm1 () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
		    this.selectedValue1 = this.formatDateMin(this.dateVal1)
		},
		onDanger(){
			this.loading =true;
			this.selectedValue = '';
			this.selectedValue1 = '';
			this.form ={
				end_time:'',
				start_time:''
			}
			this.getList(this.form,1)
		},
		// 今天，明天，30天
		timeForMat(count) {
			// 拼接时间
			let time1 = new Date()
			time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
			let Y1 = time1.getFullYear()
			let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
			let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
			let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
			let time2 = new Date()
			time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
			let Y2 = time2.getFullYear()
			let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
			let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
			let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
			return {
				t1: timer1,
				t2: timer2
			}
		},
		 // 列表数
        getList(e,idx) {
			if(idx ==1){
				this.form = e;
			}else{
				this.form.start_time = this.selectedValue;
				this.form.end_time = this.selectedValue1;
			}
			// console.log(this.form,'----------->')
			
			operateInfo(this.form).then(res=>{
				if(res.data.code == 200){
					this.list = res.data.data;
					this.member_num = [];
					this.leader_num = [];
					this.member_num.push(res.data.data.member_num);
					this.leader_num.push(res.data.data.leader_num);
					this.loading =false;
				}else{
					this.$message.error(res.data.msg || "网络开小差了，稍后再试")
					this.loading =false;
				}
			})
        },
		onShow(){
			this.dialogTableVisible =true;
		},

		colSpanMethod ({ row, column, rowIndex, columnIndex })
		{
			if(columnIndex===0)
			{
				return {
					rowspan:row.count,
					colspan:1 //相当于给给表格加上rowspan,colspan属性
				}
			}
		},


    }
}
</script>
<style type="scss" scoped>
	button{outline: none;-webkit-tap-highlight-color:rgba(255,255,255,0);}
	.list_item{width: 50%;}
	.list_item .title{margin: 40px 0 10px 0;font-weight: bold;}
	@media only screen and (max-width: 1000px) {
		.list_item{width: 100%;}
		/deep/ .el-dialog{width: 90%;}
	}
	.startTime{float: left;}
	.selectTime{float: left;width: 180px;height: 36px;line-height: 36px;padding-left: 5px;border-radius: 5px;border: 1px solid #ccc;}
	.btn_text button{margin-bottom: 10px;margin-left: 0;}
	.el-form-item{margin-bottom: 10px;margin-left: 0;}
	.app-container{padding: 10px;}
</style>
