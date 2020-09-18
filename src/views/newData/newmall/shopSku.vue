<template>
  <div class="app-container">
    <div class="list"
         v-for="(item1,index1) in listArr"
         :key="index1">
      <div class="list-detail"
           style="position:relative">
        <div class="list_title">规格名：</div>
        <el-input :disabled='$route.query.gid>0'
                  type="text"
                  v-model="item1.pName"
                  placeholder="规则名"
                  style="width: 200px"></el-input>
        <!-- 删除规格名 -->
        <el-button type="danger"
                   plain
                   class="del item_del"
                   @click="delName(index1)">&times;</el-button>
      </div>
      <!-- 规格值 -->
      <div class="list-detail"
           style="margin-left: 30px;">
        <div class="list_title">{{item1.pName}}:</div>
        <!-- //规格名 -->
        <div v-for="(item2,index2) in item1.list"
             :key="index2"
             class="item_list">
          <el-input :disabled='$route.query.gid>0'
                    v-model="item2.vName"
                    type="text"
                    placeholder="规则值"
                    style="width: 200px;"></el-input>
          <!-- 删除规格值 -->
          <el-button class="item_del"
                     style="display:inline-block"
                     type="danger"
                     plain
                     v-if="item2.vName!=''"
                     @click="delValue(index1,index2)">&times;</el-button>
          <div class="upload_btn"
               v-if="index1 == 0">
            <input :disabled='$route.query.gid>0'
                   type="file"
                   :id="('uploads'+index2)"
                   multiple
                   accept="image/*"
                   @change="uploadSpecifications($event,index1,index2)" />
            <el-button :disabled='$route.query.gid>0'
                       plain
                       size="small"
                       type="primary">上传图片</el-button>
          </div>
          <!-- //规格图片 -->
          <div class="img_list"
               v-if="item2.img">
            <img style="width:100px;height:100px;"
                 :src="item2.img"
                 alt="">
            <!-- 删除图片 -->
            <div @click="delImg(index1,index2)">&times;</div>
          </div>
        </div>
        <!-- 添加规格值 -->
        <el-button type="primary"
                   :disabled='$route.query.gid>0'
                   style="margin-top: 6px;float: left;"
                   @click="addValue(index1)">添加</el-button>
      </div>
    </div>
    <el-button :disabled='$route.query.gid>0'
               plain
               @click="addSpecifications"
               type="primary"
               style="margin: 10px;clear: both;float: left;">+新增规格</el-button>
    <!-- 属性为0是不显示表格及保存按钮 -->
    <br>
    <div class="wrap"
         v-if="this.newTableData.length > 0">
      <!-- 表格 -->
      <table id="process"
             class="columnList"
             border="1"
             cellspacing="0">
        <thead>
          <tr align="left">
            <th v-for="(item,index) in tableHead"
                :key="index"
                v-if="tableHead.length>0">{{item}}</th>
            <th>会员价</th>
            <th>进货价</th>
            <th>现价</th>
            <th>库存</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in newTableData"
              :key="index">
            <td v-for="(items,index1) in item"
                :key="index1"
                v-if="index1<item.length-5">
              {{items.vName}}
            </td>
            <td v-for="(items,index1) in item"
                :key="index1"
                v-if="index1 ==item.length-3">
              <el-input v-model="items.vip_price"></el-input>
            </td>
            <td v-for="(items,index1) in item"
                :key="index1"
                v-if="index1 ==item.length-4">
              <el-input :disabled='$route.query.gid>0'
                        v-model="items.buy_price"></el-input>
            </td>
            <td v-for="(items,index1) in item"
                :key="index1"
                v-if="index1 ==item.length-2">
              <el-input v-model="items.price"
                        disabled></el-input>
            </td>
            <td v-for="(items,index1) in item"
                :key="index1"
                v-if="index1 ==item.length-5">
              <el-input :disabled='$route.query.gid>0'
                        v-model="items.inventory"></el-input>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <div @click="generate">打印</div> -->
      <div class="save_btn">
        <el-button type="primary"
                   @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  updateGoodSku,
  addGoodSku,
  getGood
} from '@/api/shops'
import {
  imgUploadUrl,
} from '@/api/cust'
export default {
  data () {
    return {
      isWatch: true, // 监听数据布尔
      listArr: [],//初始化数据集合
      tableHead: [], //表格头部thead循环内容
      newTableData: [], //排除后4列的数据

      list: [], //规格循环次数
      num: 0,
      obj: [],
      shuzu: [],
      abc: [],
      activeName: 'first',
      product_id: "",
      showSuccess: true, //是否执行保存
      oldTableList: null, // 重置表格数据前，缓存老数据
    }
  },
  props: ["propData", "productId", 'is_integral_goods'],
  watch: {
    listArr: {
      handler: function () {
        if (this.isWatch) {
          var tableHead = [];
          this.listArr.map(item => {
            tableHead.push(item.pName)
          })
          this.tableHead = tableHead;
          this.switchTable();
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.listArr.length > 0) {
      var tableHead = [];
      this.listArr.map(item => {
        tableHead.push(item.pName)
      })
      this.tableHead = tableHead;
      this.switchTable()
    }
    if (this.$route.query.gid) {
      this.onShow()
    }
    // this.getShopList()
  },
  methods: {
    // 默认数据转换表格方法
    exchange (arr) {
      if (arr.length > 1) {
        let fLength = arr[0].list.length
        let sLength = arr[1].list.length
        let items = {
          pName: "resultData",
          list: []
        }
        let itemIdx = 0
        for (let i = 0; i < fLength; i++) {
          for (let j = 0; j < sLength; j++) {
            if (arr[0].list[i] instanceof Array) {
              items.list[itemIdx] = arr[0].list[i].concat(arr[1].list[j]);
            } else {
              items.list[itemIdx] = [arr[0].list[i]].concat(arr[1].list[j]);
            }
            itemIdx++
          }
        }
        let newArr = []
        newArr.push(items)
        arr.map((item, index) => {
          if (index > 1) {
            newArr.push(item)
          }
        })
        return this.exchange(newArr)
      } else {
        let items = {
          pName: "resultData",
          list: []
        }
        let itemIdx = 0
        for (let i = 0; i < arr[0].list.length; i++) {
          if (arr[0].list[i] instanceof Array) {
            items.list[itemIdx] = arr[0].list[i]
          } else {
            items.list[itemIdx] = [arr[0].list[i]]
          }
          itemIdx++
        }
        return [items]
      }
    },
    // 新增规则值
    addValue: function (index1) {
      // this.isWatch = true;
      // 首先判断当前点击index最后一个输入框是否为空
      if (this.listArr[index1].list[this.listArr[index1].list.length - 1].vName == '') {
        return false;
      }
      this.listArr[index1].list.push({
        vName: ''
      })
    },
    // 新增规格
    addSpecifications: function () {
      var length = this.listArr.length;
      // 判断列表是否为空，直接添加数据
      if (length == 0) {
        this.listArr.push({
          pName: "",
          list: [{
            vName: ''
          }]
        })
      } else {
        // 如果不为空，先判断列表最后一栏pName是否为空,是则return，否则继续
        if (this.listArr[this.listArr.length - 1].pName == '') {
          return false;
        } else {
          this.listArr.push({
            pName: "",
            list: [{
              vName: ''
            }]
          })
        }
      }
    },
    // 删除规格名
    delName (idx) {
      this.listArr.splice(idx, 1)
    },
    // 删除规格值
    delValue (index1, index2) {
      //如果大于1删除当前规格值，否则删除整个规则
      if (this.listArr[index1].list.length > 1) {
        this.listArr[index1].list.splice(index2, 1)
      } else {
        this.listArr.splice(index1, 1)
      }
      this.switchTable()
    },
    //图片上传
    uploadSpecifications (e, index1, index2) {
      let self = this,
        id = 'uploads' + index2,
        files = document.getElementById(id).files,
        fileSize = 300 * 1024;
      if (files[0].size > fileSize) {
        this.$message({
          message: "只能上传小于300kb的图片",
          type: "error"
        })
        document.getElementById(id).value = ''
      } else {
        let formData = new FormData();
        formData.append('file', files[0])
        imgUploadUrl(formData).then(res => {
          if (res.status == 200) {
            let length = self.listArr[index1].list.length
            self.listArr[index1].list[index2].img = res.data.url;
            this.switchTable();
          }
        })
      }
    },
    // 删除一级列表的某一图片
    delImg (index1, index2) {
      this.listArr[index1].list[index2].img = '';
      this.switchTable();
    },
    // listArr转化表格数据
    switchTable () {
      // this.isWatch = true;
      // console.log(this.listArr, 'this.listArr22222222222')
      if (!this.listArr.length) {
        this.newTableData = [];
        return false;
      }
      this.oldTableList = this.newTableData
      var newTableData = this.exchange(this.listArr)
      this.newTableData = newTableData[0].list;
      // 先转换总共循环的规格值
      this.newTableData.map(item => {
        // 取出新data和旧的比较，一致则>0
        let oldIdx = this.oldTableList.findIndex((oldItem) => {
          let _idx = oldItem.length - 6
          let txtScript = `item.length === oldItem.length-5`
          for (let i = 0; i <= _idx; i++) {
            txtScript += `&& oldItem[${i}].vName === item[${i}].vName`
          }
          return eval(txtScript)
        })
        //一致则赋值
        if (oldIdx >= 0) {
          let _oLength = this.oldTableList[oldIdx].length

          item.push({
            inventory: this.oldTableList[oldIdx][_oLength - 5].inventory
          })

          item.push({
            buy_price: this.oldTableList[oldIdx][_oLength - 4].buy_price
          })

          item.push({
            vip_price: this.oldTableList[oldIdx][_oLength - 3].vip_price
          })
          item.push({
            price: this.oldTableList[oldIdx][_oLength - 2].price
          })
          item.push({
            sku_id: this.oldTableList[oldIdx][_oLength - 1].sku_id
          })
        } else {
          item.push({
            inventory: 0
          })
          item.push({
            buy_price: 0
          })
          item.push({
            vip_price: 0
          })
          item.push({
            price: 0
          })
          item.push({
            sku_id: ''
          })
        }
      })
      // console.log(this.newTableData, 'add<======>add')
    },
    // 提交数据
    save () {
      //遍历是否有空或0
      this.newTableData.map(item => {
        for (var i = 1; i < item.length; i++) {
          if (i < item.length - 5) {
            if (item[i].vName == '') {
              this.$message.error("请填写完整规格值")
              this.showSuccess = false;
              return false;
            } else {
              this.showSuccess = true;
            }
          } else {
            // if(this.is_integral_goods != 1) {
            //
            // }
            // if (this.is_integral_goods != 1 && (item[i].vip_price == '' || item[i].vip_price == 0)) {
            // 	this.$message.error("请填写会员价且不能为0")
            // 	this.showSuccess = false;
            // 	return false;
            // } else
            if (this.is_integral_goods != 1 && (item[i].buy_price == '' || item[i].buy_price == 0)) {
              this.$message.error("请填写进货价且不能为0")
              this.showSuccess = false;
              return false;
            } else if (this.is_integral_goods != 1 && (item[i].price == '' || item[i].price === 0)) {
              this.$message.error("请填写现价且不能为0")
              this.showSuccess = false;
              return false;
            } else if (this.is_integral_goods != 1 && (item[i].inventory == '' || item[i].inventory == 0)) {
              this.$message.error("请填写库存且不能为0")
              this.showSuccess = false;
              return false;
            } else {
              this.showSuccess = true;
            }
          }
        }
      })
      //遍历是否有空或0结束
      //拼接后台数据接收格式
      var listEnd = [];
      var tableData = this.newTableData;
      tableData.map((item, index) => {
        listEnd.push({
          "sku_id": "",
          "vip_price": "",
          "buy_price": "",
          "price": "",
          "inventory": "",
          "product_propertys": []
        })
        item.map((child, idx) => {
          if (child.vip_price) {
            listEnd[index].vip_price = child.vip_price;
          }
          if (child.buy_price) {
            listEnd[index].buy_price = child.buy_price;
          }
          if (child.price) {
            listEnd[index].price = child.price;
          }
          if (child.inventory) {
            listEnd[index].inventory = child.inventory;
          }
          if (child.sku_id) {
            listEnd[index].sku_id = child.sku_id;
          }
          for (var i = 0; i < this.tableHead.length; i++) {
            if (idx == i) {
              if (child.vName) {
                listEnd[index].product_propertys.push({
                  pName: this.tableHead[i],
                  vName: child.vName,
                  skuImgUrl: child.img
                })
              }

            }

          }

        })

      })
      //拼接后台数据结束
      if (this.showSuccess) {
        // console.log(listEnd, 'listEndlistEnd')
        if (this.$route.query.gid) {
          let data = {
            id: this.$route.query.gid,
            sku: listEnd
          }
          updateGoodSku(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "编辑成功",
                type: "success"
              })
              //跳转展示列表页
              this.$router.push({
                path: '/newmall/shopList'
              });
            } else {
              this.$message({
                message: "编辑失败",
                type: "error"
              })
            }
          })
        } else {
          let data = {
            id: this.productId,
            sku: listEnd
          }
          addGoodSku(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              })
              //跳转展示列表页
              this.$router.push({ path: '/newmall/shopList' });
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              })
            }
          })
        }
      }
    },

    getList () {
      this.shuzu = this.propData;
      // console.log(this.propData,'this.shuzu===111')
      // getGood(`?id=${this.$route.query.gid}`).then(res => {
      // 	if (res.data.code == 200) {
      // 		this.shuzu = res.data.data.result.sku
      // 		this.onShow()
      // 	}
      // })
    },
    //回显数据格式转换
    onShow () {
      this.isWatch = false;
      let ajaxData = this.propData;
      var listArr = [];
      ajaxData.map(item => {
        item.product_propertys.map(data => {
          let itemIdx = listArr.findIndex((inItem) => {
            return inItem.pName === data.pName
          })
          if (itemIdx < 0) {
            listArr.push({
              pName: data.pName,
              list: []
            })
            itemIdx = listArr.findIndex((inItem) => {
              return inItem.pName === data.pName
            })
          }
          let itemIdx2 = listArr[itemIdx].list.findIndex((inItem2) => {
            return inItem2.vName === data.vName
          })
          if (itemIdx2 < 0) {
            listArr[itemIdx].list.push({
              vName: data.vName,
              img: data.skuImgUrl
            })
          }
        })
      })
      this.listArr = listArr

      console.log(listArr, '4--2')
      var tableHead = [];
      this.listArr.map(item => {
        tableHead.push(item.pName)
      })
      this.tableHead = tableHead;
      let tableArr = []
      ajaxData.map((item, index) => {
        tableArr[index] = []
        item.product_propertys.map(data => {
          tableArr[index].push({
            vName: data.vName,
            img: data.skuImgUrl
          })
        })
        tableArr[index].push({
          inventory: item.inventory
        })
        tableArr[index].push({
          buy_price: item.buy_price
        })
        tableArr[index].push({
          vip_price: item.vip_price
        })
        tableArr[index].push({
          price: item.price
        })
        tableArr[index].push({
          sku_id: item.sku_id
        })
      })
      this.newTableData = tableArr;
      setTimeout(() => {
        this.isWatch = true;
      }, 1000)

      console.log(tableArr, '4--3') //这个就是3的数据结构了
    },
  }
}
</script>
<style scoped>
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

.list-detail {
  overflow: hidden;
}

.el-input {
  float: left;
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
  margin-top: 10px;
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
  clear: both;
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
