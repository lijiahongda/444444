<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>

        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>

      <!--  <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip> -->
				<div style="float:left;margin-right: 20px;">
					<span style="color: #f90;">{{nickname}}</span>，您好
				</div>
        <lang-select class="international right-menu-item"/>

        <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
			<el-dropdown-item divided>
				<span @click="dialogFormVisible=true">修改密码</span>
			</el-dropdown-item>
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">-->
            <!--<el-dropdown-item>-->
              <!--{{ $t('navbar.github') }}-->
            <!--</el-dropdown-item>-->
          <!--</a>-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
			<el-form :model="form" label-width="80px">
				<el-form-item label="原始密码">
					<el-input v-model="form.oldPwd" autocomplete="off" show-password></el-input>
				</el-form-item>
				<el-form-item label="新密码" >
					<el-input v-model="form.newPwd" autocomplete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="resetPwd">确 定</el-button>
			</div>
		</el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import {getToken} from  "@/utils/validate"
import { upAdminUserPwd} from '@/api/admin'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
	data(){
		return {
			nickname:"",
          dialogFormVisible: false,
          form:{

          },
          formLabelWidth: '100px'
		}
	},
	mounted(){
		this.nickname = JSON.parse(localStorage.getItem("userInfo")).adminUserName
	},
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    resetPwd(){
      this.form.adminUserId= JSON.parse(localStorage.getItem('userInfo')).adminUserId,
        upAdminUserPwd(this.form).then(res=>{
          if(res.data.code == 200){
            this.dialogFormVisible = false;
            this.form = {};
            this.$message.success(res.data.msg)
          }else{
            this.$message.error(res.data.msg)
          }
        })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
	border-bottom: 1px solid #ccc;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
