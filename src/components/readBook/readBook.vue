<template>

  <body id="poster">
    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8">
      <div class="grid-content bg-purple-light"></div>
    </el-col>
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <el-container style="">
        <el-header style="height:10px">
        </el-header>
        <el-main style="text-align:center">
          <el-form :model="ruleForm" :rules="rules" border ref="ruleForm" label-width="100px" class="demo-ruleForm"
            v-if="this.ShowForm!= 0">
            <el-form-item label="读书开始时间" style="text-align:left">
              <el-form-item prop="start_date">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.start_date">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="读书结束时间" style="text-align:left">
              <el-form-item prop="start_date">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="ruleForm.start_date">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="读书类型" prop="type">
              <el-checkbox-group v-model="ruleForm.type" style="text-align:left">
                <el-checkbox label="1" name="type">早饭</el-checkbox>
                <el-checkbox label="2" name="type">午饭</el-checkbox>
                <el-checkbox label="3" name="type">晚饭</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="姓名" prop="user_name" style=";text-align:left;width:250px">
              <el-input v-model="ruleForm.user_name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks" style="width:250px;text-align:left">
              <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-form-item style="text-align:left">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
          <el-button v-if="this.ShowForm== 0" @click="showAdd()" type="primary">订餐</el-button>
          <el-button v-if="this.ShowMyForm== 0" @click="showMyOrdering()" type="primary">
            我的订餐
          </el-button>
          <el-button v-if="this.ShowMyForm== 1" @click="HideMyOrdering()" type="primary">隐藏</el-button>

        </el-main>

        <el-main style="text-align:left" v-if="this.ShowForm== 0">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-date-picker v-model="value_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"
                @change="getOrderingInfo()">
              </el-date-picker>
            </div>
            <div class="text item">
              早饭订餐人数为：<span style="color:#409EFF">{{this.countEarly}}</span>人
            </div>
            <div class="text item">
              午饭订餐人数为：<span style="color:#409EFF">{{this.countNoon}}</span>人
            </div>
            <div class="text item">
              晚饭订餐人数为：<span style="color:#409EFF">{{this.countNight}}</span>人
            </div>
          </el-card>
        </el-main>
        <el-main style="text-align:center;" v-if="this.ShowMyForm== 1">
          <el-table :data="tableData" border>
            <!-- <el-table-column label="日期">
              <template slot-scope="scope">
                <span style="">{{ scope.row.start_time }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="订餐类型">
              <template slot-scope="scope">
                <span style="" v-if="scope.row.type== 1">早饭</span>
                <span style="" v-if="scope.row.type== 2">午饭</span>
                <span style="" v-if="scope.row.type== 3">晚饭</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                <span style="">{{ scope.row.user }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-main>
      </el-container>
    </el-col>

    <el-col :xs="0" :sm="2" :md="4" :lg="6" :xl="8">
      <div class="grid-content bg-purple"></div>
    </el-col>

  </body>
</template>

<script>
import moment from 'moment/moment'
import * as dd from 'dingtalk-jsapi';

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
      ShowMyForm: 0,
      tableData: [],
      update_id: 0,
      //默认显示下一天,订餐信息
      value_date: (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1) + "-" + ((new Date).getDate() + 1),
      value_type: '',
      countEarly: 0,
      countNoon: 0,
      countNight: 0,
      message_type_show: '',

      dd_my_code: '',
      dd_my_token: '',

      options: [{
        value: '1',
        label: '早饭'
      }, {
        value: '2',
        label: '午饭'
      }, {
        value: '3',
        label: '晚饭'
      }],
      ruleForm: {
        //获取传入参数姓名值
        user_name: this.$route.params.name,
        start_date: (new Date).getFullYear() + "-" + ((new Date).getMonth() + 1) + "-" + ((new Date).getDate() + 1),
        type: [],
        eat_type: '',
        remarks: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个读书类型', trigger: 'change' }
        ],

      }
    }
  },
  mounted: function () {
    this.getOrderingInfo();
  },
  methods: {

    //进行添加操作
    showAdd () {
      this.ShowForm = 1;
      this.ShowMyForm = 2;
      //初始化避免数组过多存储
      this.ruleForm.type = [];

    },
    //显示我的订餐
    showMyOrdering () {
      this.ShowMyForm = 1;
      this.getOrderingInfo();

    },

    //隐藏我的订餐
    HideMyOrdering () {
      this.ShowMyForm = 0;
    },

    //表单操作,表单提交操作
    submitForm (formName) {
      this.ShowMyForm = 0;
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
      this.ShowMyForm = 0;
    },

    //表格修改操作
    handleEdit (index, row) {
      this.ShowForm = 2;
      this.update_id = row.id;
    },
    //表格删除操作
    handleDelete (index, row) {
      this.deletedata(row.id)
    },


    //获取订餐信息
    getOrderingInfo () {
      this.$axios.post('/v1/SelectOrdering', { type: this.value_type, user: this.ruleForm.user_name, start_time: this.value_date }).then(resp => {
        if (resp && resp.status == 200) {
          this.tableData = resp.data.result_data
          this.getOrderingCountInfo();
        }
      })
    },

    //统计订餐人数
    getOrderingCountInfo () {
      //因为$axios为异步添加，所以不可使用for循环。
      this.$axios.post('/v1/SelectCountOrderingDateType', { user: '', start_time: this.value_date }).then(resp => {
        if (resp && resp.status == 200) {
          this.countEarly = resp.data.result_data.num_early;
          this.countNoon = resp.data.result_data.num_noon;
          this.countNight = resp.data.result_data.num_night;
        }
      })
    },

    //插入相关信息备用。
    insertdata () {
      //初始化传递参数值
      this.ruleForm.eat_type = ''
      for (var num_data in this.ruleForm.type) {
        this.ruleForm.eat_type = this.ruleForm.type[num_data] + ',' + this.ruleForm.eat_type
      }
      this.$axios
        .post('/v1/InsertOrdering', { start_time: this.ruleForm.start_date, type_all: this.ruleForm.eat_type, user: this.ruleForm.user_name, create_by: this.ruleForm.user_name }).then(resp => {
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
            this.getOrderingInfo();
          }
        })
    },

    //更新相关信息备用。通过id
    updatedata (uid) {
      if (this.ruleForm.type.length == 1) {
        for (var num in this.ruleForm.type) {
          this.$axios
            .post('/v1/UpdateOrdering', { id: uid, start_time: this.ruleForm.start_date, type: this.ruleForm.type[num], user: this.ruleForm.user_name, modify_by: this.ruleForm.user_name }).then(resp => {
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
                this.getOrderingInfo();
              }
            })
        }
      } else {
        this.$message({
          message: "读书类型只能勾选一项",
          type: 'error'
        });
      }
    },

    //删除相关信息备用。通过id
    deletedata (uid) {
      this.$axios
        .post('/v1/DeleteOrdering', { id: uid }).then(resp => {
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
            this.getOrderingInfo();
          }
        })
    },


  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
