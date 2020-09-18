<template>
	<div style="padding:20px">
		<router-link to="/operate/userCouponLine/add">
			<el-button type="primary">新增用户链路</el-button>
		</router-link>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column align="center" prop="id" label="id" width="80"></el-table-column>
			<el-table-column align="center" prop="memberLayered" label="用户分层" width="140"></el-table-column>
			<el-table-column align="center" prop="linkNameType" label="类型" width="180"></el-table-column>
			<el-table-column align="center" prop="created_at" label="优惠券信息">
				<template slot-scope="scope">
					<p v-for="item in scope.row.couponList">ID：{{item.id}} 名称：{{item.name}} 面额：{{item.amount}}</p>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="adminName" label="操作人" width="180"></el-table-column>
			<el-table-column align="center" prop="" label="操作" width="120">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						   :current-page="tableData.page" :page-sizes="[5,10, 20, 30, 40]" :page-size="tableData.pageSize"
						   layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
  import {
    getMemberLinkCouponList
  } from '@/api/shops'
  const isInArray = (single, arr) => {
    return (arr.findIndex(res => {
      return res === single
    })) >= 0
  }
  export default {
    data() {
      return {
        tableData: [{
          id: '',
          page: 1, //当前页
          page_size: 10, //每页条数
          share_title: '',
          share_img: '',
          status_name: '',
          created_at: '',
          status: ''
        }],
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
        total: 0, //总条数
        pageIndex: 1,
        obj: {
          page: this.pageIndex,
          keyword: ''
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      onSearch() {
        this.obj.page = 1;
        this.getList(this.obj)
      },
      getList(obj) {
        getMemberLinkCouponList(obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }

        })
      },
      //是否开启
      handleopen(id, status, idx) {
        status = status == 0 ? 1 : 0
        let opt = {
          id: id,
          status: status
        }
        updateCouponShareIsOnline(opt).then((res) => {
          if (res.data.code == 200) {
            this.$message.success('操作成功')
            this.tableData[idx].status = status
          }
        })
      },
      handleEdit(id) {
        this.$router.push({
          path: '/operate/userCouponLine/add',
          query: {
            id: id
          }
        })
      },
      // 分页
      handleSizeChange(val) {
        this.fy.page_size = val
        this.tableData.page_size = val
        // this.getFlightOrder()
      },
      handleCurrentChange(val) {
        this.fy.page = val
        this.tableData.page = val
        this.getFlightOrder()
      },
      getFlightOrder() {
        let params = this.fy
        console.log(params)
        getshareList(params).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.count
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }
        })
      }
    }
  }

</script>
<style scoped="scoped" lang="scss">

</style>
