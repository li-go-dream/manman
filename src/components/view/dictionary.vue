<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <el-input placeholder="请输入关键字" v-model="keyword"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <div style="height:20px;"></div>
    <el-row :gutter="10">
      <el-col :span="2">
        <el-button type="primary" @click="Adddic">添加字典</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="deleted">批量删除</el-button>
      </el-col>
    </el-row>
    <div style="height:10px; border-bottom:1px solid rgba(0, 0, 0, .12);"></div>
    <el-table
      v-loading="isloading"
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="字典名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="code"
        label="字典代码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="字典类型">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="updateRow(scope.row)"
            type="warning"
            size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height:30px;"></div>
    <div>
      <div style="display:inline-block;float:right;margin-right:20px;">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="totalpage">
        </el-pagination>
      </div>
    </div>
    <Updatedictionary @succ="issucc" ref="isUpdatedictionary"></Updatedictionary>
  </div>
</template>

<script>
import Updatedictionary from './updatedictionary'
export default {
  data(){
    return{
      isloading:true,
      currentPage:1,
      size:10,
      totalpage:1,
      keyword:'',
      tableData:[],
      checkedid:[]
    }
  },
  components:{
    Updatedictionary
  },
  mounted:function(){
    var data={
      page:this.currentPage,
      size:this.size,
    }
    this.getdictionary(data);
  },
  methods:{
    handleSelectionChange(val) {
      this.checkedid = [];
      val.map(item => {
        this.checkedid.push(item.id)
      })
    },
    issucc(msg){
      if(msg){
        var data={
          page:this.currentPage,
          size:this.size,
        }
        this.getdictionary(data);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      var data={
        page:val,
        size:this.size
      }
      this.getdictionary(data);
    },
    search(){
      var data = {
        keyword:this.keyword,
        page:this.currentPage,
        size:this.size,
      }
      this.getdictionary(data);
    },
    getdictionary(data){
      this.isloading = true;
      this.$ajax.getdictionary(data)
      .then(res => {
        console.log(res)
        if(res.data.status === 0){
          this.tableData = res.data.data;
          this.totalpage = res.data.count;
          this.isloading = false;
        }
      })
    },
    deleted(){
      if(this.checkedid.length === 0){
        this.$message.error('请选择要删除的字典')
        return false;
      }else{
        var data ={
          id: this.checkedid
        }
        this.$ajax.delete_dic(data)
        .then(res => {
          console.log(res)
          if(res.data.status ===0){
            if((this.totalpage - this.checkedid.length)%this.size === 0){
              var data={
                page:this.currentPage -1,
                size:this.size,
              }
            }else{
               var data={
                page:this.currentPage,
                size:this.size,
              }
            }
            this.getdictionary(data);
          }else{
            this.$message.error(res.data.msg);
          }
        })
      }
    },
    Adddic(){
      this.$refs['isUpdatedictionary'].init();
    },
    updateRow(x){
      this.$refs['isUpdatedictionary'].init(x);
    }
  }
}
</script>

<style>

</style>
