<template>
	<div class="advertUpdate" v-loading="loading">
		<el-form ref="info" :rules="rules" :model="info" label-width="250px" styel="width: 80%">
			<el-form-item label="业务模块" prop="business">
				<el-select @change="checkAddress" v-model="info.business" placeholder="请选择业务模块">
					<el-option v-for="(item,index) in getCategoryList.data" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="广告ID" >
				<div style="width:300px">
					<el-input v-model.number="info.adId" placeholder="请输入广告ID，长度限制在8个数字以内"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="主标题">
				<div style="width:300px">
					<el-input v-model="info.title" placeholder="请输入主标题，长度限制在32个字符内"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="副标题">
				<div style="width:300px">
					<el-input v-model="info.subTitle" placeholder="请输入副标题，长度限制在32个字符内"></el-input>
				</div>
			</el-form-item>
			<el-form-item label="背景颜色" prop="background_color" class="background_color">
				<el-input readonly maxlength="8" v-model="info.background_color" placeholder="请选择背景颜色"></el-input>
				<el-color-picker v-model="color" @change="colorChange" class="color_name"></el-color-picker>
			</el-form-item>
			<el-form-item label="SKU" >
				<div style="width:300px">
					<el-input v-model.number="info.skuId" placeholder="请输入SKU"></el-input>
				</div>
			</el-form-item>

			<el-form-item prop="type" label="广告类型">
				<el-select v-model="info.type" placeholder="请选择广告类型">
					<el-option v-for="(item,index) in advertType" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="position" v-if="info.business != figureId" label="广告位置">
				<el-select v-model="info.position" placeholder="请选择广告位置">
					<el-option v-for="(item,index) in mallModule" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="有效时间" required>
				<div>
					<el-date-picker
						v-model="timeArray"
						type="daterange"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</div>
			</el-form-item>

			<!--		<el-form-item label="上传图片"  required>-->
			<!--			<el-upload-->
			<!--				:class="{hide1:hideUploads.hideUpload1}"-->
			<!--				list-type="picture-card"-->
			<!--				action="https://api2.yuelvhui.com/app/third/upload"-->
			<!--				:limit="1"-->
			<!--				:auto-upload="true"-->
			<!--				:on-exceed="handleOnExceed"-->
			<!--				:file-list="fileList"-->
			<!--				:on-preview="handlePictureCardPreview"-->
			<!--				:on-success="handleAvatarSuccess"-->
			<!--				:on-remove="handleRemove1"-->
			<!--				:before-upload="beforeAvatarUpload">-->
			<!--				<i class="el-icon-plus"></i>-->
			<!--			</el-upload>-->
			<!--			<el-dialog :visible.sync="dialogVisible">-->
			<!--				<img width="100%" :src="dialogImageUrl" alt="">-->
			<!--			</el-dialog>-->
			<!--		</el-form-item>-->
			<!--		<el-form-item label="适应iphoneX的尺寸图片">-->
			<!--			<el-upload-->
			<!--				:class="{hide2:hideUploads.hideUpload2}"-->
			<!--				:on-remove="handleRemove2"-->
			<!--				list-type="picture-card"-->
			<!--				action="https://api2.yuelvhui.com/app/third/upload"-->
			<!--				:limit="1"-->
			<!--				:auto-upload="true"-->
			<!--				:on-exceed="handleOnExceed1"-->
			<!--				:file-list="fileList1"-->
			<!--				:on-preview="handlePictureCardPreview1"-->
			<!--				:on-success="handleAvatarSuccess1"-->
			<!--				:before-upload="beforeAvatarUpload1">-->
			<!--				<i class="el-icon-plus"></i>-->
			<!--			</el-upload>-->
			<!--		</el-form-item>-->

			<template v-if="info.business != 12">
				<el-form-item label="上传图片"  required>
					<el-upload
						:class="{hide1:hideUploads.hideUpload1}"
						list-type="picture-card"
						action="https://api2.yuelvhui.com/app/third/upload"
						:limit="1"
						:auto-upload="true"
						:on-exceed="handleOnExceed"
						:file-list="androidFile.fileList0"
						:on-preview="handlePictureCardPreview"
						:on-success="handleAvatarSuccess"
						:on-remove="handleRemove1"
						:before-upload="beforeAvatarUpload">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="适应iphoneX的尺寸图片">
					<el-upload
						:class="{hide2:hideUploads.hideUpload2}"
						:on-remove="handleRemove2"
						list-type="picture-card"
						action="https://api2.yuelvhui.com/app/third/upload"
						:limit="1"
						:auto-upload="true"
						:on-exceed="handleOnExceed1"
						:file-list="androidFile.fileList1"
						:on-preview="handlePictureCardPreview1"
						:on-success="handleAvatarSuccess1"
						:before-upload="beforeAvatarUpload1">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
			</template>
			<template v-else>
				<el-form-item  required label="Android开机图">
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_1:hideUploads_android.hideUpload_1}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed"
							:file-list="androidFile.fileList0"
							:on-preview="handlePictureCardPreview"
							:on-success="handleAvatarSuccess_android_1"
							:on-remove="handleRemove_android_1"
							:before-upload="beforeAvatarUpload">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{android[0].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_2:hideUploads_android.hideUpload_2}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed"
							:file-list="androidFile.fileList1"
							:on-preview="handlePictureCardPreview"
							:on-success="handleAvatarSuccess_android_2"
							:on-remove="handleRemove_android_2"
							:before-upload="beforeAvatarUpload">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{android[1].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_3:hideUploads_android.hideUpload_3}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed"
							:file-list="androidFile.fileList2"
							:on-preview="handlePictureCardPreview"
							:on-success="handleAvatarSuccess_android_3"
							:on-remove="handleRemove_android_3"
							:before-upload="beforeAvatarUpload">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{android[2].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_4:hideUploads_android.hideUpload_4}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed"
							:file-list="androidFile.fileList3"
							:on-preview="handlePictureCardPreview"
							:on-success="handleAvatarSuccess_android_4"
							:on-remove="handleRemove_android_4"
							:before-upload="beforeAvatarUpload">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{android[3].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
				</el-form-item>
				<el-form-item label="iPhone开机图">
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_1_iphone:hideUploads_ios.hideUpload_1_iphone}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed1"
							:file-list="iosFile.fileList0"
							:on-preview="handlePictureCardPreview1"
							:on-success="handleAvatarSuccess_iphone_1"
							:on-remove="handleRemove_iphone_1"
							:before-upload="beforeAvatarUpload1">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{ios[0].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_2_iphone:hideUploads_ios.hideUpload_2_iphone}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed1"
							:file-list="iosFile.fileList1"
							:on-preview="handlePictureCardPreview1"
							:on-success="handleAvatarSuccess_iphone_2"
							:on-remove="handleRemove_iphone_2"
							:before-upload="beforeAvatarUpload1">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{ios[1].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_3_iphone:hideUploads_ios.hideUpload_3_iphone}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed1"
							:file-list="iosFile.fileList2"
							:on-preview="handlePictureCardPreview1"
							:on-success="handleAvatarSuccess_iphone_3"
							:on-remove="handleRemove_iphone_3"
							:before-upload="beforeAvatarUpload1">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{ios[2].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_4_iphone:hideUploads_ios.hideUpload_4_iphone}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed1"
							:file-list="iosFile.fileList3"
							:on-preview="handlePictureCardPreview1"
							:on-success="handleAvatarSuccess_iphone_4"
							:on-remove="handleRemove_iphone_4"
							:before-upload="beforeAvatarUpload1">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{ios[3].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div style="display: inline-block">
						<el-upload
							:class="{hideUpload_5_iphone:hideUploads_ios.hideUpload_5_iphone}"
							list-type="picture-card"
							action="https://api2.yuelvhui.com/app/third/upload"
							:limit="1"
							:auto-upload="true"
							:on-exceed="handleOnExceed1"
							:file-list="iosFile.fileList4"
							:on-preview="handlePictureCardPreview1"
							:on-success="handleAvatarSuccess_iphone_5"
							:on-remove="handleRemove_iphone_5"
							:before-upload="beforeAvatarUpload1">
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">规格：{{ios[4].size}}</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>


				</el-form-item>
			</template>
			<el-form-item>
				<el-button type="primary" @click=" $route.query.id ? update('info') : save('info')" v-text="$route.query.id ? '修改' :'创建'"></el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
    import waves from '@/directive/waves' // 水波纹指令
    // import { detailPersonal,categoryList,save,upAd} from '@/api/order' // 接口
    import { detailPersonal,categoryList,save,upAd} from '@/api/advert' // 接口
    export default {
        name: 'update',
        directives: {
            waves
        },
        // components: { VerticalFrom },
        data() {
            return {
                hideUploads:{
                    hideUpload1: false,
                    hideUpload2: false,
                },
                hideUploads_android:{
                    hideUpload_1: false,
                    hideUpload_2: false,
                    hideUpload_3: false,
                    hideUpload_4: false,
                },
                hideUploads_ios:{
                    hideUpload_1_iphone: false,
                    hideUpload_2_iphone: false,
                    hideUpload_3_iphone: false,
                    hideUpload_4_iphone: false,
                    hideUpload_5_iphone: false,
                },
                androidFile:{
                    fileList0: [],
                    fileList1: [],
                    fileList2: [],
                    fileList3: [],
                },
                iosFile:{
                    fileList0: [],
                    fileList1: [],
                    fileList2: [],
                    fileList3: [],
                    fileList4: [],
                },
                android:[
                    {
                        size: '1176*2400',
                        url: ''
                    },
                    {
                        size: '1080*2240',
                        url: ''
                    },
                    {
                        size: '1080*1920',
                        url: ''
                    },
                    {
                        size: '1080*2340',
                        url: ''
                    },
                ],
                ios:[
                    {
                        size: '1242*2688',
                        url: ''
                    },
                    {
                        size: '828*1792',
                        url: ''
                    },
                    {
                        size: '1125*2436',
                        url: ''
                    },
                    {
                        size: '1242*2208',
                        url: ''
                    },
                    {
                        size: '750*1334',
                        url: ''
                    },
                ],
                hotelId: '15',//酒店
                lineId: '14',//线路
                myId: '16',//我的
                figureId: '12',//开机图
                info:{
                    adId:'',
                    business: '', //业务模块
                    position: '',//位置
                    type: '',//类型
                    background_color:'',//北京颜色
                    startDate: '',//有效起始时间
                    endDate: '',//有效结束时间
                    image: '',//图片地址
                    title: '',//主标题
                    subTitle: '',//副标题
                    skuId:'',//商品sku
                    url:'',//适应ipone x 的尺寸图片
                },
                getCategoryList:'',
                fileList:[],
                fileList1:[],
                fileList3:[],
                fileList4:[],
                color:"#409EFF",
                dialogVisible: false,
                dialogImageUrl: '',
                timeArray: [],
                isShowTypes: true,
                mallModule:[],
                advertType:[],
                params:{
                    parentId: 0,
                },
                loading: false,
                rules: {
                    business: [
                        { required: true, message: '请选择业务模块', trigger: 'change' },
                    ],
                    adId: [
                        { required: true, message: '请输入广告ID', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '请输入主标题', trigger: 'blur' },
                        { max: 32, message: '不超过32个字符', trigger: 'blur' }
                    ],
                    subTitle: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                        { max: 32, message: '不超过32个字符', trigger: 'blur' }
                    ],
                    skuId: [
                        { required: true, message: '请输入广告ID', trigger: 'blur' },
                        { type: 'number', message: '请输入数字', trigger: 'blur' }
                    ],
                    background_color:[
                        { required: true, message: '请输入背景颜色', trigger: 'blur' },
                    ],
                    position: [
                        { required: true, message: '请选择广告类型', trigger: 'change' },
                    ],
                    type: [
                        { required: true, message: '请选择广告位置', trigger: 'change' },
                    ],
                    startDate: [
                        { required: true, message: '请选择有效日期', trigger: 'change' },
                    ],
                    image: [
                        { required: true, message: '请选择图片', trigger: 'blur' },
                    ],
                    url: [
                        { required: true, message: '请选择图片', trigger: 'blur' },
                    ]
                }
            }
        },
        computed: {

        },
        created() {
            this.getCategory();
            if(this.$route.query.id) {
                this.getInfo(this.$route.query.id)
            }
        },
        methods: {
            // 颜色值
            colorChange(val){
                this.info.background_color = val
            },
            save(formName){
                let _this = this
                console.log(typeof(_this.info.adId))
                if(_this.timeArray != null && _this.timeArray.length > 0){ _this.info.startDate = _this.timeArray[0];_this.info.endDate = _this.timeArray[1]; }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.info.business == 12){
                            this.info.androidInfo = this.android;
                            this.info.iphoneInfo = this.ios;
                        }else{
                            if(this.info.image == ''){
                                this.$message({
                                    type:"error",
                                    message:"请上传图片"
                                })
                                return false;
                            }
                        }
                        _this.loading = true
                        save(_this.info).then((res) => {
                            if(res.data.code == 200){
                                _this.loading = false
                                _this.$message.success('创建成功')
                                _this.$router.push({ path:'/operate/list' })
                            }else{
                                _this.loading = false;
                                this.$message.error(res.data.msg)
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            update(formName){
                let _this = this
                _this.loading = true
                if(_this.timeArray != null && _this.timeArray.length > 0){ _this.info.startDate = _this.timeArray[0];_this.info.endDate = _this.timeArray[1]; }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.loading = true
                        console.log(_this.info)

                        if(this.info.business == 12){
                            this.info.androidInfo = this.android;
                            this.info.iphoneInfo = this.ios;
                        }else{
                            if(this.info.image == ''){
                                this.$message({
                                    type:"error",
                                    message:"请上传图片"
                                })
                                return false;
                            }
                        }
                        upAd(_this.info).then((res) => {
                            if(res.data.code == 200){
                                _this.loading = false
                                _this.$message.success('修改成功')
                                _this.$router.push({ path: '/operate/list' })
                            }else{
                                _this.loading = false;
                                this.$message.error(res.data.msg)
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            checkAddress(){
                console.log('广告业务模块',this.info.business)
                this.info.image = ''
                this.info.startDate = ''
                this.info.endDate = ''
                this.params.parentId = this.info.business
                let url = 'http://kylin.api.yuelvhui.com/ad/manage/getCategory'
                let self  = this
                self.axios({
                    method: 'post',
                    url: url,
                    data: self.params,
                    responseType: 'json'
                }).then((res)=>{
                    if(res.data.code == 200){
                        self.mallModule = res.data.data
                        self.advertType = res.data.adTypeList
                        if(this.info.business == this.figureId){
                            this.isShowTypes = false
                        }
                        else {
                            this.isShowTypes = true
                        }
                    }
                    else{
                        self.$message.error(res.data.msg)
                    }
                })
            },
            getInfo(id){
                var self = this;
                detailPersonal({id:id}).then( res => {
                    if (res.data.code === 200){
                        self.info.business = res.data.data.business;
                        self.info.background_color = res.data.data.background_color
                        self.info.subTitle = res.data.data.sub_title
                        self.timeArray.push(res.data.data.start_date)
                        self.timeArray.push(res.data.data.end_date)
                        self.info.skuId = res.data.data.skuId;
                        self.info.adId = res.data.data.adId;
                        self.info.position = res.data.data.position;
                        self.info.type = res.data.data.type;
                        self.info.image = res.data.data.image;
                        self.info.title = res.data.data.title;
                        self.info.id = res.data.data.id;
                        self.info.url = res.data.data.url;
                        self.params.parentId = res.data.data.business;


                        //安卓图1
                        if(res.data.data.image != ''){
                            self.fileList.push({name:'image',url:res.data.data.image})
                        }else{
                            self.fileList = [];
                        }
                        //安卓图2
                        if(res.data.data.android_second_image != ''){
                            self.fileList3.push({name:'android_second_image',url:res.data.data.android_second_image})
                        }else{
                            self.fileList3 = [];
                        }

                        if(res.data.data.business == 12) {
                            this.android = res.data.data.androidInfo;
                            this.hideUploads_android.hideUpload_1 = true;
                            this.hideUploads_android.hideUpload_2 = true;
                            this.hideUploads_android.hideUpload_3 = true;
                            this.hideUploads_android.hideUpload_4 = true;
                            this.androidFile.fileList0.push(res.data.data.androidInfo[0]);
                            this.androidFile.fileList1.push(res.data.data.androidInfo[1]);
                            this.androidFile.fileList2.push(res.data.data.androidInfo[2]);
                            this.androidFile.fileList3.push(res.data.data.androidInfo[3]);

                            this.ios = res.data.data.iphoneInfo;
                            this.hideUploads_ios.hideUpload_1_iphone = true;
                            this.hideUploads_ios.hideUpload_2_iphone = true;
                            this.hideUploads_ios.hideUpload_3_iphone = true;
                            this.hideUploads_ios.hideUpload_4_iphone = true;
                            this.hideUploads_ios.hideUpload_5_iphone = true;
                            this.iosFile.fileList0.push(res.data.data.iphoneInfo[0]);
                            this.iosFile.fileList1.push(res.data.data.iphoneInfo[1]);
                            this.iosFile.fileList2.push(res.data.data.iphoneInfo[2]);
                            this.iosFile.fileList3.push(res.data.data.iphoneInfo[3]);
                            this.iosFile.fileList4.push(res.data.data.iphoneInfo[4]);

                        }
                        // self.fileList.push({name:'image',url:res.data.data.image});

                        //iPhone图1
                        if(res.data.data.url != ''){
                            self.fileList1.push({name:'url',url:res.data.data.url})
                        }else{
                            self.fileList1 = [];
                        }

                        if(self.info.business == self.figureId){
                            self.isShowTypes = false
                        }
                        else {
                            self.isShowTypes = true
                        }
                        let url = 'http://kylin.api.yuelvhui.com/ad/manage/getCategory'
                        self.axios({
                            method: 'post',
                            url: url,
                            data: self.params,
                            responseType: 'json'
                        }).then((res)=>{
                            if(res.data.code == 200){
                                self.advertType = res.data.adTypeList
                                self.mallModule = res.data.data
                                if(self.info.business == self.figureId){
                                    self.isShowTypes = false
                                }
                                else {
                                    self.isShowTypes = true
                                }
                            }
                            else{
                                self.$message.error(res.data.msg)
                            }
                        })
                    }
                })
            },
            onSubmit(formName) {

            },
            //获取广告类型+业务模块List
            getCategory() {
                categoryList({parentId: 0}).then(res => {
                    if (res.data.code === 200){
                        this.getCategoryList = res.data
                    }
                })
            },

            beforeAvatarUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
                const isLt = file.size / 1024 < 300;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt) {
                    this.$message.error('上传头像图片大小不能超过 300K!');
                }
                return isJPG && isLt;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleOnExceed(file,fileList) {
                this.$message({
                    type:"error",
                    message:"只能上传一张图片"
                })
            },
            //非开机图上传成功
            handleAvatarSuccess(res, file) {
                if(file.response.url){
                    this.info.image = file.response.url;
                    this.hideUploads.hideUpload1 = true;
                } else {
                    this.info.image = '';
                    this.fileList = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess1(res, file) {
                if(file.response.url){
                    this.info.url = file.response.url;
                    this.hideUploads.hideUpload2 = true;
                } else {
                    this.info.url = '';
                    this.fileList1 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            //非开机图移出图片的回调
            handleRemove1(){
                this.hideUploads.hideUpload1 = false;
                this.info.image = '';
            },
            handleRemove2(){
                this.hideUploads.hideUpload2 = false;
                this.info.url = '';
            },


            //开机图成功回调--安卓
            handleAvatarSuccess_android_1(res, file) {
                if(file.response.url){
                    this.android[0].url = file.response.url;
                    this.hideUploads_android.hideUpload_1 = true;
                } else {
                    this.android[0].url = '';
                    this.androidFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_android_2(res, file) {
                if(file.response.url){
                    this.android[1].url = file.response.url;
                    this.hideUploads_android.hideUpload_2 = true;
                } else {
                    this.android[1].url = '';
                    this.androidFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_android_3(res, file) {
                if(file.response.url){
                    this.android[2].url = file.response.url;
                    this.hideUploads_android.hideUpload_3 = true;
                } else {
                    this.android[2].url = '';
                    this.androidFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_android_4(res, file) {
                if(file.response.url){
                    this.android[3].url = file.response.url;
                    this.hideUploads_android.hideUpload_4 = true;
                } else {
                    this.android[3].url = '';
                    this.androidFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            //开机图移除回调--安卓
            handleRemove_android_1(){
                this.hideUploads_android.hideUpload_1 = false;
                this.android[0].url = '';
            },
            handleRemove_android_2(){
                this.hideUploads_android.hideUpload_2 = false;
                this.android[1].url = '';
            },
            handleRemove_android_3(){
                this.hideUploads_android.hideUpload_3 = false;
                this.android[2].url = '';
            },
            handleRemove_android_4(){
                this.hideUploads_android.hideUpload_4 = false;
                this.android[3].url = '';
            },
            //开机图成功回调--iphone
            handleAvatarSuccess_iphone_1(res, file) {
                if(file.response.url){
                    this.ios[0].url = file.response.url;
                    this.hideUploads_ios.hideUpload_1_iphone = true;
                } else {
                    this.ios[0].url = '';
                    this.iosFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_iphone_2(res, file) {
                if(file.response.url){
                    this.ios[1].url = file.response.url;
                    this.hideUploads_ios.hideUpload_2_iphone = true;
                } else {
                    this.ios[1].url = '';
                    this.iosFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_iphone_3(res, file) {
                if(file.response.url){
                    this.ios[2].url = file.response.url;
                    this.hideUploads_ios.hideUpload_3_iphone = true;
                } else {
                    this.ios[2].url = '';
                    this.iosFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_iphone_4(res, file) {
                if(file.response.url){
                    this.ios[3].url = file.response.url;
                    this.hideUploads_ios.hideUpload_4_iphone = true;
                } else {
                    this.ios[3].url = '';
                    this.iosFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            handleAvatarSuccess_iphone_5(res, file) {
                if(file.response.url){
                    this.ios[4].url = file.response.url;
                    this.hideUploads_ios.hideUpload_5_iphone = true;
                } else {
                    this.ios[4].url = '';
                    this.iosFile.fileList0 = [];
                    this.$message.error('图片上传失败，请重新上传')
                }
            },
            //开机图移除回调--iphone
            handleRemove_iphone_1(){
                this.hideUploads_ios.hideUpload_1_iphone = false;
                this.ios[0].url = '';
            },
            handleRemove_iphone_2(){
                this.hideUploads_ios.hideUpload_2_iphone = false;
                this.ios[1].url = '';
            },
            handleRemove_iphone_3(){
                this.hideUploads_ios.hideUpload_3_iphone = false;
                this.ios[2].url = '';
            },
            handleRemove_iphone_4(){
                this.hideUploads_ios.hideUpload_4_iphone = false;
                this.ios[3].url = '';
            },
            handleRemove_iphone_5(){
                this.hideUploads_ios.hideUpload_5_iphone = false;
                this.ios[4].url = '';
            },








            handleAvatarSuccess3(res, file) {
                this.info.android_second_image = file.response.url
                // console.log(this.imageUrl)
            },

            beforeAvatarUpload1(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
                const isLt = file.size / 1024 < 300;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt) {
                    this.$message.error('上传头像图片大小不能超过 300K!');
                }
                return isJPG && isLt;
            },
            handlePictureCardPreview1(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleOnExceed1(file,fileList) {
                alert('最多上传一张图片')
            },

        }
    }
</script>
<style lang="scss">
	.hide1 .el-upload--picture-card,.hide2 .el-upload--picture-card,
	.hideUpload_1  .el-upload--picture-card,
	.hideUpload_2 .el-upload--picture-card,
	.hideUpload_3 .el-upload--picture-card,
	.hideUpload_4 .el-upload--picture-card,
	.hideUpload_1_iphone  .el-upload--picture-card,
	.hideUpload_2_iphone .el-upload--picture-card,
	.hideUpload_3_iphone .el-upload--picture-card,
	.hideUpload_4_iphone .el-upload--picture-card,
	.hideUpload_5_iphone .el-upload--picture-card
	{
		display: none;
	}
	.advertUpdate {
		margin: 20px;
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
	.background_color{position: relative;width: 405px;}
	.color_name{position: absolute;right: 0;top: 0;}
</style>
