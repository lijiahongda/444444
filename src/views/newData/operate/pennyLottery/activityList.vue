<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="活动ID">
				<el-input
					v-model="searchCondition.id"
					clearable
					placeholder="活动ID"/>
			</el-form-item>
			<el-form-item label="名称">
				<el-input
					v-model="searchCondition.keyWord"
					clearable
					placeholder="请输入名称"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<el-button @click="dialogFormVisible = true">新增活动</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table  :data="list" :fit="true" border style="width: 100%">
			<el-table-column  prop="id" label="活动ID"  width="100" align="center"></el-table-column>
			<el-table-column  prop="lotteryDrawTitle" label="标题"   align="center"></el-table-column>
			<el-table-column  prop="createdAt" label="活动banner图"  align="center">
				<template slot-scope="scope">
					<img v-if="scope.row.bannerImg" :src="scope.row.bannerImg" style="width: 200px;height: 150px">
				</template>
			</el-table-column>
			<el-table-column  prop="createdAt" label="创建时间"  align="center"></el-table-column>

			<el-table-column fixed="right" label="操作"  align="center" width="160" >
				<template slot-scope="scope" align="center">
					<router-link  :to="{path:'/pennyLottery/activityDetail',query:{id:scope.row.id}}">
						<el-button type="text" size="small">详情</el-button>
					</router-link>
					<el-button type="text" size="small" @click="upLotteryDraw(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>

				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:page-size="searchCondition.limit"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>


		<el-dialog title="活动信息" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="活动标题" label-width="120px">
					<el-input v-model="form.lotteryDrawTitle" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动banner图" label-width="120px">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						:before-upload="beforeAvatarUpload">
						<img v-if="form.bannerImg" :src="form.bannerImg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addLotteryDraw">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  import { getLotteryDraws,addLotteryDraw,upLotteryDraw,delLotteryDraw} from '@/api/shops' // 接口
  export default {
    data() {
      return {
        loading: true,
        dialogFormVisible:false,
        formLabelWidth: '140px',
        form: {},
        searchCondition: {
          page: 1
        },
        total: null,
        list: [],

      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 列表数据
      getList() {
        getLotteryDraws(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data.list
            this.total = res.data.data.total
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
            this.loading = false
          }
        })
      },
      onLine(id,is_online){
        this.loading = true;
        let params= {
          id: id,
          is_online: is_online == 1 ? 0 : 1
        }
        updateLiveEventsIsOnline(params).then(res => {
          if (res.data.code === 200){
            this.getList();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      closed(){
        this.form = {}
	  },
      upLotteryDraw(row){
        this.dialogFormVisible = true;
        this.form = row;
	  },
      addLotteryDraw(){
        this.loading = true;
        let params= {
          ...this.form
        }
        let url = this.form.id ? upLotteryDraw : addLotteryDraw
        url(params).then(res => {
          if (res.data.code === 200){
            this.getList();
          }else{
            this.$message.error(res.data.msg);
          }
        })
        this.dialogFormVisible = false
      },

      handleDelete(id){
        this.loading = true;
        let params= {
          id: id
        }
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delLotteryDraw(params).then(res => {
            if (res.data.code === 200){
              this.getList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          this.loading = false;
        });
      },
      onSubmit() {
        this.searchCondition.page = 1
        this.getList()
      },
      // 搜索
      handleFilter() {
        this.searchCondition.page = 1
      },
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
      },
      handleAvatarSuccess(res, file) {
        if (res.code === 200) {
          this.$set(this.form,'bannerImg',res.url)
        } else {
          this.$set(this.form,'bannerImg','')
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        return isJPG;
      }
    }
  }
</script>
<style type="scss" scoped="scoped">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar-uploader-icon{
		border: 1px solid #ccc;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
		border: 1px dashed #d9d9d9;
	}
</style>
