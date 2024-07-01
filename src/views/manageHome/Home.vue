<template>
  <div id="home">
    <div v-show="!flag">
      <!-- <homeHeader v-if="isShowHeader" /> -->
      <homeHCard />
      <HomeAgency />
      <HomeCharts />
    </div>
    <HomeMine />
  </div>
</template>

<script>
import homeHeader from './components/HomeHeader.vue'
import homeHCard from './components/HomeCard.vue'
import HomeAgency from './components/HomeAgency.vue'
import HomeMine from './components/HomeMine.vue'
import HomeCharts from './components/HomeCharts.vue'
export default {
  name: 'home',
  components: {
    homeHeader,
    homeHCard,
    HomeAgency,
    HomeMine,
    HomeCharts
  },
  data() {
    return {
      flag: false,
      isShowHeader: true
    }
  },
  activated() {
    this.flag = false
  },
  mounted() {
    console.log('mounted')
    // this.$bus.$on('homeHradr', show => {
    //   console.log('收到show', show)
    //   this.isShowHeader = show
    // })
    const path = window.location.href
    console.log('path', path)

    console.log(this.$bus)
    this.$bus.$on('handleComponents', isshowHaredetails => {
      this.flag = isshowHaredetails
    })
  },
  //解绑事件
  beforeDestroy() {
    this.$bus.$off('handleComponents', 'homeHradr')
  }
}
</script>

<style lang="less" scoped></style>
