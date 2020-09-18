<template>
  <div class="main" v-loading="loading">
    <div class="headBoxs">
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
          <el-option
            v-for="item in goodsChannels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select class="sv" v-model="ordertype" clearable placeholder="订单渠道">
          <el-option
            v-for="item in orderChannels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button class="sv" @click="orderTypeClick()" type="primary">选择订单类型</el-button>
      </div>
      <!-- 自营交易概览 -->
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
          <!-- <div class="box">
                        <p class="num">11323</p>
                        <p class="name">供应商结算</p>
          </div>-->
        </div>
      </div>
      <!-- 关键指标 -->
      <div class="keyIndicators bot">
        <p class="titles">关键指标</p>
        <div class="keyIndicatorsBoxs">
          <!-- <div class="box">
                        <p class="num">42354</p>
                        <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
                        <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>
                        <p class="name">访问次数</p>   
          </div>-->
          <div class="box">
            <p class="num">{{keyIndicatorsList.orderCount}}</p>
            <!-- <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
            <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>-->
            <p class="name">订单数</p>
          </div>
          <!-- <div class="box">
                        <p class="num">42354</p>
                        <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
                        <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>
                        <p class="name">访问下单转化率</p>   
          </div>-->
          <div class="box">
            <p class="num">{{keyIndicatorsList.memberCount}}</p>
            <!-- <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
            <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>-->
            <p class="name">新增用户数</p>
          </div>
          <div class="box">
            <p class="num">{{keyIndicatorsList.activeUsersData?keyIndicatorsList.activeUsersData:0}}</p>
            <!-- <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
            <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>-->
            <p class="name">老用户活跃</p>
          </div>
          <!-- <div class="box">
                        <p class="num">42354</p>
                        <p class="txt top">周同比 <i class="el-icon-caret-top"></i> 12%</p>
                        <p class="txt bot">日环比 <i class="el-icon-caret-bottom"></i> 12%</p>
                        <p class="name">访问用户数</p>   
          </div>-->
        </div>
      </div>
      <!-- 30天数据 -->
      <div class="bot" id="mycharts" ref="mycharts"></div>
    </div>
    <!-- 商品概览 -->
    <div class="productOverview bot">
      <p class="titles">商品概览</p>
      <div class="productTxtBox">
        <div class="numBox">
          <div class="box">
            <p class="num">{{productList.goodsCount}}</p>
            <p class="name">上架商品总数</p>
          </div>
          <div class="box">
            <p class="num">{{productList.orderGoodsCount}}</p>
            <p class="name">下单商品数</p>
          </div>
          <div class="box">
            <p class="num">{{productList.orderGoodsCountByPin}}</p>
            <p class="name">动销数</p>
          </div>
          <div class="box">
            <p class="num">{{productList.pinLv}}</p>
            <p class="name">动销率</p>
          </div>
        </div>
      </div>
      <div id="product" ref="product"></div>
    </div>
    <!-- 平台用户  用户趋势 -->
    <div class="userBoxs bot">
      <div class="platformUsers">
        <div id="Platform" ref="Platform"></div>
        <div>
          <div class="platformTxtBox" v-for="(item,index) in  userBoxsList.memberData" :key="index">
            <p class="name">{{item.name}}</p>
            <p class="num">{{item.memberCount}}人</p>
          </div>
        </div>
      </div>
      <div class="userTrends">
        <div id="Trends" ref="Trends"></div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="tableForm">
      <div class="tabs">
        <div class="tabList">
          <p
            v-for="(item,index) in tabTitle"
            :key="index"
            @click="cur=index"
            :class="{active:cur==index}"
          >{{item.tab}}</p>
        </div>
        <!-- <el-radio-group v-model='categoryRadio' @change='getCateListBtn' class="right" style="margin-right:10px;">
                    <el-radio-button :label="0">今年</el-radio-button>
                    <el-radio-button :label="1">今日</el-radio-button>
                    <el-radio-button :label="2">近一周</el-radio-button>
                    <el-radio-button :label="3">近本月</el-radio-button>
        </el-radio-group>-->
      </div>
      <div class="tableBox">
        <div v-show="cur==0">
          <el-table :data="shoptTabFormList.list" style="width: 100%" border stripe>
            <el-table-column label="序号">
              <template
                slot-scope="scope"
              >{{scope.$index+1+(shoptTabFormList.page-1)*shoptTabFormList.pageSize}}</template>
            </el-table-column>
            <el-table-column prop="customerUnitPrice" label="客单价"></el-table-column>
            <el-table-column prop="gmv" label="GMV"></el-table-column>
            <el-table-column prop="goodsId" label="商品ID"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
          </el-table>
          <el-pagination
            :current-page="shoptTabFormList.page"
            :page-size="shoptTabFormList.pageSize"
            :total="shoptTabFormList.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div v-show="cur==1">
          <el-table :data="gysTabFormList.list" style="width: 100%" border stripe>
            <el-table-column prop="customerUnitPrice" label="客单价"></el-table-column>
            <el-table-column prop="gmv" label="GMV"></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
          </el-table>
          <el-pagination
            :current-page="gysTabFormList.page"
            :page-size="gysTabFormList.pageSize"
            :total="gysTabFormList.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </div>
        <div v-show="cur==2">
          <el-table :data="categoryTabFormList.list" style="width: 100%" border stripe>
            <el-table-column prop="categoryName" label="分类名称"></el-table-column>
            <el-table-column prop="customerUnitPrice" label="客单价"></el-table-column>
            <el-table-column prop="gmv" label="GMV"></el-table-column>
          </el-table>
          <el-pagination
            :current-page="categoryTabFormList.page"
            :page-size="categoryTabFormList.pageSize"
            :total="categoryTabFormList.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getProprietaryTradingOverview, //自营交易概览
  getKeyIndicators, //关键指标
  getOrderCountOverviewByDay, //订单日曲线
  getMemberCountData, //平台用户
  getOrderGoodsOverview, //商品销量排行榜
  getOrderGoodsOverviewBySpl, //供应商热销排行
  getOrderGoodsOverviewByCategroy, //品类排行
  getOrderGoodsOverviewByPin, //商品概览
} from "@/api/order";
import { getOrderSources, getOrderTypes } from "../../api/unalays";
import ECharts from "echarts";
import "../../../node_modules/echarts/map/js/china";
require("echarts/map/js/china"); // 引入中国地图数据

export default {
  data() {
    return {
      loading: false,
      categoryRadio: 0, //选择日期
      categoryTimeDur: [], //选择时间
      numberBoxList: {}, //自营交易概览
      keyIndicatorsList: {}, //关键指标
      userBoxsList: {}, //平台用户
      shoptTabFormList: [], //商品销量排行榜
      gysTabFormList: [], //供应商热销排行
      categoryTabFormList: [], //品类排行
      productList: [], //商品概览
      searchForm: {
        page: 1,
      },
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
      tabTitle: [
        { index: 0, tab: "商品销量排行榜" },
        { index: 1, tab: "供应商排行" },
        { index: 2, tab: "品类排行" },
      ],
      cur: 0,
      goodsChannels: [], //商品渠道
      goodstype: "", //商品渠道值
      orderChannels: [], //订单渠道
      ordertype: "", //订单渠道值
    };
  },
  mounted: function () {
    // this.getProprietaryTradingOverview();
    // this.getKeyIndicators();
    this.getOrderSources();
    this.getOrderTypes();
    // let yy = new Date().getFullYear();
    // let mm = new Date().getMonth() + 1;
    // let dd = new Date().getDate();
    // var end = new Date();
    // end.setTime(end.getTime() - 24 * 60 * 60 * 1000);
    // this.categoryTimeDur = [
    //   `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
    //   `${yy}-${mm}-${dd}`,
    // ];
    this.getOrderGoodsOverview();
    this.getCateListBtn(this.categoryRadio);
  },
  methods: {
    //选择订单类型
    orderTypeClick() {
      // this.getProprietaryTradingOverview()
      // this.getKeyIndicators()
      // this.getOrderCountOverviewByDay()
      // this.getOrderGoodsOverviewByPin()
      // this.getOrderGoodsOverview()
      // this.getOrderGoodsOverviewBySpl()
      // this.getOrderGoodsOverviewByCategroy()

      // this.getProprietaryTradingOverview();
      // this.getKeyIndicators();
       this.getProprietaryTradingOverview();
      this.getKeyIndicators();
      this.getOrderCountOverviewByDay();
      this.getMemberCountData();
      this.getOrderGoodsOverviewByPin();
    },
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
        console.log(res.data.data, "jhhahahhah");
      });
    },
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
        // console.log( categoryTimeDur,"昨日==")
      } else if (val == 1) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 7);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
        // console.log( categoryTimeDur,"本周==")
      } else if (val == 2) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 30);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
        // console.log( categoryTimeDur,"本月==")
      } else if (val == 3) {
        // console.log(val,"全部=一年=")
        //  categoryTimeDur = [`${yy}-01-01`, `${yy}-${mm}-${dd}`]
      }
      this.categoryTimeDur = categoryTimeDur;
      this.searchForm.page = 1;
      // this.getProprietaryTradingOverview();
      // this.getKeyIndicators();
      this.getProprietaryTradingOverview();
      this.getKeyIndicators();
      this.getOrderCountOverviewByDay();
      this.getMemberCountData();
      this.getOrderGoodsOverviewByPin();
    },
    // 选择时间
    choseDate(e) {
      // this.getProprietaryTradingOverview();
      // this.getKeyIndicators();
       this.getProprietaryTradingOverview();
      this.getKeyIndicators();
      this.getOrderCountOverviewByDay();
      this.getMemberCountData();
      this.getOrderGoodsOverviewByPin();
    },
    // 自营交易概览
    getProprietaryTradingOverview() {
      this.loading = true;
      let params = {
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
          startTime:this.categoryTimeDur.length >0 ? this.categoryTimeDur[0] : '',
          endTime:this.categoryTimeDur.length >1 ? this.categoryTimeDur[1] : ''
      }
      getProprietaryTradingOverview(params).then((res) => {
        if (res.data.code == 200) {
          this.numberBoxList = res.data.data;
          this.loading = false;
        }
      });
    },
    //关键指标
    getKeyIndicators() {
      this.loading = true;
      getKeyIndicators({
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.keyIndicatorsList = res.data.data;
          this.loading = false;
        }
      });
      this.getOrderCountOverviewByDay();
    },
    //订单日曲线
    getOrderCountOverviewByDay() {
      this.loading = true;
      getOrderCountOverviewByDay({
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.mychartsList = res.data.data;
          var day = [];
          var orderCount = [];
          this.mychartsList.map((item) => {
            day.push(item.day);
            orderCount.push(item.orderCount);
          });
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
              data: ["支付笔数"],
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
                name: "支付笔数",
                type: "line",
                stack: "总量",
                data: orderCount,
              },
            ],
          });
          // this.getOrderGoodsOverviewByPin();
          this.loading = false;
        }
      });
    },
    // 商品概览
    getOrderGoodsOverviewByPin() {
      this.loading = true;
      // {
      //     startTime:this.categoryTimeDur.length >0 ? this.categoryTimeDur[0] : '',
      //     endTime:this.categoryTimeDur.length >1 ? this.categoryTimeDur[1] : ''
      // }
      getOrderGoodsOverviewByPin({
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.productList = res.data.data;
          var pinLv = [];
          var pinDay = [];
          this.productList.list.map((item) => {
            pinLv.push(item.pinLv);
            pinDay.push(item.day);
          });
          //商品概览
          let product = this.$echarts.init(this.$refs.product);
          product.setOption({
            title: {
              text: "",
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["动销率"],
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
              data: pinDay,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "动销率",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: pinLv,
              },
            ],
          });

          this.getMemberCountData();
          this.loading = false;
        }
      });
    },

    //平台用户
    getMemberCountData() {
      this.loading = true;
      let params = {
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
      };
      getMemberCountData({}).then((res) => {
        if (res.data.code == 200) {
          this.userBoxsList = res.data.data;
          var userName = [];
          this.userBoxsList.memberData.map((item) => {
            userName.push({
              name: item.name,
              value: item.memberCount,
            });
          });
          var useListActiveUsers = [];
          var useListDay = [];
          this.userBoxsList.list.map((item) => {
            useListActiveUsers.push(item.activeUsers);
            useListDay.push(item.day);
          });
          // 平台用户
          let Platform = this.$echarts.init(this.$refs.Platform);
          Platform.setOption({
            title: {
              text: "平台用户",
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: ["40%", "60%"],
                avoidLabelOverlap: false,
                data: userName,
              },
            ],
          });
          //用户趋势
          let Trends = this.$echarts.init(this.$refs.Trends);
          Trends.setOption({
            title: {
              text: "用户趋势",
            },
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["活跃用户数"],
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
              data: useListDay,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "活跃用户数",
                type: "line",
                stack: "总量",
                areaStyle: {},
                data: useListActiveUsers,
              },
            ],
          });
          // this.getOrderGoodsOverview();
          // this.getOrderGoodsOverviewBySpl();
          // this.getOrderGoodsOverviewByCategroy();
          this.loading = false;
        }
      });
    },
    // 表格  商品销量排行榜
    getOrderGoodsOverview() {
      this.loading = true;
      getOrderGoodsOverview({
        page: this.searchForm.page,
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.shoptTabFormList = res.data.data;
          this.loading = false;
        }
      });
    },
    // 表格  供应商热销排行
    getOrderGoodsOverviewBySpl() {
      this.loading = true;
      getOrderGoodsOverviewBySpl({
        page: this.searchForm.page,
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.gysTabFormList = res.data.data;
          this.loading = false;
        }
      });
    },
    //品类排行
    getOrderGoodsOverviewByCategroy() {
      this.loading = true;
      getOrderGoodsOverviewByCategroy({
        page: this.searchForm.page,
        startTime:
          this.categoryTimeDur.length > 0 ? this.categoryTimeDur[0] : "",
        endTime: this.categoryTimeDur.length > 1 ? this.categoryTimeDur[1] : "",
        orderSource: this.ordertype, //订单渠道
        orderType: this.goodstype, //商品渠道
      }).then((res) => {
        if (res.data.code == 200) {
          this.categoryTabFormList = res.data.data;
          this.loading = false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverview();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverview();
    },
    handleSizeChange1(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverviewBySpl();
    },
    handleCurrentChange1(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverviewBySpl();
    },
    handleSizeChange2(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverviewByCategroy();
    },
    handleCurrentChange2(val) {
      this.searchForm.page = val;
      this.getOrderGoodsOverviewByCategroy();
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
.head {
  border-bottom: 1px solid #ddd;
  background: #f4f4f4;
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
.keyIndicators {
  margin-bottom: 20px;
}
.keyIndicatorsBoxs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.keyIndicatorsBoxs .box {
  text-align: center;
}
.keyIndicatorsBoxs .box .num {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
}
.keyIndicatorsBoxs .box .txt {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}
.keyIndicatorsBoxs .box .txt.top i {
  color: green;
}
.keyIndicatorsBoxs .box .txt.bot i {
  color: red;
}
.keyIndicatorsBoxs .box .name {
  font-size: 16px;
  color: #333;
}
#mycharts {
  width: 100%;
  height: 400px;
}
.productTxt .num {
  font-size: 24px;
}
.bot {
  margin-bottom: 60px;
}
#product {
  width: 100%;
  height: 400px;
}
#Platform {
  width: 50%;
  height: 400px;
}
.userBoxs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userBoxs > div {
  width: 48%;
}
.platformUsers,
.platformTxtBox {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.platformTxtBox .name {
  font-size: 16px;
  color: #333;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  min-width: 100px;
}
.platformTxtBox .name::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background: orange;
  margin-right: 10px;
  border-radius: 50%;
}
.platformTxtBox:first-child .name::before {
  background: #3ba0ff;
}
.platformTxtBox:nth-child(2) .name::before {
  background: #36cbcb;
}
.platformTxtBox:nth-child(3) .name::before {
  background: #4dcb73;
}
.platformTxtBox:nth-child(4) .name::before {
  background: #fad337;
}
.platformTxtBox .num {
  font-size: 14px;
  color: #aaa;
  min-width: 100px;
  text-align: center;
}
#Trends {
  width: 100%;
  height: 400px;
}
.tabs {
  width: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
}
.tabList {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tabList p {
  font-size: 18px;
  margin-right: 30px;
}
.tabList p.active {
  font-size: 20px;
}
.tabList p.active::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: cornflowerblue;
  margin-top: 10px;
}
</style>