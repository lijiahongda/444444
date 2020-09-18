<!--suppress ALL -->
<template>
	<div class="app-container">
		<!--搜索部分-->
		<h4>支付宝支付配置</h4>
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column prop="aliAppId" label="支付宝AppId" align="center"></el-table-column>
<!--				<el-table-column prop="wxAppId" label="微信AppId" align="center"></el-table-column>-->
				<el-table-column prop="appName" label="商户收款名称" align="center"></el-table-column>
				<el-table-column prop="from" label="来源" align="center"></el-table-column>
				<el-table-column prop="state" label="状态" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="isActive(scope.row,'ali')">{{scope.row.state == '激活' ? '' : '激活'}}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
<!--		<div class="pagination-container" style="text-align:right;">-->
<!--			<el-pagination :current-page="pageIndex" :page-size="pageSize" :total="total" background-->
<!--						   layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />-->
<!--		</div>-->
		<h4>微信支付配置</h4>
		<div class="new_tab">
			<el-table v-loading="loading" :data="wxList.list" :fit="true" border style="width: 100%;">
				<el-table-column prop="mchId" label="微信商户号" align="center"></el-table-column>
				<el-table-column prop="oldMchId" label="微信商户号(老)" align="center"></el-table-column>
				<el-table-column prop="companyName" label="商户收款名称" align="center"></el-table-column>
				<el-table-column prop="state" label="状态" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="isActive(scope.row,'wx')">{{scope.row.state == '激活' ? '' : '激活'}}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
<!--		<div class="pagination-container" style="text-align:right;">-->
<!--			<el-pagination :current-page="pageIndex" :page-size="pageSize" :total="wxList.total" background-->
<!--						   layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />-->
<!--		</div>-->
	</div>
</template>
<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {getPayConfigList,upPayConfigState,getWxPayConfigList,upWxPayConfigState} from '@/api/admin'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        total: null,
        switchChart: false,
        list: [],
        wxList: [],
        pageTotal:0,   //显示页数
        pageIndex:1,
        pageSize:10,
        loading:true,
        status:'',
        params:'',
        label_name:"",
        roleName:''//搜索条件角色名
      }
    },
    created() {
      this.getList();
      this.getWxList();
    },
    methods: {
      isActive(row,type){
        let params = {
          id:row.id
		}
        if(row.state == '激活'){
          params.state = 0
        }else{
          params.state = 1
        }
        this.$confirm('是否继续此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let url = type == 'wx' ? upWxPayConfigState : upPayConfigState
          url(params).then(res=>{
            if(res.data.code == 200){
              this.getList();
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
			}else{
              this.$message.error(res.data.msg)
			}
		  })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      // 列表数据
      getList() {
        getPayConfigList({page:`${this.pageIndex}`,keyWord:this.roleName}).then(res=>{
          if(res.data.code==200){
            this.loading = false;
            this.list = res.data.data.list;
            this.total = res.data.data.total;
          }else{
            this.loading = false;
            this.$message.success(res.data.msg ||"网络开小差了~")
          }
        })
      },
      // 列表数据
      getWxList() {
        getWxPayConfigList({page:`${this.pageIndex}`,keyWord:this.roleName}).then(res=>{
          if(res.data.code==200){
            this.loading = false;
            this.wxList = res.data.data;
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
