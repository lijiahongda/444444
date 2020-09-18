<template>
	<div style="position: relative; padding:20px;">
		<el-form ref="form" label-width="150px" v-loading="loading">
			<el-form-item label="上传亚马逊订单">
				<el-upload class="upload-file" action="http://yuetao.yuelvhui.cn/mall/addFirstAmazonOrderByExcel"
					:on-success="uploadSuccessAll3" :before-upload="uploadBeforeOfDetail">
					<el-button size="small" type="primary" class="leftStyle upload">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传亚马逊订单佣金">
				<el-upload class="upload-file" action="http://yuetao.yuelvhui.cn/mall/addTwoAmazonOrderByExcel"
					:on-success="uploadSuccessAll" :before-upload="uploadBeforeOfDetail">
					<el-button size="small" type="primary" class="leftStyle upload">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传海威充值订单">
				<el-upload class="upload-file" action="http://yuetao.yuelvhui.cn/mall/importPddOrderByExcel"
						   :on-success="uploadSuccessAll" :before-upload="uploadBeforeOfDetail">
					<el-button size="small" type="primary" class="leftStyle upload">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
				</el-upload>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading: false
			}

		},
		methods: {
			//上传文件
			uploadSuccessAll3(res, file) {
				console.log(file)
				// file.response.url =''
				if (res.code == 200) {
					this.loading = false
					this.$message.success(res.msg || '上传成功')
				} else {

					this.$message({
						message: res.msg,
						type: 'error'
					})
					this.loading = false
				}
			},
			//上传文件
			uploadSuccessAll(res, file) {
				// file.response.url =''
				if (res.code == 200) {
					this.loading = false
					this.$message.success(res.msg || '上传成功')
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					})
					this.loading = false
				}
			},
			uploadBeforeOfDetail(file) {
				// if (this.searchCondition.mchId) {
				if (file.name.indexOf('.xls') > 0 || file.name.indexOf('.xlsx') > 0) {
					this.loading = true
					// this.mchId = this.searchCondition.mchId
					var opt = [this.type]
				} else {
					this.$message.error('请上传excel格式文件')
					return false
				}
				// } else {
				// console.log(333, file)
				// this.$message.info('请先选择子公司')
				// return false
				// }
			},
		}
	}

</script>
