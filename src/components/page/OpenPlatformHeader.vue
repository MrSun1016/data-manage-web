<template>
  <div class="headerMenu">
    <div id="openPlatformHeader">
      <div class="log-title">
        <img src="../../../public/xiaogan-logo.png" alt="" />
        <div class="title">运营管理系统</div>
      </div>
      <div class="menus">
        <el-menu
          :default-active="$route.path"
          router
          text-color="#fff"
          background-color="#1890FF"
          active-text-color="#fff"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >

          <el-menu-item index="/openPlatform/home" @click="cancelMenu">首页</el-menu-item>
          <el-menu-item index="/catalogue/datacatalogue" @click="cancelMenu">数据目录</el-menu-item>
          <el-menu-item index="/service/serviceitem" @click="cancelMenu">事项主线目录</el-menu-item>
          <el-menu-item index="/system/policyrule" @click="cancelMenu">政策法规</el-menu-item>
          <el-menu-item index="/system/datastandard" @click="cancelMenu">数据规范</el-menu-item>
          <el-menu-item index="/system/helpdocument" @click="cancelMenu">帮助文档</el-menu-item>
          <el-menu-item index="/system/FunctionNavigation"  @click="cancelMenu" v-if="token">功能导航</el-menu-item>
          <!-- <el-menu-item 
            @click="suspendedMenu"
            v-if="token">
            功能导航2.0
          </el-menu-item> -->

          <!-- <el-menu-item index="/system/EmbedPage" v-if="token">嵌入页面</el-menu-item> -->
        </el-menu>
      </div>

      <div class="user-info">
        <!-- <span v-if="!token" style="cursor: pointer" @click="$router.push('/login')">登录</span> -->
        <span v-if="!token" style="cursor: pointer" @click="$router.push('/escsso')">登录</span>
        <div v-else>
          <a-avatar class="avatar" style="margin-right: -5px" :src="userImg" />
          <span style="color: #fff; padding: 0 12px;" slot="reference">
            {{ nickname() }}
            <el-tooltip class="over-item" :content="departName" placement="top">
              <span v-show="departName" style="font-size: 10px; color: #fff;" @click="departmentSwitch(department)">
                ({{ departName }})
              </span>
            </el-tooltip>
          </span>
          <!-- </el-popover>  -->
          <el-popover popper-class="popover1" placement="top">
            <!-- <div class="pointer" style="font-size: 16px;" @click="handlePath('1')" >资源市场</div> -->
            <div class="pointer" style="margin-bottom: 10px;font-size: 14px;" @click="handlePath('2')">后台管理</div>
            <div
              class="pointer"
              style="margin-bottom: 10px;font-size: 14px;"
              @click="departmentSwitch(department)"
              v-has="'isDepartment:switch'"
            >
              部门切换
            </div>
            <div class="pointer" style="font-size: 14px;" @click="handleLogout">退出登录</div>
            <i class="el-icon-arrow-down" slot="reference" style="cursor: pointer"></i>
          </el-popover>
          <!-- <a-icon style="color: #fff" type="down" @click="handleLoginSel" /> -->
          <select-modal ref="selectModal"></select-modal>
        </div>
      </div>
    </div>
    <SystemNavigation
      ref="child"
      class="isNavigation"
      @ShowNavigation="ShowNavigation"
      v-show="isShowNavigation"
    ></SystemNavigation>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { USER_INFO } from '@/store/mutation-types'
import { putAction } from '@/api/manage'
import { SSO_HREF } from '../../cas/ssoHref'
import { Message } from 'element-ui'
import { getDepartList, queryUserMassge, getUserInfoToken } from '@/api/api'
import { Base64 } from 'js-base64'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Modal } from 'ant-design-vue'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import SelectModal from './SelectModal.vue'
import SystemNavigation from '@/views/system/systemNavigation'

export default {
  name: 'openPlatformHeader',
  components: { SelectModal, SystemNavigation },
  data() {
    return {
      systeDisabled: false,
      token: '',
      nicknames: '',
      userImg: require('@/assets/om/user.png'),
      activeIndex: this.$route.path,
      userName: '',
      department: {},
      orgCode: '',
      departName: '',
      isShowNavigation: false
    }
  },
  activated() {},
  created() {
    this.userName = this.userInfo().username
    this.token = JSON.parse(localStorage.getItem('pro__Access-Token'))
    this.fetchDepartList()
    this.fetchUserMassge()
  },
  mounted() {
    // this.token = JSON.parse(localStorage.getItem('pro__Access-Token'))
  },
  computed: {
    isEmptyObj() {
      for (let item in this.department) {
        return true
      }
      return false
    }
  },
  methods: {
    ShowNavigation() {
      this.isShowNavigation = !this.isShowNavigation
    },
    fetchUserMassge() {
      queryUserMassge().then(res => {
        if (res.success) {
          // this.orgCode = res.body.orgCode
          this.departName = res.body.departName
        }
      })
    },
    handleDepartment(data) {
      return new Promise((resolve, reject) => {
        let obj = {
          orgCode: data.orgCode,
          username: this.userName
        }
        putAction('/sys/selectDepart', obj).then(res => {
          if (res.success) {
            const userInfo = res.result.userInfo
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            this.$store.commit('SET_INFO', userInfo)
            //console.log("---切换组织机构---userInfo-------",store.getters.userInfo.orgCode);
            Message({
              message: '切换成功',
              type: 'success',
              customClass: 'messageIndex'
            })
            location.reload()
            resolve()
          } else {
            this.requestFailed(res)
            this.$store.dispatch('Logout')
            reject()
          }
        })
      })
    },
    fetchDepartList() {
      getDepartList(this.userName).then(res => {
        if (res.code === 200) {
          this.department = res.result
        } else {
          if (res.header.code === 10000001) {
            let token = localStorage.getItem('pro__Access-Token')
            if (token) {
              Modal.error({
                title: '登录已过期',
                content: '很抱歉，登录已过期，请重新登录',
                okText: '重新登录',
                mask: false,
                onOk: () => {
                  store.dispatch('Logout').then(() => {
                    Vue.ls.remove(ACCESS_TOKEN)
                    window.location.href = 'http://xgdsj.xiaogan.gov.cn'
                  })
                }
              })
            }
          }
        }
      })
    },
    onUserName() {
      let userName = this.userInfo().username
      let resUserName = Base64.encode(userName)
      return resUserName
    },
    onRealName() {
      let realName = this.userInfo().realname
      let resRealName = Base64.encode(realName)
      return resRealName
    },
    handlePath(type) {
      this.isActive = type
      switch (type) {
        case '1':
          window.location.href = '/openPlatform/home'
          break
        case '2':
          window.location.href = '/Home'
          break
        case '3':
          window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
          break
        case '4':
          var newWin = window.open(
            `http://59.208.164.226:60001/api/uac/current/user/login?userName=${this.onUserName()}&nickName=${this.onRealName()}`,
            '_blank'
          )
          setTimeout(() => {
            newWin.location = 'http://59.208.164.226:60001/ent/index.html#/console/overview'
          }, 10)
          break
        case '5':
          getUserInfoToken().then(res => {
            if (res.success) {
              window.open(`https://59.208.164.228:60004/sign/jwtLogin/new?token=${res.result}`, '_blank')
            }
          })
          break
      }
    },
    handleRouter() {
      this.$router.push({ path: '/systemmaintenance' })
    },
    handleSystembox() {
      this.systeDisabled = !this.systeDisabled
    },
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    handleSelect(key, keyPath) {},
    handleLogout() {
      let path = this.$route.path
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              if (
                path == '/service/serviceitem' ||
                path == '/catalogue/datacatalogue' ||
                path == '/share/informationsharing' ||
                path == '/openPlatform/home' ||
                path == '/catalogue/datacatalogue/details' ||
                path == '/systemmaintenance'
              ) {
                // update-begin author:wangshuai date:20200601 for: 退出登录跳转登录页面
                // that.$router.push({ path: '/login' })

                // 中科sso退出登录
                // window.location.href = `http://59.208.164.233/cas/logout?service=${SSO_HREF}`

                // 数梦sso退出登录地址
                window.location.href = 'http://xgdsj.xiaogan.gov.cn'
                // update-end author:wangshuai date:20200601 for: 退出登录跳转登录页面
                // window.location.reload()
              } else {
                return false
              }
            })
            .catch(err => {
              // that.$message.error({
              //   title: '错误',
              //   description: err.message,
              // })
              if (
                path == '/service/serviceitem' ||
                path == '/catalogue/datacatalogue' ||
                path == '/share/informationsharing' ||
                path == '/openPlatform/home' ||
                path == '/catalogue/datacatalogue/details' ||
                path == '/systemmaintenance'
              ) {
                // update-begin author:wangshuai date:20200601 for: 退出登录跳转登录页面
                // that.$router.push({ path: '/login' })

                // 中科sso退出登录
                // window.location.href = `http://59.208.164.233/cas/logout?service=${SSO_HREF}`

                // 数梦sso退出登录地址
                window.location.href = 'http://xgdsj.xiaogan.gov.cn'
                // update-end author:wangshuai date:20200601 for: 退出登录跳转登录页面
                // window.location.reload()
              } else {
                return false
              }
            })
        }
      })
    },
    departmentSwitch(department) {
      //部门切换
      let that = this
      this.$refs.selectModal.show(department)
    },
    suspendedMenu() {
      this.$refs.child.toggleDisplay2();
      this.isShowNavigation = !this.isShowNavigation;
    },
    cancelMenu() {
      this.isShowNavigation = false;
    },
    handleMouseEnter() {
      // 处理鼠标悬浮时的逻辑
      this.isShowNavigation = true;
    },
    handleMouseLeave() {
      // 处理鼠标取消悬浮时的逻辑
      this.isShowNavigation = false;
    },
    toNewpage(url, item) {
      this.$refs.child.toggleDisplay2();
      this.isShowNavigation = !this.isShowNavigation;
      this.$refs.child.toNewpage(url, item);
    },
    toNewpage2(url, item) {
      this.$refs.child.toNewpage(url, item);
    },
    jumpBackground() {
      this.$router.push({
          path: '/Home'
        })
    },
  },
  activated() {
    // this.token = JSON.parse(localStorage.getItem('pro__Access-Token'))
  },
  watch: {
    isShowNavigation: {
      immediate: true,
      handler() {
        if (this.isShowNavigation) {
          // console.log('isShowNavigation1', this.isShowNavigation)
          var mo = function(e) {
            e.preventDefault()
          }

          document.body.style.overflow = 'hidden'

          document.addEventListener('touchmove', mo, false) //禁止页面滑动
        } else {
          // console.log('isShowNavigation2', this.isShowNavigation)
          var mo = function(e) {
            e.preventDefault()
          }

          document.body.style.overflow = '' //出现滚动条

          document.removeEventListener('touchmove', mo, false)
        }
      }
    }
  }
}
</script>
<style>
.el-popper {
  min-width: 0px !important;
}
</style>
<style lang="less" scoped>
.headerMenu {
  width: 100%;
  // position: relative;
  .isNavigation {
    width: 100%;
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 9998;
    background-color: rgba(255, 255, 255, 0.9);
  }
}
.el-popover.popover {
}
&.pointer {
  cursor: pointer;
  color: #909399;
}
&.pointer:hover {
  color: #606266;
}
.pointer1 {
  cursor: pointer;
  color: #909399;
}
.bor-color {
  border: 1px solid #1890ff;
}
&.pointer1:hover {
  color: #606266;
}
#openPlatformHeader {
  width: 100%;
  height: 64px;
  color: #fff;
  padding: 0 56px 0 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1890ff;
  .log-title {
    display: flex;
    align-items: center;
    img {
      width: 32px;
      // height: 24px;
    }
    .title {
      padding-left: 20px;
      font-size: 20px;
    }
    .menus {
      padding-left: 100px;
    }
  }
  .user-conten {
    cursor: pointer;
    z-index: 9999;
    .user-info {
      position: relative;
      /deep/.pointer {
        background: red !important;
      }
    }
    .systembox {
      width: 100px;
      height: 100px;
      z-index: 9999;
      position: absolute;
      top: 60px;
      right: 130px;
      background: #fff;
    }
  }
  /deep/.el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }
  .department {
    position: absolute;
    top: 50px;
    right: 130px;
    // width: 100px;
    padding: 12px 12px;
    color: #909399;
    background-color: #fff;
    z-index: 9999;
    cursor: pointer;
  }
}
.active {
  color: #1890ff !important;
}
.over-item {
  display: inline-block;
  cursor: pointer;
  // width: 180px;
  height: 15px;
  max-width: 18em; //限制字数
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

//调整菜单间距
/deep/ .el-submenu__title {
   padding: 0 15px !important;
 }
.el-menu--horizontal .el-menu .el-menu-item {
  padding: 0 15px !important;
}

//取消菜单箭头
li {
  //background-color: #00d8ff;
  ::v-deep .el-submenu__title {
    .el-icon-arrow-down {
      display: none;
    }
  }
}

</style>
