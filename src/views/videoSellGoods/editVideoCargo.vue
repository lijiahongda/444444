<template>
	<div style="padding: 20px;">
		<el-form ref="videoForm" :rules="rules" :model="form" label-width="80px">
			<el-form-item label="所属直播" prop="mid">
				<el-select v-model="form.mid" filterable placeholder="请选择" @change="getNickname" clearable>
					<el-option
						v-for="item in owner"
						:key="item.mid"
						:label="item.nickname"
						:value="item.mid">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="视频分类" prop="video_category">
				<el-select v-model="form.video_category" filterable placeholder="请选择" @change="getCategory" clearable>
					<el-option
						v-for="item in options"
						:key="item.cate_id"
						:label="item.cate_name"
						:value="item.cate_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="视频排序" prop="video_sort">
				<el-input v-model="form.video_sort" placeholder="请输入视频排序"></el-input>
			</el-form-item>
			<el-form-item label="运费" prop="goods_freight">
				<el-input v-model="form.goods_freight" placeholder="请输入视频运费"></el-input>
			</el-form-item>
			<el-form-item label="是否导购" prop="is_guide">
				<el-radio-group v-model="form.is_guide">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="视频标题" prop="video_title">
				<el-input
					type="textarea"
					style="width: 400px;resize:none;"
					placeholder="请输入视频标题"
					v-model="form.video_title"
					maxlength="45"
					show-word-limit
					:rows="3"
				>
				</el-input>
			</el-form-item>
			<el-form-item label="视频封面" prop="video_title_page">
				<el-upload
					class="avatar-uploader"
					action="https://api2.yuelvhui.com/app/third/upload"
					list-type="picture-card"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					:limit="1"
					:file-list="imgFileList"
				>
					<i class="el-icon-plus avatar-uploader-icon"></i>
					<div slot="tip" class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
				</el-upload>
				<!--				<el-dialog :visible.sync="dialogVisible">-->
				<!--					<img width="100%" :src="form.video_url" alt="">-->
				<!--				</el-dialog>-->
			</el-form-item>
			<el-form-item label="视频文件" prop="video_url">

				<el-row>
					<el-col :span="10">
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
							list-type="picture"
							:file-list="videoFileList"
						>
							<div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
							<el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
						<el-dialog
							title="预览视频"
							:visible.sync="showDialog"
							width="30%"
							:before-close="closeDialog"
						>
							<div style="padding: 20px;height: 450px;">
								<video style="width: 100%;" :src="form.video_url" controls ref="videoReview">
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

			<el-form-item label="关联商品">
				<el-input style="width: 280px" v-model="searchVal" placeholder="请输入商品名称"></el-input>
				<el-button @click="getTabGoods" type="primary">搜索</el-button>
			</el-form-item>

			<el-form-item label="商品预览" prop="goods_name">
				<div class="show-product-box" v-if="showProduct.goods_name">
					<el-image
						style="width: 100px; height: 100px;border:1px solid #ccc;"
						:src="showProduct.goods_path"
						fit="fit">
					</el-image>
					<div style="margin: 0 20px">
						<h6>{{showProduct.goods_name}}</h6>
						<div v-if="showProduct.vip_price">VIP价格：¥{{showProduct.vip_price}}</div>
						<div v-if="showProduct.origin_price">原价：¥{{showProduct.origin_price}}</div>
						视频价格：<el-input v-model="showProduct.video_price" placeholder="请输入视频价格"></el-input>
					</div>
				</div>
				<div style="width: 100px; height: 100px;border: 1px solid #ccc;" v-else>
					<el-image
						fit="cover"
						src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-01-07/19/yuelvhuit0zuOHT3FU1578396318.png"
					>
					</el-image>
				</div>
			</el-form-item>
		</el-form>
		<el-drawer
			title="商品列表"
			v-loading="drawerLoading"
			:visible.sync="openDrawer"
			direction="rtl"
			size="50%"
		>
			<div style="height: 55%;overflow-y: scroll;">
				<div v-for="(item,index) in productList" :key="index" class="product-item">
					<div>
						<el-image
							style="width: 100px; height: 100px"
							:src="item.path"
							fit="fit">
						</el-image>
					</div>
					<div>
						<h6>{{item.goods_name}}</h6>
						<div>
							<span>官网价:{{item.origin_price}}</span>
							<!--<span>vip价格:{{item.vip_price}}</span>-->
							<span>库存:{{item.inventory}}</span>
						</div>
					</div>
					<el-button @click="selectProduct(item)" type="primary">选择</el-button>
				</div>

			</div>
			<el-pagination
				style="margin-top: 10px"
				background
				:page-size="pageSize"
				:current-page="page"
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total="total">
			</el-pagination>
		</el-drawer>
		<div style="display: flex; justify-content: center;">
			<el-button type="primary" @click="submit('videoForm')">保存</el-button>
		</div>
	</div>

</template>

<script>
  import { getVideoCategory, getVideoTakeGoods, addVideoTakeGoods, updVideoTakeGoods } from '../../api/order'
  import { tabGoods } from '@/api/shops'
  import { Loading } from 'element-ui'

  export default {
    name: 'editVideoCargo',
    data() {
      return {
        pageType: '',
        timeOut: '',//定时器
        drawerLoading: false,
        openDrawer: false,
        searchVal: '',
        videoFileList: [],
        imgFileList: [],
        options: [],
        rules: {
          goods_freight: [
            { required: true, message: '请输入运费', trigger: 'blur' }
          ],
          mid: [
            { required: true, message: '请选择所属直播', trigger: 'blur' }
          ],
          video_category: [
            { required: true, message: '请选择商品分类', trigger: 'blur' }
          ],
          video_title_page: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          video_title: [
            { required: true, message: '请输入视频标题', trigger: 'blur' }
          ],
          video_url: [
            { required: true, message: '请上传视频', trigger: 'blur' }
          ],
          goods_name: [
            { required: true, message: '请关联商品', trigger: 'blur' }
          ],
          is_guide: [
            { required: true, message: '请选择是否导购', trigger: 'blur' }
          ],
          video_sort: [
            { required: true, message: '请输入视频排序', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        form: {
          mid: '',
          goods_id: '',//视频分类ID
          goods_skuid: '',//商品skuid
          goods_name: '',//商品名称
          goods_path: '',//图片路径
          video_id: '', //视频id
          video_url: '',//视频地址
          video_category: '',//视频分类ID
          video_title: '',//视频简介title
          video_title_page: ''//视频封面图
        },
        productList: [], //商品列表
        page: 1,
        pageSize: 10,
        total: 0,
        showProduct: {},
        videoLoading: '', //视频上传loading
        showDialog: false,
		owner:[]
      }
    },
    created() {
      this.getVideoCategory();
      this.getOwn();
      if (this.$route.query.type === 'add') {
        this.pageType = 'add'
      } else {
        this.pageType = 'edit'
        this.getVideoTakeGoods(this.$route.query.id)
        this.id = this.$route.query.id
      }
    },
    methods: {
      closeDialog() {
        this.showDialog = false
        this.$refs['videoReview'].pause()
      },
      getOwn() {
        let url = `https://open.yuelvhui.com/open/dynamicSuper/getOperateList`
        this.axios({
          method: 'post',
          url: url,
          responseType: 'json'
        }).then(res => {
          if (res.data.code == 200) {
			this.owner = res.data.data;
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getCategory(value) {
        let obj = {}
        obj = this.options.find((item) => {//这里的userList就是上面遍历的数据源
          return item.cate_id === value//筛选出匹配数据
        })
        this.form.video_category = obj.cate_id
        this.form.video_category_name = obj.cate_name
      },
      getNickname(value) {
        let obj = {}
        obj = this.owner.find((item) => {//这里的userList就是上面遍历的数据源
          return item.mid === value//筛选出匹配数据
        })
        this.form.nickname = obj.nickname;
        this.form.litpic = obj.litpic
      },
      submit(formName) {
        console.log(this.showProduct.video_price,11)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              goods_id: this.form.goods_id,//商品id
              goods_skuid: this.showProduct.sku_id,//商品skuid
              goods_name: this.showProduct.goods_name,//商品名称
              video_price: this.showProduct.video_price,
              goods_path: this.form.goods_path,//图片路径
              mid: this.form.mid,
              video_sort: this.form.video_sort,
              goods_freight: this.form.goods_freight,
              is_guide: this.form.is_guide,
              litpic: this.form.litpic,
              nickname: this.form.nickname,
              video_id: this.form.video_id, //视频id
              video_url: this.form.video_url,//视频地址
              video_category: this.form.video_category,//视频分类ID
              video_category_name: this.form.video_category_name,//视频分类ID
              video_title: this.form.video_title,//视频简介title
              video_title_page: this.form.video_title_page//视频封面图
            }
            if (this.pageType === 'add') {
              console.log('添加接口')
              addVideoTakeGoods(data).then((res) => {
                if (res.data.code == 200) {
                  this.$message.success('添加成功')
                  this.$router.push({ path: '/video-sellGoods/list' })
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            } else {
              console.log('编辑接口')
			  let params = {
                id: this.id,
				...this.form
			  }
              params.video_price = this.showProduct.video_price;
              // data.id = this.id;
              // data.nickname = this.form.nickname;
              // data.dynamic_id = this.form.dynamic_id;
              updVideoTakeGoods(params).then((res) => {
                if (res.data.code == 200) {
                  this.$message.success('编辑成功')
                  this.$router.push({ path: '/video-sellGoods/list' })
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      selectProduct(item) {
        this.showProduct = item
        this.showProduct.goods_path = item.path
        this.form.goods_name = item.goods_name
        this.form.goods_path = item.path
        this.form.goods_id = item.id
        this.form.goods_skuid = item.sku_id
        this.openDrawer = false
      },
      handleCurrentChange(val) {
        this.page = val
        this.getTabGoods()
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
          this.form.video_title_page = res.url
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
              this.form.video_id = item.data.data.VideoId
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
      handlePreview(file) {
        console.log(file)
        this.showDialog = true
      },

      getVideoCategory() {
        let url = 'https://open.yuelvhui.com/open/video/getTagList'
        this.axios({
          method: 'post',
          url: url
        }).then((res) => {
          if (res.data.code == 200) {
            this.options = res.data.data
          } else {
            this.$message.error('获取分类状态失败')
          }

        })
        // getVideoCategory().then((res) => {
        // 	if (res.data.code == 200) {
        // 		this.options = res.data.data
        // 	} else {
        // 		this.$message.error('获取分类状态失败')
        // 	}
        // })
      },
      getVideoTakeGoods(id) {
        let data = { id }
        getVideoTakeGoods(data).then((res) => {
          if (res.data.code == 200) {
            let data = res.data.data
            this.form = res.data.data;
			// {
            //   id: data.id,
            //   goods_id: data.goods_id,//视频分类ID
            //   goods_skuid: data.product_skuid,//商品skuid
            //   goods_name: data.goods_name,//商品名称
            //   goods_path: data.video_title_page,//图片路径
            //   video_id: data.video_id, //视频id
            //   video_url: data.video_url,//视频地址
            //   mid: Number(data.mid),
            //   nickname: data.nickname,
            //   video_category_name: data.video_category_name,
            //   dynamic_id: data.dynamic_id,//视频地址
            //   video_category: Number(data.video_category),//视频分类ID
            //   video_title: data.video_title,//视频简介title
            //   video_title_page: data.video_title_page//视频封面图
            // }
            if(data.video_category) this.form.video_category= Number(data.video_category);//视频分类ID
            if(data.mid) this.form.mid= Number(data.mid);
            this.videoFileList.push({
              name: data.video_title,
              url: data.video_title_page
            })
            this.imgFileList.push({
              name: data.video_id,
              url: data.video_title_page
            })
            this.showProduct = {
              goods_name: data.goods_name,
              origin_price: data.origin_price,
              vip_price: data.vip_price,
              video_price: data.video_price,
              goods_path: data.goods_path
            }
            console.log(res.data)
          } else {
            this.$message.error('获取数据失败')
          }
        })
      },
      getTabGoods() {
        let _this = this
        _this.openDrawer = true
        _this.drawerLoading = true
        let data = {
          page: _this.page,
          pageSize: this.pageSize,
          video_no_channel_id: 'no_xingyun'// 频道id 暂时不展示行云商品
        }
        if (this.searchVal) {
          data['goods_name'] = this.searchVal
        }

        tabGoods(data).then((res) => {
          if (res.data.code == 200) {
            _this.productList = res.data.data
            this.total = res.data.count
            _this.drawerLoading = false
          } else {
            this.$message.error('数据加载失败')
            _this.drawerLoading = false
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }

  }
</script>

<style scoped>
	.product-item {
		padding: 20px;
		display: flex;
		align-content: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
	}

	.el-input--medium .el-input__inner {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px
	}

	.show-product-box {
		display: flex;
		align-items: center;
	}

	.el-upload__tip {
		color: #ccc;
		font-size: 14px;
	}

</style>
