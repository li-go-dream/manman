<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <el-row>
      <el-col :span="8" :push="8">
        <el-button @click="fun='总表';isfun=1">总表</el-button>
        <el-button class="endbtn" @click="fun='分项表';isfun=0">分项表</el-button>
      </el-col>
    </el-row>
    <div style="height:40px"></div>
    <el-row class="bottom_row">
      <el-col :span="8" :push="8">
        <el-input v-model="fun">
          <el-button slot="append" @click="save(msg)">保存</el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props:{
    msg:{
      type:Array,
    }
  },
  data(){
    return{
      fun:'总表',
      isfun:1,
      dialogFormVisible:false
    }
  },
  methods:{
    init(){
      this.dialogFormVisible=true;
    },
    save(id){
      console.log(id,1)
      if(this.isfun){
        var data={
          leader:[],
        }
      }else{
        var data={
          leader:id,
        }
      }
      this.$ajax.code_export(data)
      .then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
  .el-row .endbtn{
    float: right;
  }
  .bottom_row{
    margin-bottom: 40px;
  }
</style>
