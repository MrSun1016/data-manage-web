<template>
  <div class="bigScreen-overview">
    <top-select :title="title" @mySelect='mySelect' :selectData="[{selectName:'',indicator:'month',types:'monthPicker'}]"></top-select>
    
    <ul class="card_list">
      <li
        v-for="(item, index) in cardList"
        :key="index"
        :class="activeIndex==item.index&&'active-style'"
        class="card_list_li"
        @click="changeCard(item, item.index)"
      >
        <!-- <router-link :to="item.url"> -->
          <div class="name">
              <!-- <div><img width="53px" height="53px"  :src="item.img"></div> -->
              <div class="name-index">
                <div class="concrete-name">{{item.name}}</div>
                <div><img width="53px" height="53px"  :src="item.img"></div> 
              </div>
                <div v-if="item.number2" class="concrete-num concrete-num2" >
                  <div style="width:50%">{{tabData[item.number]?Number(tabData[item.number]).toFixed()+'%':'-'}}</div>
                  <div style="width:50%">{{tabData[item.number2]?Number(tabData[item.number2]).toFixed()+'%':'-'}}</div>
                </div>
                <div v-else class="concrete-num"  >{{tabData[item.number]?Number(tabData[item.number]).toFixed()+item.company:'-'}}</div>
                
            
              
          </div>
          <!-- <div v-if="!item.dataIndex.includes('tapWater1')" style="height: 1px;background: #D3DCE6;margin-bottom:6px;padding-right:20px"></div> -->
          <div class="bottom concrete_box concrete_box_font">
            <span v-if="item.dataIndex.includes('rawWater')">
              <p class="water">原水</p>
              <p class="value">{{tabData[item.rawValue]?Number(tabData[item.rawValue]).toFixed():'-'}}</p>
            </span>
            <span v-if="item.dataIndex.includes('tapWater')">
              <p class="water">自来水</p>
              <p class="value"  v-if="item.number2" >{{tabData[item.zlsValue]?Number(tabData[item.zlsValue]).toFixed()+'%':'-'}}</p>
              <p class="value"  v-else >{{tabData[item.zlsValue]?Number(tabData[item.zlsValue]).toFixed():'-'}}</p>
            </span>
            <span style="width:50%;" v-if="item.dataIndex.includes('tapWater1')">
              <p class="water">自来水</p>
            </span>
            <span style="width:100%;" v-if="item.dataIndex.includes('tapWater2')">
              <p class="water">自来水</p>
            </span>
            <span v-if="item.dataIndex.includes('sewage')">
              <p class="water">污水</p>
              <p class="value"  v-if="item.number2">{{tabData[item.wsValue]?Number(tabData[item.wsValue]).toFixed()+'%':'-'}}</p>
              <p class="value"  v-else>{{tabData[item.wsValue]?Number(tabData[item.wsValue]).toFixed():'-'}}</p>
            </span>
            <span  style="width:50%;" v-if="item.dataIndex.includes('sewage1')">
              <p class="water">污水</p>
            </span>
            <span v-if="item.dataIndex.includes('engineering')">
              <p class="water">工程</p>
              <p class="value">{{tabData[item.wsValue]?Number(tabData[item.wsValue]).toFixed():'-'}}</p>
            </span>
            <span style="width:100%;" v-if="item.index == 6" >
              <p class="water">自来水</p>
            </span>
            <!-- <span v-if="item.index == 6">
              <p class="water">处理次数</p>
              <p class="value">{{tabData[item.num1]?Number(tabData[item.num1]).toFixed():'-'}}</p>
            </span>
            <span v-if="item.index == 6">
              <p class="water">及时率</p>
              <p class="value">{{tabData[item.numRate]?`${Number(tabData[item.numRate]).toFixed()}%`:'-'}}</p>
            </span> -->
          </div>
      <!-- </router-link> -->
      </li>
    </ul>
    <a-row class="main_con">
      <a-col :span="14" class="map_con">
        <echarts ref="echarts" style="border-radius: 8px;"></echarts>
      </a-col>
      <a-col :span="6" class="table_con" v-if="activeIndex == -1">
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 基本概述 </span>
          </div>
          <div class="table_con_main">
            <a-row v-for="(item, index) in probablyCard.basics" :key="index">
              <a-col :span="8">{{ item.name }}</a-col>
              <a-col :span="8" style="text-align: center; color: rgba(0, 102, 204, 0.8)">{{ item.count }}</a-col>
              <a-col :span="8" style="text-align: right">{{ item.unit }}</a-col>
            </a-row>
          </div>
        </div>
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 生产概况 </span>
          </div>
          <div class="table_con_main" >
            <a-row v-for="(item, index) in probablyCard.release" :key="index">
              <a-col :span="8">{{ item.name }}</a-col>
              <a-col :span="8" style="text-align: center; color: rgba(0, 102, 204, 0.8)">{{ item.count }}</a-col>
              <a-col :span="8" style="text-align: right">{{ item.unit }}</a-col>
            </a-row>
          </div>
        </div>
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 客户概况 </span>
          </div>
          <div class="table_con_main">
            <a-row v-for="(item, index) in probablyCard.customer" :key="index">
              <a-col :span="8">{{ item.name }}</a-col>
              <a-col :span="8" style="text-align: center; color: rgba(0, 102, 204, 0.8)">{{ item.count }}</a-col>
              <a-col :span="8" style="text-align: right">{{ item.unit }}</a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con" v-if="activeIndex == 0 || activeIndex == 1">
        <div class="zls_con">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" :class="activeIndex==0?'table_con_main1':''" ref="table_con_main1">
            <scrollTable v-if="activeIndex == 0"  :tableStyle="gradientBlue" :tableData="tableData1" :tableHeight="table_con_main1"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableStyle="gradientBlue" :tableData="tableData4" :tableHeight="table_con_main1"> </scrollTable>
          </div>
        </div>
        <div class="ws_con">
          <div class="con_title" style="color: #F85454;">
            <span class="fl" > 污水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" :class="activeIndex==0?'table_con_main1':''" ref="table_con_main2">
            <scrollTable v-if="activeIndex == 0" :tableStyle="gradientRed" :tableData="tableData2" :tableHeight="table_con_main2"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableStyle="gradientRed" :tableData="tableData5" :tableHeight="table_con_main2"> </scrollTable>
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title" style="color: #1CBE6D;">
            <span class="fl" > 原水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" :class="activeIndex==0?'table_con_main1':''" ref="table_con_main3">
            <scrollTable v-if="activeIndex == 0" :tableStyle="gradientGreen" :tableData="tableData3" :tableHeight="table_con_main3"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableStyle="gradientGreen" :tableData="tableData6" :tableHeight="table_con_main3"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height2" v-if="activeIndex == 2">
        <div class="zls_con">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main4">
            <scrollTable :tableStyle="gradientBlue" :tableData="tableData7" :tableHeight="table_con_main4"> </scrollTable>
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title" style="color: #1CBE6D;">
            <span class="fl"> 原水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main5">
            <scrollTable :tableStyle="gradientGreen" :tableData="tableData8" :tableHeight="table_con_main5"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height2" v-if="activeIndex == 3">
        <div class="zls_con">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main6">
            <scrollTable :tableStyle="gradientBlue" :tableData="tableData9" :tableHeight="table_con_main6"> </scrollTable>
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title" style="color: #F85454;">
            <span class="fl"> 污水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main7">
            <scrollTable  :tableStyle="gradientRed"  :tableData="tableData10" :tableHeight="table_con_main7"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height1" v-if="activeIndex == 4 || activeIndex == 5 ||activeIndex == 6">
        <div class="zls_con" v-if="activeIndex == 4">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
            <span class="fr"> 万吨 </span>
          </div>
          <div class="table_con_main" ref="table_con_main8">
            <scrollTable :tableStyle="gradientBlue" :tableData="tableData11" :tableHeight="table_con_main8"> </scrollTable>
          </div>
        </div>
        <div class="zls_con" v-if="activeIndex == 5">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main9">
            <scrollTable :tableStyle="gradientBlue" :tableData="tableData12" :tableHeight="table_con_main9"> </scrollTable>

          </div>
        </div>
        <div class="zls_con" v-if="activeIndex == 6">
          <div class="con_title" style="color: #33B5D0;">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main9">
            <scrollTable :tableStyle="gradientBlue" :tableData="tableData16" :tableHeight="table_con_main9"> </scrollTable>

          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from './Echarts'
import scrollTable from './ScrollTable'
import { getAction } from '@/api/manage'
  import topSelect from '@/components/TopSelect'
    import { reloadMixin } from '@/mixins/reloadMixin.js'
import moment from "moment"
  let url ={
    getPlateData: '/kpi/getPlateData',
   getDayDeal:'/kpi/getDayDeal', //首日处理
   getSellWater:'/kpi/getSellWater',//售水总量数据
   getWaterQuality:'/kpi/getWaterQuality', //水质合格率数据
   getLeakage:'/kpi/getLeakage', //综合漏损率数据
   getCustomer:'/kpi/getCustomer', //客服热线接通率
   getComplains:'/kpi/getComplains', //投诉次数数据
  }
export default {
  mixins:[reloadMixin],
  components: {
    echarts, scrollTable, topSelect
  },
  props: ['date'],
  data () {
    return {
      title:{
          value:'集团首页',
        },
      // gradientBlue:'background: linear-gradient(270deg, rgba(43, 138, 253, 0) 0%, rgba(43, 138, 253, 0.5) 100%);',
      // gradientRed:'background: linear-gradient(270deg, rgba(248, 84, 84, 0) 0%, rgba(248, 84, 84, 0.5) 100%);',
      // gradientGreen:'background: linear-gradient(270deg, rgba(28, 190, 109, 0) 0%, rgba(28, 190, 109, 0.5) 100%);',
      // gradientBlue:'background: #EEF3F6;',
      // gradientRed:'background: #EEF3F6;',
      // gradientGreen:'background: #EEF3F6;',
      tabPosition:'rawWater',
      table_con_main1: 150,
      table_con_main2: 150,
      table_con_main3: 150,
      table_con_main4: 150,
      table_con_main5: 150,
      table_con_main6: 150,
      table_con_main7: 150,
      table_con_main8: 462,
      table_con_main9: 483,
      cardList: [
        {
        name: '日处理规模(万吨/日)',
        company: '',
        number: 'dayDeal',
        key: 'dealday',
        rawValue: '12791002',
        zlsValue: '12791003',
        wsValue: '12791004',
        index: 0,
        url:'/prameterKey/groupHome/dailyProcessingScale',
        img:require('@/assets/om/promote.svg'),
        dataIndex: 'rawWater,sewage,tapWater'
      },
        {
        name: '售水总量(万吨/月)',
        company: '',
        number: 'sellWater',
        rawValue: '11861002',
        zlsValue: '12971003',
        wsValue: '11861004',
        key: 'total',
        index: 1,
        url:'/prameterKey/groupHome/waterVolumeSold',
        img:require('@/assets/om/waterDrop.svg'),
        dataIndex: ['rawWater', 'sewage', 'tapWater']
      },{
        name: '水质合格率(月)',
        company: '%',
        number: '1056',
        number2: '1057',
        rawValue: '',
        zlsValue: '1056',
        wsValue: '1057',
        key: 'pass',
        index: 3,
        url:'/prameterKey/groupHome/percentOfPass',
        img:require('@/assets/om/roundCake.svg'),
        dataIndex: ['tapWater1', 'sewage1']
      },
      {
        name: '综合漏损率(年)',
        company: '%',
        number: '1045',
        rawValue: '',
        zlsValue: '1045',
        wsValue: '',
        key: 'leakage',
        index: 4,
        url:'/prameterKey/groupHome/leakRate',
        img:require('@/assets/om/funnel.svg'),
        dataIndex: ['tapWater2']
      },
      {
        
        name: '呼叫中心接通率(月)',
        company: '%',
        number: '6058',
        num1: '',
        zlsValue: '6058',
        numRate: '',
        key: 'complain',
        url:'/prameterKey/groupHome/telephoneConnectionRate',
        img:require('@/assets/om/call.svg'),
        dataIndex: ['tapWater2'],
        index: 5,
      },
      {
        // name: '投诉次数(次)',
        name: '投诉处理及时率(月)',
        company: '%',
        // number: '1202',
        number: '1200',
        num1: '1201',
        numRate: '1200',
        key: 'complain',
        url:'/prameterKey/groupHome/numberOfComplaints',
        img:require('@/assets/om/edit.svg'),
        index: 6,
        dataIndex: ''
      }

      ],
      probablyCard: {
        basics: [
          { name: '总资产', count: '111', unit: '千万' },
          { name: '员工', count: '', unit: '个' },
          { name: '下属公司', count: '', unit: '个' },
          { name: '水厂数', count: '', unit: '个' },
        ],
        release: [
          { name: '初始产能', count: '', unit: '万吨/日' },
          { name: '设计产能', count: '', unit: '万吨/日' },
          { name: '管网长度', count: '', unit: '千米' },
          { name: '实际产能', count: '', unit: '万吨/日' },
        ],
        customer: [
          { name: '供水人口', count: '', unit: '万人' },
          { name: '供水面积', count: '', unit: '平方公里' },
          { name: '城区供水面积', count: '', unit: '平方公里' },
          { name: '客户数', count: '', unit: '户' },
        ]
      },
      activeIndex: 0,
      tabIndex: 0,
      tableData1: {
        columns: [],
        dataSource: []
      },
      tableData2: {
        columns: [],
        dataSource: []
      },
      tableData3: {
        columns: [],
        dataSource: []
      },
      tableData4: {
        columns: [],
        dataSource: []
      },
      tableData5: {
        columns: [],
        dataSource: []
      },
      tableData6: {
        columns: [],
        dataSource: []
      },
      tableData7: {
        columns: [],
        dataSource: []
      },
      tableData8: {
        columns: [],
        dataSource: []
      },
      tableData9: {
        columns: [],
        dataSource: []
      },
      tableData10: {
        columns: [],
        dataSource: []
      },
      tableData11: {
        columns: [],
        dataSource: []
      },
      tableData12: {
        columns: [],
        dataSource: []
      },
      tableData16: {
        columns: [],
        dataSource: []
      },
      dataSource1: {

      },
      

      dataSource2: {},
      dataSource3: {},
      dataSource4: {},
      
      fixedTable5: {
        dataSource: [{ name: '合计' }],
        columns: []
      },
      columns0: [
        {
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        width:'20%',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
        
        },
      {
        title: '合同产能',
        dataIndex: '1279',
        key: '1279',
        width:'20%',
        customRender:(text,record,index)=>{
            return text?text:'-'
          // return text?Math.round(text):'-'
        }

      },
      {
        title: '实际产能',
        dataIndex: '1013',
        key: '1013',
        width:'20%',
        customRender:(text,record,index)=>{
          return text?text:'-'
          // return text?Math.round(text):'-'
        }
      
      },
      {
        title: '产能利用率',
        dataIndex: '1022',
        key: '1022',
        width:'25%',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.round(text)}%`:`${text}%`:'-'
        }
      }
      ],
      
      columns11: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '供水量',
        dataIndex: '1027',
        key: '1027',
        customRender:(text,record,index)=>{ 
          return Math.round(text*10)/10
          // return text?Math.round(text):'-'
        }
      },
      {
        title: '售水总量',
        dataIndex: '1297',
        key: '1297',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.round(text):'-'
        }
      },
      {
        title: '产销差',
        dataIndex: '1046',
        key: '1046',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.round(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }
      }
      ],
      columns12: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '进水量',
        dataIndex: '1026',
        key: '1026',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.round(text):'-'
          // return text?`${text}`:'-'
        }
      },
      {
        title: '处理水量',
        dataIndex: '1027',
        key: '1027',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.round(text):'-'
          // return text?`${text}`:'-'
        }
      },
      {
        title: '收费水量',
        dataIndex: '1186',
        key: '1186',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }
      ],
      columns13: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '供水量',
        dataIndex: '1027',
        key: '1027',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      },
      {
        title: '抄表水量',
        dataIndex: '1234',
        key: '1234',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      },
      {
        title: '收费水量',
        dataIndex: '1186',
        key: '1186',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }
      ],
      columns31: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '出厂水',
        dataIndex: 'chuchang',
        key: 'chuchang',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }
      },
      {
        title: '管网水',
        dataIndex: 'guanwang',
        key: 'guanwang',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }
      },
      {
        title: '综合合格率',
        dataIndex: 'hege',
        key: 'hege',
        width:'30%',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
          // return text!='/N'?Number(text)==NaN?'-':`${Number(text).toFixed()}%`:'-'
        }
      }
      ],
      columns32: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: 'CODcr',
        dataIndex: '1076',
        key: '1076',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }

      },
      {
        title: '氨氮',
        dataIndex: '1078',
        key: '1078',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }
        
      },
      {
        title: '综合合格率',
        dataIndex: '1057',
        key: '1057',
        width:'30%',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
          // return Number(text)==NaN?'-':`${Number(text).toFixed()}%`
        }
      }
      ],
      columns41: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },  {
        title: '漏损水量',
        dataIndex: '1030',
        key: '1030',
        customRender:(text,record,index)=>{
          return Math.round(text*10)/10
          // return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }, {
        title: '漏损率',
        dataIndex: '6017',
        key: '6017',
        customRender:(text,record,index)=>{
          return  text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
        }
      },{
        title: '综合漏损率',
        dataIndex: '1045',
        key: '1045',
        width:'30%',
        customRender:(text,record,index)=>{
          return  text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
        }
      }
      ],
      columns51: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      }, {
        title: '总次数',
        dataIndex: '6064',
        key: '6064',
        customRender:(text,record,index)=>{
          return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }, {
        title: '接通次数',
        dataIndex: '6065',
        key: '6065',
        customRender:(text,record,index)=>{
          return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }, {
        title: '接通率',
        dataIndex: '6058',
        key: '6058',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
        }
      }],
      columns61: [{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      }, {
        title: '投诉次数',
        dataIndex: '1202',
        key: '1202',
        customRender:(text,record,index)=>{
          return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }, {
        title: '及时处理次数',
        dataIndex: '1201',
        key: '1201',
        width:'35%',
        customRender:(text,record,index)=>{
          return text?Math.ceil(text):'-'
          // return text?`${text}`:'-'
        }
      }, {
        title: '处理及时率',
        dataIndex: '1200',
        key: '1200',
        width:'25%',
        customRender:(text,record,index)=>{
          return text?text==100?`${Math.ceil(text)}%`:`${text}%`:'-'
          // return text?`${text}%`:'-'
        }
      }],
      columns71:[{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '自来水收入/营业总收入',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '自来水利润（万元）',
        dataIndex: 'name',
        key: 'name'
      }
      ],
      columns72:[{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name',
        customRender:(text,record,index)=>{
          return  text.slice(0,4)
        }
      },
      {
        title: '工程收入/营业总收入',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '工程利润（万元）',
        dataIndex: 'name',
        key: 'name'
      }
      ],
      columns72:[{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name'
      },
      {
        title: '工程收入/营业总收入',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '工程利润（万元）',
        dataIndex: 'name',
        key: 'name'
      }
      ],
      columns73:[{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name'
      },
      {
        title: '原水收入/营业总收入',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '原水利润（万元）',
        dataIndex: 'name',
        key: 'name'
      }
      ],
      columns74:[{
        title: '公司名称',
        dataIndex: 'org_name',
        key: 'org_name'
      },
      {
        title: '产量',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '污水利润（万元）',
        dataIndex: 'name',
        key: 'name'
      }
      ],
      tabData:{},
      url:'',
      month:'',

    }
  },
  created () {
    
    const FullYear = moment().subtract(1,'months').format('YYYY') 
    const month = moment().subtract(1,'months').format('MM')
    this.getPlateData(moment().subtract(1,'months').format('YYYYMM'))
    this.month = moment().subtract(1,'months').format('YYYYMM')
    // if(month<10){
    //   this.getPlateData(`${FullYear}0${month}`)
    //   // this.getRightList(`${FullYear}0${month}`)
    //   this.month=`${FullYear}0${month}`
    // }else{
    //   this.getPlateData(`${FullYear}${month}`)
    //   // this.getRightList(`${FullYear}${month}`)
    //   this.month=`${FullYear}${month}`
    // }
    this.routrTab(0)
  },
  watch:{
      $route: {
        handler: function(route) {
          if(route.fullPath.includes('prameterKey/groupHome')){
            // this.routrTab()
          }
        },
        immediate: true
      }
    },
  mounted () {
    this.tableData1.columns = this.columns0
    this.tableData2.columns = this.columns0
    this.tableData3.columns = this.columns0

    this.tableData4.columns = this.columns11
    this.tableData5.columns = this.columns12
    this.tableData6.columns = this.columns13

    this.tableData7.columns = this.columns31
    this.tableData8.columns = this.columns31

    this.tableData9.columns = this.columns31
    this.tableData10.columns = this.columns32

    this.tableData11.columns = this.columns41
    this.tableData12.columns = this.columns51

    this.tableData16.columns = this.columns61
  },
  methods: {
    moment,
    routrTab(index){
      switch(index){
        case 0:
          this.title.value='日处理规模'
          this.activeIndex=0
          this.url=url.getDayDeal
          break;
        case 1: 
        this.title.value='售水总量'
          this.activeIndex=1
          this.url=url.getSellWater
          break;
        case 3: 
          this.title.value='水质合格率'
          this.activeIndex=3
          this.url=url.getWaterQuality
          break;
        case 4:
          this.title.value='综合漏损率'
          this.activeIndex=4
          this.url=url.getLeakage
          break;
        case 5: 
          this.title.value='客户热线接通率'
          this.activeIndex=5
          this.url=url.getCustomer
          break;
        case 6:
          this.title.value='投诉次数'
          this.activeIndex=6
          this.url=url.getComplains
          break;
      }
      this.getRightList(this.month)
    },
    routrTab1(){
      
      switch(this.$route.meta.title){
        case '日处理规模':
          this.activeIndex=0
          this.url=url.getDayDeal
          break;
        case '售水总量': 
          this.activeIndex=1
          this.url=url.getSellWater
          break;
        case '水质合格率': 
          this.activeIndex=3
          this.url=url.getWaterQuality
          break;
        case '综合漏损率':
          this.activeIndex=4
          this.url=url.getLeakage
          break;
        case '客户热线接通率': 
          this.activeIndex=5
          this.url=url.getCustomer
          break;
        case '投诉次数':
          this.activeIndex=6
          this.url=url.getComplains
          break;
      }
      this.getRightList(this.month)
    },
    getRightList(month){
      getAction(this.url,{month:month}).then(res=>{
        if(res){
          const {result} = res
          if( this.activeIndex==0){
            const {rawWater,tapWater,wasteWater} =result
            this.tableData1.dataSource = tapWater
            this.tableData2.dataSource = wasteWater
            this.tableData3.dataSource =rawWater
            this.$forceUpdate()
          }else if(this.activeIndex==1){
            const {rawData,runData,wasteData} =result
            this.tableData4.dataSource = runData
            this.tableData5.dataSource = wasteData
            this.tableData6.dataSource =rawData
            this.$forceUpdate()
          }else if(this.activeIndex==3){
            const {runData,wasteData} =result
            this.tableData9.dataSource = runData
            this.tableData10.dataSource = wasteData
            this.$forceUpdate()
          }else if(this.activeIndex==4){
            this.tableData11.dataSource = result
          
            this.$forceUpdate()
          }else if(this.activeIndex==5){
            // const {rawData,runData,wasteData} =result
            this.tableData12.dataSource = result
          
            this.$forceUpdate()
          }else if(this.activeIndex=6){
            this.tableData16.dataSource = result
            this.$forceUpdate()
          }
          
          

          


        }
      })
    },
    mySelect(data,type){
      const  month=data.month.format('YYYYMM')
      this.month =month
      this.getRightList(`${month}`)
      this.getPlateData(`${month}`)
    },
    getPlateData(date){
      
      getAction(url.getPlateData,{month:date}).then(res=>{
          if(res){
            const {result} =res
            if(result){
              result.dayDeal=Number(result[12791002])+ Number(result[12791003])+Number(result[12791004])
              result.sellWater=Number(result[12971003])+ Number(result[11861002])+Number(result[11861004])
            } 
            this.tabData=result||{}
          }
      })
    },
    async changeCard (item, index) {
      this.routrTab(index)
      // this.activeIndex = index


    },
  },


}
</script>

<style lang="less">
 .ant-calendar-month-panel-header{
     background:rgba(28, 59, 135, 0) ;
   }
</style>
<style lang="less" scoped>
 /deep/ .ant-calendar-month-panel-month{
     background:rgba(28, 59, 135, 0.3) ;
   }
   /deep/ .ant-calendar{
     border-color: rgba(28, 59, 135, 0.3);
   }
 .bigScreen-overview {
  /deep/ .indexName{
     color:#fff;
  }
  /deep/ input{
    color:#fff !important;
     background:rgba(28, 59, 135, 0) ;
   }
      height: 100%;
      width: 100%;
      min-width:1520px;
      background: url(../../../assets/om/bigScreen.png) no-repeat;
      // padding: 0 20px 20px 20px;

      ul {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      p {
        margin-bottom: 0;
      }


      .card_list {
        height: 143px;
        width: 100%;
        .active-style{
          border: 1px solid #95AAC2;
        }
        li {
          float: left;
          margin-left: 20px;
          min-width: 209px;
          width: calc((100% - 100px)/6);
          height: 100%;
          padding: 10px;
          color: #fff;
          cursor: pointer;
          background: rgba(28, 59, 135, 0.3);
          

          .name {
            // text-align: center;
            font-size: 12px;
            line-height: 2.17rem;
            // display: flex;
            img{
              width:2.17rem;
              height: 2.17rem;
              // margin:4px 9px 10px 0;
            }
            .name-index{
              width: 100%;
              display: flex;
              justify-content: space-between;
              .concrete-name{  
                // height: 22px;
                // font-size: 16px;
                // text-align: center;
                // font-weight: normal;
                color: #8493A6;
                font-size: 16px;
                font-weight: 400;
                color: #B4C0D4;
                line-height: 22px;
                // line-height: 22px;
              }
              
            }
            .concrete-num{
                height: 50px;
                font-size: 32px;
                font-weight: 500;
                color: #E2E8F0;
                line-height: 60px;
                text-align: center;
              }
              .concrete-num2{
                font-size: 32px;
                // padding-right: 20px;
                display: flex;
                justify-content: space-between;
                line-height: 60px;
                text-align: center;
                
              }
            // justify-content: space-between;
          }

          // .num {
          //   text-align: center;
          //   color: #236DBE;
          //   font-size: 20px;
          //   line-height: 58px
          // }

          .bottom {
            width: 100%;

            &>span {
              display: inline-block;
              width: 33%;
              font-size: 12px;
              float: left;
              // text-align: center;

              .water {
                font-size: 16px;
              }

              .value {
                // width: 33px;
                height: 19px;
                font-size: 18px;
                font-weight: 400;
                // color: #0D0D1E;
                color: #E2E8F0;
                line-height: 19px;
              }
            }
          }

          .width50 {
            &>span {
              width: 50%;
            }
          }

          .width100 {
            &>span {
              width: 100%;
            }
          }

        }

        li.active {
          background: rgba(40, 125, 217, 1);
        
          color: #fff;
          .name,.num{
            color: #fff;
          }
          
          .value{
            width: 33px;
            height: 19px;
            font-size: 16px;
            font-weight: 400;
            color: #0D0D1E;
            line-height: 19px;
          }
        }

        li:nth-of-type(1) {
          margin-left: 0;
        }
        .concrete_box{
        
          display: flex;
          justify-content: space-between;
          // margin-top: 12px;
          text-align: center;
        }
        .concrete_box_font{
          margin-top: 10px;
          width: 28px;
          height: 20px;
          font-size: 14px;
          font-weight: normal;
          color: #8493A6;
          line-height: 20px;
    
        }
      }

      .main_con {
        height: calc(100% - 213px);
        margin-top: 10px;

        li {
          height: 100%;
          float: left;
        }

        .map_con {
          width: 66%;
          // background: url(../../../assets/bigScreen/map.png) no-repeat;
          // background-size: 100%;
          // box-shadow: 0 0 15px #289bf4 inset;
          border-radius: 8px;
        }

        .table_con {
          margin-left: 15px;
          width: calc(34% - 15px);
          height: calc(100vh - 230px);
          border-radius: 8px;
          overflow: hidden;

          &>div {
            // .tytable1 {
            //   height: calc(100% - 35px);
            // }

            .con_title {
              // border-left:3px solid #5db7db;
              height: 30px;
              color: #333333;
              line-height: 30px;

              .fl {
                float: left;
                padding:3px 0 4px 4px;
                font-weight: 550;
                font-size: 20px;
                font-weight: normal;
                color: #D3DCE6;
                line-height: 27px;
              }

              .fr {
                float: right;
                font-size: 14px;
                // font-family: Alibaba-PuHuiTi-R, Alibaba-PuHuiTi;
                font-weight: normal;
                color: #B4C0D4;
                // line-height: px;
                // font-size: 16px;
              }
            }
          }
          .table_con_main{
            height: calc(100% - 55px);
            width: 100%;
            // padding-left: 16px;
            div{
              line-height: 30px;
            }
          }
          .zls_con {
            width: 100%;
            height: calc(33.3% - 10px);
            padding:4px 15px;
            background:rgba(28, 59, 135, 0.3);
            margin-bottom: 10px;
            
          }
          .ws_con {
            width: 100%;
            height: calc(33.3% - 10px);
            padding:12px 20px;
            // background-color:#fff;
            margin-bottom: 10px;
            background:rgba(28, 59, 135, 0.3);
          }

          .ys_con {
            width: 100%;
            height: calc(33.3% - 10px);
            padding:12px 20px;
            padding-bottom:20px;
            background:rgba(28, 59, 135, 0.3);
            margin-bottom: 10px;
          }
        }

        .table_con.height1 {
          .zls_con {
            width: 100%;
            height: 100%;
            padding:12px 20px;
            // background-color:#fff;
          }
        }

        .table_con.height2 {
          .zls_con {
            width: 100%;
            height: 50%;
            padding:12px 20px;
            // background-color:#fff;
            
          }

          .ys_con {
            width: 100%;
            height: 49%;
            padding:12px 20px;
            // background-color:#fff;
          }
        }
      }

      .ant-table-bordered .ant-table-thead>tr>th,
      .ant-table-bordered .ant-table-tbody>tr>td,
      .ant-table-small.ant-table-bordered .ant-table-thead>tr>th.ant-table-row-cell-last,
      .ant-table-small.ant-table-bordered .ant-table-tbody>tr>td:last-child,
      .ant-table-small.ant-table-bordered .ant-table-thead>tr>th.ant-table-row-cell-last,
      .ant-table-small.ant-table-bordered .ant-table-tbody>tr>td:last-child {
        border-right: 1px solid rgba(10, 133, 255, 0.8);
        color: #fff;
      }

      .ant-table-small.ant-table-bordered .ant-table-thead>tr>th.ant-table-row-cell-last,
      .ant-table-small.ant-table-bordered .ant-table-tbody>tr>td:first-child,
      .ant-table-small.ant-table-bordered .ant-table-thead>tr>th.ant-table-row-cell-last,
      .ant-table-small.ant-table-bordered .ant-table-tbody>tr>td:first-child {
        border-left: 1px solid rgba(10, 133, 255, 0.8);
      }

      .ant-table-tbody>tr>td,
      .ant-table-small>.ant-table-content .ant-table-placeholder,
      .ant-table-small>.ant-table-content .ant-table-row:last-child td {
        border-bottom: 1px solid rgba(10, 133, 255, 0.8);
      }

      .ant-table-thead {
        background: rgba(10, 133, 255, .8);
        /*IE8*/
        background: linear-gradient(rgba(10, 133, 255, .8), rgba(102, 179, 255, .8));
        background: -webkit-linear-gradient(#0a85ff, #66b3ff);
        background: -o-linear-gradient(#0a85ff, #66b3ff);
        background: -moz-linear-gradient(#0a85ff, #66b3ff);
        background: linear-gradient(#0a85ff, #66b3ff);
        font-weight: bold;

        tr {

          th,
          td {
            color: #FFFFFF;
            text-align: center;
          }
        }
      }

      .ant-table-tbody {

        tr:hover,
        td:hover {
          background: transparent !important;
        }

        tr {

          th,
          td {
            padding: 4px;
            color: #FFFFFF;
            text-align: center;
          }
        }
      }

      .ant-table-small.ant-table-bordered .ant-table-content {
        border-right: transparent;
      }

      .ant-table-small {
        border: transparent !important;
      }

      .ant-table-thead>tr>th {
        border-bottom: transparent;
      }

      .ant-table-small>.ant-table-content>.ant-table-body {
        margin: 0;
      }

      .ant-table-placeholder {
        background: transparent !important;
        color: #fff;
      }

      .ant-empty-normal .ant-empty-image {
        height: 0;
      }

      .ant-empty-normal {
        color: #fff;
      }

      .ant-table-wrapper {
        overflow: auto;
      }

      .ant-table-header.ant-table-hide-scrollbar {
        min-width: 0px !important;
      }

      ::-webkit-scrollbar {
        width: 0px;
        height: 10px;
      }

      .ant-table-fixed-header>.ant-table-content>.ant-table-scroll>.ant-table-body {
        background: transparent;
      }
      /deep/ .page-title{
        color:#fff
      }
      /deep/ .filtrate{
        background:rgba(10, 133, 255, 0)
      }

    }
    

    
  
  
</style>
