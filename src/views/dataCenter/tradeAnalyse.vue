<template>
<div id="tradeAnalyse" v-loading="loading">
  <div class="headTop">
    <p>销售总额： ￥{{sourceData.totalGmv}}</p>
      <el-date-picker
            v-model="timeDateTarget"
            type="daterange"
            @change="getOrderTransactionAnalysisBySource"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
     </el-date-picker>
  </div>
	<hr>
  <div>
      <div  style="width:100%;display:flex;justify-content: space-between;padding:20px 0">
          <div 
            id="section1"
            ref="section1"
            style="width:50%;height:300px;margin:0 auto">
          </div>
          <el-table  style="width:50%;margin:20px auto 0 auto"
            :data="sourceData.data">
            <el-table-column align="center" prop="sourceName" label="渠道来源" ></el-table-column>
            <el-table-column align="center" prop="gmv" label="gmv" ></el-table-column>
            <el-table-column align="center" prop="orderCount" label="订单数" ></el-table-column>
            <el-table-column align="center" prop="memberCount" label="支付人数"></el-table-column>
             <el-table-column align="center" prop="activeUsers" label="活跃人数"></el-table-column>
          </el-table>
      </div>
      
  </div>

  <!-- 自然流量统计 -->
  <div>
      <!-- 下拉框 -->
      <div class="head">
          <div>
            <el-select v-model="targetAnalysis.shareFrom" clearable placeholder="选择渠道来源"  @change="getOrderTransactionAnalysisByShareFrom">
              <el-option
                v-for="item in types.shareFrom"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="targetAnalysis.source" clearable placeholder="选择外部来源"  @change="getOrderTransactionAnalysisByShareFrom">
              <el-option
                v-for="item in types.source"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-date-picker
                v-model="shareFromTime"
                type="daterange"
                @change="getOrderTransactionAnalysisByShareFrom"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
        </el-date-picker>
      </div>
      <div  style="width:100%;display:flex;justify-content: space-between;padding:20px 0">
         <div 
            id="section2"
            ref="section2"
            style="width:50%;height:300px;margin:0 auto">
          </div>
          <el-table  style="width:50%;margin:20px auto 0 auto"
            :data="fromList">
            <el-table-column align="center" prop="shareFromName" label="渠道来源" ></el-table-column>
            <el-table-column align="center" prop="gmv" label="gmv" ></el-table-column>
            <el-table-column align="center" prop="orderCount" label="订单数" ></el-table-column>
            <el-table-column align="center" prop="memberCount" label="支付人数" ></el-table-column>
          </el-table>
      </div>
  </div>

  <!-- banner位置（胶囊位）统计 -->
  <div>
      <!-- 下拉框 -->
      <div class="head">
          <div>
            <span>站内来源分析:</span>
            <el-select v-model="bannerLise.positionFrom" clearable placeholder="选择(全部)" @change="getOrderTransactionAnalysisByPositionFrom">
              <el-option
                v-for="item in types.positionFrom"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="bannerLise.source" clearable placeholder="选择（全部）" @change="getOrderTransactionAnalysisByPositionFrom">
              <el-option
                v-for="item in types.source"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
           
          </div>
          <el-date-picker
                v-model="positionFromTime"
                type="daterange"
                @change="getOrderTransactionAnalysisByPositionFrom"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
        </el-date-picker>
      </div>
      <div  style="width:100%;display:flex;justify-content: space-between;padding:20px 0">
         <div 
            id="section3"
            ref="section3"
            style="width:50%;height:300px;margin:0 auto">
          </div>
          <el-table  style="width:50%;margin:20px auto 0 auto"
            :data="byPositionFormList">
            <el-table-column align="center" prop="positionFromName" label="渠道来源" ></el-table-column>
            <el-table-column align="center" prop="gmv" label="gmv"></el-table-column>
            <el-table-column align="center" prop="orderCount" label="订单数" ></el-table-column>
            <el-table-column align="center" prop="memberCount" label="支付人数" ></el-table-column>
          </el-table>
      </div>
  </div>

  <!-- 指标分析 -->
  <div>
      <!-- 下拉框 -->
      <div class="head">
          <div>
            <span>站内来源分析:</span>
            <el-select v-model="goods.shareFrom" clearable placeholder="选择(全部)" @change="getOrderTransactionAnalysisByOrderGoods">
              <el-option
                v-for="item in types.shareFrom"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="goods.source" clearable placeholder="选择（全部）" @change="getOrderTransactionAnalysisByOrderGoods">
              <el-option
                v-for="item in types.source"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="goods.positionFrom" clearable placeholder="选择（全部）" @change="getOrderTransactionAnalysisByOrderGoods">
              <el-option
                v-for="item in types.positionFrom"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-date-picker
                v-model="goodsTime"
                type="daterange"
                @change="getOrderTransactionAnalysisByOrderGoods"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
        </el-date-picker>
      </div>
      <div  style="width:100%;display:flex;justify-content: space-between;padding:20px 0">
         <div 
            id="section4"
            ref="section4" style="width:100%;height:300px;display:block">
          </div>
          <!-- <el-table  style="width:50%;margin:20px auto 0 auto"
            :data="orderGoodsList">
            <el-table-column align="center" prop="positionFromName" label="渠道来源" ></el-table-column>
            <el-table-column align="center" prop="gmv" label="gmv"></el-table-column>
            <el-table-column align="center" prop="orderCount" label="订单数" ></el-table-column>
            <el-table-column align="center" prop="memberCount" label="支付人数" ></el-table-column>
          </el-table> -->
      </div>
  </div>


</div>
</template>

<script>
  import ECharts from "echarts";
  import {
    getOrderTransactionAnalysisType,//全部类型
  getOrderTransactionAnalysisBySource,//终端统计
  getOrderTransactionAnalysisByShareFrom,//用户下单销售额
  getOrderTransactionAnalysisByPositionFrom,//banner位置（胶囊位）统计
  getOrderTransactionAnalysisByOrderGoods//指标分析
  } from '@/api/dataCenter'
  export default {
    name: 'tradeAnalyse',
	data(){
      return {
        loading:false,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近3天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit('pick', [start, end]);
              },
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
        },
        timeDateTarget:['',''],
        shareFromTime:['',''],//用户下单销售额
        positionFromTime:['',''],
        goodsTime:['',''],
        sourceData:{},
        types:{},
        outResource:'',
        targetAnalysis:{},
        bannerLise:{},//banner
        goods:{},
        fromList:[],//自然流量统计
        byPositionFormList:[],//banner位置（胶囊位）统计
        orderGoodsList:[]
	  }
	},
	created(){
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      this.timeDateTarget = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`]
      this.shareFromTime = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`]
      this.positionFromTime = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`]
      this.goodsTime = [`${yy}-${mm}-${dd}`, `${yy}-${mm}-${dd}`]
      this.init()
	},
	methods:{
      init(){
		    this.loading = true;
          Promise.all([
            this.getOrderTransactionAnalysisType(),
            this.getOrderTransactionAnalysisBySource(),
            this.getOrderTransactionAnalysisByShareFrom(),
            this.getOrderTransactionAnalysisByPositionFrom(),
            this.getOrderTransactionAnalysisByOrderGoods(),
            ]).then(res=>{
          this.loading = false;
        })
    },
     // 下拉框
      getOrderTransactionAnalysisType(){
        return new Promise(resolve => {
          getOrderTransactionAnalysisType().then(res=>{
            if(res.data.code == 200){
              this.types = res.data.data
              resolve()
            }else{
              this.$message.error(res.data.msg)
            }
          })
		    })

      },
      //终端统计
      getOrderTransactionAnalysisBySource(){
        return new Promise(resolve => {
          let params = {
            startTime: this.timeDateTarget[0],
			      endTime:this.timeDateTarget[1],
		      }
          getOrderTransactionAnalysisBySource(params).then(res=>{
            if(res.data.code == 200){
              this.sourceData = res.data
              
              // 基于准备好的dom，初始化echarts实例
              let section1 = this.$echarts.init(this.$refs.section1)
              // 绘制图表
              section1.setOption({
                title: {
                  text: `终端统计`
                },
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: "vertical",
                  right:"right",
                  // bottom:"10%",
                  data: [
                    `${this.sourceData.data[0].sourceName}`,
                    `${this.sourceData.data[1].sourceName}`,
                    `${this.sourceData.data[2].sourceName}`,
                  ]
                },
                series: [
                  {
                    name: "",
                    type: "pie",
                    radius: "70%",
                    center: ["50%", "60%"],
                    data: [
                      {
                        name: `${this.sourceData.data[0].sourceName}`,
                        value: `${this.sourceData.data[0].gmv}`,
                      },
                      {
                        name: `${this.sourceData.data[1].sourceName}`,
                        value: `${this.sourceData.data[1].gmv}`,
                      },
                      {
                        name: `${this.sourceData.data[2].sourceName}`,
                        value: `${this.sourceData.data[2].gmv}`,
                      },
                    ]
                  }
                ]
              })
              resolve()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        })

      },
      //自然流量统计
      getOrderTransactionAnalysisByShareFrom(){
        return new Promise(resolve => {
          let params = {
            startTime: this.shareFromTime[0],
			      endTime:this.shareFromTime[1],
            ...this.targetAnalysis
		      }
          getOrderTransactionAnalysisByShareFrom(params).then(res=>{
            if(res.data.code == 200){
              resolve()
              this.fromList=res.data.data;
              var name=[]
              var formB=[]
              this.fromList.forEach(item=>{
                name.push(item.shareFromName)
                formB.push({
                  name:item.shareFromName,
                  value:item.gmv
                })
              })
              let section2 = this.$echarts.init(this.$refs.section2)
              // 绘制图表
              section2.setOption({
                title: {
                  text: `用户下单销售额`
                },
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: "vertical",
                  right: "right",
                  data: name
                },
                series: [
                  {
                    name: "",
                    type: "pie",
                    radius: "70%",
                    center: ["50%", "60%"],
                    data: formB
                  }
                ]
              })
              
            }else{
              this.$message.error(res.data.msg)
            }
          })
		    })
      },
      //banner位置（胶囊位）统计
      getOrderTransactionAnalysisByPositionFrom(){
        return new Promise(resolve => {
          let params = {
            startTime: this.positionFromTime[0],
			      endTime:this.positionFromTime[1],
            ...this.bannerLise
		      }
          getOrderTransactionAnalysisByPositionFrom(params).then(res=>{
            if(res.data.code == 200){
              resolve()
              this.byPositionFormList = res.data.data

              // console.log(this.byPositionFormList,"==========")
              // console.log(this.byPositionFormList,"============")
               var positionName=[]
               var byformB=[]
               this.byPositionFormList.forEach(item=>{
                  byformB.push(item.positionFromName)
                  positionName.push({
                    name:item.positionFromName,
                    value:item.gmv
                  })
                })
              console.log(positionName,"==========")
              let section3 = this.$echarts.init(this.$refs.section3)
              // 绘制图表
              section3.setOption({
                title: {
                  text: `用户下单销售额`
                },
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  orient: "vertical",
                  right: "right",
                  data: byformB
                },
                series: [
                  {
                    name: "",
                    type: "pie",
                    radius: "70%",
                    center: ["50%", "60%"],
                    data: positionName
                  }
                ]
              })
            }else{
              this.$message.error(res.data.msg)
            }
          })
		    })
      },
      //指标分析
      getOrderTransactionAnalysisByOrderGoods(){
        return new Promise(resolve => {
          let params = {
            startTime: this.goodsTime[0],
			      endTime:this.goodsTime[1],
            ...this.goods
		      }
          getOrderTransactionAnalysisByOrderGoods(params).then(res=>{
            if(res.data.code == 200){
              resolve()
              // console.log(res.data.data,"=====++++++========")
              this.orderGoodsList = res.data.data
               var orderGoodsName=[]
               var orderGood=[]
               var orderGoodsGmv=[]
               var orderGoodsDay=[]
               var memberCount=[]
               var orderCount=[]
               this.orderGoodsList.forEach(item=>{
                  orderGoodsName.push(item.positionFromName)
                  orderGoodsDay.push(item.day)
                  orderGoodsGmv.push(item.gmv)
                  memberCount.push(item.memberCount)
                  orderCount.push(item.orderCount)
                })
              // console.log(positionName,"==========")
              let section4 = this.$echarts.init(this.$refs.section4)
              // 绘制图表
              section4.setOption({
                title: {
                  text: `用户下单销售额`
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                  data: orderGoodsName
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: orderGoodsDay
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                  {
                    name: "Gmv",
                    type: "line",
                    data: orderGoodsGmv
                  },
                  {
                    name: "下单人数",
                    type: "line",
                    data: memberCount
                  },
                  {
                    name: "订单数",
                    type: "line",
                    data: orderCount
                  },
                ]
              })
            }else{
              this.$message.error(res.data.msg)
            }
          })
		    })
      },
	}
  }
</script>

<style scoped>
#tradeAnalyse{
	padding: 20px;
}
.headTop{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head{
  padding:50px 0 20px 0;
  width:100%;
  display:flex;
  align-items: center;
  justify-content: space-between;
  border-bottom:1px solid #606266
}
/* .el-table th{
    background: #409eff;
    color: #fff;
} */
</style>
