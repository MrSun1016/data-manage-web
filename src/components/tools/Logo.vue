<template>
  <div class="logo logos">
    <router-link :to="{ name: 'openPlatformHome' }">
      <!--<img src="~@/assets/antdIcon.png" alt="logo">-->
      <img src="../../../public/logo1.png" alt="logo" />
      <span :class="collapsed?'opacityTrue':'opacityFalse'" class="logo-title" v-show="showTitle">{{
        title
      }}</span>
    </router-link>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixin.js'

export default {
  name: 'Logo',
  mixins: [mixin],
  props: {
    title: {
      type: String,
      default: '运营管理系统',
      required: false,
    },
    collapsed: {
      typeof: Boolean,
      default: false,
      required: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>
<style lang="less" scoped>
/*缩小首页布 局顶部的高度*/
@height: 66px;
/deep/.opacityTrue{
  // display: none !important;
  opacity:0 !important;
}
/deep/.opacityFalse{
  opacity: 1 !important;
  transition: opacity 1s
}
.logos {
  background-color: #001529 !important;
}
.logo {
  width: 160px;
  img {
    margin-top: -3px;
    width: 32px;
    margin-left: 25px;
  }
  .logo-title {
    // display: inline-block;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    font-weight: 600;
    // border-left: 1px solid #dde4e7;
    // color: #555;
    // color:#dde4e7;
    color: white;
    padding-left: 8px;
    // margin-left: 12px;
    justify-content: center;
  }
}

.sider {
  box-shadow: none !important;
  .logo {
    width: 100%;
    padding: 0;
    height: @height !important;
    line-height: @height !important;
    // box-shadow: none !important;
    transition: background 300ms;
    // box-shadow: 0 1px 4px rgb(0 21 41 / 8%) !important;

    a {
      img {
        width: 32px;
        height: 35px;
        // margin:-7px 9px 0 10px;;
      }
      // color: white;
      .logo-title {
        // width: 122px;
        // height: 27px;
        font-size: 15px;

        // font-weight: normal;
        color: white;
        line-height: 66px;
        // border-left: 1px solid #D3DCE6;
        // color: #000;
        // font-weight: 500;
        // margin-left: 10px;
        // padding-left: 12px;
      }
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &.light .logo {
    // background-color: @primary-color;
    background-color: #fff;
  }
}
</style>