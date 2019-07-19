<template>
    <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="市场负责人:" class="fbox">
            <el-input v-model="form.people" placeholder="选择市场负责人" @focus="Show"></el-input>
            <div class="cbox" v-if="isShow">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
                <div class="determine" @click="comfirm">
                    <span>确定</span>
                </div>
            </div>
        </el-form-item>
        <el-form-item label="更新时间:">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">至</el-col>
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="业主单位:" >
            <el-input v-model="form.user" placeholder="选择业主单位"></el-input>
        </el-form-item>
        <el-form-item label="片区:">
            <el-select v-model="form.region" placeholder="请选择片区">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="成都" value="chengdu"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="项目名称:">
            <el-input v-model="form.projectname" placeholder="选择项目名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="operation">
        <span class="ope">
            <el-button type="primary" @click="Add">新增</el-button>
            <el-button type="primary" @click="Export">导出</el-button>
        </span>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
        <el-table-column
        fixed
        align="center"
        prop="date"
        label="序号"
        width="150">
        </el-table-column>
        <el-table-column
        align="center"
        prop="name"
        label="市场负责人"
        width="120">
        </el-table-column>
        <el-table-column
        align="center"
        prop="province"
        label="项目名称"
        width="120">
        </el-table-column>
        <el-table-column
        align="center"
        prop="city"
        label="项目概况"
        width="120">
        </el-table-column>
        <el-table-column
        align="center"
        prop="address"
        label="..."
        width="300">
        </el-table-column>
        <el-table-column
        align="center"
        prop=""
        label="...."
        width="300">
        </el-table-column>
        <el-table-column
        align="center"
        prop=""
        label="..."
        width="300">
        </el-table-column>
        <el-table-column
        align="center"
        prop="zip"
        label="承揽结果"
        width="120">
        </el-table-column>
        <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="140">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">更新</el-button>
            <el-button type="text" size="small">历史</el-button>
        </template>
        </el-table-column>
    </el-table>
    <AddorUpdate ref="isAddorUpdate"></AddorUpdate>
    </div>
</template>

<script>
import AddorUpdate from './AddorUpdate'
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data() {
      return {
        isIndeterminate:false,
        checkAll: false,
        isShow: false,
        form: {
          people: '',
          user: '',
          checkedCities:[],
          cities: cityOptions,
          region: [],
          date1: '',
          date2: '',
          projectname: '',
        },
         tableData: [{
          date: '1',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '3',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '4',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },
    components:{
        AddorUpdate,
    },
    methods: {
      Show(){
        this.isShow=true;
      },
      comfirm(){
        this.isShow=false;
        this.form.people='';
        console.log(this.form.checkedCities)
        this.form.checkedCities.map(item => {
            this.form.people +=item + '、';
        })
      },
      handleCheckAllChange(val) {
        this.form.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.form.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.form.cities.length;
      },
      handleClick(row) {
        this.$refs['isAddorUpdate'].init(row);
      },
      onSubmit() {
        console.log('submit!');
      },
      Add() {
        this.$refs['isAddorUpdate'].init();
      },
      Export() {

      }
    }
}
</script>

<style lang="scss" scoped>
    .el-form-item{
        margin-right:5%;
    }
    .fbox{
        position: relative;
        .cbox{
            // display: none;
            position: absolute;
            z-index: 999;
            width: 100%;
            height: 150px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;
            padding-left: 8px;
            border: 1px solid #e6e6e6;
            label{
                height: 52px;
                width: 100%;
            }
            .determine{
                border-top: 1px solid #e6e6e6;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .operation{
        height: 50px;
        overflow: hidden;
        border-bottom: 1px solid black;
        .ope{
            float: right;
            margin-right: 2%;
        }
    }

</style>
