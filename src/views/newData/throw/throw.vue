<template>
    <div class="app-container">
        <el-dialog title="添加备注" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="活动名称">
                    <el-input
                        width="200"   
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-radio v-model="status" label="1">有效</el-radio>
                    <el-radio v-model="status" label="0">无效</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRemarkSure">确 定</el-button>
            </div>
        </el-dialog>
      <el-form style="margin-bottom:20px;" ref="form" :inline="true" class="demo-form-inline">
        <el-form-item>
          <!-- format="yyyy 年 MM 月 dd 日" -->
            <el-date-picker
                @change="descriptionBtn"
                v-model="timeArray"
                type="datetimerange"
                range-separator="-"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="统计开始日期"
                end-placeholder="统计结束日期">
            </el-date-picker>
        </el-form-item>
				<el-form-item>
					<div class="btn_text">
						<el-button type="primary"  @click="onSearch(0)" plain>今天</el-button>
						<el-button type="primary"  @click="onSearch(1)" plain>昨天</el-button>
						<el-button type="primary"  @click="onSearch(6)" plain>最近7天</el-button>
						<el-button type="primary" @click="onSearch(29)" plain>最近30天</el-button>
					</div>
				</el-form-item>
				<el-row :gutter="20" class="order_list">
					<el-col class="sku_num">统计时间：<span v-text="timeNow"></span></el-col>
				</el-row>
				<el-row :gutter="20" class="order_list">
					<el-col class="sku_num">销售线索：<span v-text="countList.total"></span></el-col>
					<el-col class="sku_num">有效线索：<span v-text="countList.countList.effectiveCount"></span></el-col>
					<el-col class="sku_num">无效线索：<span v-text="countList.countList.invalidCount"></span></el-col>
				</el-row>
      </el-form>
      <el-table v-loading="loading" v-if="!switchChart" :data="list" border stripe :fit="true" style="width: 100%">
            <el-table-column width="100" prop="id" label="序号" align="center"></el-table-column>
            <el-table-column width="200" prop="userName" label="姓名" sortable align="center"></el-table-column>
            <el-table-column prop="userMobile" label="手机号" sortable align="center"></el-table-column>
            <el-table-column prop="userCity" label="城市" sortable align="center"></el-table-column>
            <el-table-column prop="createTime" label="时间" sortable align="center"></el-table-column>
            <el-table-column prop="status" label="是否有效" sortable align="center"></el-table-column>
            <el-table-column prop="remark" label="备注信息" sortable align="center"></el-table-column>
            <el-table-column width="250" fixed="right" prop="refundTotal" label="操作" align="center">
                <template slot-scope="scope">
                <el-button size="mini" @click="addRemarkBtn(scope.row)">添加备注</el-button>
                </template>
            </el-table-column>
        </el-table>
      <div v-if="!loading" class="pagination-container" style="text-align:right;">
        <el-pagination
          :current-page="searchCondition.page"
          :page-sizes="[10,20,30,40]"
          :page-size="searchCondition.pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
       </div>
    </div>
</template>
<script>
import { addRemark, getThrowList} from '@/api/throw' // 接口

export default {
    name: 'textList',
    data() {
      return {
        searchCondition: {
          page:1,
          pageSize: 20
        },
        total: null,
        loading: false,
        switchChart: false,
        list: [],
        timeArray: [],    
        dialogFormVisible:false,
        remark:'',
        status:'',
        uid:'',
        countList:{
          countList: {
            effectiveCount:'',
            invalidCount:'',
          }
        },
        timeNow:'',
      }
    },
    created() {
		    this.searchCondition.page = 1
        this.searchCondition.pageSize = 20
		    this.getList()
    },
    methods: {
			// 搜索
			onSearch(e){
				this.loading =true;
				// console.log(this.formatDateMin(new Date()),'111')
				var obj = this.timeForMat(e);
				if(e == 0){
					this.startTime = obj.t2 +' 00:00:00';
					this.endTime = this.formatDateMin(new Date());
				}else if(e == 1){
					this.endTime =this.formatDateMin(new Date(),true)+' 00:00:00';
					this.startTime = obj.t2 +' 00:00:00';
				}else if(e == 6 || e == 29){
					this.endTime = this.formatDateMin(new Date());
				    this.startTime = obj.t2 +' 00:00:00';
				}
				this.timeArray = [this.startTime,this.endTime]
				this.getList()
			},
			//作 
			timeForMat(count) {
					// 拼接时间
					let time1 = new Date()
					time1.setTime(time1.getTime()+ (24 * 60 * 60 * 1000))
					let Y1 = time1.getFullYear()
					let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
					let D1 = (time1.getDate() > 10 ? (time1.getDate()+1) : '0' + time1.getDate())
					console.log(D1)
					let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
					let time2 = new Date()
					time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
					let Y2 = time2.getFullYear()
					let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
					let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
					let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
					return {
						t1: timer1,
						t2: timer2
					}
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
        descriptionBtn() {
          this.searchCondition.page = 1
          this.searchCondition.pageSize = 20
          this.getList()
        },
        // 列表数据
        getList() {
          var _this = this;
          _this.loading = true
					if(_this.timeArray != null && _this.timeArray.length > 0){ 
						this.startTime = this.timeArray[0];
						this.endTime = this.timeArray[1]; 
					  this.timeNow = this.startTime + '-------' + this.endTime
					}else{
						this.startTime = '';
						this.endTime = ''; 
					  this.timeNow = new Date().toLocaleString();
					}
          let data = {
            page: _this.searchCondition.page,
            pageSize: _this.searchCondition.pageSize,
						startTime:this.startTime,
						endTime:this.endTime,
          }
          
          getThrowList(data).then(res => {
            if(res.data.code==200){
              _this.countList = res.data.data;
              _this.list= res.data.data.list
              _this.total = res.data.data.total;
              _this.loading = false
            }
          })
        },
        //分页
        handleCurrentChange(val) {
          this.searchCondition.page = val
          this.getList()
        },
        handleSizeChange(val) {
          this.searchCondition.pageSize = val
          this.getList()
        },
        addRemarkBtn(val) {
            this.uid = val.id;
            this.dialogFormVisible = true;
            this.remark = val.remark;
            this.status = val.status == '有效' ? '1' : '0';
        },
        addRemarkSure() {
            let _this = this;
            if(_this.addRemark == ''){
                alert('备注信息不能为空')
            }
            if(_this.status == ''){
                alert('请选择是否有效')
            }
            addRemark({
                id:_this.uid,
                remark:_this.remark,
                status:_this.status
            }).then(res => {
            if(res.data.code==200){
              _this.dialogFormVisible = false;
              _this.remark = '';
              _this.status = '';
              _this.getList();
            }
          })
        }
    }
}
</script>
<style type="scss" scoped="scoped">
	.order_list{
		font-size: 1rem;
		color: #999;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.order_list span{
		font-size: 18px;
		color: #666;
	}
	.sku_num{float: left;width: auto;}
</style>
