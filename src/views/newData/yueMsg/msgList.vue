<template>
    <div class="app-container">
    		<el-dialog :title="titleName" :visible.sync="dialogTableVisible" @close="closeBox">
			<el-form :model="form">
		
				<el-form-item label="请选择用户" prop="">
					<el-button type="primary" @click="dialogTableVisible2 = true" plain>点击选择</el-button>
					<div class="commodity">
						<ul v-if="userInfo.mid>0">
							<li style="border:none" >
								<div class="section-p" style="width:auto;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
									<span>用户ID：{{userInfo.mid}}</span>
									<span>昵称：{{userInfo.nickName}}</span>
									<span>手机号：{{userInfo.mobile}}</span>
								</div>
							</li>
						</ul>
					</div>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="onPersonalPush()">确 定</el-button>
			</div>
		</el-dialog>



		<el-dialog width="800px" title="选择用户" :visible.sync="dialogTableVisible2"  v-loading="loading2">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择用户">
					<el-input v-model="searchVal" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getMembers(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul v-if="memberList.length>0">
					<li  v-for="(item,index) in memberList" :key="index" >
						<div class="section-p">
							<div>
								<span>昵称：{{item.nickName}}</span>
								<span>手机号：{{item.mobile}}</span>
							</div>
						</div>
						<div class="select-btn">
							<el-button @click="choseId(item)" plain>选取</el-button>
						</div>
					</li>
				</ul>
				<div v-else style="text-align: center;">暂无数据</div>
			</div>
			<el-pagination small @current-change="handleCurrentChangeMember" layout="prev, pager, next" :total="memberTotal">
			</el-pagination>
		</el-dialog>





      <el-form ref="form" label-width="120px" :inline="true"  v-if="!loading">
        <el-form-item>
          <el-button @click="addYueMsgClick" type="primary">添加</el-button>
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
            <el-table-column prop="typeId" label="类型" align="center"></el-table-column>
            <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center"  width='350'>
              <template slot-scope="scope">
                <el-button type="mini" size="small" @click="pushMessageAllSwitch(scope.row.aid)">推送</el-button>
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button type="mini" size="small" @click="openBox(scope.row.aid)">个人推送</el-button>
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
import { getTypeList,getLlist,msgDeleted} from '@/api/yueMessage' // 接口
import {getMembers,pushMessageOneSwitch,pushMessageAllSwitch} from '@/api/admin'

export default {
    data() {
      return {
        searchCondition: {
          page:1,
          pageSize: 20
        },
        form:{aid:''},
        userInfo:{},
        searchVal: '',
        memberList:[],
        memberTotal:0,
        total: null,
        titleName:'发送',
        loading: false,
        loading2:false,
        dialogTableVisible:false,
        dialogTableVisible2:false,
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
        addYueMsgClick() {
            this.$router.push({ path: '/yueMsg/msgOptions' })
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
          this.$router.push({ path: '/yueMsg/msgOptions', query: { aid: row.aid }})

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
              msgDeleted({ aid: row.aid }).then(res => {
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
        },

        //推送
        pushMessageAllSwitch(aid) {
          let _this = this;
          _this.loading = true
          _this.$confirm('此操作将永久推送, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              pushMessageAllSwitch({ aid:aid,type:1}).then(res => {
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
                message: '已取消推送'
              });
               _this.loading = false
            });
        },



      openBox(aid){
        this.form.aid = aid;
        this.dialogTableVisible = true;
        this.getMembers(1);
      },
      getMembers(page) {
        this.loading2 = true
        let _this = this;
        let data = {
          page: page
        }
        if (this.searchVal) {
          data['keyWord'] = this.searchVal
        }

        getMembers(data).then((res) => {
          if (res.data.code == 200) {
            _this.memberList = res.data.data.list
            _this.memberTotal = res.data.data.total;
            this.loading2 = false
          }
        }).catch((error) => {
          console.log(error)
        })
      },

      handleCurrentChangeMember(val) {
        this.getMembers(val)
      },


		// 选择用户
      choseId(item) {
          this.userInfo.mid      	= item.mid
          this.form.pushUserId    = item.mid
          this.userInfo.nickName 	= item.nickName
          this.userInfo.mobile   	= item.mobile
          this.dialogTableVisible2 = false
      },
				//保存
		onPersonalPush(){
			var obj  = this.form;
      var self = this;
      obj.type = 1;
	

			console.log(obj);
			pushMessageOneSwitch(obj).then(res=>{
					if(res.data.code==200){
						this.dialogTableVisible = false;
						this.$message({
							message: '推送成功',
							type: 'success'
						});
					}else{
						this.$message({
							message: res.data.msg || '编辑失败',
							type: 'error'
						});
					}
				})
    },
		closeBox(){
			this.form={}
			this.userInfo={}
		},    




    }
}
</script>
<style type="scss">
	.goodsName{
        display: block;
    }

	ul,li {
		padding: 0;
		margin: 0;
		list-style: none
	}


 	.commodity li {
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10px;
		border-top: 1px solid #ddd;
		margin-bottom: 5px;
	}

	.commodity .section-p {
		padding-left: 10px;
		box-sizing: border-box;
		float: left;
	}

	.commodity .section-p span {
		line-height: 16px;
		display: inline-block;
		margin-right: 20px;
	}

	.commodity .select-btn {
		float: right;
	}
</style>