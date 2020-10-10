<template>
  <div class="block-left">
    <!--选择模块-->
    <!--<div class="city-block">
					<h3>城市</h3>
					<div class="city-select">
						<div v-for="(item,index) in orgs" :class="['city',{'btn-active': cityBtnIndex == index}]" v-html="item" @click="changeCityPicker(index)"></div>
					</div>
				</div>-->
    <!--图表模块-->
    <div class="chart-block">
      <!--图表-->
      <div class="chart-left" style="text-align:left">
        <h3>站点综合排名</h3>

        <!--指标选择-->
        <div class="index-picker">
          <el-select v-model="value1" placeholder="河北顺平县" style='margin-right: 5px;width:200px;height:80px;'
            @change="changeTypePicker()">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 1}]" @click="changeDateShort(1)">
            AQI</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 2}]" @click="changeDateShort(2)">
            PM2.5</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 3}]" @click="changeDateShort(3)">
            PM10</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 4}]" @click="changeDateShort(4)">
            SQ2</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 5}]" @click="changeDateShort(5)">
            NO2</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 6}]" @click="changeDateShort(6)">
            CO</button>
          <button type="info" :class="['selectbtn',{'btn-active': dateShortIndex == 7}]" @click="changeDateShort(7)">
            O3</button>
          <button type="info" :class="['selectbtn',{'btn-active': SortIndex == 1}]" @click="changeSort(1)">
            正序</button>
          <button type="info" :class="['selectbtn',{'btn-active': SortIndex == 2}]" @click="changeSort(2)">
            倒序</button>
          <div class="bar-right">
          </div>
        </div>
        <chart ref="chart1" :options="option" :auto-resize="true" style="width:100%;height:500px;vertical-align:center">
        </chart>

        <div class="tip">
          <p>说明：</p>
          <p>*对指定机构区域内的所有国控站点的空气质量指标数据进行排名统计</p>
          <p>*柱状图和表状图都是对该机构进行站点某指标排名</p>
        </div>
      </div>
      <!--列表-->
      <div class="chart-right">
        <template>
          <el-table class="chart-right" :data="tableData" style="width: 100%">
            <el-table-column prop="col_rank" label="排名" sortable width='100' height='100'>
            </el-table-column>
            <el-table-column prop="staname" label="名称">
            </el-table-column>
            <el-table-column prop="value" label="指数">
              <template slot-scope="scope">
                <span :style="{background:scope.row.col_color}" class="value-span">{{ scope.row.typevalue }}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </div>

    </div>
  </div>

</template>
<script>
export default {
  name: 'tjallrank',
  data () {
    return {
      typeOptions: [{
        value: '选项1',
        label: '顺平县'
      }],
      value1: '',
      dateShortIndex: 1,
      SortIndex: 1,
      tableData: [],//列表信息

      datas: [],
      option: {},
      datasname: [],
      datasvalue: [],
      datascolor: [],
      typeshow: 'aql', //默认类型为aql
      typeorder: 'asc' //默认类型为aql

    }
  },
  mounted: function () {
    //默认参数为aql
    // this.deletedata(),
    this.getRankInfo(this.typeshow, this.typeorder),
      this.option = {
        title: {
          //						subtext:this.rankSubtext(),
          textStyle: {

            fontSize: 18,
            fontWeight: 400
          },
          subtextStyle: {
            fontSize: 12,
            color: 'rgb(24,89,233)',
            align: 'right',
            fontWeight: 400
          }
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.datasname,
          axisLabel: {
            interval: 0,//横轴信息全部显示    
            rotate: 45,//-15度角倾斜显示     
          },
        },
        yAxis: {
          type: 'value'
        },

        series: [{
          data: this.datasvalue,
          type: 'bar',
          barWidth: 26,
          itemStyle: {
            normal: {
              // color: this.datascolor

            },

          },

          //系统默认的数据颜色,存在缺陷
          color: this.datascolor,

          label: {
            normal: {
              position: 'top',
              color: 'rgb(51,51,51)',
              fontWeight: 'normal',
              show: true
            }
          },

          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }

  },
  methods: {
    changeDateShort (index) {
      this.dateShortIndex = index
      switch (index) {
        case 1:
          this.typeshow = 'aql'
          break;
        case 2:
          this.typeshow = 'pm25'
          break;
        case 3:
          this.typeshow = 'pm10'
          break;
        case 4:
          this.typeshow = 'so2'
          break;
        case 5:
          this.typeshow = 'no2'
          break;
        case 6:
          this.typeshow = 'co'
          break;
        case 7:
          this.typeshow = 'o3'
          break;
        default:
          this.typeshow = 'aql'
          break;
      }
      this.getRankInfo(this.typeshow, this.typeorder)
    },
    changeSort (index) {
      this.SortIndex = index
      switch (index) {
        case 1:
          this.typeorder = 'asc'
          break;
        case 2:
          this.typeorder = 'desc'
          break;
        default:
          this.typeorder = 'asc'
          break;
      }
      this.getRankInfo(this.typeshow, this.typeorder)
    },

    //获取排名信息
    getRankInfo (typecs, typeor) {
      this.$axios.post('/rankColor', { type: typecs, order_type: typeor, site_type: '4' }).then(resp => {
        // console.log(resp) //验证输出到控制台信息 
        if (resp && resp.status == 200) {
          //柱状图显示
          this.datas = resp.data
          //表格名称，表格排名显示
          this.tableData = resp.data
          // console.log(resp.data) //验证输出到控制台信息 
        }
        this.datasname.length = 0
        this.datasvalue.length = 0
        this.datascolor.length = 0
        for (var data in this.datas) {
          //显示柱状图信息
          this.datasname.push(this.datas[data]["site_name"])
          this.datasvalue.push(this.datas[data]['type_value'])
          this.datascolor.push(this.datas[data]["col_color"])
        }

      })
    },

    //删除相关信息备用。通过id
    deletedata () {
      this.$axios
        .post('/v_delete', { id: 2 }).then(resp => {
          // console.log(resp) //验证输出到控制台信息
          if (resp && resp.status == 200) {
            console.log("删除成功")
          }
        })
    },
    typeSelector () {

    },

  }
}
</script>

<style scoped>
.date-picker-bar {
  display: flex;
  justify-content: space-between;
}
.chart-item {
  width: 100%;
  height: auto;
}
.el-range-editor .el-range-input {
  background: #e1e1e1;
  color: #606266;
  width: 135px;
}
.el-input__inner {
  width: 100px;
}
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 340px;
}
.bar-left {
  display: flex;
}
.bar-right {
  display: flex;
}
.chart-left {
  width: 65%;
}
.chart-right {
  width: 30%;
  height: 100%;
  max-height: 840px;
  overflow-y: auto;
  overflow-x: hidden;
}
.chart-block {
  display: flex;
  justify-content: space-between;
}
.tip {
  padding: 20px;
  font-size: 12px;
  color: #999;
}
/*自定义滚动条*/
.chart-right ::-webkit-scrollbar {
  width: 5px;
  background: #ccc;
  border-radius: 4px;
}
.chart-right ::-webkit-scrollbar-track {
  background-color: #fff;
}
.chart-right ::-webkit-scrollbar-thumb {
  background-color: #e1e1e1;
  border-radius: 4px;
}
.chart-right ::-webkit-scrollbar-thumb:hover {
  background-color: #e1e1e1;
}
.chart-right ::-webkit-scrollbar-thumb:active {
  background-color: #e1e1e1;
}

.value-span {
  display: inline-block;
  height: 26px;
  width: 50px;
  border-radius: 4px;
  color: #fff;
  line-height: 26px;
  text-align: center;
}
.chart-box {
  height: 500px;
}
</style>

<style>
.selectbtn {
  padding: 10px;
  border-radius: 4px;
  background: #e1e1e1;
  color: #666666;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  height: 40px;
  border: 0;
}
.btn-active {
  background: #1859e9;
  color: #fff;
  box-shadow: 0px 3px 5px rgba(24, 89, 233, 0.6);
}
</style>