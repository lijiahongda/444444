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
			<el-form-item >
				<el-input
					v-model="searchCondition.ordersn"
					placeholder="订单号/支付单号" style="width: 300px;"/>
			</el-form-item>

			<el-form-item >
				<el-input
					v-model="searchCondition.memberMobile"
					placeholder="会员手机号" style="width: 300px;"/>
			</el-form-item>
			<el-form-item >
				<el-input
					v-model="searchCondition.receiver"
					placeholder="收货人" style="width: 300px;"/>
			</el-form-item>

			<el-form-item >
				 <el-select v-model="searchCondition.refundStatus" placeholder="请选择" clearable>
						<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
				</el-select>
			</el-form-item>

			<el-form-item >
				 <el-select v-model="searchCondition.is_member_goods" placeholder="是否是会员大礼包" clearable>
						<el-option
						v-for="item in isMemberGoods"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
				<el-button type="danger" @click="onEmpty">点我清空条件</el-button>

				<router-link :to="{path:'/new-shopMall-service'}">
					<el-button type="success">前往新版</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
			<el-table-column fixed prop="product" label="物流单号" width="180" align="center">
				<template slot-scope="scope">
					{{scope.row.logisticeNumber ? scope.row.logisticeNumber : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="商品名称" width="200" align="center">
				<template slot-scope="scope">
					{{scope.row.goodsName ? scope.row.goodsName : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="订单编号" width="140" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.ordersnSon ? scope.row.ordersnSon : '-'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="" label="订单来源" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="" label="退款时间" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.refundTime ? scope.row.refundTime : '-' }}
				</template>
			</el-table-column> -->
			<el-table-column prop="" label="支付单号" width="100" align="center">
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

			<el-table-column prop="" label="优惠券抵扣" align="center" width="110">
				<template slot-scope="scope">
					{{scope.row.coupon_amount ? scope.row.coupon_amount : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="申请类型" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.refundType ? scope.row.refundType : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="下单时间" width="160" align="center">
				<template slot-scope="scope">
					{{scope.row.gcreatedAt ? scope.row.gcreatedAt : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="收货人" width="100" align="center">
				<template slot-scope="scope">
					{{scope.row.receiverName ? scope.row.receiverName : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="会员手机号" width="140" align="center">
				<template slot-scope="scope">
					{{scope.row.memberMobile ? scope.row.memberMobile : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="是否是大礼包" width="140" align="center">
				<template slot-scope="scope">
					{{scope.row.isMemberGoods ? scope.row.isMemberGoods : '-' }}
				</template>
			</el-table-column>

			<!-- <el-table-column prop="" label="备注信息" align="center">
				<template slot-scope="scope">
					{{scope.row.refundRemark ? scope.row.refundRemark : '-' }}
				</template>
			</el-table-column> -->

			<el-table-column prop="" label="申请时间" align="center" width="160">
				<template slot-scope="scope">
					{{scope.row.createTime ? scope.row.createTime : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="审核状态" align="center">
				<template slot-scope="scope">
					{{scope.row.refundCheckState ? scope.row.refundCheckState : '-' }}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template slot-scope="scope" align="center">
  					<router-link target="_blank" :to="{path:'refundOrder-detail',query:{ordersnSon:scope.row.ordersnSon}}">
                        <el-button type="text" size="small">查看详情</el-button>
                    </router-link>

					<!-- <el-button type="text" size="small" v-if="scope.row.refundStatus === 31" @click="handleApprove(scope.row)">审核</el-button> -->
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
  import { getServiceList,checkRefund} from '@/api/admin' // 接口
  import { getTabChannels} from '@/api/shops' // 接口

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
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
        dialogFormVisible: false,
        formLabelWidth: '140px',
		form: {},
        searchCondition: {
          page: 1
        },
        total: null,
        downloadLoading: false,
        tableData: [
          {date: "2018-10-01"}
        ],
        switchChart: false,
        list: [],
		orderCount:{},
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
      this.getTabChannels();
    },
    methods: {
      // 列表数据
      getList() {
        this.loading = true;
        getServiceList(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data.list
            this.total = res.data.data.total
            this.orderCount = res.data.data.countList
          }else{
            this.$message.error(res.data.msg)
		  }
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
	  //准备审核
      handleApprove(row){
        this.dialogFormVisible = true;
        this.form = row;
	  },
	  // 审核
      handleCheck(status){
        let params = {
          recordId: this.form.recordId,
          adminRefundContent: this.form.adminRefundContent,
          adminRefundPrice: this.form.adminRefundPrice,
          checkType: status,
          adminServiceType: this.form.adminServiceType,
        }
        checkRefund(params).then(res => {
          if (res.data.code === 200){
            this.$message.success('操作成功');
            this.dialogFormVisible = false;
            this.getList();
          }
        })
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
