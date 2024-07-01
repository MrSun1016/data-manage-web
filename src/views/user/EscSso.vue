<template>
  <div id="escSso"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { SSO_HREF,SSO_ZK_HREF } from '../../cas/ssoHref'
import { Message } from 'element-ui'
export default {
  name: 'escSso',
  data() {
    return {
      currdatetime: '',
    }
  },
  created() {
    this.goSso()
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'PhoneLogin', 'ThirdLogin', 'ValidateLogin']),
    goSso() {
      // const isExistCode = this.hasQueryParam('code');
      const isExistTicket = this.hasQueryParam('ticket');
      const code = this.getKeyWord('code')
      const ticket = this.getKeyWord('ticket')
      if(isExistTicket){
        if (ticket === null && isExistTicket) {
          const url = `http://59.208.164.233/cas/login?service=${SSO_ZK_HREF}`
          window.location.href = url
        } else if (ticket !== null && isExistTicket){
          const ticket = this.getKeyWord('ticket')
          const service = SSO_ZK_HREF
          this.handleChangeCheckCodeZk(ticket, service)
        }
      }else{
        if (code === null) {
          const timestamp = Date.now()
          let url = `http://xgdsj.xiaogan.gov.cn/esc-sso/oauth2.0/authorize?client_id=mbF2z0dfvw&response_type=code&oauth_timestamp=${timestamp}&redirect_uri=${SSO_HREF}`
          window.location.href = url
        } else if (code !== null){
          const code = this.getKeyWord('code')
          let service = SSO_HREF
          this.handleChangeCheckCode(code, service)
        }
      }

    },
    //统一身份认证(旧)
    handleChangeCheckCode(code, service) {
      this.currdatetime = new Date().getTime()
      let url = `http://59.208.164.242:60033/dtwave-om/v1/third/sso/xgLogin?code=${code}&service=${service}`
      // const url = '/third/sso/auth?ticket=' + ticket + '&service=' + service
      this.ValidateLogin(url)
        .then((res) => {
          if (res.code === 200) {
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message({
                message: res.message,
                type: "success",
                duration: 1 * 3000,
                offset: 65,
                showClose: true,
            });
          } else {
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message({
                message: res.message,
                type: "error",
                duration: 1 * 3000,
                offset: 65,
                showClose: true,
            });
          }
        })
        .catch((err) => {
        })
    },
    //统一身份认证(新)
    handleChangeCheckCodeZk(ticket, service) {
      this.currdatetime = new Date().getTime()
      const url = '/third/sso/auth?ticket=' + ticket + '&service=' + service
      this.ValidateLogin(url)
        .then((res) => {
          if (res.code === 200) {
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message({
                message: res.message,
                type: "success",
                duration: 1 * 3000,
                offset: 65,
                showClose: true,
            });
          } else {
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message({
                message: res.message,
                type: "error",
                duration: 1 * 3000,
                offset: 65,
                showClose: true,
            });
          }
        })
        .catch((err) => {
        })
    },
    //判断URL中是否存在某参数
    hasQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.has(param);
    },
    getKeyWord(variable) {
      let value = null
      let href = window.location.href
      let href1 = href.indexOf(variable)
      if (href1 == -1) {
        return value
      } else {
        let query = href.substring(href.indexOf('?') + 1)
        let resArr = query.split('=')
        for (let i = 0; i < resArr.length; i++) {
          if (resArr[i] == variable) {
            let code = resArr[i + 1]
            // let ticketValue = resArr[i + 1] 
            value = code
            // value = ticketValue
          }
        }
        return value
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>