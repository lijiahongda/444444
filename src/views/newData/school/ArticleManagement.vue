<template>
	<div style="z-index:2001;padding: 20px;">
		<el-dialog title="新增栏目" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :append-to-body="true">
			<el-form>
				<el-form-item label="栏目标题" :label-width="formLabelWidth" class="lmu" :rules="{
      required: true, message: '栏目标题不能为空', trigger: 'blur'}">
					<el-input v-model="value" autocomplete="off" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item label="栏目副标题" :label-width="formLabelWidth" class="lmu" >
					<el-input v-model="subtitle" autocomplete="off" placeholder="请输入副标题"></el-input>
				</el-form-item>
				<el-form-item label="栏目图标" :label-width="formLabelWidth">
					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="responseUrl" :src="responseUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过300kb</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="onConfirm">确 定</el-button>
			</div>
		</el-dialog>
		<el-button type="primary" @click="append">新增栏目</el-button>
		<div class="custom-tree-container" >
			<div class="block">
				<el-tree  :data="treeData" :props="defaultProps" @node-click="handleNodeClick" >
					<span class="custom-tree-node" slot-scope="{ node, data }" style="height: 36px;">
						<span>{{ data.label }}</span>
						<span>
							<span  v-if="data.type_pid != 10001">
								<el-checkbox  style="margin-right: 20px;" @change="modifyIndexShow(data)"  v-if="data.type_pid != 10000" v-model="data.index_show" :true-label="1">
									是否显示在栏目首页
								</el-checkbox>
							</span>
							<span>
								<el-input @blur="changeorder(node,data)" v-model="data.display_order" placeholder="序号" style="width: 70px;margin-right: 20px;"></el-input>
							</span>
							<span style="margin-right: 20px;width: 45px;display: inline-block">{{data.article_num}}篇</span>
							<router-link :to="{path:'/school/article',query:{id:data.id,name:data.label,cId:data.id}}" v-if="data.type_pid == 10000">
								<span style="color:#409EFF;font-size:12px;font-weight: 500;margin-right:11px;">查看列表</span>
							</router-link>
							<router-link :to="{path:'/school/article',query:{id:data.id,name:data.label,cId:data.type_pid}}" v-else>
								<span style="color:#409EFF;font-size:12px;font-weight: 500;margin-right:11px;">查看列表</span>
							</router-link>
							<el-button :class="data.type_pid == 10000?'':'two_add'" type="text" size="mini" @click="() => append(node, data)">新增</el-button>
							<el-button type="text" size="mini" @click="() => modify(node, data)">修改</el-button>
							<el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
						</span>
					</span>
				</el-tree>
			</div>
		</div>
	</div>
</template>
<script>
	import _ from 'lodash'
	import {
		columnManagement,
		AddColum,
		modifyColumn,
		DeleteColumn,
		DetailsColumn,
		modifyDisplayOrder,
		modifyIndexShow,
      firstCreate,
		setTypeBannerAid
	} from '@/api/school' // 接口

	let id = 1000;
	export default {
		data() {
			return {
				defaultProps: {
					children: "children",
					label: "label"
				},
              typeId:'',
				Columnid: 0,
				myList: [],
				preId: -1,
				preStatus: "one",
				dialogVisible: false,
				fileList2: [],
				numLimit: 1,
				selectId: 0,
				dialogFormVisible: false,
				value: '',
              subtitle:'',
				formLabelWidth: '120px',
				responseUrl: "",
				typeDetails: 1,
				display_order: "",
				treeData:[],
			};
		},
		mounted(){
			this.getOrgList()
		},
		methods: {
			open() {
				const h = this.$createElement;

				this.$notify({
					title: "添加栏目图片成功"
				});
			},
			// 排序
			changeorder(node,obj) {
				console.log(node)
				console.log(obj)
				let data = {
					display_order: obj.display_order,
					type_id: obj.id
				}
				console.log(data)
				modifyDisplayOrder(data).then(res => {
					console.log(res, "paixu")
					this.getOrgList()
					this.$notify.success({
						title: '成功',
						message: '编辑成功'
					});
				})
			},
			// 是否显示在首页
			modifyIndexShow(data){
				var is_show = _.clone(data.index_show);
				if(is_show == true ){
					is_show = 1
				}else{
					is_show = 0
				}
				var data = {
					index_show:is_show,
					type_id:data.id
				}
				modifyIndexShow(data).then(res=>{
					console.log(res,"res")
				})
			},
			// 图片上传前的检查
			beforeAvatarUpload(file) {
				if (file.size / 1024 > 300) {
					this.$message({
						message: "图片请保持在750*350px,300KB以内",
						type: "error"
					})
					return false;
				}
			},
			handleAvatarSuccess(res, file) {
				this.fileCover = res;
				this.responseUrl = file.response.url
				console.log(file.response.url);
			},
			refreshLazyTree(node, children) {
				var theChildren = node.childNodes
				theChildren.splice(0, theChildren.length)
				node.doCreateChildren(children)
			},
			// 上传图标弹窗关闭事件
			handleClose(done) {
				this.$confirm("确认关闭？")
					.then(_ => {
						done();
						console.log("-----");
					})
					.catch(_ => {});
			},
			// 栏目图标
			ColumnIcon: function(data, node) {
				this.dialogVisible = true;
				console.log(node);
				this.selectId = node.id;
			},
			// 新增
			append(data, node) {
			  if(node && node.id){
                this.typeDetails = 0;
                this.selectId = node.id;
			  }
				this.dialogFormVisible = true;

				this.value = '';
				this.responseUrl = '';
			},
			onConfirm() {
				if (this.value == '' ) {
					this.$message({
						type: "error",
						message: '请填写完整信息'
					});
					return false;
				}
				if (this.typeDetails == 1) {
					let data = {
						type_name: this.value,
                      subtitle: this.subtitle,
						icon: this.responseUrl,
						type_id: this.typeId
					}
					let url = this.typeId ? modifyColumn : firstCreate
                  url(data).then(res => {
						this.$message({
							type: "success",
							message: res.data.msg || "成功"
						});
						this.dialogFormVisible = false;
						this.getOrgList()
					})
				} else {
					let data = {
						type_name: this.value,
                      subtitle: this.subtitle,
						icon: this.responseUrl,
						type_pid: this.selectId
					}
					AddColum(data).then(res => {
						this.$message({
							type: "success",
							message: res.data.msg || "成功"
						});
						this.dialogFormVisible = false;
						this.getOrgList()
					})
				}
			},
			// 回显详情
			modify(node, data) {
				this.dialogFormVisible = true;
				this.typeDetails = 1;
				let obj = data.id;
				DetailsColumn(obj).then(res => {
					this.value = res.data.data.label;
                  this.subtitle = res.data.data.subtitle;
					this.responseUrl = res.data.data.icon;
					this.typeId = data.id
				})
			},
			// 删除
			remove(node, data) {
				//删除栏目标题
				const parent = node.parent;
				console.log(parent, "删除，父元素");

				const children = parent.childNodes || parent.parent.childNodes;
				console.log(children, "删除 子元素");
				const index = children.findIndex(d => d.data.id === data.id);

				console.log(data, "当前元素data");
				let obj = {
					type_id: data.id
				};
              this.$confirm('是否继续删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                DeleteColumn(obj).then(res => {
                  children.splice(index, 1);
                  this.getOrgList()
                  this.$message({
                    type: "success",
                    message: res.data.msg || "成功"
                  });
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

			},
			// 点击树
			handleNodeClick(data) {
				// console.log("点击树节点");
				// console.log(data);
				this.Columnid = data.id;
				this.clickTree = data;
			},
			//获取数据
			getOrgList() {
				columnManagement(0).then(res => {
					console.log(res.data.data)
					this.treeData = res.data.data;
				})
			}
		}
	};
</script>
<style scoped="scoped">
	/* .lmu .el-input--medium .el-input__inner{height: 36px;line-height: 36px;} */
	/deep/ .el-input--medium .el-input__inner{height: 25px;line-height: 25px;}
	.el-tree-node__content{height: 36px;}
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
		border-bottom: 1px solid #ccc;
		height: 36px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.two_add{visibility: hidden;}
	/deep/ .el-tree-node__content{height: 36px;}
</style>
