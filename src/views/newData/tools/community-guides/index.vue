<template>
	<div style="padding:20px">
		<router-link to="/tools/community-guides/edit">
			<el-button type="primary">新增攻略</el-button>
		</router-link>
		<router-link to="/tools/community-guides/categoryList">
			<el-button type="primary">分类列表</el-button>
		</router-link>
		<el-table :data="tableData.list" border style="width: 100%">
			<el-table-column  align="center" label="id" width="60" prop="id"></el-table-column>
			<el-table-column  align="center" label="是否为置顶图片" width="120" prop="is_top">
				<template slot-scope="scope">
					{{scope.row.is_top==1 ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column  align="center" label="置顶封面图" width="100" prop="top_img">
				<template slot-scope="scope">
					<img :src="scope.row.top_img" alt="">
				</template>
			</el-table-column>
			<el-table-column  align="center" label="置顶详情图" width="100" prop="top_content_img">
				<template slot-scope="scope">
					<img :src="scope.row.top_content_img" alt="">
				</template>
			</el-table-column>
			<el-table-column  align="center" label="邀请图" width="100" prop="invite_img">
				<template slot-scope="scope">
					<img :src="scope.row.invite_img" alt="">
				</template>
			</el-table-column>
			<el-table-column  align="center" label="邀请专属图" width="100" prop="invite_exclusive_img">
				<template slot-scope="scope">
					<img :src="scope.row.invite_exclusive_img" alt="">
				</template>
			</el-table-column>
			<el-table-column  align="center" label="标题" width="80" prop="title"></el-table-column>
			<el-table-column  align="center" label="描述" prop="desc"></el-table-column>
			<el-table-column  align="center" label="功能按钮类型" width="140" prop="button_type"></el-table-column>
			<el-table-column  align="center" label="是否有视频链接" width="140" prop="is_video">
				<template slot-scope="scope">
					{{scope.row.is_video==1 ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column  align="center" label="视频链接" width="80" prop="video_url"></el-table-column>
			<el-table-column  align="center" label="排序值" width="80" prop="sort"></el-table-column>
			<el-table-column  align="center" label="创建时间" width="180" prop="created_time"></el-table-column>
			<el-table-column prop="" label="操作" width="80">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination @current-change="handleCurrentChange"
						   :current-page="tableData.page" :page-size="tableData.pageSize"
						   layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
  import {
    getStrategyArticleList
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
      getList() {
        getStrategyArticleList(this.obj).then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message || '数据加载失败,请检查网络')
            return
          }

        })
      },
      handleEdit(id) {
        this.$router.push({
          path: '/tools/community-guides/edit',
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
img{
	width: 70px;
	height: 70px;
}
.el-table{
	margin-top: 10px;
}
</style>
