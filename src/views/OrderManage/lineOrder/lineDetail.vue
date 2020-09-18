<template>
  <div class="orderDetails">
    <el-row class="mb20">
      <el-col>
        <div style="margin-bottom:20px;">
          <router-link :to="{path:'line-order'}">
            <el-button type="primary">返回列表</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="24" :offset="0">
        <table v-if="codes == 200" class="table" style="table-layout: fixed; margin-left: 0px;">
          <tbody>
            <thead>线路信息</thead>
            <tr>
              <td align="right" class="left">线路名称</td>
              <td>{{info.proudctName}}</td>
              <td align="right" class="left">线路类型</td>
              <td>{{info.productType}}</td>
              <td align="right" class="left">出发地/目的地</td>
              <td>{{ info.depart }}-{{ info.dest }}</td>
			  <td align="right" class="left">发车地点</td>
              <td>{{info.trafficInfo}}</td>
            </tr>
            <tr>
              <td align="right" class="left">出行时间</td>
              <td>{{info.departDate}}</td>
              <td align="right" class="left">供应商</td>
              <td>{{info.supplierName}}</td>
			  <td align="right" class="left">第三方产品编号</td>
              <td>{{info.productCode}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>联系人信息</thead>
            <tr>
              <td align="right" class="left">联系人姓名</td>
              <td>{{info.attnName}}</td>
              <td align="right" class="left">联系人电话</td>
              <td>{{info.attnTel}}</td>
              <td align="right" class="left">联系人邮箱</td>
              <td>{{info.attnEmail}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>出行人信息</thead>
            <tr>
              <td align="left" class="left">出行人姓名</td>
              <td align="left" class="left">出行人电话号</td>
              <td align="left" class="left">证件类型</td>
              <td align="left" class="left">出行人身份证号</td>
            </tr>
            <tr v-if="info.tourist.length>0" v-for="(item,index) in info.tourist" :key="index">
              <td align="left" class="left">{{item.name}}</td>
              <td align="left" class="left">{{item.tel}}</td>
              <td align="left" class="left">{{item.paperType}}</td>
              <td align="left" class="left">{{item.paperNum}}</td>
            </tr>
			<tr>
				<td style="text-align:center;" colspan="4">暂无出行人信息...</td>
			</tr>
          </tbody>

          <tbody>
            <thead>支付信息</thead>
            <tr>
              <td align="right" class="left">支付单号</td>
              <td>{{info.paySn}}</td>
              <td align="right" class="left">订单总金额</td>
              <td>{{info.orderPrice}}</td>
              <td align="right" class="left">实际支付</td>
              <td>{{info.actualPrice}}</td>
              <td align="right" class="left">悦旅币抵扣</td>
              <td>{{info.deductionPrice}}</td>
            </tr>
            <tr>
              <td align="right" class="left">支付状态</td>
              <td>{{info.orderStatusName}}</td>
              <td align="right" class="left">支付方式</td>
              <td>{{info.payWay}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>订单信息</thead>
            <tr>
              <td align="right" class="left">订单编号</td>
              <td>{{info.orderSn}}</td>
              <td align="right" class="left">订单状态</td>
              <td>{{info.orderStatusName}}</td>
              <td align="right" class="left">出行人数</td>
              <td>{{info.tripNum}}人</td>
              <td align="right" class="left">下单时间</td>
              <td>{{info.orderAt}}</td>
            </tr>
          </tbody>
        </table>
		<div v-if="codes == 400">
		</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { lineDetails } from '@/api/line'

export default {
  data() {
    return {
	  id: '',
	  info:{},
	  message: '',
	  codes: 0,
    }
  },
  created() {
	this.id = this.$router.query ? this.$router.query.id : this.$route.query ? this.$route.query.id : ''
	if(this.id){
		this.getInfo()
	}
  },
  methods: {
	getInfo(){
		lineDetails({orderNo:this.id}).then(res=>{
			if(res.data.code === 200){
				this.info = res.data.data
				this.total = res.data.data.total
				this.codes = res.data.code
			}
			else if(res.data.code === 400){
				this.codes = res.data.code
				this.$message.error(res.data.msg)
			}
		})
	}
  }
}
</script>
<style lang="scss">
  .el-table thead.is-group th{
    background: #fff;
  }
  .orderDetails {
    font-size: 14px;
    padding: 20px;
    margin: 40px 30px;
    border: 1px solid #DBDBDB;
    border-radius: 8px;
    .title {
      height: 36px;
      line-height: 36px;
      margin: 0;
      display: inline-block;
      vertical-align: middle;
    }
    .table {
      font-size: 13px;
      width: 100%;
      color: #606266;
      border-collapse: collapse;
      box-shadow: 2px 2px 8px #dbdbdb;
      .left {
        width: 15%;
      }
      .half {
        width: 5.6%;
      }
      tr {
        &:hover {
          background-color: #f5f7fa;
        }
      }
      td, th {
        border: 1px solid #ebeef5;
        width: 20%;
        padding: 15px;
        box-sizing: border-box;
      }
    }
    tbody{
      // border-bottom: 2px solid #ccc;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    thead{
      display: block;
      margin-top:10px;
      margin-bottom:10px;
    }
  }
  .textUpdate{
    font-size: 18px;
    margin: 50px auto 10px;
    text-align: center;
  }
  .textUpdateText{
    margin: 0 auto 0px;
    text-align: left;
    font-size: 16px;
  }
  .radio{
    text-align: center;
  }
  .footer{
    text-align: right;
    margin-top: 10px;
    line-height: 50px;
    height: 50px;
  }
  .footerSave{
    text-align: right;
    line-height: 30px;
    height: 30px;
  }
  .mtop{
    margin-top:30px;
    margin-bottom: 10px;
  }
  .tabDiv{
    width: 100%;
    span{
      display: inline-block;
      width: 20%;
      text-align: center;
    }
  }

</style>

