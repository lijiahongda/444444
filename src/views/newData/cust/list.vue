<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="选择日期：">
				<el-col>
					<el-date-picker v-model="form.startTime" type="date" value-format="yyyy-MM-dd" placeholder="下单日期时间"
					 style="width: 150px;" />
					<el-date-picker v-model="form.endTime" type="date" value-format="yyyy-MM-dd" placeholder="下单日期时间" style="width: 150px;" />
				</el-col>
			</el-form-item>
			<el-form-item label="定制">
				<el-col>
					<el-select v-model="form.type" placeholder="类型" style="width: 300px;">
						<el-option v-for="item in personType" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="状态">
				<el-col>
					<el-select v-model="form.status" placeholder="状态" style="width: 300px;">
						<el-option v-for="item in payState" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="收货人电话：">
				<el-col>
					<el-input v-model="form.params" placeholder="请输入入住人手机号" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<el-button type="danger" @click="onEmpty">清空</el-button>
				<div class="pan-btn " v-if="false">
					<el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
				</div>
				<!-- <div class="pan-btn yellow-btn" @click="() => { switchChart = !switchChart}">查看图表</div> -->
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="id" label="编号" align="center">
				</el-table-column>
				<el-table-column prop="contacts" label="联系人"  align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="联系方式	" align="center">
				</el-table-column>
				<el-table-column prop="leavecity" label="出发地" align="center">
				</el-table-column>
				<el-table-column prop="aimcity" label="目的地" align="center">
  				</el-table-column>
				<el-table-column prop="starttime" label="开始时间" width="160" align="center">
				</el-table-column>
				<el-table-column prop="endtime" label="结束时间" width="160" align="center">
				</el-table-column>
				<el-table-column prop="budget" label="预算" align="center" width="120">
				</el-table-column>
				<el-table-column prop="" label="类型" width="120" align="center">
					<template slot-scope="scope">
						{{scope.row.type == 1 ? '私人定制' : '企业定制' }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="企业名称" width="100" align="center">
					<template slot-scope="scope">
						{{scope.row.enterprise_name == '' || scope.row.enterprise_name == null ? '-' : scope.row.enterprise_name }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="状态" width="100" align="center">
					<template slot-scope="scope">
						<el-col v-if="scope.row.status == 0"  style="color:red">待审核</el-col>
						<el-col v-if="scope.row.status == 1"  style="color:green">已审核</el-col>
						<el-col v-if="scope.row.status == 2"  style="color:blue">已完成</el-col>
					</template>
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="100" align="center">
					<template slot-scope="scope" align="center">
						<router-link :to="{path:'/cust/show',query:{id:scope.row.id}}">
							<el-button type="text" size="small">编辑</el-button>
						</router-link>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal"
			 background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import { custListUrl } from '@/api/cust' // 接口

// 处理状态
const payState = [
    { key: 0, display_name: '待处理' },
    { key: 1, display_name: '已处理' },
    { key: 2, display_name: '已完成' }
]
// 定制类型
const personType = [
    { key: 1, display_name: '私人定制' },
    { key: 2, display_name: '企业定制' }
]

// 是否会员
const isMember = [
    { key: '是', display_name: '是' },
    { key: '否', display_name: '否' }
]

export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
            payState, // 支付状态
            isMember, // 是否会员
			phone:'',
			personType,
            switchChart: false,
            list: [],
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  form:{
			  type:'',
			  startTime:'',
			  endTime:'',
			  params:'',
			  status:''
		  },
		  loading:true,
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
			let data = `/p=${this.form.params}&st=${this.form.startTime}&et=${this.form.endTime}&type=${this.form.type}&status=${this.form.status}/${this.pageIndex}/${this.pageSize}`;
			custListUrl(data).then(res=>{
				console.log(res.data.data,"res")
				this.list = res.data.data;
				this.total = res.data.total;
				this.pageTotal = parseInt(res.data.total) * parseInt(this.pageSize);
				this.loading = false;
			})
        },
        onSubmit() {
            this.pageIndex = 1
            this.getList()
        },
        onEmpty() {
            this.pageIndex =1;
			this.form={
				type:'',
				startTime:'',
				endTime:'',
				params:'',
				status:''
			}
			this.getList()
        },
        // 搜索
        handleFilter() {
            this.pageIndex = 1
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
			this.loading = true;
            this.pageIndex = val;
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
