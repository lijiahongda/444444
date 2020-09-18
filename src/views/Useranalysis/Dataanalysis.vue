<template>
  <div class="main">
    <!-- T1 -->
    <div class="headModule">
      <div class="keyIndicators bot">
        <div class="searchBox botss">
          <el-radio-group
            v-model="categoryRadio"
            @change="getCateListBtn"
            class="right"
            style="justify-content: flex-end;display: flex;"
          >
            <el-radio-button :label="0">今日</el-radio-button>
            <el-radio-button :label="1">昨日</el-radio-button>
            <el-radio-button :label="2">近7日</el-radio-button>
            <el-radio-button :label="3">本月</el-radio-button>
          </el-radio-group>
          <el-date-picker
            style="margin-right:10px;margin-left:10px;"
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
        <!-- <el-select v-model="goodstype"
                   placeholder="商品渠道">
          <el-option v-for="item in goodsChannels"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="ordertype"
                   placeholder="订单渠道">
          <el-option v-for="item in orderChannels"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>-->
        <div class="keyIndicatorsBoxs">
          <div class="box">
            <p class="num">{{ConversionRate.activeUsersCount?ConversionRate.activeUsersCount:0}}</p>
            <!-- <p class="txt top">
              周同比
              <i class="el-icon-caret-top"></i> 12%
            </p>
            <p class="txt bot">
              日环比
              <i class="el-icon-caret-bottom"></i> 12%
            </p>-->
            <div class="name">
              <p>访问用户</p>
              <div class="box_boxwleft"></div>
              <div class="boxwleft_num">
                <p>转化率</p>
                <p>{{ConversionRate.mCountByaCountLv}}</p>
              </div>
            </div>
          </div>
          <div class="box">
            <p class="num">{{ConversionRate.orderMidCount}}</p>
            <!-- <p class="txt top">
              周同比
              <i class="el-icon-caret-top"></i> 12%
            </p>
            <p class="txt bot">
              日环比
              <i class="el-icon-caret-bottom"></i> 12%
            </p>-->
            <div class="name">
              <p>下单人数</p>
              <div class="box_boxwright"></div>
            </div>
          </div>
          <div class="box">
            <p class="num">{{ConversionRate.memberCount}}</p>
            <!-- <p class="txt top">
              周同比
              <i class="el-icon-caret-top"></i> 12%
            </p>
            <p class="txt bot">
              日环比
              <i class="el-icon-caret-bottom"></i> 12%
            </p>-->
            <div class="name">
              <p>新增用户数</p>
              <div class="box_boxwleft"></div>
              <div class="boxwleft_num">
                <p>转化率</p>
                <p>{{ConversionRate.oCountBymCountLv}}</p>
              </div>
            </div>
          </div>
          <div class="box">
            <p class="num">{{ConversionRate.orderMemberCount}}</p>
            <!-- <p class="txt top">
              周同比
              <i class="el-icon-caret-top"></i> 12%
            </p>
            <p class="txt bot">
              日环比
              <i class="el-icon-caret-bottom"></i> 12%
            </p>-->
            <div class="name">
              <p>新增下单人数</p>
              <div class="box_boxwright"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- T2 -->
    <div class="headModule">
      <el-radio-group
        v-model="categoryRadio1"
        @change="getCateListBtn1"
        class="right"
        style="justify-content: flex-end;display: flex;"
      >
        <el-radio-button :label="0">今日</el-radio-button>
        <el-radio-button :label="1">昨日</el-radio-button>
        <el-radio-button :label="2">近7日</el-radio-button>
        <el-radio-button :label="3">本月</el-radio-button>
      </el-radio-group>
      <div class="platformUsers">
        <div id="Platform" ref="Platform"></div>
        <div>
          <div class="platformTxtBox" v-for="(item,index) in memberData" :key="index">
            <p class="name">{{item.name}}</p>
            <p style="color:gray;">｜</p>
            <p class="num">{{item.memberCount}}人</p>
          </div>
        </div>
        <div id="Platform" ref="Platform2"></div>
        <div>
          <div class="platformTxtBox" v-for="(item,index) in memberData" :key="index">
            <p class="name">{{item.name}}</p>
            <p style="color:gray;">｜</p>
            <p class="num">{{item.gmvLv}}</p>
          </div>
        </div>
        <div class="gmvList">
          <div class="platformTxtBox" v-for="(item,index) in memberData" :key="index">
            <p class="num">¥{{item.actualPrice}}</p>
            <p class="num">人均¥{{item.averageActualPrice}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- T3 -->
    <!-- <div class="headMw">
      <div class="headMw_left">
        <p class="small_tit">线上热门搜索</p>
      </div>
      <div class="headMw_right">
        <p class="small_tit">用户事件</p>
        <el-table :data="tableData" height="240" size="mini" style="width: 100%;">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </div>-->
    <!-- T4 -->
    <div class="headModule">
      <div style="justify-content: flex-end;display: flex; margin-bottom:10px;">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="changeTimeto(value1)"
        ></el-date-picker>
      </div>
      <div class="box">
        <div id="Platform3" ref="Platform3"></div>
      </div>
    </div>
    <!-- 43333 -->
    <div class="headModule">
      <el-date-picker
        style="margin-right:10px;margin-left:10px;"
        type="daterange"
        value-format="yyyy-MM"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="choseDate2"
        v-model="categoryTimeDur3"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <div class="table_boxs">
        <div class="tablebox_left">
          <div class="table_conter">-</div>
          <div class="table_conter">累计3单人数</div>
          <div class="table_conter">累计当月达到3单人数</div>
          <div class="table_conter">当月注册并达到3单人数</div>
          <div class="table_conter">当月注册人数</div>
          <div class="table_conter">当月注册下单人数</div>
          <div class="table_conter">当月订单数</div>
          <div class="table_conter">当月注册下单人数转化率</div>
        </div>
        <div class="tablebox_right">
          <div class="tablebox_right_item" v-for="(item,index) in ticalUserMonthData" :key="index">
            <div class="table_conter">{{item.monthDate}}</div>
            <div class="table_conter">{{item.overThreeTotal}}</div>
            <div class="table_conter">{{item.overThreeMonth}}</div>
            <div class="table_conter">{{item.overThreeMonthReg}}</div>
            <div class="table_conter">{{item.userRegMonth}}</div>
            <div class="table_conter">{{item.userOrderMonth}}</div>
            <div class="table_conter">{{item.orderMonth}}</div>
            <div class="table_conter">{{item.userRegOrderMonth}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- t3 -->
    <div class="headMw2">
      <div class="headMw_left">
        <!-- <p class="small_tit">满三单人数</p> -->
        <div id="Platform4" ref="Platform7"></div>
      </div>
      <div class="headMw_right">
        <!-- <p class="small_tit">当月满三单人数</p> -->
        <div id="Platform4" ref="Platform8"></div>
      </div>
    </div>
    <!-- T4 -->
    <div class="headModule">
      <div class="box">
        <div id="Platform3" ref="Platform11"></div>
      </div>
    </div>
    <div class="headModule">
      <el-date-picker
        style="margin-right:10px;margin-left:10px;"
        type="daterange"
        value-format="yyyy-MM-dd"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="choseDate1"
        v-model="categoryTimeDur2"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <div class="table_boxs">
        <div class="tablebox_left">
          <div class="table_conter">-</div>
          <div class="table_conter">累计3单人数</div>
          <div class="table_conter">累计当日达到3单人数</div>
          <div class="table_conter">当日注册并达到3单人数</div>
          <div class="table_conter">当日注册人数</div>
          <div class="table_conter">当日注册下单人数</div>
          <div class="table_conter">当日订单数</div>
          <div class="table_conter">当日注册下单人数转化率</div>
        </div>
        <div class="tablebox_right">
          <div class="tablebox_right_item" v-for="(item,index) in ticalUserDayData" :key="index">
            <div class="table_conter">{{item.dayDate}}</div>
            <div class="table_conter">{{item.overThreeTotal}}</div>
            <div class="table_conter">{{item.overThreeDay}}</div>
            <div class="table_conter">{{item.overThreeDayReg}}</div>
            <div class="table_conter">{{item.userRegDay}}</div>
            <div class="table_conter">{{item.userOrderDay}}</div>
            <div class="table_conter">{{item.orderDay}}</div>
            <div class="table_conter">{{item.userRegOrderDay}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- t3 -->
    <div class="headMw2">
      <!-- <div class="headMw_left">
        <p class="small_tit">满三单人数</p>
      </div>-->
      <div class="headMw_right">
        <!-- <p class="small_tit">当月满三单人数</p> -->
        <div id="Platform4" ref="Platform9"></div>
      </div>
      <div class="headMw_right">
        <!-- <p class="small_tit">当月满三单人数</p> -->
        <div id="Platform4" ref="Platform10"></div>
      </div>
    </div>
     <div class="headModule">
      <div class="box">
        <div id="Platform3" ref="Platform12"></div>
      </div>
    </div>
    <!-- T5 -->
    <div class="headMw">
      <div class="headMw_center">
        <div id="Platform4" ref="Platform4"></div>
      </div>
      <div class="headMw_center">
        <div id="Platform4" ref="Platform5"></div>
      </div>
    </div>
    <!-- T6 -->
    <div class="headMw">
      <div class="headMw_left">
        <div id="Platform4" ref="Platform6"></div>
      </div>
      <!-- <div class="headMw_right">
        <p class="small_tit">用户事件</p>
      </div>-->
    </div>
  </div>
</template>
<script>
import ECharts from "echarts";
import "../../../node_modules/echarts/map/js/china";
require("echarts/map/js/china"); // 引入中国地图数据
import {
  getMemberCountData,
  getMemberConversionRate,
  getGmvContribution,
  getMemberData,
  getOrderSources,
  getOrderTypes,
  getStatisticalUserMonthData,
  getStatisticalUserDayData,
} from "../../api/unalays";
export default {
  data() {
    return {
      value1: "",
      categoryRadio: 0, //选择日期
      categoryRadio1: 0, //选择日期
      categoryRadio2: 0, //选择日期
      categoryRadio3: 0, //选择日期
      categoryTimeDur: [], //选择时间
      categoryTimeDur2: ["", ""], //选择时间
      categoryTimeDur3: ["", ""], //选择时间
      cur: 1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      ticalUserMonthData: "", //满三单
      ticalUserDayData: "", //满三单2
      ConversionRate: "", //转化率list
      ConversionRateTime: "",
      memberData: "", //GMV贡献list
      gstartTime: "",
      gendTime: "",
      goodsChannels: [], //商品渠道
      goodstype: "", //商品渠道值
      orderChannels: [], //订单渠道
      ordertype: "", //订单渠道值
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
    };
  },
  mounted() {
    let _self = this;
    _self.getOrderSources();
    _self.getOrderTypes();
    _self.getCateListBtn(_self.categoryRadio);
    _self.getCateListBtn1(_self.categoryRadio1);
    _self.getMemberCount();
    // _self.listtwo();
    _self.getMemberList();
    _self.getStatisticalUserMonth(_self.categoryTimeDur2);
    _self.getStatisticalUserDay(_self.categoryTimeDur3);
  },
  methods: {
    // 选择渠道
    orderTypeClick() {
      this.getMemberConver(this.categoryTimeDur);
      this.getGmvContro(this.categoryTimeDur);
    },
    // T1
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
      this.getMemberConver(categoryTimeDur);
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
    // T2
    getCateListBtn1(val) {
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
      this.getGmvContro(categoryTimeDur);
    },
    getCateListBtn2(val) {},
    // 转化率查询
    getMemberConver(e) {
      let _self = this;
      let params = {
        startTime: e[0],
        endTime: e[1],
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getMemberConversionRate(params).then((res) => {
        if (res.data.code == 200) {
          _self.ConversionRate = res.data.data;
        } else {
        }
      });
    },
    // GMV贡献度
    getGmvContro(e) {
      let _self = this;
      let params = {
        startTime: e[0],
        endTime: e[1],
        orderSource: _self.ordertype, //订单渠道
        orderType: _self.goodstype, //商品渠道
      };
      getGmvContribution(params).then((res) => {
        if (res.data.code == 200) {
          _self.memberData = res.data.data.memberData;
          _self.listone();
        }
      });
    },
    //活跃度查询
    getMemberCount() {
      let _self = this;
      getMemberCountData().then((res) => {
        let _data = res.data.data;
        let _time = [];
        let _day = [];
        _data.map((val) => {
          _time.push(val.day);
          _day.push(val.activeUsers);
        });
        _self.listtwo(_time, _day);
      });
    },
    //用户多维度统计
    getMemberList() {
      let _self = this;
      getMemberData().then((res) => {
        if (res.data.code == 200) {
          _self.DWDlist = res.data.data;
          console.log(res.data.data);
          let _data = res.data.data;
          let old1 = [];
          let old2 = [];
          _data.memberAgeData.map((val) => {
            old1.push(val.NAME);
            old2.push(val.count);
          });
          let memb1 = [];
          let memb2 = [];
          _data.memberData.map((val) => {
            memb1.push(val.name);
            memb2.push(val.memberCount);
          });
          let sex1 = [];
          let sex2 = [];
          _data.memberSexData.map((val) => {
            sex1.push(val.sex);
            sex2.push(val.count);
          });
          _self.listthree(old1, old2, memb1, memb2, sex1, sex2);
        }
      });
    },
    // 满三单
    getStatisticalUserMonth(e) {
      let params = {
        startTime: e[0],
        endTime: e[1],
      };
      getStatisticalUserMonthData(params).then((res) => {
        if (res.data.code == 200) {
          this.ticalUserMonthData = res.data.data;
          let _data = res.data.data;
          let _month1 = [];
          let _monthdata1 = [];
          let _monthdata2 = [];
          let _monthdata3 = [];
          _data.map((val) => {
            _month1.push(val.monthDate);
            _monthdata1.push(val.overThreeTotal);
            _monthdata2.push(val.overThreeMonth);
            _monthdata3.push(val.userRegOrderMonth.replace("%","")-0);
          });
          this.listfour(_month1, _monthdata1, _monthdata2, _monthdata3);
        }
      });
    },
    // 满三单2
    getStatisticalUserDay(e) {
      let params = {
        startTime: e[0],
        endTime: e[1],
      };
      getStatisticalUserDayData(params).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.ticalUserDayData = res.data.data;
          let _data = res.data.data;
          let _month = [];
          let _mdata = [];
          let _mdataw = [];
          let _mdataq = [];
          _data.map((val) => {
            _month.push(val.dayDate);
            _mdata.push(val.overThreeDay);
            _mdataw.push(val.overThreeDayReg);
            _mdataq.push(val.userRegOrderDay.replace("%","")-0);
          });
          this.listfive(_month, _mdata, _mdataw,_mdataq);
          // console.log(_month,_mdata)
        }
      });
    },
    // 选择时间
    choseDate(e) {
      // this.getProprietaryTradingOverview()
      // this.getKeyIndicators()
    },
    choseDate1(e) {
      // console.log(e[0])
      this.getStatisticalUserMonth(e);
    },
    choseDate2(e) {
      // console.log(e[0])
      this.getStatisticalUserDay(e);
    },
    // 图一
    listone() {
      // GMV贡献度
      let Platform = this.$echarts.init(this.$refs.Platform);
      Platform.setOption({
        title: {
          text: "GMV贡献度",
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
            data: [
              { value: 335, name: "黑金会员" },
              { value: 310, name: "白金会员" },
              { value: 234, name: "体验会员" },
              { value: 135, name: "注册用户" },
            ],
          },
        ],
      });
      // 销售额
      let Platform2 = this.$echarts.init(this.$refs.Platform2);
      Platform2.setOption({
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
            data: [
              { value: 335, name: "黑金会员" },
              { value: 310, name: "白金会员" },
              { value: 234, name: "体验会员" },
              { value: 135, name: "注册用户" },
            ],
          },
        ],
      });
    },
    // 图二
    listtwo(time, day) {
      // 活跃度
      let Platform3 = this.$echarts.init(this.$refs.Platform3);
      Platform3.setOption({
        title: {
          text: "活跃度",
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
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: time,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "活跃度",
            type: "line",
            stack: "总量",
            data: day,
          },
        ],
      });
    },
    //图三
    listthree(a0, b0, c0, d0, e0, f0) {
      // 性别比例
      console.log(e0, f0);
      let Platform4 = this.$echarts.init(this.$refs.Platform4);
      Platform4.setOption({
        title: {
          text: "性别分布",
        },
        xAxis: {
          type: "category",
          data: e0,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          height: 200,
        },
        series: [
          {
            data: f0,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "red",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      });
      // 年龄分布
      let Platform5 = this.$echarts.init(this.$refs.Platform5);
      Platform5.setOption({
        title: {
          text: "年龄分布",
        },
        xAxis: {
          type: "category",
          data: a0,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          height: 200,
        },
        series: [
          {
            data: b0,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "red",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      });
      // 用户构成占比
      let Platform6 = this.$echarts.init(this.$refs.Platform6);
      Platform6.setOption({
        title: {
          text: "用户构成占比",
        },
        xAxis: {
          type: "category",
          data: c0,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          height: 200,
        },
        series: [
          {
            data: d0,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "red",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      });
    },
    listfour(a1, b1, c1, d1) {
      //满三单1
      let Platform7 = this.$echarts.init(this.$refs.Platform7);
      Platform7.setOption({
        title: {
          text: "累计满三单人数",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
            type: "line",
            stack: "总量",
            data: b1,
          },
        ],
      });
      //满三单2
      let Platform8 = this.$echarts.init(this.$refs.Platform8);
      Platform8.setOption({
        title: {
          text: "当月满三单人数",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
            type: "line",
            stack: "总量",
            data: c1,
          },
        ],
      });
      //满三单3
      let Platform11 = this.$echarts.init(this.$refs.Platform11);
      Platform11.setOption({
        title: {
          text: "当月注册下单人数转化率",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "转化率(%)",
            type: "line",
            stack: "总量",
            data: d1,
          },
        ],
      });
    },
    listfive(a2, b2, c2,d2) {
      //满三单
      let Platform9 = this.$echarts.init(this.$refs.Platform9);
      Platform9.setOption({
        title: {
          text: "当日满三单人数",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a2,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
            type: "line",
            stack: "总量",
            data: b2,
          },
        ],
      });
      //满三单
      let Platform10 = this.$echarts.init(this.$refs.Platform10);
      Platform10.setOption({
        title: {
          text: "当日注册并达到三单人数",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a2,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "人数",
            type: "line",
            stack: "总量",
            data: c2,
          },
        ],
      });
       //满三单
      let Platform12 = this.$echarts.init(this.$refs.Platform12);
      Platform12.setOption({
        title: {
          text: "当日注册下单人数转化率",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
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
          data: a2,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "转化率(%)",
            type: "line",
            stack: "总量",
            data: d2,
          },
        ],
      });
    },
    //时间段查询
    changeTimeto(e) {
      let _self = this;
      let params = {
        startTime: e[0],
        endTime: e[1],
      };
      getMemberCountData(params).then((res) => {
        if (res.data.code == 200) {
          let _data = res.data.data;
          let _time = [];
          let _day = [];
          _data.map((val) => {
            _time.push(val.day);
            _day.push(val.activeUsers);
          });
          _self.listtwo(_time, _day);
        }
      });
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  background: #f5f5f5;
}
.table_boxs {
  width: 100%;
  height: 100%;
  font-size: 18px;
  overflow: auto;
  text-align: center;
  border: 1px solid rgb(59, 58, 58);
  margin: 10px auto;
}
.tablebox_left {
  width: 20%;
  height: 100%;
  float: left;
  border-right: 1px solid rgb(59, 58, 58);
}
.tablebox_right {
  width: 80%;
  height: 100%;
  text-align: center;
  overflow-x: scroll;
  display: -webkit-box;
}
.tablebox_right_item {
  width: 20%;
  border-right: 1px solid rgb(59, 58, 58);
  border-left: 1px solid rgb(59, 58, 58);
}
.table_conter {
  line-height: 30px;
  border-bottom: 1px solid rgb(59, 58, 58);
}
.headModule {
  background: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
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
.box_boxwleft {
  width: 100%;
  height: 60px;
  position: absolute;
  border-left: 2px solid #000;
  border-bottom-left-radius: 10px;
  top: 25px;
  left: 50%;
  border-bottom: 2px solid #000;
}
.box_boxwright {
  width: 100%;
  height: 60px;
  position: absolute;
  border-right: 2px solid #000;
  border-bottom-right-radius: 10px;
  top: 25px;
  right: 50%;
  border-bottom: 2px solid #000;
}
.boxwleft_num {
  position: absolute;
  top: 72px;
  right: -125px;
  text-align: center;
}
.boxwleft_num p {
  font-size: 12px;
  line-height: 14px;
  margin: 0;
}
.gmvList {
  font-size: 14px;
}
.headMw {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.headMw2 {
  width: 100%;
  height: 375px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.headMw_left {
  width: 49%;
  height: 100%;
  background: #fff;
  margin-right: 2%;
  padding: 10px;
}
.headMw_right {
  width: 49%;
  height: 100%;
  background: #fff;
  padding: 10px;
}
.small_tit {
  margin: 0;
  font-weight: 600;
  line-height: 30px;
  border-bottom: 1px solid #f8f8f8;
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
  position: relative;
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
#Platform {
  width: 150px;
  height: 235px;
}
#Platform3 {
  width: 100%;
  height: 350px;
}
#Platform4 {
  width: 100%;
  height: 400px;
}
.headMw_center {
  width: 50%;
  height: 300px;
  padding: 10px;
  background: #fff;
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
  font-size: 14px;
  color: #aaa;
  min-width: 100px;
  text-align: center;
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
/deep/ .el-range-editor--medium .el-range-separator {
  width: 25px;
}
</style>