<!--suppress ALL -->
<template>
	<div class="app-container">

		<div class="new_tab">
			<el-form ref="form" :model="baseInfo" label-width="120px" class='list_border'>
				<el-form-item label="综合活动名称" class="background_color">
					<el-input v-model="baseInfo.aa_name" placeholder="请输入综合活动名称" style="width: 90%;"></el-input>
				</el-form-item>
				<el-form-item label="选择类型" class="background_color">
					<el-radio v-model="baseInfo.aa_type" :label="0" disabled>默认</el-radio>
					<el-radio v-model="baseInfo.aa_type" :label="1" disabled>首页</el-radio>
					<el-radio v-model="baseInfo.aa_type" :label="2" disabled>广告图</el-radio>
					<el-radio v-model="baseInfo.aa_type" :label="3" disabled>秒杀广告图</el-radio>
					<el-radio v-model="baseInfo.aa_type" :label="4" disabled>二级页面</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="upBaseInfo">保存数据</el-button>
				</el-form-item>
			</el-form>
			<div>
				<el-form ref="form" label-width="120px" class="list_border">
					<el-row style="height:130px;display: flex;align-items: center;" class="radio-list">
						<el-col :span="4" style="margin-left:10px">模板信息</el-col>
						<el-radio v-model="temType" :label="1">单张模板
							<img v-if='temType ===1' src="https://image.yuelvhui.com/pubfile/2019/10/28/line_1572275825_91279.png" alt="">
							<img v-else src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572278438_38530.png" alt="">
						</el-radio>
						<el-radio v-model="temType" :label="2">三张模板
							<img v-if="temType===2" src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572279691_73072.png" alt="">
							<img  v-else src="https://image.yuelvhui.com/pubfile/2019/10/28/line_1572276296_31871.png" alt="">
						</el-radio>
						<el-radio v-model="temType" :label="3">多张滑动模板
							<img v-if="temType===3" src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572279783_42672.png" alt="">
							<img  v-else src="https://image.yuelvhui.com/pubfile/2019/10/28/line_1572276387_29165.png" alt="">
						</el-radio>
						<el-radio v-model="temType" :label="4">五张模板
							<img v-if="temType===4" src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572279731_23490.png" alt="">
							<img  v-else src="https://image.yuelvhui.com/pubfile/2019/10/28/line_1572276335_33151.png" alt="">

						</el-radio>
						<el-radio v-model="temType" :label="5">四张模板
							<img v-if="temType===5" src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572279815_55113.png" alt="">
							<img  v-else src="https://image.yuelvhui.com/pubfile/2019/10/28/line_1572276382_65252.png" alt="">
						</el-radio>
						<el-radio v-model="temType" :label="7">多张模板
							<img v-if="temType===7" src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572337212_45025.png" alt="">
							<img  v-else src="https://image.yuelvhui.com/pubfile/2019/10/29/line_1572337280_54931.png" alt="">
						</el-radio>
						<el-button type="primary" plain class="" @click="addTem">添加模板</el-button>
					</el-row>
					<el-form-item v-for="(item,index) in templateInfo" :key="index" class="list_border" style="width:900px;margin-left:5px;min-height:200px;">
						<div v-if="item.tem_type==1">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="tem_span">下边距：{{item.tem_down_height}}</span>
							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div >宽：{{item1.ae_width}}</div>
								<div>高：{{item1.ae_height}}</div>
								<div>
									主图：
									<img :src="item1.ae_img" style="width:100px;height:100px;">
								</div>
								<div>
									产品：
									<span v-if="item1.ae_type==3">商品详情</span>
									<span v-if="item1.ae_type==5">会员权益</span>
									<span v-if="item1.ae_type==31">秒杀</span>
									<span v-if="item1.ae_type==29">H5跳转链接</span>
									<span v-if="item1.ae_type==111">RN跳转链接</span>
									<span v-if="item1.ae_type==32">砍价</span>
									<span v-if="item1.ae_type==33">限时半价</span>
									<span v-if="item1.ae_type==34">拼团</span>
									<span v-if="item1.ae_type==39">新活动列表</span>
									<span v-if="item1.ae_type==40">优券专题</span>
									<span v-if="item1.ae_type==41">优券详情</span>
								</div>
							</div>
						</div>

						<el-row v-if="item.tem_type==2">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="el-col el-col-4">下边距：{{item.tem_down_height}}</span>
							<span class="tem_span">高：{{item.tem_bgimg_height}}</span>

							<div>
								背景图：
								<img :src="item.tem_bgimg" style="width:100px;height:100px;">
							</div>
							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									产品：
									<span v-if="item1.ae_type==3">商品详情</span>
									<span v-if="item1.ae_type==5">会员权益</span>
									<span v-if="item1.ae_type==31">秒杀</span>
									<span v-if="item1.ae_type==32">砍价</span>
									<span v-if="item1.ae_type==29">H5跳转链接</span>
									<span v-if="item1.ae_type==111">RN跳转链接</span>
									<span v-if="item1.ae_type==33">限时半价</span>
									<span v-if="item1.ae_type==34">拼团</span>
									<span v-if="item1.ae_type==39">新活动列表</span>
									<span v-if="item1.ae_type==40">优券专题</span>
									<span v-if="item1.ae_type==41">优券详情</span>
									<img :src="item1.ae_img" style="width:100px;height:100px;">
								</div>
							</div>


						</el-row>
						<el-row v-if="item.tem_type==3">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="tem_span">下边距：{{item.tem_down_height}}</span>

							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									产品：
									<span v-if="item1.ae_type==3">商品详情</span>
									<span v-if="item1.ae_type==5">会员权益</span>
									<span v-if="item1.ae_type==31">秒杀</span>
									<span v-if="item1.ae_type==32">砍价</span>
									<span v-if="item1.ae_type==29">H5跳转链接</span>
									<span v-if="item1.ae_type==111">RN跳转链接</span>
									<span v-if="item1.ae_type==33">限时半价</span>
									<span v-if="item1.ae_type==34">拼团</span>
									<span v-if="item1.ae_type==39">新活动列表</span>
									<span v-if="item1.ae_type==40">优券专题</span>
									<span v-if="item1.ae_type==41">优券详情</span>
									<span v-if="item1.ae_type==49">品牌</span>
								</div>
							</div>
						</el-row>

						<el-row v-if="item.tem_type==4">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="tem_span">下边距：{{item.tem_down_height}}</span>

							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									<div class='typewidth'>产品：
									</div>

									<div class='typewidth' v-if="item1.ae_type==3">商品详情</div>
									<div class='typewidth' v-if="item1.ae_type==5">会员权益</div>
									<div class='typewidth' v-if="item1.ae_type==29">H5跳转链接</div>
									<div class='typewidth' v-if="item1.ae_type==111">RN跳转链接</div>
									<!-- <div class='typewidth' v-if="item1.ae_type==5">精英会员</div> -->
									<div class='typewidth' v-if="item1.ae_type==51">排行榜</div>
									<div class='typewidth' v-if="item1.ae_type==31">秒杀</div>
									<div class='typewidth' v-if="item1.ae_type==32">砍价</div>
									<div class='typewidth' v-if="item1.ae_type==33">限时半价</div>
									<div class='typewidth' v-if="item1.ae_type==34">拼团</div>
									<div class='typewidth' v-if="item1.ae_type==39">新活动列表</div>
									<div class='typewidth' v-if="item1.ae_type==40">优券专题</div>
									<div class='typewidth' v-if="item1.ae_type==41">优券详情</div>
									<img :src="item1.ae_img" style="width:100px;height:100px;">
								</div>
							</div>
						</el-row>
						<el-row v-if="item.tem_type==5">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="tem_span">下边距：{{item.tem_down_height}}</span>

							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									<div class='typewidth'>产品：
									</div>

									<div class='typewidth' v-if="item1.ae_type==3">商品详情</div>
									<div class='typewidth' v-if="item1.ae_type==5">会员权益</div>
									<div class='typewidth' v-if="item1.ae_type==29">H5跳转链接</div>
									<div class='typewidth' v-if="item1.ae_type==111">RN跳转链接</div>
									<div class='typewidth' v-if="item1.ae_type==51">排行榜</div>
									<div class='typewidth' v-if="item1.ae_type==31">秒杀</div>
									<div class='typewidth' v-if="item1.ae_type==32">砍价</div>
									<div class='typewidth' v-if="item1.ae_type==33">限时半价</div>
									<div class='typewidth' v-if="item1.ae_type==34">拼团</div>
									<div class='typewidth' v-if="item1.ae_type==39">新活动列表</div>
									<div class='typewidth' v-if="item1.ae_type==40">优券专题</div>
									<div class='typewidth' v-if="item1.ae_type==41">优券详情</div>
									<img :src="item1.ae_img" style="width:100px;height:100px;">
								</div>
							</div>
						</el-row>

						<el-row v-if="item.tem_type==6">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="tem_span">下边距：{{item.tem_down_height}}</span>

							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									产品：
									<span v-if="item1.ae_type==3">商品详情</span>
									<span v-if="item1.ae_type==5">会员权益</span>
									<span v-if="item1.ae_type==31">秒杀</span>
									<span v-if="item1.ae_type==32">砍价</span>
									<span v-if="item1.ae_type==29">H5跳转链接</span>
									<span v-if="item1.ae_type==111">RN跳转链接</span>
									<span v-if="item1.ae_type==33">限时半价</span>
									<span v-if="item1.ae_type==34">拼团</span>
									<span v-if="item1.ae_type==39">新活动列表</span>
									<span v-if="item1.ae_type==40">优券专题</span>
									<span v-if="item1.ae_type==41">优券详情</span>
									<span v-if="item1.ae_type==49">品牌</span>
								</div>
							</div>
						</el-row>

						<el-row v-if="item.tem_type==7">
							<span class="el-col el-col-4"><b>模板：{{item.tem_type}}</b></span>
							<span class="el-col el-col-4">排序：{{item.tem_sort}}</span>
							<span class="el-col el-col-4">上边距：{{item.tem_top_height}}</span>
							<span class="el-col el-col-4">下边距：{{item.tem_down_height}}</span>
							<span class="tem_span">高：{{item.tem_bgimg_height}}</span>

<!--							<div>-->
<!--								背景图：-->
<!--								<img :src="item.tem_bgimg" style="width:100px;height:100px;">-->
<!--							</div>-->
							<div v-for="(item1,index1) in item.actityList" :key="index1">
								<div>
									产品：
									<span v-if="item1.ae_type==3">商品详情</span>
									<span v-if="item1.ae_type==5">会员权益</span>
									<span v-if="item1.ae_type==31">秒杀</span>
									<span v-if="item1.ae_type==32">砍价</span>
									<span v-if="item1.ae_type==29">H5跳转链接</span>
									<span v-if="item1.ae_type==111">RN跳转链接</span>
									<span v-if="item1.ae_type==33">限时半价</span>
									<span v-if="item1.ae_type==34">拼团</span>
									<span v-if="item1.ae_type==39">新活动列表</span>
									<span v-if="item1.ae_type==40">优券专题</span>
									<span v-if="item1.ae_type==41">优券详情</span>
									<img :src="item1.ae_img" style="width:100px;height:100px;">
								</div>
							</div>


						</el-row>


						<span>
							<el-button type="primary" @click="selecShop(item)" plain class="select_shop">编辑模板</el-button>
							<el-button type="danger" plain class="del_moudle" @click="delMoudle(item)">删除模板</el-button>
							<el-button type="info" v-if="item.status=='显示'" plain class="updateBtn" @click="updateTemplate(item,0)">下架</el-button>
							<el-button type="success" v-else plain class="updateBtn"  @click="updateTemplate(item,1)">上架</el-button>
						</span>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<el-dialog width="800px" title="内容" :visible.sync="dialogTableVisible">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择">
					<el-input v-model="searchVal" placeholder="请输入搜索内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getTabGoods(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId(item,product)" v-for="(item,index) in list" :key="index">
						<div class="section-p" v-if="product==39">
							<div>活动标题：{{item.activity_name}}</div>
							<div>分享标题：{{item.share_title}}</div>
						</div>
						<div v-if="product==3">
							<div class="imgDiv" >
								<img :src="item.path" alt="">
							</div>
							<div class="section-p">
								<p v-text="item.goods_name"></p>
								<div>
									<span>官网价：￥{{item.origin_price}}</span>
									<span>库存：{{item.inventory}}</span>
								</div>
							</div>
						</div>
						<div v-if="product==40">
							<div class="imgDiv">
								<img :src="item.ac_imgs" alt="">
							</div>
							<div class="section-p">
								<p v-text="item.ac_name"></p>
								<div>
									<span>分享标题：{{item.share_title}}</span>
									<span>颜色：{{item.ac_color}}</span>
								</div>
							</div>
						</div>
						<div v-if="product==41||product==44">
							<div class="section-p">
								<span>名称：{{item.name}}</span>
							</div>
						</div>

						<div v-if="product==49">
							<div class="section-p">
								<span>名称：{{item.name}}</span>
							</div>
						</div>
						<div v-if="product==5">
							<div class="section-p">
								<span>名称：{{item.name}}</span>
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

		<el-dialog width="800px" title="跳转链接" :visible.sync="dialogTableVisible_h5">
			<el-form>
				<el-form-item label="链接地址" label-width="120px">
					<el-input v-model="URL"  autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible_h5 = false">取 消</el-button>
				<el-button type="primary" @click="choseId">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 模板1 -->
		<el-dialog width="70%" title="模板1" :visible.sync="dialogTemplate1" @close="closeBox">
			<el-form :model="template1"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template1.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template1.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template1.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
				<div v-for="(item1,index1) in template1.actityList" :key="index1">
					<el-form-item label="宽" class="background_color" style="width: 530px;">
						<el-input prop="template1.ext.ae_width"  v-model="item1.ae_width" placeholder="宽"></el-input>
					</el-form-item>
					<el-form-item label="高" class="background_color" style="width: 530px;">
						<el-input  v-model="item1.ae_height" placeholder="高"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem1" :before-upload="beforeAvatarUpload1">
								<span v-for="(item1,index1) in template1.actityList" :key="index1">
									<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar"  style="width:200px;height:100px;">
								</span>
							<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType()">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseList" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplate1 = false">取 消</el-button>
				<el-button type="primary" @click="update1">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板1 -->



		<!-- 模板2 -->
		<el-dialog width="70%" title="模板2" :visible.sync="dialogTemplate2" @close="closeBox">
			<el-form :model="template2"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template2.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template2.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template2.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>

				<el-form-item label="高" class="background_color" style="width: 530px;">
					<el-input v-model="template2.tem_bgimg_height" placeholder="高"></el-input>
				</el-form-item>

				<el-form-item label="模板背景" class="background_color" style="width: 530px;">
					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
							   :on-success="handleAvatarSuccessshareTem2Bg" :before-upload="beforeAvatarUpload1">
						<img v-if="template2.tem_bgimg" :src="template2.tem_bgimg" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
						<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>
					</el-upload>
				</el-form-item>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img1" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img1" :src="tem2.ae_img1" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(1,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List1" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.ac_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img2" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img2" :src="tem2.ae_img2" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(2,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List2" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img3" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img3" :src="tem2.ae_img3" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(3,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List3" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplate2 = false">取 消</el-button>
				<el-button type="primary" @click="update2">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板2 -->

		<!-- 模板3 -->
		<el-dialog width="70%" title="模板3" :visible.sync="dialogTemplate3" @close="closeBox">
			<el-form :model="template3"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
				<el-form-item label="选择产品" class="background_color" style="width: 530px;">
					<el-select v-model="product" @change="selecType()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
					</el-select>
				</el-form-item>
				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li  style="border:none;display: flex;align-items: center;justify-content: space-between;width: 90%;"v-for="(item,index) in choseList" :key="index" class="selectName">
									<div>
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<span v-if="item.brandName">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
												   :on-success="(response, file, fileList)=>handleAvatarSuccessGoods(response, file, fileList,index)"
										>
											<i class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>

										<div class="imgDiv">
											<img :src="item.ae_img" alt="">
										</div>
									</span>

										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.brandName">品牌名称：{{item.brandName}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</div>
									<el-button style="height: 40px;" type="danger" @click="delTemExtInfo(item.id,index)">删 除</el-button>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplate3 = false">取 消</el-button>
				<el-button type="primary" @click="update3">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板3 -->


		<!-- 模板4 -->
		<el-dialog width="70%" title="模板4" :visible.sync="dialogTemplate4" @close="closeBox">
			<el-form :model="template4"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template4.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template4.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template4.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>


				<div v-for="(item1,index1) in template4.actityList" :key="index1">
					<el-row v-if="item1.ae_type==51">
						<el-col :span="4"><p>排行榜</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<el-row v-if="item1.ae_type==34">
						<el-col :span="4"><p>拼团</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<el-row v-if="item1.ae_type==33">
						<el-col :span="4"><p>限时半价</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<!-- <el-row v-if="item1.ae_type==32">
						<el-col :span="4"><p>砍价</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
									:on-success="(response, file, fileList)=>handleAvatarTem4_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row> -->

					<!-- 类型：3商品详情，31秒杀，32砍价，33限时半价，34拼团，39,新活动列表，40优券专题，41优券详情' -->

				</div>


				<el-row v-if="template4.tem4">
					<el-col :span="4"><p>新活动列表</p></el-col>
					<el-col :span="20">
						<el-row>
							<el-col :span="4">
								<p style="display:flex;width:500px;display: flex;align-items:center;justify-content: flex-start;margin-top:3px">
									<span>排序：</span>
									<el-input v-model="template4.tem4.tem4_1.ae_sort" placeholder="排序" type="number" style="width:80px"></el-input>
								</p>
							</el-col>
							<!-- <el-col :span="4"><p>排序：{{template4.tem4.tem4_1.ae_sort}}</p></el-col> -->
						</el-row>
						<el-row>
							<el-col :span="4"><p>首页展示图</p></el-col>
							<el-col :span="20">
								<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										   :on-success="(response, file, fileList)=>handleAvatarTem4_act_1(response, file, fileList,1)" :before-upload="beforeAvatarUpload1">
									<img v-if="template4.tem4.tem4_1.ae_img" :src="template4.tem4.tem4_1.ae_img" class="avatar2">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>尺寸:750*770,300kb以内</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><el-button plain @click="selecType(99,4)">选择活动</el-button></el-col>
						</el-row>
						<el-row>
							<!-- 模板4结果 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none;margin-left:-50px;width:400px" v-for="(item,index) in tp4List" :key="index" class="selectName">
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row v-if="template4.tem4">
					<el-col :span="4"><p>新活动列表</p></el-col>
					<el-col :span="20">
						<el-row>
							<el-col :span="4">
								<p style="display:flex;width:500px;display: flex;align-items:center;justify-content: flex-start;margin-top:3px">
									<span>排序：</span>
									<el-input v-model="template4.tem4.tem4_2.ae_sort" placeholder="排序" type="number" style="width:80px"></el-input>
								</p>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>首页展示图</p></el-col>
							<el-col :span="20">
								<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										   :on-success="(response, file, fileList)=>handleAvatarTem4_act_1(response, file, fileList,2)" :before-upload="beforeAvatarUpload1">
									<img v-if="template4.tem4.tem4_2.ae_img" :src="template4.tem4.tem4_2.ae_img" class="avatar2">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>尺寸:750*770,300kb以内</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><el-button plain @click="selecType(99,5)">选择活动</el-button></el-col>
						</el-row>
						<el-row>
							<!-- 模板4结果 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none;margin-left:-50px;width:400px" v-for="(item,index) in tp5List" :key="index" class="selectName">
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplate4 = false">取 消</el-button>
				<el-button type="primary" @click="update4">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板4 -->

		<!-- 模板7 -->
		<el-dialog width="70%" title="模板7" :visible.sync="dialogTemplate7" @close="closeBox">
			<el-form :model="template7"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template7.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template7.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template7.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
<!--				<el-form-item label="高" class="background_color" style="width: 530px;">-->
<!--					<el-input v-model="template7.tem_bgimg_height" placeholder="高"></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="模板背景" class="background_color" style="width: 530px;">-->
<!--					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"-->
<!--							   :on-success="handleAvatarSuccessshareTem7Bg" :before-upload="beforeAvatarUpload1">-->
<!--						<img v-if="template7.tem_bgimg" :src="template7.tem_bgimg" class="avatar"  style="width:100px;height:100px;pardding-left:40px">-->
<!--						<i class="el-icon-plus avatar-uploader-icon" style="margin-top:-100px"></i>-->
<!--					</el-upload>-->
<!--				</el-form-item>-->

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img1" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img1" :src="tem7.ae_img1" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品1" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(1,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List1" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img2" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img2" :src="tem7.ae_img2" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品2" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(2,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List2" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img3" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img3" :src="tem7.ae_img3" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品3" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(3,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List3" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img4" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img4" :src="tem7.ae_img4" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品4" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(4,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List4" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img5" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img5" :src="tem7.ae_img5" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品5" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(5,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List5" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img6" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img6" :src="tem7.ae_img6" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品6" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(6,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List6" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<!--				产品7-->
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img7" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img7" :src="tem7.ae_img7" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品7" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(7,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List7" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img8" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img8" :src="tem7.ae_img8" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品8" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(8,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List8" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img9" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img9" :src="tem7.ae_img9" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品9" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(9,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List9" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img10" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img10" :src="tem7.ae_img10" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品10" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(10,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List10" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img11" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img11" :src="tem7.ae_img11" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品11" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(11,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List11" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplate7 = false">取 消</el-button>
				<el-button type="primary" @click="update7">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 模板7 -->
<!--		&lt;!&ndash; 模板6 &ndash;&gt;-->
<!--		<el-dialog title="模板3" :visible.sync="dialogTemplate6" @close="closeBox">-->
<!--			<el-form :model="template6"  label-width="120px">-->
<!--				<el-form-item label="排序" class="background_color" style="width: 530px;">-->
<!--					<el-input v-model="template6.tem_sort" placeholder="排序"></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="上边距" class="background_color" style="width: 530px;">-->
<!--					<el-input v-model="template6.tem_top_height" placeholder="上边距"></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="下边距" class="background_color" style="width: 530px;">-->
<!--					<el-input v-model="template6.tem_down_height" placeholder="下边距"></el-input>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="选择产品" class="background_color" style="width: 530px;">-->
<!--					<el-select v-model="product" @change="selecType()">-->
<!--						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>-->
<!--					</el-select>-->
<!--				</el-form-item>-->
<!--				<el-row>-->
<!--					<el-col :span="24">-->
<!--						<div class="commodity">-->
<!--							<ul>-->
<!--								<li style="border:none" v-for="(item,index) in choseList" :key="index" class="selectName">-->
<!--									&lt;!&ndash; <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> &ndash;&gt;-->
<!--									<span v-if="item.brandName">-->
<!--										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"-->
<!--												   :on-success="(response, file, fileList)=>handleAvatarSuccessGoods(response, file, fileList,index)"-->
<!--										>-->
<!--											<i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--										</el-upload>-->

<!--										<div class="imgDiv">-->
<!--											<img :src="item.ae_img" alt="">-->
<!--										</div>-->
<!--									</span>-->

<!--									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>-->
<!--									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>-->
<!--									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>-->
<!--									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>-->
<!--									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>-->
<!--									<div style="margin-top:10px" v-if="item.brandName">品牌名称：{{item.brandName}}</div>-->
<!--									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>-->
<!--									<div  style="display:flex">-->
<!--										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">-->
<!--										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">-->
<!--										<div style="margin-top:10px">-->
<!--											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>-->
<!--											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>-->
<!--											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>-->
<!--											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>-->
<!--										</div>-->
<!--										<div style="margin-left:20px;margin-top:10px">-->
<!--											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>-->
<!--										</div>-->
<!--									</div>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</div>-->
<!--					</el-col>-->
<!--				</el-row>-->
<!--			</el-form>-->
<!--			<div slot="footer" class="dialog-footer">-->
<!--				<el-button @click="dialogTemplate6 = false">取 消</el-button>-->
<!--				<el-button type="primary" @click="update6">确 定</el-button>-->
<!--			</div>-->
<!--		</el-dialog>-->
<!--		&lt;!&ndash; 模板6 &ndash;&gt;-->




		<!-- 添加模板1 -->
		<el-dialog width="70%" title="模板1" :visible.sync="tem1Add" @close="closeBox">
			<el-form :model="tem1AddInfo"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="tem1AddInfo.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem1AddInfo.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem1AddInfo.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
				<div v-for="(item1,index1) in tem1AddInfo.actityList" :key="index1">
					<el-form-item label="宽" class="background_color" style="width: 530px;">
						<el-input prop="tem1AddInfo.ext.ae_width"  v-model="item1.ae_width" placeholder="宽"></el-input>
					</el-form-item>
					<el-form-item label="高" class="background_color" style="width: 530px;">
						<el-input  v-model="item1.ae_height" placeholder="高"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem1_add" :before-upload="beforeAvatarUpload1">
								<span v-for="(item1,index1) in tem1AddInfo.actityList" :key="index1">
									<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar"  style="width:200px;height:100px;">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType()">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseList" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem1Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem1">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板1 -->



		<!-- 添加模板2 -->
		<el-dialog width="70%" title="模板2" :visible.sync="tem2Add" @close="closeBox">
			<el-form :model="tem2AddInfo"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="tem2AddInfo.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem2AddInfo.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem2AddInfo.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>

				<el-form-item label="高" class="background_color" style="width: 530px;">
					<el-input v-model="tem2AddInfo.tem_bgimg_height" placeholder="高"></el-input>
				</el-form-item>

				<el-form-item label="模板背景" class="background_color" style="width: 530px;">
					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
							   :on-success="handleAvatarSuccessshareTem2Bg_add" :before-upload="beforeAvatarUpload1">
						<img v-if="tem2AddInfo.tem_bgimg" :src="tem2AddInfo.tem_bgimg" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img1" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img1" :src="tem2.ae_img1" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(1,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List1" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img2" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img2" :src="tem2.ae_img2" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(2,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List2" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem2Img3" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem2.ae_img3" :src="tem2.ae_img3" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(3,2)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem2List3" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem2Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem2">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板2 -->


		<!-- 添加模板3 -->
		<el-dialog width="70%" title="模板3" :visible.sync="tem3Add" @close="closeBox">
			<el-form :model="template3"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template3.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
				<el-form-item label="选择产品" class="background_color" style="width: 530px;">
					<el-select v-model="product" @change="selecType()">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
					</el-select>
				</el-form-item>
				<el-row>
					<el-col :span="24">
						<div class="commodity" >
							<ul>
								<li style="border:none;display: flex;align-items: center;justify-content: space-between;width: 90%;" v-for="(item,index) in choseList" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div>
										<span v-if="item.brandName">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
												   :on-success="(response, file, fileList)=>handleAvatarSuccessGoods(response, file, fileList,index)"
										>
											<i class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>

										<div class="imgDiv">
											<img :src="item.ae_img" alt="">
										</div>
									</span>

										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.brandName">品牌名称：{{item.brandName}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</div>

								</li>
							</ul>

						</div>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem3Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem3">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板3 -->



		<!-- 添加模板4 -->
		<el-dialog width="70%" title="模板4" :visible.sync="tem4Add" @close="closeBox">
			<el-form :model="tem4AddInfo"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="tem4AddInfo.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem4AddInfo.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem4AddInfo.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>


				<div v-for="(item1,index1) in tem4AddInfo.actityList" :key="index1">
					<el-row v-if="item1.ae_type==51">
						<el-col :span="4"><p>排行榜</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_add_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<el-row v-if="item1.ae_type==34">
						<el-col :span="4"><p>拼团</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_add_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<el-row v-if="item1.ae_type==33">
						<el-col :span="4"><p>限时半价</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
											   :on-success="(response, file, fileList)=>handleAvatarTem4_add_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row>

					<!-- <el-row v-if="item1.ae_type==32">
						<el-col :span="4"><p>砍价</p></el-col>
						<el-col :span="20">
							<el-row>
								<el-col :span="4"><p>排序：{{item1.ae_sort}}</p></el-col>
							</el-row>
							<el-row>
								<el-col :span="4"><p>首页展示图</p></el-col>
								<el-col :span="20">
									<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
									:on-success="(response, file, fileList)=>handleAvatarTem4_add_1(response, file, fileList,index1)" :before-upload="beforeAvatarUpload1">
										<img v-if="item1.ae_img" :src="item1.ae_img" class="avatar2">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span>尺寸:750*770,300kb以内</span>
								</el-col>
							</el-row>
						</el-col>
					</el-row> -->

					<!-- 类型：3商品详情，31秒杀，32砍价，33限时半价，34拼团，39,新活动列表，40优券专题，41优券详情' -->

				</div>


				<el-row v-if="tem4AddInfo.tem4">
					<el-col :span="4"><p>新活动列表</p></el-col>
					<el-col :span="20">
						<el-row>
							<el-col :span="4">
								<p style="display:flex;width:500px;display: flex;align-items:center;justify-content: flex-start;margin-top:3px">
									<span>排序：</span>
									<el-input v-model="tem4AddInfo.tem4.tem4_1.ae_sort" placeholder="排序" type="number" style="width:80px"></el-input>
								</p>
							</el-col>
							<!-- <el-col :span="4"><p>排序：{{template4.tem4.tem4_1.ae_sort}}</p></el-col> -->
						</el-row>
						<el-row>
							<el-col :span="4"><p>首页展示图</p></el-col>
							<el-col :span="20">
								<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										   :on-success="(response, file, fileList)=>handleAvatarTem4_add_act_1(response, file, fileList,1)" :before-upload="beforeAvatarUpload1">
									<img v-if="tem4AddInfo.tem4.tem4_1.ae_img" :src="tem4AddInfo.tem4.tem4_1.ae_img" class="avatar2">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>尺寸:750*770,300kb以内</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><el-button plain @click="selecType(99,4)">选择活动</el-button></el-col>
						</el-row>
						<el-row>
							<!-- 模板4结果 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none;margin-left:-50px;width:400px" v-for="(item,index) in tp4List" :key="index" class="selectName">
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

				<el-row v-if="tem4AddInfo.tem4">
					<el-col :span="4"><p>新活动列表</p></el-col>
					<el-col :span="20">
						<el-row>
							<el-col :span="4">
								<p style="display:flex;width:500px;display: flex;align-items:center;justify-content: flex-start;margin-top:3px">
									<span>排序：</span>
									<el-input v-model="tem4AddInfo.tem4.tem4_2.ae_sort" placeholder="排序" type="number" style="width:80px"></el-input>
								</p>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>首页展示图</p></el-col>
							<el-col :span="20">
								<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										   :on-success="(response, file, fileList)=>handleAvatarTem4_add_act_1(response, file, fileList,2)" :before-upload="beforeAvatarUpload1">
									<img v-if="tem4AddInfo.tem4.tem4_2.ae_img" :src="tem4AddInfo.tem4.tem4_2.ae_img" class="avatar2">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>尺寸:750*770,300kb以内</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><el-button plain @click="selecType(99,5)">选择活动</el-button></el-col>
						</el-row>
						<el-row>
							<!-- 模板4结果 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none;margin-left:-50px;width:400px" v-for="(item,index) in tp5List" :key="index" class="selectName">
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem4Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem4">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板4 -->


		<!-- 添加模板5 -->
		<el-dialog width="70%" title="模板5" :visible.sync="tem5Add" @close="closeBox">
			<el-form :model="template5"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="template5.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="template5.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="template5.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>

				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem5_add1" :before-upload="beforeAvatarUpload1">
							<!-- <span v-for="(item1,index1) in template5.actityList[0]" :key="index1"> -->
							<img v-if="template5.actityList[0].ae_img" :src="template5.actityList[0].ae_img" class="avatar"  style="width:200px;height:100px;">
							<!-- </span> -->
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(1,5)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseTem5List1" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>


				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem5_add2" :before-upload="beforeAvatarUpload1">
							<!-- <span v-for="(item1,index1) in template5.actityList[1]" :key="index1"> -->
							<img v-if="template5.actityList[1].ae_img" :src="template5.actityList[1].ae_img" class="avatar"  style="width:200px;height:100px;">
							<!-- </span> -->
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(2,5)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseTem5List2" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>

				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem5_add3" :before-upload="beforeAvatarUpload1">
							<!-- <span v-for="(item1,index1) in template5.actityList[2]" :key="index1"> -->
							<img v-if="template5.actityList[2].ae_img" :src="template5.actityList[2].ae_img" class="avatar"  style="width:200px;height:100px;">
							<!-- </span> -->
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(3,5)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseTem5List3" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>

				<div>
					<el-form-item label="图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem5_add4" :before-upload="beforeAvatarUpload1">
							<!-- <span v-for="(item1,index1) in template5.actityList[3]" :key="index1"> -->
							<img v-if="template5.actityList[3]" :src="template5.actityList[3].ae_img" class="avatar"  style="width:200px;height:100px;">
							<!-- </span> -->
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(4,5)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>
				</div>

				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in choseTem5List4" :key="index" class="selectName">
									<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
									<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
									<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
									<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
									<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
									<div  style="display:flex">
										<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
										<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
										<div style="margin-top:10px">
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
											<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;margin-top:10px">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>




			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem5Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem5">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板5 -->


		<!-- 添加模板7 -->
		<el-dialog width="70%" title="模板7" :visible.sync="tem7Add" @close="closeBox">
			<el-form :model="tem7AddInfo"  label-width="120px">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="tem7AddInfo.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem7AddInfo.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem7AddInfo.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>

<!--				<el-form-item label="高" class="background_color" style="width: 530px;">-->
<!--					<el-input v-model="tem7AddInfo.tem_bgimg_height" placeholder="高"></el-input>-->
<!--				</el-form-item>-->

<!--				<el-form-item label="模板背景" class="background_color" style="width: 530px;">-->
<!--					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"-->
<!--							   :on-success="handleAvatarSuccessshareTem7Bg_add" :before-upload="beforeAvatarUpload1">-->
<!--						<img v-if="tem7AddInfo.tem_bgimg" :src="tem7AddInfo.tem_bgimg" class="avatar"  style="width:100px;height:100px;pardding-left:40px">-->
<!--						<i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--					</el-upload>-->
<!--				</el-form-item>-->

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img1" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img1" :src="tem7.ae_img1" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品1" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(1,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List1" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img2" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img2" :src="tem7.ae_img2" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品2" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(2,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List2" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img3" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img3" :src="tem7.ae_img3" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品3" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(3,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List3" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img4" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img4" :src="tem7.ae_img4" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品4" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(4,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List4" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img5" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img5" :src="tem7.ae_img5" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品5" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(5,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List5" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img6" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img6" :src="tem7.ae_img6" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品6" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(6,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List6" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
<!--				产品7-->
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img7" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img7" :src="tem7.ae_img7" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品7" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(7,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List7" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img8" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img8" :src="tem7.ae_img8" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品8" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(8,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List8" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img9" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img9" :src="tem7.ae_img9" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品9" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(9,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List9" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</el-row>
				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img10" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img10" :src="tem7.ae_img10" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品10" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(10,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List10" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>

				<el-row>
					<el-form-item label="首页图片" class="background_color" style="width: 530px;">
						<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								   :on-success="handleAvatarSuccessshareTem7Img11" :before-upload="beforeAvatarUpload1">
								<span>
									<img v-if="tem7.ae_img11" :src="tem7.ae_img11" class="avatar"  style="width:100px;height:100px;pardding-left:40px">
								</span>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>

					<el-form-item label="选择产品11" class="background_color" style="width: 530px;">
						<el-select v-model="product" @change="selecType(11,7)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
						</el-select>
					</el-form-item>

					<el-row>
						<el-col :span="24">
							<div class="commodity">
								<ul>
									<li style="border:none" v-for="(item,index) in choseTem7List11" :key="index" class="selectName">
										<!-- <div>模板：{{moudleList[tem_form.tem_type-1].name}}</div> -->
										<div v-if="channel_type  != 'jdOrkaoLa'">排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
										<div style="margin-top:10px" v-if="item.g_id">链接地址：{{item.g_id}}</div>
										<div style="margin-top:10px" v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
										<div style="margin-top:10px" v-if="item.share_title">分享标题：{{item.share_title}}</div>
										<div style="margin-top:10px" v-if="item.name">优惠券名称：{{item.name}}</div>
										<div style="margin-top:10px" v-if="item.names">名称：{{item.names}}</div>
										<div style="margin-top:10px" v-if="item.channel_name">名称：{{item.channel_name}}</div>
										<div  style="display:flex">
											<img style="margin-top:10px" v-if="item.path" :src="item.path" class="avatar2">
											<img style="margin-top:10px" v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar2">
											<div style="margin-top:10px">
												<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
												<div style="margin-top:10px" v-if="item.inventory">库存：{{item.inventory}}</div>
												<div style="margin-top:10px" v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
												<div style="margin-top:10px" v-if="item.ac_color">颜色：{{item.ac_color}}</div>
											</div>
											<div style="margin-left:20px;margin-top:10px">
												<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>

				</el-row>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tem7Add = false">取 消</el-button>
				<el-button type="primary" @click="addTem7">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加模板7 -->









	</div>

</template>
<script>
    import waves from '@/directive/waves' // 水波纹指令
    import {getActivityAllList,ActiveupdateIsOnline,tabGoods,
        getBargain,
        getSeckill,
        getActivities,
        getActivitiesCoupons,
        getBrandList,
        deletItemeGoods,
        getCoupons,
        addActivityAll,
        upBaseInfo,
        deleteTemelate,
        updateTemplate,
        updateTem1,
        updateTem2,
        updateTem3,
        updateTem4,
        updateTem6,
        getTemplete1Info,
        getTemplete3Info,
        getTemplete4Info,
        getTemplete6Info,
        addTem5,
        upTem5,
        getTemplete5Info,
        addTem1,
        addTem2,
        addTem3,
        addTem4,
        addTem6,
      delTemExtInfo

    } from '@/api/shops'
    import { constants } from 'crypto';
    export default {
        directives: {
            waves
        },
        data() {
            return {
                baseInfo: {},
                templateInfo:[],
                obj:{
                    page:this.pageIndex,
                    keyword:'',
                },
                dialogTemplate1:false,
                dialogTemplate2:false,
                dialogTemplate3:false,
                dialogTemplate4:false,
                dialogTemplate6:false,
                dialogTemplate7:false,
                dialogTableVisible:false,
              	dialogTableVisible_h5: false,
			  URL:'',
                searchVal:'',
                total:0,
                list:[],
                choseList:[],
                template1:{},
                template2:{},
                template3:{},
                template4:{},
                template6:{},
                template7:{},
                tem4choseList:[],
                options: [{
                    value: '39',
                    label: '活动列表'
                }, {
                    value: '3',
                    label: '商品列表'
                }, {
                    value: '40',
                    label: '优惠专题'
                }, {
                    value: '41',
                    label: '优惠券列表'
                },
                    {
                        value: '44',
                        label: '考拉京东二级页面'
                    },
                    {
                        value: '49',
                        label: '品牌'
                    },
                    {
                        value: '5',
                        label: '会员权益'
                    },
                  {
                    value: '29',
                    label: 'H5跳转链接'
				  },
				  {
                    value: '111',
                    label: 'RN跳转链接'
                  },
                ],
                product:'',
                templateNum:'',
                tp:'',
                tp4List:[],
                tp5List:[],
                tem2:{
                    ae_img1:'',
                    ae_img2:'',
                    ae_img3:'',
                },
                tem7:{
                    ae_img1:'',
                    ae_img2:'',
                    ae_img3:'',
                    ae_img4:'',
                    ae_img5:'',
                    ae_img6:'',
                    ae_img7:'',
                    ae_img8:'',
                    ae_img9:'',
                    ae_img10:'',
                    ae_img11:''
				},
                choseTemType:'',
                choseTem2List1:[],
                choseTem2List2:[],
                choseTem2List3:[],

                choseTem7List1:[],
                choseTem7List2:[],
                choseTem7List3:[],
                choseTem7List4:[],
                choseTem7List5:[],
                choseTem7List6:[],
                choseTem7List7:[],
                choseTem7List8:[],
                choseTem7List9:[],
                choseTem7List10:[],
                choseTem7List11:[],
                temType:0,
                tem1Add:false,
                tem2Add:false,
                tem3Add:false,
                tem4Add:false,
                tem5Add:false,
                tem6Add:false,
                tem7Add:false,
                tem1AddInfo:{
                    actityList:[
                        {
                            ae_img:''
                        },
                    ]
                },
                tem2AddInfo:{
                    tem_bgimg:'',
                },
                tem7AddInfo:{
                    tem_bgimg:'',
                },
                tem4AddInfo:{
                    actityList:[
                        {
                            ae_type:51,
                            ae_sort:10000,
                            ae_img:''
                        },
                        {
                            ae_type:34,
                            ae_sort:9999,
                            ae_img:''
                        },
                        {
                            ae_type:33,
                            ae_sort:9998,
                            ae_img:''
                        },
                        // {
                        // 	ae_type:32,
                        // 	ae_sort:0,
                        // 	ae_img:''
                        // },
                    ],
                    tem4:{
                        tem4_1:{},
                        tem4_2:{},
                    }

                },
                template5:{
                    actityList:[
                        {
                            ae_img:''
                        },
                        {
                            ae_img:''
                        },
                        {
                            ae_img:''
                        },
                        {
                            ae_img:''
                        },
                    ]
                },
                choseTem5List1:[],
                choseTem5List2:[],
                choseTem5List3:[],
                choseTem5List4:[],
                aa_id:'',
                tem5_type:'',
                channel_type:'',
            }
        },
        mounted() {
            if (this.$route.query.id) {
                this.loading = true;
                this.getList()
                this.aa_id = this.$route.query.id;
            }

        },
        methods: {
            // 列表数据
            getList() {
                var id = this.$route.query.id;
                var obj={
                    id:id,
                }
                getActivityAllList(obj).then(res=>{
                    if(res.data.code==200){
                        this.baseInfo = res.data.data.baseInfo;
                        this.templateInfo = res.data.data.templateInfo;
                    }
                })
            },
          delTemExtInfo(id,index){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delTemExtInfo({id:id}).then(res=>{
				if(res.data.code == 200){
				  this.choseList.splice(index,1)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
				}else{
				  this.$message.error(res.data.msg)
				}
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });

		  },
            //编辑模板
            selecShop(item){
                if(item.tem_type==1)
                {
                    this.templateNum=1;
                    this.dialogTemplate1=true;
                    this.template1=item

                    getTemplete1Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseList = res.data.data.actity;
                        }
                    })

                }else if(item.tem_type==2){
                    getTemplete6Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseList = res.data.data.actity;

                            this.choseTem2List1.push(this.choseList[0]);
                            this.choseTem2List2.push(this.choseList[1]);
                            this.choseTem2List3.push(this.choseList[2]);
                        }
                    })
                    this.templateNum=2;
                    this.dialogTemplate2=true;
                    this.template2=item
                    this.tem2.ae_img1=item.actityList[0].ae_img;
                    this.tem2.ae_img2=item.actityList[1].ae_img;
                    this.tem2.ae_img3=item.actityList[2].ae_img;



                }else if(item.tem_type==7){
                    getTemplete6Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseList = res.data.data.actity;
                            this.choseTem7List1.push(this.choseList[0]);
                            this.choseTem7List2.push(this.choseList[1]);
                            this.choseTem7List3.push(this.choseList[2]);
                            this.choseTem7List4.push(this.choseList[3]);
                            this.choseTem7List5.push(this.choseList[4]);
                            this.choseTem7List6.push(this.choseList[5]);
                            this.choseTem7List7.push(this.choseList[6]);
                            this.choseTem7List8.push(this.choseList[7]);
                            this.choseTem7List9.push(this.choseList[8]);
                            this.choseTem7List10.push(this.choseList[9]);
                            this.choseTem7List11.push(this.choseList[10]);
                        }
                    })
                    this.templateNum=7;
                    this.dialogTemplate7=true;
                    this.template7=item
                    this.tem7.ae_img1=item.actityList[0].ae_img;
                    this.tem7.ae_img2=item.actityList[1].ae_img;
                    this.tem7.ae_img3=item.actityList[2].ae_img;
                    this.tem7.ae_img4=item.actityList[3].ae_img;
                    this.tem7.ae_img5=item.actityList[4].ae_img;
                    this.tem7.ae_img6=item.actityList[5].ae_img;
                    this.tem7.ae_img7=item.actityList[6].ae_img;
                    this.tem7.ae_img8=item.actityList[7].ae_img;
                    this.tem7.ae_img9=item.actityList[8].ae_img;
                    this.tem7.ae_img10=item.actityList[9].ae_img;
                    this.tem7.ae_img11=item.actityList[10].ae_img;

                }else if(item.tem_type==3){
                    this.templateNum=3;
                    this.dialogTemplate3=true;
                    this.template3=item

                    getTemplete3Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseList = res.data.data.actity;
                        }
                    })

                }else if(item.tem_type==4){
                    this.templateNum=4;
                    this.dialogTemplate4=true;
                    this.template4=item
                    getTemplete4Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.tp4List = [res.data.data.actity.tem4_1];
                            this.tp5List = [res.data.data.actity.tem4_2];
                            // this.choseList = res.data.data.actity;
                        }
                    })
                }else if(item.tem_type==5){
                    this.templateNum=5;
                    this.tem5Add=true;
                    this.template5=item

                    this.tem5_type='up';

                    getTemplete5Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseTem5List1 = [res.data.data.actity.tem5_1];
                            this.choseTem5List2 = [res.data.data.actity.tem5_2];
                            this.choseTem5List3 = [res.data.data.actity.tem5_3];
                            this.choseTem5List4 = [res.data.data.actity.tem5_4];
                            // this.choseList = res.data.data.actity;
                        }
                    })
                }else if(item.tem_type==6){
                    this.templateNum=6;
                    this.dialogTemplate6=true;
                    this.template6=item

                    getTemplete6Info({id:item.id}).then(res=>{
                        if(res.data.code==200){
                            this.choseList = res.data.data.actity;
                        }
                    })

                }
                this.choseList=[];
                this.choseTem2List1=[];
                this.choseTem2List2=[];
                this.choseTem2List3=[];
                this.choseTem7List1 =[];
				this.choseTem7List2 =[];
				this.choseTem7List3 =[];
				this.choseTem7List4 =[];
				this.choseTem7List5 =[];
				this.choseTem7List6 =[];
				this.choseTem7List7 =[];
				this.choseTem7List8 =[];
				this.choseTem7List9 =[];
				this.choseTem7List10=[];
                this.choseTem7List11=[];
                // console.log(item);
            },
            closeBox()
            {

            },
            beforeAvatarUpload1(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'||file.type === 'image/gif';
                const isLt = file.size / 1024 < 500;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG/gif 格式!');
                }
                if (!isLt) {
                    this.$message.error('上传头像图片大小不能超过 500K!');
                }
                return isJPG && isLt;
            },


            handleAvatarSuccessshareTem1(res, file) {
                // 模板一图片
                this.template1.actityList[0].ae_img = file.response.url;
                // console.log(this.template1.actityList);
            },
            // 模板二背景图
            handleAvatarSuccessshareTem2Bg(res, file) {
                this.template2.tem_bgimg = file.response.url;
            },

            handleAvatarSuccessshareTem2Bg_add(res, file) {
                this.tem2AddInfo.tem_bgimg = file.response.url;
            },

            handleAvatarSuccessshareTem7Bg_add(res, file) {
                this.tem7AddInfo.tem_bgimg = file.response.url;
            },

            // 模板二背景图
            handleAvatarSuccessshareTem7Bg(res, file) {
                this.template7.tem_bgimg = file.response.url;
            },

            // 模板二 图片1
            handleAvatarSuccessshareTem2Img1(res, file) {
                this.tem2.ae_img1 = file.response.url;
            },
            // 模板二 图片2
            handleAvatarSuccessshareTem2Img2(res, file) {
                this.tem2.ae_img2 = file.response.url;
            },
            // 模板二 图片3
            handleAvatarSuccessshareTem2Img3(res, file) {
                this.tem2.ae_img3 = file.response.url;
            },

            // 模板七 图片1
            handleAvatarSuccessshareTem7Img1(res, file) {
                this.tem7.ae_img1 = file.response.url;
            },
            // 模板七 图片2
            handleAvatarSuccessshareTem7Img2(res, file) {
                this.tem7.ae_img2 = file.response.url;
            },
            // 模板七 图片3
            handleAvatarSuccessshareTem7Img3(res, file) {
                this.tem7.ae_img3 = file.response.url;
            },
            // 模板七 图片4
            handleAvatarSuccessshareTem7Img4(res, file) {
                this.tem7.ae_img4 = file.response.url;
            },
            // 模板七 图片5
            handleAvatarSuccessshareTem7Img5(res, file) {
                this.tem7.ae_img5 = file.response.url;
            },
            // 模板七 图片6
            handleAvatarSuccessshareTem7Img6(res, file) {
                this.tem7.ae_img6 = file.response.url;
            },
            // 模板七 图片7
            handleAvatarSuccessshareTem7Img7(res, file) {
                this.tem7.ae_img7 = file.response.url;
            },
            // 模板七 图片8
            handleAvatarSuccessshareTem7Img8(res, file) {
                this.tem7.ae_img8 = file.response.url;
            },
            // 模板七 图片9
            handleAvatarSuccessshareTem7Img9(res, file) {
                this.tem7.ae_img9 = file.response.url;
            },
            // 模板七 图片10
            handleAvatarSuccessshareTem7Img10(res, file) {
                this.tem7.ae_img10 = file.response.url;
            },
            // 模板七 图片11
            handleAvatarSuccessshareTem7Img11(res, file) {
                this.tem7.ae_img11 = file.response.url;
            },


            handleAvatarSuccessshare(res, file) {
                // 活动图片
                var actityList=[
                    {
                        ae_img:file.response.url,
                    }
                ];

                this.template1.actityList = actityList;
            },

            //选择产品
            selecType(val,tp){
                console.log(val,tp,'--------selecType',this.product)

              if(this.product == 29||this.product==111){
                this.dialogTableVisible_h5 = true
              }else{
                this.dialogTableVisible = true;
                this.searchVal=''
			  }
              if(val){
                    if(val==99){//模板4
                        if(tp==4){
                            this.tp=4;
                        }else if(tp==5){
                            this.tp=5;
                        }
                        this.product=39
                    }

                    // if(val==99){//模板4
                    // 	this.product=39
                    // 	this.chose2Cont=tp
                    // }else{
                    // 	this.tem_cont2[val-1].ae_type=this.product
                    // 	this.chose2Cont=val-1
                    // }
                }
                if(tp)
                {
                    if(tp==2)
                    {
                        if(val==1)
                        {
                            this.choseTemType="21";
                        }else if(val==2){
                            this.choseTemType="22";
                        }else if(val==3){
                            this.choseTemType="23";
                        }
                    }else if(tp==5){

                        if(val==1)
                        {
                            this.choseTemType="51";
                        }else if(val==2){
                            this.choseTemType="52";
                        }else if(val==3){
                            this.choseTemType="53";
                        }else if(val==4){
                            this.choseTemType="54";
                        }

                    }else if(tp==7){

                        if(val==1)
                        {
                            this.choseTemType="71";
                        }else if(val==2){
                            this.choseTemType="72";
                        }else if(val==3){
                            this.choseTemType="73";
                        }else if(val==4){
                            this.choseTemType="74";
                        }else if(val==5){
                            this.choseTemType="75";
                        }else if(val==6){
                            this.choseTemType="76";
                        }else if(val==7){
                            this.choseTemType="77";
                        }else if(val==8){
                            this.choseTemType="78";
                        }else if(val==9){
                            this.choseTemType="79";
                        }else if(val==10){
                            this.choseTemType="710";
                        }else if(val==11){
                            this.choseTemType="711";
                        }

                    }
                }
                console.log(this.choseTemType,'---++++');


                this.getTabGoods(1)
            },
            // 弹框 顶部搜索
            getTabGoods(page) {
                // console.log(this.product);
                let _this = this;
                var data={}
                if(this.product==39){
                    data.page=page
                    data.keyword = this.searchVal
                    this.getActivities(data)
                }else if(this.product==3){
                    data.page=page
                    data.goods_name = this.searchVal
                    this.tabGoods(data)
                }else if(this.product==40){
                    data.page=page
                    data.keyword = this.searchVal
                    this.getActivitiesCoupons(data)
                }else if(this.product==41){
                    data.page=page
                    data.keyword = this.searchVal
                    this.getCoupons(data)
                }else if(this.product==5){
                    this.list = [
                        {
                            id:0,
                            name:'会员权益'
                        }]

                }else if(this.product==44){

                    this.list = [
                        {
                            id:99332,
                            name:'环球美食'
                        },
                        {
                            id:99336,
                            name:'母婴'
                        },
                        {
                            id:99339,
                            name:'服装鞋靴'
                        },
                        {
                            id:99344,
                            name:'轻奢'
                        },
                        {
                            id:99350,
                            name:'美容彩妆'
                        },
                        {
                            id:99356,
                            name:'运动户外'
                        },
                        {
                            id:99366,
                            name:'数码家电'
                        },
                        {
                            id:99407,
                            name:'个人洗护'
                        },
                        {
                            id:99480,
                            name:'营养保健'
                        },
                    ]


                    this.total =2
                    // data.page=page
                    // data.keyword = this.searchVal
                    // this.getCoupons(data)
                }else if(this.product==49){
                    data.page=page
                    data.keyword = this.searchVal
                    this.getBrandList(data)
                }
            },
            // 弹出 活动列表
            getActivities(data){
                getActivities(data).then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data
                        this.total = res.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            // 弹出 商品列表
            tabGoods(data){
                tabGoods(data).then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data
                        this.total = res.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            // 弹出 优惠专题
            getActivitiesCoupons(data){
                getActivitiesCoupons(data).then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data
                        this.total = res.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            // 弹出 优惠券列表
            getCoupons(data){
                getCoupons(data).then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data
                        this.total = res.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            //品牌列表
            getBrandList(data){
                getBrandList(data).then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.total = res.data.count
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

            handleCurrentChange(val) {
                this.getTabGoods(val)
            },

            // 弹框 选择内容
            choseId(item,product) {
                this.channel_type  = "";

                if(product==39)
                {
                    //活动列表
                    var goods=
                        {
                            // id:item.id,
                            ae_type:39,
                            g_id:item.id,
                            activity_name:item.activity_name,
                            share_title:item.share_title,
                            ae_sort:item.ae_sort
                        }

                }else if(this.product==29){
                  //h5链接
                  var goods=
                    {
                      url: this.URL,
                      g_id: this.URL,
                      ae_type:29,
                      ae_sort:0
                    }
                    this.dialogTableVisible_h5 = false;
                  	this.URL = '';

                }else if(this.product==111){
                  //RN链接
                  var goods=
                    {
                      url: this.URL,
                      g_id: this.URL,
                      ae_type:111,
                      ae_sort:0
                    }
                    this.dialogTableVisible_h5 = false;
                  	this.URL = '';

                }else if(product==3){
                    //商品列表
                    var goods=
                        {
                            // id:item.id,
                            g_id:item.sku_id,
                            ae_type:3,
                            goods_name:item.goods_name,
                            inventory:item.inventory,
                            origin_price:item.origin_price,
                            path:item.path,
                            ae_sort:item.ae_sort
                        }

                }else if(product==40){
                    //优惠专题
                    var goods=
                        {
                            // id:item.id,
                            g_id:item.id,
                            ae_type:40,
                            share_title:item.share_title,
                            ac_imgs:item.ac_imgs,
                            ac_color:item.ac_color,
                            ac_name:item.ac_name,
                            ae_sort:item.ae_sort
                        }

                }else if(product==41){
                    //优惠券列表
                    var goods=
                        {
                            // id:item.id,
                            g_id:item.id,
                            ae_type:41,
                            name:item.name,
                            ae_sort:item.ae_sort,
                        }
                }else if(product==44){
                    //京东考拉二级页面
                    var goods=
                        {
                            // id:item.id,
                            g_id:item.id,
                            ae_type:44,
                            channel_name:item.name,
                            ae_sort:0,
                        }
                    this.channel_type  = "jdOrkaoLa";

                }else if(product==49){
                    var goods=
                        {
                            // id:item.id,
                            ae_img:'',
                            g_id:item.id,
                            ae_type:49,
                            brandName:item.name,
                            ae_sort:0,
                        }
                }else if(product==5){
                    var goods=
                        {
                            // id:item.id,
                            ae_img:'',
                            g_id:0,
                            ae_type:5,
                            names:item.name,
                            ae_sort:0,
                        }
                }

                console.log('goods',goods)

                if(this.templateNum==2)
                {
                    if(this.choseTemType==21)
                    {
                        this.choseTem2List1 = [goods];
                    }else if(this.choseTemType==22){
                        this.choseTem2List2 = [goods];
                    }else if(this.choseTemType==23){
                        this.choseTem2List3 = [goods];
                    }

                }else if(this.templateNum==3)
                {
                    this.choseList.push(goods);
                }else if(this.templateNum==4){
                    if(this.tp==4)
                    {
                        this.tp4List = [goods];
                    }else if(this.tp==5)
                    {
                        this.tp5List = [goods];
                    }
                }else if(this.templateNum==5){

                    // console.log(this.choseTemType,'++++');
                    if(this.choseTemType==51)
                    {
                        this.choseTem5List1 = [goods];
                    }else if(this.choseTemType==52){
                        this.choseTem5List2 = [goods];
                    }else if(this.choseTemType==53){
                        this.choseTem5List3 = [goods];
                    }else if(this.choseTemType==54){
                        this.choseTem5List4 = [goods];
                    }
                }else if(this.templateNum==6)
                {
                    this.choseList.push(goods);
                }else if(this.templateNum==7)
                {
                    if(this.choseTemType==71)
                    {
                        this.choseTem7List1 = [goods];
                    }else if(this.choseTemType==72){
                        this.choseTem7List2 = [goods];
                    }else if(this.choseTemType==73){
                        this.choseTem7List3 = [goods];
                    }else if(this.choseTemType==74){
                        this.choseTem7List4 = [goods];
                    }else if(this.choseTemType==75){
                        this.choseTem7List5 = [goods];
                    }else if(this.choseTemType==76){
                        this.choseTem7List6 = [goods];
                    }else if(this.choseTemType==77){
                        this.choseTem7List7 = [goods];
                    }else if(this.choseTemType==78){
                        this.choseTem7List8 = [goods];
                    }else if(this.choseTemType==79){
                        this.choseTem7List9 = [goods];
                    }else if(this.choseTemType==710){
                        this.choseTem7List10 = [goods];
                    }else if(this.choseTemType==711){
                        this.choseTem7List11 = [goods];
                    }
                    // this.choseTem7List1 = this.choseTem7List2= this.choseTem7List3= this.choseTem7List4= this.choseTem7List5= this.choseTem7List6= this.choseTem7List7= this.choseTem7List8= this.choseTem7List9= this.choseTem7List10= this.choseTem7List11=[goods];
                }else{
                    this.choseList = [goods];
                }

                // console.log(this.templateNum,'++++');


                this.dialogTableVisible = false;
            },
            handleAvatarTem_cont1(res, file){
                this.tem_cont4[0].ae_img= file.response.url;
            },

            //修改基础信息
            upBaseInfo()
            {
                // console.log(this.baseInfo);
                var obj = this.baseInfo;
                var data = {
                    id:obj.id,
                    aa_type:obj.aa_type,
                    aa_name:obj.aa_name,
                }
                upBaseInfo(data).then(res=>{
                    if(res.data.code == 200){
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },
            //删除模板
            delMoudle(obj)
            {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var data = {
                        id:obj.id,
                    }
                    deleteTemelate(data).then(res=>{
                        if(res.data.code == 200){
                            this.$message.success(res.data.msg || "删除成功")
                            this.getList()
                        }else{
                            this.$message.error(res.data.msg || "网络开小差了~")
                        }
                    })
                }).catch(() => {

                });
            },
            updateTemplate(obj,status){
                this.$confirm('是否确定操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var data = {
                        id:obj.id,
                        status: status
                    }
                    updateTemplate(data).then(res=>{
                        if(res.data.code == 200){
                            this.$message.success(res.data.msg || "删除成功")
                            this.getList()
                        }else{
                            this.$message.error(res.data.msg || "网络开小差了~")
                        }
                    })
                }).catch(() => {

                });
			},



            update1()
            {
                var obj = this.template1;
                var choseList = this.choseList;

                if (choseList.length==0){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }

                var temData = {
                    id:obj.id,
                    tem_sort:obj.tem_sort,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height
                }

                var extData={
                    id:obj.actityList[0].id,
                    ae_type:choseList[0].ae_type,
                    g_id:choseList[0].g_id,
                    ae_sort:choseList[0].ae_sort,
                    ae_height:obj.actityList[0].ae_height,
                    ae_width:obj.actityList[0].ae_width,
                    ae_img:obj.actityList[0].ae_img,
                }
                var data={
                    temData:temData,
                    extData:extData,
                }

                updateTem1(data).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate1 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },
            update2()
            {
                var obj = this.template2;
                var choseTem2List1 = this.choseTem2List1;
                var choseTem2List2 = this.choseTem2List2;
                var choseTem2List3 = this.choseTem2List3;


                if (choseTem2List1.length==0||choseTem2List2.length==0||choseTem2List3.length==0){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }


                var temData = {
                    id:obj.id,
                    tem_sort:obj.tem_sort,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height,
                    tem_bgimg_height:obj.tem_bgimg_height,
                    tem_bgimg:obj.tem_bgimg,
                    temType: 2
                }
                // console.log(choseTem2List1);return;

                var extData=[
                    {
                        id:obj.actityList[0].id,
                        ae_type:choseTem2List1[0].ae_type,
                        g_id:choseTem2List1[0].g_id,
                        ae_sort:choseTem2List1[0].ae_sort,
                        ae_img:this.tem2.ae_img1,

                    },
                    {
                        id:obj.actityList[1].id,
                        ae_type:choseTem2List2[0].ae_type,
                        g_id:choseTem2List2[0].g_id,
                        ae_sort:choseTem2List2[0].ae_sort,
                        ae_img:this.tem2.ae_img2,
                    },
                    {
                        id:obj.actityList[2].id,
                        ae_type:choseTem2List3[0].ae_type,
                        g_id:choseTem2List3[0].g_id,
                        ae_sort:choseTem2List3[0].ae_sort,
                        ae_img:this.tem2.ae_img3,
                    }
                ]
                var data={
                    temData:temData,
                    extData:extData,
                }
                // console.log(data);
                updateTem2(data).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate2 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },

            update7()
            {
                var obj = this.template7;
                var {choseTem7List1,choseTem7List2,choseTem7List3,choseTem7List4,choseTem7List5,choseTem7List6,choseTem7List7,choseTem7List8,choseTem7List9,choseTem7List10,choseTem7List11} = this.$data;
                if (!(choseTem7List1.length||choseTem7List2.length||choseTem7List3.length||choseTem7List4.length||choseTem7List5.length||choseTem7List6.length||choseTem7List7.length||choseTem7List8.length||choseTem7List9.length||choseTem7List10.length||choseTem7List11.length)){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }
                var temData = {
                    id:obj.id,
                    tem_sort:obj.tem_sort,
                    aa_id:this.aa_id,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height,
                    // tem_bgimg_height:obj.tem_bgimg_height,
                    // tem_bgimg:obj.tem_bgimg,
                    temType: 7
                }

                var extData=[
                    {
                        id:obj.actityList[0].id,
                        ae_type:choseTem7List1[0].ae_type,
                        g_id:choseTem7List1[0].g_id,
                        ae_sort:choseTem7List1[0].ae_sort,
                        ae_img:this.tem7.ae_img1 || '',

                    },
                    {
                        id:obj.actityList[1].id,
                        ae_type:choseTem7List2[0].ae_type,
                        g_id:choseTem7List2[0].g_id,
                        ae_sort:choseTem7List2[0].ae_sort,
                        ae_img:this.tem7.ae_img2 || '',
                    },
                    {
                        id:obj.actityList[2].id,
                        ae_type:choseTem7List3[0].ae_type,
                        g_id:choseTem7List3[0].g_id,
                        ae_sort:choseTem7List3[0].ae_sort,
                        ae_img:this.tem7.ae_img3 || '',
                    },
                    {
                        id:obj.actityList[3].id,
                        ae_type:choseTem7List4[0].ae_type,
                        g_id:choseTem7List4[0].g_id,
                        ae_sort:choseTem7List4[0].ae_sort,
                        ae_img:this.tem7.ae_img4 || '',

                    },
                    {
                        id:obj.actityList[4].id,
                        ae_type:choseTem7List5[0].ae_type,
                        g_id:choseTem7List5[0].g_id,
                        ae_sort:choseTem7List5[0].ae_sort,
                        ae_img:this.tem7.ae_img5 || '',
                    },
                    {
                        id:obj.actityList[5].id,
                        ae_type:choseTem7List6[0].ae_type,
                        g_id:choseTem7List6[0].g_id,
                        ae_sort:choseTem7List6[0].ae_sort,
                        ae_img:this.tem7.ae_img6 || '',
                    },
                    {
                        id:obj.actityList[6].id,
                        ae_type:choseTem7List7[0].ae_type,
                        g_id:choseTem7List7[0].g_id,
                        ae_sort:choseTem7List7[0].ae_sort,
                        ae_img:this.tem7.ae_img7 || '',

                    },
                    {
                        id:obj.actityList[7].id,
                        ae_type:choseTem7List8[0].ae_type,
                        g_id:choseTem7List8[0].g_id,
                        ae_sort:choseTem7List8[0].ae_sort,
                        ae_img:this.tem7.ae_img8 || '',
                    },
                    {
                        id:obj.actityList[8].id,
                        ae_type:choseTem7List9[0].ae_type,
                        g_id:choseTem7List9[0].g_id,
                        ae_sort:choseTem7List9[0].ae_sort,
                        ae_img:this.tem7.ae_img9 || '',
                    },
                    {
                        id:obj.actityList[9].id,
                        ae_type:choseTem7List10[0].ae_type,
                        g_id:choseTem7List10[0].g_id,
                        ae_sort:choseTem7List10[0].ae_sort,
                        ae_img:this.tem7.ae_img10 || '',

                    },
                    {
                        id:obj.actityList[10].id,
                        ae_type:choseTem7List11[0].ae_type,
                        g_id:choseTem7List11[0].g_id,
                        ae_sort:choseTem7List11[0].ae_sort,
                        ae_img:this.tem7.ae_img11 || '',
                    }
                ]
                var data={
                    temData:temData,
                    extData:extData,
                }
                // console.log(data);
                updateTem2(data).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate7 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },

            handleAvatarTem4_1(res, file, fileList,index)
            {
                this.template4.actityList[index].ae_img = file.response.url;
            },


            handleAvatarTem4_add_1(res, file, fileList,index)
            {
                this.tem4AddInfo.actityList[index].ae_img = file.response.url;
            },


            handleAvatarTem4_act_1(res, file, fileList,index)
            {
                if(index==1)
                {
                    this.template4.tem4.tem4_1.ae_img= file.response.url;
                }else if(index==2){
                    this.template4.tem4.tem4_2.ae_img= file.response.url;
                }
            },

            handleAvatarTem4_add_act_1(res, file, fileList,index)
            {
                if(index==1)
                {
                    this.tem4AddInfo.tem4.tem4_1.ae_img= file.response.url;
                }else if(index==2){
                    this.tem4AddInfo.tem4.tem4_2.ae_img= file.response.url;
                }
            },

            update4(){
                var obj = this.template4;

                var tp4 = this.tp4List;
                var tp5 = this.tp5List;

                if(tp4.length!=0)
                {
                    obj.tem4.tem4_1.g_id = tp4[0].g_id;
                }

                if(tp5.length!=0)
                {
                    obj.tem4.tem4_2.g_id = tp5[0].g_id;
                }

                // console.log(obj);return;
                updateTem4(obj).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate4 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })

            },

            update3(){
                var obj = this.template3;

                var choseList = this.choseList;

                // console.log(obj,'-----');
                // console.log(choseList,'-----');
                // return;
                var data = {
                    tem:obj,
                    ext:choseList,
                }
                updateTem3(data).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate3 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },

            update6(){
                var obj = this.template6;

                var choseList = this.choseList;

                // console.log(obj,'-----');
                // console.log(choseList,'-----');

                // return;
                var data = {
                    tem:obj,
                    ext:choseList,
                }

                updateTem6(data).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate6 = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })

            },

            addTem()
            {
                var tem = this.temType;
                if(tem=='')
                {
                    this.$message.error('请选择模板')
                }

                if(tem==1)
                {
                    this.tem1AddInfo={
                        actityList:[
                            {
                                ae_img:''
                            },
                        ]
                    };
                    this.choseList=[];
                    this.tem1Add=true
                    this.templateNum=1;
                }else if(tem==2){
                    this.tem2AddInfo={};
                    this.tem2={};
                    this.templateNum=2;
                    this.tem2Add=true
                }else if(tem==3){
                    this.template3={}
                    this.choseList=[];
                    this.templateNum=3;
                    this.tem3Add=true
                }else if(tem==4){
                    this.templateNum=4;
                    this.tem4Add=true
                    this.tem4AddInfo={
                        actityList:[
                            {
                                ae_type:51,
                                ae_sort:10000,
                                ae_img:''
                            },
                            {
                                ae_type:34,
                                ae_sort:9999,
                                ae_img:''
                            },
                            {
                                ae_type:33,
                                ae_sort:9998,
                                ae_img:''
                            },
                            // {
                            // 	ae_type:32,
                            // 	ae_sort:0,
                            // 	ae_img:''
                            // },
                        ],
                        tem4:{
                            tem4_1:{},
                            tem4_2:{},
                        }
                    };

                    this.tp4List=[];
                    this.tp5List=[];
                }else if(tem==5){
                    this.template5={
                        actityList:[
                            {
                                ae_img:''
                            },
                            {
                                ae_img:''
                            },
                            {
                                ae_img:''
                            },
                            {
                                ae_img:''
                            },
                        ]
                    };

                    this.choseTem5List1=[];
                    this.choseTem5List2=[];
                    this.choseTem5List3=[];
                    this.choseTem5List4=[];
                    this.tem5_type='add';
                    this.templateNum=5;
                    this.tem5Add=true
                }else if(tem==6){
                    this.template6={}
                    this.choseList=[];
                    this.templateNum=6;
                    this.tem6Add=true
                }else if(tem==7){
                    this.tem7AddInfo={};
                    this.tem7={};
                    this.templateNum=7;
                    this.tem7Add=true
                }
            },



            addTem1()
            {
                var obj = this.tem1AddInfo;

                var choseList = this.choseList;

                // console.log(obj);
                // console.log(choseList);

                if (choseList.length==0){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }

                var temData = {
                    aa_id:this.aa_id,
                    tem_sort:obj.tem_sort,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height
                }

                var extData={
                    ae_type:choseList[0].ae_type,
                    g_id:choseList[0].g_id,
                    ae_sort:choseList[0].ae_sort,
                    ae_height:obj.actityList[0].ae_height,
                    ae_width:obj.actityList[0].ae_width,
                    ae_img:obj.actityList[0].ae_img,
                }
                var data={
                    temData:temData,
                    extData:extData,
                }

                addTem1(data).then(res=>{
                    if(res.data.code == 200){
                        this.tem1Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })




                // var choseTem5List1 = this.choseTem5List1;



            },
            addTem2()
            {
                var obj = this.tem2AddInfo;
                var choseTem2List1 = this.choseTem2List1;
                var choseTem2List2 = this.choseTem2List2;
                var choseTem2List3 = this.choseTem2List3;


                if (choseTem2List1.length==0||choseTem2List2.length==0||choseTem2List3.length==0){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }


                var temData = {
                    tem_sort:obj.tem_sort,
                    aa_id:this.aa_id,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height,
                    tem_bgimg_height:obj.tem_bgimg_height,
                    tem_bgimg:obj.tem_bgimg,
                    temType: 2
                }

                var extData=[
                    {
                        ae_type:choseTem2List1[0].ae_type,
                        g_id:choseTem2List1[0].g_id,
                        ae_sort:choseTem2List1[0].ae_sort,
                        ae_img:this.tem2.ae_img1,

                    },
                    {
                        ae_type:choseTem2List2[0].ae_type,
                        g_id:choseTem2List2[0].g_id,
                        ae_sort:choseTem2List2[0].ae_sort,
                        ae_img:this.tem2.ae_img2,
                    },
                    {
                        ae_type:choseTem2List3[0].ae_type,
                        g_id:choseTem2List3[0].g_id,
                        ae_sort:choseTem2List3[0].ae_sort,
                        ae_img:this.tem2.ae_img3,
                    }
                ]
                var data={
                    temData:temData,
                    extData:extData,
                }
                // console.log(data);return;
                addTem2(data).then(res=>{
                    if(res.data.code == 200){
                        this.tem2Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })

            },
            addTem7()
            {
                var obj = this.tem7AddInfo;
                var {choseTem7List1,choseTem7List2,choseTem7List3,choseTem7List4,choseTem7List5,choseTem7List6,choseTem7List7,choseTem7List8,choseTem7List9,choseTem7List10,choseTem7List11} = this.$data;
                if (!(choseTem7List1.length && choseTem7List2.length && choseTem7List3.length && choseTem7List4.length && choseTem7List5.length && choseTem7List6.length && choseTem7List7.length && choseTem7List8.length && choseTem7List9.length && choseTem7List10.length && choseTem7List11.length)){
                    this.$message({
                        type: "error",
                        message: "请完善模板信息"
                    })
                    return false;
                }
                if (!(this.tem7.ae_img1 && this.tem7.ae_img2 && this.tem7.ae_img3 && this.tem7.ae_img4 && this.tem7.ae_img5 && this.tem7.ae_img6 && this.tem7.ae_img7 && this.tem7.ae_img8 && this.tem7.ae_img9 && this.tem7.ae_img10 && this.tem7.ae_img11)){
                    this.$message({
                        type: "error",
                        message: "请检查产品信息，完善产品图片"
                    })
                    return false;
                }
                var temData = {
                    tem_sort:obj.tem_sort,
                    aa_id:this.aa_id,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height,
                    // tem_bgimg_height:obj.tem_bgimg_height,
                    // tem_bgimg:obj.tem_bgimg,
                    temType: 7
                }

                var extData=[
                    {
                        ae_type:choseTem7List1[0].ae_type,
                        g_id:choseTem7List1[0].g_id,
                        ae_sort:choseTem7List1[0].ae_sort,
                        ae_img:this.tem7.ae_img1 || '',

                    },
                    {
                        ae_type:choseTem7List2[0].ae_type,
                        g_id:choseTem7List2[0].g_id,
                        ae_sort:choseTem7List2[0].ae_sort,
                        ae_img:this.tem7.ae_img2 || '',
                    },
                    {
                        ae_type:choseTem7List3[0].ae_type,
                        g_id:choseTem7List3[0].g_id,
                        ae_sort:choseTem7List3[0].ae_sort,
                        ae_img:this.tem7.ae_img3 || '',
                    },
                    {
                        ae_type:choseTem7List4[0].ae_type,
                        g_id:choseTem7List4[0].g_id,
                        ae_sort:choseTem7List4[0].ae_sort,
                        ae_img:this.tem7.ae_img4 || '',

                    },
                    {
                        ae_type:choseTem7List5[0].ae_type,
                        g_id:choseTem7List5[0].g_id,
                        ae_sort:choseTem7List5[0].ae_sort,
                        ae_img:this.tem7.ae_img5 || '',
                    },
                    {
                        ae_type:choseTem7List6[0].ae_type,
                        g_id:choseTem7List6[0].g_id,
                        ae_sort:choseTem7List6[0].ae_sort,
                        ae_img:this.tem7.ae_img6 || '',
                    },
                    {
                        ae_type:choseTem7List7[0].ae_type,
                        g_id:choseTem7List7[0].g_id,
                        ae_sort:choseTem7List7[0].ae_sort,
                        ae_img:this.tem7.ae_img7 || '',

                    },
                    {
                        ae_type:choseTem7List8[0].ae_type,
                        g_id:choseTem7List8[0].g_id,
                        ae_sort:choseTem7List8[0].ae_sort,
                        ae_img:this.tem7.ae_img8 || '',
                    },
                    {
                        ae_type:choseTem7List9[0].ae_type,
                        g_id:choseTem7List9[0].g_id,
                        ae_sort:choseTem7List9[0].ae_sort,
                        ae_img:this.tem7.ae_img9 || '',
                    },
                    {
                        ae_type:choseTem7List10[0].ae_type,
                        g_id:choseTem7List10[0].g_id,
                        ae_sort:choseTem7List10[0].ae_sort,
                        ae_img:this.tem7.ae_img10 || '',

                    },
                    {
                        ae_type:choseTem7List11[0].ae_type,
                        g_id:choseTem7List11[0].g_id,
                        ae_sort:choseTem7List11[0].ae_sort,
                        ae_img:this.tem7.ae_img11 || '',
                    }
                ]
                var data={
                    temData:temData,
                    extData:extData,
                }
                // console.log(data);return;
                addTem2(data).then(res=>{
                    if(res.data.code == 200){
                        this.tem7Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })

            },
            addTem3()
            {
                var obj = this.template3;

                obj.aa_id=this.aa_id;

                var choseList = this.choseList;

                var data = {
                    tem:obj,
                    ext:choseList,
                }
                // console.log(data,'-----');
                // return;
                addTem3(data).then(res=>{
                    if(res.data.code == 200){
                        this.tem3Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },
            addTem4()
            {

                var obj = this.tem4AddInfo;
                obj.aa_id=this.aa_id;

                var tp4 = this.tp4List;
                var tp5 = this.tp5List;

                if(tp4.length!=0)
                {
                    obj.tem4.tem4_1.g_id = tp4[0].g_id;
                    obj.tem4.tem4_1.ae_type = tp4[0].ae_type;

                }

                if(tp5.length!=0)
                {
                    obj.tem4.tem4_2.g_id = tp5[0].g_id;
                    obj.tem4.tem4_2.ae_type = tp5[0].ae_type;
                }

                // console.log(obj);return;
                addTem4(obj).then(res=>{
                    if(res.data.code == 200){
                        this.dialogTemplate4 = false;
                        this.tem4Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })

            },

            addTem5()
            {
                var obj = this.template5;
                var choseTem5List1 = this.choseTem5List1;
                var choseTem5List2 = this.choseTem5List2;
                var choseTem5List3 = this.choseTem5List3;
                var choseTem5List4 = this.choseTem5List4;


                if (choseTem5List1.length==0||choseTem5List2.length==0||choseTem5List3.length==0||choseTem5List4.length==0){
                    this.$message({
                        type: "error",
                        message: "请选择产品"
                    })
                    return false;
                }


                var temData = {
                    id:obj.id,
                    aa_id:this.aa_id,
                    tem_sort:obj.tem_sort,
                    tem_top_height:obj.tem_top_height,
                    tem_down_height:obj.tem_down_height,
                }
                // console.log(temData,"1111");

                var extData=[
                    {
                        id:obj.actityList[0].id,
                        ae_type:choseTem5List1[0].ae_type,
                        g_id:choseTem5List1[0].g_id,
                        ae_sort:choseTem5List1[0].ae_sort,
                        ae_img:this.template5.actityList[0].ae_img,
                    },{
                        id:obj.actityList[1].id,
                        ae_type:choseTem5List2[0].ae_type,
                        g_id:choseTem5List2[0].g_id,
                        ae_sort:choseTem5List2[0].ae_sort,
                        ae_img:this.template5.actityList[1].ae_img,
                    },{
                        id:obj.actityList[2].id,
                        ae_type:choseTem5List3[0].ae_type,
                        g_id:choseTem5List3[0].g_id,
                        ae_sort:choseTem5List3[0].ae_sort,
                        ae_img:this.template5.actityList[2].ae_img,
                    },{
                        id:obj.actityList[3].id,
                        ae_type:choseTem5List4[0].ae_type,
                        g_id:choseTem5List4[0].g_id,
                        ae_sort:choseTem5List4[0].ae_sort,
                        ae_img:this.template5.actityList[3].ae_img,
                    },

                ]
                var data={
                    temData:temData,
                    extData:extData,
                }

                // console.log(data,'22222');

                if(this.tem5_type=='add')
                {
                    addTem5(data).then(res=>{
                        if(res.data.code == 200){
                            this.tem5Add = false;
                            this.$message.success(res.data.msg || "新增成功")
                            this.getList()
                        }else{
                            this.$message.error(res.data.msg || "网络开小差了~")
                        }
                    })

                }else if(this.tem5_type=='up'){
                    upTem5(data).then(res=>{
                        if(res.data.code == 200){
                            this.tem5Add = false;
                            this.$message.success(res.data.msg || "编辑成功")
                            this.getList()
                        }else{
                            this.$message.error(res.data.msg || "网络开小差了~")
                        }
                    })
                }
            },

            addTem6()
            {
                var obj = this.template6;

                obj.aa_id=this.aa_id;

                var choseList = this.choseList;

                var data = {
                    tem:obj,
                    ext:choseList,
                }
                // console.log(data,'-----');
                // return;
                addTem6(data).then(res=>{
                    if(res.data.code == 200){
                        this.tem6Add = false;
                        this.$message.success(res.data.msg || "编辑成功")
                        this.getList()
                    }else{
                        this.$message.error(res.data.msg || "网络开小差了~")
                    }
                })
            },

            handleAvatarSuccessshareTem5_add1(res, file)
            {
                this.template5.actityList[0].ae_img = file.response.url;
            },

            handleAvatarSuccessshareTem5_add2(res, file)
            {
                this.template5.actityList[1].ae_img = file.response.url;
            },

            handleAvatarSuccessshareTem5_add3(res, file)
            {
                this.template5.actityList[2].ae_img = file.response.url;
            },

            handleAvatarSuccessshareTem5_add4(res, file)
            {
                this.template5.actityList[3].ae_img = file.response.url;
            },



            handleAvatarSuccessshareTem1_add(res, file) {
                // 模板一图片
                this.tem1AddInfo.actityList[0].ae_img = file.response.url;
                // this.tem1Add.ae_img = file.response.url;
                // console.log(this.template1.actityList);
            },

            handleAvatarSuccessGoods(res, file, fileList,index)
            {
                this.choseList[index].ae_img = file.response.url;

                console.log(this.choseList);
            },
        },

    }
</script>
<style scoped="scoped" lang="scss">
	.goodsName{
		display: block;
	}
	.list_border{
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 20px 0;
		width: 100%;
		margin-bottom: 20px
	}
	.tem_span{
		width:70px;
	}
	.typewidth{
		width: 80px;
		float: left;
		display: inline;

	}
	.del_moudle {
		position: absolute;
		top: 35px;
		right: 20px
	}
	.updateBtn{
		position: absolute;
		top: 120px;
		right: 20px;
		width: 98px;
	}
	.select_shop {
		position: absolute;
		top: 80px;
		right: 20px
	}
	.background_color {
		position: relative;
		width: 600px;
	}

	.background_color .el-input__inner {
		width: auto;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 90px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		border: 1px dashed #ccc;
		border-radius: 10px;
		padding-top: 38px
	}
	/deep/ .avatar-uploader {
		float: left;
		height: 96px;
		border-radius: 5px;
		margin-left: 10px;
	}

	.el-form-item__content .avatar-uploader {
		float: none
	}

	.commodity {
		li {
			overflow: hidden;
			box-sizing: border-box;
			padding-top: 10px;
			border-top: 1px solid #ddd;
			margin-bottom: 5px;
		}

		li.selectName {
			padding: 10px;
			width: 640px;
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
	.avatar2{
		width: 88px;
		height: 88px;
		display: block;
		margin-right: 20px;
	}

	.avatar-uploader {
		float: left;
		height: 96px;
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
		border-color: #409EFF;
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


	.radio-list img{
		width: 120px;
		height: 80px;
		display: block;
		margin-top: 20px;
	}
	.radio-list .el-radio{
		width: 120px;
		text-align: center;
	}
	.radio-list{
		margin-bottom: 32px;
	}
</style>
