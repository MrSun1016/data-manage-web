<!--
 * @Description: 传入record数据，通过判断record.type，来渲染对应的组件
 * @Author: kcz
 * @Date: 2020-01-02 22:41:48
 * @LastEditors: kcz
 * @LastEditTime: 2020-10-28 22:44:09
 -->
<template>
  <a-form-item
    v-if="
      !(record.options.hidden === true) &&
        [
          'input',
          'textarea',
          'date',
          'time',
          'number',
          'radio',
          'checkbox',
          'select',
          'rate',
          'switch',
          'slider',
          'uploadImg',
          'uploadFile',
          'cascader',
          'treeSelect'
        ].includes(record.type)
    "
    :label="record.label"
    :label-col="formConfig.layout === 'horizontal' ? formConfig.labelCol : {}"
    :wrapper-col="
      formConfig.layout === 'horizontal' ? formConfig.wrapperCol : {}
    "
  >
    <!-- 单行文本 -->
    <a-input
      :style="`width:${record.options.width}`"
      v-if="record.type === 'input'"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :placeholder="record.options.placeholder"
      :type="record.options.type"
      :allowClear="record.options.clearable"
      :maxLength="record.options.maxLength"
      @change="handleChange($event.target.value, record.model)"
      v-decorator="[
        record.model, // input 的 name
        {
          initialValue: record.options.defaultValue, // 默认值
          rules: record.rules // 验证规则
        }
      ]"
    />
    <!-- 多行文本 -->
    <a-textarea
      :style="`width:${record.options.width}`"
      v-else-if="record.type === 'textarea'"
      :autoSize="{
        minRows: record.options.minRows,
        maxRows: record.options.maxRows
      }"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :placeholder="record.options.placeholder"
      :allowClear="record.options.clearable"
      :maxLength="record.options.maxLength"
      :rows="4"
      @change="handleChange($event.target.value, record.model)"
      v-decorator="[
        record.model, // input 的 name
        {
          initialValue: record.options.defaultValue, // 默认值
          rules: record.rules // 验证规则
        }
      ]"
    />

    <!-- 日期选择 -->
    <KDatePicker
      v-else-if="record.type === 'date'"
      :record="record"
      :parentDisabled="disabled"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model, // input 的 name
        {
          initialValue: record.options.range
            ? record.options.rangeDefaultValue
            : record.options.defaultValue, // 默认值
          rules: record.rules // 验证规则
        }
      ]"
    />
    <!-- 时间选择 -->
    <KTimePicker
      v-else-if="record.type === 'time'"
      :record="record"
      :parentDisabled="disabled"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model, // input 的 name
        {
          initialValue: record.options.defaultValue, // 默认值
          rules: record.rules // 验证规则
        }
      ]"
    />
    <!-- 数字输入框 -->
    <a-input-number
      v-else-if="record.type === 'number'"
      :style="`width:${record.options.width}`"
      :min="
        record.options.min || record.options.min === 0
          ? record.options.min
          : -Infinity
      "
      :max="
        record.options.max || record.options.max === 0
          ? record.options.max
          : Infinity
      "
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :step="record.options.step"
      :precision="
        record.options.precision > 50 ||
          (!record.options.precision && record.options.precision !== 0)
          ? null
          : record.options.precision
      "
      :placeholder="record.options.placeholder"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 单选框 -->
    <!-- :options=" record.options.dynamic===1&&record.options.options || record.options.dynamic===2&&record.options.dictCode&&dictOption[record.options.dictCode]||record.dynamicList" -->

    <a-radio-group
      v-else-if="record.type === 'radio'"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :placeholder="record.options.placeholder"
      @change="handleChange($event.target.value, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    >
      <template v-if="record.options.dynamic===1">
        <a-radio v-for="(item,index) in record.options.options" :key="index" :value="item.value">{{ item.label }}</a-radio>
      </template>
      <template v-if="record.options.dynamic===2&&record.options.dictCode">
        <a-radio v-for="(item,index) in dictOption[record.options.dictCode]" :key="index" :value="item.value">{{ item.label||item.title||item.text }}</a-radio>
      </template>
      <template v-if="record.options.dynamic===3">
        <a-radio v-for="(item,index) in dynamicObject[record.key]" :key="index" :value="item[record.options.props.value]">{{ item[record.options.props.label] }}</a-radio>
      </template>
      <!-- <a-radio  :value="1"></a-radio> -->

    </a-radio-group>
    <!-- 多选框 -->
    <a-checkbox-group
      v-else-if="record.type === 'checkbox'"

      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :placeholder="record.options.placeholder"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    >
      <template v-if="record.options.dynamic===1">
        <a-checkbox v-for="(item,index) in record.options.options" :key="index" :value="item.value">{{ item.label }}</a-checkbox>
      </template>
      <template v-if="record.options.dynamic===2&&record.options.dictCode">
        <a-checkbox v-for="(item,index) in dictOption[record.options.dictCode]" :key="index" :value="item.value">{{ item.label || item.title || item.text }}</a-checkbox>
      </template>
      <template v-if="record.options.dynamic===3">
        <a-checkbox v-for="(item,index) in dynamicObject[record.key]" :key="index" :value="item[record.options.props.value]">{{ item[record.options.props.label] }}</a-checkbox>
      </template>
    </a-checkbox-group>
    <!-- 评分 -->
    <a-rate
      v-else-if="record.type === 'rate'"
      :count="record.options.max"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :placeholder="record.options.placeholder"
      :allowHalf="record.options.allowHalf"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 下拉选框 -->
    <a-select
      :style="`width:${record.options.width}`"
      v-else-if="record.type === 'select'"
      :placeholder="record.options.placeholder"
      :showSearch="record.options.showSearch"
      :filterOption="(searchVal, treeNode)=>filterOption(searchVal, treeNode,record.options.props.label)"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :allowClear="record.options.clearable"
      :mode="record.options.multiple ? 'multiple' : ''"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]" >
      <template v-if="record.options.dynamic===1">
        <a-select-option v-for="(item,index) in record.options.options" :key="index" :value="item.value" :label="item.label">{{ item.label }}</a-select-option>
      </template>
      <template v-if="record.options.dynamic===2&&record.options.dictCode">
        <a-select-option v-for="(item,index) in dictOption[record.options.dictCode]" :key="index" :value="item.value" :label="item.label||item.title||item.text">{{ item.label||item.title||item.text }}</a-select-option>
      </template>
      <template v-if="record.options.dynamic===3">
        <a-select-option v-for="(item,index) in dynamicObject[record.key]" :key="index" :value="item[record.options.props.value]" :label="item[record.options.props.label]" >{{ item[record.options.props.label] }}</a-select-option>
      </template>

    </a-select>
    <!-- 开关 -->
    <a-switch
      v-else-if="record.type === 'switch'"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          valuePropName: 'checked',
          rules: record.rules
        }
      ]"
    />
    <!-- 滑块 -->
    <div
      v-else-if="record.type === 'slider'"
      :style="`width:${record.options.width}`"
      class="slider-box"
    >
      <div class="slider">
        <a-slider
          :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
          :min="record.options.min"
          :max="record.options.max"
          :step="record.options.step"
          @change="handleChange($event, record.model)"
          v-decorator="[
            record.model,
            {
              initialValue: record.options.defaultValue,
              rules: record.rules
            }
          ]"
        />
      </div>
      <div class="number" v-if="record.options.showInput">
        <a-input-number
          style="width:100%"
          :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
          :min="record.options.min"
          :max="record.options.max"
          :step="record.options.step"
          @change="handleChange($event, record.model)"
          v-decorator="[
            record.model,
            {
              initialValue: record.options.defaultValue
            }
          ]"
        />
      </div>
    </div>
    <!-- 上传图片 -->
    <UploadImg
      v-else-if="record.type === 'uploadImg1'"
      :style="`width:${record.options.width}`"
      :parentDisabled="disabled"
      :record="record"
      :config="config"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 上传图片 -->
    <j-upload
    v-else-if="record.type === 'uploadImg'"
    :style="`width:${record.options.width}`"
    fileType='image'
    :buttonVisible="false"
    :number="record.options.limit"
    :bizPath="domianURL"
    v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 上传文件 -->
    <UploadFile
      v-else-if="record.type === 'uploadFile1'"
      :style="`width:${record.options.width}`"
      :record="record"
      :config="config"
      :dynamicData="dynamicData"
      :dictOption="dictOption"
      :parentDisabled="disabled"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 上传文件 -->
    <j-upload
    v-else-if="record.type === 'uploadFile'"
    :style="`width:${record.options.width}`"
    fileType="file"
    :buttonVisible="true"
    :number="record.options.limit"
    :bizPath="domianURL"
    v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 树选择器 -->
    <a-tree-select
      v-else-if="record.type === 'treeSelect'"
      :style="`width:${record.options.width}`"
      :placeholder="record.options.placeholder"
      :multiple="record.options.multiple"
      :showSearch="record.options.showSearch"
      :replaceFields="{children:record.options.props.children, key:record.options.props.value, value: record.options.props.value, title: record.options.props.label}"
      :filterTreeNode="(searchVal, treeNode)=>fillterFUN(searchVal, treeNode,record.options.props.label)"
      :treeCheckable="record.options.treeCheckable"
      :treeData="dynamicObject[record.key]?dynamicObject[record.key]:[]"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :allowClear="record.options.clearable"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 级联选择器 -->
    <a-cascader
      v-else-if="record.type === 'cascader'"
      :style="`width:${record.options.width}`"
      :placeholder="record.options.placeholder"
      :showSearch="record.options.showSearch"
      :field-names="{ label: record.options.props.label, value: record.options.props.value, children: record.options.props.children }"
      :options="dynamicObject[record.key]?dynamicObject[record.key]:[]"
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      :allowClear="record.options.clearable"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
  </a-form-item>
  <!-- 可隐藏label -->
  <a-form-item
    v-else-if="
      !(record.options.hidden === true) &&
        (record.type === 'batch' || record.type === 'editor')
    "
    :label="!record.options.showLabel ? '' : record.label"
    :label-col="
      formConfig.layout === 'horizontal' && record.options.showLabel
        ? formConfig.labelCol
        : {}
    "
    :wrapper-col="
      formConfig.layout === 'horizontal' && record.options.showLabel
        ? formConfig.wrapperCol
        : {}
    "
  >
    <!-- 动态表格 -->
    <KBatch
      v-if="record.type === 'batch'"
      ref="KBatch"
      :style="`width:${record.options.width}`"
      :record="record"
      :config="config"
      :parentDisabled="disabled"
      :dynamicData="dynamicData"
      :dictOption="dictOption"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />
    <!-- 富文本编辑器 -->
    <KEditor
      v-else
      ref="KEditor"
      :style="`width:${record.options.width}`"
      :record="record"
      :parentDisabled="disabled"
      :dynamicData="dynamicData"
      :dictOption="dictOption"
      @change="handleChange($event, record.model)"
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
    />

  </a-form-item>
  <!-- button按钮 -->
  <a-form-item
    v-else-if="!(record.options.hidden === true) && record.type === 'button'"
  >
    <a-button
      :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
      @click="
        record.options.handle === 'submit'
          ? false
          : record.options.handle === 'reset'
            ? $emit('handleReset')
            : dynamicData[record.options.dynamicFun]
              ? dynamicData[record.options.dynamicFun]()
              : false
      "
      :type="record.options.type"
      :html-type="record.options.handle === 'submit' ? 'submit' : undefined"
      v-text="record.label"
    ></a-button>
  </a-form-item>
  <!-- alert提示 -->
  <a-form-item
    v-else-if="!(record.options.hidden === true) && record.type === 'alert'"
  >
    <a-alert
      :message="record.label"
      :description="record.options.description"
      :type="record.options.type"
      :showIcon="record.options.showIcon"
      :closable="record.options.closable"
      :banner="record.options.banner"
    />
  </a-form-item>
  <!-- 文本 -->
  <a-form-item
    v-else-if="!(record.options.hidden === true) && record.type === 'text'"
  >
    <div :style="{ textAlign: record.options.textAlign }">
      <label
        :class="{ 'ant-form-item-required': record.options.showRequiredMark }"
        v-text="record.label"
      ></label>
    </div>
  </a-form-item>
  <!-- html -->
  <div
    v-else-if="!(record.options.hidden === true) && record.type === 'html'"
    v-html="record.options.defaultValue"
  ></div>
  <!-- 自定义组件 -->
  <customComponent
    v-else-if="customList.includes(record.type)"
    :record="record"
    :disabled="preview?disabled || record.options.disabled:!required.includes(record.model)"
    :dynamicData="dynamicData"
    :dictOption="dictOption"
    @change="handleChange($event, record.model)"
    :formConfig="formConfig"
  />

  <div v-else>
    <!-- 分割线 -->
    <a-divider
      v-if="
        record.type === 'divider' &&
          record.label !== '' &&
          record.options.orientation
      "
      :orientation="record.options.orientation"
    >{{ record.label }}</a-divider
    >
    <a-divider v-else-if="record.type === 'divider' && record.label !== ''">{{
      record.label
    }}</a-divider>
    <a-divider v-else-if="record.type === 'divider' && record.label === ''" />
    
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 */
// import moment from "moment";
import customComponent from './customComponent'

import KBatch from '../KBatch'
import KEditor from '../KEditor'
import UploadFile from '../UploadFile'
import UploadImg from '../UploadImg'
import KDatePicker from '../KDatePicker'
import KTimePicker from '../KTimePicker'
import  JUpload from './JUpload'
export default {
  name: 'KFormItem',
  props: {
    // 表单数组
    record: {
      type: Object,
      required: true
    },
    // form-item 宽度配置
    formConfig: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => ({})
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    },
    dictOption: {
      type: Object,
      default: () => ({})
    },
    dynamicObject: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required:{
      type: Array,
      default: () => []
    },
    preview:{
      type: Boolean,
      default: true
    },
    
    

  },
  data(){
    return{
      domianURL:window._CONFIG['domianURL'],
    }
  },
  
  components: {
    KBatch,
    KEditor,
    UploadImg,
    UploadFile,
    KDatePicker,
    KTimePicker,
    customComponent,
    JUpload,
  },
  computed: {
    customList() {
      if (window.$customComponentList) {
        return window.$customComponentList.map(item => item.type)
      } else {
        return []
      }
    }
  },
  methods: {
    validationSubform() {
      // 验证动态表格
      if (!this.$refs.KBatch) return true
      return this.$refs.KBatch.validationSubform()
    },
    handleChange(value, key) {
      // change事件
      this.$emit('change', value, key)
    },
    fillterFUN (searchVal, treeNode, name) {
      return treeNode.data.props[name].includes(searchVal)
    },
    filterOption (searchVal, option, name) {
      return option.componentOptions.propsData.label.includes(searchVal)
    }
  }
}
</script>
<style lang="less" scoped>
.slider-box {
  display: flex;
  > .slider {
    flex: 1;
    margin-right: 16px;
  }
  > .number {
    width: 70px;
  }
}
</style>
