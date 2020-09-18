<!--suppress ALL -->
<template>
    <div class="app-container" v-loading="loading">
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

			<el-form-item>
			        <el-select v-model="searchCondition.orderSource" placeholder="订单来源" clearable >
			        <el-option
			        v-for="item in orderSource"
			        :key="item.id"
			        :label="item.name"
			        :value="item.id"
			        />
			    </el-select>
			</el-form-item>

			<el-form-item >
			        <el-input
			            v-model="searchCondition.keyword"
			            placeholder="商品名称/订单编号/支付单号/收货人/会员手机号" style="width: 300px;"/>
			</el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
                <el-button type="danger" @click="onEmpty">点我清空条件</el-button>
            </el-form-item>
        </el-form>
		<el-row :gutter="20" class="order_list">
			<el-col class="sku_num">所有订单：<span>{{total}}</span></el-col>
			<el-col class="sku_num">未支付：<span>{{orderCount.nopayCount}}</span></el-col>
			<el-col class="sku_num">已支付：<span>{{orderCount.payCount}}</span></el-col>
			<el-col class="sku_num">待发货：<span>{{orderCount.noSendCount}}</span></el-col>
			<el-col class="sku_num">已发货：<span>{{orderCount.sendCount}}</span></el-col>
			<el-col class="sku_num">已签收：<span>{{orderCount.alreadySignedCount}}</span></el-col>
		</el-row>
        <!--搜索部分-->
        <el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
            <el-table-column fixed prop="product" label="商品名称" width="150" align="center">
				<template slot-scope="scope">
					<p v-for="item in scope.row.products" v-html='item.name'></p>
				</template>
            </el-table-column>
            <el-table-column prop="" label="订单编号" width="155" align="center">
                <template slot-scope="scope">
                    {{scope.row.orderNo ? scope.row.orderNo : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单来源" width="80" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单类型" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.orderType ? scope.row.orderType : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="下单时间" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime ? scope.row.createTime : '-' }}
                </template>
            </el-table-column>
             <el-table-column prop="" label="规格" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.goodsSpec ? scope.row.goodsSpec : '-'}}</span>
                </template>
            </el-table-column>
			<!-- <el-table-column prop="" label="支付单号" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payFormNo ? scope.row.payFormNo : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="支付方式" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payType ? scope.row.payType : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="实际支付金额" align="center" width="110">
			    <template slot-scope="scope">
			        {{scope.row.actualPayPrice ? scope.row.actualPayPrice : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="支付状态" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.payStatus ? scope.row.payStatus : '-' }}
			    </template>
			</el-table-column> -->
            <el-table-column prop="" label="收货人" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.receiverName ? scope.row.receiverName : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="" label="会员手机号" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.memberMobile ? scope.row.memberMobile : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="" label="订单状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.orderStatus ? scope.row.orderStatus : '-' }}
                </template>
            </el-table-column>

             <el-table-column prop="" label="备注" align="center">
                <template slot-scope="scope">
                    {{scope.row.sendRemark ? scope.row.sendRemark : '-' }}
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope" align="center">
                    <router-link :to="{path:'shopMall-detail',query:{orderNo:scope.row.orderNo}}" target="_blank">
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
import { getIntegralOrders} from '@/api/order' // 接口
import { getTabChannels} from '@/api/shops' // 接口

// 订单状态
// 支付状态
const payState = [
    { key: 0, display_name: '待支付' },
    { key: 1, display_name: '已支付' },
]
// 发货状态
const hairState = [
    { key: 0, display_name: '待发货' },
    { key: 1, display_name: '已发货' },
    { key: 2, display_name: '部分发货' },
]
// 订单来源
// const orderSource = [
//     { key: 1, display_name: '悦旅会APP' },
//     { key: 2, display_name: '环球悦旅APP' },
//     { key: 3, display_name: '悦店APP' },
//     { key: 4, display_name: '大人APP' },
//     { key: 5, display_name: '悦旅大人(小程序)' },
// ]
// 订单类型
const orderType = [
    { key: 0, display_name: '普通' },
    { key: 1, display_name: '拼团' },
    { key: 2, display_name: '砍价' },
    { key: 3, display_name: '秒杀' },
    { key: 4, display_name: '半价' },
    { key: 5, display_name: '积分兑换' }
]
// 是否会员
const isMember = [
    { key: '是', display_name: '是' },
    { key: '否', display_name: '否' }
]

export default {
    data() {
        return {
            searchCondition: {
                page: 1,
				payStatus:'',
				shippingStatus:'',
				orderSource:'',
				orderType:'',
				keyword:"",
				endTime:'',
				startTime:'',
            },
		  loading: false,
            total: null,
            payState, // 支付状态
            isMember, // 是否会员
			hairState,//发货状态
			orderSource:[],//订单来源
			orderType,//订单类型
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
		this.getTabChannels();
    },
    methods: {
        // 列表数据
        getList() {
          this.loading = true;
            getIntegralOrders(this.searchCondition).then(res => {
                if (res.data.code === 200){
                  this.loading = false;
                    this.list = res.data.data.list
                    this.total = res.data.data.total
					this.orderCount = res.data.data.countList
                }
            }).finally(()=>{
              this.loading = false;
			})
        },
		// 推广渠道
		getTabChannels(){
			getTabChannels().then(res=>{
				console.log(res)
				this.orderSource = res.data;
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
        // 导出
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
                const filterVal = [
                'id',
                'title',
                'author',
                'pageviews',
                'display_time'
                ]
                const list = this.list
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.filename,
                autoWidth: this.autoWidth,
                bookType: this.bookType
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                })
            )
        },
        // 查看详情
        handleClick(orderNo) {
            this.$router.push({ path: '/shopMall-detail', query: { orderNo: orderNo }})
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
