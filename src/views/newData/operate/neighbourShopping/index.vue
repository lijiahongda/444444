<template>
	<div style="padding:20px">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="分享券：">
				<el-col>
					<el-input v-model="obj.keyword" placeholder="请输入分享券名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<router-link to="/operate/neighbour-shopping/add">
					<el-button type="primary">新增邻居团</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="id" width="180"></el-table-column>
			<el-table-column prop="share_title" label="标题" width="180"></el-table-column>
			<el-table-column prop="" label="图片" width="180">
				<template slot-scope="scope">
					<img style="width:100px" :src="scope.row.share_img" />
				</template>
			</el-table-column>
			<el-table-column prop="status_name" label="是否有效"></el-table-column>
			<el-table-column prop="created_at" label="创建时间"></el-table-column>
			<el-table-column prop="" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleopen(scope.row.id, scope.row.status,scope.$index)">
						{{scope.row.status == 0 ? '开启' : '关闭'}}</el-button>
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
    getshareList,
    updateCouponShareIsOnline
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
        getshareList(obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.count
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
          path: '/operate/addshareCoupons',
          query: {
            id: id
          }
        })
      },
      // 分页
      handleSizeChange(val) {
        this.fy.page_size = val
        this.tableData.page_size = val
        this.getFlightOrder()
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
