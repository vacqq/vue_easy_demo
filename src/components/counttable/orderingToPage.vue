<template>

</template>

<script>
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'ToPage',
  data () {
    return {
    }
  },
  mounted: function () {
    this.getUserInfo();
  },
  methods: {
    getUserInfo () {
      console.log("不是钉钉环境的就别试啦~")
      const that = this
      if (dd.env.platform !== "notInDingTalk") {
        dd.ready(function () {
          dd.runtime.permission.requestAuthCode({
            corpId: 'dingd05db47515f6499cbc961a6cb783455b', // 企业id
            onSuccess: function (info) {
              console.log("info.code获取没问题")
              var axios = require('axios')
              var type_data = "订餐"
              axios.post('/v1/GetUserDetail', { AppCode: info.code, App: type_data }).then(resp => {
                if (resp && resp.status == 200) {
                  console.log("欢迎" + resp.data.name)
                  var params_name = resp.data.name
                  if (params_name == '') {
                    params_name = '未获取姓名'
                  }
                  that.$router.push({ name: 'orderingAdd', params: { type_data: type_data, name: params_name, user_id: resp.data.userid, user_name: resp.data.name, department: resp.data.department, tel: resp.data.tel, work_place: resp.data.workPlace, email: resp.data.email } });
                }
              })

            }
          });
        });
      }
    },
  }
}
</script>
