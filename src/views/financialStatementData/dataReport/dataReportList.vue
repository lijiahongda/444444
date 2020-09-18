<template>
    <div class="app-container">
      <el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
          <el-table-column width="100" prop="id" label="数据表ID" align="center"></el-table-column>
          <el-table-column prop="business" label="数据表名称" align="center"></el-table-column>
          <el-table-column prop="refundTotal" width="200px" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看数据报表</el-button>
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
  name: 'dataReportList',
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
