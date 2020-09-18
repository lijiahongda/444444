<template>
	<div style="padding:20px">
		<router-link to="/operate/robot-message/edit">
			<el-button type="primary">新增机器人消息管理</el-button>
		</router-link>
		<el-table :data="tableData.list" border style="width: 100%">
			<el-table-column  label="类型" width="80">
				<template slot-scope="scope">
					<p v-for="item in scope.row">{{item.type}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="是否要发送" width="100">
				<template slot-scope="scope">
					<p v-for="item in scope.row">{{item.isSend}}</p>
				</template>
			</el-table-column>

      <el-table-column prop="" label="机器人发送状态" width="140">
				<template slot-scope="scope">
					<p v-for="item in scope.row">{{item.robotSendStatus}}</p>
				</template>
			</el-table-column>

			<el-table-column prop="" label="内容">
				<template slot-scope="scope">
					<p v-for="item in scope.row">{{item.content}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="创建时间" width="180">
				<template slot-scope="scope">
					<p v-for="item in scope.row">{{item.createdAt}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="" label="删除操作" width="80">
				<template slot-scope="scope">
					<el-button style="display: block;margin: 5px auto;" v-for="item in scope.row" :key="item.id" size="mini" @click="handleDel(item.id)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作" width="80">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row[0].randomStr)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination  @current-change="handleCurrentChange"
						   :current-page="tableData.page"
							:page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
  import {
    getCommunitySendInfos,
    delCommunitySendInfo
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
      getList() {
        getCommunitySendInfos(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }

        })
      },
      handleEdit(randomStr) {
        this.$router.push({
          path: '/operate/robot-message/edit',
          query: {
            randomStr: randomStr
          }
        })
      },
      handleDel(id){
        this.$confirm('是否继续删除该消息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCommunitySendInfo({id:id}).then(res=>{
            if(res.data.code == 200){
              this.$message.success(res.data.msg)
              this.getList()
            }else{
              this.$message.error(res.data.msg || '数据加载失败,请检查网络')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
