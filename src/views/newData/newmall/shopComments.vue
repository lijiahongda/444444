<template>
	<div class="app-container">
		<el-form :model="form" :rules="rules" class="style_auto" ref="form" label-width="140px" :inline="true">
			<el-form-item label="商品id" prop="productId">
				<el-input v-model="form.productId" placeholder="请输入商品id" style="width: 450px;" />
			</el-form-item>
			<el-form-item label="商品skuId" prop="skuId">
				<el-input v-model="form.skuId" placeholder="请输入商品skuId" style="width: 450px;" />
			</el-form-item>
			<el-form-item label="用户id" prop="mid">
				<el-input v-model="form.mid" placeholder="请输入用户id" style="width: 450px;" />
			</el-form-item>
			<el-form-item label="评论简介图" prop="imgs">
				<el-upload :action="uploadUrl" :limit="numLimit" list-type="picture-card" :file-list="fileListOfDetail"
					:on-success="uploadSuccessAll" :on-exceed="overSizeOfDetail" :before-upload="uploadBeforeOfDetail" :on-preview="handlePictureCardPreview"
					:on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<div slot="tip" class="el-upload__tip" style="color: #green;">
					请选择300KB以内的图片
				</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="评论内容" prop="comment">
				<el-input v-model="form.comment" placeholder="输入评论内容" type="textarea" style="width: 400px;" />
			</el-form-item>
			
			<el-form-item class="save_btn">
				<el-button type="primary" @click="onSubmit('form')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	// import Tinymce from '@/components/Tinymce';
	import { imgUploadUrl, } from '@/api/cust'
	import { addComment } from '@/api/shops'
	export default {
		data() {
			return {
				form: {
					productId: '', //商品id
					skuId: '', //商品skuid
					imgs: [], //评论简介图
					comment: '', //评论内容
					mid:''
				},
				rules: {
					productId: [{
						required: true,
						message: '请填写商品id',
						trigger: 'blur'
					}],
					skuId: [{
						required: true,
						message: '请填写商品skuId',
						trigger: 'blur'
					}],
					mid: [{
						required: true,
						message: '请填写用户id',
						trigger: 'blur'
					}],
					imgs: [{
						required: true,
						message: '请选择商品评论图',
						trigger: 'blur'
					}],
					comment: [{
						required: true,
						message: '请填写商品评论',
						trigger: 'blur'
					}]
				},
				// --------图片上传参数----------------
				dialogImageUrl: '',
				dialogVisible: false,
				uploadUrl: this.apiurl.imguploadurl,
				fileListOfDetail: [],
				numLimit: 5,
			}
		},
		methods: {
		
			onSubmit(formName) {
				delete this.form.sku;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.form.imgs=this.form.imgs.join(",")
						addComment(this.form).then(res => {
							if (res.data.code == 200) {
								this.$message({
									message: "保存成功",
									type: "success"
								})
								this.$router.push('/operate/shopComment')
							} else {
								this.$message({
									message: res.data.msg || "保存失败",
									type: "error"
								})
							}
						})
					} else {
						this.$message({
							message: "请填写完整信息",
							type: "error"
						})
					}
				});
			},
			/**
			 * 图片上传相关
			 * */

			// ----------详情图片上传事件---------------
			// 多图片上传成功
			uploadSuccessAll(res) {
				this.form.imgs.push(res.url);
			},
			// 图片数量超出限制的提示
			overSizeOfDetail(files, fileList) {
				this.$message({
					message: "上传图片不能超过5张'",
					type: 'error',
				})
			},
			// 图片上传前的检查
			uploadBeforeOfDetail(file) {
				if (file.size / 1024 > 300) {
					this.$message({
						message: "图片请保持在750*350px,300KB以内",
						type: 'error',
					})
					return false
				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file, fileList) {
				this.form.imgs=[]
				for(let i=0;i<fileList.length;i++){
					this.form.imgs.push(fileList[i].response.url)
				}
			},
		}
		
	}
</script>
<style lang="scss" scoped>
	.el-form--inline .el-form-item {
		display: block;
	}

	.style_auto {
		width: 87%;
		margin: 0 auto;
	}

	.save_btn {
		margin: 20px 0;
		text-align: center;
	}



	/deep/ .el-form-item__error {
		white-space: nowrap !important
	}

	/deep/ .list-detail .el-input__inner {
		margin: 5px 0
	}

	.columnList {
		border-color: #fff
	}

	.columnList td,
	th {
		padding: 10px 15px;
		text-align: center;
	}

	.columnList td input {
		width: 100px
	}

	.upload_btn {
		width: 80px;
		position: relative;
		display: inline-block
	}

	.upload_btn input {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		width: 80px;
		opacity: 0;
		bottom: 0;
	}

	.wrap {
		overflow: hidden
	}

	.list {
		clear: both;
		overflow: hidden;
	}

	.item_list {
		position: relative;
		float: left;
		margin: 0 10px;
	}

	.item_del {
		position: absolute;
		left: 165px;
		width: 30px;
		height: 30px;
		padding: 0;
		border-radius: 100%;
		top: 8px;
	}

	.item_del.del {
		left: 230px;
	}

	.list_title {
		float: left;
		line-height: 44px;
		color: #409EFF;
	}

	table {
		width: 50%;
		max-width: 100%;
		border: none;
	}

	th {
		background-color: #409EFF;
		color: #fff;
		border: 1px solid #fff;
		padding: 8px;
		font-weight: normal;
		white-space: nowrap
	}

	td {
		background-color: #EFEFEF;
		border: 1px solid #fff;
		padding: 8px;
	}

	.img_list {
		position: relative;
	}

	.img_list div {
		position: absolute;
		top: 50%;
		margin-top: -25px;
		left: 50%;
		margin-left: -25px;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		font-size: 20px;
		padding: 0;
		border: none;
		opacity: 0;
		text-align: center;
		line-height: 50px;
		cursor: pointer
	}

	.img_list:hover div {
		opacity: 1;
		transition: all 0.3s
	}
</style>
