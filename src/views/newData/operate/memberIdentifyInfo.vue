<template>
    <div class="wrap" v-loading="loading">
        <h2>通过实名认证</h2>
        <ul class="info">
            <li>
                <span class="titles">手机号:&nbsp;&nbsp;</span>
                <span class="cont">{{info.mobile ? info.mobile : '未绑定手机号'}}</span>
            </li>
            <li>
                <span class="titles">昵称:&nbsp;&nbsp;</span>
                <span class="cont">{{info.nickName ? info.nickName : '暂无昵称'}}</span>
            </li>
        </ul>
        <div class="addInfo">
            <div class="adds">
                <span>真实姓名</span>
                <el-input
                    placeholder="请输入真实姓名"
                    v-model="info.trueName">
                </el-input>
            </div>
            <div class="adds">
                <span>身份证号</span>
                <el-input
                    placeholder="请输入有效身份证号"
                    v-model="info.cardId">
                </el-input>
            </div>
        </div>
        <ul class="pics">
            <li>
                
                <div class="addimg">
                    <div class="addimg-btn" style="float:left;">
                        <span v-show="!info.frontImg" class="titles">身份证正面</span>
                        <input
                        type="file"
                        :id="('img-upload1')"
                        multiple
                        accept="image/*"
                        @change="uploadImg($event,1,1+1,1)"
                        >
                    </div>
                    <p>
                        <img v-show="info.frontImg" :src="info.frontImg" style="width:100%">
                        <a @click="clickShowImage(info.frontImg)">点击放大</a>                        
                    </p>
                    <span class="content" style="color: green">请选择100KB以内的图片</span>
                    <i v-show="info.frontImg" @click="deletePic(1)" class="el-icon-circle-close"></i>
                </div>
            </li>
            <li>
                <div class="addimg">
                    <div class="addimg-btn" style="float:left;">
                        <span v-show="!info.backImg" class="titles">身份证反面</span>
                        <input
                        type="file"
                        :id="('img-upload2')"
                        multiple
                        accept="image/*"
                        @change="uploadImg($event,2,1+1,1)"
                        >
                    </div>
                    <p>
                        <img v-show="info.backImg" :src="info.backImg" style="width:100%">
                        <a @click="clickShowImage(info.backImg)">点击放大</a>
                    </p>
                    <span class="content" style="color: green">请选择100KB以内的图片</span>
                    <i v-show="info.backImg" @click="deletePic(2)" class="el-icon-circle-close"></i>
                </div>
            </li>
            <li>
                <div class="addimg">
                    <div class="addimg-btn" style="float:left;">
                        <span v-show="!info.thirdImg" class="titles">手持身份证</span>
                        <input
                        type="file"
                        :id="('img-upload3')"
                        multiple
                        accept="image/*"
                        @change="uploadImg($event,3,1+1,1)"
                        >
                    </div>
                    <p>
                        <img v-show="info.thirdImg" :src="info.thirdImg" style="width:100%">
                        <a @click="clickShowImage(info.thirdImg)">点击放大</a>
                    </p>
                    <span class="content" style="color: green">请选择100KB以内的图片</span>
                    <i v-show="info.thirdImg" @click="deletePic(3)" class="el-icon-circle-close"></i>
                </div>
            </li>
        </ul>
        <div class="commits">
            <el-button v-if="info.isIdentifyCheck != 1" type="primary" @click="authentication">实名认证</el-button>
            <el-button type="success" @click="history">返回</el-button>
        </div>

	<!-- 模板1 -->
		<el-dialog title="图片" :visible.sync="showImage" @close="closeBox">
              <img v-show="image" :src="image" style="width:100%">
		</el-dialog>


    </div>
</template>

<script>
 import {getMemberIdentify,upMemberIdentify} from '@/api/shops'
export default {
    data(){
        return {
            info: {
                trueName: '',
                cardId: '',
                frontImg: '',
                backImg: '',
                thirdImg: '',
                mid: 0,
            },
            files: '',
            loading: false,
            image:'',
            showImage:false,
        }
    },
    created() {

        if(this.$route.query.id)
        {
             getMemberIdentify({id:this.$route.query.id}).then(res=>{
                if(res.data.code==200)
                {
			        this.info = res.data.data
				}
			})

        }
    },
    methods: {
        uploadImg(e, type, index, temindex) {//图片上传组件
            let sizes = 100;
            var self = this;
            var id = "img-upload" + type;
            let files = document.getElementById(id).files;
            if (files && files.length) {
                var fd = new window.FormData();
                fd.append("file", files[0]);
                var reader = new window.FileReader();
                // 图片大小 300KB
                var fileSize = sizes * 1024;
                reader.readAsDataURL(files[0]);
                reader.onload = function(e) {
                    if (files[0].size > fileSize) {
                        self.openNotification({
                        title: `只能上传小于${sizes}kb的图片`,
                        message: "",
                        type: "Warming",
                        duration: 5000
                        })
                        document.getElementById(id).value = "";
                    }
                    else {
                        if(type == 1){
                            self.info.frontImg = e.target.result
                        }
                        else if(type == 2){
                            self.info.backImg = e.target.result
                        }
                        else{
                            self.info.thirdImg = e.target.result
                        }
                        console.log(self.info)
                    }
                };
            }
        },
        deletePic(i){
            if(i == 1){
                this.info.frontImg = ''
            }
            else if(i == 2){
                this.info.frontImg = ''
            }
            else{
                this.info.backImg = ''
            }
        },
        authentication(){
            let self = this
            let info = self.info
            let message = ''
            if(!info.trueName){
                message = '请填写真实姓名'
            }
            else if(!info.cardId){
                message = '请填写认证人身份证号'
            }
            else if(!info.frontImg){
                message = '请上传身份证正面照片'
            }
            else if(!info.backImg){
                message = '请上传身份证反面照片'
            }
            else if(!info.thirdImg){
                message = '请上传认证人手持身份证照片'
            }
            if(message){
                this.$notify.error({
                    title: '认证失败',
                    message: message,
                    showClose: true
                });
                return false
            }
            self.loading = true

            upMemberIdentify({info}).then(res=>{
                if(res.data.code==200)
                {
                    self.loading = false
                    self.$message({
                        type: 'info',
                        message: '认证成功'
                    });
                    this.$router.push('/operate/memberIdentifyList')
                    
				}else{
                     self.$message({
                        type: 'info',
                        message: '认证失败'
                    });
                }
			})




            // let url = 'http://kylin.api.yuelvhui.com/api/member/identify/check'
            // self.axios({
            //     method: "post",
            //     url: url,
            //     data: self.info,
            //     responseType: "json"
            // })
            // .then(res => {
            // if (res.data.code == 200) {
            //     self.loading = false
            //     self.$message({
            //         type: 'info',
            //         message: '认证成功'
            //     });
            //     this.$router.push('/operate/memberList')
            // }
            // })
            // .catch(error => {
            //     console.log(error)
            // });



        },
        history(){
            history.go(-1)
        },

        clickShowImage(image)
        {
            this.image = image;
            this.showImage=true;
        },
        closeBox()
        {
            
        }
    },
}
</script>
<style lang="scss" scoped>
    .wrap{
        border: 1px solid #ccc;
        padding: 20px;
        box-sizing: border-box;
        h2{
            font-size: 30px;
            color: #000;
            font-weight: bold;
        }
        .info{
            width: 100%;
            height: 100px;
            background-color: #ececec;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            padding-left:30px;
            box-sizing: border-box;
            margin: 30px 0;
            list-style: none;
            li{
                min-width: 300px;
                .titles{
                    color: #000;
                }
                .cont{
                    color: blue;
                }
            }
        }
        .addInfo{
            width: 100%;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .adds{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 400px;
                margin-bottom: 20px;
                span{
                    display: block;
                    width: 100px;
                }
            }
        }
        .pics{
            padding: 0;
            margin: 0;
            list-style: none;
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            li{
                width: 400px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                .addimg{
                    width: 300px;
                    height: 200px;
                    position: relative;
                    overflow: hidden;
                    .titles{
                        width: 100%;
                        height: 180px;
                        text-align: center;
                        line-height: 180px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        font-size: 30px;
                    }
                    .addimg-btn,p{
                        width: 100%;
                        height: 180px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        padding: 0;
                        margin: 0;
                        cursor: pointer;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    p img,.addimg-btn input{
                        width: 100%;
                        height: 180px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                    }
                    .addimg-btn input{
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 100;
                        cursor: pointer;
                        opacity: 0;
                    }
                    .content{
                        position: absolute;
                        bottom: -20px;
                        left: 0;
                        display: block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                    }
                    i{
                        font-size: 30px;
                        position: absolute;
                        right: 0px;
                        top: 0px;
                        z-index: 111;
                        cursor: pointer;
                    }
                }
            }
        }
        .commits{
            padding-left: 50px;
            box-sizing: border-box;
        }
    }
</style>
