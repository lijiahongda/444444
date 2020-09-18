<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item>
				<el-button type="primary" @click="goAdd">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="" label="分销商名称" align="center" style="width: 240;">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_name" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="分销类型" align="center">
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.distribution_type" clearable placeholder="请选择">
							<el-option
							  :key="item.id"
							  :label="item.name"
							  :value="item.id"   v-for="item in priceType">
							</el-option>
							
						</el-select>
						<span  v-else>
							<span v-if="row.distribution_type==0">金额</span>
							<span v-if="row.distribution_type==1">利润比例</span>
							<span v-if="row.distribution_type==2">售价比例</span>
						</span>
						<!-- <span v-else>{{ row.distribution_type==0?'金额':'比例' }}</span> -->
					</template>
				</el-table-column>
				<el-table-column prop="" label="直推" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_first" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_first }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="注册" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_level0" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_level0 }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="399" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_level1" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_level1 }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="499" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_level2" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_level2 }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="" label="运营商" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_two" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_two }}</span>
					</template>
				</el-table-column>
				<el-table-column label="服务商" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_share" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_share }}</span>
					</template>
				</el-table-column>
				<el-table-column label="分公司	" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_company" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_company }}</span>
					</template>
				</el-table-column>
				<el-table-column label="自购	" align="center">
					<template slot-scope="{row}">
						<el-input v-if="row.edit"  v-model="row.distribution_self" class="edit-input" size="small" />
						<span v-else>{{ row.distribution_self }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="{row}" align="center">
							<el-button v-if="row.edit" type="text" size="small" @click="onConfirm(2,row)">保存</el-button>
							<el-button v-if="!row.edit" type="text" size="small" @click="row.edit=!row.edit">编辑</el-button>
							
							<el-button v-if="row.edit" type="text" size="small" @click="onCancel(row)">取消</el-button>

							<el-button type="text" size="small" @click="onDel(row)">删除</el-button>
					</template>
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
	import {getDistributions,addDistribution,updateDistribution,deleteDistribution} from '@/api/shops'

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
		  priceType:[{name:"金额",id:0},{name:"利润比例",id:1},{name:"售价比例",id:2}],

		//   <el-radio label="0" v-model="form.distribution_type">金额</el-radio>
		// 			<el-radio label="1" v-model="form.distribution_type">利润比例</el-radio>
		// 			<el-radio label="2" v-model="form.distribution_type">售价比例</el-radio>
		  distribution_name:'',
		  distribution_type:'',
		  distribution_first:'',
		  distribution_two:'',
		  distribution_share:'',
		  distribution_company:'',
		  distribution_self:'',
		  loading:true,
        }
    },
    created() {
        this.getList();
    },
    methods: {
       // 列表数据
       getList() {
		   getDistributions({page:`${this.pageIndex}`,dist_type:0}).then(res=>{
			    if(res.data.code==200){
			   			let dataList = res.data.data.result;
			   			this.list = dataList.map((item)=>{
			   				this.$set(item, 'edit', false);
			   				item.distribution_name_new = item.distribution_name;
			   				item.distribution_type_new = item.distribution_type;
			   				item.distribution_first_new = item.distribution_first;
			   				item.distribution_two_new = item.distribution_two;
			   				item.distribution_share_new = item.distribution_share;
			   				item.distribution_company_new = item.distribution_company;
			   				return item
			   			})
			   	this.total = res.data.data.total;
			   	this.pageTotal = res.data.data.count
				this.loading= false;
			   }
		   })
       },
	   //保存
		onConfirm(type,row){//type=1添加 type=2编辑
			var obj={};
			if(type == 2){
				row.edit = false;
				obj.distribution_name=row.distribution_name;
				obj.distribution_type=row.distribution_type;
				obj.distribution_first=row.distribution_first;
				obj.distribution_two=row.distribution_two;
				obj.distribution_share=row.distribution_share;
				obj.distribution_company=row.distribution_company;
				obj.distribution_self=row.distribution_self;
				obj.distribution_level0=row.distribution_level0;
				obj.distribution_level1=row.distribution_level1;
				obj.distribution_level2=row.distribution_level2;
				obj.dist_type=0;
				obj.id=row.id
			}
			updateDistribution(obj).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.pageIndex = 1
						this.getList()
					}else{
						this.$message({
							message: '编辑失败',
							type: 'error'
						});
					}
				})
		},
		// 删除
		onDel(row){
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				deleteDistribution({id:`${row.id}`,dist_type:0}).then(res=>{
					if(res.data.code==200){
						  this.$message({
							  message:"删除成功",
							  type:"success"
						  })
						  this.getList()
					}else{
					  this.$message({
						  message:"删除失败,请重试",
						  type:"error"
					  })
					}	
				})
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
        //取消
        onCancel(row){
        	row.edit = false;
			row.distribution_name = row.distribution_name_new;
			row.distribution_type = row.distribution_type_new;
			row.distribution_first = row.distribution_first_new;
			row.distribution_two = row.distribution_two_new;
			row.distribution_share = row.distribution_share_new;
			row.distribution_company = row.distribution_company_new;
        },
		goAdd(){
			this.$router.push("/newmall/distributionAdd")
		},
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
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
