<template>
  <div class="stat">
    <!--商品维度统计-->
    <h1>商品维度分析图</h1>
    <el-form>
      <el-date-picker
        v-model="data_sp"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        @change="clickdata_sp()"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form>

    <div class="tbox">
      <div class="tb" v-for="(item,index) in goodsData" :key="index">
        <span class="tit" v-html="item.name"></span>
        <span v-html="'订单数: ' + item.orderNum"></span>
        <span v-html="'GMV: ' + item.actualPrice"></span>
      </div>
    </div>
    <!--商品维度统计-->
    <h1>供应商维度分析图</h1>
    <el-form>
      <el-date-picker
        v-model="data_gys"
        type="daterange"
        width="360"
        value-format="yyyy-MM-dd"
        range-separator="至"
        @change="clickdata_gys()"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form>
    <div class="tbox">
      <div class="tb" v-for="(item,index) in gysData" :key="index">
        <span class="tit" v-html="item.name"></span>
        <span v-html="'订单数: ' + item.orderNum"></span>
        <span v-html="'GMV: ' + item.actualPrice"></span>
      </div>
    </div>
    <!--订单类型统计-->
    <h1>订单类型统计</h1>
    <el-form>
      <el-date-picker
        v-model="data_order"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        @change="clickdata_order()"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form>
    <div class="tbox">
      <div class="tb" v-for="(item,index) in sunlineData" :key="index">
        <span class="tit" v-html="item.orderTypeName"></span>
        <span v-html="'订单数: ' + item.orderCount"></span>
        <span v-html="'GMV: ' + item.actualPrice"></span>
      </div>
    </div>
    <h1>GMV构成</h1>

    <el-form>
      <el-date-picker
        v-model="data_gmv"
        type="monthrange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        @change="clickdata_gmv()"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form>
    <!-- cps -->
    <div class="gmvbox">
      <div class="gmvbox_left">
        <div class="gmvbox_left_head">GMV:{{gmvTbale.totalActualPrice}}</div>
        <div class="gmvbox_left_list" style="border-right:1px solid rgb(59, 58, 58);">
          <div class="gmv_conter">
            <div class="conleft">GMV</div>
            <div class="conright">
              <p>汇总</p>
              <p>APP</p>
              <p>直播</p>
              <p>直播-社群共有</p>
              <p>社群</p>
            </div>
          </div>
          <div class="gmv_conter">
            <div class="conleft">大礼包</div>
            <div class="conright">
              <p>汇总</p>
              <p>APP</p>
              <p>直播</p>
              <p>社群</p>
            </div>
          </div>
          <div class="gmv_conter">
            <div class="conleft">CPS</div>
            <div class="conright">
              <p>汇总</p>
              <p>APP</p>
              <p>直播</p>
              <p>直播-社群共有</p>
              <p>社群</p>
            </div>
          </div>

          <div class="gmv_conter">
            <div class="conleft">自营</div>
            <div class="conright">
              <p>汇总</p>
              <p>APP</p>
              <p>直播</p>
              <p>直播-社群共有</p>
              <p>社群</p>
            </div>
          </div>
          <div class="gmv_conter">
            <div class="conleft">大B</div>
            <div class="conright">
              <p>汇总</p>
              <p>京东</p>
              <p>考拉</p>
              <p>行云</p>
            </div>
          </div>
        </div>
      </div>
      <!-- l -->
      <div class="gmvbox_right">
        <div
          class="gmvbox_right_item"
          v-for="(item,index) in cps.gmvByMonthsAppCpsData"
          :key="index"
        >
          <div class="gmvbox_right_item_moth">
            <div style="border-bottom:1px solid rgb(59, 58, 58);line-height:35px;">{{item.month}}</div>
            <div style="line-height:35px;">
              <span
                style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
              >GMV</span>
              <span style="display: inline-block;width: 50%;text-align: center;">环比</span>
            </div>
          </div>
          <!-- gmv -->
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{(tGmv.totalAppData[index].actualPrice-0)|| number+(tGmv.totalLiveData[index].actualPrice-0)|| number+(tGmv.totalRobitData[index].actualPrice-0)|| number}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
            >{{((tGmv.totalAppData[index].huanbi.replace("%","")-0)+(tGmv.totalAppData[index].huanbi.replace("%","")-0)+(tGmv.totalAppData[index].huanbi.replace("%","")-0)).toFixed(2) + "%"}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{tGmv.totalAppData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="tGmv.totalAppData[index].huanbi.replace('%','')>=0"
            >{{tGmv.totalAppData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{tGmv.totalAppData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{tGmv.totalLiveData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="tGmv.totalLiveData[index].huanbi.replace('%','')>=0"
            >{{tGmv.totalLiveData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{tGmv.totalLiveData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{(tGmv.totalRLiveData[index].actualPrice)}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="tGmv.totalRLiveData[index].huanbi.replace('%','')>=0"
            >{{tGmv.totalRLiveData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{tGmv.totalRLiveData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{(tGmv.totalRobitData[index].actualPrice)}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="tGmv.totalRobitData[index].huanbi.replace('%','')>=0"
            >{{tGmv.totalRobitData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{tGmv.totalRobitData[index].huanbi}}</span>
          </div>

          <!-- dalibao -->
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dlb.isMemberGoodsData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dlb.isMemberGoodsData[index].huanbi.replace('%','')>=0"
            >{{dlb.isMemberGoodsData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dlb.isMemberGoodsData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dlb.isMemberGoodsData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dlb.isMemberGoodsData[index].huanbi.replace('%','')>=0"
            >{{dlb.isMemberGoodsData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dlb.isMemberGoodsData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >-</span>
            <span style="display: inline-block;width: 50%;text-align: center;">-</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >-</span>
            <span style="display: inline-block;width: 50%;text-align: center;">-</span>
          </div>

          <!-- cps -->
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{cps.monthsGmv[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="cps.monthsGmv[index].huanbi.replace('%','')>=0"
            >{{cps.monthsGmv[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{cps.monthsGmv[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{item.actualPrice}}</span>
            <span style="display: inline-block;width: 50%;text-align: center;" v-if="item.huanbi.replace('%','')>=0">{{item.huanbi}}</span>
            <span style="display: inline-block;width: 50%;text-align: center;color:red;" v-else>{{item.huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{cps.gmvByMonthsRLiveCpsData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="cps.gmvByMonthsRLiveCpsData[index].huanbi.replace('%','')>=0"
            >{{cps.gmvByMonthsRLiveCpsData[index].huanbi}}</span>
             <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-else
            >{{cps.gmvByMonthsRLiveCpsData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{cps.gmvByMonthsRLiveCpsData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="cps.gmvByMonthsRLiveCpsData[index].huanbi.replace('%','')>=0"
            >{{cps.gmvByMonthsRLiveCpsData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{cps.gmvByMonthsRLiveCpsData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{cps.gmvByMonthsRobitCpsData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="cps.gmvByMonthsRobitCpsData[index].huanbi.replace('%','')>=0"
            >{{cps.gmvByMonthsRobitCpsData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{cps.gmvByMonthsRobitCpsData[index].huanbi}}</span>
          </div>

          <!-- ziying -->
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{zy.monthsGmv[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="zy.monthsGmv[index].huanbi.replace('%','')>=0"
            >{{zy.monthsGmv[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{zy.monthsGmv[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{zy.gmvByMonthAppProprietaryData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="zy.gmvByMonthAppProprietaryData[index].huanbi.replace('%','')>=0"
            >{{zy.gmvByMonthAppProprietaryData[index].huanbi}}</span>
             <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{zy.gmvByMonthAppProprietaryData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{zy.gmvByMonthsLiveProprietaryData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="zy.gmvByMonthsLiveProprietaryData[index].huanbi.replace('%','')>=0"
            >{{zy.gmvByMonthsLiveProprietaryData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{zy.gmvByMonthsLiveProprietaryData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{zy.gmvByMonthsRLProprietaryData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="zy.gmvByMonthsRLProprietaryData[index].huanbi.replace('%','')>=0"
            >{{zy.gmvByMonthsRLProprietaryData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{zy.gmvByMonthsRLProprietaryData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{zy.gmvByMonthsRobitProprietaryData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="zy.gmvByMonthsRobitProprietaryData[index].huanbi.replace('%','')>=0"
            >{{zy.gmvByMonthsRobitProprietaryData[index].huanbi}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{zy.gmvByMonthsRobitProprietaryData[index].huanbi}}</span>
          </div>

          <!-- ziying -->
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dab.monthsGmv[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dab.monthsGmv[index].huanbi.replace('%','')>=0"
            >{{dab.monthsGmv[index].huanbi}}</span>
             <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dab.monthsGmv[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dab.gmvByMonthsProprietaryGdData[index].actualPrice}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dab.gmvByMonthsProprietaryGdData[index].huanbi.replace('%','')>=0"
            >{{dab.gmvByMonthsProprietaryGdData[index].huanbi}}</span>
             <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dab.gmvByMonthsProprietaryGdData[index].huanbi}}</span>
          </div>
          <div class="gmvbox_right_item_moudle">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dab.gmvByMonthsProprietaryKlData[index]?dab.gmvByMonthsProprietaryKlData[index].actualPrice:"-"}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dab.gmvByMonthsProprietaryKlData[index].huanbi.replace('%','')>=0"
            >{{dab.gmvByMonthsProprietaryKlData[index]?dab.gmvByMonthsProprietaryKlData[index].huanbi:"-"}}</span>
                        <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dab.gmvByMonthsProprietaryKlData[index]?dab.gmvByMonthsProprietaryKlData[index].huanbi:"-"}}</span>
          </div>
          <div class="gmvbox_right_item_moudle" style="border-bottom:2px solid rgb(59, 58, 58);">
            <span
              style="display: inline-block;width: 47%;text-align: center;border-right:1px solid rgb(59, 58, 58);"
            >{{dab.gmvByMonthsProprietaryXyData[index]?dab.gmvByMonthsProprietaryXyData[index].actualPrice:"-"}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;"
              v-if="dab.gmvByMonthsProprietaryXyData[index].huanbi.replace('%','')>=0"
            >{{dab.gmvByMonthsProprietaryXyData[index]?dab.gmvByMonthsProprietaryXyData[index].huanbi:"-"}}</span>
            <span
              style="display: inline-block;width: 50%;text-align: center;color:red;"
              v-else
            >{{dab.gmvByMonthsProprietaryXyData[index]?dab.gmvByMonthsProprietaryXyData[index].huanbi:"-"}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="gmvbox">
      <div class="gmvtop">
        <div class="gmv_tit">
          <p class="tit tit1"></p>
          <p class="tit tit2"></p>
        </div>
        <div class="gmv_tit"
             v-for="(item,index) in cps.gmvByMonthsAppCpsData"
             :key="index">
          <p class="tit tit1">{{item.month}}</p>
          <p class="tit tit2">
            <span>汇总</span>
            <span>渠道</span>
          </p>
        </div>
      </div>
      <div class="gmvbottom">
        <div class="gmv_conter">
          <div class="conleft">
            <p>cps</p>
          </div>
          <div class="conright">
            <p>app</p>
            <p>社群</p>
          </div>
        </div>
        <div class="gmv_conter"
             v-for="(item,index) in cps.gmvByMonthsAppCpsData"
             :key="index">
          <div class="conleft">
            <p>{{item.totalActualPrice }}</p>
          </div>
          <div class="conright">
            <p>{{cps.gmvByMonthsAppCpsData[index].actualPrice}}</p>
            <p>{{cps.gmvByMonthsRobitCpsData[index].actualPrice}}</p>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 大礼包 -->
    <!-- <div class="gmvbox">
      <div class="gmvtop">
        <div class="gmv_tit">
          <p class="tit tit1"></p>
          <p class="tit tit2"></p>
        </div>
        <div class="gmv_tit"
             v-for="(item,index) in dlb"
             :key="index">
          <p class="tit tit1">{{item.month}}</p>
          <p class="tit tit2">
            <span>汇总</span>
            <span>渠道</span>
          </p>
        </div>
      </div>
      <div class="gmvbottom">
        <div class="gmv_conter">
          <div class="conleft">
            <p>大礼包</p>
          </div>
          <div class="conright">
            <p>app</p>
          </div>
        </div>
        <div class="gmv_conter"
             v-for="(item,index) in dlb"
             :key="index">
          <div class="conleft">
            <p>{{item.totalActualPrice }}</p>
          </div>
          <div class="conright">
            <p>{{dlb[index].actualPrice}}</p>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 自营 -->
    <!-- <div class="gmvbox">
      <div class="gmvtop">
        <div class="gmv_tit">
          <p class="tit tit1"></p>
          <p class="tit tit2"></p>
        </div>
        <div class="gmv_tit"
             v-for="(item,index) in zy.gmvByMonthAppProprietaryData"
             :key="index">
          <p class="tit tit1">{{item.month}}</p>
          <p class="tit tit2">
            <span>汇总</span>
            <span>渠道</span>
          </p>
        </div>
      </div>
      <div class="gmvbottom">
        <div class="gmv_conter">
          <div class="conleft">
            <p>自营</p>
          </div>
          <div class="conright">
            <p>app</p>
            <p>直播</p>
            <p>社群</p>
          </div>
        </div>
        <div class="gmv_conter"
             v-for="(item,index) in zy.gmvByMonthAppProprietaryData"
             :key="index">
          <div class="conleft">
            <p>{{item.totalActualPrice }}</p>
          </div>
          <div class="conright">
            <p>{{zy.gmvByMonthAppProprietaryData[index].actualPrice}}</p>
            <p>{{zy.gmvByMonthsLiveProprietaryData[index].actualPrice}}</p>
            <p>{{zy.gmvByMonthsRobitProprietaryData[index].actualPrice}}</p>
          </div>
        </div>
      </div>
    </div>-->
    <!-- 大B -->
    <!-- <div class="gmvbox">
      <div class="gmvtop">
        <div class="gmv_tit">
          <p class="tit tit1"></p>
          <p class="tit tit2"></p>
        </div>
        <div class="gmv_tit"
             v-for="(item,index) in dab.gmvByMonthsProprietaryGdData"
             :key="index">
          <p class="tit tit1">{{item.month}}</p>
          <p class="tit tit2">
            <span>汇总</span>
            <span>渠道</span>
          </p>
        </div>
      </div>
      <div class="gmvbottom">
        <div class="gmv_conter">
          <div class="conleft">
            <p>大B</p>
          </div>
          <div class="conright">
            <p>京东</p>
            <p>考拉</p>
            <p>行云</p>
          </div>
        </div>
        <div class="gmv_conter"
             v-for="(item,index) in dab.gmvByMonthsProprietaryGdData"
             :key="index">
          <div class="conleft">
            <p>{{item.totalActualPrice }}</p>
          </div>
          <div class="conright">
            <p>{{dab.gmvByMonthsProprietaryGdData[index].actualPrice}}</p>
            <p>{{dab.gmvByMonthsProprietaryKlData[index].actualPrice}}</p>
            <p>{{dab.gmvByMonthsProprietaryXyData[index].actualPrice}}</p>
          </div>
        </div>
      </div>
    </div>-->
    <!-- <div id="product"
    ref="product"></div>-->
  </div>
</template>
<script>
import {
  getProductOrderSum,
  getSupplierOrderSum,
  getOrderStatistics,
  getGmvByMonthsStatistics,
} from "@/api/analysis"; // 接口
export default {
  name: "goods",
  data() {
    return {
      data_sp: [],
      data_gys: [],
      data_order: [],
      data_sp_obj: {
        startTime: "",
        endTime: "",
      },
      data_gys_obj: {
        startTime: "",
        endTime: "",
      },
      data_order_obj: {
        startTime: "",
        endTime: "",
      },
      goodsData: [],
      gysData: [],
      sunlineData: [],
      xData: [],
      actualPrice: [],
      orderCount: [],
      data_gmv: ["2020-06", "2020-08"],
      data_gmv_obj: {
        startTime: "2020-07",
        endTime: "2020-09",
      },
      gmvTbale: {},
      cps: {}, //cps
      dlb: {}, //大礼包
      zy: {}, //自营
      dab: {}, //大b
      tGmv: {},
    };
  },
  mounted() {
    //商品统计
    this.getProductOrderSum();
    //供应商统计
    this.getSupplierOrderSum();
    //旭日分析
    this.getOrderStatistics();
    //近一个月
    this.NearlyMonthdate();
    this.NearlyMonthdate2();
    //当天
    this.newDate();
    //gmv构成
    this.getGmvByMonthsStatistics();
  },
  methods: {
    //近当天
    newDate() {
      const end = new Date();
      const start = new Date();
      console.log([start, end]);
      this.data_sp = [start, end];
      this.data_gys = [start, end];
    },
    //近一个月
    NearlyMonthdate() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.data_order = [start, end];
      // this.data_gmv = [start, end];
    },
    //近一个月
    NearlyMonthdate2() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
      // this.data_order = [start, end];
      this.data_gmv = [start, end];
    },
    clickdata_sp() {
      console.log("商品", this.data_sp);
      if (this.data_sp == null) {
        this.data_sp = ["", ""];
      }
      this.data_sp_obj.startTime = this.data_sp[0];
      this.data_sp_obj.endTime = this.data_sp[1];
      this.getProductOrderSum();
    },
    clickdata_gys() {
      console.log("供应商", this.data_gys);
      if (this.data_gys == null) {
        this.data_gys = ["", ""];
      }
      this.data_gys_obj.startTime = this.data_gys[0];
      this.data_gys_obj.endTime = this.data_gys[1];
      this.getSupplierOrderSum();
    },
    clickdata_order() {
      console.log("订单");
      if (this.data_order == null) {
        this.data_order = ["", ""];
      }
      this.data_order_obj.startTime = this.data_order[0];
      this.data_order_obj.endTime = this.data_order[1];
      this.getOrderStatistics();
    },
    clickdata_gmv() {
      console.log("gmv");
      if (this.data_gmv == null) {
        this.data_gmv = ["", ""];
      }
      this.data_gmv_obj.startTime = this.data_gmv[0];
      this.data_gmv_obj.endTime = this.data_gmv[1];
      this.getGmvByMonthsStatistics();
    },
    //商品统计
    getProductOrderSum() {
      getProductOrderSum(this.data_sp_obj).then((res) => {
        let _this = this;
        _this.goodsData = res.data.data;
      });
    },
    //供应商统计
    getSupplierOrderSum() {
      getSupplierOrderSum(this.data_gys_obj).then((res) => {
        let _this = this;
        _this.gysData = res.data.data;
      });
    },
    //订单
    getOrderStatistics() {
      getOrderStatistics(this.data_order_obj).then((res) => {
        let _this = this;
        _this.sunlineData = res.data.data.orderTypeData;
      });
    },
    //gmv构成
    getGmvByMonthsStatistics() {
      let params = this.data_gmv_obj;
      getGmvByMonthsStatistics(params).then((res) => {
        this.gmvTbale = res.data.data;
        this.gmvTbale.gmvByIsCpsData.gmvByMonthsAppCpsData.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.gmvTbale.gmvByIsCpsData.gmvByMonthsRobitCpsData.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.gmvTbale.gmvByIsCpsData.monthsGmv.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.gmvTbale.gmvByIsMemberGoodsData.isMemberGoodsData.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.gmvTbale.gmvByProprietaryData.gmvByMonthAppProprietaryData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryData.gmvByMonthsLiveProprietaryData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryData.gmvByMonthsRobitProprietaryData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryData.monthsGmv.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.gmvTbale.gmvByProprietaryToBData.gmvByMonthsProprietaryGdData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryToBData.gmvByMonthsProprietaryKlData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryToBData.gmvByMonthsProprietaryXyData.map(
          (val) => {
            val.actualPrice = Number(val.actualPrice);
          }
        );
        this.gmvTbale.gmvByProprietaryToBData.monthsGmv.map((val) => {
          val.actualPrice = Number(val.actualPrice);
        });
        this.cps = this.gmvTbale.gmvByIsCpsData;
        this.dlb = this.gmvTbale.gmvByIsMemberGoodsData;
        this.zy = this.gmvTbale.gmvByProprietaryData;
        this.dab = this.gmvTbale.gmvByProprietaryToBData;
        this.tGmv = this.gmvTbale.totalGmvData;
        console.log(this.cps);
      });
    },
    //图1
    // list () {
    //   //商品概览
    //   let product = this.$echarts.init(this.$refs.product);
    //   product.setOption({
    //     title: {
    //       text: '旭日分析'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross',
    //         label: {
    //           backgroundColor: '#6a7985'
    //         }
    //       }
    //     },
    //     legend: {
    //       data: ['普通订单', '拼团订单', '砍价订单', '秒杀订单', '半价订单', '积分兑换订单', '未中奖抽奖订单', '已中奖抽奖订单', '']
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     xAxis: [
    //       {
    //         type: 'category',
    //         boundaryGap: false,
    //         data: this.xData
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: 'value'
    //       }
    //     ],
    //     series: [
    //       {
    //         name: '邮件营销',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [120, 132, 101, 134, 90, 230, 210]
    //       },
    //       {
    //         name: '联盟广告',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [220, 182, 191, 234, 290, 330, 310]
    //       },
    //       {
    //         name: '视频广告',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [150, 232, 201, 154, 190, 330, 410]
    //       },
    //       {
    //         name: '直接访问',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [320, 332, 301, 334, 390, 330, 320]
    //       },
    //       {
    //         name: '搜索引擎',
    //         type: 'line',
    //         stack: '总量',
    //         label: {
    //           normal: {
    //             show: true,
    //             position: 'top'
    //           }
    //         },
    //         areaStyle: {},
    //         data: [820, 932, 901, 934, 1290, 1330, 1320]
    //       }
    //     ]
    //   });
    // },
  },
  filters: {
    number: function (data) {
      return data.toFixed(2);
    },
  },
};
</script>
<style scoped >
#product {
  width: 100%;
  height: 400px;
}
.stat {
  width: 90%;
  margin: 20px auto 0;
}
.tbox {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
}
.tb {
  margin-right: 10px;
}
.stat h1 {
  overflow: hidden;
  font-size: 18px;
}
.tb .tit {
  font-weight: bold;
}
.tb span {
  display: block;
  margin: 20px;
}
/* .gmvbox {
  border: 1px solid #000;
  border-top: none;
  display: flex !important;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
} */
.gmvbox {
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid rgb(59, 58, 58);
  margin: 20px auto;
}
.gmvbox .gmvbox_left {
  width: 30%;
  height: 100%;
  float: left;
  text-align: center;
}
.gmvbox .gmvbox_right {
  width: 70%;
  height: 100%;
  text-align: center;
  overflow-x: scroll;
  display: -webkit-box;
}
.gmvbox .gmvbox_right_item {
  width: 33.33%;
  /* float: left; */
  border-right: 1px solid rgb(59, 58, 58);
  border-left: 1px solid rgb(59, 58, 58);

  text-align: center;
}
.gmvbox_right_item_moth {
  width: 100%;
  height: 71px;
  line-height: 30px;
  /* border-right:1px solid rgb(59, 58, 58); */
  border-bottom: 1px solid rgb(59, 58, 58);
}
.gmvbox_right_item_moudle {
  width: 100%;
  line-height: 50px;
  border-top: 1px solid rgb(59, 58, 58);
  border-bottom: 1px solid rgb(59, 58, 58);
}
.gmvbox_left_head {
  width: 100%;
  line-height: 70px;
  border-right: 1px solid rgb(59, 58, 58);
  border-bottom: 1px solid rgb(59, 58, 58);
}
.gmvbox .gmv_tit {
  display: flex !important;
  flex: 1;
  flex-direction: column;
  border: 1px solid #000;
  border-left: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
}
.gmvbox .gmv_tit .tit {
  height: 50px;
  line-height: 50px;
  margin: 0;
}
.gmvbox .gmv_tit .tit2 {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.gmvbox .gmv_tit .tit2 span {
  flex: 1;
  border: 1px solid #000;
  border-left: none;
  border-bottom: none;
}

.gmvbottom,
.gmvtop {
  display: flex;
  flex-direction: row;
}
.gmv_conter {
  width: 100%;
  /* height: 208px; */
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-bottom: 1px solid rgb(59, 58, 58);
}
.conleft {
  /* border-right: 1px solid #000; */
  width: 50%;
  height: 100%;
  text-align: center;
  /* line-height: 200px; */
  /* position: relative; */
}
.conleft p {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  height: 20px;
}
.conright {
  display: flex !important;
  flex-direction: column;
  width: 50%;
  /* border-right: 1px solid #000; */
}
.conright p {
  /* border-bottom: 1px solid #000; */
  /* height: 50px; */
  line-height: 51px;
  border-bottom: 1px solid rgb(59, 58, 58);
  border-left: 1px solid rgb(59, 58, 58);
  margin: 0;
}
/deep/ .el-range-editor--medium .el-range-separator {
  width: 25px;
}
</style>
