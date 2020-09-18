<template>
	<div style="padding:20px">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="名称：">
				<el-col>
					<el-input v-model="obj.name" placeholder="请输入名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<el-button type="primary"  @click="addStrategyCategory">新增分类</el-button>
				<router-link to="/tools/community-guides">
					<el-button >返回社区攻略列表</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<el-table :data="tableData.list" border style="width: 100%">
			<el-table-column align="center" prop="id" label="id" width="180"></el-table-column>
			<el-table-column align="center" prop="name" label="名称" width="180"></el-table-column>
			<el-table-column align="center" prop="createdTime" label="创建时间"></el-table-column>
			<!--<el-table-column align="center" prop="" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
				</template>
			</el-table-column>-->
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination  @current-change="handleCurrentChange"
						   :current-page="tableData.page"  :page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
  import {
    getStrategyCategoryList,
    addStrategyCategory
  } from '@/api/shops'
  export default {
    data() {
      return {
        tableData: [],
        fy: {
          page: 1, //当前页
          page_size: 10, //每页条数
        },
        total: 0, //总条数
        pageIndex: 1,
        videoDialog: false,
        obj: {
          page: this.pageIndex,
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      onSearch() {
        this.obj.page = 1;
        this.getList()
      },
      addStrategyCategory(){
        this.$prompt('请输入分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let params = {
            name:value,
            level:1,
            parent_id:'0'
          }
          addStrategyCategory(params).then(res=>{
            if(res.data.code == 200){
              this.$message.success(res.data.msg)
              this.getList()
            }else{
              this.$message.error(res.data.msg)
            }
		  })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
	  },
      getList() {
        getStrategyCategoryList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
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
          path: '/operate/addshareCoupons',
          query: {
            id: id
          }
        })
      },
      handleCurrentChange(val) {
        this.obj.page = val;
        this.getList()
      },
    }
  }

</script>
<style scoped="scoped" lang="scss">

</style>
