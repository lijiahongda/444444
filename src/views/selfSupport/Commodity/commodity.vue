<template>
  <div class="main">
    <div class="headBoxs">
      <!-- 日期搜索 -->
      <div class="searchBox">
        <el-radio-group
          v-model="categoryRadio"
          @change="getCateListBtn"
          class="right"
          style="margin-right:10px;"
        >
          <el-radio-button :label="0">今日</el-radio-button>
          <el-radio-button :label="1">昨日</el-radio-button>
          <el-radio-button :label="2">近7日</el-radio-button>
          <el-radio-button :label="3">本月</el-radio-button>
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
    </div>

    <!-- 自营交易概览 -->
    <div class="bot">
      <p class="titles">商品数据概览</p>
      <div class="numBox">
        <div class="box">
          <p class="num">{{GoodsCountlist.stateGoodsCount}}</p>
          <p class="name">自营商品上架数</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.cyGoodsCount}}</p>
          <p class="name">彩云商品上架数</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.ddGoodsCount}}</p>
          <p class="name">当当商品上架数</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.klGoodsCount}}</p>
          <p class="name">考拉商品上架数</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.jdGoodsCount}}</p>
          <p class="name">京东商品上架数</p>
        </div>
      </div>
      <div class="numBox">
        <div class="box">
          <p class="num">{{GoodsCountlist.cartGoodsCount}}</p>
          <p class="name">购物车商品</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.orderGoodsCount}}</p>
          <p class="name">下单商品</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.refundGoodsCount}}</p>
          <p class="name">退款商品</p>
        </div>

        <div class="box">
          <p class="num">{{GoodsCountlist.stateOrder}}</p>
          <p class="name">上架-支付转化率</p>
        </div>
        <div class="box">
          <p class="num">{{GoodsCountlist.orderRefund}}</p>
          <p class="name">退款率</p>
        </div>
      </div>
    </div>
    <!-- 平台用户  用户趋势 -->
    <!-- <div class="userBoxs bot">
				<div class="choiceImgBox">
                    <div class="choiceKuai">
                        <div class="kuaiBox">
                            <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-05/15/yuelvhuii6o3Zuby951596613769.jpg" alt="" class="img">
                            <div class="kuai kuai1">
								<p>商品上架</p>
								<p>345654</p>
 							</div>
							<div class="kuai kuai2">
								<p>商品访问次数</p>
								<p>345654</p>
							</div>
                            <div class="kuai kuai3">
								<p>下单商品</p>
								<p>345654</p>

 							</div>
							<div class="kuai kuai4">
								<p>退款商品</p>
								<p>345654</p>
 							</div>
							<div class="percentageTxt1">
                                <p class="name">访问-下单转化率</p>
                                <p class="num">59%</p>
                            </div>
                            <div class="percentageTxt2">
                                <p class="name">访问-支付转化率</p>
                                <p class="num">59%</p>
                            </div>
                            <div class="percentageTxt3">
                                <p class="name">下单-支付转化率</p>
                                <p class="num">59%</p>
                            </div>
                            <div class="percentageTxt4">
                                <p class="name">退款率</p>
                                <p class="num">59%</p>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="userTrends">
					<div class="userTrends_numbe">
						<div>
							<p>购物车商品</p>
							<p>345654</p>
						</div>
						<div>
							<p>商品分享总数</p>
							<p>345654</p>
						</div>
					</div>
					<div class="platformUsers">
						<div id="Platform" ref="Platform" ></div>
						<div>
							<div class="platformTxtBox">
								<p class="name">黑金会员</p>
								<p class="num">30%</p>
								<p class="num">2345人</p>
							</div>
							<div class="platformTxtBox">
								<p class="name">黑金会员</p>
								<p class="num">60%</p>
								<p class="num">2345人</p>
							</div>
						</div>
					</div>
                  	<div id="Trends" ref="Trends"></div>
             </div>
    </div>-->
    <!-- 商品概览 -->
    <div class="productOverview bot">
      <div class="productTxtBox">
        <div class="numBox">
          <div class="box">
            <p class="name">动销数（sku）</p>
            <p class="num">{{GoodsDonglist.dongNum}}</p>
          </div>
          <div class="box">
            <p class="name">动销率</p>
            <p class="num">{{GoodsDonglist.dongBiLi}}%</p>
          </div>
        </div>
        <p class="titles">近30天动销率趋势图</p>
      </div>
      <div id="product" ref="product"></div>
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
import { getGoodsCountData, getGoodsDong } from "@/api/shopComms";
import {
  getOrderGoodsOverview, //商品销量排行榜
  getOrderGoodsOverviewBySpl, //供应商热销排行
  getOrderGoodsOverviewByCategroy, //品类排行
} from "@/api/order";
import { getOrderTypes,getOrderSources } from "@/api/unalays";
export default {
  data() {
    return {
      categoryRadio: 0,
      categoryTimeDur:"",
      GoodsCountlist: "", //商品数据概览
      GoodsDonglist: "", //动销数
      shoptTabFormList: [], //商品销量排行榜
      gysTabFormList: [], //供应商热销排行
      categoryTabFormList: [], //品类排行
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
    let _self = this;
    _self.getOrderSources();
    _self.getOrderTypes();
    _self.getCateListBtn(_self.categoryRadio);
    _self.getOrderGoodsOverview();
  },
  watch: {
    cur: {
      handler: function (val, oldval) {
        if (val == 0) {
          this.getOrderGoodsOverview();
        } else if (val == 1) {
          this.getOrderGoodsOverviewBySpl();
        } else {
          this.getOrderGoodsOverviewByCategroy();
        }
        console.log(val);
      },
      deep: true,
    },
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
      this.getGoodsCount();
      this.getGoodsDlist();
    },
      // 选择时间
    choseDate (e) {
      this.getGoodsCount();
      this.getGoodsDlist();
    },
    getCateListBtn(val) {
      let categoryTimeDur = [];
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      //今天/今日/近一周/近本月
      if (val == 0) {
        categoryTimeDur = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`];
      } else if (val == 1) {
        let end = new Date();
        end.setTime(end.getTime() - 24 * 60 * 60 * 1000);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
      } else if (val == 2) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 7);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
      } else if (val == 3) {
        let end = new Date();
        end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 30);
        categoryTimeDur = [
          `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
          `${yy}-${mm}-${dd}`,
        ];
      }
      this.categoryTimeDur = categoryTimeDur;
      this.getGoodsCount();
      this.getGoodsDlist();
    },
    // 商品数据统计
    getGoodsCount() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getGoodsCountData(params).then((res) => {
        _self.GoodsCountlist = res.data.data;
      });
    },
    // 动销数
    getGoodsDlist() {
      let _self = this;
      let params = {
        startTime:
          _self.categoryTimeDur.length > 0 ? _self.categoryTimeDur[0] : "",
        endTime:
          _self.categoryTimeDur.length > 1 ? _self.categoryTimeDur[1] : "",
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      }
      getGoodsDong(params).then((res) => {
        this.GoodsDonglist = res.data.data;
        let _data = res.data.data.list;
        let _day = [];
        let _num = [];
        _data.map((val) => {
          _data.push(val.orderTime);
          _num.push(val.dongNum);
        });
        _self.list(_day, _num);
      });
    },
    //图1
    list(day, num) {
      //商品概览
      let product = this.$echarts.init(this.$refs.product);
      product.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
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
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: num,
            smooth: true,
          },
        ],
      });
      // // 平台用户
      // let Platform = this.$echarts.init(this.$refs.Platform);
      // Platform.setOption({
      //   title: {
      //     text: "商品访问类目占比",
      //     textStyle: {
      //       fontSize: 13,
      //     },
      //   },
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b}: {c} ({d}%)",
      //   },
      //   series: [
      //     {
      //       name: "访问来源",
      //       type: "pie",
      //       radius: ["35%", "55%"],
      //       avoidLabelOverlap: false,

      //       data: [
      //         { value: 335, name: "直接访问" },
      //         { value: 310, name: "邮件营销" },
      //         { value: 234, name: "联盟广告" },
      //         { value: 135, name: "视频广告" },
      //         { value: 1548, name: "搜索引擎" },
      //       ],
      //     },
      //   ],
      // });
      // //用户趋势
      // let Trends = this.$echarts.init(this.$refs.Trends);
      // Trends.setOption({
      //   title: {
      //     text: "商品访问曲线",
      //     textStyle: {
      //       fontSize: 13,
      //     },
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   legend: {
      //     data: ["邮件营销", "联盟广告"],
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "2%",
      //     containLabel: true,
      //   },
      //   xAxis: {
      //     type: "category",
      //     boundaryGap: false,
      //     data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       name: "邮件营销",
      //       type: "line",
      //       stack: "总量",
      //       data: [120, 132, 101, 134, 90, 230, 210],
      //     },
      //     {
      //       name: "联盟广告",
      //       type: "line",
      //       stack: "总量",
      //       data: [220, 182, 191, 234, 290, 330, 310],
      //     },
      //   ],
      // });
    },
    // 表格  商品销量排行榜
    getOrderGoodsOverview() {
      this.loading = true;
      getOrderGoodsOverview({
        page: this.searchForm.page,
        startTime: "",
        endTime: "",
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
        startTime: "",
        endTime: "",
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
        startTime: "",
        endTime: "",
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
  /* margin-bottom: 20px; */
}
.numberBoxs {
  display: flex;
}
.searchBox {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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
  text-align: center;
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
.productTxt .num {
  font-size: 24px;
}
.bot {
  margin-bottom: 40px;
}
#product {
  width: 100%;
  height: 340px;
}
#Platform {
  /* width:75%; */
  width: 64%;
  height: 280px;
}
.userBoxs {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.userBoxs > div {
  width: 48%;
}
.userBoxs .userBoxs_left {
  width: 40%;
}
.userBoxs .userTrends {
  width: 50%;
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
.platformTxtBox .num {
  font-size: 14px;
  color: #aaa;
  min-width: 90px;
  text-align: center;
}
#Trends {
  width: 100%;
  /* height:300px; */
  height: 240px;
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
.userTrends_numbe {
  display: flex;
  margin-bottom: 30px;
}
.userTrends_numbe div:nth-child(1) {
  margin-right: 15%;
}
.userTrends_numbe div p:nth-child(1) {
  font-size: 14px;
  color: #777;
}
.userTrends_numbe div p:nth-child(2) {
  font-size: 28px;
  color: #333;
  margin: 0px;
}
.productTxtBox .numBox {
  justify-content: start;
  width: 100%;
}
.productTxtBox .numBox .box {
  margin-right: 20px;
}
.productTxtBox .numBox .name {
  font-size: 17px;
  color: #333;
}
.productTxtBox .numBox .num {
  font-size: 22x;
  color: #000;
  margin-top: 0px;
}

.choiceImgBox {
  width: 40%;
}
.choiceKuai {
  /* padding: 40px 0 0 0; */
}

.kuaiBox {
  position: relative;
  width: 80%;
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
.kuaiBox .kuai p:nth-child(1) {
  color: #fff;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
}
.kuaiBox .kuai p:nth-child(2) {
  color: #fff;
  font-size: 20px;
  margin: 0px;
  font-weight: bold;
  text-align: center;
}
.kuaiBox .kuai1 {
  top: 4%;
  left: 42%;
}
.kuaiBox .kuai2 {
  top: 29%;
  left: 42%;
}
.kuaiBox .kuai3 {
  bottom: 36%;
  left: 42%;
}
.kuaiBox .kuai4 {
  bottom: 12%;
  left: 42%;
}
.percentageTxt1,
.percentageTxt2,
.percentageTxt3,
.percentageTxt4 {
  position: absolute;
  text-align: center;
}
.percentageTxt1 {
  top: 20%;
}
.percentageTxt2 {
  top: 33%;
  right: 0%;
}
.percentageTxt3 {
  top: 45%;
  left: 8%;
}
.percentageTxt4 {
  bottom: 25%;
  left: 22%;
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
