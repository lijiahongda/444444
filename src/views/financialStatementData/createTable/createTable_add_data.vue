<template>
    <div class="app-container">
      <el-form class="style_auto" ref="form" label-width="140px" :inline="false">
          <el-form-item label="数据表ID">
						<span>1111</span>
					</el-form-item>
          <el-form-item label="数据表名称">
            <span>1111</span>
					</el-form-item>
          <el-form-item label="统计开始结束时间">
            <div>
              <el-date-picker
                v-model="form.data"
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <span>指定日历的显示范围。开始时间必须是周一，结束时间必须是周日，且时间跨度不能超过两个月。</span>
            </div>
          </el-form-item>
      </el-form>
     <el-calendar v-model="value" :range="form.data">
       <template
          slot="dateCell"
          slot-scope="{date, data}">
          <div class="calendar">
            <span class="calendar-span" v-text="data.day.split('-').slice(1).join('-')"></span>
            <span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </span>
          </div>
        </template>
     </el-calendar>
       <el-button @click="save" type="primary">保存</el-button>
    </div>
</template>
<script>
export default {
  name: 'createTable_add_data',
    data() {
      return {
        value:'',
        input:'',
        form: {
          data:['2019-03-04', '2019-03-24'],
        },
      }
    },
    created() {
		
    },
    methods: {
      save() {
        console.log(this.value)
      }
    }
}
</script>
<style scope lang="scss">
.calendar {
  display: flex;
  justify-content: space-between;
  .calendar-span {
    display: inline-block;
    width: 50px;;
  }
}
</style>
