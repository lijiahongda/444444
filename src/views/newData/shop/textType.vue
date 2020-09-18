<template>
	<div class="app-container">
		<el-form style="margin-bottom:20px;" ref="form" :inline="true" class="demo-form-inline">
			<el-form-item label="文章类型">
				<el-input placeholder="请输入内容" v-model="input5" class="input-with-select" />
			</el-form-item>
			<el-form-item>
				<el-button @click="confirmAdd" size="mini" type="primary">保存</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="activityState" border fit highlight-current-row style="width: 100%">
			<el-table-column label="文章类型">
				<template slot-scope="{row}">
					<template v-if="row.edit">
						<el-input style="width:500px;" v-model="row.type_name" class="edit-input" size="small" />
						<el-button class="cancel-btn" size="mini" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">取消</el-button>
					</template>
					<span v-else>{{ row.type_name }}</span>
				</template>
			</el-table-column>
			<el-table-column align="left" label="操作">
				<template slot-scope="{row}">
					<el-button v-if="row.edit" type="success" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(row)">
						确定
					</el-button>
					<el-button v-else type="primary" size="mini" icon="el-icon-edit" @click="row.edit=!row.edit">
						编辑
					</el-button>
					<el-button @click="deleteArticlTypeBtn(row.$index,row)" type="danger" size="mini" icon="el-icon-delete">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="!loading" class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="searchCondition.page" :page-sizes="[10,20,30,40]" :page-size="searchCondition.pageSize"
			 :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
			 @current-change="handleCurrentChange" />
		</div>
	</div>
</template>
<script>
	// import hotelCharts from './hotelCharts' // 图表
import { getTypeList, updateArticlType ,addArticlType, deleteArticlType} from '@/api/shop' // 接口

export default {
    name: 'textType',
    data() {
      return {
        addAdvertisingBtnName:'添加广告',
        searchCondition: {
          page:1,
          pageSize: 20
        },
        input5:"",
        total: null,
        loading: false,
        switchChart: false,
        activityState: [],
      }
    },
    created() {
		this.searchCondition.page = 1
    this.searchCondition.pageSize = 20
    this.getActivity()
    },
    methods: {
        cancelEdit(row) {
          console.log(row)
          row.type_name = row.originalTitle
          row.edit = false
          this.$message({
            message: '取消编辑',
            type: 'warning'
          })
        },
        confirmAdd() {
          let _this = this;
          addArticlType({
            type_name: _this.input5,
          }).then( res => {
              _this.$message({
              message: '保存成功',
              type: 'success'
            })
            _this.getActivity()
          })  
        },
        deleteArticlTypeBtn(index,row) {
          let _this = this;
          deleteArticlType({
            type_id:row.type_id,
          }).then( res => {
              _this.$message({
              message: '删除成功',
              type: 'success'
            })
            _this.activityState.splice(index,1)
          }) 
        },
        confirmEdit(row) {
          console.log(row)
          let _this = this;
          row.originalTitle = row.type_name
          updateArticlType({
            type_name: row.type_name,
            type_id: row.type_id
          }).then( res => {
            row.edit = false
            _this.$message({
              message: '编辑成功',
              type: 'success'
            })
          })  
        },
       //查看详情
        addAdvertisingClick(orderNo) {
            this.$router.push({ path: '/advert/update' })
        },
        // 文章类型
        getActivity(){
          var self = this
          getTypeList({pageSize:10000}).then((res) => {
            if(res.data.code==200){
              self.activityState=res.data.data
              self.activityState.map(v => {
                  self.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                  v.originalTitle = v.type_name
                  return v
                })
              }
          }).catch((error) => {
            console.log(error)
          })
        },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
              this.getList()
        },
        //广告编辑
        handleEdit(index, row) {
          console.log(index, row);
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
