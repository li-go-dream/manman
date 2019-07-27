<template>
  <el-form :model="form" ref="form" label-width="80px" status-icon :rules="rules">
    <h1>市场开发信息跟踪管理系统</h1>
    <el-row class="input_data">
      <el-col :span="16" :push="4">
        <el-form-item label="用户名:" prop="account">
          <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16"  :push="4">
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16"  :push="4">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data(){
    return{
      form:{
        account:'',
        password:''
      },
      rules:{
        account:[
          {required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          {required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.login(this.form)
          .then(res => {
            console.log(res)
            if(res.status === 200){
              if(res.data.status === 0){
                window.localStorage.setItem('data',JSON.stringify(res.data.data));
                this.$router.push({path:'/'})
              }
            }
          })
        } else {
          this.$message({
            message: '请填写完整信息',
            type: 'warning'
          });
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-form{
    width: 520px;
    height: 380px;
    padding: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid rgba(0, 0, 0, .12);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    h1{
      height: 80px;
      line-height: 80px;
      font-weight: 400;
      text-align: center;
      color: #3c3c3c;
    }
    .input_data{
      margin-top: 20px;
    }
  }
</style>
