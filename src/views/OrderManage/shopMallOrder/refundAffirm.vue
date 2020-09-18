<template>
	<section class="orderDetails" v-loading="loading">
		<!-- 订单信息 -->
		<div style="margin-bottom:20px;">
			<el-button type="primary" @click="goBack">返回列表</el-button>

			<router-link :to="{path:'/service-cause'}">
				<el-button type="primary">售后原因</el-button>
			</router-link>
		</div>
		<p>退款状态：{{form.refundCheckState}}</p>
		<el-form :model="form" size="mini" inline>
			<el-form-item label="商品名称：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.goodsName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="购买数量：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.goodsNum" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="退款数量：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.goodsNum" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="订单编号：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.ordersnSon" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="订单来源：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.orderSource" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="购买时间：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.orderGoodsCreateTime" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="支付单号：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.payFormNo" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="支付方式：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.payType" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="实际支付金额：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.actualPayPrice" autocomplete="off"></el-input>

			</el-form-item>
			<el-form-item label="申请退款金额：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.memberRefundPrice" autocomplete="off"></el-input>
			</el-form-item>
			<!--			<el-form-item label="实际退款金额：" :label-width="formLabelWidth">-->
			<!--				<el-input :disabled="true" v-model="form.adminRefundPrice" autocomplete="off"></el-input>-->
			<!--			</el-form-item>-->
			<el-form-item label="收货人：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.receiverName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="收货人地址：" :label-width="formLabelWidth">
				<el-input :disabled="true" type="textarea" v-model="form.receiverAddress" style="width: 260px"
						  autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="会员手机号：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.memberMobile" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="发货物流：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.logisticeCompany" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="退款原因：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.refundReason" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="退款说明：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.memberRefundContent" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="申请时间：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.createTime" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="发货状态：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.sendStatus" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="导出状态：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.exportStatus" autocomplete="off"></el-input>
			</el-form-item>
			<template>
				<p>退货信息：</p>
				<el-form-item label="退货地址：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" type="textarea" style="width: 260px"
							  v-model="params.refundAddress" autocomplete="off"></el-input>

				</el-form-item>
				<el-form-item label="物流单号：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" v-model="params.logisticsNum"
							  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="物流名称：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" v-model="params.expressName"
							  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="退货收货人：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" v-model="params.refundReceiverName"
							  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="退货收货人电话：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" v-model="params.refundReceiverMobile"
							  autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="运费：" :label-width="formLabelWidth">
					<el-input :disabled="form.refundStatus != 31" v-model="params.freight"
							  autocomplete="off"></el-input>
					<span style="color: red">主订单总运费 ：{{form.totalFreight}}</span>
				</el-form-item>
			</template>

			<el-form-item label="实际打款金额：" :label-width="formLabelWidth">
				<el-input :disabled="form.refundStatus != 31" v-model="form.adminRefundPrice"
						  autocomplete="off"></el-input>
				<span style="color: red">允许可退最大金额(不包含运费) ：{{form.refundPriceMax}}</span>
			</el-form-item>
			<el-form-item label="罚金:" :label-width="formLabelWidth">
				<el-input :disabled="form.refundStatus != 31" v-model="form.penalty" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item v-if="false" label="拒绝原因：" :label-width="formLabelWidth">
				<el-input :disabled="true" v-model="form.noPassReason" autocomplete="off"></el-input>
			</el-form-item>

			<br>
			<el-form-item label="照片凭证：" :label-width="formLabelWidth">
				<div class="demo-image__preview">
					<img v-for="(element,index) in form.refundImg" :key="index" @click="previewImg({'url':element})"
						 class="img" :src="element">
				</div>
			</el-form-item>
			<el-form-item label="客服凭证">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					list-type="picture-card"
					:on-success="handleAvatarSuccess"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemoveImg"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					:limit="5"
					:file-list="imgFileList"
				>
					<i class="el-icon-plus avatar-uploader-icon"></i>
					<div slot="tip" class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img style="width: 400px;display: block;margin: 0 auto;" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>
			<el-form-item label="视频文件" :label-width="formLabelWidth">
				<el-row>
					<el-col>
						<el-upload
							class="upload-demo"
							action="https://open.yuelvhui.com/open/UploadAlibabaCloudVideo"
							ref="upVideo"
							:on-remove="handleRemove"
							:before-upload="beforeUpload"
							:on-success="handleVideoSuccess"
							:on-exceed="handleExceed"
							:on-preview="handlePreview"
							:limit="1"
							list-type="picture-card"
							:file-list="videoFileList"
						>
							<div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<el-dialog
							title="预览视频"
							:visible.sync="showDialog"
							width="30%"
							:before-close="closeDialog"
						>
							<div style="padding: 20px;height: 450px;">
								<video style="width: 100%;height: 400px" :src="form.videoUrl" controls
									   ref="videoReview">
									您的浏览器不支持视频,请升级浏览器,或更换浏览器重试
								</video>
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
				<el-table-column align="center" prop="goodsName" label="商品名称" width="150"></el-table-column>
				<el-table-column align="center" prop="ordersnSon" label="子订单号" width="200"></el-table-column>
				<el-table-column align="center" prop="payFormNo" label="支付单号"></el-table-column>
				<el-table-column align="center" prop="actualPrice" label="支付金额(未优惠)"></el-table-column>
				<el-table-column align="center" prop="refundType" label="退款类型"></el-table-column>
				<el-table-column align="center" prop="refundStatus" label="退款状态"></el-table-column>
				<el-table-column align="center" prop="freight" label="退款运费"></el-table-column>
				<el-table-column align="center" prop="checkStatus" label="审核状态"></el-table-column>
				<el-table-column align="center" prop="createTime" label="退款申请时间"></el-table-column>
				<el-table-column align="center" prop="adminRefundPrice" label="实际退款金额"></el-table-column>
			</el-table>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="form.refundStatus == 31" type="primary" @click="handleCheck(1)">审核通过</el-button>
			<el-button v-if="form.refundStatus == 31" @click="reject(2)">审核不通过</el-button>
			<el-button v-if="form.refundStatus == 31" type="primary" @click="updateInfo">提交退货信息</el-button>
			<el-button type="primary" v-if="params.logisticsNum" @click="isLow(form.id)">查看物流轨迹</el-button>
		</div>
		<p>操作日志:
			<el-button @click="addRefundRemark">添加备注</el-button>
		</p>
		<el-table
			:data="logs.list"
			style="width: 100%" border v-loading="tableLoader">
			<el-table-column
				prop="createTime"
				align="center"
				label="日期"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名"
				align="center"
				width="180">
			</el-table-column>
			<el-table-column
				prop="operationContent"
				align="center"
				label="操作">
			</el-table-column>
			<el-table-column
				prop="operationStatus"
				label="状态"
				align="center"
				width="180">
			</el-table-column>
		</el-table>
		<el-pagination
			layout="prev, pager, next"
			:total="logs.total"
			:page-size="20"
			@current-change="handleCurrentChange">
		</el-pagination>

		<el-dialog title="请输入审核不通过原因" :visible.sync="dialogFormVisible" @close="clearParams">
			<el-form>
				<el-form-item label="审核不通过原因(工作人员)：" :label-width="formLabelWidth">
					<el-input v-model="params.noPassReason" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="审核不通过原因(客户)：" :label-width="formLabelWidth">
					<el-input v-model="params.noPassReasonForUser" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleCheck(2)">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="查看物流信息" :visible.sync="logistics">
			<el-table :data="activities">
				<el-table-column property="logisticeCompany" label="物流公司" width="150"></el-table-column>
				<el-table-column property="logisticeNumber" label="物流单号" width="200"></el-table-column>
				<el-table-column property="logisticeMoney" label="运费"></el-table-column>
				<el-table-column property="logisticeRemark" label="备注"></el-table-column>
				<el-table-column property="logisticeInfo2" label="备注"></el-table-column>
				<el-table-column property="receivingTime" label="收货时间"></el-table-column>
			</el-table>
			<el-timeline v-if="timeInfo.length">
				<el-timeline-item
					v-for="(activity, index) in timeInfo"
					:key="index"
					:timestamp="activity.time">
					{{activity.context}}
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</section>
</template>
<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {
    getAdminUserRole,
    checkNewRefund,
    getNewRefundOrderInfo,
    upRefundOrderGoods,
    getRefundOperationLogList,
    addRefundRemark
  } from '@/api/admin'
  import {
    getRefundLogistices
  } from '@/api/order'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        id: '', //订单id
        form: {
          refundCheckState: '',
          staffUpImgs: []

        },
        logistics: false,
        activities: [], //物流信息
        timeInfo: [],//物流详情
        videoFileList: [],
        showDialog: false,
        imgFileList: [],
        params: {
          logisticsNum: ''
        },
        dialogVisible: false,
        dialogImageUrl: '',
        dialogFormVisible: false,
        fileListOfDetail: [],
        formLabelWidth: '140px',
        loading: false,
        tableLoader: true,
        logs: [],
        role: '',
        day: '',
        h: '',
        m: '',
        s: ''
      }
    },
    computed: {
      rowCount: function() {
        return Math.ceil(this.tableData.length / 2)
      }

    },
    created() {
      this.getAdminUserRole()
      if (this.$route.query.id) {
        this.getInfo()
        this.getRefundOperationLogList()
      }
    },
    methods: {
      getAdminUserRole() {
        getAdminUserRole().then(res => {
          if (res.data.code == 200) {
            this.role = res.data.roleType
          } else {
            this.$message.error(res.data.msg)
          }

        })
      },
      //上传视频
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多上传1个文件`)
      },
      beforeUpload(file) {
        const isVideo = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1
        const isLt30M = file.size / 1024 / 1024 < 30
        if (isVideo) {
          this.$message.error('请上传正确的视频格式')
          return false
        }
        if (!isLt30M) {
          this.$message.error('上传视频大小不能超过 30MB!')
          return false
        }
        this.videoLoading = this.$loading({
          lock: true,
          text: '视频上传转码中,请稍候...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      handleVideoSuccess(res, file) {
        console.log(res, file, '=======res')
        if (res.code == 200) {
          let videoId = res.data
          let url = 'https://open.yuelvhui.com/open/getVideoInfo?video_id=' + videoId
          this.axios({
            method: 'post',
            url: url
          }).then((item) => {
            if (!item.data.data.CoverURL) {
              this.timeOut = setInterval(this.handleVideoSuccess(res, file), 5000)

            } else {
              clearInterval(this.timeOut)
              this.videoLoading.close()
              this.$message.success('视频上传成功!')
              this.form.videoUrl = item.data.data.PlayURL
              this.form.videoCover = item.data.data.CoverURL
              this.videoFileList = [{
                name: file.name,
                url: item.data.data.CoverURL
              }]
            }

          })
        } else {
          this.videoLoading.close()
          this.$message.error('视频上传失败,请删除重试!')
          this.$refs.upVideo.clearFiles() //上传失败 清除文件列表
        }

      },
      handlePreview(file) {
        console.log(file, 22)
        this.showDialog = true
      },
      closeDialog() {
        this.showDialog = false
        this.$refs['videoReview'].pause()
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      previewImg(url) {
        let params = {
          url: url.url
        }
        console.log(url)
        this.handlePictureCardPreview(params)
      },
      addRefundRemark() {
        this.$prompt('请输入备注信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
          let params = {
            id: this.$route.query.id,
            remark: value
          }
          this.loading = true
          addRefundRemark(params).then(res => {
            if (res.data.code === 200) {
              this.getRefundOperationLogList()
            } else {
              this.$message.error(res.data.msg)
              this.tableLoader = false
            }
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })

      },
      goBack(){
        this.$router.go(-1)
      },
      getInfo() {
        let params = {
          id: this.$route.query.id
        }
        this.loading = true
        getNewRefundOrderInfo(params).then(res => {
          if (res.data.code === 200) {
            this.form = res.data.data
            this.loading = false
            this.imgFileList = []
            this.form.staffUpImgs.forEach(item => {
              this.imgFileList.push({ url: item })
            })
            this.params = {}
            this.$set(this.params, 'refundReceiverName', this.form.refundReceiverName)
            this.$set(this.params, 'refundReceiverMobile', this.form.refundReceiverMobile)
            this.$set(this.params, 'refundAddress', this.form.refundAddress)
            this.$set(this.params, 'expressName', this.form.expressName)
            this.$set(this.params, 'logisticsNum', this.form.logisticsNum)
            this.$set(this.params, 'freight', this.form.freight)
            if (this.form.videoCover) {
              this.videoFileList = [{
                url: this.form.videoCover
              }]
            }

          } else {
            this.$message.error(res.data.msg || '网络错误')
            this.loading = false
          }
          this.loading = false
        })
      },
      handleCurrentChange(val) {
        this.getRefundOperationLogList(val)
      },
      getRefundOperationLogList(val) {
        this.tableLoader = true
        getRefundOperationLogList({ page: val || 1, pageSize: 20, refundId: this.$route.query.id }).then(res => {
          if (res.data.code === 200) {
            this.logs = res.data.data
            this.tableLoader = false
          } else {
            this.$message.error(res.data.msg)
            this.tableLoader = false
          }
        })
      },

      reject() {
        this.dialogFormVisible = true
      },
      clearParams() {
        // this.params = {};
      },

      handleRemoveImg(file, fileList) {
        let index = this.form.staffUpImgs.findIndex(item => {
          return item == file.url
        })
        if (index >= 0) {
          this.form.staffUpImgs.splice(index, 1)
        }
      },
      handleAvatarSuccess(res, file, fileList) {
        console.log(this.imgFileList)
        if (res.url) {
          this.form.staffUpImgs.push(res.url)
          // this.imgFileList.push({url:res.url});
        } else {
          this.imgFileList.length = this.imgFileList.length - 1
          this.$message.error('图片上传失败，请重新上传')
        }

      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多上传5个文件`)
      },
      beforeAvatarUpload(file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        if (!isImg) {
          this.$message.error('检查图片格式是否正确!')
        }
        return isImg && isLt5M
      },
      //差看物流信息
      isLow(id) {
        this.logistics = true
        getRefundLogistices({
          refund_id: id
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 200) {
            console.log(res.data.data.total)
            this.activities = res.data.data.list
            if (this.activities.length) {
              this.timeInfo = res.data.data.list[0].logisticeInfo || ''
            }
          }else {
            this.$message.error(res.data.msg)
          }

        })
      },
      handleCheck(status) {
        let params = {
          id: this.$route.query.id,
          checkType: status,
          role: this.role,
          ordersnSon: this.form.ordersnSon,
          recordId: this.form.recordId
        }
        if (status == 2) {
          //不同意退款
          params.noPassReason = this.params.noPassReason
          params.noPassReasonForUser = this.params.noPassReasonForUser
        }
        this.loading = true
        this.$confirm('是否确认执行此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          checkNewRefund(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success('操作成功')
              this.dialogFormVisible = false
              this.getInfo()
              this.getRefundOperationLogList()
              // this.$router.push('/new-shopMall-service')
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })

      },
      updateInfo() {
        console.log(this.form.videoUrl + '666')
        this.dialogFormVisible = false
        if (this.form.refundStatus == 31 || this.form.logisticsNum) {
          let params = {
            id: this.$route.query.id,
            staffUpImgs: this.form.staffUpImgs,
            role: this.role,
            recordId: this.form.recordId,
            ordersnSon: this.form.ordersnSon,
            adminRefundPrice: this.form.adminRefundPrice,
            penalty: this.form.penalty,
            videoUrl: this.form.videoUrl,
            ...this.params
          }
          this.$confirm('请确认信息是否有误?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true
            upRefundOrderGoods(params).then(res => {
              if (res.data.code === 200) {
                this.params = {}
                this.$message.success('操作成功')
                this.getInfo()
                this.getRefundOperationLogList()
              } else {
                this.$message.error(res.data.msg)
              }
              this.loading = false
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.handleCheck(3)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
	.orderDetails {
		font-size: 14px;
		padding: 20px;
		margin: 40px 30px;
		border: 1px solid #DBDBDB;
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
		overflow: hidden
	}

	.el-timeline {
		margin-top: 35px
	}
</style>
