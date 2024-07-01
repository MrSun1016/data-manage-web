<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    style="top:5%;height: 85%;overflow-y: hidden">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="角色名称">
          <a-input placeholder="请输入角色名称" v-decorator.trim="[ 'roleName', validatorRules.roleName]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="角色编码">
          <a-input placeholder="请输入角色编码" :disabled="roleDisabled" v-decorator.trim="[ 'roleCode', this.model.id?{}:validatorRules.roleCode]" />
        </a-form-item>
        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数据权限范围">
          <a-select placeholder="请选择数据权限范围"   v-decorator.trim="['type', validatorRules.type]">
            <a-select-option :value="1">自己及其所有子结点的数据</a-select-option>
            <a-select-option :value="2">兄弟结点数据</a-select-option>
            <a-select-option :value="3">父结点的数据</a-select-option>
            <a-select-option :value="4">自己所在结点的数据 </a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-textarea :rows="5" placeholder="..." v-decorator="[ 'description', validatorRules.description ]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import {addRole,editRole,editRole1,duplicateCheck } from '@/api/api'
  import { postAction, getAction,downFile,getFileAccessHttpUrl } from '@/api/manage'
// import { delete } from 'vue/types/umd'

  export default {
    name: "RoleModal",
    props:{
      deptId:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        title:"操作",
        visible: false,
        roleDisabled: false,
        model: {},
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
          roleName:{
            rules: [
              { required: true, message: '请输入角色名称!' },
              { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
            ]},
          roleCode:{
            rules: [
              { required: true, message: '请输入角色名称!'},
              { min: 0, max: 64, message: '长度不超过 64 个字符', trigger: 'blur' },
              { validator: this.validateRoleCode}
            ]},
          type:{
            rules: [
              { required: true, message: '请选择数据权限范围'},
            ]},
          description:{
            rules: [
              { min: 0, max: 126, message: '长度不超过 126 个字符', trigger: 'blur' }
            ]}
        },
        url:{
         departRoleAdd:'/sys/sysDepartRole/add'
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        
        //编辑页面禁止修改角色编码
        if(this.model.id){
          this.roleDisabled = true;
        }else{
          this.roleDisabled = false;
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'roleName', 'description','roleCode','type'))
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
     async  handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            let formData1= {
              "createBy": formData.createBy,
              "createTime":formData.createTime,
              "description":formData.description,
              "id": formData.id,
              "roleCode": formData.roleCode,
              "roleName": formData.roleName,
              "updateBy": formData.updateBy,
              "updateTime": formData.updateTime} 
      
            let obj;
            if(!this.model.id){
              obj=  addRole(formData)
              // obj=  addRole(formData).then((res)=>{
              //   if(res.success){
              //     postAction(this.url.departRoleAdd,{roleId:res.result.id,departId:this.deptId,roleCode:this.model.roleCode,roleName:this.model.roleName}).then(res=>{
              //       if(res.success){
              //         that.$message.success(res.message);
              //         that.$emit('ok');
              //       }else{
              //         that.$message.warning(res.message);
              //       }
              //     })
              //   }else{
              //     that.$message.warning(res.message);
              //   }
              // }).finally(() => {
              //   that.confirmLoading = false;
              //   that.close();
              // });
            }else{
              obj=  editRole(formData1)
              // obj=  editRole(formData1).then((res)=>{
              //   if(res.success){
              //     editRole1(formData).then((res)=>{
              //       if(res.success){
              //         that.$message.success(res.message);
              //         that.$emit('ok');
              //       }else{
              //         that.$message.warning(res.message);
              //       }
              //     })
              //   }else{
              //     that.$message.warning(res.message);
              //   }
              // }).finally(() => {
              //   that.confirmLoading = false;
              //   that.close();
              // });
            }

            obj.then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                postAction(this.url.departRoleAdd,{departId:this.deptId,roleCode:this.model.roleCode,roleName:this.model.roleName}).then(res=>{
                  
                })
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
      validateRoleCode(rule, value, callback){
        if(/[\u4E00-\u9FA5]/g.test(value)){
          callback("角色编码不可输入汉字!");
        }else{
          var params = {
            tableName: "sys_role",
            fieldName: "role_code",
            fieldVal: value,
            dataId: this.model.id,
          };
          duplicateCheck(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback(res.message);
            }
          });
        }
      }

    }
  }
</script>

<style scoped>

</style>