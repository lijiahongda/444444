<!--suppress ALL -->
<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item label="选择日期：">
        <el-col>
          <el-date-picker v-model="searchCondition.startTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="下单日期时间"
                          style="width: 150px;" />
          <el-date-picker v-model="searchCondition.endTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="下单日期时间"
                          style="width: 150px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="入住人电话：">
        <el-col>
          <el-input v-model="searchCondition.tel"
                    placeholder="请输入入住人手机号"
                    style="width:300px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="订单号：">
        <el-col>
          <el-input v-model="searchCondition.orderNo16"
                    placeholder="请输入116开头的订单号"
                    style="width:300px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="支付单号：">
        <el-col>
          <el-input v-model="searchCondition.orderNo8"
                    placeholder="8开头的编号"
                    style="width:300px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="三方单号：">
        <el-col>
          <el-input v-model="searchCondition.orderNo9"
                    placeholder="请输入三方单号"
                    style="width:300px;" />
        </el-col>
      </el-form-item>
      <el-form-item label="支付状态">
        <el-col>
          <el-select v-model="searchCondition.payState"
                     placeholder="支付状态"
                     style="width: 300px;">
            <el-option v-for="item in payState"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.key" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="退款状态：">
        <el-col>
          <el-select v-model="searchCondition.OrderState"
                     placeholder="退款状态："
                     style="width: 300px;">
            <el-option v-for="item in OrderState"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.key" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商：">
        <el-col>
          <el-select v-model="searchCondition.sourceType"
                     clearable
                     placeholder="选择供应商"
                     style="width: 300px;">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="订单来源：">
        <el-col>
          <el-select v-model="searchCondition.orderSource"
                     clearable
                     placeholder="选择订单来源"
                     style="width: 300px;">
            <el-option label="悦旅会"
                       value="1"></el-option>
            <el-option label="悦店"
                       value="2"></el-option>
            <el-option label="美途环球"
                       value="3"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="酒店类型：">
        <el-col>
          <el-select v-model="searchCondition.hotelType"
                     clearable
                     placeholder="选择酒店类型"
                     style="width: 300px;">
            <el-option label="国内"
                       value="0"></el-option>
            <el-option label="国际"
                       value="1"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">点我可以搜索</el-button>
        <el-button type="danger"
                   @click="onEmpty">点我清空条件</el-button>
        <div class="pan-btn "
             v-if="false">
          <el-button type="success"
                     @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}
          </el-button>
        </div>
        <!-- <div class="pan-btn yellow-btn" @click="() => { switchChart = !switchChart}">查看图表</div> -->
      </el-form-item>
    </el-form>
    <!--搜索部分-->

    <el-table v-if="!switchChart"
              :data="list"
              border
              :fit="true"
              style="width: 100%">
      <el-table-column prop="createTime"
                       align="center"
                       label="下单日期"
                       width="200"></el-table-column>
      <el-table-column prop="orderNo"
                       align="center"
                       width="200"
                       label="订单编号"></el-table-column>
      <el-table-column prop="payFormNo"
                       align="center"
                       width="140"
                       label="支付单号"></el-table-column>
      <el-table-column prop="hotelName"
                       align="center"
                       width="400"
                       label="酒店名称"></el-table-column>
      <el-table-column prop="orderSource"
                       align="center"
                       width="400"
                       label="订单来源"></el-table-column>
      <el-table-column prop="linkman"
                       align="center"
                       label="联系人"></el-table-column>
      <el-table-column prop="linktel"
                       align="center"
                       width="140"
                       label="联系电话"></el-table-column>
      <el-table-column prop="roomNum"
                       align="center"
                       label="预定间夜"></el-table-column>
      <el-table-column prop="actualPay"
                       align="center"
                       label="支付金额"></el-table-column>
      <el-table-column prop="payStatus"
                       align="center"
                       label="支付状态"></el-table-column>
      <el-table-column prop="roomStatus"
                       align="center"
                       width="200"
                       label="订单状态"></el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="260">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.orderNo)"
                     type="text"
                     size="small">查看详情
          </el-button>
          <!-- <el-button @click="btn(scope.row.orderNo)"
                     type="text"
                     size="small">处理为退款完成
          </el-button> -->

          <el-button type="text"
                     @click="btn(scope.row.orderNo)">处理为退款完成</el-button>
          <el-button type="text"
                     v-if="scope.row.refundStatusNum != 50 && scope.row.refundStatusNum != 0"
                     @click="refundFinish(scope.row.orderNo)">
            处理退款完成
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="searchCondition.page"
                     :page-sizes="[10]"
                     :page-size="searchCondition.limit"
                     :total="total"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <hotelCharts v-if="switchChart" />
    <el-dialog title="处理退款完成"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-upload class="avatar-uploader"
                 action="https://api2.yuelvhui.com/app/third/upload"
                 :show-file-list="false"
                 :on-success="(res)=> form.finishImg = res.url"
                 :before-upload="beforeUpload">
        <img v-if="form.finishImg"
             :src="form.finishImg"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeHotelOrderRefundFinish">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title=""
               :visible.sync="centerDialogVisible"
               width="30%"
               center
               :show-close="false">
      <el-upload ref="my-upload"
                 action="https://api2.yuelvhui.com/app/third/upload"
                 list-type="picture-card"
                 :on-success="Onsuccess"
                 :on-remove="Onremove"
                 :on-exceed="Onexceed"
                 :limit="1">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt />
      </el-dialog>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="cancel">取 消</el-button>
        <el-button type="primary"
                   @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { getDdPurchases } from '../../../api/admin'
import hotelCharts from './hotelCharts' // 图表
import { hotelList, hotelDetail, changeHotelOrderRefundFinish, Finish } from '@/api/hotelOrder' // 接口

// 订单状态
const OrderState = [
  { key: 31, display_name: '待审核' },
  { key: 33, display_name: '审核不通过' },
  { key: 35, display_name: '审核通过' },
  { key: 40, display_name: '退款中' },
  { key: 45, display_name: '已处理(但不退款)' },
  { key: 47, display_name: '退款失败' },
  { key: 50, display_name: '退款完成' },
  { key: 53, display_name: '退款完成(手工)' }
]
// 支付状态
const payState = [
  { key: 1000, display_name: '未知' },
  { key: 1, display_name: '待支付' },
  { key: 5, display_name: '支付成功' },
  { key: 7, display_name: '支付失败' }
]
const options = [
  { id: 0, name: '艺龙' },
  { id: 1, name: '捷旅' },
  { id: 2, name: '携程' },
  { id: 3, name: '高星特惠' },
  { id: 6, name: '好巧酒店' },
  { id: 7, name: '美团酒店' },
]
// 是否会员
const isMember = [
  { key: '是', display_name: '是' },
  { key: '否', display_name: '否' }
]

export default {
  directives: {
    waves
  },
  components: {
    hotelCharts
  },
  data() {
    return {
      centerDialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible: false,
      newUrl: [],
      searchCondition: {
        "startDate": '',
        "endDate": '',
        "linktel": '',
        "orderNo": '',
        "payStatus": '',
        "payFormNo": '',
        'sourceOrderNo': '',
        "refundStatus": '',
        "hotelType": '',
        "page": 1
      },
      dialogVisible: false,
      form: {
        finishImg: ''
      },
      total: 0,
      OrderState, // 订单状态
      payState, // 支付状态
      isMember, // 是否会员
      options,//供应商
      downloadLoading: false,
      tableData: [
        { date: "2018-10-01" }
      ],
      switchChart: false,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    Onremove() {
      this.newUrl = []
      this.$refs["my-upload"].clearFiles()
    },

    Onsuccess(response, file, fileList) {
      this.newUrl.push(file)
    },

    Onexceed(files, fileList) {
      this.$message.error('只能添加一个');
    },

    cancel() {
      this.Onoff()
    },

    confirm() {
      console.log(this.newUrl[0].url, this.id);
      var data = {
        orderNo: this.id,
        finishImg: this.newUrl[0].url
      }

      Finish(data).then(res => {
        console.log(res);
        if(res.data.code==200){
           this.$message.success(res.data.msg)
        }else{
          this.$message.error(res.data.msg)
        }
      })
      this.Onoff()
    },

    Onoff() {
      this.centerDialogVisible = false
      this.newUrl = []
      this.$refs["my-upload"].clearFiles()
    },
    // dialogTrue() {
    //   console.log(this.id, this.dialogImageUrl);
    //   var data = {
    //     orderNo: this.id,
    //     finishImg: this.dialogImageUrl
    //   }

    //   Finish(data).then(res => {
    //     console.log(res);
    //   })
    //   this.centerDialogVisible = false
    // },
    btn(id) {
      console.log(id)
      this.centerDialogVisible = true
      this.id = id
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response);
      this.dialogImageUrl = response.url
    },
    refundFinish(orderNo) {
      this.form.orderNo = orderNo;
      this.dialogVisible = true;
    },
    handleClose() {
      this.from = {}
    },
    beforeUpload(file) {
      console.log(file);

      if (file.size / 1024 > 300) {
        this.$message({
          message: "图片请保持在300KB以内",
          type: 'error',
        })
        return false
      }
    },
    changeHotelOrderRefundFinish() {
      changeHotelOrderRefundFinish(this.form).then(res => {
        if (res.data.code === 200) {
          this.dialogVisible = false;
          this.$message.success(res.data.msg)
          this.getList();
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 列表数据
    getList() {

      let params = {
        "startDate": this.searchCondition.startTime,
        "endDate": this.searchCondition.endTime,
        "linktel": this.searchCondition.tel,
        "orderNo": this.searchCondition.orderNo16,
        "payStatus": this.searchCondition.payState,
        "payFormNo": this.searchCondition.orderNo8,
        "sourceOrderNo": this.searchCondition.orderNo9,
        "refundStatus": this.searchCondition.OrderState,
        "page": this.searchCondition.page,
        "sourceType": this.searchCondition.sourceType,
        "orderSource": this.searchCondition.orderSource,
        "hotelType": this.searchCondition.hotelType,
      }
      hotelList(params).then(res => {
        console.log(res, "==");

        if (res.data.code === 200) {
          this.list = res.data.data.list
          this.total = parseInt(res.data.data.total)
        }
      })
    },
    onSubmit() {
      this.searchCondition.page = 1
      this.getList()
    },
    onEmpty() {
      this.searchCondition = {
        page: 1,
      }
    },
    // 导出
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = [
          'id',
          'title',
          'author',
          'pageviews',
          'display_time'
        ]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    // 查看详情
    handleClick(orderNo) {
      this.$router.push({ path: '/hotel-detail', query: { orderNo: orderNo } })
    },
    // 分页
    handleSizeChange(val) { },
    handleCurrentChange(val) {
      this.searchCondition.page = val
      this.getList()
    }
  }
}
</script>
<style type="scss">
/* .hotel-oder-btn-group{
        overflow: hidden;
    }
    .hotel-oder-btn-group .pan-btn{
        padding-top: 0;
        padding-bottom: 0;
        margin-left: 20px;
        cursor: pointer;
    }
    .hotel-oder-btn-group .el-button--medium{
        float: left;
    } */
</style>
