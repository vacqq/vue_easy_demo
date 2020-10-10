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
              axios.post('/v1/GetUserDetail', { AppCode: info.code, App: "读书" }).then(resp => {
                if (resp && resp.status == 200) {
                  console.log("欢迎" + resp.data.name)
                  var params_name = resp.data.name
                  if (params_name == '') {
                    params_name = '未获取姓名'
                  }
                  that.$router.push({ name: 'readBookShow', params: { name: params_name } });
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
