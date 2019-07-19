<template>
    <el-dialog :title="isadd ? '新增' : '更新'"  :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="120px" class="addorupdate">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="市场负责人：">
                        <el-input v-model="form.people" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="项目名称：">
                        <el-input v-model="form.project" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="23">
                    <el-form-item label="项目概况：">
                        <el-input v-model="form.desc" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="市场跟踪状态：">
                        <el-input v-model="form.status" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="业主单位名称：">
                        <el-input v-model="form.owner" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="联系人：">
                        <el-input v-model="form.contact" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="联系电话：">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="所属片区：">
                        <el-input v-model="form.area" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="目前跟踪阶段：">
                        <el-input v-model="form.phase" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="时间：">
                        <el-input v-model="form.time" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="项目重要性：">
                        <el-input v-model="form.importance" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="更新时间：">
                        <el-input v-model="form.updatetime" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" style="visibility: hidden;">空格</el-col>
                <el-col :span="11">
                    <el-form-item label="承揽结果：">
                        <el-input v-model="form.results" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
            <el-button  @click="dialogFormVisible = false" style="margin-left:80px">关 闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return {
            dialogFormVisible: false,
            isadd:false,
            form:{
                people: '',
                project: '',
                desc: '',
                status: '',
                owner: '',
                contact: '',
                phone: '',
                area: '',
                phase: '',
                time: '',
                importance: '',
                updatetime: '',
                results: '',
            }
        }
    },
    methods: {
        init(par) {
            this.dialogFormVisible=true;
            if(par){
                this.isadd = false;
            }else{
                this.isadd = true;
            }
        },
        onSubmit() {

        }
    }
}
</script>

<style>
.dialog-footer{
    text-align: center;
}
.addorupdate .el-dialog__footer{
    text-align: center;
}
.addorupdate .el-input__inner{
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
}
</style>
