<template>
	<div class="gropAdd">
		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="渠道" class="background_color" v-if="!editId">
					<el-radio-group v-model="form.channel_id" @change="radioChange">
						<el-radio v-model="form.channel_id"  v-for="item in channelList" :key="item.id"  :label="item.id">{{item.channel_name}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择商品">
					<el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index">
						<div class="imgDiv">
							<img :src="item.path" alt="">
						</div>
						<div class="section-p">
							<p v-text="item.goods_name"></p>
							<div>
								<span>官网价：￥{{item.origin_price}}</span>
								<span>库存：{{item.inventory}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="标签名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入标签名称"></el-input>
			</el-form-item>

			<el-form-item label="选择商品" prop="product_id">
				<div style="float:left">
					<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				</div>

				<div v-if="form.goods_info.length !=0" class="commodity commodity_contaion" style="clear:both;">
					<ul>
						<li style="border:none" v-for="(item,index) in form.goods_info" :key="index">

							<div class="imgDiv">
                <img :src="item.path" alt="">
							</div>
							<div class="section-p" style="width:720px;line-height: 0;background: #f1f1f1;padding: 30px;margin-right: 10px;">
								<span v-text="item.goods_name"></span>
								<!-- <div>
									<span>官网价：￥{{item.price}}</span>
									<span>会员价：￥{{item.vip_price}}</span>
									<span>成本价：￥{{item.buy_price}}</span>
									<span>库存：{{item.inventory}}</span>
								</div> -->
							</div>
							<div class="del_item">
								<el-button type="danger" plain @click='isdelItem(item,form.goods_info,index)'>删除</el-button>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
  import _ from 'lodash'
  import waves from '@/directive/waves' // 水波纹指令
  import {addCouponTag,upCouponTag,getCouponTag,delCouponTagProctor} from '@/api/order'
  import {
    tabGoods,
    getBargain,
    getApActivity,
    getTabChannels,
    addApActivity,
    updateApActivity,
    getChannelList,
    deleteApActivity
  } from '@/api/shops'
  const isInArray = (single, arr) => {
    return (arr.findIndex(res => {
      return res === single
    })) >= 0
  }
  export default {
    name: 'bargainAdd',
    directives: {
      waves
    },
    // components: { VerticalFrom },
    data() {
      let _this = this;
      var validateStock = (rule, value, callback) => {
        if (value > _this.stock) {
          callback(new Error('不可高于产品现有库存'));
        } else {
          callback();
        }
      };
      return {
        total: 1,
        dialogTableVisible: false,
        form: {
          name:'',
          id:'',
          goods_info:[],
        },
        disableds:false,
        channelList:[],
        radioChannel:'',
        editId:'',
        currentPage: 1,
        pickerOptions: {
          disabledDate: (time) => {
            const curDate = (new Date()).getTime()
            return time.getTime() < Date.now() - 8.64e7;
          }
        },


        dialogVisible: false,
        dialogImageUrl: '',

        searchVal: '',
        timeArray: [],
        list: [],
        stock: '',
        fileList_contract:[],
      }
    },
    computed: {

    },
    mounted() {
      this.getTabGoods(1)
      if (this.$route.query.id) {
        this.getList(this.$route.query.id,this.$route.query.name)
        this.disableds =true;
      }
      this.getTabChannels();
      this.getChannelList();
    },
    methods: {
      // 选择推广渠道
      handleCheckedCitiesChange() {

      },
      //  是否执行删除代码
      isdelItem(item, dataList, idx){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log(item, dataList, idx,111)
		  if(item.id){
            delCouponTagProctor({id: item.id}).then(res=>{
              if(res.data.code == 200){
                this.$message({
                  type: 'success',
                  message: '删除成功'
                });
			  }else {
                self.$message({
                  message: res.data.msg || '修改失败',
                  type: 'error',
                })
              }
            })
		  }
          dataList.splice(idx, 1)
            console.log(this.form.goods_info)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 推广渠道
      getTabChannels() {
        getTabChannels().then(res => {
          console.log(res)
          this.cities = res.data;
        })
      },
      getChannelList()
      {
        getChannelList().then((res) => {
          if (res.data.code == 200) {
            this.channelList = res.data.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 回显
      getList(cid) {
        let _this = this;
        getCouponTag({id:cid}).then((res) => {
          if (res.data.code == 200) {
            _this.form = res.data.data
            // _this.form.id = _this.form.id
			      this.$set(this.form,'goods_info',res.data.data.productData)
            console.log(_this.list)
            _this.stock = res.data.data.inventory
            let arr = [];
            pop_channels.map(item => {
              arr.push(parseInt(item.id))
            })
            _this.form.pop_channels = arr;
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      onSubmit() {
        var self = this
        if(self.form.goods_info.length == 0){
          self.$message({
            type:"error",
            message:'请选择商品'
          })
          return false;
        }

        if (this.$route.query.id) {
          let opt = {
            id:this.form.id,
            name:this.form.name,
            productData:this.form.productData
          }
          upCouponTag(opt).then(res => {
            if (res.data.code == 200) {
              self.$message({
                message: '修改成功',
                type: 'success',
              })
              self.$router.push('/operate/couponTags')
            } else {
              self.$message({
                message: res.data.msg || '修改失败',
                type: 'error',
              })
            }

          })
        } else {
          let productData = [];
          this.form.goods_info.forEach(item=>{
            console.log(item)
            productData.push(item.product_id)
          })
          let params = {
                name: this.form.name,
                productData: productData
          }
          addCouponTag(params).then(res => {
            if (res.data.code == 200) {
              self.$message({
                message: '添加成功',
                type: 'success',
              })
              self.$router.push('/operate/couponTags')
            } else {
              self.$message({
                message: res.data.msg || '添加失败',
                type: 'error',
              })
            }
          })
        }
      },
      radioChange:function(val)
      {
        this.currentPage = 1;
        this.radioChannel=val;
        this.list=[];
        this.getTabGoods(1)
      },
      // 选择商品
      choseId(item) {
        var goodsInfo = this.form.goods_info;
        var idx = this.form.goods_info.length;
        var obj = {
          product_id: '',
          path:'',
          // goods_img: '',
          goods_name: '',
          // id: '',
        };
        obj.path = item.path;
        obj.goods_name = item.goods_name;
        obj.product_id = item.id || '';
        // obj.id = item.id || '';
        if (goodsInfo.length == 0) {
          this.form.goods_info[idx] = obj; //官网价
          this.dialogTableVisible = false
        } else {
          var isArr = []
          goodsInfo.map((json) => {
            isArr.push(json.product_id)
          })
          // console.log(item.id,isArr)
          if(isInArray(item.id,isArr)){
            this.$message({
              type:'info',
              message:'不能选择相同产品'
            })
          }else{
            this.form.goods_info[idx] = obj; //官网价
            this.dialogTableVisible = false
          }
        }
      },
      handleCurrentChange(val) {
        this.getTabGoods(val)
      },
      getTabGoods(page) {
        let _this = this;
        let data = {
          page: page,
          channel_id:this.radioChannel
        }
        if (this.searchVal) {
          data['goods_name'] = this.searchVal
        }

        tabGoods(data).then((res) => {
          if (res.data.code == 200) {
            _this.list = res.data.data
            _this.total = res.data.count
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        return isJPG;
      },
      beforeAvatarUpload2(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        return isJPG;
      },
      handlePictureCardPreview(file, fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleOnExceed(file, fileList) {
        this.$message({
          type: "error",
          message: "最多上传两张图片"
        })
      },
      handleAvatarSuccess(res, file) {
        if (res.code === 200) {
          this.$set(this.form,'share_img',res.url)
        } else {
          this.$set(this.form,'share_img','')
        }
      },
      handleAvatarSuccess1(res, file, fileList) {
        if (res.code === 200) {
          this.$set(this.form,'act_imgs',res.url)
        } else {
          this.$set(this.form,'act_imgs','')
        }
      },
      handleAvatarSuccess2(res) {
        if (res.code === 200) {
          this.$set(this.form,'poster_img',res.url)
        } else {
          this.$set(this.form,'poster_img','')
        }

      },
      handleRemove(){
        this.form.share_img = ''
      },
      handleRemove2(){
        this.form.poster_img=''
      },

      handleAvatarSuccessGoods(res, file, fileList,index)
      {
        this.form.goods_info[index].goods_img = file.response.url;
      },


    }
  }
</script>
<style scoped="scoped" lang="scss">
	// .demo-input-suffix{
	//   line-height: initial;
	// }
	.ipt_list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.commodity .section-p .ipt_list_contaion span{
		font-size: 12px;
		margin-right: 3px;
	}
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
		width: 120px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px;
		font-size:12px;
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
	.avatar-uploader {
		float: left;
		border-radius: 5px;
		margin-left: 10px;
	}
	// .el-form-item__content .avatar-uploader {
	// 	float: none
	// }

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
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
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
			margin-top: 24px;
			border-radius: 100%;
			padding: 0;
			width: 50px;
			height: 50px;
		}
	}
	.commodity_contaion li{
		display: flex;
		flex-direction: row;
		align-items: center;
		.imgDiv,.section-p,.select-btn{
			float: initial;
		}
	}
</style>
