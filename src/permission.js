import router from './router'
import store from './store'
import {
 getUserPowers
} from '@/api/admin'
import {
 Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
 getToken,
 removeToken
} from '@/utils/auth' // getToken from cookie
import {
 set,
 get
} from "./utils/validate"

NProgress.configure({
 showSpinner: false
}) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
 if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
 if (!permissionRoles) return true
 return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login','/cidms'] // no redirect whitelist

router.beforeEach((to, from, next) => {
 NProgress.start() // start progress bar
 if (getToken() && localStorage.getItem("userInfo")) { // determine if there has token
  /* has token*/
  // console.log(to, 'toto')
  var timeDate = get("time", 60 * 60000);
  if (timeDate == true) {
   removeToken()
   localStorage.clear();
   location.reload()
  } else {
   set("time", false)
  }
  if (to.path === '/login') {
   next()
   router.push('/')
   NProgress.done() // if current page is dashboard will not trigger afterEach hook, so manually handle it
  } else {
   getUserPowers({}, {
    Authorization: 'Admin ' + (JSON.parse(localStorage.getItem('userInfo')).adminUserId + '.' +localStorage.getItem('token'))
   }).then(res => {
    console.log(res,'22222')
    store.dispatch("setRouterList",res.data.data).then(res=>{
     next()
    })
    
   })
   
  }
 } else {
  /* has no token*/
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
   next()
  } else {
   next() // 否则全部重定向到登录页
   router.push(`/login`)
   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  }
 }
})

router.afterEach(() => {
 NProgress.done() // finish progress bar
})