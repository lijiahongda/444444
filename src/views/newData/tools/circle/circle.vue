<template>
  <div class="app-container">
    <el-tabs>

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
            <router-link :to="{path:'/tools/officialMember'}" target="_blank">
							<el-button type="primary">官方账号列表</el-button>
						</router-link>
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
        <el-table-column prop="productId"
                         label="商品id"
                         align="center">
        </el-table-column>
        <el-table-column prop="productName"
                         label="商品名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="content"
                         label="内容"
                         align="center">
        </el-table-column>

        <el-table-column prop="sourceType"
                         label="类型"
                         align="center">
        </el-table-column>
        <el-table-column prop="channelStationId"
                         label="渠道"
                         align="center">
        </el-table-column>
        <el-table-column prop="channelOutsideId"
                         label="站外渠道商"
                         align="center">
        </el-table-column>
        <el-table-column prop="examineStatusName"
                         label="审核状态"
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope"
                    align="center">
            <el-button type="text"
                       size="small"
                       @click="DelMaterial(scope.row.id,scope.$index)">删除</el-button>
            <el-button v-if="scope.row.examineStatus == 0"
                       type="text"
                       size="small"
                       @click="checkMaterialCircle(scope.row.id,1)">通过</el-button>
            <el-button v-if="scope.row.examineStatus == 0"
                       type="text"
                       size="small"
                       @click="checkMaterialCircle(scope.row.id,2)">驳回</el-button>
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
  getMaterialCircles,//列表
  getMaterialCircle,//单个
  delMaterialCircle,//删除
  checkMaterialCircle,//审核
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
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",

      // --------图片上传参数----------------
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: this.apiurl.imguploadurl,
      numLimit: 5,
      numLimitUser: 6,
    }
  },
  mounted () {
    if (this.$route.query.gid) {
      this.getLit(this.$route.query.gid) //数据回显
      this.tabPan = true;
      this.child = 2;
      this.product_id_user = this.$route.query.gid
    }

    this.getMaterialCircles()

  },
  methods: {
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
        this.fileListUser = [],
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
    //审核
    checkMaterialCircle (id, status) {
      let txt = ''
      if (status == 1) {
        txt = '确认要通过吗？'
      } else {
        txt = '确认要驳回吗？'
      }
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          id: id,
          examineStatus: status
        }
        checkMaterialCircle(obj).then(res => {
          if (res.data.code == 200) {

            this.getMaterialCircles()
          }
        })
      }).catch(() => {
      });
    },
    // 回显单个素材圈
    getMaterialCircle (id, index) {
      this.dialogFormVisible = true
      this.info = {}

      getMaterialCircle({
        id: id
      }).then(res => {
        if (res.data.code == 200) {
          this.info = res.data.data
          this.materialEdit = id
          this.fileListUser = [{ url: res.data.data.headImg, 'name': "", }]
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
    handleRemove (file, fileList) {
      if (file.response) {
        this.form.goods_suggest_image = _.pull(this.form.goods_suggest_image, file.response.url)
      } else {
        this.form.goods_suggest_image = _.pull(this.form.goods_suggest_image, file.url)
      }
    },

    /**
     * 图片上传相关
     * */

    // ----------详情图片上传事件---------------

    // 商圈移除图片
    handleRemoveUser (file, fileList) {
      if (file.response) {
        this.info.image = _.pull(this.info.image, file.response.url)
      } else {
        this.info.image = _.pull(this.info.image, file.url)
      }
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 商圈头像图片移除事件
    handleRemoveOfUser (file, fileList) {
      this.info.headImg = "";
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
