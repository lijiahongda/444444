<template>
  <div class="app-container"
       v-loading="loading">
    <el-button type='primary'
               @click="dialogTableVisible = true">添加商品</el-button>
    <el-form label-width="160px"
             :model="form"
             :rules="rules"
             ref="form">
      <el-form-item label="直播用户ID"
                    prop="live_people_id">
        <el-input size="mini"
                  v-model="form.live_people_id"
                  placeholder="请输入直播用户ID"></el-input>
      </el-form-item>
      <el-form-item label="直播标题"
                    prop="act_name">
        <el-input size="mini"
                  v-model="form.act_name"
                  placeholder="请输入活动标题"
                  maxlength="20"
                  show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="直播简介"
                    prop="act_desc">
        <el-input size="mini"
                  v-model="form.act_desc"
                  placeholder="请输入活动简介"
                  maxlength="20"
                  show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="虚拟人数">
        <el-input size="mini"
                  v-model="form.dummy_number"
                  placeholder="请输入直播虚拟人数"></el-input>
      </el-form-item>
      <el-form-item label="活动分类"
                    prop="act_type">
        <el-radio v-model="form.act_type"
                  :label="3">直播</el-radio>
        <el-radio v-model="form.act_type"
                  :label="6">直播回放</el-radio>
      </el-form-item>
      <el-form-item label="直播属性"
                    prop="live_type">
        <el-radio v-model="form.live_type"
                  :label="1">专属</el-radio>
        <el-radio v-model="form.live_type"
                  :label="2">公共</el-radio>
      </el-form-item>
      <el-form-item label="上线状态"
                    prop="is_online">
        <el-radio v-model="form.is_online"
                  :label="1">是</el-radio>
        <el-radio v-model="form.is_online"
                  :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="活动开始时间"
                    prop="act_starttime">
        <el-date-picker v-model="form.act_starttime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择活动开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间"
                    prop="act_endtime">
        <el-date-picker v-model="form.act_endtime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择活动结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详情图（可多图）"
                    prop="act_imgs">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   list-type="picture-card"
                   :on-success="handleAvatarSuccess_imgs"
                   :on-remove="handleRemoveImg_imgs"
                   :before-upload="beforeAvatarUpload"
                   :on-exceed="handleExceed_imgs"
                   :limit="3"
                   :file-list="imgFileList_imgs">
          <div></div>
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip"
               class="el-upload__tip">建议尺寸750*560px或4:3,JPG、PNG格式图片小于5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="视频封面(分享图)"
                    prop="video_cover">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   list-type="picture-card"
                   :on-success="handleAvatarSuccess"
                   :on-remove="handleRemoveImg"
                   :before-upload="beforeAvatarUpload"
                   :on-exceed="handleExceed"
                   :limit="1">
          <img v-if="imgFileList"
               height="150"
               :src="imgFileList"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip"
               class="el-upload__tip">建议尺寸100*100px或1:1,JPG、PNG格式图片小于5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接类型">
        <el-radio v-model="form.link_type"
                  :label="1">视频链接</el-radio>
        <el-radio v-model="form.link_type"
                  :label="2">H5链接</el-radio>
      </el-form-item>
      <el-form-item label="H5链接"
                    v-if="form.link_type == 2">
        <el-input size="mini"
                  v-model="form.link_url"
                  placeholder="请输入H5链接"
                  clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="视频文件"
                    prop="video_url"
                    v-if="form.link_type == 1">

        <el-row>
          <el-col :span="10">
            <el-upload class="upload-demo"
                       action="https://open.yuelvhui.com/open/UploadAlibabaCloudVideo"
                       ref="upVideo"
                       :on-remove="handleRemove"
                       :before-upload="beforeUpload"
                       :on-success="handleVideoSuccess"
                       :on-exceed="handleExceed"
                       :on-preview="handlePreview"
                       :limit="1"
                       list-type="picture"
                       :file-list="videoFileList">
              <div slot="tip"
                   class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
              <el-button size="small"
                         type="primary">选择文件</el-button>
            </el-upload>
            <el-dialog title="预览视频"
                       :visible.sync="showDialog"
                       width="30%"
                       :before-close="closeDialog">
              <div style="padding: 20px;height: 450px;">
                <video style="width: 100%;height: 400px"
                       :src="form.video_url"
                       controls
                       ref="videoReview">
                  您的浏览器不支持视频,请升级浏览器,或更换浏览器重试
                </video>
              </div>
              <span slot="footer"
                    class="dialog-footer">
                <el-button type="primary"
                           @click="closeDialog">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item label="直播排序"
                    prop="live_sort">
        <el-input size="mini"
                  oninput="value=value.replace(/[^\d\.]/g,'')"
                  v-model="form.live_sort"
                  type="text"
                  placeholder="排序越大越靠前"></el-input>
      </el-form-item>
      <el-form-item label="分享标题"
                    prop="share_title">
        <el-input size="mini"
                  v-model="form.share_title"
                  placeholder="请输入分享标题"
                  maxlength="20"
                  show-word-limit>
        </el-input>
      </el-form-item>
      <el-form-item label="分享简介"
                    prop="share_desc">
        <el-input size="mini"
                  v-model="form.share_desc"
                  placeholder="请输入分享简介"
                  maxlength="20"
                  show-word-limit>
        </el-input>
      </el-form-item>

      <div v-if="form.goodsInfo.length !=0"
           class="commodity-items"
           style="clear:both;">
        <ul>
          <li v-for="(item,index) in form.goodsInfo"
              :key="index">
            <div>
              <el-radio-group v-model="item.is_status"
                              style="margin-left: 20px;">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
              </el-radio-group>
              <p>商品排序：
                <el-input size="mini"
                          oninput="value=value.replace(/[^\d\.]/g,'')"
                          v-model="item.sort"
                          type="text"
                          placeholder="排序越大越靠前"></el-input>
              </p>
              <p>
                <img :src="item.goods_img"
                     alt=""
                     style="width:100px;">
              </p>
              <p>商品名称： <span v-text="item.goods_name"></span></p>

              <div class="price-box"
                   v-for="(item2,index2) in item.skuInfo"
                   :key="index2">
                <p>
                  <span>进货价：</span>
                  <el-input size="mini"
                            style="width:80px"
                            oninput="value=value.replace(/[^\d\.]/g,'')"
                            v-model="item2.buy_price"
                            disabled
                            type="text"
                            placeholder="价格"></el-input>
                </p>
                <p>
                  <span>会员价：</span>
                  <el-input size="mini"
                            style="width:80px"
                            oninput="value=value.replace(/[^\d\.]/g,'')"
                            v-model="item2.vipPrice"
                            disabled
                            type="text"
                            placeholder="价格"></el-input>
                </p>
                <p>
                  <span>官网价：</span>
                  <el-input size="mini"
                            style="width:80px"
                            oninput="value=value.replace(/[^\d\.]/g,'')"
                            v-model="item2.price"
                            disabled
                            type="text"
                            placeholder="价格"></el-input>
                </p>
                <p>
                  <span>直播价：</span>
                  <el-input size="mini"
                            style="width:80px"
                            oninput="value=value.replace(/[^\d\.]/g,'')"
                            v-model="item2.sk_price"
                            :disabled="item.status===2"
                            @input="setPriceDis(item)"
                            type="text"
                            placeholder="价格"></el-input>
                </p>
                <p>
                  <span>直播库存：</span>
                  <el-input size="mini"
                            style="width:80px"
                            oninput="value=value.replace(/[^\d\.]/g,'')"
                            v-model="item2.goods_stock"
                            type="text"
                            placeholder="价格"></el-input>
                </p>
                <p>
                  <span style="color: green;"> (官网库存：{{item2.inventory}})</span>
                </p>
                <p style="margin-left: 20px;">
                  <el-date-picker v-model="item.start_time"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="请选择开始时间">
                  </el-date-picker>
                  <el-date-picker v-model="item.end_time"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  placeholder="请选择结束时间">
                  </el-date-picker>
                </p>
              </div>

            </div>
            <div>
              <!-- <el-button v-if="$route.query.id" type="success" plain @click='onSubmit("form")'>保存</el-button> -->
              <el-button type="danger"
                         plain
                         @click='delItem($route.query.id,item.goods_id,item.isdel)'>删除
              </el-button>
            </div>
            <div>

            </div>
          </li>
        </ul>
      </div>

      <el-dialog width="800px"
                 title="选择商品"
                 :visible.sync="dialogTableVisible">
        <el-form :inline="true"
                 class="demo-form-inline">
          <el-form-item label="选择商品">
            <el-input v-model="searchVal"
                      placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="getSkuTabGoodsLive(1)"
                       type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="commodity">
          <ul>
            <li @click="choseId(item)"
                v-for="(item,index) in list"
                :key="index">
              <div class="imgDiv">
                <img :src="item.goods_img"
                     alt="">
              </div>
              <div class="section-p">
                <p v-text="item.goods_name"></p>
              </div>
              <div class="select-btn">
                <el-button plain>选取</el-button>
              </div>
            </li>
          </ul>
        </div>
        <el-pagination small
                       :current-page.sync="currentPage"
                       @current-change="handleCurrentChange"
                       layout="prev, pager, next"
                       :total="total">
        </el-pagination>

      </el-dialog>

      <el-button type="primary"
                 @click="onSubmit('form')">保存数据</el-button>
      <router-link :to="{path:'/tools/liveBroadcastActivity'}">
        <el-button type='primary'>返回列表</el-button>
      </router-link>
    </el-form>
  </div>
</template>

<script>
import {
  getLiveDetail,
  getSkuTabGoodsLive,
  modifyLive,
  updateLive,
  deleteLiveGoods
} from '@/api/shops' // 接口


const isInArray = (single, arr) => {
  return (arr.findIndex(res => {
    return res === single
  })) >= 0
}
export default {
  name: 'liveVideoAdd',
  data () {
    return {
      form: {
        goodsInfo: []
      },
      loading: false,
      total: 0,
      currentPage: 1,
      radioChannel: '',
      channelList: [],
      list: [],
      disableds: false,
      dialogTableVisible: false,
      searchVal: '',
      showDialog: false,
      videoFileList: [],
      imgFileList: '',
      imgFileList_imgs: [],
      rules: {
        live_people_id: [{
          required: true,
          message: '请输入直播用户ID',
          trigger: 'blur'
        }],
        act_name: [{
          required: true,
          message: '请输入活动标题',
          trigger: 'blur'
        }],
        act_desc: [{
          required: true,
          message: '请输入活动简介',
          trigger: 'blur'
        }],
        live_sort: [{
          required: true,
          message: '请输入活动简介',
          trigger: 'blur'
        }],
        act_type: [{
          required: true,
          message: '请选择活动分类',
          trigger: 'change'
        }],
        live_type: [{
          required: true,
          message: '请选择活动分类',
          trigger: 'change'
        }],
        is_online: [{
          required: true,
          message: '请选择上线状态',
          trigger: 'change'
        }],
        act_starttime: [{
          required: true,
          message: '请选择活动开始时间',
          trigger: 'change'
        }],
        act_endtime: [{
          required: true,
          message: '请选择活动结束时间',
          trigger: 'change'
        }],
        // act_imgs: [{
        // 	required: true,
        // 	message: '请选择详情图片',
        // 	trigger: 'blur'
        // }],
        share_title: [{
          required: true,
          message: '请输入分享标题',
          trigger: 'blur'
        }],
        share_desc: [{
          required: true,
          message: '请输入分享简介',
          trigger: 'blur'
        }],
        video_cover: [{
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        }],
        // video_url: [
        // 	{ required: true, message: '请上传视频', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
    this.getSkuTabGoodsLive(1)
    if (this.$route.query.id) {
      this.getLiveDetail()
      this.disableds = true
    } else {
      this.loading = false
    }

  },
  methods: {
    setPriceDis (item) {
      if (!item.sk_price && !item.decrease_price) {
        item.status = ""
      } else if (item.sk_price) {
        item.status = 1
        item.decrease_price = ""
      } else if (item.decrease_price) {
        item.status = 2
        item.sk_price = ""
      }

    },
    getLiveDetail () {
      this.loading = true
      getLiveDetail({
        id: this.$route.query.id
      }).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data
          console.log(this.form)
          this.videoFileList = []
          this.videoFileList.push({
            name: '视频文件',
            url: res.data.data.video_cover
          })
          this.imgFileList = res.data.data.video_cover
          if (res.data.data.act_imgs) {

            res.data.data.act_imgs.map(item => {
              this.imgFileList_imgs.push({
                url: item
              })
            })
          }
          // console.log(this.imgFileList_imgs, res.data.data.act_imgs)
          this.loading = false
          // this.$message.success('操作成功')
        } else {
          this.$message.error(res.data.msg)
          this.loading = false
        }
      })
    },
    radioChange: function (val) {
      this.currentPage = 1
      this.radioChannel = val
      this.list = []
      this.getSkuTabGoodsLive(1)
    },
    handleCurrentChange (val) {
      this.getSkuTabGoodsLive(val)
    },
    // 删除
    delItem (actId, productId, isdel) {
      this.$confirm('此操作将直接删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(isdel)
        if (isdel != 0) {
          deleteLiveGoods({
            actId: actId,
            productId: productId
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getLiveDetail()
            }
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getLiveDetail()
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        this.getLiveDetail()
      });
    },
    // 选择商品
    choseId (item) {
      var goodsInfo = this.form.goodsInfo
      console.log(item);

      if (this.$route.query.id) {
        var goods = {
          isdel: 0,
          act_id: this.$route.query.id,
          goods_id: item.gid,
          is_status: 0,
          sort: 0,
          goods_img: item.goods_img,
          goods_name: item.goods_name,
          skuInfo: item.skuInfo
        }
      } else {
        var goods = {
          // productId: item.gid,
          // is_online: 0,
          // live_sort: 0,
          // goodsImg: item.goods_img,
          // goodsName: item.goods_name,
          // skuInfo: item.skuInfo
          goods_id: item.gid,
          is_status: 0,
          sort: 0,
          goods_img: item.goods_img,
          goods_name: item.goods_name,
          skuInfo: item.skuInfo
        }
      }
      if (goodsInfo.length == 0) {
        this.form.goodsInfo.push(goods)
        this.dialogTableVisible = false
      } else {
        console.log(243)
        var isArr = []
        goodsInfo.map((json) => {
          isArr.push(json.productId)
        })
        if (isInArray(item.gid, isArr)) {
          this.$message({
            type: 'info',
            message: '不能选择相同产品'
          })
        } else {
          this.form.goodsInfo.push(goods) //
          this.dialogTableVisible = false
        }
      }
    },
    getSkuTabGoodsLive (page) {
      let _this = this
      let data = {
        page: page,
        channel_id: this.radioChannel,
        video_no_channel_id: 'no_lvyue'
      }
      if (this.searchVal) {
        data['goods_name'] = this.searchVal
      }

      getSkuTabGoodsLive(data).then((res) => {
        if (res.data.code == 200) {
          _this.list = res.data.data
          console.log(_this.list)
          _this.total = res.data.count
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    closeDialog () {
      this.showDialog = false
      this.$refs['videoReview'].pause()
    },
    handleExceed (files, fileList) {
      this.$message.warning(`最多上传1个文件`)
    },
    handleExceed_imgs (files, fileList) {
      this.$message.warning(`最多上传3个文件`)
    },
    beforeUpload (file) {
      const isVideo = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb',
        'video/mov'
      ].indexOf(file.type) == -1
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
    beforeAvatarUpload (file) {
      this.loading = true
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      if (!isImg) {
        this.$message.error('检查图片格式是否正确!')
      }
      this.loading = false
      return isImg && isLt5M
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file, 'touxian')
      this.loading = false
      if (res.code === 200) {
        this.form.video_cover = res.url
        console.log(this.form.video_cover)
      } else {
        this.form.video_cover = ''
        this.imgFileList = []
      }
    },
    handleAvatarSuccess_imgs (res, file, fileList) {
      console.log(fileList, '----')
      let _this = this
      if (res.code === 200) {
        // this.form.act_imgs = res.url
        fileList.map(item => {
          if (item.response) {
            _this.imgFileList_imgs.push({
              url: item.response.url
            })
          }

        })
        setTimeout(function () {
          _this.loading = false
          _this.form.act_imgs = []
          _this.imgFileList_imgs.map(item => {
            _this.form.act_imgs.push(item.url)
          })
        }, 1000)

      }
    },
    handleVideoSuccess (res, file) {
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
            // console.log(this.form.video_cover, '----000')
            this.form.video_coverImg = item.data.data.CoverURL
            this.videoFileList = [{
              name: file.name,
              url: this.form.video_coverImg
            }]
          }

        })
      } else {
        this.videoLoading.close()
        this.$message.error('视频上传失败,请删除重试!')
        this.$refs.upVideo.clearFiles() //上传失败 清除文件列表
      }

    },
    handleRemove (file, fileList) {
      this.videoFileList = []
      console.log(file, fileList)
    },
    handleRemoveImg () {
      this.form.video_cover = ''
      this.imgFileList = []
    },
    handleRemoveImg_imgs () {
      this.form.act_imgs = ''
      this.imgFileList_imgs = []
    },
    handlePreview (file) {
      console.log(file)
      this.showDialog = true
    },

    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            this.form.id = this.$route.query.id;
            this.form.goodsInfo.map((item, index) => {
              if (item.start_time === null) {
                item.start_time = ''
              }
              if (item.end_time === null) {
                item.end_time = ''
              }
            })

            // console.log(this.form)
            updateLive(this.form).then(res => {
              if (res.data.code == 200) {
                this.loading = false
                this.$message.success('操作成功')
                // this.getLiveDetail()

                // this.$router.push('/tools/liveBroadcastActivity')
              } else {
                this.$message.error(res.data.msg)
                this.loading = false
              }
            })
          } else {
            modifyLive(this.form).then(res => {
              if (res.data.code == 200) {
                this.loading = false
                this.$message.success('操作成功')
                this.$router.push('/tools/liveBroadcastActivity')
                // this.getLiveDetail()
              } else {
                this.$message.error(res.data.msg)
                this.loading = false
              }
            })
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });



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

  // width: 615px;
  .el-input {
    width: 500px;
  }
}

.price-box {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  margin: 20px 0;
  display: flex;
  width: 90%;
  flex-wrap: wrap;

  .el-input {
    margin-right: 20px;

    .el-input__inner {
      width: 100px;
    }
  }
}
</style>
