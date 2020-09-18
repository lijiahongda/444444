<template>
	<div class="app-container">
		<el-form class="style_auto" ref="form" :model="form" :rules="rules" label-width="140px" :inline="true">
			<el-form-item label="  ">
				<el-col>
					<el-radio-group v-model="form.type">
						<el-radio :label="1">私人定制</el-radio>
						<el-radio :label="2">企业定制</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>
			<el-form-item label="开始时间" prop="starttime">
				<el-date-picker v-model="form.starttime" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"/>
			</el-form-item>
			<el-form-item label="结束时间" prop="endtime">
				<el-date-picker v-model="form.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="结束时间" />
			</el-form-item>
			<el-form-item label="是否接受时间调整"  prop="adjusttime">
				<el-select v-model="form.adjusttime" placeholder="是否接受时间调整">
					<el-option v-for="item in dataStatus" :key="item.key" :label="item.display_name" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label="出发地"  prop="leavecity">
				<el-input v-model="form.leavecity" placeholder="出发地" />
			</el-form-item>
			<el-form-item label="目的地"  prop="aimcity">
				<el-input v-model="form.aimcity" placeholder="目的地" />
			</el-form-item>
			<el-form-item label="定制预算"  prop="budget">
				<el-input v-model="form.budget" placeholder="0" />
			</el-form-item>
			<el-form-item label="是否接受预算调整"  prop="adjustbudget">
				<el-select v-model="form.adjustbudget" placeholder="是否接受预算调整">
				<el-option v-for="item in priceStatus" :key="item.key" :label="item.display_name" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label="成人数量"  prop="adultnum">
				<el-input v-model="form.adultnum" placeholder="0" />
			</el-form-item>
			<el-form-item label="儿童数量">
				<el-input v-model="form.childnum" placeholder="0" />
			</el-form-item>
			<el-form-item label="企业名称">
				<el-input v-model="form.enterprise_name" placeholder="企业名称" />
			</el-form-item>
			<el-form-item label="定制数量"  prop="customer_number">
				<el-input v-model="form.customer_number" placeholder="1" />
			</el-form-item>
			<el-form-item label="联系人"  prop="contacts">
				<el-input v-model="form.contacts" placeholder="输入联系人" />
			</el-form-item>
			<el-form-item label="联系电话"  prop="mobile">
				<el-input v-model="form.mobile" placeholder="输入联系电话" />
			</el-form-item>
			<el-form-item label="联系邮箱">
				<el-input v-model="form.email" placeholder="输入联系邮箱" />
			</el-form-item>
			<el-form-item label="定制状态"  prop="status">
				<el-select v-model="form.status" placeholder="定制状态">
				<el-option v-for="item in dzStatus" :key="item.key" :label="item.display_name" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label="备注">
				<el-input type="textarea" v-model="form.remarks" placeholder="备注" />
			</el-form-item>
			<el-form-item class="save_btn">
				<el-button type="primary" @click="onConfirm('form')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { custGetUrl,customizedProductAdd,customizedProductUpload,custPosturl } from '@/api/cust' // 接口
	export default {
		data() {
			return {
				form: {
					id:"",
					mid:"",
					type:1,//定制类型
					starttime:"",//开始时间
					endtime:"",//开始时间
					adjusttime:"",//是否时间调整   0不接受 1接受
					leavecity:"",//出发地
					aimcity:"",//目的地
					budget:"",//定制预算
					adjustbudget:"",//是否预算调整   0不接受 1接受
					adultnum:"",//成人数量
					childnum:"",//儿童数量
					enterprise_name:"",//企业名称
					customer_number:"",//定制数量
					contacts:"",//联系人
					mobile:"",//联系电话
					email:"",//邮箱
					status:"",//定制状态
					remarks:"",//备注
				},
				dataStatus: [{
						key: 1,
						display_name: '接受'
					},
					{
						key: 0,
						display_name: '不接受'
					}
				],
				priceStatus: [{
						key: 1,
						display_name: '接受'
					},
					{
						key: 0,
						display_name: '不接受'
					}
				],
				dzStatus: [{
						key: 0,
						display_name: '待审核'
					},
					{
						key: 1,
						display_name: '已审核'
					},{
						key: 2,
						display_name: '已完成'
					}
				],
				rules:{
					starttime: [{
						required: true,
						message: '请填写开始时间',
						trigger: 'blur'
					}],
					endtime: [{
						required: true,
						message: '请填写结束时间',
						trigger: 'blur'
					}],
					adjusttime: [{
						required: true,
						message: '请选择是否接受时间调整',
						trigger: 'change'
					}],
					leavecity: [{
						required: true,
						message: '请填写出发地',
						trigger: 'blur'
					}],
					aimcity: [{
						required: true,
						message: '请填写目的地',
						trigger: 'blur'
					}],
					budget: [{
						required: true,
						message: '请填写定制预算',
						trigger: 'blur'
					}],
					adjustbudget: [{
						required: true,
						message: '请选择是否接受预算调整',
						trigger: 'change'
					}],
					adultnum: [{
						required: true,
						message: '请填写成人数量',
						trigger: 'blur'
					}],
					customer_number: [{
						required: true,
						message: '请填写定制数量',
						trigger: 'blur'
					}],
					contacts: [{
						required: true,
						message: '请填写联系人',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请填写联系电话',
						trigger: 'blur'
					}],
					status: [{
						required: true,
						message: '请选择定制状态',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			onConfirm(formName) {
				this.$refs[formName].validate(v=>{
					if(v){
							let startT = /\d{4}-\d{1,2}-\d{1,2}/g.exec(this.form.starttime).join("");
							let startE = /\d{4}-\d{1,2}-\d{1,2}/g.exec(this.form.endtime).join("");
							this.form.starttime = startT
							this.form.endtime = startE;
							custPosturl(this.form).then(res=>{
								if(res.data.code == 200){
									this.$message({
										message:"保存成功",
										type:"success",
										duration:1500
									})
									setTimeout(()=>{
										this.$router.push('/cust/list')
									},1500)
								}else{
									this.$message({
										message:"保存失败",
										type:"error"
									})
								}
							})
					}else{
						this.$message({
							message:"请填写完整信息",
							type:"error"
						})
					}
				})
			},
			getUserInfo(){
				let json = `/${this.$route.query.id}`;
				custGetUrl(json).then(res=>{
					let data = res.data.data[0];
					console.log(data)
					this.form = data;
				})
			}
		},
		created() {
			if(this.$route.query.id){
				this.getUserInfo()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		display: block;
	}
	.style_auto{width: 50%;margin: 0 auto;}
	.save_btn{text-align: center;}
</style>
