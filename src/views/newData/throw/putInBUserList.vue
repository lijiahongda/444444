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
				<el-table-column prop="userName" label="姓名" align="center">
				</el-table-column>
				<el-table-column prop="userMobile" label="手机号" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="时间" align="center" >
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center" >
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import {getPutInBUserList} from '@/api/throw'
export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
            switchChart: false,
            list: [],
			pageTotal:0,   //显示页数
			pageIndex:1,
			pageSize:10,
		
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
            getPutInBUserList(this.obj).then(res=>{
                if(res.data.code==200)
                {
                    this.loading = false
					let dataList = res.data.data.list;
					this.list = dataList;
					this.pageTotal = res.data.data.total
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
