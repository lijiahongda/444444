<template>
	<div id="page">
		<router-link target="_blank" :to="{path:'live-banner-detail'}">
			<el-button type="success">新增banner</el-button>
		</router-link>
		<!--搜索部分-->
		<el-table  :data="info.list" :fit="true" border style="width: 100%">
			<el-table-column  prop="live_banner_title" label="标题"  width="100" align="center"></el-table-column>
			<el-table-column prop="" label="baner图"  width="200" align="center">
				<template slot-scope="scope">
					<img style="height:200px;width: 180px;" :src="scope.row.live_banner_src" alt="">
				</template>
			</el-table-column>
			<el-table-column  prop="is_href" label="是否跳转" width="100"  align="center">
				<template slot-scope="scope">
					{{scope.row.is_href ? '是' : '否'}}
				</template>
			</el-table-column>
			<el-table-column  prop="live_banner_href" label="跳转地址"  align="center"></el-table-column>
			<el-table-column  prop="" label="时间范围"  width="300" align="center">
				<template slot-scope="scope">
					{{scope.row.start_time}}-{{scope.row.end_time}}
				</template>
			</el-table-column>
			<el-table-column  prop="create_time" label="创建时间"  width="180" align="center"></el-table-column>

			<el-table-column fixed="right" label="操作"  align="center" width="220" >
				<template slot-scope="scope" align="center">
					<router-link target="_blank" :to="{path:'live-banner-detail',query:{id:scope.row.live_banner_id}}">
						<el-button type="text" size="small">编辑</el-button>
					</router-link>
					<router-link target="_blank" :to="{path:'live-banner-detail',query:{id:scope.row.live_banner_id,type:'detail'}}">
						<el-button type="text" size="small">详情</el-button>
					</router-link>
					<el-button type="text" size="small" @click="handleDelete(scope.row.live_banner_id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:total="info.count"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script>
  import { getLiveBannerList,delLiveBanner} from '@/api/shops' // 接口
  export default {
    name: 'liveBanner',
	data(){
      return{
        total:0,
		info:{},
        searchCondition:{}
	  }
	},
	created(){
		this.getLiveBannerList()
	},
	methods:{
      getLiveBannerList(){
        getLiveBannerList(this.searchCondition).then(res=>{
          if(res.data.code == 200){
			this.info = res.data.data
		  }
		})
	  },
      handleDelete(id){
        this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delLiveBanner({live_banner_id:id}).then(res=>{
			if(res.data.code == 200){
			  this.$message.success(res.data.msg)
              this.getLiveBannerList()
			}else{
              this.$message.error(res.data.msg)
			}
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

	  },
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getLiveBannerList()
      }
	}
  }
</script>

<style scoped>
	#page{
		padding: 20px;
	}
</style>
