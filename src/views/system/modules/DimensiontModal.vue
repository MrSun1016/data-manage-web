<template>
  <a-modal
    :title="title"
    :width="800"
    :ok=false
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称"
          :hidden="false"
          hasFeedback >
          <a-input id="departName" placeholder="请输入机构/部门名称" v-decorator="['departName', validatorRules.departName ]"/>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :hidden="seen" label="上级部门" hasFeedback>
        <a-tree-select
          style="width:100%"
          :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
          :treeData="departTree"
          v-model="model.parentId"
          placeholder="请选择上级部门"
          :disabled="condition">
        </a-tree-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构类型">
          <template v-if="seen">
          <a-radio-group v-decorator="['orgCategory',validatorRules.orgCategory]" @change="orgCategoryChnge" placeholder="请选择机构类型">
            <a-radio value="1">集团</a-radio>
            <a-radio value="2">片区</a-radio>
            <a-radio value="4">水司</a-radio>
            <a-radio value="8">水厂</a-radio>
            <a-radio value="16">部门</a-radio>
          </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="['orgCategory',validatorRules.orgCategory]" @change="orgCategoryChnge" placeholder="请选择机构类型">
              <a-radio value="2">片区</a-radio>
              <a-radio value="4">水司</a-radio>
              <a-radio value="8">水厂</a-radio>
              <a-radio value="16">部门</a-radio>
            </a-radio-group>
          </template>
        </a-form-item>
        <a-form-item
          v-if="orgTypeShow"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="业务类型">
          <template>
            <a-checkbox-group
            v-decorator="['businessType',validatorRules.businessType]" placeholder="请选择业务类型">
              <a-checkbox :value="0">无</a-checkbox>
              <a-checkbox :value="1">原水</a-checkbox>
              <a-checkbox :value="2">自来水</a-checkbox>
              <a-checkbox :value="4">污水</a-checkbox>
              <a-checkbox :value="8">工程</a-checkbox>
            </a-checkbox-group>
          </template>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="联系电话">
          <a-input placeholder="请输入联系电话" v-decorator="['mobile',validatorRules.mobile]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="传真">
          <a-input placeholder="请输入传真" v-decorator="['fax', {}]"  />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址">
          <a-input placeholder="请输入地址" v-decorator="['address', {}]"  />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'departOrder',{'initialValue':0}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="简称">
          <a-textarea placeholder="请输入简称" v-decorator="['memo', {}]"  />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import { queryDimTreeList } from '@/api/api'
  import pick from 'lodash.pick'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  export default {
    name: "SysDepartModal",
    components: { ATextarea },
    data () {
      return {
        departTree:[],
        orgTypeData:[],
        phoneWarning:'',
        departName:"",
        title:"操作",
        seen:false,
        visible: false,
        condition:true,
        disableSubmit:false,
        model: {},
        menuhidden:false,
        menuusing:true,
        orgTypeShow:false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
          departName:{rules: [{ required: true, message: '请输入机构/部门名称!' }]},
          orgCode:{rules: [{ required: true, message: '请输入机构编码!' }]},
          mobile:{rules: [{validator:this.validateMobile}]}
        },
        url: {
          add: "/sys/sysDepart/addDim",
        },
        dictDisabled:true,
      }
    },
    created () {
    },
    methods: {
      loadTreeData(){
        var that = this;
        queryDimTreeList().then((res)=>{
          if(res.success){
            that.departTree = [];
            for (let i = 0; i < res.result.length; i++) {
              let temp = res.result[i];
              that.departTree.push(temp);
            }
          }

        })
      },
      add (depart) {
        if(depart){
          this.seen = false;
          this.dictDisabled = false;
        }else{
          this.seen = true;
          this.dictDisabled = true;
        }
        this.edit(depart);
      },
      edit (record) {
          this.form.resetFields();
          this.model = Object.assign({}, {});
          this.visible = true;
          this.loadTreeData();
          this.model.parentId = record!=null?record.toString():null;
          // let orgTypeList =[]
          // if(record.orgType){
          //   const orgType =Number(record.orgType)
          //   if(orgType&8){
          //     orgTypeList.push(8)
          //   }
          //   if(orgType&4){
          //     orgTypeList.push(4)
          //   }
          //   if(orgType&2){
          //     orgTypeList.push(2)
          //   }
          //   if(orgType&1){
          //     orgTypeList.push(1)
          //   }
          //   record.orgType=orgTypeList
          // }else{
          //   record.orgType=[0]
          // }
          if(this.seen){
            this.model.orgCategory = '1';
          }else{
            this.model.orgCategory = '2';
          }
          if( this.model.orgCategory>1){
              this.businessTypeShow=true
          }else{
            this.businessTypeShow=false
          }
        
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(this.model,'orgCategory','departName','businessType','departNameEn','departNameAbbr','departOrder','description','orgType','orgCode','mobile','fax','address','memo','status','delFlag'))
          });
      },
      orgCategoryChnge(e,v){
        this.$nextTick(()=>{
          const {orgCategory} = this.form.getFieldsValue(['orgCategory'])
          if(orgCategory>1){
            this.orgTypeShow=true
          }else{
            this.orgTypeShow=false
          }
        })
        
      },
      close () {
        this.$emit('close');
        this.disableSubmit = false;
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            if(formData.businessType&&formData.businessType.length>0){
              let businessType= 0
              formData.businessType.forEach((item)=>{
                businessType+=Number(item)
              })
            formData.businessType=businessType
            }
            //时间格式化
            httpAction(this.url.add,formData,"post").then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.loadTreeData();
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })

          }
        })
      },
      handleCancel () {
        this.close()
      },
      validateMobile(rule,value,callback){
        if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)){
          callback();
        }else{
          callback("您的手机号码格式不正确!");
        }

      }
    }
  }
</script>

<style scoped>

</style>