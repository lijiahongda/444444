<template>
  <section v-loading="loading" class="orderDetails">
    <!-- 订单信息 -->
    <div style="margin-bottom:20px;">
      <router-link v-if="$route.query.formLink" :to="{path:`/${$route.query.formLink}`}">
        <el-button type="primary">返回列表</el-button>
      </router-link>
      <router-link v-else :to="{path:'/new-shopMall-service'}">
        <el-button type="primary">返回列表</el-button>
      </router-link>

      <router-link :to="{path:'/service-cause'}">
        <el-button type="primary">售后原因</el-button>
      </router-link>
    </div>
    <p>退款状态：{{ form.refundCheckState }}</p>

    <el-form :model="form" size="mini" inline>
      <el-form-item :label-width="formLabelWidth" label="商品名称：">
        <el-input
          :disabled="true"
          v-model="form.goodsName"
          type="textarea"
          style="width: 260px"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="购买数量：">
        <el-input :disabled="true" v-model="form.goodsNum" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="退款数量：">
        <el-input :disabled="true" v-model="form.goodsNum" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="订单编号：">
        <el-input :disabled="true" v-model="form.ordersnSon" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="订单来源：">
        <el-input :disabled="true" v-model="form.orderSource" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="购买时间：">
        <el-input :disabled="true" v-model="form.orderGoodsCreateTime" autocomplete="off" />
      </el-form-item>

      <el-form-item :label-width="formLabelWidth" label="支付单号：">
        <el-input :disabled="true" v-model="form.payFormNo" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="支付方式：">
        <el-input :disabled="true" v-model="form.payType" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="实际支付金额：">
        <el-input :disabled="true" v-model="form.actualPayPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="申请退款金额：">
        <el-input :disabled="true" v-model="form.memberRefundPrice" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="使用优惠券金额：">
        <el-input :disabled="true" v-model="form.goodsCouponAverage" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="使用余额金额：">
        <el-input :disabled="true" v-model="form.goodsBalanceAverage" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="发起退款人：">
        <el-input :disabled="true" v-model="form.addPeooleName" autocomplete="off" />
      </el-form-item>
      <!--			<el-form-item label="实际退款金额：" :label-width="formLabelWidth">-->
      <!--				<el-input :disabled="true" v-model="form.adminRefundPrice" autocomplete="off"></el-input>-->
      <!--			</el-form-item>-->
      <el-form-item :label-width="formLabelWidth" label="收货人：">
        <el-input :disabled="true" v-model="form.receiverName" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="收货人地址：">
        <el-input
          :disabled="true"
          v-model="form.receiverAddress"
          type="textarea"
          style="width: 260px"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="收货人手机号：">
        <el-input :disabled="true" v-model="form.receiverTel" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="会员手机号：">
        <el-input :disabled="true" v-model="form.memberMobile" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="发货物流：">
        <el-input :disabled="true" v-model="form.logisticeCompany" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="退款原因：">
        <el-input :disabled="true" v-model="form.refundReason" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="退款说明：">
        <el-input
          :disabled="true"
          v-model="form.memberRefundContent"
          type="textarea"
          style="width: 260px"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item v-if="form.noPassReason" :label-width="formLabelWidth" label="驳回原因(展示给工作人员)：">
        <el-input :disabled="true" v-model="form.noPassReason" autocomplete="off" />
      </el-form-item>
      <el-form-item
        v-if="form.noPassReasonForUser"
        :label-width="formLabelWidth"
        label="驳回原因(展示给客户)："
      >
        <el-input :disabled="true" v-model="form.noPassReasonForUser" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="申请时间：">
        <el-input :disabled="true" v-model="form.createTime" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="发货状态：">
        <el-input :disabled="true" v-model="form.sendStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="导出状态：">
        <el-input :disabled="true" v-model="form.exportStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="供应商名称：">
        <el-input :disabled="true" v-model="form.supplierName" autocomplete="off" />
      </el-form-item>
      <template>
        <p>供应商信息</p>

        <el-form-item :label-width="formLabelWidth" label="供应商审核状态:">
          <el-input :disabled="true" v-model="form.splCheckStatus" autocomplete="off" />
        </el-form-item>
        <br />
        <el-form-item :label-width="formLabelWidth" label="供应商审核不通过原因:">
          <el-input :disabled="true" v-model="form.splNoPassReason" autocomplete="off" />
        </el-form-item>

        <p>退货信息：</p>
        <el-form-item :label-width="formLabelWidth" label="退款类型：">
          <el-select
            v-model="form.refundType"
            :disabled="form.refundStatus != 31"
            placeholder="退款类型"
            @change="changeEvent($event,'refundType')"
          >
            <el-option label="仅退款" value="2" />
            <el-option label="退货退款" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.refundType==3" :label-width="formLabelWidth" label="退货地址：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.refundAddress"
            name="refundAddress"
            type="textarea"
            style="width: 260px"
            autocomplete="off"
            @change="changeEvent($event,'refundAddress')"
          />
        </el-form-item>
        <el-form-item v-if="form.refundType==3" :label-width="formLabelWidth" label="物流单号：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.logisticsNum"
            autocomplete="off"
            @change="changeEvent($event,'logisticsNum')"
          />
        </el-form-item>
        <el-form-item v-if="form.refundType==3" :label-width="formLabelWidth" label="物流名称：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.expressName"
            autocomplete="off"
            @change="changeEvent($event,'expressName')"
          />
        </el-form-item>
        <el-form-item v-if="form.refundType==3" :label-width="formLabelWidth" label="退货收货人：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.refundReceiverName"
            autocomplete="off"
            @change="changeEvent($event,'refundReceiverName')"
          />
        </el-form-item>
        <el-form-item v-if="form.refundType==3" :label-width="formLabelWidth" label="退货收货人电话：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.refundReceiverMobile"
            autocomplete="off"
            @change="changeEvent($event,'refundReceiverMobile')"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="运费：">
          <el-input
            :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
            v-model="params.freight"
            name="freight"
            autocomplete="off"
            @change="changeEvent($event,'freight')"
          />
          <span style="color: red">主订单总运费 ：{{ form.totalFreight }}</span>
        </el-form-item>
      </template>

      <el-form-item :label-width="formLabelWidth" label="实际打款金额(包含运费) ：">
        <el-input
          :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
          v-model="form.adminRefundPrice"
          autocomplete="off"
          @change="changeEvent($event,'adminRefundPrice')"
        />
        <span style="color: red">允许可退最大金额(不包含运费) ：{{ form.refundPriceMax }}</span>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="退还用户余额金额:">
        <el-input
          :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
          v-model="form.refundBalancePrice"
          autocomplete="off"
          @change="changeEvent($event,'refundBalancePrice')"
        />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="罚金:">
        <el-input
          :disabled="form.refundStatus != 31 && form.refundStatus != 32 && form.refundStatus != 34"
          v-model="form.penalty"
          autocomplete="off"
          @change="changeEvent($event,'penalty')"
        />
      </el-form-item>
      <el-form-item v-if="false" :label-width="formLabelWidth" label="拒绝原因：">
        <el-input
          :disabled="true"
          v-model="form.noPassReason"
          autocomplete="off"
          @change="changeEvent($event,'noPassReason')"
        />
      </el-form-item>

      <br />
      <el-form-item :label-width="formLabelWidth" label="照片凭证：">
        <div class="demo-image__preview">
          <img
            v-for="(element,index) in form.refundImg"
            :key="index"
            :src="element"
            class="img"
            @click="previewImg({'url':element})"
          />
        </div>
      </el-form-item>
      <el-form-item v-if="form.refundFinishImg" :label-width="formLabelWidth" label="退款完成凭证：">
        <div class="demo-image__preview">
          <img
            :src="form.refundFinishImg"
            class="img"
            @click="previewImg({'url':form.refundFinishImg})"
          />
        </div>
      </el-form-item>
      <el-form-item label="客服凭证">
        <el-upload
          :on-success="handleAvatarSuccess"
          :on-change="handleChangeSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemoveImg"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
          :_videolimit="5"
          :file-list="imgFileList"
          class="avatar-uploader"
          action="https://api2.yuelvhui.com/app/third/upload"
          list-type="picture-card"
        >
          <i class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" style="width: 400px;display: block;margin: 0 auto;" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="视频文件">
        <el-row>
          <el-col>
            <el-upload
              ref="upVideo"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="handleVideoSuccess"
              :on-exceed="handleExceed_video"
              :on-preview="handlePreview"
              :limit="1"
              :file-list="videoFileList"
              class="upload-demo"
              action="https://open.yuelvhui.com/open/UploadAlibabaCloudVideo"
              list-type="picture-card"
            >
              <div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
              <i class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-dialog
              :visible.sync="showDialog"
              :before-close="closeDialog"
              title="预览视频"
              width="30%"
            >
              <div style="padding: 20px;height: 450px;">
                <video
                  ref="videoReview"
                  :src="form.videoUrl"
                  style="width: 100%;height: 400px"
                  controls
                >您的浏览器不支持视频,请升级浏览器,或更换浏览器重试</video>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>
      </el-form-item>
      <h4>主订单下其它子订单信息：</h4>
      <el-table :data="form.allOrderSonInfo" style="width: 100%;margin: 20px auto;" border>
        <el-table-column align="center" prop="goodsName" label="商品名称" width="150" />
        <el-table-column align="center" prop="ordersnSon" label="子订单号" width="200" />
        <el-table-column align="center" prop="payFormNo" label="支付单号" />
        <el-table-column align="center" prop="actualPrice" label="支付金额(未优惠)" />
        <el-table-column align="center" prop="refundType" label="退款类型" />
        <el-table-column align="center" prop="refundStatus" label="退款状态" />
        <el-table-column align="center" prop="freight" label="退款运费" />
        <el-table-column align="center" prop="checkStatus" label="审核状态" />
        <el-table-column align="center" prop="createTime" label="退款申请时间" />
        <el-table-column align="center" prop="adminRefundPrice" label="实际退款金额" />
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-if="form.refundType==2">
        <el-button v-if="form.refundStatus == 31" type="primary" @click="handleCheck(1)">审核通过</el-button>
        <el-button v-if="form.refundStatus == 31" @click="reject(4)">拒绝退款</el-button>
        <el-button v-if="form.refundStatus == 31" type="primary" @click="updateInfo">提交退货信息</el-button>
        <span v-if="GYflag==false">
          <el-button
            v-if="form.refundStatus == 31 && form.splCheckStatusNum==1"
            @click="replaceSplCheckRefund(2)"
          >供应商通过审核</el-button>
        </span>
      </template>
      <template v-if="form.refundType==1">
        <el-button v-if="form.refundStatus == 31" @click="reject(4)">拒绝退款</el-button>
      </template>
      <template v-if="form.refundType==3">
        <el-button v-if="form.refundStatus == 31" type="primary" @click="handleCheck(3)">确认退回信息</el-button>
        <el-button v-if="form.refundStatus == 34" type="primary" @click="handleCheck(1)">审核通过</el-button>
        <el-button v-if="form.refundStatus == 31" @click="reject(2)">审核不通过</el-button>
        <el-button v-if="form.refundStatus == 34" @click="reject(4)">拒绝退款</el-button>
        <el-button
          v-if="form.refundStatus == 31 || form.refundStatus == 32 ||form.refundStatus == 34"
          type="primary"
          @click="updateInfo"
        >提交退货信息</el-button>
        <el-button v-if="form.refundStatus == 32" @click="handleCheck(5)">确认退回物流信息</el-button>
        <el-button v-if="params.logisticsNum" type="primary" @click="isLow(form.id)">查看物流轨迹</el-button>
        <!-- 111111111 -->
        <span v-if="GYflag==false">
          <el-button
            v-if="form.refundStatus == 31 && form.splCheckStatusNum==1"
            @click="replaceSplCheckRefund(2)"
          >供应商通过审核</el-button>
        </span>
        <el-button
          v-if="form.refundStatus == 34"
          @click="replaceSplCheckRefund(4)"
        >供应商同意退款(确认收货)</el-button>
      </template>
    </div>
    <p>
      操作日志:
      <el-button @click="addRefundRemark">添加备注</el-button>
    </p>
    <el-table v-loading="tableLoader" :data="logs.list" style="width: 100%" border>
      <el-table-column prop="createTime" align="center" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" align="center" width="180" />
      <el-table-column prop="operationContent" align="center" label="操作" />
      <el-table-column prop="operationStatus" label="状态" align="center" width="180" />
    </el-table>
    <el-pagination
      :total="logs.total"
      :page-size="20"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
    />

    <el-dialog :visible.sync="dialogFormVisible" title="请输入审核不通过原因" @close="clearParams">
      <el-form>
        <template v-if="rejectStatus==4">
          <el-form-item :label-width="formLabelWidth" label="拒绝退款原因：">
            <el-input v-model="params.noRefundReason" autocomplete="off" />
          </el-form-item>
        </template>
        <template v-if="rejectStatus==2">
          <el-form-item :label-width="formLabelWidth" label="审核不通过原因(工作人员)：">
            <el-input v-model="params.noPassReason" autocomplete="off" />
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="审核不通过原因(客户)：">
            <el-input v-model="params.noPassReasonForUser" autocomplete="off" />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheck(2)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="logistics" title="查看物流信息">
      <el-table :data="activities">
        <el-table-column property="logisticeCompany" label="物流公司" width="150" />
        <el-table-column property="logisticeNumber" label="物流单号" width="200" />
        <el-table-column property="logisticeMoney" label="运费" />
        <el-table-column property="logisticeRemark" label="备注" />
        <el-table-column property="logisticeInfo2" label="备注" />
        <el-table-column property="receivingTime" label="收货时间" />
      </el-table>
      <el-timeline v-if="timeInfo.length">
        <el-timeline-item
          v-for="(activity, index) in timeInfo"
          :key="index"
          :timestamp="activity.time"
        >{{ activity.context }}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </section>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import {
  getAdminUserRole,
  checkNewRefund,
  getNewRefundOrderInfo,
  upRefundOrderGoods,
  getRefundOperationLogList,
  addRefundRemark,
  replaceSplCheckRefund // 供应商通过审核
} from "@/api/admin";
import { getRefundLogistices } from "@/api/order";

export default {
  directives: {
    waves
  },
  data() {
    return {
      GYflag: false,
      GYid: "",
      id: "", // 订单id
      form: {
        refundCheckState: "",
        staffUpImgs: [],

        splNoPassReason: ""
      },
      cloneForm: {}, // 监测有change的表单
      logistics: false,
      activities: [], // 物流信息
      timeInfo: [], // 物流详情
      allOrderSonInfo: [],
      videoFileList: [],
      showDialog: false,
      imgFileList: [],
      params: {
        logisticsNum: ""
      },
      rejectStatus: "",
      dialogVisible: false,
      dialogImageUrl: "",
      dialogFormVisible: false,
      fileListOfDetail: [],
      formLabelWidth: "140px",
      loading: false,
      tableLoader: true,
      logs: [],
      role: "",
      day: "",
      h: "",
      m: "",
      s: ""
      // bool: false
    };
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length / 2);
    }
  },
  created() {
    this.getAdminUserRole();
    if (this.$route.query.id) {
      this.getInfo();
      this.getRefundOperationLogList();
    }
    this.GYId = this.$route.query.id;
  },
  // computed: {
  // 	"params.freight": function (oldv, newv) {
  // 		console.log(2)
  // 		this.bool = true
  // 		this.freight = bool ? this.cloneForm.freight = newv : oldv
  // 		console.log(bool, oldv, newv, this.freight, this.cloneForm)
  // 		return newv
  // 	}
  // },
  methods: {
    changeEvent(val, name) {
      this.cloneForm[name] = val;
      console.log(val, name, this.cloneForm);
    },
    getAdminUserRole() {
      getAdminUserRole().then(res => {
        if (res.data.code == 200) {
          this.role = res.data.roleType;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 上传视频
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed_video(fi_videoles, fileList) {
      this.$message.warning(`最多上传1个文件`);
    },
    beforeUpload(file) {
      const isVideo =
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1;
      const isLt30M = file.size / 1024 / 1024 < 30;
      if (isVideo) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt30M) {
        this.$message.error("上传视频大小不能超过 30MB!");
        return false;
      }
      this.videoLoading = this.$loading({
        lock: true,
        text: "视频上传转码中,请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    handleVideoSuccess(res, file) {
      console.log(res, file, "=======res");
      if (res.code == 200) {
        const videoId = res.data;
        const url =
          "https://open.yuelvhui.com/open/getVideoInfo?video_id=" + videoId;
        this.axios({
          method: "post",
          url: url
        }).then(item => {
          if (!item.data.data.CoverURL) {
            this.timeOut = setInterval(
              this.handleVideoSuccess(res, file),
              5000
            );
          } else {
            clearInterval(this.timeOut);
            this.videoLoading.close();
            this.$message.success("视频上传成功!");
            // console.log('视频2--------', this.cloneForm, this.form)
            this.form.videoUrl = item.data.data.PlayURL;
            this.form.videoCover = item.data.data.CoverURL;
            this.cloneForm.videoUrl = item.data.data.PlayURL;
            this.cloneForm.videoCover = item.data.data.CoverURL;
            // console.log(this.cloneForm, '视频2')
            this.videoFileList = [
              {
                name: file.name,
                url: item.data.data.CoverURL
              }
            ];
          }
        });
      } else {
        this.videoLoading.close();
        this.$message.error("视频上传失败,请删除重试!");
        this.$refs.upVideo.clearFiles(); // 上传失败 清除文件列表
      }
    },
    handlePreview(file) {
      console.log(file, 22);
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.$refs["videoReview"].pause();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    previewImg(url) {
      const params = {
        url: url.url
      };
      console.log(url);
      this.handlePictureCardPreview(params);
    },
    addRefundRemark() {
      this.$prompt("请输入备注信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空"
      })
        .then(({ value }) => {
          const params = {
            id: this.$route.query.id,
            remark: value
          };
          this.loading = true;
          addRefundRemark(params).then(res => {
            if (res.data.code === 200) {
              this.getRefundOperationLogList();
            } else {
              this.$message.error(res.data.msg);
              this.tableLoader = false;
            }
            this.loading = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    getInfo() {
      const params = {
        id: this.$route.query.id
      };
      this.loading = true;
      getNewRefundOrderInfo(params).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data;
          this.loading = false;
          this.imgFileList = [];
          this.form.staffUpImgs.forEach(item => {
            this.imgFileList.push({
              url: item
            });
          });
          this.params = {};
          this.$set(
            this.params,
            "refundReceiverName",
            this.form.refundReceiverName
          );
          this.$set(
            this.params,
            "refundReceiverMobile",
            this.form.refundReceiverMobile
          );
          this.$set(this.params, "refundAddress", this.form.refundAddress);
          this.$set(this.params, "expressName", this.form.expressName);
          this.$set(this.params, "logisticsNum", this.form.logisticsNum);
          this.$set(this.params, "freight", this.form.freight);
          if (this.form.videoUrl) {
            this.videoFileList = [
              {
                url: this.form.videoUrl
              }
            ];
          }
        } else {
          this.$message.error(res.data.msg || "网络错误");
          this.loading = false;
        }
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.getRefundOperationLogList(val);
    },
    getRefundOperationLogList(val) {
      this.tableLoader = true;
      getRefundOperationLogList({
        page: val || 1,
        pageSize: 20,
        refundId: this.$route.query.id
      }).then(res => {
        if (res.data.code === 200) {
          this.logs = res.data.data;
          this.tableLoader = false;
        } else {
          this.$message.error(res.data.msg);
          this.tableLoader = false;
        }
      });
    },

    reject(val) {
      this.dialogFormVisible = true;
      this.rejectStatus = val;
    },
    clearParams() {
      // this.params = {};
    },

    handleRemoveImg(file, fileList) {
      const index = this.form.staffUpImgs.findIndex(item => {
        return item == file.url;
      });
      if (index >= 0) {
        this.form.staffUpImgs.splice(index, 1);
      }
    },
    handleAvatarSuccess(res, file, fileList) {
      console.log(this.imgFileList);
      if (res.url) {
        this.form.staffUpImgs.push(res.url);
        // this.imgFileList.push({url:res.url});
      } else {
        this.imgFileList.length = this.imgFileList.length - 1;
        this.$message.error("图片上传失败，请重新上传");
      }
    },
    handleChangeSuccess(res, file, fileList) {
      // new Array(this.cloneForm.staffUpImgs)
      this.cloneForm.staffUpImgs = this.form.staffUpImgs;
      console.log(this.cloneForm, "图片");
    },
    handleExceed(fi_videoles, fileList) {
      this.$message.warning(`最多上传5个文件`);
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      if (!isImg) {
        this.$message.error("检查图片格式是否正确!");
      }
      return isImg && isLt5M;
    },
    // 差看物流信息
    isLow(id) {
      this.logistics = true;
      getRefundLogistices({
        refund_id: id
      }).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          console.log(res.data.data.total);
          this.activities = res.data.data.list;
          if (this.activities.length) {
            this.timeInfo = res.data.data.list[0].logisticeInfo || "";
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleCheck(status) {
      const params = {
        id: this.$route.query.id,
        checkType: status,
        role: this.role,
        ordersnSon: this.form.ordersnSon,
        recordId: this.form.recordId
      };
      if (status == 2) {
        if (this.rejectStatus == 2) {
          // 不同意退款
          params.noPassReason = this.params.noPassReason;
          params.noPassReasonForUser = this.params.noPassReasonForUser;
        } else if (this.rejectStatus == 4) {
          params.noRefundReason = this.params.noRefundReason;
        }
        params.checkType = this.rejectStatus;
      }
      this.loading = true;
      this.$confirm("是否确认执行此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          checkNewRefund(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success("操作成功");
              this.dialogFormVisible = false;
              this.getInfo();
              this.getRefundOperationLogList();
              // this.$router.push('/new-shopMall-service')
            } else {
              this.$message.error(res.data.msg);
            }
            this.loading = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    // 供应商通过审核传值 2
    // 供应商同意退款(确认收货)4
    replaceSplCheckRefund(GYClick) {
      //   console.log(this.GYId)
      replaceSplCheckRefund({ id: this.GYId, checkStatus: GYClick }).then(
        res => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.GYflag = true;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      );
    },

    updateInfo() {
      console.log(this.form.videoUrl + "666");
      this.dialogFormVisible = false;
      // let params = {
      // 	id: this.$route.query.id,
      // 	staffUpImgs: this.form.staffUpImgs,
      // 	role: this.role,
      // 	recordId: this.form.recordId,
      // 	ordersnSon: this.form.ordersnSon,
      // 	adminRefundPrice: this.form.adminRefundPrice,
      // 	penalty: this.form.penalty,
      // 	videoUrl: this.form.videoUrl,
      // 	...this.params
      // }
      const params = {
        id: this.$route.query.id,
        role: this.role,
        recordId: this.form.recordId,
        ordersnSon: this.form.ordersnSon,
        refundBalancePrice: this.form.refundBalancePrice,
        ...this.cloneForm
      };
      this.cloneForm.id = this.$route.query.id;
      this.cloneForm.role = this.role;
      this.$confirm("请确认信息是否有误?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          upRefundOrderGoods(params).then(res => {
            console.log(params, "+++");
            if (res.data.code === 200) {
              this.cloneForm = {};
              this.$message.success("操作成功");
              this.getInfo();
              this.getRefundOperationLogList();
            } else {
              this.$message.error(res.data.msg);
            }
            this.loading = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.orderDetails {
  font-size: 14px;
  padding: 20px;
  margin: 40px 30px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;

  .el-form-item {
    margin-bottom: 30px;

    .el-input {
      width: 260px;
    }
  }
}

.img {
  width: 200px;
  height: 200px;
}

.low_info {
  cursor: pointer;
}

.search-row .title {
  margin: 40px 0 30px;
  font-size: 18px;
  font-weight: bold;
}

.el-table__header-wrapper {
  overflow: hidden;
}

.el-timeline {
  margin-top: 35px;
}
</style>
