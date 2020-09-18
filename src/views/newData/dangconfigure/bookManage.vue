<template>
    <div class="bookManage">
        <div class="content">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="gid" label="书籍id">
                </el-table-column>
                <el-table-column prop="goodsName" label="书籍名称">
                </el-table-column>
                <el-table-column prop="authorName" label="作者">
                </el-table-column>
				<el-table-column label="sku信息" width="310" align="center">
					<template slot-scope="scope">
						<span v-for="item in scope.row.skuInfo">
							现价:{{item.price}},售卖价:{{item.sellPrice}},库存:{{item.inventory}}<br>
						</span>
					</template>
				</el-table-column>
                <el-table-column prop="publishName" label="出版社名称">
                </el-table-column>

                <el-table-column label="上下架" align="center">
					<template slot-scope="scope">
						<el-col>
							<span :class='scope.row.goodsStatus == 0?"down_shop":"up_shop"'>
								{{scope.row.goodsStatus == 0?"下架":"上架"}}
							</span>
						</el-col>
					</template>
				</el-table-column>

              
                <el-table-column label="操作">
                    <template slot-scope="scope">
                       
							<el-button type="text" size="small" style="margin-right:20px;" @click="upDown(scope.row.goodsStatus,scope.row.gid,tableData,scope.$index)">
								{{scope.row.goodsStatus == 0?"上架":"下架"}}
							</el-button>
					
                        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">下架</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container" style="text-align:right;">
            <el-pagination :current-page="page" :page-sizes="[20]" :page-size="pageSize" :total="total" background
             layout="total, sizes, prev, pager, next, jumper"/>
        </div>
    </div>
</template>
<script>
    import {getDdProductList} from '@/api/admin'
    import {updateIsOnline} from '@/api/shops'

    export default {
        data() {
            return {
                tableData: [],
                page:1,
                pageSize:20,
                dialogFormVisible:false,
                formname:'',
                cid:'',
                formLabelWidth:'90px',
                total:0
                // form:{}
            }
        },
        created() {
            this.getList()
        },
        methods: {
            // 获取列表数据
            getList() {
                var data={
                    page:this.page,
                    pageSize:this.pageSize
                }
                getDdProductList(data).then(res=>{
                    if(res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                        this.page=res.data.data.page
                        this.pageSize=res.data.data.pageSize
                    }
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
                        if(gid == 1){
                            list[index].goodsStatus = 1;
                        }else{
                            list[index].goodsStatus = 0;
                        }
                    }else{
                        this.$message.error(res.data.msg || "失败")
                    }
                })
            },
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

    .down_shop{color: #f00;}
	.up_shop{color: green;}
</style>
