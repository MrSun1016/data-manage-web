<template>
  <a-layout-header class="ant-header-fixedHeader" style="background: #fff">
    <div class="header" :class="theme">
      <!-- logo -->
      <!-- <logo :collapsed='collapsed' style="display:inline-block; float:left; margin-left:80px"/> -->
      <a-icon
        v-if="device === 'mobile'"
        style="font-size: 20px"
        class="trigger"
        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggle"
      />
      <a-icon
        v-else
        style="font-size: 20px"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggle"
      />

      <!-- 组织用户 -->
      <span class="header-right">
        <div class="headericon" @click="toMessage">
          <!-- <div class="picon">25</div> -->
          <!-- <el-badge is-dot class="item"> -->
          <el-badge :value="badgeVal" :max="99" class="item">
            <img src="../../../public/211ling.png" class="iconSize" alt="" />
          </el-badge>
          <!-- <i class="el-icon-bell iconSize"></i> -->
        </div>
        <div class="user-info">
          <a-avatar class="avatar" style="margin-right: -5px" :src="userImg" />
          <!-- <el-popover popper-class="popover" placement="bottom" width="100" trigger="click"> -->
          <!-- <p class="pointer" @click="handleLogout">退出登录</p> -->

          <span style="color: #606266; padding: 0 12px;" slot="reference">
            {{ nickname() }}
            <el-tooltip class="over-item" :content="newDepa.departName" placement="top">
              <span v-show="newDepa.departName" style="font-size: 12px; color: #606266;" @click="departmentSwitch(department)">
                ({{ newDepa.departName }})</span
              >
            </el-tooltip>
          </span>

          <!-- </el-popover> -->
          <el-popover popper-class="popover1" placement="top">
            <!-- <div class="pointer" @click="handleLogout">退出登录</div> -->
            <!-- <p style="color: black">组织架构</p>
            <p v-show="!isEmptyObj">您暂未归属部门</p>
            <p
              class="pointer1"
              :class="{ active: newDepa.orgCode === depars.orgCode }"
              v-for="depars in department"
              :key="depars.id"
              @click="handleDepartment(depars)"
            >
              {{ depars.departName }}
              <span v-show="newDepa.orgCode == depars.orgCode" style="font-size: 12px">（当前所在部门）</span> -->
            <!-- </p> -->
            <div
              class="pointer"
              style="margin-bottom: 15px;"
              @click="departmentSwitch(department)"
              v-has="'isDepartment:switch'"
            >
              部门切换
            </div>
            <div class="pointer" @click="handleLogout">退出登录</div>
            <i class="el-icon-arrow-down" slot="reference" style="cursor: pointer"></i>
          </el-popover>
          <select-modal ref="selectModal"></select-modal>
        </div>
      </span>
    </div>
  </a-layout-header>
</template>

<script>
import { USER_INFO } from '@/store/mutation-types'
import UserMenu from '../tools/UserMenu'
import SMenu from '../menu/'
import Logo from '../tools/Logo'
import { mapActions, mapGetters } from 'vuex'
import { Message } from 'element-ui'
import { mixin } from '@/utils/mixin.js'
import reloadBus from '@/mixins/reloadBus'
import { getUnreadMessageQuantity, queryUserMassge, getDepartList } from '@/api/api'
import { getFileAccessHttpUrl, getAction, putAction } from '@/api/manage'
import Vue from 'vue'
// import { reloadMixin } from '@/mixins/reloadMixin.js'
import { Modal } from 'ant-design-vue'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import SelectModal from './SelectModal.vue'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo,
    SelectModal
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data() {
    return {
      newDepa: {
        orgCode1: '',
        departName: ''
      },
      systeDisabled: false,
      nicknames: '',
      activeIndex: this.$route.path,
      userName: '',
      department: {
        departName: '',
        orgCode: ''
      },
      orgCode1: '',
      departName: '',
      userImg: require('@/assets/om/user.png'),
      orgValue: [],
      systemList: [],
      orgCategory: '',
      dimList: [],
      dimTreeList: [],
      headerBarFixed: false,
      oneObj: {},
      //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
      topMenuStyle: {
        headerIndexLeft: {},
        topNavHeader: {},
        headerIndexRight: {},
        topSmenuStyle: {}
      },
      homeUrl: '/pageHome/PageHome',
      menuIndex: [1],
      orgCode: -1,
      badgeVal: '',
      timer: null // 定时器名称
    }
  },
  computed: {
    isEmptyObj() {
      for (let item in this.department) {
        return true
      }
      return false
    }
  },
  watch: {
    /** 监听设备变化 */
    device() {
      if (this.mode === 'topmenu') {
        // this.buildTopMenuStyle()
      }
    },
    /** 监听导航栏模式变化 */
    mode(newVal) {
      if (newVal === 'topmenu') {
        this.buildTopMenuStyle()
      }
    },

    $route(to, from) {
      if (
        to.path == '/monthlyReport/monthly' ||
        to.path == '/waterAffairs/production' ||
        to.path == '/waterAffairs/service'
      ) {
        this.orgValue = [JSON.parse(JSON.stringify(this.oneObj)).id]
        reloadBus.$emit('reloadInit', JSON.parse(JSON.stringify(this.oneObj)))
      }
      if (to.path.indexOf('pageHome') > 0 || to.path.indexOf('subsidiary') > 0) {
        if (to.path == '/pageHome/PageHome') {
          this.menuIndex = [1]
        }
      } else {
        if (to.path == '/pageUser/PageUser') {
          this.menuIndex = [1]
        } else {
          this.menuIndex = [-1]
        }
      }
    },

    // 监听路由改变，该函数可以有参数to与from，代表即将去的页面与切换前的页面。
    $route(to, from) {
      this.smallBell()
      // this.fetchDepartList()
      this.userName = this.userInfo().username
      this.fetchDepartList()
      this.fetchUserMassge()
      this.$store.dispatch('GetPermissionList')
    }
  },
  activated() {},
  created() {
    this.userName = this.userInfo().username
    // this.getDimTreeList()
    this.smallBell()
    this.fetchDepartList()
    this.fetchUserMassge()
  },
  //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  mounted() {
    this.menus.filter(item => {
      if (item.path == '/isystem') {
        this.systemList = item.children || []
      }
      if (item.path == '/dim') {
        this.dimList = item.children || []
      }
    })
    window.addEventListener('scroll', this.handleScroll)
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    if (this.mode === 'topmenu') {
      // this.buildTopMenuStyle()
    }
    this.$bus.$on('getTabelMessage', () => {
      // console.log('getTabelMessage')
      this.smallBell()
    })
    this.$bus.$on('getMessageContentcod', () => {
      // console.log('getMessageContentcod')
      this.smallBell()
    })
    this.$bus.$on('getAnnouncements', () => {
      // console.log('getAnnouncements')
      this.smallBell()
    })
    //update-end--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    // this.timer = setInterval(() => {
    //   this.smallBell()
    // }, 10000)
  },
  beforeDestroy() {
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(this.timer)
    // })
    this.$bus.$off('getTabelMessage', 'getMessageContentcod', 'getAnnouncements')
  },
  methods: {
    handleDepartment(data) {
      return new Promise((resolve, reject) => {
        let obj = {
          orgCode: data.orgCode || '',
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
    fetchUserMassge() {
      queryUserMassge().then(res => {
        if (res.success) {
          if (res.body === null) {
            this.newDepa.orgCode = ''
            this.newDepa.departName = ''
          } else {
            this.newDepa = res.body
          }
          // this.orgCode1 = res.body.orgCode
          // this.departName = res.body.departName
        }
      })
    },
    // 小铃铛未读消息
    smallBell() {
      getUnreadMessageQuantity().then(res => {
        if (res.success) {
          this.badgeVal = res.body
          if (this.badgeVal == 0) {
            this.badgeVal = ''
          }
        }
      })
    },
    // menuClick(e){
    //   console.log(e)
    //   this.menuIndex = e.key
    //   this.handleClick(this.menuIndex)
    // },
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    getAvatar() {
      return getFileAccessHttpUrl(this.avatar())
    },
    // 跳转页面
    toMessage() {
      let mesageType
      console.log(this.badgeVal)
      if (this.badgeVal == 0) {
        mesageType = '全部'
      } else {
        mesageType = '未读'
      }
      this.$router.push({
        path: '/MessageCenter/MessageNotification',
        query: {
          mesageType
        }
      })
    },
    // 获取组织层级
    // getDimTreeList() {
    //   // queryDimTreeList().then((res) => {
    //   //   if (res.success) {
    //   //     // 设置组织id
    //   //     // Vue.ls.set('depId',res.result[0].id)
    //   //     // 判断水务【0】or水司【-1】
    //   //     let orgCode = res.result[0].orgCode.search(/^A03$/)
    //   //     this.orgCode = orgCode
    //   //     Vue.ls.set('orgCode',orgCode)
    //   //     // 生成组织层级备选项
    //   //     this.dimTreeList =  this.dataGovernance1(res.result)
    //   //     // this.dimTreeList=res.result||[]
    //   //     this.orgValue=[(orgCode<0 ? this.dimTreeList[0].id : null)||res.result&&res.result.length>0&&res.result[0].id||'']
    //   //     if(orgCode<0 && this.$router.path == '/pageUser/PageUser'){
    //   //       this.orgValue=[this.dimTreeList[0].id,this.dimTreeList[0].children[0].id]
    //   //     }
    //   //     console.log(this.orgValue,)
    //   //     this.orgCategory=res.result&&res.result.length>0&&res.result[0].orgCategory||''
    //   //     reloadBus.$emit('reloadInit', res.result[0]);
    //   //   }
    //   // })
    // },
    // 生成组织层级
    // dataGovernance1(data) {
    //   let list = []
    //   data.forEach((item) => {
    //     const itemData = {
    //       id: item.id,
    //       key: item.key,
    //       title: item.title,
    //       orgType: item.orgType,
    //       memo: item.memo,
    //       businessType: item.businessType,
    //       departName: item.departName,
    //       orgCategory: item.orgCategory,
    //       delFlag: item.delFlag,
    //       orgCode: item.orgCode,
    //       parentId: item.parentId,
    //     }
    //     if (item.memo == '粤海水务') {
    //       const mapList = item.children.map((ite) => {
    //         return ite
    //       })
    //       this.oneObj = Object.assign({}, itemData)
    //       // delete item.children
    //       list = [itemData, ...mapList]
    //     } else {
    //       list.push({
    //         id: 'a13a2b3bc2b8433dbd61a78fc17c124e',
    //         key: 'a13a2b3bc2b8433dbd61a78fc17c124e',
    //         title: '广东粤海水务股份有限公司',
    //         orgType: '3',
    //         memo: '粤海水务',
    //         businessType: '6',
    //         departName: '广东粤海水务股份有限公司',
    //         orgCategory: '1',
    //         delFlag: '0',
    //         orgCode: 'A03',
    //         parentId: '',
    //         children: [itemData],
    //       })
    //     }
    //   })
    //   return list
    // },

    // dataGovernance(data,orgCategory){
    //   let list=[]
    //   list=  data.map(item=>{
    //     if(item.orgCategory>=orgCategory){
    //         delete item.children
    //         return {
    //           id:item.id,
    //           key:item.key,
    //           title:item.title,
    //           orgType:item.orgType,
    //           memo:item.memo,
    //           businessType:item.businessType,
    //           departName:item.departName,
    //           orgCategory:item.orgCategory,
    //           delFlag:item.delFlag,
    //           orgCode:item.orgCode,
    //           parentId:item.parentId
    //         }
    //     }else if(item.children){
    //       if(item.orgCategory==2){
    //         // item.disabled=true
    //       }
    //       item.children= this.dataGovernance(item.children,orgCategory)
    //       return item
    //     }else{
    //       return item
    //     }
    //   })
    // return list
    // },
    displayRender({ labels }) {
      return labels[labels.length - 1]
    },
    filter(inputValue, path) {
      console.log(inputValue, path)
      return path.some(option => option.memo.indexOf(inputValue) > -1)
    },
    toUserPage() {
      const that = this
      that.$router.push({ path: '/pageUser/PageUser' })
    },
    handleLogout() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              // update-begin author:wangshuai date:20200601 for: 退出登录跳转登录页面
              // window.location.href = '/user/login'
              // window.location.href = '/d'
              // window.location.href='openPlatform/home'
              that.$router.push({ path: '/openPlatform/home' })
              // update-end author:wangshuai date:20200601 for: 退出登录跳转登录页面
              //window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    reloadInit(e, arr, node) {
      console.log(e, arr, node)
      if (this.orgCode < 0) {
        if (e.length == 1) {
          // 跳转公共首页
          this.$router.push({ path: '/pageHome/PageHome' })
          this.homeUrl = '/pageHome/PageHome'
        } else {
          // 跳转水司首页
          this.$router.push({ path: '/pageUser/PageUser' })
          this.homeUrl = '/pageUser/PageUser'
        }
      } else {
      }
      // this.orgCategory=node.triggerNode.dataRef.orgCategory
      reloadBus.$emit('reloadInit', arr.length > 1 ? arr[1] : arr[0])
    },
    handleScroll() {
      if (this.autoHideHeader) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 100) {
          this.headerBarFixed = true
        } else {
          this.headerBarFixed = false
        }
      } else {
        this.headerBarFixed = false
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    handleClick(obj) {
      console.log(obj)
      if (obj == 'user') {
        console.log(this.menuIndex)
        this.menuIndex[0] = -1
        this.$emit('menuSelect', obj)
      } else {
        this.$emit('menuSelect', obj)
      }
    },
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
    buildTopMenuStyle() {
      if (this.mode === 'topmenu') {
        if (this.device === 'mobile') {
          // 手机端需要清空样式，否则显示会错乱
          this.topMenuStyle.topNavHeader = {}
          this.topMenuStyle.topSmenuStyle = {}
          this.topMenuStyle.headerIndexRight = {}
          this.topMenuStyle.headerIndexLeft = {}
        } else {
          let rightWidth = '280px'
          this.topMenuStyle.topNavHeader = { 'min-width': '165px' }
          this.topMenuStyle.topSmenuStyle = { width: 'calc(100% - 165px)' }
          this.topMenuStyle.headerIndexRight = { 'min-width': rightWidth }
          this.topMenuStyle.headerIndexLeft = { width: `calc(100% - ${rightWidth})` }
        }
      }
    },
    departmentSwitch(department) {
      //部门切换
      let that = this
      this.$refs.selectModal.show(department)
    }
    //update-begin--author:sunjianlei---date:20190508------for: 顶部导航栏过长时显示更多按钮-----
  }
}
</script>

<style lang="less" scoped>
.user-info {
  margin-right: 80px;
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
.active {
  color: #1890ff !important;
}
/* update_begin author:scott date:20190220 for: 缩小首页布局顶部的高度*/

@height: 58px;

.layout {
  .ant-header-fixedHeader {
    height: 46px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0;
    z-index: 999;
    .ant-menu > li {
      height: 58px;
      line-height: 58px;
      // justify-content: flex-start;
    }
  }
  .top-nav-header-index {
    .header-index-wide {
      margin-left: 10px;
      .ant-menu.ant-menu-horizontal {
        height: @height;
        line-height: @height;
      }
    }
    .trigger {
      line-height: 58px;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .header {
    z-index: 2;
    height: @height;
    transition: background 300ms;
    border-bottom: 2px solid #f1f2f6;
    background: white;
    /* dark 样式 */
    &.dark {
      color: #000000;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      background-color: white !important;
    }
  }
  .header,
  .top-nav-header-index {
    &.dark .trigger:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
.ant-layout-header {
  padding: 0 24px !important;
  height: @height;
  line-height: @height;
  .header-right {
    display: flex;
    position: absolute;
    top: 0;
    right: 15px;
    color: #000;
    /deep/ .ant-input {
      height: 36px;
    }
    // display: flex;
    > span:nth-child(1) {
      float: left;
      margin-top: 14px;
    }
    .user-name {
      padding: 0 8px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    .headericon {
      .item {
        // margin-top: 20px;
        margin-right: 40px;
        padding-bottom: 5px;
        cursor: pointer;
        .iconSize {
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }
      /deep/.el-badge__content.is-fixed {
        top: 22px;
        right: 15px;
      }
      /deep/.el-badge__content {
        padding: 0 6px 19px 6px;
      }
    }
    .picon {
      width: 20px;
      height: 20px;
      color: #bebebe;
      background-color: red;
    }
  }
  .menu-notOpen {
    position: absolute;
    top: -5px;
    left: 40px;
    width: 30px;
    height: 16px;
    color: #ffffff;
    font-size: 8px;
    font-weight: normal;
    line-height: 16px;
    background: #0d0d1e;
    border-radius: 6px 6px 6px 1px;
    span {
      width: 30px;
      text-align: center;
      height: 16px;
      font-size: 14px;
      /* transform: scaleX(10.911); */
      transform: scale(0.6);
      margin-left: -8px;
      display: inline-block;
    }
  }
  .header-organ {
    position: relative;
    .header-organ-title {
      // width: 63px;
      // height: 22px;
      font-size: 16px;
      font-weight: normal;
      color: #078af4;
      line-height: 36px;
      position: absolute;
      height: 16px;
      line-height: 16px;

      // width: 62px;
      left: 7px;
      top: 0px;

      span {
        line-height: 16px;
        border-right: 1px solid;
        padding-right: 5px;
      }
    }
  }
}
.select_1 {
  /deep/ span:nth-child(1) {
    height: 36px;
    /deep/ span:nth-child(1) {
      line-height: 36px;
      // background: red;
      height: 36px;
    }
  }
}
.over-item {
  display: inline-block;
  cursor: pointer;
  max-width: 20em; //限制字数
  white-space: nowrap; //规定文本不进行换行
  overflow: hidden; //溢出内容为隐藏
  text-overflow: ellipsis; //当文本溢出时是否显示省略标记，有两个值：clip：不显示省略标记（…），而是简单的裁切，当对象内文本溢出时显示省略标记（…）
  vertical-align: top; //对其，一行展示
}
/* update_end author:scott date:20190220 for: 缩小首页布局顶部的高度*/
</style>
<style lang="less">
.ant-cascader-menu {
  height: 100% !important;
  max-height: 400px;
}
li.ant-select-tree-treenode-disabled > span:not(.ant-select-tree-switcher),
li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper,
li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper span {
  color: rgba(0, 0, 0, 0.65) !important;
}
</style>
