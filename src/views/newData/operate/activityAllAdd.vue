<template>
	<div class="gropAdd" v-loading="loading">

		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="综合活动名称" class="background_color">
				<el-input v-model="form.aa_name" placeholder="请输入综合活动名称"></el-input>
			</el-form-item>
			<el-form-item label="选择类型" class="background_color">
				<el-radio-group v-model="form.aa_type" @change="radioChange">
					<el-radio v-model="form.aa_type" :label="0">默认</el-radio>
					<el-radio v-model="form.aa_type" :label="1">首页</el-radio>
					<el-radio v-model="form.aa_type" :label="2">广告图</el-radio>
					<el-radio v-model="form.aa_type" :label="3">秒杀广告图</el-radio>
					<el-radio v-model="form.aa_type" :label="4">二级页面</el-radio>

				</el-radio-group>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import _ from 'lodash'
	import waves from '@/directive/waves' // 水波纹指令
	import uploadImg from '../../public/uploadImg'
	import {
		tabGoods,
		getBargain,
		getSeckill,
        getActivities,
        getActivitiesCoupons,
		deletItemeGoods,
		getCoupons,
		addActivityAll,
		getSeckillsLater
	} from '@/api/shops'
import { constants } from 'crypto';
import { truncate, truncateSync } from 'fs';
import { all } from 'q';
	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}
	export default {
		directives: {
			waves
		},
		components: {
			uploadImg
		},
		data() {
			return{
			  loading: false,
              form:{}
			}
		},
		mounted() {
			if (this.$route.query.id) {
				this.loading = true;
			}
		},
		methods:{
          radioChange(){},
          onSubmit() {
            addActivityAll(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: '添加成功',
                  type: 'success',
                })
                this.$router.push('/operate/activityAll')
              } else {
                this.$message({
                  message: res.data.msg || '添加失败',
                  type: 'error',
                })
              }
            })
          },
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.el-form-item__content span {
		clear: both
	}

	.goodItem{
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
	}

	.list_border ,.list_border1{
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 20px 0;
		width: 800px;

		/deep/ .el-form-item__label {
			color: #409EFF
		}
	}
    .list_border1{
        width: 80%;
    }

	.list_info {
		overflow: hidden;
		margin-bottom: 20px;
	}

	.input_list {
		float: left;
		width: 230px;
		margin-left: 20px;
		margin-top: 26px;

		.el-input--medium {
			margin-top: 10px
		}
	}

	/deep/ .avatar-uploader {
		float: left;
		height: 96px;
		border-radius: 5px;
		margin-left: 10px;
	}

	.el-form-item__content .avatar-uploader {
		float: none
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
		width: 90px;
		height: 90px;
		line-height: 90px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
	}

	/deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 88px;
		height: 88px;
	}

	/deep/ .el-upload--picture-card {
		display: inline-block;
		width: 88px;
		height: 88px;
		line-height: 90px;
	}

	.avatar {
		width: 88px;
		height: 88px;
		display: block;
		margin-right:20px;
	}

	.ipt_list input {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px
	}

	.gropAdd {
		margin: 20px;
		box-sizing: border-box;
		padding: 20px;
	}

	.input-common {
		width: 450px;
		display: flex;
		justify-content: space-between;

		.input-name {
			width: 250px;
		}

		;

		.s1 {
			margin-bottom: 5px;
			overflow: hidden;

			.s2 {
				margin-right: 5px;
				display: inline-block;
			}
		}

		.input-div {
			color: #999;
			padding-left: 5px;
			width: 200px;
		}
	}

	.bargain_mode {
		display: block;
		overflow: hidden;

	}

	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none
	}

	.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			border-top: 1px solid #ddd;
			margin-bottom: 5px;
		}

		li.selectName {
			padding: 10px;
			width: 670px;
			margin: 15px 0;
			background: #f1f1f1;
		}

		li.small_bg.selectName {
			width: 480px
		}

		.imgDiv {
			/*float: left;*/
			background: #fff;
			width: 70px;
			height: 70px;

			img {
				width: 100%;
				height: 100%;
			}
		}
		.otherPrice{
			color: #aaa;
			margin-top: 10px;
		}

		.section-p {
			width: 500px;
			padding-left: 10px;
			box-sizing: border-box;
			/*float: left;*/
			p{
				margin: 0;
			}
			span {
				line-height: 16px;
				display: inline-block;
				margin-right: 20px;
			}
		}

		.select-btn {
			float: right;
		}
	}

	/deep/ .del_item .el-button--danger.is-plain {
		padding: 0;
		width: 50px;
		height: 25px;
	}

	.background_color {
		position: relative;
		width: 600px;
	}

	.background_color .el-input__inner {
		width: auto;
	}

	.color_name {
		position: absolute;
		right: 0;
		top: 0;
	}

	.is_relonly {
		color: #409EFF;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
	}

	.del_moudle {
		position: absolute;
		top: 35px;
		right: 20px
	}

	.select_shop {
		position: absolute;
		top: 80px;
		right: 20px
	}
</style>
