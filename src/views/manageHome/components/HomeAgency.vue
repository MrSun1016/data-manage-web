<template>
  <div id="agency">
    <!-- 库表归集情况 -->
    <div class="cusa-details">
      <h3 class="cusa-title">库表归集情况</h3>
      <div class="percentage"  @click="aggregationState('待更新')">
        <div>待归集</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.tableDayWaitNum > 100 ? 100 : excelCatalogData.tableDayWaitNum"
            :format="getFormat(excelCatalogData.tableDayWaitNum)"
            color="#56baed"
          ></el-progress>
        </div>
      </div>
      <div class="percentage"  @click="aggregationState('已更新')">
        <div>已归集</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.tableWeekWaitNum > 100 ? 100 : excelCatalogData.tableWeekWaitNum"
            :format="getFormat(excelCatalogData.tableWeekWaitNum)"
            color="#f7c757"
          ></el-progress>
        </div>
      </div>
      <div class="percentage"  @click="aggregationState('更新已超时')">
        <div>历史逾期</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.tableHistoryWaitNum > 100 ? 100 : excelCatalogData.tableHistoryWaitNum"
            :format="getFormat(excelCatalogData.tableHistoryWaitNum)"
            color="#f6c9c8"
          >
          </el-progress>
        </div>
      </div>
    </div>
    <!-- excel归集情况 -->
    <div class="cusa-details">
      <h3 class="cusa-title">Excel归集情况</h3>
      <div class="percentage"  @click="excelAggregationState('待更新')">
        <div>待归集</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.dayWaitNum > 100 ? 100 : excelCatalogData.dayWaitNum"
            :format="getFormat(excelCatalogData.dayWaitNum)"
            color="#56baed"
          ></el-progress>
        </div>
      </div>
      <div class="percentage"  @click="excelAggregationState('已更新')">
        <div>已归集</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.weekWaitNum > 100 ? 100 : excelCatalogData.weekWaitNum"
            :format="getFormat(excelCatalogData.weekWaitNum)"
            color="#f7c757"
          ></el-progress>
        </div>
      </div>
      <div class="percentage" @click="excelAggregationState('更新已超时')">
        <div>历史逾期</div>
        <div>
          <el-progress
            :percentage="excelCatalogData.historyWaitNum > 100 ? 100 : excelCatalogData.historyWaitNum"
            :format="getFormat(excelCatalogData.historyWaitNum)"
            color="#f6c9c8"
          >
          </el-progress>
        </div>
      </div>
    </div>
    <div class="pie-chart" ref="pieChart" style="width: 24%; height: 259px"></div>
    <div class="data-merger">
      <h3 class="title" style="padding: 12px 12px">数据归集</h3>
      <div class="merger-top-df">
        <div class="merger-top-box">
          <div class="merger-title" style="margin-bottom: 12px">已归集数据目录</div>
          <div class="merger-title">
            <span style="font-size: 20px">{{ cardCollectionData.uploadTotal || '0' }}</span
            ><span style="margin: 0 6px">/</span><span>{{ cardCollectionData.wholeTotal || '0' }}个</span>
          </div>
        </div>
        <div class="merger-btm-box">
          <div class="btm-title">归集数据量</div>
          <div class="btm-title" style="font-size: 20px">{{cardCollectionData.collection || '0' }}条</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataCollection, getDataCataloging, getCollectNum } from '@/api/api'
export default {
  name: 'agency',
  data() {
    return {
      excelCatalogData: {},
      cardCatalogData: {},
      newCatalogData: {},
      cardCollectionData: {},
      // 数据编目请求参数
      dataCatalogingBo: {
        catalogStatus: 0,
        catalogTotal: 0,
        dataFormat: '',
        deptId: '',
        interfaceTotal: 0,
        tableTotal: 0,
        type: '',
      },
      // 数据目录请求参数
      dataCollectionBo: {
        catalogId: '',
        collection: 0,
        deptId: '',
        id: '',
        totalNum: 0,
        uploadTotal: 0,
        wholeTotal: 0,
      },
      interfaceTotal:'',
      tableTotal:'',
    }
  },
  activated() {},
  created() {},
  methods: {
    excelAggregationState(type){
      this.$router.push({
        path: '/datacollection/Exceldatareporting',
        query: {
          type,
        },
      })
    },
    aggregationState(updateStatus){
      let dataFormat = "数据库"
      this.$router.push({
        path: '/datacollection/LibraryTableUpdate',
        query: {
          updateStatus,
          dataFormat,
        },
      })
    },
    tranNumber(num, point) {
      // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
      let numStr = num.toString().split(',')[0]
      if (numStr.length < 5) {
        // 判断数字有多长,如果小于5,,表示1万以内的数字,让其直接显示
        return numStr
      } else if (numStr.length >= 5 && numStr.length <= 8) {
        // 如果数字大于5位,小于8位,让其数字后面加单位万
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) {
        // 如果数字大于8位,让其数字后面加单位亿
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    },
    fetchCollectNum() {
      getCollectNum().then((res) => {
        if (res.success) {
          this.excelCatalogData = res.body
        }
      })
    },
    // 数据编目
    async fetchDataCataloging() {
      let res = await getDataCataloging(this.dataCatalogingBo)
      if (res.success) {
        this.cardCatalogData = res.body
        this.cardCatalogData.catalogTotal = this.tranNumber(this.cardCatalogData.catalogTotal,2)
        this.interfaceTotal = this.tranNumber(this.cardCatalogData.interfaceTotal,2)
        this.tableTotal = this.tranNumber(this.cardCatalogData.tableTotal,2)
        this.initCharts()
      }
    },
    // 数据归集
    fetchDataCollection() {
      getDataCollection(this.dataCollectionBo).then((res) => {
        if (res.success) {
          this.cardCollectionData = res.body
          this.cardCollectionData.uploadTotal = this.tranNumber(this.cardCollectionData.uploadTotal,2)
          this.cardCollectionData.wholeTotal = this.tranNumber(this.cardCollectionData.wholeTotal,2)
          this.cardCollectionData.collection = this.tranNumber(this.cardCollectionData.collection,2)
        }
      })
    },
    getFormat(value) {
      return () => {
        return value + '个'
      }
    },
    initCharts() {
      let myPieChart = this.$echarts.init(this.$refs.pieChart)
      // 绘制图表
      var op = {
        title: { text: '数据编目', left: '12px', top: '12px' },
        legend: {
          top: 'bottom',
          left: '20',
          orient: 'vertical',
          icon: 'circle',
        },
        series: [
          {
            type: 'pie',
            center: [140, 120],
            radius: ['50%', '60%'],
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#4c4a4a',
                formatter: '已发布数据目录' + '\n' + '\n' + `${this.cardCatalogData.catalogTotal}个`,
                rich: {
                  total: {
                    fontSize: 35,
                    fontFamily: '微软雅黑',
                    color: '#454c5c',
                  },
                  active: {
                    fontFamily: '微软雅黑',
                    fontSize: 16,
                    color: '#6c7a89',
                    lineHeight: 30,
                  },
                },
              },
              emphasis: {
                //中间文字显示
                show: true,
              },
            },
            color: ['#f3a840', '#b85738'],
            avoidLabelOverlap: false,
            data: [
              {
                value: this.cardCatalogData.tableTotal,
                name: '库表' + '                                      ' + `${this.tableTotal}个`,
              },
              {
                value: this.cardCatalogData.interfaceTotal,
                name: '接口' + '                                      ' + `${this.interfaceTotal}个`,
              },
            ],
          },
        ],
      }
      myPieChart.setOption(op)
    },
  },
  mounted() {
    this.fetchDataCollection()
    this.fetchDataCataloging()
    this.fetchCollectNum()
  },
}
</script>

<style lang="less" scoped>
#agency {
  display: flex;
  justify-content: space-between;
  padding: 18px 0;
  min-height: 259px;
  .cusa-details {
    width: 24%;
    height: 259px;
    background: #fff;
    .cusa-title {
      padding: 12px 12px;
      color: #3d3d3d;
      // font-size: 18px;
    }
  }
  .pie-chart {
    background: #fff;
  }
  .data-merger {
    width: 24%;
    height: 259px;
    background: #fff;
    .merger-top-df {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      .merger-btm-box {
        margin-top: 50px;
      }
    }
  }
  .percentage {
    padding: 12px 12px;
  }
}
/deep/.el-progress-bar__outer {
  width: 160px !important;
  height: 14px !important;
}
</style>
  <!-- 进度条样式 -->
<style>
.el-progress-bar__outer {
  border-radius: inherit;
}
.el-progress-bar__inner {
  border-radius: inherit;
}
.el-progress {
  display: flex;
  justify-content: space-between;
}
.el-progress-bar {
  width: 0;
}
</style>