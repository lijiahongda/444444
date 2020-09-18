<!--suppress ALL -->
<template>
    <div class="app-container">
    
        <!--搜索部分-->
        <el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 98%">
           
            <el-table-column prop="" label="时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.date ? scope.row.date : '-' }}
                </template>
            </el-table-column>

			<el-table-column prop="" label="总订单数" align="center">
			    <template slot-scope="scope">
			        {{scope.row.totalNumber ? scope.row.totalNumber : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="加油收入" width="110">
			    <template slot-scope="scope">
			        {{scope.row.totalAmount ? scope.row.totalAmount : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="优惠金额" align="center">
			    <template slot-scope="scope">
			        {{scope.row.subsidyAmount ? scope.row.subsidyAmount : '-' }}
			    </template>
			</el-table-column>
            <el-table-column prop="" label="总收入" align="center">
                <template slot-scope="scope">
                    {{scope.row.orderAmount ? scope.row.orderAmount : '-' }}
                </template>
            </el-table-column>
        
        </el-table>

        <div class="pagination-container" style="text-align:right;">
        <el-pagination
            :current-page="searchCondition.page"
            :page-sizes="[20]"
            :page-size="searchCondition.limit"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        </div>

        <el-table v-if="!switchChart" :data="list2" :fit="true" border style="width: 98%;margin-top:30px">
    
            <el-table-column prop="" label="用户"  align="center">
                <template slot-scope="scope">
                    {{scope.row.nickname ? scope.row.nickname : '-' }}
                </template>
            </el-table-column>

            <el-table-column prop="" label="加油次数" align="center">
                <template slot-scope="scope">
                    {{scope.row.count ? scope.row.count : '-' }}
                </template>
            </el-table-column>
			<el-table-column prop="" label="加油总金额" align="center">
			    <template slot-scope="scope">
			        {{scope.row.totalAmount ? scope.row.totalAmount : '-' }}
			    </template>
			</el-table-column>
        </el-table>

        <div class="pagination-container" style="text-align:right;">
            <el-pagination
                :current-page="searchCondition.page"
                :page-sizes="[20]"
                :page-size="searchCondition.limit"
                :total="total2"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
            />
        </div>

    </div>
</template>
<script>
import { getCarMonthRecharge,getCarRechargeDetail} from '@/api/order' // 接口

// 订单状态
// 支付状态
const payState = [
    { key: 0, display_name: '待支付' },
    { key: 1, display_name: '已支付' },
]
export default {
    data() {
        return {
            searchCondition: {
                page: 1,
				// payStatus:'',
				// keyword:"",
				// endTime:'',
				// startTime:'',
            },
             searchCondition2: {
                page: 1,
				// payStatus:'',
				// keyword:"",
				// endTime:'',
				// startTime:'',
            },
            total: null,
            total2: null,
            payState, // 支付状态
            downloadLoading: false,
            tableData: [
                {date: "2018-10-01"}
            ],
            switchChart: false,
            list: [],
            list2: [],
        }
    },
    mounted() {
        this.getList();
        this.getCarRechargeDetail();
    },
    methods: {
        // 列表数据
        getList() {
            getCarMonthRecharge(this.searchCondition).then(res => {
                if (res.data.code === 200){
                    this.list = res.data.data
                    this.total = res.data.count
                }
            })
        },

         getCarRechargeDetail() {
            getCarRechargeDetail(this.searchCondition2).then(res => {
                if (res.data.code === 200){
                    this.list2 = res.data.data
                    this.total2 = res.data.count
                }
            })
        },

        onSubmit() {
            this.searchCondition.page = 1
            this.getList()
        },
        onEmpty() {
            this.searchCondition = {
                page:1,
            }
        },
        // 搜索
        handleFilter() {
            this.searchCondition.page = 1
        },
        
        // 查看详情
        handleClick(orderNo) {
            this.$router.push({ path: '/train-detail', query: { orderNo: orderNo }})
        },
        // 分页
        handleSizeChange(val) {},
        handleCurrentChange(val) {
            this.searchCondition.page = val
            this.getList()
        },

        handleSizeChange2(val) {},
        handleCurrentChange2(val) {
            this.searchCondition2.page = val
            this.getCarRechargeDetail()
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
