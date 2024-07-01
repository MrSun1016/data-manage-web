<template>
  <div>
    <PlatformLayout />
    <div id="OpenPlatformLayout">
      <div>
        <div style="overflow-y: scroll; height: 100%; background-color: #fff">
          <SideMenu />
        </div>
      </div>
        <div class="content">
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import PlatformLayout from '@/components/page/PlatformLayout'
import SideMenu from '@/components/page/SideMenu'
export default {
  name: 'OpenPlatformLayout',
  components: {
    PlatformLayout,
    SideMenu,
  },
}
</script>

<style lang="less" scoped>
#OpenPlatformLayout {
  display: flex;
  background-color: #f2f2f3;
  .content {
    width: 100%;
    padding: 24px;
    background: #f2f2f3;
  }
}
</style>