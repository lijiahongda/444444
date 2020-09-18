<!--suppress ALL -->
<template>
	<div class="app-container">

         <!--编辑-->
         <el-dialog :visible.sync="dialogFormVisible" style="text-align:center;">
          <el-form :model="upCheck" class="style_auto" label-width="140px" :inline="true">
              <el-form-item label="备注">
                <el-input v-model="upCheck.reason" placeholder="理由" style="width: 450px;marginTop:-2px;" />
              </el-form-item>
              <el-button type="primary" style="text-align:right;" @click="onConfirms">确 定</el-button>
          </el-form>
        </el-dialog>
        <!--编辑-->


		<el-form ref="form" label-width="120px" :inline="true">
			<el-form-item >
				<el-date-picker
					v-model="searchCondition.startTime"
					type = "date"
					value-format="yyyy-MM-dd"
					placeholder = "下单日期时间"
					style = "width: 150px;" />
				<el-date-picker
					v-model="searchCondition.endTime"
					type="date"
					value-format="yyyy-MM-dd"
					placeholder="下单日期时间"
					style="width: 150px;"/>
			</el-form-item>

            <el-form-item >
				 <el-select v-model="searchCondition.status" @change="submit" placeholder="请选择" clearable>
						<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
				</el-select>
			</el-form-item>

		


			<el-form-item>
				<el-button type="primary" @click="onSubmit">点我可以搜索</el-button>
				<el-button type="danger" @click="onEmpty">点我清空条件</el-button>
			</el-form-item>
		</el-form>
		<!--搜索部分-->
		<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
		
			<el-table-column prop="" label="姓名" width="200" align="center">
				<template slot-scope="scope">
					{{scope.row.name ? scope.row.name : '-' }}
				</template>
			</el-table-column>
			<el-table-column prop="" label="手机号" width="140" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.phone ? scope.row.phone : '-'}}</span>
				</template>
			</el-table-column>
		
			<el-table-column prop="" label="身份证号" width="160" align="center">
				<template slot-scope="scope">
					{{scope.row.idCard ? scope.row.idCard : '-' }}
				</template>
			</el-table-column>
			
			<el-table-column prop="" label="选中城市" width="140" align="center">
				<template slot-scope="scope">
					{{scope.row.selectCity ? scope.row.selectCity : '-' }}
				</template>
			</el-table-column>

            <el-table-column prop="" label="选中负责人" width="140" align="center">
				<template slot-scope="scope">
					{{scope.row.selectPeople ? scope.row.selectPeople : '-' }}
				</template>
			</el-table-column>

			<el-table-column prop="" label="申请时间" align="center" width="160">
				<template slot-scope="scope">
					{{scope.row.createTime ? scope.row.createTime : '-' }}
				</template>
			</el-table-column>
			
			<el-table-column prop="" label="审核状态" align="center">
				<template slot-scope="scope">
					{{scope.row.status ? scope.row.statusSt : '-' }}
				</template>
			</el-table-column>

            <el-table-column prop="" label="理由" align="center" width="160">
				<template slot-scope="scope">
					{{scope.row.reason ? scope.row.reason : '-' }}
				</template>
			</el-table-column>

			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template slot-scope="scope" align="center">

                    <span v-if="scope.row.status == 1">
                        <el-button type="text" size="small"  @click="isCheck(scope.row.id,2)">
                            通过
                        </el-button>
                        <el-button type="text" size="small" @click="isCheck(scope.row.id,3)">
                            驳回
                        </el-button>
                    </span>
					<!-- <el-button type="text" size="small" v-if="scope.row.refundStatus === 31" @click="handleApprove(scope.row)">审核</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:page-sizes="[20]"
				:page-size="searchCondition.limit"
				:total="total"
				background
				layout="total, sizes, prev, pager, next, jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
		
	</div>
</template>
<script>
  import { getPartTimeJobs,checkPartTimeJob} from '@/api/admin' // 接口
  
  export default {
    data() {
      return {
       
        dialogFormVisible: false,
        formLabelWidth: '140px',
		form: {},
        searchCondition: {
          page: 1
        },
        total: null,
        downloadLoading: false,
        tableData: [
          {date: "2018-10-01"}
        ],
        switchChart: false,
        list: [],

        upCheck:{},
	
		options2: [{
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '已审核'
        },
        {
          value: '3',
          label: '审核失败'
        }
        ],
		
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 列表数据
      getList() {
        getPartTimeJobs(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data.list
            this.total = res.data.data.total
            this.orderCount = res.data.data.countList
          }
        })
      },

    isCheck(id,states)
     {
        this.dialogFormVisible = true;
        this.upCheck.id=id;

        if(states==2)
        {
             this.upCheck.checkType=1;
        }else if(states==3){
            this.upCheck.checkType=2;
        }
        this.upCheck.status=states;
    },

     onConfirms() {
      checkPartTimeJob(this.upCheck).then(res => {
        if (res.data.code === 200) {
          this.$message({ message: res.data.msg, type: "success" });
          this.getList();
        }
      });
      this.dialogFormVisible = false;
      this.upCheck={};
    },


    
      onSubmit() {
        this.searchCondition.page = 1
        this.getList()
      },
      onEmpty() {
        this.searchCondition = {
          page:1,
        }
      },
      // 搜索
      handleFilter() {
        this.searchCondition.page = 1
      },
    
      // 分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getList()
      }
    }
  }
</script>
<style type="scss" scoped="scoped">
	.goodsName{
		display: block;
	}
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
