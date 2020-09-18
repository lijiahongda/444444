<!--suppress ALL -->
<template>
	<div class="app-container">

         <el-dialog title="" :visible.sync="dialogForm" @close="closeBox">
			<el-form :model="form" ref="form">
				<el-form-item label="备注" :label-width="formLabelWidth"  prop="remark">
                    <el-input v-model="form.serviceTypeName" placeholder="请在20字以内" style="width: 450px;" />

					<!-- <el-input type='textarea' v-model="form.remark" autocomplete="off" placeholder="请输入备注"></el-input> -->
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogForm = false">取 消</el-button>
				<el-button type="primary" @click="add()">确 定</el-button>
			</div>
		</el-dialog>

        <el-form :model="searchCondition" ref="searchCondition" :inline="true">
			
			
			<el-form-item>
				<el-col>
				<!-- <el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="onEmpty('formSearch')">清空</el-button> -->
				<el-button type="primary" @click="onAdd">新增</el-button>
				</el-col>
			</el-form-item>
			
		</el-form>
		
		<!--搜索部分-->
		<el-table v-if="!switchChart" :data="list" :fit="true" border style="width: 100%">
			<el-table-column fixed prop="product" label="id" width="180" align="center">
				<template slot-scope="scope">
					{{scope.row.id ? scope.row.id : '-' }}
				</template>
			</el-table-column>
            
			<el-table-column prop="" label="服务类型名称"  align="center">
				<template slot-scope="scope">
					{{scope.row.serviceTypeName ? scope.row.serviceTypeName : '-' }}
				</template>
			</el-table-column>
		
			<el-table-column fixed="right" label="操作"  align="center">
				<template slot-scope="scope" align="center">
                    
  					<!-- <router-link target="_blank" :to="{path:'refundOrder-detail',query:{ordersnSon:scope.row.ordersnSon}}">
                        <el-button type="text" size="small">查看详情</el-button>
                    </router-link> -->


					<el-button type="text" size="small" @click="up(scope.row.id)">编辑</el-button>
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
  import { getRefundServiceTypes,addRefundServiceType,upRefundServiceType,getRefundServiceType} from '@/api/admin' // 接口
  // 订单状态
  // 支付状态


  export default {
    data() {
      return {
        dialogForm: false,
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
		orderCount:{},
		options2: [{
          value: '31',
          label: '待审核'
        }, {
          value: '35',
          label: '审核通过'
        }],
		
      }
    },
    mounted() {
      this.getList();
    //   this.getTabChannels();
    },
    methods: {
      // 列表数据
      getList() {
        getRefundServiceTypes(this.searchCondition).then(res => {
          if (res.data.code === 200){
            this.list = res.data.data.list
            this.total = res.data.data.total
            this.orderCount = res.data.data.countList
          }
        })
      },

      

      onAdd() {
        this.dialogForm=true;
      },

      closeBox() {
        this.form.id='';
        this.form.serviceTypeName='';
      },

      add() {
        if(this.form.id!='')
        {
            var data={};
            data.id = this.form.id;
            data.serviceTypeName =this.form.serviceTypeName;
            upRefundServiceType(data).then(res => {
                if (res.data.code === 200){
                    this.$message.success('操作成功');
                    this.dialogForm = false;
                    this.getList();
                }
            })
        }else{
            addRefundServiceType(this.form).then(res => {
                if (res.data.code === 200){
                    this.$message.success('操作成功');
                    this.dialogForm = false;
                    this.getList();
                }
            })
        }
       
      },

      up(id)
      {
        this.dialogForm=true;
        this.form.id=id;

        var data ={};
        data.id = id;

        getRefundServiceType(data).then(res => {
                if (res.data.code === 200){
                   this.form = res.data.data;
                }
            })

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
s