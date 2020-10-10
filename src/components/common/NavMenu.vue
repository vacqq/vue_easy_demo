<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    >
  <div class="header">
    <div class="logo-bar">
      <div class="logo">
        <img src="../img/logo.png">
      </div>
      <h1><b>顺平县大气质量监测系统</b>
        <span class="version">V1.19_2983</span>
      </h1></div> <div class="user-info">
    <div class="full-screen icon-tab">
      <img src="../img/full.png" title=" 点击全屏显示 ">
    </div>
    <div class="bell icon-tab">
      <img id="alarmIcon" src="../img/alarm_tip.png" title=" 点击显示告警信息 ">
    </div>
    <span><span class="follow-us el-popover__reference" aria-describedby="el-popover-325" tabindex="0">关注我们 </span></span>
    <div class="welcome"><p>欢迎您 ：<span>17778210860</span></p> <input type="hidden" id="deptname" value="河北顺平县">
    </div>
    <span class="logout"> 注销 </span>
  </div>
  </div>
  </el-menu>


</template>

<script>
  export default {
    name: 'NavMenu',
    // data () {}
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
  .header {
    height: 60px;
    width: 100%;
    background: #4679E8;
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .version {
    margin-left: 20px;
    font-size: 14px;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  .user-info {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .follow-us {
    cursor: pointer;
    margin-right: 20px;
  }
  .icon-tab {
    cursor: pointer;
  }
  .full-screen {
    margin-right: 20px;
  }
  .logout {
    cursor: pointer;
    margin-left: 20px;
  }
  .bell {
    margin-right: 20px;
  }
</style>

