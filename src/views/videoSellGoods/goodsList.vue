<template>
	<div class="goodsList">
		<!--		<el-button type="plain" @click="linkGoods">关联商品</el-button>-->
		<el-input
			style="width:280px;"
			size="medium"
			placeholder="请输入视频标题"
			v-model="selectOpt.video_title"
			clearable
			@clear="clearSearch"
		>
		</el-input>
		<el-button type="plain" @click="getList">搜索</el-button>
		<el-button type="plain" @click="addProduct">新增视频商品</el-button>
		<el-table
			:data="tableData"
			v-loading="loading"
			style="width: 100%"
			border stripe :fit="true"

			:row-class-name="tableRowClassName">
			<el-table-column
				prop="video_id"
				label="视频ID"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="video_category_name"
				label="视频分类"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="video_title"
				label="视频标题"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="video_sort"
				label="视频排序"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				label="视频封面"
				align="center"
				width="180">
				<template slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						:src="scope.row.video_title_page"
						fit="contain"></el-image>
				</template>
			</el-table-column>
			<el-table-column
				prop="goods_name"
				label="关联商品名称"
				align="center"
			>
			</el-table-column>
			<el-table-column label="操作" width="180" align="center">
				<template slot-scope="scope">
					<el-button @click="edit(scope.row)">编辑</el-button>
					<el-button @click="delRow(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="!loading" class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="selectOpt.page"
				:page-sizes="[5,10,20]"
				:page-size="selectOpt.pageSize"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
		<el-dialog
			title="选择商品"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-select
				v-model="goodsName"
				filterable
				remote
				reserve-keyword
				placeholder="请输入关键词"
				:remote-method="remoteMethod"
				@change="getVal"
				:loading="loading1">
				<el-option
					v-for="(item,index) in goodsList"
					:key="index"
					:label="item.goods_name"
					:value="item.id">
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGoods">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { getVideoTakeGoodsList, addVideoTakeGoods, delVideoTakeGoods } from '@/api/admin'
	import { getTabGoods } from '@/api/order'

	export default {
		name: 'goodsList',
		data() {
			return {
				selectOpt: {
					pageSize: 10,
					video_title: ''
				},
				options: [],
				goodsName: [],
				loading: true,
				loading1: false,
				dialogVisible: false,
				restaurants: [],
				state: '',
				timeout: null,
				goodsList: [],
				tableData: [],
				selectVal: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			clearSearch() {
				this.selectOpt = {
					pageSize: 10,
					video_title: ''
				}
				this.getList()
			},
			addProduct() {
				this.$router.push({
					path: '/video-sellGoods/editVideoCargo',
					query: {
						type: 'add'
					}
				})
			},
			edit(row) {
				this.$router.push({
					path: '/video-sellGoods/editVideoCargo',
					query: {
						id: row.id,
						type: 'edit'
					}
				})
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading1 = true
					getTabGoods({
						video_no_channel_id: 'no_xingyun',
						goods_name: query
					}).then(res => {
						this.loading1 = false
						this.goodsList = res.data.data.filter(item => {
							return item.goods_name.indexOf(query) > -1
						})

					})
				} else {
					this.options = []
				}
			},
			getList() {
				getVideoTakeGoodsList(this.selectOpt).then(res => {
					this.tableData = res.data.data.list
					this.loading = false
					this.total = res.data.data.total
				})
			},
			delRow(row) {
				delVideoTakeGoods({ id: row.id, categoryName: row.video_category }).then(res => {
					if (res.data.code === 200) {
						this.$message.success(res.data.msg)
						this.getList()
					} else {
						this.$message.warning(res.data.msg)
					}

				})
			},
			tableRowClassName({ row, rowIndex }) {
				if (rowIndex === 1) {
					return 'warning-row'
				} else if (rowIndex === 3) {
					return 'success-row'
				}
				return ''
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done()
					})
					.catch(_ => {
					})
			},
			getVal(val) {
				let selectVal = this.goodsList.filter(item => {
					return val === item.id
				})
				console.log(selectVal)
				if (selectVal.length) {
					this.selectVal = selectVal
				}
			},
			addGoods() {
				let params = {
					goods_id: this.selectVal[0].id,
					goods_skuid: this.selectVal[0].sku_id,
					goods_name: this.selectVal[0].goods_name
				}
				addVideoTakeGoods(params).then(res => {
					if (res.data.code === 200) {
						this.$message.success(res.data.msg)
						this.loading = true
						this.getList()
						this.dialogVisible = false
					} else {
						this.$message.warning(res.data.msg)
					}
				})
			},
			//分页
			handleCurrentChange(val) {
				this.selectOpt.page = val
				this.getList()
			},
			handleSizeChange(val) {
				this.selectOpt.pageSize = val
				this.getList()
			},
			linkGoods() {
				this.goodsName = ''
				this.dialogVisible = true
			}
		}
	}
</script>

<style scoped>
	.goodsList {
		padding: 40px;
	}

	.goodsList > .el-button {
		margin-bottom: 20px;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.el-dialog .el-select {
		width: 100%;
	}
</style>
