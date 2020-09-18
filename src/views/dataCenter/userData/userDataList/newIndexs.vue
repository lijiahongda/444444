<!--suppress ALL -->
<template>
    <div class="app-container">
        <el-form ref="form" label-width="120px" :inline="true">
        <el-form-item>
              <el-date-picker
                  v-model="searchCondition.startTime"
                  type = "date"
                  value-format="yyyy-MM-dd"
                  placeholder = "开始日期时间"
                  style = "width: 150px;" />
              <el-date-picker
                  v-model="searchCondition.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束日期时间"
                  style="width: 150px;"/>
          </el-form-item>
			<el-form-item>
				<el-select v-model="searchCondition.status" placeholder="请选择提现状态">
					<el-option label="待确定" value="1"></el-option>
					<el-option label="提现中" value="2"></el-option>
					<el-option label="提现成功" value="3"></el-option>
					<el-option label="提现失败" value="4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-input type="text" v-model="searchCondition.mobile" placeholder="输入手机号" style="width:300px"></el-input>
			</el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" size="small"  @click="handleDownload">导出</el-button>

                <router-link :to="{path:'/user-data-list/user-data-withdrawal-new-success'}" target="_blank">
                    <el-button type="primary" size="small">导入成功</el-button>
                </router-link>


                <router-link :to="{path:'/user-data-list/user-data-withdrawal-new-error'}" target="_blank">
                    <el-button type="primary" size="small">导入失败</el-button>
                </router-link>

               <!-- <div class="pan-btn ">
                    <el-button type="success" @click="() => { switchChart = !switchChart}">{{ !switchChart ? '查看图表' : '关闭图表' }}</el-button>
                </div> -->
            </el-form-item>
        </el-form>
      <el-table v-if="!switchChart" :data="list" border :fit="true" style="width: 100%" v-loading="loading">

        <el-table-column prop="mid" label="用户ID" align="center" fixed></el-table-column>

        <el-table-column prop="mobile" label="手机号" width='108'  align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" width='108'  align="center"></el-table-column>
        <el-table-column prop="stockNumber" label="库存" width='108'  align="center"></el-table-column>
        <el-table-column prop="uname" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="cardId" label="身份证号"  width='165'  align="center"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"  width='170' align="center"></el-table-column>

        <el-table-column prop="money" label="总金额" align="center"></el-table-column>
        <el-table-column prop="balance" label="账户余额" align="center"></el-table-column>
        <el-table-column prop="cash" width='100' label="已到账金额" align="center"></el-table-column>
        <el-table-column prop="mcCash" width='120' label="本次提现金额" align="center"></el-table-column>
        <el-table-column prop="mcCashMakeMoney" width='100' label="本次应打款" align="center"></el-table-column>
        <!-- <el-table-column prop="mcCashService" label="本次提现手续费" align="center"></el-table-column> -->
        <el-table-column prop="bonusMount" width='120' label="累计佣金明细" align="center"></el-table-column>
         <el-table-column prop="cardType" label="是否会员" align="center"></el-table-column>
        <el-table-column prop="mcStatus" label="打款状态" align="center"></el-table-column>
        <el-table-column  prop="createTime" label="提现申请日期" width='160' align="center"></el-table-column>
				<el-table-column label="操作"  width="180px" align="center">
					<template slot-scope="scope" align="center">
						<span v-if="scope.row.status == 2">
							<el-button type="text" size="small"  @click="passCash(scope.row.id)">
								通过
							</el-button>

                            <el-button type="text" size="small" @click="noPassCash(scope.row.id)">
								驳回
							</el-button>
						</span>
						<span v-if="scope.row.status == 3">
							<el-button type="text" size="small" @click="upStatusToWithdrawal(scope.row.id)">
								还原为提现中
							</el-button>
						</span>


					</template>
				</el-table-column>


      </el-table>
      <div class="pagination-container" v-if="!switchChart" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[50]"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
        />
      </div>
        <charts v-if="switchChart"/>
    </div>
</template>
<script>
import charts from '../../commonCharts' // 图表
import { newCashList,downNewCashList,passCash,noPassCash,upStatusToWithdrawal } from '@/api/dataCenter' // 接口

export default {
    components: {
        charts
    },
    data() {
        return {
            searchCondition: {
                // "startDate": '',
                "mobile": '',
                "page":1
            },
            total: 0,
            downloadLoading: false,
            switchChart: false,
			list: [],
			loading: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 列表数据
        getList() {
			this.loading = true
          newCashList(this.searchCondition).then(res => {
            if (res.data.code === 200){
			  this.loading = false
              this.list = res.data.data.list
              this.total = res.data.data.count
            }
          })
        },
        onSubmit() {
          this.searchCondition.page = 1
          this.getList()
        },

           // 导出
    handleDownload()
    {
        this.loading = true;
        downNewCashList(this.searchCondition).then(res => {
        if (res.data.code === 200) {
            this.loading = false;
            const downData = res.data.data;
            // _this.list = res.data.data.list;
            // console.log(this.downData,'999999');

            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['提现ID','用户ID','手机号','角色','库存','用户名称','身份证号', '银行卡号','总金额','账户余额','已到账金额', '本次提现金额','本次应打款','累计佣金明细','是否会员','打款状态','提现申请日期']

            const filterVal = [
                'id',
                'mid',
                'mobile',
                'roleName',
                'stockNumber',
                'uname',
                'cardId',
                'bankCard',
                'money',
                'balance',
                'cash',
                'mcCash',
                'mcCashMakeMoney',
                'bonusMount',
                'cardType',
                'mcStatus',
                'createTime'
            ];

            const data = this.formatJson(filterVal, downData)
            excel.export_json_to_excel({
                  header: tHeader,
                  data,
                  filename: '提现数据',
                  autoWidth: this.autoWidth,
                  bookType: this.bookType
                })
                this.downloadLoading = false
            })
            }else{
                this.$message({message: res.data.msg,type: "error"});
                this.loading = false;
            }
        });
    },

        // 导出
        // handleDownload() {
        //   this.downloadLoading = true
        //   import('@/vendor/Export2Excel').then(excel => {
        //     const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        //     const filterVal = [
        //     'id',
        //     'title',
        //     'author',
        //     'pageviews',
        //     'display_time'
        //     ]
        //     const list = this.list
        //     const data = this.formatJson(filterVal, list)
        //     excel.export_json_to_excel({
        //     header: tHeader,
        //     data,
        //     filename: this.filename,
        //     autoWidth: this.autoWidth,
        //     bookType: this.bookType
        //     })
        //     this.downloadLoading = false
        //   })
        // },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                })
            )
        },
      upStatusToWithdrawal(id){
        this.$confirm('确定要还原为提现中吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            id:id
          }
          upStatusToWithdrawal(obj).then(res => {
            if (res.data.code == 200)
            {
              this.getList()
            }else{
              this.$message({message: res.data.msg,type: "error"});
			}
          })
        }).catch(() => {
        });
	  },
        // 查看详情
        handleClick(orderNo) {
          // this.$router.push({ path: '/hotel-detail', query: { orderNo: orderNo }})
        },
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },

        // 通过
        passCash(id){
            this.$confirm('确定要通过吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var obj = {
                    id:id
                }
                passCash(obj).then(res => {
                    if (res.data.code == 200)
                    {
                        this.getList()
                    }else{
                      this.$message({message: res.data.msg,type: "error"});
                    }
                })
            }).catch(() => {
            });
        },

        //不通过
        noPassCash(id){
            this.$confirm('确定要驳回吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var obj = {
                    id:id
                }
                noPassCash(obj).then(res => {
                    if (res.data.code == 200) {
                        this.getList()
                    }
                })
            }).catch(() => {
            });
        },



    }
}
</script>
<style type="scss">
</style>
