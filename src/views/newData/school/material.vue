<template>
	<div class="matrialUpdate">
		<el-form ref="info" :rules="rules" :model="info" label-width="100px">
			<el-form-item label="标题" prop="title">
				<el-input v-model="info.title" placeholder="请输入标题，长度限制在32个字符以内"></el-input>
			</el-form-item>
			<el-form-item label="类型" prop="type_id">
				<el-select v-model="info.type_id" placeholder="请选择类型" @change="getTypeStatus">
					<el-option v-for="(item,index) in typeList" :key="item.id" :label="item.label_level"
						:value="item.id"></el-option>
				</el-select>
			</el-form-item>


			<el-form-item label="选择状态" prop="">
				<el-radio v-model='info.is_online' :label="0">下线</el-radio>
				<el-radio v-model='info.is_online' :label="1">上线</el-radio>
			</el-form-item>
			<el-form-item label="跳转类型" prop="">
				<el-radio v-model='info.jump' :label="2">H5</el-radio>
				<el-radio v-model='info.jump' :label="1">APP</el-radio>
			</el-form-item>
			<el-form-item label="排序" prop="">
				<div class="input-common">
					<div class="input-name">
						<el-input v-model="info.sort" placeholder="数字越大排序越靠前" @input="handleInput" type="number">
						</el-input>
					</div>
				</div>
			</el-form-item>

			<el-form-item label="上传图片" v-if="this.typePid == 10004 || name == 10004">
				<el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="9"
					:auto-upload="true" :on-exceed="overSizeOfDetail" :file-list="fileListOfDetail"
					:on-preview="handlePictureCardPreview" :on-success="uploadSuccessAll" :on-remove="handleRemove">
					<!-- :before-upload="beforeAvatarUpload" -->
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>


			<el-form-item label="上传图片" v-if="this.typePid != 10004 && name != 10004">
				<el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="1"
					:auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList"
					:on-preview="handlePictureCardPreview" :on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</el-form-item>

			<el-form-item label="视频文件">
				<el-row>
					<el-col>
						<el-upload class="upload-demo" action="https://api2.yuelvhui.com/app/third/uploadVideo"
							ref="upVideo" :on-remove="handleRemove" :before-upload="beforeUpload"
							:on-success="handleVideoSuccess" :on-exceed="handleExceed" :on-preview="handlePreview"
							:limit="1" list-type="picture-card" :file-list="videoFileList">
							<div slot="tip" class="el-upload__tip">建议视频时长2-3分钟，且不超过20M</div>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<el-dialog title="预览视频" :visible.sync="showDialog" width="30%" :before-close="closeDialog">
							<div style="padding: 20px;height: 450px;">
								<video style="width: 100%;height: 400px" :src="info.video_path" controls
									ref="videoReview">
									您的浏览器不支持视频,请升级浏览器,或更换浏览器重试
								</video>
							</div>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="closeDialog">确 定</el-button>
							</span>
						</el-dialog>
					</el-col>
				</el-row>
			</el-form-item>

			<el-form-item label="内容" prop="content" v-if="name != 10004">
				<div class="control" style="display:block;">
					<Tinymce v-model="info.content" :height="300" placeholder="输入内容"
						style="width: 70%;min-width: 600px;"></Tinymce>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click=" $route.query.aid ? update('info') : save('info')"
					v-text="$route.query.aid ? '修改' :'创建'"></el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {
		getTypeList,
		getLlist,
		detailOption,
		updateArticl,
		createdArticl,
		getLevelList,
		DetailsColumn
	} from '@/api/school' // 接口
	import Tinymce from "@/components/Tinymce";
	import {
		constants
	} from 'crypto';
	export default {
		name: 'matrialUpdate',
		directives: {
			waves
		},
		components: {
			Tinymce
		},
		data() {
			return {
				loading: false,
				typeList: [],
				info: {
					title: "", //标题
					content: "", //富文本内容存储,
					type_id: "",
					type_name: "",
					aid: "",
					cover_pic: "",
					cover_pic_all: [],
					is_online: 0,
					sort: 0,
				},
				videoFileList: [],
				showDialog: false,
				fileList: [],
				dialogVisible: false,
				dialogImageUrl: '',
				rules: {
					// title: [
					//   { required: true, message: '请输入标题', trigger: 'blur' },
					//   { max: 32, message: '不超过32个字符', trigger: 'blur' }
					// ],
					type_id: [{
						required: true,
						message: '请选择悦类型',
						trigger: 'change'
					}],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
				},
				typeStatus: "0",
				name: "",
				fileListOfDetail: [],
				typePid: ''
			}
		},
		computed: {

		},
		created() {
			this.getType()
		},
		mounted() {
			this.info.aid = "";
			if (this.$route.query.name) {
				this.name = this.$route.query.name;
			}
			if (this.$route.query.cId) {
				this.info.type_id = this.name = parseInt(this.$route.query.id);
				this.name = this.$route.query.cId;
			}
		},
		methods: {
			getTypeStatus(val) {
				var list = this.typeList;
				list.map(item => {
					if (item.id == val) {
						if (item.id == 10004 || item.type_pid == 10004) {
							this.name = 10004;
						} else {
							this.name = ''
						}
					}
				})
				if (this.info.type_id == 10004) {
					this.name = 10004;
					this.info.content = ''
				}
			},
			//上传视频
			handleRemove(file, fileList) {

				console.log(file, fileList)
			},
			handleExceed(files, fileList) {
				this.$message.warning(`最多上传1个文件`)
			},
			beforeUpload(file) {
				const isVideo = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb',
					'video/mov'
				].indexOf(file.type) == -1
				const isLt30M = file.size / 1024 / 1024 < 30
				if (isVideo) {
					this.$message.error('请上传正确的视频格式')
					return false
				}
				if (!isLt30M) {
					this.$message.error('上传视频大小不能超过 30MB!')
					return false
				}
				this.videoLoading = this.$loading({
					lock: true,
					text: '视频上传转码中,请稍候...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
			},
			handleVideoSuccess(res, file) {
				console.log(res, file, '=======res')
				if (res.code == 200) {
					this.videoLoading.close()
					this.videoFileList = [{
						url: 'https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-01-04/00/yuelvhuirvZYTviIZc1578069666.png'
					}]
					this.info.video_path = res.url
					// this.info.videoCover = item.data.data.CoverURL

					/* let videoId = res.data
					 let url = 'https://open.yuelvhui.com/open/getVideoInfo?video_id=' + videoId
					 this.axios({
					   method: 'post',
					   url: url
					 }).then((item) => {
					   if (!item.data.data.CoverURL) {
					     this.timeOut = setInterval(this.handleVideoSuccess(res, file), 5000)

					   } else {
					     clearInterval(this.timeOut)
					     this.videoLoading.close()
					     this.$message.success('视频上传成功!')
					     this.info.video_path = item.data.data.PlayURL
					     this.info.videoCover = item.data.data.CoverURL
					     this.videoFileList = [{
					       name: file.name,
					       url: item.data.data.CoverURL
					     }]
					   }

					 })*/
				} else {
					this.videoLoading.close()
					this.$message.error('视频上传失败,请删除重试!')
					this.$refs.upVideo.clearFiles() //上传失败 清除文件列表
				}

			},
			handlePreview(file) {
				console.log(file, 22)
				this.showDialog = true
			},
			closeDialog() {
				this.showDialog = false
				this.$refs['videoReview'].pause()
			},
			save(formName) {
				let _this = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.loading = true
						_this.info.cover_pic_all = this.info.cover_pic_all.join(",")
						console.log(_this.info)
						// return;
						// console.log(_this.info)
						createdArticl(_this.info).then((res) => {
							if (res.data.code == 200) {
								_this.loading = false
								_this.$message.success('创建成功')
								_this.$router.push({
									path: '/school/article'
								})
							}
						}).catch((error) => {
							console.log(error)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			update(formName) {
				let _this = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.loading = true
						_this.info.cover_pic_all = this.info.cover_pic_all.join(",")
						// console.log(_this.info);
						// return
						updateArticl(_this.info).then((res) => {
							if (res.data.code == 200) {
								_this.loading = false
								_this.$message.success('修改成功')
								_this.$router.push({
									path: '/school/article'
								})
							}
						}).catch((error) => {
							console.log(error)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			getType() {
				let _this = this;
				var data = this.typeStatus;
				getLevelList(data).then(res => {
					if (res.data.code == 200) {
						this.typeList = res.data.data;
						if (this.$route.query.aid) {
							this.info.aid = this.$route.query.aid;
							this.getInfo(this.$route.query.aid)
						}
					} else {
						this.$message
					}
				})
			},
			// getType() {
			//   let _this = this;
			//   getTypeList().then(res => {
			//   if (res.data.code == 200) {
			//     this.typeList = res.data.data;
			//   } else {
			//     alert("获取消息类型列表失败");
			//   }
			//   }).catch(error => {
			//   alert("获取消息类型列表失败");
			//   });
			// },

			handleInput(e) {
				// e = e.replace(/[^\d]/g,'')
				// console.log(e,'eeeee')
			},
			getInfo() {
				let self = this;
				self.loading = true;
				var list = this.typeList;
				var val = this.$route.query.name ? this.$route.query.name : '';
				list.map(item => {
					if (item.id == val) {
						if (item.id == 10004 || item.type_pid == 10004) {
							this.name = 10004;
						} else {
							this.name = ''
						}
					}
				})
				let data = `${this.info.aid}`;
				detailOption(data).then(res => {
						if (res.data.code == 200) {
							self.loading = false;
							self.info.title = res.data.data.title;
							self.info.author = res.data.data.author;
							self.info.content = res.data.data.content;
							self.info.created_at = res.data.data.created_at;
							self.info.type_id = res.data.data.typeId;
							self.info.type_name = res.data.data.typeName;
							self.info.cover_pic = res.data.data.cover_pic;
							self.info.sort = res.data.data.sort;
							self.info.is_online = res.data.data.is_online;
							self.info.video_path = res.data.data.video_path
							if (res.data.data.jump) {
								this.$set(this.info, 'jump', res.data.data.jump)
							}

							if (res.data.data.video_path) {
								this.videoFileList = [{
									url: 'https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-01-04/00/yuelvhuirvZYTviIZc1578069666.png'
								}]
							}
							if (res.data.data.cover_pic != "") {
								self.fileList.push({
									name: "food",
									url: res.data.data.cover_pic
								});
								console.log(self.fileList);
							}
							var imgList = res.data.data.cover_pic_all;
							var imgArr = new Array(); //定义一数组
							imgArr = imgList.split(","); //字符分割
							self.info.cover_pic_all = imgArr;

							this.fileListOfDetail = imgArr.map(function (imgObj) {
								return {
									'name': "",
									'url': imgObj
								}
							})


							DetailsColumn(res.data.data.typeId).then(res => {
								this.typePid = res.data.data.type_pid
							})


						}
					})
					.catch(error => {
						console.log(error);
					});
			},
			onSubmit(formName) {

			},

			handleAvatarSuccess(res, file) {
				this.info.cover_pic = file.response.url
				// this.info.cover_pic_all.push(file.response.url);
				// console.log(this.imageUrl)
			},
			// 多图片上传成功
			uploadSuccessAll(res) {
				this.info.cover_pic_all.push(res.url);
			},

			beforeAvatarUpload(file) {
				console.log(file)
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt = file.size / 1024 < 300;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 300K!');
				}
				return isJPG && isLt;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleOnExceed(file, fileList) {
				this.$message({
					type: "error",
					message: '最多上传一张图片'
				})
			},
			// 图片数量超出限制的提示
			overSizeOfDetail(files, fileList) {
				this.$message({
					message: "上传图片不能超过9张'",
					type: 'error',
				})
			},
			handleRemove(file, fileList) {
				// console.log(file,'file');
				// console.log(fileList,'fileList')
				// console.log(this.info.cover_pic_all,'this.info.cover_pic_all')
				// console.log('====')
				// console.log()

				this.info.cover_pic_all.splice(this.info.cover_pic_all.indexOf(file.url), 1)
				// console.log(this.info.cover_pic_all)

				// if (file.response) {
				// 	this.info.cover_pic_all = _.pull(this.info.cover_pic_all, file.response.url)
				// } else {
				// 	this.info.cover_pic_all = _.pull(this.info.cover_pic_all, file.url)
				// }
			},
		}
	}

</script>
<style scope lang="scss">
	.matrialUpdate {
		margin: 20px;
		width: 700px;
		box-sizing: border-box;
		padding: 20px;
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

	.input-common {
		display: flex;
		width: 450px;
	}

</style>
