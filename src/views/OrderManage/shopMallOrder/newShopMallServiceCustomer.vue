<!--suppress ALL -->
<template>
  <div class="app-container" v-loading="loading">
    <el-form ref="form" label-width="120px" :inline="true">
      <el-form-item>
        <el-date-picker
          v-model="searchCondition.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="申请退款开始时间"
        />
        <el-date-picker
          v-model="searchCondition.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="申请退款结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="searchCondition.order"
          placeholder="订单号/支付单号/退货运单号"
          style="width: 300px;"
        />
      </el-form-item>
      <!-- <el-form-item >
				<el-input
					v-model="searchCondition.goodsName"
					placeholder="商品名称" style="width: 200px;"/>
      </el-form-item>-->

      <!--			<el-form-item >-->
      <!--				<el-input-->
      <!--					v-model="searchCondition.memberMobile"-->
      <!--					placeholder="会员手机号" style="width: 300px;"/>-->
      <!--			</el-form-item>-->
      <el-form-item>
        <el-input
          v-model="searchCondition.userInfo"
          placeholder="收货人/收货人手机号/会员手机号"
          style="width: 300px;"
        />
      </el-form-item>

      <!--			<el-form-item >-->
      <!--				<el-select v-model="searchCondition.refundStatus" placeholder="请选择" clearable>-->
      <!--					<el-option-->
      <!--						v-for="item in options2"-->
      <!--						:key="item.value"-->
      <!--						:label="item.label"-->
      <!--						:value="item.value">-->
      <!--					</el-option>-->
      <!--				</el-select>-->
      <!--			</el-form-item>-->

      <el-form-item>
        <el-select v-model="searchCondition.refundType" placeholder="退款类型" clearable>
          <el-option
            v-for="item in searchOpts.refundType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchCondition.refundReason" placeholder="退款原因" clearable>
          <el-option
            v-for="item in searchOpts.refundReason"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchCondition.refundStatus" placeholder="退款状态" clearable>
          <el-option
            v-for="item in searchOpts.refundStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="searchCondition.is_member_goods" placeholder="是否是会员大礼包" clearable>
          <el-option
            v-for="item in isMemberGoods"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
        <el-button type="danger" @click="onEmpty">点我清空条件</el-button>
        <!-- <el-button type="primary" @click="policy">分单</el-button> -->
      </el-form-item>
    </el-form>
    <!--搜索部分-->
    <el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
      <el-table-column fixed prop label="序号" align="center">
        <template slot-scope="scope">{{scope.row.id ? scope.row.id : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="商品名称" width="200" align="center">
        <template slot-scope="scope">{{scope.row.goodsName ? scope.row.goodsName : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="订单编号" width="160" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.ordersnSon ? scope.row.ordersnSon : '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop label="订单来源" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderSource ? scope.row.orderSource : '-'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop label="支付单号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.payFormNo ? scope.row.payFormNo : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="退款类型" align="center">
        <template slot-scope="scope">{{scope.row.refundType ? scope.row.refundType : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="退款原因" align="center">
        <template slot-scope="scope">{{scope.row.refundReason ? scope.row.refundReason : '-' }}</template>
      </el-table-column>

      <el-table-column prop label="支付金额" align="center" width="110">
        <template slot-scope="scope">{{scope.row.PayPrice ? scope.row.PayPrice : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="退款金额" width="100" align="center">
        <template
          slot-scope="scope"
        >{{scope.row.memberRefundPrice ? scope.row.memberRefundPrice : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="发货物流" width="160" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.logisticeCompany ? scope.row.logisticeCompany : '-' }}</p>
          <p>{{scope.row.logisticeNumber ? scope.row.logisticeNumber : '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop label="退货物流" width="160" align="center">
        <template slot-scope="scope">
          <p>{{scope.row.expressName ? scope.row.expressName : '-' }}</p>
          <p>{{scope.row.logisticsNum ? scope.row.logisticsNum : '-' }}</p>
        </template>
      </el-table-column>

      <el-table-column prop label="申请时间" width="160" align="center">
        <template slot-scope="scope">{{scope.row.createTime ? scope.row.createTime : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="退货状态" align="center" width="110">
        <template
          slot-scope="scope"
        >{{scope.row.refundCheckState ? scope.row.refundCheckState : '-' }}</template>
      </el-table-column>

      <el-table-column prop label="收货人" width="100" align="center">
        <template slot-scope="scope">{{scope.row.receiverName ? scope.row.receiverName : '-' }}</template>
      </el-table-column>
      <el-table-column prop label="会员手机号" width="140" align="center">
        <template slot-scope="scope">{{scope.row.mobile ? scope.row.mobile : '-' }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope" align="center">
          <router-link
            target="_blank"
            :to="{path:'new-refundOrder-detail',query:{id:scope.row.id}}"
          >
            <el-button type="text" size="small">查看详情</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align:right;">
      <el-pagination
        :current-page="searchCondition.page"
        :page-sizes="[20]"
        :page-size="searchCondition.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 分单弹窗 -->
    <el-dialog
      :title="'目前待处理的单数'+policyNum"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="policyBox">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(item,index) in policyList" :key="index" :label="item">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnclick(policyList)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFiveHundredBelowRefundOrders,
  getRefundAboutInfo,
  getRoleAdminUsers, //客服专员
  setRefundOrderPrincipalPeople,
} from "@/api/admin"; // 接口
import { getTabChannels } from "@/api/shops"; // 接口

// 订单状态
// 支付状态发货状态

// 订单来源
// const orderSource = [
//     { key: 1, display_name: '悦旅会APP' },
//     { key: 2, display_name: '环球悦旅APP' },
//     { key: 3, display_name: '悦店APP' },
//     { key: 4, display_name: '大人APP' },
//     { key: 5, display_name: '悦旅大人(小程序)' },
// ]

const cityOptions = ["上海", "北京", "广州", "深圳"];

export default {
  data() {
    return {
      dialogVisible: false, //弹窗
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      policyNum: "",
      policyList: [],
      adminUsers: [],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      loading: true,
      dialogFormVisible: false,
      formLabelWidth: "140px",
      form: {},
      searchCondition: {
        page: 1,
      },
      total: null,
      downloadLoading: false,
      tableData: [{ date: "2018-10-01" }],
      switchChart: false,
      list: [],
      orderCount: {},
      options2: [
        {
          value: "31",
          label: "待审核",
        },
        {
          value: "35",
          label: "审核通过",
        },
      ],
      isMemberGoods: [
        {
          value: "0",
          label: "否",
        },
        {
          value: "1",
          label: "是",
        },
      ],
      searchOpts: {},
    };
  },
  mounted() {
    this.getList();
    this.getTabChannels();
    this.getRefundAboutInfo();
  },
  methods: {
    // 列表数据
    getList() {
      getFiveHundredBelowRefundOrders(this.searchCondition).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          this.orderCount = res.data.data.countList;
          this.loading = false;
        }
      });
    },
    // 推广渠道
    getTabChannels() {
      getTabChannels().then((res) => {
        console.log(res);
        this.orderSource = res.data;
      });
    },
    getRefundAboutInfo() {
      getRefundAboutInfo().then((res) => {
        if (res.data.code == 200) {
          this.searchOpts = res.data.data;
        }
      });
    },
    onSubmit() {
      this.searchCondition.page = 1;
      this.getList();
    },
    onEmpty() {
      this.searchCondition = {
        page: 1,
      };
    },
    // 搜索
    handleFilter() {
      this.searchCondition.page = 1;
    },
    // 分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.searchCondition.page = val;
      this.getList();
    },
    //分单
    policy() {
      this.dialogVisible = true;
      this.loading = true;
      getRoleAdminUsers().then((res) => {
        if (res.data.code === 200) {
          console.log(res.data, "分单.....");
          this.policyList = res.data.data;
          this.policyList.map((item) => {
            this.policyNum = item.admin_id;
          });
          this.loading = false;
        }
      });
    },
    //确定分单
    btnclick(item) {
	  this.adminUsers=[];
      var goos = {
        admin_id: item[0].admin_id,
        name: item[0].name,
        user_name: item[0].user_name,
      };
      this.adminUsers.push(goos);
      let prams = {
        adminUsers: this.adminUsers,
      };
      setRefundOrderPrincipalPeople(prams).then((res) => {
		  this.dialogVisible=false
        if (res.date.code == 200) {

        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleCheckAllChange(val) {
      console.log(val, "===++====");
      this.checkedCities = val ? this.policyList : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value, "value====");
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.policyList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.policyList.length;
    },
  },
};
</script>
<style type="scss" scoped="scoped">
.goodsName {
  display: block;
}
.order_list {
  margin: 30px 0;
  font-size: 1rem;
  color: #999;
  font-size: 16px;
}
.order_list span {
  font-size: 18px;
  color: #666;
}
.sku_num {
  float: left;
  width: auto;
}
</style>
