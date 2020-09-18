<template>
	<div class="app-container">
		<el-dialog title="新增投放供应商" :visible.sync="dialogFormVisible" @close="closeBox">
			<el-form class="add_supper" label-width="100px" :model="form">
				<el-form-item label="供应商">
					<el-input placeholder="请输入供应商名称" v-model="form.supplierName">
					</el-input>
				</el-form-item>
				<el-form-item label="联系人">
					<el-input placeholder="请输入联系人" v-model="form.contactsName"></el-input>
				</el-form-item>
				<el-form-item label="电话">
					<el-input placeholder="请输入电话" v-model="form.mobile" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input placeholder="请输入用户名" v-model="form.loginUser"></el-input>
				</el-form-item>
				<el-form-item label="登录密码">
					<el-input placeholder="请输入登录密码" v-model="form.loginPwd"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addRemarkSure">保 存</el-button>
			</div>
		</el-dialog>
		<el-dialog title="新增投放渠道" :visible.sync="dialogChannel" @close="closeBox">
			<el-form class="add_supper" label-width="100px" :model="form">
				<el-form-item label="渠道名称">
					<el-input placeholder="请输入供应商名称" v-model="channelForm.channelName">
					</el-input>
				</el-form-item>
				<el-form-item label="供应商">
					<el-select v-model="channelForm.putInSplId" placeholder="请选择供应商">
					  <el-option
					    v-for="item in supperList"
					    :key="item.id"
					    :label="item.supplier_name"
					    :value="item.id">
					  </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="投放页面链接">
					<el-input placeholder="例:http://www.baidu.com" v-model="channelForm.goodsUrl" @input="locationHref"></el-input>
				</el-form-item>
				<el-form-item label="跟踪代码">
					<el-input placeholder="请输入跟踪代码" v-model="channelForm.from" @input="locationHost"></el-input>
				</el-form-item>
				<el-form-item label="最终投放链接">
					<el-col><span v-text="channelForm.putinUrl"></span></el-col>
					<el-button type="text" data-clipboard-action="copy" class="cobyOrderSn" :data-clipboard-text="channelForm.putinUrl"  @click="copyText">复制链接</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDialogChannel">保 存</el-button>
			</div>
		</el-dialog>
		<el-button type="primary" @click="dialogFormVisible = !dialogFormVisible" style="margin-bottom: 15px;">新增投放供应商</el-button>
		<el-button type="primary" @click="newAddChannel" style="margin-bottom: 15px;">新增投放渠道</el-button>
		<el-table v-loading="loading" v-if="!switchChart" :data="list" border stripe :fit="true" style="width: 100%">
			<el-table-column prop="supplierName" label="供应商" align="center"></el-table-column>
			<el-table-column prop="contactsName" label="联系人" sortable align="center"></el-table-column>
			<el-table-column prop="mobile" label="电话" sortable align="center"></el-table-column>
			<el-table-column prop="loginUser" label="用户名" sortable align="center"></el-table-column>
			<el-table-column prop="loginPwd" label="密码" sortable align="center"></el-table-column>
			<el-table-column prop="channelName" label="渠道名称" sortable align="center"></el-table-column>
			<el-table-column width="250" fixed="right" prop="refundTotal" label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="addRemarkBtn(scope.row.sid)">编辑供应商</el-button>
					<el-button size="mini" @click="addPutChannel(scope.row.cid)">编辑渠道</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="!loading" class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-sizes="[10,20,30,40]" :page-size="searchCondition.pageSize"
			 :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
			 @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import { addExtensionSupplier, getPutInChannels,getExtensionSupplier,upExtensionSupplier,addPutInChannel,getPutInChannel,upPutInChannel,getSuppliers} from '@/api/throw' // 接口
	import clipboard from 'clipboard';
export default {
    name: 'textList',
    data() {
      return {
        searchCondition: {
          page:1,
          pageSize: 20
        },
		form:{
			supplierName:'',
			contactsName:'',
			mobile:'',
			email:'',
			loginUser:'',
			loginPwd:'',
		},
		channelForm:{
			channelName:"",
			putInSplId:"",
			goodsUrl:"",
			from:"",
			putinUrl:"",
		},
        total: null,
        loading: false,
        switchChart: false,
        list: [],
        timeArray: [],    
        dialogFormVisible:false,//投放供应商渠道
		dialogChannel:false,//投放渠道条件
        remark:'',
        status:'',
        uid:'',
        timeNow:'',
		typeUp:'',//是否为编辑供应商
		channelType:"",//是否为编辑渠道
		supperList:[],//供应商列表
      }
    },
    mounted() {
		this.searchCondition.page = 1
        this.searchCondition.pageSize = 20
		this.getList();
    },
    methods: {
        // 列表数据
        getList() {
          var _this = this;
          _this.loading = true
          let data = {
            page: _this.searchCondition.page,
            pageSize: _this.searchCondition.pageSize,
          }
          if(_this.timeArray != null && _this.timeArray.length > 0){ 
            data['startTime'] = _this.timeArray[0];data['endTime'] = _this.timeArray[1]; 
            this.timeNow = data.startTime + '-------' + data.endTime
          }else{
            this.timeNow = new Date().toLocaleString();
          }
          getPutInChannels(data).then(res => {
            if(res.data.code==200){
							
              _this.countList = res.data.data;
              _this.list= res.data.data.list
              _this.total = res.data.data.total;
              _this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
          this.getList()
        },
		
        addRemarkBtn(id) {
            this.dialogFormVisible = true;
			getExtensionSupplier({sid:id}).then(res=>{
				this.form = res.data.data;
				this.typeUp = 1;
			})
        },
		addRemarkSure(){
			if(this.typeUp){
				upExtensionSupplier(this.form).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'编辑成功')
						this.dialogFormVisible = false;
						this.getList()
						this.form ={
							supplierName:'',
							contactsName:'',
							mobile:'',
							email:'',
							loginUser:'',
							loginPwd:'',
						}
						this.typeUp = '';
					}else{
						this.$message.error(res.data.msg || "网络开小差了")
					}
				})
			}else{
				addExtensionSupplier(this.form).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'添加成功')
						this.dialogFormVisible = false;
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了")
					}
				})
			}
		},
		closeBox(){
			this.form ={
				supplierName:'',
				contactsName:'',
				mobile:'',
				email:'',
				loginUser:'',
				loginPwd:'',
			}
			this.channelForm ={
				channelName:"",
				putInSplId:"",
				goodsUrl:"",
				from:"",
				putinUrl:"",
			}
		},
		//复制功能
		copyText() {
			 let _this = this;
			 let clipboard = new this.clipboard(".cobyOrderSn");
			 clipboard.on('success', function () {
			   _this.$message.success("复制成功")
			 });
			 clipboard.on('error', function () {
			   _this.$message.error("复制失败")
			 });
		},
		// 获取供应商列表
		getSuppliers(){
			getSuppliers().then(res=>{
				if(res.data.code ==200){
					this.supperList= res.data.data;
				}else{
					this.$message.error(res.data.msg || "获取供应商失败")
				}
			})
		},
		// 新增渠道
		newAddChannel(){
			this.dialogChannel = true;
			this.getSuppliers()
		},
		//编辑渠道
		addPutChannel(id){
			this.dialogChannel = true;
			getPutInChannel({cid:id}).then(res=>{
				this.channelForm = res.data.data;
				this.channelForm.cid=res.data.data.id;
				this.channelForm.putInSplId = parseInt(res.data.data.putInSplId)
				delete this.channelForm.id
				this.channelType = 1;
				this.getSuppliers()
			})
		},
		// 渠道保存
		addDialogChannel(){
			if(this.channelType){
				upPutInChannel(this.channelForm).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'编辑成功')
						this.dialogChannel = false;
						this.getList()
						this.channelForm ={
							channelName:"",
							putInSplId:"",
							goodsUrl:"",
							from:"",
							putinUrl:"",
						}
						this.channelType = '';
					}else{
						this.$message.error(res.data.msg || "网络开小差了")
					}
				})
			}else{
				addPutInChannel(this.channelForm).then(res=>{
					if(res.data.code == 200){
						this.$message.success(res.data.msg ||'添加成功')
						this.dialogChannel = false;
						this.getList()
					}else{
						this.$message.error(res.data.msg || "网络开小差了")
					}
				})
			}
		},
		// 拼参数
		locationHref(){
			if(this.channelForm.from !== ''){
				this.channelForm.putinUrl = this.channelForm.goodsUrl+'?from='+this.channelForm.from;
			}else{
				this.channelForm.putinUrl = this.channelForm.goodsUrl+this.channelForm.from;
			}
			
		},
		locationHost(){
			this.channelForm.putinUrl = this.channelForm.goodsUrl+'?from='+this.channelForm.from;
		},
    }
}
</script>
<style type="scss" scoped="scoped">
	.order_list{
		font-size: 1rem;
		color: #999;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
	.add_supper .el-input{width: 80%;}
</style>
