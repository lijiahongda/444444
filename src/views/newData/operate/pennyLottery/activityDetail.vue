<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="ID">
				<el-input
					v-model="searchCondition.id"
					clearable
					placeholder="请输入ID"/>
			</el-form-item>
			<el-form-item label="分享标题">
				<el-input
					v-model="searchCondition.shareTitle"
					clearable
					placeholder="请输入分享标题"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<router-link  :to="{path:'/pennyLottery/add',query:{lotteryDrawId:$route.query.id}}">
					<el-button>新增</el-button>
				</router-link>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table  :data="list" :fit="true" border style="width: 100%">
			<el-table-column  prop="id" label="ID"  width="50" align="center"></el-table-column>
			<el-table-column  prop="shareTitle" label="分享标题"   align="center"></el-table-column>
			<el-table-column  prop="productName" label="商品名称"  align="center"></el-table-column>
			<el-table-column  prop="lotteryTime" label="开奖时间"  width="155" align="center"></el-table-column>
			<el-table-column  prop="startTime" label="活动开始时间"  width="155" align="center"></el-table-column>
			<el-table-column  prop="endTime" label="活动结束时间"  width="155" align="center"></el-table-column>
			<el-table-column  prop="newMemberLuckyCode" label="邀请新用户获幸运码(人数)"  width="80" align="center"></el-table-column>
			<el-table-column  prop="oldMemberLuckyCode" label="邀请老用户获得幸运码(人数)"  width="80" align="center"></el-table-column>
			<el-table-column  prop="isOnline" label="状态"  width="100" align="center"></el-table-column>

			<el-table-column fixed="right" label="操作"  align="center" width="240" >
				<template slot-scope="scope" align="center">
					<el-button type="text" size="small" @click="onLine(scope.row.id,scope.row.isOnline)">{{scope.row.isOnline == '上线' ? '下架' : '上架'}}</el-button>
					<router-link :to="{path:'/pennyLottery/add',query:{id:scope.row.id,lotteryDrawId:$route.query.id}}">
						<el-button type="text" size="small">编辑</el-button>
					</router-link>
					<el-button type="text" size="small" @click="getLotteryDrawPrizes(scope.row.id)">查看中奖人信息</el-button>
					<el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="中奖人信息" :visible.sync="dialogTableVisible" v-loading="prizesDataLoading">
      	<el-form ref="form" label-width="120px" :inline="true">
          <el-form-item label="">
            <el-input
              v-model="prizeSearchCondition.mobile"
              clearable
              placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="prizesSubmit">搜索</el-button>

            <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="document" @click="handleDownload">导出全部</el-button>
          </el-form-item>

        </el-form>
			<el-table :data="prizesData">
        <el-table-column property="id" label="ID" align="center"></el-table-column>
				<el-table-column property="nickname" label="姓名" align="center"></el-table-column>
				<el-table-column property="mobile" label="电话" width="120" align="center"></el-table-column>
				<el-table-column property="inviteMemberNum" label="邀请人数" align="center"></el-table-column>
				<el-table-column property="inviteNewMemberNum" label="拉新人数" align="center"></el-table-column>
				<el-table-column property="isPrizeName" label="中奖情况" align="center"></el-table-column>
				<el-table-column property="" label="操作">
					<template slot-scope="scope" align="center">
				
						<span v-if="scope.row.isPrize == 1">
							<el-button type="text" size="small"  @click="isCheck(scope.row.id,0)">
								修改
							</el-button>
						</span>
            	<span v-if="scope.row.isPrize == 0">
							<el-button type="text" size="small"  @click="isCheck(scope.row.id,1)">
								修改
							</el-button>
						</span>

					</template>

				</el-table-column>
			</el-table>

      <div class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="prizeSearchCondition.page"
          :page-size="prizeSearchCondition.limit"
          :total="prizesTotal"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>


		</el-dialog>
	</div>
</template>
<script>
  import { getLotteryDrawProducts,updateLiveEventsIsOnline,delLotteryDrawProduct,upLotteryDrawProductOnline,getLotteryDrawPrizes,upIsPrize} from '@/api/shops' // 接口

  export default {
    data() {
      return {
        loading: true,
        prizesDataLoading: true,
        formLabelWidth: '140px',
        form: {},
        searchCondition: {
          lotteryDrawId: this.$route.query.id
        },
        prizeSearchCondition: {
          page: 1
        },  
        total: 0,
        prizesTotal: 0,
        list: [],
        dialogTableVisible:false,
        downloadLoading: false,
        prizesData:[],
        drawProductId:0,
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 列表数据
      getList() {
        getLotteryDrawProducts(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data
            this.total = res.data.count
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
            this.loading = false
          }
        })
      },

      getLotteryDrawPrizes(id){
        this.dialogTableVisible = true
        this.prizesDataLoading  = false
        this.drawProductId      = 0;
        this.drawProductId      = id
        this.prizeSearchCondition.drawProductId=id
        getLotteryDrawPrizes(this.prizeSearchCondition).then(res => {
          if (res.data.code === 200){
            this.prizesData  = res.data.data.list
            this.prizesTotal = res.data.data.total
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.prizeSearchCondition.page = val
        this.getLotteryDrawPrizes(this.drawProductId)
      },
      onLine(id,is_online){
        this.loading = true;
        let params= {
          id: id,
          isOnline: is_online == '上线' ? 0 : 1
        }
        upLotteryDrawProductOnline(params).then(res => {
          if (res.data.code === 200){
            this.$message.success(res.data.msg);
            this.getList();
          }else{
            this.$message.error(res.data.msg);
          }
        })
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
          delLotteryDrawProduct(params).then(res => {
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

      isCheck(id,isPrize){
        this.prizesDataLoading = true;
        this.$confirm('是否确定修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          upIsPrize({id:id,isPrize:isPrize}).then(res => {
            if (res.data.code === 200){
               this.prizesDataLoading = false;
               this.getLotteryDrawPrizes(this.drawProductId)
               this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }else{
              this.$message.error(res.data.msg);
              this.prizesDataLoading = false;
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
          this.prizesDataLoading = false;
        });

      },
      onSubmit() {
        this.searchCondition.page = 1
        this.getList()
      },

      prizesSubmit() {
        this.prizeSearchCondition.page = 1
        this.getLotteryDrawPrizes(this.drawProductId)
      },

            // 导出
      handleDownload() {
        this.prizesDataLoading = true;
        let query = `drawProductId=${this.drawProductId}`
        // console.log(`http://yuetao.yuelvhui.cn/admin/exportOrderWorkList?${query}`)
        window.location.href=`http://yuetao.yuelvhui.cn/admin/getDownIsPrizes?${query}`
        this.prizesDataLoading = false;
      },

      
    }
  }
</script>
<style type="scss" scoped="scoped">

</style>
