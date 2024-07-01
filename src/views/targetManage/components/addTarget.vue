<template>
  <a-drawer
    :title="title"
    :width="drawerWidth"
    @close="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading"
  >
    <div :style="{ width: '100%', border: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff' }">
      <a-spin :spinning="confirmLoading">
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="指标名称" prop="indexName">
            <a-input v-model="form.indexName" />
          </a-form-model-item>
          <a-form-model-item label="指标类型" prop="indexType">
            <a-radio-group v-model="form.indexType" @change="onChangeRadio">
              <a-radio value="0"> 单一指标 </a-radio>
              <a-radio value="1"> 复合指标 </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="来源指标" prop="relIndexCode" :hidden="showrelIndexCode">
              <a-tree-select
              v-model="form.relIndexCode"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="targetlistData"
              tree-default-expand-all
                :multiple="true"
            />
          </a-form-model-item>
          <a-form-model-item label="业务域" prop="domainId">
            <a-tree-select
              v-model="form.domainId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="domaintreeData"
              tree-default-expand-all
            />
          </a-form-model-item>
          <a-form-model-item label="单位" prop="indexUnit">
            <a-select v-model="form.indexUnit">
              <a-select-option v-for="(val, index) in indexUnitSD" :key="index" :value="val.id">
                {{ val.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="更新频率" prop="updateFrequency">
            <a-select v-model="form.updateFrequency">
              <a-select-option v-for="(val, index) in updateFrequencySD" :key="index" :value="val.id">
                {{ val.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="业务口径：" prop="bsFormula">
            <a-textarea v-model="form.bsFormula" />
          </a-form-model-item>
        </a-form-model>
      </a-spin>
      <a-row :style="{ textAlign: 'right' }">
        <a-button :style="{ marginRight: '8px' }" @click="handleCancel"> 关闭 </a-button>
        <a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
      </a-row>
    </div>
  </a-drawer>
</template>

<script>
import { getdomaintree, getdomainAssetTree, savetargeinfo, updatetargeinfo } from '@/api/api'
// import Icons from './icon/Icons'
import pick from 'lodash.pick'
import { config } from 'vuedraggable'
import { DictSelect } from '@/mixins/DictSelect.js'
// const treeData = [
//   {
//     title: '商管',
//     key: 'sg',
//     value: 'sg',
//     disabled: true,
//     children: [
//       {
//         title: '财务',
//         key: 'cw',
//         value: 'cw',
//       },
//       {
//         title: '运营',
//         key: 'yy',
//         value: 'yy',
//       },
//       {
//         title: '管理',
//         key: 'gl',
//         value: 'gl',
//       },
//       {
//         title: '拓展',
//         key: 'tz',
//         value: 'tz',
//       },
//     ],
//   },
//   {
//     title: '房开',
//     key: 'fk',
//     value: 'fk',
//     disabled: true,
//     children: [
//       {
//         title: '物业',
//         key: 'wy',
//         value: 'wy',
//       },
//     ],
//   },
// ]
export default {
  name: 'addTarget',
  mixins: [DictSelect],
  data() {
    return {
      drawerWidth: 700,
      showrelIndexCode: true,
      domaintreeData: [],
      targetlistData: [],
      title: '操作',
      visible: false,
      disableSubmit: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      // 表单数据
      form: {},
      // 校验规则
      rules: {
        indexName: [{ required: true, message: '请填写指标名称!' }],
        indexType: [{ required: true, message: '请选择来源类型!' }],
        domainId: [{ required: true, message: '请选择业务域!' }],
        indexUnit: [{ required: true, message: '请选择单位!' }],
        updateFrequency: [{ required: true, message: '请选择更新频率!' }],
        bsFormula: [{ required: true, message: '请填写业务口径!' }],
      },
    }
  },
  created() {
 
  },
 
  methods: {
    async gettreedataAPIpage() {
      let res = await getdomaintree()
      if (res.success) {
        this.domaintreeData = this.getTreeData(res.body).data
      }
    },
    async getdomainAssetTreeAPI() {
      let res = await getdomainAssetTree()
      if (res.success) {
        this.targetlistData = res.body
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
        Object.assign(item, { title: item.domainName, key: item.domainId, value: item.domainId})
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
    add(record, treeData) {
      this.gettreedataAPIpage()
    this.getdomainAssetTreeAPI()
      this.edit(record)
    },
    edit(record, treeData) {
      this.gettreedataAPIpage()
    this.getdomainAssetTreeAPI()
      if (record.indexType == '0') {
        this.showrelIndexCode = true
      } else {
        this.showrelIndexCode = false
      }
       if (!Array.isArray(record.relIndexCode)&&record.relIndexCode!=undefined) {
            record.relIndexCode = record.relIndexCode.split(",");
          } 
   
      this.treeData = treeData
      this.form = record
      this.visible = true
    },
    close() {
      this.$emit('close')
      this.$emit('queryCondition')
      this.disableSubmit = false
      this.visible = false
    },
    handleOk() {
      const that = this
      that.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let formData = that.form //JSON.parse(JSON.stringify(that.form))
          var relA = formData.relIndexCode
          if (Array.isArray(relA)) {
            formData.relIndexCode = relA.join(',')
          } 
          if (!formData.id) {
            formData.enables = '0'

            savetargeinfo(formData)
              .then((res) => {
                that.$message.success('保存成功')
                that.confirmLoading = false
                that.close()
              })
              .catch((rej) => {
                // that.$message.warning(rej)
                that.confirmLoading = false
              })
          } else {
            updatetargeinfo(formData)
              .then((res) => {
                that.$message.success('保存成功')
                that.confirmLoading = false
                that.close()
              })
              .catch((rej) => {
                // that.$message.warning(rej)
                that.confirmLoading = false
              })
          }
        } else {
          that.$message.error('请检查你填的类型以及信息是否正确！')
          return false
        }
      })
    },
    handleCancel() {
      this.close()
    },
    onChangeRadio(e) {
      if (e.target.value == '0') {
        this.form.relIndexCode = ''
        this.showrelIndexCode = true
      } else {
        this.showrelIndexCode = false
      }
    },
  },
}
</script>

<style scoped>
</style>