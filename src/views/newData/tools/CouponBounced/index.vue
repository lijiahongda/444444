<template>
  <div style="padding:20px">
    <el-form ref="form"
             label-width="120px"
             :inline="true">
      <el-form-item label="">
        <el-input v-model="obj.keyWord" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="">
        <el-col>
          <!-- 1:首页，2：支付成功页 -->
          <el-select v-model="obj.type" clearable>
            <el-option label="爆款" :value="1">爆款</el-option>
            <el-option label="9元店" :value="2">9元店</el-option>
            <el-option label="签到" :value="3">签到</el-option>
            <el-option label="胶囊位进入首页" :value="4">胶囊位进入首页</el-option>
            <el-option label="必买爆款" :value="5">必买爆款</el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="">
        <el-col>
          <!--   会员类型:0普通会员,1体验会员,2精英会员,3黑卡会员', -->
          <el-select v-model="obj.memberType" clearable>
            <el-option label="普通会员" :value="0">普通会员</el-option>
            <el-option label="体验会员" :value="1">体验会员</el-option>
            <el-option label="精英会员" :value="2">精英会员</el-option>
            <el-option label="黑卡会员" :value="3">黑卡会员</el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="">
        <el-col>
          <!--   会员类型:0普通会员,1体验会员,2精英会员,3黑卡会员', -->
          <el-select v-model="obj.isShow" clearable>
            <el-option label="下架" :value="0">下架</el-option>
            <el-option label="上架" :value="1">上架</el-option>
          </el-select>
        </el-col>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>

        <router-link :to="{path:'/tools/addCouponBounced'}">
          <el-button type="primary">添加</el-button>
        </router-link>

      </el-form-item>
    </el-form>
    <el-table :data="tableData.list" border style="width: 100%">
      <el-table-column align="center" label="id" prop="id"></el-table-column>
      <el-table-column align="center" label="名称" prop="name"></el-table-column>
      <el-table-column align="center" label="优惠券ID" prop="couponId"></el-table-column>
      <el-table-column prop="" label="图片" align="center">
					<template slot-scope="scope">
						<img style="height: 80px;width: 80px;" :src="scope.row.image" alt="">
					</template>
				</el-table-column>
      <el-table-column align="center" label="类型" prop="couponTypeName"></el-table-column>
      <el-table-column align="center" label="类型" prop="typeName"></el-table-column>
      <el-table-column align="center" label="用户类型" prop="memberTypeName"></el-table-column>
      <el-table-column align="center" label="状态" prop="showName"></el-table-column>
      <el-table-column align="center" prop="" label="操作" width="220">
        <template slot-scope="scope">
              <!-- <el-button type="primary" @click="handleDetail(scope.row.id)">详情</el-button> -->
              <router-link :to="{path:'/tools/addCouponBounced',query:{id:scope.row.id}}">
							<el-button type="primary">编辑</el-button>
						</router-link>

            <el-button type="text" size="small" style="margin-left:20px;" @click="upIsShow(scope.row.isShow,scope.row.id)">
								{{scope.row.isShow == 0?"上架":"下架"}}
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container"
         style="text-align:right;">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="tableData.pageSize"
                     :current-page="tableData.page"
                     layout="total, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getCouponBounceds,
  getCouponBounced,
  upCouponBouncedIsShow
} from '@/api/shops'
export default {
  data () {
    return {
      tableData: [],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      fy: {
        page: 1, //当前页
        page_size: 10, //每页条数
      },
      handleStatus: '',
      form: {
        images: ''
      },
      total: 0, //总条数
      pageIndex: 1,
      obj: {
        page: this.pageIndex,

      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    addConfig () {
      this.dialogFormVisible = true;
      this.handleStatus = 1;
    },
    onSearch () {
      this.obj.page = 1;
      this.getList(this.obj)
    },
    handleCheck (id, status) {
      this.$prompt('请输入原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (status == 3 && !value) {
          this.$message.warning('请输入驳回原因');
          return false
        }
        checkCommunityInvitationGroup({ id: id, examineStatus: status, examineDesc: value }).then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg)
            this.getList()
          } else {
            this.$message.error(res.data.msg || '数据加载失败,请检查网络')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    //上下架
    upIsShow(status,id){
        if(status == 0){
            var isShow = 1;
        }else{
            var isShow = 0;
        }
        var updIsShow ={
            id:id,
            isShow:isShow
        }
        upCouponBouncedIsShow(updIsShow).then(res=>{
            if(res.data.code==200){
                this.$message.success(res.data.msg || "成功")
                this.getList();
            }else{
                this.$message.error(res.data.msg || "失败")
            }
        })
    },
    getList () {
      getCouponBounceds(this.obj).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message || '数据加载失败,请检查网络')
          return
        }

      })
    },
    handleCurrentChange (val) {
      this.obj.page = val;
      this.getList()
    },
  }
}

</script>
<style scoped="scoped" lang="scss">
.el-table {
  margin-top: 20px;
}
</style>
