import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes,
})

router.beforeEach((to,from,next) => {
  var islogin = Boolean(window.localStorage.getItem('data')) ? true : false;
  if(to.matched.length === 0){
    next({
      path: '/404'
    })
  }else{
    if(to.meta.authRequired){
      if(islogin){
        next();
      }else{
        next({
          path: '/login'
        })
      }    
    }else{
      next();
    }
  }
})

export default router