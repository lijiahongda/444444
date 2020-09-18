<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-dialog width="800px" title="选择用户" :visible.sync="dialogTableVisible"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择用户">
					<el-input v-model="searchVal" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getMembers(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="memberList.length>0">
					<li  v-for="(item,index) in memberList" :key="index" >
						<div class="section-p">
							<div>
								<span>昵称：{{item.nickName}}</span>
								<span>手机号：{{item.mobile}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button @click="choseId(item)" plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChangeMember" layout="prev, pager, next" :total="memberTotal">
			</el-pagination>
		</el-dialog>

		<el-dialog width="800px" title="选择用户组" :visible.sync="dialogTableVisibleGroup"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择用户组">
					<el-input v-model="searchVal" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getPushGroupUsers(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="memberGroupList.length>0">
					<li  v-for="(item,index) in memberGroupList" :key="index" >
						<div class="section-p">
							<div>
								<span>ID：{{item.id}}</span>
								<span>组名：{{item.groupName}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button @click="choseId(item)" plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="memberGroupTotal">
			</el-pagination>
		</el-dialog>



		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="标题名称：">
				<el-col>
					<el-input v-model="obj.keyWord" placeholder="请输入标题名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<router-link to="/operate/messageAdd">
					<el-button type="primary">添加消息</el-button>
				</router-link>

				<router-link to="/operate/messageUser">
					<el-button type="primary">用户分组</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="id" label="ID" align="center">
				</el-table-column>
				<el-table-column prop="pushTitle" label="标题" align="center">
				</el-table-column>
				<el-table-column prop="pushContent" label="内容" align="center">
				</el-table-column>
				<el-table-column prop="createdAt" label="推送时间" align="center">
				</el-table-column>
				<el-table-column prop="" width="230px" label="类型" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.jumpType ==3">
							优惠券专题 <br> 优惠券专题ID:{{scope.row.jumpId}}
						</span>
						<span v-if="scope.row.jumpType ==2">
							商品 <br> 商品ID:{{scope.row.jumpId}}，skuID:{{scope.row.skuId}}
						</span>
						<span v-if="scope.row.jumpType ==1">
							活动 <br> 活动ID:{{scope.row.jumpId}}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onPush(scope.row.id)">推送</el-button>
						<el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.row)">删除</el-button>
						<el-button type="text" size="small" @click="openBox(scope.row.id)">个人推送</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="obj.page" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>

		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="消息类型" class="background_color">
					<el-radio-group v-model="form.pushType" @change="radioChange">
						<el-radio :label="1">个推</el-radio>
						<el-radio :label="2">组推</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="设备类型" class="background_color">
					<el-radio-group v-model="form.deviceType">
						<el-radio :label="1">iOS</el-radio>
						<el-radio :label="2">安卓</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="请选择用户" prop="" v-if="form.pushType==1">
					<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
					<div class="commodity">
						<ul v-if="userInfo.mid>0">
							<li style="border:none" >
								<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
									<span>用户ID：{{userInfo.mid}}</span>
									<span>昵称：{{userInfo.nickName}}</span>
									<span>手机号：{{userInfo.mobile}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>


				<el-form-item label="请选择用户组" prop="" v-if="form.pushType==2">
					<el-button type="primary" @click="dialogTableVisibleGroup = true" plain>点击选择</el-button>
					<div class="commodity">
						<ul v-if="userGroupInfo.id>0">
							<li style="border:none" >
								<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
									<span>组ID：{{userGroupInfo.id}}</span>
									<span>组名：{{userGroupInfo.groupName}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onPersonalPush()">确 定</el-button>
			</div>
		</el-dialog>		



	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getPushs,delPush,pushMessage,pushMessageType,getMembers,getPushGroupUsers} from '@/api/admin'
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
			titleName:"个人推送",//弹窗title
			dialogFormVisible:false,//弹窗开关
			dialogTableVisible: false,
			dialogTableVisibleGroup:false,
			ulUserinfo:false,
			formLabelWidth:"10%",
			startTime:'',
			endTime:'',
			type:'',
			status:'',
			activity_name:'',
			form:{
					pushType:"",
					deviceType:'',
					pushUserId:"",
				},
			obj:{
				page:this.pageIndex,
				keyWord:'',
				pageSize:this.pageSize
			},
			loading:false,
			searchVal: '',
			memberList:[],
			memberGroupList:[],
			memberTotal:0,
			memberGroupTotal:0,
			userInfo:{
				mid:'',
				nickName:'',
				mobile:''
			},
			userGroupInfo:{
				id:'',
				nickName:''
			}

        }
    },
    mounted() {
		this.getList();
    },
    methods: {
		onEdit(id){
			if(id){
				this.$router.push('/operate/messageAdd?id='+id)
			}else{
				this.$router.push('/operate/messageAdd?id='+id)
			}
			
		},
        // 列表数据
        getList() {
			this.obj.pageSize=this.pageSize
			console.log(this.obj)
			getPushs(this.obj).then(res=>{
				if(res.data.code==200){
					let dataList = res.data.data.list;
					this.list = dataList;
					this.pageTotal = res.data.data.total
				}
			})
        },
		//保存
		onSearch(type,row){//type=1添加 type=2编辑
			this.obj.page = 1;
			this.getList()
		},
		// 删除
		onDel(row){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delPush({id:`${row.id}`}).then(res=>{
					if(res.data.code==200){
						  this.$message({
							  message:"删除成功",
							  type:"success"
						  })
						  this.getList()
					}
				})
			}).catch(() => {
			});
		},
		onPush(id){
			this.$confirm('此操作将确定推送, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				pushMessage({id:`${id}`}).then(res=>{
				if(res.data.code==200){
					  this.$message({
						  message:"推送成功",
						  type:"success"
					  })
					  this.getList()
					}
				})
			}).catch(() => {
			});
		},

				//保存
		onPersonalPush(){
			var obj = this.form;
			var self = this;
			if (this.form.pushType == '') {
				self.$message({
					type: "error",
					message: "请选择消息类型"
				})
				return false;
			}

			if (this.form.deviceType == '') {
				self.$message({
					type: "error",
					message: "请选择设备类型"
				})
				return false;
			}


			if(this.form.pushType==1)
			{
				if (this.form.pushUserId == '') {
					self.$message({
						type: "error",
						message: "请输入用户ID"
					})
					return false;
				}
			}else if(this.form.pushType==2){
				this.form.pushUserId='';
				this.userInfo={}
			}
			

			if (this.form.id == '') {
				self.$message({
					type: "error",
					message: "数据ID为空"
				})
				return false;
			}

			console.log(obj);
			pushMessageType(obj).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '推送成功',
							type: 'success'
						});
					}else{
						this.$message({
							message: res.data.msg || '编辑失败',
							type: 'error'
						});
					}
				})
		},

		//打开弹窗
		openBox(id){
			this.form.id = id;
			this.dialogFormVisible = true;
			this.getMembers(1);
			this.getPushGroupUsers(1);
			
		},

		
		closeBox(){
			this.form={
				pushType:"",
				deviceType:'',
				pushUserId:""
			}
			this.userInfo={}
		},

		getMembers(page) {
			this.loading = true
			let _this = this;
			let data = {
				page: page
			}
			if (this.searchVal) {
				data['keyWord'] = this.searchVal
			}

			getMembers(data).then((res) => {
				if (res.data.code == 200) {
					_this.memberList = res.data.data.list
					_this.memberTotal = res.data.data.total;
					this.loading = false
				}
			}).catch((error) => {
				console.log(error)
			})
		},

		getPushGroupUsers(page) {
			this.loading = true
			let _this = this;
			let data = {
				page: page
			}
			if (this.searchVal) {
				data['keyWord'] = this.searchVal
			}

			getPushGroupUsers(data).then((res) => {
				if (res.data.code == 200) {
					_this.memberGroupList = res.data.data.list
					_this.memberGroupTotal = res.data.data.total;
					this.loading = false
				}
			}).catch((error) => {
				console.log(error)
			})
		},

		

		// 选择用户
		choseId(item) {
			if(this.form.pushType ==1){
				this.userInfo.mid      	= item.mid
				this.form.pushUserId    = item.mid
				this.userInfo.nickName 	= item.nickName
				this.userInfo.mobile   	= item.mobile
				this.dialogTableVisible = false
			}else if(this.form.pushType ==2){
				this.userGroupInfo.id   = item.id
				this.form.pushGroupId    = item.id
				this.userGroupInfo.groupName 	= item.groupName
				this.dialogTableVisibleGroup = false
			}
		},
		
        // 分页
        handleSizeChange(val) {
			this.obj.page= 1;
			this.getList()
		},
        handleCurrentChange(val) {
            this.obj.page = val
            this.getList()
		},

		handleCurrentChangeMember(val) {
            this.getMembers(val)
		},

		handleCurrentChangeGroup(val) {
            this.obj.page = val
            this.getList()
		},
		radioChange(){
				//this.form.goods_info =[]
		}
    }
}
</script>
<style type="scss">
	.goodsName{
        display: block;
    }

	ul,li {
		padding: 0;
		margin: 0;
		list-style: none
	}


 	.commodity li {
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10px;
		border-top: 1px solid #ddd;
		margin-bottom: 5px;
	}

	.commodity .section-p {
		padding-left: 10px;
		box-sizing: border-box;
		float: left;
	}

	.commodity .section-p span {
		line-height: 16px;
		display: inline-block;
		margin-right: 20px;
	}

	.commodity .select-btn {
		float: right;
	}
</style>