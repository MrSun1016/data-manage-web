<template>
  <div id="functionNavigation">
    <OpenPlatformHeader />
    <div class="container">
      <!-- <el-dialog title="运营管理系统" :visible.sync="isExamineDialogVisible" width="30%">
        
          <div @click="handlePath('2')" style="display:inline-block;width: 170px;">
            <div>
              <img src="~@assets//div1.png" alt="" width="100" height="100" />
            </div>
            <div>运营管理系统</div>
          </div>

          <div @click="handlePath('6')" style="display:inline-block;width: 170px;">
            <div>
              <img src="~@assets//div2.png" alt="" width="100" height="100" />
            </div>
            <div>数据开放平台</div>
          </div>

      </el-dialog>

      <div class="div div1" @click="toDiv()">
        <div class="img1">
          <img src="~@assets//div0.png" alt="" width="75" height="75" />
        </div>
        <div class="text1">运营管理系统</div>
      </div> -->

      <div class="div div1" @click="handlePath('2')">
        <div class="img1">
          <img src="~@assets//div1.png" alt="" width="75" height="75" />
        </div>
        <div class="text1">运营管理平台</div>
      </div>

      <div class="div div2" @click="handlePath('6')">
        <div class="img2">
          <img src="~@assets//div2.png" alt="" width="78" height="78" />
        </div>
        <div class="text2">数据开放平台</div>
      </div>

      <div class="div div3" @click="handlePath('3')">
        <div class="img3">
          <img src="~@assets//div3.png" alt="" width="78" height="78" />
        </div>
        <div class="text3">可视化建模系统</div>
      </div>

      <div class="div div4" @click="handlePath('4', 'label')">
        <div class="img4">
          <img src="~@assets//div4.png" alt="" width="78" height="78" />
        </div>
        <div class="text4">大数据标签系统</div>
      </div>

      <!-- <div class="div div5" @click="handlePath('4','api')">
        <div  class="img5">
          <img src="~@assets//div5.png" alt="" width="78" height="78" />
        </div>
        <div class="text5">数据服务系统</div>
      </div> -->

      <div class="div div5" @click="handlePath('4', 'asset')">
        <div class="img5">
          <img src="~@assets//div6.png" alt="" width="78" height="78" />
        </div>
        <div class="text5">数据平台</div>
      </div>

      <!-- <div class="div div7" @click="handlePath('4','develop')">
        <div  class="img7">
          <img src="~@assets//div7.png" alt="" width="100" height="100" />
        </div>
        <div class="text7">数据开发系统</div>
      </div> -->

      <div class="div div6" @click="handlePath('7')">
        <div class="img6">
          <img src="~@assets//div8.png" alt="" width="78" height="78" />
        </div>
        <div class="text6">大数据处理系统</div>
      </div>
      <div class="div div7" @click="handlePath('9')">
        <div class="img6">
          <img src="~@assets//div11.png" alt="" width="78" height="78" />
        </div>
        <div class="text7">可信计算系统</div>
      </div>

      <div class="div div8" @click="handlePath('10')" v-has="'isData:security'">
        <div  class="img9">
          <img src="~@assets//div9.png" alt="" width="78" height="78" />
        </div>
        <div class="text8">数据安全平台</div>
      </div>

      <!-- <div class="div div9" @click="handlePath('5')">
        <div  class="img9">
          <img src="~@assets//div9.png" alt="" width="78" height="78" />
        </div>
        <div class="text9">数据安全系统</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
import { mapActions, mapGetters } from 'vuex'
import { USER_INFO } from '@/store/mutation-types'
import { putAction } from '@/api/manage'
import { Message } from 'element-ui'
import { getDepartList, queryUserMassge, getUserInfoToken, getUserInfosso, getUserInfosso2 } from '@/api/api'
import { Base64 } from 'js-base64'
import axios from 'axios'
import { Modal } from 'ant-design-vue'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'functionNavigation',
  components: {
    OpenPlatformHeader
  },
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
      isExamineDialogVisible: false
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
    fetchUserMassge() {
      queryUserMassge().then(res => {
        if (res.success) {
          // this.orgCode = res.body.orgCode
          // this.departName = res.body.departName
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
    handlePath(type, str) {
      this.isActive = type
      switch (type) {
        case '1':
          window.location.href = '/openPlatform/home'
          break
        case '2':
          // window.location.href = '/Home'
          this.isExamineDialogVisible = false
          window.open(`http://59.208.164.242:60033/openPlatform/home`, '_blank')
          break
        case '3':
          window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
          break
        case '4':
          //var newWin = window.open(`http://59.208.164.226:60001/api/uac/current/user/login?userName=${this.onUserName()}&nickName=${this.onRealName()}`, '_blank');
          var newWin = window.open(
            `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`,
            '_blank'
          )
          var url
          if (str === 'api') {
            //数据服务系统
            url = 'http://59.208.164.226:60001/data/index.html#/api'
          } else if (str === 'asset') {
            //数据资产治理系统
            url = 'http://59.208.164.226:60001/asset/index.html#/data-overview/overview'
          } else if (str === 'develop') {
            //数据开发系统
            url = 'http://59.208.164.226:60001/ent/index.html#/datadev/overview'
          } else if (str === 'administer') {
            //数据治理系统
            url = 'http://59.208.164.226:60001/asset/index.html#/data-standard/data-statistic'
          } else if (str === 'label') {
            //大数据标签系统
            // url = 'http://59.208.164.226:60001/tag-model/index.html#/overview';
            url = 'http://59.208.164.226:60001/tag/tag_home'
          }
          setTimeout(() => {
            newWin.location = url
          }, 1000)

          // axios.defaults.withCredentials = true
          // axios.post('/api/uac/current/user/login',{
          //   "username": "yuzhimin@admin", "password": "14b8e9b316bc9c490af9dbce64452dc9"
          // }).then(function (res){
          //   document.cookie = "dtwave_uac=nKR2vkMfu3eLqXG0; path=/; domain=59.208.164.226"
          //   console.log(res);
          // }).catch(err =>{
          //   console.log(err);
          // })
          // window.open(`http://59.208.164.226:60001/ent/index.html#/console/overview`, '_blank')
          break
        case '5':
          getUserInfoToken().then(res => {
            if (res.success) {
              window.open(`https://59.208.164.228:60004/sign/jwtLogin/new?token=${res.result}`, '_blank')
            }
          })
          // window.open(`https://59.208.164.228:60004/#/portal`, '_blank')
          break
        case '6': //数据开放平台
          this.isExamineDialogVisible = false
          // this.$message.success(`数据开放平台正在建设中！`)
          window.open(`http://sjkf.xiaogan.gov.cn/openPlatform/home`, '_blank')
          break
        case '7': //大数据处理系统
          // let name = Base64.encode(this.userInfo().username+':'+this.userInfo().username)
          let name = Base64.encode(this.userInfo().username + ':Emr@1298')
          var newWin = window.open(`http://59.208.164.227:60001/login.html?name=` + name, '_blank')
          setTimeout(() => {
            newWin.location = `http://59.208.164.227:60001/#/main/dashboard/metrics`
          }, 1000)
          break
        case '8': //大数据标签系统
          this.$message.success(`大数据标签系统正在建设中！`)
          break
        case '9': //可信计算系统
          getUserInfosso().then(res => {
            if (res.success) {
              window.open(`http://59.208.164.237:10081/jxmpc/login?openUserInfo=${res.result}`, '_blank')
            }
          })
          break
        case '10': //数据安全平台
          getUserInfosso2().then(res => {
            if (res.success) {
              window.open(`https://59.208.164.228:60035/authorize-login?userInfo=${res.result}`, '_blank')
            }
          })
          break
      }
    },
    toDiv() {
      this.isExamineDialogVisible = true
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
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        }
      })
    }
  },
  activated() {
    // this.token = JSON.parse(localStorage.getItem('pro__Access-Token'))
  }
}
</script>

<style lang="less" scoped>
#functionNavigation {
  .container {
    height: 800px;
    background-color: #f4f8f9;
    border: 1px solid #f4f8f9;
    text-align: center;
    // position: absolute;
    // top: 0px;
    // left: -75px;
    /* padding: 1px; */
  }
  .div {
    width: 200px;
    height: 139px;
    background: white;
    margin: 0px auto; //水平垂直居中
    cursor: pointer; //显示小手
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    // position: absolute;//绝对定位
    // position: relative;//相对定位
    // top: 40px;
    // left: -600px;
  }
  .div1 {
    position: absolute;
    top: 150px;
    left: 150px;
  }
  .div2 {
    position: absolute;
    top: 150px;
    left: 370px;
  }
  .div3 {
    position: absolute;
    top: 150px;
    left: 590px;
  }
  .div4 {
    position: absolute;
    top: 150px;
    left: 810px;
  }
  .div5 {
    position: absolute;
    top: 150px;
    left: 1030px;
  }
  .div6 {
    position: absolute;
    top: 330px;
    left: 150px;
  }
  .div7 {
    position: absolute;
    top: 330px;
    left: 370px;
  }
  .div8 {
    position: absolute;
    top: 330px;
    left: 590px;
  }
  .div9 {
    position: absolute;
    top: 330px;
    left: 810px;
  }
  .img1 {
    position: absolute;
    top: 15px;
    left: 60px;
  }
  .text1 {
    position: absolute;
    top: 100px;
    left: 54px;
  }
  .img2 {
    position: absolute;
    top: 10px;
    left: 60px;
  }
  .text2 {
    position: absolute;
    top: 100px;
    left: 55px;
  }
  .img3 {
    position: absolute;
    top: 10px;
    left: 60px;
  }
  .text3 {
    position: absolute;
    top: 100px;
    left: 51px;
  }
  .img4 {
    position: absolute;
    top: 12px;
    left: 60px;
  }
  .text4 {
    position: absolute;
    top: 100px;
    left: 53px;
  }
  .img5 {
    position: absolute;
    top: 12px;
    left: 60px;
  }
  .text5 {
    position: absolute;
    top: 100px;
    left: 70px;
  }
  .img6 {
    position: absolute;
    top: 14px;
    left: 58px;
  }
  .text6 {
    position: absolute;
    top: 100px;
    left: 47px;
  }
  .img7 {
    position: absolute;
    top: 3px;
    left: 48px;
  }
  .text7 {
    position: absolute;
    top: 100px;
    left: 55px;
  }
  .img8 {
    position: absolute;
    top: 14px;
    left: 60px;
  }
  .text8 {
    position: absolute;
    top: 100px;
    left: 57px;
  }
  .img9 {
    position: absolute;
    top: 13px;
    left: 60px;
  }
  .text9 {
    position: absolute;
    top: 100px;
    left: 57px;
  }
}
</style>
