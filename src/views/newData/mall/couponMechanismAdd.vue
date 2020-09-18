<template>
  <div class="app-container">
    <el-form
      class="style_auto"
      :model="form"
      :rules="rules"
      ref="form"
      label-width="140px"
      :inline="true"
    >
      <el-form-item label="优惠券名称:" prop="coupon_name">
        <el-input v-model="form.coupon_name" style="width:500px" placeholder="请填写优惠券名称" />
      </el-form-item>

      <el-form-item label="适用业务:">
        <el-col>
          <el-radio-group v-model="form.modules">
            <el-radio label="2">商城</el-radio>
            <el-radio label="5">第三方通用劵</el-radio>
            <el-radio label="1">酒店</el-radio>
            <el-radio label="3">线路</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>

      <el-form-item label="适用范围:" prop="typeId" v-if="form.modules==5">
        <el-select v-model="form.typeId" placeholder="请选择">
          <!-- <el-col v-if="form.modules==2">
            <el-option
              v-for="item in shopOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col> -->

          <el-col v-if="form.modules==5">
            <el-option
              v-for="item in thirdTem"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>

          <el-col v-if="form.modules==1">
            <el-option
              v-for="item in hotelOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>

          <!-- <el-option v-for="item in isYw" :key="item.id" :label="item.name" :value="item.id" /> -->
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="适用范围:" prop="son_modules" v-if="form.modules==1">
        <el-select v-model="form.son_modules" placeholder="请选择">
          <el-col>
            <el-option
              v-for="item in hotelOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="商城:" prop="son_modules" v-if="form.modules == 2 && form.typeId==1">
        <el-radio v-model="form.son_modules" label="0">全场通用</el-radio>
        <el-radio v-model="form.son_modules" label="1">自营商品优惠券</el-radio>
      </el-form-item> -->

      <el-form-item label="产品编号" v-show="form.modules==2 && form.typeId!=1" prop="stock_num">
        <el-input v-if="form.typeId==3" placeholder="请输入产品编号" v-model="form.son_modules" />
        <el-input v-else-if="form.typeId==6" placeholder="请输入分类编号" v-model="form.son_modules" />
        <el-input v-else-if="form.typeId==5" placeholder="请输入活动编号" v-model="form.son_modules" />
        <el-input v-else-if="form.typeId==4" placeholder="请输入店铺编号" v-model="form.son_modules" />
      </el-form-item>

      <el-form-item label="发送时机:" prop="opportunity">
        <el-select v-model="form.opportunity" placeholder="请选择">
          <el-col v-if="form.modules==2">
            <el-option
              v-for="item in opportunityMall"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
          <el-col v-else-if="form.modules==5">
            <el-option
              v-for="item in opportunityThree"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
          <el-col v-else-if="form.modules==1">
            <el-option
              v-for="item in opportunityHotel"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
          <el-col v-else-if="form.modules==3">
            <el-option
              v-for="item in opportunityLine"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
        </el-select>
      </el-form-item>

      <el-form-item label="发送优惠券类型:" prop="type">
        <el-select v-model="form.type" @change="typeChange" placeholder="请选择">
          <el-col>
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-col>
        </el-select>
      </el-form-item>

      <el-form-item label="优惠券id" prop="cid" v-if="form.type==1">
        <el-input v-model="form.cid" placeholder="请输入优惠券id" style="width:300px"/>
      </el-form-item>

      <el-form-item label="专题id" prop="cid" v-if="form.type==2">
        <el-input v-model="form.cid" placeholder="请输入专题id" style="width:300px"/>
      </el-form-item>

      <el-form-item label="每人限领" prop="maxNumber">
        <el-input v-model="form.maxNumber" placeholder="1" />
      </el-form-item>

      <el-form-item label="使用限制:">
        <el-col>
          <el-radio-group v-model="form.isMember">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">仅会员</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>

      <el-form-item label="有效日期:">
        <el-col>
          <el-date-picker
            v-model="form.coupon_use_starttime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="有效日期"
            style="width: 150px;"
          />
          <el-date-picker
            v-model="form.coupon_use_endtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="失效日期"
            style="width: 150px;"
          />
        </el-col>
      </el-form-item>

      <el-form-item class="save_btn">
        <el-button type="primary" @click="onAdd('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { couponMechanismAdd, couponMechanismUpdate, couponMechanismDetail , opportunityList} from "@/api/admin";
import _ from "lodash";
export default {
  data() {
    return {
      form: {
        coupon_name: "", //优惠券名称
        coupon_type: 0, //用途
        coupon_type_befor: "", //折扣
        coupon_type_after: "", //折扣
        date_type: 1, // 固定日期 有效日期
        modules: "", // 业务
        // stock_num: "", //库存
        days: "", //有效天数
        coupon_use_starttime: "", //有效期
        coupon_use_endtime: "", //有效期
        coupon_message: "", //商品描述
        isMember: 0, //是否是会员
        son_modules: "", //子模块
        typeId: "1", //用途
        mobile: "", //商户手机号
        type:"1",
        address: "" //商户使用区域
      },
      id: "",
      hotelOption: [
        {
          id: "0",
          label: "通用"
        },
        {
          id: "1",
          label: "国内"
        },
        {
          id: 2,
          label: "国际"
        },
        {
          id: 3,
          label: "高星特惠"
        }
      ],
      shopOption: [
        {
          id: "1",
          label: "通用"
        },
        {
          id: "3",
          label: "指定商品"
        },
        {
          id: "6",
          label: "指定商品分类"
        },
        {
          id: "5",
          label: "指定活动"
        },
        {
          id: "4",
          label: "指定店铺"
        }
      ],
      lineOption: [
        {
          id: "0",
          label: "通用"
        },
        {
          id: "1",
          label: "中旅环球"
        },
        {
          id: "2",
          label: "笛风假期"
        }
      ],
      opportunityMall:[],
      opportunityThree:[], 
      opportunityHotel:[],
      opportunityLine:[],   
      thirdTem: [
        { id: "1", label: "曹操" },
        { id: "2", label: "飞机票" },
        { id: "4", label: "火车票" },
        { id: "3", label: "加油" }
      ],
      typeList:[
        { id: "1", label: "单张优惠券" },
        { id: "2", label: "专题" },
      ],
      titleCid:'请输入优惠券id',
      // isYw:[{id:1,name:"酒店"},{id:2,name:"商城"},{id:3,name:"线路"},{id:4,name:"加油充值"}],
      rules: {
        coupon_name: [
          {
            required: true,
            message: "请填写优惠券名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    typeChange(e){
      if(e==2){
        this.titleCid='请输入专题id'
      }else{
        this.titleCid='请输入优惠券id'
      }
    },
    onAdd(formNmae) {
      this.$refs[formNmae].validate(vaild => {
        if (vaild) {
          if (this.form.typeId == 2) {
            var obj = _.clone(this.form);
          } else {
            var obj = _.clone(this.form);
            delete obj.mobile;
            delete obj.address;
          }
          delete obj.status

          if (this.id) {
            // 编辑
            obj.id = this.id;
            // console.log(obj);return;
            couponMechanismUpdate(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                //跳转展示列表页
                this.$router.push({ path: "/mall/couponMechanism" });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
          } else {
            // 添加
            console.log(obj)
            couponMechanismAdd(obj).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                //跳转展示列表页
                this.$router.push({ path: "/mall/couponMechanism" });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            });
          }
        } else {
          this.$message({
            message: "请填写完成信息",
            type: "success"
          });
        }
      });
    },
    // 获取发送时机
    opportunityList(){
      opportunityList().then(res => {
        this.opportunityMall=this.keyVlaueChange(res.data.mall)
        this.opportunityThree=this.keyVlaueChange(res.data.sanfang)
        this.opportunityHotel=this.keyVlaueChange(res.data.hotel)
        this.opportunityLine=this.keyVlaueChange(res.data.xianlu)
      });
    },

    // 键值对变为id:key，lable:value
    keyVlaueChange(object){
      let arr=[]
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          arr.push({id:key,label:object[key]})
        }
      }
      return arr
    },
  },
  created() {
    this.id = this.$route.query ? this.$route.query.cid || 0 : 0;
    this.opportunityList()
    if (this.id) {
      couponMechanismDetail({id:this.id}).then(res => {
        this.form = res.data.data;
        this.form.son_modules = this.form.son_modules ? String(this.form.son_modules) : this.form.son_modules
        this.form.opportunity = this.form.opportunity ? String(this.form.opportunity) : this.form.opportunity
        this.form.type = this.form.type ? String(this.form.type) : this.form.type
        this.form.typeId = this.form.typeId ? String(this.form.typeId) : this.form.typeId
        this.form.modules = this.form.modules ? String(this.form.modules) : this.form.modules
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: block;
}
.style_auto {
  width: 80%;
  margin: 0 auto;
}
.save_btn {
  text-align: center;
}
</style>
