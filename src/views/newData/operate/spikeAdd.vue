<template>
  <div class="gropAdd">
    <el-dialog width="800px"
               title="选择商品"
               :visible.sync="dialogTableVisible">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="渠道"
                      class="background_color"
                      v-if="!editId">
          <el-radio-group v-model="form.channel_id"
                          @change="radioChange">
            <el-radio v-model="form.channel_id"
                      v-for="item in channelList"
                      :key="item.id"
                      :label="item.id">
              {{item.channel_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择商品">
          <el-input v-model="searchVal"
                    placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getTabGoods(1)"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)"
              v-for="(item,index) in list"
              :key="index">
            <div class="imgDiv">
              <img :src="item.path"
                   alt="">
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
      <el-pagination small
                     :current-page.sync="currentPage"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>

    </el-dialog>
    <el-dialog width="800px"
               title="选择商品"
               :visible.sync="dialogtbVisible">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal"
                    placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getActivities(1)"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="activeId(item)"
              v-for="(item,index) in activelist"
              :key="index">
            <div class="section-p">
              <p v-text="item.goods_name"></p>
              <div>
                <span>活动id：{{item.id}}</span>
                <span>活动名称：{{item.activity_name}}</span>
              </div>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination small
                     :current-page.sync="currentPage"
                     @current-change="handleActiveChange"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>

    </el-dialog>
    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="分享标题"
                    prop="share_title">
        <el-input v-model="form.share_title"
                  placeholder="请输入分享标题"></el-input>
      </el-form-item>
      <el-form-item label="分享封面"
                    prop="share_img">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.share_img"
               :src="form.share_img"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>尺寸:421*375,100kb以内</p>
      </el-form-item>
      <el-form-item label="活动类型"
                    prop="share_title">
        <el-radio v-model='form.act_type'
                  :label="0"
                  :disabled="disableds">秒杀</el-radio>
        <el-radio v-model='form.act_type'
                  :label="1"
                  :disabled="disableds">限时半价</el-radio>
        <el-radio v-model='form.act_type'
                  :label="5"
                  :disabled="disableds">今日爆款</el-radio>
        <el-radio v-model='form.act_type'
                  :label="7"
                  :disabled="disableds">社群团购</el-radio>
      </el-form-item>
      <el-form-item label="首页标题"
                    prop="share_title"
                    v-if="form.act_type == 0">
        <el-input v-model="form.act_name"
                  placeholder="请输入首页标题"></el-input>
      </el-form-item>
      <el-form-item label="首页推荐图片"
                    prop="share_img">
        <el-upload list-type="picture-card"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :limit="2"
                   :auto-upload="true"
                   :on-exceed="handleOnExceed"
                   :file-list="fileList"
                   :on-success="handleAvatarSuccess1"
                   :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>
        <span>尺寸:150*150,100kb以内</span>
      </el-form-item>

       <el-form-item v-if="form.act_type==7" label="社群团建海报图"
                    prop="share_img">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess3"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.community_poster_img"
               :src="form.community_poster_img"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:750*1355,100kb以内</span>
      </el-form-item>



      <!-- <el-form-item v-if="form.act_type==7" label="社群团建海报图"
                    prop="share_img">
        <el-upload list-type="picture-card"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :auto-upload="false"
                   :on-exceed="handleOnExceed"
                   :on-success="handleAvatarSuccess3"
                   :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl3"
               alt="">
        </el-dialog>
        <span>尺寸:150*150,100kb以内</span>
      </el-form-item> -->
      <el-form-item label="有效时间"
                    prop="timeArray">
        <el-date-picker v-model="timeArray"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:00:00"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择状态"
                    prop="">
        <el-radio v-model='form.is_online'
                  :label="0">下线</el-radio>
        <el-radio v-model='form.is_online'
                  :label="1">上线</el-radio>
      </el-form-item>
      <el-form-item label="活动专题图"
                    prop="share_img"
                    v-if="form.act_type == 1">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :file-list="fileList"
                   :on-success="handleAvatarSuccess2"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.act_special_imgs"
               :src="form.act_special_imgs"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:421*375,100kb以内</span>
      </el-form-item>
      <el-form-item label="选择活动"
                    v-if="(form.act_type==5)"
                    prop="active_id">
        <div style="float:left">
          <el-button type="primary"
                     @click="dialogtbVisible = true"
                     plain>点击选择</el-button>
        </div>
        <div class="commodity"
             v-if="form.ac_id != 0"
             style="clear:both;">
          <ul>
            <li style="border:none">
              <div class="section-p"
                   style="width:720px;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
                <div>
                  <span>活动名称: {{form.activity_name}}</span>
                  <span>活动id: {{form.ac_id}}</span>
                </div>
              </div>
              <!-- <div class="del_item">
                <el-button type="danger"
                           plain
                           @click='delItem(item,form.actives_info,index)'>删除
                </el-button>
              </div> -->
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="选择商品"
                    prop="goods_id">
        <div style="float:left">
          <el-button type="primary"
                     @click="dialogTableVisible = true"
                     plain>点击选择</el-button>
        </div>

        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :on-success="uploadSuccessAll3"
                   style="float:left">
          <el-button type="primary"
                     plain>上传商品</el-button>
        </el-upload>

        <div v-if="form.goods_info.length !=0"
             class="commodity"
             style="clear:both;">
          <ul>
            <li style="border:none"
                v-for="(item,index) in form.goods_info"
                :key="index">

              <el-upload class="avatar-uploader" style="float:left;margin-right:10px"
                         action="https://api2.yuelvhui.com/app/third/upload"
                         :show-file-list="false"
                         :on-success="(response, file, fileList)=>handleAvatarSuccessGoods(response, file, fileList,index)"
                         :before-upload="beforeAvatarUpload2">
                <!-- <img v-if="form.activity_imgs" :src="form.activity_imgs" class="avatar"> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <div class="imgDiv" style="margin-right:20px">
                <img :src="item.goods_img"
                     alt="">
              </div>
              <div class="section-p"
                   style="width:720px;background: #f1f1f1;padding: 10px;margin:30px 0 0 0">
                <span v-text="item.goods_name"></span>
                <div>
                  <span>官网价：￥{{item.price}}</span>
                  <span>会员价：￥{{item.vip_price}}</span>
                  <span>成本价：￥{{item.buy_price}}</span>
                  <span>库存：{{item.inventory}}</span>
                </div>
                 <input v-model="item.goods_desc"  type="text"  placeholder="请输入商品描述" style="width:300px;height:30px">
                <div class="ipt_list">
                  <input oninput="value=value.replace(/[^\d\.]/g,'')"
                         v-model="item.sk_price"
                         type="text"
                         placeholder="秒杀价格">
                  <input oninput="value=value.replace(/[^\d\.]/g,'')"
                         v-model="item.goods_stock"
                         type="text"
                         placeholder="秒杀库存">
                  <input oninput="value=value.replace(/[^\d\.]/g,'')"
                         v-model="item.buy_limit"
                         type="text"
                         placeholder="设置用户限购数量">
                  <input oninput="value=value.replace(/[^\d\.]/g,'')"
                         v-model="item.sort"
                         type="text"
                         placeholder="排序越大越靠前">
                  <input oninput="value=value.replace(/[^\d\.]/g,'')"
                         v-model="item.sale_count"
                         type="text"
                         placeholder="售卖数">
                </div>
              </div>
              <div class="del_item">
                <el-button type="danger"
                           plain
                           @click='delItem(item,form.goods_info,index)'>删除
                </el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="推广渠道">
        <el-checkbox-group v-model="form.pop_channels"
                           size="mini"
                           @change="handleCheckedCitiesChange">
          <el-checkbox :label="city.id"
                       :key='city.id'
                       v-for="city in cities">{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit('form')">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'
import waves from '@/directive/waves' // 水波纹指令
import {
  tabGoods,
  getBargain,
  getSeckill,
  getTabChannels,
  addSeckill,
  updateSeckill,
  getChannelList,
  getActivities,
  deleteSeckillIGood
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
  data () {
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
      dialogtbVisible: false,
      form: {
        share_title: '', //分享标题
        act_name: '', //砍价名称
        act_starttime: '', //活动开始时间
        act_endtime: '', //活动结束时间
        act_type: 0, //活动类型
        act_name: '', //活动标题
        act_special_imgs: '', //活动专题主图
        community_poster_img : '', //活动海报图
        pop_channels: [1],
        goods_info: [], //选择商品信息
        ac_id: 0, //选择活动信息id
        activity_name: '',//选择活动信息name
        share_img: '', //分享图片
        act_imgs: '',
        is_online: 0
      },
      disableds: false,
      channelList: [],
      radioChannel: '',
      editId: '',
      currentPage: 1,
      pickerOptions: {
        disabledDate: (time) => {
          const curDate = (new Date()).getTime()
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      cities: [{
        id: 1,
        name: "悦旅会APP"
      }], //推广渠道
      share_img: '',
      fileList: [],
      fileList1: [],

      dialogVisible: false,
      dialogImageUrl: '',

      searchVal: '',
      timeArray: [],
      list: [],
      activelist: [],
      stock: '',
      fileList_contract: [],
      // textarea: ''
    }
  },
  computed: {

  },
  mounted () {
    this.getTabGoods(1)
    this.getActivities(1)
    if (this.$route.query.id) {
      this.getList(this.$route.query.id)
      this.disableds = true;
    }
    this.getTabChannels();
    this.getChannelList();
  },
  methods: {
    // 选择推广渠道
    handleCheckedCitiesChange () {

    },
    // 删除
    delItem (item, dataList, idx) {
      if (item.id) {
        deleteSeckillIGood({
          id: item.id
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功"
            })
            dataList.splice(idx, 1)
          }
        })
      } else {
        dataList.splice(idx, 1)
      }

    },
    // 推广渠道
    getTabChannels () {
      getTabChannels().then(res => {
        console.log(res)
        this.cities = res.data;
      })
    },
    getChannelList () {
      getChannelList().then((res) => {
        if (res.data.code == 200) {
          this.channelList = res.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // 回显
    getList (cid) {
      let _this = this;
      var obj = '?id=' + cid
      getSeckill(obj).then((res) => {
        if (res.data.code == 200) {
          _this.form = res.data.data
          _this.stock = res.data.data.inventory
          let actImgs = res.data.data.act_imgs.split(',');
          if (actImgs != '') {
            actImgs.map(item => {
              _this.fileList.push({
                name: 'actImgs',
                url: item
              })
            })
          }
          let actImg = res.data.data.act_special_imgs;
          _this.timeArray.push(res.data.data.act_starttime)
          _this.timeArray.push(res.data.data.act_endtime)
          var pop_channels = res.data.data.pop_channels;
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
    onSubmit () {
      var self = this
      if (self.form.share_title == '') {
        self.$message({
          type: "error",
          message: '请输入分享标题'
        })
        return false;
      } else if (self.form.share_img == '') {
        self.$message({
          type: "error",
          message: '请选择分享封面'
        })
        return false;
      } else if (self.form.act_type == 0) {
        if (self.form.act_name == '') {
          self.$message({
            type: "error",
            message: '请填写首页标题'
          })
          return false;
        }

      } else if (self.form.act_type == 1) {
        if (self.form.act_special_imgs == '') {
          self.$message({
            type: "error",
            message: '请选择活动专题图'
          })
          return false;
        }

      } else if (self.form.goods_info.length == 0) {
        self.$message({
          type: "error",
          message: '请选择商品'
        })
        return false;
      }
      if (self.timeArray != null && self.timeArray.length > 0) {
        self.form.act_starttime = self.timeArray[0];
        self.form.act_endtime = self.timeArray[1];
      }
      if (!self.form.share_img) {
        self.form.share_img = self.form.goods_img
      }
      let arrImg = [];
      this.fileList.map(item => {
        arrImg.push(item.url)
      });
      this.form.act_imgs = arrImg.join(',')
      if (this.$route.query.id) {
        var data = _.clone(this.form)
        data.pop_channels = data.pop_channels.join(',')
        if (data.act_type == 0) {
          delete data.act_special_imgs
          data.ac_id = 0
          data.activity_name = ''
        } else if (data.act_type == 1) {
          delete data.act_name
          data.ac_id = 0
          data.activity_name = ''
        }
        updateSeckill(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '修改成功',
              type: 'success',
            })
            self.$router.push('/operate/spikeList')
          } else {
            self.$message({
              message: res.data.msg || '修改失败',
              type: 'error',
            })
          }

        })
      } else {
        var data = _.clone(this.form)
        data.pop_channels = data.pop_channels.join(',')
        if (data.act_type == 0) {
          delete data.act_special_imgs
          data.ac_id = 0
          data.activity_name = ''
        } else if (data.act_type == 1) {
          delete data.act_name
          data.ac_id = 0
          data.activity_name = ''
        }
        addSeckill(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '添加成功',
              type: 'success',
            })
            self.$router.push('/operate/spikeList')
          } else {
            self.$message({
              message: res.data.msg || '添加失败',
              type: 'error',
            })
          }
        })
      }
    },
    radioChange: function (val) {
      this.currentPage = 1;
      this.radioChannel = val;
      this.list = [];
      this.getTabGoods(1)
    },
    // 选择商品
    choseId (item) {
      var goodsInfo = this.form.goods_info;
      var idx = this.form.goods_info.length;
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
        goods_desc:'',
      };
      obj.sku_id = item.sku_id;
      obj.goods_img = item.path;
      obj.goods_name = item.goods_name;
      obj.goods_id = item.id || '';
      // obj.id = item.id || '';
      obj.act_id = this.$route.query.id || '';
      obj.price = item.origin_price;
      obj.buy_price = item.buy_price;
      obj.vip_price = item.vip_price;
      obj.inventory = item.inventory;
      obj.goods_stock = item.goods_stock;
      obj.goods_desc  ='';
      
      if (goodsInfo.length == 0) {
        this.form.goods_info[idx] = obj; //官网价
        this.dialogTableVisible = false
      } else {
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
          this.form.goods_info[idx] = obj; //官网价
          this.dialogTableVisible = false
        }
      }
    },
    // 选择活动
    activeId (item) {
      this.form.ac_id = item.id; //官网价
      this.form.activity_name = item.activity_name; //官网价
      this.dialogtbVisible = false
    },
    //获取商品分页
    handleCurrentChange (val) {
      this.getTabGoods(val)
    },
    // 获取商品
    getTabGoods (page) {
      let _this = this;
      let data = {
        page: page,
        channel_id: this.radioChannel
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
    //获取活动分页
    handleActiveChange (val) {
      this.getActivities(val)
    },
    // 获取活动
    getActivities (page) {
      let _this = this;
      let data = {}
      data.page = page
      if (this.searchVal) {
        data.keyword = this.searchVal
      }
      getActivities(data).then((res) => {
        if (res.data.code == 200) {
          _this.activelist = res.data.data
          _this.total = res.data.count
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt = file.size / 1024 < 100;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 100K!');
      }
      return isJPG && isLt;
    },
    beforeAvatarUpload2 (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 500K!');
      }
      return isJPG && isLt;
    },
    handlePictureCardPreview (file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleOnExceed (file, fileList) {
      this.$message({
        type: "error",
        message: "最多上传两张图片"
      })
    },
    handleAvatarSuccess (res, file) {
      this.form.share_img = file.response.url;
    },
    handleAvatarSuccess1 (res, file, fileList) {
      let arrList = [];
      fileList.map(item => {
        console.log(item, 'itemitem')
        if (item.response) {
          arrList.push({
            name: 'item',
            url: item.response.url
          })
        } else {
          arrList.push({
            name: 'item',
            url: item.url
          })
        }

      })
      this.fileList = arrList;
    },
    handleAvatarSuccess2 (res, file) {
      this.form.act_special_imgs = file.response.url
    },


    handleAvatarSuccess3 (res, file) {
      this.form.community_poster_img = file.response.url
    },


    handleAvatarSuccessGoods (res, file, fileList, index) {
      this.form.goods_info[index].goods_img = file.response.url;
      // console.log(index);
      // console.log(res);
      // console.log(file);
      // console.log(fileList);
    },

    uploadSuccessAll3 (res) {
      this.form.goods_info = res.data;

      if (this.$route.query.id) {
        var act_id = this.$route.query.id;
        this.form.goods_info.forEach(function (val, index) {
          val.act_id = act_id

        });
      }
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
  border-color: #409eff;
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
  width: 400px;
}

.ipt_list input {
  width: 125px;
  padding-left: 5px;
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
  margin-top: 7px;
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
  /*float: left;*/
  /*height: 96px;*/
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
  border-color: #409eff;
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
  list-style: none;
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
</style>
