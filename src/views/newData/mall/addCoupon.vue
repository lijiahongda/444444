<template>
	<div class="app-container" v-loading="loading">
		<el-form class="style_auto" :model="form" :rules="rules" ref="form" label-width="140px" :inline="true">
			<el-form-item label="优惠券名称:"  prop="coupon_name">
				<el-input v-model="form.coupon_name" style="width:500px" placeholder="请填写优惠券名称" />
			</el-form-item>

			<el-form-item label="有效日期:">
				<el-col>
					<el-radio-group v-model="form.date_type">
						<el-radio :label="1">固定日期</el-radio>
						<el-radio :label="2">领取后有效期</el-radio>
					</el-radio-group>
				</el-col>
				<el-col v-if="form.date_type==1">
					<el-date-picker v-model="form.coupon_use_starttime" type="date" value-format="yyyy-MM-dd" placeholder="有效日期" style="width: 150px;" />
					<el-date-picker v-model="form.coupon_use_endtime" type="date" value-format="yyyy-MM-dd" placeholder="失效日期" style="width: 150px;" />
				</el-col>
				<el-col v-if="form.date_type==2">
					<el-input v-model="form.days" placeholder="" style="width: 100px;"/>
				</el-col>
			</el-form-item>
			<el-form-item label="优惠类型:"  class="coupon_type">
				<el-col>
					<el-radio-group v-model="form.coupon_type">
						<el-radio :label="0">满减券</el-radio>
						<el-radio :label="1">折扣券</el-radio>
					</el-radio-group>
				</el-col>
				<el-col>
					<span v-if="form.coupon_type==0">
						满
					<el-input  v-model="form.coupon_type_befor" style="width: 100px;"/>
						减
						<el-input  v-model="form.coupon_type_after" style="width: 100px;"/>
					</span>
					<span v-else>
							<el-input  v-model="form.coupon_type_after" style="width: 100px;"/>
						折,最高折扣
							<el-input  v-model="form.mamount" style="width: 100px;"/>
						</span>
				</el-col>
				<!-- <el-col> 满
					<el-input  v-model="form.coupon_type_befor" style="width: 100px;"/>
					<span v-if="form.coupon_type==0"> 减 </span>
					<span v-else> 折扣 </span>
					<el-input  v-model="form.coupon_type_after" style="width: 100px;"/>
					</el-col> -->



			</el-form-item>

      <el-form-item label="选取优惠券标签:">
				<el-col>
				  <el-input style="display:inline-block; width:150px;" v-model="form.handleListName" :disabled="true" />
				  <el-input style="display:inline-block; width:150px;display:none" v-model="form.coupon_tag_id" :disabled="true" />
					<el-button style="display:inline-block" @click="handleList">选取</el-button>
				</el-col>
			</el-form-item>
			<el-form-item label="适用业务:">
				<el-col>
					<el-radio-group v-model="form.modules">
						<el-radio label="2">商城</el-radio>
						<el-radio label="5">第三方通用劵</el-radio>
						<el-radio label="1">酒店</el-radio>
						<el-radio label="3">线路</el-radio>
						<el-radio label="6">直播</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>
			<el-form-item label="优惠券渠道:">
				<el-col>
					<el-radio-group v-model="form.channel_type">
						<el-radio  v-for="item in couponChannelTypes" :key="item.id" :label="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>

			<el-form-item label="适用范围:" prop="typeId" v-if="form.modules==2||form.modules==5 ||form.modules==6">
				<el-select v-model="form.typeId" placeholder="请选择">
					<el-col v-if="form.modules==2">
						<el-option v-for="item in shopOption" :key="item.id" :label="item.label" :value="item.id" />
					</el-col>
					<el-col v-if="form.modules==6">
						<el-option v-for="item in shopOption" :key="item.id" :label="item.label" :value="item.id" />
					</el-col>
					<el-col v-if="form.modules==5">
						<el-option v-for="item in thirdTem" :key="item.id" :label="item.label" :value="item.id" />
					</el-col>

					<el-col v-if="form.modules==1">
						<el-option v-for="item in hotelOption" :key="item.id" :label="item.label" :value="item.id" />
					</el-col>

					<!-- <el-option v-for="item in isYw" :key="item.id" :label="item.name" :value="item.id" /> -->

				</el-select>
			</el-form-item>


			<el-form-item label="适用范围:" prop="son_modules" v-if="form.modules==1">
				<el-select v-model="form.son_modules" placeholder="请选择">
					<el-col>
						<el-option v-for="item in hotelOption" :key="item.id" :label="item.label" :value="item.id" />
					</el-col>
				</el-select>
			</el-form-item>





			<el-form-item label="商城:" prop="son_modules" v-if="form.modules == 2 && form.typeId==1">
				<el-radio v-model="form.son_modules" label="0">全场通用</el-radio>
				<el-radio v-model="form.son_modules" label="1">自营商品优惠券</el-radio>
			</el-form-item>

			<el-form-item label="是否可赠:" prop="is_give" v-if="form.modules == 2 || form.modules == 5">
				<el-radio v-model="form.is_give" :label="1">是</el-radio>
				<el-radio v-model="form.is_give" :label="0">否</el-radio>
			</el-form-item>

			<el-form-item label="产品编号"  v-show="form.modules==2 && form.typeId!=1||form.modules==6 && form.typeId!=1" prop="stock_num">
				<el-input  v-if="form.typeId==3"  placeholder="请输入产品编号" v-model="form.son_modules"/>
				<el-input  v-else-if="form.typeId==6"  placeholder="请输入分类编号" v-model="form.son_modules"/>
				<el-input  v-else-if="form.typeId==5"  placeholder="请输入活动编号" v-model="form.son_modules"/>
				<el-input  v-else-if="form.typeId==4"  placeholder="请输入店铺编号" v-model="form.son_modules"/>
			</el-form-item>


			<el-form-item label="设置库存" prop="stock_num">
				<el-input v-model="form.stock_num" placeholder="0" />
			</el-form-item>

			<el-form-item label="每人限领" prop="buy_limit">
				<el-input v-model="form.buy_limit" placeholder="1" />
			</el-form-item>

			<el-form-item label="使用限制:">
				<el-col>
					<el-radio-group v-model="form.isMember">
						<el-radio :label="0">不限</el-radio>
						<el-radio :label="1">仅会员</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>
			<el-form-item label="是否在前端展示:">
				<el-col>
					<el-radio-group v-model="form.is_show">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>

			<el-form-item label="优惠券描述:"  >
				<el-input type="textarea" :autosize="{minRows:5}" style="width:500px;line-height:36px;"  v-model="form.coupon_message"  placeholder="请填写优惠券描述" />
			</el-form-item>

			<el-form-item class="save_btn">
				<el-button type="primary" @click="onAdd('form')">保存</el-button>
			</el-form-item>


      <el-dialog title="选取商品" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="id" label="id" width="150"></el-table-column>
          <el-table-column property="name" label="名称" width="200"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" align="center">
              <el-button type="text" size="small" @click="onEdit(scope.row.id,scope.row.name)">选取</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

			<!-- <el-form-item label="用途:">
				<el-col>
					<el-radio-group v-model="form.typeId">
						<el-radio label="1">平台</el-radio>
						<el-radio label="2">第三方</el-radio>
						<el-radio label="3">指定商品</el-radio>
						<el-radio label="4">店铺券</el-radio>
						<el-radio label="5">活动券</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item> -->


			<!-- <el-form-item label="适用业务:" prop="modules">
				<el-select v-model="form.modules" placeholder="请选择">
					<el-option v-for="item in isYw" :key="item.id" :label="item.name" :value="item.id" />

				</el-select>
			</el-form-item> -->
			<!-- <el-form-item label="子模块:"  v-if="form.modules==1 ||form.modules==2 ||form.modules==3"  prop="typeId">
				<el-col v-if="form.modules==1">
				 <el-select v-model="form.son_modules" placeholder="请选择">
				    <el-option
				    v-for="item in hotelOption"
				    :key="item.id"
				    :label="item.label"
				    :value="item.id">
				    </el-option>
				</el-select>
				</el-col>
				<el-col v-if="form.modules==2">
					<el-select v-model="form.son_modules" placeholder="请选择" v-if="form.typeId==1||form.typeId==2">
						<el-option
						v-for="item in shopOption"
						:key="item.id"
						:label="item.label"
						:value="item.id" >
						</el-option>
					</el-select>
					<el-input placeholder="请输入产品编号"  v-model="form.son_modules"  v-else/>
				</el-col>
				<el-col v-if="form.modules==3">
					<el-input  placeholder="请输入产品编号" v-model="form.son_modules"/>
				</el-col>
			</el-form-item>
			 -->
			<!-- <el-form-item label="设置库存" prop="stock_num">
				<el-input v-model="form.stock_num" placeholder="0" />
			</el-form-item> -->
			<!-- <el-form-item label="商户手机号" prop="mobile" v-if="this.form.typeId == 2">
				<el-input v-model="form.mobile" placeholder="请填写商户手机号" />
			</el-form-item>
			<el-form-item label="使用区域" prop="address" v-if="this.form.typeId == 2">
				<el-input v-model="form.address" placeholder="请填写使用区域" />
			</el-form-item> -->

			<!-- <el-form-item label="使用限制:">
				<el-col>
					<el-radio-group v-model="form.isMember">
						<el-radio :label="0">不限</el-radio>
						<el-radio :label="1">仅会员</el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item> -->
			<!-- <el-form-item label="优惠券描述:"  v-if="form.typeId==1 || form.typeId==3 || form.typeId==4 || form.typeId==5">
				<el-input type="textarea" v-model="form.coupon_message"  v-if="form.typeId==1 || form.typeId==3 || form.typeId==4 || form.typeId==5" placeholder="请填写优惠券描述" />
			</el-form-item>
			<el-form-item label="优惠券规则:"  v-if="form.typeId==2">
				<el-input type="textarea" v-model="form.coupon_message" v-if="form.typeId==2"  placeholder="填写优惠规则" />
			</el-form-item>
			<el-form-item label="审核状态:"  v-if="form.typeId==2">
				<el-col>
					<el-radio v-model="form.state" label="0">审核中</el-radio>
					<el-radio v-model="form.state" label="1">审核成功</el-radio>
					<el-radio v-model="form.state" label="2">审核失败</el-radio>
				</el-col>
			</el-form-item> -->
			<!-- <el-form-item class="save_btn">
				<el-button type="primary" @click="onAdd('form')">保存</el-button>
			</el-form-item> -->
		</el-form>
	</div>
</template>
<script>
    import {couponNewlyIncreased,newUpdateCoupon,couponDetail,couponChannelType} from '@/api/admin'
    import {getCouponTags} from '@/api/order'
    import _ from 'lodash'
    export default {
        data() {
            return {
                form:{
                  	channel_type:0,
                    coupon_name:'',//优惠券名称
                    coupon_type:0, //用途
                    coupon_type_befor:'', //折扣
                    coupon_type_after:'',//折扣
                    date_type:1, // 固定日期 有效日期
                    modules:'', // 业务
                    stock_num:"",  //库存
                    days:"", //有效天数
                    coupon_use_starttime:'', //有效期
                    coupon_use_endtime:'', //有效期
                    coupon_message:'', //商品描述
                    state:0, //审核状态
                    isMember:0, //是否是会员
                    son_modules:'', //子模块
                    typeId:"1",//用途
                    mobile:"",//商户手机号
                    address:"",//商户使用区域
                    coupon_tag_id:"",
                    handleListName:'',//  选取商品
                },
              couponChannelTypes:[],
                id:"",
                hotelOption: [{
                    id: "0",
                    label: '通用'
                }, {
                    id: '1',
                    label: '国内'
                }, {
                    id: 2,
                    label: '国际'
                }, {
                    id: 3,
                    label: '高星特惠'
                }],
                shopOption: [{
                    id: '1',
                    label: '通用'
                }, {
                    id: '3',
                    label: '指定商品'
                }, {
                    id: '6',
                    label: '指定商品分类'
                }, {
                    id: '5',
                    label: '指定活动'
                }, {
                    id: '4',
                    label: '指定店铺'
                }],
                lineOption: [{
                    id: '0',
                    label: '通用'
                }, {
                    id: '1',
                    label: '中旅环球'
                }, {
                    id: '2',
                    label: '笛风假期'
                }],
                thirdTem:[{id:'1',label:"曹操"},{id:'2',label:"飞机票"},{id:'3',label:"加油"}],
                // isYw:[{id:1,name:"酒店"},{id:2,name:"商城"},{id:3,name:"线路"},{id:4,name:"加油充值"}],
                rules:{
                    coupon_name:[{
                        required: true,
                        message: '请填写优惠券名称',
                        trigger: 'blur'
                    }],
                    stock_num:[{
                        required: true,
                        message: '请填写库存',
                        trigger: 'blur'
                    }]
                },
                gridData:[],
				dialogTableVisible: false,
				loading:false,
            }
        },
        methods: {
            onAdd(formNmae){
                this.$refs[formNmae].validate((vaild)=>{
                    if(vaild){
                        if(this.form.typeId == 2){
                            var obj = _.clone(this.form);
                        }else{
                            var obj = _.clone(this.form);
                            delete obj.mobile;
                            delete obj.address;
                        }

                        if(this.id){
                            // 编辑
                            obj.id=this.id;
                            // console.log(obj);return;
                            newUpdateCoupon(obj).then(res=>{
                                if (res.data.code == 200) {
                                    this.$message({
                                        message:"添加成功",
                                        type:"success"
                                    })
                                    //跳转展示列表页
                                    this.$router.push({path: '/mall/coupon'});
                                }else {
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                }
                            })
                        }else{
							// 添加
							this.loading=true
                            couponNewlyIncreased(obj).then(res=>{
                                if (res.data.code == 200) {
									this.loading=false;
                                    this.$message({
                                        message:"添加成功",
                                        type:"success"
                                    })
                                    //跳转展示列表页
                                    this.$router.push({path: '/mall/coupon'});
                                }else {
									this.loading=false;////
                                    this.$message({
                                        message: res.data.msg,
                                        type: 'error'
                                    })
                                }
                            })
                        }
                    }else{
                        this.$message({
                            message:"请填写完成信息",
                            type:"success"
                        })
                    }
                })
            },
          couponChannelType(){
            couponChannelType().then(res=>{
              if(res.data.code==200){
                this.couponChannelTypes = res.data.data;
              }else {
                this.$message.error(res.data.msg)
              }
            })
		  },
            handleList(){
              this.dialogTableVisible = true
              this.getCouponTags()
            },
            onEdit(id,name){
              this.dialogTableVisible = false
              this.form.handleListName = name
              this.form.coupon_tag_id = id
            },
            // 列表数据
            getCouponTags() {
              getCouponTags(this.obj).then(res=>{
                if(res.data.code==200){
                  let dataList = res.data.data;
                  this.gridData = dataList.list
                  this.total = res.data.count;
                  // this.pageTotal = res.data.count
                }else {
                  this.$message.error(res.data.msg)
				}
              })
            }
        },
        created() {
          this.couponChannelType();
            this.id = this.$route.query ? this.$route.query.cid || 0 : 0
            if(this.id){
                couponDetail(`?id=${this.id}`).then(res=>{
                    this.form = res.data.data
				  	this.form.handleListName = res.data.data.coupon_tag_name
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		display: block;
	}
	.coupon_type input{
		width: 100px;
	}
	.style_auto{width: 80%;margin: 0 auto;}
	.save_btn{text-align: center;}
</style>
