<template>
	<div id="edit" v-loading="loading">
		<el-form label-width="120px" style="margin-top:20px"> 
			<el-form-item label="名称">
				<el-input v-model="form.name" placeholder="请输入名称"></el-input>
			</el-form-item>

			 <el-form-item label="图片"
                        prop="goods_cover_image">
            <el-upload :action="uploadUrl"
                       :limit="1"
                       list-type="picture-card"
                       :file-list="fileListOfDetailTwo"
                       :on-success="uploadSuccessOfDetail"
                       :on-exceed="overSizeOfDetail1"
                       :before-upload="uploadBeforeOfDetail"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemoveOfDetail">
              <i class="el-icon-plus"></i>

              <div slot="tip"
                   class="el-upload__tip"
                   style="color: green;">
                请选择300KB以内的图片
              </div>
            </el-upload>
            <el-input v-model="form.image" style="display: none;" />
          </el-form-item>
			<el-form-item label="图片宽">
				<el-input type="number" v-model="form.imageWidth" placeholder="请输入图片宽"></el-input>
			</el-form-item>
			<el-form-item label="图片高">
				<el-input type="number" v-model="form.imageHeight" placeholder="请输入图片高"></el-input>
			</el-form-item>

			<el-form-item label="类型">
				<!-- '1：爆款、2：9元店、3：签到、4：胶囊位进入首页、5：必买爆款 -->
				<el-radio-group v-model="form.type" style="width:900px">
					<el-radio :label="1">爆款</el-radio>
					<el-radio :label="2">9元店</el-radio>
					<el-radio :label="3">签到</el-radio>
					<el-radio :label="4">胶囊位进入首页</el-radio>
					<el-radio :label="5">必买爆款</el-radio>
					<el-radio :label="6">加油</el-radio>
				</el-radio-group>
			</el-form-item>


			<el-form-item label="用户类型">
				<!--   会员类型:0普通会员,1体验会员,2精英会员,3黑卡会员', -->
				<el-radio-group v-model="form.membertype" style="width:900px">
					<el-radio :label="0">普通会员</el-radio>
					<el-radio :label="1">体验会员</el-radio>
					<el-radio :label="2">精英会员</el-radio>
					<el-radio :label="3">黑卡会员</el-radio>
				</el-radio-group>
			</el-form-item>


			<el-form-item label="类型">
				<!-- 1:优惠券，2：优惠券主题 -->
				<el-radio-group v-model="form.couponType" @change="changeCoupon">
					<el-radio :label="1">优惠券</el-radio>
					<el-radio :label="2">优惠券专题</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="选择优惠券" class="background_color"  v-if="this.form.couponType == 1">
				<el-button type="primary" @click="dialogCoupon = true" plain>点击选择</el-button>
				<div v-if="form.couponInfo.couponId" class="commodity">
					<ul>
						<li style="border:none">
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<div>
									<span>优惠券名称：{{form.couponInfo.couponName}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>

			<el-form-item label="选择优惠券专题" class="background_color"  v-if="this.form.couponType == 2">
				<el-button type="primary" @click="dialogCoupon2 = true" plain>点击选择</el-button>
				<div v-if="form.couponInfo.couponId" class="commodity">
					<ul>
					<li style="border:none" >
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<div>
									<span>优惠券专题名称：{{form.couponInfo.couponName}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>
			
			<el-form-item label="">
				<router-link to="/tools/CouponBounced">
					<el-button >取消</el-button>
				</router-link>
				<el-button type="primary" @click="addCouponBouncedForm">保存</el-button>
			</el-form-item>
		</el-form>



		<el-dialog width="800px" title="选择优惠券" :visible.sync="dialogCoupon"  v-loading="loading" @close="closeBox">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择优惠券">
					<el-input v-model="searchVal" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getCoupons(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="list.length>0">
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index" >
						<div class="section-p">
							<div>
								<span>id:{{item.id}}</span>
								<span>优惠券名称：{{item.name}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>
		</el-dialog>

		<el-dialog width="800px" title="选择专题" :visible.sync="dialogCoupon2"  v-loading="loading" @close="closeBox">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择专题">
					<el-input v-model="searchVal" placeholder="请输入名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getActivitiesCoupons(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="list.length>0">
					<li @click="choseId2(item)" v-for="(item,index) in list2" :key="index" >
						<div class="section-p">
							<div>
								<span>id:{{item.id}}</span>
								<span>专题名称：{{item.ac_name}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChange2" layout="prev, pager, next" :total="total2">
			</el-pagination>
		</el-dialog>

		
	</div>
</template>

<script>
  import Tinymce from "@/components/Tinymce";

  import {
  imgUploadUrl,
} from '@/api/cust'
  import {
	getCouponBounced,
	addCouponBounced,upCouponBounced,getCoupons,getActivitiesCoupons
  } from '@/api/shops'
  export default {
    name: 'edit',
    components:{
      Tinymce
    },
	data(){
      return{
        form:{
          top_img:'',
          top_content_img:'',
          invite_img:'',
          invite_exclusive_img:'',
          video_url:'',
          is_top:0,
		  is_video:0,
		  couponInfo:{}
		},
		loading: false,
		searchVal:'',
		dialogCoupon:false,
		dialogCoupon2:false,
		strategy_category:[],
		uploadUrl: this.apiurl.imguploadurl,
		fileListOfDetailTwo: [],
		list:[],
		total:0,
		list2:[],
		total2:0,
	  }
	},
	created(){
	  this.getCoupons(1);
	  this.getActivitiesCoupons(1);
	  if (this.$route.query.id) 
	  {
      	this.getCouponBounced();
	  }
	},
	methods:{
      getCouponBounced(){
        getCouponBounced({id:this.$route.query.id}).then(res=>{
          if(res.data.code == 200){
			this.form = res.data.data;
			var imgListTwo = res.data.data.image.split(' ');
			this.fileListOfDetailTwo = imgListTwo.map(function (imgObj) {
            return {
              'name': "",
              'url': imgObj
            }
          })

          }else{
            this.$message.error(res.data.msg)
          }
        })
	  },
	  addCouponBouncedForm()
	  {
		let url=this.$route.query.id?upCouponBounced:addCouponBounced;
		url(this.form).then(res=>{
			if(res.data.code == 200){
				this.$message.success(res.data.msg)
				this.$router.push('/tools/CouponBounced')
			}else{
				this.$message.error(res.data.msg)
			}
		})

	  },

	uploadSuccessOfDetail (res) {
      this.form.image = res.url;
    },

    overSizeOfDetail1 (files, fileList) {
      this.$message({
        message: "上传图片不能超过1张",
        type: 'error',
      })
	},	
	
    uploadBeforeOfDetail (file) {
      if (file.size / 1024 > 300) {
        this.$message({
          message: "图片请保持在750*350px,300KB以内",
          type: 'error',
        })
        return false
      }
	},

    handlePictureCardPreview (file) {
      // alert(2323);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移除事件
    handleRemoveOfDetail (file, fileList) {
      this.form.image = "";
	},	  
	
	// 弹出 优惠专题
	getActivitiesCoupons(page) {
		let _this = this;
		this.loading = true
		let data = {
			page: page
		}
		if (this.searchVal) {
			data['keyword'] = this.searchVal
		}

		getActivitiesCoupons(data).then((res) => {
			if (res.data.code == 200) {
				this.list2 = res.data.data
				this.total2 = res.data.count
				this.loading = false
			}
		}).catch((error) => {
			console.log(error)
		})
	},


	// 弹出 优惠券列表
	getCoupons(page) {
		let _this = this;
		this.loading = true
		let data = {
			page: page
		}
		if (this.searchVal) {
			data['keyword'] = this.searchVal
		}
		getCoupons(data).then((res) => {
			if (res.data.code == 200) {
				this.list = res.data.data
				this.total = res.data.count
				this.loading = false
			}
		}).catch((error) => {
			console.log(error)
		})
	},

	closeBox(){
		this.searchVal  =''
	},

	handleCurrentChange(val) {
		this.getCoupons(val)
	},
	handleCurrentChange2(val) {
		this.getActivitiesCoupons(val)
	},

		// 选择商品
	choseId(item) {
		// console.log(item,'item')
		var couponInfo = this.form.couponInfo;

		var obj = {
			couponName :item.name,
			couponId:item.id,
		};
		this.form.couponInfo = obj;
		this.form.couponId = item.id
		this.dialogCoupon=false;
	},


	choseId2(item) {
		// console.log(item,'item')
		var couponInfo = this.form.couponInfo;

		var obj = {
			couponName :item.ac_name,
			couponId:item.id,
		};
		this.form.couponInfo = obj; 
		this.form.couponId = item.id
		this.dialogCoupon2=false;
	},

	changeCoupon(val)
	{
		this.form.couponInfo={};
		this.form.couponId = ''
	}
	




	}
  }
</script>



<style scoped="scoped" lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	/deep/ .el-input__inner {
		width: 400px
	}

	.ipt_list input {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px
	}

	.gropAdd {
		margin: 20px;
		box-sizing: border-box;
		padding: 20px;
	}

	.input-common {
		width: 450px;
		display: flex;
		justify-content: space-between;

		.input-name {
			width: 250px;
		}

		;

		.s1 {
			margin-bottom: 5px;
			overflow: hidden;

			.s2 {
				margin-right: 5px;
				display: inline-block;
			}
		}

		.input-div {
			color: #999;
			padding-left: 5px;
			width: 200px;
		}
	}

	.bargain_mode {
		display: block;
		overflow: hidden;

	}

	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none
	}

	.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			border-top: 1px solid #ddd;
			margin-bottom: 5px;
		}

		.imgDiv {
			float: left;
			background: #f1f1f1;
			width: 90px;
			height: 90px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.section-p {
			padding-left: 10px;
			box-sizing: border-box;
			float: left;

			span {
				line-height: 16px;
				display: inline-block;
				margin-right: 20px;
			}
		}

		.select-btn {
			float: right;
		}

		/deep/ .del_item .el-button--danger.is-plain {
			padding: 0;
			width: 50px;
			height: 40px;
		}
	}
</style>