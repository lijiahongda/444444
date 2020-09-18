	<template>
  <div class="lottery">
    <el-button type="primary"
               @click="addLottery">新增领券秒杀</el-button>
    <el-table :data="tableData"
              v-loading="loading"
              style="width: 100%"
              border
              stripe
              :fit="true">
      <el-table-column prop="id"
                       label="ID"
                       align="center"></el-table-column>
      <!-- <el-table-column prop label="名称" align="center">
        <template slot-scope="scope">{{scope.row.start_time}}-{{scope.row.end_time}}</template>
      </el-table-column>-->
      <el-table-column prop="home_title"
                       label="名称"
                       align="center"></el-table-column>
      <el-table-column prop="add_time"
                       label="创建时间"
                       align="center"></el-table-column>
      <el-table-column label="操作"
                       width="180"
                       align="center">
        <template slot-scope="scope">
          <el-button type="plain"
                     @click="edit(scope.row)">编辑</el-button>
          <!-- <el-button type="danger"
                     @click="delRow(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination :current-page="obj.page"
                     :page-sizes="[10]"
                     :page-size="pageSize"
                     :total="pageTotal"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </div>

</template>

	<script>
import { couponpurchaseList, deleteCouponCollectionCenter } from "@/api/order";
export default {
  name: "lottery",
  data () {
    return {
      loading: false,
      tableData: [],

      pageTotal: 0, //显示页数
      pageIndex: 1,
      pageSize: 10,
      obj: {
        page: 1,
      },
    };
  },
  created () {
    this.getList();
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      this.obj.page = 1;
      this.getList();
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList();
    },
    getList () {
      couponpurchaseList(this.obj).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;

          this.total = res.data.data.count;
          this.pageTotal = res.data.data.count;
        }
        console.log(res);
      });
    },
    addLottery () {
      this.$router.push({ path: "/operate/vouchersSeckillInfo" });
    },
    edit (row) {
      this.$router.push({ path: "/operate/vouchersSeckillInfo", query: { id: row.id } });
    },
    delRow (row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          deleteCouponCollectionCenter(params).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      // this.$router.push({
      //   path: "/operate/add-lottery",
      //   query: { id: row.la_id },
      // });
    },
  },
};
</script>

	<style scoped>
.lottery {
  padding: 20px;
}
.el-button {
  margin-bottom: 20px;
}
</style>
