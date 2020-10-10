import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import moment from 'moment/moment'
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载

// 设置反向代理，前端请求默认发送到 http://39.101.212.90:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8808/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.prototype.$dd = dd
Vue.config.productionTip = false
Vue.component('chart', ECharts)
Vue.use(ElementUI)


//格式化时间格式
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY年MM月DD日';
  return moment(value).format(formatString);

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
