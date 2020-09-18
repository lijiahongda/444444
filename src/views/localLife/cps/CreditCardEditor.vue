<template>
	<section class="app-container">
		<div class="">
			<div style="margin-bottom:20px;">
				<router-link :to="{path:'/cps/financialCPS',query:{type:3}}">
					<el-button type="primary">返回列表</el-button>
				</router-link>
			</div>
<!--			操作记录·	只在信用卡编辑时显示-->
			<div class="detail" v-if="showOperationRecords">
				<div class="title">操作记录</div>
				<el-table
					element-loading-text="拼命加载中"
					:data="OperationRecordsData"
					style="width: 100%;margin-top: 20px;" border>
					<el-table-column prop="OperationType" label="操作类型" fixed></el-table-column>
					<el-table-column prop="OperationPersonnel" label="操作人"></el-table-column>
					<el-table-column prop="OperationTime" label="操作时间"></el-table-column>
					<el-table-column prop="OperationNote" label="操作备注"></el-table-column>
				</el-table>
			</div>
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item v-if="showBank">
					<!-- 如果是添加信息显示选择银行下拉，如果是编辑则显示数据 -->
					<label slot="label" >&nbsp;&nbsp;&nbsp;&nbsp;银行名称：</label>
					<el-select v-model="backTypes"
							   placeholder="请选择"
							   clearable
							   style="width: 160px;margin-bottom: 10px;" @change="((value)=>{backChange(value, 3)})">
						<el-option
							v-for="(item,index) in backList"
							:label="item.name"
							:value="item.bank_id"
							:key="index"
						/>
					</el-select>
				</el-form-item>
				<br>
				<el-form-item>
					<label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;银行logo：</label>
					<div style="border:1px dashed #ccc;width: 100px;height: 100px;text-align: center;">
						<img v-if="backImageUrl" :src="backImageUrl" class="avatar">
						<span v-else class="backLogo">银行logo</span>
					</div>
					<el-upload
						class="upload-demo"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="showFileList"
						:on-success="uploadSuccessUserAll"
						:on-progress="bankLogUrl"
						style="color:#409EFF;margin-top:-65px;margin-bottom: 30px;"
					>
						<span size="small" type="primary" style="margin-left: 150px;">上传银行logo</span>
					</el-upload>
				</el-form-item>
				<br>
				<el-form-item label="信用卡名称：">
					<span>{{creditCardName}}</span>
					<div style="border:1px dashed #ccc;width: 100px;height: 100px;text-align: center;">
						<img v-if="creditCarImageUrl" :src="creditCarImageUrl" class="avatar">
						<span v-else class="backLogo">信用卡图片</span>
					</div>
					<el-upload
						class="upload-demo"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="showFileList"
						:on-progress="bankImageUrl"
						:on-success="xUploadSuccessUserAll"
						style="color:#409EFF;margin-top:-65px;margin-bottom: 30px;"
					>
						<span size="small" type="primary" style="margin-left: 150px;">上传信用卡图片</span>
					</el-upload>
				</el-form-item>
				<br>
				<el-form-item label="结算点：" label-width="100px">
					<el-select v-model="optionss"
							   placeholder="请选择"
							   clearable
							   style="width: 160px;">
						<el-option
							v-for="(item,index) in options2"
							:key="index"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<br>
				<el-form-item label="结算方式：" label-width="100px">
					<span>自动结算&nbsp;+ &nbsp;</span>
					<el-select v-model="option3"
							   placeholder="请选择"
							   clearable
							   style="width: 160px;">
						<el-option
							v-for="(item,index) in options1"
							:key="index"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<br>
				<el-form-item label="特点：" label-width="100px">
					<p style="color: red;">多个特点请用逗号分割</p>
					<el-input
						type="textarea"
						:rows="2"
						placeholder="如'易下卡'，'额度高'"
						v-model="creditCardTrait">
					</el-input>
				</el-form-item>
				<br>
				<el-form-item label-width="100px">
					<label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
					<el-checkbox v-model="WhetherNotRegionalInput">是否地域限制</el-checkbox>
				</el-form-item>
				<br>
				<el-form-item label-width="100px">
					<label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
					<el-input
						type="textarea"
						:rows="2"
						placeholder="多个地域请用逗号分割"
						v-if="WhetherNotRegionalInput"
						v-model="WhetherNotRegional">
					</el-input>
				</el-form-item>
				<br>
				<el-form-item label="权益描述：" label-width="100px">
					<el-input
						type="textarea"
						:rows="2"
						placeholder="如'易下卡'，'额度高'"
						v-model="creditCardDescribe">
					</el-input>
				</el-form-item>
				<br>
				<el-form-item label="结算规则：" label-width="100px">
					<el-input
						type="textarea"
						:rows="2"
						placeholder="请输入结算规则"
						v-model="creditCardRule">
					</el-input>
				</el-form-item>
				<br>
				<el-form-item>
					<div class="clearfix">
						<el-button class="floatRight" @click="creditCardEditorSave(3)" type="primary">保存</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
	import {
		getBackCardList,
		editorBackCard,
		addBackCard,
		getPointype,
		BackCard,
		editorBackCard1
	} from '@/api/financialCps' // 接口
    export default {
        name: "CreditCardEditor",
		data(){
        	return {
				options:'',//信用卡信息的结算点类型sel
				optionss:'',//信用卡编辑弹窗的结算点model
				option3:'',//信用卡编辑弹窗的结算点类型model
				options2:{},//信用卡编辑弹窗的结算点sel
				options1:{},//信用卡编辑弹窗的结算点sel
				showBank:false,//信用卡编辑弹窗是否显示银行名称，添加数据不显示，编辑数据显示
				backTypes:'',//信用卡编辑弹窗银行名称
				backList:[],//银行名称
				backImageUrl: '',//银行logo
				creditCarImageUrl:"",//信用卡图片
				creditCardName:'',//信用卡名称
				creditCardTrait:'',//信用卡编辑特点
				creditCardDescribe:"",//信用卡编辑描述
				WhetherNotRegionalInput:false,//是否地域限制单选
				WhetherNotRegional:"",//是否地域限制文本
				creditCardRule:"",//信用卡结算规则
				showFileList:false,//上传不显示文件列表
				notAdd:0,//判断是添加新数据还是编辑老数据 1编辑 0添加
				showOperationRecords:false,//操作记录tab	编辑时显示
				OperationRecordsData:[
					{
						OperationType:'下架信用卡',
						OperationPersonnel:'************',
						OperationTime:'2020-09-12',
						OperationNote:'***********'
					},
					{
						OperationType:'编辑信用卡',
						OperationPersonnel:'************',
						OperationTime:'2020-09-12',
						OperationNote:'***********'
					},
					{
						OperationType:'上架信用卡',
						OperationPersonnel:'************',
						OperationTime:'2020-09-12',
						OperationNote:'***********'
					},
					{
						OperationType:'创建信用卡',
						OperationPersonnel:'************',
						OperationTime:'2020-09-12',
						OperationNote:'***********'
					},
				],//操作记录tab
			}
		},
		created() {
			this.row = this.$route.query.row ? this.$route.query.row : 0;
			this.type = this.$route.query ? this.$route.query.type : '';
			this.getPointype();//结算点
			this.getPointype1();//结算点类型
			this.id = this.row.id;
			if(this.type == 0){//0添加
				this.showBank = true;//更新数据显示银行下拉
				this.getBackCardLists();//银行卡列表
				this.notAdd = 0;
				this.showOperationRecords = false;//不显示操作记录
			}else if(this.type == 1){//1编辑
				this.notAdd = 1;
				this.showBank = false;//编辑数据不显示银行下拉
				this.getCreditCardInformation(this.row.bank_id);//编辑取数据
				this.showOperationRecords = true;//显示操作记录
				this.getOperationRecordstab(this.row.bank_id);//get操作记录
			}
		},
		methods:{
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
			//信用卡添加中的银行选择change
			backChange(val,type){
				console.log(val);
				const loading = this.$loading({
					lock: true,
					text: '数据查询中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.bankId = val;
				let obj = {};
				obj = this.backList.find((item)=>{//这里的userList就是上面遍历的数据源
					return item.bank_id === val;//筛选出匹配数据
				});
				this.creditCardName = obj.name;
				let bankData = {
					bank_id:val
				}
				//银行选择时取数据，如果有数据则该条银行卡数据已存在可直接编辑，如没有数据则调添加接口
				BackCard(bankData).then(res=>{
					loading.close();
					if(res.data.code === 200){
						this.$message.error('该信用卡已存在，请编辑。');
						this.$router.push({path: '/cps/financialCPS', query: {type:type}});//返回列表页
					}else{
						//400说明这条信用卡信息不存在，可以继续编辑
					}
				})
			},
			//信用卡编辑取数据
			getCreditCardInformation(id){
				const loading = this.$loading({
					lock: true,
					text: '数据获取中，请稍后。。。',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				let _this = this;
				this.bankId = id;
				let editorBackCardData = {
					bank_id:id
				}
				BackCard(editorBackCardData).then(res=>{
					loading.close();
					if(res.data.code === 200){
						_this.backCardEditorTitle = res.data.data.bank_name + '编辑';
						_this.backImageUrl = res.data.data.bank_logo;
						_this.creditCardName = res.data.data.bank_name;
						_this.creditCarImageUrl = res.data.data.card_img;
						_this.optionss = res.data.data.point_type;//结算点
						_this.option3 = res.data.data.method_type;//结算方式

						if(res.data.data.characteristic == []){
							_this.creditCardTrait = '';
						}else{
							let arrStr = (res.data.data.characteristic).join(",");
							_this.creditCardTrait = arrStr//特点
						}

						if(res.data.data.is_limit == 0){
							_this.WhetherNotRegionalInput = false; //是否有地域限制
						}else if(res.data.data.is_limit == 1){
							_this.WhetherNotRegionalInput = true;//是否有地域限制
						}
						if(res.data.data.area == []){
							res.data.data.area = '';
						}else{
							res.data.data.area = (res.data.data.area).join(',')
						}
						_this.WhetherNotRegional = res.data.data.area ;//地域限制的描述
						_this.creditCardDescribe = res.data.data.describe;//权益描述
						_this.creditCardRule = res.data.data.rule;//结算规则

						console.log(res.data.data.id);
						console.log(_this.id);
						_this.id = res.data.data.id;//id

					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			//信用卡编辑保存数据
			creditCardEditorSave(type){
				let RegionalRestrictions = '';
				if(this.WhetherNotRegionalInput == true){
					RegionalRestrictions = 1;
					if(this.WhetherNotRegional == ''){
						return this.$message.error('请输入地域限制');
					}
				}else{
					RegionalRestrictions = 0;
				}
				if(this.notAdd == 0){ //添加
					if(this.creditCardTrait == ''){ //接口要求特点传数据
						this.creditCardTrait = [];
					}
					let addBackCardData = {
						bank_id:parseInt(this.bankId),//银行id
						bank_name:this.creditCardName,//信用卡name
						bank_logo:this.backImageUrl, //银行logo
						card_img:this.creditCarImageUrl, //信用卡logo
						point_type:this.optionss,// 结算点类型,
						method_type:this.option3,// 结算方式
						characteristic:this.creditCardTrait,//特点
						is_limit:RegionalRestrictions, // 地区限制
						area:(this.WhetherNotRegional).split(','),//地区限制描述
						describe:this.creditCardDescribe,// 描述
						rule:this.creditCardRule //  规则
					}
					const loading = this.$loading({
						lock: true,
						text: '信息保存中，请稍后。。。',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					addBackCard(addBackCardData).then(res=>{
						loading.close();
						if(res.data.code === 200){
							this.$message.success(res.data.msg);
							this.$router.push({path: '/cps/financialCPS', query: {type:type}});//返回列表页
						}else{
							this.$message.error(res.data.msg);
						}
					})
				}else{  //编辑
					const loading = this.$loading({
						lock: true,
						text: '信息保存中，请稍后。。。',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let addBackCardData = {
						id:this.id,
						bank_id:this.bankId,//银行id
						bank_name:this.creditCardName,//信用卡name
						bank_logo:this.backImageUrl, //银行logo
						card_img:this.creditCarImageUrl, //信用卡logo
						point_type:this.optionss,// 结算点类型,
						method_type:this.option3,// 结算方式
						characteristic:(this.creditCardTrait).split(',') ,//特点
						is_limit:RegionalRestrictions, // 地区限制
						area:(this.WhetherNotRegional).split(','),//地区限制描述
						describe:this.creditCardDescribe,// 描述
						rule:this.creditCardRule //  规则
					}
					editorBackCard(addBackCardData).then(res=>{
						loading.close();
						if(res.data.code === 200){
							this.$message.success(res.data.msg);
							this.$router.push({path: '/cps/financialCPS', query: {type:type}});//返回列表页
						}else{
							this.$message.error(res.data.msg);
						}
					})
				}
			},
			//银行logo上传时的钩子
			bankLogUrl(file){
				console.log(file);
			},
			//银行img上传成功的钩子
			uploadSuccessUserAll(res){
				console.log(res);
				this.backImageUrl = res.url;
			},
			//信用卡图片上传时的钩子
			bankImageUrl(file){
				console.log(file);
			},
			//信用卡图片上传成功时的钩子
			xUploadSuccessUserAll(res){
				console.log(res);
				this.creditCarImageUrl = res.url;
			},
			getOperationRecordstab(id){

			}
		}
	}
</script>

<style scoped>
	.app-container{
		background-color:#f0f2f4;
		padding: 10px;
	}
	.backLogo {
		font-size: 16px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
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
	.floatRight{
		float: right;
		margin: 20px;
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
