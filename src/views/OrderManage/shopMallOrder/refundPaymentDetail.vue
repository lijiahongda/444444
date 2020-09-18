<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form>
			<el-form-item label="客服审核状态">
				<el-select v-model="checkStatus" placeholder="退款类型" clearable @change="getList">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>


		<!--搜索部分-->
		<el-table :data="list" :fit="true" border @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column  prop="" label="id"  align="center" width="80">
				<template slot-scope="scope">
					{{scope.row.id ? scope.row.id : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="recordId" label="子订单id"  align="center"  width="80"></el-table-column>
			<el-table-column prop="ordersnSon" label="子单号"  align="center"  width="200"></el-table-column>
			<el-table-column prop="refundId" label="商品退款id"  align="center"  width="80"></el-table-column>
			<el-table-column prop="goodsName" label="商品名"  align="center"  width="200"></el-table-column>
			<el-table-column prop="payFormNo" label="支付单号"  align="center"  width="200"></el-table-column>
			<el-table-column prop="orderDownTime" label="下单时间"  align="center"  width="200"></el-table-column>
			<el-table-column prop="payTime" label="支付时间"  align="center"  width="200"></el-table-column>
			<el-table-column prop="supplierName" label="供应商名称"  align="center"  width="200"></el-table-column>
			<el-table-column prop="checkStatus" label="审核状态"  align="center" width="120"></el-table-column>
			<el-table-column prop="refundType" label="退款类型"  align="center"></el-table-column>
			<el-table-column prop="refundStatus" label="退款状态"  align="center"  width="100"></el-table-column>
			<el-table-column prop="createTime" label="申请时间"  align="center"  width="180"></el-table-column>
			<el-table-column prop="governorRejectReason" label="主管驳回原因"  align="center"  width="200"></el-table-column>
			<el-table-column prop="managerRejectReason" label="经理驳回原因"  align="center"  width="200"></el-table-column>
			<el-table-column prop="adminRefundPrice" label="商品需退款金额(含运费)"  align="center"></el-table-column>
			<el-table-column prop="freight" label="要打款的运费"  align="center"></el-table-column>
			<el-table-column prop="applyTime" label="退款发起时间"  align="center"  width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="200" align="center">
				<template slot-scope="scope" align="center">
					<el-button type="text" v-if="(scope.row.checkStatusNum==1 && role == 2) || (scope.row.checkStatusNum==2 && role == 3)" size="small" @click="pass(scope.row)">通过</el-button>
					<el-button type="text" v-if="(scope.row.checkStatusNum==1 && role == 2) || (scope.row.checkStatusNum==2 && role == 3)" size="small" @click="reject(scope.row)">驳回</el-button>
					<router-link  :to="{path:'refund-affirm',query:{id:scope.row.refundId}}">
						<el-button type="text" size="small">查看详情</el-button>
					</router-link>

				</template>
			</el-table-column>
		</el-table>
		<div class="footer" v-if="role == 2 || role == 3">
			<el-button  size="small" @click="morePass">批量通过</el-button>
			<el-button type="danger" size="small" @click="reject('moreReject')">批量驳回</el-button>
		</div>
		<p>操作日志: </p>
		<el-table
			:data="logs.list"
			style="width: 100%" border>
			<el-table-column
				prop="createdTime"
				align="center"
				label="日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="operationContent"
				align="center"
				label="操作">
			</el-table-column>
			<el-table-column
				prop="operationStatus"
				label="状态"
				align="center"
				width="180">
			</el-table-column>
		</el-table>
		<el-pagination
			layout="prev, pager, next"
			:total="logs.total"
			:page-size="20"
			@current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>
<script>
  import { getRefundSettlement,getRefundAboutInfo,checkfundSettlement,getAdminUserRole,checkfundSettlementMore,getRefundSetOpLogList} from '@/api/admin' // 接口
  import { getTabChannels} from '@/api/shops' // 接口

  export default {
    data() {
      return {
        loading: true,
        dialogFormVisible: false,
        formLabelWidth: '140px',
        checkStatus:'',
        appliedAmount:'',
		singleId: '',
        noPassReason:'',
        form: {},
        searchCondition: {
        },
        role:'',
        downloadLoading: false,
        tableData: [
          {date: "2018-10-01"}
        ],
        multipleSelection: [],
        list: [],
        orderCount:{},
        options: [{
          value: 1,
          label: '待审核'
        }, {
          value: 2,
          label: '主管通过审核'
        },{
          value: 3,
          label: '主管驳回'
        }, {
          value: 4,
          label: '经理通过审核'
        }, {
          value: 5,
          label: '经理驳回'
        }],
        searchOpts:{},
        logs:{}
      }
    },
    mounted() {
      this.getList();
      this.getTabChannels();
      this.getAdminUserRole();
    },
    methods: {
      // 列表数据
      getList() {
        this.loading = true
        getRefundSettlement({id: this.$route.query.id,checkStatus:this.checkStatus}).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data.refundSetOrderInfo;
            this.appliedAmount = res.data.data.appliedAmount;
            this.getRefundSetOpLogList()
          }else{
            this.$message.error(res.data.msg)
		  }
          this.loading = false
        })
      },
      getAdminUserRole(){
        getAdminUserRole().then(res=>{
          if(res.data.code == 200){
            this.role = res.data.roleType;
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      getRefundSetOpLogList(val){
        getRefundSetOpLogList({page: val || 1,pageSize: 20,id:this.$route.query.id}).then(res=>{
          if (res.data.code === 200){
            this.logs = res.data.data;
            console.log(this.logs.total)
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      handleCurrentChange(val) {
        this.getRefundSetOpLogList(val);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 推广渠道
      getTabChannels(){
        getTabChannels().then(res=>{
          console.log(res)
          this.orderSource = res.data;
        })
      },
      checkfundSettlement(status){
        let params = {
          id: this.singleId.id,
          adminRefundPrice: this.singleId.adminRefundPrice,
          status: status,
          role: this.role,
          rejectReason: this.noPassReason
		}
        this.loading = true;
        checkfundSettlement(params).then(res=>{
          if(res.data.code == 200){
            this.getList();
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
          this.loading = false;
        })
      },
      checkfundSettlementMore(status){
        if(this.multipleSelection.length==0) {
          this.$message.warning('请先选中要批量操作的单子')
		}

        let params = {
          status: status,
          role: this.role,
          checkInfo: this.multipleSelection,
          rejectReason: this.noPassReason
        }
        this.loading = true
        checkfundSettlementMore(params).then(res=>{
          if(res.data.code == 200){
            this.getList();
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
          this.loading = true
        })
	  },
      morePass(){
        this.$confirm('是否继续此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkfundSettlementMore(1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
	  },
      pass(row){
        this.singleId = row;
        this.$confirm('是否继续此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkfundSettlement(1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
	  },
	  reject(row){
        this.singleId = row;
        this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          console.log(222)
          this.noPassReason = value;
          if(row != 'moreReject'){
            this.checkfundSettlement(2);
          }else{
            this.checkfundSettlementMore(2);
		  }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
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
