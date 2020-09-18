<template>
  <div class="app-container">
    <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="新闻" name="first">
          <el-form 
                :model="form"
                :rules="rules"
                ref="form"
                label-width="140px"
                :inline="true">
            <el-form-item label="跳转链接">
                <el-input v-model="form.url" placeholder="请在20字以内"  style="width: 450px;" :disabled="isDisabled"/>
            </el-form-item>     
            <el-form-item label="标题">
                <el-input v-model="form.title" placeholder="请在20字以内"  style="width: 450px;" :disabled="isDisabled"/>
            </el-form-item>
            <el-form-item label="发布时间">
                <el-date-picker
                    :disabled="isDisabled"
                    v-model="form.releaseTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.describe"  placeholder="输入描述"  type="textarea"  style="width: 450px;" :disabled="isDisabled"/>
            </el-form-item>
            <el-form-item label="详情" prop="contents">
                <tinymce v-model="form.contents"  :height="300"  placeholder="输入详情" />
            </el-form-item>
            <el-form-item class="save_btn">
              <el-button type="primary" v-if="type==1"   @click="onSubmit()">保存</el-button>
              <el-button type="primary" v-if="type==0"  @click="onAdd()">添加</el-button>
            </el-form-item>
        </el-form>
      </el-tab-pane>
      
    </el-tabs>

  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce';

import _ from 'lodash'
import {
  imgUploadUrl,
} from '@/api/cust'
import {
    addNews,//添加
    news,//详情
    upNews,//编辑
} from '@/api/order'
import {
  getGoodsDistribution,
  getGood,
  getGoodBaseData,
  updateGood,
  addGoods,
  updateGoodSku,
  addGoodSku,
  getChannelCategoryList,
  getSupplierChannelList,
  getSupplierByChannel,
  addMaterialCircle,
  getMaterialCircles,
  delMaterialCircle,
  getMaterialCircle,
  upMaterialCircle,
} from '@/api/shops'
import shopSku from '@/views/newData/newmall/shopSku'
import { constants } from 'crypto';
export default {
  components: {
    Tinymce,
    shopSku
  },
  data () {
    return {
 
      isDisabled:true,
      // searchCondition:{},
      channelList: [{ id: 1, name: '悦旅会APP' }, { id: 2, name: '悦店APP' }],
      form: {},
      disPlayData: [], //子组件回显数据
      list: [], //规格循环次数
      num: 0,
      obj: [],
      shuzu: [],
      abc: [],
      cover: '',
      cover3: '',
      cover4: '',
      cover5: '',
      cover6: '',
      goods_label_one: '',
      goods_label_two: '',
      tableshow: false, //表格是不显示
      goods_activity: [],
      goods_distribution: [],
      goods_label: [],
      goods_supplier: [],
      searchData: {},
      rules: {
        goods_link:[{
          required: true,
          message: '请填写跳转链接',
          trigger: 'blur'
        }],
        goods_name: [{
          required: true,
          message: '请填写标题',
          trigger: 'blur'
        }],
        goods_info:[{
          required: true,
          message: '请填写描述',
          trigger: 'blur'
        }],
        goods_content: [{
          required: true,
          message: '请填写商品详情',
          trigger: 'blur'
        }]
      },
      cost_explain: '',
      // --------图片上传参数----------------
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: this.apiurl.imguploadurl,
      fileListOfMin: [],
      fileListOfBig: [],
      fileListOfDetail: [],
      fileListOfDetailTwo: [],
      fileListOfOther: [],
      numLimit: 5,
      numLimitUser: 6,

      dataStatus: [{
        key: 1,
        display_name: '私人定制'
      },
      {
        key: 2,
        display_name: '企业定制'
      }
      ],
      priceStatus: [{
        key: 11,
        display_name: '接受'
      },
      {
        key: 22,
        display_name: '不接受'
      }
      ],
      dzStatus: [{
        key: 111,
        display_name: '有导游'
      },
      {
        key: 222,
        display_name: '无导游'
      }
      ],
      content: "", //输入框内容
      selectedIndex: -1,
      tripIndex: 0,
      id: 0,
      mid: 0,
      leavecity: '',
      aimcity: '',
      starttime: '',
      endtime: '',
      adjusttime: 0,
      adultnum: 0,
      childnum: 0,
      budget: 0,
      adjustbudget: 0,
      // type: 1,
      contacts: '',
      mobile: '',
      email: '',
      enterprise_name: '',
      customer_number: 1,
      status: 0,
      remarks: '',
      activeName: 'first',
      child: 1,
      tabPan: false,
      tabThree: false,
      InitList: [],
      sku: [],
      product_id: "",
      distributionData: [], //分销规则
      getChannelData: [], //一级分类
      getSupplierData: [], //供应商渠道
      sxl_supplier: [], //供应商


      dialogFormVisible: false,//素材圈
      info: {
        headImg: [], //头像
        nickName: "", //昵称,
        content: "",//内容
        image: [],//图片集合
      },
      rulesUser: {
        headImg: [{
          required: true,
          message: '请选择用户头像',
          trigger: 'blur'
        }],
        nickName: [{
          required: true,
          message: '请填写用户昵称',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请填写内容',
          trigger: 'blur'
        }],
        image: [{
          required: true,
          message: '请选择图片',
          trigger: 'blur'
        }]
      },
      fileListUser: [],//用户头像
      fileListUserAll: [],//商圈图片
      product_id_user: '',
      materialList: [],//素材圈列表
      materialEdit: 0,
      search_name: '',//搜索内容
      pageTotal: 0,   //显示页数
      pageIndex: 1,
      pageSize: 10,
      videoDialog: false,
      videoFileList: [],
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      // isShowUploadVideo: false,
      // //显示上传按钮
      id:"",
      type:0
    }
  },
  mounted () {
    // 接收参数
    if (this.$route.query.id) {
        this.id = this.$route.query.id; // 接受参数
    }
    if (this.$route.query.type) {
        this.type = this.$route.query.type; // 接受参数
    }
    // this.form={}
    if(this.type===1){
       this.isDisabled=false
       this.news()
    }else if(this.type===2){
       this.news()
    }else{
      this.isDisabled=false

    }
    
  },
  methods: {
    //详情
    news () {
      news({
        id:this.id,
        type:this.type
      }).then(res => {
        if (res.data.code == 200) {
         this.form=res.data.data
        } else {
          this.$message.error(res.data.msg || "失败")
        }
      })
    },
    // 分页
    handleSizeChange (val) { },
    handleCurrentChange (val) {
      this.loading = true;
      this.pageIndex = val;
      this.getMaterialCircles()
    },
   //  保存
    onSubmit () {
      upNews(this.form,{
        id:this.id
      }).then(res=>{
          if (res.data.code == 200){
              this.$message({
                message:res.data.msg,
                type: 'success'
              })
              // this.$router.push('/newSection/list') 
          }else{
            this.$message({
               type:"error",
               message:res.data.msg
             })
          }
      })
    },
    // 添加
    onAdd(){
      addNews(this.form).then(res=>{
          if (res.data.code == 200){
              this.$message({
                message:res.data.msg,
                type: 'success'
              })
              this.$router.push('/newSection/list') 
          }else{
            this.$message({
               type:"error",
               message:res.data.msg
             })
          }
      })
    },
    // 数据回显
    getLit: function (gid) {
      getGood(`?id=${gid}`).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.data.result;
          this.disPlayData = res.data.data.result.sku;
          this.sku = res.data.data.result.sku;
          this.form.category = parseInt(res.data.data.result.category) || '';
          if (res.data.data.result.sku.length == 0) {
            this.child = 3;
          }
          if (this.form.sc_id == 0) {
            this.form.sc_id = ''
          }
          //判断有sku才能添加素材圈
          if (this.sku.length) {
            this.tabThree = true
            this.getMaterialCircles()//回显素材圈
          }
          var imgList = res.data.data.result.goods_suggest_image;
          var imgListTwo = res.data.data.result.goods_cover_image.split(' ');
          var videoFileList = res.data.data.result.goods_video_url.split(' ');
          if (res.data.data.result.goods_video_url) {
            this.videoFileList.push({
              'name': "",
              'url': 'https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-01-04/00/yuelvhuirvZYTviIZc1578069666.png'
            });
          }
          this.fileListOfDetail = imgList.map(function (imgObj) {
            return {
              'name': "",
              'url': imgObj
            }
          })
          this.fileListOfDetailTwo = imgListTwo.map(function (imgObj) {
            return {
              'name': "",
              'url': imgObj
            }
          })
          if (this.$route.query.gid) {
            getSupplierByChannel({ sc_id: res.data.data.result.sc_id }).then(res => {
              this.sxl_supplier = res.data.data;
            })
          }
        }
      })
    },
   
  
  },

}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: block;
}

.style_auto {
  width: 100%;
  margin: 0 auto;
}

.save_btn {
   margin: 20px 0 0 300px;
}

/deep/ .el-form-item__error {
  white-space: nowrap !important;
}

/deep/ .list-detail .el-input__inner {
  margin: 5px 0;
}

.columnList {
  border-color: #fff;
}

.columnList td,
th {
  padding: 10px 15px;
  text-align: center;
}

.columnList td input {
  width: 100px;
}

.upload_btn {
  width: 80px;
  position: relative;
  display: inline-block;
}

.upload_btn input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 80px;
  opacity: 0;
  bottom: 0;
}

.wrap {
  overflow: hidden;
}

.list {
  clear: both;
  overflow: hidden;
}

.item_list {
  position: relative;
  float: left;
  margin: 0 10px;
}

.item_del {
  position: absolute;
  left: 165px;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 100%;
  top: 8px;
}

.item_del.del {
  left: 230px;
}

.list_title {
  float: left;
  line-height: 44px;
  color: #409eff;
}

table {
  width: 50%;
  max-width: 100%;
  border: none;
}

th {
  background-color: #409eff;
  color: #fff;
  border: 1px solid #fff;
  padding: 8px;
  font-weight: normal;
  white-space: nowrap;
}

td {
  background-color: #efefef;
  border: 1px solid #fff;
  padding: 8px;
}

.img_list {
  position: relative;
}

.img_list div {
  position: absolute;
  top: 50%;
  margin-top: -25px;
  left: 50%;
  margin-left: -25px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 20px;
  padding: 0;
  border: none;
  opacity: 0;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.img_list:hover div {
  opacity: 1;
  transition: all 0.3s;
}
</style>
