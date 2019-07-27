<template>
  <el-dialog :title="isadd ? '添加':'修改'" :visible.sync="dialogFormVisible" width="384px">
    <el-form :model="form" ref="form" label-width="100px" class="updatedictionary" :rules="rules">
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="字典名称:" prop="name">
            <el-input v-model="form.name" placeholder="请输入字典名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="字典代码:" prop="code">
            <el-input v-model="form.code" placeholder="请输入字典代码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="2">
          <el-form-item label="字典类型:">
            <el-input v-model="form.type" placeholder="请输入字典类型"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="1">
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
      isadd:true,
      dialogFormVisible:false,
      form:{
        id:0,
        name:'',
        code:'',
        type:''
      },
      rules:{
        name:[
          { required: true, message: '请输入字典名称', trigger: 'blur' },
        ],
        code:[
          { required: true, message: '请输入字典代码', trigger: 'blur' },
        ],
      }
    }
  },
  methods:{
    init(n){
      this.dialogFormVisible=true;
      if(n){
        this.form = n
        this.isadd=false
      }else{
        this.isadd=true
      }
    },
    submint(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.addorupdate_dic(this.form)
          .then(res => {
            if(res.data.status === 0){
              this.reset();
              this.$emit('succ',true);
              this.dialogFormVisible=false;
            }else{
             this.$message.error(res.data.msg);
            }
          })
          console.log(this.form)
        } else {
          return false;
        }
      });
    },
    reset(){
      this.form.id=0,
      this.form.name='',
      this.form.code='',
      this.form.type=''
    }
  }
}
</script>

<style lang="scss">
  .updatedictionary{
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
