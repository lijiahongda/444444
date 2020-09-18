<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="所属模块">
				<el-select v-model="relevanceType" placeholder="请选择模块" clearable>
					<el-option
						v-for="item in relevanceTypes"
						:key="item.id"
						:label="item.value"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="操作按钮">
				<el-select v-model="message" placeholder="请选择模块" clearable>
					<el-option
						v-for="item in buttonTypes"
						:key="item.id"
						:label="item.value"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="修改数据ID">
				<el-input v-model="relevanceId" placeholder="修改数据ID"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleFilter">搜索</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list.list" :fit="true" border style="width: 100%;">
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="adminUserName" label="操作人" align="center"></el-table-column>
        <el-table-column prop="relevanceType" label="操作模块" align="center"></el-table-column>
        <el-table-column prop="input" label="修改数据json" align="center"></el-table-column>
        <el-table-column prop="message" label="操作按钮" align="center"></el-table-column>

				<el-table-column prop="" label="操作内容" align="center">
					<template slot-scope="scope" align="center">
						<p v-html="scope.row.changeDataStr"></p>
					</template>
				</el-table-column>

        <el-table-column prop="createdTime" label="时间" align="center"></el-table-column>
        <el-table-column prop="ip" label="ip" align="center"></el-table-column>

			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex"  :page-size="list.pageSize" :total="list.total" background
						   layout="total, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {getAdminLogList,getAdminLogType,getAdminLogButtonType} from '@/api/admin'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        total: null,
        switchChart: false,
        list: [],
        pageTotal:0,   //显示页数
        pageIndex:1,
        pageSize:10,
        loading:true,
        status:'',
        params:'',
        relevanceTypes:[],
        relevanceId:'',
        message:'',
		buttonTypes:[],
        relevanceType:''//搜索条件
      }
    },
    created() {

      this.getList();
      this.getAdminLogType();
      this.getAdminLogButtonType()
    },
    methods: {
      getAdminLogType(){
        getAdminLogType().then(res=>{
          if(res.data.code == 200){
            this.relevanceTypes = res.data.data
		  }else{
            this.$message.error(res.data.msg)
		  }
		})
	  },
      getAdminLogButtonType(){
        getAdminLogButtonType().then(res=>{
          if(res.data.code == 200){
            this.buttonTypes = res.data.data
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      // 列表数据
      getList() {
        getAdminLogList({page:`${this.pageIndex}`,relevanceType:this.relevanceType,relevanceId:this.relevanceId,message:this.message}).then(res=>{
          if(res.data.code==200){
            this.loading = false;
            this.list = res.data.data;
            this.total = res.data.data.total;
          }else{
            this.loading = false;
            this.$message.success(res.data.msg ||"网络开小差了~")
          }
        })
      },
      // 搜索
      handleFilter() {
        this.loading =true;
        this.pageIndex = 1;
        this.getList()
      },
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.pageIndex = val
        this.getList()
      }
    }
  }
</script>
<style type="scss">
	.goodsName{
		display: block;
	}
</style>
