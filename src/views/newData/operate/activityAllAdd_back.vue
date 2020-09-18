<template>
	<div class="gropAdd" v-loading="loading">
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
					<li @click="choseId(item)" v-for="(item,index) in list" :key="index">
						<div class="section-p" v-if="product==39">
							<div>活动标题：{{item.activity_name}}</div>
							<div>分享标题：{{item.share_title}}</div>
						</div>
						<div v-if="product==3" class="goodItem">
							<div class="imgDiv" >
								<img :src="item.path" alt="">
							</div>
							<div class="section-p">
								<p v-text="item.goods_name"></p>
								<div>
									<span>官网价：￥{{item.origin_price}}</span>
									<span>库存：{{item.inventory}}</span>
								</div>
								<div class="otherPrice">
									<span  v-if="item.teamInfo.length"  v-for="(team,ind) in item.teamInfo" :key="ind">{{team.name}}价：￥{{team.teamPrice}}</span>

									<span  v-if="item.sekillInfo.length"  v-for="(team,ind) in item.sekillInfo" :key="ind">{{team.name}}价：￥{{team.skPrice}}</span>
									<span  v-if="item.goodProductInfo.length"  v-for="(team,ind) in item.goodProductInfo" :key="ind">{{team.name}}价：￥{{team.skPrice}}</span>
									<span  v-if="item.halfPriceInfo.length"  v-for="(team,ind) in item.halfPriceInfo" :key="ind">{{team.name}}价：￥{{team.skPrice}}</span>

									<span  v-if="item.specialActivitiesInfo.length"  v-for="(team,ind) in item.specialActivitiesInfo" :key="ind">{{team.name}}价：￥{{team.actPrice}}</span>
									<span  v-if="item.activitiesInfo.length"  v-for="(team,ind) in item.activitiesInfo" :key="ind">{{team.name}}活动价：￥{{team.actPrice}}</span>

									<span  v-if="item.BargainActivitiesInfo.length"  v-for="(team,ind) in item.BargainActivitiesInfo" :key="ind">{{team.name}}价：￥{{team.bargainPrice}}</span>
								</div>
							</div>
						</div>
						<div v-if="product==40" class="goodItem">
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
						<div v-if="product==41">
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


		<el-dialog width="800px" title="内容" :visible.sync="dialogTableVisible_miaoshao">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="选择">
					<el-input v-model="searchVal" placeholder="请输入搜索内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getSeckillsLater(1)" type="primary">搜索</el-button>
				</el-form-item>
			</el-form>
			<div class="commodity">
				<ul>
					<li @click="choseId_miaosha(item)" v-for="(item,index) in seckillsLate" :key="index">
						<div class="section-p">
							<div>活动标题：{{item.act_name}}</div>
							<div>分享标题：{{item.share_title}}</div>
						</div>

						<div class="select-btn">
							<el-button plain>选取</el-button>
						</div>
					</li>
				</ul>
			</div>
			<el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next" :total="seckillsLateTotal">
			</el-pagination>

		</el-dialog>

		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item label="综合活动名称" class="background_color">
				<el-input v-model="form.aa_name" placeholder="请输入综合活动名称"></el-input>
			</el-form-item>
			<el-form-item label="选择类型" class="background_color">
				<el-radio-group v-model="form.aa_type" @change="radioChange">
					<el-radio v-model="form.aa_type" :label="0">默认</el-radio>
					<el-radio v-model="form.aa_type" :label="1">首页</el-radio>
					<el-radio v-model="form.aa_type" :label="2">广告图</el-radio>
					<el-radio v-model="form.aa_type" :label="3">秒杀广告图</el-radio>
					<el-radio v-model="form.aa_type" :label="4">二级页面</el-radio>

				</el-radio-group>
			</el-form-item>

			<el-row>
				<!-- 秒杀广告图结果 -->
				<el-col :span="24">
					<div class="commodity">
						<ul>
							<li style="border:none" v-if="miaoshaList.act_name" class="selectName">
								<div v-if="miaoshaList.act_name">活动名称：{{miaoshaList.act_name}}</div>
								<div v-if="miaoshaList.share_title">分享标题：{{miaoshaList.share_title}}</div>
								<!-- <div v-if="item.name">名称：{{item.name}}</div> -->
							</li>
						</ul>
					</div>
				</el-col>
			</el-row>

			<el-form-item label="选择模板" class="background_color" style="width: 530px;">
				<el-button :class="item.isRelonly?'is_relonly':''" v-for="(item,idx) in moudleList" :key="idx" @click="isChange(idx,item)">{{item.name}}</el-button>
			</el-form-item>
			<div v-if="tem_form.tem_type">
				<el-form-item label="排序" class="background_color" style="width: 530px;">
					<el-input v-model="tem_form.tem_sort" placeholder="排序"></el-input>
				</el-form-item>
				<el-form-item label="上边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem_form.tem_top_height" placeholder="上边距"></el-input>
				</el-form-item>
				<el-form-item label="下边距" class="background_color" style="width: 530px;">
					<el-input v-model="tem_form.tem_down_height" placeholder="下边距"></el-input>
				</el-form-item>
				<el-form-item label="宽" class="background_color" style="width: 530px;" v-if="tem_form.tem_type==1">
					<el-input  v-model="ae_width" placeholder="宽"></el-input>
				</el-form-item>
				<el-form-item label="高" class="background_color" style="width: 530px;" v-if="tem_form.tem_type==1">
					<el-input  v-model="ae_height" placeholder="高"></el-input>
				</el-form-item>
				<el-form-item label="高" class="background_color" style="width: 530px;" v-if="tem_form.tem_type==2">
					<el-input  v-model="tem_form.tem_bgimg_height" placeholder="高"></el-input>
				</el-form-item>
				<el-form-item label="上传背景" v-if="tem_form.tem_type==2">
					<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
					:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload1">
						<img v-if="tem_form.tem_bgimg" :src="tem_form.tem_bgimg" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				<span>尺寸:750*770,300kb以内</span>
				</el-form-item>
				<!-- 内容 -->
				<el-form-item label="模板内容信息">
					<div v-if="tem_form.tem_type==1 || tem_form.tem_type==3">
						<el-row v-if="tem_form.tem_type!=3">
							<el-col :span="4"><p>图片</p></el-col>
							<el-col :span="20">
								<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
								:on-success="handleAvatarSuccessshare" :before-upload="beforeAvatarUpload1">
									<img v-if="tem_form.tem_bgimg" :src="tem_form.tem_bgimg" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span>尺寸:750*770,300kb以内</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>选择产品</p></el-col>
							<el-col :span="4">
								<el-select v-model="product" @change="selecType()">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
								</el-select>
							</el-col>
						</el-row>
					</div>
					<div v-if="tem_form.tem_type==2">
						<el-row>
							<el-col :span="4"></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem2_cont1" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont2[0].ae_img" :src="tem_cont2[0].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>选择产品</p></el-col>
									<el-col :span="20">
										<el-select v-model="product" @change="selecType(1)">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
										</el-select>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<!-- 结果1 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none" v-for="(item,index) in tem_cont2[0].cont2" :key="index" class="selectName">
											<div>模板：{{moudleList[tem_form.tem_type-1].name}}</div>
											<div>排   序：<el-input style="width: 200px;" v-model="tem_cont2[0].ae_sort" placeholder="排序"></el-input></div>
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
											<div v-if="item.name">名称：{{item.name}}</div>
											<div  style="display:flex">
												<img v-if="item.path" :src="item.path" class="avatar">
												<img v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar">
												<div>
													<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
													<div v-if="item.inventory">库存：{{item.inventory}}</div>
													<div v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
													<div v-if="item.ac_color">颜色：{{item.ac_color}}</div>
												</div>
												<div style="margin-left:20px;">
													<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="4"></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem2_cont2" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont2[1].ae_img" :src="tem_cont2[1].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>选择产品</p></el-col>
									<el-col :span="20">
										<el-select v-model="product" @change="selecType(2)">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
										</el-select>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<!-- 结果2 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none" v-for="(item,index) in tem_cont2[1].cont2" :key="index" class="selectName">
											<div>模板：{{moudleList[tem_form.tem_type-1].name}}</div>
											<div>排   序：<el-input style="width: 200px;" v-model="tem_cont2[1].ae_sort" placeholder="排序"></el-input></div>
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
											<div v-if="item.name">名称：{{item.name}}</div>
											<div  style="display:flex">
												<img v-if="item.path" :src="item.path" class="avatar">
												<img v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar">
												<div>
													<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
													<div v-if="item.inventory">库存：{{item.inventory}}</div>
													<div v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
													<div v-if="item.ac_color">颜色：{{item.ac_color}}</div>
												</div>
												<div style="margin-left:20px;">
													<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="4"></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem2_cont3" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont2[2].ae_img" :src="tem_cont2[2].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>选择产品</p></el-col>
									<el-col :span="20">
										<el-select v-model="product" @change="selecType(3)">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
										</el-select>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<!-- 结果3 -->
							<el-col :span="24">
								<div class="commodity">
									<ul>
										<li style="border:none" v-for="(item,index) in tem_cont2[2].cont2" :key="index" class="selectName">
											<div>模板：{{moudleList[tem_form.tem_type-1].name}}</div>
											<div>排   序：<el-input style="width: 200px;" v-model="tem_cont2[2].ae_sort" placeholder="排序"></el-input></div>
											<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
											<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
											<div v-if="item.name">名称：{{item.name}}</div>
											<div  style="display:flex">
												<img v-if="item.path" :src="item.path" class="avatar">
												<img v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar">
												<div>
													<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
													<div v-if="item.inventory">库存：{{item.inventory}}</div>
													<div v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
													<div v-if="item.ac_color">颜色：{{item.ac_color}}</div>
												</div>
												<div style="margin-left:20px;">
													<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</el-col>
						</el-row>

					</div>
					<div v-if="tem_form.tem_type==4">
						<el-row>
							<el-col :span="4"><p>精英会员</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：{{tem_cont4[0].ae_sort}}</p></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont1" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[0].ae_img" :src="tem_cont4[0].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>

								<!-- <el-row>
									<el-col :span="4"><el-button plain @click="selecType(99,0)">选择活动</el-button></el-col>
								</el-row> -->
								<!-- 模板4结果 -->
								<!-- <el-row>
									<el-col :span="24">
										<div class="commodity">
											<ul>
												<li style="border:none" v-for="(item,index) in tem_cont4[0].cont2" :key="index" class="selectName">
													<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
													<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
												</li>
											</ul>
										</div>
									</el-col>
								</el-row> -->

							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>拼团</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：{{tem_cont4[1].ae_sort}}</p></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont2" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[1].ae_img" :src="tem_cont4[1].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>限时半价</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：{{tem_cont4[2].ae_sort}}</p></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont3" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[2].ae_img" :src="tem_cont4[2].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<!-- <el-row>
							<el-col :span="4"><p>砍价</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：{{tem_cont4[3].ae_sort}}</p></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont4" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[3].ae_img" :src="tem_cont4[3].ae_img" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
										<span>尺寸:750*770,300kb以内</span>
									</el-col>
								</el-row>
							</el-col>
						</el-row> -->
						<el-row>
							<el-col :span="4"><p>活动</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：</p></el-col>
									<el-col :span="10"><el-input v-model="tem_cont4[4].ae_sort" placeholder="排序"></el-input></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont5" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[4].ae_img" :src="tem_cont4[4].ae_img" class="avatar">
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
												<li style="border:none" v-for="(item,index) in tem_cont4[4].cont2" :key="index" class="selectName">
													<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
													<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
												</li>
											</ul>
										</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="4"><p>活动</p></el-col>
							<el-col :span="20">
								<el-row>
									<el-col :span="4"><p>排序：</p></el-col>
									<el-col :span="10"><el-input v-model="tem_cont4[5].ae_sort" placeholder="排序"></el-input><p>排序：</p></el-col>
								</el-row>
								<el-row>
									<el-col :span="4"><p>首页展示图</p></el-col>
									<el-col :span="20">
										<el-upload class="avatar-uploader" action="https://api2.yuelvhui.com/app/third/upload" :show-file-list="false"
										:on-success="handleAvatarTem_cont6" :before-upload="beforeAvatarUpload1">
											<img v-if="tem_cont4[5].ae_img" :src="tem_cont4[5].ae_img" class="avatar">
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
												<li style="border:none" v-for="(item,index) in tem_cont4[5].cont2" :key="index" class="selectName">
													<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
													<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
												</li>
											</ul>
										</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>

					</div>
				</el-form-item>
			</div>
			<!-- 结果 -->
			<el-form-item label="结果" class="background_color" style="width: 530px;">
				<el-row>
					<el-col :span="24">
						<div class="commodity">
							<ul>
								<li style="border:none" v-for="(item,index) in tem_form.ext_info" :key="index" class="selectName">
									<div>模板：{{moudleList[tem_form.tem_type-1].name}}</div>
									<div>排   序：<el-input style="width: 200px;" v-model="item.ae_sort" placeholder="排序"></el-input></div>
									<div v-if="item.activity_name">活动名称：{{item.activity_name}}</div>
									<div v-if="item.share_title">分享标题：{{item.share_title}}</div>
									<div v-if="item.name">名称：{{item.name}}</div>
									<div  style="display:flex">
										<img v-if="item.path" :src="item.path" class="avatar">
										<img v-if="item.ac_imgs" :src="item.ac_imgs" class="avatar">
										<div>
											<div v-if="item.goods_name">商品名称：{{item.goods_name}}</div>
											<div v-if="item.inventory">库存：{{item.inventory}}</div>
											<div v-if="item.ac_name">专题名称：{{item.ac_name}}</div>
											<div v-if="item.ac_color">颜色：{{item.ac_color}}</div>
										</div>
										<div style="margin-left:20px;">
											<div v-if="item.origin_price">官网价：¥{{item.origin_price}}</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item class="background_color">
				<el-button type="danger" plain @click='addTemplate'>添加模板</el-button>
			</el-form-item>

			<el-form-item v-for="(item,index) in form.tem_info" :key="index" style="border:1px solid #333">
				<el-row>
					<el-col :span="4">模板：{{item.tem_type}}</el-col>
					<el-col :span="4">排序：{{item.tem_sort}}</el-col>
					<el-col :span="4">上边距：{{item.tem_top_height}}</el-col>
					<el-col :span="4">下边距：{{item.tem_down_height}}</el-col>
					<el-col :span="4" v-if="item.tem_bgimg">主图：<img :src="item.tem_bgimg" style="width:100px;height:100px;"></el-col>
				</el-row>
				<el-row v-for="(items,idx) in item.ext_info" :key="idx">
					<el-col :span="4" v-if="items.ae_img">图片<img :src="items.ae_img" style="width:100px;height:100px;"></el-col>
					<el-col :span="4" v-if="items.name">名称：{{items.name}}</el-col>
					<el-col :span="4" v-if="items.activity_name">名称：{{items.activity_name}}</el-col>
					<el-col :span="4" v-if="items.product_name">名称：{{items.product_name}}</el-col>
					<el-col :span="4">产品/商品排序：{{items.ae_sort}}</el-col>
					<el-col :span="4" v-if="items.ae_width">宽：{{items.ae_width}}</el-col>
					<el-col :span="4" v-if="items.ae_height">高：{{items.ae_height}}</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" @click="del(index)">删除模板</el-button>
				</el-row>
			</el-form-item>


			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">保存数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import _ from 'lodash'
	import waves from '@/directive/waves' // 水波纹指令
	import uploadImg from '../../public/uploadImg'
	import {
		tabGoods,
		getBargain,
		getSeckill,
        getActivities,
        getActivitiesCoupons,
		deletItemeGoods,
		getCoupons,
		addActivityAll,
		getSeckillsLater
	} from '@/api/shops'
import { constants } from 'crypto';
import { truncate, truncateSync } from 'fs';
import { all } from 'q';
	const isInArray = (single, arr) => {
		return (arr.findIndex(res => {
			return res === single
		})) >= 0
	}
	export default {
		directives: {
			waves
		},
		components: {
			uploadImg
		},
		data() {
			return {
				total: 1,
				dialogTableVisible: false,
				dialogTableVisible_miaoshao:false,
				ae_width:'',
				ae_height:'',

				form: {
					aa_name:'',//活动名称
					aa_type:2,//活动分类：0，默认；1，首页；2，广告
					tem_info:[],//汇总
				},
				tem_form:{
					tem_type:'',//模板 模板类型：1，图；2，多图；3，商品；4，秒拼限砍
					tem_sort:'',//模板排序
					tem_top_height:'',//距上个模板距离
					tem_down_height:'',//距下边模板距离
					ext_info:[],//暂存弹窗中选择内容
				},//存放添加模板信息
				tem_cont2:[
				    {
					ae_img:'',
					ae_type:'',
					g_id: '',
					ae_sort: 2,
					product_name: "",
					cont2:[]
					},{
						ae_img:'',
						ae_type:'',
						g_id: '',
						ae_sort: 2,
						product_name: "",
						cont2:[]
					},{
						ae_img:'',
						ae_type:'',
						g_id: '',
						ae_sort: 2,
						product_name: "",
						cont2:[]
				}],//存放模板2内容
				tem_cont4:[
					// {
					// 	ae_img:'',
					// 	product_name: "活动",
					// 	ae_sort:10000,
					// 	ae_type: 39,
					// 	cont2:[]
					// },

					{
						ae_img:'',
						product_name: "精英会员",
						ae_sort:10000,
						ae_type: 5,
						g_id:0,
						// cont2:[]
					}
					,{
						ae_img:'',
						product_name: "拼团",
						ae_sort:9999,
						ae_type: 34,
						g_id:0
					},{
						ae_img:'',
						product_name: "限时半价",
						ae_sort:9998,
						ae_type: 33,
						g_id:0
					},{
						ae_img:'',
						product_name: "砍价",
						ae_sort:0,
						ae_type: 32,
						g_id:0
					},{
						ae_img:'',
						ae_sort:0,
						product_name: "",
						ae_type: 39,
						cont2:[]
					},{
						ae_img:'',
						ae_sort:0,
						product_name: "",
						ae_type: 39,
						cont2:[]
				}],//存放模板4图片
				loading: false,
				list: [],
				moudleList: [
				    {
						isRelonly: false,
						name: "模板1",
						tem_type: 1,
					}, {
						isRelonly: false,
						name: "模板2",
						tem_type: 2,
					},
					{
						isRelonly: false,
						name: "模板3",
						tem_type: 3,
					}, {
						isRelonly: false,
						name: "模板4",
						tem_type: 4,
					}
				],
				options: [
				    {
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
				}],
				searchVal: '',
				product:'',//选择产品
				chose2Cont:'',//当前点的第几个选择产品
				page:1,
				seckillsLateTotal:0,
				seckillsLate:[],
				miaoshaList:{},
			}
		},
		mounted() {
			if (this.$route.query.id) {
				this.loading = true;
				this.getList(this.$route.query.id)
			}
		},
		methods: {
			// 选择模板
			isChange(idx, item) {
				if(this.form.aa_type==2 && item.tem_type!=1){
					this.$message('广告图只能使用模板1');
					return
				}
				if(item.tem_type==1){
					this.tem_form.tem_bgimg=''
				}else if(item.tem_type==2){
					this.tem_form.tem_bgimg
				}
				this.tem_form.tem_type=item.tem_type
			},
			// 图片
			handleAvatarSuccess(res, file) {
				// 模板背景图   仅模板2有
				this.tem_form.tem_bgimg = file.response.url;
			},
			// 分享图片
			handleAvatarSuccessshare(res, file) {
				// 活动图片
				this.tem_form.tem_bgimg = file.response.url;
			},
			beforeAvatarUpload1(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt = file.size / 1024 < 300;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 300K!');
				}
				return isJPG && isLt;
			},
			selecType(val,tp){
				this.dialogTableVisible = true;
				this.searchVal=''

				if(val){
					if(val==99){//模板4
						this.product=39
						this.chose2Cont=tp
					}else{
						this.tem_cont2[val-1].ae_type=this.product
						this.chose2Cont=val-1
					}
				}
				this.getTabGoods(1)
			},
			handleCurrentChange(val) {
				this.getTabGoods(val)
			},
			handleCurrentChange2(val) {
				this.getSeckillsLater(val)
			},
			// 弹框 顶部搜索
			getTabGoods(page) {
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
			// 弹框 选择内容
			choseId(item) {
				if(this.tem_form.tem_type==2){
					// 用户展示
					this.tem_cont2[this.chose2Cont].cont2=[]
					this.tem_cont2[this.chose2Cont].cont2.push(item)
					// 用于后台传值
					this.tem_cont2[this.chose2Cont].g_id=item.id
					this.tem_cont2[this.chose2Cont].product_name=item.activity_name
				}else if(this.tem_form.tem_type==4){
					// 用户展示
					this.tem_cont4[this.chose2Cont].cont2=[]
					this.tem_cont4[this.chose2Cont].cont2.push(item)
					// 用于后台传值
					this.tem_cont4[this.chose2Cont].g_id=item.id
					// this.tem_cont4[this.chose2Cont].product_name=item.activity_name
				}
				else{
					if(this.tem_form.tem_type!=3){
						this.tem_form.ext_info=[]
					}
					// if(this.tem_form.tem_type==1){

					// }
					this.tem_form.ext_info.push(item)
					if(this.tem_form.tem_type==3){
						this.tem_form.ext_info[this.tem_form.ext_info.length-1].ae_type = this.product
						this.tem_form.ext_info[this.tem_form.ext_info.length-1].g_id = item.id
					}
				}
				this.dialogTableVisible = false;
			},
			// 添加模板
			addTemplate(){
				// 模板1
				if(this.tem_form.tem_type==2){
					for(var i=0;i<this.tem_cont2.length;i++){
						if(this.tem_cont2[i].cont2[0].sku_id){
							this.tem_cont2[i].sku_id=this.tem_cont2[i].cont2[0].sku_id
						}
						delete this.tem_cont2[i].cont2
					}
					this.tem_form.ext_info=[].concat(this.tem_cont2)
				}else if(this.tem_form.tem_type==4){
					this.tem_form.ext_info=[].concat(this.tem_cont4)
					this.tem_form.ext_info[4].g_id=this.tem_cont4[4].cont2[0].id
					this.tem_form.ext_info[5].g_id=this.tem_cont4[5].cont2[0].id
				}else if(this.tem_form.tem_type==1){
					this.tem_form.ext_info[0].ae_width=this.ae_width
					this.tem_form.ext_info[0].ae_height=this.ae_height
					this.tem_form.ext_info[0].ae_img=this.tem_form.tem_bgimg
					this.tem_form.ext_info[0].ae_type=this.product
					this.tem_form.ext_info[0].g_id=this.tem_form.ext_info[0].id
					delete this.tem_form.tem_bgimg
				}

				this.form.tem_info.push(this.tem_form)
				console.log(this.form.tem_info,'this.form.tem_info')

				this.tem_form={
					tem_type:'',//模板 模板类型：1，图；2，多图；3，商品；4，秒拼限砍
					tem_sort:'',//模板排序
					tem_top_height:'',//距上个模板距离
					tem_down_height:'',//距下边模板距离
					ext_info:[],//暂存弹窗中选择内容
				},
				this.tem_cont4=[{
						ae_img:'',
						product_name: "精英会员",
						ae_sort:10000,
						ae_type: 5,
						g_id:0
					},{
						ae_img:'',
						product_name: "拼团",
						ae_sort:9999,
						ae_type: 34,
						g_id:0
					},{
						ae_img:'',
						product_name: "限时半价",
						ae_sort:9998,
						ae_type: 33,
						g_id:0
					},{
						ae_img:'',
						product_name: "砍价",
						ae_sort:0,
						ae_type: 32,
						g_id:0
					},{
						ae_img:'',
						ae_sort:0,
						product_name: "",
						ae_type: 39,
						cont2:[]
					},{
						ae_img:'',
						ae_sort:0,
						product_name: "",
						ae_type: 39,
						cont2:[]
				}]
				this.tem_cont2=[{
					ae_img:'',
					ae_type:'',
					g_id: '',
					ae_sort: 2,
					product_name: "",
					cont2:[]
					},{
						ae_img:'',
						ae_type:'',
						g_id: '',
						ae_sort: 2,
						product_name: "",
						cont2:[]
					},{
						ae_img:'',
						ae_type:'',
						g_id: '',
						ae_sort: 2,
						product_name: "",
						cont2:[]
				}]
			},
			// 模板4图片
			handleAvatarTem_cont1(res, file){
				this.tem_cont4[0].ae_img= file.response.url;
			},
			handleAvatarTem_cont2(res, file){
				this.tem_cont4[1].ae_img= file.response.url;
			},
			handleAvatarTem_cont3(res, file){
				this.tem_cont4[2].ae_img= file.response.url;
			},
			handleAvatarTem_cont4(res, file){
				this.tem_cont4[3].ae_img= file.response.url;
			},
			handleAvatarTem_cont5(res, file){
				this.tem_cont4[4].ae_img= file.response.url;
			},
			handleAvatarTem_cont6(res, file){
				this.tem_cont4[5].ae_img= file.response.url;
			},
			handleAvatarTem2_cont1(res, file){
				this.tem_cont2[0].ae_img= file.response.url;
			},
			handleAvatarTem2_cont2(res, file){
				this.tem_cont2[1].ae_img= file.response.url;
			},
			handleAvatarTem2_cont3(res, file){
				this.tem_cont2[2].ae_img= file.response.url;
			},
			// 删除暂存模板
			del(index){
				// console.log(index)
				console.log(this.form.tem_info)
				this.form.tem_info.splice(index,1)
			},
			onSubmit() {
				var data = _.clone(this.form)
				data.act_id=this.miaoshaList.act_id;
				// console.log(data);return;
				addActivityAll(data).then(res => {
					if (res.data.code == 200) {
						this.$message({
							message: '添加成功',
							type: 'success',
						})
						this.$router.push('/operate/activityAll')
					} else {
						this.$message({
							message: res.data.msg || '添加失败',
							type: 'error',
						})
					}
				})
			},
			getSeckillsLater(page)
			{
				var data=
				{
					page:page,
					keyword:this.searchVal
				}
				getSeckillsLater(data).then((res) => {
					if (res.data.code == 200) {
						this.seckillsLate = res.data.data
						this.seckillsLateTotal = res.data.count
					}
				}).catch((error) => {
					console.log(error)
				})

			},

			radioChange:function(val)
			{
				if(val==3)
				{
					this.getSeckillsLater(1);
					this.dialogTableVisible_miaoshao=true;
				}
			},
			choseId_miaosha(item)
			{
				// console.log(item);
				this.miaoshaList.share_title=item.share_title;
				this.miaoshaList.act_name=item.act_name;
				this.miaoshaList.act_id=item.id;
				this.dialogTableVisible_miaoshao=false;
				// console.log(item);
			},

		}
	}
</script>
<style scoped="scoped" lang="scss">
	.el-form-item__content span {
		clear: both
	}

	.goodItem{
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
	}

	.list_border ,.list_border1{
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 20px 0;
		width: 800px;

		/deep/ .el-form-item__label {
			color: #409EFF
		}
	}
    .list_border1{
        width: 80%;
    }

	.list_info {
		overflow: hidden;
		margin-bottom: 20px;
	}

	.input_list {
		float: left;
		width: 230px;
		margin-left: 20px;
		margin-top: 26px;

		.el-input--medium {
			margin-top: 10px
		}
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

	/deep/ .el-upload-list--picture-card .el-upload-list__item {
		width: 88px;
		height: 88px;
	}

	/deep/ .el-upload--picture-card {
		display: inline-block;
		width: 88px;
		height: 88px;
		line-height: 90px;
	}

	.avatar {
		width: 88px;
		height: 88px;
		display: block;
		margin-right:20px;
	}

	.ipt_list input {
		width: 125px;
		padding-left: 5px;
		border-radius: 5px;
		margin-right: 10px;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		margin-top: 7px
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

		;

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

	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none
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
			width: 670px;
			margin: 15px 0;
			background: #f1f1f1;
		}

		li.small_bg.selectName {
			width: 480px
		}

		.imgDiv {
			/*float: left;*/
			background: #fff;
			width: 70px;
			height: 70px;

			img {
				width: 100%;
				height: 100%;
			}
		}
		.otherPrice{
			color: #aaa;
			margin-top: 10px;
		}

		.section-p {
			width: 500px;
			padding-left: 10px;
			box-sizing: border-box;
			/*float: left;*/
			p{
				margin: 0;
			}
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

	/deep/ .del_item .el-button--danger.is-plain {
		padding: 0;
		width: 50px;
		height: 25px;
	}

	.background_color {
		position: relative;
		width: 600px;
	}

	.background_color .el-input__inner {
		width: auto;
	}

	.color_name {
		position: absolute;
		right: 0;
		top: 0;
	}

	.is_relonly {
		color: #409EFF;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
	}

	.del_moudle {
		position: absolute;
		top: 35px;
		right: 20px
	}

	.select_shop {
		position: absolute;
		top: 80px;
		right: 20px
	}
</style>
