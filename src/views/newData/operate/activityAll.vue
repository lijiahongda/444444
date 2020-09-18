<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="活动名称：">
				<el-col>
					<el-input v-model="obj.keyword" placeholder="请输入活动名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<router-link to="/operate/activityAllAdd">
					<el-button type="primary">添加活动</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="id" label="活动ID" align="center">
				</el-table-column>
				<el-table-column fixed prop="aa_name" label="活动名称" align="center">
				</el-table-column>
				<el-table-column fixed prop="aa_type_name" label="活动类型" align="center">
				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope" align="center">
						<span>{{scope.row.is_online==0?'下线':'上线'}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="updateIsOnline(scope.row,scope.$index)">{{scope.row.is_online==0?'开启':'关闭'}}</el-button>
						<el-button type="text" size="small" @click="onEdit(scope.row.id)">背景图编辑</el-button>
						<el-button type="text" size="small" @click="onEditOld(scope.row.id)">非背景图编辑(old)</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="obj.page" :page-size="10" :total="total" background layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"  @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getActivityAlls,ActiveupdateIsOnline} from '@/api/shops'
import { constants } from 'crypto';
export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
            list: [],
			pageIndex:1,
			obj:{
				page:this.pageIndex,
				keyword:'',
			}
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
			getActivityAlls(this.obj).then(res=>{
				if(res.data.code==200){
					this.list = res.data.data;
					this.total = res.data.count;
				}
			})
		},
		onEdit(id){
			this.$router.push('/operate/activitySession?id='+id)
		},
      onEditOld(id){
        this.$router.push('/operate/activityAllTemplate_back?id='+id)
      },
		//搜索
		onSearch(){
			this.obj.page = 1;
			this.getList()
		},
		// 开启 关闭
		updateIsOnline(row,idx){
			var data = {
				id:row.id,
			}
			if(row.is_online==0){
				data.is_online=1
			}else{
				data.is_online=0
			}

			ActiveupdateIsOnline(data).then(res=>{
				if(res.data.code==200){
					this.$message({
						message:"编辑成功",
						type:"success"
					})
					this.list[idx].is_online=!row.is_online
				}else{
					this.$message({
						message:res.data.msg,
						type:"none"
					})
				}
			})
		},
        // 分页
        handleSizeChange(val) {
			this.obj.page= 1;
			this.getList()
		},
        handleCurrentChange(val) {
            this.obj.page = val
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
