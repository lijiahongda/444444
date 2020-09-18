<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="forms" label-width="120px" :inline="true">
			<el-form-item label="关键词名称：">
				<el-input v-model="name" placeholder="请输入关键词名称" style="width:200px;" clearable @clear="onSearch"
				 @keyup.enter.native="onSearch" prefix-icon="el-icon-search" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<el-button type="primary" @click="onConfirm()">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="ks_sort" label="排序" align="center">
				</el-table-column>
				<el-table-column fixed prop="ks_name" label="关键词名称" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onConfirm(scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.row.id)">删除</el-button>

					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="关键词名称:" :label-width="formLabelWidth">
					<el-input v-model="form.ks_name" autocomplete="off" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="关键词分类:" :label-width="formLabelWidth">
					<el-select v-model="form.ksc_id">
						<el-option v-for="item in options" :key="item.id" :label="item.ksc_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序:" :label-width="formLabelWidth">
					<el-input v-model="form.ks_sort" autocomplete="off" placeholder="请输入排序,数字越大越靠前"></el-input>
				</el-form-item>
				
				<!-- <el-form-item :label-width="formLabelWidth"  label="图片">
					<el-upload 
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="false"
						:on-success="uploadSuccess"
						:limit="1"
						:on-exceed="overSizeOfDetail1"
						:before-upload="beforeAvatarUpload" :on-remove="handleRemoveOfDetail">
						<img v-if="form.image" :src="form.image" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item> -->

				 <el-form-item label="商品封面图:"
                        prop="goods_cover_image">
						<el-upload action="https://api2.yuelvhui.com/app/third/upload"
								:limit="1"
								list-type="picture-card"
								:file-list="fileListOfDetailTwo"
								:on-success="uploadSuccess"
								:on-exceed="overSizeOfDetail1"
								:before-upload="uploadBeforeOfDetail"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemoveOfDetail">
						<i class="el-icon-plus"></i>

						<div slot="tip"
							class="el-upload__tip"
							style="color: green;">
							请选择300KB以内的图片
						</div>
						</el-upload>
            		<el-input v-model="form.image"
                      style="display: none;" />
         	 	</el-form-item>


				<el-form-item label="是否显示图片:" label-width="120px">
					<el-radio-group v-model="form.isShowImg" @change="radioChange2">
						<el-radio v-model="form.isShowImg"  v-for="item in isShowImgList" :key="item.id"  :label="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="类型:" :label-width="formLabelWidth">
					<el-radio-group v-model="form.type" @change="radioChange">
						<el-radio v-model="form.type"  v-for="item in typeList" :key="item.id"  :label="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</el-form-item>

				
				<el-form-item label="产品:" :label-width="formLabelWidth">

				<div v-if="goodsInfo.length !=0" class="commodity">
					<ul style="list-style:none">
						<li style="border:none" v-for="(item,index) in goodsInfo">
							<div class="imgDiv" v-if='form.type==1'>
								<img :src="item.goodsImg" alt="">
							</div>
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<!-- <span v-if='form.type==1' v-text="item.goods_name"></span> -->
								<div>
									<span v-if='form.type==1'>商品名称：{{item.goodsName}}</span>
								</div>
								<div class="ipt_list">
									<span v-if='form.type==1'>skuID:{{item.skuId}}</span>
									<span v-if='form.type==2'>活动ID：{{item.actId}}</span>
									<span v-if='form.type==2'>活动名称：{{item.activityName}}</span>
								</div>
							</div>
							<div class="del_item" v-if="!editId">
								<el-button type="danger" plain @click='delItem(form.id)'>删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择商品">
					<el-input v-model="searchData.goods_name" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getSearch()" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="list.length>0" class="keyWordList">
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index" >
						<div class="imgDiv"  v-if="form.type==1">
							<img :src="item.path" alt="">
						</div>
						<div class="section-p" v-if="form.type==1">
							<p v-text="item.goods_name"></p>
							<div>
								<span>进货价：￥{{item.buy_price}}</span>
								<span>会员价：￥{{item.vip_price}}</span>
								<span>官网价：￥{{item.origin_price}}</span>
								<span>库存：{{item.inventory}}</span>
							</div>
						</div>
						<div class="section-p" v-if="form.type==2">
							<!-- <p v-text="item.id"></p> -->
							<div>
								<span>活动ID：{{item.id}}</span>
								<span>活动名称：{{item.activity_name}}</span>
								<span>分享标题：{{item.share_title}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<!---
					:current-page.sync="currentPage" 
					@current-change="handleCurrentChange" 
					layout="prev, pager, next" :total="total"
			
			--->
			</el-pagination>
			<el-pagination small
				:current-page="searchData.page"
				:page-sizes="[10]"
				:page-size="searchData.pageShow"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange2"
				@current-change="handleCurrentChange2"
			/>
		</el-dialog>

	


	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getKeywordCates,getKeywords,getKeyword,addKeyword,deleteKeyword,updateKeyword } from '@/api/shops'
	import {getTabGoods,getActivitieList,delKeywordSearchProduct} from '@/api/order'
	const typeList = [
		{id:"0",name:"默认"},
		{id:"1",name:"商品"},
		{id:"2",name:"活动"},
	]
	const isShowImgList = [
		{id:"0",name:"不显示"},
		{id:"1",name:"显示"},
	]
	
export default {
    directives: {
        waves
    },
    data() {
        return {
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
			supplierName:"",
			formLabelWidth:"90px",
			dialogFormVisible:false,
			form:{
				ks_name:"",
				ks_sort:"",
				ksc_id:"",
			},
			options:[],
			name:"",///搜索名字
			titleName:"新增分类",
			typeId:"",
			loading:true,
			editId:'',//类型
			typeList,//默认类型 单选
			radioChannel:"",
			searchData:{
				page:1,
				pageShow:10,
			},
			dialogTableVisible:false,
			searchVal: '',
			currentPage: 1,
			goodsInfo:[],
			isShowImgList,
			fileListOfDetailTwo: [],
			
        }
    },
    created() {
        this.getList();
		this.getKeyList()
    },
    methods: {
        // 列表数据
        getList() {
			getKeywords({ks_name:this.name,page:this.pageIndex}).then(res=>{
				if(res.data.code == 200){
				 this.loading = false;
				 this.list = res.data.data;
				 this.total = res.data.totalPage;
				 this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize) || 0;
				}else{
					this.loading = false;
					this.$message.error(res.data.msg || "网络开小差了~")
				}
			})
        },
		// 列表数据
		getKeyList() {
			getKeywordCates({ksc_name:this.name,page:1,pageSize:100}).then(res=>{
				if(res.data.code == 200){
					this.options = res.data.data;
					console.log(this.options,'options')
				  
				}else{
					this.loading = false;
				}
			})
		},
		//保存
		onConfirm(type){
			if(type==''){
				this.typeId='';
			}
			if(type){
				this.typeId =1;
				this.titleName = "修改关键词"
				getKeyword({id:type}).then(res=>{
					if(res.data.code == 200){
						this.form = res.data.data;
						var obj={};
						this.goodsInfo=[];
						if(this.form.type==1){
							obj.skuId = this.form.gid;
							obj.goodsImg = this.form.goodsImg;
							obj.goodsName = this.form.goodsName;
						}else if(this.form.type==2){
							obj.actId = this.form.gid;
							obj.activityName = this.form.activityName;
						}
						this.goodsInfo.push(obj);
						var imgListTwo = res.data.data.image.split(' ');
						  this.fileListOfDetailTwo = imgListTwo.map(function (imgObj) {
							return {
							'name': "",
							'url': imgObj
							}
						})
						

					}
				})
			}else{
				this.titleName = "新增关键词"
			}
			this.dialogFormVisible = true;
		},
		uploadSuccess (res) {
      		this.form.image=res.url;
    	},
		handlePictureCardPreview (file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		    // 图片上传前的检查
		uploadBeforeOfDetail (file) {
			if (file.size / 1024 > 300) {
				this.$message({
				message: "图片请保持在750*350px,300KB以内",
				type: 'error',
				})
				return false
			}
		},
		    // 图片移除事件
		handleRemoveOfDetail (file, fileList) {
			this.form.image = "";
		},
		overSizeOfDetail1 (files, fileList) {
      		this.$message({
        		message: "上传图片不能超过1张",
        		type: 'error',
      		})
    	},
        onSubmit() {
			if(this.form.ks_name === '' ){
				this.$message.error("名称不能为空")
				return false;
			}
			if(this.form.ks_sort === '' ){
				this.$message.error("排序不能为空")
				return false;
			}
			if(this.form.ksc_id === '' ){
				this.$message.error("分类不能为空")
				return false;
			}

			if(this.form.type==1){
				this.form.gid=this.goodsInfo[0].skuId
			}else if(this.form.type==2){
				this.form.gid=this.goodsInfo[0].actId
			}
			if(this.typeId != 1){
				addKeyword(this.form).then(res=>{
					if(res.data.code == 200){
						this.dialogFormVisible = false;
						this.$message.success(res.data.msg || "添加成功")
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了~")
					}
				})
			}else{
				// console.log(this.form, '222222')
				updateKeyword(this.form).then(res=>{
					if(res.data.code == 200){
						this.dialogFormVisible = false;
						this.$message.success(res.data.msg || "编辑成功")
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了~")
					}
				})
			}
            
        },
		onDel(id){
			deleteKeyword({id:id}).then(res=>{
				if(res.data.code == 200){
					this.$message.success(res.data.msg || "删除成功")
					this.getList()
				}else{
					this.$message.error(res.data.msg || "网络开小差了~")
				}
			})
		},
		// 关闭
		closeBox(){
			this.form = {
				name:"",
				sort:"",
			}
		},
        // 搜索
        onSearch() {
			this.loading = true
            this.pageIndex = 1;
			this.getList()
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getList()
		},
		handleSizeChange2(val) {},
        handleCurrentChange2(val) {
            this.searchData.page = val
           if(this.form.type==1){
				this.getTabGoods();
			}else if(this.form.type==2){
				this.getActivitieList();
			}
		},
		// 添加按钮中单选框
		radioChange :function(val){
			this.radioChannel=val;
			this.form.type=val
			if(val==1){
				this.dialogTableVisible=true;
				this.getTabGoods();
			}else if(val==2){
				this.dialogTableVisible=true;
				this.getActivitieList();
			}
		},

		getSearch(){
			console.log(this.form.type,'dsafdafs');
			if(this.form.type==1){
				this.getTabGoods();
			}else if(this.form.type==2){
				this.getActivitieList();
			}
		},
		radioChange2 :function(val){
			// this.radioChannel=val;
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
		getTabGoods(){
			getTabGoods(this.searchData).then(res=>{
				if(res.data.code == 200){
				 this.loading = false;
				 this.list = res.data.data;
				 this.total = res.data.count;
				 this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize) || 0;
				}else{
					this.loading = false;
					this.$message.error(res.data.msg || "网络开小差了~")
				}
			})
		},
		getActivitieList(){
			getActivitieList(this.searchData).then(res=>{
				if(res.data.code == 200){
				 this.loading = false;
				 this.list = res.data.data;
				 this.total = res.data.totalPage;
				 this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize) || 0;
				}else{
					this.loading = false;
					this.$message.error(res.data.msg || "网络开小差了~")
				}
			})
		},
		// 选择商品
		choseId(item) {
			this.goodsInfo=[];
			var obj={}

			if(this.form.type==1)
			{
				obj.skuId = item.sku_id;
				obj.goodsImg = item.path;
				obj.goodsName = item.goods_name;
				obj.goodsId = item.id || '';
			}else if(this.form.type==2){
				obj.actId = item.id;
				obj.activityName = item.activity_name;
			}
			
			this.goodsInfo.push(obj); //官网价
			this.dialogTableVisible = false
		},
		// 删除
		
	delItem(id){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
			delKeywordSearchProduct({id:id}).then(res=>{
				if(res.data.code==200){
					this.$message({
						message:"删除成功",
						type:"success"
					})
					this.onConfirm(id)
				}
			})
				
				
		}).catch(() => {
			this.$message({
			type: 'info',
			message: '已取消删除'
			});          
		});
	},



		}
		
	}
</script>
<style type="scss">
	.goodsName{
        display: block;
    }
	
	.imgDiv {
		float: left;
		width: 90px;
		height: 90px;
		margin-right:10px;
	}
	.imgDiv img{
		width: 100%;
	}
	.keyWordList li{
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10px;
		border-top: 1px solid #ddd;
		margin-bottom: 5px;
	}
	.section-p {
			padding-left: 10px;
			box-sizing: border-box;
			float: left;
	}
	.section-p  span{
		line-height: 16px;
		display: inline-block;
		margin-right: 20px;
	}
	.select-btn {
		float: right;
	}	

	.ipt_list input {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
	}
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

	/deep/ .del_item .el-button--danger.is-plain {
			margin-top: 24px;
			border-radius: 100%;
			padding: 0;
			width: 50px;
			height: 50px;
		}
</style>
