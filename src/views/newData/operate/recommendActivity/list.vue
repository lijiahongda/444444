<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="名称">
				<el-input
					v-model="searchCondition.keyWord"
					clearable
					placeholder="名称"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
				<el-button @click="dialogFormVisible = true">新增活动</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table  :data="list" :fit="true" border style="width: 100%">
			<el-table-column  prop="id" label="ID"  width="100" align="center"></el-table-column>
			<el-table-column  prop="name" label="名称"  align="center"></el-table-column>
			<el-table-column  prop="activityID" label="活动ID"   align="center"></el-table-column>
			<el-table-column  prop="activityName" label="活动名称"   align="center"></el-table-column>
			<el-table-column  prop="type" label="类型"  align="center"></el-table-column>
			<el-table-column  prop="createdAt" label="创建日期"  align="center"></el-table-column>
			<el-table-column fixed="right" label="操作"  align="center" width="160" >
				<template slot-scope="scope" align="center">
					<!-- <el-button type="text" size="small" @click="onLine(scope.row.id,scope.row.is_online)">{{scope.row.is_online == 1 ? '下架' : '上架'}}</el-button> -->

					<!-- <router-link  :to="{path:'/pennyLottery/activityDetail',query:{id:scope.row.id}}">
						<el-button type="text" size="small">详情</el-button>
					</router-link> -->
					<el-button type="text" size="small" @click="upLotteryDraw(scope.row)">编辑</el-button>
					<!-- <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:total="total"
				background
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
			/>
		</div>


		<el-dialog title="活动信息" :visible.sync="dialogFormVisible" width="80%" @closed="form={}">
			<el-form :model="form">
				<el-form-item label="名称" label-width="120px">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="请选择类型" label-width="120px">
					<el-select v-model="form.type" placeholder="请选择">
						<el-option
							v-for="item in types"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请选择活动" label-width="120px">
					<el-select v-model="form.activityId" placeholder="请选择" @focus="getActivitiesOpts" style="width:400px;">
						<el-option
							v-for="item in acts"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-dialog
				width="70%"
				title="活动列表"
				:visible.sync="innerVisible"
				append-to-body>
				<el-form ref="form" label-width="120px" :inline="true">
					<el-form-item label="活动标题">
						<el-input
							v-model="activitiesopts.activity_name"
							clearable
							placeholder="活动标题"/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitA">搜索</el-button>
					</el-form-item>
				</el-form>
				<el-table  :data="activities" :fit="true" border style="width: 100%">
					<el-table-column  prop="activity_name" label="活动标题"  align="center"></el-table-column>
					<el-table-column  prop="share_title" label="分享标题"   align="center"></el-table-column>
					<el-table-column fixed="right" label="操作"  align="center" width="60" >
						<template slot-scope="scope" align="center">
							<el-button type="text" size="small" @click="choose(scope.row)">选取</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination-container" style="text-align:right;">
					<el-pagination
						:current-page="activitiesopts.page"
						:total="activitiesopts.total"
						background
						layout="total, prev, pager, next, jumper"
						@current-change="handleCurrentChange1"
					/>
				</div>
			</el-dialog>
			<div slot="footer" class="dialog-footer">
				<el-button @click="innerVisible = true">取 消</el-button>
				<el-button type="primary" @click="addRecommendActivityInfo">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
  import { getRecommendActivities,addRecommendActivityInfo,upRecommendActivityInfo,delLotteryDrawProduct,getActivities} from '@/api/shops' // 接口
  export default {
    data() {
      return {
        loading: true,
        dialogFormVisible:false,
        innerVisible: false,
        formLabelWidth: '140px',
        form: {},
        searchCondition: {
          page: 1
        },
        activitiesopts: {
          page: 1,
        },
        types: [{
          value: '1',
          label: '签到'
        }, {
          value: '2',
          label: '购物车推荐'
        }, {
          value: '3',
          label: '加油'
        }, {
          value: '4',
          label: '充值'
        }, {
          value: '5',
          label: '酒店'
        }, {
          value: '6',
          label: '退款申请页'
        }],
		activities:[],
		acts:[],
        total: null,
        list: [],

      }
    },
    mounted() {
      this.getList();
      this.getActivities();
    },
    methods: {
      // 列表数据
      getList() {
        getRecommendActivities(this.searchCondition).then(res => {
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
      getActivitiesOpts(){
        this.innerVisible = true
	  },
      choose(row){
        this.acts.push({value:row.id,label:row.activity_name});
		this.$set(this.form,'activityId',row.id)
		this.innerVisible = false
	  },
      getActivities(){
        getActivities(this.activitiesopts).then(res=>{
          if (res.data.code === 200){
            this.activities = res.data.data
            this.activitiesopts.total = res.data.count
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
      addRecommendActivityInfo(){
        this.loading = true;
        let params= {
          ...this.form
        }
        let url = this.form.id ? upRecommendActivityInfo : addRecommendActivityInfo
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
        delLotteryDrawProduct(params).then(res => {
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
      onSubmitA() {
        this.activitiesopts.page = 1
        this.getActivities()
      },
      // 分页
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
      },
      handleCurrentChange1(val) {
        this.activitiesopts.page = val
        this.getActivities()
      },
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
