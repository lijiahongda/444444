<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<!--<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="直播用户ID">
				<el-input
					v-model="searchCondition.live_people_id"
					clearable
					placeholder="请输入直播用户ID"/>
			</el-form-item>
		</el-form>-->
		<!--搜索部分-->
		<el-table  :data="tableData.list" :fit="true" border style="width: 100%">
			<el-table-column  prop="uid" label="uid"  width="100" align="center"></el-table-column>
			<el-table-column  prop="nickname" label="姓名"  width="100" align="center"></el-table-column>
			<el-table-column  prop="phone" label="手机号"  width="150" align="center"></el-table-column>
			<el-table-column  prop="prize_name" label="奖品"   align="center"></el-table-column>
			<el-table-column  prop="create_time" label="获取时间"  width="180" align="center"></el-table-column>
			<el-table-column fixed="right" label="操作"  align="center"  width="100">
				<template slot-scope="scope" align="center">
					<el-button type="text" size="small" @click="showDialog(scope.row)">编辑奖品信息</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:total="tableData.count"
				background
				:page-size="20"
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
			/>
		</div>
		<el-dialog
			title="请填写奖品名称和收货地址"
			:visible.sync="dialogVisible"
			width="540px"
			:before-close="handleClose">
			<el-input  v-model="prizeName" style="width:500px;line-height:36px;"   placeholder="请填写奖品名字" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="updLiveWinnerPrizeName">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
  import { getLiveWinnerList,updLiveWinnerPrizeName} from '@/api/shops' // 接口
  export default {
    data() {
      return {
        dialogVisible: false,
        prizeName:'',
		id: '',
        loading: true,
        formLabelWidth: '140px',
        form: {},
        searchCondition: {
          page: 1
        },
        total: null,
        tableData: {
          list:[]
		},

      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 列表数据
      getList() {
        this.loading = true;
        getLiveWinnerList(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.tableData = res.data.data
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
            this.loading = false
          }
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.prizeName = '';
            done();
          })
          .catch(_ => {});
      },
      showDialog(item){
        this.dialogVisible = true;
        this.prizeName = item.prize_name
        this.id = item.id
	  },
      updLiveWinnerPrizeName() {
        let params = {
          prizeName: this.prizeName,
		  id: this.id
		}
        updLiveWinnerPrizeName(params).then(res => {
          if (res.data.code === 200){
            this.dialogVisible = false;
            this.getList();
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
      handleDelete(id){
        console.log(444)
        this.loading = true;
        let params= {
          id: id
        }
        deleteLiveEvents(params).then(res => {
          if (res.data.code === 200){
            this.getList();
          }else{
            this.$message.error(res.data.msg);
          }
        })
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
      }
    }
  }
</script>
<style type="scss" scoped="scoped">

</style>
