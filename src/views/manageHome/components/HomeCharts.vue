<template>
  <div id="homeCharts">
    <div ref="barChart" class="bar-chart" style="width: 44%; height: 367px"></div>
    <div class="lin-chart" ref="linChart" style="width: 55%; height: 367px"></div>
  </div>
</template>

<script>
import { getDataService, getDataStatistics } from '@/api/api'
export default {
  name: 'homeCharts',
  data() {
    return {
      apiServiceNumListData: [],
      dataDirectoryNumListData: [],
      tableServiceNumListData: [],
      yearMonthListData: [],
      // 数据统计数据
      dataStatisticsData: {},
      apiTotalNumList: '',
      tableTotalNumList: '',
    }
  },
  methods: {
    fetchDataService() {
      getDataService().then((res) => {
        if (res.success) {
          this.yearMonthListData = res.body.yearMonthList
          this.apiServiceNumListData = res.body.apiServiceNumList
          this.dataDirectoryNumListData = res.body.dataDirectoryNumList
          this.tableServiceNumListData = res.body.tableServiceNumList
          this.initPicCharts()
        }
      })
    },
    fetchDataStatistics() {
      getDataStatistics().then((res) => {
        if (res.success) {
          this.dataStatisticsData = res.body
          this.initLinCharts()
        }
      })
    },
    initPicCharts() {
      let myBarPieChart = this.$echarts.init(this.$refs.barChart)
      myBarPieChart.setOption({
        title: {
          text: '数据服务',
          left: '12px',
          top: '8px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let relVal = params[0].name
            for (let i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker + params[i].seriesName + params[i].value + '个'
            }
            return relVal
          },
        },

        legend: {
          data: ['接口服务（个）', '库表服务（个）', '数据目录（个）'],
          top: '30',
          left: '160',
          textStyle: {
            //图例字体大小
            fontSize: 10,
          },
          //图例大小
          itemHeight: 10,
          itemWidth: 10,
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: 0,
            height: 5,
            xAxisIndex: [0],
            start: 0,
            end: 40,
            showDetail: false,
            textStyle: {
              color: '#ccd7d7',
            },
          },
        ],
        grid: {
          // left: '3%',
          // right: '4%',
          bottom: '3%',
          // width: '80%',
          containLabel: true,
        },
        color: ['#4097f3', '#63d6b7', '#4871a8'],
        xAxis: [
          {
            type: 'category',
            data: this.yearMonthListData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            // splitLine: {
            //   show: true,
            // },
            // show: false,
            axisLabel: {
              formatter: function (value, index) {
                // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
                let numStr = value.toString().split(',')[0]
                if (numStr.length < 5) {
                  // 判断数字有多长,如果小于5,,表示1万以内的数字,让其直接显示
                  return numStr
                } else if (numStr.length >= 5 && numStr.length <= 8) {
                  // 如果数字大于5位,小于8位,让其数字后面加单位万
                  let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                  // 由千位,百位组成的一个数字
                  return parseFloat(parseInt(value / 10000) + '.' + decimal) + '万'
                } else if (numStr.length > 8) {
                  // 如果数字大于8位,让其数字后面加单位亿
                  let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                  return parseFloat(parseInt(value / 100000000) + '.' + decimal) + '亿'
                }
              },
            },
          },
        ],
        series: [
          {
            name: '接口服务（个）',
            type: 'bar',
            // barWidth:10,
            // label: {
            //   show: true,
            //   position: 'top',
            // },
            data: this.apiServiceNumListData,
          },
          {
            name: '库表服务（个）',
            type: 'bar',
            // barWidth:10,
            // label: {
            //   show: true,
            //   position: 'top',
            // },
            data: this.tableServiceNumListData,
          },
          {
            name: '数据目录（个）',
            type: 'bar',
            // barWidth:10,
            // label: {
            //   show: true,
            //   position: 'top',
            // },
            data: this.dataDirectoryNumListData,
          },
        ],
      })
    },
    initLinCharts() {
      let myLinPieChart = this.$echarts.init(this.$refs.linChart)
      myLinPieChart.setOption({
        title: {
          text: '数据统计',
          left: '12px',
          top: '8px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter: function (c) {
            let one = {}
            let two = {}
            let oneStr = ''
            let towStr = ''
            c.forEach((item, index) => {
              switch (index) {
                case 0:
                  one.format = '次'
                  one.value = item.value
                  one.seriesName = item.seriesName
                  one.marker = item.marker
                  oneStr += one.marker + one.seriesName + ': ' + one.value + one.format + '<br />'
                  break
                case 1:
                  two.format = '条'
                  two.value = item.value
                  two.marker = item.marker
                  two.seriesName = item.seriesName
                  towStr += two.marker + two.seriesName + ': ' + two.value + two.format + '<br />'
                  break
                default:
                  break
              }
            })
            return oneStr + towStr
          },
        },
        legend: {
          data: ['接口调用量（次）', '共享数据量（条）'],
          top: '30',
          left: '200',
          textStyle: {
            //图例字体大小
            fontSize: 10,
          },
          //图例大小
          itemHeight: 10,
          itemWidth: 10,
        },
        color: ['#4097f3', '#63d6b7'],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            bottom: 0,
            height: 5,
            xAxisIndex: [0],
            start: 0,
            end: 40,
            borderRadius: 50, //滚动条圆角
            borderColor: '#red', //滚动条边框颜色
            fillerColor: '#red', // 滚动条颜色
            backgroundColor: '#red',
            showDetail: false,
            textStyle: {
              color: '#ccd7d7',
            },
          },
        ],
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        grid: {
          // left: '3%',
          // right: '4%',
          bottom: '3%',
          // width: '99%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.dataStatisticsData.yearMonthList,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: function (value, index) {
                // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
                let numStr = value.toString().split(',')[0]
                if (numStr.length < 5) {
                  // 判断数字有多长,如果小于5,,表示1万以内的数字,让其直接显示
                  return numStr
                } else if (numStr.length >= 5 && numStr.length <= 8) {
                  // 如果数字大于5位,小于8位,让其数字后面加单位万
                  let decimal = numStr.substring(numStr.length - 4, numStr.length - 4)
                  // 由千位,百位组成的一个数字
                  return parseFloat(parseInt(value / 10000) + '.' + decimal) + '万'
                } else if (numStr.length > 8) {
                  // 如果数字大于8位,让其数字后面加单位亿
                  let decimal = numStr.substring(numStr.length - 8, numStr.length - 8)
                  return parseFloat(parseInt(value / 100000000) + '.' + decimal) + '亿'
                }
              },
            },
          },
        ],
        series: [
          {
            name: '接口调用量（次）',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: this.dataStatisticsData.apiTotalNumList,
          },
          {
            name: '共享数据量（条）',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: this.dataStatisticsData.tableTotalNumList,
          },
        ],
      })
    },
  },
  mounted() {
    this.fetchDataService()
    this.fetchDataStatistics()
  },
}
</script>

<style lang="less" scoped>
#homeCharts {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 367px;
  .bar-chart {
    background: #fff;
    // overflow: hidden;
    // overflow-x:scroll;
  }
  .lin-chart {
    background: #fff;
    // overflow: hidden;
  }
}
</style>