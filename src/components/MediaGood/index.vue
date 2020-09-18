<template>
  <div id="media" class="new_tab">
    <div v-for="(item,index) in goodsList" :key="index" class="goodItem" @click="toggleActive(index,item.gid)">
      <el-popover
        :title="item.goods_name+'规格:'"
        placement="top-start"
        trigger="click"
        @hide="showSave = false"
        @show="getCos(item.skuInfo)"
      >
        <table id="process" class="columnList" border="1" cellspacing="0">
          <thead>
            <tr align="left">
              <th v-for="(item,index) in tableHead" v-if="tableHead.length>0" :key="index">{{ item }}</th>
              <th>会员价</th>
              <th>进货价</th>
              <th>现价</th>
              <th>库存</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in newTableData" :key="index">
              <td v-for="(items,index1) in item" v-if="index1<item.length-5" :key="index1">
                {{ items.vName }}
              </td>
              <td v-for="(items,index1) in item" v-if="index1 ==item.length-3" :key="index1">
                <!--                {{ items.vip_price }}-->
                <input v-model="items.vip_price" type="text" @input="showSave = true">
              </td>
              <td v-for="(items,index1) in item" v-if="index1 ==item.length-4" :key="index1">
                {{ items.buy_price }}
              </td>
              <td v-for="(items,index1) in item" v-if="index1 ==item.length-2" :key="index1">
                <!--                {{ items.price }}-->
                <input v-model="items.price" type="text" @input="showSave = true">
              </td>
              <td v-for="(items,index1) in item" v-if="index1 ==item.length-5" :key="index1">
                {{ items.inventory }}
              </td>
            </tr>
          </tbody>
        </table>
        <el-button v-if="showSave" type="plain" style="display: block;margin: 20px auto 0;" @click="updateGoodSku">保存</el-button>
        <div slot="reference">
          <el-carousel :autoplay="false" height="200px">
            <el-carousel-item v-for="(img,index) in item.goodsSuggestImage" :key="index">
              <img :src="img" alt="">
            </el-carousel-item>
          </el-carousel>
          <p class="goods_name">{{ item.goods_name }}</p>
          <p>sku id: {{ item.sku_id }}</p>
          <p>供应商昵称: {{ item.spl_nickname }}</p>
          <p>渠道: {{ item.channelName }}</p>
          <slot :item="item"/>
        </div>
      </el-popover>
      <i v-if="item.isCheck" class="el-icon-circle-check"/>
    </div>
  </div>
</template>

<script>
import {
  updateGoodSku
} from '@/api/shops'
export default {
  name: 'Index',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      goodsList: this.list,
      tableHead: [], // 表格头部thead循环内容
      newTableData: [], // 排除后4列的数据
      goodsChecked: [],
      gid: '',
      showSave: false,
      showSuccess: true
    }
  },
  watch: {
    list(newVal) {
      this.goodsList = newVal
    }
  },
  created() {
    this.goodsChecked = []
  },
  methods: {
    init() {
      this.goodsChecked = []
	  },
    getCos(val) {
      const ajaxData = val
      var listArr = []
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
          const itemIdx2 = listArr[itemIdx].list.findIndex((inItem2) => {
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
      var tableHead = []
      this.listArr.map(item => {
        tableHead.push(item.pName)
      })
      this.tableHead = tableHead
      const tableArr = []
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
      this.newTableData = tableArr
    },
    updateGoodSku() {
      this.$confirm('此操作将会编辑该产品的规格, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 遍历是否有空或0
        this.newTableData.map(item => {
          for (var i = 1; i < item.length; i++) {
            if (i < item.length - 5) {
              if (item[i].vName == '') {
                this.$message.error('请填写完整规格值')
                this.showSuccess = false
                return false
              } else {
                this.showSuccess = true
              }
            } else {
              // if(this.is_integral_goods != 1) {
              //
              // }
              if (this.is_integral_goods != 1 && (item[i].vip_price == '' || item[i].vip_price == 0)) {
                this.$message.error('请填写会员价且不能为0')
                this.showSuccess = false
                return false
              } else if (this.is_integral_goods != 1 && (item[i].buy_price == '' || item[i].buy_price == 0)) {
                this.$message.error('请填写进货价且不能为0')
                this.showSuccess = false
                return false
              } else if (this.is_integral_goods != 1 && (item[i].price == '' || item[i].price === 0)) {
                this.$message.error('请填写现价且不能为0')
                this.showSuccess = false
                return false
              } else if (this.is_integral_goods != 1 && (item[i].inventory == '' || item[i].inventory == 0)) {
                this.$message.error('请填写库存且不能为0')
                this.showSuccess = false
                return false
              } else {
                this.showSuccess = true
              }
            }
          }
        })
        // 遍历是否有空或0结束
        // 拼接后台数据接收格式
        var listEnd = []
        var tableData = this.newTableData
        tableData.map((item, index) => {
          listEnd.push({
            'sku_id': '',
            'vip_price': '',
            'buy_price': '',
            'price': '',
            'inventory': '',
            'product_propertys': []
          })
          item.map((child, idx) => {
            if (child.vip_price) {
              listEnd[index].vip_price = child.vip_price
            }
            if (child.buy_price) {
              listEnd[index].buy_price = child.buy_price
            }
            if (child.price) {
              listEnd[index].price = child.price
            }
            if (child.inventory) {
              listEnd[index].inventory = child.inventory
            }
            if (child.sku_id) {
              listEnd[index].sku_id = child.sku_id
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
        if (this.showSuccess) {
          const data = {
            id: this.gid,
            sku: listEnd
          }
          updateGoodSku(data).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.$emit('getList')
              this.showSave = false
            } else {
              this.$message({
                message: '编辑失败',
                type: 'error'
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    toggleActive(index, gid) {
      this.gid = gid
      this.$set(this.goodsList[index], 'isCheck', !this.goodsList[index].isCheck)
      console.log(this.goodsList[index].isCheck, 777)

      if (this.goodsList[index].isCheck) {
        // 添加选中值
        const tar = this.goodsChecked.find(item => {
          return item === gid
        })
		  console.log(tar, 'tar')
        if (!tar) this.goodsChecked.push(gid)
        this.$emit('toggleActive', this.goodsChecked)
      } else {
        // 去掉选中值
        const tar = this.goodsChecked.findIndex(item => {
          return item === gid
        })
        console.log(tar, 'tarD')
        if (tar >= 0) this.goodsChecked.splice(tar, 1)
        this.$emit('toggleActive', this.goodsChecked)
	  }
    }
  }
}
</script>

<style lang="scss" scoped>
	.new_tab {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	table {
		border-color: #fff;
		max-width: 100%;
		border: none;
	}

	th {
		background-color: #409EFF;
		color: #fff;
		border: 1px solid #fff;
		padding: 8px;
		font-weight: normal;
		white-space: nowrap;
		text-align: center;
	}

	td {
		background-color: #EFEFEF;
		border: 1px solid #fff;
		padding: 10px 15px;
		text-align: center;
	}

	.goodItem {
		width: calc(18% - 2px);
		padding: 5px;
		border: 1px solid #ccc;
		font-size: 14px;
		margin: 20px 1%;
		position: relative;

		.el-icon-circle-check {
			color: #409EFF;
			position: absolute;
			top: 10px;
			right: 10px;
			z-index: 100;
			font-size: 40px;
		}
		p{
			margin: 10px;
		}

		img {
			width: 100%;
			height: 200px;
		}

		.goods_name {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
</style>
