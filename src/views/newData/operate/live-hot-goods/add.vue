<template>
	<div class="app-container" v-loading="loading">
		<el-button @click="dialogTableVisible = true">添加商品</el-button>
		<el-form label-width="120px" :model="form" :rules="rules" ref="form">
			<el-form-item label="标题" prop="activity_title">
				<el-input size="mini" v-model="form.activity_title" placeholder="请输入活动标题" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="简介" prop="activity_desc">
				<el-input size="mini" v-model="form.activity_desc" placeholder="请输入活动简介" maxlength="20"
						  show-word-limit></el-input>
			</el-form-item>
		</el-form>

		<div v-if="form.goods_info.length !=0" class="commodity-items" style="clear:both;">
			<ul>
				<li v-for="(item,index) in form.goods_info" :key="index">
					<div style="width: 100%;">
						<p>直播排序：
							<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')" v-model="item.sort"
									  type="text" placeholder="排序越大越靠前"></el-input>
						</p>
						<p>商品名称： <span v-text="item.goods_name"></span></p>
						<div class="price-box" >
							<img :src="item.goods_img" style="width: 90px;height: 90px;" alt="">
							<div>
								<p>
									<span>官网价：</span>
									<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
											  v-model="item.price"
											  disabled
											  type="text" placeholder="价格"></el-input>
								</p>
								<p>
									<span>预约人数：</span>
									<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
											  v-model="item.count"
											  disabled
											  type="text" placeholder="预约人数"></el-input>
								</p>
								<p>
									<span>预约价格：</span>
									<el-input size="mini" oninput="value=value.replace(/[^\d\.]/g,'')"
											  v-model="item.sk_price"
											  type="text" placeholder="价格"></el-input>
								</p>
							</div>
							<div>
								<el-button v-if="$route.query.id" type="success" plain @click='onSubmit("form")'>保存</el-button>
								<el-button type="danger" plain @click='delItem(item,form.goods_info,index)'>删除</el-button>
								<el-button @click="handleView(item.id)" plain type="primary">查看预约人</el-button>
							</div>
						</div>
					</div>

					<div>


					</div>
				</li>
			</ul>
		</div>

		<el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="渠道" class="background_color">
					<el-radio-group v-model="form.channel_id" @change="radioChange">
						<el-radio v-if="item.id != 7" v-model="form.channel_id" v-for="item in channelList"
								  :key="item.id" :label="item.id">{{item.channel_name}}
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择商品">
					<el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabAllGoods(1)" type="primary">搜索</el-button>
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
							<div>
								<p style="color: darkred;">
									{{item.isSecKill ? '正在参加秒杀活动':''}}
								</p>
							</div>
						</div>

						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange"
						   layout="prev, pager, next" :total="total">
			</el-pagination>

		</el-dialog>
		<el-dialog title="预约人列表" :visible.sync="dialogTableVisibleView">
			<el-table :data="gridData.list">
				<el-table-column property="created_time" label="预约日期" width="180"></el-table-column>
				<el-table-column property="nickname" label="姓名" width="100"></el-table-column>
				<el-table-column property="phone" label="手机号" width="150"></el-table-column>
				<el-table-column property="address" label="是否是会员">
					<template slot-scope="scope">
						{{scope.row.is_vip ? '会员' : '否'}}
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination-container" style="text-align:right;">
				<el-pagination
					:current-page="view.page"
					:total="gridData.count"
					background
					layout="total, prev, pager, next, jumper"
					@current-change="handleCurrentChangeView"
				/>
			</div>
		</el-dialog>
		<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
		<router-link :to="{path:'live-video'}">
			<el-button>返回列表</el-button>
		</router-link>
	</div>
</template>

<script>
  import {
    getTabAllGoods,
    addLiveSellWell,
    updateLiveSellWell,
    getLiveSellWell,
    getChannelList,
    getLiveSellWellGoodsExt
  } from '@/api/shops'

  const isInArray = (single, arr) => {
    return (arr.findIndex(res => {
      return res === single
    })) >= 0
  }
  export default {
    name: 'liveVideoAdd',
    data() {
      return {
        form: {
          act_type: 3,
          is_online: 1,
          goods_info: [] //选择商品信息
        },
        view:{
          page:1
        },
        gridData:{
          list:[]
        },
        loading: false,
        total: 0,
        currentPage: 1,
        radioChannel: '',
        channelList: [],
        list: [],
        disableds: false,
        dialogTableVisible: false,
        dialogTableVisibleView: false,
        searchVal: '',
        showDialog: false,
        videoFileList: [],
        imgFileList: [],
        rules: {
          activity_title: [
            { required: true, message: '请输入活动标题', trigger: 'blur' }
          ],
          activity_desc: [
            { required: true, message: '请输入活动简介', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.getTabAllGoods(1)
      if (this.$route.query.id) {
        this.getLiveSellWell(this.$route.query.id)
        this.disableds = true
      }
      this.getChannelList()
    },
    methods: {
      handleView(id){
        this.dialogTableVisibleView = true;
        this.view.id = id
        getLiveSellWellGoodsExt(this.view).then(res=>{
          if(res.data.code == 200) {
            this.gridData = res.data.data;
		  }
		})
      },
      handleCurrentChangeView(val){
        this.view.page = val;
        this.handleView(this.view.id)
      },
      setPriceDis(item){
        console.log(item)
        if(!item.sk_price && !item.decrease_price){
          item.status = ""
        }else if(item.sk_price){
          item.status = 1
          item.decrease_price=""
        }else if(item.decrease_price){
          item.status = 2
          item.sk_price=""
        }

      },
      getLiveSellWell() {
        this.loading = true
        getLiveSellWell({ id: this.$route.query.id }).then(res => {
          if (res.data.code == 200) {
            this.form = res.data.data
            this.videoFileList = []
            this.imgFileList = []
            this.videoFileList.push({
              name: res.data.data.video_title,
              url: res.data.data.video_cover
            })
            this.imgFileList.push({
              name: res.data.data.video_id,
              url: res.data.data.act_cover
            })
            this.loading = false
            // this.$message.success('操作成功')
          } else {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        })
      },
      radioChange: function(val) {
        this.currentPage = 1
        this.radioChannel = val
        this.list = []
        this.getTabAllGoods(1)
      },
      handleCurrentChange(val) {
        this.getTabAllGoods(val)
      },
      // 删除
      delItem(item, dataList, idx) {
        dataList.splice(idx, 1)
      },
      // 选择商品
      choseId(item) {
        var goodsInfo = this.form.goods_info
        var idx = this.form.goods_info.length
        var obj = {
          sk_price: '', //活动价格
          goods_stock: '', //活动库存
          buy_limit: '', //限购数量
          sort: '', //排序
          act_id: '',
          buy_limit: '',
          goods_id: '',
          goods_img: '',
          goods_name: '',
          id: '',
          price: '',
          sku_id: '',
          sort: '',
          inventory: '',
          is_show:'',
          decrease_price:'',
          status:'',
        }
        obj.sku_id = item.sku_id
        obj.goods_img = item.path
        obj.goods_name = item.goods_name
        obj.goods_id = item.id || ''
        // obj.id = item.id || '';
        obj.act_id = this.$route.query.id || ''
        obj.price = item.origin_price
        obj.buy_price = item.buy_price
        obj.vip_price = item.vip_price
        obj.inventory = item.inventory
        obj.goods_stock = item.goods_stock
        obj.is_show = item.is_show ? item.is_show : 1
        obj.decrease_price = item.decrease_price ? item.decrease_price : ''
        obj.status = item.status ? item.status :''
        if (goodsInfo.length == 0) {
          console.log(222, idx)
          this.form.goods_info.push(obj) //官网价
          this.dialogTableVisible = false
        } else {
          console.log(243)
          var isArr = []
          goodsInfo.map((json) => {
            isArr.push(json.sku_id)
          })
          if (isInArray(item.sku_id, isArr)) {
            this.$message({
              type: 'info',
              message: '不能选择相同产品'
            })
          } else {
            this.form.goods_info.push(obj) //官网价
            this.dialogTableVisible = false
          }
        }
      },
      getTabAllGoods(page) {
        let _this = this
        let data = {
          page: page,
          channel_id: this.radioChannel,
          video_no_channel_id: 'no_xingyun'
        }
        if (this.searchVal) {
          data['goods_name'] = this.searchVal
        }

        getTabAllGoods(data).then((res) => {
          if (res.data.code == 200) {
            _this.list = res.data.data
            _this.total = res.data.count
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      // 删除
      delItem(item, dataList, idx) {
        dataList.splice(idx, 1)

      },
      getChannelList() {
        getChannelList().then((res) => {
          if (res.data.code == 200) {
            this.channelList = res.data.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      closeDialog() {
        this.showDialog = false
        this.$refs['videoReview'].pause()
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
      handleAvatarSuccess(res, file) {
        console.log(res, file, 'touxian')
        if (res.code === 200) {
          this.form.act_cover = res.url
        } else {
          this.form.act_cover = ''
          this.imgFileList = []
        }
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
              this.form.video_url = item.data.data.PlayURL
              this.form.video_cover = item.data.data.CoverURL
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
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handleRemoveImg() {
        this.form.act_cover = ''
        this.imgFileList = []
      },
      handlePreview(file) {
        console.log(file)
        this.showDialog = true
      },

      onSubmit(formName) {
        let url = ''
        if (this.$route.query.id) {
          url = updateLiveSellWell
        } else {
          url = addLiveSellWell
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            url(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success('操作成功')
                this.loading = false
                if (!this.$route.query.id) {
                  this.$router.push({ path: '/operate/live-hot-goods' })
                } else {
                  this.getLiveSellWell()
                }
              } else {
                this.$message.error(res.data.msg)
                this.loading = false
              }
            }).catch(res => {
              this.loading = false
            })
          } else {
            return false
          }
        })

      }
    }
  }
</script>

<style scoped lang="scss">
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

	/*/deep/ .el-input__inner {*/
	/*	width: 400px*/
	/*}*/

	.commodity-items {

		li {
			list-style: none;
			border: 1px solid #ccc;
			padding: 10px;
			border-radius: 8px;
			font-size: 12px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			.el-input {
				width: inherit;
			}

			.el-button {
				height: 40px;
			}

		}
	}

	.el-form {
		padding: 20px;
		width: 615px;
	}

	.price-box {
		border: 1px solid #ccc;
		padding: 20px;
		border-radius: 20px;
		margin: 20px 0;
		display: flex;
		width: 1000px;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		.el-input {
			margin-right: 20px;

			.el-input__inner {
				width: 100px;
			}
		}
	}

</style>
