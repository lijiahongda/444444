<template>
<div class="gropAdd">
    <el-dialog width="800px" title="选择商品" :visible.sync="dialogTableVisible">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="渠道" class="background_color" v-if="!editId">
                <el-radio-group v-model="form.channel_id" @change="radioChange">
                    <el-radio v-model="form.channel_id" v-for="item in channelList" :key="item.id" :label="item.id">
                        {{item.channel_name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择商品">
                <el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="commodity">
            <ul>
                <li @click="choseId(item)" v-for="(item,index) in list" :key="index">
                    <div class="imgDiv">
                        <img :src="item.path" alt="">
                    </div>
                    <div class="section-p">
                        <p v-text="item.goods_name"></p>
                        <div>
                            <span>官网价：￥{{item.origin_price}}</span>
                            <span>库存：{{item.inventory}}</span>
                        </div>
                    </div>
                    <div class="select-btn">
                        <el-button plain>选取</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <el-pagination small :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>

    </el-dialog>
    <el-dialog width="800px" title="选择商品" :visible.sync="dialogtbVisible">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="选择商品">
                <el-input v-model="searchVal" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getActivities(1)" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="commodity">
            <ul>
                <li @click="activeId(item)" v-for="(item,index) in activelist" :key="index">
                    <div class="section-p">
                        <p v-text="item.goods_name"></p>
                        <div>
                            <span>活动id：{{item.id}}</span>
                            <span>活动名称：{{item.activity_name}}</span>
                        </div>
                    </div>
                    <div class="select-btn">
                        <el-button plain>选取</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <el-pagination small :current-page.sync="currentPage" @current-change="handleActiveChange" layout="prev, pager, next" :total="total">
        </el-pagination>

    </el-dialog>
    <!--弹出优惠券呢-->

    <el-dialog width="800px" title="选择商品" :visible.sync="tep1">
        <el-form :inline="
               true" class="demo-form-inline">
            <el-form-item label="选择商品">
                <el-input v-model="searchCondition.keyword" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit_tep1(1)" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="commodity" v-if="mb5 && form5.channel == 98 && is_num==7">
            <ul>
                <li @click="active_tep1_Id(item)" v-for="(item,index) in activelist_tep1" :key="index">
                    <div class="section-p">
                        <p v-text="item.goods_name"></p>
                        <div>
                            <span>活动id:{{item.channelId}}</span>
                            <span>活动名称：{{item.productName}}</span>
                        </div>
                    </div>
                    <div class="select-btn">
                        <el-button plain>选取</el-button>
                    </div>
                </li>
            </ul>
        </div>

        <div class="commodity" v-else>
            <ul>
                <li @click="active_tep1_Id(item)" v-for="(item,index) in activelist_tep1" :key="index">
                    <div class="section-p">
                        <p v-text="item.goods_name"></p>
                        <div>
                            <span>活动id:{{item.id}}</span>
                            <span>活动名称：{{item.name}}</span>
                        </div>
                    </div>
                    <div class="select-btn">
                        <el-button plain>选取</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <el-pagination small @size-change="handleSizeChange" @current-change="handleActiveChange_tep1" :page-size="searchCondition.pageSize" :current-page="searchCondition.page" layout="prev, pager, next" :total="total">
        </el-pagination>

    </el-dialog>
    <el-form :model="active_form" label-width="120px">
        <el-form-item label="活动名称" prop="active_tit">
            <el-input v-model="active_form.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="选择模版" prop="active_id">
            <el-button @click="template(1)">模版一</el-button>
            <el-button @click="template(2)">模版二</el-button>
            <el-button @click="template(3)">模版三</el-button>
            <el-button @click="template(4)">模版四</el-button>
            <el-button @click="template(5)">模版五</el-button>
        </el-form-item>
    </el-form>
    <!--模版1-->

    <p class="col">*所有选项都为必填项</p>
    <el-form v-if="mb1" ref="form1" :model="form1" label-width="120px">
        <div class="yhq_box">
            <el-form-item label="模版一" prop="share_img">
                <img v-if="this.$route.query.id && img1" width="200px" :src="this.form1.image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="1" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep1" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">

                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id" style="padding-left:20px">

                <el-select v-model="form1.active_radio" placeholder="请选择">
                    <el-option v-for="just in one_option" :key="just.value" :label="just.label" :value="just.value">
                    </el-option>
                </el-select>

                <el-input v-if="form1.active_radio == 1" style="margin-top:20px" v-model="form1.activity_id" placeholder="绑定活动id"></el-input>

                <el-input v-else style="margin-top:20px" v-model="form1.link" placeholder="输入h5链接"></el-input>
            </div>
            <div class="yhq_btn">
                <el-form-item>
                    <el-button type="danger" @click="delete_template(1)">删除模版</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="open_tep(1)" type="primary">选择优惠券</el-button>
                </el-form-item>
            </div>
        </div>
        <div class="quan" v-if="quan_list.length>0">
            <p v-for="(item,index) in quan_list" :key="item.id"><em>
                    <el-button @click="del_tep1(index,1)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>
    </el-form>
    <!--模版2-->

    <el-form v-if="mb2" ref="form2" :model="form2" label-width="120px">
        <!--模版2-1-->
        <div class="yhq_box">
            <el-form-item label="模版二" prop="share_img">
                <img v-if="this.$route.query.id && img2_1" width="200px" :src="this.form2.info[0].image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep2_1" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id" style="padding-left:20px">

                <el-select v-model="form2.info[0].active_radio" placeholder="请选择">
                    <el-option v-for="just in one_option" :key="just.value" :label="just.label" :value="just.value">
                    </el-option>
                </el-select>

                <el-input v-if="form2.info[0].active_radio == 1" style="margin-top:20px" v-model="form2.info[0].activity_id" placeholder="绑定活动id"></el-input>

                <el-input v-else style="margin-top:20px" v-model="form2.info[0].link" placeholder="输入h5链接"></el-input>
            </div>
            <div class="yhq_btn">
                <el-form-item>
                    <el-button type="danger" @click="delete_template(2)">删除模版</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="open_tep(2)" type="primary">选择优惠券</el-button>
                </el-form-item>
            </div>
        </div>

        <div class="quan" v-if="quan_list2.length>0">
            <p v-for="(item,index) in quan_list2" :key="item.id"><em>
                    <el-button @click="del_tep1(index,2)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>

        <!--模版2-2-->
        <div class="yhq_box" style="padding-left:20px">
            <el-form-item label="模版二" prop="share_img">
                <img v-if="this.$route.query.id && img2_2" width="200px" :src="this.form2.info[1].image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep2_2" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id">
                <el-select v-model="form2.info[1].active_radio" placeholder="请选择">
                    <el-option v-for="just in one_option" :key="just.value" :label="just.label" :value="just.value">
                    </el-option>
                </el-select>

                <el-input v-if="form2.info[1].active_radio == 1" style="margin-top:20px" v-model="form2.info[1].activity_id" placeholder="绑定活动id"></el-input>

                <el-input v-else style="margin-top:20px" v-model="form2.info[1].link" placeholder="输入h5链接"></el-input>

            </div>
            <div class="yhq_btn">
                <el-form-item>
                    <el-button @click="open_tep(3)" type="primary">选择优惠券</el-button>
                </el-form-item>
            </div>
        </div>

        <div class="quan" v-if="quan_list3.length>0">
            <p v-for="(item,index) in quan_list3" :key="item.id"><em>
                    <el-button @click="del_tep1(index,3)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>

        <!--模版2-3-->
        <div class="yhq_box" style="padding-left:20px">
            <el-form-item label="模版二" prop="share_img">

                <img v-if="this.$route.query.id && img2_3" width="200px" :src="this.form2.info[1].image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep2_3" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id">
                <el-select v-model="form2.info[2].active_radio" placeholder="请选择">
                    <el-option v-for="just in one_option" :key="just.value" :label="just.label" :value="just.value">
                    </el-option>
                </el-select>

                <el-input v-if="form2.info[2].active_radio == 1" style="margin-top:20px" v-model="form2.info[2].activity_id" placeholder="绑定活动id"></el-input>

                <el-input v-else style="margin-top:20px" v-model="form2.info[2].link" placeholder="输入h5链接"></el-input>
            </div>
            <div class="yhq_btn">
                <el-form-item>
                    <el-button @click="open_tep(4)" type="primary">选择优惠券</el-button>
                </el-form-item>
            </div>
        </div>

        <div class="quan" v-if="quan_list4.length>0">
            <p v-for="(item,index) in quan_list4" :key="item.id"><em>
                    <el-button @click="del_tep1(index,4)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>
    </el-form>
    <!--模版3-->

    <el-form v-if="mb3" ref="form3" :model="form3" label-width="120px">
        <div class="yhq_box">
            <el-form-item label="模版三" prop="share_img">

                <img v-if="this.$route.query.id && img3_1" width="200px" :src="this.form3.info[0].image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep3_1" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id">
                <el-form-item>

                    <el-select v-model="form3.info[0].type" clearable placeholder="请选择">
                        <el-option v-for="just in tep3_option" :key="just.type" :label="just.name" :value="just.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form3.info[0].type == 206">

                    <el-input v-model="form3.info[0].activity_id" placeholder="兑吧活动页"></el-input>
                </el-form-item>
                <el-form-item v-if="form3.info[0].type == 29">

                    <el-input v-model="form3.info[0].link" placeholder="跳转H5链接"></el-input>
                </el-form-item>
                <el-form-item v-if="form3.info[0].type == 38">

                    <el-input v-model="form3.info[0].coupons_id" placeholder="跳转优惠券专题"></el-input>
                </el-form-item>

            </div>
            <div class="yhq_btn">
                <el-form-item>
                    <el-button type="danger" @click="delete_template(3)">删除模版</el-button>
                </el-form-item>
            </div>
        </div>

        <div class="yhq_box">
            <el-form-item label="模版三" prop="share_img">

                <img v-if="this.$route.query.id && img3_2" width="200px" :src="this.form3.info[1].image" alt="">
                <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess_tep3_2" :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span>100kb以内</span>
            </el-form-item>
            <div class="yhq_id">
                <el-form-item>

                    <el-select v-model="form3.info[1].type" clearable placeholder="请选择">
                        <el-option v-for="just in tep3_option" :key="just.type" :label="just.name" :value="just.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="form3.info[1].type == 206">

                    <el-input v-model="form3.info[1].activity_id" placeholder="兑吧活动页"></el-input>
                </el-form-item>
                <el-form-item v-if="form3.info[1].type == 29">

                    <el-input v-model="form3.info[1].link" placeholder="跳转H5链接"></el-input>
                </el-form-item>
                <el-form-item v-if="form3.info[1].type == 38">

                    <el-input v-model="form3.info[1].coupons_id" placeholder="跳转优惠券专题"></el-input>
                </el-form-item>

            </div>
        </div>
    </el-form>
    <!--模版4-->
    <el-form v-if="mb4" ref="form" :model="form" label-width="120px">

        <el-form-item label="模版四">
            <el-button type="danger" @click="delete_template(4)">删除模版</el-button>
        </el-form-item>
        <el-form-item label="分享标题" prop="share_title">
            <el-input v-model="form.share_title" placeholder="请输入分享标题"></el-input>
        </el-form-item>
        <el-form-item label="分享封面" prop="share_img">

            <img v-if="this.$route.query.id && img4_share" width="200px" :src="this.form.share_image" alt="">
            <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="form.share_img" :src="form.share_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>尺寸:421*375,100kb以内</p>
        </el-form-item>
        <el-form-item label="活动类型" prop="share_title">
            <el-radio v-model='form.type' :label="0" :disabled="disableds">秒杀</el-radio>
            <el-radio v-model='form.type' :label="1" :disabled="disableds">限时半价</el-radio>
            <el-radio v-model='form.type' :label="5" :disabled="disableds">今日爆款</el-radio>
            <el-radio v-model='form.type' :label="7" :disabled="disableds">社群团购</el-radio>
        </el-form-item>
        <el-form-item label="首页标题" prop="share_title" v-if="form.type == 0">
            <el-input v-model="form.home_title" placeholder="请输入首页标题"></el-input>
        </el-form-item>
        <el-form-item label="首页推荐图片" prop="share_img">

            <img v-if="this.$route.query.id && img4" width="200px" :src="this.form.home_image" alt="">
            <el-upload list-type="picture-card" action="https://api2.yuelvhui.com/app/third/upload" :limit="2" :auto-upload="true" :on-exceed="handleOnExceed" :file-list="fileList" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <span>100kb以内</span>
        </el-form-item>

        <el-form-item v-if="form.type==7" label="社群团建海报图" prop="share_img">
            <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload">
                <img v-if="form.community_poster_img" :src="form.community_poster_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>尺寸:750*1355,100kb以内</span>
        </el-form-item>

        <!-- <el-form-item v-if="form.type==7" label="社群团建海报图"
                    prop="share_img">
        <el-upload list-type="picture-card"
                   action="https://api2.yuelvhui.com/app/third/upload"
                   :auto-upload="false"
                   :on-exceed="handleOnExceed"
                   :on-success="handleAvatarSuccess3"
                   :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl3"
               alt="">
        </el-dialog>
        <span>100kb以内</span>
      </el-form-item> -->
        <el-form-item label="有效时间" prop="timeArray">
            <el-date-picker v-model="timeArray" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:00:00" :picker-options="pickerOptions">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="选择状态" prop="">
            <el-radio v-model='form.status' :label="0">下线</el-radio>
            <el-radio v-model='form.status' :label="1">上线</el-radio>
        </el-form-item>
        <el-form-item label="活动专题图" prop="share_img" v-if="form.type == 1">
            <el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :file-list="fileList" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload">
                <img v-if="form.act_special_imgs" :src="form.act_special_imgs" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>尺寸:421*375,100kb以内</span>
        </el-form-item>
        <el-form-item label="选择活动" v-if="(form.type==5)" prop="active_id">
            <div style="float:left">
                <el-button type="primary" @click="dialogtbVisible = true" plain>点击选择</el-button>
            </div>
            <div class="commodity" v-if="form.ac_id != 0" style="clear:both;">
                <ul>
                    <li style="border:none">
                        <div class="section-p" style="width:720px;line-height: 0;background: #f1f1f1;padding: 10px;margin-right: 10px;">
                            <div>
                                <span>活动名称: {{form.activity_name}}</span>
                                <span>活动id: {{form.ac_id}}</span>
                            </div>
                        </div>
                        <!-- <div class="del_item">
                <el-button type="danger"
                           plain
                           @click='delItem(item,form.actives_info,index)'>删除
                </el-button>
              </div> -->
                    </li>
                </ul>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button @click="open_tep(6)" type="primary">选择优惠券</el-button>
        </el-form-item>
        <div class="quan" v-if="quan_list6.length>0">
            <p v-for="(item,index) in quan_list6" :key="item.id"><em>
                    <el-button @click="del_tep1(index,6)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>
        <!-- <el-form-item label="推广渠道">
        <el-checkbox-group v-model="form.channel"
                           size="mini"
                           @change="handleCheckedCitiesChange">
          <el-checkbox :label="city.id"
                       :key='city.id'
                       v-for="city in cities">{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
    </el-form>
    <!--模版5-->

    <el-form v-if="mb5" ref="form5" :model="form5" label-width="120px">
        <div class="yhq_box">
            <el-form-item label="模版五"></el-form-item>
            <el-form-item label="选择标签">
                <el-select v-model="form5.channel" clearable placeholder="请选择">
                    <el-option v-for="item in tep5_options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item><br />

            <div class="yhq_btn">
                <el-form-item>
                    <el-button type="danger" @click="delete_template(5)">删除模版</el-button>
                    <el-button @click="open_tep(7)" type="primary">选择优惠券</el-button>
                </el-form-item>
            </div>
        </div>
        <el-form-item v-if="form5.channel != 1" label="搜索关键词">
            <el-input v-model="cspList.keyword" type="text" />
        </el-form-item>
        <div class="quan" v-if="quan_list7.length>0">
            <p v-for="(item,index) in quan_list7" :key="index"><em>
                    <el-button @click="del_tep1(index,7)" type="danger" icon="el-icon-delete" circle></el-button>
                </em><span v-html="item.name"></span></p>
        </div>
    </el-form>

    <!-- <el-button type="primary"
               @click="onSubmit('form')">保存数据</el-button> -->
    <el-button type="primary" @click="tepaddConfig()">保存数据</el-button>
</div>
</template>

<script>
import _ from 'lodash'
import waves from '@/directive/waves' // 水波纹指令
import {
    tabGoods,
    getBargain,
    getSeckill,
    getTabChannels,
    addSeckill,
    updateSeckill,
    getChannelList,
    getActivities,
    deleteSeckillIGood,
    yhqTep1,
    yhqTep5,
    yhqType,
    tepaddConfig,
    updateCouponInfo,
    updateCouponCollectionCenter
} from '@/api/shops'
const isInArray = (single, arr) => {
    return (arr.findIndex(res => {
        return res === single
    })) >= 0
}
export default {
    name: 'bargainAdd',
    directives: {
        waves
    },
    // components: { VerticalFrom }
    data() {
        let _this = this;
        var validateStock = (rule, value, callback) => {
            if (value > _this.stock) {
                callback(new Error('不可高于产品现有库存'));
            } else {
                callback();
            }
        };
        return {
            mb1: false,
            mb2: false,
            mb3: false,
            mb4: false,
            mb5: false,
            total: 1,
            dialogTableVisible: false,
            dialogtbVisible: false,
            tep1: false,
            //选择模版
            active_form: {
                name: ''
            },
            //模版4
            form: {
                share_title: '', //分享标题
                home_title: '', //砍价名称
                start_time: '', //活动开始时间
                end_time: '', //活动结束时间
                type: 0, //活动类型
                home_title: '', //活动标题
                act_special_imgs: '', //活动专题主图
                community_poster_img: '', //活动海报图
                channel: [1],
                coupons_id: '', //优惠券专题
                ac_id: 0, //选择活动信息id
                activity_name: '', //选择活动信息name
                share_img: '', //分享图片
                home_image: '',
                status: 0,
                coupon_id: {},
            },
            //模版1
            form1: {
                active_radio: '', //单选
                activity_id: '', //绑定活动id
                link: '', //绑定活动链接
                coupon_id: {},
                image: '' //
            },

            //模版2
            form2: {
                info: [{
                    active_radio: '', //单选
                    activity_id: '', //绑定活动id
                    link: '', //绑定活动链接
                    coupon_id: {},
                    image: '' //
                }, {
                    active_radio: '', //单选
                    activity_id: '', //绑定活动id
                    link: '', //绑定活动链接
                    coupon_id: {},
                    image: '' //
                }, {
                    active_radio: '', //单选
                    activity_id: '', //绑定活动id
                    link: '', //绑定活动链接
                    coupon_id: {},
                    image: '' //
                }]
            },
            //模版3
            form3: {
                info: [{
                    type: '', //类型
                    activity_id: '', //绑定活动id
                    link: '', //绑定活动链接
                }, {
                    type: '', //类型
                    activity_id: '', //绑定活动id
                    link: '', //绑定活动链接
                }]
            },
            form5: {
                channel: 1,
                list: []
            },
            //cps搜索优惠券
            cspList: {
                page: 1, //当前页
                pageSize: 10, //每页条数
                isCoupon: "1",
                sort: "0",
                channelId: "",
                pageSize: "10",
                mid: 15795,
                keyword: "",
                page: "1",
                sorttype: "1"
            },
            istemplate: [],
            //标签
            options: [{
                label: '',
                value: ''
            }],
            tep3_option: [], //模版三类型
            one_option: [{
                value: 1,
                label: '绑定活动id'
            }, {
                value: 2,
                label: '输入h5链接'
            }],
            disableds: false,
            channelList: [],
            radioChannel: '',
            editId: '',
            currentPage: 1,
            pickerOptions: {
                disabledDate: (time) => {
                    const curDate = (new Date()).getTime()
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            cities: [{
                id: 1,
                name: "悦旅会APP"
            }], //推广渠道
            share_img: '',
            fileList: [],
            fileList1: [],
            dialogVisible: false,
            dialogImageUrl: '',

            searchVal: '',
            timeArray: [],
            list: [],
            activelist: [],
            activelist_tep1: [],
            stock: '',
            fileList_contract: [],
            // textarea: ''
            searchCondition: {
                page: 1, //当前页
                pageSize: 10, //每页条数
                keyword: ''
            },
            quan_list: [], //优惠券
            quan_list2: [], //优惠券
            quan_list3: [], //优惠券
            quan_list4: [], //优惠券
            quan_list5: [], //优惠券
            quan_list6: [],
            quan_list7: [], //模版7
            is_num: 1, //点击第几个模版选取
            img1: true,
            img2_1: true,
            img2_2: true,
            img2_3: true,
            img3_1: true,
            img3_2: true,
            img4: true,
            img4_share: true,
            tep5_options: [{
                label: '悦淘',
                value: 1
            }, {
                label: '拼多多',
                value: 98
            }]
        }
    },
    computed: {

    },
    mounted() {
        this.getTabGoods(1)
        this.getActivities(1)
        this.get_tep1_Activities(1)
        this.yhqType()
        if (this.$route.query.id) {
            this.getList(this.$route.query.id)
            this.disableds = true;
        }
        this.getTabChannels();
        this.getChannelList();
    },
    methods: {
        //打开优惠券弹窗
        open_tep(index) {
            this.is_num = index
            if (this.form5.channel && this.form5.channel != 1 && index == 7) {
                if (this.cspList.keyword == '') {
                    this.$message({
                        message: '请添加关键词搜索',
                        type: 'error',
                    })
                } else {

                    // this.cspList.page = 1
                    // this.cspList.channelId = _this.form5.channel
                    this.get_tep1_Activities(1, index)
                    this.tep1 = true
                }
            } else {

                this.get_tep1_Activities(1, index)
                this.tep1 = true
            }
        },
        //删除选中优惠券
        del_tep1(id, index) {
            if (index == 1) {
                this.quan_list.splice(id, 1)
            }
            if (index == 2) {
                this.quan_list2.splice(id, 1)
            }
            if (index == 3) {
                this.quan_list3.splice(id, 1)
            }
            if (index == 4) {
                this.quan_list4.splice(id, 1)
            }
            if (index == 5) {
                this.quan_list5.splice(id, 1)
            }
            if (index == 6) {
                this.quan_list6.splice(id, 1)
            }
            if (index == 7) {
                this.quan_list7.splice(id, 1)
            }
        },
        //模版点击
        template(i) {
            if (i == 1) {
                this.mb1 = true
            }
            if (i == 2) {
                this.mb2 = true
            }
            if (i == 3) {
                this.mb3 = true
            }
            if (i == 4) {
                this.mb4 = true
            }
            if (i == 5) {
                this.mb5 = true
            }
            this.istemplate.push(i)
            var set = new Set(this.istemplate) //数组转换set对象
            this.istemplate = Array.from(set)
        },
        delete_template(i) {
            if (i == 1) {
                this.mb1 = false
            }
            if (i == 2) {
                this.mb2 = false
            }
            if (i == 3) {
                this.mb3 = false
            }
            if (i == 4) {
                this.mb4 = false
            }
            if (i == 5) {
                this.mb5 = false
            }
        },
        //添加
        tepaddConfig(res) {
            if (this.active_form.name == '') {
                this.$message.error('请填写必填项')
                return false
            }
            let idList = [],
                idList2 = [],
                idList3 = [],
                idList4 = [],
                idList5 = [],
                idList6 = [],
                idList7 = [];
            this.quan_list.map((item, index) => {
                idList.push(item.id)
            })
            this.quan_list2.map((item, index) => {
                idList2.push(item.id)
            })
            this.quan_list3.map((item, index) => {
                idList3.push(item.id)
            })
            this.quan_list4.map((item, index) => {
                idList4.push(item.id)
            })
            this.quan_list5.map((item, index) => {
                idList5.push(item.id)
            })
            this.quan_list6.map((item, index) => {
                idList6.push(item.id)
            })
            this.quan_list7.map((item, index) => {
                idList7.push(item)
            })
            console.log(this.quan_list7, 'sadadasdas')
            this.form1.coupon_id = idList.toString()
            this.form2.info[0].coupon_id = idList2.toString()
            this.form2.info[1].coupon_id = idList3.toString()
            this.form2.info[2].coupon_id = idList4.toString()
            this.form5.list = idList7
            this.form.coupon_id = idList6.toString()
            //g关于模版四
            if (this.timeArray != null && this.timeArray.length > 0) {
                console.log(this.timeArray, 'heiha')
                this.form.start_time = this.timeArray[0];
                this.form.end_time = this.timeArray[1];
            }
            if (!this.form.share_img) {
                this.form.share_img = this.form.goods_img
            }
            let arrImg = [];
            this.fileList.map(item => {
                arrImg.push(item.url)
            });
            this.form.home_image = arrImg.join(',')
            var form4 = _.clone(this.form)
            // form4.channel = form4.channel.join(',')
            if(!form4.share_image){
              form4.share_image = form4.share_img;
            }
            if (form4.type == 0) {
                delete form4.act_special_imgs
                form4.ac_id = 0
                form4.activity_name = ''
            } else if (form4.type == 1) {
                delete form4.home_title
                form4.ac_id = 0
                form4.activity_name = ''
            }
            console.log(form4, 'form4')

            let newform5 = this.form5;
            console.log(newform5);
            let array1 = [];
            let array98 = [];
            let arrayall = [];
            let objectall = {};
            let id1 = "";
            let id98 = "";
            if (newform5[0]) {
                id1 = newform5[0].id
            }
            if (newform5[1]) {
                id98 = newform5[1].id
            }
            newform5.list.map(res => {
                if (!res.productId) {
                    array1.push(res);
                    objectall = {
                        channel: 1,
                        list: array1,
                        id: id1
                    }
                } else {
                    array98.push(res);
                    objectall = {
                        channel: 98,
                        list: array98,
                        id: id98
                    }
                }
                arrayall.push(objectall);
            });
            console.log("-----------------")
            console.log(arrayall);
            console.log("-----------------")
            let new1 = 0,
                new2 = 0,
                arrayall2 = [];
            arrayall.map((res, index) => {
                if (res.channel == 1) {
                    if (new1 == 0) {
                        arrayall2.push(res);
                        new1++;
                    }

                } else {
                    if (new2 == 0) {
                        arrayall2.push(res);
                        new2++;
                    }

                }
            })

            let data = {
                name: this.active_form.name,
                template: [1, 2, 3, 4, 5],
                banner: this.istemplate.indexOf(1) == -1 ? {} : this.form1,
                bannerList: this.istemplate.indexOf(2) == -1 ? {} : this.form2,
                bannerCoupon: this.istemplate.indexOf(3) == -1 ? {} : this.form3,
                purchase: this.istemplate.indexOf(4) == -1 ? {} : form4,
                // channel: this.istemplate.indexOf(5) == -1 ? {} : this.form5
                channel: arrayall2
            }

            console.log(data, this.istemplate.indexOf(0))
            console.log(this.form4, this.istemplate.indexOf(2), this.istemplate)
            // console.log(this.form2.info)
            if (this.$route.query.id) {
                data.id = this.$route.query.id
                updateCouponInfo(data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                        })
                        this.$router.push('/operate/vouchers')
                    } else {
                        this.$message({
                            message: res.data.msg || '添加失败',
                            type: 'error',
                        })
                    }
                })
            } else {
                tepaddConfig(data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                        })
                        this.$router.push('/operate/vouchers')
                    } else {
                        this.$message({
                            message: res.data.msg || '添加失败',
                            type: 'error',
                        })
                    }
                })
            }

        },
        // 选择推广渠道
        handleCheckedCitiesChange() {

        },
        // 删除
        delItem(item, dataList, idx) {
            if (item.id) {
                deleteSeckillIGood({
                    id: item.id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功"
                        })
                        dataList.splice(idx, 1)
                    }
                })
            } else {
                dataList.splice(idx, 1)
            }

        },
        // 推广渠道
        getTabChannels() {
            getTabChannels().then(res => {
                console.log(res)
                this.cities = res.data;
            })
        },
        getChannelList() {
            getChannelList().then((res) => {
                if (res.data.code == 200) {
                    this.channelList = res.data.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        // 回显
        getList(cid) {
            let _this = this;
            var obj = {
                id: cid
            }
            updateCouponCollectionCenter(obj).then((res) => {
                if (res.data.code == 200) {
                    this.active_form.name = res.data.data.name
                    if (res.data.data.banner.length == 0) {
                        this.mb1 = false
                    } else {
                        this.istemplate.push(1)
                        this.mb1 = true
                        this.form1 = res.data.data.banner
                        if (res.data.data.banner.activity_id == '') {
                            this.form1.active_radio = 2
                        } else {
                            this.form1.active_radio = 1
                        }
                        // this.dialogImageUrl = res.data.data.banner.image
                        this.quan_list = res.data.data.banner.list
                        console.log(this.quan_list, 'res.data.data.banner.list', res.data.data.banner.list)
                    }
                    if (res.data.data.bannerList.info.length == 0) {
                        this.mb2 = false
                    } else {
                        this.mb2 = true
                        this.istemplate.push(2)
                        res.data.data.bannerList.info.map((item, index) => {
                            // console.log(item.link, index)
                            if (item.link == '') {
                                res.data.data.bannerList.info[index].active_radio = 1
                            } else {
                                res.data.data.bannerList.info[index].active_radio = 2
                            }
                        })
                        this.form2.info = res.data.data.bannerList.info
                        this.quan_list2 = res.data.data.bannerList.info[0].list
                        this.quan_list3 = res.data.data.bannerList.info[0].list
                        this.quan_list4 = res.data.data.bannerList.info[0].list
                    }
                    if (res.data.data.bannerCoupon.info.length == 0) {
                        this.mb3 = false
                    } else {
                        this.mb3 = true
                        this.istemplate.push(3)
                        this.form3.info = res.data.data.bannerCoupon.info
                    }
                    if (res.data.data.purchase.length == 0) {
                        this.mb4 = false
                    } else {
                        this.mb4 = true
                        this.istemplate.push(4)
                        this.form = res.data.data.purchase
                        this.timeArray = [res.data.data.purchase.start_time, res.data.data.purchase.end_time]
                        this.quan_list6 = res.data.data.purchase.list
                        // this.form.channel = (res.data.data.purchase.channel).split(',')
                        var pop_channels = res.data.data.purchase.channel;
                        let arr = [];
                        console.log(pop_channels, 'hahhahahah')
                        pop_channels.map(item => {
                            arr.push(parseInt(item.id))
                        })
                        this.form.channel = arr;
                        console.log(this.form.channel, 'kjhkjhj')
                    }
                    if (res.data.data.channel.list.length == 0) {
                        this.mb5 = false
                    } else {
                        this.mb5 = true

                        this.istemplate.push(5)
                        this.form5 = res.data.data.channel
                        this.quan_list7 = res.data.data.channel.list
                        console.log(this.form5, ' this.form5')
                    }

                }
            }).catch((error) => {
                console.log(error)
            })
        },
        onSubmit() {
            var self = this
            if (self.form.share_title == '') {
                self.$message({
                    type: "error",
                    message: '请输入分享标题'
                })
                return false;
            } else if (self.form.share_img == '') {
                self.$message({
                    type: "error",
                    message: '请选择分享封面'
                })
                return false;
            } else if (self.form.type == 0) {
                if (self.form.home_title == '') {
                    self.$message({
                        type: "error",
                        message: '请填写首页标题'
                    })
                    return false;
                }

            } else if (self.form.type == 1) {
                if (self.form.act_special_imgs == '') {
                    self.$message({
                        type: "error",
                        message: '请选择活动专题图'
                    })
                    return false;
                }

            }
            if (self.timeArray != null && self.timeArray.length > 0) {
                self.form.start_time = self.timeArray[0];
                self.form.end_time = self.timeArray[1];
            }
            if (!self.form.share_img) {
                self.form.share_img = self.form.goods_img
            }
            let arrImg = [];
            this.fileList.map(item => {
                arrImg.push(item.url)
            });
            this.form.home_image = arrImg.join(',')
            if (this.$route.query.id) {
                var data = _.clone(this.form)
                data.channel = data.channel.join(',')
                if (data.type == 0) {
                    delete data.act_special_imgs
                    data.ac_id = 0
                    data.activity_name = ''
                } else if (data.type == 1) {
                    delete data.home_title
                    data.ac_id = 0
                    data.activity_name = ''
                }
                updateSeckill(data).then(res => {
                    if (res.data.code == 200) {
                        self.$message({
                            message: '修改成功',
                            type: 'success',
                        })
                        self.$router.push('/operate/spikeList')
                    } else {
                        self.$message({
                            message: res.data.msg || '修改失败',
                            type: 'error',
                        })
                    }

                })
            } else {
                var data = _.clone(this.form)
                data.channel = data.channel.join(',')
                if (data.type == 0) {
                    delete data.act_special_imgs
                    data.ac_id = 0
                    data.activity_name = ''
                } else if (data.type == 1) {
                    delete data.home_title
                    data.ac_id = 0
                    data.activity_name = ''
                }
                addSeckill(data).then(res => {
                    if (res.data.code == 200) {
                        self.$message({
                            message: '添加成功',
                            type: 'success',
                        })
                        self.$router.push('/operate/spikeList')
                    } else {
                        self.$message({
                            message: res.data.msg || '添加失败',
                            type: 'error',
                        })
                    }
                })
            }
        },
        yhqType() {
            yhqType().then(res => {
                this.tep3_option = res.data.data
                console.log(this.tep3_option)
            })
        },
        radioChange: function (val) {
            this.currentPage = 1;
            this.radioChannel = val;
            this.list = [];
            this.getTabGoods(1)
        },
        // 选择商品
        choseId(item) {
            // var goodsInfo = this.form.goods_info;
            // var idx = this.form.goods_info.length;
            var obj = {
                sk_price: '', //活动价格
                goods_stock: '', //活动库存
                buy_limit: '', //限购数量
                sort: '', //排序
                act_id: '',
                buy_limit: '',
                goods_id: '',
                goods_img: '',
                goods_name: '',
                id: '',
                price: '',
                sku_id: '',
                sort: '',
                inventory: '',
                goods_desc: '',
            };
            obj.sku_id = item.sku_id;
            obj.goods_img = item.path;
            obj.goods_name = item.goods_name;
            obj.goods_id = item.id || '';
            // obj.id = item.id || '';
            obj.act_id = this.$route.query.id || '';
            obj.price = item.origin_price;
            obj.buy_price = item.buy_price;
            obj.vip_price = item.vip_price;
            obj.inventory = item.inventory;
            obj.goods_stock = item.goods_stock;
            obj.goods_desc = '';

        },
        // 选择活动
        activeId(item) {
            this.form.ac_id = item.id; //官网价
            this.form.activity_name = item.activity_name; //官网价
            this.dialogtbVisible = false
        },
        //获取商品分页
        handleCurrentChange(val) {
            this.getTabGoods(val)
        },
        // 获取商品
        getTabGoods(page) {
            let _this = this;
            this.page = page
            let data = {
                page: this.page,
                channel_id: this.radioChannel
            }
            if (this.searchVal) {
                data['goods_name'] = this.searchVal
            }

            tabGoods(data).then((res) => {
                if (res.data.code == 200) {
                    _this.list = res.data.data
                    _this.total = res.data.count
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        //获取活动分页
        handleActiveChange(val) {
            this.getActivities(val)
        },
        //获取模版一活动分页、
        active_tep1_Id(item) {
            let li = {}
            console.log(this.mb5, this.form5.channel, 'sfsdfsdfsdf')
            if (this.mb5 && this.form5.channel == 98 && this.is_num == 7) {

                li = {
                    productId: item.productId,
                    name: item.productName,
                    couponFee: item.couponFee,
                    productImage: item.productImage
                }

            } else {
                li = {
                    id: item.id,
                    name: item.name
                }
            }
            console.log(li, 'didididiididid', this.is_num)
            this.tep1 = false
            if (this.is_num == 1) {
                this.quan_list.push(li)
            }
            //form2.info
            if (this.is_num == 2) {
                this.quan_list2.push(li)
            }
            if (this.is_num == 3) {
                this.quan_list3.push(li)
            }
            if (this.is_num == 4) {
                this.quan_list4.push(li)
            }
            if (this.is_num == 6) {
                this.quan_list6.push(li)
            }
            if (this.is_num == 7) {
                this.quan_list7.push(li)
                console.log(this.quan_list7, 'dadadada')
            }
        },
        onSubmit_tep1() {
            this.searchCondition.curPage = 1
            this.get_tep1_Activities(1)
        },
        handleSizeChange(val) {
            this.searchCondition.pageSize = val
            this.get_tep1_Activities()
        },
        handleActiveChange_tep1(val) {
            this.get_tep1_Activities(val)
        },
        // 获取活动
        getActivities(page) {
            let _this = this;
            let data = {}
            data.page = page
            if (this.searchVal) {
                data.keyword = this.searchVal
            }
            getActivities(data).then((res) => {
                if (res.data.code == 200) {
                    _this.activelist = res.data.data
                    _this.total = res.data.count
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        // 优惠券模版一 获取
        get_tep1_Activities(page, index) {
            let _this = this;
            if (_this.form5.channel != 1 && index == 7) {
                // alert('c p s s')

                _this.cspList.page = page
                _this.cspList.channelId = _this.form5.channel
                yhqTep5(this.cspList).then((res) => {
                    if (res.data.code == 200) {
                        // alert(res.data.data.doc.length)
                        if (res.data.data.doc.length == 0) {
                            _this.$message({
                                message: '暂无商品',
                                type: 'error',
                            })
                            _this.tep1 = false
                        } else {
                            console.log(7)
                            _this.activelist_tep1 = res.data.data.doc
                            console.log(res.data.data.doc, 'hahhaha')
                            _this.total = res.data.data.count

                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })

            } else {
                // alert('正常')
                _this.searchCondition.page = page
                yhqTep1(this.searchCondition).then((res) => {
                    if (res.data.code == 200) {
                        _this.activelist_tep1 = res.data.data.list
                        _this.total = res.data.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt = file.size / 1024 < 100;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt) {
                this.$message.error('上传头像图片大小不能超过 100K!');
            }
            return isJPG && isLt;
        },
        beforeAvatarUpload2(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt = file.size / 1024 < 500;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt) {
                this.$message.error('上传头像图片大小不能超过 500K!');
            }
            return isJPG && isLt;
        },
        handlePictureCardPreview(file, fileList) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //图片警告不能上传多张
        handleOnExceed(file, fileList) {
            this.$message({
                type: "error",
                message: "最多上传1张图片"
            })
        },
        handleAvatarSuccess(res, file) {
            this.img4_share = false
            this.form.share_img = file.response.url;
        },
        //上传成功 模版一
        handleAvatarSuccess_tep1(res, file, fileList) {
            this.img1 = false
            fileList.map(item => {
                console.log(item, '模版一模版一模版一模版一')
                if (item.response) {
                    this.form1.image = item.response.url
                } else {
                    this.form1.image = item.url
                }

            })
        },
        //上传成功 模版二-1
        handleAvatarSuccess_tep2_1(res, file, fileList) {
            this.img2_1 = false
            fileList.map(item => {
                if (item.response) {
                    this.form2.info[0].image = item.response.url
                } else {
                    this.form2.info[0].image = item.url
                }

            })
        },
        //上传成功 模版二-2
        handleAvatarSuccess_tep2_2(res, file, fileList) {
            this.img2_2 = false
            fileList.map(item => {
                if (item.response) {
                    this.form2.info[1].image = item.response.url
                } else {
                    this.form2.info[1].image = item.url
                }

            })
        },
        //上传成功 模版二-3
        handleAvatarSuccess_tep2_3(res, file, fileList) {
            this.img2_3 = false
            fileList.map(item => {
                if (item.response) {
                    this.form2.info[2].image = item.response.url
                } else {
                    this.form2.info[2].image = item.url
                }

            })
        },
        //上传成功 模版三
        handleAvatarSuccess_tep3_1(res, file, fileList) {
            this.img3_1 = false
            fileList.map(item => {
                if (item.response) {
                    this.form3.info[0].image = item.response.url
                } else {
                    this.form3.info[0].image = item.url
                }

            })
        },
        handleAvatarSuccess_tep3_2(res, file, fileList) {
            this.img3_2 = false
            fileList.map(item => {
                if (item.response) {
                    this.form3.info[1].image = item.response.url
                } else {
                    this.form3.info[1].image = item.url
                }

            })
        },
        //上传成功 模版四
        handleAvatarSuccess1(res, file, fileList) {
            let arrList = [];
            this.img4 = false
            fileList.map(item => {
                console.log(item, 'itemitem')
                if (item.response) {
                    arrList.push({
                        name: 'item',
                        url: item.response.url
                    })
                } else {
                    arrList.push({
                        name: 'item',
                        url: item.url
                    })
                }

            })
            this.fileList = arrList;
        },
        handleAvatarSuccess2(res, file) {
            this.form.act_special_imgs = file.response.url
        },

        handleAvatarSuccess3(res, file) {
            this.form.community_poster_img = file.response.url
        },

        handleAvatarSuccessGoods(res, file, fileList, index) {
            // this.form.goods_info[index].goods_img = file.response.url;
            // console.log(index);
            // console.log(res);
            // console.log(file);
            // console.log(fileList);
        },

        uploadSuccessAll3(res) {
            // this.form.goods_info = res.data;

            // if (this.$route.query.id) {
            //   var act_id = this.$route.query.id;
            //   this.form.goods_info.forEach(function (val, index) {
            //     val.act_id = act_id

            //   });
            // }
        },

    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 10px;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

/deep/ .el-input__inner {
    width: 400px;
}

.ipt_list input {
    width: 125px;
    padding-left: 5px;
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    margin-top: 7px;
}

.gropAdd {
    margin: 20px;
    box-sizing: border-box;
    padding: 20px;
}

.input-common {
    width: 450px;
    display: flex;
    justify-content: space-between;

    .input-name {
        width: 250px;
    }

    .s1 {
        margin-bottom: 5px;
        overflow: hidden;

        .s2 {
            margin-right: 5px;
            display: inline-block;
        }
    }

    .input-div {
        color: #999;
        padding-left: 5px;
        width: 200px;
    }
}

.bargain_mode {
    display: block;
    overflow: hidden;
}

.avatar-uploader {
    /*float: left;*/
    /*height: 96px;*/
    border-radius: 5px;
    margin-left: 10px;
}

// .el-form-item__content .avatar-uploader {
// 	float: none
// }

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 10px;
}

ul,
li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.yhq_box {
    display: flex;
    flex-direction: row;
}

.quan {
    max-width: 600px;
    margin-left: 200px;

    p {
        width: 100%;
        line-height: 30px;
        padding: 10px;
        background: #ececec;
    }

    span {
        margin: 10px;
    }

    em {
        float: right;
        font-style: normal;
    }
}

.el-radio {
    margin-right: 0;
}

.col {
    color: red;
    padding-left: 50px;
    font-size: 12px;
}

.commodity {
    li {
        overflow: hidden;
        box-sizing: border-box;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        margin-bottom: 5px;
    }

    .imgDiv {
        float: left;
        background: #f1f1f1;
        width: 90px;
        height: 90px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .section-p {
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

    /deep/ .del_item .el-button--danger.is-plain {
        margin-top: 24px;
        border-radius: 100%;
        padding: 0;
        width: 50px;
        height: 50px;
    }
}
</style>
