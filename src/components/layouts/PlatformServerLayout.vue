<template>
  <div>
    <ServeLayout />
    <div id="PlatformServerLayout">
      <div>
        <div style="overflow-y: auto; height: 100%">
          <ServeMenu />
        </div>
      </div>
      <div style="height: 100%;width: 100%;">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServeLayout from '@/components/page/ServeLayout'
import ServeMenu from '@/components/page/ServeMenu'
export default {
  name: 'PlatformServerLayout',
  components: {
    ServeLayout,
    ServeMenu,
  },
}
</script>

<style lang="less" scoped>
#PlatformServerLayout {
  height: calc(100vh - 64px);
  display: flex;
  .content {
    width: 100%;
    padding: 24px;
    // height:100%;
    background: #f2f2f3;
  }
}
</style>