<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" class="style_auto" ref="form" label-width="140px" :inline="true">
			<el-form-item label="分销名称：" prop="distribution_name">
				<el-input v-model="form.distribution_name" placeholder="请在填写分销名称" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="分销类型：" prop="distribution_type">
					<el-radio label="0" v-model="form.distribution_type">金额</el-radio>
					<el-radio label="1" v-model="form.distribution_type">利润比例</el-radio>
					<el-radio label="2" v-model="form.distribution_type">售价比例</el-radio>
			</el-form-item>
			<el-form-item label="直推分销奖：" prop="distribution_first" >
				<el-input v-model="form.distribution_first" placeholder="请在填写直推分销奖" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="注册：" prop="distribution_level0">
				<el-input v-model="form.distribution_level0" placeholder="请在填写注册" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="399：" prop="distribution_level1">
				<el-input v-model="form.distribution_level1" placeholder="请在填写399" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="499：" prop="distribution_level2">
				<el-input v-model="form.distribution_level2" placeholder="请在填写499" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="运营商分销奖：" prop="distribution_two">
				<el-input v-model="form.distribution_two" placeholder="请在填写运营商分销奖" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="服务商分销奖：" prop="distribution_share">
				<el-input v-model="form.distribution_share" placeholder="请在填写服务商分销奖" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="分公司分销奖：" prop="distribution_company">
				<el-input v-model="form.distribution_company" placeholder="请输入分公司分销奖" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="自购分销奖：" prop="distribution_company">
				<el-input v-model="form.distribution_self" placeholder="请输入自购分销奖" style="width: 300px;" />
			</el-form-item>
			<el-form-item class="save_btn">
				<el-button type="primary" @click="onSubmit('form')">添加</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {addDistribution} from '@/api/shops'
	export default {
		data() {
			return {
				form: {
					distribution_name:'',
					distribution_type:'0',
					distribution_first:'',
					distribution_two:'',
					distribution_share:'',
					distribution_company:'',
					distribution_self:'',
					dist_type:0,
				},
				rules: {
					distribution_name: [{
						required: true,
						message: '请在填写分销名称',
						trigger: 'blur'
					}],
					distribution_type: [{
						required: true,
						message: '请选择分销类型',
						trigger: 'change'
					}],
					distribution_first: [{
						required: true,
						message: '请在填写直推分销奖',
						trigger: 'blur'
					}],
					distribution_level0: [{
						required: true,
						message: '请在填写注册',
						trigger: 'blur'
					}],
					distribution_level1: [{
						required: true,
						message: '请在填写399',
						trigger: 'blur'
					}],
					distribution_level2: [{
						required: true,
						message: '请在填写499',
						trigger: 'blur'
					}],
					distribution_two: [{
						required: true,
						message: '请在填写运营商分销奖',
						 trigger: 'blur'
					}],
					distribution_share: [{
						required: true,
						message: '请在填写服务商分销奖',
						 trigger: 'blur'
					}],
					distribution_company: [{
						required: true,
						message: '请输入分公司分销奖',
						 trigger: 'blur'
					}],
				}
			}
		},
		methods:{
			onSubmit(formName){
				console.log(this.form)
				this.$refs[formName].validate((valid)=>{
					if(valid){
						addDistribution(this.form).then(res=>{
							if(res.data.code == 200){
								this.$message({
									message:"保存成功",
									type:"success",
									duration:1500
								})
								setTimeout(()=>{
									this.$router.push({path: '/newmall/distribution'});
								},1500)
							}else{
								this.$message({
									message: res.data.msg || "保存失败",
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
			}
		},
		created() {
			
		}
	}
</script>
<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		display: block;
	}

	.style_auto {
		width: 87%;
		margin: 0 auto;
	}

	.save_btn {
		text-align: center;
	}
	.list{border-bottom: 1px solid #fff;
    padding: 10px;}
	/deep/ .el-form-item__error {
		white-space: nowrap !important
	}
	/deep/ .list-detail .el-input__inner {margin: 5px 0}
	.columnList{border-color: #fff}
	.columnList td{padding: 0 5px}
	.columnList td input{width: 50px}
</style>
