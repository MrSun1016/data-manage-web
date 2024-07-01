<template>
  <div>
    <template v-for="menu in dataTreeList">
      <el-submenu :key="menu.index" :index="menu.categoryName" v-if="menu.children && menu.children.length > 0">
        <template slot="title">
          <span slot="title">{{ menu.categoryName }}</span>
        </template>
        <menu-tree :dataTreeList="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.index" :index="menu.categoryName" v-else>
        <span slot="title">{{ menu.categoryName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // tabsList: {
    //   type: Array
    // },
    dataTreeList: {
      type: Array
    }
  },
  name: 'MenuTree',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped></style>
