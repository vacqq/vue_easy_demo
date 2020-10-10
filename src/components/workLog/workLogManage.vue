<template>

  <body id="poster">
    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8">
      <div class="grid-content bg-purple-light" style="min-height:1px;"></div>
    </el-col>
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <el-container style="">
        <el-header style="height:10px">
        </el-header>
        <el-main style="text-align:center">
          <el-form :model="ruleForm" :rules="rules" border ref="ruleForm" label-width="100px" class="demo-ruleForm"
            v-if="this.ShowForm!= 0">
            <el-form-item label="工作时间" style="text-align:left">
              <el-form-item prop="work_date">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.work_date">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="姓名" prop="user_name" style="text-align:left;">
              <el-input v-model="ruleForm.user_name" :disabled="true" style="width:220px"></el-input>
            </el-form-item>
            <el-form-item label="工作内容" prop="content" style="text-align:left;">
              <el-input type="textarea" v-model="ruleForm.content" rows="12" style="width:400px">
              </el-input>
            </el-form-item>
            <el-form-item style="text-align:left">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-button v-if="this.ShowForm== 0" @click="showAdd()" type="primary">填报</el-button> -->
          <el-button v-if="this.ShowMyWork== 1" @click="HideMyWorkLog()" type="primary">隐藏内容</el-button>
        </el-main>
        <el-main style="text-align:center;">
          <el-input type="textarea" v-if="this.ShowMyWork== 1" v-model="ruleForm.content" rows="15">
          </el-input>
          <div v-if="this.ShowMyWork== 1" style="height:20px"></div>
          <el-table :data="tableData" border>
            <el-table-column label="日期" width="100">
              <template slot-scope="scope">
                <span style="">{{ scope.row.work_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="工作内容" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.content }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="77">
              <template slot-scope="scope">
                <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="1000" small>
          </el-pagination>

        </el-main>
      </el-container>
    </el-col>
    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8">
      <div class="grid-content bg-purple" style="min-height:1px;"></div>
    </el-col>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      ShowForm: 0,//显示表单0标识不展开,1标识添加,2标识编辑
      ShowMyWork: 0,
      tableData: [],
      update_id: 0,
      //默认显示下一天,工作日志信息
      value_date: (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1) + "-" + ((new Date).getDate()),
      value_type: '',
      countEarly: 0,
      countNoon: 0,
      countNight: 0,
      message_type_show: '',

      ruleForm: {
        //获取传入参数姓名值
        user_name: this.$route.params.name,
        work_date: (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1) + "-" + ((new Date).getDate()),
        content: ''
      },
      rules: {
        work_date: [
          { required: true, message: '请输入时间', trigger: 'blur' },
        ],
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入工作内容', trigger: 'blur' },
        ]
      }
    }
  },
  mounted: function () {
    this.getWorkLogInfo();
  },
  methods: {

    //进行添加填报操作
    showAdd () {
      this.ShowForm = 1;
    },

    //隐藏我的工作日志
    HideMyWorkLog () {
      this.ShowMyWork = 0;
    },

    //表单操作,表单提交操作
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // 决定是添加还是编辑操作
          if (this.ShowForm == 1) { this.insertdata(); }
          else if (this.ShowForm == 2) { this.updatedata(this.update_id); }
          //使用完后关闭表单
          this.ShowForm = 0;

        } else {
          console.log('错误 submit!!');
          return false;
        }
      });
    },
    //取消按钮操作
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.ShowForm = 0;
    },

    //表格修改操作
    handleEdit (index, row) {
      // this.ShowForm = 2;
      this.update_id = row.id;
      this.ShowMyWork = 1;
      this.ruleForm.content = row.content;
    },
    //表格删除操作
    handleDelete (index, row) {
      this.deletedata(row.id)
    },

    //获取工作日志信息
    getWorkLogInfo () {
      this.$axios.post('/v1/SelectWorkLogData', { user: '', work_time: '' }).then(resp => {
        if (resp && resp.status == 200) {
          this.tableData = resp.data.result_data
        }
      })
    },

    //插入相关信息备用。
    insertdata () {
      this.$axios
        .post('/v1/InsertWorkLog', { work_time: this.ruleForm.work_date, user: this.ruleForm.user_name, content: this.ruleForm.content, department: '', user_id: '', create_by: this.ruleForm.user_name }).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.result_data != 0) {
              this.message_type_show = 'success';
            }
            else {
              this.message_type_show = 'error';
            }
            this.$message({
              message: resp.data.result_msg,
              type: this.message_type_show
            });
            this.getWorkLogInfo();
          }
        })
    },

    //更新相关信息备用。通过id
    updatedata (uid) {
      this.$axios
        .post('/v1/UpdateWorkLog', { id: uid, work_time: this.ruleForm.work_date, user: this.ruleForm.user_name, content: this.ruleForm.content, modify_by: this.ruleForm.user_name }).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.result_data != 0) {
              this.message_type_show = 'success';
            }
            else {
              this.message_type_show = 'error';
            }
            this.$message({
              message: resp.data.result_msg,
              type: this.message_type_show
            });
            this.getWorkLogInfo();
          }
        })
    },

    //删除相关信息备用。通过id
    deletedata (uid) {
      this.$axios
        .post('/v1/DeleteWorkLog', { id: uid }).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.result_data != 0) {
              this.message_type_show = 'success';
            }
            else {
              this.message_type_show = 'error';
            }
            this.$message({
              message: resp.data.result_msg,
              type: this.message_type_show
            });
            this.getWorkLogInfo();
          }
        })
    },
  }
}
</script>

<style scoped>
</style>
