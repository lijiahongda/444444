<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form :label-width="formLabelWidth" inline>
			<el-form-item label="客服审核状态">
				<el-select v-model="searchCondition.checkStatus" placeholder="退款类型" clearable >
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="子订单号">
				<el-input v-model="searchCondition.ordersnSon" placeholder="子订单号" clearable></el-input>
			</el-form-item>
			<el-form-item label="结算单号">
				<el-input v-model="searchCondition.refundSetOrder" placeholder="结算单号" clearable></el-input>
			</el-form-item>
			<el-form-item  label="退款状态">
				<el-select v-model="searchCondition.refundStatus" placeholder="退款状态" clearable>
					<el-option
						v-for="item in searchOpts.refundStatus"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-button type="primary" @click="searchList">搜索</el-button>
		</el-form>


		<!--搜索部分-->
		<el-table :data="list.list" :fit="true" border  style="width: 100%">
			<el-table-column  prop="" label="id"  align="center" width="80">
				<template slot-scope="scope">
					{{scope.row.id ? scope.row.id : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="ordersnSon" label="子单号"  align="center"  width="200"></el-table-column>
			<el-table-column prop="payFormNo" label="支付单号"  align="center"  width="200"></el-table-column>
			<el-table-column prop="adminRefundPrice" label="商品需退款金额(含运费)"  align="center"></el-table-column>
			<el-table-column prop="freight" label="要打款的运费"  align="center"></el-table-column>
			<el-table-column prop="mchId" label="商户号"  align="center"  width="200"></el-table-column>
			<el-table-column prop="payType" label="支付方式"  align="center"  width="200"></el-table-column>
			<el-table-column prop="goodsName" label="商品名"  align="center"  width="200"></el-table-column>
			<el-table-column prop="orderDownTime" label="下单时间"  align="center"  width="200"></el-table-column>
			<el-table-column prop="payTime" label="支付时间"  align="center"  width="200"></el-table-column>
			<el-table-column prop="supplierName" label="供应商名称"  align="center"  width="200"></el-table-column>
			<el-table-column prop="checkStatus" label="审核状态"  align="center" width="120"></el-table-column>
			<el-table-column prop="refundData" label="退款失败原因"  align="center"  width="200"></el-table-column>
			<el-table-column prop="refundType" label="退款类型"  align="center"></el-table-column>
			<el-table-column prop="refundStatus" label="退款状态"  align="center"  width="100"></el-table-column>
			<el-table-column prop="createTime" label="申请时间"  align="center"  width="180"></el-table-column>
			<el-table-column prop="governorRejectReason" label="主管驳回原因"  align="center"  width="200"></el-table-column>
			<el-table-column prop="managerRejectReason" label="经理驳回原因"  align="center"  width="200"></el-table-column>
			<el-table-column prop="applyTime" label="退款发起时间"  align="center"  width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template slot-scope="scope" align="center">
					<router-link  :to="{path:'new-refundOrder-detail',query:{id:scope.row.refundId,formLink:'refund-status-list'}}">
						<el-button  type="text" size="small">查看详情</el-button>
					</router-link>
					<el-button v-if="(scope.row.refundStatusNum == 47 || scope.row.refundStatusNum == 35 || scope.row.refundStatusNum == 40) && scope.row.checkStatusNum == 4 " type="text" size="small" @click="openDialog(scope.row.id)">上传退款凭证</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="list.page"
			layout="total, prev, pager, next, jumper"
			:total="list.total"
			:page-size="list.pageSize"
			@current-change="handleCurrentChange">
		</el-pagination>
		<el-dialog
			title="上传退款凭证"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-upload
				class="avatar-uploader"
				action="https://api2.yuelvhui.com/app/third/upload"
				:show-file-list="false"
				:on-success="res=> refund_finish_img=res.url"
				:limit="1"
			>
				<img v-if="refund_finish_img" :src="refund_finish_img" class="avatar" style="width:400px">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeRefundFinish">确 定</el-button>
  </span>
		</el-dialog>
	</div>
</template>
<script>
  import { getRefundSettlementOrderList,getRefundAboutInfo,changeRefundFinish,getAdminUserRole} from '@/api/admin' // 接口

  export default {
    data() {
      return {
        refund_finish_img:'',
        refundId:'',
        loading: true,
        dialogVisible: false,
        formLabelWidth: '140px',
        checkStatus:'',
        ordersnSon:'',
        refundSetOrder:'',
        appliedAmount:'',
        singleId: '',
        noPassReason:'',
        form: {},
        searchCondition: {
          checkStatus:'',
          ordersnSon:'',
          refundSetOrder:'',
        },
        role:'',
        downloadLoading: false,
        list: [],
        orderCount:{},
        options: [{
          value: 1,
          label: '审核中'
        }, {
          value: 2,
          label: '主管通过审核'
        },{
          value: 3,
          label: '主管驳回'
        }, {
          value: 4,
          label: '质检通过审核'
        }, {
          value: 5,
          label: '质检驳回'
        }],
        searchOpts:{},
        page:1,
        role:'',
        searchOpts:{},
        logs:{}
      }
    },
    mounted() {
      this.getList();
      this.getAdminUserRole();
      this.getRefundAboutInfo();
    },
    methods: {
      getAdminUserRole() {
        getAdminUserRole().then(res => {
          if (res.data.code == 200) {
            this.role = res.data.roleType;
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      openDialog(id){
        this.dialogVisible = true;
        this.refundId = id;
	  },
      handleClose(){
        this.dialogVisible = false;
        this.refund_finish_img = '';
	  },
      getRefundAboutInfo(){
        getRefundAboutInfo().then(res=>{
          if(res.data.code == 200){
            this.searchOpts=res.data.data;
          }
        })
      },
      // 列表数据
      getList() {
        this.loading = true
		let params = {
          page: this.page,
		  ...this.searchCondition
		}
        getRefundSettlementOrderList(params).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data;
          }else{
            this.$message.error(res.data.msg)
          }
          this.loading = false
        })
      },
      changeRefundFinish(){
        changeRefundFinish({refund_finish_img: this.refund_finish_img,id:this.refundId,role:this.role}).then(res=>{
          if(res.data.code == 200){
            this.page = 1;
            this.getList();
            this.dialogVisible = false
            this.$message.success('操作成功')
		  }else{
            this.$message.error(res.data.msg)
		  }
		})
	  },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      searchList(val) {
        this.page = 1;
        this.getList();
      },
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
	.footer{
		margin-top: 20px;
		text-align: center;
	}
</style>
