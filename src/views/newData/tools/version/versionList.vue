<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="版本号">
				<el-input v-model="searchCondition.version" clearable placeholder="请输入版本号" />
			</el-form-item>
			<el-form-item label="版本类型">
				<el-select v-model="searchCondition.version_type" clearable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="模块类型">
				<el-select v-model="searchCondition.modular" clearable>
					<el-option v-for="item in modularOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<router-link target="_blank" :to="{path:'/tools/version/versionAdd'}">
					<el-button>新增版本控制</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table :data="list" :fit="true" border style="width: 100%">
			<el-table-column prop="version_type" label="版本类型" width="100" align="center">
				<template slot-scope="scope" align="center">
					{{scope.row.version_type == 1 ? 'ios' : 'Android'}}
				</template>
			</el-table-column>
			<el-table-column prop="version" label="版本号" width="100" align="center">
			</el-table-column>
			<el-table-column prop="modular" label="模块" width="100" align="center">
			</el-table-column>
			<!-- <el-table-column prop="modular" label="模块" width="100" align="center">
				<template slot-scope="scope" align="center">
					<span v-if="scope.row.modular == 1">商城</span>
					<span v-else-if="scope.row.modular == 2">酒店</span>
					<span v-else-if="scope.row.modular == 3">三方</span>
					<span v-else>个人中心</span>
				</template>
			</el-table-column> -->
			<el-table-column fixed="right" label="操作" align="center">
				<template slot-scope="scope" align="center">
					<router-link target="_blank" :to="{path:'/tools/version/versionAdd',query:{id:scope.row.id}}">
						<el-button type="text" size="small">编辑</el-button>
					</router-link>
					<!-- <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-size="searchCondition.limit" :total="commonTotal"
				background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>


		<!-- 
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-size="searchCondition.limit" :total="commonTotal"
				background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div> -->

	</div>
</template>
<script>
	import {
		getversionList
	} from '@/api/shops' // 接口

	// 订单状态
	// 支付状态发货状态

	// 订单来源
	// const orderSource = [
	//     { key: 1, display_name: '悦旅会APP' },
	//     { key: 2, display_name: '环球悦旅APP' },
	//     { key: 3, display_name: '悦店APP' },
	//     { key: 4, display_name: '大人APP' },
	//     { key: 5, display_name: '悦旅大人(小程序)' },
	// ]


	export default {
		data() {
			return {
				loading: false,
				formLabelWidth: '140px',
				form: {},
				searchCondition: {
					page: 1
				},
				options: [{
					value: '1',
					label: 'ios'
				}, {
					value: '2',
					label: 'Android'
				}],
				modularOptions: [{
					value: '1',
					label: '商城'
				}, {
					value: '2',
					label: '酒店'
				}, {
					value: '3',
					label: '三方'
				}, {
					value: '4',
					label: '个人中心'
				}, {
					value: '5',
					label: '主页'
				}],
				commonTotal: 0,
				commonList: [],
				total: 0,
				list: [],

			}
		},
		mounted() {
			this.getversionList();
		},
		methods: {
			// 列表数据
			getversionList() {
				getversionList(this.searchCondition).then(res => {
					if (res.data.code === 200) {
						this.list = res.data.data.list
						this.commonTotal = res.data.data.count

					} else {
						this.$message.error(res.data.msg);
						this.loading = false
					}
				})
			},
			onLine(id, is_online) {
				this.loading = true;
				let params = {
					id: id,
					is_online: is_online == 1 ? 0 : 1
				}
				updateLiveEventsIsOnline(params).then(res => {
					if (res.data.code === 200) {
						this.getversionList();
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			handleDelete(id) {
				console.log(444)
				this.loading = true;
				let params = {
					id: id
				}
				deleteLiveEvents(params).then(res => {
					if (res.data.code === 200) {
						this.getversionList();
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			onSubmit() {
				this.searchCondition.page = 1
				this.getversionList()
			},
			// 搜索
			handleFilter() {
				this.searchCondition.page = 1
			},
			// 分页
			handleSizeChange(val) {},
			handleCurrentChange(val) {
				this.searchCondition.page = val
				this.getversionList()
			}
		}
	}

</script>
<style type="scss" scoped="scoped">

</style>
