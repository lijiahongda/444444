<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true" v-if="!loading">
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
				<el-input v-if="name" v-model="name" disabled></el-input>
			<el-select v-model="info.type_id" clearable  placeholder="请选择消息类型" @change="getTypeStatus" v-else>
				<el-option
				v-for="item in typeList"
                  :key="item.id"
                  :label="item.label_level"
                  :value="item.id">
				</el-option>
			</el-select>
		</el-form-item>
			<el-form-item>
				<el-button @click="getList" type="primary">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="loading" :data="list" border stripe :fit="true" style="width: 100%">
			<el-table-column prop="title" label="标题" align="center"></el-table-column>

			<el-table-column prop="cover_pic" label="缩略图" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.typePid!=10004">
						<img style="height: 80px;" :src="scope.row.cover_pic" alt="">
					</span>
					<span v-if="scope.row.typePid==10004" >
						<span v-for="items in scope.row.cover_pic_all">
							<img style="height: 80px;" :src="items" alt="">
						</span>
					</span>
				</template>
			</el-table-column>

			<el-table-column prop="typeName" label="类型" align="center"></el-table-column>
			<el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
			<el-table-column prop="created_at" label="设置栏目banner" align="center" v-if="is_type_id">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.is_banner" active-color="#13ce66" inactive-color="#ccc" @change="setBanner(scope.row,scope.$index)" :active-value="1">
					</el-switch>
				</template>
			</el-table-column>
		    <el-table-column prop="sort" label="排序" align="center"></el-table-column>

			<el-table-column prop="" label="上线状态" align="center">
				<template slot-scope="scope">
					<span v-if='scope.row.is_online == 0' style="color: #f00;">下线</span>
					<span v-else style="color: green;">上线</span>
				</template>
			</el-table-column>

			<el-table-column label="点赞" align="center">
				<template slot-scope="scope">
					<el-input  v-model="scope.row.like_num" placeholder="点赞" @blur="changeLikeNum(scope.row.aid,scope.row.like_num)" type="number" ></el-input>
				</template>
			</el-table-column>

			<!-- <el-table-column label="下载" align="center">
				<template slot-scope="scope">
					<el-input  v-model="scope.row.down_num"  @blur="changeDownNum(scope.row.aid,scope.row.down_num)"  placeholder="下载"></el-input>
				</template>
			</el-table-column> -->

			<!-- <el-table-column prop="is_online" label="状态" align="center"></el-table-column> -->

			<el-table-column label="操作"  width="270px" align="center">
				<template slot-scope="scope">
					<el-button @click="setArticleIsOnline(scope.$index, scope.row,list)" size="mini">
						<span v-html='scope.row.is_online == 0 ? "上线" : "下线"'></span>
					</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { getTypeList,getLlist,deleteArticl,getLevelList,setTypeBannerAid,setArticleIsOnline,setArticleLikeNum,setArticleDownNum} from '@/api/school' // 接口

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
				typeList:[],
				select: {},
				info: {
					title: "",
					content: "",
					type_id:'',
					type: ''
				},
				name:"",
				typeStatus:"0",
				value2:"",
				is_type_id:false,
				cPid:'',
				cId:'',
				id:'',
      }
    },
    created() {
		this.searchCondition.page = 1
		this.searchCondition.pageSize = 20;
		this.info.type_id=this.$route.query?this.$route.query.id : '';
		this.getType()
		this.getList()
		if(this.$route.query.name){
			this.cId = this.$route.query.cId;
			this.name = this.$route.query.name;
			this.is_type_id = true;
		}
    },
    methods: {
		getTypeStatus(val){
			var list = this.typeList;
			list.map(item=>{
				if(item.id == val){
					if(item.id  == 10004 || item.type_pid == 10004){
						this.cId = 10004;
					}else{
						this.cId = ''
					}
				}
			})
		},
				// 设置banner
				setBanner(row,idx){
					console.log(idx,'idx')
					var rows = row;
					console.log(rows.is_banner,"rowsss")
					console.log(rows,"rowsss")
					let data = {
						aid:row.aid,
						type_id:row.typeId
					}
					setTypeBannerAid(data).then(res=>{
						console.log(rows.is_banner,"dfsdgfs")
						if(rows.is_banner == 1){
							this.list.map(item=>{
								item.is_banner =false;
							})
							this.list[idx].is_banner = 1;
						}else{
							this.list.map(item=>{
								item.is_banner =false;
							})
						}


					})
				},
        //广告添加
        addArticlClick() {
            this.$router.push({ path: '/school/material'+'?cId='+this.cId+'&id='+this.info.type_id })
		},
			//上下线
		setArticleIsOnline(idx,row,list){
			let isId = '';
			if(row.is_online == 0){
				isId = 1
			}else{
				isId = 0
			}
			let obj = {
				aid:row.aid,
				is_online:isId
			}
			// console.log(obj); return;
			setArticleIsOnline(obj).then(res=>{
				if(res.data.code == 200){
					let text = '';
					if(row.is_online == 0){
						list[idx].is_online = 1;
						text = '上线成功'
					}else{
						list[idx].is_online = 0
						text = '下线成功'
					}
					this.$message({
						message:text ||'操作成功',
						type:'success'
					})
				}else{
					this.$message({
						message:res.data.msg || '操作失败',
						type:'error'
					})
				}
			})
		},

	  changeLikeNum(aid,like_num){
		var data={
			aid:aid,
			like_num:like_num
		}
		  setArticleLikeNum(data).then(res => {
				if (res.data.code == 200) {
					this.getList();
				}
          })
          .catch(error => {
            console.log(error);
          });
	  },

	   changeDownNum(aid,down_num){
			var data={
				aid:aid,
				down_num:down_num
			}
			setArticleDownNum(data).then(res => {
					if (res.data.code == 200) {
						this.getList();
					}
			})
			.catch(error => {
				console.log(error);
			});
		},


        // 列表数据
        getList() {
          let self = this;
          self.loading = true;
          let data = `${
            this.searchCondition.pageSize
          }/${this.searchCondition.page}/${
            this.select.keyCodeTitle ? this.select.keyCodeTitle : 0
          }/${this.select.keyCodeContent ? this.select.keyCodeContent : 0}/${
            this.info.type_id ? this.info.type_id : 0
          }`;
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
					var data = this.typeStatus;
          getLevelList(data).then(res => {
            if (res.data.code == 200) {
              this.typeList = res.data.data;
            } else {
							this.$message
            }
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
					console.log(row,"rowrow")
          this.$router.push({ path: '/school/material', query: { aid: row.aid,name: row.typeId,cId:this.cId}})
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
            _this.loading = false
            });
        }
    }
}
</script>
<style type="scss">
</style>
