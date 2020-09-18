<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item>
				<el-date-picker v-model="searchCondition.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="申请退款开始时间" />
				<el-date-picker v-model="searchCondition.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="申请退款结束时间" />
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchCondition.refundSetOrder" placeholder="结算单号" style="width: 300px;" />
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchCondition.ordersnSon" placeholder="子订单号" style="width: 300px;" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
				<el-button type="danger" @click="onEmpty">点我清空条件</el-button>
				<router-link v-if="role == 1" :to="{path:'/create-refund-order'}">
					<el-button type="success">添加退款结算单</el-button>
				</router-link>
				<router-link :to="{path:'/export-refund-list'}">
					<el-button type="success">财务导出入口</el-button>
				</router-link>
				<router-link :to="{path:'/refund-status-list'}">
					<el-button >审核状态查询</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table :data="list" :fit="true" border style="width: 100%">
			<el-table-column fixed prop="" label="序号" align="center">
				<template slot-scope="scope">
					{{scope.row.id ? scope.row.id : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="退款结算单编号" width="200" align="center">
				<template slot-scope="scope">
					{{scope.row.refundSetOrder ? scope.row.refundSetOrder : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="申请退款总额" width="160" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.appliedAmount ? scope.row.appliedAmount : '-'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="" label="审核通过退款总额" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.allowRefundAmount ? scope.row.allowRefundAmount : '-'}}</span>
				</template>
			</el-table-column>



			<el-table-column prop="" label="申请时间" width="160" align="center">
				<template slot-scope="scope">
					{{scope.row.createTime ? scope.row.createTime : '-' }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template slot-scope="scope" align="center">
					<router-link target="_blank" :to="{path:'refund-payment-detail',query:{id:scope.row.id}}">
						<el-button type="text" size="small">查看详情</el-button>
					</router-link>

				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-size="10" :total="total" background
				layout="total, prev, pager, next, jumper" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>

	</div>
</template>
<script>
	import {
		getRefundSettlementList,
		getAdminUserRole
	} from '@/api/admin' // 接口
	export default {
		data() {
			return {
				loading: true,
				dialogFormVisible: false,
				formLabelWidth: '140px',
				form: {},
				searchCondition: {
					page: 1
				},
				total: null,
				downloadLoading: false,
				tableData: [{
					date: "2018-10-01"
				}],
				role: '',
				list: [],
				orderCount: {},
				options2: [{
					value: '31',
					label: '待审核'
				}, {
					value: '35',
					label: '审核通过'
				}],
				isMemberGoods: [{
					value: '0',
					label: '否'
				}, {
					value: '1',
					label: '是'
				}],

			}
		},
		mounted() {
			this.getList();
			this.getAdminUserRole();
		},
		methods: {
			// 列表数据
			getList() {
				getRefundSettlementList(this.searchCondition).then(res => {
					if (res.data.code === 200) {
						this.list = res.data.data.list
						this.total = res.data.data.total
						this.orderCount = res.data.data.countList
						this.loading = false
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			getAdminUserRole() {
				getAdminUserRole().then(res => {
					if (res.data.code == 200) {
						this.role = res.data.roleType;
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			onSubmit() {
				this.searchCondition.page = 1
				this.getList()
			},
			onEmpty() {
				this.searchCondition = {
					page: 1,
				}
			},
			// 搜索
			handleFilter() {
				this.searchCondition.page = 1
			},
			// 分页
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.searchCondition.page = val
				this.getList()
			}
		}
	}

</script>
<style type="scss" scoped="scoped">
	.goodsName{
		display: block;
	}
	.order_list{
		margin: 30px 0;
		font-size: 1rem;
		color: #999;
		font-size: 16px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}

</style>
