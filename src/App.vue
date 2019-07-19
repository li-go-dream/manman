<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1><img class="logo" src="http://img.25pp.com/uploadfile/app/icon/20160610/1465512499469777.jpg" alt="">
        <a href="#">市场开发信息跟踪管理系统</a></h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router="true"
            default-active="/home"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item v-for="item in noitem" :key="item.name" :index="item.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.text}}</span>
            </el-menu-item>            
            <el-submenu v-for="it in hasitem" :key="it.name" :index="it.path">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>{{it.text}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="item in it.children" :key="item.name" :index="item.path">
                  {{item.text}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <transition name="fade">
            <router-view/>
          </transition>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import routes from './router/routes'
export default {
  name: 'App',
  data(){
    return{
      noitem: routes.filter(item => !item.children && item.ismenu),
      hasitem: routes.filter(item => item.children)
    }
  },
  mounted:function(){
    console.log(this.noitem,this.hasitem)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang='scss' scoped>
  #app{
    height: 100%;
  }
  section{
    height: 100%;
    aside ul{
      height: 100%;
    }
  }
  .el-header{
    background-color: #409EFF;
  }
  h1 {
    font-size: 30px;
    .logo{
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    a{
      display: inline-block;
      text-decoration: none;
      height: 60px;
      line-height: 60px;
      color: black;
    }
  }

</style>
