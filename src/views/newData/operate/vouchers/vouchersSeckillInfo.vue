<template>
  <div class="gropAdd">
    <el-dialog width="800px"
               title="选择优惠券"
               :visible.sync="dialogTableVisible">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="选择优惠券">
          <el-input v-model="searchVal"
                    placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="yhqTep1(1)"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)"
              v-for="(item,index) in couponList"
              :key="index">
            <div class="section-p">
              优惠券ID:<p v-text="item.id"></p>
            </div>
          
            <div class="section-p">
              优惠券名称:<p v-text="item.name"></p>
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




    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="分享标题"
                    prop="share_title">
        <el-input v-model="form.share_title"
                  placeholder="请输入分享标题"></el-input>
      </el-form-item>
      <el-form-item label="分享封面"
                    prop="share_image">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.share_image"
               :src="form.share_image"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>尺寸:421*375,100kb以内</p>
      </el-form-item>
      <el-form-item label="活动类型"
                    prop="type">
        <el-radio v-model='form.type'
                  :label="1"
                  :disabled="disableds">秒杀</el-radio>
      </el-form-item>
      <el-form-item label="首页标题" prop="home_title">
        <el-input v-model="form.home_title"
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
        <el-radio v-model='form.status'
                  :label="0">禁用</el-radio>
        <el-radio v-model='form.status'
                  :label="1">启用</el-radio>
      </el-form-item>
    
      <el-form-item label="选择优惠券"
                    prop="goods_id">
        <div style="float:left">
          <el-button type="primary"
                     @click="dialogTableVisible = true"
                     plain>点击选择</el-button>
        </div>


        <div v-if="form.list.length !=0"
             class="commodity"
             style="clear:both;">
          <ul>
            <li style="border:none"
                v-for="(item,index) in form.list"
                :key="index">

              <div class="section-p"
                   style="width:720px;background: #f1f1f1;padding: 10px;margin:30px 0 0 0">
                  id: <span v-text="item.id"></span>
                  名称：<span v-text="item.name"></span>
                </div>
              <div class="del_item">
                <el-button type="danger"
                           plain
                           @click='delItem(item,form,index)'>删除
                </el-button>
              </div>
            </li>
          </ul>
        </div>
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
  couponpurchaseInfo,upCouponpurchaseInfo,addCouponpurchaseInfo,delCouponpurchaseInfo
} from '@/api/order'
import {
  yhqTep1
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
        is_online: 0,
        list:[]
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
      couponList: [],
      fileList_contract: [],
      // textarea: ''
    }
  },
  computed: {

  },
  mounted () {
    this.yhqTep1(1)
    if (this.$route.query.id) {
      this.getList(this.$route.query.id)
      this.disableds = true;
    }
   
  },
  methods: {
   
    // 删除
    delItem (item, dataList, idx) {
      if (item.id) {
        delCouponpurchaseInfo({
          cid: item.id, id: dataList.id,
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功"
            })
            dataList.list.splice(idx, 1)
          }else{
            this.$message({
              message: res.data.msg,
              type: 'error',
            })
          }
        })
      } else {
        dataList.splice(idx, 1)
      }
    },

    // 回显
    getList (cid) {
      let _this = this;
      var obj = {
        id:cid
      }
      couponpurchaseInfo(obj).then((res) => {
        if (res.data.code == 200) {
          _this.form = res.data.data

          let actImgs = res.data.data.home_image.split(',');
          if (actImgs != '') {
            actImgs.map(item => {
              _this.fileList.push({
                name: 'actImgs',
                url: item
              })
            })
          }
          // let actImg = res.data.data.act_special_imgs;
          _this.timeArray.push(res.data.data.start_time)
          _this.timeArray.push(res.data.data.end_time)
          // console.log(this.timeArray)
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
      } else if (self.form.share_image == '') {
        self.$message({
          type: "error",
          message: '请选择分享封面'
        })
        return false;
      } else if (self.form.home_title == '') {
          self.$message({
            type: "error",
            message: '请填写首页标题'
          })
          return false;
      } else if (self.form.list.length == 0) {
        self.$message({
          type: "error",
          message: '请选择优惠券'
        })
        return false;
      }
      if (self.timeArray != null && self.timeArray.length > 0) {
        self.form.start_time = self.timeArray[0];
        self.form.end_time = self.timeArray[1];
      }


      let arrImg = [];
      this.fileList.map(item => {
        arrImg.push(item.url)
      });
      this.form.home_image = arrImg.join(',')
    
      if (this.$route.query.id) {
        var data = _.clone(this.form)
   
        upCouponpurchaseInfo(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '修改成功',
              type: 'success',
            })
            self.$router.push('/operate/vouchersSeckill')
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
        addCouponpurchaseInfo(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '添加成功',
              type: 'success',
            })
            self.$router.push('/operate/vouchersSeckill')
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
      var goodsInfo = this.form.list;
      var idx = this.form.list.length;
      var obj = {
        id: item.id,
        name: item.name,
      };
  
    
      if (goodsInfo.length == 0) {
        this.form.list[idx] = obj; //官网价
        this.dialogTableVisible = false
      } else {
        var isArr = []
        goodsInfo.map((json) => {
          isArr.push(json.id)
        })
        if (isInArray(item.id, isArr)) {
          this.$message({
            type: 'info',
            message: '不能选择相同产品'
          })
        } else {
          this.form.list[idx] = obj; //官网价
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
      this.yhqTep1(val)
    },
    // 获取商品
    yhqTep1 (page) {
      let _this = this;
      let data = {
        page: page,
      }
      if (this.searchVal) {
        data['keyword'] = this.searchVal
      }

      yhqTep1(data).then((res) => {
        if (res.data.code == 200) {
          _this.couponList = res.data.data.list
          _this.total = res.data.data.count
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
      this.form.share_image = file.response.url;
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
