<template>
  <div class="app-container">
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="新增商品"
                   name="first">
        <el-form :model="form"
                 :rules="rules"
                 class="style_auto"
                 ref="form"
                 label-width="140px"
                 :inline="true">
          <el-form-item label="商品名称"
                        prop="goods_name">
            <el-input v-model="form.goods_name"
                      placeholder="请在20字以内"
                      style="width: 450px;"
                      disabled />
          </el-form-item>
			<el-form-item label="商品属性标签">
				<el-input v-model="form.attr_name"
						  placeholder="请输入商品标签"
						  style="width: 450px;"
						  disabled />
			</el-form-item>
			<el-form-item label="成长值">
				<el-input v-model="form.growth_value"
						  placeholder="请输入成长值"
						  style="width: 450px;"
						   />
			</el-form-item>
          <el-form-item label="是否可用优惠券"
                        prop="goods_coupon">
            <el-radio-group v-model="form.goods_coupon">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否每日特惠"
                        prop="goods_discount">
            <el-radio-group v-model="form.goods_discount">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否虚拟"
                        prop="goods_classify">
            <el-radio-group v-model="form.goods_classify">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="是否售卖"
                        prop="is_sell">
            <el-radio-group v-model="form.is_sell">
              <el-radio :label="1">售卖</el-radio>
              <el-radio :label="0">不售卖</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="供应商渠道:" prop="sc_id" >
						<el-select v-model="form.sc_id" clearable placeholder="供应商渠道" @change="onChangeSupplier(form.sc_id)">
							<el-option v-for="item in getSupplierData" :key="item.id" :label="item.name" :value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="供应商" prop="supplier_id" v-if="form.sc_id != ''" clearable >
						<el-select v-model="form.supplier_id" placeholder="请选择供应商" filterable clearable>
							<el-option v-for="item in sxl_supplier" :key="item.id" :label="item.supplier_name" :value="item.id" />
						</el-select>
					</el-form-item>-->
          <el-form-item label="分销规则"
                        prop="distribution_id">
            <el-select v-model="form.distribution_id"
                       placeholder="请选择分销商规则"
                       filterable
                       clearable>
              <el-option v-for="item in distributionData"
                         :key="item.id"
                         :label="item.distribution_name"
                         :value="item.id" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="活动" prop="activity_id">
						<el-select v-model="form.activity_id" multiple placeholder="请选择" clearable>
							<el-option v-for="item in searchData.goods_activity" :key="item.id" :label="item.activity_name" :value="item.id" />
						</el-select>
					</el-form-item> -->
          <el-form-item label="选择分类">
            <el-select v-model="form.category"
                       placeholder="请选择一级分类"
                       clearable>
              <el-option v-for="item in getChannelData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品标签"
                        prop="goods_label">
            <el-checkbox-group v-model="form.goods_label"
                               :min="0"
                               :max="2">
              <el-checkbox v-for="city in searchData.goods_label"
                           :label="city.lid"
                           :key="city.lid">{{city.label_name}}</el-checkbox>
            </el-checkbox-group>
            <el-col style="display: inline-block;">(最多选择两个标签)</el-col>
          </el-form-item>
          <el-form-item label="邮费"
                        prop="goods_freight">
            <el-input v-model="form.goods_freight"
                      placeholder="请输入邮费(整数)"
                      type="number" />
          </el-form-item>
          <el-form-item label="商品封面图"
                        prop="goods_cover_image">
            <el-upload :action="uploadUrl"
                       :limit="1"
                       list-type="picture-card"
                       :file-list="fileListOfDetailTwo"
                       :on-success="uploadSuccessOfDetail"
                       :on-exceed="overSizeOfDetail1"
                       :before-upload="uploadBeforeOfDetail"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemoveOfDetail">
              <i class="el-icon-plus"></i>

              <div slot="tip"
                   class="el-upload__tip"
                   style="color: green;">
                请选择300KB以内的图片
              </div>
            </el-upload>

            <el-input v-model="form.goods_cover_image"
                      style="display: none;" />
          </el-form-item>
          <el-form-item label="商品简介图"
                        prop="goods_suggest_image">
            <el-upload :action="uploadUrl"
                       :limit="numLimit"
                       list-type="picture-card"
                       :file-list="fileListOfDetail"
                       :on-success="uploadSuccessAll"
                       :on-exceed="overSizeOfDetail"
                       :before-upload="uploadBeforeOfDetail"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%"
                     :src="dialogImageUrl"
                     alt="">
              </el-dialog>
              <div slot="tip"
                   class="el-upload__tip"
                   style="color: green;">
                请选择300KB以内的图片
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频上传"
                        prop="goods_video_url">
            <el-upload action="https://api2.yuelvhui.com/app/third/uploadVideo"
                       :limit="1"
                       :file-list="videoFileList"
                       list-type="picture-card"
                       :before-upload="beforeUploadVideo"
                       :on-preview="showVideo"
                       :on-success="handleVideoSuccess"
                       :on-exceed="videoExceed"
                       :on-remove="handleRemoveVideo">
              <i class="el-icon-plus" />
              <div slot="tip"
                   class="el-upload__tip"
                   style="color: green;">
                <span v-if="form.goods_video_url"
                      @click="videoDialog = true">视频上传成功,点击查看视频</span>
                <span v-else>请选择50M以内的视频</span>
              </div>
              <el-progress v-if="videoFlag"
                           type="circle"
                           :percentage="videoUploadPercent"
                           style="margin-top:30px;"></el-progress>
            </el-upload>
            <el-dialog :visible.sync="videoDialog"
                       :before-close="videoDialogVisibleClick">
              <video id="video"
                     style="margin: 0 auto;width: 100%;"
                     height="400"
                     :src="form.goods_video_url"
                     autoplay="autoplay"
                     controls="controls">您的浏览器不支持视频</video>
            </el-dialog>
            <el-input v-model="form.goods_cover_image"
                      style="display: none;" />
          </el-form-item>
          <el-form-item label="商品描述"
                        prop="goods_info">
            <el-input v-model="form.goods_info"
                      placeholder="输入商品描述"
                      type="textarea"
                      style="width: 400px;" />
          </el-form-item>
          <el-form-item label="商品详情"
                        prop="goods_content">
            <tinymce v-model="form.goods_content"
                     :height="300"
                     placeholder="输入商品详情" />
          </el-form-item>
          <!-- <el-form-item label="输出渠道" prop="goods_content">
						<el-checkbox-group v-model="form.channel_type">
							<el-checkbox v-for="city in channelList" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item> -->
          <el-form-item class="save_btn">
            <el-button type="primary"
                       @click="onSubmit('form')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="规格"
                   name="second"
                   v-if="tabPan">
        <!-- 编辑有Sku_id == 0的 -->
        <div v-if="child == 3">
          <shopSku :propData="disPlayData"
                   :is_integral_goods="form.is_integral_goods"
                   :productId="product_id" />
        </div>
        <!-- 编辑有Sku_id ！=0的 -->
        <div v-if="child == 2">
          <shopSku :propData="disPlayData"
                   :is_integral_goods="form.is_integral_goods"
                   :productId="product_id"
                   v-if="disPlayData.length != 0" />
        </div>
        <!-- 保存完直接新增 -->
        <div v-if="child == 1">
          <shopSku :propData="disPlayData"
                   :is_integral_goods="form.is_integral_goods"
                   :productId="product_id"
                   v-if="product_id != ''" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="素材圈"
                   name="material"
                   v-if="tabThree">
        <div>
          <el-form ref="forms"
                   label-width="120px"
                   :inline="true">
            <el-form-item>
              <el-input v-model="search_name"
                        placeholder="请输入素材圈昵称"
                        style="width:200px;"
                        clearable
                        prefix-icon="el-icon-search" />
              <el-button type="primary"
                         @click="getMaterialCircles"
                         style="margin-left:30px;">搜索</el-button>
              <el-button type="primary"
                         @click="onConfirm(1)">添加</el-button>
            </el-form-item>
          </el-form>

          <el-table :data="materialList"
                    :fit="true"
                    border
                    style="width: 100%;">
            <el-table-column label="用户头像"
                             align="center">
              <template slot-scope="scope">
                <el-avatar :src="scope.row.headImg"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="nickName"
                             label="昵称"
                             align="center">
            </el-table-column>
            <el-table-column prop="content"
                             label="内容"
                             align="center">
            </el-table-column>
            <el-table-column label="操作"
                             align="center">
              <template slot-scope="scope"
                        align="center">
                <el-button type="text"
                           size="small"
                           @click="DelMaterial(scope.row.id,scope.$index)">删除</el-button>
                <el-button type="text"
                           size="small"
                           @click="getMaterialCircle(scope.row.id,scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-container"
               style="text-align:right;">
            <el-pagination :current-page="pageIndex"
                           :page-size="pageSize"
                           :total="pageTotal"
                           background
                           layout="total, sizes, prev, pager, next, jumper"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加素材圈 -->
    <el-dialog title="商品素材圈"
               :visible.sync="dialogFormVisible">
      <el-form :model="info"
               :rules="rulesUser"
               ref="info"
               label-width="100px">
        <el-form-item label="头像"
                      prop="headImg">
          <el-upload :action="uploadUrl"
                     :limit="1"
                     list-type="picture-card"
                     :file-list="fileListUser"
                     :on-success="uploadSuccessUser"
                     :on-exceed="overSizeOfDetail1"
                     :before-upload="uploadBeforeOfDetail"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemoveOfUser">
            <i class="el-icon-plus"></i>

            <div slot="tip"
                 class="el-upload__tip"
                 style="color: #green;">
              请选择300KB以内的图片
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称"
                      prop="nickName">
          <el-input v-model="info.nickName"
                    placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item label="内容"
                      prop="content">
          <el-input type="textarea"
                    v-model="info.content"></el-input>
        </el-form-item>

        <el-form-item label="素材圈图片"
                      prop="image">
          <el-upload :action="uploadUrl"
                     :limit="numLimitUser"
                     list-type="picture-card"
                     :file-list="fileListUserAll"
                     :on-success="uploadSuccessUserAll"
                     :on-exceed="overSizeOfDetail2"
                     :before-upload="uploadBeforeOfDetail"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemoveUser">
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
            <div slot="tip"
                 class="el-upload__tip"
                 style="color: #green;">
              请选择300KB以内的图片
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="MaterialSubmit('info')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce';
import _ from 'lodash'
import {
  imgUploadUrl,
} from '@/api/cust'
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

      channelList: [{ id: 1, name: '悦旅会APP' }, { id: 2, name: '悦店APP' }],
      form: {
        category: '', //分类ID
        goods_name: '', //商品名称
        goods_coupon: 1, //是否可用优惠券
        goods_discount: 1, //是否每日特惠
        goods_classify: 1, //是否虚拟
        goods_status: 0, //是否上架
        distribution_id: '', //分销规则
        // activity_id: [], //活动
        goods_info: '', //商品描述
        sc_id: '', //供应航渠道
        supplier_id: '', //供应商ID
        label_ids: '', //标签
        goods_freight: '', //邮费
        goods_cover_image: '', //商品封面图
        goods_suggest_image: [], //商品简介图
        goods_content: '', //商品详情
        goods_label: [], //商品标签
        // channel_type:[],//输出渠道
        sku: []
      },
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
        goods_name: [{
          required: true,
          message: '请填写商品名称',
          trigger: 'blur'
        }],
        goods_coupon: [{
          required: true,
          message: '请选择是否可用优惠券',
          trigger: 'change'
        }],
        goods_discount: [{
          required: true,
          message: '请选择是否每日特惠',
          trigger: 'change'
        }],
        goods_classify: [{
          required: true,
          message: '请选择是否虚拟',
          trigger: 'change'
        }],
        goods_status: [{
          required: true,
          message: '请选择是否上架',
          trigger: 'change'
        }],
        supplier_id: [{
          required: true,
          message: '请选择供应商',
          trigger: 'change'
        }],
        sc_id: [{
          required: true,
          message: '请选择供应商渠道',
          trigger: 'change'
        }],
        distribution_id: [{
          required: true,
          message: '请选择分销商规则',
          trigger: 'change'
        }],
        // activity_id: [{
        // 	required: true,
        // 	message: '请选择活动类型',
        // 	trigger: 'change'
        // }],
        goods_freight: [{
          required: true,
          message: '请填写邮费',
          trigger: 'blur'
        }],
        goods_cover_image: [{
          required: true,
          message: '请选择商品封面图',
          trigger: 'blur'
        }],
        goods_suggest_image: [{
          required: true,
          message: '请选择商品简介图',
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
      type: 1,
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
    }
  },
  mounted () {
    if (this.$route.query.gid) {
      this.getLit(this.$route.query.gid) //数据回显
      this.tabPan = true;
      this.child = 2;
      this.product_id_user = this.$route.query.gid
    }
    this.getChannelCategoryList()
    this.getGoodBaseData();
    this.getGoodsDistribution()
    this.getSupplierChannelList()

  },
  methods: {
    //供应商渠道
    getSupplierChannelList () {
      getSupplierChannelList().then(res => {
        if (res.data.code == 200) {
          this.getSupplierData = res.data.data;
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
    // 弹出添加素材圈
    onConfirm () {
      this.dialogFormVisible = true
      this.materialEdit = 0
      this.info.headImg = [], //头像
        this.info.nickName = "", //昵称,
        this.info.content = "",//内容
        this.info.image = [],//图片集合
        this.fileListUser = []
      this.fileListUserAll = []
    },
    // 素材圈列表
    getMaterialCircles () {
      getMaterialCircles({
        productId: this.$route.query.gid,
        keyWord: this.search_name,
        page: this.pageIndex
      }).then(res => {
        if (res.data.code == 200) {
          this.materialList = res.data.data.list
          this.search_name = ''
          this.pageIndex = res.data.data.page;
          this.pageTotal = res.data.data.total;
        }
      })
    },
    // 删除素材圈
    DelMaterial (id, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          id: id
        }
        delMaterialCircle(obj).then(res => {
          if (res.data.code == 200) {
            this.materialList.splice(index, 1)
          }
        })
      }).catch(() => {
      });
    },
    // 回显单个素材圈
    getMaterialCircle (id, index) {
      this.dialogFormVisible = true
      this.info = []

      getMaterialCircle({
        id: id
      }).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.data
          this.materialEdit = id
          this.fileListUser = res.data.data.headImg.split(' ').map(function (imgObj) {
            return {
              'name': "",
              'url': imgObj
            }
          })
          this.fileListUserAll = res.data.data.image.map(function (imgObj) {
            return {
              'name': "",
              'url': imgObj
            }
          })
        }
      })
    },
    // 添加/编辑素材圈
    MaterialSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = _.clone(this.info);
          obj.productId = this.product_id_user,
            obj.skuId = this.sku[0].sku_id

          if (this.materialEdit) {//编辑
            obj.id = this.materialEdit;
            upMaterialCircle(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                })
                this.tabThree = true;
                this.activeName = "material";
                this.dialogFormVisible = false
                // location.reload()
                this.materialEdit = 0
                this.getMaterialCircles()
              } else {
                this.$message({
                  message: res.data.msg || "编辑失败",
                  type: "error"
                })
              }
            })
          } else {

            addMaterialCircle(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                })
                this.tabThree = true;
                this.activeName = "material";
                this.dialogFormVisible = false
                // location.reload()
                this.getMaterialCircles()
              } else {
                this.$message({
                  message: res.data.msg || "保存失败",
                  type: "error"
                })
              }
            })
          }
        } else {
          this.$message({
            message: "请填写完整信息",
            type: "error"
          })
        }
      });
    },
    // 改变供用户
    onChangeSupplier (id) {
      if (id == null) {
        this.form.sc_id = '';
        return false;
      }
      this.form.supplier_id = '';
      getSupplierByChannel({ sc_id: id }).then(res => {
        this.sxl_supplier = res.data.data;
      })
    },
    //分销规则
    getGoodsDistribution () {
      getGoodsDistribution({
        dist_type: 0
      }).then(res => {
        this.distributionData = res.data.data;
      })
    },
    handleClick (tab, event) {
      if (tab.label == "规格") {
        this.InitList = this.form.sku;
      }
    },
    // 获取分销活动，标签，活动 数据
    getGoodBaseData: function () {
      getGoodBaseData().then(res => {
        if (res.data.code == 200) {
          this.searchData = res.data.data;
        }
      })
    },
    handleRemove (file, fileList) {
      if (file.response) {
        this.form.goods_suggest_image = _.pull(this.form.goods_suggest_image, file.response.url)
      } else {
        this.form.goods_suggest_image = _.pull(this.form.goods_suggest_image, file.url)
      }
    },
    // 商圈移除图片
    handleRemoveUser (file, fileList) {
      if (file.response) {
        this.info.image = _.pull(this.info.image, file.response.url)
      } else {
        this.info.image = _.pull(this.info.image, file.url)
      }
    },
    handlePictureCardPreview (file) {
      // alert(2323);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    onSubmit (formName) {
      delete this.form.sku;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = _.clone(this.form);
          obj.goods_suggest_image = this.form.goods_suggest_image.join(",")
          obj.label_ids = this.form.goods_label.join(",")
          if (this.$route.query.gid) {
            obj.gid = this.$route.query.gid;
            updateGood(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success"
                })
                this.tabPan = true;
                this.activeName = "second";
                this.product_id = res.data.product_id
                // this.$router.push('/newmall/shopList')
              } else {
                this.$message({
                  message: res.data.msg || "编辑失败",
                  type: "error"
                })
              }
            })
          } else {
            addGoods(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                })
                this.tabPan = true;
                this.activeName = "second";
                this.product_id = res.data.product_id
              } else {
                this.$message({
                  message: res.data.msg || "保存失败",
                  type: "error"
                })
              }
            })
          }
        } else {
          this.$message({
            message: "请填写完整信息",
            type: "error"
          })
        }
      });
    },
    /**
     * 图片上传相关
     * */

    // ----------详情图片上传事件---------------
    // 图片移除事件
    handleRemoveOfDetail (file, fileList) {
      this.form.goods_cover_image = "";
    },
    // 商圈头像图片移除事件
    handleRemoveOfUser (file, fileList) {
      this.info.headImg = "";
    },
    // 图片上传成功
    uploadSuccessOfDetail (res) {
      this.form.goods_cover_image = res.url;
    },
    // 多图片上传成功
    uploadSuccessAll (res) {
      this.form.goods_suggest_image.push(res.url);
    },
    // 商圈头像上传成功
    uploadSuccessUser (res) {
      this.info.headImg = res.url;
    },
    // 商圈多图片上传成功
    uploadSuccessUserAll (res) {
      this.info.image.push(res.url);
    },
    // 图片上传前的检查
    uploadBeforeOfDetail (file) {
      if (file.size / 1024 > 300) {
        this.$message({
          message: "图片请保持在750*350px,300KB以内",
          type: 'error',
        })
        return false
      }
    },
    // 图片数量超出限制的提示
    overSizeOfDetail (files, fileList) {
      this.$message({
        message: "上传图片不能超过5张'",
        type: 'error',
      })
    },
    overSizeOfDetail1 (files, fileList) {
      this.$message({
        message: "上传图片不能超过1张",
        type: 'error',
      })
    },
    overSizeOfDetail2 (files, fileList) {
      this.$message({
        message: "上传图片不能超过6张",
        type: 'error',
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
    //选择分销商等级
    getChannelCategoryList () {
      getChannelCategoryList().then(res => {
        this.getChannelData = res.data;
      })
    },
    //预览视频              }];

    showVideo () {
      console.log("预览视频事件");
      this.videoDialog = true;
    },
    //上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      console.log(file.type, "filetype");
      if (["video/mp4", "video/ogg", "video/flv", "video/avi", "video/wmv", "video/rmvb", "video/mov"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
    },
    //进度条
    // uploadVideoProcess(event, file, fileList) {
    //     this.videoFlag = true;
    //     this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    // },
    //视频上传成功回调
    handleVideoSuccess (res, file) {
      console.log("视频上传成功回调", res);
      if (res.code == 200) {
        this.form.goods_video_url = res.url;
        this.videoFileList = [{
          'name': "",
          'url': 'https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-01-04/00/yuelvhuirvZYTviIZc1578069666.png'
        }];
      } else {
        this.form.goods_video_url = '';
        this.videoFileList = [];
        this.$message.error("上传失败,请刷新页面重试")
      }
    },
    //视频删除
    handleRemoveVideo () {
      this.form.goods_video_url = ""
    },
    videoExceed () {
      this.$message({
        message: "上传视频不能超过1个",
        type: "error"
      });
    },
    videoDialogVisibleClick () {
      var video = document.getElementById("video");
      video.pause();
      this.videoDialog = false;
    }
  },

}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: block;
}

.style_auto {
  width: 87%;
  margin: 0 auto;
}

.save_btn {
  margin: 20px 0;
  text-align: center;
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
