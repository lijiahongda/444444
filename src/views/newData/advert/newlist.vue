<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true"  v-if="!loading">
			<el-form-item>
				<el-button @click="addAdvertisingClick" type="primary">添加广告</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
			<el-table-column width="50px" prop="id" label="ID" align="center"></el-table-column>
			<el-table-column prop="business" label="业务模块" align="center"></el-table-column>
			<el-table-column prop="title" label="主标题" align="center"></el-table-column>
			<el-table-column prop="subTitle" label="副标题" align="center"></el-table-column>
			<el-table-column prop="type" label="类型" align="center"></el-table-column>
			<el-table-column prop="position" label="位置" align="center"></el-table-column>
			<el-table-column prop="image" label="地址" align="center">
				<template slot-scope="scope">
					<img style="width: 80%; height: 80px;" :src="scope.row.image" alt="">
				</template>
			</el-table-column>
			<el-table-column width="200px" prop="orderRefundTotal" label="生效时间" align="center">
				<template slot-scope="scope">
					{{scope.row.startDate}}至{{scope.row.endDate}}
				</template>
			</el-table-column>
			<el-table-column prop="refundTotal" width="200px" label="操作" align="center">
				<template slot-scope="scope">
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="!loading" class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:page-sizes="[10,20,30,40]"
				:page-size="searchCondition.pageSize"
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
    // import hotelCharts from './hotelCharts' // 图表
    // import { advertList,categoryLis,deleteAdvert} from '@/api/advert' // 接口
    import { advertList,deleteAdvert,categoryLis} from '@/api/order' // 接口

    export default {
        data() {
            return {
                addAdvertisingBtnName:'添加广告',
                searchCondition: {
                    page:1,
                    pageSize: 20
                },
                total: null,
                loading: false,
                list: [],
            }
        },
        created() {
            console.log(444444)
            this.searchCondition.page = 1
            this.searchCondition.pageSize = 20
            this.getList()
        },
        methods: {
            addAdvertisingClick(orderNo) {
                this.$router.push({ path: '/operate/update' })
            },
            // 列表数据
            getList() {
                this.loading = true
                advertList(this.searchCondition).then(res => {
                    if (res.data.code === 200){
                        this.list = res.data.data.list
                        this.total = res.data.data.total
                        this.loading = false
                    }
                })
            },
            //分页
            handleCurrentChange(val) {
                this.searchCondition.page = val
                this.getList()
            },
            handleSizeChange(val) {
                this.searchCondition.pageSize = val
                this.getList()
            },
            //广告编辑
            handleEdit(index, row) {
                this.$router.push({ path: '/operate/update', query: { id: row.id }})

            },
            //广告删除 deleteAdvert
            handleDelete(index, row) {
                let self = this;
                console.log(index, row);
                this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAdvert({ id:row.id }).then((res)=>{
                        if(res.data.code == 200){
                            self.$message.success("删除成功")
                            self.getList()
                        }
                        else{
                            self.$message.error(res.data.msg)
                        }
                    })
                }).catch(() => {
                    slef.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
<style type="scss">
</style>
