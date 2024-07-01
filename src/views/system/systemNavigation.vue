<template>
  <div id="systemNavigation" class="systemNavigation">
    <!-- 当showDiv为true时显示div，为false时隐藏 -->
    <div v-if="!showDiv">
      <!-- v-has="'systemNavigation:navigation'" -->
      <!-- <OpenPlatformHeader class="platformHeader" /> -->
      <div id="divToHide" class="navigationBottom" v-show="!showIframe">
        <div class="righterji">
          <div class="righterjiList" v-has="'exchangePlatform:platform'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext2" v-has="'exchangePlatform:platform'">交换平台</div>
            </div>
            <div class="textconten">
              <div class="righterjiItem1">
                <div class="righterjititle" v-has="'exchangePlatform:reception'">
                  前台<i class="el-icon-arrow-right"></i>
                </div>
                <div class="righterjicontent">
                  <div
                    class="rightcontent"
                    @click="toNewpage('/openPlatform/home', '交换平台前台')"
                    v-has="'exchangePlatform:homepage'"
                  >
                    首页
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/catalogue/datacatalogue', '交换平台前台')"
                    v-has="'exchangePlatform:dataCatalog'"
                  >
                    数据目录
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/service/serviceitem', '交换平台前台')"
                    v-has="'exchangePlatform:mainItems'"
                  >
                    事项主线目录
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/system/policyrule', '交换平台前台')"
                    v-has="'exchangePlatform:regulations'"
                  >
                    政策法规
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/system/datastandard', '交换平台前台')"
                    v-has="'exchangePlatform:specifications'"
                  >
                    数据规范
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/system/helpdocument', '交换平台前台')"
                    v-has="'exchangePlatform:documents'"
                  >
                    帮助文档
                  </div>
                </div>
              </div>
              <div class="righterjiItem1">
                <div class="righterjititle" v-has="'exchangePlatform:background'">
                  后台<i class="el-icon-arrow-right"></i>
                </div>
                <div class="righterjicontent">
                  <div
                    class="rightcontent"
                    @click="toNewpage('/Home?isshow=false', '交换平台')"
                    v-has="'exchangePlatform:backgroundHomepage'"
                  >
                    首页
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/datefrom/cataloglist', '交换平台')"
                    v-has="'exchangePlatform:dataCataloging'"
                  >
                    数据编目
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/datacollection/Exceldatareporting', '交换平台')"
                    v-has="'exchangePlatform:dataCollection'"
                  >
                    数据归集
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/datasharing/releaseing', '交换平台')"
                    v-has="'exchangePlatform:dataSharing'"
                  >
                    数据共享
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/MessageCenter/MessageNotification', '交换平台')"
                    v-has="'exchangePlatform:messageCenter'"
                  >
                    消息中心
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/resourceManage/DataOigin', '交换平台')"
                    v-has="'exchangePlatform:systemManagement'"
                  >
                    系统管理
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="righterjiList" v-has="'openPlatform:platform'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext1" v-has="'openPlatform:platform'">开放平台</div>
            </div>
            <div class="textconten">
              <div class="righterjiItem1">
                <div class="righterjititle" v-has="'openPlatform:openReception'">
                  前台<i class="el-icon-arrow-right"></i>
                </div>
                <div class="righterjicontent">
                  <div class="rightcontent" @click="toNewpage('', '开放平台前台')" v-has="'openPlatform:openData'">
                    开放数据
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:applicationAchievements'"
                  >
                    应用成果
                  </div>
                  <div class="rightcontent" @click="toNewpage('', '开放平台前台')" v-has="'openPlatform:helpCenter'">
                    帮助中心
                  </div>
                  <div class="rightcontent" @click="toNewpage('', '开放平台前台')" v-has="'openPlatform:NEWSCenter'">
                    资讯中心
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:rightsProtection'"
                  >
                    权益保护
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:dataErrorCorrection'"
                  >
                    数据纠错
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:dataRequirements'"
                  >
                    数据需求
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:problemFeedback'"
                  >
                    问题反馈
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:dataStatistics'"
                  >
                    数据统计
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('', '开放平台前台')"
                    v-has="'openPlatform:personalCenter'"
                  >
                    个人中心
                  </div>
                  <div class="rightcontent" @click="toNewpage('', '开放平台前台')" v-has="'openPlatform:messageCenter'">
                    消息中心
                  </div>
                </div>
              </div>
              <div class="righterjiItem1">
                <div class="righterjititle" v-has="'openPlatform:openBackground'">
                  后台<i class="el-icon-arrow-right"></i>
                </div>
                <div class="righterjicontent">
                  <div
                    class="rightcontent"
                    @click="toNewpage('/Home', '开放平台')"
                    v-has="'openPlatform:backgroundHomePage'"
                  >
                    首页
                  </div>
                  <div class="rightcontent" @click="toNewpage('/datefrom/cataloglist', '开放平台')" v-has="'openPlatform:houopenData'">
                    开放数据
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/interaction/RightsProtection', '开放平台')"
                    v-has="'openPlatform:houapplicationAchievements'"
                  >
                    互动交流管理
                  </div>
                  <div class="rightcontent" @click="toNewpage('/interaction/registered', '开放平台')" v-has="'openPlatform:houhelpCenter'">
                    注册用户管理
                  </div>
                  <div class="rightcontent" @click="toNewpage('/statistic/StatisticAnalysis', '开放平台')" v-has="'openPlatform:houNEWSCenter'">
                    统计分析
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/InformationCenter/NewsUpdates', '开放平台')"
                    v-has="'openPlatform:hourightsProtection'"
                  >
                    资讯管理
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/MessageCenter/WorkOrderProcessing', '开放平台')"
                    v-has="'openPlatform:houdataErrorCorrection'"
                  >
                    工单处理
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/MessageCenter/MessageNotification', '开放平台')"
                    v-has="'openPlatform:houdataRequirements'"
                  >
                    消息通知
                  </div>
                  <div
                    class="rightcontent"
                    @click="toNewpage('/resourceManage/DataOigin', '开放平台')"
                    v-has="'openPlatform:housystemManagement'"
                  >
                    系统管理
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="righterjiList" v-has="'Model:VISUALMODELING'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext4" v-has="'Model:VISUALMODELING'">可视化建模</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div
                  class="rightcontent"
                  @click="toNewpage('modelMarket', '可视化建模')"
                  v-has="'Model:ModelSupermarket'"
                >
                  模型超市
                </div>
                <div class="rightcontent" @click="toNewpage('modelFactory', '可视化建模')" v-has="'Model:ModelFactory'">
                  模型工厂
                </div>
                <div class="rightcontent" @click="toNewpage('etl/dataCenter', '可视化建模')" v-has="'Model:modelData'">
                  模型数据
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('dataServe/joogleAll', '可视化建模')"
                  v-has="'Model:ModelServices'"
                >
                  模型服务
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('Supermarket', '可视化建模')"
                  v-has="'Model:AlgorithmSupermarket'"
                >
                  算法超市
                </div>
                <div class="rightcontent" @click="toNewpage('home', '可视化建模')" v-has="'Model:systemManagement'">
                  系统管理
                </div>
              </div>
            </div>
          </div>
          <div class="righterjiList" v-has="'dataDevelopment:development'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext7" v-has="'dataDevelopment:development'">数据开发</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div
                  class="rightcontent"
                  @click="toNewpage('离线开发', '数据开发')"
                  v-has="'dataDevelopment:OfflineDevelopment'"
                >
                  离线开发
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('实时开发', '数据开发')"
                  v-has="'dataDevelopment:RealTimeDevelopment'"
                >
                  实时开发
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('算法开发', '数据开发')"
                  v-has="'dataDevelopment:algorithmDevelopment'"
                >
                  算法开发
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('发布中心', '数据开发')"
                  v-has="'dataDevelopment:PublishingCenter'"
                >
                  发布中心
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('运维中心', '数据开发')"
                  v-has="'dataDevelopment:OperationMaintenanceCenter'"
                >
                  运维中心
                </div>
              </div>
            </div>
          </div>

          <div class="righterjiList" v-has="'dataService:service'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext7" v-has="'dataService:service'">数据服务</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div
                  class="rightcontent"
                  @click="toNewpage('API开发', '数据服务')"
                  v-has="'dataService:APIdevelopment'"
                >
                  API开发
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('函数开发', '数据服务')"
                  v-has="'dataService:functionDevelopment'"
                >
                  函数开发
                </div>
              </div>
            </div>
          </div>
          <div class="righterjiList" v-has="'dataLabel:label'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext6" v-has="'dataLabel:label'">数据标签</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div class="rightcontent" @click="toNewpage('首页', '数据标签')" v-has="'dataLabel:homepage'">首页</div>
                <div
                  class="rightcontent"
                  @click="toNewpage('加工中心', '数据标签')"
                  v-has="'dataLabel:machiningCenter'"
                >
                  加工中心
                </div>
                <div class="rightcontent" @click="toNewpage('业务中心', '数据标签')" v-has="'dataLabel:businessCenter'">
                  业务中心
                </div>
                <div class="rightcontent" @click="toNewpage('资源管理', '数据标签')" v-has="'dataLabel:serviceCenter'">
                  资源管理
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('运维中心', '数据标签')"
                  v-has="'dataLabel:resourceManagement'"
                >
                  运维中心
                </div>
              </div>
            </div>
          </div>
          <div class="righterjiList" v-has="'bigDataProcessing:system'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext3" v-has="'bigDataProcessing:system'">
                大数据处理系统
              </div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div
                  class="rightcontent"
                  @click="toNewpage('首页', '大数据处理系统')"
                  v-has="'bigDataProcessing:homepage'"
                >
                  首页
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('告警管理', '大数据处理系统')"
                  v-has="'bigDataProcessing:alarmManagement'"
                >
                  告警管理
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('服务管理', '大数据处理系统')"
                  v-has="'bigDataProcessing:ServiceManagement'"
                >
                  服务管理
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('主机管理', '大数据处理系统')"
                  v-has="'bigDataProcessing:HostManagement'"
                >
                  主机管理
                </div>
                <div
                  class="rightcontent"
                  @click="toNewpage('集群管理', '大数据处理系统')"
                  v-has="'bigDataProcessing:ClusterManagement'"
                >
                  集群管理
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="righterjiList">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext5">数据安全</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div class="rightcontent" @click="toNewpage('数据安全', '数据安全')">数据安全</div>
                <div class="rightcontent" @click="toNewpage('数据安全管理', '数据安全')">数据安全管理</div>
                <div class="rightcontent" @click="toNewpage('数据库水印', '数据安全')">数据库水印</div>
                <div class="rightcontent" @click="toNewpage('数据库防水坝', '数据安全')">数据库防水坝</div>
                <div class="rightcontent" @click="toNewpage('数据静态脱敏', '数据安全')">数据静态脱敏</div>
                <div class="rightcontent" @click="toNewpage('音数据发现和分类', '数据安全')">音数据发现和分类</div>
                <div class="rightcontent" @click="toNewpage('数据库安全审计', '数据安全')">数据库安全审计</div>
              </div>
            </div>
          </div> -->

          <div class="righterjiList" v-has="'dataAssets:assets'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext9" v-has="'dataAssets:assets'">数据资产</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div class="rightcontent" @click="toNewpage('资产全景', '数据资产')" v-has="'dataAssets:AssetPanorama'">
                  资产全景
                </div>
                <div class="rightcontent" @click="toNewpage('数据地图', '数据资产')" v-has="'dataAssets:datamap'">
                  数据地图
                </div>
                <div class="rightcontent" @click="toNewpage('数据标准', '数据资产')" v-has="'dataAssets:dataStandards'">
                  数据标准
                </div>
                <div class="rightcontent" @click="toNewpage('数据模型', '数据资产')" v-has="'dataAssets:dataModel'">
                  数据模型
                </div>
                <div class="rightcontent" @click="toNewpage('数据质量', '数据资产')" v-has="'dataAssets:quality'">
                  数据质量
                </div>
              </div>
            </div>
          </div>

          <div class="righterjiList" v-has="'dataAssets:assets'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext9" v-has="'dataAssets:assets'">数据可信计算系统</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div class="rightcontent" @click="toNewpage('计算协同', '数据可信计算系统')" v-has="'dataAssets:AssetPanorama'">
                  计算协同
                </div>
              </div>
            </div>
          </div>

          <div class="righterjiList" v-has="'dataAssets:assets'">
            <div class="leftyijiItem">
              <div class="leftyijiItemtext9" v-has="'dataAssets:assets'">数据安全平台</div>
            </div>
            <div class="textconten">
              <div class="righterjicontent">
                <div class="rightcontent" @click="toNewpage('数据安全综合管理平台', '数据安全平台')" v-has="'dataAssets:AssetPanorama'">
                  数据安全综合管理平台
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 当showDiv为false时显示iframe，为true时隐藏 -->
    <iframe
      id="iframeToShow"
      style="border:none"
      :width="searchTableWidth"
      :height="searchTableHeight"
      v-bind:src="reportUrl"
      v-if="showDiv"
    ></iframe>
  </div>
</template>

<script>
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
import { getUserInfosso, getUserInfosso2 } from '@/api/api'
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  name: 'systemNavigation',
  props: {
    reportUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      httpUrl: '',
      showIframe: false,
      searchTableHeight: 0,
      searchTableWidth: 0,
      showDiv: false // 控制div和iframe的显示
    }
  },
  created() {},
  mounted() {
    window.onresize = () => {
      this.widthHeight() // 自适应高宽度
    }
    this.$nextTick(function() {
      this.widthHeight()
    })
  },
  components: {
    OpenPlatformHeader
  },
  methods: {
    widthHeight() {
      this.searchTableHeight = window.innerHeight - 70
      this.searchTableWidth = window.innerWidth
    },
    toNewpage(url, item, param) {
      if (item === '大数据处理系统') {
        let name = Base64.encode(this.userInfo().username + ':Emr@1298')
        var newWin = window.open(`http://59.208.164.227:60001/login.html?name=` + name, '_blank')
        setTimeout(() => {
          if (url === '首页') {
            newWin.location = `http://59.208.164.227:60001/#/main/dashboard/metrics`
          } else if (url === '告警管理') {
            newWin.location = `http://59.208.164.227:60001/#/main/alerts`
          } else if (url === '服务管理') {
            newWin.location = `http://59.208.164.227:60001/#/main/services/HDFS/summary`
          } else if (url === '主机管理') {
            newWin.location = `http://59.208.164.227:60001/#/main/hosts`
          } else if (url === '集群管理') {
            newWin.location = `http://59.208.164.227:60001/#/main/admin/stack/services`
          }
        }, 1000)
        setTimeout(() => {
          this.$emit('assignment')
        }, 1500)
      } else if (item === '数据可信计算系统') {
        var newWin
        getUserInfosso().then(res => {
          if (res.success) {
            newWin = window.open(`http://59.208.164.237:10081/jxmpc/login?openUserInfo=${res.result}`, '_blank')
          }
        })
        setTimeout(() => {
          if (url === '数据管理') {
            newWin.location = `http://59.208.164.237:18083/jxmpc-client/index`
          } else if (url === '计算协同') {
            // newWin.location = `http://59.208.164.237:10081/jxmpc/engineering/overview`
          } else if (url === '运维') {
            newWin.location = `http://59.208.164.237:10081/jxmpc/engineering/overview`
          } else if (url === '数据要素服务门户') {
            newWin.location = `http://59.208.164.237:10081/jxmpc-portal`
          }
        }, 1000)
        setTimeout(() => {
          this.$emit('assignment')
        }, 1500)
      } else if (item === '数据安全平台') {
        var newWin
        getUserInfosso2().then(res => {
          if (res.success) {
            newWin = window.open(`https://59.208.164.228:60035/authorize-login?userInfo=${res.result}`, '_blank')
          }
        })
      } else {
        this.toggleDisplay()
        localStorage.removeItem('insuranceCode')
        var path
        if (param === 2) {
          path = '/system/NewNavigation2'
        } else {
          path = '/system/NewNavigation'
        }
        this.$router.push({
          path: path
        })
        var pickerItem = {
          url: url,
          item: item
        }
        localStorage.setItem('insuranceCode', JSON.stringify(pickerItem))
        this.$emit('ShowNavigation')
        this.$emit('assignment')
      }
    },
    // 切换显示状态的方法
    toggleDisplay() {
      this.showDiv = !this.showDiv
    },
    toggleDisplay2() {
      this.showDiv = false
    },
    ...mapGetters(['nickname', 'avatar', 'userInfo'])
  }
}
</script>
<style lang="less" scoped>
.systemNavigation {
  height: calc(100vh - 64px);
  // overflow-x: hidden;
  // overflow-y: hidden;
}
.platformHeader {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
}
.navigationBottom {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  // text-align: center;
  .righterji {
    width: 65%;
    height: 100%;
    .righterjiList {
      width: 100%;
      // height: 100%;
      margin: 10px 0 5px 0;
      border-bottom: 1px solid rgb(219, 219, 219);
      // display: flex;
      //   background-color: aquamarine;
      display: flex;
      align-items: center;
      .leftyijiItem {
        width: 130px;
        height: 35px;
        font-size: 16px;
        font-weight: bold;
        color: #1890ff;
        margin-right: 20px;
      }
      .textconten {
        width: 80%;
        // .righterjiItem1 {
        // width: 180px;
        // border-left: 1px solid rgb(219, 219, 219);
        margin-bottom: 10px;
        padding-left: 25px;
        // height: 35px;
        .righterjititle {
          // font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          // margin-bottom: 3px;
          .el-icon-arrow-right {
            font-weight: bold;
          }
        }
        .righterjicontent {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .rightcontent {
            height: 30px;
            margin-right: 20px;
            cursor: pointer;
          }
          .rightcontent:hover {
            color: #1890ff;
          }
        }
        // }
      }
    }
  }
}
.colorItem {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}

.myifr {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 0;
}
.modeldata {
  width: 100%;
  height: 97.5%;
  position: absolute;
  top: 20px;
  left: 0;
}
.modeling {
  width: 100%;
  height: 110%;
  position: absolute;
  top: -65px;
  left: 0;
}
</style>

