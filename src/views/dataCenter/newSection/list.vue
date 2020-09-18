<template>
  <div class="app-container">
    <!--搜索部分-->
    <div class="block">
         <el-form ref="form" label-width="120px" :inline="true" >
			<el-form-item >
              <el-input
                  v-model="searchCondition.title"
                  placeholder="请输入标题" style="width: 300px;"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clean()">清空</el-button>
                 <!-- <router-link :to="{ path: '/newSection/newSectionDetail', query: { id: this.addId }}">
                </router-link> -->
                 <el-button type="primary" @click="addNews()">添加新闻</el-button>

            </el-form-item>
        </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="list.list" border style="width: 100%">
        <el-table-column prop="title" align="center" label="标题" fixed="left"></el-table-column>
        <el-table-column prop="describe" align="center" label="描述"></el-table-column>
        <el-table-column prop="createdAt" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="releaseTime" align="center" label="发布时间"></el-table-column>
        <el-table-column prop="" align="center" label="订购数量">
            <template  slot-scope="scope">
                <span v-if="scope.row.status==0">正常</span>
                <span v-if="scope.row.status==1">已删除</span>
            </template>
        </el-table-column>
        <el-table-column prop="url" align="center" label="跳转链接"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope" align="center">
                 <el-button type="text" size="small"  @click="handleEdit(scope.row,1)">编辑</el-button>
                 <el-button type="text" size="small"  @click="handleEdit(scope.row,2)">查看详情</el-button>
                 <el-button type="text" size="small"  @click="delNews(scope.row)">删除</el-button>
              
            </template>
        </el-table-column>
	</el-table>
        
    <div class="pagination-container" style="text-align:right;margin-bottom:50px">
        <el-pagination
            :current-page="list.page"
            :page-size="list.pageSize"
            :total="list.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
  </div>
</template>
<script>
import {
    addNews,
    newsList,//列表
    news,//详情
    upNews,//编辑
    delNews,//删除
} from '@/api/order' // 接口

export default {
  data() {
    return {
       searchCondition: {
            page: 1,
        },
        loading:false,
        list:"",//列表
        addId:""
    }
  },
  created(){
	this.newsList();  
  },
  methods: {
    // 列表数据
    newsList() {
      this.loading = true;
      newsList(this.searchCondition).then(res => {
        if(res.data.code === 200){
            this.list=res.data
            for(var i=0;i<this.list.list.length;i++){
                this.addId=this.list.list[i].id
            }
            // console.log(this.list,"111111")
            this.loading = false;
        } else if( res.data.code === 400){
            this.$message.error(res.data.msg)
        }
      })
    },
    // 搜索
    handleSizeChange(val) {},
    handleCurrentChange(val) {
        this.searchCondition.page = val
        this.newsList()
    },

    search(){
      this.newsList()
    },
    clean(){
         this.searchCondition={
             page:1
         }
         this.newsList()
    },
    // 编辑,查看详情
    handleEdit(row,type) {
    //   console.log(row,type,"==========+++++++++++++")
      this.$router.push({ path: '/newSection/newSectionDetail', query: { id:row.id,type:type}})
    },
    addNews() {
        this.$router.push({ path: '/newSection/newSectionDetail'})
    },
    // 删除
    delNews(row){
        this.loading = true;
        delNews({
            status:1,
            id:row.id
        }).then(res => {
            if(res.data.code === 200){
                this.newsList()
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.loading = false;

            } else if( res.data.code === 400){
                this.$message.error(res.data.msg)
            }
        })
    }



  }
}
</script>
<style scoped="scoped">
	.right{
        margin-right:20px;
    }
    .bot{
        margin-bottom: 30px
    }
    .el-date-editor .el-range-separator{
        padding:0!important
    }
    .el-range-editor--medium.el-input__inner {
        height: auto;
    }
    .table{
        margin-top:30px;
    }
</style>
