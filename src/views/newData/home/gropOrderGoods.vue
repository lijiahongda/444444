<template>
	<div id="iconManage" v-loading="loading">
      <el-row :gutter="20" style="margin-bottom: 10px;">
		  <el-col :span="8">
			  <el-date-picker v-model="searchObj.startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" style="width: 150px;" />
			  <el-date-picker v-model="searchObj.endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" style="width: 150px;" />
		  </el-col>
		  <el-col :span="3">
			  <el-input v-model="searchObj.splId" placeholder="供应商ID" clearable  ></el-input>
		  </el-col>
		  <el-col  :span="8">
			  <el-select
				  v-model="searchObj.splId"
				  filterable
				  @keyup.enter.native="handleSearch"
				  remote
				  clearable
				  reserve-keyword
				  placeholder="请输入供应商名称"
				  :remote-method="remoteMethod"
				  :loading="splidLoading">
				  <el-option
					  v-for="item in splList"
					  :key="item.sid"
					  :label="item.supplier_name"
					  :value="item.sid">
				  </el-option>
			  </el-select>
		  </el-col>
          <el-col :span="2">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-col>
      </el-row>

      <el-row :gutter="20" class="order_list">
        <el-col class="sku_num">会员数:<span>{{memberGrop.memberCount}}</span></el-col>
        <el-col class="sku_num">成长值统计:<span>{{memberGrop.integrals}}</span></el-col>
        <el-col class="sku_num">销卡创客数:<span>{{memberGrop.taskMemberCount}}</span></el-col>
        <el-col class="sku_num">预估销卡量:<span>{{memberGrop.ygTaskCount}}</span></el-col>
        <el-col class="sku_num">真实销卡量:<span>{{memberGrop.taskCount}}</span></el-col>
			</el-row>

		<el-table
			:data="tableData.data"
			border
			@sort-change="getSort"
			style="width: 100%">
            <el-table-column align="center" prop="goodsId" label="商品ID" width="80"> </el-table-column>
			<el-table-column align="center" prop="goodsName" label="商品名称" width="250"> </el-table-column>
			<el-table-column align="center" prop="supplierName" label="供应商"> </el-table-column>
            <el-table-column align="center" prop="goodsPriceOrig" label="单价" :sortable="'custom'"> </el-table-column>
            <el-table-column align="center" prop="count" label="下单数量" :sortable="'custom'"> </el-table-column>

            <el-table-column align="center" prop="actualPrice" label="销售金额" :sortable="'custom'"></el-table-column>
			<el-table-column align="center" prop="integral" label="成长值" :sortable="'custom'"> </el-table-column>

		</el-table>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchObj.page"
				:page-size="tableData.pageSize"
				:total="tableData.total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
			/>
		</div>

	</div>
</template>

<script>
 import { getGropOrderGoods } from '@/api/order' // 接口
 import { getSupplier } from '@/api/cust' // 接口


  export default {
    name: 'iconManage',
	data(){
      return {
        tableData:{
          list:[]
        },
        loading: false,
        splidLoading: false,
            searchCondition:{},
            dialogFormVisible: false,
        form:{},
        imgFileList:[],
        splList:[],
        formLabelWidth: '120px',

        dialog:{
          title: '新增Icon',
          type: 1
        },
        searchObj: {
            type: "",
            keyword:"",
		  	sort:'',
            memberType:"",
            page:1
        },
        // 上传图片
        iconImg:[],
        detailImg:[],
        shareImg:[],
        jupmTypes:[],
        memberGrop:{},

	  }
	},
	created(){
      this.getList();

	},
	methods:{
      getSort(val){
        if (val.prop == 'goodsPriceOrig') {
          if (val.order == 'ascending') {
            this.searchObj.sort = 'goodsPriceOrigAsc'
          } else {
            this.searchObj.sort = 'goodsPriceOrigDesc'
          }
        } else if (val.prop == 'count') {
          if (val.order == 'descending') {
            this.searchObj.sort = 'countDesc'
          } else {
            this.searchObj.sort = 'countAsc'
          }
        } else if (val.prop == 'actualPrice') {
          if (val.order == 'descending') {
            this.searchObj.sort = 'actualPriceDesc'
          } else {
            this.searchObj.sort = 'actualPriceAsc'
          }
        } else if(val.prop == 'integral'){
          if(val.order == 'descending'){
            this.searchObj.sort = 'integralDesc'
          } else {
            this.searchObj.sort = 'integralAsc'
          }
        }
        this.getList();
	  },
      remoteMethod(query) {
        if (query.length > 1) {
          this.splidLoading = true
          getSupplier({
            supplierName: query
          }).then(res => {
            if (res.data.code === 200) {
              this.splidLoading = false
              this.splList = res.data.data.filter(item => {
                return item.supplier_name.indexOf(query) > -1
              })
            } else {
              this.splList = []
              this.$message.warning(res.data.msg)
              this.loading = false
            }
          })
        }
      },
      getList(){
        this.loading = true;
        getGropOrderGoods(this.searchObj).then(res=>{
          if(res.data.code == 200) {
            this.tableData = res.data;
            // console.log(res.data.memberData,'dafasdfas');
            this.memberGrop=res.data.memberData.memberGrop[0];
            this.loading = false;
		  } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
		  })
	  },

    //搜索点击事件
    handleSearch() {
        this.searchObj.page = 1;
        let params = this.searchObj;
        // console.log(searchObj.page,"搜索参数");
        this.getList();
    },

    handleCurrentChange(val){
        this.searchObj.page= val;
        this.getList();
    },

  }}
</script>

<style scoped>
  #iconManage{
    padding: 20px;
  }
  .right{
    margin:0 20px 20px 0;
    float:left
  }
  .wid{
    width:auto;
    min-width: 80px;
  }
  .el-upload-list__item{
    height: 148px;
    line-height: 148px;
  }
 .el-upload-list__item-thumbnail{
      width:100%;
      height:auto;
      vertical-align: middle;
  }

   .goodsName{
        display: block;
    }
	.order_list{
		margin: 30px 0;
	}
    .order_list .sku_num,.order_list span[data-v-1bad5b9a]{
        color: #999;
		font-size: 16px;
        line-height:36px
    }
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>
