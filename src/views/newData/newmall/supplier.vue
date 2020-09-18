<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form"  :inline="true">
			<el-form-item label="选择日期：">
				<el-col>
					<el-date-picker v-model="form.startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" style="width: 150px;" />
					<el-date-picker v-model="form.endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" style="width: 150px;" />
				</el-col>
			</el-form-item>
			<el-form-item label="供应商名称：">
				<el-col>
					<el-input v-model="form.supplierName" placeholder="供应商名称" />
				</el-col>
			</el-form-item>
			<el-form-item label="供应商渠道:" prop="distribution_id">
				<el-col>
					<el-select v-model="form.sc_id" clearable placeholder="供应商渠道" style="width: 200px;">
						<el-option v-for="item in getSupplierData" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="联系人：">
				<el-col>
					<el-input v-model="form.supplierPeople" placeholder="联系人" />
				</el-col>
			</el-form-item>
			<el-form-item label="联系电话：">
				<el-col>
					<el-input v-model="form.supplierMobile" placeholder="联系电话" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<el-button type="danger" @click="onEmpty">清空</el-button>
				<!-- <el-button type="danger">导出</el-button> -->
				<!-- <el-button  type="primary" @click="onEdit(false)">新增</el-button> -->
				<div class="pan-btn " v-if="false">
					<el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
				</div>
			</el-form-item>

		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="sid" label="编号" align="center" style="width: 240;">
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" align="center">
				</el-table-column>
				<el-table-column prop="supplier_name" label="供应商" align="center">
				</el-table-column>
				<el-table-column prop="channel_name" label="供应商渠道" align="center">
				</el-table-column>
				<el-table-column prop="supplier_nickname" label="供应商昵称" align="center">
				</el-table-column>
				<el-table-column prop="supplier_people" label="联系人" align="center">
				</el-table-column>
				<el-table-column prop="supplier_mobile" label="联系电话" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button  type="text" size="small" @click="onEdit(scope.row.sid)">编辑</el-button>
						<el-button  type="text" size="small" @click="upPwd(scope.row.sid)">修改密码</el-button>
						<el-button  type="text" size="small" @click="onDel(scope.row.sid)">删除</el-button>
						<el-button v-if="scope.row.edit" type="text" size="small" @click="onCancel()">取消</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="title" :visible.sync="dialogFormVisible">
		  <el-form :model="formBox">
			<el-form-item label="供应商名称" :label-width="formLabelWidth">
			  <el-input v-model="formBox.supplier_name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="供应商昵称" :label-width="formLabelWidth">
			  <el-input v-model="formBox.supplier_nickname" autocomplete="off"></el-input>
			</el-form-item>
			<!-- <el-form-item label="供应商渠道:" :label-width="formLabelWidth">
					<el-select v-model="formBox.sc_id" clearable placeholder="供应商渠道">
						<el-option v-for="item in getSupplierDataInsert" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
			</el-form-item> -->
			<el-form-item label="联系人" :label-width="formLabelWidth" >
			  <el-input v-model="formBox.supplier_people"></el-input>
			</el-form-item>

			<el-form-item label="联系电话" :label-width="formLabelWidth">
			  <el-input v-model="formBox.supplier_mobile"></el-input>
			</el-form-item>
			<el-form-item label="备注" :label-width="formLabelWidth">
			  <el-input type="textarea" v-model="formBox.supplier_remarks" ></el-input>
			</el-form-item>
			  <el-form-item :label-width="formLabelWidth"  label="店铺logo">
				  <el-upload
					  class="avatar-uploader"
					  action="https://api2.yuelvhui.com/app/third/upload"
					  :show-file-list="false"
					  :on-success="res=> {$set(formBox,'supplier_logo',res.url)}"
					  :limit="1"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="formBox.supplier_logo" :src="formBox.supplier_logo" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  </el-upload>
			  </el-form-item>
			  <el-form-item :label-width="formLabelWidth"  label="店铺背景图">
				  <el-upload
					  class="avatar-uploader"
					  action="https://api2.yuelvhui.com/app/third/upload"
					  :show-file-list="false"
					  :on-success="res=> {$set(formBox,'supplier_background',res.url)}"
					  :limit="1"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="formBox.supplier_background" :src="formBox.supplier_background" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  </el-upload>
			  </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="onConfirm">确 定</el-button>
		  </div>
		</el-dialog>


		<el-dialog :title="titlePwd" :visible.sync="dialogFormVisible_pwd" @close="closeBox">
			<el-form :model="pwdInfo">
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="pwdInfo.supplier_password" autocomplete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible_pwd = false">取 消</el-button>
				<el-button type="primary" @click="confirmUpPwd">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
import {getSupplier,deleteSupplier,addSupplier,updateSupplier,doUpdateSupplier,getSupplierChannelList,upSupplierPwd} from '@/api/shops'
import { truncate } from 'fs';

export default {
directives: {
	waves
},
data() {
	return {
		form:{
		  supplierName:'',
		  startTime:'',
		  endTime:'',
		  supplierPeople:'',
		  supplierMobile:'',
		  sc_id:"",//供应商渠道id
		},
		formBox:{
			supplier_name:'',
			supplier_nickname:'',
			supplier_people:'',
			supplier_mobile:'',
			supplier_remarks:'',
			sc_id:'',
		},
		sid:"",
		total: null,
		phone:'',
		switchChart: false,
		list: [],
	  pageTotal:0,   //显示页数
	  pageIndex:1,
	  pageSize:10,
	  startTime:'',
	  endTime:'',
	  type:'',
	  status:'',
	  params:'',
	  priceType:[{name:"金额",id:0},{name:"比例",id:1}],
	  distribution_name:'',
	  distribution_type:'',
	  distribution_first:'',
	  distribution_two:'',
	  distribution_share:'',
	  distribution_company:'',
	  loading:true,
	  dialogFormVisible:false,
	  formLabelWidth:"120px",
	  title:"",//弹窗文字详情
	  getSupplierData:[],//供应商渠道搜索
	  getSupplierDataInsert:[],//供应商渠道添加
	  dialogFormVisible_pwd:false,
	  pwdInfo:{},
	  titlePwd:'修改密码',
	}
},
created() {
	this.getList();
	this.getSupplierChannelList()
},
methods: {
	onSubmit(){
		this.pageIndex = 1;
		this.getList()
	},

	upPwd(sid)
	{
		this.dialogFormVisible_pwd=true;
		this.pwdInfo.sid = sid;
	},
	confirmUpPwd()
	{
		// console.log(this.pwdInfo);

		upSupplierPwd(this.pwdInfo).then(res=>{
			if(res.data.code == 200){
				console.log(res)
				this.$message({
					message:"修改成功",
					type:"success"
				})
				this.getList();
				this.dialogFormVisible_pwd = false;
			}else{
				this.$message({
					message:res.data.msg || "保存失败",
					type:"error"
				})
			}
		})

	},
	closeBox()
	{
		this.pwdInfo = {};
	},
	// 编辑
	onEdit(sid){
		this.dialogFormVisible = true;
		console.log(typeof sid,'onEdionEditonEdit')
		this.sid = sid;
		if(sid){
			this.title = "编辑供应商"
			let obj = {
				sid:sid
			}
			updateSupplier(obj).then(res=>{
				if(res.data.code == 200){
					console.log(res)
					this.formBox = res.data.data;
					if(this.formBox.sc_id === 0){
						this.formBox.sc_id = ''
					}
				}
			})
		}else{
			this.title = "添加供应商"
			this.formBox={
				supplier_name:'',
				supplier_nickname:'',
				supplier_people:'',
				supplier_mobile:'',
				supplier_remarks:''
			}
		}
	},
	onEmpty(){
		this.form={
		  supplierName:'',
		  startTime:'',
		  endTime:'',
		  supplierPeople:'',
		  supplierMobile:''
		}
		this.getList()
	},
  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt = file.size / 1024 < 500;
    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
    }
    if (!isLt) {
      this.$message.error('上传头像图片大小不能超过 500K!');
    }
    return isJPG && isLt;
  },
	onConfirm(){
		if(this.formBox.supplier_name == ''){
			this.$message({
				type:"error",
				message:"请填写供应商名称"
			})
			return false;
		}
		if(this.formBox.supplier_nickname == ''){
			this.$message({
				type:"error",
				message:"请填写供应商昵称"
			})
			return false;
		}
		if(this.formBox.supplier_people == ''){
			this.$message({
				type:"error",
				message:"请填写联系人"
			})
			return false;
		}
		// if(this.formBox.sc_id == ''){
		// 	this.$message({
		// 		type:"error",
		// 		message:"请填写供应商渠道"
		// 	})
		// 	return false;
		// }
		if(this.formBox.supplier_mobile == ''){
			this.$message({
				type:"error",
				message:"请填写联系电话"
			})
			return false;
		}
		if(this.sid){
			this.formBox.sid = this.sid;
			doUpdateSupplier(this.formBox).then(res=>{
				if(res.data.code == 200){
					console.log(res)
					this.$message({
						message:"保存成功",
						type:"success"
					})
					this.getList();
					this.dialogFormVisible = false;
				}else{
					this.$message({
						message:res.data.msg || "保存失败",
						type:"success"
					})
				}
			})
		}else{
			addSupplier(this.formBox).then(res=>{
				if(res.data.code == 200){
					this.$message({
						message:"保存成功",
						type:"success"
					})
					this.getList();
					this.dialogFormVisible = false;
				}else{
					this.$message({
						message: res.data.msg ||"保存失败",
						type:"error"
					})
				}
			})
		}

	},
   // 列表数据
   getList() {
	   this.form.page = this.pageIndex;
	   getSupplier(this.form).then(res=>{
			if(res.data.code==200){
				this.list = res.data.data;
				this.total = res.data.totalPage;
				this.pageTotal = res.data.count;
				this.loading= false;
		   }else{
			   this.list=[]
		   }
	   })
   },
   //供应商渠道
   getSupplierChannelList(){
		getSupplierChannelList().then(res=>{
			if(res.data.code == 200){
				this.getSupplierData =res.data.data;
				this.getSupplierDataInsert =res.data.data;
			}else{
				this.$message.error(res.data.msg || "失败")
			}

		})
	},
	// 删除
	onDel(row){
		this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		  confirmButtonText: '确定',
		  cancelButtonText: '取消',
		  type: 'warning'
		}).then(() => {
			deleteSupplier({sid:row}).then(res=>{
				if(res.data.code==200){
					  this.$message({
						  message:"删除成功",
						  type:"success"
					  })
					  this.getList()
				}else{
				  this.$message({
					  message:"删除失败,请重试",
					  type:"error"
				  })
				}
			})
		}).catch(() => {
		  this.$message({
			type: 'info',
			message: '已取消删除'
		  });
		});
	},
	//取消
	onCancel(row){
		row.edit = false;
		row.distribution_name = row.distribution_name_new;
		row.distribution_type = row.distribution_type_new;
		row.distribution_first = row.distribution_first_new;
		row.distribution_two = row.distribution_two_new;
		row.distribution_share = row.distribution_share_new;
		row.distribution_company = row.distribution_company_new;
	},
	goAdd(){
		this.$router.push("/newmall/distributionAdd")
	},
	// 分页
	handleSizeChange(val) {},
	handleCurrentChange(val) {
		this.loading = true;
		this.pageIndex = val;
		this.getList()
	}
}
}
</script>
<style type="scss">
	.goodsName{
	display: block;
}
</style>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
