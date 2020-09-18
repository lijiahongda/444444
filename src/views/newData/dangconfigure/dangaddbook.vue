<template>
	<div class="danghome">
		<div class="content">
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				<el-form-item label="分类名称">
					<el-input v-model="formLabelAlign.name" size="medium"></el-input>
				</el-form-item>
				<el-form-item label="添加书籍">
					<div class="city-select">
						<el-select v-model="province" placeholder='选择一级分类'>
							<el-option v-for="option in arr" :value="option.name" :key="option.id">
								{{option.name}}
							</el-option>
						</el-select>
						<el-select v-model="city" filterable placeholder="选择二级分类">
							<el-option v-for="option in cityarr" :value="option.name" :key="option.id">
								{{option.name}}
							</el-option>
						</el-select>
						<el-select v-model="district" filterable placeholder="选择三级分类" @change="getVal">
							<el-option v-for="(option,index) in distyarr" :value="option.id" :label="option.name" :key="index">
							</el-option>
						</el-select>
						<el-select v-model="bookname" filterable @change="getname">
							<el-option v-for='option in bookarr' :value="option.id" :label="option.name " :key="option.id">
								{{option.name}}
							</el-option>
						</el-select>
					</div>
				</el-form-item>
				<el-form-item label="是否置顶">
					<el-radio-group v-model="formLabelAlign.resource">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
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
		getDdCategoryList,
		getProductList,
		addDdRecommendBook
	} from '@/api/admin'
	export default {
		data() {
			return {
				tableData: [],
				province: '',
				city: '',
				district: '',
				// area: [],
				cityarr: [],
				distyarr: [],
				arr: '',
				formLabelAlign: {
					name: '',
					resource: '0'
				},
				labelPosition: 'right',
				bookname: '',
				bookarr: [],
				id1: '',
				id2: '',
				id3: '',
				bookid: '',
				bookskuid: '',
				channel_id: 8,
				image_path: ''
			}
		},
		mounted() {
			this.getList()
			this.updateCity()
		},
		methods: {
			// 获取列表数据
			getList() {
				this.formLabelAlign.name = this.$route.query.recommendName
				console.log(this.$route.query.recommendName)
				getDdCategoryList({
					channel_id: this.channel_id
				}).then(res => {
					if (res.data.code == 200) {
						// console.log(res.data.data)
						this.arr = res.data.data.list
					}
					// console.log(res.data)
				})
			},
			getVal(val) {
				// console.log(val,'id')
				// console.log(this.distyarr[0].id,'我是默认id')
				if (val === undefined || val === '' || val === null) {
					this.id3 = this.distyarr[0].id
				} else {
					this.id3 = val
				}
				if (val) {
					let district1 = this.distyarr.filter(item => {
						return item.id === val;
					})
					let name = district1[0].name;
					this.district = name

				}
				this.bookarr = []
				this.bookname=''
			},
			getname(val) {
				// console.log(val)
				if (val) {
					let bookarrs = this.bookarr.filter(item => {
						return item.id === val;
					})
					let names = bookarrs[0].name;
					let bookid = bookarrs[0].id;
					let bookskuid = bookarrs[0].product_sku_id;
					let image_path = bookarrs[0].image_path;
					this.bookname = names
					this.bookid = bookid
					this.bookskuid = bookskuid
					this.image_path = image_path
					// console.log(names,bookid,bookskuid,image_path,'所有')
				}
			},
			updateCity: function() {
				for (var i in this.arr) { //遍历所有的省
					var obj = this.arr[i];
					this.id1 = obj.id
					if (obj.name == this.province) { //当选择一个省时
						this.cityarr = obj.children; //将这个省下的市数据注入
						break;
					}
				}
				this.city = this.cityarr[0] ? this.cityarr[0].name : ''; //这里可以设置<市-默认值>
			},
			updateCountry: function() {
				for (var i in this.cityarr) {
					var obj = this.cityarr[i];
					this.id2 = obj.id
					if (obj.name == this.city) {
						this.distyarr = obj.children;
						break;
					}
				}
				this.district = this.distyarr[0] ? this.distyarr[0].name : ''; //设置<区-默认值>
			},
			addcommit() {
				var ids = this.id1 + ',' + this.id2 + ',' + this.id3
				var names = this.province + ',' + this.city + ',' + this.district
				// console.log(names,'名字')
				// console.log(this.bookname,this.bookid,'商品名称与ID')
				var data = {
					channel_id: this.channel_id,
					recommend_category_id: this.$route.query.id,
					book_name: this.bookname,
					category_ids: ids,
					names: names,
					product_id: this.bookid,
					product_skuid: this.bookskuid,
					top_status: this.formLabelAlign.resource,
					sort: this.formLabelAlign.resource,
					image_path: this.image_path
				}
				addDdRecommendBook(data).then(res => {
					if (res.data.code == 200) {
						this.$message({
							message: res.data.msg,
							type: 'success'
						})
						this.$router.go(-1)
					}
				})
			},
			nocommit() {
				this.$router.back(-1)
			},
			getbookname() {
				var ids = this.id1 + ',' + this.id2 + ',' + this.id3
				var names = this.province + ',' + this.city + ',' + this.district
				var data = {
					channel_id: this.channel_id,
					category_ids: ids
				}
				getProductList(data).then(res => {
					if (res.data.code == 200) {
						if (res.data.data === '') {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							})
						} else {
							this.bookarr = res.data.data
						}
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						})
					}
				})
			}

		},
		watch: {
			province: function() { //当省改变时，改变城市和区
				this.updateCity(),
					this.updateCountry()
				this.getVal()
			},
			city: function() { //当市改变的时候，改变区
				this.updateCountry()
				this.getVal()
			},
			district() {
				this.getbookname()
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
