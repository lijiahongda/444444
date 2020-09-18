<template>
    <div class="app-container">
      <el-form style="margin-bottom:20px;" :model="form" ref="form" :inline="true" class="demo-form-inline">
		  <el-form-item>
        <el-select v-model="form.state" placeholder="商品状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="form.keyword" placeholder="分享名称"></el-input>
		  </el-form-item>
			<el-form-item>
			  <el-button @click="getList" type="primary">查询</el-button>
			  <router-link to="/operate/integralAdd"><el-button type="primary">新建</el-button></router-link>
			</el-form-item>
      </el-form>
        <el-table v-if="!loading" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column prop="id" label="编码" align="center">
						</el-table-column>
						<el-table-column prop="product_name" label="分享名称" align="center"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="goods_category" width="200px" label="商品类型" align="center">
            </el-table-column>
			      <el-table-column prop="integral" label="所需积分" align="center"></el-table-column>
			      <el-table-column prop="integral" label="上下架状态" align="center">
							<template slot-scope="scope">
								<span v-if='scope.row.state == 0' style="color: #f00;">下架</span>
								<span v-else style="color: green;">上架</span>
							</template>
						</el-table-column>
            <el-table-column fixed="right" prop="refundTotal" width="200px" label="操作" align="center">
              <template slot-scope="scope">
								<el-button  size="mini" @click="updateIntegralStoreIsOnline(scope.$index,scope.row,list)"><span v-html='scope.row.state == 0 ? "上架" : "下架"'></span></el-button>
                <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="form.page"
          :page-sizes="[10]"
          :page-size="form.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { bargainsList,getSeckills,updateIntegralStoreIsOnline,getIntegralStores } from '@/api/shops' // 接口

export default {
    name: 'gropList',
    data() {
      return {
        tableData: '',
        dialogTableVisible: false,
        input:'',
        total : null,
        loading: false,
        list: [],
        timeArray:[],
        form:{
          state:'',//活动状态
          keyword:'',//分享标题
					page:1,
					pageSize:10
        },
        options: [ {
                value: '1',
                label: '上架'
              }, {
                value: '0',
                label: '下架'
              }],
      }
    },
    mounted() {
		this.form.page = 1
		// this.searchCondition.pageSize = 20
		this.getList()
    },
    methods: {
				// 上下线
				updateIntegralStoreIsOnline(idx,row,list){
					let isId = '';
					if(row.state == 0){
						isId = 1
					}else{
						isId = 0
					}
					let data = {
						id:row.id,
						state:isId
					}
					updateIntegralStoreIsOnline(data).then(res=>{
						if(res.data.code == 200){
							let text = '';
							if(row.state == 0){
								list[idx].state = 1;
								text = '上架成功'
							}else{
								list[idx].state = 0
								text = '下架成功'
							}
							this.$message({
								message:text ||'操作成功',
								type:'success'
							})
						}
					})
				},
				p(s) {
					return s < 10 ? '0' + s : s
				},
        // 列表数据
        getList() {
          var _this = this;
          _this.loading = true
          let data = this.form;
          getIntegralStores(data).then(res => {
            if (res.data.code === 200){
                _this.list = res.data.data
                _this.total = res.data.count;
                _this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.form.page = val
          this.getList()
        },
        //广告编辑
        onEdit(row) {
          this.$router.push({ path: '/operate/integralAdd', query: { id: row.id }})
        },
        //广告删除
        handleDelete(index, row) {
          console.log(index, row);
        }
    }
}
</script>
<style type="scss">
</style>
