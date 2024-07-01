<template>
  <a-config-provider :locale="locale">
    <div id="app" :class="text">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enquireScreen from '@/utils/device'

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      locale: zhCN,
      text: 'app-class'
      // isRouterAlive:true
    }
  },
  activated() {
    let that = this
    enquireScreen(deviceType => {
      // tablet
      if (deviceType === 0) {
        that.$store.commit('TOGGLE_DEVICE', 'mobile')
        that.$store.dispatch('setSidebar', false)
      }
      // mobile
      else if (deviceType === 1) {
        that.$store.commit('TOGGLE_DEVICE', 'mobile')
        that.$store.dispatch('setSidebar', false)
      } else {
        that.$store.commit('TOGGLE_DEVICE', 'desktop')
        that.$store.dispatch('setSidebar', true)
      }
    })
  },
  created() {
    // let that = this
    // enquireScreen((deviceType) => {
    //   // tablet
    //   if (deviceType === 0) {
    //     that.$store.commit('TOGGLE_DEVICE', 'mobile')
    //     that.$store.dispatch('setSidebar', false)
    //   }
    //   // mobile
    //   else if (deviceType === 1) {
    //     that.$store.commit('TOGGLE_DEVICE', 'mobile')
    //     that.$store.dispatch('setSidebar', false)
    //   } else {
    //     that.$store.commit('TOGGLE_DEVICE', 'desktop')
    //     that.$store.dispatch('setSidebar', true)
    //   }
    // })
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        // 监听浏览器窗口大小改变

        let ratio = 0
        let screen = window.screen
        let ua = navigator.userAgent.toLowerCase()

        if (window.devicePixelRatio !== undefined) {
          ratio = window.devicePixelRatio
        } else if (~ua.indexOf('msie')) {
          if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI
          }
        } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
          ratio = window.outerWidth / window.innerWidth
        }
        if (ratio) {
          ratio = Math.round(ratio * 100)
        }

        if (ratio < 150) {
          this.text = 'app-class'
        } else if (ratio >= 150) {
          this.text = 'app-class2'
        }
        this.ratio = ratio
      })
    })
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100%;
  // filter: grayscale(100%)
}
.app-class {
  // width: 100%;
  height: 100%;
  // filter: grayscale(100%)
}
.app-class2 {
  width: 1654px;
  height: 100%;
  // filter: grayscale(100%)
}
/deep/.ant-table-tbody > tr:nth-child(2n) {
  background: #fafafa;
}
/deep/ .ant-table-thead {
  th {
    // background-color: #E6F3FD !important;;
  }
}
</style>
