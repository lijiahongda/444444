<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="forms" label-width="120px" :inline="true">
			<el-form-item label="搜索商品：">
				<el-input v-model="name" placeholder="请输入商品名称" style="width:200px;" clearable @clear="onSearch" @keyup.enter.native="onSearch"
				 prefix-icon="el-icon-search" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
				<el-button type="primary" @click="onConfirm()">添加</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab">
			<el-table v-loading="loading" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="sort" label="排序" align="center">
				</el-table-column>
				<el-table-column fixed prop="id" label="id" align="center" width="200">
				</el-table-column>
				<el-table-column fixed prop="name" label="商品名称" align="center">
				</el-table-column>

				<el-table-column fixed prop="goods_skuid" label="skuID" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope" align="center">
						<el-button type="text" size="small" @click="onConfirm(scope.row.id)">编辑</el-button>
						<el-button type="text" size="small" @click="onDel(scope.row.id,scope.$index,list)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
			 layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {getRecommendGoodsList,delRecommendGoods,getChannelList } from '@/api/shops'
export default {
    directives: {
        waves
    },
    data() {
        return {
            total: null,
			phone:'',
            switchChart: false,
            list: [],
		  pageTotal:0,   //显示页数
		  pageIndex:1,
		  pageSize:10,
		  startTime:'',
		  endTime:'',
		  type:'',
		  status:'',
		  params:'',
		  supplierName:"",
		  formLabelWidth:"90px",
		  dialogFormVisible:false,
		  form:{
			  name:"",
			  sort:"",
		  },
		  name:"",///搜索名字
		  titleName:"新增分类",
		  typeId:"",
		  loading:true,
		  channelList:[],
		  channelId:''
        }
    },
	mounted() {
		this.getList(1)
		if (this.$route.query.id) {
			 this.editId=this.$route.query.id;
			this.getList(this.$route.query.id)
			this.disableds =true;
		}
		this.getChannelList();
	},
  //   created() {
		// this.getList();
		// this.getChannelList();
  //   },
    methods: {
        // 列表数据
        getList() {
			// channelId:3
			getRecommendGoodsList({page:this.pageIndex,pageSize:this.pageSize,name:this.name, channelId:this.channelId}).then(res=>{
				if(res.data.code == 200){
				  this.loading = false;
				  this.list = res.data.data.list;
				  this.pageTotal = res.data.data.total;
				  console.log(res.data,2112)
				  // this.getList()
				}else{
					this.loading = false;
				}
			})
			console.log(this.list,1234)

		},

		getChannelList()
			{
				getChannelList().then((res) => {
					if (res.data.code == 200) {
						this.channelList = res.data.data
					}
				}).catch((error) => {
					console.log(error)
				})
			},
		//删除
		onDel(id,idx,list){
			this.$confirm('此操作将直接删除该模板无需保存, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delRecommendGoods({id:id}).then(res=>{
					if(res.data.code == 200){
						list.splice(idx,1)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}else{
						this.$message.error(res.data.msg || '网络开小差了~')
					}
				})
			}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

		},
		// 编辑
		onConfirm(type){
			if(type){
				this.$router.push('/operate/recommendsAdd?id='+type)
			}else{
				this.$router.push('/operate/recommendsAdd')
			}
		},

        // 搜索
        onSearch() {
			this.loading = true
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
