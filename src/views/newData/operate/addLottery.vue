<template>
	<div id="addLottery">
		<el-form ref="form" :model="form" label-width="160px">
			<el-form-item label="活动名称:">
				<el-select v-model="form.activitiesID" filterable placeholder="请选择">
					<el-option
						v-for="items in selectActivitiesList"
						:key="items.id"
						:label="items.activity_name"
						:value="items.id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动开始时间:">
				<el-date-picker
					style="width: 300px"
					v-model="form.startTime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择日期时间"
					align="right"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="活动结束时间:">
				<el-date-picker
					style="width: 300px"
					v-model="form.endTime"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择日期时间"
					align="right"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="默认抽奖次数:">
				<el-input v-model="form.num" style="width: 300px" size="small"></el-input>
			</el-form-item>

			<el-button type="primary" class="addLotteryBtn" @click="addProduct">添加奖品</el-button>
			<el-form inline>
				<div class="lotterys" v-for="(item,index) in lotteryData" :key="index">
					<el-form-item :label="'奖品'+(index+1)+'选择：'">
						<el-select v-model="item.couponID" filterable placeholder="请选择">
							<el-option label="谢谢参与" value="0"></el-option>
							<el-option
								v-for="items in CouponList"
								:key="items.cid"
								:label="items.coupon_name"
								:value="items.cid"
							></el-option>
						</el-select>
					</el-form-item>


<!-- 0谢谢参与 1优惠券,2:用户余额 -->
         <el-form-item label="类型"
                        prop="type">
            <el-select v-model="item.type"
                       placeholder="请选择类型"
                       filterable
                       clearable>
              <el-option label="谢谢参与" value="0" />
              <el-option label="优惠券" value="1" />
              <el-option label="用户余额" value="2" />
            </el-select>
          </el-form-item>

          <el-form-item label="金额:" v-if="item.type==2">
						<el-input v-model="item.money" style="width: 80px;padding: 0" size="small">
						</el-input>
					</el-form-item>

					<el-form-item label="首次中奖几率:">
						<el-input v-model="item.onePro" style="width: 80px;padding: 0" size="small">
							<template slot="append" style="padding: 0 10px;">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="二次中奖几率:">
						<el-input v-model="item.twoPro" style="width: 80px" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item label="中奖展示名称:">
						<el-input
							v-model="item.name"
							style="width: 150px"
							size="small"
							maxlength="6"
							show-word-limit
						></el-input>
					</el-form-item>
					<el-form-item label="展示图片:">
						<el-upload
							class="avatar-uploader"
							action="https://api2.yuelvhui.com/app/third/upload"
							list-type="picture-card"
							:on-success="(res)=> handleAvatarSuccess(res, index)"
							:on-remove="handleRemoveImg"
							:limit="1"
							:file-list="item.imgs"
						>
							<i class="el-icon-plus avatar-uploader-icon" style="width: 100px;height: 100px;"></i>
							<div slot="tip" class="el-upload__tip">建议图片小于200k</div>
						</el-upload>
					</el-form-item>
					<el-form-item>
						<div @click="del(item,index)">删除</div>
					</el-form-item>
				</div>
			</el-form>
		</el-form>

		<el-button type="primary" @click="save">保存</el-button>
	</div>
</template>

<script>
  import {
    selectCoupons,
    selectActivities,
    addLottery,
    getLottery,
    updateLottery,
    deleteLotteryConfig
  } from "@/api/order"; // 接口
  export default {
    name: "addLottery",
    data() {
      return {
        loading: false,
        form: {},
        imgFileList: [],
        lotteryData: [],
        CouponList: [],
        selectActivitiesList: [],
        imgs: []
      };
    },
    created() {
      this.getCouponList();
      this.getSelectActivities();
      if (this.$route.query.id) {
        this.getLotteryDetail();
      }
    },
    methods: {
      //   优惠券列表
      getCouponList() {
        selectCoupons({})
          .then(res => {
            if (res.data.code == 200) {
              this.CouponList = res.data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getLotteryDetail() {
        getLottery({
          la_id: this.$route.query.id
        })
          .then(res => {
            if (res.data.code == 200) {
              this.form = res.data.data;
              this.lotteryData = res.data.data.lotteryData;
              for (var i = 0; i < res.data.data.lotteryData.length; i++) {
                this.lotteryData[i].imgs = [
                  { name: "food.jpg", url: res.data.data.lotteryData[i].imgPath }
                ];
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      getSelectActivities() {
        selectActivities({})
          .then(res => {
            if (res.data.code == 200) {
              this.selectActivitiesList = res.data.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      handleAvatarSuccess(res, index) {
        this.lotteryData[index].imgPath = res.url;
      },

      handleRemoveImg() {},
      // 删除奖品
      del(item, idx) {
        if (item.lc_id) {
          deleteLotteryConfig({
            lc_id: item.lc_id
          })
            .then(res => {
              if (res.data.code == 200) {
                this.$message(res.data.msg);
                this.lotteryData.splice(idx, 1);
              } else {
                this.$message(res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message('操作成功');
          this.lotteryData.splice(idx, 1);
        }
      },
      //   添加奖品
      addProduct() {
        this.lotteryData.push({
          couponID: "",
          onePro: "",
          twoPro: "",
          name: "",
          imgPath: ""
        });
      },
      //   保存
      save() {
        this.form.lotteryData = this.lotteryData;
        if (this.$route.query.id) {
          updateLottery(this.form)
            .then(res => {
              if (res.data.code == 200) {
                this.$message(res.data.msg);
                this.$router.push({ path: "/operate/lottery" });
              } else {
                this.$message(res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          addLottery(this.form)
            .then(res => {
              if (res.data.code == 200) {
                this.$message(res.data.msg);
                this.$router.push({ path: "/operate/lottery" });
              } else {
                this.$message(res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  };
</script>

<style lang="scss">
	#addLottery {
		padding: 20px;
		.addLotteryBtn {
			display: block;
		}
	}

	.el-input-group__append {
		padding: 0 5px !important;
	}
</style>
