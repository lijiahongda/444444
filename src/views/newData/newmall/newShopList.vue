<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
		<!--编辑-->
		<el-dialog :title="titleName" :visible.sync="dialogFormIsCheck" @close="closeBox">
			<el-form :model="formCheck" ref="formCheck">
				<el-form-item label="备注" :label-width="formLabelWidth"  prop="remark">
					<el-input type='textarea' v-model="formCheck.remark" autocomplete="off" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormIsCheck = false">取 消</el-button>
				<el-button type="primary" @click="upCheck()">确 定</el-button>
			</div>
		</el-dialog>
		<!--编辑-->


		<el-form :model="formSearch" ref="formSearch" :inline="true">
			<el-form-item label="活动类型:" prop="activity_id" >
				<el-col>
					<el-select v-model="formSearch.activity_id" clearable filterable placeholder="活动类型" style="width: 200px;"  @change="getList" clearable>
						<el-option v-for="item in searchData.goods_activity" :key="item.id" :label="item.activity_name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="选择分类">
				<el-select v-model="formSearch.category" placeholder="请选择一级分类" clearable  @change="getList">
					<el-option v-for="item in getChannelData" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="分销规则:" prop="distribution_id">
				<el-col>
					<el-select v-model="formSearch.distribution_id" clearable filterable placeholder="分销规则" style="width: 200px;" @change="getList" clearable>
						<el-option v-for="item in searchData.goods_distribution" :key="item.id" :label="item.distribution_name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="名称：">
				<el-col>
					<el-input v-model="formSearch.goods_name" clearable placeholder="商品名称/供应商名称" style="width:200px;" clearable @keyup.enter.native="onSubmit" prefix-icon="el-icon-search"/>
				</el-col>
			</el-form-item>
			<el-form-item label="sku id：">
				<el-col>
					<el-input v-model="formSearch.skuId" clearable placeholder="商品sku id" style="width:200px;" clearable @keyup.enter.native="onSubmit" prefix-icon="el-icon-search"/>
				</el-col>
			</el-form-item>
			<el-form-item label="是否使用优惠券:" prop="goods_coupon">
				<el-col>
					<el-select v-model="formSearch.goods_coupon" clearable placeholder="是否使用优惠券" style="width: 200px;"  @change="getList" clearable>
						<el-option v-for="item in isCoupon" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="商品状态:" prop="goods_status">
				<el-col>
					<el-select v-model="formSearch.goods_status" clearable placeholder="商品状态" style="width: 200px;"  @change="getList" clearable>
						<el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="供应商渠道:" prop="goods_status">
				<el-col>
					<el-select v-model="formSearch.sc_id" clearable placeholder="供应商渠道" @change="getList">
						<el-option v-for="item in getSupplierData" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="审核:" prop="goods_status">
				<el-col>
					<el-select v-model="formSearch.is_check" clearable placeholder="审核状态" @change="getList">
						<el-option label="待审核" value="1" />
						<!-- <el-option label="已通过" value="3" /> -->
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item>
				<el-col>
					<el-button type="primary" @click="onSubmit">查询</el-button>
					<el-button type="primary" @click="onEmpty('formSearch')">清空</el-button>
<!--					<el-button type="danger" @click="onAdd">新增</el-button>-->
				</el-col>
			</el-form-item>

		</el-form>
		<!--搜索部分-->
		<el-row :gutter="20" class="order_list">
			<el-col class="sku_num">SKU总量：<span v-html="sku_num"></span></el-col>
			<el-col class="sku_num" >商品总数：<span v-html="pageTotal"></span></el-col>
			<el-col class="sku_num" >上架商品：<span v-html="online_num"></span></el-col>
			<el-col class="sku_num">下架商品：<span v-html="down_num"></span></el-col>
		</el-row>
		<MediaGood :list="list"  @toggleActive="UpdateGoodsChecked" ref="mychild" @getList="getList">
			<template  slot-scope="{item}">
				<p class="operate">
				<span v-if="item.is_check == 3">
					<el-button type="text" size="small"  @click="upDown(item.goods_status,item.gid,list,index)">
						{{item.goods_status == 0?"上架":"下架"}}
					</el-button>
				</span>

					<el-button type="text" size="small" v-if="item.goods_status == 0"  @click="noPass(item.gid,item.middleProductId)">
						驳回中台
					</el-button>

					<span v-if="item.is_check == 1">
							<el-button type="text" size="small"  @click="isCheck(3,item.gid)">
								通过
							</el-button>
							<!-- <el-button type="text" size="small" @click="isCheck(2,item.gid)">
								驳回
							</el-button> -->
						</span>


					<router-link :to="{path:'/newmall/shopAdd',query:{gid: item.gid}}" target="_blank">
						<el-button type="text" size="small">编辑</el-button>
					</router-link>
				</p>
			</template>
		</MediaGood>
		<div class="pagination-container" >
			<el-pagination style="text-align:right;" :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background
						   layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<div style="margin-top: 20px">
			<span>已选取{{goodsChecked.length}}/{{this.pageSize}}个商品</span>
			<el-checkbox v-model="selectStatus" @change="selectAll">{{ selectStatus ? '取消全选' : '全选本页'}}</el-checkbox>
			<el-button v-if="formSearch.is_check== 1" class="pass" style="float: right" @click="updateIsCheckAll">批量通过</el-button>
			<el-button v-else class="online" style="float: right;margin: 0 20px;"  @click="updateIsOnlineAll">批量上架</el-button>
		</div>
	</div>
</template>
<script>
	import MediaGood from '@/components/MediaGood'
    import waves from '@/directive/waves' // 水波纹指令
    import {updateGoodSku,getGoods,getGoodBaseData,getChannelCategoryList,updateIsOnline,updateIsOnlineAll,getSupplierChannelList,updateIsCheck,updateIsCheckAll,noPassCenterGoods} from '@/api/shops'
    // 商品状态
    const productType = [
        { id: '0', name: '下架' },
        { id: '1', name: '上架' }
    ]

    // 是否使用优惠券
    const isCoupon = [
        { id: '0', name: '是' },
        { id: '1', name: '否' }
    ]

    export default {
        directives: {
            waves
        },
        components:{
            MediaGood
		},
        data() {
            return {
                goodsChecked: [],
				selectData:[],
				selectStatus: false,
                total: null,
                list: [],
                pageTotal:0,   //显示页数
                pageIndex:1,
                pageSize:10,
                searchData:{},
                formSearch:{
                    distribution_id:"",
                    activity_id:"",
                    goods_name:"",//商品名称
                    goods_coupon:"",//是否使用优惠券 0使用 1 bu使用
                    goods_status:"",//商品状态 0 下架 1 上架
                    sc_id:'',//供应商渠道
                },
                isCoupon,//是否使用优惠券
                productType,//商品状态
                getChannelData: [], //一级分类
                loading:true,
                down_num:"",//下线商品
                online_num:"",//上线商品
                sku_num:"",//SKU总数
                getSupplierData:[],//供应商渠道
                dialogFormIsCheck:false,
                remark:'',
                titleName:'',
                formLabelWidth:"10%",
                formCheck:{
                    id:"",
                    remark:"",
                    is_check:''
                },
            }
        },
        created() {
            this.getList();
            this.getBaseData()
            this.getSupplierChannelList()
            this.getChannelCategoryList()
        },
        methods: {
            //供应商渠道
            getSupplierChannelList() {
                getSupplierChannelList().then(res => {
                    if (res.data.code == 200) {
                        this.getSupplierData = res.data.data;
                    } else {
                        this.$message.error(res.data.msg || "失败")
                    }

                })
            },
            // 列表数据
            getList() {
                this.loading =true;
                this.selectStatus = false;
                var data = {
                    page:this.pageIndex,
                    distribution_id:this.formSearch.distribution_id ||null,
                    activity_id:this.formSearch.activity_id ||null,
                    goods_name:this.formSearch.goods_name ||null,//商品名称、供应商名称
                    goods_coupon:this.formSearch.goods_coupon ||null,//是否使用优惠券 0使用 1 使用
                    goods_status:this.formSearch.goods_status ||null,//商品状态 0 下架 1 上架
                    scId:this.formSearch.sc_id ||null,//供应商渠道ID
                    is_check:this.formSearch.is_check ||null,//审核
                    category:this.formSearch.category ||null,//分类
                    skuId:this.formSearch.skuId ||null//skuId
                }
                getGoods(data).then(res=>{
                    if(res.data.code == 200){
                        this.loading = false;
                        this.list = res.data.data;
                        this.total = res.data.total;
                        this.pageTotal = res.data.count;
                        this.loading = false;
                        this.sku_num = res.data.sku_num;
                        this.online_num = res.data.online_num;
                        this.down_num = res.data.down_num;
                        this.list.map(item => {
                            item.isCheck = false;
                            this.goodsChecked = [];
                            this.selectData = [];
                        })
                    }
                })
            },
            // 获取分销活动，标签，活动 数据
            getBaseData:function(){
                getGoodBaseData().then(res=>{
                    if(res.data.code==200){
                        this.searchData = res.data.data;
                    }
                })
            },
            //选择分销商等级
            getChannelCategoryList() {
                getChannelCategoryList().then(res => {
                    this.getChannelData = res.data;
                })
            },

            //上下架
            upDown(id,pid,list,index){
                if(id == 0){
                    var gid = 1;
                }else{
                    var gid = 0;
                }
                var obj ={
                    id:pid,
                    state:gid
                }
                updateIsOnline(obj).then(res=>{
                    if(res.data.code==200){
                        this.$message.success(res.data.msg || "成功")
                        this.getList();
                    }else{
                        this.$message.error(res.data.msg || "失败")
                    }
                })
            },
            updateGoodSku(){

			},

            noPass(gid,middleId)
            {
                var data={}
                data.id 	= gid;
                data.middleId 	= middleId;
                noPassCenterGoods(data).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                            message: '成功',
                            type: 'success'
                        });
                        this.pageIndex = 1
                        this.getList()
                        this.act_info={}
                    }else{
                        this.$message({
                            message: res.data.msg || '失败',
                            type: 'error'
                        });
                    }
                })

            },

            //通过驳回 弹框
            isCheck(isCheck,pid,list,index)
            {
                if(isCheck==3)
                {
                    this.titleName="通过";
                }else if(isCheck==2){
                    this.titleName="驳回";
                }
                this.formCheck.is_check = isCheck;
                this.formCheck.id = pid;
                this.dialogFormIsCheck=true
            },

            //通过驳回
            upCheck(){
                var obj=this.formCheck;
                console.log(obj);

                var data={}
                data.id 		= obj.id;
                data.is_check   = obj.is_check;
                data.remark     = obj.remark;
                updateIsCheck(data).then(res=>{
                    if(res.data.code==200){
                        this.dialogFormIsCheck = false;
                        this.$message({
                            message: this.titleName+'成功',
                            type: 'success'
                        });
                        this.pageIndex = 1
                        this.getList()
                        this.act_info={}
                    }else{
                        this.$message({
                            message: res.data.msg || this.titleName+'失败',
                            type: 'error'
                        });
                    }
                })


                if(this.userType==2){

                }
            },
            closeBox(){
                this.remark="";
            },

            onSubmit() {
                this.loading =true;
                this.pageIndex = 1
                this.getList()
            },
            onEmpty(formName) {
                this.pageIndex = 1;
                this.$refs[formName].resetFields();
                this.getList()
            },
            onAdd(){
                this.$router.push('/newmall/shopAdd')
            },
            // 搜索
            handleFilter() {
                this.pageIndex = 1;
                this.getList()
            },
            // 分页
            handleSizeChange(val) {},
            handleCurrentChange(val) {
                this.loading = true;
                this.pageIndex = val;
                this.getList()
            },
			//子组件触发
            UpdateGoodsChecked(val){
                console.log(val,333)
                this.goodsChecked = val;
                this.selectData = [];
                val.forEach(item=>{
                    console.log(val,888)
                    let tar = this.list.findIndex(self=>{
                        return item == self.gid
                    });
                    console.log(tar,111)
                    if(tar >= 0){
                        console.log(tar,'tar666')
                        this.selectData.push({
                            id:this.list[tar].gid,
                            state:1
                        })
                    }
                })
            },
			//全选
            selectAll(val){
				if(val){
                    this.goodsChecked = [];
                    this.selectData = [];
                    this.list.map(item => {
                        item.isCheck = true;
                        this.goodsChecked.push(item.gid)
                        this.selectData.push({
                            id:item.gid,
                            state:1
						})
                    })
				} else {
                    this.list.map(item => {
                        item.isCheck = false;
                        this.goodsChecked = [];
                        this.selectData = [];
                    })
                    this.$refs.mychild.init();
				}
			},
			//批量通过
            updateIsCheckAll(){
                if(!this.selectData.length) {
                    this.$message.warning('请先选择商品');
                    return false;
				}
                this.$confirm('是否确认商品批量审核通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.loading = true;
                    let params = this.selectData;
                    params.map(item=>{
                        item.is_check = 3;
                        item.remark = '';
                    })
                    updateIsCheckAll(params).then(res=>{
                        if(res.data.code == 200){
                            this.$message.success(res.data.msg);
                            this.getList();
                            this.$refs.mychild.init();
                        }
                    })
				})
			},
            //批量上架
            updateIsOnlineAll(){
                if(!this.selectData.length) {
                    this.$message.warning('请先选择商品');
                    return false;
                }
                this.$confirm('是否确认商品批量上架?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.loading = true;
                    updateIsOnlineAll(this.selectData).then(res=>{
                        if(res.data.code == 200){
                            this.$message.success(res.data.msg);
                            this.getList();
                            this.$refs.mychild.init();
                        }
                    })
				})
            }
        }
    }
</script>
<style lang="scss" scoped>
	.new_tab{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goodItem{
		p{
			margin: 10px;
		}
	}






	.goodsName{
		display: block;
	}
	.down_shop{color: #f00;}
	.up_shop{color: green;}
	.order_list{
		margin: 30px 0;
		font-size: 1rem;
		color: #999;
		font-size: 16px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>
