<template>
	<div class="danghome">
		<div class="top">
		</div>
		<div class="content">
			<el-form :label-position="labelPosition" label-width="80px">
				<el-form-item label="分类名称">
					<el-input v-model="formLabelAlign" size="medium" />
				</el-form-item>
				<el-form-item label="">
					<el-button type="primary" round @click="addcommit">确定</el-button>
					<el-button round @click="nocommit">取消</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	import {
		addDdRecommendCategory
	} from '@/api/admin'
	export default {
		data() {
			return {
				tableData: [],
				formLabelAlign: '',
				labelPosition: 'right'
			}
		},
		mounted() {

		},
		methods: {
			// 获取列表数据
			getList() {

			},

			addcommit() {
				var _this = this
				addDdRecommendCategory({
					category_name: _this.formLabelAlign
				}).then(res => {
					if (res.data.code==200) {
					  this.$message({
					  	type:"success",
					  	message:'添加成功'
					  })
					  this.$router.push('/dangconfigure/danghome')
					}else{
						this.$message({
							type:"error",
							message:'添加失败，请重试'
						})
					}

				})
			},
			nocommit() {
				this.$router.go(-1)
			},
			addclass() {

			}

		}
	}
</script>

<style scoped lang="scss">
	.top {
		margin: 10px;
		height: 38px
	}

	.content {
		margin: 10px;
	}
</style>
