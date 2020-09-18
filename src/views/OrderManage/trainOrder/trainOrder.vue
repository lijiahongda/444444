<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item >
                    <el-date-picker
                        v-model="searchCondition.startTime"
                        type = "date"
                        value-format="yyyy-MM-dd"
                        placeholder = "下单日期时间"
                        style = "width: 150px;" />
                    <el-date-picker
                        v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="下单日期时间"
                        style="width: 150px;"/>
            </el-form-item>
            <el-form-item>
                    <el-select v-model="searchCondition.payStatus" placeholder="支付状态" clearable >
                    <el-option
                    v-for="item in payState"
                    :key="item.key" 
                    :label="item.display_name"
                    :value="item.key"
                    />
                </el-select>
            </el-form-item>
			
			<el-form-item >
			        <el-input
			            v-model="searchCondition.keyword"
			            placeholder="订单编号/支付单号/会员手机号" style="width: 300px;"/>
			</el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
                <el-button type="danger" @click="onEmpty">点我清空条件</el-button>
            </el-form-item>
        </el-form>
		
        <!--搜索部分-->
        <el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
           
            <el-table-column prop="" label="订单编号" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.orderNo ? scope.row.orderNo : '-' }}
                </template>
            </el-table-column>
           
            <el-table-column prop="" label="下单时间" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime ? scope.row.createTime : '-' }}
                </template>
            </el-table-column>
			<el-table-column prop="" label="支付单号" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payFormNo ? scope.row.payFormNo : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="支付方式" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payMode ? scope.row.payMode : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="实际支付金额" align="center" width="110">
			    <template slot-scope="scope">
			        {{scope.row.actualPay ? scope.row.actualPay : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="支付状态" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payStatus ? scope.row.payStatus : '-' }}
			    </template>
			</el-table-column>
            <el-table-column prop="" label="会员手机号" width="140" align="center">
                <template slot-scope="scope">
                    {{scope.row.memberMobile ? scope.row.memberMobile : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.orderStatus ? scope.row.orderStatus : '-' }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope" align="center">
                    <router-link :to="{path:'train-detail',query:{orderNo:scope.row.orderNo}}">
                        <el-button type="text" size="small">查看详情</el-button>
                    </router-link>
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
    </div>
</template>
<script>
import { getTrainOrders} from '@/api/order' // 接口

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
				payStatus:'',
				shippingStatus:'',
				orderSource:'',
				keyword:"",
				endTime:'',
				startTime:'',
            },
            total: null,
            payState, // 支付状态
            downloadLoading: false,
            tableData: [
                {date: "2018-10-01"}
            ],
            switchChart: false,
            list: [],
			orderCount:{}
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
            getTrainOrders(this.searchCondition).then(res => {
                if (res.data.code === 200){
                    this.list = res.data.data.list
                    this.total = res.data.data.total
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
