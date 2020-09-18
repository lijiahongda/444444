<template>
  <div class="orderDetails">
       
    <el-row class="mb20" v-loading="loading">
       <el-col>
        <div style="margin-bottom:20px;">
          <router-link :to="{path:'/userManage/user-order'}">
            <el-button type="primary">返回列表</el-button>
          </router-link>
			    <el-button type="primary" @click="showDialog(1)">对应关系</el-button>
			    <el-button type="primary" @click="showDialog(2)">分佣明细</el-button>
           <span>
                <el-button type="primary" @click="delCheckInfo">清除认证信息</el-button>
            </span>
        </div>
      </el-col>

       <el-form ref="form" label-width="120px" :inline="true" >
          <el-form-item >
                  <el-date-picker
                      v-model="searchCondition.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="下单日期时间"
                      style="width: 150px;" />
                  <el-date-picker
                      v-model="searchCondition.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="下单日期时间"
                      style="width: 150px;"/>
          </el-form-item>
      <!-- </el-form-item> -->
  
        <el-form-item>
            <el-select v-model="searchCondition.isMemberGoods" placeholder="包含大礼包" clearable >
            <el-option
            v-for="item in isMemberGoods"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
			</el-form-item>
			<el-form-item >
              <el-input
                  v-model="searchCondition.keyword"
                  placeholder="商品名称/订单编号" style="width: 300px;"/>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
          <el-button type="danger" @click="onEmpty">点我清空条件</el-button>
      </el-form-item>
  </el-form>

    <el-col :span="24" :offset="0">
      <el-col :span="24" class="title"><el-button type="primary" @click="showDy">对应关系</el-button></el-col>
      <el-table :data="memberRelations" style="width: 100%" border v-show="dySt">
			  <el-table-column align="center" property="truename" label="真实姓名" ></el-table-column>
			  <el-table-column align="center" property="mobile" label="手机号" ></el-table-column>
			  <el-table-column align="center" property="stockNumber" label="库存数"></el-table-column>
			  <el-table-column align="center" property="type" label="类型">
				  <template slot-scope="scope">
					  {{scope.row.type == 1 ? '分公司' : scope.row.type == 2 ? '小创客' : '大创客'}}
				  </template>
			  </el-table-column>
		  </el-table>

      <el-col :span="24" class="title" style="margin-top:10px"><el-button type="primary" @click="showFy">分佣明细</el-button></el-col>
      <el-table :data="commission"  style="width: 100%" border v-show="fySt">
          <el-table-column property="truename" label="真实姓名" ></el-table-column>
          <el-table-column property="mobile" label="手机号" ></el-table-column>
          <el-table-column property="firstNumber" label="首次库存数"></el-table-column>
          <el-table-column property="stockNumber" label="库存数"></el-table-column>
          <el-table-column property="amount" label="佣金金额(悦淘)"></el-table-column>
          <el-table-column align="center" prop="type" label="类型">
            <template slot-scope="scope">
              {{scope.row.type == 1 ? '分公司' : scope.row.type == 2 ? '小创客' : '大创客'}}
            </template>
          </el-table-column>
          <el-table-column property="identityType" label="用户身份"></el-table-column>
      </el-table>
       <el-table :data="newCommission"  style="width: 100%;margin-top:30px" border v-show="fySt">
			  <el-table-column property="fidName" label="购买用户人" ></el-table-column>
        <el-table-column property="midName" label="上级" ></el-table-column>
			  <el-table-column property="orderSn" label="订单号" ></el-table-column>
			  <el-table-column property="content" label="积分来源"></el-table-column>
			  <el-table-column property="integral" label="积分"></el-table-column>
			  <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column property="status" label="成长值状态"></el-table-column>
        <el-table-column property="taskStatus" label="佣金状态(悦呗)"></el-table-column>
        <el-table-column property="create_time" label="时间"></el-table-column>
		  </el-table>

        <el-col :span="24" class="title" style="margin-top:10px"><el-button type="primary" @click="showSp">商品信息</el-button></el-col>

				<el-table :data="orderGoodsList" border style="width: 100%" v-show="spSt">
					<el-table-column prop="ordersn_son" align="center" label="子订单编号" width="140">
            <template slot-scope="scope">
									<router-link :to="{path:'/shopMall-detail',query:{orderNo:scope.row.ordersn}}" target="_blank">
                    <el-button type="text" size="small">{{scope.row.ordersn_son}}</el-button>
                  </router-link>
						</template>
          </el-table-column>
					<el-table-column prop="goods_name" align="center" label="商品名称" width="200"></el-table-column>
					<!-- <el-table-column prop="goods_id" align="center" label="商品编号"></el-table-column> -->
					<el-table-column prop="goods_num" align="center" label="订购数量"></el-table-column>
          <el-table-column prop="isMemberGoods" align="center" label="是否大礼包"></el-table-column>
					<!-- <el-table-column prop="goods_spec" align="center" label="商品规格"></el-table-column> -->
					<!-- <el-table-column prop="goods_price_orig" align="center" label="商品原价"></el-table-column> -->
					<!-- <el-table-column prop="goods_price_member" align="center" label="会员价"></el-table-column> -->
					<el-table-column prop="goodsBalanceAverage" align="center" label="使用余额金额"></el-table-column>
					<el-table-column prop="actual_price" align="center" label="售卖价格"></el-table-column>
					<el-table-column prop="supplier_name" align="center" label="供应商"></el-table-column>
					<el-table-column prop="receiving_time" align="center" label="确认收货时间"></el-table-column>
					<el-table-column prop="refund_status" align="center" label="退款状态"></el-table-column>
					<el-table-column prop="is_send" align="center" label="发货状态">
					</el-table-column>
          <el-table-column prop="created_at" align="center" width="200px" label="下单时间">
					</el-table-column>
				</el-table>
        
        <div class="pagination-container" style="text-align:right;margin-bottom:50px">
        <el-pagination
            :current-page="searchCondition.page"
            :page-sizes="[10]"
            :page-size="searchCondition.limit"
            :total="total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
        </div>
      </el-col>



      <!-- 用户信息 -->
      <!-- <el-col :span="24" :offset="0">
        <el-col :span="24" class="title">用户信息</el-col>
				<el-table :data="baseInfo" border style="width: 100%">
					<el-table-column prop="trueName" align="center" label="姓名/昵称"></el-table-column>
					<el-table-column prop=mobile" align="center" label="电话"></el-table-column>
					<el-table-column prop="cardType" align="center" label="会员类型"></el-table-column>
					<el-table-column prop="joinTime" align="center" label="注册时间"></el-table-column>
					<el-table-column prop="cardDate" align="center" label="开卡时间"></el-table-column>
					<el-table-column prop="sex" align="center" label="性别"></el-table-column>
					<el-table-column prop="cardNo" align="center" label="身份证号码"></el-table-column>
					<el-table-column prop="parentName" align="center" label="上级"></el-table-column>
					<el-table-column prop="parentMobile" align="center" label="上级电话"></el-table-column>
					<el-table-column prop="companyName" align="center" label="所属分公司"></el-table-column>
					<el-table-column prop="companyPeople" align="center" label="分公司负责人"></el-table-column>
					<el-table-column prop="province" align="center" label="省份"></el-table-column>
					<el-table-column prop="city" align="center" label="城市"></el-table-column>
					<el-table-column prop="district" align="center" label="县市"></el-table-column>
					<el-table-column prop="address" align="center" label="用户详细地址"></el-table-column>
					<el-table-column prop="oAmount" align="center" label="可转出佣金"></el-table-column>
					<el-table-column prop="rAmount" align="center" label="已转出佣金"></el-table-column>
					<el-table-column prop="total" align="center" label="悦旅币总数"></el-table-column>
					<el-table-column prop="consum" align="center" label="已使用悦旅币"></el-table-column>
					<el-table-column prop="expire" align="center" label="已过期悦旅币"></el-table-column>
					<el-table-column prop="available" align="center" label="可使用悦旅币"></el-table-column>
         
				</el-table>
      </el-col> -->

      <el-col :span="24" :offset="0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tbody>
            <tr>
              <th style="font-size:18px;" class="bgColor" colspan="21">用户信息</th>
            </tr>
            <tr class="user">
              <td colspan="2">姓名/昵称</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.trueName}} {{info.baseInfo.trueName && info.baseInfo.nickName ? '/' : ''}} {{info.baseInfo && info.baseInfo.nickName}}</td>
              <td>电话</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.mobile}}</td>
              <td colspan="2">会员类型</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.cardType}}</td>
              <td colspan="2">注册时间</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.joinTime}}</td>
			  <td colspan="2">开卡时间</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.cardDate}}</td>
              <td>性别</td>
              <td>{{info.baseInfo.sex}}</td>
            </tr>
            <tr class="user">
              <td colspan="2">身份证号码</td>
                    <td colspan="2">{{info.baseInfo && info.baseInfo.cardNo}}</td>
                    <td colspan="1">身份</td>
                    <td colspan="1">{{info.baseInfo && info.baseInfo.roleName}}</td>
                    <td colspan="1">上级</td>
                    <td colspan="2">{{info.baseInfo && info.baseInfo.parentName}}</td>
                    <td colspan="2">上级电话</td>
                    <td colspan="2">{{info.baseInfo && info.baseInfo.parentMobile}}</td>
                    <td colspan="2">所属分公司</td>
                    <td colspan="2">{{info.company && info.company.companyName}}</td>
                    <td colspan="2">分公司负责人</td>
                    <td colspan="2">{{info.company && info.company.companyPeople}}</td>
            </tr>
			<tr class="user">
			        <td colspan="2">省份</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.province }}</td>
			        <td colspan="1">城市</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.city }}</td>
			        <td colspan="2">区县</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.district}}</td>
              <td colspan="2">用户成长值</td>
              <td colspan="3">{{info.baseInfo && info.baseInfo.growthValue}}</td>
			        <td colspan="2">用户详细地址</td>
              <td colspan="3">{{info.baseInfo && info.baseInfo.address}}</td>
			</tr>
			<tr class="user">
			  <td colspan="2">可转出佣金</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.oAmount}}</td>
			  <td colspan="2">已转出佣金</td>
              <td colspan="2">{{info.baseInfo && info.baseInfo.rAmount}}</td>
              <td colspan="2">悦旅币总数</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.total}}</td>
              <td colspan="2">已使用悦旅币</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.consum}}</td>
			  <td colspan="2">已过期悦旅币</td>
              <td>{{info.baseInfo.integral && info.baseInfo.integral.expire}}</td>
              <td colspan="2">可使用悦旅币</td>
              <td colspan="2">{{info.baseInfo.integral && info.baseInfo.integral.available}}</td>
			</tr>
          </tbody>
        </table>
      </el-col>

      <el-col :span="24" :offset="0" style="margin:30px 0 0px 0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tr>
            <th style="font-size:18px;" colspan="14" class="bgColor">优惠券信息</th>
          </tr>
          <tr>
            <th colspan="3">优惠券名称</th>
            <th colspan="2">优惠券金额</th>
            <th colspan="2">所有优惠券</th>
            <th colspan="2">已使用优惠券</th>
            <th colspan="2">未使用优惠券</th>
            <th colspan="3">截止日期</th>
          </tr>
          <tr v-if="info.coupon && info.coupon.length > 0" class="coupons" v-for="(item,index) in info.coupon" :key="index">
            <td colspan="3">{{item.name}}</td>
            <td colspan="2">{{item.amount}}</td>
            <td colspan="2">{{item.total}}</td>
            <td colspan="2">{{item.useNum}}</td>
            <td colspan="2">{{item.unNum}}</td>
            <td colspan="3">{{item.endDate}}</td>
          </tr>
        </table>
      </el-col>

	  <el-col :span="24" :offset="0" style="margin:30px 0 60px 0">
        <table class="table" style="table-layout: fixed; margin-left: 0px;">
          <tr>
            <th style="font-size:18px;" colspan="23" class="bgColor">酒店订单信息</th>
          </tr>
          <tr>
            <th colspan="3">酒店名称</th>
            <th colspan="4">订单编号</th>
            <th colspan="2">支付单号</th>
            <th colspan="2">订单原价</th>
            <th colspan="2">支付金额</th>
            <th colspan="2">立减金额</th>
            <th colspan="2">优惠券金额</th>
            <th colspan="2">支付时间</th>
            <th colspan="2">入住时间</th>
            <th colspan="2">操作</th>
          </tr>
          <tr v-if="info.hotel && info.hotel.length > 0" class="coupons" v-for="(item,index) in info.hotel" :key="index">
            <td colspan="3">{{item.hotelName}}</td>
            <td colspan="4">{{item.orderNo}}</td>
            <td colspan="2">{{item.payFormNo}}</td>
            <td colspan="2">{{item.price}}</td>
            <td colspan="2">{{item.act}}</td>
            <td colspan="2">{{item.sale}}</td>
            <td colspan="2">{{item.cMoney}}</td>
            <td colspan="2">{{item.payTime}}</td>
            <td colspan="2">{{item.arrivalDate}}</td>
            <td colspan="2">
				<router-link :to="{path:'/hotel-detail',query:{orderNo:item.orderNo}}">
					<span>查看</span>
				</router-link>
			</td>
          </tr>
        </table>
      </el-col>

    </el-row>
	  <el-dialog :title="title" :visible.sync="dialogTableVisible">
		  <el-table  v-if="showTitle == '1'" :data="memberRelations" style="width: 100%" border >
			  <el-table-column align="center" property="truename" label="真实姓名" ></el-table-column>
			  <el-table-column align="center" property="mobile" label="手机号" ></el-table-column>
			  <el-table-column align="center" property="stockNumber" label="库存数"></el-table-column>
			  <el-table-column align="center" property="type" label="类型">
				  <template slot-scope="scope">
					  {{scope.row.type == 1 ? '分公司' : scope.row.type == 2 ? '小创客' : '大创客'}}
				  </template>
			  </el-table-column>
		  </el-table>

    <span  v-else>
      <el-table :data="commission"  style="width: 100%" border>
          <el-table-column property="truename" label="真实姓名" ></el-table-column>
          <el-table-column property="mobile" label="手机号" ></el-table-column>
          <el-table-column property="firstNumber" label="首次库存数"></el-table-column>
          <el-table-column property="stockNumber" label="库存数"></el-table-column>
          <el-table-column property="amount" label="佣金金额"></el-table-column>
          <el-table-column align="center" prop="type" label="类型">
            <template slot-scope="scope">
              {{scope.row.type == 1 ? '分公司' : scope.row.type == 2 ? '小创客' : '大创客'}}
            </template>
          </el-table-column>
          <el-table-column property="identityType" label="用户身份"></el-table-column>
      </el-table>


       <el-table :data="newCommission"  style="width: 100%;margin-top:30px" border>
			  <el-table-column property="fidName" label="购买用户人" ></el-table-column>
        <el-table-column property="midName" label="上级" ></el-table-column>
			  <el-table-column property="orderSn" label="订单号" ></el-table-column>
			  <el-table-column property="content" label="积分来源"></el-table-column>
			  <el-table-column property="integral" label="积分"></el-table-column>
			  <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column property="status" label="成长值状态"></el-table-column>
        <el-table-column property="taskStatus" label="佣金状态"></el-table-column>
        <el-table-column property="create_time" label="时间"></el-table-column>
		  </el-table>
    </span>
	  </el-dialog>
  </div>
</template>
<script>

import { userInfo,delCheckInfo,commission,relations,newCommission} from '@/api/remoteSearch'
import { getOrderGoodsList} from '@/api/order' // 接口

const isMemberGoods = [
    { id: '0', name: '否' },
    { id: '1', name: '是' },
]
export default {
  components: {  },
  data() {
    return {
      isMemberGoods,
      id:'',
      searchCondition: {
                page: 1,
                payStatus:1,
            },
      info:{
          baseInfo: {},
          company: {},
          coupon: [],
          hotel: [],
        },
      total:0,
      commission:[],
      newCommission:[],
      memberRelations:[],
      showTitle: '',
      title: '',
      orderGoodsList:[],
      loading:true,
      gridData:[],
      dialogTableVisible:false,
      baseInfo:[],
      dySt:false,
      fySt:false,
      spSt:false,
    }
  },
  created() {
	this.id = this.$route.query ? this.$route.query.id : this.$router.query ? this.$router.query.id : ''
	if(this.id){
    	this.getUserInfo();
      this.getCommission();
      this.getNewCommission();
      this.getRelations();
      this.getOrderGoodsList();
	}
  },
  methods: {
	getUserInfo(){
		userInfo({memberId :this.id}).then(res=>{
			if(res.data.code === 200){
        this.info = res.data.data;
        this.baseInfo.push(this.info.baseInfo);

        // console.log(this.info)
        // this.orderGoodsList= res.data.data.orderGoodsList;
				this.loading = false;
			} else if( res.data.code === 400){
				this.$message.error(res.data.msg)
			}
		})
  },

getOrderGoodsList(){
  this.searchCondition.mid=this.id
		getOrderGoodsList(this.searchCondition).then(res=>{
			if(res.data.code === 200){
        this.orderGoodsList= res.data.data.list;
        this.total  = res.data.data.total;
				this.loading = false;
			} else if( res.data.code === 400){
				this.$message.error(res.data.msg)
			}
		})
  },

  
    getCommission(){
      commission({memberId :this.id}).then(res=>{
        if(res.data.code === 200){
          this.commission = res.data.data.commission;
        } else if( res.data.code === 400){
          this.$message.error(res.data.msg)
        }
      })
    },

    getNewCommission(){
      newCommission({memberId :this.id}).then(res=>{
        if(res.data.code === 200){
          this.newCommission = res.data.data.newCommission;
        } else if( res.data.code === 400){
          this.$message.error(res.data.msg)
        }
      })
    },

    

    handleSizeChange(val) {},
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getOrderGoodsList()
    },
    onSubmit() {
        this.searchCondition.page = 1
        this.getOrderGoodsList()
    },
    onEmpty() {
        this.searchCondition = {
            page:1,
        }
    },
    getRelations(){
      relations({memberId :this.id}).then(res=>{
        if(res.data.code === 200){
          this.memberRelations = res.data.data.memberRelations;
        } else if( res.data.code === 400){
          this.$message.error(res.data.msg)
        }
      })
    },
    showDialog(val){
	  this.dialogTableVisible = true;
	  this.showTitle = val;
	  if(val===1){
	    this.title = '对应关系';
        // this.gridData = this.relations;
	  } else {
        this.title = '分佣明细';
        // this.gridData = this.commission;
	  }

	},
  delCheckInfo(){
     this.$confirm('确定要清除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var obj = {
                    mid:this.id
                }
                delCheckInfo(obj).then(res => {
                    if (res.data.code == 200)
                    {
                      	this.$message.success(res.data.msg)
                        this.getUserInfo()
                    }else{
                      	this.$message.error(res.data.msg)
                    }
                })
            }).catch(() => {
            });

  },

  showDy(){
    if(this.dySt)
    {
      this.dySt=false
    }else{
      this.dySt=true
    }
  },

   showFy(){
    if(this.fySt)
    {
      this.fySt=false
    }else{
      this.fySt=true
    }
  },

  showSp(){
    if(this.spSt)
    {
      this.spSt=false
    }else{
      this.spSt=true
    }
  },
  

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
    .el-col .table {
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
        text-align: center;
      }
      .user{
        td:nth-child(odd){
          text-align: right;
          color: #000;
        }
        td:nth-child(even){
          text-align: left;
          color: blue;
        }
      }
      .coupons{
        td{
          color: blue;
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
  .bgColor{
      background: #409EFF;
      color: #fff;
  }
 .orderDetails .el-col .table .user td:nth-child(even) {
      text-align: center;
      color: #777d88;
      padding: 0;
      overflow: auto;
  }
  .orderDetails .el-col .table .user td:nth-child(odd) {
      text-align: left;
      color: #000;
  }
  .orderDetails .el-col .table td, .orderDetails .el-col .table th {
      padding: 15px 6px;
  }   
.orderDetails .el-col .table .coupons td {
   color: #777d88;
   overflow:auto
}
</style>

