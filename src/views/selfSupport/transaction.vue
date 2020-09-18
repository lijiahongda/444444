<template>
  <div class="main">
    <!-- 日期搜索 -->
    <div class="searchBox botss">
      <el-radio-group
        v-model="categoryRadio"
        @change="getCateListBtn"
        class="right"
        style="margin-right:10px;"
      >
        <el-radio-button :label="0">昨日</el-radio-button>
        <el-radio-button :label="1">本周</el-radio-button>
        <el-radio-button :label="2">本月</el-radio-button>
        <el-radio-button :label="3">全部</el-radio-button>
      </el-radio-group>
      <el-date-picker
        style="margin-right:10px"
        type="daterange"
        value-format="yyyy-MM-dd"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="choseDate"
        v-model="categoryTimeDur"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
    <div class="channels">
      <el-select class="sv" v-model="goodstype" clearable placeholder="商品渠道">
        <el-option v-for="item in goodsChannels" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select class="sv" v-model="ordertype" clearable placeholder="订单渠道">
        <el-option v-for="item in orderChannels" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button class="sv" @click="orderTypeClick()" type="primary">选择订单类型</el-button>
    </div>
    <div class="numberBoxs bot">
      <p class="titles">自营交易概览</p>
      <div class="numBox">
        <div class="box">
          <p class="num">{{numberBoxList.gmv}}</p>
          <p class="name">GMV</p>
        </div>
        <div class="box">
          <p class="num">{{numberBoxList.goodsNum}}</p>
          <p class="name">售出商品</p>
        </div>
        <div class="box">
          <p class="num">{{numberBoxList.orderCount}}</p>
          <p class="name">成交订单</p>
        </div>
        <div class="box">
          <p class="num">{{numberBoxList.customerUnitPrice}}</p>
          <p class="name">客单价</p>
        </div>
        <div class="box">
          <p class="num">{{numberBoxList.goodsPriceBuy}}</p>
          <p class="name">总成本</p>
        </div>
      </div>
    </div>

    <div class="tranPie">
      <!-- 自营供应商交易占比 -->
      <div class="self-gys">
        <div id="gys" ref="gys"></div>
        <ul class="gysBoxTxts">
          <li v-for="(item,index) in Supplierlist" :key="index">
            <p class="name">{{item.name}}</p>
            <p class="percentage">{{item.lv}}</p>
            <p class="num">{{item.value}}</p>
          </li>
        </ul>
      </div>
      <!-- 交易品类占比 -->
      <div class="self-gys">
        <div id="tradeCategory" ref="tradeCategory"></div>
        <ul class="gysBoxTxts">
          <li v-for="(item,index) in OrderGoodslist" :key="index">
            <p class="name">{{item.name}}</p>
            <p class="percentage">{{item.lv}}</p>
            <p class="num">{{item.value}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 交易渠道占比 -->
    <div class="tradingChannels bot">
      <p class="titles">自营交易概览</p>
      <div class="tradingChannelBox">
        <div>
          <ul class="ChannelsTxts">
            <li v-for="(item,index) in OrderGoodsByBylist" :key="index">
              <p class="num">{{item.gmv}}</p>
              <p class="name">{{item.positionFromName}}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="xrt"></div> -->
        <div>
          <ul class="gysBoxTxts" style="margin-left:20%;">
            <li v-for="(item,index) in OrderGoodsByBylist" :key="index">
              <p class="name">{{item.positionFromName}}</p>
              <!-- <p class="percentage"></p> -->
              <p class="num">{{item.lv}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 选择 -->
    <div class="choiceBox bot">
      <!-- <div class="choiceSearch">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          style="margin:0 20px"
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-button type="primary">所有订单</el-button>
        <el-button type="primary">自营订单</el-button>
        <el-button type="primary">礼包订单</el-button>
      </div>-->
      <div class="choiceBoxContent">
        <div class="choiceImgBox">
          <div class="choiceKuai">
            <div class="kuaiBox">
              <img
                src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-05/15/yuelvhuii6o3Zuby951596613769.jpg"
                alt
                class="img"
              />
              <p class="kuai kuai1">访问</p>
              <p class="kuai kuai2">下单</p>
              <p class="kuai kuai3">支付</p>
              <p class="kuai kuai4">退款</p>
              <div class="percentageTxt1">
                <p class="name">访问-下单转化率</p>
                <p class="num">{{OrderConverslist.orderByActiveUsersLv}}</p>
              </div>
              <div class="percentageTxt2">
                <p class="name">访问-支付转化率</p>
                <p class="num">{{OrderConverslist.activeUsersCountBypayOrderCountLv}}</p>
              </div>
              <div class="percentageTxt3">
                <p class="name">下单-支付转化率</p>
                <p class="num">{{OrderConverslist.orderCountBypayOrderCountLv}}</p>
              </div>
              <div class="percentageTxt4">
                <p class="name">退款率</p>
                <p class="num">{{OrderConverslist.refundorderCountBypayOrderCountLv}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="choiceBoxTxts">
          <div class="choiceTxts">
            <div class="txtBox">
              <p
                class="num"
              >{{OrderConverslist.activeUsersCount?OrderConverslist.activeUsersCount:0}}</p>
              <p class="name">活跃用户数</p>
            </div>
            <div class="txtBox"></div>
            <!-- <div class="txtBox">
              <p class="num">{{OrderConverslist.activeUsersCount}}</p>
              <p class="name">访问次数</p>
            </div>
          </div>
          <div class="choiceTxts">
            <div class="txtBox">
              <p class="num">{{OrderConverslist.activeUsersCount}}</p>
              <p class="name">商品访问次数</p>
            </div>
 			<div class="txtBox">
              <p class="num">{{OrderConverslist.activeUsersCount}}</p>
              <p class="name">访问访问用户数</p>
            </div>-->
          </div>
          <div class="choiceTxts">
            <div class="txtBox">
              <p class="num">{{OrderConverslist.payOrderCount}}</p>
              <p class="name">新增订单数</p>
            </div>
            <div class="txtBox">
              <p class="num">{{OrderConverslist.payOrderMemberCount}}</p>
              <p class="name">下单用户数</p>
            </div>
          </div>
          <div class="choiceTxts">
            <div class="txtBox">
              <p class="num">{{OrderConverslist.orderCount}}</p>
              <p class="name">订单数</p>
            </div>
            <div class="txtBox">
              <p class="num">{{OrderConverslist.payOrderGmv}}</p>
              <p class="name">支付金额</p>
            </div>
          </div>
          <div class="choiceTxts">
            <div class="txtBox">
              <p class="num">{{OrderConverslist.customerUnitPrice}}</p>
              <p class="name">客单价</p>
            </div>
            <div class="txtBox">
              <p class="num">{{OrderConverslist.refundOrderCount}}</p>
              <p class="name">退款订单数</p>
            </div>
          </div>
          <div class="choiceTxts">
            <div class="txtBox">
              <p class="num">{{OrderConverslist.refundOrderGmv}}</p>
              <p class="name">退款金额</p>
            </div>
            <div class="txtBox">
              <p class="num">{{OrderConverslist.refundOrderGoodsCount}}</p>
              <p class="name">退款商品</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 交易趋势 -->
    <div class="transactionChart">
      <div id="mycharts" ref="mycharts"></div>
    </div>
    <!-- 旭日图 -->
    <div class="transactionChart">
      <div id="mycharts" ref="xumycharts"></div>
    </div>
    <!-- 数据 -->
    <div class="siix_box">
      <div class="choiceTxtsww" v-for="(item,index) in GmvStalist" :key="index">
        <div class="txtBox">
          <p class="num">{{(item.children[0].value-0) + (item.children[1].value-0)}}</p>
          <p class="name">{{item.name}}</p>
        </div>
        <div class="txtBox" v-for="(uitem,uindex) in item.children" :key="uindex">
          <p class="num">{{uitem.value}}</p>
          <p class="name">{{uitem.name}}</p>
        </div>
      </div>

      <div class="choiceTxtsww" v-for="(item,index) in GmvStalist1" :key="index+10">
        <div class="txtBox">
          <p class="num">{{item.children[0].value}}</p>
          <p class="name">{{item.name}}</p>
        </div>
        <div class="txtBox" v-for="(uitem,uindex) in item.children" :key="uindex+10">
          <p class="num">{{uitem.value}}</p>
          <p class="name">{{uitem.name}}</p>
        </div>
      </div>

      <div class="choiceTxtsww" v-for="(item,index) in GmvStalist2" :key="index+20">
        <div class="txtBox">
          <p
            class="num"
          >{{Number(item.children[0].value)+Number(item.children[1].value)+Number(item.children[2].value)}}</p>
          <p class="name">{{item.name}}</p>
        </div>
        <div class="txtBox" v-for="(uitem,uindex) in item.children" :key="uindex+20">
          <p class="num">{{uitem.value}}</p>
          <p class="name">{{uitem.name}}</p>
        </div>
      </div>

      <div class="choiceTxtsww" v-for="(item,index) in GmvStalist3" :key="index+30">
        <div class="txtBox">
          <p
            class="num"
          >{{Number(item.children[0].value)+Number(item.children[1].value)+Number(item.children[2].value)}}</p>
          <p class="name">{{item.name}}</p>
        </div>
        <div class="txtBox" v-for="(uitem,uindex) in item.children" :key="uindex+30">
          <p class="num">{{uitem.value}}</p>
          <p class="name">{{uitem.name}}</p>
        </div>
      </div>
    </div>
    <!-- 订单分析构成 -->
    <div class="transactionChart">
      <div id="mycharts" ref="fenmycharts"></div>
    </div>
  </div>
</template>
<script>
import {
  getProprietaryTradingOverview, //自营交易概览
} from "@/api/order";
import {
  getSupplierTransactionProportion,
  getOrderGoodsOverviewByCategroy,
  getOrderGoodsByByPositionFrom,
  getOrderConversionstatistics,
  getTheOrderTrendByHour,
  getGmvStatistics,
  getOrderStatistics,
  getOrderTypes,
  getOrderSources,
} from "../../api/unalays";
export default {
  data() {
    return {
      categoryRadio: 0, //选择日期
      categoryTimeDur: "",
      numberBoxList: "", //自营交易概览
      Supplierlist: "", //供应商占比
      OrderGoodslist: "", //类目占比
      OrderGoodsByBylist: "", //渠道占比
      OrderConverslist: "", //访问下单转化率
      TheOrderTrendlist: "", //交易走势

      GmvStalist: "", //旭日图
      GmvStalist1: "", //旭日图
      GmvStalist2: "", //旭日图
      GmvStalist3: "", //旭日图
      value: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
      goodsChannels: [], //商品渠道
      goodstype: "", //商品渠道值
      orderChannels: [], //订单渠道
      ordertype: "", //订单渠道值
    };
  },
  mounted: function () {
    this.getOrderTypes();
    this.getOrderSources();
    this.getCateListBtn(this.categoryRadio);
  },
  methods: {
    //订单渠道
    getOrderSources() {
      getOrderSources().then((res) => {
        let _this = this;
        _this.orderChannels = res.data.data;
      });
    },
    //商品渠道
    getOrderTypes() {
      getOrderTypes().then((res) => {
        let _this = this;
        _this.goodsChannels = res.data.data;
      });
    },
    // 选择渠道
    orderTypeClick() {
      this.getProprietaryTrading();
      this.getSupplierTransaction();
      this.getOrderGoodsOverview();
      this.getOrderGoodsBy();
      this.getOrderConver();
      this.getTheOrderTrend();
      this.getGmvStatisticslist();
      this.getOrderStatisticsxw();
    },
    // 选择时间
    choseDate(e) {
      this.getProprietaryTrading();
      this.getSupplierTransaction();
      this.getOrderGoodsOverview();
      this.getOrderGoodsBy();
      this.getOrderConver();
      this.getTheOrderTrend();
      this.getGmvStatisticslist();
      this.getOrderStatisticsxw();
      this.getOrderTypes();
    },
    // 自营交易概览
    getProprietaryTrading() {
      this.loading = true;
      let params = {
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      };
      getProprietaryTradingOverview(params).then((res) => {
        if (res.data.code == 200) {
          this.numberBoxList = res.data.data;
          this.loading = false;
        }
      });
    },
    //供应商占比
    getSupplierTransaction() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getSupplierTransactionProportion(params).then((res) => {
        let _data = res.data.data.splProportionData.slice(0, 4);
        _self.Supplierlist = _data;
        _data.map((val) => {
          (val.name = val.supplierName), (val.value = val.actualPrice);
        });
        _self.listone(_data);
      });
    },
    //类目占比
    getOrderGoodsOverview() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getOrderGoodsOverviewByCategroy(params).then((res) => {
        let _data = res.data.data.list.slice(0, 4);
        _self.OrderGoodslist = _data;
        _data.map((val) => {
          (val.name = val.categoryName), (val.value = val.customerUnitPrice);
        });
        _self.listtwo(_data);
      });
    },
    //渠道占比
    getOrderGoodsBy() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getOrderGoodsByByPositionFrom(params).then((res) => {
        let _data = res.data.data;
        _self.OrderGoodsByBylist = _data;
        // console.log(res.data.data, "7777777");
      });
    },
    //访问  下单  支付 退款转换率
    getOrderConver() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getOrderConversionstatistics(params).then((res) => {
        let _data = res.data.data;
        _self.OrderConverslist = _data;
      });
    },
    //交易走势 gmv 和订单数
    getTheOrderTrend() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getTheOrderTrendByHour(params).then((res) => {
        let _data = res.data.data;
        _self.TheOrderTrendlist = _data;
        let _day = [];
        let _count = [];
        let _price = [];
        _data.map((val) => {
          _day.push(val.hour);
          _count.push(val.orderCount);
          _price.push(val.actualPrice);
        });
        _self.listthree(_day, _count, _price);
      });
    },
    // 旭日图
    getGmvStatisticslist() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
      };
      getGmvStatistics(params).then((res) => {
        console.log(res);
        if ((res.data.code = 200)) {
          let _datasw = res.data.data;
          _self.GmvStalist = _datasw.gmvByIsCpsData;
          _self.GmvStalist1 = _datasw.gmvByIsMemberGoodsData;
          _self.GmvStalist2 = _datasw.gmvByProprietaryData;
          _self.GmvStalist3 = _datasw.gmvByProprietaryToBData;
          let _data = res.data.data.gmvByIsCpsData;
          _data.map((val) => {
            val.value = parseInt(
              val.children
                .map((item) => item.value)
                .reduce((total, num) => total + num)
            );
          });
          let _data1 = res.data.data.gmvByIsMemberGoodsData;
          _data1.map((val) => {
            val.value = parseInt(
              val.children
                .map((item) => item.value)
                .reduce((total, num) => total + num)
            );
          });
          let _data2 = res.data.data.gmvByProprietaryData;
          _data2.map((val) => {
            val.value = parseInt(
              val.children
                .map((item) => item.value)
                .reduce((total, num) => total + num)
            );
          });
          let _data3 = res.data.data.gmvByProprietaryToBData;
          _data3.map((val) => {
            val.value = parseInt(
              val.children
                .map((item) => item.value)
                .reduce((total, num) => total + num)
            );
          });
          let sdata = [
            { name: "CPS", children: _data },
            { name: "大礼包", children: _data1 },
            { name: "自营", children: _data2 },
            { name: "自营大B", children: _data3 },
          ];
          _self.listfour(sdata);
        } else {
          alert(res);
        }
      });
    },
    // 趋势
    getOrderStatisticsxw() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
      };
      getOrderStatistics(params).then((res) => {
        if (res.data.code == 200) {
          let _data = res.data.data.orderTypeData;
          let _alist = [];
          let _blist = [];
          let _clist = [];
          _data.map((val) => {
            _alist.push(val.orderTypeName);
            _blist.push(parseInt(val.actualPrice));
            _clist.push(val.orderCount);
          });
          _self.listfive(_alist, _blist, _clist);
        }
      });
    },
    // 图1
    listone(list) {
      let gys = this.$echarts.init(this.$refs.gys);
      gys.setOption({
        title: {
          text: "自营供应商交易占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            top: "30",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: list,
          },
        ],
      });
    },
    //图二
    listtwo(list) {
      console.log(list);
      let tradeCategory = this.$echarts.init(this.$refs.tradeCategory);
      tradeCategory.setOption({
        title: {
          text: "交易品类占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            top: "30",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: list,
          },
        ],
      });
    },
    listthree(day, count, price) {
      // 交易走势
      // 近30销卡趋势图
      let mycharts = this.$echarts.init(this.$refs.mycharts);
      mycharts.setOption({
        title: {
          text: "近30天数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["支付金额", "新增订单"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: day,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "支付金额",
            type: "line",
            stack: "总量",
            data: price,
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: count,
          },
        ],
      });
    },
    listfour(e) {
      // 旭日图
      let xmycharts = this.$echarts.init(this.$refs.xumycharts);
      let _data = e;
      xmycharts.setOption({
        visualMap: {
          type: "continuous",
          min: 0,
          max: 10000000,
          inRange: {
            color: ["#2D5F73", "#538EA6", "#F2D1B3", "#F2B8A2", "#F28C8C"],
          },
        },
        series: {
          type: "sunburst",
          data: _data,
          radius: [0, "90%"],
          label: {
            rotate: "radial",
          },
        },
      });
    },
    listfive(alist, blist, clist) {
      // 订单分析构成
      let fmycharts = this.$echarts.init(this.$refs.fenmycharts);
      fmycharts.setOption({
        title: {
          text: "订单分析构成",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["销售量", "销售额"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: alist,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销售量",
            type: "line",
            stack: "总量",
            data: clist,
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: blist,
          },
        ],
      });
    },
    // 时间
    getCateListBtn(val) {
      let categoryTimeDur = [];
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      // 昨日  本周  本月  全部
      if (val == 0) {
        var end = new Date();
        end.setTime(end.getTime() - 24 * 60 * 60 * 1000);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
        ];
      } else if (val == 1) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 7);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
      } else if (val == 2) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 30);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
      } else if (val == 3) {
        // console.log(val,"全部=一年=")
        //  categoryTimeDur = [`${yy}-01-01`, `${yy}-${mm}-${dd}`]
      }
      this.categoryTimeDur = categoryTimeDur;
      this.getProprietaryTrading();
      this.getSupplierTransaction();
      this.getOrderGoodsOverview();
      this.getOrderGoodsBy();
      this.getOrderConver();
      this.getTheOrderTrend();
      this.getGmvStatisticslist();
      this.getOrderStatisticsxw();
      this.getOrderTypes();
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.titles {
  color: #2c2b2b;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}
.bot {
  margin-bottom: 80px;
}
.searchBox {
  display: flex;
  justify-content: flex-end;
}
.channels {
  width: 100%;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.sv {
  margin-left: 1rem;
}
.botss {
  margin-bottom: 20px;
}
.numBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.numBox .box {
  text-align: center;
}
.numBox .box .num {
  font-size: 26px;
  color: #333;
  margin-bottom: 10px;
}
.numBox .box .name {
  font-size: 14px;
  color: #aaa;
}
.tranPie {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.self-gys {
  width: 48%;
  display: flex;
  justify-content: space-between;
}
.self-gys .gysBoxTxts {
  overflow-y: scroll;
  height: 300px;
}
.self-gys .gysBoxTxts .percentage {
  margin-left: 10px;
}
#gys,
#tradeCategory {
  width: 50%;
  height: 300px;
}
.gysBoxTxts {
  /* width: 48%; */
  width: 100%;
}
.gysBoxTxts li {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #aaa;
  /* justify-content: space-around; */
  justify-content: start;
  flex-wrap: wrap;
}
.gysBoxTxts li .name::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background: crimson;
}
.gysBoxTxts li .num {
  margin-left: 8px;
}
.tradingChannelBox {
  width: 100%;
  display: flex;
  /* justify-content: space-around; */
}
.tradingChannelBox > div {
  /* width: 33.3%; */
  width: 50%;
  height: 300px;
  /* border: 1px solid red; */
}
.ChannelsTxts {
  list-style: none;
  width: 80%;
  margin: 0 auto;
}
.ChannelsTxts:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.ChannelsTxts li {
  width: 50%;
  /* margin-bottom: 40px; */
  float: left;
  text-align: center;
}
.ChannelsTxts li .num {
  font-size: 30px;
  margin-bottom: 6px;
}
.ChannelsTxts li .name {
  color: #aaa;
  font-size: 16px;
}
.xrt {
}
.choiceSearch {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}
.choiceBoxContent {
  display: flex;
  justify-content: space-between;
}
.choiceImgBox {
  width: 40%;
}
.choiceBoxTxts {
  width: 60%;
  /* display: flex; */
  /* justify-content: space-between; */
}
.choiceTxts {
  display: flex;
  justify-content: space-evenly;
  width: 94%;
  margin: 0 auto;
  padding-bottom: 10px;
  border-bottom: 1px dashed #aaa;
}
.choiceTxts .txtBox {
  width: 50%;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
}
.choiceTxtsww {
  display: flex;
  justify-content: right;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 10px;
  border-bottom: 1px dashed #aaa;
}
.choiceTxtsww .txtBox {
  width: 25%;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
}
.txtBox .num {
  font-size: 30px;
  /* margin-bottom: 6px; */
  margin-bottom: 0px;
  margin-top: 20px;
  text-align: center;
}
.txtBox .name {
  color: #aaa;
  font-size: 16px;
  text-align: center;
  margin: 10px 0px;
}
#mycharts {
  width: 100%;
  height: 400px;
}
.choiceKuai {
  padding: 40px 0 0 0;
}

.kuaiBox {
  position: relative;
  width: 70%;
  margin: 0 auto;
}
.kuaiBox img {
  width: 100%;
}
.kuaiBox .kuai {
  color: #fff;
  font-size: 20px;
  position: absolute;
}
.kuaiBox .kuai1 {
  top: 4%;
  left: 46%;
}
.kuaiBox .kuai2 {
  top: 29%;
  left: 46%;
}
.kuaiBox .kuai3 {
  bottom: 34%;
  left: 46%;
}
.kuaiBox .kuai4 {
  bottom: 10%;
  left: 46%;
}
.siix_box {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.percentageTxt1,
.percentageTxt2,
.percentageTxt3,
.percentageTxt4 {
  position: absolute;
  text-align: center;
}
.percentageTxt1 {
  top: 19%;
}
.percentageTxt2 {
  top: 31%;
  right: -6%;
}
.percentageTxt3 {
  top: 43%;
  left: 4%;
}
.percentageTxt4 {
  bottom: 24%;
  left: 20%;
}
.percentageTxt1 .name,
.percentageTxt2 .name,
.percentageTxt3 .name,
.percentageTxt4 .name {
  font-size: 14px;
  color: #333;
  margin: 0 0 4px 0;
}
.percentageTxt1 .num,
.percentageTxt2 .num,
.percentageTxt3 .num,
.percentageTxt4 .num {
  font-size: 16px;
  color: #000;
  margin: 0;
}
</style>