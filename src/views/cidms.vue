<template>
  <div class="app-container" 
    element-loading-text="跳转中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
    style="width: 100%"
    v-loading.fullscreen.lock="fullscreenLoading"
    >
    <div class="vue-card" >
       
    </div>
  </div>
</template>
<script>
import { setSubSystemLogin } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth'
import { set , get} from "@/utils/validate"
export default {
  data () {
    return {
        username:"",
        mobile:"",
        fullscreenLoading: true
    };
  },
  mounted () {
    // this.username=this.$route.query.username
    // this.mobile=this.$route.query.mobile
    this.token=this.$route.query.token
    console.log(this.token)
    this.setSubSystemLogin()
  },
  methods: {
    setSubSystemLogin(){
        setSubSystemLogin({
            token:this.token,
        }).then(res=>{
            if(res.data.code == 200){
                var data = res.data.data;
                setToken(data.adminUserName)
                localStorage.setItem("userInfo",JSON.stringify(data))
                localStorage.setItem("token",res.data.token)
                set("time",false)
                data.userRole.map(item=>{
                    if(item == 1){
                        localStorage.setItem("userRole",1)
                    }
                })
                // this.$router.push({ path: "/" });
                 window.location.href = "/";
                this.fullscreenLoading=false
            }else{
                // reject(res)
            }

        })
    }

  }
}
</script>
<style></style>