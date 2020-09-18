<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item label="权限名称">
				<el-input v-model="form.powerName" placeholder="请输入权限名称" style="width:300px;" />
			</el-form-item>
			<el-form-item label="权限类型" class="no_margin">
				<el-radio-group v-model="form.level" @change="changePower">
					<el-radio :label="item.id" v-for="(item,index) in powerListMenu" :key="index">{{item.name}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="选择权限" v-if="levelList.length >0">
				<el-radio-group v-model="form.pid" style="width: 90%;">
					<el-radio :label="item.powerId" v-for="(item,index) in levelList" :key="index">{{item.powerName}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="权限URL" v-if="form.level !=1">
				<el-input v-model="form.powerRouteName" placeholder="请输入权限URL或者权限参数" style="width:300px;" />
			</el-form-item>
			<el-form-item label="权限图标" v-if="form.level ==1">
				<el-input v-model="form.icon" placeholder="el-icon-user-solid" style="width:300px;" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onConfirm()">{{btnName}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import waves from '@/directive/waves' // 水波纹指令
	import {addPower,upPower,getTreePowers,getLevelPowers,getPower} from '@/api/admin'

export default {
    directives: {
        waves
    },
    data() {
        return {
			form:{
				powerName:"",
				level:"",
				powerRouteName:"",
				pid:"",
				icon:"",
			},
			checkedList:[2],//默认选中的值
            powerListMenu: [{
				id: 0,
				name: '顶级菜单',
			},{
				id: 1,
				name: '一级菜单',
			},{
				id: 2,
				name: '二级菜单',
			},{
				id: 3,
				name: '三级菜单',
			}],//权限列表
			levelList:[],//树状
		  powerName:'',//搜索条件角色名
		  defaultProps: {
			  children: 'children',
			  label: 'powerName'
			},
			btnName:"新增权限",
        }
    },
    created() {
		if(this.$route.query.powerId){
			this.getList(this.$route.query.powerId);
			this.btnName ="编辑权限"
		}
    },
    methods: {
		// 点击单选事件
		changePower(val){
			console.log(val)
			if(val !=0){
				getLevelPowers({level:parseInt(val-1)}).then(res=>{
					if(res.data.code == 200){
						this.levelList = res.data.data;
					}
					
				})
			}else{
				this.levelList =[];
			}
		},
        // 获取权限详情
        getList(powerId) {
			getPower({powerId:powerId}).then(res=>{
				if(res.data.code==200){
					this.loading = false;
					this.form = res.data.data;
					this.form.level = parseInt(this.form.level )
					this.form.pid = parseInt(this.form.pid )
					getLevelPowers({level:parseInt(this.form.level -1)}).then(res=>{
						if(res.data.code == 200){
							this.levelList = res.data.data;
						}
						
					})
				}else{
					this.loading = false;
					this.$message.error(res.data.msg ||"网络开小差了~")
				}
			})
        },
		//保存
		onConfirm(){
			if(this.$route.query.powerId){
				upPower(this.form).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.$router.push('/power/adminPower')
					}else{
						this.$message({
							message: '编辑失败',
							type: 'error'
						});
					}
				})
			}else{
				addPower(this.form).then(res=>{
					if(res.data.code==200){
						this.$message({
							message: '保存成功',
							type: 'success'
						});
						this.$router.push('/power/adminPower')
					}else{
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					}
				})
			}
		},
    }
}
</script>
<style type="scss" scoped="scoped">
	.el-form--inline .el-form-item{
		display: block;
	}
	
	/deep/ .el-radio{margin-top: 10px;width: 128px;}
	/deep/ .el-form-item__content{width: 85%;}
	/deep/ .no_margin .el-radio{margin-top: 0;}
</style>
