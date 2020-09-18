<template>
  <div style="padding:20px">
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item label="">
        <el-input v-model="obj.keyWord" placeholder="请输入商品ID" clearable />
      </el-form-item>
     
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <router-link :to="{path:'/tools/addProductAgainBuy'}">
          <el-button type="primary">添加</el-button>
        </router-link>

      </el-form-item>
    </el-form>

    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column align="center" label="id" prop="id"></el-table-column>
      <el-table-column align="center" label="商品ID" prop="productId"></el-table-column>
      <el-table-column align="center" label="商品名称" prop="productName"></el-table-column>
      
      <el-table-column align="center" label="二次购买价格" prop="againPrice"></el-table-column>
      <el-table-column align="center" label="组合成长值" prop="groupGrowth"></el-table-column>
      <el-table-column align="center" label="立减成长值" prop="knockGrowth"></el-table-column>
      <el-table-column align="center" label="加购价钱" prop="purchasePrice"></el-table-column>

      <el-table-column align="center" prop="" label="操作" width="220">
        <template slot-scope="scope">
              <!-- <el-button type="primary" @click="handleDetail(scope.row.id)">详情</el-button> -->
              <router-link :to="{path:'/tools/addProductAgainBuy',query:{id:scope.row.id}}">
							<el-button type="primary">编辑</el-button>
						</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="tableData.pageSize"
                     :current-page="tableData.page"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getProductAgainBuys,
} from '@/api/shops'
export default {
  data () {
    return {
      tableData: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      fy: {
        page: 1, //当前页
        page_size: 10, //每页条数
      },
      handleStatus: '',
      form: {
        images: ''
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex,

      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    addConfig () {
      this.dialogFormVisible = true;
      this.handleStatus = 1;
    },
    onSearch () {
      this.obj.page = 1;
      this.getList(this.obj)
    },
    handleCheck (id, status) {
      this.$prompt('请输入原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (status == 3 && !value) {
          this.$message.warning('请输入驳回原因');
          return false
        }
        checkCommunityInvitationGroup({ id: id, examineStatus: status, examineDesc: value }).then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    getList () {
      getProductAgainBuys(this.obj).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
          return
        }

      })
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList()
    },
  }
}

</script>
<style scoped="scoped" lang="scss">
.el-table {
  margin-top: 20px;
}
</style>
