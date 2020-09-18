<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="">
				<el-col>
					<el-input v-model="search.keyWord" placeholder="员工姓名查询" style="width:300px;" clearable/>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<el-button type="primary" @click="openBox(1)">新增员工</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table :data="list" :fit="true" border style="width: 100%;" v-loading="loading">
				<el-table-column prop="staffName" label="员工姓名" align="center"></el-table-column>
				<el-table-column prop="departmentName" label="所属部门" align="center"></el-table-column>
				<el-table-column prop="positionName" label="职位" align="center"></el-table-column>
				<el-table-column prop="adminUserName" label="登录名" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
				<el-table-column prop="userRole" label="角色" align="center"></el-table-column>
				<el-table-column prop="createdAt" label="添加/修改时间" align="center"></el-table-column>
				<el-table-column prop="statusName" label="账号状态" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="upAdminUserStatus(scope.row.status,scope.row.adminUserId)">{{scope.row.status == 1?'禁用':'启用'}}</el-button>
						<el-button type="text" size="small" @click="openBox(2,scope.row.adminUserId)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.row.adminUserId,list,scope.$index)" v-if="scope.row.adminUserName!='admin'">删除</el-button>
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
				<el-form-item label="员工姓名" :label-width="formLabelWidth">
					<el-input v-model="form.staffName" autocomplete="off" placeholder="请输入员工姓名"></el-input>
				</el-form-item>
				<el-form-item label="部   门" :label-width="formLabelWidth">
					<el-select v-model="form.departmentId" placeholder="请选择部门" clearable @change="departChange">
						<el-option v-for="(item,index) in departmentList" :key="index" :label="item.departmentName" :value="item.departmentId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="职   位" :label-width="formLabelWidth" v-if="form.departmentId">
					<el-select v-model="form.positionId" placeholder="请选择职位" clearable no-data-text="无职位">
						<el-option v-for="(item,index) in positionList" :key="index" :label="item.positionName" :value="item.positionId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="登 录 名" :label-width="formLabelWidth">
					<el-input v-model="form.adminUserName" autocomplete="off" placeholder="请设置登录名"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" :label-width="formLabelWidth">
					<el-input v-model="form.adminPassword" autocomplete="off" placeholder="请设置登录密码"></el-input>
				</el-form-item>
				<el-form-item label="手 机 号" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off" placeholder="请输入手机号" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-checkbox-group v-model="form.userRole" size="mini" >
						<el-checkbox v-for="item in userRolesList" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox>
					</el-checkbox-group>
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
	import {getAdminUsers,addAdminUser,getRoles,getAdminUser,upAdminUser,delAdminUser,getDepartmentsMenu,getPositionsMenu,upAdminUserStatus} from '@/api/admin'
	import _ from 'lodash'

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
			formLabelWidth:"10%",
			form:{
				staffName:"",//员工姓名
				departmentId:"",//所属部门
				positionId:"",//职位
				adminUserName:"",//登录名
				mobile:"",//手机号
				adminPassword:"",//密码
				userRole:[],//角色
				adminUserType:10,//管理员类型
			},
			userRolesList:[],//角色列表默认页面
			//弹窗数据模型
			search:{
				keyWord:'',
				page:1,
				pageSize:10
			},
			departmentList:[],//部门下拉列表数据
			positionList:[],//职位下拉列表数据
			userType:"",//编辑或者添加
        }
    },
    created() {
        this.getList();
    },
    methods: {
		//打开弹窗
		openBox(type,id){
			//角色列表
			this.getRolesList()
			//部门下拉
			this.getDepartmentsMenuList()
			this.dialogFormVisible = true;
			if(type == 1){
				this.titleName = "新增员工"
			}else{
				this.userType =2;
				this.titleName = "编辑员工"
				this.getAdminUserDetails(id)
			}
		},
		closeBox(){
			this.userType='';
			this.form={
				staffName:"",//员工姓名
				departmentId:"",//所属部门
				positionId:"",//职位
				adminUserName:"",//登录名
				mobile:"",//手机号
				adminPassword:"",//密码
				userRole:[],//角色
				adminUserType:10,//管理员类型
			}
		},
      upAdminUserStatus(status,adminUserId){
		  let params = {
            adminUserId:adminUserId,
            status: status == 1?0:1
		  }
        upAdminUserStatus(params).then(res=>{
          if(res.data.code == 200){
            this.getList();
            this.$message.success('设置成功')
          }else{
            this.$message.error(res.data.msg)
		  }
		})
	  },
		//获取角色列表
		getRolesList(){
			getRoles({pageSize:300}).then(res=>{
				this.userRolesList = res.data.data.list;
			})
		},
		//获取部门下拉
		//部门下拉
		getDepartmentsMenuList(){
			getDepartmentsMenu().then(res=>{
				if(res.data.code == 200){
					this.departmentList = res.data.data
				}
			})
		},
		//departChange部门改变执行回调函数
		departChange(val){
			this.form.positionId = ''
			getPositionsMenu({departmentId:val}).then(res=>{
				if(res.data.code == 200){
					this.positionList = res.data.data
				}
			})
		},
		//获取详情
		getAdminUserDetails(id){
			getAdminUser({adminId:id}).then(res=>{
				if(res.data.code == 200){
					let obj =res.data.data;
					this.form = res.data.data;
					var newList = []
					this.form.userRole.split(/[\s\,]+/).filter(n=>{
						if(n !== ''){
							newList.push(parseInt(n))
						}
					})
					this.form.userRole  = newList;
					this.form.positionId  = this.form.positionId?parseInt(res.data.data.positionId):this.form.positionId;
					getPositionsMenu({departmentId:parseInt(res.data.data.departmentId)}).then(res=>{
						if(res.data.code == 200){
							this.positionList = res.data.data
						}
					})
				}
			})
		},
        // 列表数据
        getList() {
			this.search.page = this.pageIndex;
			getAdminUsers(this.search).then(res=>{
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
				obj.userRole = obj.userRole.join(",")
				obj.adminId = obj.adminUserId;
				upAdminUser(obj).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.form={
							staffName:"",//员工姓名
							departmentId:"",//所属部门
							positionId:"",//职位
							adminUserName:"",//登录名
							mobile:"",//手机号
							adminPassword:"",//密码
							userRole:[],//角色
							adminUserType:10,//管理员类型
						}
					}else{
						this.$message({
							message: res.data.msg || '编辑失败',
							type: 'error'
						});
					}
				})
			}else{
				obj.userRole =obj.userRole.join(",")
				addAdminUser(obj).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.form={
							staffName:"",//员工姓名
							departmentId:"",//所属部门
							positionId:"",//职位
							adminUserName:"",//登录名
							mobile:"",//手机号
							adminPassword:"",//密码
							userRole:[],//角色
							adminUserType:10,//管理员类型
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
		// 删除
		onDel(row,data,index){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				delAdminUser({adminId:row}).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg || "删除成功")
						data.splice(index,1)
					}
				})
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });
			});
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
        }
    }
}
</script>
<style type="scss">
	.goodsName{
        display: block;
    }
</style>
