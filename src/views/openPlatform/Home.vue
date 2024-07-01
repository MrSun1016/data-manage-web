<template>
  <div id="openPlatformHome">
    <div>
      <OpenPlatformHeader />
      <homeBanner />
    </div>
    <div class="home-content">
      <homeHotList />
      <homeList />
      <HomeFooter />
    </div>
  </div>
</template>

<script>
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
import homeBanner from '@/views/openPlatform/components/HomeBanner'
import homeList from './components/HomeList'
import homeHotList from './components/HomeHotList'
import HomeFooter from '@/components/HomeFooter'
export default {
  name: 'openPlatformHome',
  components: {
    OpenPlatformHeader,
    homeBanner,
    homeList,
    homeHotList,
    HomeFooter,
  },
}
</script>

<style lang="less" scoped>
#openPlatformHome {
  // display: flex;
  // flex-direction: column;
  height: 100%;
  // background: #f0f2f5;
  // .home-content {
  //   flex: 1;
  //   overflow: scroll;
  // }
}
</style>