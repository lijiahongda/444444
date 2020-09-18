<template>
    <div class="app-container">
      <el-form ref="form" label-width="120px" :inline="true">
        <el-form-item>
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getList" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/financialStatementData/keysTable_add"><el-button type="warning">添加</el-button></router-link>
        </el-form-item>
		  </el-form>
      <el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
          <el-table-column prop="id" label="字段ID" align="center"></el-table-column>
          <el-table-column prop="business" label="字段名称" align="center"></el-table-column>
          <el-table-column prop="title" label="字段级别" align="center"></el-table-column>
          <el-table-column prop="subTitle" label="字段格式" align="center"></el-table-column>
          <el-table-column prop="type" label="字段类型" align="center"></el-table-column>
          <el-table-column prop="type" label="所属报表" align="center"></el-table-column>
          <el-table-column prop="type" label="备注" align="center"></el-table-column>
          <el-table-column prop="refundTotal" width="200px" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[10,20,30,40]"
          :page-size="searchCondition.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
</template>
<script>
export default {
  name: 'keysTableList',
    data() {
      return {
        name:'',
        searchCondition: {
          page:1,
          pageSize: 20
        },
        total: null,
        loading: false,
        list: [],
      }
    },
    created() {
	
    },
    methods: {

    }
}
</script>
<style type="scss">
</style>
