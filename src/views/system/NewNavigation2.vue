<template>
  <div>
    <div>
      <OpenPlatformHeader2 class="platformHeader" />
    </div>
    <div class="iframe-container" ref="myDiv" :style="{ width: width+'px',height: height+'px',paddingTop: paddingTop+'px',marginTop: marginTop+'px' }">
      <iframe
        id="iframeToShow"
        class="frameCode"
        ref="myIframe"
        width="100%" height="100%"
        v-bind:src="httpUrl"
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>
<script>
import OpenPlatformHeader2 from '@/components/page/OpenPlatformHeader2'
import { getUserInfosso } from '@/api/api'
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import axios from 'axios'
export default {
  name: 'NewNavigation2',
  components: {
    OpenPlatformHeader2
  },
  data() {
    return {
      httpUrl: '',
      url: '',
      item: '',
      showIframe: false,
      searchTableHeight: 0,
      searchTableWidth: 0,
      width: '0',
      height: '0',
      paddingTop: '0',
      marginTop: '0',
    }
  },
  mounted() {
    var that = this
    var pickerList = JSON.parse(localStorage.getItem('insuranceCode'))
    that.url = pickerList.url
    that.item = pickerList.item

    window.addEventListener('insuranceCode', function (e) {
      var newValue = JSON.parse(e.newValue)
      that.url = newValue.url
      that.item = newValue.item
      //   console.log('值改变了', e.newValue)
    })
    // that.iframeNavigation()

    window.onresize = () => {
      this.widthHeight(); // 自适应高宽度
    };
    this.$nextTick(function () {
      this.widthHeight();
    });
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight ;
      this.searchTableWidth = window.innerWidth ;
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
    setCss(width,height,paddingTop,marginTop) {
      this.width = width;
      this.height = height;
      this.paddingTop = paddingTop;
      this.marginTop = marginTop;          
    },
    iframeNavigation() {
      var url = this.url
      var item = this.item
      var aurl1 = window.location.origin

      //新
      switch (item) {
        case '交换平台前台':
          this.$router.push({
            path: url
          })
          break
        case '交换平台':
          this.setCss(window.innerWidth,window.innerHeight,'0','0');
          this.httpUrl = aurl1 + url
          break
        case '开放平台前台':
          this.setCss(window.innerWidth,window.innerHeight+18,'0','-18');
          this.httpUrl = `http://sjkf.xiaogan.gov.cn/openPlatform/home`
          break
        case '开放平台':
          this.setCss(window.innerWidth,window.innerHeight,'0','0');
          getUserInfosso().then(res => {
            if (res.success) {
              var encryptedJson = res.result.replace(/\+/g, "%2B");
              var page = url.replace(/\//g, '%2F');
              this.httpUrl = `http://59.208.164.228:60033/sgSso?encryptedJson=${encryptedJson}&page=`+page
            }
          })
          break
        case '可视化建模':
          this.setCss(window.innerWidth,window.innerHeight,'18','0');
          if(url === 'home'){//系统管理
            this.httpUrl = `http://59.208.164.227:60010/admin/logging?userName=${this.onUserName()}&path=${url}`
          }else{
            this.httpUrl = `http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=${url}`
          }
          break
        case '数据开发':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            if(url === '离线开发'){
              this.httpUrl = `http://59.208.164.226:60001/batch/index.html#/dipper/task`
            }else if(url === '实时开发'){
              this.httpUrl = `http://59.208.164.226:60001/stream/index.html#/dipper/task`
            }else if(url === '算法开发'){
              this.httpUrl = `http://59.208.164.226:60001/ai/index.html#/shared-center`
            }else if(url === '发布中心'){
              this.httpUrl = `http://59.208.164.226:60001/publish/index.html#/create`
            }else if(url === '运维中心'){
              this.httpUrl = `http://59.208.164.226:60001/operation/index.html#/overview`
            }
          }, 1000);
          break
        case '数据服务':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            if(url === 'API开发'){
              this.httpUrl = `http://59.208.164.226:60001/data/index.html#/api`
            }else if(url === '函数开发'){
              this.httpUrl = `http://59.208.164.226:60001/data/index.html#/function`
            }
          }, 1000);
          break
        case '数据标签':
          this.setCss(window.innerWidth,window.innerHeight,'3','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            if(url === '首页'){
              this.httpUrl = `http://59.208.164.226:60001/tag/tag_home`
            }else if(url === '加工中心'){
              this.httpUrl = `http://59.208.164.226:60001/tag/object`
            }else if(url === '业务中心'){
              this.httpUrl = `http://59.208.164.226:60001/tag/business_scene`
            }else if(url === '资源管理'){
              this.httpUrl = `http://59.208.164.226:60001/tag/datasource`
            }else if(url === '运维中心'){
              this.httpUrl = `http://59.208.164.226:60001/tag/dataTag/system/userMange/index`
            }
          }, 1000);
          break
        case '大数据处理系统':
          let name = Base64.encode(this.userInfo().username + ':Emr@1298')
          var newWin = window.open(`http://59.208.164.227:60001/login.html?name=` + name, '_blank')
          setTimeout(() => {
            if(url === '首页'){
              newWin.location = `http://59.208.164.227:60001/#/main/dashboard/metrics`
            }else if(url === '告警管理'){
              newWin.location = `http://59.208.164.227:60001/#/main/alerts`
            }else if(url === '服务管理'){
              newWin.location = `http://59.208.164.227:60001/#/main/services/HDFS/summary`
            }else if(url === '主机管理'){
              newWin.location = `http://59.208.164.227:60001/#/main/hosts`
            }else if(url === '集群管理'){
              newWin.location = `http://59.208.164.227:60001/#/main/admin/stack/services`
            }
          }, 1000);
          break
        case '数据资产':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            if(url === '资产全景'){
              this.httpUrl = `http://59.208.164.226:60001/asset/index.html#/data-overview/overview`
            }else if(url === '数据地图'){
              this.httpUrl = `http://59.208.164.226:60001/asset/index.html#/data-map/overview`
            }else if(url === '数据标准'){
              this.httpUrl = `http://59.208.164.226:60001/asset/index.html#/data-standard/data-statistic`
            }else if(url === '数据模型'){
              this.httpUrl = `http://59.208.164.226:60001/asset/index.html#/data-model/overview`
            }else if(url === '数据质量'){
              this.httpUrl = `http://59.208.164.226:60001/asset/index.html#/data-quality/statistic`
            }
          }, 1000);
          break
        case '项目管理':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            this.httpUrl = `http://59.208.164.226:60001/project/index.html#/project`
          }, 1000);
          break
        case '审批中心':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            this.httpUrl = `http://59.208.164.226:60001/approval/index.html#/approval-waiting`
          }, 1000);
          break
        case '应用管理':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            this.httpUrl = `http://59.208.164.226:60001/data/index.html#/app`
          }, 1000);
          break
        case '系统管理':
          this.setCss(window.innerWidth,window.innerHeight,'14','0');
          this.httpUrl = `http://59.208.164.226:60001/login.html?userName=${this.onUserName()}&nickName=${this.onRealName()}`
          setTimeout(() => {
            this.httpUrl = `http://59.208.164.226:60001/uac/index.html#/login?redirect=http://59.208.164.226:60001/admin/index.html#/license`
          }, 1000);
          break
        case '数据可信计算系统':
          var newWin;
          getUserInfosso().then(res => {
            if (res.success) {
              newWin = window.open(`http://59.208.164.237:10081/jxmpc/login?openUserInfo=${res.result}`, '_blank')
            }
          })
          setTimeout(() => {
            if(url === '数据管理'){
              newWin.location = `http://59.208.164.237:18083/jxmpc-client/index`
            }else if(url === '计算协同'){
              // newWin.location = `http://59.208.164.237:10081/jxmpc/engineering/overview`
            }else if(url === '运维'){
              newWin.location = `http://59.208.164.237:10081/jxmpc/engineering/overview`
            }else if(url === '数据要素服务门户'){
              newWin.location = `http://59.208.164.237:10081/jxmpc-portal`
            }
          }, 1000);
          break
      }

    },
    handleResize() {//iframe跟随浏览器宽高发生变化
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    ...mapGetters(['nickname', 'avatar', 'userInfo'])
  },
  watch: {
    url: {
      immediate: true,
      handler() {
        this.iframeNavigation()
      }
    },
    item: {
      immediate: true,
      handler() {
        this.iframeNavigation()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.platformHeader {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
}

.myifr {
  // vertical-align:bottom;
  width: 100%;
  height: 100%;
  position: absolute;
  top: -1px;
  left: 0;
}

.modeldata {
  width: 100%;
  height: 97.5%;
  position: absolute;
  top: 32px;
  left: 0;
}

.modeling {
  width: 100%;
  height: 95%;
  position: absolute;
  top: 32px;
  left: 0;
}

.development {
  width: 100%;
  height: 98%;
  position: absolute;
  top: 14px;
  left: 0;
}

.processing {
  width: 100%;
  height: 99%;
  position: absolute;
  top: 9px;
  left: 0;
}

iframe{
  // width: 100%;
  // height: calc(664 - 0px);
  /*这是关键，让iframe变成块元素，就能不出现滚动条 */
  display: block; 
}

.frameCode {
  border:none;
  // transform: translateY(-30px); /* 向上移动20px */

  // overflow: hidden;
  // text-align: center;
  // width: 400px;
  // height: 140%;
  // margin-top: 33px;
  // margin-left: -10px;
  // transform: scale(1,0.99);//嵌入页面缩放比例(宽,高)
  // transform: translateY(33px); /* 向下移动20px */
}

/* 设置div的样式 */
.iframe-container {
  // margin-top: 64px; //使用margin-top会出现滚动条，无法消除；使用padding-top/transform不会
  // transform: translateY(32px); /* 向下移动64px */
  // width: 1422px;
  // height: 632px;
  // border: 1px solid #000;
}

</style>
