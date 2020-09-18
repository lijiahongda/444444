<template>
	<div id="iconManage" v-loading="loading">
      <el-row>
          <el-col class="right" style="width:200px">
              <el-input v-model="searchObj.keyword" placeholder="请输入名称" clearable  ></el-input>
          </el-col>
          <el-col :span="7"  class="right">
              <el-row type="flex" align="middle">
                  <el-col class="wid">
                      <span>类型:</span>
                  </el-col>
                  <el-col>
                      <el-select v-model="searchObj.type" placeholder="状态" clearable>
                          <el-option v-for="item in optionType" :key="item.type" :label="item.name" :value="item.type" />
                      </el-select>
                  </el-col>
              </el-row>
          </el-col>
          <el-col  :span="7" class="right">
              <el-row type="flex" align="middle">
                  <el-col class="wid">
                      <span>会员类型:</span>
                  </el-col>
                  <el-col>
                      <el-select v-model="searchObj.memberType" placeholder="会员类型" clearable>
                          <el-option v-for="item in memberType" :key="item.type" :label="item.name" :value="item.type" />
                      </el-select>
                  </el-col>
              </el-row>
          </el-col>
          <el-col :span="2">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-col>
      </el-row>
		<el-button type="primary" @click="addIcon" style="margin-bottom:30px">新增icon组</el-button>
		<el-table
			:data="tableData.list"
			border
			style="width: 100%">
			<el-table-column align="center" prop="iconImg" fixed label="icon图片" width="180">
				<template slot-scope="scope">
					<el-image
						style="width: 50px;"
						:src="scope.row.iconImg"
						:fit="'fill'"></el-image>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="name" label="名称" width="180"> </el-table-column>
			<el-table-column align="center" prop="sort" label="排序" width="180"></el-table-column>
			<el-table-column align="center" prop="typeName" label="类型" width="180"> </el-table-column>
			<el-table-column align="center" prop="memberTypeName" label="会员类型" width="180"> </el-table-column>
			<el-table-column align="center"  label="操作" width="300" fixed="right">
				<template slot-scope="scope">
					<el-button @click="getAPPBottomIcon(scope.row)" type="text" size="small">编辑</el-button>
          <el-button  type="text" size="small" @click="delAPPBottomIcon(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
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
		<el-dialog :title="dialog.title" :visible.sync="dialogFormVisible">
			<el-form>
        <el-form-item label="分享标题" :label-width="formLabelWidth">
					<el-input v-model="form.shareTitle" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="排序" :label-width="formLabelWidth">
					<el-input v-model="form.sort" autocomplete="off"></el-input>
				</el-form-item>
  
        	<el-form-item label="跳转类型" :label-width="formLabelWidth">
					<el-select v-model="form.jumpType" placeholder="请选择跳转类型" clearable>
						<el-option v-for="item in jupmTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
        <!-- <el-form-item label="App跳转url" :label-width="formLabelWidth">
					<el-input v-model="form.appJumpUrl" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="小程序跳转url" :label-width="formLabelWidth">
					<el-input v-model="form.appletJumpUrl" autocomplete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="类型" :label-width="formLabelWidth">
					<el-select v-model="form.type" placeholder="请选择" clearable>
						<el-option v-for="item in optionType" :key="item.type" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="会员类型" :label-width="formLabelWidth">
					<el-select v-model="form.memberType" placeholder="请选择"  clearable>
						<el-option v-for="item in memberType" :key="item.type" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="是否有红标" :label-width="formLabelWidth">
            <el-radio-group v-model="form.isRed">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否锁定" :label-width="formLabelWidth">
            <el-radio-group v-model="form.isLock">
              <el-radio label="0">锁定</el-radio>
              <el-radio label="1">解锁</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="红标描述" :label-width="formLabelWidth">
					<el-input v-model="form.desc" placeholder="最多只能输入四个文字" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="icon图片" :label-width="formLabelWidth" prop="">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						list-type="picture-card"
						:on-success="handleAvatarSuccess1"
						:on-remove="handleRemoveImg1"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:limit="1"
						:file-list="iconImg"	>
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">建议图片小于5M</div>
					</el-upload>
				</el-form-item>
        <el-form-item label="详情页介绍图" :label-width="formLabelWidth" prop="">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						list-type="picture-card"
						:on-success="handleAvatarSuccess2"
						:on-remove="handleRemoveImg2"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:limit="1"
						:file-list="detailImg"	>
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">建议图片小于5M</div>
					</el-upload>
				</el-form-item>
        <el-form-item label="详情页分享图" :label-width="formLabelWidth" prop="">
					<el-upload
						class="avatar-uploader"
						action="https://api2.yuelvhui.com/app/third/upload"
						list-type="picture-card"
						:on-success="handleAvatarSuccess3"
						:on-remove="handleRemoveImg3"
						:before-upload="beforeAvatarUpload"
						:on-exceed="handleExceed"
						:limit="1"
						:file-list="shareImg"	>
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">建议图片小于5M</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button v-if="dialog.type == 1" type="primary" @click="addAPPBottomIcon">确 定</el-button>
				<el-button v-else type="primary" @click="upAPPBottomIcon">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  import {
    getAPPBottomIcons,
    addAPPBottomIcon,
    upAPPBottomIcon,
    getAPPBottomIconInfo,
    getJumpTypes,//跳转类型
    delAPPBottomIcon//删除
  } from '@/api/shops'
  export default {
    name: 'iconManage',
	data(){
      return {
        tableData:{
          list:[]
        },
        loading: false,
            searchCondition:{},
            dialogFormVisible: false,
        form:{},
        imgFileList:[],
        formLabelWidth: '120px',
            
        dialog:{
          title: '新增Icon',
          type: 1
        },
        searchObj: {
            type: "",
            keyword:"",
            memberType:"",
            page:1
        },
        // 其他类型  1：悦商城，2悦旅会，3发现，4店主礼包，5我的 6 会员权益 7 成长值说明）
        optionType: [
            {
                type: 1,
                name: "悦商城"
            },
            {
                type: 2,
                name: "悦旅会"
            },
            {
                type: 3,
                name: "发现"
            },
            {
                type:4,
                name: "店主礼包"
            },
            
            {
              type: 5,
              name: "我的"
            },
            {
              type: 6,
              name: "会员权益"
            },
            {
              type: 7,
              name: "成长值说明"
            },
        ],
        //  <!-- `member_type`  '会员类型 1 普通会员 2 金卡会员 3 白金会员 4 黑金VIP', -->
        memberType: [
            {
                type: 1,
                name: "普通会员"
            },
            {
                type: 2,
                name: "金卡会员"
            },
            {
                type: 3,
                name: "白金会员"
            },
            {
                type:4,
                name: "黑金VIP"
            },
        ],
        // 上传图片
        iconImg:[],
        detailImg:[],
        shareImg:[],
        jupmTypes:[]

	  }
	},
	created(){
      this.getList();
      this. getJumpTypes()
	},
	methods:{
      getList(){
        this.loading = true;
        getAPPBottomIcons(this.searchObj).then(res=>{
          if(res.data.code == 200) {
            this.tableData = res.data.data;
            this.loading = false;
		  } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
		  })
	  },
    // 删除
    delAPPBottomIcon (id, index) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var obj = {
          id: id
        }
        delAPPBottomIcon(obj).then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data,111111111)
            // this.tableData.splice(index, 1)
            this.getList()
          }
        })
      }).catch(() => {
      });
    },
    //搜索点击事件
    handleSearch() {
        this.searchObj.page = 1;
        let params = this.searchObj;
        // console.log(searchObj.page,"搜索参数");
        this.getList();
    },
    addAPPBottomIcon(){
        addAPPBottomIcon(this.form).then(res=>{
          if(res.data.code == 200) {
            this.dialogFormVisible = false;
            this.$message.success('添加成功')
            this.clear();
            this.getList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
        })
	  },

      getAPPBottomIcon(row){
        getAPPBottomIconInfo({id: row.id}).then(res=>{
          if(res.data.code == 200) {
            this.form = res.data.data;
            this.dialog.title = '编辑Icon';
            this.dialog.type = 2;
            this.form.iconImg = row.iconImg;
            this.form.detailImg = row.detailImg;
            this.form.shareImg = row.shareImg;
            this.dialogFormVisible = true;
            this.iconImg=[];
            this.detailImg=[];
            this.shareImg=[];
            // console.log(this.searchObj, '232323333')
            if(row.iconImg){
              var imgListIcon = row.iconImg.split(' ');
              this.iconImg = imgListIcon.map(function(imgObj) {
                return {
                  'name': "",
                  'url': imgObj
                }
              })
            }
            if(row.detailImg){
              var imgListDetail = row.detailImg.split(' ');
              this.detailImg = imgListDetail.map(function(imgObj) {
                return {
                  'name': "",
                  'url': imgObj
                }
              })
            }
            if(row.shareImg){
              var imgListShare = row.shareImg.split(' ');
              this.shareImg = imgListShare.map(function(imgObj) {
                return {
                  'name': "",
                  'url': imgObj
                }
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
		})

      },
      getJumpTypes(){
        getJumpTypes().then(res=>{
          if(res.data.code == 200) {
            this.jupmTypes = res.data.data;
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
        })
      },
      upAPPBottomIcon(){
        upAPPBottomIcon(this.form).then(res=>{
          if(res.data.code == 200) {
            this.dialogFormVisible = false;
            this.clear();
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg || '服务器错误'
            })
          }
        })
      },
	  clear(){
        this.form = {};
        this.form.iconImg = ''
        this.imgFileList = []
	  },
      addIcon(){
        this.form={};
        this.iconImg=[];
        this.detailImg=[];
        this.shareImg=[];
        this.dialog.type = 1;
        this.dialogFormVisible = true;
	  },
      handleCurrentChange(val){
        this.searchObj.page= val;
        this.getList();
      },
      handleAvatarSuccess1(res, file) {
         this.form.iconImg = res.url
      },
      handleAvatarSuccess2(res, file) {
        this.form.detailImg = res.url
      },
      handleAvatarSuccess3(res, file) {
         this.form.shareImg = res.url
      },
      handleRemoveImg1() {
        this.form.iconImg = ''
      },
      handleRemoveImg2() {
        this.form.detailImg = ''
      },
      handleRemoveImg3() {
        this.form.shareImg = ''
      },
      beforeAvatarUpload(file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!')
        }
        if (!isImg) {
          this.$message.error('检查图片格式是否正确!')
        }
        return isImg && isLt5M
      },
      handleExceed(files, fileList) {
        this.$message.warning(`最多上传1个文件`)
      },
	}
  }
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
</style>
