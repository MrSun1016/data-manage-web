<template>
  <div id="OpenPlatformLogin">
    <div class="login-box">
      <div class="login-title">
        <img src="../../../public/logo1.png" alt="logo" />
        <p>孝感市城市数据中台</p>
      </div>
      <div class="login-form-info">
        <el-form
          :model="loginFormData"
          :rules="loginRules"
          ref="loginFormData"
          style="width: 250px; margin: 0 auto; padding-top: 32px"
        >
          <el-form-item class="form-item" prop="username">
            <el-input prefix-icon="el-icon-user" v-model="loginFormData.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginFormData.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox style="position: relative; top: -16px" v-model="loginFormData.checked">
              <span class="rember-paw">记住密码</span></el-checkbox
            >
          </el-form-item>
          <el-form-item>
            <el-button round class="register" @click="handleRegister" :loading="false">{{
              loading ? '登录中...' : '登录'
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ChangeCheckCode } from '@/api/api'
import { mapActions } from 'vuex'
import { encryption, getEncryptedString } from '@/utils/encryption/aesEncrypt'
import { SSO_ZK_HREF } from '../../cas/ssoHref'
import { Message } from 'element-ui'
export default {
  name: 'OpenPlatformLogin',
  data() {
    return {
      loading: false,
      loginFormData: {
        username: '',
        password: '',
        checked: false,
        loginType: 0,
        currdatetime: '',
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      encryptedString: {
        key: '123456789@ABCDEF',
        iv: '123456789@abcdef',
      },
    }
  },
  created() {
    this.loading = false
    this.currdatetime = new Date().getTime()
    let token = JSON.parse(localStorage.getItem('pro__Access-Token'))
    if (token) this.$route.push('/login')
    else
    this.goSso()
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'PhoneLogin', 'ThirdLogin', 'ValidateLogin']),
    handleRegister() {
      this.$refs.loginFormData.validate((valid) => {
        if (valid) {
          this.loginFormData.password = encryption(
            this.loginFormData.password,
            this.encryptedString.key,
            this.encryptedString.iv
          )
          this.loginFormData.checkKey = this.currdatetime
          this.loading = true
          this.Login(this.loginFormData)
            .then((res) => {
              this.loading = false
              this.$router.push({ path: '/openPlatform/home' })
            })
            .catch((err) => {
              this.requestFailed(err)
            })
        } else {
          this.loading = false
        }
      })
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '登录失败',
        description: ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试',
        duration: 4,
      })
      this.loading = false
    },



    goSso() {
      const ticket = this.getTicket('ticket')
      if (ticket == null) {
        const url = `http://59.208.164.233/cas/login?service=${SSO_ZK_HREF}`
        window.location.href = url
      } else {
        const ticket = this.getTicket('ticket')
        const service = SSO_ZK_HREF
        this.handleChangeCheckCode(ticket, service)
      }
    },
    //接口
    handleChangeCheckCode(ticket, service) {
      this.loading = true
      this.currdatetime = new Date().getTime()
      const url = '/third/sso/auth?ticket=' + ticket + '&service=' + service
      // console.log('回调后台地址：'+url)
      this.ValidateLogin(url)
        .then((res) => {
          if (res.code === 200) {
            this.loading = false
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message.success(res.message)
          } else {
            this.loading = false
            this.$router.push({
              path: '/openPlatform/home',
            })
            Message.error(res.message)
          }
        })
        .catch((err) => {
          this.loading = false
        })
    },
    getTicket(variable) {
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
            let ticketValue = resArr[i + 1]
            value = ticketValue
          }
        }
        return value
      }
    },



    //获取密码加密规则
    getEncrypte() {
      var encryptedString = Vue.ls.get(ENCRYPTED_STRING)
      if (encryptedString == null) {
        getEncryptedString().then((data) => {
          this.encryptedString = data
        })
      } else {
        this.encryptedString = encryptedString
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#OpenPlatformLogin {
  position: relative;
  height: 100%;
  background-color: #f7fbff;
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-title {
      display: flex;
      justify-content: space-between;
      padding: 0 52px;
      p {
        font-size: 24px;
        color: #333333;
        font-weight: 600;
        margin: 0 0;
      }
    }
    .login-form-info {
      width: 400px;
      height: 289px;
      background: #ffffff;
      border-radius: 20px;
      margin-top: 40px;
      .form-item {
        width: 249px;
      }
      .rember-paw {
        font-size: 12px;
        color: #777777;
      }
      .register {
        width: 240px;
        color: #777777;
        background: #f7fbff;
      }
    }
  }
  /deep/.el-input__inner {
    background: #f4faff;
  }
}
</style>