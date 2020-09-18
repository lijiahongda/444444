<template>
<div id="userCouponLineAdd">
	<el-form label-width="120px" :model="form" ref="form">
		<el-form-item label="用户分层:" prop="memberLayered">
			<el-radio-group v-model="form.memberLayered">
				<el-radio :label="1">潜在用户</el-radio>
				<el-radio :label="2">新生用户</el-radio>
				<el-radio :label="3">有效用户</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="类型:" prop="linkNameType">
			<el-radio-group v-model="form.linkNameType">
				<el-radio :label="1" v-if="form.memberLayered==1">新人专享优惠券</el-radio>
				<el-radio :label="2" v-if="form.memberLayered==2">拆红包优惠券</el-radio>
				<el-radio :label="3" v-if="form.memberLayered==2">二次福利优惠券</el-radio>
				<el-radio :label="4" v-if="form.memberLayered==2">二次福利过期优惠券</el-radio>
				<el-radio :label="5" v-if="form.memberLayered==3">通用优惠券</el-radio>
				<el-radio :label="6" v-if="form.memberLayered==3">第一阶段任务成功优惠券</el-radio>
				<el-radio :label="7" v-if="form.memberLayered==3">第二阶段任务成功优惠券</el-radio>
				<el-radio :label="8" v-if="form.memberLayered==3">普通膨胀红包</el-radio>
				<el-radio :label="9" v-if="form.memberLayered==3">plus膨胀红包</el-radio>
			</el-radio-group>

		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="selecShop" plain class="new_select_shop">
				选择优惠券</el-button>
		</el-form-item>
		<el-form-item label="选中的优惠券:">
			<el-tag v-for="(item,index) in coupon_info"  :key="item.cid"  closable @close="handleClose(index)">{{item.name}}</el-tag>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="confirm" plain class="new_select_shop">
				保存</el-button>
		</el-form-item>
	</el-form>
	<el-dialog width="800px" title="选择优惠券" :visible.sync="dialogTableVisible">
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="选择优惠券">
				<el-input v-model="searchVal" placeholder="选择优惠券名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getTabCoupons(1)" type="primary">搜索</el-button>
			</el-form-item>

		</el-form>
		<div class="commodity">
			<ul>
				<li @click="choseId_new(item)" v-for="(item,index) in list" :key="index">
					<div class="section-p">
						<p v-text="item.goods_name"></p>
						<div>
							<span>名称：{{item.coupon_name}}</span>
						</div>
					</div>
					<div class="select-btn">
						<el-button plain>选取</el-button>
					</div>
				</li>
			</ul>
		</div>
		<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
		</el-pagination>

	</el-dialog>
</div>
</template>

<script>
  import {
    selectCoupon
  } from '@/api/admin'
  import {
    getMemberLinkCoupon,
    addMemberLinkCoupon,
    upMemberLinkCoupon
  } from '@/api/shops'
  const isInArray = (single, arr) => {
    return (arr.findIndex(res => {
      return res === single
    })) >= 0
  }
  export default {
    name: 'add',
	data(){
      return{
        radio: 1,
        dialogTableVisible: false,
		total:0,
		list:[],
        searchVal:'',
        keyValue: '',
        addMemberLinkCoupon:[],
		form:{
          memberLayered:1
		},
        coupon_info:[]
	  }
	},
	created() {
      this.getTabCoupons(1)
	  if(this.$route.query.id){
	    this.getMemberLinkCoupon()
	  }
    },
	methods:{
      getMemberLinkCoupon(){
        getMemberLinkCoupon({id:this.$route.query.id}).then(res=>{
          if(res.data.code == 200){
            this.$set(this.form,'memberLayered',res.data.data.memberLayered)
            this.$set(this.form,'linkNameType',res.data.data.linkNameType)
            this.coupon_info = res.data.data.couponList
		  }
		})
	  },
      confirm(){
        let arr = [];
        this.coupon_info.forEach(item=>{
          arr.push(item.cid)
		})
		let params = {
          couponId: arr.join(','),
		  ...this.form
        }
        if(this.$route.query.id){
          params.id=this.$route.query.id
		}
        let url = this.$route.query.id ? upMemberLinkCoupon : addMemberLinkCoupon
        url(params).then(res=>{
			if(res.data.code == 200){
			  this.$message.success(res.data.msg)
			  this.$router.push({path:'/operate/userCoupon-line'})
			}else{
              this.$message.error(res.data.msg)
			}
		})
	  },
      handleClose(index) {
        this.coupon_info.splice(index, 1);
      },
      selecShop() {
        if(this.form.linkNameType){
          /**普通膨胀红包第一天只能选择3个;
          plus膨胀红包只能选择7个*/
          this.dialogTableVisible = true;
		}else{
          this.$message.warning('请先选择类型')
		}

      },
      handleCurrentChange(val) {
        console.log(val)
        this.getTabCoupons(val)
      },
      getTabCoupons(page) {
        let _this = this;
        let data = {
          page: page
        }
        if (this.searchVal) {
          data['keyword'] = this.searchVal
        }

        selectCoupon(data).then((res) => {
          if (res.data.code == 200) {
            _this.list = res.data.data
            _this.total = res.data.totalPage
          }
        }).catch((error) => {
          console.log(error)
        })
      },
		// 选择商品
      choseId_new(item) {
        if (this.coupon_info.length == 0) {
          this.coupon_info.push({
            name:item.coupon_name,
            cid:item.cid
		  })
        } else {
          var isArr = [];
          this.coupon_info.forEach((json, index) => {
            isArr.push(json.cid)
          })
          console.log(item.cid)
          if (isInArray(item.cid, isArr)) {
            this.$message({
              type: 'info',
              message: '不能选择相同产品'
            })
            console.log('相同')
          } else {
            console.log('大大')

            this.coupon_info.push({
              name:item.coupon_name,
              cid:item.cid
            })
          }
        }
        this.dialogTableVisible = false
      },
    }
  }
</script>

<style scoped lang="scss">
 #userCouponLineAdd{
	 padding: 20px;
 .commodity {
 li {
	 overflow: hidden;
	 box-sizing: border-box;
	 padding-top: 10px;
	 margin-bottom: 5px;
 }

 li.selectName {
	 padding-top: 10px;
	 width: 670px;
	 margin: 15px 0;
	 background: #f1f1f1;
 }

 li.small_bg.selectName {
	 width: 480px
 }

 .imgDiv {
	 float: left;
	 background: #fff;
	 width: 70px;
	 height: 70px;

 img {
	 width: 100%;
	 height: 100%;
 }
 }

 .section-p {
	 width: 500px;
	 padding-left: 10px;
	 box-sizing: border-box;
	 float: left;

 span {
	 line-height: 16px;
	 display: inline-block;
	 margin-right: 20px;
 }
 }

 .select-btn {
	 float: right;
 }
 }
	 .el-tag{
		 margin: 0 5px;
	 }
 }
</style>
