<template>
  <div style="height:calc(100% - 60px)">
    <el-menu default-active="/index" style="height:calc(100% - 60px)" router class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-view"></i>
          <span slot="title">在线监测</span>
        </template>
        <el-menu-item index="index">全站点数据</el-menu-item>
        <el-menu-item index="1-5">网格数据</el-menu-item>
        <el-menu-item index="1-6">在线设备</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">综合分析</span>
        </template>
        <el-menu-item index="2-1">态势分析</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">统计报表</span>
        </template>
        <el-menu-item index="/ct/AllShow">站点综合排名</el-menu-item>
        <el-menu-item index="/ct/zhqsAnalysis">综合趋势分析</el-menu-item>
        <el-menu-item index="/ct/quyuqushifenxi">区域趋势分析</el-menu-item>
        <el-menu-item index="/ct/zdxgxAnalysis">站点相关分析</el-menu-item>
        <el-menu-item index="3-6">指标相关分析</el-menu-item>
        <el-menu-item index="3-7">指标频数分析</el-menu-item>
        <el-menu-item index="3-8">风向雷达分析</el-menu-item>
        <el-menu-item index="3-9">星期周期规律</el-menu-item>
        <el-menu-item index="3-10">成份占比分析</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-warning"></i>
          <span slot="title">告警分析</span>
        </template>
        <el-menu-item index="4-1">告警事件分析</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-radio-group v-model="isCollapse" style="float: left;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
  </div>

</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  text-align: left;
  width: 200px;
  min-height: 400px;
}
</style>
