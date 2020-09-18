<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="formSearch" :model="formSearch" label-width="120px" :inline="true">
			<el-form-item label="" prop="coupon_name">
				<el-input v-model="obj.keyword" placeholder="手机号/真实姓名" style="width:200px;" clearable @clear="clearInput"  @keyup.enter.native="handleFilter"  prefix-icon="el-icon-search"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table :data="list" :fit="true" border style="width: 100%;">
                <el-table-column fixed prop="id" label="ID" align="center">
				</el-table-column>
				<el-table-column fixed prop="mid" label="用户ID" align="center">
				</el-table-column>
				<el-table-column prop="nickName" label="昵称" align="center">
				</el-table-column>
				<el-table-column prop="trueName" label="真实姓名" align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" align="center" width="120">
				</el-table-column>
				<el-table-column prop="cardId" label="身份证" align="center">
				</el-table-column>
				<el-table-column prop="" label="认证" align="center">
					<template slot-scope="scope">
						<el-col v-html="scope.row.status == 0 ?  '未认证' : '已认证'"></el-col>
					</template>
				</el-table-column>
			
				<el-table-column fixed="right" label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onDetails(scope.row.id)" style="color: #0000CC;">详情</el-button>
						<!-- <el-button type="text" size="small" @click="identify(scope.row)" v-if="scope.row.isIdentifyCheck != 1" style="color: #444;">认证</el-button> -->

						<router-link target="_blank" :to="{path:'/operate/memberIdentifyInfo',query:{id:scope.row.id}}" style="color: #444;">认证</router-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[20]" :page-size="pageSize" :total="pageTotal" background
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
    // import {selectCoupon,switchCoupon,sendCoupon,getMemberIdentify} from '@/api/mall'
    import {getMemberIdentifys,getMemberIdentify} from '@/api/shops'


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
          obj:{
				page:this.pageIndex,
				keyword:'',
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
            getMemberIdentifys(this.obj).then(res=>{
                if(res.data.code==200)
                {
                    this.loading = false

					let dataList = res.data.data.list;
					this.list = dataList;
					this.pageTotal = res.data.data.total
				}
			})
        },
		 identify(item){
		    // localStorage.setItem('info',JSON.stringify(item))
			this.$router.push("/operate/memberIdentifyInfo?id="+item.id)
		},
		// 详情
		onDetails(id){
            this.dialogFormVisible= true
            this.loading = true
             getMemberIdentify({id:id}).then(res=>{
                if(res.data.code==200)
                {
                    this.loading = false
			        this.info = res.data.data
				}
			})
		},
        // 搜索
        handleFilter() {
			this.loading = true;
            this.obj.page = 1
			 this.getList()
        },
		clearInput(){
			this.loading = true;
			 this.obj.page = 1
			 this.getList()
		},
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
			this.loading = true;
            this.obj.page = val
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
