<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" class="style_auto" ref="form" label-width="140px" :inline="true">
			<el-form-item label="详情页图片" prop="url">
				<el-upload :action="uploadUrl" :limit="numLimit" list-type="picture-card" :file-list="fileListOfDetail" :on-success="uploadSuccessOfDetail"
				 :on-exceed="overSizeOfDetail" :before-upload="uploadBeforeOfDetail" :on-remove="handleRemoveOfDetail">
					<!--<i class="el-icon-plus"></i>-->
					<el-button :disabled="fileListOfDetail.length >= 5" size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">
						图片尺寸：750*350px(大小<font color="red">80KB</font>以内),
						最多上传5张
					</div>
				</el-upload>
				
			</el-form-item>
			<el-form-item label="标题" prop="main_title">
				<el-input v-model="form.main_title" placeholder="请输入标题" />
			</el-form-item>
			<el-form-item label="副标题" prop="slave_title">
				<el-input v-model="form.slave_title" placeholder="请输入副标题" />
			</el-form-item>
			<el-form-item label="定制类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择">
					<el-option v-for="item in dataStatus" :key="item.key" :label="item.display_name" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label="人均价格" prop="price">
				<el-input v-model="form.price" placeholder="请输入人均价格" />
			</el-form-item>
			<el-form-item label="已省" prop="economize_price">
				<el-input v-model="form.economize_price" placeholder="节省价格(整数)" />
			</el-form-item>
			<el-form-item label="标签" prop="tags">
				<el-input v-model="form.tags" placeholder="以逗号分隔" />
			</el-form-item>
			<el-form-item label="已游人数" prop="join_number">
				<el-input v-model="form.join_number" placeholder="已出游人数" />
			</el-form-item>
			<el-form-item label="满意度" prop="satisfaction">
				<el-input v-model="form.satisfaction" placeholder="满意度" />
			</el-form-item>
			<el-form-item label="出发地" prop="start_place">
				<el-input v-model="form.start_place" placeholder="出发地" />
			</el-form-item>
			<el-form-item label="目的地" prop="end_place">
				<el-input v-model="form.end_place" placeholder="目的地" />
			</el-form-item>
			<el-form-item label="参考交通" prop="traffic_style">
				<el-input v-model="form.traffic_style" placeholder="参考交通" />
			</el-form-item>
			<el-form-item label="行程天数" prop="travel_days">
				<el-input v-model="form.travel_days" placeholder="行程天数" />
			</el-form-item>
			<el-form-item label="行程晚数" prop="travel_nights">
				<el-input v-model="form.travel_nights" placeholder="行程晚数" />
			</el-form-item>
			<el-form-item label="住宿标准" prop="stay_standard">
				<el-input v-model="form.stay_standard" placeholder="住宿标准" />
			</el-form-item>
			<el-form-item label="经典景点" prop="classic_view">
				<el-input  v-model="form.classic_view" placeholder="经典景点" />
			</el-form-item>
			<el-form-item label="有无导游" prop="has_guide">
				<el-select v-model="form.has_guide" placeholder="请选择">
					<el-option v-for="(item,index) in dzStatus" :key="index" :label="item.display_name" :value="item.key" />
				</el-select>
			</el-form-item>
			<el-form-item label="产品详情" prop="product_desc" id="line_details" class="line_details">
				<div class="editor_con" v-for="(item,index) in form.product_desc">
					<!-- <el-input v-model="form.product_desc" placeholder="输入产品标题" style="margin-bottom: 22px;"/>
					<tinymce v-model="form.product_desc" :height="300" /> -->
					<el-input v-model="item.title" placeholder="输入产品标题" style="margin: 22px 0;"/>
					<tinymce v-model="item.content" :height="300" />
					<el-input v-model="item.num = index" style="display: none;"/>
				</div>
				<el-button type="primary" @click="addEditor" style="margin-top: 22px;">添加</el-button>
			</el-form-item>
			<el-form-item label="费用须知" prop="expenses_tips">
					<tinymce v-model="form.expenses_tips" :height="300" placeholder="输入费用须知" />
			</el-form-item>
			<el-form-item class="save_btn">
				<el-button type="primary" @click="onSubmit('form')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import Tinymce from '@/components/Tinymce';
	import {customizedProductUpload,customizedProductAdd,customizedProductGetDetails} from '@/api/cust'
	export default {
		components: {
			Tinymce
		},
		data() {
			return {
				form: {
					banner: [],//banner图
					main_title: "", //标题
					slave_title: "", //副标题
					type: "", //定制类型
					price: "", //价格
					economize_price: "", //已省
					tags: "", //标签
					join_number: "", //出游人数
					satisfaction: "", //满意度
					start_place: "", //出发地
					end_place: "", //目的地
					traffic_style: "", //参考交通
					travel_days: "", //行程天数
					travel_nights: "", //行程晚数
					stay_standard:"",//住宿标准
					classic_view: "", //经典景点
					has_guide: "", //有无导游
					product_desc: [{
							title: '',
							content: '',
							num: '',
						}], //产品详情
					expenses_tips: "", //费用须知
				},
				numDetails: [{
						title: '',
						content: '',
						num: '',
					}],
				rules: {
					url: [{
							required: true,
							message: '请上传图片',
							trigger: 'blur'
						}
					],
					main_title: [{
						required: true,
						message: '请填写标题',
						trigger: 'blur'
					}],
					slave_title: [{
						required: true,
						message: '请填写副标题',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					price: [{
						required: true,
						message: '请填写价格',
						trigger: 'blur'
					}],
					economize_price: [{
						required: true,
						message: '请填写节省价格',
						trigger: 'blur'
					}],
					tags: [{
						required: true,
						message: '请填写标签',
						trigger: 'blur'
					}],
					join_number: [{
						required: true,
						message: '请填写出游人数',
						trigger: 'blur'
					}],
					satisfaction: [{
						required: true,
						message: '请填写满意度',
						trigger: 'blur'
					}],
					start_place: [{
						required: true,
						message: '请填写出发地',
						trigger: 'blur'
					}],
					end_place: [{
						required: true,
						message: '请填写目的地',
						trigger: 'blur'
					}],
					traffic_style: [{
						required: true,
						message: '请填写参考交通',
						trigger: 'blur'
					}],
					travel_days: [{
						required: true,
						message: '请填写行程天数',
						trigger: 'blur'
					}],
					travel_nights: [{
						required: true,
						message: '请填写行程晚数',
						trigger: 'blur'
					}],
					stay_standard: [{
						required: true,
						message: '请填写住宿标准',
						trigger: 'blur'
					}],
					classic_view: [{
						required: true,
						message: '请填写经典景点',
						trigger: 'blur'
					}],
					has_guide: [{
						required: true,
						message: '请选择有无导游',
						trigger: 'change'
					}],
					product_desc: [{
						required: true,
						message: '请填产品详情',
						trigger: 'blur'
					}],
					expenses_tips: [{
						required: true,
						message: '请填写费用须知',
						trigger: 'blur'
					}]
				},
				cost_explain: '',
				// --------图片上传参数-----------------
				uploadUrl: "",
// 				fileListOfMin: [],
// 				fileListOfBig: [],
				fileListOfDetail: [],
				fileListOfOther: [],
				numLimit: 5,
				//餐数据
				dataStatus: [{
						key: 1,
						display_name: '私人定制'
					},
					{
						key: 2,
						display_name: '企业定制'
					}
				],
				dzStatus: [{
						key: 2,
						display_name: '有导游'
					},
					{
						key: 1,
						display_name: '无导游'
					}
				],
				content: "", //输入框内容
				selectedIndex: -1,
				tripIndex: 0,
				id: 0,
				mid: 0,
				leavecity: '',
				aimcity: '',
				starttime: '',
				endtime: '',
				adjusttime: 0,
				adultnum: 0,
				childnum: 0,
				budget: 0,
				adjustbudget: 0,
				type: 1,
				contacts: '',
				mobile: '',
				email: '',
				enterprise_name: '',
				customer_number: 1,
				status: 0,
				remarks: ''
			}
		},
		methods: {
			onSubmit(formName) {
				this.form.tags = this.form.tags.split(",");
				console.log(this.form,"hhhhhhh")
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.$route.query.id){
							this.form.customized_id = this.$route.query.id;
							customizedProductUpload(this.form).then(res=>{
								if (res.data.code == 200){
									this.$message({
										message:"保存成功",
										type:"success"
									})
									this.$router.push('/cust/caseList');
								}
							})
						}else{
							customizedProductAdd(this.form).then(res=>{
								if (res.data.code == 200){
									this.$message({
										message:"保存成功",
										type:"success"
									})
									this.$router.push('/cust/caseList');
								}
							})
						}
					} else {
						this.$message({
							message:"请填写完成信息",
							type:"error"
						})
					}
				});
			},
			addEditor() {
				var contTxt = {
					title: '',
					content: '',
					num: '',
				};
				this.form.product_desc.push(contTxt)
			},
			/**
			 * 图片上传相关
			 * */

			// ----------详情图片上传事件---------------
			// 图片移除事件
			handleRemoveOfDetail(file, fileList) {
				this.fileListOfDetail = fileList.map(function(imgObj) {
					return {
						'name': imgObj.name,
						'url': imgObj.url
					}
				})
			},
			// 图片上传成功
			uploadSuccessOfDetail(res) {
				this.fileListOfDetail.push({
					name: '',
					url: res.url,
					'main': 1
				})
				this.form.banner.push(res.url);
			},
			// 图片上传前的检查
			uploadBeforeOfDetail(file) {
				if (file.size / 1024 > 300) {
					this.openNotification({
						title: '图片请保持在750*350px,300KB以内',
						message: '',
						type: 'Warming',
						duration: 5000
					})
					return false
				}
			},
			// 图片数量超出限制的提示
			overSizeOfDetail(files, fileList) {
				this.openNotification({
					title: '上传图片不能超过' + this.numLimit + '张',
					message: '',
					type: 'Warming',
					duration: 5000
				})
			},
			// 回显数据
			getList(id){
				customizedProductGetDetails('/'+id).then(res=>{
					if(res.data.code == 200){
						
						this.form = res.data.data;
						this.form.tags = res.data.data.tags.join(",");
						var imgList = res.data.data.banner;
						this.fileListOfDetail = imgList.map(function(imgObj) {
							return {
								'name': "",
								'url': imgObj
							}
						})
						console.log(this.form,"this.form")
					}
				})
			}

		},
		created() {
			if(this.$route.query.id){
			    this.getList(this.$route.query.id);
			}

		}
	}
</script>
<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		display: block;
	}

	.style_auto {
		width: 80%;
		margin: 0 auto;
	}

	.save_btn{text-align: center;}
</style>
