<template>
  <a-modal
    :title="title"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: { disabled: disabled } }"
    @cancel="handleCancel"
  >
    <!-- @ok="handleOk" -->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row style="width: 100%">
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="标题">
              <a-input
                placeholder="请输入标题"
                v-decorator="['titile', validatorRules.title]"
                :readOnly="disableSubmit"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="消息类型">
              <a-select
                v-decorator="['msgCategory', validatorRules.msgCategory]"
                placeholder="请选择消息类型"
                :disabled="disableSubmit"
                :getPopupContainer="target => target.parentNode"
              >
                <a-select-option value="1">通知公告</a-select-option>
                <a-select-option value="2">系统消息</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%">
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开始时间:">
              <j-date
                style="width: 100%"
                :getCalendarContainer="node => node.parentNode"
                v-decorator="['startTime', validatorRules.startTime]"
                placeholder="请选择开始时间"
                showTime
                dateFormat="YYYY-MM-DD HH:mm:ss"
              ></j-date>
            </a-form-item>
          </a-col>
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="结束时间" class="endTime">
              <j-date
                style="width: 100%"
                :getCalendarContainer="node => node.parentNode"
                v-decorator="['endTime', validatorRules.endTime]"
                placeholder="请选择结束时间"
                showTime
                dateFormat="YYYY-MM-DD HH:mm:ss"
              ></j-date>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%">
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="优先级">
              <a-select
                v-decorator="['priority', {}]"
                placeholder="请选择优先级"
                :disabled="disableSubmit"
                :getPopupContainer="target => target.parentNode"
              >
                <a-select-option value="L">低</a-select-option>
                <a-select-option value="M">中</a-select-option>
                <a-select-option value="H">高</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="通告类型">
              <a-select
                v-decorator="['msgType', validatorRules.msgType]"
                placeholder="请选择通告类型"
                :disabled="disableSubmit"
                @change="chooseMsgType"
                :getPopupContainer="target => target.parentNode"
              >
                <a-select-option value="USER">指定角色</a-select-option>
                <a-select-option value="ALL">全体用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%">
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="摘要">
              <a-textarea placeholder="请输入摘要" v-decorator="['msgAbstract', validatorRules.msgAbstract]" />
            </a-form-item>
          </a-col>
          <a-col :span="24 / 2">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="指定角色" v-if="userType">
              <!-- <a-select
                mode="multiple"
                placeholder="请选择用户"
                :labelInValue="true"
                v-model="selectedUser"
                @dropdownVisibleChange="selectUserIds"
                @change="handleChange"
              >
              </a-select> -->
              <a-select
                mode="multiple"
                placeholder="请选择用户"
                :labelInValue="true"
                v-model="selectedUser"
                :disabled="disableSubmit"
                :getPopupContainer="target => target.parentNode"
              >
                <a-select-option value="USER">指定角色</a-select-option>
                <a-select-option value="ALL">全体用户</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="width: 100%">
          <a-col :span="24">
            <a-form-item :labelCol="labelColX1" :wrapperCol="wrapperColX1" label="内容" class="j-field-content">
              <j-editor v-decorator="['msgContent', {}]" triggerChange></j-editor>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <select-user-list-modal ref="UserListModal" @choseUser="choseUser"></select-user-list-modal>
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary">保存</a-button>
      <a-button type="primary" @click="handleOk">立即发布</a-button>
      <a-button type="primary" @click="dialogVisible = true">预约发布</a-button>
    </template>
    <!-- 预约发布弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      title="预约发布"
      :visible.sync="dialogVisible"
      width="260px"
    >
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        size="small"
        v-model="value"
        type="datetime"
        placeholder="请选择时间"
      >
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('预约发布')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { getAction } from '@/api/manage'
import JDate from '@/components/jeecg/JDate'
import JEditor from '@/components/jeecg/JEditor'
import SelectUserListModal from './SelectUserListModal'
import moment from 'moment'

export default {
  components: { JEditor, JDate, SelectUserListModal },
  name: 'SysAnnouncementModal',
  data() {
    return {
      dialogVisible: false,
      value: '',
      title: '操作',
      visible: false,
      disableSubmit: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      labelColX1: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperColX1: {
        xs: { span: 24 },
        sm: { span: 21 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        title: { rules: [{ required: true, message: '请输入标题!' }] },
        msgCategory: { rules: [{ required: true, message: '请选择消息类型!' }] },
        msgType: { rules: [{ required: true, message: '请选择通告对象类型!' }] },
        endTime: { rules: [{ required: true, message: '请选择结束时间!' }, { validator: this.endTimeValidate }] },
        startTime: { rules: [{ required: true, message: '请选择开始时间!' }, { validator: this.startTimeValidate }] },
        msgAbstract: { rules: [{ required: true, message: '请输入摘要!' }] }
      },
      url: {
        queryByIds: '/sys/user/queryByIds',
        add: '/sys/annountCement/add',
        edit: '/sys/annountCement/edit'
      },
      userType: false,
      userIds: [],
      selectedUser: [],
      disabled: false,
      msgContent: '',
      userList: []
    }
  },
  created() {},
  methods: {
    onCancel() {
      this.value = ''
      this.dialogVisible = false
      this.resetUser()
    },
    handleSubmit(key) {
      this.dialogVisible = false
      this.handleOk(key)
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = {}
      this.disable = false
      this.visible = true
      this.getUser(record)
    },
    getUser(record) {
      record.startTime = this.formatTime(record.startTime)
      record.endTime = this.formatTime(record.endTime)
      console.log(record)
      this.model = Object.assign({}, record)
      // 指定用户
      if (record && record.msgType === 'USER') {
        this.userType = true
        this.userIds = record.userIds
        getAction(this.url.queryByIds, { userIds: this.userIds }).then(res => {
          if (res.success) {
            //update--begin--autor:wangshuai-----date:20200601------for：系统公告选人后，不能删除------
            var userList = []
            for (var i = 0; i < res.result.length; i++) {
              var user = {}
              user.label = res.result[i].realname
              user.key = res.result[i].id
              userList.push(user)
            }
            this.selectedUser = userList
            //update--begin--autor:wangshuai-----date:20200601------for：系统公告选人后，不能删除------
            this.$refs.UserListModal.edit(res.result, this.userIds)
          }
        })
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'endTime',
            'startTime',
            'titile',
            'msgContent',
            'priority',
            'msgCategory',
            'msgType',
            'sendStatus',
            'msgAbstract'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.selectedUser = []
      this.visible = false
    },
    handleRequest() {
      const that = this
      //当设置指定用户类型，但用户为空时，后台报错
      if (this.userType && !(this.userIds != null && this.userIds.length > 0)) {
        this.$message.warning('指定用户不能为空！')
        return
      }
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          
          let formData = Object.assign(this.model, values)
          if (this.userType) {
            formData.userIds = this.userIds
          }
          console.log(formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.resetUser()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleOk(key) {
      if (key == '预约发布') {
        this.handleRequest()
        this.$emit('appointment', this.value, key)
      } else {
        this.handleRequest()
      }
    },
    handleCancel() {
      this.visible = false
      this.$emit('close')
      this.resetUser()
    },
    resetUser() {
      this.userType = false
      this.userIds = []
      this.selectedUser = []
      this.disabled = false
      this.$refs.UserListModal.edit(null, null)
    },
    selectUserIds() {
      this.$refs.UserListModal.add(this.selectedUser, this.userIds)
    },
    chooseMsgType(value) {
      if ('USER' == value) {
        this.userType = true
      } else {
        this.userType = false
        this.selectedUser = []
        this.userIds = []
      }
    },
    // 子modal回调
    choseUser: function(userList) {
      this.selectedUser = []
      this.userIds = []
      for (var i = 0; i < userList.length; i++) {
        //update--begin--autor:wangshuai-----date:20200601------for：系统公告选人后，不能删除------
        var user = {}
        user.label = userList[i].realname
        user.key = userList[i].id
        this.selectedUser.push(user)
        //update--end--autor:wangshuai-----date:20200601------for：系统公告选人后，不能删除------
        this.userIds += userList[i].id + ','
      }
    },
    startTimeValidate(rule, value, callback) {
      let endTime = this.form.getFieldValue('endTime')
      if (!value || !endTime) {
        callback()
      } else if (moment(value).isBefore(endTime)) {
        callback()
      } else {
        callback('开始时间需小于结束时间')
      }
    },
    endTimeValidate(rule, value, callback) {
      let startTime = this.form.getFieldValue('startTime')
      if (!value || !startTime) {
        callback()
      } else if (moment(startTime).isBefore(value)) {
        callback()
      } else {
        callback('结束时间需大于开始时间')
      }
    },
    handleChange(userList) {
      if (userList) {
        this.userIds = []
        var users = []
        for (var i = 0; i < userList.length; i++) {
          var user = {}
          user.id = userList[i].key
          user.realname = userList[i].label
          this.userIds += userList[i].key + ','
          users.push(user)
        }
      }
      console.log('userList', userList)
      console.log('users', users)
      console.log('userIds', this.userIds)
      this.$refs.UserListModal.edit(users, this.userIds)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
