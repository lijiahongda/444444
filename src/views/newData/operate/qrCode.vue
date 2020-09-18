<!--suppress ALL -->
<template>
	<div class="app-container">
		<div class="list" v-for="(list,index) in form.data" :key="index" v-loading="loading">
			<div class="item_list">
				<div class="loay_float loay_text">选择官网：</div>
				<div class="loay_float">
					<el-checkbox-group v-model="list.websitePath">
						<el-checkbox v-for="city in cities" :label="city.lid" :key="city.lid">{{city.super_name}}</el-checkbox>
					</el-checkbox-group>
					<p><span>{{list.appName}}</span>（尺寸:500*500，100kb以内）</p>
				</div>
			</div>
			<div class="item_list">
				<div class="child">
					<div class="loay_float loay_text">安卓：</div>
					<div class="img_item">
						<uploadImg :limit="1" @successList="successList" @otherList="otherList(index,'androidCodeImg')" :imgList="list.androidCodeImg" />
					</div>
				</div>
				<div class="child">
					<div class="loay_float loay_text">IOS：</div>
					<div class="img_item">
						<uploadImg :limit="1" :imgList="list.iosCodeImg" @successList="successList" @otherList="otherList(index,'iosCodeImg')" />
					</div>
				</div>
				<div class="child">
					<div class="loay_float loay_text">公众号：</div>
					<div class="img_item">
						<uploadImg :limit="1" :imgList="list.publicNumberCodeImg" @successList="successList" @otherList="otherList(index,'publicNumberCodeImg')" />
					</div>
				</div>
				<div class="child">
					<div class="loay_float loay_text">小程序：</div>
					<div class="img_item">
						<uploadImg :limit="1" :imgList="list.smallProceduresCodeImg" @successList="successList" @otherList="otherList(index,'smallProceduresCodeImg')" />
					</div>
				</div>
			</div>
			<div class="item_list">
				<div class="loay_float loay_text length">安卓下载地址：</div>
				<div class="loay_float">
					<el-input v-model="list.androidDownloadPath" style="width: 300px;"></el-input>
				</div>
			</div>
			<div class="item_list">
				<div class="loay_float loay_text length">IOS下载地址：</div>
				<div class="loay_float">
					<el-input v-model="list.iosDownloadPath" style="width: 300px;"></el-input>
				</div>
			</div>
		</div>
		<el-button type="primary" class="save" @click="onSave">保存</el-button>
	</div>
</template>
<script>
	import {getQrCodes,upQrCode,addQrCode} from '@/api/shops'
	import uploadImg from '../../public/uploadImg'
	import _ from 'lodash'
	 const cityOptions = [{
		 super_name:"yuelvhui.com",
		 lid:1
	 },{
		 super_name:"yuelvhui.cn",
		 lid:2
	 },{
		 super_name:"yuedaren.cn",
		 lid:3
	 },{
		 super_name:"open.yuelvhui.com",
		 lid:4
	 }];
export default {
    data() {
        return {
					cities: cityOptions,
					imgList:[],
					form:{
						data:[{
							appName:'悦旅会APP',//APP名称
							websitePath:[],//逛网地址
							androidCodeImg:'',//安卓二维码
							iosCodeImg:'',//IOS二维码
							publicNumberCodeImg:'',//公众号二维码
							smallProceduresPodeImg:'',//小程序二维码
							androidDownloadPath:'',//安卓下载地址
							iosDownloadPath:'',//IOS下载地址
						},{
							appName:'大人APP',//APP名称
							websitePath:[],//逛网地址
							androidCodeImg:'',//安卓二维码
							iosCodeImg:'',//IOS二维码
							publicNumberCodeImg:'',//公众号二维码
							smallProceduresPodeImg:'',//小程序二维码
							androidDownloadPath:'',//安卓下载地址
							iosDownloadPath:'',//IOS下载地址
						},{
							appName:'悦呗APP',//APP名称
							websitePath:[],//逛网地址
							androidCodeImg:'',//安卓二维码
							iosCodeImg:'',//IOS二维码
							publicNumberCodeImg:'',//公众号二维码
							smallProceduresPodeImg:'',//小程序二维码
							androidDownloadPath:'',//安卓下载地址
							iosDownloadPath:'',//IOS下载地址
						},{
							appName:'悦店APP',//APP名称
							websitePath:[],//逛网地址
							androidCodeImg:'',//安卓二维码
							iosCodeImg:'',//IOS二维码
							publicNumberCodeImg:'',//公众号二维码
							smallProceduresPodeImg:'',//小程序二维码
							androidDownloadPath:'',//安卓下载地址
							iosDownloadPath:'',//IOS下载地址
						}]
					},
					loading:true,
        }
    },
		components: {
			uploadImg
		},
    mounted() {
			this.getList()
    },
    methods: {
			handleCheckedCitiesChange(value) {
       console.log(value,'publicNumberCodeImg')
      },
			successList(res){
				console.log(res)
				this.pic = res.join(',')
			},
			otherList(index,data){
				this.form.data[index][data] = this.pic
			},
			// 列表数据
			getList() {
				getQrCodes().then(res=>{
					if(res.data.code==200){
						let dataList = res.data.data.list;
						if(dataList.length ==0){
							this.daveType =1;
							this.loading =false
							return false;
						}
						dataList.forEach((item)=>{
							item.websitePath = item.websitePath.split(",").map(item=>{
								return  parseInt(item)
							});
						})
						this.form.data = dataList;
						this.loading =false
					}
				})
      },
			onSave(){
				var obj = _.clone(this.form);
				obj.data.forEach(item=>{
					item.websitePath = item.websitePath.join(",");
				})
				if(this.daveType == 1){
					addQrCode(obj).then(res=>{
						this.loading = true;
						if(res.data.code == 200){
							this.$message.success(res.data.msg || '添加成功')
							this.getList()
							document.documentElement.scrollTop=0
						}
					})
				}else{
					upQrCode(obj).then(res=>{
						this.loading = true;
						if(res.data.code == 200){
							this.$message.success(res.data.msg || '编辑成功')
							this.getList()
							document.documentElement.scrollTop=0
						}
					})
				}
			}
		}
}
</script>
<style type="scss">
	.list{border-bottom: 1px solid #ccc;margin-top: 30px;padding-bottom: 40px;}
	.item_list{overflow: hidden;margin-bottom:20px}
	.loay_float{
        float: left;
    }
		.loay_float p span{font-weight: bold;}
		.loay_text{text-align: right;width: 85px;}
		.loay_text.length{width: 116px;margin-left: 85px;height: 36px;line-height: 36px;}
		.img_item{    float: left;
    width: 178px;}
		.save{margin: 50px auto;display: flex;justify-content: center;}
</style>
