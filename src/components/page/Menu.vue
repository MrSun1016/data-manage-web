<template>
  <div class="menu">
    <div class="menu-list">
      <a-menu
        style="width: 256px"
        mode="inline"
        :default-selected-keys="['1']"
        :default-open-keys="['notice']"
        @click="handleClick"
      >
        <a-sub-menu key="notice">
          <span slot="title"><a-icon type="appstore" /><span>公告管理</span></span>
          <a-menu-item key="1">
            公告发布
          </a-menu-item>
          <a-menu-item key="2">
            公告审核
          </a-menu-item>
          <a-menu-item key="3">
            公告列表
          </a-menu-item>
          <a-menu-item key="4">
            草稿箱
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="system">
          <span slot="title"><a-icon type="setting" /><span>系统管理</span></span>
          <a-menu-item key="5">
            组织管理
          </a-menu-item>
          <a-menu-item key="6">
            角色管理
          </a-menu-item>
          <a-menu-item key="7">
            菜单管理
          </a-menu-item>
          <a-menu-item key="8">
            系统日志
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'menu',
  components: {

  },
  data () {
    return {
      menuIndex:'1',
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  methods: {
    handleClick(e) {
      console.log('click ', e);
      this.menuIndex = e.key
    },
  }
}

</script>

<style lang="less">
.page-backstage {
  display: flex;
  height: calc(100vh - 67px);
  .menu-list{
    height: 100%;
    background-color: #fff;
  }
  .content{
    >P{
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 10px;
      padding: 0;
    }
    margin:20px;
    width: 100%;
  }
}
</style>