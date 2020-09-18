<template>
  <div class="gropAdd">
    <el-dialog width="800px"
               title="选择商品"
               :visible.sync="dialogTableVisible"
               v-loading="loading"
               @close="closeBox">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal"
                    placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBeturnw()"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-radio-group v-model="radio1"
                      @change="xswType(radio1)"
                      v-if="form.jumpType == 2">
        <!-- <el-radio label="1" border>自营</el-radio> -->
        <!-- <el-radio label="2" border>京东</el-radio> -->
        <!-- <el-radio label="3" border>拼多多</el-radio> -->
        <el-radio-button label="1">自营</el-radio-button>
        <el-radio-button label="2">京东</el-radio-button>
        <el-radio-button label="3">拼多多</el-radio-button>
      </el-radio-group>
      <div class="commodity">
        <ul v-if="list.length>0&&radio1==1">
          <li @click="choseId(item)"
              v-for="(item,index) in list"
              :key="index">
            <div class="imgDiv">
              <img :src="item.path"
                   alt />
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
        <ul v-if="list.length>0&&radio1==2">
          <li @click="choseId(item)"
              v-for="(item,index) in list"
              :key="index">
            <div class="imgDiv">
              <img :src="item.pathimages?item.pathimages:''"
                   alt />
            </div>
            <div class="section-p">
              <p v-text="item.skuName"></p>
              <div>
                <!-- <span>官网价：￥{{item.priceInfo.lowestPrice}}</span> -->
                <!-- <span>库存：{{item.priceInfo.lowestCouponPrice}}</span> -->
              </div>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
        <ul v-if="list.length>0&&radio1==3">
          <li @click="choseId(item)"
              v-for="(item,index) in list"
              :key="index">
            <div class="imgDiv">
              <img :src="item.goods_image_url?item.goods_image_url:''"
                   alt />
            </div>
            <div class="section-p">
              <p v-text="item.goods_name"></p>
              <div>
                <span>官网价：￥{{item.min_normal_price}}</span>
                <!-- <span>库存：{{item.inventory}}</span> -->
              </div>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
        <div v-else
             style="text-align: center;">暂无数据</div>
      </div>
      <el-pagination small
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     :total="total"
                     v-if="radio1==1"></el-pagination>
      <el-pagination small
                     @current-change="handleCurrentChangea"
                     layout="prev, pager, next"
                     :total="total"
                     v-if="radio1==2"></el-pagination>
      <el-pagination small
                     @current-change="handleCurrentChangeb"
                     layout="prev, pager, next"
                     :total="total"
                     v-if="radio1==3"></el-pagination>
    </el-dialog>
    <el-dialog width="800px"
               title="选择活动"
               :visible.sync="dialogActive"
               v-loading="loading"
               @close="closeBox">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="选择活动">
          <el-input v-model="searchVal"
                    placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchActive"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul v-if="activeList.length>0">
          <li @click="choseId(item)"
              v-for="(item,index) in activeList"
              :key="index">
            <div class="section-p">
              <p v-text="item.activity_name"></p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
        <div v-else
             style="text-align: center;">暂无数据</div>
      </div>
      <el-pagination small
                     @current-change="handleCurrentChange1"
                     layout="prev, pager, next"
                     :total="total1"></el-pagination>
    </el-dialog>

    <el-dialog width="800px"
               title="选择优惠券专题"
               :visible.sync="dialogCoupon"
               v-loading="loading"
               @close="closeBox">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="选择优惠券专题">
          <el-input v-model="searchVal"
                    placeholder="请输入优惠券专题名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchCoupons"
                     type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul v-if="couponsList.length>0">
          <li @click="choseId(item)"
              v-for="(item,index) in couponsList"
              :key="index">
            <div class="section-p">
              <p v-text="item.ac_name"></p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
        <div v-else
             style="text-align: center;">暂无数据</div>
      </div>
      <el-pagination small
                     @current-change="handleCurrentChange2"
                     layout="prev, pager, next"
                     :total="total2"></el-pagination>
    </el-dialog>

    <el-form ref="form"
             :model="form"
             label-width="120px">
      <el-form-item label="消息标题"
                    prop="share_title"
                    class="background_color">
        <el-input v-model="form.pushTitle"
                  placeholder="请输入消息标题"></el-input>
      </el-form-item>
      <el-form-item label="消息内容"
                    class="background_color">
        <el-input type="textarea"
                  v-model="form.pushContent"
                  placeholder="请输入消息内容"
                  style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="消息类型"
                    class="background_color">
        <el-radio-group v-model="form.jumpType"
                        @change="radioChange">
          <el-radio :label="1">活动</el-radio>
          <el-radio :label="2">商品</el-radio>
          <el-radio :label="3">优惠券专题</el-radio>
          <el-radio :label="4">CPS活动链接</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接"
                    class="background_color"
                    v-if="this.form.jumpType == 4">
        <el-input v-model="Urlnames"
                  placeholder="请输入活动链接"></el-input>
      </el-form-item>
      <el-form-item label="选择优惠券专题"
                    class="background_color"
                    v-if="this.form.jumpType == 3">
        <el-button type="primary"
                   @click="dialogCoupon = true"
                   plain>点击选择</el-button>
        <div v-if="form.goods_info.length !=0"
             class="commodity">
          <ul>
            <li style="border:none"
                v-for="(item,index) in form.goods_info">
              <div class="section-p"
                   style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
                <div>
                  <span>优惠券专题名称：{{item.goodsName}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-form-item>

      <el-form-item label="选择商品"
                    class="background_color"
                    v-if="this.form.jumpType == 2">
        <el-button type="primary"
                   @click="dialogTableVisible = true"
                   plain>点击选择</el-button>
        <div v-if="form.goods_info.length !=0"
             class="commodity">
          <ul>
            <li style="border:none"
                v-for="(item,index) in form.goods_info">
              <div class="section-p"
                   style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
                <div>
                  <span>商品名称：{{item.goodsName}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="选择活动"
                    class="background_color"
                    v-if="this.form.jumpType == 1">
        <el-button type="primary"
                   @click="dialogActive = true"
                   plain>点击选择</el-button>
        <div v-if="form.goods_info.length !=0"
             class="commodity">
          <ul>
            <li style="border:none"
                v-for="(item,index) in form.goods_info">
              <div class="section-p"
                   style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
                <div>
                  <span>活动名称：{{item.goodsName}}</span>
                </div>
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
import _ from "lodash";
import waves from "@/directive/waves"; // 水波纹指令
import { getPush, addPush, upPush } from "@/api/admin";
import {
  tabGoods,
  getGood,
  getActivities,
  getActivitiesCoupons,
  getCpsJdProduct,
  getCpsPddProduct,
} from "@/api/shops";
const isInArray = (single, arr) => {
  return (
    arr.findIndex((res) => {
      return res === single;
    }) >= 0
  );
};
export default {
  name: "bargainAdd",
  directives: {
    waves,
  },
  // components: { VerticalFrom },
  data () {
    let _this = this;
    var validateStock = (rule, value, callback) => {
      if (value > _this.stock) {
        callback(new Error("不可高于产品现有库存"));
      } else {
        callback();
      }
    };
    return {
      radio1: 1,
      total: 1,
      total1: 1,
      total2: 1,
      dialogTableVisible: false,
      form: {
        pushTitle: "", //消息title
        pushContent: "", //消息内容
        jumpType: "", //消息类型
        jumpId: "",
        goods_info: [],
        skuId: "",
      },
      Urlnames: "",
      disableds: false,
      share_img: "",
      dialogVisible: false,
      searchVal: "",
      list: [],
      activeList: [],
      couponsList: [],
      dialogActive: false,
      dialogCoupon: false,
      stock: "",
      loading: false,
    };
  },
  computed: {},
  mounted () {
    this.getTabGoods(1);
    this.getActive(1);
    this.getActivitiesCoupons(1);
    if (this.$route.query.id) {
      this.getList(this.$route.query.id);
      this.disableds = true;
    }
  },
  methods: {
    searchBeturnw () {
      if (this.radio1 == 1) {
        console.log(1, '2222')
        this.getTabGoods(1);
      } else if (this.radio1 == 2) {
        console.log(2, '2222')
        this.getCpsJdProduct(1);
      } else {
        console.log(3, '2222')
        this.getCpsPddProduct(1);
      }
    },
    // 回显
    getList (cid) {
      let _this = this;
      getPush({ id: cid })
        .then((res) => {
          if (res.data.code == 200) {
            _this.form.pushTitle = res.data.data.pushTitle;
            _this.form.pushContent = res.data.data.pushContent;
            _this.form.jumpId = res.data.data.jumpId;
            _this.form.skuId = res.data.data.skuId;
            _this.form.goodType = res.data.data.goodType;
            _this.form.goodName = res.data.data.typeName;
            _this.form.jumpType = parseInt(res.data.data.jumpType);
            if (res.data.data.jumpType == 4) {
              _this.Urlnames = res.data.data.typeName;
            } else {
              _this.form.goods_info.push({
                goodsName: res.data.data.typeName,
              });
            }

            console.log(_this.form.goods_info, "_this.form.goods_info");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onSubmit () {
      var self = this;
      if (self.form.goods_info.length == 0 && self.form.jumpType <= 3) {
        self.$message({
          type: "error",
          message: "请选择商品",
        });
        return false;
      }
      var obj = _.clone(this.form);
      if (self.form.jumpType == 4) {
        obj.goodName = self.Urlnames;
      }
      delete obj.goods_info;
      if (obj.jumpType == 1 || obj.jumpType == 3) {
        obj.skuId = 0;
      }

      if (this.$route.query.id) {
        obj.id = this.$route.query.id;
        // console.log(obj);
        upPush(obj).then((res) => {
          if (res.data.code == 200) {
            self.$message({
              message: res.data.msg || "修改成功",
              type: "success",
            });
            self.$router.push("/operate/message");
          } else {
            self.$message({
              message: res.data.msg || "修改失败",
              type: "error",
            });
          }
        });
      } else {
        addPush(obj).then((res) => {
          if (res.data.code == 200) {
            self.$message({
              message: res.data.msg || "添加成功",
              type: "success",
            });
            self.$router.push("/operate/message");
          } else {
            self.$message({
              message: res.data.msg || "添加失败",
              type: "error",
            });
          }
        });
      }
    },
    xswType (e) {
      console.log(e);
      if (e == 1) {
        console.log(1, '1111')
        this.getTabGoods(1);
      } else if (e == 2) {
        console.log(2, '1111')
        this.getCpsJdProduct(1);
      } else {
        console.log(3, '1111')
        this.getCpsPddProduct(1);
      }
    },
    //拼多多
    getCpsPddProduct (page) {
      this.loading = true;
      let data = {
        page: page,
        tid: "",
      };
      if (this.searchVal) {
        data["keyword"] = this.searchVal;
      }
      getCpsPddProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            let _data = res.data.data;
             let _sdata= [];
             _data.map(val=>{
              _sdata.push(val.info);
            })
            this.list=_sdata
            this.total = res.data.total;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //京东
    getCpsJdProduct (page) {
      this.loading = false;
      let data = {
        page: page,
        cid1: "",
      };
      if (this.searchVal) {
        data["keyword"] = this.searchVal;
      }
      getCpsJdProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            let _data = res.data.data;
             _data.map(val=>{
              val.pathimages=val.imageInfo.imageList[0].url;
            })
            this.list=_data;
            this.total = res.data.total;
            this.loading = false;
          } else {
            this.list = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 选择商品
    choseId (item) {
      console.log(item, "item");
      // 活动
      if (this.form.jumpType == 2) {
        if (this.radio1 == 1) {
          var goodsInfo = this.form.goods_info;
          var obj = {
            goodsName: item.goods_name,
          };
          this.form.goods_info[0] = obj; //官网价
          this.form.jumpId = item.id;
          this.form.skuId = item.sku_id;
          this.form.goodType = this.radio1;
          this.form.goodName = item.goods_name;
          this.dialogTableVisible = false;
        } else if (this.radio1 == 2) {
          var goodsInfo = this.form.goods_info;
          var obj = {
            goodsName: item.skuName,
          };
          this.form.goods_info[0] = obj; //官网价
          this.form.jumpId = item.skuId;
          this.form.goodType = this.radio1;
          this.form.goodName = item.skuName;
          // this.form.skuId = item.skuId;
          this.dialogTableVisible = false;
        } else {
          var goodsInfo = this.form.goods_info;
          var obj = {
            goodsName: item.info.goods_name,
          };
          this.form.goods_info[0] = obj; //官网价
          this.form.jumpId = item.info.goods_id;
          this.form.goodType = this.radio1;
          this.form.goodName = item.info.goods_name;
          // this.form.skuId = item.sku_id;
          this.dialogTableVisible = false;
        }
      } else if (this.form.jumpType == 1) {
        var obj = {
          goodsName: item.activity_name,
        };
        this.form.goods_info[0] = obj;
        this.form.jumpId = item.id;
        this.dialogActive = false;
      } else if (this.form.jumpType == 3) {
        var obj = {
          goodsName: item.ac_name,
        };
        this.form.goods_info[0] = obj;
        this.form.jumpId = item.id;
        this.dialogCoupon = false;
      } else {
        // this.form.goodName=this.form.goods_info[0].goodsName
        this.dialogCoupon = false;
      }
    },
    handleCurrentChange (val) {
      this.getTabGoods(val);
    },
    handleCurrentChangea (val) {
      this.getCpsJdProduct(val);
    },
    handleCurrentChangeb (val) {
      this.getCpsPddProduct(val);
    },
    handleCurrentChange1 (val) {
      this.getActive(val);
    },
    handleCurrentChange2 (val) {
      this.getActivitiesCoupons(val);
    },
    // 自营
    getTabGoods (page) {
      this.loading = true;
      let _this = this;
      let data = {
        page: page,
      };
      if (this.searchVal) {
        data["goods_name"] = this.searchVal;
      }

      tabGoods(data)
        .then((res) => {
          if (res.data.code == 200) {
            _this.list = res.data.data;
            _this.total = res.data.count;
            this.loading = false;
            console.log(_this.list, 'uuiiuuo')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getActive (page) {
      this.loading = true;
      let _this = this;
      let data = {
        page: page,
      };
      if (this.searchVal) {
        data["keyword"] = this.searchVal;
      }

      getActivities(data)
        .then((res) => {
          if (res.data.code == 200) {
            _this.activeList = res.data.data;
            _this.total1 = res.data.count;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchActive () {
      this.getActive(1);
    },

    getActivitiesCoupons (page) {
      this.loading = true;
      let _this = this;
      let data = {
        page: page,
      };
      if (this.searchVal) {
        data["keyword"] = this.searchVal;
      }

      getActivitiesCoupons(data)
        .then((res) => {
          if (res.data.code == 200) {
            _this.couponsList = res.data.data;
            _this.total2 = res.data.count;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchCoupons () {
      this.getActivitiesCoupons(1);
    },
    closeBox () {
      this.searchVal = "";
    },
    radioChange () {
      this.form.goods_info = [];
    },
  },
};
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
    padding: 0;
    width: 50px;
    height: 40px;
  }
}
</style>
