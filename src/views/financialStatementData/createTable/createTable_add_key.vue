<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px" :inline="false">
      <el-form-item label="数据表ID：" prop="goods_name">
        <span>1111</span>
      </el-form-item>
      <el-form-item label="数据表名称：" prop="goods_name">
        <span>分公司销售与运维</span>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="表头"
        width="200">
        <template slot-scope="scope">
          <span>选择本行颜色</span>
          <el-color-picker v-model="scope.row.color"></el-color-picker>
        </template>
      </el-table-column>
      <el-table-column width="200" v-for="(item,index) in tableColum" :key="index">
        <template slot="header" slot-scope="scope">
          <span>选择本列颜色</span>
          <el-color-picker v-model="item.color"></el-color-picker>
        </template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.list[index].value" placeholder="添加字段"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="save" type="primary">保存</el-button>
    <el-button @click="addCellL" type="primary">添加列</el-button>
    <el-button @click="addCellH" type="primary">添加行</el-button>
  </div>
</template>
<script>
export default {
  name: 'createTable_add_key',
    data() {
      return {
        color:'#000000',
        tableColum:[
          {color:'#ffffff'}
        ],
        tableData: [
          {
            color:'#ffffff',
            list:[
              {
                value:'00'
              },
              {
                value:'01'
              }, 
              {
                value:'02'
              },     
            ]
          }
        ]
      }
    },
    created() {
	
    },
    methods: {
      save() {
        console.log(this.tableData)
      },
      addCellL() {
        this.tableColum.push({color:'#ffffff'});
        this.tableData.map((value,index) => {
          value.list.push({value:''})
        })
      },
      addCellH() {
        this.tableData.push(this.tableData[this.tableData.length-1])
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>
<style type="scss">
</style>
