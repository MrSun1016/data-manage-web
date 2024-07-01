<template>
  <div class='topSelectPage'>
    <div class="page-title">
      <slot name="title"></slot>
      <span v-if="title">{{title.value}} <span v-if='title.children'>><span style="color:#078AF4">{{title.children.value}}</span></span>  </span> 
      </div>
    <!-- 选项卡 -->
    <div class="filtrateBox">
      <!-- 选项卡插槽 -->
      <!-- <slot name="radio"></slot> -->
      <a-form layout="inline" :form="form" >
      <a-form-item v-for="(item,index) in selectData" 
      :key='index'
      style='display:inline-block'
      :class="[item.selectName?'filtrate':'notitle','obj'+item.types]"
      >
          <!-- 筛选项 -->
          <span v-if="item.selectName" class="indexName">
            {{item.selectName}}
          </span>
          <!-- 筛选框——下拉框 -->
          <a-select v-if="item.types=='select'"
            style="width: 100px"
            v-decorator="[
            item.indicator,{ initialValue:item.option&&item.option.length>0?item.option[0].value:''  }]"
            :placeholder="item.placeholder||'请选择'"  @change="(value,option) => onChange(item.indicator)" >
            <a-select-option v-for="(ite,indexof) in item.option"
              :key='indexof'
              :value="ite.value">
              {{ite.title}}
            </a-select-option>
          </a-select>
          <a-select v-if="item.types=='yearPicker'" 
          style="width: 100px"
          v-decorator="[
            item.indicator,{ initialValue:moment().format('YYYY')}]"
          :placeholder="item.placeholder||'请选择'"  @change="(value,option) => onChange(item.indicator)" >
            <a-select-option v-for="(ite,inde) in 2021-2017"
              :key='inde'
              :value="2021-inde">
              {{2021-inde}}
            </a-select-option>
          </a-select>
          <!-- 树节点 -->
          <a-tree-select
          v-if="item.types=='treeSelect'"
          v-decorator="[
            item.indicator,{ initialValue:item.defaultValue||[]}]"
          style="width: 100px"
          :tree-data="item.treeData||[]"
          :placeholder="item.placeholder||'请选择'"
          :disable-branch-nodes="true"
          @select="(node)=>selectTree(node,item.treeData,item.indicator)"
          tree-default-expand-all
        >
        </a-tree-select>
          <!-- 筛选框——时间框 -->
          <a-month-picker 
          v-if="item.types=='monthPicker'"
          style="width: 100px;"
          :allowClear='false'
            v-decorator="[
            item.indicator,{initialValue:moment(moment().subtract(moment().subtract('day').format('DD')>1?1:2,'months').format('YYYY-MM'), 'YYYY-MM') }]"
          @change="onChange(item.indicator)" 
          :placeholder="item.placeholder||'请选择日期'"  :disabled-date="disabledDate"  />
          <!-- 筛选框——搜索框 -->
          <a-input-search
            v-if="item.types=='search'"
            v-decorator="[
            item.indicator]"
            @change="search(item.indicator)" :placeholder="item.placeholder||'请输入搜索'"   @search="search(item.indicator)"  />
          <!-- 筛选框——单选按钮 -->
          <a-radio-group 
            v-decorator="[
            item.indicator,{initialValue:item.option&&item.option.length>0?item.option[0].value:''  }]"
            @change="onChange(item.indicator)" size="large" button-style="solid" v-if="item.types=='radio'">
            <a-radio-button  v-for="(price,indexOf) in item.option||[]"
              :key="indexOf"
              :value="price.value"
            >
              {{price.title}}
            </a-radio-button>
          </a-radio-group>
          <!-- 季度 -->
          <a-cascader
            v-if="item.types=='quarter'"
            style='width:100px'
            v-decorator="[
            item.indicator,{initialValue:item.defaultValue}]"
            @change="onChange(item.indicator,'quarter')"
            :options="item.options||quarterData()" :placeholder="item.placeholder||'请选择'"  />
            
      </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import {throttle} from '@/utils/util'

const oldYear =2017
const thisYear = new Date().getFullYear();

export default {
  props:{
    title:{
      type:Object,
      default:() => {}
    },
    selectData:{
      type: Array,
        default: () => []
    }
  },
  data(){
    return{
      thisYear : new Date().getFullYear(),
      defaultValMonthOpera:undefined,
      isopen:false,
      value:['','','',''],
      formData:{},
      form: this.$form.createForm(this, { name: 'topSelect' }),
    }
  },
  computed:{
    
  },
  methods: {
    moment,
    quarterData(){
      const year = new Date().getFullYear()
      let list =[]
      for(let i=0;i<year-2010;i++){
        list.push(
          {
            value: year-i,
            label: `${year-i}年`,
            children: [
              {
                value: `${year-i}03`,
                label: '第一季度',
              },
              {
                value: `${year-i}06`,
                label: '第二季度',
              },
              {
                value: `${year-i}09`,
                label: '第三季度',
              },
              {
                value: `${year-i}12`,
                label: '第四季度',
              },
            ]
          }
        )
      }
      return  list
    },
    monthChange(){
      this.form.month=this.form.month.format('YYYY-MM')
      this.$emit('conditionChange',this.form)
    },
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    onChangeMonthOpera(value,dateString){
      this.searchMonthOpera = dateString;
    },
    throttle: throttle((vm=this,type) => {
      console.log(vm)
      vm.onChange(type)
    // do something，这里this不指向Vue实例,用vm传入
  }, 500),
    
    search(type){
      this.throttle(this,type)
      // this.onChange(type)
    },
    onChange(type,control=''){
      
      if(control=='quarter'){
        this.quarterData()
      }
     
      this.$nextTick(()=>{
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('mySelect',{...values,...this.formData},type)
          }
        });
      })
      
      
    },
    disabledDate(current) {
      return current && current > moment().endOf('day');
    },
    selectTree(nodeValue,treeData,indicator){
      
      this.setTitle(nodeValue,treeData,indicator)
      this.onChange(indicator)
    },
    setTitle(nodeValue,treeData,indicator){
			this.getSelectedItem(nodeValue, treeData)
      this.$nextTick(()=>{
        this.formData[indicator]=nodeValue
        this.form.setFieldsValue({[indicator] : this.defaultTitle})
      })
    },
    getSelectedItem(value, data, title){
      let defaultTitle= title;
			for(let item of data){
				//在根节点找到对应选项
				if (!title && item.value == value ) {
          this.defaultTitle = item.title
          break
				}else if(!title && item.children){ //根节点未找到继续递归查找
          defaultTitle = item.title 
          this.getSelectedItem(value, item.children, defaultTitle);
				}
				
				//在子节点找到对应选项
				if (title && item.value == value&&!item.children){
            this.defaultTitle = title + '-' + item.title
            break
				}else if(title && item.children){ //当前子节点未找到继续递归向下查找
          defaultTitle = title + '-' + item.title
          this.getSelectedItem(value, item.children, defaultTitle);
				}
      }
      return defaultTitle
		},
  },
};
</script>

<style lang="less" scoped>
@media screen and ( max-width:1910px) {
  .topSelectPage{
    width:100%; 
    height: 36px;
    line-height: 36px;
   
    display: flex;
    justify-content: space-between;
    // background-color: #f7f9fa;
    margin: 0 0 5px 0;
    .page-title{
      display:inline-block;
      font-size: 20px;
      font-weight: normal;
      color: #475769;
      line-height: 36px;
      >span{
        font-weight: 500;
        font-size: 20px;
      }
    }

    /deep/ .ant-select-selection__rendered {
      line-height: 29px;
    }
    .filtrateBox{

    }
    

  }
  /deep/  .ant-radio-group-large .ant-radio-button-wrapper{
    height: 36px;
    line-height: 36px;
  }
  /deep/ .ant-form-item-control{
      line-height: 36px;
    }
  //选项卡容器
  .filtrateBox{
    form{
      display: flex;
    }
    // width:918px;
    // float: right;
    // margin-right: 20px;
    /deep/ .ant-form-item{
      margin-right: 0px;
    }
    /deep/ .ant-calendar-input {
      font-size: 13px;
      border:0;
    }
    /deep/ .ant-calendar-picker-clear{
      /deep/.ant-calendar-picker-icon{
        right: 2px;
      }
    }
   /deep/ .ant-input:hover{
      border:0;
      box-shadow: 0 0 0 0px rgb(24 144 255 / 20%);
      // border-right-width: 1px !important;
    }
    /deep/.ant-input:focus {
      border:0;
      -webkit-appearance:  none ;
      box-shadow: 0 0 0 0px rgb(255,255,255);
    
    }
    /deep/ .ant-select-selection--single {
      height: 29px;
    }
    /deep/ .ant-select-selection{
      border:0;
      box-shadow: 0 0 0 0px rgb(255,255,255);
    }
    /deep/.ant-select-selection:focus{
      border:0;
      -webkit-appearance:  none ;
    //  box-shadow: 0 0 0 2px rgb(255,255,255);
   
    }
    
  }
  // 单个选项卡-有标题
  .filtrate{
    width:185px;
    height:36px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #D3DCE6;
    padding:0px 0px 10px 9px;
    float: left;
    margin-left: 8px;
    // 指标名
    /deep/ .indexName{
      width: 81px;
      height: 22px;
      font-size: 13px;
      font-weight: normal;
      color: #8493A6;
      line-height: 22px;
      border-right:1px solid #D3DCE6;
      padding-right:14px;
    }
    // .filtrate-title{
    //   width: 81px;
    //   height: 22px;
    //   font-size: 16px;
    //   font-weight: normal;
    //   color: #8493A6;
    //   line-height: 22px;
    //   border-right:1px solid #D3DCE6;
    //   padding-right:9px;
    // }
    // 下拉框
    /deep/ div:nth-child(2){
      
      width: 100px;
      margin: 0 0 0 2px;
      /deep/ div:nth-child(1){
        border: none;
        font-size: 13px;
        /deep/ span:nth-child(2){
          right:9px;
          color:#475769;
        }
      }
      /deep/ span:nth-child(2){
        color:#0D0D1E;
      }
    }
    /deep/ .ant-input-search{
      width: 100px;
      /deep/ .ant-input-suffix{
        right: 8px;
      }
    }
    // 时间框
    /deep/ span:nth-child(2){
      // margin-top: -2px;
      >div:nth-child(1){
        >input:nth-child(1){
          border: none;
          font-size: 13px;
          color:#475769;
          padding:0 9px 0 11px;
        }
      }
    }
  }
  //单个选项卡-无标题
  .notitle{
    float: left;
    >div{
      >label{
        width:80px;
        height: 36px;
        text-align: center;
        line-height: 36px;
      }
    }
  }

  /deep/ .ant-input {
      font-size: 13px;
      border:0;
    }
  /deep/ li.ant-select-tree-treenode-disabled > span:not(.ant-select-tree-switcher), li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper, li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper span{
      color: rgba(0, 0, 0, 0.65) !important;
  } 
  /deep/ .ant-cascader-picker{
    width: 110px;
  }
   /deep/ .ant-select-arrow{
    right: 4px;
  }
  /deep/ .ant-calendar-picker-icon{
    right: 4px;
  }
  /deep/ .ant-input-suffix{
    right: 4px;
  }
  // .objmonthPicker {
  //   position: fixed;
  //   top: 15px;
  //   right: 540px;
  //   z-index: 999;
  // }
  // .objyearPicker{
  //   position: fixed;
  //   top: 15px;
  //   right: 540px;
  //   z-index: 999;
  // }
}
@media screen and ( min-width:1910px) {
   .topSelectPage{
    width:100%; 
    height: 40px;
    line-height: 40px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    // background-color: #f7f9fa;
    margin: 0 0 5px 0;
    .page-title{
      display:inline-block;
      font-size: 20px;
      font-weight: normal;
      color: #475769;
      line-height: 40px;
      >span{
        font-weight: 500;
        font-size: 20px;
      }
    }
    .filtrateBox{
      
    }
    

  }
  //选项卡容器
  .filtrateBox{
    form{
      display: flex;
    }
    // width:918px;
    // float: right;
    // margin-right: 20px;
     /deep/ .ant-form-item{
      margin-right: 0px;
    }
   
     /deep/ .ant-calendar-input {
      font-size: 13px;
      border:0;
    }
   /deep/ .ant-input:hover{
      border:0;
      box-shadow: 0 0 0 0px rgb(24 144 255 / 20%);
      // border-right-width: 1px !important;
    }
    /deep/.ant-input:focus {
      border:0;
      -webkit-appearance:  none ;
     box-shadow: 0 0 0 2px rgb(255,255,255);
   
    }
    /deep/ .ant-select-selection{
      border:0;
      box-shadow: 0 0 0 2px rgb(255,255,255);
    }
    /deep/ .ant-select-selection--single {
      height: 29px;
    }
    /deep/.ant-select-selection:focus{
      border:0;
      -webkit-appearance:  none ;
     box-shadow: 0 0 0 2px rgb(255,255,255);
   
    }
    
  }
  /deep/ .ant-select-arrow{
    right: 4px;
  }
  /deep/ .ant-calendar-picker-icon{
    right: 4px;
  }
  /deep/ .ant-input-suffix{
    right: 4px;
  }
  // 单个选项卡-有标题
  .filtrate{
    width:205px;
    height:40px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #D3DCE6;
    padding:0px 0px 0px 9px;
    float: left;
    margin-left: 16px;
    // 指标名
    /deep/ .indexName{
      width: 81px;
      height: 22px;
      font-size: 16px;
      font-weight: normal;
      color: #8493A6;
      line-height: 22px;
      border-right:1px solid #D3DCE6;
      padding-right:14px;
    }
    // .filtrate-title{
    //   width: 81px;
    //   height: 22px;
    //   font-size: 16px;
    //   font-weight: normal;
    //   color: #8493A6;
    //   line-height: 22px;
    //   border-right:1px solid #D3DCE6;
    //   padding-right:9px;
    // }
    // 下拉框
    /deep/ div:nth-child(2){
      
      width: 100px;
      margin: 0 0 0 2px;
      /deep/ div:nth-child(1){
        border: none;
        font-size: 16px;
        /deep/ span:nth-child(2){
          right:9px;
          color:#475769;
        }
      }
      /deep/ span:nth-child(2){
        color:#0D0D1E;
      }
    }
    /deep/ .ant-input-search{
      width: 90px;
    }
    // 时间框
    /deep/ span:nth-child(2){
      // margin-top: -2px;
      >div:nth-child(1){
        >input:nth-child(1){
          border: none;
          font-size: 16px;
          color:#475769;
          padding:0 9px 0 11px;
        }
      }
    }
  }
  //单个选项卡-无标题
  .notitle{
    float: left;
    >div{
      >label{
        width:80px;
        height: 46px;
        text-align: center;
        line-height: 46px;
      }
    }
  }
  /deep/ .ant-calendar-picker-clear, .ant-calendar-picker-icon{
    right: 2px;
  }
  /deep/ .ant-input {
      font-size: 16px;
      border:0;
      margin-left: 3px;
    }
  /deep/ li.ant-select-tree-treenode-disabled > span:not(.ant-select-tree-switcher), li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper, li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper span{
      color: rgba(0, 0, 0, 0.65) !important;
  } 
  /deep/ .ant-cascader-picker{
    width: 110px;
  }
  // .objmonthPicker {
  //   position: fixed;
  //   top: 15px;
  //   right: 540px;
  //   z-index: 999;
  // }
}
</style>
<style lang="less" >
  li.ant-select-tree-treenode-disabled > span:not(.ant-select-tree-switcher), li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper, li.ant-select-tree-treenode-disabled > .ant-select-tree-node-content-wrapper span{
    color: rgba(0, 0, 0, 0.65) !important;
  } 
</style>