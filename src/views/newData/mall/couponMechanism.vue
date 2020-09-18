<!--suppress ALL -->
<template>
	<div class="app-container">
		<el-form ref="formSearch" :model="formSearch"  label-width="120px" :inline="true">
			<!-- <el-form-item label="优惠券名称：" prop="coupon_name">
				<el-col>
					<el-input v-model="formSearch.coupon_name" placeholder="请输入优惠券名称" style="width:300px;" />
				</el-col>
			</el-form-item>
			<el-form-item label="状态" prop="isOpen">
				<el-col>
					<el-select v-model="formSearch.isOpen" placeholder="请选择" style="width: 300px;">
						<el-option v-for="item in isOpen" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="类型" prop="coupon_type">
				<el-col>
					<el-select v-model="formSearch.coupon_type" placeholder="请选择" style="width: 300px;">
						<el-option v-for="item in isType" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="适用业务" prop="modules">
				<el-col>
					<el-select v-model="formSearch.modules" placeholder="请选择" style="width: 300px;">
						<el-option v-for="item in isYw" :key="item.key" :label="item.display_name" :value="item.key" />
					</el-select>
				</el-col>
			</el-form-item> -->
			<el-form-item>
				<!-- <el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="onEmpty('formSearch')">清空</el-button>
				<el-button type="primary" @click="onExport">导出</el-button> -->
        <el-button type="primary" @click="onAdd">新增</el-button>
				</el-col>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<div class="new_tab" v-loading="loading">
			<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%;">
				<el-table-column fixed prop="cid" label="序号	" width="70" align="center">
				</el-table-column>
				<el-table-column prop="coupon_name" label="发劵名称" align="center">
				</el-table-column>
				<el-table-column prop="modules" label="适用业务" align="center">
				</el-table-column>
				<el-table-column prop="opportunity" label="发送时机" align="center">
				</el-table-column>
				<el-table-column prop="isMember" label="使用限制" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center">
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="120" align="center">
					<template slot-scope="scope" align="center">
						<router-link :to="{path:'/mall/couponMechanismAdd',query:{cid:scope.row.cid}}">
							<el-button type="text" size="small">编辑</el-button>
						</router-link>
						<el-button type="text" size="small" @click="closeGet(scope.row,scope.$index)">{{scope.row.status=='关闭'?'开启':'关闭'}}</el-button>
            <el-button type="text" size="small" @click="deleteCoupon(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-container" style="text-align:right;">
			<el-pagination :current-page="pageIndex" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal"
						   background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
		<!-- 点击发送弹出 -->
		<el-dialog title="发送优惠券" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>
			<el-form :model="form">
				<el-form-item label="*请输入数量">
					<el-input v-model="form.number"></el-input>
				</el-form-item>
				<el-form-item label="*请输入手机号">
					<el-input v-model="form.mobile"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="sendSave">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import waves from '@/directive/waves' // 水波纹指令
    import {selectCouponMechanism,couponMechanismUpdate,sendCoupon,couponMechanismDelete} from '@/api/admin'
    // 适用业务
    const isYw = [
        { key: 1, display_name: '酒店' },
        { key: 2, display_name: '商城' },
        { key: 3, display_name: '线路' }
    ]
    // 类型
    const isType = [
        { key: 0, display_name: '满减券' },
        { key: 1, display_name: '折扣券' }
    ]

    // 是否会员
    const isOpen = [
        { key: '0', display_name: '关闭' },
        { key: '1', display_name: '开启' }
    ]

    export default {
        directives: {
            waves
        },
        data() {
            return {
                total: null,
                switchChart: false,
                list: [],
                pageTotal:0,   //显示页数
                pageIndex:1,
                pageSize:10,
                searchData:{},
                formSearch:{
                    page:"",
                    coupon_name:"",//优惠券名称
                    isOpen:"",//状态 0 关闭 1 开启
                    coupon_type:"",//满减券 0满减券 1 折扣券
                    modules:""//适用业务 1酒店 2商城  3线路
                },
                isOpen,//状态 0 关闭 1 开启
                isType,//筛选类型
                isYw,
                dialogFormVisible: false,
                form:{
                    number:'',
                    mobile:''
                },
                id:'',
                loading:true,
            }
        },
        created() {
            this.getList()
        },
        methods: {
            // 列表数据
            getList() {
                this.formSearch.page = this.pageIndex;
                selectCouponMechanism(this.formSearch).then(res=>{
                    if(res.data.code == 200){
                        this.loading = false;
                        this.list = res.data.data;
                        this.total = res.data.totalPage;
                        this.pageTotal = parseInt(res.data.totalPage) * parseInt(this.pageSize);
                    }
                })
            },
            deleteCoupon(row){
              let data={
                id:row.cid
              }
              couponMechanismDelete(data).then(res=>{
                if(res.data.code == 200){
                  this.$message({
                    message:"删除成功",
                    type:"success"
                  })
                  this.getList()
                }else{
                  this.$message.error(res.data.msg)
                }
              })
            },
            // 关闭/开启
            closeGet(row,idx){
                let status = row.status == '关闭'?status=1:status=2;
                let json = {
                    id:row.cid,
                    status:status
                };
                couponMechanismUpdate(json).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:"修改成功",
                            type:"success"
                        })
                        this.getList()
                    }
                })
            },
            // 发送 获取id
            send(cid){
                this.dialogFormVisible = true
                this.form.number=""
                this.form.mobile=""
                this.id=cid
            },
            // 点击确认
            sendSave(){
                if(this.form.number=='' || this.form.mobile == ''){
                    this.dialogFormVisible = true
                    alert('请填写信息！');return
                }
                var obj={
                    mobiles: this.form.mobile,
                    sendNum: this.form.number,
                    cid:this.id
                }

                this.dialogFormVisible = false;
                sendCoupon(obj).then(res=>{
                    if (res.data.code == 200) {
                        this.$message({
                            message:"提交成功！",
                            type:"success"
                        })
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:"error"
                        })
                    }
                })
            },
            onExport(){
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['序号', '优惠券名称', '券类型', '使用门槛', '优惠方式','有效时间', '使用业务', '库存数量', '领取量', '使用量', '使用率', '用途','状态'];
                    const filterVal = ['cid', 'coupon_name', 'coupon_type', 'coupon_type_befor', 'promotion','valid_time', 'modules', 'stock_num', 'send_num', 'use_num','use_percent', 'typeName','isOpen']
                    const list = this.list;
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader, //表头 必填
                        data, //具体数据 必填
                        filename: 'ylh', //非必填
                        autoWidth: true, //非必填
                        bookType: 'xlsx' //非必填
                    })
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            onSubmit() {
                this.pageIndex = 1
                this.getList()
            },
            onEmpty(formName) {
                this.pageIndex =1;
                this.$refs[formName].resetFields();
                this.getList()
            },
            onAdd(){
                this.$router.push('/mall/couponMechanismAdd')
            },
            // 搜索
            handleFilter() {
                this.pageIndex = 1
            },
            // 分页
            handleSizeChange(val) {},
            handleCurrentChange(val) {
                this.loading = true;
                this.pageIndex = val;
                this.getList()
            }
        }
    }
</script>
<style type="scss" scoped>
.el-button+.el-button{
  margin: 0;
}
	.goodsName{
		display: block;
	}
</style>
