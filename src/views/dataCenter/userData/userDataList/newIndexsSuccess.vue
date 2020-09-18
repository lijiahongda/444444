<!--suppress ALL -->
<template>
	<div class="app-container">
        <h2 style="color:black">导入成功提现</h2>
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="提现ID">
				<el-input v-model="form.idArr" type="textarea" class="a" :autosize="{minRows:37}" placeholder="请输入体现ID" style="width:100px;line-height:36px;" />
                <div v-if='remarks.length' style="display:inline-block;vertical-align: top;padding: 5px 15px;">
                    <p v-for="item in remarks" :key="item.cashId">提现ID：{{item.cashId}}，{{item.cashMsg}}</p>
                </div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onConfirm()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {passCashAll} from '@/api/dataCenter'

export default {
    directives: {
        waves
    },
    data() {
        return {
            remarks:[],
			form:{
                idArr:"",
                
			}
        }
    },
    created() {
		// if(this.$route.query.powerId){
		// 	this.getList(this.$route.query.powerId);
		// 	this.btnName ="编辑权限"
		// }
    },
    methods: {
		
		//保存
		onConfirm(){
            this.remarks = [];
            passCashAll(this.form).then(res=>{
                if(res.data.code==200){
                    this.remarks = [...res.data.data];
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    // this.$router.push('/power/adminPower')
                }else{
                    this.$message({
                        message: '保存失败',
                        type: 'error'
                    });
                }
            })
			
		},
    }
}
</script>
<style type="scss" scoped="scoped">
	.el-form--inline .el-form-item{
		display: block;
	}
    .a{
       height: 800px !important; 
    }
    p{
        margin: 0;
        line-height: 21px
    }
    .a textarea{
        height: 800px !important;
    }
	
	/deep/ .el-radio{margin-top: 10px;width: 128px;}
	/deep/ .el-form-item__content{width: 85%;}
	/deep/ .no_margin .el-radio{margin-top: 0;}
</style>
