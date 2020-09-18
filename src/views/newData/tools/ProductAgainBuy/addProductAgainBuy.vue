<template>
	<div id="edit" v-loading="loading">
		<el-form label-width="120px" style="margin-top:20px">
			<el-form-item label="立减">
				<el-input type="number" v-model="form.againPrice" placeholder="请输入立减"></el-input>
			</el-form-item>

			<el-form-item label="组合成长值">
				<el-input type="number"  v-model="form.groupGrowth" placeholder="请输入组合成长值"></el-input>
			</el-form-item>
			<el-form-item label="立减成长值">
				<el-input type="number"  v-model="form.knockGrowth" placeholder="请输入立减成长值"></el-input>
			</el-form-item>
			<el-form-item label="加购价钱">
				<el-input type="number"  v-model="form.purchasePrice" placeholder="请输入加购价钱"></el-input>
			</el-form-item>

			<el-form-item label="选择商品" class="background_color">
				<el-button type="primary" @click="dialogTableVisible = true" plain>点击选择</el-button>
				<div v-if="form.goodsInfo.id" class="commodity">
					<ul>
						<li style="border:none">
							<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
								<div>
									<span>商品id：{{form.goodsInfo.id}},商品名称：{{form.goodsInfo.goodsName}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</el-form-item>


			<el-form-item label="">
				<router-link to="/tools/community-guides">
					<el-button >取消</el-button>
				</router-link>
				<el-button type="primary" @click="addForm">保存</el-button>
			</el-form-item>
		</el-form>

		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible"  v-loading="loading" @close="closeBox">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择商品">
					<el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="list.length>0">
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index" >
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
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
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
	getProductAgainBuy,
	addProductAgainBuy,upProductAgainBuy,tabGoods
  } from '@/api/shops'
  export default {
    name: 'edit',
    components:{
      Tinymce
    },
	data(){
      return{
        form:{
			productId:0,
			againPrice:0,
			groupGrowth:0,
			knockGrowth:0,
			purchasePrice:0,
		  	goodsInfo:{
				  id:"",
				  goodsName:'',
			  }
		},
		dialogTableVisible:false,
		loading:false,
		searchVal:'',
		uploadUrl: this.apiurl.imguploadurl,
		list:[],
		total:0,
	  }
	},
	created(){
	  this.getTabGoods(1)
	  if (this.$route.query.id) 
	  {
      	this.getProductAgainBuy();
	  }
	},
	methods:{
      getProductAgainBuy(){
        getProductAgainBuy({id:this.$route.query.id}).then(res=>{
          if(res.data.code == 200){
			this.form = res.data.data;
          }else{
            this.$message.error(res.data.msg)
          }
        })
	  },
	  addForm()
	  {
		let url=this.$route.query.id?upProductAgainBuy:addProductAgainBuy;
		url(this.form).then(res=>{
          if(res.data.code == 200){
			this.$message.success(res.data.msg)
			this.$router.push('/tools/ProductAgainBuys')
          }else{
            this.$message.error(res.data.msg)
          }
        })
	  },	

	getTabGoods(page) {
		this.loading = true
		let _this = this;
		let data = {
			page: page
		}
		if (this.searchVal) {
			data['goods_name'] = this.searchVal
		}

		tabGoods(data).then((res) => {
			if (res.data.code == 200) {
				_this.list = res.data.data
				_this.total = res.data.count;
				this.loading = false
			}
		}).catch((error) => {
			console.log(error)
		})
	},

	handleCurrentChange(val) {
		this.getTabGoods(val)
	},
	closeBox(){
		this.searchVal  =''
	},

	// 选择商品
	choseId(item) {
		// console.log(item,'item')
		var goodsInfo = this.form.goodsInfo;
		var obj = {
			goodsName :item.goods_name,
			id:item.id,
		};
		this.form.goodsInfo = obj; //官网价
		this.form.productId = item.id
		this.dialogTableVisible=false;
	},

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