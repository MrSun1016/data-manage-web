<template>
  <div ref="provinceBox" class="EchartsProvince">
    <div ref="EchartsProvince" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>
 
<script>
// import echarts from 'echarts'
import * as echarts from 'echarts';
import axios from 'axios'
import {jsonData} from '@/assets/geojson-map/geometryProvince'

import china from '@/assets/geojson-map/geometryProvince/11.json'
// import '@/assets/js/china.js' // 引入中国地图数据
export default {
  data () {
    return {
      myChartChina:''
    }
  },
  mounted () {
    let that =this
    this.$refs.provinceBox.oncontextmenu = function(){
      that.$emit('echartsProvince',false)
    　　return false;
    }

    // this.ChinaMap();
  },
  methods: {
    ChinaMap () {
      let that = this;
      //模拟数据
      let data = [
        // { name: '海门', value: 90, num: 5, id: 8 },
        // { name: '鄂尔多斯', value: 102, num: 15, id: 16 },
        // { name: '齐齐哈尔', value: 800, num: 30, id: 20 },
      ];
      let geoCoordMap = {
        // '海门': [121.15, 31.89],
        // '鄂尔多斯': [109.781327, 39.608266],
        // '齐齐哈尔': [123.97, 47.33]
      };
      let geoCoordMap1 = {
        // '海门': [111.15, 31.89],
        // '鄂尔多斯': [119.781327, 39.608266],
        // '齐齐哈尔': [183.97, 47.33]
      };
      let convertLineData = (data) => {

        let res = [];
        for (let i = 0; i < data.length; i++) {
          let dataItem = data[i];
          let coordS = [dataItem.value[0], dataItem.value[1]]; //线起点
          let coordM = [dataItem.value[0], dataItem.value[1] + 5]; //线中间点
          let coordE = [dataItem.value[0]+6, dataItem.value[1]+7]; //线尾点
          if (coordS && coordM && coordE) {
            res.push({
              coords: [coordS, coordM, coordE],
                ...dataItem,
              value: [...coordE,dataItem.value[3]],
            
            });
          }
        }
        return res;
      }
      let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              num: geoCoord.concat(data[i].num),
              id: geoCoord.concat(data[i].id)
            });
          }
        }
        return res;
      };
      let convertData1 = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap1[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value + 1),
              num: geoCoord.concat(data[i].num + 1),
              id: geoCoord.concat(data[i].id + 1)
            });
          }
        }
        return res;
      };
      echarts.registerMap('新疆维吾尔自治区1' , china)
      let EchartsProvince = echarts.init(this.$refs.EchartsProvince) //这里是为了获得容器所在位置    
      window.onresize = EchartsProvince.resize;
      EchartsProvince.setOption({ // 进行相关配置
        backgroundColor:'rgba(0, 28, 91, 0.7)',//地图背景色
        geo: { // 这个是重点配置区
          map: '新疆维吾尔自治区1', 
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: { //字体颜色
                color: '#c3cee0'
              }
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#c3cee0'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              show: false,
              borderWidth: 1, // 地图边框宽度
              borderColor: '#fff', // 地图边框颜色
              areaColor: '#c3cee0' // 地图颜色
            },
            emphasis: {//选中省份的颜色
              show: true,
              areaColor: '#fbdf59',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              borderWidth: 1,
              shadowColor: '#c3cee0'
            }
          }
        },
        //滑动显示数据
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name;
          }
        },
        legend: {
          data: ['原水', '自来水', '污水']
        },
        series: [
            {
            name: '原水',
            type: 'lines',
            zlevel: 2,
            tooltip: {
              show: false
            },
            // symbol: 'none',
            // silent: true, //不响应鼠标点击或事件
            symbol: 'triangle',
            symbolSize: 20,
            polyline: true, //支持多点连线
            lineStyle: {
              normal: {
                color: '#163E60',
                width: 1.5,
                opacity: 0.9,
                curveness: 0
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                fontSize: 25,
                fontWeight: 'bold',
                color: '#163E60',
              }
            },
            data: convertLineData(convertData(data))
          },
          {
            name: '原水',
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#163E60",//点的颜色
            data: convertLineData(convertData(data)),
            tooltip: {
              show: false
            },
            symbolSize: 0,//点的大小
            symbol: "pin",//点的样式
            cursor: "pointer",//鼠标放上去的效果
            label: {
              normal: {//默认展示
                show: true,
                formatter: function (params) {
                  return params.name;
                },
                position:'right',
                lineHeight: 20,
                backgroundColor:'#163E60',
                borderColor:'#163E60',
                borderWidth:'1',
                padding:[5,5,4],
                margin:[0,0,0,-10],
                color:'#fff',
                fontSize: 12,
                borderRadius:'4px',
                fontWeight:'normal',
                // extraCssText:'width:120px;height:40px;border:1px solid #000'
              },
              
            },
            itemStyle: {
              emphasis: {
                borderColor: '#5c8f6e',
                borderWidth: 5
              }
            }
          },
          {
            type: 'map',
            // map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
            },
          },
        ],
        
      })
      EchartsProvince.on('click', function (param) {
            console.log(param);//这里根据param填写你的跳转逻辑
        });
    },
  chinaMap (mapData={},highlightList,effectScatterList,mapName) {
      let that = this;
      window.onresize = this.myChartChina.resize;
      this.myChartChina.setOption({ // 进行相关配置
        // backgroundColor: '',//地图背景色
        backgroundColor:'rgba(0, 28, 91, 0.7)',//地图背景色
        geo: { // 这个是重点配置区
          map: mapName, // 表示中国地图
          zoom:1,
          label: {
            normal: {
              position:'top',
              distance:5,
              show: false, // 是否显示对应地名
              textStyle: { //字体颜色
                color: '#c3cee0'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#d98376'
              }
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              show: false,
              borderWidth: 1, // 地图边框宽度
              borderColor: '#fff', // 地图边框颜色
              areaColor: 'rgba(40, 155, 244, 0.4)' // 地图颜色
            },
            emphasis: {//选中省份的颜色
              show: true,
              areaColor: '#fbdf59',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              borderWidth: 1,
              shadowColor: '#c3cee0'
            }
          }
        },
        visualMap: {
            show:false,
            min: 2,
            max: 6,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: [ '#1CAF9D', '#B73816','#163E60','#ffffff']
            }
        },
        //滑动显示数据
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name;
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          padding: [5, 5, 5, 5],
          borderWidth: 2,
          shadowColor:'#fff',
          textStyle:{
            color:'#fff'
          },
          data: ['原水', '自来水', '污水']
        },
        series: [
          {
              name: '散点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              rippleEffect: {
                  brushType: 'fill'
              },
              itemStyle: {
                  normal: {
                      color: '#00FE30',
                      shadowBlur: 10,
                      shadowColor: '#00FE30'
                  }
              },
              data: effectScatterList,
              symbolSize: function(val) {
                  
                  return 8
              },
              showEffectOn: 'render', //加载完毕显示特效
          },
          {
            name: '原水',
            type: 'lines',
            zlevel: 2,
            tooltip: {
              show: false
            },
            symbol: 'triangle',
            symbolSize: 20,
            polyline: true, //支持多点连线
            lineStyle: {
              normal: {
                color: '#1CAF9D',
                width: 1,
                opacity: 0.9,
                curveness: 0
              }
            },
            label: {
              normal: {
                show: true,
                // position: 'right',
                fontSize: 25,
                fontWeight: 'bold',
                color: '#1CAF9D',
              }
            },
            // data: convertLineData(convertData(data))
            data: mapData.rawWater||[]
          },
          {
            name: '原水',
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#1CAF9D",//点的颜色
            // data: convertLineData(convertData(data)),
            data: mapData.rawWater||[],
            tooltip: {
              show: false
            },
            symbolSize: 0,//点的大小
            symbol: "pin",//点的样式
            cursor: "pointer",//鼠标放上去的效果
            label: {
              normal: {//默认展示
                show: true,
                formatter: function (params) {
                  return params.name;
                },
                // position: 'right',
                lineHeight: 20,
                backgroundColor: '#1CAF9D',
                borderColor: '#1CAF9D',
                borderWidth: '1',
                padding: [2, 2, 2],
                margin: [0, 0, 0, -10],
                color: '#fff',
                fontSize: 12,
                borderRadius: '4px',
                fontWeight: 'normal',
                // extraCssText:'width:120px;height:40px;border:1px solid #000'
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: '#5c8f6e',
                borderWidth: 5
              }
            }
          },
          {
            name: '污水',
            type: 'lines',
            zlevel: 2,
            tooltip: {
              show: false
            },
            symbol: 'triangle',
            symbolSize: 20,
            polyline: true, //支持多点连线
            lineStyle: {
              normal: {
                color: '#B73816',
                width: 1,
                opacity: 0.9,
                curveness: 0
              }
            },
            label: {
              normal: {
                show: true,
                // position: 'right',
                fontSize: 25,
                fontWeight: 'bold',
                color: '#B73816',
              }
            },
            // data: convertLineData(convertData(data))
            data: mapData.sewage||[]
          },
          {
            name: '污水',
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#B73816",//点的颜色
            // data: convertLineData(convertData(data)),
            data: mapData.sewage||[],
            tooltip: {
              show: false
            },
            symbolSize: 0,//点的大小
            symbol: "pin",//点的样式
            cursor: "pointer",//鼠标放上去的效果
            label: {
              normal: {//默认展示
                show: true,
                formatter: function (params) {
                  return params.name;
                },
                // position: 'right',
                lineHeight: 20,
                backgroundColor: '#B73816',
                borderColor: '#B73816',
                borderWidth: '1',
                padding: [2, 2, 2],
                margin: [0, 0, 0, -10],
                color: '#fff',
                fontSize: 12,
                borderRadius: '4px',
                fontWeight: 'normal',
                // extraCssText:'width:120px;height:40px;border:1px solid #000'
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: '#B73816',
                borderWidth: 5
              }
            }
          },
          {
            name: '自来水',
            type: 'lines',
            zlevel: 2,
            tooltip: {
              show: false
            },
            symbol: 'triangle',
            symbolSize: 20,
            polyline: true, //支持多点连线
            lineStyle: {
              normal: {
                color: '#163E60',
                width: 1,
                opacity: 0.9,
                curveness: 0
              }
            },
            label: {
              normal: {
                show: true,
                // position: 'right',
                fontSize: 25,
                fontWeight: 'bold',
                color: '#163E60',
              }
            },
            // data: convertLineData(convertData(data))
            data: mapData.tapWater||[]
          },
          {
            name: '自来水',
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#163E60",//点的颜色
            // data: convertLineData(convertData(data)),
            data: mapData.tapWater||[],
            tooltip: {
              show: false
            },
            symbolSize: 0,//点的大小
            symbol: "pin",//点的样式
            cursor: "pointer",//鼠标放上去的效果
            label: {
              normal: {//默认展示
                show: true,
                formatter: function (params) {
                  return params.name;
                },
                // position: 'right',
                lineHeight: 20,
                backgroundColor: '#163E60',
                borderColor: '#163E60',
                borderWidth: '1',
                padding: [2, 2, 2],
                margin: [0, 0, 0, -10],
                color: '#fff',
                fontSize: 12,
                borderRadius: '4px',
                fontWeight: 'normal',
                // extraCssText:'width:120px;height:40px;border:1px solid #000'
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: '#B73816',
                borderWidth: 5
              }
            }
          },
          
          // 地图
          {
            type: 'map',
            // mapType: mapKey,
            geoIndex: 0,
            // aspectScale: 0.75,
            
            
            tooltip: {
              show: false
            },
            // data:highlightList
          },
        ],
      },true)
      this.myChartChina.dispatchAction({
        type: 'highlight',
        // 使用 dataIndex 来定位节点。
        dataIndex: [59]
      });
    },
    initMap(data,mapData,highlightList,effectScatterList){
    echarts.registerMap(mapData.seclayer, jsonData[mapData.province])
    this.myChartChina = echarts.init(this.$refs.EchartsProvince) //这里是为了获得容器所在位置 
    this.chinaMap(data,highlightList,effectScatterList,mapData.seclayer)
    }
  }

}
</script>
<style lang="less" scoped>
.EchartsProvince{
  width: 100%;
  height: 100%;
  // padding: 5px;
  // box-shadow:0 0 5px rgba(0, 28, 91,1) inset;
  // background-color:rgba(255,255,255,0) ;
}


</style>
