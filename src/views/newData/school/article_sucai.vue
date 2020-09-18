<template>
    <div class="app-container">
      <el-form ref="form" label-width="120px" :inline="true"  v-if="!loading">
        <el-form-item>
          <el-button @click="addArticlClick" type="primary">添加</el-button>
        </el-form-item>
		    <el-form-item>
		      <el-input v-model="select.keyCodeTitle" placeholder="消息标题"></el-input>
        </el-form-item>
		    <el-form-item>
		      <el-input v-model="select.keyCodeContent" placeholder="消息内容"></el-input>
        </el-form-item>
		<el-form-item>
			<el-select v-model="info.type_id" placeholder="请选择消息类型">
				<el-option
				v-for="item in typeList"
                  :key="item.type_id"
                  :label="item.type_name"
                  :value="item.type_id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
          <el-button @click="getList" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
        <el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="cover_pic" label="图片" align="center">
				<template slot-scope="scope">
					<img style="height: 80px;" :src="scope.row.cover_pic" alt="">
				</template>
			</el-table-column>
            <el-table-column prop="typeName" label="类型" align="center"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[10,20,30,40]"
          :page-size="searchCondition.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
</template>
<script>
// import hotelCharts from './hotelCharts' // 图表
import { getTypeList,getLlist,deleteArticl } from '@/api/school' // 接口

export default {
    data() {
      return {
        searchCondition: {
          page:1,
          pageSize: 20
		},
        total: null,
        loading: false,
    list: [],
    typeList:'',
		select: {},
		info: {
			title: "",
			content: "",
			type_id:'',
			type: ''
		}
      }
    },
    created() {
		this.searchCondition.page = 1
		this.searchCondition.pageSize = 20
		this.getType()
		this.getList()
    },
    methods: {
        //添加、编辑
        addArticlClick() {
            this.$router.push({ path: '/school/material_sucai' })
        },
        // 列表数据
        getList() {
          let self = this;
          self.loading = true;
          let data = `${
            this.searchCondition.pageSize
          }/${this.searchCondition.page}/${
            this.select.keyCodeTitle ? this.select.keyCodeTitle : 0
          }/${this.select.keyCodeContent ? this.select.keyCodeContent : 0}/10004`;
          getLlist(data).then(res => {
          if (res.data.code == 200) {
            self.loading = false;
            self.searchCondition.pageSize = Number(res.data.data.pageSize);
            self.total = res.data.data.totalRaw;
            self.list = res.data.data.list;
          }
          })
          .catch(error => {
            console.log(error);
          });
        },
        getType() {
          let _this = this;
          getTypeList().then(res => {
            if (res.data.code == 200) {
              this.typeList = res.data.data;
            } else {
              alert("获取消息类型列表失败");
            }
          }).catch(error => {
            alert("获取消息类型列表失败");
          });
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
          this.$router.push({ path: '/school/material_sucai', query: { aid: row.aid }})
        },
        //广告删除 
        handleDelete(index, row) {
          console.log(index, row);
          let _this = this;
          _this.loading = true
          _this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteArticl({ aid: row.aid }).then(res => {
                  if (res.data.code == 200) {
                      _this.loading = false
                      _this.getList()
                    }
                  }).catch(error => {
                    console.log(error)
                  });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        }
    }
}
</script>
<style type="scss">
</style>
