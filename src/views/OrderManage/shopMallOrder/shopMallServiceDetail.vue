<template>
	<section class="orderDetails">
		<!-- 订单信息 -->
		<div style="margin-bottom:20px;">
			<router-link :to="{path:'/shopMall-service'}">
				<el-button type="primary">返回列表</el-button>
			</router-link>

            <router-link :to="{path:'/service-type-add'}">
				<el-button type="primary">新增服务类型</el-button>
			</router-link>
			<router-link :to="{path:'/service-cause'}">
				<el-button type="primary">售后原因</el-button>
			</router-link>
		</div>
        <el-form :model="form" size="mini" inline>
				<el-form-item label="物流单号：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.logisticeNumber" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="商品名称：" :label-width="formLabelWidth">
					<el-input :disabled="true" :title="form.goodsName" v-model="form.goodsName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="订单编号：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.ordersnSon" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="订单来源：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.orderSource" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="退款时间：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.refundTime" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="支付单号：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.payFormNo" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="支付方式：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.payFormNo" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="实际支付金额：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.actualPayPrice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="实际退款金额：" :label-width="formLabelWidth">
					<el-input v-model="form.adminRefundPrice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="服务类型：" :label-width="formLabelWidth">

                    <el-select v-model="form.adminServiceType" placeholder="请选择服务类型" clearable>
                            <el-option
                            v-for="item in typeList"
                            :key="item.id"
                            :label="item.serviceTypeName"
                            :value="item.id">
                            </el-option>
                    </el-select>

				</el-form-item>


				<el-form-item  label="收货人：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.receiverName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item  label="会员手机号：" :label-width="formLabelWidth">
					<el-input :disabled="true" v-model="form.memberMobile" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注信息：" :label-width="formLabelWidth">
					<el-input v-model="form.adminRefundContent " autocomplete="off" type="textarea"
							  :autosize="{ minRows: 2, maxRows: 4}"></el-input>
				</el-form-item>
				<el-form-item label="凭证：" :label-width="formLabelWidth">
					<div class="demo-image__preview">
                        <span v-for="element in fileListOfDetail" class="board-item">
                            <img :src="element">
                        </span>

						<!-- <el-images
							style="width: 100px; height: 100px"
							:src="url"
							:preview-src-list="srcList">
						</el-image> -->
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" v-if="form.refundStatus === 31">
				<el-button type="primary" @click="handleCheck(1)">审核通过</el-button>
				<el-button @click="handleCheck(2)">审核不通过</el-button>
			</div>

	</section>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
        getRefundOrderInfo,
        checkRefund,
        getRefundServiceTypes
	} from '@/api/admin'

	export default {
		directives: {
			waves
		},
		data() {
			return {
				ordersnSon: '', //订单编号
                form:{},
                fileListOfDetail:[],
                formLabelWidth: '140px',
                typeList:[]
			}
		},
		computed: {
			rowCount: function() {
				return Math.ceil(this.tableData.length / 2)
			}
		},
		created() {
			this.ordersnSon = this.$route.query ? this.$route.query.ordersnSon : this.$router.query ? this.$router.query.ordersnSon : ''
			if (this.ordersnSon) {
				this.getInfo()
            }
            this.getRefundServiceTypes();
		},
		methods: {
		
			getInfo() {
				let params = {
					ordersnSon: this.ordersnSon
				}
				getRefundOrderInfo(params).then(res => {
                    if (res.data.code === 200) 
                    {
                        this.form = res.data.data;
                        this.form.adminServiceType = this.form.adminServiceType.toString(); 
                        this.fileListOfDetail= this.form.refundImg
                        // this.fileListOfDetail = this.form.refundImg.map(function(imgObj) {
						// 	return {
						// 		'name': "",
						// 		'url': imgObj
						// 	}
						// })
					}else{
						this.$message.error(res.data.msg || "网络错误")
					}
				})
            },

            getRefundServiceTypes() {
                var data={};
                data.pageSize=100;
                getRefundServiceTypes(data).then(res => {
                if (res.data.code === 200){
                    this.typeList = res.data.data.list
                }
                })
            },


            handleCheck(status){
                let params = {
                recordId: this.form.recordId,
                adminRefundContent: this.form.adminRefundContent,
                adminRefundPrice: this.form.adminRefundPrice,
                checkType: status,
                adminServiceType: this.form.adminServiceType,
                }
                checkRefund(params).then(res => {
                if (res.data.code === 200){
                    this.$message.success('操作成功');
                    this.$router.push('/shopMall-service')
                }
                })
            },
		}
	}
</script>
<style lang="scss">
	.orderDetails {
		font-size: 14px;
		padding: 20px;
		margin: 40px 30px;
		border: 1px solid #DBDBDB;
		border-radius: 8px;
	}

	.low_info {
		cursor: pointer;
	}

	.search-row .title {
		margin: 40px 0 30px;
		font-size: 18px;
		font-weight: bold;
	}
	.el-table__header-wrapper{overflow:hidden}
	.el-timeline{margin-top:35px}
</style>
