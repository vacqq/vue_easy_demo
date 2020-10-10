<template>
  <div style="height:100%;margin:0;">
    <nav-menu></nav-menu>
    <el-aside class="menu-bar" style="width: 200px;">
      <SideMenu></SideMenu>
    </el-aside>
    <el-main class="ifame-container">
      <router-view />
    </el-main>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
import SideMenu from './library/SideMenu'
import Books from './library/Books'
export default {
  name: 'Home',
  components: { NavMenu, SideMenu, Books },
}
</script>

<style scoped>
.ifame-container {
  width: calc(100% - 200px);
  height: calc(100% - 60px);
  z-index: 99;
  position: absolute;
  top: 60px;
  left: 200px;
  overflow: hidden;
}
.menu-bar {
  height: calc(100% - 60px);
  border-right: solid 1px #e6e6e6;
  overflow: hidden;
}
</style>
