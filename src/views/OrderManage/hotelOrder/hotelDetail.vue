<template>
  <section class="orderDetails">
    <!-- 订单信息 -->
    <el-row class="mb20">
      <el-col>
        <div style="margin-bottom:20px;">
          <router-link :to="{path:'hotel-order'}">
            <el-button type="primary">返回列表</el-button>
          </router-link>
          <!-- <el-button type="primary" @click="onCheckIn" v-if="info.admin_do_type == 1">已退款{{info.admin_do_type}}</el-button> -->
          <!-- <el-button type="primary" v-if="info.admin_do_type == 2" @click="onDoSureOrder(info.orderNo)">确认订单</el-button> -->
          <!-- <el-button type="primary" @click="onCheckIn" v-if="info.admin_do_type == 2">确认退款</el-button> -->
          <!-- 	<el-button type="primary"  @click="onHotelIntoRoom(info.orderNo)" v-if="info.admin_do_type == 4">确认已入住</el-button>
          <el-button type="primary"  @click="onHotelNoCancel(info.orderNo)"  v-if="info.admin_do_type == 4">不可取消</el-button>-->
          <!-- <el-button type="primary" @click="onCheckIn" v-if="info.admin_do_type == 4">确认退款</el-button> -->
        </div>
      </el-col>
      <el-col :span="24" :offset="0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tbody>
            <thead>酒店信息</thead>
            <tr>
              <td align="right" class="left">酒店名称</td>
              <td>{{info.hotel.hotelName ? info.hotel.hotelName : '-'}}</td>
              <td align="right" class="left">房型名称</td>
              <td>{{info.hotel.roomName}}</td>
              <td align="right" class="left">供应商</td>
              <td>{{info.sourceType}}</td>
              <td align="right" class="left">房间状态</td>
              <td>{{info.hotel.roomStatus}}</td>
            </tr>
            <tr>
              <td align="right" class="left">RP名称</td>
              <td>{{info.hotel.roomPlanName}}</td>
              <td align="right" class="left">间夜量</td>
              <td>{{info.hotel.roomNumber}}</td>
              <td align="right" class="left">入住日期</td>
              <td>{{info.hotel.arrivalDate}}</td>
              <td align="right" class="left">离店日期</td>
              <td>{{info.hotel.departureDate}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>入住信息</thead>
            <tr v-for="(item,index) in info.checkinList" :key="index">
              <td align="right" class="left">入住人姓名</td>
              <td>{{item.name}}</td>
              <td align="right" class="left">入住人电话</td>
              <td>{{item.mobile}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>订单信息</thead>
            <tr>
              <!-- <td align="right" class="left">订单状态</td>
              <td></td>-->
              <td align="right" class="left">订单编号</td>
              <td>{{info.orderNo}}</td>
              <td align="right" class="left">下单时间</td>
              <td>{{info.createTime}}</td>
              <td align="right" class="left">三方订单</td>
              <td align="left" class="left">{{info.sourceOrderNo}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>支付信息</thead>
            <tr>
              <td align="right" class="left">支付状态</td>
              <td>{{info.orderPay.payStatus}}</td>
              <td align="right" class="left">支付单号</td>
              <td>{{info.orderPay.payFormNo}}</td>
              <td align="right" class="left">支付方式</td>
              <td>{{info.orderPay.payStatus}}</td>
              <td align="right" class="left">支付时间</td>
              <td>{{info.orderPay.payTime}}</td>
            </tr>
            <tr>
              <td align="right" class="left">订单总额</td>
              <td>{{info.orderPay.originPrice}}</td>
              <td align="right" class="left">实际支付</td>
              <td>{{info.orderPay.actualPay}}</td>
              <td align="right" class="left">已优惠间夜量</td>
              <td>{{info.orderPay.saleCount}}</td>
              <td align="right" class="left">优惠券抵扣</td>
              <td>{{info.orderPay.cMoney ? info.orderPay.cMoney : '-'}}</td>
            </tr>
            <tr>
              <td align="right" class="left">是否使用优惠券</td>
              <td>{{info.orderPay.isCoupon === 0 ? '未使用' : '已使用' }}</td>
              <td align="right" class="left">平台优惠</td>
              <td>{{info.orderPay.discount}}</td>
              <td align="right" class="left">下单立减</td>
              <td>{{info.orderPay.salePrice}}</td>
              <td align="right" class="left">商户号</td>
              <td>{{info.orderPay.mchId}}</td>
            </tr>
          </tbody>

          <tbody>
            <thead>退款信息</thead>
            <tr>
              <td align="right" class="left">退款状态</td>
              <td>{{info.orderRefund.refundStatus}}</td>
              <td align="right" class="left">退款单号</td>
              <td>{{info.orderRefund.refundFormNo ? info.orderRefund.refundFormNo : '-' }}</td>
              <td align="right" class="left">退款金额</td>
              <td>{{info.orderRefund.refunds}}</td>
              <td align="right" class="left">退款时间</td>
              <td>{{info.orderRefund.startRefundTime}}</td>
            </tr>
          </tbody>
          <tbody>
            <thead>用户信息</thead>
            <tr>
              <td align="right" class="left">用户ID</td>
              <td>{{info.member.memberId ? info.member.memberId : '-'}}</td>
              <td align="right" class="left">用户姓名</td>
              <td>{{info.member.name ? info.member.name : '-'}}</td>
              <td align="right" class="left">用户电话</td>
              <td>{{info.member.mobile}}</td>
              <td align="right" class="left">是否会员</td>
              <td>{{info.member.cardType === 1 ? '是' : '否'}}</td>
            </tr>
          </tbody>
          <tbody>
            <div class="TKbox">
              <h4>退款完成凭证</h4>
              <div v-for="(item,index) in info.orderRefund.finishImg" :key="index">
                <el-image  
                :src="item"  :preview-src-list="srcList"
                :fit="'contain'"
                style="display:inline-block"
              >
              </el-image>
              </div>
            </div>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import {
  getDetailInfo,
  hotelDoSureOrder,
  hotelNoCancel,
  hotelIntoRoom
} from "@/api/hotelOrder";
// import VerticalFrom from '../components/VerticalFrom'

export default {
  directives: {
    waves
  },
  // components: { VerticalFrom },
  data() {
    return {
      orderNo: "", //订单编号
      peopleList: [],
      styleObject: {},
      s_showByRow: true,
      info: {
        hotel: {},
        checkinList: [],
        member: {},
        orderPay: {},
        orderRefund: {}
      },
      srcList:[],
    };
  },
  //   props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 2);
    }
  },
  created() {
    this.orderNo = this.$route.query
      ? this.$route.query.orderNo
      : this.$router.query
      ? this.$router.query.orderNo
      : 0;
    if (this.orderNo) {
      this.getInfo();
    }
    this.styleObject = this.tableStyle;
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
  methods: {
    // 确认订单
    onDoSureOrder(id) {
      hotelDoSureOrder({ ordersn: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg || "订单确认成功");
          this.getInfo();
        }
      });
    },
    // 确认入住
    onHotelIntoRoom(id) {
      hotelIntoRoom({ ordersn: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg || "确认成功");
          this.getInfo();
        }
      });
    },
    // 不可取消
    onHotelNoCancel(id) {
      hotelNoCancel({ ordersn: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg || "成功");
          this.getInfo();
        }
      });
    },
    onCheckIn() {},
    getInfo() {
      let params = { orderNo: this.orderNo };
      getDetailInfo(
        params
        ).then(res => {
        if (res.data.code === 200) {
          this.info = res.data.data;
          // console.log(this.info ,"=============++++++++++++++")
          this.srcList=this.info.orderRefund.finishImg
          console.log(this.srcList,"=======url=========")
        }
      });
    },
  }
};
</script>
<style lang="scss">
.orderDetails {
  font-size: 14px;
  padding: 20px;
  margin: 40px 30px;
  border: 1px solid #dbdbdb;
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
    td,
    th {
      border: 1px solid #ebeef5;
      width: 20%;
      padding: 15px;
      box-sizing: border-box;
    }
  }
  tbody {
    // border-bottom: 2px solid #ccc;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  thead {
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.textUpdate {
  font-size: 18px;
  margin: 50px auto 10px;
  text-align: center;
}
.textUpdateText {
  margin: 0 auto 0px;
  text-align: left;
  font-size: 16px;
}
.radio {
  text-align: center;
}
.footer {
  text-align: right;
  margin-top: 10px;
  line-height: 50px;
  height: 50px;
}
.footerSave {
  text-align: right;
  line-height: 30px;
  height: 30px;
}
.mtop {
  margin-top: 30px;
  margin-bottom: 10px;
}
.tabDiv {
  width: 100%;
  span {
    display: inline-block;
    width: 20%;
    text-align: center;
  }
}
img {
  width: 100px;
  height: 100px;
}
</style>
