<template>
  <el-dialog :visible.sync="dialogFormVisible" width="384px">
    <el-form :model="form" ref="form" label-width="80px" class="addpeople" :rules="rules">
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="姓 名:" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="职 务:" prop="position">
            <el-input v-model="form.position" placeholder="请输入职务"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="账 号:" prop="account">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="密 码:" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item>
            <el-button type="primary" @click="submint('form')">保存</el-button>
            <el-button @click="dialogFormVisible=false">关闭</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      dialogFormVisible:false,
      form:{
        name:'',
        position:'',
        account:'',
        password:''
      },
      rules:{
        name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        position:[
          { required: true, message: '请输入职务', trigger: 'blur' },
        ],
        account:[
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    init(){
      this.dialogFormVisible=true;
    },
    submint(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.addpeople(this.form)
          .then(res => {
            if(res.data.status === 0){
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.dialogFormVisible=false;
              this.$emit('add',true);
            }
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
  .addpeople{
    .el-input{
      input{
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
  }
</style>
