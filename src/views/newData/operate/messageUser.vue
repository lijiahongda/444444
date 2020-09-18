<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-dialog width="800px" title="选择用户" :visible.sync="dialogTableVisible"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择用户">
					<el-input v-model="searchVal" placeholder="请输入用户信息"></el-input>
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
		



		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<el-col>
					<el-input v-model="search.keyWord" placeholder="名称查询" style="width:300px;" clearable/>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<el-button type="primary" @click="openBox(1)">新增分组</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table :data="list" :fit="true" border style="width: 100%;" v-loading="loading">
				<el-table-column prop="groupName" label="分组名称" align="center"></el-table-column>
				<el-table-column prop="userIds" label="用户" align="center"></el-table-column>
			
				<el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="openBox(2,scope.row.id)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="total" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="组名" :label-width="formLabelWidth">
					<el-input v-model="form.groupName" autocomplete="off" placeholder="请输入组名"></el-input>
				</el-form-item>

				<el-form-item label="请选择用户" prop="">
					<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
					<div class="commodity">
						<ul>
							<li style="border:none" v-for="(item,index) in user_info" :key="index">
								<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
									<span>用户ID：{{item.mid}}</span>
									<span>昵称：{{item.nickName}}</span>
									<span>手机号：{{item.mobile}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getMembers,addPushGroupUser,getPushGroupUsers,getPushGroupUser,upPushGroupUser} from '@/api/admin'
	import _ from 'lodash'
	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}

export default {
    directives: {
        waves
    },
    data() {
        return {
			loading:true,
            total: null,
            list: [],
		    pageTotal:0,   //显示页数
		    pageIndex:1,
		    pageSize:10,
		    titleName:"",//弹窗title
			dialogFormVisible:false,//弹窗开关
			dialogTableVisible:false,
			formLabelWidth:"10%",
			form:{
				groupName:'',
			},
			user_info:[],
			userIdArr:[],
			//弹窗数据模型
			search:{
				keyWord:'',
				page:1,
				pageSize:10
			},
			searchVal:'',
			memberList:[],
			memberTotal:'',
			userType:"",//编辑或者添加
        }
    },
    created() {
        this.getList();
    },
    methods: {
		//打开弹窗
		openBox(type,id){
			this.getMembers(1);
			this.dialogFormVisible = true;
			if(type == 1){
				this.titleName = "新增组"
			}else{
				this.userType =2;
				this.titleName = "编辑组"
			    this.getPushGroupUser(id)
			}
		},
		closeBox(){
			this.userType='';
			this.form={
				groupName:"",//
			}
			this.user_info=[];
			this.userIdArr=[]
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

		// 选择用户
		choseId(item) {
			var userInfo = this.user_info;
			var idx = this.user_info.length;

			var idxx = this.userIdArr.length;

			var obj = {
					mid: '',
					nickName: '',
					mobile: '',
				};
			obj.mid = item.mid;
			obj.nickName = item.nickName;
			obj.mobile = item.mobile;
			if (userInfo.length == 0) {
				this.user_info[idx] = obj;
				this.userIdArr[idxx]=obj.mid;
				this.dialogTableVisible = false
			} else {
				// 比较是否重复选中
				var isArr = []
				userInfo.map((json) => {
					isArr.push(json.mid)
				})
				if (isInArray(item.mid, isArr)) {
					this.$message({
						type: 'info',
						message: '不能选择相同用户'
					})
				} else {
					// console.log();
					// alert(this.user_info.length);
					this.user_info[idx] = obj; //官网价
					this.userIdArr[idxx]=obj.mid;
					this.dialogTableVisible = false
				}
			}
		},	
		
		//获取详情
		getPushGroupUser(id){
			getPushGroupUser({id:id}).then(res=>{
				if(res.data.code == 200){
					let obj =res.data.data;
					this.form = res.data.data;
					this.user_info = res.data.data.memberList;
				}
			})
		},
        // 列表数据
        getList() {
			this.search.page = this.pageIndex;
			getPushGroupUsers(this.search).then(res=>{
				if(res.data.code==200){
					this.loading =false
					this.list = res.data.data.list;
					this.total = res.data.data.total;
				}else{
					this.loading =false;
					this.$message.error(res.data.msg || '网络开小差了~')
				}
			})
        },
		//保存
		onConfirm(){//type=1添加 type=2编辑
			var obj=_.clone(this.form);
			if(this.userType){
				var data={}
				data.id = obj.id;
				data.groupName = obj.groupName;
				data.userIdArr = this.userIdArr;
				upPushGroupUser(data).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.form={
							groupName:"",
						}
					}else{
						this.$message({
							message: res.data.msg || '编辑失败',
							type: 'error'
						});
					}
				})
			}else{
				var data={}
				data.groupName = obj.groupName;
				data.userIdArr = this.userIdArr;
				addPushGroupUser(data).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.form={
							groupName:"",
						}
					}else{
						this.$message({
							message: res.data.msg || '保存失败',
							type: 'error'
						});
					}
				})
			}
		},
		
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        // 搜索
        handleFilter() {
			this.loading = true
            this.pageIndex = 1
			this.getList()
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
			console.log(val)
			this.loading = true
            this.pageIndex = val
            this.getList()
		},
		handleCurrentChangeMember(val) {
			console.log(val)
			this.loading = true
            this.getMembers(val)
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
