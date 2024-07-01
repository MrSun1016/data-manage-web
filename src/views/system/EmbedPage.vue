<template>
    <div id="app">
        <OpenPlatformHeader />
        <iframe
           style="border:none"
           :width="searchTableWidth"
           :height="searchTableHeight"
           v-bind:src="reportUrl"
         ></iframe>
    </div>
  </template>
  <script>
  import Vue from 'vue'
  import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
  import axios from 'axios'
  import { mapActions, mapGetters } from 'vuex'
  import { Base64 } from 'js-base64'
  export default {
    name: 'EmbedPage',
    props: {
      reportUrl: {
        type: String,
        default: ''
      },
    },
    components: {
        OpenPlatformHeader,
    },
    methods: {
      widthHeight() {
        this.searchTableHeight = window.innerHeight -70;
        this.searchTableWidth = window.innerWidth ;
      },
      ...mapGetters(['nickname', 'avatar', 'userInfo']),
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
      login() {
        this.reportUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`;
        setTimeout(() => {
          this.reportUrl = `http://59.208.164.226:60001/ent/index.html#/console/overview`;
          }, 1000)

      },
    },
    data() {
      return {
        // reportUrl: 'http://59.208.164.227:60010/logging?userName=MTg1NzE2Mzg3ODY=&path=modelFactory',
        // reportUrl: 'http://192.168.0.123:60001/ent/index.html#/console/overview',
        // reportUrl: 'http://localhost/myBaidu',
        searchTableHeight: 0,
        searchTableWidth: 0
      }
    },
     mounted() {
      window.onresize = () => {
        this.widthHeight(); // 自适应高宽度
      };
      this.$nextTick(function () {
        this.widthHeight();
      });
    },
    created() {
      // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法 
      // this.reportUrl = 'http://59.208.164.227:60010/logging?userName=MTg1NzE2Mzg3ODY=&path=modelFactory';
      this.login();
    },
    watch: {
      '$route': function () {
        // 监听路由变化
        // this.reportUrl =  'http://59.208.164.227:60010/logging?userName=MTg1NzE2Mzg3ODY=&path=modelFactory'
      }
    }
  }
  </script>