<template>
	<div class="page">
		<el-form style="margin-bottom:20px;" ref="form" :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-date-picker
					v-model="timeRang"
					type="daterange"
					range-separator="-"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd hh:mm:ss"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					clearable
				></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input v-model="selectOpt.goods_name" placeholder="商品名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="search" type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="tableData"
			v-loading="loading"
			style="width: 100%"
			border
			stripe
			:fit="true"
			@sort-change="handleSortChange"
			:row-class-name="tableRowClassName"
		>
			<el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
			<el-table-column
				prop="date"
				label="日期"
				align="center"
				width="120"
			></el-table-column>
			<el-table-column
				:sortable="'custom'"
				prop="show_times"
				label="展示次数"
				align="center"
				width="120"
			></el-table-column>

			<el-table-column
				:sortable="'custom'"
				prop="click_times"
				label="点击次数"
				align="center"
				width="120"
			></el-table-column>
			<el-table-column
				:sortable="'custom'"
				prop="orders_count"
				label="订单总量"
				align="center"
				width="120"
			></el-table-column>
			<el-table-column
				:sortable="'custom'"
				prop="goods_count"
				label="商品总数"
				align="center"
				width="120"
			></el-table-column>
			<el-table-column prop="price_count" label="价格" align="center" width="120"></el-table-column>
			<!-- <el-table-column :sortable="'custom'" prop="pay_time"  label="支付时间" align="center" width="180"></el-table-column> -->
			<el-table-column prop="status" label="当前状态" align="center" width="120"></el-table-column>
		</el-table>
		<div v-if="!loading" class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="selectOpt.page"
				:page-sizes="[10]"
				:page-size="selectOpt.pageSize"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script>
	import { getVideoTakeGoodsData } from '@/api/admin'

	export default {
		name: 'goodsList',
		data() {
			return {
				loading: true,
				custom: true,
				selectOpt: {},
				timeRang: [],
				dialogVisible: false,
				restaurants: [],
				state: '',
				timeout: null,
				tableData: [],
				pageSort: null // 排序，升序直接用字段名，降序用：字段名+空格+desc
			}
		},
		watch: {
			pageSort() {
				if (!this.loading) this.getList()
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList(val, num) {
				this.loading = true
				let params = {
					page: this.selectOpt.page,
					pageSize: 10,
					sort: this.pageSort,
					goods_name: this.selectOpt.goods_name
				}
				if (this.timeRang && this.timeRang.length) {
					params.startTime = this.timeRang && this.timeRang[0] ? this.timeRang[0] : ''
					params.endTime = this.timeRang && this.timeRang[1] ? this.timeRang[1] : ''
				}
				getVideoTakeGoodsData(params).then(res => {
					this.loading = false
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					console.log(res)
				})
			},
			search() {
				this.selectOpt.page = 1
				this.getList()
			},
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex === 1) {
					return 'warning-row'
				} else if (rowIndex === 3) {
					return 'success-row'
				}
				return ''
			},
			handleSortChange(obj) {
				// 排序，触发watch重新拉取数据。
				console.log(obj)
				if (obj.order === 'ascending') {
					this.pageSort = obj.prop + '_asc'
				} else if (obj.order === 'descending') {
					this.pageSort = obj.prop + '_desc'
				} else {
					this.pageSort = null
				}
			},
			//分页
			handleCurrentChange(val) {
				console.log(val)
				this.selectOpt.page = val

				this.getList()
			},
			handleSizeChange(val) {
				this.selectOpt.pageSize = val
				this.getList()
			},
			handleSelect(item) {
				console.log(item)
			}
		}
	}
</script>

<style scoped>
	.page {
		padding: 40px;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
