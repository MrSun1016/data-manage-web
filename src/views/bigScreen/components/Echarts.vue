<template>
  <div class="myChartChina1"  :style="{ width: '100%',  }">
    <div ref="myChartChina"  :style="{ width: '100%', height: '100%' }"></div>
    <div v-if="echartsProvince" style="width: 60%; height: 60%; position: absolute; top: 0; left: 0; z-index: 999">
      <echarts-province @echartsProvince="e=>echartsProvince=e" ref="echartsProvince" :style="{ width: '100%', height: '100%' }"></echarts-province>
    </div>
  </div>
</template>
 
<script>
import * as echarts from 'echarts';
import china from '@/assets/geojson-map/china.json'
import echartsProvince from './EchartsProvince'
import { postAction, getAction, deleteAction, downFile } from '@/api/manage'
import { filter } from 'vuedraggable';
export default {
  components: { echartsProvince },
  data () {
    return {
      myChartChina: '',
      echartsProvince: false,
      registerType:false,
      highlightList: [],
      itemList: [],
      result: [],
      mapType: 'dealday',
      selected:{'原水': true, '自来水': true, '污水': true},
      url: {
        getMapData: '/map/getMapData',
      }
    }
  },
  created(){
    this.getMapData()
  },
  
  mounted () {
    let that =this
    window.onresize = (e)=>{
        // console.log(e)
      setTimeout(()=>{
        //  this.chinaMap()
        // this.myChartChina.resize(e)
         this.chinaMap()
       },200)
        
    }
   
    this.$refs.myChartChina.oncontextmenu = function(){
      that.echartsProvince=false
    　　return false;
    }
    echarts.registerMap('china', china)
    this.myChartChina = echarts.init(this.$refs.myChartChina) //这里是为了获得容器所在位置   
    this.myChartChina.on('click', (param) => {
    
      this.registerType=false
      if (param.data) {
      
          // this.provinceMap(param.data)
      }
      // console.log(param);//这里根据param填写你的跳转逻辑
    });
    this.myChartChina.on('legendselectchanged',(param)=>{
      console.log(param)
     
      this.selected=param.selected
      // this.highlightList =[]
      // this.chinaMap()
    })
    this.myChartChina.getZr().on('click',  (event)=> {
    // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
      if (!event.target) {
        this.echartsProvince=false
      }
    });
    // this.getMapData()
    this.chinaMap()
  },
  methods: {
    chinaMap (mapData = {}) {
      this.selected={'原水': true, '自来水': true, '污水': true}
      let that = this;
      this.myChartChina.resize()
      // window.onresize = this.myChartChina.resize;
      this.myChartChina.setOption({ // 进行相关配置
        backgroundColor: '',//地图背景色
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          // zoom: 1,
          roam: false,
          scaleLimit: { //滚轮缩放的极限控制
            min: 1,
            max: 1
          },
          // zoomOnMouseWheel:false,
          label: {
            normal: {
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
              show: true,
              borderWidth: 1, // 地图边框宽度
              borderColor: '#fff', // 地图边框颜色
              areaColor: '#94A3B5' // 地图颜色
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
          show: false,
          min: 1,
          max: 6,
          text: ['High', 'Low'],
          realtime: false,
          calculable: false,
          inRange: {
            color: ['#078AF4FF', '#078AF4FF',]
          }
        },
        
        //滑动显示数据
        tooltip: {
          trigger: 'item',
          backgroundColor:'rgba(255,255,255,0)',
          borderWidth:0,
          margin:0,
          padding:0,
          formatter:  (params,b,c)=> {
            let list=''
            this.highlightList.map(item=>{
              let business1=this.selected['自来水']&&item.business.includes('自来水')
              let business2=this.selected['污水']&&item.business.includes('污水')
              let business3=this.selected['原水']&&item.business.includes('原水')
              if(params.name==item.name&&(business1 || business2 || business3)){
                
                list+=(`<div style='font-size: 16px;line-height: 24px;width:140px;padding:0 10px  ;display:flex;'>
                <div style='display:flex;width:36px;'>
                  ${this.selected['自来水']&&item.business.includes('自来水')?'<div style="margin:7px 3px 7px 0px;width: 10px;height: 10px;background: #078AF4;border-radius: 2px;"></div>':''}
                  ${this.selected['污水']&&item.business.includes('污水')?'<div style="margin:7px 3px 7px 0px;width: 10px;height: 10px;background: #F85454FF;border-radius: 2px;"></div>':''}
                  ${this.selected['原水']&&item.business.includes('原水')?'<div style="margin:7px 3px 7px 0px;width: 10px;height: 10px;background: #1CBE6DFF;border-radius: 2px;"></div>':''}
                </div>
                <div class="charts_tip_title" >${item.company}</div>
                </div>`)
              }
            });
          return list.length>0? `<div style='background: rgba(13, 13, 30, 0.8);padding:10px;color:#FFFFFFFF;border-radius: 8px;display:flex;max-width:340px;flex-wrap:wrap'}'>${list}</div>`:''
          
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          icon: "roundRect",
         
          padding: [5, 5, 5, 5],
          borderWidth: 2,
          textStyle:{
            width:'10px',
            height:'10px',
            color:'#607083'
          },
          data: ['自来水', '污水','原水', ]
        },
        series: [
          {
            name: '原水',
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#1CBE6DFF",//点的颜色
            // data: convertLineData(convertData(data)),
            data: [],
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
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#F85454FF",//点的颜色
            // data: convertLineData(convertData(data)),
            data: [],
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
            type: 'scatter',
            coordinateSystem: 'geo',
            hoverAnimation: false,
            zlevel: 3,
            color: "#2B8AFDFF",//点的颜色
            // data: convertLineData(convertData(data)),
            data: [],
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
            mapType: 'china',
            roam:false,
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 1
            },
            geoIndex: 0,
            data:this.highlightList
          },
        ],
      },true)
      // this.myChartChina.dispatchAction({
      //   type: 'highlight',
      //   // 使用 dataIndex 来定位节点。
      //   dataIndex: [59]
      // });
    },
    getMapData (type = 'dealday') {
      
      this.mapType = type,
      this.itemList = []
      this.highlightList = []
      let tab1 = {
        rawWater: [],
        sewage: [],
        tapWater: [],
        areaList: [],
      }
      this.echartsProvince=false
      getAction(`${this.url.getMapData}`).then((res) => {
        if (res.success) {
          const { result = [] } = res
          this.result = JSON.parse(JSON.stringify(result)) 
          // this.highlightList=JSON.parse(JSON.stringify(result))
          let nameList = []
          // let map
          result.forEach((item) => {
            this.highlightList.push(
              {
                ...item,
                name:item.seclayer,
                value:6,
              }
            )
            
            // if(nameList.includes(item.seclayer)){

            // }else{
            //   nameList.push(item.seclayer)
            // }
          })
          this.chinaMap()
        } else {
          // this.chinaMap({})
        }
      })
      // this.chinaMap({})
    },
    provinceMap (data) {
      let highlightList=[];
      let effectScatterList=[];
      let tab1 = {
        rawWater: [],
        sewage: [],
        tapWater: [],
        areaList: [],
      }
      const result = JSON.parse(JSON.stringify( this.result))
  
      result.forEach((item) => {
        if (item.area != data.area) return
        if(!item.area&&(item.seclayer!=data.seclayer))return
        if (item[this.mapType] == 1) {
          item.start = item.start.split(',')
          item.end = item.end.split(',')
          if (item.business.includes('原水')) {
            tab1.rawWater.push(
              {
                ...item,
                name: item.company,
                // value:[Number(item.lon)+Number(item.offset), Number(item.lat)+Number(item.offset)],
                // coords: [[Number(item.lon), Number(item.lat)], [Number(item.lon)+Number(item.offset), Number(item.lat) + Number(item.offset)]]
                // value: [item.start[0],Number(item.start[1])+2],
                // coords: [item.start, [item.start[0],Number(item.start[1])+2]]
                value: [item.lon ,Number(item.lat)+1],
                coords: [[item.lon ,Number(item.lat)], [item.lon ,Number(item.lat)+1]]
              }
            )
            highlightList.push({ ...item, name: item.firstlayer, value: 2 })
            effectScatterList.push({ ...item, name: item.firstlayer, value: [item.lon ,Number(item.lat)] })

          } else if (item.business.includes('污水')) {
            tab1.sewage.push(
              {
                ...item,
                name: item.company,
                // value:[Number(item.lon)+Number(item.offset), Number(item.lat)+Number(item.offset)],
                // coords: [[Number(item.lon), Number(item.lat)], [Number(item.lon)+Number(item.offset), Number(item.lat) + Number(item.offset)]]
                // value: [item.start[0],Number(item.start[1])+2],
                // coords: [item.start, item.end]
                // coords: [item.start, [item.start[0],Number(item.start[1])+2]]
                value: [item.lon ,Number(item.lat)+1],
                coords: [[item.lon ,Number(item.lat)], [item.lon ,Number(item.lat)+1]]
              }
            )
            highlightList.push({ ...item, name: item.firstlayer, value: 3 })
            effectScatterList.push({ ...item, name: item.firstlayer, value: [item.lon ,Number(item.lat)] })

          } else if (item.business.includes('自来水')) {
            tab1.tapWater.push(
              {
                ...item,
                name: item.company,
                // value:[Number(item.lon), Number(item.lat)+Number(item.offset)],
                // coords: [[Number(item.lon), Number(item.lat)], [Number(item.lon), Number(item.lat) + Number(item.offset)]]
                value: [item.lon ,Number(item.lat)+1],
                coords: [[item.lon ,Number(item.lat)], [item.lon ,Number(item.lat)+1]]
              }
            )
            highlightList.push({ ...item, name: item.firstlayer, value: 4 })
            effectScatterList.push({ ...item, name: item.firstlayer, value: [item.lon ,Number(item.lat)] })
          }
        }
      })
      this.echartsProvince=true
      this.$nextTick(() => {
        this.$refs.echartsProvince.initMap(tab1, data,highlightList,effectScatterList)
      })



    }


  },
  destroyed(){
    window.onresize = null;
  }

}
</script>
<style lang="less" scoped>

  .myChartChina1 {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 15px;
    height: calc(100vh - 230px);
    // box-shadow: 0 0 15px #289bf4 inset;
    background: rgba(28, 59, 135, 0.3);
  }
</style>
