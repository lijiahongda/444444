<!--suppress ALL -->
<template>
	<div class="app-container" v-loading="loading">
    <div>
      <el-form ref="form" label-width="120px" :inline="true">
        <el-form-item >
            <el-select v-model="value" clearable placeholder="请选择渠道">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item >

        <el-form-item >
          <el-date-picker
              v-model="selectedValue"
              type = "datetime"
              placeholder = "开始日期时间"
              style = "width: 200px;" />
          <el-date-picker
              v-model="selectedValue1"
              type="datetime"
              placeholder="结束日期时间"
              style="width: 200px;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <!-- <el-button @click="dialogFormVisible = true">新增活动</el-button> -->
        </el-form-item>
        <el-form-item>
          <div class="btn_text">
            <el-button type="danger" @click="onDanger" plain>清空</el-button>
            <el-button type="primary"  @click="onSearch(0)" plain>今天</el-button>
            <el-button type="primary"  @click="onSearch(1)" plain>昨天</el-button>
            <el-button type="primary"  @click="onSearch(6)" plain>最近7天</el-button>
            <el-button type="primary" @click="onSearch(29)" plain>最近30天</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!--搜索部分-->
      <el-table  :data="list" :fit="true" border style="width: 100%">
        <el-table-column  prop="orderGmv" label="GMV"  width="100" align="center"></el-table-column>
        <el-table-column  prop="zOrderNum" label="直接订单"  align="center"></el-table-column>
        <el-table-column  prop="jOrderNum" label="间接订单"   align="center"></el-table-column>
        <el-table-column  prop="noPayOrderNum" label="未支付订单"   align="center"></el-table-column>
        <el-table-column  prop="yuPromotionAmount" label="预估分佣"  align="center"></el-table-column>
        <el-table-column  prop="yiPromotionAmount" label="已分用"  align="center"></el-table-column>
      </el-table> 
    </div>

    <!-- 活动管理--隐藏 -->
    <!-- <div class="cpsAct">
      <el-form ref="actSearchForm" label-width="120px" :inline="true">
        <el-form-item label="活动名称：">
          <el-col>
            <el-input v-model="obj.keyword" placeholder="请输入活动名称" style="width:300px;" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <router-link to="/operate/activityAdd">
            <el-button type="primary" @click="onSearch">添加活动</el-button>
          </router-link>
          <router-link to="/operate/activity-tags">
            <el-button >活动标签管理</el-button>
          </router-link>

        </el-form-item>
      </el-form> -->
      <!--搜索部分-->
      <!--<div class="new_tab">
        <el-table v-if="!switchChart" :data="actForm" :fit="true" v-loading="loading"  border style="width: 100%;">
          <el-table-column fixed prop="id" label="活动ID" align="center">
          </el-table-column>
          <el-table-column fixed prop="activity_name" label="活动名称" align="center">
          </el-table-column>
          <el-table-column prop="share_title" label="分享标题" align="center">
          </el-table-column>
          <el-table-column prop="app_num" label="APP订单数" align="center">
          </el-table-column>
          <el-table-column prop="small_app_num" label="小程序订单数" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope" align="center">
                <el-button type="text" size="small" @click="onEdit(scope.row.id)">编辑</el-button>

                <el-button type="text" size="small" @click="onDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container" style="text-align:right;">
        <el-pagination :current-page="obj.page" :page-sizes="[10]" :page-size="pageSize" :total="pageTotal" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"  @current-change="handleCurrentChange" />
      </div>
	  </div> -->

		<!-- <div class="pagination-container" style="text-align:right;">
			<el-pagination
				:current-page="searchCondition.page"
				:total="total"
				background
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
			/>
		</div> -->
	</div>
  

  <!-- <div class="app-container" v-loading="loading">
    <el-table  :data="list" :fit="true" border style="width: 100%">
			<el-table-column  prop="orderGmv" label="GMV"  width="100" align="center"></el-table-column>
			<el-table-column  prop="zOrderNum" label="直接订单"  align="center"></el-table-column>
			<el-table-column  prop="jOrderNum" label="间接订单"   align="center"></el-table-column>
			<el-table-column  prop="noPayOrderNum" label="未支付订单"   align="center"></el-table-column>
			<el-table-column  prop="yuPromotionAmount" label="预估分佣"  align="center"></el-table-column>
			<el-table-column  prop="yiPromotionAmount" label="已分用"  align="center"></el-table-column>
		</el-table>
  </div> -->
</template>
<script>
  import { getCpsOrderSum,getActivities,deleteActivities} from '@/api/shops' // 接口
  export default {
    data() {
      return {
        loading: false,
        dialogFormVisible:false,
        innerVisible: false,
        formLabelWidth: '140px',
        form: {},
        searchCondition: {
          page: 1
        },
        activitiesopts: {
          page: 1,
        },
        types: [{
          value: '0',
          label: '拼多多'
        }, {
          value: '1',
          label: '京东'
        }, {
          value: '2',
          label: '唯品会'
        }, {
          value: '3',
          label: '苏宁'
        }, {
          value: '4',
          label: '饿了么果蔬'
        }, {
          value: '5',
          label: '美团'
        }, {
          value: '6',
          label: '亚马逊'
        }, {
          value: '7',
          label: '淘宝'
        },{
            value: '8,9',
            label: '海威淘券'
        },{
            value: '10',
            label: '大人订单'
        },{
            value: '11',
            label: '叮当快药'
        },{
            value: '12',
            label: '饿了么外卖'
        },{
            value: '13',
            label: '信用卡'
        },{
            value: '14',
            label: '贷超'
        },{
            value: '15',
            label: '曹操出行H5'
        }],
        value: '',
		    activities:[],
		    acts:[],
        total: null,
        list: [],
        dateVal: '', // 默认是当前日期
        selectedValue: '',
        dateVal1: '', // 默认是当前日期
        selectedValue1: '',
        pageTotal:0,   //显示页数
			  pageIndex:1,
        pageSize:10,
        actForm:[],
        actSearchForm:[],
        obj:{
          page:this.pageIndex,
          act_channel:'2',
          keyword:'',
        }
      }
    },
    //0:拼多多 1:京东 2:唯品会 3:苏宁 4:饿了么果蔬 5:美团 6:亚马逊 7:淘宝 8 9:海威淘券 10:大人订单 11:叮当快药 12:饿了么外卖 13:信用卡 14:贷超 15:曹操出行H5
    created() {
		  this.getCpsOrderSum();
      this.getList();
    },

    methods: {
      // 列表数据
      getCpsOrderSum(e,idx) {
        if(idx ==1){
          this.form = e;
          this.form.channel_id = this.value;
        }else{
          this.form.startTime = this.selectedValue;
          this.form.endTime = this.selectedValue1;
          this.form.channel_id = this.value;
        }
        this.loading = true
        getCpsOrderSum(this.form).then(res => {
          if (res.data.code === 200){
            this.list = [];
            this.list.push(res.data.data)
           // this.total = res.data.data.total
            this.loading = false
          }else{
            this.$message.error(res.data.msg);
            this.loading = false
          }
        })
      },
      choose(row){
        this.acts.push({value:row.id,label:row.activity_name});
        this.$set(this.form,'activityId',row.id)
        this.innerVisible = false
      },
      onLine(id,is_online){
        this.loading = true;
        let params= {
          id: id,
          is_online: is_online == 1 ? 0 : 1
        }
        updateLiveEventsIsOnline(params).then(res => {
          if (res.data.code === 200){
            this.getCpsOrderSum();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      closed(){
        this.form = {}
      },
      upLotteryDraw(row){
        this.dialogFormVisible = true;
        this.form = row;
      },
      addRecommendActivityInfo(){
        this.loading = true;
        let params= {
          ...this.form
        }
        let url = this.form.id ? upRecommendActivityInfo : addRecommendActivityInfo
        url(params).then(res => {
          if (res.data.code === 200){
            this.getCpsOrderSum();
          }else{
            this.$message.error(res.data.msg);
          }
        })
        this.dialogFormVisible = false
      },
      handleDelete(id){
        this.loading = true;
        let params= {
          id: id
        }
        delLotteryDrawProduct(params).then(res => {
          if (res.data.code === 200){
            this.getCpsOrderSum();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      onSubmit() {
        this.getCpsOrderSum()
      },
      onSubmitA() {
        this.activitiesopts.page = 1
        this.getActivities()
      },
      // 分页
      handleCurrentChange(val) {
        this.searchCondition.page = val
        this.getCpsOrderSum()
      },
      handleCurrentChange1(val) {
        this.activitiesopts.page = val
        this.getActivities()
      },
      dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.selectedValue = this.formatDateMin(this.dateVal)
        },
      dateConfirm1 () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
          this.selectedValue1 = this.formatDateMin(this.dateVal1)
      },

      // 時間轉換我
      formatDateMin (secs,time) {
        var t = new Date(secs)
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        if (month < 10) { month = '0' + month }
        var date = t.getDate()
        if (date < 10) { date = '0' + date }
        var hour = t.getHours()
        if (hour < 10) { hour = '0' + hour }
        var minute = t.getMinutes()
        if (minute < 10) { minute = '0' + minute }
        var second = t.getSeconds()
        if (second < 10) { second = '0' + second }
        if(time){
          return year + '-' + month + '-' + date;
        }else{
          return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        }
      },
      // 字符串转date
      parserDate(date) {  
        var t = Date.parse(date);  
        if (!isNaN(t)) {  
          return new Date(Date.parse(date.replace(/-/g, "/")));  
        } else {  
          return new Date();  
        }  
      },
      selectData () { // 打开时间选择器
              // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
        
              if (this.selectedValue) {
                  this.dateVal = this.parserDate(this.selectedValue)
              } else {
                  this.dateVal = new Date()
              }
              this.$refs['datePicker'].open()
          },
      selectData1 () { // 打开时间选择器
          // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
          if (this.selectedValue1) {
              this.dateVal1 = this.parserDate(this.selectedValue1)
          } else {
              this.dateVal1 = new Date()
          }
          this.$refs['datePicker1'].open()
      },
      onSearch(e){
        this.loading =true;
        // console.log(this.formatDateMin(new Date()),'111')
        var obj = this.timeForMat(e);
        if(e == 0){
          this.selectedValue = this.form.startTime = obj.t2 +' 00:00:00';
          this.selectedValue1 = this.form.endTime = this.formatDateMin(new Date());
        }else if(e == 1){
          this.selectedValue1 =  this.form.endTime =this.formatDateMin(new Date(),true)+' 00:00:00';
          this.selectedValue = this.form.startTime = obj.t2 +' 00:00:00';
        }else if(e == 6 || e == 29){
          this.selectedValue1 = this.form.endTime = this.formatDateMin(new Date());
            this.selectedValue = this.form.startTime = obj.t2 +' 00:00:00';
        }else{
          this.getCpsOrderSum(this.form)
          return false;
        }
        this.getCpsOrderSum(this.form,1)
      },
      onDanger(){
        this.loading =true;
        this.selectedValue = '';
        this.selectedValue1 = '';
        this.form ={
          endTime:'',
          startTime:''
        }
        this.getCpsOrderSum(this.form,1)
      },
      timeForMat(count) {
        // 拼接时间
        let time1 = new Date()
        time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
        let Y1 = time1.getFullYear()
        let M1 = ((time1.getMonth() + 1) >= 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
        let D1 = (time1.getDate() >= 10 ? time1.getDate() : '0' + time1.getDate())
        let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
        let time2 = new Date()
        time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
        let Y2 = time2.getFullYear()
        let M2 = ((time2.getMonth() + 1) >= 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
        let D2 = (time2.getDate() >= 10 ? time2.getDate() : '0' + time2.getDate())
        let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
        return {
          t1: timer1,
          t2: timer2
        }
      },
      onEdit(id){
        this.$router.push('/operate/activityAdd?id='+id)
      },
          // 列表数据
      getList() {
        this.loading=true;
        getActivities(this.obj).then(res=>{
          if(res.data.code==200){
            this.loading=false;
            let dataList = res.data.data;
            this.actForm = dataList
            this.total = res.data.count;
            this.pageTotal = res.data.count
          }
        })
      },
      //保存
      onActSearch(type,row){//type=1添加 type=2编辑
        this.obj.page = 1;
        this.getList()
      },
      // 删除
      onDel(row){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteActivities({id:`${row.id}`}).then(res=>{
            if(res.data.code==200){
                this.$message({
                  message:"删除成功",
                  type:"success"
                })
                this.getList()
            }
          })
        }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
          });
        });
      },
          // 分页
      handleSizeChange(val) {
        this.obj.page= 1;
        this.getList()
      },
      handleCurrentChange(val) {
          this.obj.page = val
          this.getList()
      }
    }
  }
</script>
<style type="scss" scoped="scoped">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar-uploader-icon{
		border: 1px solid #ccc;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
		border: 1px dashed #d9d9d9;
	}
  .cpsAct {
    padding-top: 110px;
  }
</style>
