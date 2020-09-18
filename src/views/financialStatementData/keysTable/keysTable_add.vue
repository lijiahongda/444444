<template>
    <div class="app-container">
      <el-form :model="form" class="style_auto" ref="form" label-width="140px" :inline="false">
          <el-form-item label="字段ID" prop="goods_name">
						<span>1111</span>
					</el-form-item>
          <el-form-item label="字段名称" prop="goods_name">
            <div style="width: 400px">
						  <el-input v-model="form.name" placeholder="请在20字以内" />
            </div>
					</el-form-item>
          <el-form-item label="字段级别" prop="goods_coupon">
						<el-radio-group v-model="form.time">
							<el-radio :label="0">一级</el-radio>
              <el-radio :label="1">二级</el-radio>
              <el-radio :label="2">三级</el-radio>
						</el-radio-group>
					</el-form-item>
          <el-form-item label="字段格式" prop="goods_coupon">
						<el-radio-group v-model="form.time">
							<el-radio :label="0">金额</el-radio>
              <el-radio :label="1">数量</el-radio>
              <el-radio :label="2">百分比</el-radio>
              <el-radio :label="2">无</el-radio>
						</el-radio-group>
					</el-form-item>
          <el-form-item label="字段类型" prop="startDate">
            <el-radio-group v-model="form.time">
              <el-form-item>
                <el-radio :label="0">录入型</el-radio>
              </el-form-item>
              <el-form-item>
                <el-radio :label="1">计算型</el-radio>
                <el-input v-model="form.name" placeholder="请在20字以内" />
              </el-form-item>
              <el-form-item>
                <el-radio :label="2">系统统计</el-radio>
                <el-input v-model="form.name" placeholder="请在20字以内" />
              </el-form-item>
              <el-form-item>
                <el-radio :label="3">无</el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属报表" prop="goods_coupon">
						<el-radio-group v-model="form.time">
							<el-radio :label="0">分公司、销售与运维</el-radio>
              <el-radio :label="1">精英会员</el-radio>
              <el-radio :label="2">环球悦旅</el-radio>
              <el-radio :label="2">大人</el-radio>
						</el-radio-group>
					</el-form-item>
          <el-form-item label="备注说明" prop="desc">
            <div style="width:300px">
              <el-input type="textarea" v-model="form.time"></el-input>
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
  name: 'keysTable_add',
    data() {
      return {
        form:{},
      }
    },
    created() {
	
    },
    methods: {
       save() {
         this.$router.push({ path:'/financialStatementData/keysTableList' })
       }
    }
}
</script>
<style scoped type="scss">
.common-keysTable-add {
  width: 500px;
  display: flex;
  justify-content: space-between
}
</style>
