<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="formSearch" :model="formSearch" label-width="120px" :inline="true">
			<el-form-item label="" prop="coupon_name">
				<el-input v-model="select.keyCode" placeholder="手机号/真实姓名" style="width:200px;" clearable @clear="clearInput"  @keyup.enter.native="handleFilter"  prefix-icon="el-icon-search"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
				<router-link to="/operate/memberIdentifyList">
					<el-button type="primary">认证失败用户</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="mid" label="ID" align="center">
				</el-table-column>
				<el-table-column prop="nickName" label="微信昵称" align="center">
				</el-table-column>
				<el-table-column prop="trueName" label="真实姓名" align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center" width="120">
				</el-table-column>
				<el-table-column prop="cardId" label="身份证" align="center">
				</el-table-column>
				<el-table-column prop="" label="认证" align="center">
					<template slot-scope="scope">
						<el-col v-html="scope.row.isIdentifyCheck == 0 ?  '未认证' : '已认证'"></el-col>
					</template>
				</el-table-column>
				<el-table-column prop="" label="绑定" align="center">
					<template slot-scope="scope">
						<el-col v-html="scope.row.isBind == 0 ? '未绑定' : '已绑定'"></el-col>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onDetails(scope.row.mid)" style="color: #0000CC;">详情</el-button>
						<el-button type="text" size="small" @click="identify(scope.row)" v-if="scope.row.isIdentifyCheck != 1" style="color: #444;">认证</el-button>
						<el-button type="text" size="small" v-if="scope.row.isBind != 0"  @click="certification(scope.$index,scope.row)" style="color: #f00;">解绑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<el-dialog :title="titleName" :visible.sync="dialogFormVisible">
			<el-form :model="info">
				<el-form-item label="手机号:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.mobile ? info.mobile : '-' }}</span>
				</el-form-item>
				<el-form-item label="真实姓名:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.trueName ? info.trueName : "-"}}</span>
				</el-form-item>
				<el-form-item label="身份证号码:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.cardId ? info.cardId : '-'}}</span>
				</el-form-item>
				<el-form-item label="身份:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.identifyInfo ? info.identifyInfo : '-'}}</span>
				</el-form-item>
				<el-form-item label="认证时间:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.identifyTime}}</span>
				</el-form-item>
				<el-form-item label="注册时间:" :label-width="formLabelWidth" class="formLine">
					<span class="cont">{{info.joinTime}}</span>
				</el-form-item>
				<el-form-item label="身份证正面:" :label-width="formLabelWidth" class="formLine">
					 <img v-show="info.frontImg" :src="info.frontImg" style="width:100%">
				</el-form-item>
				<el-form-item label="身份证反面:" :label-width="formLabelWidth" class="formLine">
				    <img v-show="info.backImg" :src="info.backImg" style="width:100%">
				</el-form-item>
				<el-form-item label="手持身份证:" :label-width="formLabelWidth" class="formLine">
					<img v-show="info.thirdImg" :src="info.thirdImg" style="width:100%">
				</el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm(form.adminUserName)">确 定</el-button>
			</div> -->
		</el-dialog>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {selectCoupon,switchCoupon,sendCoupon} from '@/api/mall'
	import {memberDetail} from '@/api/admin'


export default {
    directives: {
        waves
    },
    data() {
        return {
			// 默认列表条件
			select: {
			  page: 1,
			  pageSize: 20,
			  keyCode:''
			},
			// 获取用户详情
			info:{
				trueName: '',
				cardId: '',
				frontImg: '',
				backImg: '',
				thirdImg: '',
				mid: 0,
			},
			dialogFormVisible: false,
            total: null,
            switchChart: false,
            list: [],
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  formSearch:{
			  keyCode:""//条件
		  },
		  loading:true,
		  formLabelWidth:"92px",
		  titleName:"实名认证"
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
			this.loading = true
			let url = `http://kylin.api.yuelvhui.com/api/member/identify/getList/${this.select.keyCode ? this.select.keyCode : 0}/${this.select.pageSize}/${this.select.page}`;
			this.axios({
			  method: "get",
			  url: url,
			  responseType: "json"
			}).then(res => {
			    if (res.data.code == 200) {
			      this.loading = false
			      this.select.pageSize = res.data.data.pageSize;
			      this.pageTotal = res.data.data.totalPage;
			      this.list = res.data.data.list
			    }
			  }).catch(error => {
			    console.log(error)
			  });
			
        },
		 identify(item){
		    localStorage.setItem('info',JSON.stringify(item))
			this.$router.push("/operate/memberIdentify")
		},
		// 详情
		onDetails(id){

			this.dialogFormVisible= true
			this.loading = true
			memberDetail({mid:id}).then(res=>{
				this.loading = false
			    this.info = res.data.data
			})



			// this.dialogFormVisible= true
			// this.loading = true
			//     let url= "http://kylin.api.yuelvhui.com/api/member/identify/detail/" + id
			//     this.axios({
			//         method: "get",
			//         url: url,
			//     }).then(res => {
			//     if (res.data.code == 200) {
			//         this.loading = false
			//         this.info = res.data.data
			//     }
			//     }).catch(error => {
			//         console.log(error)
			//     });
		},
		// 解绑
		certification(index, item) {
		    let self = this;
		    self.$confirm(`是否确认解绑手机号${item.mobile}与微信${item.nickName ? item.nickName : '' }的绑定关系?`, '提示', {
		      confirmButtonText: '确定',
		      cancelButtonText: '取消',
		      type: 'warning'
		    }).then(() => {
		        let url = `http://kylin.api.yuelvhui.com/api/member/WeiXin/weiXinUntying`;
		        self.axios({
		            method: "post",
		            url: url,
		            data: { mid: item.mid },
		            responseType: "json"
		        })
		        .then(res => {
		        if (res.data.code == 200) {
		            self.$message({
		                type: 'info',
		                message: '解绑成功'
		            });
		        }
		        })
		        .catch(error => {
		            console.log(error)
		        });
		    }).catch(() => {
		      self.$message({
		        type: 'info',
		        message: '已取消解绑'
		      });
		    });
		},
        // 搜索
        handleFilter() {
			this.loading = true;
            this.select.page = 1
			 this.getList()
        },
		clearInput(){
			this.loading = true;
			this.select.page = 1
			 this.getList()
		},
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
			this.loading = true;
            this.select.page = val;
            this.getList()
        }
    }
}
</script>
<style type="scss" scoped="scoped">
	.goodsName{
        display: block;
    }
	.formLine{width: 48%;display: inline-block;}
</style>
