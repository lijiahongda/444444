<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
            <el-form-item >
                    <el-date-picker
                        v-model="searchCondition.startTime"
                        type = "date"
                        value-format="yyyy-MM-dd"
                        placeholder = "开始日期时间"
                        style = "width: 150px;" />
                    <el-date-picker
                        v-model="searchCondition.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期时间"
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
			            v-model="searchCondition.mobile"
			            placeholder="手机号" style="width: 300px;"/>
			</el-form-item>

            <el-form-item >
			        <el-input
			            v-model="searchCondition.orderNumber"
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
                    {{scope.row.orderSn ? scope.row.orderSn : '-' }}
                </template>
            </el-table-column>

             <el-table-column prop="" label="支付单号" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.payFormNo ? scope.row.payFormNo : '-' }}
                </template>
            </el-table-column>
			<el-table-column prop="" label="退款状态" width="200" align="center">
				<template slot-scope="scope">
					{{scope.row.refundStatus ? scope.row.refundStatus : '-' }}
				</template>
			</el-table-column>
            <el-table-column prop="" label="商品名称" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.goodsName ? scope.row.goodsName : '-' }}
                </template>
            </el-table-column>
			<el-table-column prop="" label="联系人" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.nickname ? scope.row.nickname : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="充值账号" width="120" align="center">
			    <template slot-scope="scope">
			        {{scope.row.mobile ? scope.row.mobile : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="销售金额" align="center" width="110">
			    <template slot-scope="scope">
			        {{scope.row.totalAmount ? scope.row.totalAmount : '-' }}
			    </template>
			</el-table-column>
			<el-table-column prop="" label="成本" width="100" align="center">
			    <template slot-scope="scope">
			        {{scope.row.orderAmount ? scope.row.orderAmount : '-' }}
			    </template>
			</el-table-column>
            <el-table-column prop="" label="充值时间" width="160" align="center">
                <template slot-scope="scope">
                    {{scope.row.payTime ? scope.row.payTime : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="" label="支付状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.payStatus ? scope.row.payStatus : '-' }}
                </template>
            </el-table-column>

              <el-table-column width="160" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.payStatusNum != 2" type="primary"  @click="refundFinish(scope.row.orderSn)">处理退款完成</el-button>
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
		<el-dialog
			title="处理退款完成"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-upload
				class="avatar-uploader"
				action="https://api2.yuelvhui.com/app/third/upload"
				:show-file-list="false"
				:on-success="(res)=> form.finishImg = res.url"
				:before-upload="beforeUpload">
				<img v-if="form.finishImg" :src="form.finishImg" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="changeCarRechargeRefundFinish">确 定</el-button>
		  </span>
		</el-dialog>

    </div>
</template>
<script>
import { getCarRechargeList,changeCarRechargeRefundFinish} from '@/api/order' // 接口

export default {
    data() {
        return {
          dialogVisible:false,
            searchCondition: {
                page: 1,
                orderNumber:'',
                mobile:'',
				endTime:'',
                startTime:'',
                // payStatus:'',
				// keyword:"",
            },
		  form:{
            finishImg:''
		  },
          payState:[
			{
              display_name:'支付成功',
              key:'1',
			},
            {
              display_name:'已退款',
              key:'2',
            },
            {
              display_name:'已完成',
              key:'3',
            },
            {
              display_name:'退款中',
              key:'4',
            },
            {
              display_name:'退款失败',
              key:'5',
            },
		  ],
            total: null,
            switchChart: false,
            list: [],
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
      refundFinish(orderSn){
        this.form.orderSn = orderSn;
        this.dialogVisible = true;
	  },
      handleClose(){
        this.from = {}
      },
      beforeUpload(file) {
        if (file.size / 1024 > 300) {
          this.$message({
            message: "图片请保持在300KB以内",
            type: 'error',
          })
          return false
        }
      },
      changeCarRechargeRefundFinish() {
        changeCarRechargeRefundFinish(this.form).then(res => {
          if (res.data.code === 200){
            this.dialogVisible = false;
            this.$message.success(res.data.msg)
            this.getList();
          }else{
            this.$message.error(res.data.msg)
		  }
        })
      },
        // 列表数据
        getList() {
            getCarRechargeList(this.searchCondition).then(res => {
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
