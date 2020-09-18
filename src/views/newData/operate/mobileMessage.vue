<!--suppress ALL -->
<template>
	<div class="app-container">

         <!--编辑-->
        <el-dialog :title="titleName" :visible.sync="dialogFormVisibleAdd" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="标 题" :label-width="formLabelWidth">
					<el-input v-model="form.messageTitle" autocomplete="off" placeholder="请输入标题"></el-input>
				</el-form-item>
               <el-form-item label="选择活动" class="background_color">
				<el-button type="primary" @click="dialogActive = true" plain>点击选择</el-button>
				<div v-if="act_info.length !=0" class="commodity">

					<ul>
						<li style="border:none" v-for="(item,index) in act_info" :key="index">
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<div>
									<span>活动名称：{{item.activityId}}</span>
                                    <span>活动名称：{{item.activityName}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>

             <el-form-item label="url" :label-width="formLabelWidth">
					<el-input v-model="form.messageUrl" autocomplete="off" style="width:300px" placeholder=""></el-input>
                    <el-button type="primary" @click="getShortUrl()" plain>生成短连接</el-button>
			</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm()">确 定</el-button>
			</div>
		</el-dialog>
        <!--编辑-->

        <!--编辑时候活动弹框-->
        <el-dialog width="800px" title="选择活动" :visible.sync="dialogActive"  v-loading="loading">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择活动">
					<el-input v-model="searchVal" placeholder="请输入活动名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getActive(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="activeList.length>0">
					<li @click="choseIdAct(item)" v-for="(item,index) in activeList" :key="index" >
						<div class="section-p">
							<p v-text="item.activity_name"></p>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChange1" layout="prev, pager, next" :total="total1">
			</el-pagination>
		</el-dialog>
        <!--编辑时候活动弹框-->



         <!--选择用户弹框-->
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
        <!--选择用户弹框-->

        <!--选择用户组弹框-->
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
        <!--选择用户组弹框-->

    <!--搜索部分-->
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="标题名称：">
				<el-col>
					<el-input v-model="obj.keyWord" placeholder="请输入标题名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>

                <el-button type="primary" @click="openBoxAdd(1)">新增</el-button>

				<router-link to="/operate/messageUser">
					<el-button type="primary">用户分组</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
        <!--列表-->
		<div class="new_tab">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="id" label="ID" align="center">
				</el-table-column>
				<el-table-column prop="messageTitle" label="标题" align="center">
				</el-table-column>
				<el-table-column prop="messageUrl" label="跳转链接" align="center">
				</el-table-column>
				<el-table-column prop="createdAt" label="创建时间" align="center">
				</el-table-column>
				<el-table-column prop="" label="类型" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.messageType ==1">活动</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<!-- <el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button> -->
                        <el-button type="text" size="small" @click="openBoxAdd(2,scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" @click="openBox(scope.row.id)">个人推送</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="obj.page" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
         <!--列表-->

		<el-dialog :title="PushTitleName" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form :model="form">
				<el-form-item label="消息类型" class="background_color">
					<el-radio-group v-model="form.pushType" @change="radioChange">
						<el-radio :label="1">个推</el-radio>
						<el-radio :label="2">组推</el-radio>
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
    import {getShortMessages,getShortMessage,pushMessageType,getMembers,getPushGroupUsers,upShortMessage,addShortMessage,pushShortMessageType,getShortUrl} from '@/api/admin'
    import {getActivities} from '@/api/shops'
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
            PushTitleName:"发送",
            titleName:'',
			dialogFormVisible:false,//弹窗开关
			dialogTableVisible: false,
            dialogTableVisibleGroup:false,
            dialogFormVisibleAdd:false,
            dialogActive:false,
			formLabelWidth:"10%",
			// type:'',
			form:{
					pushType:"",
					messageUrl:'',
					pushUsermobile:"",
				},
			obj:{
				page:this.pageIndex,
				keyWord:'',
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
            },
            activeList:[],
            total1:'',
            act_info:[],
            userType:'',
            activityId:''

        }
    },
    mounted() {
		this.getList();
    },
    methods: {
        // 列表数据
        getList() {
			console.log(this.obj)
			this.obj.pageSize=this.pageSize
			getShortMessages(this.obj).then(res=>{
				if(res.data.code==200){
					let dataList = res.data.data.list;
					this.list = dataList;
					this.pageTotal = res.data.data.total
				}
			})
        },

        //获取详情
		getShortMessage(id){
			getShortMessage({id:id}).then(res=>{
				if(res.data.code == 200){
					let obj =res.data.data;
					this.form = res.data.data;
				}
			})
		},
		
		onSearch(){
			this.obj.page = 1;
			this.getList()
        },
        //编辑 保存
        onConfirm(){//type=1添加 type=2编辑
			var obj=this.form;
			if(this.userType==2){
				var data={}
				data.id = obj.id;
                data.messageTitle = obj.messageTitle;
                data.messageUrl = obj.messageUrl;
                data.messageType  = 1;
				upShortMessage(data).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisibleAdd = false;
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.act_info={}
					}else{
						this.$message({
							message: res.data.msg || '编辑失败',
							type: 'error'
						});
					}
				})
			}else if(this.userType==1){
				var data={}
                data.messageTitle = obj.messageTitle;
                data.messageType  = 1;
                data.messageUrl = obj.messageUrl;
				addShortMessage(data).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisibleAdd = false;
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
						this.act_info={}
					}else{
						this.$message({
							message: res.data.msg || '保存失败',
							type: 'error'
						});
					}
				})
			}
		},
		

		//个人发送 保存
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
            
			if(this.form.pushType==1)
			{
				if (this.form.pushUsermobile == '') {
					self.$message({
						type: "error",
						message: "未选择用户"
					})
					return false;
				}
			}else if(this.form.pushType==2){
				this.form.pushUsermobile='';
				this.userInfo={}
			}
			
			if (this.form.id == '') {
				self.$message({
					type: "error",
					message: "数据ID为空"
				})
				return false;
			}

			pushShortMessageType(obj).then(res=>{
					if(res.data.code==200){
						this.dialogFormVisible = false;
						this.$message({
							message: '发送成功',
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
        
        //打开弹窗 编辑数据
		openBoxAdd(type,id){
            this.dialogFormVisibleAdd = true;
            this.getActive(1);
			if(type == 1){
                this.act_info=[];
                this.titleName = "新增"
                this.userType =1;
                this.activityId=''
			}else{
                this.titleName = "编辑"
                this.userType =2;
                this.getShortMessage(id)
			}
		},

		//打开弹窗 个人发送
		openBox(id){
			this.form.id = id;
			this.dialogFormVisible = true;
			this.getMembers(1);
			this.getPushGroupUsers(1);
			
		},

		
		closeBox(){
			this.form={
				pushType:"",
				pushUsermobile:""
			}
            this.userInfo={}
            this.act_info={}
            this.userGroupInfo={}
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
        
        getActive(page) {
            this.loading = true
            let _this = this;
            let data = {
                page: page
            }
            if (this.searchVal) {
                data['keyword'] = this.searchVal
            }
        
            getActivities(data).then((res) => {
                if (res.data.code == 200) {
                    _this.activeList = res.data.data
                    _this.total1 = res.data.count;
                    this.loading = false
                }
            }).catch((error) => {
                console.log(error)
            })
        },
            

        getShortUrl(){
            let _this = this;

            var data={
                activityId:this.activityId
            }

            if (data.activityId == '') {
				this.$message({
					type: "error",
					message: "请选择活动"
				})
				return false;
			}

            getShortUrl(data).then((res) => {
                if (res.data.code == 200) {
                    _this.form.messageUrl = res.data.tinyurl
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
				this.form.pushUsermobile = item.mobile
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

        choseIdAct(item) {
			var obj = {
                activityName :item.activity_name,
                activityId:item.id
            };
            this.activityId = item.id;
            this.act_info[0] =obj
            this.dialogActive = false
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
        handleCurrentChange1(val) {
			this.getActive(val)
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
		margin-left: 30px;
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