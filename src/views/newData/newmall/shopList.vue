<!--suppress ALL -->
<template>
  <div class="app-container">
    <!--编辑-->
    <el-dialog :title="titleName"
               :visible.sync="dialogFormIsCheck"
               @close="closeBox">
      <el-form :model="formCheck"
               ref="formCheck">
        <el-form-item label="备注"
                      :label-width="formLabelWidth"
                      prop="remark">
          <el-input type='textarea'
                    v-model="formCheck.remark"
                    autocomplete="off"
                    placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormIsCheck = false">取 消</el-button>
        <el-button type="primary"
                   @click="upCheck()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->

    <el-form :model="formSearch"
             ref="formSearch"
             :inline="true">
      <el-form-item label="活动类型:"
                    prop="activity_id">
        <el-col>
          <el-select v-model="formSearch.activity_id"
                     clearable
                     filterable
                     placeholder="活动类型"
                     style="width: 200px;"
                     @change="getList">
            <el-option v-for="item in searchData.goods_activity"
                       :key="item.id"
                       :label="item.activity_name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="分销规则:"
                    prop="distribution_id">
        <el-col>
          <el-select v-model="formSearch.distribution_id"
                     clearable
                     filterable
                     placeholder="分销规则"
                     style="width: 200px;"
                     @change="getList">
            <el-option v-for="item in searchData.goods_distribution"
                       :key="item.id"
                       :label="item.distribution_name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="名称："
                    prop="goods_name">
        <el-col>
          <el-input v-model="formSearch.goods_name"
                    clearable
                    placeholder="商品名称/供应商名称"
                    style="width:200px;"
                    @keyup.enter.native="onSubmit"
                    prefix-icon="el-icon-search" />
        </el-col>
      </el-form-item>

      <el-form-item label="是否使用优惠券:"
                    prop="goods_coupon">
        <el-col>
          <el-select v-model="formSearch.goods_coupon"
                     clearable
                     placeholder="是否使用优惠券"
                     style="width: 200px;"
                     @change="getList">
            <el-option v-for="item in isCoupon"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="商品状态:"
                    prop="goods_status">
        <el-col>
          <el-select v-model="formSearch.goods_status"
                     clearable
                     placeholder="商品状态"
                     style="width: 200px;"
                     @change="getList">
            <el-option v-for="item in productType"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商渠道:"
                    prop="goods_status">
        <el-col>
          <el-select v-model="formSearch.sc_id"
                     clearable
                     placeholder="供应商渠道"
                     @change="getList">
            <el-option v-for="item in getSupplierData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="中台商品ID："
                    prop="goods_name">
        <el-col>
          <el-input v-model="formSearch.middleProductId"
                    clearable
                    placeholder="中台商品ID"
                    style="width:200px;"
                    @keyup.enter.native="onSubmit"
                    prefix-icon="el-icon-search" />
        </el-col>
      </el-form-item>

      <el-form-item label="审核:"
                    prop="goods_status">
        <el-col>
          <el-select v-model="formSearch.is_check"
                     clearable
                     placeholder="审核状态"
                     @change="getList">
            <el-option label="待审核"
                       value="1" />
            <!-- <el-option label="已通过" value="3" /> -->
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="价格:"
                    prop="goods_status">
        <el-col>
          <el-select v-model="formSearch.price"
                     clearable
                     placeholder="价格"
                     @change="getGoods()">
            <el-option label="由高到低"
                       value="desc" />
            <el-option label="由低到高"
                       value="asc" />
            <!-- <el-option label="已通过" value="3" /> -->
          </el-select>
        </el-col>
      </el-form-item>
 <el-form-item label="选择分类">
            <el-select v-model="formSearch.category"
                       placeholder="请选择一级分类"
                       clearable>
              <el-option v-for="item in getChannelData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>


      <el-form-item>
        <el-col>
          <el-button type="primary"
                     @click="onSubmit">查询</el-button>
          <el-button type="primary"
                     @click="onEmpty('formSearch')">清空</el-button>
          <!--				<el-button type="danger" @click="onAdd">新增</el-button>-->
          <router-link :to="{path:'/newmall/newShopList'}">
            <el-button type="primary">前往资源库</el-button>
          </router-link>

        </el-col>
      </el-form-item>

    </el-form>
    <!--搜索部分-->
    <el-row :gutter="20"
            class="order_list">
      <el-col class="sku_num">SKU总量：<span v-html="sku_num"></span></el-col>
      <el-col class="sku_num">商品总数：<span v-html="pageTotal"></span></el-col>
      <el-col class="sku_num">上架商品：<span v-html="online_num"></span></el-col>
      <el-col class="sku_num">下架商品：<span v-html="down_num"></span></el-col>
    </el-row>
    <div class="new_tab"
         v-loading="loading">
      <el-table :data="list"
                :fit="true"
                border
                style="width: 100%;">
        <el-table-column fixed
                         prop="gid"
                         label="序号"
                         align="center">
        </el-table-column>
        <el-table-column prop="goods_name"
                         label="商品名称"
                         align="center"
                         width="250">
        </el-table-column>
        <el-table-column prop="middleProductId"
                         label="中台商品ID"
                         align="center">
        </el-table-column>
        <el-table-column prop=""
                         label="商品缩略图"
                         align="center">
          <template slot-scope="scope">
            <img style="height: 80px;width: 80px;"
                 :src="scope.row.goods_img"
                 alt="">
          </template>
        </el-table-column>
        <el-table-column prop="goods_type"
                         label="活动类型"
                         align="center">
        </el-table-column>
        <el-table-column prop="sku_id"
                         label="sku_id"
                         align="center">
        </el-table-column>
        <el-table-column prop="attr_name"
                         label="商品属性标签"
                         align="center">
        </el-table-column>
        <el-table-column prop="growth_value"
                         label="成长值"
                         align="center">
        </el-table-column>
        <el-table-column prop="spl_nickname"
                         label="供应商昵称"
                         align="center">
        </el-table-column>
        <el-table-column label="是否可用优惠券"
                         align="center">
          <template slot-scope="scope">
            <el-col>{{scope.row.product_coupon == 0?"是":"否"}}</el-col>
          </template>
        </el-table-column>

        <el-table-column label="是否每日特惠11"
                         align="center">
          <template slot-scope="scope">
            <el-col>{{scope.row.product_discount == 0?"是":"否"}}</el-col>
          </template>
        </el-table-column>

        <el-table-column label="sku信息"
                         width="310"
                         align="center">
          <template slot-scope="scope">
            <span v-for="item in scope.row.skuInfo">
              会员价:{{item.vip_price}},进货价:{{item.buy_price}},现价:{{item.price}},库存:{{item.inventory}}<br>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="上下架"
                         align="center"
                         width="110">
          <template slot-scope="scope">
            <el-col>
              <span :class='scope.row.goods_status == 0?"down_shop":"up_shop"'>
                {{scope.row.goods_status == 0?"下架":"上架"}}
              </span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180px"
                         align="center"
                         fixed="right">
          <template slot-scope="scope"
                    align="center">
            <span v-if="scope.row.is_check == 3">
              <el-button type="text"
                         size="small"
                         style="margin-right:20px;"
                         @click="upDown(scope.row.goods_status,scope.row.gid,list,scope.$index)">
                {{scope.row.goods_status == 0?"上架":"下架"}}
              </el-button>
            </span>

            <el-button type="text"
                       size="small"
                       v-if="scope.row.goods_status == 0"
                       @click="noPass(scope.row.gid,scope.row.middleProductId)">
              驳回中台
            </el-button>

            <span v-if="scope.row.is_check == 1">
              <el-button type="text"
                         size="small"
                         @click="isCheck(3,scope.row.gid,list,scope.$index)">
                通过
              </el-button>
              <!-- <el-button type="text" size="small" @click="isCheck(2,scope.row.gid,list,scope.$index)">
								驳回
							</el-button> -->
            </span>

            <router-link :to="{path:'/newmall/shopAdd',query:{gid:scope.row.gid}}"
                         target="_blank">
              <el-button type="text"
                         size="small">编辑</el-button>
            </router-link>
            <el-button type="text"
                       size="small"
                       @click="getProductShareContent(scope.row.gid)">分享推荐语</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="pageIndex"
                     :page-sizes="[10]"
                     :page-size="pageSize"
                     :total="pageTotal"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="商品分享推荐语"
               :visible.sync="dialogVisible"
               width="540px"
               :before-close="handleClose">
      <el-input type="textarea"
                :autosize="{minRows:5}"
                v-model="shareContent"
                style="width:500px;line-height:36px;"
                placeholder="请填写商品分享推荐语" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="upProductShareContent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { getGoods, getGoodBaseData, updateIsOnline, getSupplierChannelList, updateIsCheck, noPassCenterGoods, getProductShareContent, upProductShareContent,getChannelCategoryList} from '@/api/shops'
// 商品状态
const productType = [
  { id: '0', name: '下架' },
  { id: '1', name: '上架' }
]

// 是否使用优惠券
const isCoupon = [
  { id: '0', name: '是' },
  { id: '1', name: '否' }
]

export default {
  directives: {
    waves
  },
  data () {
    return {
      dialogVisible: false,
      shareContent: '',
      shareInfo: {},
      total: null,
      list: [],
      pageTotal: 0,   //显示页数
      pageIndex: 1,
      pageSize: 10,
      searchData: {},
      formSearch: {
        distribution_id: "",
        activity_id: "",
        goods_name: "",//商品名称
        goods_coupon: "",//是否使用优惠券 0使用 1 bu使用
        goods_status: "",//商品状态 0 下架 1 上架
        sc_id: '',//供应商渠道
      },
      isCoupon,//是否使用优惠券
      productType,//商品状态
      loading: true,
      down_num: "",//下线商品
      online_num: "",//上线商品
      sku_num: "",//SKU总数
      getSupplierData: [],//供应商渠道
      dialogFormIsCheck: false,
      remark: '',
      titleName: '',
      formLabelWidth: "10%",
      price: '',
      formCheck: {
        id: "",
        remark: "",
        is_check: ''
      },
      getChannelData:[],
    }
  },
  created () {
    this.getList();
    this.getBaseData()
    this.getSupplierChannelList()
    this.getChannelCategoryList()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.shareContent = '';
          done();
        })
        .catch(_ => { });
    },
    getProductShareContent (gid) {
      getProductShareContent({ productId: gid }).then(res => {
        if (res.data.code == 200) {
          this.shareInfo = res.data.data;
          this.shareInfo.product_id = gid;
          this.shareContent = this.shareInfo.share_content;
          this.dialogVisible = true;
        }
      })
    },
    upProductShareContent () {
      let params = {
        productId: this.shareInfo.product_id,
        shareContent: this.shareContent
      }
      upProductShareContent(params).then(res => {
        if (res.data.code == 200) {
          this.$message.success('编辑成功')
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
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
    // 列表数据
    getList () {
      this.loading = true;
      var data = {
        page: this.pageIndex,
        distribution_id: this.formSearch.distribution_id || null,
        activity_id: this.formSearch.activity_id || null,
        goods_name: this.formSearch.goods_name || null,//商品名称、供应商名称
        goods_coupon: this.formSearch.goods_coupon || null,//是否使用优惠券 0使用 1 使用
        goods_status: this.formSearch.goods_status || null,//商品状态 0 下架 1 上架
        scId: this.formSearch.sc_id || null,//供应商渠道ID
        is_check: this.formSearch.is_check || null,//审核
        middleProductId: this.formSearch.middleProductId || null,//中台商品ID
        order: this.formSearch.price || null,
        fields: this.formSearch.price ? 'price' : null,
        categoryFirst: this.formSearch.category||''
      }
      getGoods(data).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.list = res.data.data;
          this.total = res.data.total;
          this.pageTotal = res.data.count;
          this.loading = false;
          this.sku_num = res.data.sku_num;
          this.online_num = res.data.online_num;
          this.down_num = res.data.down_num;
        }
      })
    },
    // 获取分销活动，标签，活动 数据
    getBaseData: function () {
      getGoodBaseData().then(res => {
        if (res.data.code == 200) {
          this.searchData = res.data.data;
        }
      })
    },
    //上下架
    upDown (id, pid, list, index) {
      if (id == 0) {
        var gid = 1;
      } else {
        var gid = 0;
      }
      var obj = {
        id: pid,
        state: gid
      }
      updateIsOnline(obj).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg || "成功")
          if (gid == 1) {
            list[index].goods_status = 1;
          } else {
            list[index].goods_status = 0;
          }
        } else {
          this.$message.error(res.data.msg || "失败")
        }
      })
    },

    noPass (gid, middleId) {
      var data = {}
      data.id = gid;
      data.middleId = middleId;
      noPassCenterGoods(data).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '成功',
            type: 'success'
          });
          this.pageIndex = 1
          this.getList()
          this.act_info = {}
        } else {
          this.$message({
            message: res.data.msg || '失败',
            type: 'error'
          });
        }
      })

    },

    //通过驳回 弹框
    isCheck (isCheck, pid) {
      if (isCheck == 3) {
        this.titleName = "通过";
      } else if (isCheck == 2) {
        this.titleName = "驳回";
      }
      this.formCheck.is_check = isCheck;
      this.formCheck.id = pid;
      this.dialogFormIsCheck = true
    },

    //通过驳回
    upCheck () {
      var obj = this.formCheck;
      console.log(obj);

      var data = {}
      data.id = obj.id;
      data.is_check = obj.is_check;
      data.remark = obj.remark;
      updateIsCheck(data).then(res => {
        if (res.data.code == 200) {
          this.dialogFormIsCheck = false;
          this.$message({
            message: this.titleName + '成功',
            type: 'success'
          });
          this.pageIndex = 1
          this.getList()
          this.act_info = {}
        } else {
          this.$message({
            message: res.data.msg || this.titleName + '失败',
            type: 'error'
          });
        }
      })


      if (this.userType == 2) {

      }
    },
    closeBox () {
      this.remark = "";
    },

    onSubmit () {
      this.loading = true;
      this.pageIndex = 1
      this.getList()
    },
    onEmpty (formName) {
      this.pageIndex = 1;
      this.$refs[formName].resetFields();
      this.getList()
    },
    onAdd () {
      this.$router.push('/newmall/shopAdd')
    },
    // 搜索
    handleFilter () {
      this.pageIndex = 1;
      this.getList()
    },
    // 分页
    handleSizeChange (val) { },
    handleCurrentChange (val) {
      this.loading = true;
      this.pageIndex = val;
      this.getList()
    },

    getChannelCategoryList () {
      getChannelCategoryList().then(res => {
        this.getChannelData = res.data;
      })
    },
  }
}
</script>
<style type="scss">
.goodsName {
  display: block;
}
.down_shop {
  color: #f00;
}
.up_shop {
  color: green;
}
.order_list {
  margin: 30px 0;
  font-size: 1rem;
  color: #999;
  font-size: 16px;
}
.order_list span {
  font-size: 18px;
  color: #666;
}
.sku_num {
  float: left;
  width: auto;
}
</style>
