<template>
    <div class="app-container">
      <el-form :model="form" class="style_auto" ref="form" label-width="140px" :inline="false">
          <el-form-item label="数据表ID" prop="goods_name">
						<span>1111</span>
					</el-form-item>
          <el-form-item label="数据表名称" prop="goods_name">
            <div style="width: 400px">
						  <el-input v-model="form.name" placeholder="请在20字以内" />
            </div>
					</el-form-item>
          <el-form-item label="是否可用优惠券" prop="goods_coupon">
						<el-radio-group v-model="form.time">
							<el-radio :label="0">按日</el-radio>
              <el-radio :label="1">按周</el-radio>
              <el-radio :label="2">按月</el-radio>
              <el-radio :label="3">按季度</el-radio>
              <el-radio :label="4">按年</el-radio>
						</el-radio-group>
					</el-form-item>
          <el-form-item label="统计开始结束时间" prop="startDate">
            <div>
              <el-date-picker
                v-model="form.data"
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="save" type="primary">保存</el-button>
          </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  name: 'createTable_add',
    data() {
      return {
        form:{},
      }
    },
    created() {
	
    },
    methods: {
       save() {
         this.$router.push({ path:'/financialStatementData/createTableList' })
       }
    }
}
</script>
<style type="scss">
</style>
