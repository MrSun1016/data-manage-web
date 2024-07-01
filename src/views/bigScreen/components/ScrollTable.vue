<template>
  <div ref="scroolTableBox" class="scroolTableBox1" :style="{height:tableHeight}">
    <table class="top" cellspacing="0" border="0" >
      <thead>
        <tr :style="tableStyle">
          <th v-for="(item,h) in tableObject.columns" :key="h" :width="item.width">{{ item.title }}</th>
        </tr>
      </thead>
    </table>
    <!-- item[child.key]?item[child.key]:'-'  -->
    <vue-seamless-scroll ref="seamlessWarp" :data="tableObject.dataSource" :style="`height:${seamlessWarpHeight}`" class="seamlessWarp" :class-option="defaultOption">
      <table cellspacing="0" border="0">
        <tbody class="item">
          <template v-for="(item,p) in tableObject.dataSource">
            <tr :key="p" v-if="item.org_id!='1001'">
              <td :class="item[child.key]?'':'gary'" v-for="(child,c) in tableObject.columns" :key="c" :width="child.width">
                
                  <!-- <a-tooltip placement="topLeft" :title="child.customRender?child.customRender(item[child.key]):item[child.key]?item[child.key]:'-'" arrow-point-at-center> -->
                    {{child.customRender?child.customRender(item[child.key]):item[child.key]?item[child.key]:'-'}}
                  <!-- </a-tooltip> -->
                </td>
            </tr>
          </template>
        </tbody>
      </table>
    </vue-seamless-scroll>
    <template v-for="(ite,c) in tableObject.dataSource">
      <div :key="c" v-if="ite.org_id=='1001'" style="padding-top: 5px;border-top: 1px solid #D3DCE6FF;">
        <table cellspacing="0" border="0">
          <tbody class="item">
            <template v-for="(item,p) in tableObject.dataSource">
              <tr :key="p" v-if="item.org_id=='1001'">
                <td :class="item[child.key]?'':'gary'" v-for="(child,c) in tableObject.columns" :key="c" :width="child.width">
                  <template v-if="child.key=='org_name'">
                    合计
                  </template>
                  <template v-else style="margin-top: 5px;">
                    <a-tooltip placement="topLeft" :title="child.customRender?child.customRender(item[child.key]):item[child.key]?item[child.key]:'-'" arrow-point-at-center>
                    {{child.customRender?child.customRender(item[child.key]):item[child.key]?item[child.key]:'-'}}
                  </a-tooltip>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'ScroolTable',
  components: {
    vueSeamlessScroll
  },
  props: {
    tableStyle:{
      type:String,
      default:''
    },
    tableData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tableHeight: ''
  },
  data() {
    return {
      tableObject: {
        columns: [],
        dataSource: [],
        _height: '',
       

      },
      num: 1,
      seamlessWarpHeight:'calc(100% - 20px)'
    }
  },

  computed: {
    // 公告滚动自定义
    defaultOption() {
      return {
        //    	autoPlay: false,
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: this.num, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1 // 0向下 1向上 2向左 3向右

        //      openWatch: true, // 开启数据实时监控刷新dom
        //      singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        //      singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        //      waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  watch: {
    'tableData':{
      handler:function(val){
        this.init()
      },
      deep:true
    }
  },
  created() {
    console.log(this.tableData)
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    // https://blog.csdn.net/Amandaandjack861007/article/details/103618548 循环滚动
    init() {
      // console.log(this.tableHeight)
      //				await this.$nextTick()
      // this.$refs.scroolTableBox.style.height = this.tableHeight // 最外一层div
      this._height =this.$refs.scroolTableBox.offsetHeight-50
      // console.log(document.documentElement.clientWidth)
      // this.$refs.seamlessWarp.$el.style.height = `cale(100% - )` // 滚动的div
      this.num = Math.ceil(this._height / 22)
      const seamlessWarpHeight= (this.tableData.dataSource||[]).some(item=>{
        return item.org_id=='1001'
      })
      this.seamlessWarpHeight = seamlessWarpHeight?'calc(100% - 50px)':'calc(100% - 20px)'
      
      this.tableObject = Object.assign({}, this.tableObject, this.tableData)// 得到父组件的数据
      // this.$refs.seamlessWarp._initMove()
      
      // console.log(this.num)
    }
  }

}
</script>

<style lang="less" scoped>
    .scroolTableBox1 {
      height: 100%;
      table{
        thead{
          // background: rgba(10, 133, 255, .8);
          // color: rgba(0, 0, 0, 0.4);
          font-size:14px;
          /*IE8*/
          // background: linear-gradient(rgba(10, 133, 255, .8), rgba(102, 179, 255, .8));
          // background: -webkit-linear-gradient(#0a85ff, #66b3ff);
          // background: -o-linear-gradient(#0a85ff, #66b3ff);
          // background: -moz-linear-gradient(#0a85ff, #66b3ff);
          // background: linear-gradient(#0a85ff, #66b3ff);
          font-weight: bold;
          th{
            // border:1px solid rgba(10, 133, 255, .8);
          }
        }
      }
      .seamlessWarp{
        table{
          tbody{
            // width: 56px;
            height: 15px;
            font-size: 12px;
            font-weight: 400;
            color: #475769;
            line-height: 15px;
            // color: #FFFFFF;
            // background:transparent;
            td{
              &.gary{
                // background:gray;
              }
              // border:1px solid rgba(10, 133, 255, .8);
            }
          }
        }
      }
      .top{
          th{
            height:27px;
            font-size: 12px;
            font-weight: 500;
            color: #D3DCE6;
            line-height: 27px;
            // font-weight: 400;
          }
      }
      .seamlessWarp {
        // height: calc(100% - 20px);
        overflow: hidden;
      }
      table {
        Table-layout: fixed;
        width: 100%;
        border: 0;
        padding: 0 20px;
        tr {
          line-height: 2.5;
          th,td {
            // text-align: center;
            padding-left:35px;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            // width: 56px;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            // color: #475769;
            color: #B4C0D4;
            line-height: 20px;
          }
        }
      }
    }
	
</style>
