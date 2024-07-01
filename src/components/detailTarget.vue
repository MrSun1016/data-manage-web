<template>
  <div :style="{ width: '100%', border: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff' }">
    <a-form>
      <a-form-item label="指标名称：" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span>{{ form.indexName }}</span>
      </a-form-item>
      <a-form-model-item label="指标类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-radio-group v-model="form.indexType" :disabled="true">
          <a-radio value="0"> 单一指标 </a-radio>
          <a-radio value="1"> 复合指标 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="来源指标" :labelCol="labelCol" :wrapperCol="wrapperCol" :hidden="form.indexType==0">
        <a-select v-model="form.relIndexCode" :disabled="true" mode="multiple">
          <a-select-option v-for="(val, index) in targetlistData" :key="index" :value="val.indexCode">
            {{ val.indexName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="业务域" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-tree-select
          v-model="form.domainId"
          style="width: 100%"
          :tree-data="domaintreeData"
           tree-default-expand-all
           :disabled=true
        />
      </a-form-model-item>
      <a-form-item label="单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span>{{ form.indexUnit }}</span>
      </a-form-item>
      <a-form-item label="更新频率" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span>{{ form.updateFrequency }}</span>
      </a-form-item>
      <a-form-item label="业务口径" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <span>{{ form.bsFormula }}</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getdomaintree, gettargetlist, savetargeinfo, updatetargeinfo } from '@/api/api'
export default {
  name: 'detailModal',
  // components: {Icons},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    detailform: {
      type: Object,
      default: false,
    },
  },
  watch: {
    detailform(newVal) {
      this.form = newVal
       this.showData()
    },
  },
  data() {
    return {
      targetlistData: [],
      domaintreeData: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      form: {},
    }
  },
  created() {
    this.showData()
    this.form = this.detailform
  },
  methods: {
    async showData() {
      let res1 = await gettargetlist({})
      if (res1.success) {
        this.targetlistData = res1.body
      }
      let res2 = await getdomaintree()

      if (res2.success) {
        this.domaintreeData = this.getTreeData(res2.body).data
      }
    },
    // 原始树数据结构调整
    getTreeData(data, allnode, treeI) {
      if (allnode) {
        treeI++
      } else {
        allnode = []
        treeI = 0
      }
      data.map((item, index) => {
        Object.assign(item, { title: item.domainName, key: item.domainId, value: item.domainId })
        if (treeI == 2) {
          Object.assign(item, { type: 'business' })
        }
        allnode.push({ title: item.domainName, key: item.domainId, value: item.domainId })
        if (item.children) {
          Object.assign(allnode, this.getTreeData(item.children, allnode, treeI).allnode)
        } else {
        }
      })
      let backData = {
        data,
        allnode,
      }
      return backData
    },
   
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = 700
      }
    },
  },
}
</script>

<style scoped>
</style>