<template>
	<div style="padding:20px">
    <el-button type="primary" @click="setActGoldTrue" style="margin-bottom:10px;">添加活动</el-button>
		<el-table
      v-loading="act_loading"
      :data="actCpsTaoGold"
			style="width: 100%"
			border 
      @expand-change="setActTao">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table
           v-loading="config_loading"
           :data="configCpsTaoGold"
					 style="width: 100%"
           border
           @expand-change="setConfigTao">
            <el-table-column type="expand">
              <template slot-scope="propsChilder">
                <el-table
                  v-loading="product_loading"
                  :data="productCpsTaoGold"
                  style="width: 100%"
                  border>
                  <el-table-column prop="id" label="商品序号" align="center"></el-table-column>
                  <el-table-column prop="goods_id" label="商品id" align="center"></el-table-column>
                  <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                  <el-table-column prop="original_price" label="商品原价" align="center"></el-table-column>
                  <el-table-column prop="number" label="淘礼金数量" align="center"></el-table-column>
                  <el-table-column prop="num_limit" label="用户限领" align="center"></el-table-column>
                  <el-table-column prop="face_price" label="佣金金额" align="center"></el-table-column>
                  <el-table-column prop="create_time" label="加入时间" align="center"></el-table-column>

                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope" align="center">
                        <el-button type="danger" @click="delAlreadyCpsTaoProduct(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table>
                <el-pagination
                    @size-change="productSizeChange"
                    @current-change="productCurrentChange"
                    :current-page="productPageObj.page"
                    :page-size="productPageObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="productPageObj.total"
                  >
                </el-pagination>
              </template>
            </el-table-column>
						<el-table-column prop="id" label="配置序号" align="center"></el-table-column>
						<el-table-column prop="name" label="配置名称" align="center"></el-table-column>
						<el-table-column prop="safe_switch" label="安全开关" align="center"></el-table-column>
						<el-table-column prop="typeName" label="淘宝类型" align="center"></el-table-column>
						<el-table-column prop="yuanTypeName" label="配置类型" align="center"></el-table-column>
            <el-table-column prop="send_start_time" label="发放开始时间" align="center"></el-table-column>
            <el-table-column prop="send_end_time" label="发放结束时间" align="center"></el-table-column>
            <el-table-column prop="use_start_time" label="使用开始时间" align="center"></el-table-column>
            <el-table-column prop="use_end_time" label="使用结束时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" align="center">
                  <el-button type="primary" @click="selectionclick(scope.row)">选择商品</el-button>
              </template>
            </el-table-column>
					</el-table>
          <el-pagination
              @size-change="configSizeChange"
              @current-change="configCurrentChange"
              :current-page="configPageObj.page"
              :page-size="configPageObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="configPageObj.total"
            >
          </el-pagination>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="活动序号" align="center"></el-table-column>
      <el-table-column prop="channelName" label="渠道名称" align="center"></el-table-column>
      <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="tuiRevenue" label="推广投入" align="center"></el-table-column>
      <el-table-column prop="gmv" label="GMV" align="center"></el-table-column>
      <el-table-column prop="cpsOrderNum" label="订单量" align="center"></el-table-column>
      <el-table-column prop="estimate_cos" label="预计分佣" align="center"></el-table-column>
      <el-table-column prop="amount" label="总余额" align="center"></el-table-column>
      <el-table-column prop="usePrice" label="已使用" align="center"></el-table-column>
      <el-table-column prop="lavePrice" label="剩余余额" align="center"></el-table-column>
      <el-table-column prop="create_at" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope" align="center">
            <el-button type="text" size="small" @click="setGoldConfigTrue(scope.row)">添加配置</el-button>
        </template>
      </el-table-column>
		</el-table>
    <el-pagination
        @size-change="actSizeChange"
        @current-change="actCurrentChange"
        :current-page="actPageObj.page"
        :page-size="actPageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="actPageObj.total"
      >
    </el-pagination>
    <el-dialog title="添加活动" :visible.sync="isActGold" >
      <el-form :model="addActGoldForm">
        <el-form-item label="活动名称:" :label-width="LabelWidth">
          <el-input v-model="addActGoldForm.name" autocomplete="off" placeholder="请输入活动名称" style="width: 200px;"></el-input>
        </el-form-item>

        <el-form-item label="余额:" :label-width="LabelWidth">
          <el-input v-model="addActGoldForm.amount" autocomplete="off" placeholder="请输入余额" style="width: 200px;"></el-input>
        </el-form-item>
      
        <el-form-item label="渠道:" :label-width="LabelWidth">
          <el-select v-model="addActGoldForm.channel_id" clearable placeholder="请选择渠道" style="width: 200px;">
            <el-option v-for="item in channelType" :key="item.channelId" :label="item.channelName" :value="item.channelId" />
          </el-select>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isActGold = false">取 消</el-button>
        <el-button type="primary" @click="setCpsTaoGold">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加活动配置" :visible.sync="isConfigGold" >
      <el-form :model="addConfigGoldForm">
        <el-form-item label="配置名称:" :label-width="LabelWidth">
          <el-input v-model="addConfigGoldForm.name" autocomplete="off" placeholder="请输入配置名称" style="width: 200px;"></el-input>
        </el-form-item>

        <el-form-item label="发放时间:" :label-width="LabelWidth">
          <el-date-picker
            v-model="send_time"
            type="daterange"
            range-separator="-"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用时间:" :label-width="LabelWidth">
          <el-date-picker
            v-model="use_time"
            type="daterange"
            range-separator="-"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      
        <el-form-item label="淘礼金类型:" :label-width="LabelWidth">
          <el-select v-model="addConfigGoldForm.type" clearable placeholder="请选择淘礼金类型" style="width: 200px;">
            <el-option v-for="item in campaignType" :key="item.type" :label="item.typeName" :value="item.type" />
          </el-select>
        </el-form-item>

        <el-form-item label="几元购:" :label-width="LabelWidth">
          <el-select v-model="addConfigGoldForm.yuan_type" clearable placeholder="请选择几元购" style="width: 200px;">
            <el-option v-for="item in yuanType" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isConfigGold = false">取 消</el-button>
        <el-button type="primary" @click="setCpsTaoGoldConfig">确 定</el-button>
      </div>
    </el-dialog>   
    <el-dialog title="选取商品" :visible.sync="dialogTableVisible" width="60%">
        <el-form :model="skuSearch">
          <el-form-item label :inline="true">
            <el-input placeholder="商品名称/供应商名称" v-model="skuSearch.goodName" clearable></el-input>
          </el-form-item>
          <el-form-item label label-width="20px" :inline="true">
            <el-input placeholder="价格区间(最小价格)" v-model="skuSearch.minPrice" clearable></el-input>
          </el-form-item>
          <el-form-item label label-width="20px" :inline="true">
            <el-input placeholder="价格区间(最大价格)" v-model="skuSearch.maxPrice" clearable></el-input>
          </el-form-item>
          <el-form-item label label-width="20px" :inline="true">
            <el-select v-model="skuSearch.bandId" clearable placeholder="请选择品类">
              <el-option
                v-for="item in goodsOptions"
                :key="item.bandId"
                :label="item.typeName"
                :value="item.bandId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label label-width="20px" :inline="true">
            <el-button @click="skuSearchFunction()">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="productList.list" border style="width: 100%" v-loading="loading">
          <el-table-column label="序号" width="60" align="center" fixed>
            <template
              slot-scope="scope"
            >{{scope.$index+1+(productList.page-1)*productList.pageSize}}</template>
          </el-table-column>
          <el-table-column prop="gid" label="id" width="130" align="center"></el-table-column>
          <el-table-column prop="channelName" label="商品来源" width="130" align="center"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" width="130" align="center"></el-table-column>
          <el-table-column prop label="图片" align="center" width="130">
            <template slot-scope="scope">
              <img style="width:100px;height:100px" :src="scope.row.goods_img" />
            </template>
          </el-table-column>
          <el-table-column property="vip_price" align="center" label="价格" width="130">
            <template slot-scope="scope">
              <span>普通价格：{{scope.row.original_price}}</span>
            </template>
          </el-table-column>
          <el-table-column property="commission_rate" label="分佣比例" width="130" align="center"></el-table-column>
          <el-table-column property="tall_servant" label="最高可设置礼金" width="130" align="center"></el-table-column>
          <el-table-column property="group_servant" label="分佣" width="130" align="center"></el-table-column>
          <el-table-column property="coupon_amount" label="优惠卷金额" width="130" align="center"></el-table-column>
          <el-table-column label="操作" width="130" align="center">
            <template slot-scope="scope">
              <el-button el-button @click="selectSku(scope.row)">选取</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="productList.page"
          :page-size="productList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="productList.total"
        ></el-pagination>
      </el-dialog>
      <el-dialog title="补全信息" :visible.sync="dialogFormVisible">
        <div v-if="form.goodsInfo.length !=0" class="commodity-items" style="clear:both;">
          <ul>
            <!-- <li v-for="(item,index) in form.goodsInfo" :key="index"> -->
            <li>
              <div>
                <el-form :model="form">
                  <el-form-item label="淘礼金个数" :label-width="formLabelWidth">
                    <el-input v-model="form.goodsInfo.number" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户限量" :label-width="formLabelWidth">
                    <el-input v-model="form.goodsInfo.num_limit" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="面额" :label-width="formLabelWidth">
                    <el-input v-model="form.goodsInfo.face_price" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div class="">
                  <p>
                    商品名称：
                    <span v-text="form.goodsInfo.goods_name"></span>
                  </p >
                  <p>
                    <img :src="form.goodsInfo.goods_img" alt style="width:100px;" />
                  </p >
                  <p>
                    分佣比例：
                    <span v-text="form.goodsInfo.commission_rate+' %'"></span>
                  </p >
                  <p>
                    产品金额：
                    <span v-text="form.goodsInfo.original_price"></span>
                  </p >
                  <p>
                    会员价：
                    <span v-text="form.goodsInfo.vip_price"></span>
                  </p>
                  <p>
                    优惠金额：
                    <span v-text="form.goodsInfo.coupon_amount"></span>
                  </p>
                  <p>
                    分佣金额：
                    <span v-text="form.goodsInfo.group_servant"></span>
                  </p>
                  <p>
                    最高可设置礼金：
                    <span v-text="form.goodsInfo.tall_servant"></span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="determineClick">确 定</el-button>
        </div>
      </el-dialog>
	</div>
</template>

<script>
  import {
      getCpsTaoGold,
      getCpsTaoGoldConfig,
      getAlreadyCpsTaoProduct,
      setCpsTaoGold,
      getChannelType,
      getYuanType,
      getCampaignType,
      setCpsTaoGoldConfig,
      getCpsTaoProduct, 
      getCpsTapProductType,
      setCpsTaoGoldProduct,
      delAlreadyCpsTaoProduct
  } from '@/api/cps'
  export default {
    data() {
      return {
        act_loading : false,
        config_loading : false,
        product_loading : false,
        loading: true,

        channelType : [],
        campaignType : [],
        yuanType : [],

        isActGold : false,
        addActGoldForm : {
          name : '',
          amount : '',
          channel_id : 0,
        },

        isConfigGold : false,
        addConfigGoldForm : {
          type : '',
          act_gold_id : '',
          safe_switch : 1,
          yuan_type : '',
          name : '',
        },

        skuSearch: {
          goodName: "",
          minPrice: "",
          bandId: "",
          maxPrice: "",
          page: 1
        },
        dialogTableVisible : false,
        dialogFormVisible: false,
        goodsOptions: [], //商品类型
        productList: [], //下拉类型
        form: {
          goodsInfo: []
        },
        number: "", //淘礼金
        num_limit: "", //用户限领
        face_price: "", //面额
        LabelWidth: "120px",
        act_gold_id : '',
        gold_config_id : '',

        send_time : [],
        use_time : [],

        formLabelWidth : '90px' ,

        actCpsTaoGold : [],
        actPageObj : {
          page     : 1,
          pageNum  : 1,
          pageSize : 10,
          total    : 1,
        },

        configCpsTaoGold : [],
        configPageObj : {
          page     : 1,
          pageNum  : 1,
          pageSize : 10,
          total    : 1,
        },


        productCpsTaoGold : [],
        productPageObj : {
          page     : 1,
          pageNum  : 1,
          pageSize : 10,
          total    : 1,
        },

      }
    },
    mounted() {
      this.getCpsTaoGold();
      this.getCpsTaoProduct();
      this.getCpsTapProductType();
    },
    methods: {
        //获取淘礼金活动
        getCpsTaoGold () {
          this.act_loading=true;
          getCpsTaoGold(this.actPageObj).then(res => {
              if(res.data.code==200){
                this.actCpsTaoGold         = res.data.data.list;
                this.actPageObj.pageSize   = res.data.data.pageSize;
                this.actPageObj.pageNum    = res.data.data.pageNum;
                this.actPageObj.total      = res.data.data.total;
              } else {
                this.$message.error(res.data.msg);
              }

               this.act_loading = false;
          })
        },

        //获取淘礼金配置
        getCpsTaoGoldConfig() {
          const _this = this;

          _this.config_loading = true;
          getCpsTaoGoldConfig(this.configPageObj).then(res => {
            if(res.data.code==200){
              _this.configCpsTaoGold       = res.data.data.list;
              _this.configPageObj.pageSize = res.data.data.pageSize;
              _this.configPageObj.pageNum  = res.data.data.pageNum;
              _this.configPageObj.total    = res.data.data.total;
            } else {
              this.$message.error(res.data.msg);
            }
            _this.config_loading = false;
          })
        },

        //获取淘礼金活动
        getAlreadyCpsTaoProduct() {
          const _this = this;

          _this.product_loading = true;
          getAlreadyCpsTaoProduct(this.productPageObj).then(res => {
            if(res.data.code==200){
              _this.productCpsTaoGold       = res.data.data.list;
              _this.productPageObj.pageSize = res.data.data.pageSize;
              _this.productPageObj.pageNum  = res.data.data.pageNum;
              _this.productPageObj.total    = res.data.data.total;
            } else {
              this.$message.error(res.data.msg);
            }
            _this.product_loading = false;
          })
        },

        setActTao (row , expandedRows) {
          if(expandedRows.length>0){
            this.configPageObj.act_gold_id = row.id
            this.getCpsTaoGoldConfig();
          }
        },

        setConfigTao (row , expandedRows) {
          if(expandedRows.length>0){
            this.productPageObj.act_gold_id    = row.act_gold_id;
            this.productPageObj.gold_config_id = row.id;
            this.getAlreadyCpsTaoProduct();
          }
        },

        setCpsTaoGold () {
          setCpsTaoGold(this.addActGoldForm).then(res => {
            if(res.data.code==200){
              this.$message.success(res.data.msg);
              _this.getCpsTaoGold();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },

        setCpsTaoGoldConfig () {

          if(this.send_time == null ){
						this.addConfigGoldForm.send_end_time='';
						this.addConfigGoldForm.send_start_time='';
					}else{
						this.addConfigGoldForm.send_end_time=  this.send_time[1];
						this.addConfigGoldForm.send_start_time=this.send_time[0];
          }

          if(this.use_time == null ){
						this.addConfigGoldForm.use_end_time='';
						this.addConfigGoldForm.use_start_time='';
					}else{
						this.addConfigGoldForm.use_end_time=this.use_time[1];
						this.addConfigGoldForm.use_start_time=this.use_time[0];
          }
          const _this = this;
          setCpsTaoGoldConfig(this.addConfigGoldForm).then(res => {
            if(res.data.code==200){
             
              this.$message.success(res.data.msg);
              _this.isConfigGold = false;
              _this.getCpsTaoGold();
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },

        //获取淘礼金活动
        getChannelType() {
          const _this = this;

          getChannelType().then(res => {
            if(res.data.code==200){
              _this.channelType = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },

        getCampaignType() {
          const _this = this;

          getCampaignType().then(res => {
            if(res.data.code==200){
              _this.campaignType = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },

        //获取淘礼金活动
        getYuanType() {
          const _this = this;

          getYuanType().then(res => {
            if(res.data.code==200){
              _this.yuanType = res.data.data;
            } else {
              this.$message.error(res.data.msg);
            }
          })
        },

        setActGoldTrue(val) {
          this.isActGold = true
          //调用列表接口
          this.getChannelType();
        },

        setGoldConfigTrue(val) {
          this.isConfigGold = true;
          this.addConfigGoldForm.act_gold_id = val.id;
          
          this.getCampaignType();
          this.getYuanType();
        },
        
        //列表
        getCpsTaoProduct() {
          let params = {
            goodName: this.skuSearch.goodName,
            minPrice: this.skuSearch.minPrice,
            bandId: this.skuSearch.bandId,
            maxPrice: this.skuSearch.maxPrice,
            page: this.skuSearch.page
          };
          getCpsTaoProduct(params).then(res => {
            this.loading = false;
            if (res.data.code == 200) {
              this.productList = res.data.data;
              //   this.$message.success(res.data.msg);
            } else {
              //   this.$message.error(res.data.msg);
            }
          });
        },
        //选取
        selectSku(item) {
          this.dialogTableVisible = false;
          this.dialogFormVisible = true;
          var goods = {
            goods_id: item.gid,
            original_price: item.original_price,
            act_gold_id: this.act_gold_id,
            gold_config_id: this.gold_config_id,
            goods_name: item.goods_name,
            goods_img: item.goods_img,
            vip_price: item.vip_price,
            commission_rate: item.commission_rate,
            number: this.number, //淘礼金
            tall_servant  : item.tall_servant, //最高可设置礼金
            group_servant : item.group_servant, //分佣金额
            coupon_amount : item.coupon_amount, //优惠券金额
            num_limit: this.num_limit, //用户限领
            face_price: this.face_price //面额
          };
          if (this.form.goodsInfo.length == 0) {
            this.form.goodsInfo = goods;
          } else {
            this.form.goodsInfo = goods;
          }

          console.log(this.form.goodsInfo, "123123123");
          console.log(item, "12312312312");
        },

        //确定选取
        determineClick() {
          setCpsTaoGoldProduct(this.form.goodsInfo).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        },

        getCpsTapProductType() {
          getCpsTapProductType().then(res => {
            this.goodsOptions = res.data.data;
          });
        },

        //选取弹框
        selectionclick(row) {
          this.gold_config_id = row.id;
          this.act_gold_id    = row.act_gold_id;
          this.dialogTableVisible = true;
        },

        handleSizeChange(val) {
          this.skuSearch.page = val;
          this.getCpsTaoProduct();
        },
        // 第一页
        handleCurrentChange(val) {
          this.skuSearch.page = val;
          this.getCpsTaoProduct();
        },

        //搜索
        skuSearchFunction() {
          this.getCpsTaoProduct();
        },

        //活动一页几个
        actSizeChange(val) {
          this.actPageObj.page = val
          //调用列表接口
          this.getCpsTaoGold();
        },
        // 活动第一页
        actCurrentChange(val){
          this.actPageObj.page = val
          //调用列表接口
          this.getCpsTaoGold();
        },

        //配置一页几个
        configSizeChange(val) {
          this.configPageObj.page = val
          //调用列表接口
          this.getCpsTaoGoldConfig();
        },

        // 配置第一页
        configCurrentChange(val){
          this.configPageObj.page = val
          //调用列表接口
          this.getCpsTaoGoldConfig();
        },

        //活动一页几个
        productfigSizeChange(val) {
          this.productPageObj.page = val
          //调用列表接口
          this.getAlreadyCpsTaoProduct();
        },
        // 活动第一页
        productCurrentChange(val){
          this.productPageObj.page = val
          //调用列表接口
          this.getAlreadyCpsTaoProduct();
        },

        productSizeChange(val) {
          this.productPageObj.page = val
          //调用列表接口
          this.getAlreadyCpsTaoProduct();
        },

        delAlreadyCpsTaoProduct(id)
        {
            this.$confirm('确定要删除么?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var obj = {
                id:id
              }
              delAlreadyCpsTaoProduct(obj).then(res => {
                if (res.data.code == 200)
                {
                   this.$message({message: res.data.msg,type: "success"});
                   this.getCpsTaoGold();
                }else{
                  this.$message({message: res.data.msg,type: "error"});
                }
              })
            }).catch(() => {
            });

            }

    }
  }

</script>
<style scoped="scoped" lang="scss">
.el-form {
  display: flex;
  flex-wrap: wrap;
}
.el-pagination {
  text-align: right;
  padding-top: 20px;
}
.commodity-items {
  li {
    width: 100%;
    list-style: none;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    // .el-input {
    //   width: inherit;
    // }

    .el-button {
      width: 100px;
    }
  }
}
</style>
