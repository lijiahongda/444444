<template>
    <div class="app-container">
      <el-form ref="form" label-width="120px" :inline="true"  v-if="!loading">
        <el-form-item>
          <router-link to="/financialStatementData/createTable_add"><el-button type="primary">创建数据表</el-button></router-link>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
          <el-table-column prop="id" label="数据报表ID" align="center"></el-table-column>
          <el-table-column prop="business" label="数据报表名称" align="center"></el-table-column>
          <el-table-column prop="title" label="统计周期" align="center"></el-table-column>
          <el-table-column prop="subTitle" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="type" label="结束时间" align="center"></el-table-column>
          <el-table-column prop="refundTotal" width="400px" label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleAddKey(scope.$index, scope.row)">添加字段</el-button>
              <el-button size="mini" @click="handleEditData(scope.$index, scope.row)">添加数据</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
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
// import hotelCharts from './hotelCharts' // 图表
import { advertList,categoryLis,deleteAdvert} from '@/api/advert' // 接口

export default {
  name: 'dataTable',
    data() {
      return {
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
		this.searchCondition.page = 1
		this.searchCondition.pageSize = 20
		this.getList()
    },
    methods: {
        addAdvertisingClick(orderNo) {
            this.$router.push({ path: '/advert/update' })
        },
        // 列表数据
        getList() {
          this.loading = true
          advertList(this.searchCondition).then(res => {
            if (res.data.code === 200){
                this.list = res.data.data.list
                this.total = res.data.data.total
                this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
              this.getList()
        },
        handleEdit(index, row) {
          this.$router.push({ path: '/financialStatementData/createTable_add'})
        },
        handleAddKey(index, row) {
          this.$router.push({ path: '/financialStatementData/createTable_add_key'})
        },
        handleAddData(index, row) {
          this.$router.push({ path: '/financialStatementData/createTable_add_data'})
        },
        //广告删除 deleteAdvert
        handleDelete(index, row) {
          let self = this;
          console.log(index, row);
          this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              deleteAdvert({ id:row.id }).then((res)=>{
                if(res.data.code == 200){
                    self.$message.success("删除成功")
                    self.getList()
                }
                else{
                    self.$message.error(res.data.msg)
                }
              })
            }).catch(() => {
              slef.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        }
    }
}
</script>
<style type="scss">
</style>
