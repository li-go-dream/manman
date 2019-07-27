<template>
  <el-dialog class="addper" :visible.sync="dialogFormVisible" width="500px" :show-close="false">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="片区授权" name="first">
       <div class="table_box">
          <table cellspacing="0">
            <thead>
              <td>
                <el-checkbox v-model="allchecked"></el-checkbox>
              </td>
              <td style="80px;">片区名称</td>
              <td>查看</td>
              <td>修改</td>
            </thead>
            <tbody>
              <tr v-for="(item,index) in area" :key="item.id">
                <td>
                  <el-checkbox :ref="'check'+item.id" :checked="item.read && item.write"></el-checkbox>
                </td>
                <td>{{item.name}}</td>
                <td>
                  <el-checkbox v-model="item.read" @change="checked=>readchange(checked,index,item)"></el-checkbox>
                </td>
                <td>
                  <el-checkbox v-model="item.write" @change="checked=>writechange(checked,index,item)"></el-checkbox>
                </td>
              </tr>
            </tbody>
          </table>
       </div>

        <div style="height:15px;"></div>
        <el-row >
          <el-col :span="12" :push="8">
            <el-button type="primary">保存</el-button>
            <el-button @click="dialogFormVisible=false">关闭</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="人员授权" name="second">
        <el-table
          ref="tabledata0"
          border
          :data="member"
          style="width:100%"
          @selection-change="handleSelectionChange0">
          <el-table-column
            align="center"
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="人员名称">
          </el-table-column>
          <el-table-column
            align="center"
            label="查看"
            width="50">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.read" @change="twocheckclick(scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="修改"
            width="50">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.write" @change="twocheckclick(scope.row)"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:15px;"></div>
        <el-row >
          <el-col :span="12" :push="8">
            <el-button type="primary">保存</el-button>
            <el-button @click="dialogFormVisible=false">关闭</el-button>
          </el-col>
        </el-row>        
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
export default {
  data(){
    return{
      allchecked:false,
      dialogFormVisible:true,
      activeName:'first',
      allselect:[],
      area:[
        {
          id:1,
          name:'dad',
          read:true,
          write:true,
        },
        {
          id:2,
          name:'jhb',
          read:false,
          write:true,
        }
      ],
      member:[]
    }
  },
  mounted:function(){
    // this.lookAuth()
  },
  methods:{
    init(){
      this.dialogFormVisible=true;
    },
    readchange(e,id,item){
      console.log(item)
      this.area = this.area.splice(id,1,item)
      //  Vue.set(this.area,id,{'id':item.id,'name':item.name,'read':e,'write':item.write})
      // console.log(this.area)
      // this.area.map(it => {
      //   if(it.id === id){
      //     if(it.read&&it.write){
      //       it.c_is=true;
      //     }
      //   }
      // })
    },
     writechange(e,id,item){
       this.area.map(it => {
        if(it.id === id){
          if(it.read&&it.write){
            it.c_is=true;
          }
        }
      })
    },
    lookAuth(){
      var data ={
        id: Boolean(window.localStorage.getItem('data')) ? (JSON.parse(window.localStorage.getItem('data')).area)[0]['mid'] : ''
      }
      this.$ajax.lookAuth(data)
      .then(res => {
        if(res.data.status === 0){
          console.log(res.data.data)
          res.data.data['area'].map(item => {
            item.read = Boolean(item.read);
            item.write = Boolean(item.read);
          })
          res.data.data['member'].map(item => {
            item.read = Boolean(item.read);
            item.write = Boolean(item.read);
          })
          this.area = res.data.data['area'];
          this.member = res.data.data['member']
        }
      })
    },
    handleClick(tab, event) {
    },
    handleSelectionChange(e){
      if(e.length === this.area.length){
        this.area.map(item => {
          item.read = true;
          item.write = true;
        })
      }else{
        if(e.length === 0){
          this.area.map(item => {
            item.read = false;
            item.write = false;
          })
        }else{
          for(var i=0;i<this.area.length;i++){
            for(var j=0;j<e.length;j++){
              if(this.area[i].id === e[j].id){
                this.area[i].read = true;
                this.area[i].write = true;
              }
            }
          }
        }
      }
      console.log(e)
      console.log(this.area)
    },
    handleSelectionChange0(e){
      console.log(e)
      if(e.length === this.member.length){
        this.member.map(item => {
          item.read = true;
          item.write = true;
        })
      }else{
        this.member.map(item => {
          item.read = false;
          item.write = false;
        })
      }
    },
    checkclick(e){
      console.log(e,this.area)
      // if(e.read === true && e.write === true){
      //   this.$refs.tabledata.toggleRowSelection(e)
      // }
    },
    twocheckclick(e,x){
      
    }
  }
}
</script>

<style lang="scss">
  .addper{
    .el-tabs{
      border:1px solid #E4E7ED;
      .el-tabs__content{
        margin: 0 15px 15px;
      }
    }
    .el-tabs__nav-wrap{
      border-bottom:1px solid #E4E7ED;
    }
    .el-dialog__header{
      display: none;
    }
    .el-tabs__header{
      border: none;
    }
    .el-tabs__nav{
      width: 100%;
      border: none !important;
      #tab-first{
        width: 50%;
        text-align: center;
      }
      #tab-second{
        text-align: center;
        width: 50%;
      }
    }
    .el-tabs__content{
      height: 300px;
      .table_box{
        height: 240px;
        overflow: auto;
      }
    }
    table{
      width:100%; 
      border-color:"#E4E7ED";
      td{
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #E4E7ED;
      }
    }
  }
</style>
