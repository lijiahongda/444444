<template>
  <div class="gropAdd"
       v-loading="loading">
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
    <el-form ref="form"
             :model="form"
             label-width="80px">
    <el-form-item label="主标题"
                    prop="main_title"
                    class="background_color">
        <el-input v-model="form.main_title"
                  placeholder="请输入主标题"></el-input>
      </el-form-item>
    <el-form-item label="副标题"
                    prop="subtitle"
                    class="background_color">
        <el-input v-model="form.subtitle"
                  placeholder="请输入副标题"></el-input>
      </el-form-item>

      <el-form-item label="分享标题"
                    prop="share_title"
                    class="background_color">
        <el-input v-model="form.share_title"
                  placeholder="请输入分享标题"></el-input>
      </el-form-item>
      <el-form-item label="分享封面"
                    prop="share_img">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload1">
          <img v-if="form.share_img"
               :src="form.share_img"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:750*770,500kb以内</span>
      </el-form-item>
      <el-form-item label="活动名称"
                    class="background_color">
        <el-input v-model="form.activity_name"
                  placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动类型"
                    class="background_color">
        <el-radio v-model="form.activity_type"
                  :label="0">默认活动</el-radio>
        <el-radio v-model="form.activity_type"
                  :label="1">会员专属</el-radio>
      </el-form-item>
      <!-- 活动渠道---隐藏 -->
      <!--<el-form-item label="活动渠道"
                    class="background_color">
        <el-radio v-model="form.act_channel"
                  :label="1">悦淘</el-radio>
        <el-radio v-model="form.act_channel"
                  :label="2">cps</el-radio>
      </el-form-item> -->
      <el-form-item label="背景图片">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess1"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.activity_imgs"
               :src="form.activity_imgs"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span>尺寸:421*375,500kb以内</span>
      </el-form-item>
      <el-form-item label="背景颜色"
                    class="background_color">
        <el-input readonly
                  maxlength="8"
                  v-model="form.activity_color"
                  placeholder="请选择背景颜色"></el-input>
        <el-color-picker v-model="color"
                         @change="colorChange"
                         class="color_name"></el-color-picker>
      </el-form-item>

      <el-form-item label="导航栏颜色"
                    class="background_color">
        <el-input readonly
                  maxlength="8"
                  v-model="form.tab_color"
                  placeholder="请选择导航栏颜色"></el-input>
        <el-color-picker v-model="tabColor"
                         @change="tabColorChange"
                         class="color_name"></el-color-picker>
      </el-form-item>

    <el-form-item label="导航栏字体颜色"
                    class="background_color">
        <el-input readonly
                  maxlength="8"
                  v-model="form.title_color"
                  placeholder="请选择导航栏字体颜色"></el-input>
        <el-color-picker v-model="titlecColor"
                         @change="tabColorChange2"
                         class="color_name"></el-color-picker>
      </el-form-item>
      <el-form-item label="推荐图"
                    class="background_color"
                    style="width: 720px;">
        <uploadImg :limit="5"
                   :imgList="form.index_img"
                   @successList="successListIndex"></uploadImg>
        <!-- <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
				 :on-success="successListIndex">
					<img v-if="form.index_img" :src="form.index_img" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
      </el-form-item>

      <el-form-item label="海报图"
                    class="background_color"
                    style="width: 720px;">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="successListPoster">
          <img v-if="form.poster_img"
               :src="form.poster_img"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <uploadImg :imgList="form.poster_img" @successList="successListPoster"></uploadImg> -->
      </el-form-item>

      <el-form-item label="小程序海报图"
                    class="background_color"
                    style="width: 720px;">
        <el-upload class="avatar-uploader"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :show-file-list="false"
                   :on-success="successListSmallPoster">
          <img v-if="form.small_poster_img"
               :src="form.small_poster_img"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <uploadImg :imgList="form.poster_img" @successList="successListPoster"></uploadImg> -->
      </el-form-item>

      <!-- <el-form-item label="优惠券类型:" prop="coupon_type">
        <el-select v-model="form.coupon_type" placeholder="请选择">
          <el-col>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="优惠券id" prop="coupon_id" v-if="form.coupon_type==1">
        <el-input v-model="form.coupon_id" placeholder="请输入优惠券id" style="width:300px"/>
      </el-form-item>

      <el-form-item label="专题id" prop="coupon_id" v-if="form.coupon_type==2">
        <el-input v-model="form.coupon_id" placeholder="请输入专题id" style="width:300px"/>
      </el-form-item> -->

      <el-form-item label="添加优惠券专题ID"
                    class="background_color"
                    style="width: 720px;">
        <el-input maxlength="8"
                  v-model="form.coupon_id"
                  placeholder="请输入优惠券专题ID"></el-input>
      </el-form-item>

      <el-form-item label="绑定活动ID"
                    class="background_color"
                    style="width: 720px;">
        <el-input maxlength="8"
                  v-model="form.bind_active_id"
                  placeholder="绑定活动ID"></el-input>
      </el-form-item>

      <el-form-item label="选择模板"
                    class="background_color"
                    style="width: 530px;">
        <el-button :class="item.isRelonly?'is_relonly':''"
                   v-for="(item,idx) in moudleList"
                   :key="idx"
                   @click="isChange(idx,item.id)">{{item.name}}</el-button>
      </el-form-item>
      <el-form-item :label="'模板'+(parseInt(list.tem_type)+1)"
                    prop="goods_id"
                    class="list_border"
                    v-for="(list,idx) in form.type_list"
                    :key="idx">
        <div class="list_info">
          <div class="pic">
            <p class="tit_p">请上传一张Banner图</p>
            <uploadImg :limit="1"
                       :imgList="list.tem_banner"
                       @successList="successList"
                       @otherList="otherList(idx)"></uploadImg>
          </div>
          <div class="input_list">
            <el-form label-width="100px"
                     style="width: 550px;">

              <el-form-item label="身份标签：">
                <el-select v-model="list.identity_tag"
                           placeholder="请选择身份标签"
                           clearable>
                  <el-option v-for="item in identity_tags"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="标签：">
                <el-select v-model="list.category_id"
                           placeholder="请选择标签"
                           @change="changeCate"
                           clearable>
                  <el-option v-for="item in categorys"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签排序：">
                <el-input v-model="list.category_sort"
                          placeholder="排序数字越大越靠前"
                          type="number"
                          style="display: inline-block;width: 166px;"></el-input>
              </el-form-item>
              <el-form-item label="模版排序：">
                <el-input v-model="list.tem_sort"
                          placeholder="排序数字越大越靠前"
                          type="number"
                          style="display: inline-block;width: 166px;"></el-input>
              </el-form-item>
              <el-form-item label="渠道:"
                            class="background_color">
                <el-radio-group v-model="list.channel_id"
                                @change="radioChange"
                                style="width: 440px">
                  <el-radio v-for="item in channelList"
                            :key="item.id"
                            :label="item.id">
                    {{item.channel_name}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="高度：">
                <el-input v-model="list.tem_height"
                          placeholder="banner高度,例:100"
                          type="number"
                          style="display: inline-block;width: 166px;"></el-input>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <el-button type="primary"
                   @click="selecShop(idx,list.category_id)"
                   plain
                   class="select_shop">选择商品
        </el-button>
        <div v-if="list.goods_info.length !=0"
             class="commodity">
          <ul>
            <li style="border:none;display:flex;align-items: center;justify-content: space-between;"
                v-for="(item,index) in list.goods_info"
                :key="index"
                :class="list.tem_type == 0||list.tem_type == 1||list.tem_type == 2?'selectName':'selectName small_bg'">
              <div class="flex-item">
                <uploadImg :limit="1"
                           :imgList="item.goods_img"
                           @successList="successList0"
                           @otherList="otherList0(idx,index)"
                           v-if="list.tem_type == 0||list.tem_type == 1">
                </uploadImg>
              </div>
              <!--<div class="flex-item">
								<span style="">活动价:</span>
								<input v-model="item.activity_price" type="number" placeholder="活动价,例:100"
									style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
							</div>-->
              <div class="flex-item">
                <div v-if="list.tem_type == 0||list.tem_type == 1"
                     style="margin-bottom: 5px;display: flex;flex-direction: column;">

                  <div>
                    <span style="margin:10px 10px 0 10px">高度:</span>
                    <input v-model="item.goods_img_height"
                           type="number"
                           placeholder="图片高度,例:100"
                           style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                  </div>
                  <div>
                    <span style="margin:10px 10px 0 10px">排序:</span>
                    <input v-model="item.goods_sort"
                           type="number"
                           placeholder="排序数字越大越靠前"
                           style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                  </div>

                  <div>
                    <span style="margin:10px 10px 0 10px">成长值:</span>
                    <input v-model="item.growth_value"
                           type="number"
                           placeholder="成长值"
                           style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                  </div>
                  <template v-if="item.category_first_name">
                    <span>标 签:{{item.category_first_name}}</span>
                  </template>
                </div>
              </div>
              <div class="flex-item"
                   v-if="list.tem_type ==2||list.tem_type ==3 "
                   style="margin-left: 10px;">
                <span style="margin-top:10px;margin-right: 10px;">排序:</span>
                <input v-model="item.goods_sort"
                       type="number"
                       placeholder="排序数字越大越靠前"
                       style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                <div>
                  <span style="margin:10px 10px 0 10px">成长值:</span>
                  <input v-model="item.growth_value"
                         type="number"
                         placeholder="成长值"
                         style="display: inline-block;width: 166px;height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                </div>
                <template v-if="item.category_first_name">
                  <span>标 签:{{item.category_first_name}}</span>
                </template>
              </div>
              <div class="flex-item">
                <div class="section-p"
                     style="width:400px">
                  <span v-if="list.tem_type ==2||list.tem_type ==3">名称:</span><span v-text="item.goods_name"></span>
                </div>
              </div>
              <div class="flex-item">
                <div v-for="(self,index) in item.skuInfo"
                     :key="index">
                  <span>官网价：{{self.price}}</span>
                  <span>成本价：{{self.buy_price}} </span>
                  <span>库存：{{self.inventory}}</span>
                  <span style="">活动价:</span>
                  <input v-model="self.activity_price"
                         class="activity_price"
                         size="mini"
                         placeholder="活动价,例:100"
                         style="height: 36px;line-height: 36px;border-radius: 4px;border: 1px solid #ccc;padding-left: 10px;" />
                </div>
              </div>
              <div class="flex-item">
                <div>
                  <uploadImg :limit="1"
                             :imgList="item.small_goods_img"
                             @successList="successList1"
                             @otherList="otherList1(idx,index)"
                             v-if="list.tem_type == 0||list.tem_type == 1"></uploadImg>
                </div>
              </div>
              <el-button type="danger"
                         style="margin-left: 20px;"
                         plain
                         @click='delItem(item,list.goods_info,index)'>删除
              </el-button>

            </li>
          </ul>
        </div>
        <el-button type="danger"
                   plain
                   class="del_moudle"
                   @click="delMoudle(list.tem_sort,idx,list.tem_show)">
          删除模板</el-button>
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
import uploadImg from '../../public/uploadImg'
import {
  tabGoods,
  getBargain,
  getSeckill,
  getTabChannels,
  getChannelList,
  addSeckill,
  updateSeckill,
  addActivitie,
  getActivitie,
  updateActivitie,
  deleteActivitieGood,
  deletItemeGoods,
  getActivitiesTags,
  getFirstCategorys,
  getSkuTabGoods
} from '@/api/shops'
const isInArray = (single, arr) => {
  return (arr.findIndex(res => {
    return res === single
  })) >= 0
}

//0 普通 1 金卡，2白金，3黑卡
const identity_tags = [
    { id: -1, name: '全部' },
    { id: 0, name: '普通' },
    { id: 1, name: '金卡' },
    { id: 2, name: '白金' },
    { id: 3, name: '黑卡' },
]

export default {
  directives: {
    waves
  },
  components: {
    uploadImg
  },


  
  data () {
    // "product_id": "",
    // "goods_img": ""
    return {
      identity_tags,
      tem_type: "",
      total: 1,
      dialogTableVisible: false,
      form: {
        share_title: '', //分享标题
        share_img: '', //分享图片
        activity_name: '', //活动名称
        activity_type: 0, //活动类型
        act_channel: 1, //活动渠道
        activity_color: '', //背景颜色
        tab_color: '', //背景颜色
        activity_imgs: '', //背景颜色
        index_img: "",
        poster_img: '',
        // coupon_type:'1',
        type_list: [],
      },

      loading: false,
      channelList: [],
      radioChannel: '',
      editId: '',
      currentPage: 1,
      share_img: '',
      fileList: [],
      fileList1: [],
      imgList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      color: '',
      tabColor: '',
      titlecColor:'',
      searchVal: '',
      list: [],
      categorys: [],
      category_id: '',
      stock: '',
      pic: "",
      pic1: '',
      banner_img: "", //一级banner临时存放
      moudleList: [{
        isRelonly: false,
        name: "模板1",
        id: 0,
      }, {
        isRelonly: false,
        name: "模板2",
        id: 1,
      },
      {
        isRelonly: false,
        name: "模板3",
        id: 2,
      }, {
        isRelonly: false,
        name: "模板4",
        id: 3,
      }
      ],
      typeList: [{
        id: "1",
        label: "单张优惠券"
      },
      {
        id: "2",
        label: "专题"
      },
      ],
      queryId:"",
    }
  },
  created(){
    let _id = this.$route.query.id;
    this.queryId = _id;
  },
  mounted () {
    this.getTabGoods(1)
    this.getActivitiesTags()
    if (this.queryId) {
      this.loading = true;
      this.getList(this.queryId)
    }
    this.getTabChannels()
    this.getChannelList();

  },
  methods: {
    getActivitiesTags () {
      getActivitiesTags().then(res => {
        if (res.data.code == 200) {
          this.categorys = res.data.data;
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
        }
      })

    },
    changeCate (id) {
      this.category_id = id
      this.channel_id = ''
      this.getTabGoods(1);
    },
    selecShop (type, id) {
      this.dialogTableVisible = true;
      this.tem_type = type
      this.category_id = id
    },
    successList (res) {
      this.banner_img = res.join(",")
      // console.log(res)
    },
    successList0 (res) {
      this.pic = res.join(',')
    },
    successList1 (res) {
      this.pic1 = res.join(',')
    },
    otherList (index) {
      this.form.type_list[index].tem_banner = this.banner_img;
    },
    otherList0 (idx, index) {
      this.form.type_list[idx].goods_info[index].goods_img = this.pic;
    },
    otherList1 (idx, index) {
      this.form.type_list[idx].goods_info[index].small_goods_img = this.pic1;
    },
    //推荐图
    successListIndex (res) {
      this.form.index_img = res.join(',')
    },

    // //海报图
    // successListPoster(res) {
    // 	this.form.poster_img = res.join(',')
    // 	// console.log(this.form.poster_img,'++++++');

    // },

    successListPoster (res, file) {
      this.form.poster_img = file.response.url;
    },

    successListSmallPoster (res, file) {
      this.form.small_poster_img = file.response.url;
    },


    // 颜色值
    colorChange (val) {
      this.form.activity_color = val
    },

    // 颜色值
    tabColorChange (val) {
      this.form.tab_color = val
    },
    
    tabColorChange2 (val) {
      this.form.title_color = val
    },

    // 选择推广渠道
    isChange (idx, id) {
      // //判断是否已经选中
      // if (this.moudleList[idx].isRelonly == true) {
      // 	return false;
      // }
      // this.moudleList[idx].isRelonly = true;
      this.form.type_list.push({
        "tem_type": id,
        "tem_height": "",
        "tem_sort": "",
        "tem_banner": "",
        "goods_img_height": "",
        "goods_info": []
      })
    },
    // 删除模板
    delMoudle (idx, index, show) {
      this.$confirm('此操作将直接删除该模板无需保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (show || show == 0) {
          deletItemeGoods({
            activity_id: this.form.id,
            tem_sort: show
          }).then(res => {
            if (res.data.code == 200) {
              //排序有可能不对 所以根据tem_type
              // this.moudleList[idx].isRelonly = false;
              //根据索引
              this.form.type_list.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

            } else {
              this.$message.error(res.data.msg || "网络开小差了~")
            }
          })
        } else {
          //排序有可能不对 所以根据tem_type
          // this.moudleList[idx].isRelonly = false;
          //根据索引
          this.form.type_list.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除产品
    delItem (item, dataList, idx) {
      this.$confirm('此操作将直接删除该产品无需保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (item.id) {
          deleteActivitieGood({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              })
              dataList.splice(idx, 1)
              this.loading = true;
              this.getList(this.$route.query.id)
            } else {
              this.$message.error(res.data.msg || "网络开小差了~")
            }
          })
        } else {
          dataList.splice(idx, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
      getActivitie(obj).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          _this.form = res.data.data
          _this.form.coupon_type = _this.form.coupon_type ? String(_this.form.coupon_type) : '1'

        }
      }).catch((error) => {
        console.log(error, 'error')
      })
    },
    onSubmit () {
      console.log(this.form, '保存数据')
      // return
      var self = this;
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
          message: '商品id:'+s_uert[0].product_id+','+s_uert[0].goods_name+',重复!',
        });
        return false;
      }
      if (self.form.share_title == '') {
        self.$message({
          type: "error",
          message: '请输入分享标题'
        })
        return false;
      }
      if (self.form.share_img == '') {
        self.$message({
          type: "error",
          message: '请选择分享封面'
        })
        return false;
      }
      if (self.form.activity_name == '') {
        self.$message({
          type: "error",
          message: '请输入活动名称'
        })
        return false;
      }

      if (this.form.activity_color == '') {
        self.$message({
          type: "error",
          message: '请输入背景颜色'
        })
        return false;
      }
      if (self.form.activity_imgs == '') {
        self.$message({
          type: "error",
          message: '请输入背景颜色'
        })
        return false;
      }
      if (this.$route.query.id) {
        var data = _.clone(this.form)
        data.id = this.$route.query.id;
        this.loading = true;
        updateActivitie(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '修改成功',
              type: 'success',
            })
            self.$router.push('/operate/activity')
          } else {
            self.$message({
              message: res.data.msg || '修改失败',
              type: 'error',
            })
          }
           this.loading = false;

        })
      } else {
        var data = _.clone(this.form)
         this.loading = true;
        addActivitie(data).then(res => {
          if (res.data.code == 200) {
            self.$message({
              message: '添加成功',
              type: 'success',
            })
            self.$router.push('/operate/activity')
          } else {
            self.$message({
              message: res.data.msg || '添加失败',
              type: 'error',
            })
          }
           this.loading = false;

        })
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
      // this.getFirstCategorys(val)
      this.list = [];
      this.getTabGoods(1)
    },
    // 选择商品
    choseId (item) {
      console.log(item, 'itemitemitem')
      var goodsInfo = this.form.type_list[this.tem_type].goods_info;
      var idx = this.form.type_list[this.tem_type].goods_info.length;
      var obj = {
        activity_id: '',
        goods_name: '',
        id: '',
        product_id: '',
        category_id: '',
        identity_tag: '',
        category_first_name: ''
      };
      obj.category_first_name = item.category_first_name;
      obj.category_id = item.category_id;
      obj.identity_tag = item.identity_tag;
      obj.product_id = item.gid;
      obj.goods_name = item.goods_name;
      obj.skuInfo = item.skuInfo;
      obj.activity_id = this.$route.query.id || '';
      if (goodsInfo.length == 0) {
        this.form.type_list[this.tem_type].goods_info[idx] = obj; //官网价
        this.dialogTableVisible = false
      } else {
        // 比较是否重复选中
        var isArr = []
        goodsInfo.map((json) => {
          isArr.push(json.product_id)
        })
        if (isInArray(item.gid, isArr)) {
          this.$message({
            type: 'info',
            message: '不能选择相同产品'
          })
        } else {
          console.log(isArr, 'isArr')
          console.log(item.product_id, 'item.product_id')
          this.form.type_list[this.tem_type].goods_info[idx] = obj; //官网价
          this.dialogTableVisible = false
        }
      }
    },
    handleCurrentChange (val) {
      this.getTabGoods(val)
    },
    getTabGoods (page) {
      let _this = this;
      let data = {
        page: page,
        // category_id: this.category_id,
        channel_id: this.radioChannel
      }
      if (this.searchVal) {
        data['goods_name'] = this.searchVal
      }

      getSkuTabGoods(data).then((res) => {
        if (res.data.code == 200) {
          _this.list = res.data.data
          _this.total = res.data.count
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt = file.size / 1024 < 500;
      // if (!isJPG) {
      // 	this.$message.error('图片只能是 JPG/PNG 格式!');
      // }
      if (!isLt) {
        this.$message.error('图片大小不能超过 500K!');
      }
      return isLt;
    },
    beforeAvatarUpload1 (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt = file.size / 1024 < 500;
      if (!isJPG) {
        this.$message.error('图片只能是 JPG/PNG 格式!');
      }
      if (!isLt) {
        this.$message.error('图片大小不能超过 500K!');
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
    handleAvatarSuccess1 (res, file) {
      this.form.activity_imgs = file.response.url;
    },
  }
}

</script>
<style scoped="scoped" lang="scss">
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
  width: 400px;
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
    width: 480px;
  }

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
