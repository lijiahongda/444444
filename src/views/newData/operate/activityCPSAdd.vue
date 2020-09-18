<template>
  <div class="gropAdd" v-loading="loading">
    <el-dialog width="800px" title="选择商品1" :visible.sync="dialogTableVisible1">
      <el-form :inline="true" class="demo-form-inline">
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
              <img :src="item.goods_img" alt />
            </div>
            <div class="section-p">
              <p v-text="item.product_name"></p>
            </div>
            <div class="section-p">
              <p>
                <span>现价:¥{{item.product_price}}</span>
                <span>原价:¥{{item.market_price}}</span>
                <span>SKU:{{item.sku_id}}</span>
                <span>渠道:{{item.channelName}}</span>
              </p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        small
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange1"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>

    <el-dialog width="800px" title="选择商品2" :visible.sync="dialogTableVisible2">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label label-width="20px">
          <el-select v-model="cid1" clearable placeholder="请选择品类">
            <el-option
              v-for="item in jdGoodsOptions"
              :key="item.cid1"
              :label="item.name"
              :value="item.cid1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCpsJdProduct(1)" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)" v-for="(item,index) in list" :key="index">
            <div class="imgDiv">
              <img :src="item.goods_img" alt />
            </div>
            <div class="section-p">
              <p v-text="item.skuName"></p>
            </div>
            <div class="section-p">
              <p>
                <span>现价:¥{{item.product_price}}</span>
                <span>原价:¥{{item.market_price}}</span>
              </p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        small
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange2"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>

    <el-dialog width="800px" title="选择商品3" :visible.sync="dialogTableVisible3">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <!-- <el-form-item label label-width="20px">
            <el-select v-model="pddSelect" clearable placeholder="请选择品类">
              <el-option
                v-for="item in pddOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-button @click="getCpsPddProduct()" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)" v-for="(item,index) in pddList" :key="index">
            <div class="imgDiv">
              <img :src="item.info.goods_image_url" alt />
            </div>
            <div class="section-p">
              <p v-text="item.info.goods_name"></p>
            </div>
            <div class="section-p">
              <p>
                <span>现价:¥{{item.product_price}}</span>
                <span>原价:¥{{item.market_price}}</span>
              </p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        small
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange3"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>

    <el-dialog width="800px" title="选择商品4" :visible.sync="dialogTableVisible4">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal4" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCpsWphProduct()" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)" v-for="(item,index) in wphList.goodsInfoList" :key="index">
            <div class="imgDiv">
              <img :src="item.goodsMainPicture" alt />
            </div>
            <div class="section-p">
              <p v-text="item.goodsName"></p>
            </div>
            <div class="section-p">
              <p>
                <span>现价:¥{{item.product_price}}</span>
                <span>原价:¥{{item.market_price}}</span>
              </p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        :current-page="wphList.page"
        :page-size="wphList.pageSize"
        :total="wphList.total"
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange4"
        @current-change="handleCurrentChange4"
      ></el-pagination>
    </el-dialog>

    <el-dialog width="800px" title="选择商品5" :visible.sync="dialogTableVisible5">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="选择商品">
          <el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label label-width="20px">
          <el-select v-model="bandId" clearable placeholder="请选择品类">
            <el-option
              v-for="item in goodsOptions"
              :key="item.bandId"
              :label="item.typeName"
              :value="item.bandId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCpsTaoProduct(1)" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="commodity">
        <ul>
          <li @click="choseId(item)" v-for="(item,index) in list" :key="index">
            <div class="imgDiv">
              <img :src="item.goods_img" alt />
            </div>
            <div class="section-p">
              <p v-text="item.product_name"></p>
            </div>
            <div class="section-p">
              <p>
                <span>现价:¥{{item.product_price}}</span>
                <span>原价:¥{{item.market_price}}</span>
                返利:{{item.commission_rate}}
                <span></span>
              </p>
            </div>
            <div class="select-btn">
              <el-button plain>选取</el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
        small
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange5"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-dialog>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="主标题" prop="main_title" class="background_color">
        <el-input v-model="form.main_title" placeholder="请输入主标题"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="subtitle" class="background_color">
        <el-input v-model="form.subtitle" placeholder="请输入副标题"></el-input>
      </el-form-item>

      <el-form-item label="分享标题" prop="share_title" class="background_color">
        <el-input v-model="form.share_title" placeholder="请输入分享标题"></el-input>
      </el-form-item>
      <el-form-item label="分享封面" prop="share_img">
        <el-upload
          class="avatar-uploader"
          action="https://api2.yuelvhui.com/app/third/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload1"
        >
          <img v-if="form.share_img" :src="form.share_img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:750*770,500kb以内</span>
      </el-form-item>
      <el-form-item label="活动名称" class="background_color">
        <el-input v-model="form.activity_name" placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" class="background_color">
        <!-- <el-radio v-model="form.activity_type" :label="0">默认活动</el-radio> -->
        <!-- <el-radio v-model="form.activity_type" :label="1">会员专属</el-radio> -->
        <el-radio v-model="form.activity_type" :label="2">CPS专属</el-radio>
      </el-form-item>
      <!-- 活动渠道---隐藏 -->
      <!--<el-form-item label="活动渠道"
                    class="background_color">
        <el-radio v-model="form.act_channel"
                  :label="1">悦淘</el-radio>
        <el-radio v-model="form.act_channel"
                  :label="2">cps</el-radio>
      </el-form-item>-->
      <el-form-item label="背景图片">
        <el-upload
          class="avatar-uploader"
          action="https://api2.yuelvhui.com/app/third/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.activity_imgs" :src="form.activity_imgs" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:421*375,500kb以内</span>
      </el-form-item>
      <el-form-item label="背景颜色" class="background_color">
        <el-input readonly maxlength="8" v-model="form.activity_color" placeholder="请选择背景颜色"></el-input>
        <el-color-picker v-model="color" @change="colorChange" class="color_name"></el-color-picker>
      </el-form-item>

      <el-form-item label="导航栏颜色" class="background_color">
        <el-input readonly maxlength="8" v-model="form.tab_color" placeholder="请选择导航栏颜色"></el-input>
        <el-color-picker v-model="tabColor" @change="tabColorChange" class="color_name"></el-color-picker>
      </el-form-item>

      <el-form-item label="导航栏字体颜色" class="background_color">
        <el-input readonly maxlength="8" v-model="form.title_color" placeholder="请选择导航栏字体颜色"></el-input>
        <el-color-picker v-model="titlecColor" @change="tabColorChange2" class="color_name"></el-color-picker>
      </el-form-item>
      <el-form-item label="推荐图" class="background_color" style="width: 720px;">
        <uploadImg :limit="5" :imgList="form.index_img" @successList="successListIndex"></uploadImg>
        <!-- <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
				 :on-success="successListIndex">
					<img v-if="form.index_img" :src="form.index_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
      </el-form-item>

      <el-form-item label="海报图" class="background_color" style="width: 720px;">
        <el-upload
          class="avatar-uploader"
          action="https://api2.yuelvhui.com/app/third/upload"
          :show-file-list="false"
          :on-success="successListPoster"
        >
          <img v-if="form.poster_img" :src="form.poster_img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <uploadImg :imgList="form.poster_img" @successList="successListPoster"></uploadImg> -->
      </el-form-item>

      <el-form-item label="小程序海报图" class="background_color" style="width: 720px;">
        <el-upload
          class="avatar-uploader"
          action="https://api2.yuelvhui.com/app/third/upload"
          :show-file-list="false"
          :on-success="successListSmallPoster"
        >
          <img v-if="form.small_poster_img" :src="form.small_poster_img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <uploadImg :imgList="form.poster_img" @successList="successListPoster"></uploadImg> -->
      </el-form-item>

      <el-form-item label="专题id" prop="coupon_id" v-if="form.coupon_type==2">
        <el-input v-model="form.coupon_id" placeholder="请输入专题id" style="width:300px" />
      </el-form-item>

      <el-form-item label="添加优惠券专题ID" class="background_color" style="width: 720px;">
        <el-input maxlength="8" v-model="form.coupon_id" placeholder="请输入优惠券专题ID"></el-input>
      </el-form-item>

      <el-form-item label="绑定活动ID" class="background_color" style="width: 720px;">
        <el-input maxlength="8" v-model="form.bind_active_id" placeholder="绑定活动ID"></el-input>
      </el-form-item>

      <el-form-item label="选择模板" class="background_color" style="width: 530px;">
        <el-button
          :class="item.isRelonly?'is_relonly':''"
          v-for="(item,idx) in moudleList"
          :key="idx"
          @click="isChange(idx,item.id)"
        >{{item.name}}</el-button>
      </el-form-item>
      <el-form-item
        :label="'模板'+(parseInt(list.tem_type)+1)"
        prop="goods_id"
        class="list_border"
        v-for="(list,idx) in form.type_list"
        :key="idx"
      >
        <div class="list_info">
          <div class="pic">
            <p class="tit_p">请上传一张Banner图</p>
            <uploadImg
              :limit="1"
              :imgList="list.tem_banner"
              @successList="successList"
              @otherList="otherList(idx)"
            ></uploadImg>
          </div>
          <div class="input_list">
            <el-form label-width="100px" style="width: 550px;">
              <el-form-item label="标签：">
                <el-select
                  v-model="list.category_id"
                  placeholder="请选择标签"
                  @change="changeCate"
                  clearable
                >
                  <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签排序：">
                <el-input
                  v-model="list.category_sort"
                  placeholder="排序数字越大越靠前"
                  type="number"
                  style="display: inline-block;width: 166px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="模版排序：">
                <el-input
                  v-model="list.tem_sort"
                  placeholder="排序数字越大越靠前"
                  type="number"
                  style="display: inline-block;width: 166px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="渠道:" class="background_color">
                <el-radio-group
                  v-model="list.channel_id"
                  @change="radioChange"
                  style="width: 440px"
                >
                  <el-radio
                    v-for="item in channelList"
                    :key="item.id"
                    :label="item.id"
                  >{{item.channel_name}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="高度：">
                <el-input
                  v-model="list.tem_height"
                  placeholder="banner高度,例:100"
                  type="number"
                  style="display: inline-block;width: 166px;"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-button
          type="primary"
          @click="selecShop(idx,list.category_id)"
          plain
          class="select_shop"
        >选择商品</el-button>
        <div v-if="list.goods_info.length !=0" class="commodity">
          <ul>
            <li
              style="border:none;display:flex;align-items: center;justify-content: space-between;"
              v-for="(item,index) in list.goods_info"
              :key="index"
              :class="list.tem_type == 0||list.tem_type == 1||list.tem_type == 2||list.tem_type == 3?'selectName':'selectName small_bg'"
            >
              <div class="flex-item">
                <uploadImg
                  :limit="1"
                  :imgList="item.goods_img"
                  @successList="successList0"
                  @otherList="otherList0(idx,index)"
                ></uploadImg>
              </div>
              <div class="flex-item">
                <div style="margin-bottom: 5px;display: flex;flex-direction: column;">
                  <div>
                    <span style="margin:10px 10px 0 10px">高度:</span>
                    <input
                      v-model="item.goods_img_height"
                      type="number"
                      placeholder="图片高度,例:100"
                      style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;"
                    />
                  </div>
                  <div>
                    <span style="margin:10px 10px 0 10px">排序:</span>
                    <input
                      v-model="item.goods_sort"
                      type="number"
                      placeholder="排序数字越大越靠前"
                      style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;"
                    />
                  </div>
                  <template v-if="item.category_first_name">
                    <span>标 签:{{item.category_first_name}}</span>
                  </template>
                </div>
              </div>
              <div
                class="flex-item"
                v-if="list.tem_type ==2||list.tem_type ==3 "
                style="margin-left: 10px;"
              >
                <!-- <span style="margin-top:10px;margin-right: 10px;">排序:</span>
                <input
                  v-model="item.goods_sort"
                  type="number"
                  placeholder="排序数字越大越靠前"
                  style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;"
                />
                <template v-if="item.category_first_name">
                  <span>标 签:{{item.category_first_name}}</span>
                </template>-->
              </div>
              <div class="flex-item">
                <div class="section-p" style="width:400px">
                  <span>名称:</span>
                  <span v-text="item.product_name"></span>
                  <!-- <span  v-show="radioChannel==1">SKU:{{item.sku_id}}</span> -->
                  <p>
                    <span>现价:¥{{item.product_price}}</span>
                    <span>原价:¥{{item.market_price}}</span>
                    <!-- <span v-show="radioChannel==5">返利:¥{{item.commission_rate}}</span> -->
                  </p>
                  <p>商品ID:{{item.product_id}}</p>
                  <p>商品类型:{{item.product_type_name}}</p>
                </div>
              </div>

              <el-button
                type="danger"
                style="margin-left: 20px;"
                plain
                @click="delItem(item,list.goods_info,index)"
              >删除</el-button>
            </li>
          </ul>
        </div>
        <el-button
          type="danger"
          plain
          class="del_moudle"
          @click="delMoudle(list.tem_sort,idx,list.tem_show)"
        >删除模板</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from "lodash";
import waves from "@/directive/waves"; // 水波纹指令
import uploadImg from "../../public/uploadImg";
import {
  tabGoods,
  getBargain,
  getSeckill,
  getTabChannels,
  getChannelList,
  addSeckill,
  updateSeckill,
  deleteCpsActivitieGood,
  // deletItemeGoods,
  deletItemeCpsGoods,
  getActivitiesTags,
  getFirstCategorys,
  getCpsTaoProduct,
  getCpsTapProductType,
  addCpsActivitie,
  getCpsActivitie,
  updateCpsActivitie,
  getSkuTabGoods,
  getCpsJdProduct,
  getCpsJdProductType,
  getCpsPddProduct, // 拼多多
  getCpsPddProductType,
  getCpsWphProduct, //唯品会商品列表
} from "@/api/shops";
const isInArray = (single, arr) => {
  return (
    arr.findIndex((res) => {
      return res === single;
    }) >= 0
  );
};

export default {
  directives: {
    waves,
  },
  components: {
    uploadImg,
  },

  data() {
    // "product_id": "",
    // "goods_img": ""
    return {
      page: 1,
      tem_type: "",
      total: 0,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      dialogTableVisible5: false,
      form: {
        share_title: "", //分享标题
        share_img: "", //分享图片
        activity_name: "", //活动名称
        activity_type: 2, //活动类型
        act_channel: 1, //活动渠道
        activity_color: "", //背景颜色
        tab_color: "", //背景颜色
        activity_imgs: "", //背景颜色
        index_img: "",
        poster_img: "",
        // coupon_type:'1',
        type_list: [],
      },

      loading: false,
      channelList: [],
      radioChannel: "",
      editId: "",
      currentPage: 1,
      share_img: "",
      fileList: [],
      fileList1: [],
      imgList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      color: "",
      tabColor: "",
      titlecColor: "",
      searchVal: "",
      list: [],
      categorys: [],
      category_id: "",
      stock: "",
      pic: "",
      pic1: "",
      banner_img: "", //一级banner临时存放
      moudleList: [
        {
          isRelonly: false,
          name: "模板1",
          id: 0,
        },
        {
          isRelonly: false,
          name: "模板2",
          id: 1,
        },
        {
          isRelonly: false,
          name: "模板3",
          id: 2,
        },
        {
          isRelonly: false,
          name: "模板4",
          id: 3,
        },
      ],
      typeList: [
        {
          id: "1",
          label: "单张优惠券",
        },
        {
          id: "2",
          label: "专题",
        },
      ],
      queryId: "",
      goodsOptions: [],
      jdGoodsOptions: [],
      bandId: "",
      cid1: "",
      Jdlist: [], //京东
      pddList: [], //拼多多
      pddOption: [],
      pddSelect: "",
      wphList: [],
      searchVal4: "",
    };
  },
  created() {
    let _id = this.$route.query.id;
    this.queryId = _id;
  },
  mounted() {
    // this.getTabGoods(1);
    this.getActivitiesTags();
    if (this.queryId) {
      this.loading = true;
      this.getList(this.queryId);
    }
    this.getTabChannels();
    this.getChannelList();
  },
  methods: {
    getActivitiesTags() {
      getActivitiesTags().then((res) => {
        if (res.data.code == 200) {
          this.categorys = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
          });
        }
      });
    },
    changeCate(id) {
      this.category_id = id;
      this.channel_id = "";
      this.getTabGoods(1);
    },
    // 选择商品
    selecShop(type, id) {
      this.searchVal = "";
      if (this.radioChannel == "") {
        this.$message({ type: "error", message: "请选择商品类型" });
        return;
      }
      // console.log(id,'');

      if (this.radioChannel == 1) {
        //自营
        this.getTabGoods(1);
        this.dialogTableVisible1 = true;
      }

      if (this.radioChannel == 2) {
        //京东
        this.getCpsJdProduct(1);
        this.getCpsJdProductType();
        this.dialogTableVisible2 = true;
      }
      if (this.radioChannel == 3) {
        //拼多多
        this.getCpsPddProduct(1);
        this.getCpsPddProductType();
        this.dialogTableVisible3 = true;
      }
      if (this.radioChannel == 4) {
        //唯品会
        this.getCpsWphProduct(1);
        this.dialogTableVisible4 = true;
      }
      if (this.radioChannel == 5) {
        //淘宝
        this.getCpsTapProductType();
        this.getCpsTaoProduct(1);
        this.dialogTableVisible5 = true;
      }

      this.tem_type = type;
      this.category_id = id;
    },
    successList(res) {
      this.banner_img = res.join(",");
      // console.log(res)
    },
    successList0(res) {
      this.pic = res.join(",");
    },
    successList1(res) {
      this.pic1 = res.join(",");
    },
    otherList(index) {
      this.form.type_list[index].tem_banner = this.banner_img;
    },
    otherList0(idx, index) {
      this.form.type_list[idx].goods_info[index].goods_img = this.pic;
    },
    otherList1(idx, index) {
      this.form.type_list[idx].goods_info[index].small_goods_img = this.pic1;
    },
    //推荐图
    successListIndex(res) {
      this.form.index_img = res.join(",");
    },

    // //海报图
    // successListPoster(res) {
    // 	this.form.poster_img = res.join(',')
    // 	// console.log(this.form.poster_img,'++++++');

    // },

    successListPoster(res, file) {
      this.form.poster_img = file.response.url;
    },

    successListSmallPoster(res, file) {
      this.form.small_poster_img = file.response.url;
    },

    // 颜色值
    colorChange(val) {
      this.form.activity_color = val;
    },

    // 颜色值
    tabColorChange(val) {
      this.form.tab_color = val;
    },

    tabColorChange2(val) {
      this.form.title_color = val;
    },

    // 选择推广渠道
    isChange(idx, id) {
      this.form.type_list.push({
        tem_type: id,
        tem_height: "",
        tem_sort: "",
        tem_banner: "",
        goods_img_height: "",
        goods_info: [],
      });
    },
    // 删除模板
    delMoudle(idx, index, show) {
      this.$confirm("此操作将直接删除该模板无需保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (show || show == 0) {
            deletItemeCpsGoods({
              activity_id: this.form.id,
              tem_sort: show,
            }).then((res) => {
              if (res.data.code == 200) {
                //排序有可能不对 所以根据tem_type
                // this.moudleList[idx].isRelonly = false;
                //根据索引
                this.form.type_list.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error(res.data.msg || "网络开小差了~");
              }
            });
          } else {
            //排序有可能不对 所以根据tem_type
            // this.moudleList[idx].isRelonly = false;
            //根据索引
            this.form.type_list.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除产品
    delItem(item, dataList, idx) {
      this.$confirm("此操作将直接删除该产品无需保存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (item.id) {
            deleteCpsActivitieGood({
              id: item.id,
            }).then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                dataList.splice(idx, 1);
                this.loading = true;
                this.getList(this.$route.query.id);
              } else {
                this.$message.error(res.data.msg || "网络开小差了~");
              }
            });
          } else {
            dataList.splice(idx, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 推广渠道
    getTabChannels() {
      getTabChannels().then((res) => {
        console.log(res);
        this.cities = res.data;
      });
    },

    //1:自营，2:京东，3:拼多多，4:唯品会，5:淘宝
    getChannelList() {
      this.channelList = [
        { channel_name: "自营", id: "1" },
        { channel_name: "京东", id: "2" },
        { channel_name: "拼多多", id: "3" },
        // { channel_name: "唯品会", id: "4" },
        { channel_name: "淘宝", id: "5" },
      ];
    },
    // 回显
    getList(cid) {
      let _this = this;
      var obj = "?id=" + cid;
      getCpsActivitie(obj)
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            _this.form = res.data.data;
            console.log(res.data.data);
            _this.form.coupon_type = _this.form.coupon_type
              ? String(_this.form.coupon_type)
              : "1";
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
    onSubmit() {
      // console.log(this.form, "保存数据");
      var self = this;
      //判断重复商品
      let con_list = self.form.type_list;
      let _arrcon = [];
      con_list.map((val) => {
        _arrcon = _arrcon.concat(val.goods_info);
      });
      console.log(_arrcon);
      let s_uert = self.Wunique(_arrcon);
      if (s_uert.length > 0) {
        self.$message({
          type: "error",
          message: s_uert[0].product_name,
        });
        return false;
      }
      if (self.form.share_title == "") {
        self.$message({
          type: "error",
          message: "请输入分享标题",
        });
        return false;
      }
      if (self.form.share_img == "") {
        self.$message({
          type: "error",
          message: "请选择分享封面",
        });
        return false;
      }
      if (self.form.activity_name == "") {
        self.$message({
          type: "error",
          message: "请输入活动名称",
        });
        return false;
      }

      if (this.form.activity_color == "") {
        self.$message({
          type: "error",
          message: "请输入背景颜色",
        });
        return false;
      }
      if (self.form.activity_imgs == "") {
        self.$message({
          type: "error",
          message: "请输入背景颜色",
        });
        return false;
      }
      if (this.$route.query.id) {
        var data = _.clone(this.form);
        data.id = this.$route.query.id;
        updateCpsActivitie(data).then((res) => {
          if (res.data.code == 200) {
            self.$message({
              message: "修改成功",
              type: "success",
            });
            self.$router.push("/operate/activity");
          } else {
            self.$message({
              message: res.data.msg || "修改失败",
              type: "error",
            });
          }
        });
      } else {
        var data = _.clone(this.form);
        addCpsActivitie(data).then((res) => {
          if (res.data.code == 200) {
            self.$message({
              message: "添加成功",
              type: "success",
            });
            self.$router.push("/operate/activity");
          } else {
            self.$message({
              message: res.data.msg || "添加失败",
              type: "error",
            });
          }
        });
      }
    },
    // 查重
    Wunique(arr) {
      var res = [];
      var lde = [];
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i].product_id]) {
          obj[arr[i].product_id] = 1;
          res.push(arr[i]);
        } else {
          lde.push(arr[i]);
        }
      }
      return lde;
    },
    radioChange: function (val) {
      this.currentPage = 1;
      this.radioChannel = val;
      // console.log(this.radioChannel,'dsafdsaf')
      // this.getFirstCategorys(val)
      // this.list = [];
      // this.getTabGoods(1);
    },
    // 选择商品
    choseId(item) {
      console.log(item, "itemitemitem");
      var goodsInfo = this.form.type_list[this.tem_type].goods_info;
      var idx = this.form.type_list[this.tem_type].goods_info.length;
      var obj = {
        activity_id: "",
        goods_name: "",
        id: "",
        product_id: "",
        category_id: "",
        identity_tag: "",
        category_first_name: "",
        goods_img: "",
        product_price: "",
        //京东
        skuName: "",
        imageInfo: "",
      };
      obj.category_first_name = item.category_first_name;
      obj.category_id = item.category_id;
      // obj.identity_tag = item.identity_tag;
      obj.product_id = item.gid;
      obj.goods_name = item.goods_name;
      obj.goods_img = item.goods_img;
      // obj.skuInfo = item.skuInfo;
      obj.product_name = item.goods_name;
      obj.product_type = this.radioChannel;

      if (this.radioChannel == 5) {
        obj.product_price = item.vip_price;
        obj.market_price = item.original_price;
        obj.commission_rate = item.commission_rate;
        obj.product_type_name = "淘宝";
      } else if (this.radioChannel == 1) {
        obj.product_price = item.skuInfo[0].vip_price;
        obj.market_price = item.skuInfo[0].price;
        obj.sku_id = item.sku_id;
        obj.channelName = item.channelName;
        obj.product_type_name = "自营";
      } else if (this.radioChannel == 2) {
        //京东
        obj.market_price = item.priceInfo.price;
        obj.product_price =
          item.priceInfo.lowestCouponPrice || item.priceInfo.lowestPrice;
        obj.product_type_name = "京东";
      } else if (this.radioChannel == 3) {
        //拼多多
        obj.product_price = item.info.jh_price;
        obj.market_price = item.info.min_normal_price;
        obj.product_type_name = "拼多多";
      } else if (this.radioChannel == 4) {
        //唯品会
        obj.product_price = item.marketPrice;
        obj.product_type_name = "唯品会";
      }
      obj.activity_id = this.$route.query.id || "";
      if (goodsInfo.length == 0) {
        this.form.type_list[this.tem_type].goods_info[idx] = obj; //官网价
        this.dialogTableVisible = false;
      } else {
        // 比较是否重复选中
        var isArr = [];
        goodsInfo.map((json) => {
          isArr.push(json.product_id);
        });
        if (isInArray(item.gid, isArr)) {
          this.$message({
            type: "info",
            message: "不能选择相同产品",
          });
        } else {
          // console.log(isArr, "isArr");
          // console.log(item.product_id, "item.product_id");
          this.form.type_list[this.tem_type].goods_info[idx] = obj; //官网价
          // this.dialogTableVisible = false;
        }
      }

      if (this.radioChannel == 1) {
        //自营
        this.dialogTableVisible1 = false;
      }
      if (this.radioChannel == 2) {
        //京东
        this.dialogTableVisible2 = false;
      }
      if (this.radioChannel == 3) {
        //拼多多
        this.dialogTableVisible3 = false;
      }
      if (this.radioChannel == 4) {
        //唯品会
        this.dialogTableVisible4 = false;
      }
      if (this.radioChannel == 5) {
        //淘宝
        this.dialogTableVisible5 = false;
      }
    },
    handleCurrentChange1(val) {
      this.getTabGoods(val);
    },

    handleCurrentChange2(val) {
      this.getCpsJdProduct(val);
    },
    handleCurrentChange3(val) {
      this.getCpsPddProduct(val);
    },
    handleSizeChange4(val) {
      this.page = val;
      this.getCpsWphProduct();
    },
    handleCurrentChange4(val) {
      this.page = val;
      this.getCpsWphProduct();
    },

    handleCurrentChange5(val) {
      this.getCpsTaoProduct(val);
    },
    //自营
    getTabGoods(page) {
      let _this = this;
      let data = {
        page: page,
        channel_id: 0,
      };
      if (this.searchVal) {
        data["goods_name"] = this.searchVal;
      }
      getSkuTabGoods(data)
        .then((res) => {
          if (res.data.code == 200) {
            let _data = res.data.data;
            _data.map((val) => {
              let vip_price = 0,
                price = 0;
              if (val.skuInfo.length > 0) {
                vip_price = val.skuInfo[0].vip_price;
                price = val.skuInfo[0].price;
              }
              (val.product_name = val.goods_name),
                (val.product_type = _this.radioChannel),
                (val.product_price = vip_price);
              val.market_price = price;
              val.sku_id = val.sku_id;
              val.channelName = val.channelName;
              // console.log(val.channelName,"====")
            });
            _this.list = _data;
            _this.total = res.data.count;
            console.log(_this.list, "23232323");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt = file.size / 1024 < 500;
      // if (!isJPG) {
      // 	this.$message.error('图片只能是 JPG/PNG 格式!');
      // }
      if (!isLt) {
        this.$message.error("图片大小不能超过 500K!");
      }
      return isLt;
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
      }
      if (!isLt) {
        this.$message.error("图片大小不能超过 500K!");
      }
      return isJPG && isLt;
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleOnExceed(file, fileList) {
      this.$message({
        type: "error",
        message: "最多上传两张图片",
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.share_img = file.response.url;
    },
    handleAvatarSuccess1(res, file) {
      this.form.activity_imgs = file.response.url;
    },
    //淘宝
    getCpsTaoProduct(page) {
      let data = {
        page: page,
        goodName: this.searchVal,
        bandId: this.bandId,
      };
      getCpsTaoProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            let _data = res.data.data.list;
            _data.map((val) => {
              (val.product_name = val.goods_name),
                (val.product_type = this.radioChannel),
                (val.product_price = val.vip_price);
              val.market_price = val.original_price;
              val.commission_rate = val.commission_rate;
            });
            this.list = _data;
            this.total = res.data.data.total;
          } else {
            this.list = [];
            this.total = 0;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCpsTapProductType() {
      getCpsTapProductType().then((res) => {
        this.goodsOptions = res.data.data;
      });
    },

    //京东
    getCpsJdProduct(page) {
      let data = {
        page: page,
        keyword: this.searchVal,
        cid1: this.cid1,
      };
      getCpsJdProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            let _data = res.data.data;
            _data.map((val) => {
              (val.goods_name = val.skuName), //
                (val.product_type = this.radioChannel),
                (val.market_price = val.priceInfo.price),
                (val.product_price =
                  val.priceInfo.lowestCouponPrice || val.priceInfo.lowestPrice),
                (val.goods_img = val.imageInfo.imageList[0].url);
              val.gid = val.skuId;
            });
            this.list = _data;
            this.total = res.data.total;
            // console.log(this.list,'23232q11');
          } else {
            this.list = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCpsJdProductType() {
      getCpsJdProductType().then((res) => {
        this.jdGoodsOptions = res.data.data;
      });
    },
    //拼多多
    getCpsPddProduct(page) {
      let data = {
        page: page,
        keyword: this.searchVal,
        tid: this.pddSelect,
      };
      getCpsPddProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            this.pddList = res.data.data;
            this.total = res.data.total;
            // console.log(this.list,"===++++")
            this.pddList.map((val) => {
              (val.goods_name = val.info.goods_name),
                (val.product_type = this.radioChannel);
              (val.product_price = val.info.jh_price),
                (val.market_price = val.info.min_normal_price),
                (val.goods_img = val.info.goods_image_url);
              val.gid = val.info.goods_id;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCpsPddProductType() {
      getCpsPddProductType().then((res) => {
        this.pddOption = res.data.data.doc;
      });
    },
    getCpsWphProduct(page) {
      let data = {
        page: this.page,
        channelType: 1,
        keyword: this.searchVal4,
      };
      // 唯品会商品列表
      getCpsWphProduct(data)
        .then((res) => {
          if (res.data.code == 200) {
            this.wphList = res.data.data;
            // console.log(this.wphList,"===++++")
            this.wphList.goodsInfoList.map((val) => {
              (val.goods_name = val.goodsName),
                (val.product_type = this.radioChannel);
              (val.product_price = val.marketPrice),
                (val.goods_img = val.goodsMainPicture);
              val.gid = val.goodsId;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
p {
  margin: 0;
  padding: 0;
}
.el-form-item__content span {
  clear: both;
}

.list_border {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px 0;

  /deep/ .el-form-item__label {
    color: #409eff;
  }
}

.list_info {
  overflow: hidden;
  margin-bottom: 20px;
}

.pic {
  float: left;

  .tit_p {
    margin: 0;
    color: #f00;
  }
}

.input_list {
  float: left;
  width: 220px;
  margin-left: 20px;
  margin-top: 26px;

  .el-input--medium {
    margin-top: 10px;
  }
}

/deep/ .avatar-uploader {
  float: left;
  height: 96px;
  border-radius: 5px;
  margin-left: 10px;
}

/deep/ .el-input__inner {
  // width: 400px;
}

.el-form-item__content .avatar-uploader {
  float: none;
}

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

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 88px;
  height: 88px;
}

/deep/ .el-upload--picture-card {
  display: inline-block;
  width: 88px;
  height: 88px;
  line-height: 90px;
}

.avatar {
  width: 88px;
  height: 88px;
  display: block;
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

  li.selectName {
    padding-top: 10px;
    margin: 15px 0;
    background: #f1f1f1;
  }

  li.small_bg.selectName {
    // width: 480px;
  }
  // 模板4

  .imgDiv {
    float: left;
    background: #fff;
    width: 70px;
    height: 70px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .section-p {
    width: 500px;
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
}

/deep/ .del_item .el-button--danger.is-plain {
  padding: 0;
  width: 50px;
  height: 25px;
}

.background_color {
  position: relative;
  width: 405px;
}

.background_color .el-input__inner {
  width: auto;
}

.color_name {
  position: absolute;
  right: 0;
  top: 0;
}

.is_relonly {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.del_moudle {
  position: absolute;
  top: 35px;
  right: 20px;
}

.select_shop {
  position: absolute;
  top: 80px;
  right: 20px;
}

.activity_price.el-input--mini {
  width: 166px;
}

.activity_price.el-input--mini .el-input__inner {
  width: 166px;
}
</style>
