<template>
  <div class="ProductionManage">
    <!-- <condition @conditionChange="conditionChange"></condition> -->
    <ul class="card_list">
      <li
        v-for="(item, index) in cardList"
        :key="index"
        class="card_list_li"
        :class="{ active: item.index == activeIndex }"
        @click="changeCard(item, item.index)"
      >
        <div class="name">
          <div>{{ item.name }}</div>
          <div>{{ item.company }}</div>
        </div>

        <div v-if="['pass'].includes(item.key)" class="num concrete_box">
          <p>{{ item.number }}</p>
          <p>{{ item.number }}</p>
        </div>
        <p v-else class="num">{{ item.number }}</p>
        <div class="bottom concrete_box concrete_box_font">
          <span v-if="item.dataIndex.includes('rawWater')">
            <p class="water">原水</p>
            <p class="value">{{ item.rawValue }}</p>
          </span>
          <span v-if="item.dataIndex.includes('tapWater')">
            <p class="water">自来水</p>
            <p class="value">{{ item.zlsValue }}</p>
          </span>
          <span v-if="item.dataIndex.includes('sewage')">
            <p class="water">污水</p>
            <p class="value">{{ item.wsValue }}</p>
          </span>
          <span v-if="item.dataIndex.includes('engineering')">
            <p class="water">工程</p>
            <p class="value">{{ item.wsValue }}</p>
          </span>
        </div>
        <div v-if="index == 12" class="bottom width50">
          <span>
            <p class="water">自来水</p>
            <p class="value">{{ item.zlsValue }}</p>
          </span>

          <span>
            <p class="water">原水</p>
            <p class="value">{{ item.rawValue }}</p>
          </span>
        </div>
        <div v-if="index == 13" class="bottom width50">
          <span>
            <p class="water">自来水</p>
            <p class="value">{{ item.zlsValue }}</p>
          </span>

          <span>
            <p class="water">污水</p>
            <p class="value">{{ item.wsValue }}</p>
          </span>
        </div>
        <div v-if="index == 14" class="bottom width100">
          <span>
            <p class="water">自来水</p>
            <p class="value">{{ item.zlsValue }}</p>
          </span>
        </div>
        <div v-if="index == 15" class="bottom width50">
          <span>
            <p class="water">处理次数</p>
            <p class="value">{{ item.num1 }}</p>
          </span>
          <span>
            <p class="water">处理及时率</p>
            <p class="value">{{ item.numRate }}</p>
          </span>
        </div>
      </li>
    </ul>
    <a-row class="main_con">
      <a-col :span="14" class="map_con">
        <echarts ref="echarts"></echarts>
      </a-col>
      <a-col :span="10" class="table_con" v-if="activeIndex == -1">
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 基本概述 </span>
          </div>
          <div class="table_con_main" ref="table_con_main1">
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
          <div class="table_con_main" ref="table_con_main1">
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
          <div class="table_con_main" ref="table_con_main1">
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
          <div class="con_title">
            <span class="fl"> 自来水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" ref="table_con_main1">
            <scrollTable v-if="activeIndex == 0" :tableData="tableData1" :tableHeight="table_con_main1"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableData="tableData4" :tableHeight="table_con_main1"> </scrollTable>
          </div>
        </div>
        <div class="ws_con">
          <div class="con_title">
            <span class="fl"> 污水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" ref="table_con_main2">
            <scrollTable v-if="activeIndex == 0" :tableData="tableData2" :tableHeight="table_con_main2"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableData="tableData5" :tableHeight="table_con_main2"> </scrollTable>
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title">
            <span class="fl"> 原水 </span>
            <span class="fr" v-if="activeIndex == 0"> 万吨/日 </span>
            <span class="fr" v-if="activeIndex == 1"> 万吨/月 </span>
          </div>
          <div class="table_con_main" ref="table_con_main3">
            <scrollTable v-if="activeIndex == 0" :tableData="tableData3" :tableHeight="table_con_main3"> </scrollTable>
            <scrollTable v-if="activeIndex == 1" :tableData="tableData6" :tableHeight="table_con_main3"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height2" v-if="activeIndex == 2">
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main4">
            <scrollTable :tableData="tableData7" :tableHeight="table_con_main4"> </scrollTable>
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title">
            <span class="fl"> 原水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main5">
            <scrollTable :tableData="tableData8" :tableHeight="table_con_main5"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height2" v-if="activeIndex == 3">
        <div class="zls_con">
          <div class="con_title">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main6">
            <scrollTable :tableData="tableData9" :tableHeight="table_con_main6"> </scrollTable>
            <!-- <a-table :scroll="{ y: table_con_main6}" :class="'my-index-table tytable1'" bordered ref="table1" size="small" rowKey="id" :columns="columns41"
              :dataSource="dataSource4.runWaterRate" :pagination="false">
            </a-table> -->
          </div>
        </div>
        <div class="ys_con">
          <div class="con_title">
            <span class="fl"> 污水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main7">
            <scrollTable :tableData="tableData10" :tableHeight="table_con_main7"> </scrollTable>
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height1" v-if="activeIndex == 4 || activeIndex == 5">
        <div class="zls_con" v-if="activeIndex == 4">
          <div class="con_title">
            <span class="fl"> 自来水 </span>
            <span class="fr"> 万吨 </span>
          </div>
          <div class="table_con_main" ref="table_con_main8">
            <scrollTable :tableData="tableData11" :tableHeight="table_con_main8"> </scrollTable>
            <!-- <a-table :scroll="{ y: table_con_main8}" :class="'my-index-table tytable1'" bordered ref="table1" size="small" rowKey="id" :columns="columns51"
              :dataSource="dataSource5.runWaterRate" :pagination="false">
            </a-table> -->
          </div>
        </div>
        <div class="zls_con" v-if="activeIndex == 5">
          <div class="con_title">
            <span class="fl"> 自来水 </span>
          </div>
          <div class="table_con_main" ref="table_con_main9">
            <scrollTable :tableData="tableData12" :tableHeight="table_con_main9"> </scrollTable>
            <!-- <a-table :scroll="{ y: table_con_main9}" :class="'my-index-table tytable1'" bordered ref="table1" size="small" rowKey="id" :columns="columns61"
              :dataSource="dataSource6.runWaterRate" :pagination="false">
            </a-table> -->
          </div>
        </div>
      </a-col>
      <a-col :span="10" class="table_con height1" v-if="activeIndex == 6">
        <div class="zls_con">
           <div style="width:100%">
            <a-button-group style="width:100%"   size='small'>
                <a-button :type="tabPosition=='rawWater'?'primary':''" @click="tabChange('rawWater',1)" style="width:25%"  block value="rawWater"> 自来水 </a-button>
                <a-button :type="tabPosition=='engineering'?'primary':''" @click="tabChange('engineering',2)" style="width:25%" block value="engineering"> 工程 </a-button>
                <a-button :type="tabPosition=='tapWater'?'primary':''" @click="tabChange('tapWater',3)" style="width:25%" block value="tapWater"> 原水 </a-button>
                <a-button :type="tabPosition=='sewage'?'primary':''" @click="tabChange('sewage',4)" style="width:25%" block value="sewage"> 污水 </a-button>
              </a-button-group>
           </div>
          <div class="table_con_main" ref="table_con_main8">
            <scrollTable :tableData="tableData16" :tableHeight="table_con_main8"> </scrollTable>
            <!-- <a-table :scroll="{ y: table_con_main8}" :class="'my-index-table tytable1'" bordered ref="table1" size="small" rowKey="id" :columns="columns51"
              :dataSource="dataSource5.runWaterRate" :pagination="false">
            </a-table> -->
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from './Echarts'
import scrollTable from './ScrollTable'
// import echarts from 'echarts'
// import * as echarts from 'echarts';
// import '@/assets/js/china.js' // 引入中国地图数据
import * as api from '../../../api/screen.js'
// import condition from '../components/condition'
export default {
  components: {
    echarts, scrollTable, 
    // condition
  },
  props: ['date'],
  data () {
    return {
      tabPosition:'rawWater',
      table_con_main1: 100,
      table_con_main2: 50,
      table_con_main3: 50,
      table_con_main4: 50,
      table_con_main5: 50,
      table_con_main6: 50,
      table_con_main7: 50,
      table_con_main8: 50,
      table_con_main9: 50,
      cardList: [
        {
        name: '日处理规模',
        company: '万吨/日',
        number: '3213',
        key: 'dealday',
        index: 0,
        dataIndex: 'rawWater,sewage,tapWater'
      },
      {
        name: '服务面积',
        company: '平方千米',
        number: '3213213',
        rawValue: '',
        zlsValue: '',
        wsValue: '',
        key: 'service',
        index: 2,
        dataIndex: ['rawWater', 'tapWater']
      },
        {
        name: '售水总量',
        company: '万吨',
        number: '123',
        rawValue: '',
        zlsValue: '',
        wsValue: '',
        key: 'total',
        index: 1,
        dataIndex: ['rawWater', 'sewage', 'tapWater']
      }, {
        name: '漏损率',
        company: '%',
        number: '22',
        rawValue: '',
        zlsValue: '',
        wsValue: '',
        key: 'leakage',
        index: 4,
        dataIndex: ['tapWater']
      },
      {
        name: '水质合格率',
        company: '%',
        number: '2123',
        rawValue: '',
        zlsValue: '',
        wsValue: '',
        key: 'pass',
        index: 3,
        dataIndex: ['rawWater', 'sewage']
      },
      
      // {
      //   name: '漏损率',
      //   company:'%',
      //   number: '2123',
      //   rawValue: '',
      //   zlsValue: '',
      //   wsValue: '',
      //   key: 'pass',
      //   dataIndex:'tapWater'
      // },
      {
        name: '客服热线接通率',
        company: '%',
        number: '213',
        num1: '',
        numRate: '',
        key: 'complain',
        dataIndex: 'tapWater',
        index: 5,
      },
      // {
      //   name: '营业总收入/利润总额',
      //   company: '万元',
      //   number: '123213',
      //   num1: '',
      //   numRate: '',
      //   key: 'complain',
      //   index: 6,
      //   dataIndex: 'rawWater,sewage,tapWater,engineering'
      // }

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
      activeIndex: -1,
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
      
      fixedTable5: {
        dataSource: [{ name: '合计' }],
        columns: []
      },
      columns1: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '合同产能',
        dataIndex: 'contract_output',
        key: 'contract_output'
      },
      {
        title: '实际产能',
        dataIndex: 'practical_output',
        key: 'practical_output'
      },
      {
        title: '产能利用率',
        dataIndex: 'output_pv',
        key: 'output_pv'
      }
      ],
      dataSource1: {

      },

      dataSource2: {},
      columns21: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '产量',
        dataIndex: 'output',
        key: 'output'
      },
      {
        title: '售水总量',
        dataIndex: 'water_total',
        key: 'water_total'
      },
      {
        title: '产销差',
        dataIndex: 'production_sale',
        key: 'production_sale'
      }
      ],
      columns22: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '进水量',
        dataIndex: 'input_water',
        key: 'input_water'
      },
      {
        title: '处理水量',
        dataIndex: 'complish_water',
        key: 'complish_water'
      },
      {
        title: '收费水量',
        dataIndex: 'charge_water',
        key: 'charge_water'
      }
      ],
      columns23: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '产量',
        dataIndex: 'output',
        key: 'output'
      },
      {
        title: '抄表水量',
        dataIndex: 'check_meter',
        key: 'check_meter'
      },
      {
        title: '收费水量',
        dataIndex: 'charge_water',
        key: 'charge_water'
      }
      ],
      columns31: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '服务面积',
        dataIndex: 'service_area',
        key: 'service_area'
      },
      {
        title: '服务人口',
        dataIndex: 'service_pop',
        key: 'service_pop'
      },
      {
        title: '客户数',
        dataIndex: 'pop_total',
        key: 'pop_total'
      }
      ],
      dataSource3: {},
      dataSource4: {},
      columns41: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '出厂水',
        dataIndex: 'runwater_out_rate',
        key: 'runwater_out_rate'
      },
      {
        title: '官网水',
        dataIndex: 'runwater_gis_rate',
        key: 'runwater_gis_rate'
      },
      {
        title: '综合合格率',
        dataIndex: 'runwater_rate',
        key: 'runwater_rate'
      }
      ],
      columns42: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'CODcr',
        dataIndex: 'CODcr',
        key: 'CODcr'
      },
      {
        title: '氨氮',
        dataIndex: 'NH',
        key: 'NH'
      },
      {
        title: '综合合格率',
        dataIndex: 'swage_rate',
        key: 'swage_rate'
      }
      ],
      columns51: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '免费水量',
        dataIndex: 'freewater',
        key: 'freewater'
      }, {
        title: '漏损量',
        dataIndex: 'leakwater',
        key: 'leakwater'
      }, {
        title: '漏损率',
        dataIndex: 'leakrate',
        key: 'leakrate'
      }],
      columns61: [{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '总次数',
        dataIndex: 'complain_num',
        key: 'complain_num'
      }, {
        title: '接通次数',
        dataIndex: 'complained_num',
        key: 'complained_num'
      }, {
        title: '接通率',
        dataIndex: 'complain_pv',
        key: 'complain_pv'
      }],
      columns71:[{
        title: '公司',
        dataIndex: 'name',
        key: 'name'
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
        title: '公司',
        dataIndex: 'name',
        key: 'name'
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
        title: '公司',
        dataIndex: 'name',
        key: 'name'
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
        title: '公司',
        dataIndex: 'name',
        key: 'name'
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
        title: '公司',
        dataIndex: 'name',
        key: 'name'
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
      dataSource5: {},
      dataSource6: {}

    }
  },
  created () {

  },
  mounted () {
    this.tableData1.columns = this.columns1
    this.tableData2.columns = this.columns1
    this.tableData3.columns = this.columns1
    this.tableData4.columns = this.columns21
    this.tableData5.columns = this.columns22
    this.tableData6.columns = this.columns23

    this.tableData7.columns = this.columns31
    this.tableData8.columns = this.columns31

    this.tableData9.columns = this.columns41
    this.tableData10.columns = this.columns42
    this.tableData11.columns = this.columns51
    this.tableData12.columns = this.columns61
    this.tableData16.columns = this.columns71
    this.init()
  },
  methods: {
    conditionChange (e) {
      this.activeIndex = -1
      this.init()
    },
    async init () {
      console.log(this.date)
      var date = this.date.replace('-', '')
      var params = {
        month: date
      }
      let res1 = await api.getTotal(params)
      let res = res1.result[0]
      this.cardList[0].rawValue = res.treatment_scale_raw || ''
      this.cardList[0].zlsValue = res.treatment_scale_tap || ''
      this.cardList[0].wsValue = res.treatment_scale_sewage || ''
      this.cardList[0].number = res.treatment_scale_total || ''

      this.cardList[1].rawValue = res.total_water_sales_raw
      this.cardList[1].zlsValue = res.total_water_sales_tap
      this.cardList[1].wsValue = res.total_water_sales_sewage
      this.cardList[1].number = res.total_water_sales_total

      this.cardList[2].rawValue = res.service_area_raw
      this.cardList[2].zlsValue = res.service_area_tap
      this.cardList[2].number = res.service_area_total

      this.cardList[3].wsValue = res.water_quality_sewage + '%'
      this.cardList[3].zlsValue = res.water_quality_tap + '%'
      this.cardList[3].number = '100%'

      this.cardList[4].number = res.leakrate_tap + '%'
      // this.cardList[4].zlsValue = res.leakrate_tap;

      this.cardList[5].number = res.complain_num
      this.cardList[5].num1 = res.complain_num_process_time
      this.cardList[5].numRate = res.complain_num_rate + '%'
      this.$nextTick(() => {
        this.changeCard(this.cardList[0], 0)
      })
    },
    changeRoute (item, index) {
      this.tabIndex = index
    },
    async changeCard (item, index) {
      this.$refs.echarts.getMapData(item.key)
      this.activeIndex = index
      var date = this.date.replace('-', '')
      var params = {
        month: date
      }

      if (index == 0) {
        this.$nextTick(() => {
          this.table_con_main1 = this.$refs.table_con_main1.offsetHeight
          this.table_con_main2 = this.$refs.table_con_main2.offsetHeight
          this.table_con_main3 = this.$refs.table_con_main3.offsetHeight
        })
        this.dataSource1 = {
          totalRawWaterSales: [],
          totalSewageWaterSales: [],
          totalTapWaterSales: []
        }

        let res = await api.getCard1(params)

        res.result.forEach((item) => {
          if (item.business_id == '1003') {
            this.tableData1.dataSource.push(item)
          } else if (item.business_id == '1004') {
            this.tableData2.dataSource.push(item)
          } else if (item.business_id == '1002') {
            this.tableData3.dataSource.push(item)
          }
        })
      } else if (index == 1) {
        this.$nextTick(() => {
          this.table_con_main1 = this.$refs.table_con_main1.offsetHeight
          this.table_con_main2 = this.$refs.table_con_main2.offsetHeight
          this.table_con_main3 = this.$refs.table_con_main3.offsetHeight
        })
        this.dataSource2 = {
          totalRawWaterSales: [],
          totalSewageWaterSales: [],
          totalTapWaterSales: []
        }
        let res = await api.getCard2(params)
        this.dataSource2 = res.result
        this.tableData4.dataSource = res.result.totalTapWaterSales
        this.tableData5.dataSource = res.result.totalSewageWaterSales
        this.tableData6.dataSource = res.result.totalRawWaterSales
      } else if (index == 2) {
        this.$nextTick(() => {
          this.table_con_main4 = this.$refs.table_con_main4.offsetHeight
          this.table_con_main5 = this.$refs.table_con_main5.offsetHeight
        })
        this.dataSource3 = {
          totalRawWaterSales: [],
          totalSewageWaterSales: [],
          totalTapWaterSales: []
        }
        // business_id：1002原水，1003自来水，1004污水，1005工程
        let res = await api.getCard3(params)
        res.result.forEach((item) => {
          if (item.business_id == '1002') {
            this.tableData8.dataSource.push(item)
          } else if (item.business_id == '1003') {
            this.tableData7.dataSource.push(item)
          }
        })
      } else if (index == 3) {
        this.$nextTick(() => {
          this.table_con_main7 = this.$refs.table_con_main7.offsetHeight
          this.table_con_main6 = this.$refs.table_con_main6.offsetHeight
        })
        this.dataSource4 = {
          runWaterRate: [],
          sewageRate: []
        }
        let res = await api.getCard4(params)
        this.tableData9.dataSource = res.result.runWaterRate
        this.tableData10.dataSource = res.result.sewageRate
      } else if (index == 4) {
        this.$nextTick(() => {
          this.table_con_main8 = this.$refs.table_con_main8.offsetHeight
        })
        this.dataSource5 = {
          runWaterRate: []
        }
        let res = await api.getCard5(params)
        this.tableData11.dataSource = res.result
      } else if (index == 5) {
        this.$nextTick(() => {
          this.table_con_main9 = this.$refs.table_con_main9.offsetHeight
        })
        this.dataSource6 = {
          runWaterRate: []
        }
        let res = await api.getCard6(params)
        this.tableData12.dataSource = res.result
      }
    },
    handleSelectChange (val) {
      console.log(val)
      this.init()
    },
    tabChange(e,index){
      this.tableData16.columns=this[`columns7${index}`]
      this.tabPosition=e
    }

  }

}
</script>
<style lang="less">
  .ProductionManage {
    height: 100%;
    width: 100%;
    // background: url(../../../assets/bigScreen/bg.png) no-repeat;
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

    .header {
      height: 80px;
      width: 100%;

      .ant-col {
        height: 100%;
        position: relative;

        ul {
          position: absolute;
          bottom: 10px;
          width: 100%;

          li {
            float: left;
            height: 28px;
            background: #085189;
            border-radius: 4px;
            color: #fff;
            text-align: center;
            padding: 0 5px;
            margin-left: 2px;
            cursor: pointer;
            line-height: 28px;
            font-size: 14px;

          }

          li.active {
            // background: #0084EA;
            background-color: rgba(40, 125, 217, 1);
            color: #fff;
            box-shadow: 0 0 15px #289bf4 inset;
          }
        }
      }

      .title {
        background-size: 100% 100%;
        font-size: 22px;
        color: #fff;
        text-align: center;
        line-height: 80px;
        font-weight: 550;
        letter-spacing: 6px;
      }

    }

    .card_list {
      height: 143px;
      width: 100%;
      li {
        float: left;
        margin-left: 8px;
        width: calc((100% - 40px)/6);
        height: 100%;
        // border-radius: 8px;
        border:1px solid  rgba(233, 233, 233, 1);
        // background: rgba(40, 155, 244, 0.28);
        padding: 10px 5px;
        color: #999999;
        background-color: #fff;
        cursor: pointer;

        .name {
          text-align: center;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }

        .num {
          text-align: center;
          color: #236DBE;
          font-size: 20px;
          line-height: 58px
        }

        .bottom {
          width: 100%;

          &>span {
            display: inline-block;
            width: 33%;
            float: left;
            text-align: center;

            .water {
              // font-size: 16px;
            }

            .value {
              color: #236DBE;
              // font-size: 18px;
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
          color: #fff !important;
        }
      }

      li:nth-of-type(1) {
        margin-left: 0;
      }
      .concrete_box{
       
        display: flex;
        justify-content: space-between;
      }
      .concrete_box_font{
         font-size: 10px;
      }
    }

    .main_con {
      height: calc(100% - 160px);
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
        // background: url(../../../assets/bigScreen/table.png) no-repeat;
        // background-size: 100%;
        // box-shadow: 0 0 15px #289bf4 inset;
        border-radius: 8px;
        padding: 0 15px;

        &>div {
          // .tytable1 {
          //   height: calc(100% - 35px);
          // }

          .con_title {
            border-left:3px solid #5db7db;
            height: 30px;
            color: #333333;
            line-height: 30px;

            .fl {
              float: left;
              padding-left: 14px;
              font-size: 16px;
              font-weight: 550;
            }

            .fr {
              float: right;
              font-size: 16px;
            }
          }
        }
        .table_con_main{
          height: calc(100% - 35px);
          width: 100%;
          // padding-left: 16px;
          div{
            line-height: 30px;
          }
        }
        .zls_con {
          width: 100%;
          height: 40%;
          padding:12px 15px;
          background-color:#fff;
          margin-bottom: 10px;
        }
        .ws_con {
          width: 100%;
          height: 30%;
          padding:12px 20px;
          background-color:#fff;
          margin-bottom: 10px;
        }

        .ys_con {
          width: 100%;
          height: 30%;
          padding:12px 20px;
          background-color:#fff;
          margin-bottom: 10px;
        }
      }

      .table_con.height1 {
        .zls_con {
          width: 100%;
          height: 100%;
          padding:12px 20px;
          background-color:#fff;
        }
      }

      .table_con.height2 {
        .zls_con {
          width: 100%;
          height: 60%;
          padding:12px 20px;
          background-color:#fff;
          
        }

        .ys_con {
          width: 100%;
          height: 40%;
           padding:12px 20px;
          background-color:#fff;
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

  }
</style>
