<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item >
                    <el-date-picker
                        v-model="searchCondition.start"
                        type = "date"
                        value-format="yyyy-MM-dd"
                        placeholder = "开始日期时间"
                        style = "width: 150px;" />
                    <el-date-picker
                        v-model="searchCondition.end"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期时间"
                        style="width: 150px;"/>
            </el-form-item>
            <!-- <el-form-item>
                    <el-select v-model="searchCondition.payStatus" placeholder="支付状态" clearable >
                    <el-option
                    v-for="item in payState"
                    :key="item.key" 
                    :label="item.display_name"
                    :value="item.key"
                    />
                </el-select>
            </el-form-item> -->
			
			<el-form-item >
			        <el-input
			            v-model="searchCondition.mobile"
			            placeholder="手机号" style="width: 300px;"/>
			</el-form-item>


            <el-form-item >
			        <el-input
			            v-model="searchCondition.orderNo"
			            placeholder="订单编号" style="width: 300px;"/>
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
<!-- 
            <el-table-column prop="" label="商品名称" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.goodsName ? scope.row.goodsName : '-' }}
                </template>
            </el-table-column>
			<el-table-column prop="" label="联系人" width="200" align="center">
			    <template slot-scope="scope">
			        {{scope.row.nickname ? scope.row.nickname : '-' }}
			    </template>
			</el-table-column> -->
			<el-table-column prop="" label="充值账号" width="120" align="center">
			    <template slot-scope="scope">
			        {{scope.row.memberMobile ? scope.row.memberMobile : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="实际支付金额" align="center" width="110">
			    <template slot-scope="scope">
			        {{scope.row.actual_price ? scope.row.actual_price : '-' }}
			    </template>
			</el-table-column>

			<el-table-column prop="" label="支付方式" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payType ? scope.row.payType : '-' }}
			    </template>
			</el-table-column>

            <el-table-column prop="" label="支付单号" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.pay_form_no ? scope.row.pay_form_no : '-' }}
                </template>
            </el-table-column>

            <el-table-column prop="" label="支付时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.payTime ? scope.row.payTime : '-' }}
                </template>
            </el-table-column>

             <el-table-column prop="" label="应支付金额" align="center">
                <template slot-scope="scope">
                    {{scope.row.total_money ? scope.row.total_money : '-' }}
                </template>
            </el-table-column>


            <el-table-column prop="" label="余额到账的钱" align="center">
                <template slot-scope="scope">
                    {{scope.row.charge_money ? scope.row.charge_money : '-' }}
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
import { getBalanceChargeOrderList} from '@/api/order' // 接口

export default {
    data() {
        return {
            searchCondition: {
                page: 1,
                orderNo:'',
                mobile:'',
                end:'',
				start:'',
				// payStatus:'',
				// keyword:"",
				
            },
            total: null,
            switchChart: false,
            list: [],
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        // 列表数据
        getList() {
            getBalanceChargeOrderList(this.searchCondition).then(res => {
                if (res.data.code === 200){
                    this.list = res.data.data
                    this.total = res.data.count
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
