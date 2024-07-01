<template>
  <div class="bigScreen-Page">
    <!-- <top-select :title="title" @mySelect='mySelect' :selectData="[{selectName:'选择日期',indicator:'month',types:'monthPicker'}]"></top-select> -->
    <!-- <div class="switchNav" v-if="reload"> -->
      <overview-page ref="overviewPage"   :date="date"></overview-page>
    <!-- </div> -->
  </div>
</template>
<script>

  import overviewPage from './components/Overview'
  import * as api from '../../api/screen.js'
  import { reloadMixin } from '@/mixins/reloadMixin.js'
  import topSelect from '@/components/TopSelect'
  export default {
    components: {overviewPage,topSelect },
    mixins:[reloadMixin],
    data() {
      return {
        title:{
          value:'集团首页',
        },
        reload: true,
        date: '2020-12',
        dataSource1: {},
        
      }
    },

    created() {
      this.title.value=this.$route.meta.title
    },
    watch:{
      $route: {
        handler: function(route) {
          if(route.fullPath.includes('prameterKey/groupHome')){
            this.title.value=route.meta.title
          }
        },
        immediate: true
      }
    },
    methods: {
      mySelect(data,type){
        this.$refs.overviewPage.mySelect(data,type)
      },
      reloadInit(e){
        // console.log('baba',e)
      },
    }

  }
</script>
<style lang="less" scoped>
  .bigScreen-Page {

    height:100%;
    width: 100%;
    // padding-bottom: 20px;
    position: relative;
    // overflow: auto;
    // background: url(../../assets/bigScreen/bg.png) no-repeat;
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
      .ant-input{
          background: #085189;
          color: #fff;
          border:transparent !important;

      }
      .ant-calendar-picker-icon{
        color: #fff !important;
      }
      .ant-col {
        height: 100%;
        position: relative;
        .ant-select  {
          position: absolute;
          bottom: 10px;
        }
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
          li:nth-of-type(1){
            padding:0 10px;
            padding-left: 20px;
            margin-right:5px;
            // background: url(../../assets/bigScreen/icon.png) no-repeat;
            background-position: 6% 55%;
            background-size: 15%;
            background-color: #085189;
          }
          li.active{
            background-color: #0084EA;

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
    .switchNav {
      height: calc(100% - 80px);
      // margin-top: 10px;

    }
    .ant-table-bordered .ant-table-thead>tr>th,
    .ant-table-bordered .ant-table-tbody>tr>td,
    .ant-table-small.ant-table-bordered .ant-table-thead > tr > th.ant-table-row-cell-last, .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:last-child,
    .ant-table-small.ant-table-bordered .ant-table-thead > tr > th.ant-table-row-cell-last, .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:last-child{
      border-right: 1px solid rgba(10, 133, 255, 0.8);
      color: #fff;
    }
    .ant-table-small.ant-table-bordered .ant-table-thead > tr > th.ant-table-row-cell-last, .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:first-child,
    .ant-table-small.ant-table-bordered .ant-table-thead > tr > th.ant-table-row-cell-last, .ant-table-small.ant-table-bordered .ant-table-tbody > tr > td:first-child{
      border-left: 1px solid rgba(10, 133, 255, 0.8);
    }
    .ant-table-tbody>tr>td ,
    .ant-table-small > .ant-table-content .ant-table-placeholder, .ant-table-small > .ant-table-content .ant-table-row:last-child td{
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
    .ant-table-tbody{
      tr:hover{
        background: transparent !important;
      }
      tr {
        th,
        td {
          color: #FFFFFF;
          text-align: center;
        }
      }
    }
    .ant-table-small.ant-table-bordered .ant-table-content{
      border-right:transparent;
    }
    .ant-table-small{
      border:transparent !important;
    }
    .ant-table-thead > tr > th{
      border-bottom:transparent;
    }
    .ant-table-small > .ant-table-content > .ant-table-body{
      margin: 0;
    }
    .ant-table-placeholder{
      background: transparent !important;
      color: #fff;
    }
    .ant-empty-normal .ant-empty-image{
      height: 0;
    }
    .ant-empty-normal{
      color: #fff;
    }

  }
</style>
