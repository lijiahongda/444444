<template>
  <div class="main">
        <div class="headBoxs">
			<div class="numberBoxs bot">
                <p class="titles">商品基础信息</p>
                <div class="numBox">
					<img :src="goodsInfoLista.goodsImage" class="message_img">
					<div class="message_list">
						<p>商品名称:<span>{{goodsInfoLista.name}}</span></p>
						<p>商品ID:<span>{{goodsInfoLista.id}}</span></p>
						<p>上架时间:<span>{{goodsInfoLista.createTime}}</span></p>
						<p>供应商:<span>{{goodsInfoLista.createTime}}</span></p>
						<p>零售价:<span>{{goodsInfoLista.createTime}}</span></p>
						<p>结算价:<span>{{goodsInfoLista.createTime}}</span></p>
						<p>所属分类:<span>{{goodsInfoLista.createTime}}</span></p>
					</div>
                </div>
            </div>
            <!-- 自营交易概览 -->
            <div class="numberBoxs bot">
                <p class="titles">销售信息</p>
                <div class="numBox">
                    <div class="box">
                        <p class="num">11323</p>
                        <p class="name">售出商品</p>
                    </div>
                    <div class="box">
                        <p class="num">11323</p>
                        <p class="name">成交订单</p>
                    </div>
                    <div class="box">
                        <p class="num">11323</p>
                        <p class="name">客单价</p>
                    </div>
                    <div class="box">
                        <p class="num">11323</p>
                        <p class="name">总成本</p>
                    </div>
                    <div class="box">
                        <p class="num">11323</p>
                        <p class="name">供应商结算</p>
                    </div>
                </div>
            </div>
        </div>

		<!-- 30天数据 -->
		<div class="bot" id="mycharts" ref="mycharts"></div>
        <!-- 表格 -->
        <div class="tableForm">
			<p class="titles">订单明细</p>
            <div class="tabs">
                <div class="tabList">
					<img src="" alt="">
					<span>7月30日</span>
                </div>
				<div>
					<span style="margin-right:20px;">订单数：144</span><span>订单金额：144</span>
				</div>

            </div>
            <div class="tableBox">
                 <el-table :data="tableData.list"
              border
              style="width: 100%">
      <el-table-column align="center"
                       label="订单编号"
                       width="80"
                       prop="id"></el-table-column>
      <el-table-column align="center"
                       label="订单渠道"
                       prop="mobile"></el-table-column>
      <el-table-column align="center"
                       label="配送方式"
                       prop="nickname">
        <template slot-scope="scope">
          <router-link :to="{path:'/userManage/user-info',query: {id:scope.row.mid}}"
                       target="_blank">
            <p style="color: #0a76a4">{{scope.row.nickname}}</p>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="销售类型"
                       prop="groupNumber"></el-table-column>
      <el-table-column align="center"
                       label="实付金额"
                       prop="assistantWx"></el-table-column>
      <el-table-column align="center"
                       label="收货人信息"
                       prop="tutorWx"></el-table-column>


      <el-table-column align="center"
                       label="订单状态"
                       prop="examineStatusName"></el-table-column>
      <el-table-column align="center"
                       prop="addtime"
                       label="下单时间"
                       width="180"></el-table-column>
      <el-table-column align="center"
                       prop=""
                       label="操作"
                       width="220">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.examineStatus== 1" size="mini" @click="handleCheck(scope.row.id,2)">通过</el-button>
					<el-button v-if="scope.row.examineStatus==1" size="mini" @click="handleCheck(scope.row.id,3)">驳回</el-button> -->
          <el-button size="mini"
                     @click="handleDetail(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import ECharts from "echarts";
import "../../../../node_modules/echarts/map/js/china";
require('echarts/map/js/china') // 引入中国地图数据
import {goodsInfo } from "@/api/shopComms"; 
export default {
  data () {
    return {
        goodsInfoLista:"",
        goodsInfoListb:"",
        goodsInfoListc:"",
        goodsInfoListd:"",
		flag:true,
        categoryRadio:1,//选择日期
        categoryTimeDur:[],//选择时间
        pickerOptions: {
            shortcuts: [
            {
                text: "最近一周",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
                }
            },
            {
                text: "最近一个月",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
                }
            },
            {
                text: "最近三个月",
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
                }
            }]
        },
        tabTitle:[
            {index:0,tab:'商品销量排行榜'},
            {index:1,tab:'供应商排行'},
            {index:2,tab:'品类排行'}
        ],
        cur:1,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
		}],
    };
  },
  mounted: function () {
      let _id = this.$route.query.id
      this.getDetail(_id)
      this.list()
  },
  methods: {
    getCateListBtn(val) {
        let categoryTimeDur = []
        let yy = new Date().getFullYear()
        let mm = new Date().getMonth() + 1
        let dd = new Date().getDate()
        //今年/今日/近一周/近本月
        if (val == 0) {
            categoryTimeDur = [`${yy}-01-01`, `${yy}-${mm}-${dd}`]
        } else if (val == 1) {
            let end = new Date()
            end.setTime(end.getTime())
            categoryTimeDur = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`]
        } else if (val == 2) {
            let end = new Date()
            end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 7)
            categoryTimeDur = [`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`, `${yy}-${mm}-${dd}`]
        } else if (val == 3) {
            let end = new Date()
            end.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 30)
            categoryTimeDur = [`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`, `${yy}-${mm}-${dd}`]
        }
        this.categoryTimeDur = categoryTimeDur
        // this.categorySearch.page = 1
    },
    // 选择时间
    choseDate(e) {
        this.searchCondition.startTime = e[0]
        this.searchCondition.endTime = e[1]
	},
	checkflag(){
		if(this.flag){
			this.flag = false;
		}else{
			this.flag = true;
		}
    },
    getDetail(e){
        let params = {
            id:e
        }
        goodsInfo(params).then(res=>{
            this.goodsInfoLista = res.data.data.goodsInfo;
            this.goodsInfoListb = res.data.data.orderInfo;
            this.goodsInfoListc = res.data.data.recentData;
            this.goodsInfoListd = res.data.data.saleInfo;
            console.log(res.data.data);
        })
    },
    list(){
        // 近30销卡趋势图
        let mycharts = this.$echarts.init(this.$refs.mycharts);
        mycharts.setOption({
            title: {
                text: '近30天数据'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
            ]
        })
    }
  }
}
</script>
<style scoped>
    .main{
       width:100%;
       height:100%;
       padding: 20px ;
    }
    .titles{
        color: #2c2b2b;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .head{
        border-bottom: 1px solid #ddd;
        background: #f4f4f4;
    }
    .numBox{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .numBox .box {
        text-align: center;
    }
    .numBox .box .num{
        font-size: 26px;
        color:#333;
        margin-bottom:10px
    }
    .numBox .box .name{
        font-size: 14px;
        color:#aaa;
    }
    #mycharts{
        width:100%;
        height:400px;
    }
    .productTxt .num{
        font-size: 24px;
    }
    .bot{
        margin-bottom:60px
    }
    .tabs{
        width:100%;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        margin-bottom:10px;
		font-size:13px;
    }
    .tabList{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .tabList p{
        font-size: 18px;
        margin-right:30px
    }
    .tabList p.active{
        font-size: 20px;
    }
    .tabList p.active::after{
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background: cornflowerblue;
        margin-top: 10px;
    }
	.numBox .message_img{
		width: 155px;
		height: 160px;
	}
	.numBox .message_list{width: 50%;display: flex;	flex-wrap: wrap;}
	.numBox .message_list p{
		width: 50%;
	}
</style>
