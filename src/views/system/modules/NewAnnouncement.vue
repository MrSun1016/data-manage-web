<template>
  <div>
    <el-card class="cardpaddin" v-show="!isshowMessage" v-loading="drawerLoading">
      <div class="titleflex">
        <p class="titlep">新增公告</p>
        <el-button type="primary" size="small" @click="preview">预 览</el-button>
      </div>
      <el-divider></el-divider>
      <div class="bodydiv">
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="80px">
          <el-form-item label="公告标题" prop="titile">
            <el-input size="small" v-model="form.titile"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="msgContent">
            <j-editor v-model="form.msgContent"></j-editor>
          </el-form-item>
          <el-form-item label="附件上传" prop="file">
            <el-upload
              class="upload-demo"
              name="file"
              action="/dtwave-om/api/file/upload"
              multiple
              :headers="headerObj"
              :data="fileName"
              :on-error="xiaHandleExceed"
              :on-success="fileSuccess"
              :on-change="handleChange"
              :file-list="fileList"
            >
              <!-- accept=".xls,.xlsx,.doc,.docx" -->
              <el-button size="small" type="primary" style="marginright: 20px">上 传</el-button>
              <span slot="tip" class="el-upload__tip">支持图片\WORD\EXCEL\PDF\压缩包</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="发布范围" prop="userIds">
            <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group v-model="form.userIds" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in allRoleList" :label="city.id" :key="city.id">{{
                  city.roleName
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <div class="newbutflex">
          <el-button type="primary" size="small" class="butfromccwei" @click="subscribe">预约发布</el-button>
          <el-button type="primary" size="small" class="butfromccwei" @click="postNew">立即发布</el-button>
          <el-button type="primary" size="small" class="butfromccwei" @click="preserve">保 存</el-button>
          <el-button size="small" @click="closeNewsAdd" class="butfromccwei">取 消</el-button>
        </div>
      </div>
      <!-- 预约发布弹窗 -->
      <el-dialog
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        title="预约发布"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-divider></el-divider>
        <div class="dialogbody">
          <el-form ref="dateForm" :model="dateForm" :rules="daterules" label-width="80px">
            <el-form-item label="预约时间" prop="appointTime" class="datepicker">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="expireTimeOPtion"
                @focus="focus"
                size="small"
                v-model="dateForm.appointTime"
                type="datetime"
                placeholder="请选择时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel" size="small">取 消</el-button>
          <el-button type="primary" @click="handleSubmit()" size="small" :disabled="loadhandle" :loading="loadhandle">{{
            loadhandle ? '提交中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>

      <!-- 保存 -->
      <el-dialog title="提示" :visible.sync="isShowSave" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter" v-show="selectId == '0'">是否确认取消</p>
        <p class="dialogcenter" v-show="selectId == '1'">是否确认保存?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSave" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="save">确 认</el-button>
        </span>
      </el-dialog>
      <!-- 发布 -->
      <el-dialog title="提示" :visible.sync="isShowpostNew" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确认发布</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelNew" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="postNewSave" :disabled="loadSave" :loading="loadSave">{{
            loadSave ? '提交中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>
    </el-card>
    <MessageContent ref="content" v-show="isshowMessage" :visible.sync="isshowMessage"></MessageContent>
  </div>
</template>
<script>
import { MessageBox, Message } from 'element-ui'
import { getAllRole, postAdd, queryById, postDoReleaseData, postedit } from '@/api/api'
import JEditor from '@/components/jeecg/JEditor'
import MessageContent from './MessageContent'
import { indexOf } from 'lodash'
export default {
  name: 'NewAnnouncement',
  components: { JEditor, MessageContent },
  data() {
    return {
      fileName: {
        fileName: '',
      },
      // 上传
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value,
      },
      //   表单
      form: {
        // uploadList:[],
        titile: '',
        msgContent: '',
        uploadFileName: [],
        userIds: [],
        appointTime: '',
      },
      dateForm: { appointTime: '' },
      //  发布范围
      allRoleList: [],
      checkedCities: [],
      checkAll: false,
      isIndeterminate: false,
      //   上传
      file: '',
      filename: '',
      fileList: [],
      //   发布范围
      //   预约发布
      dialogVisible: false,
      expireTimeOPtion: {
        disabledDate(time) {
          return time.getTime() < Date.now() //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      // 保存
      isShowSave: false,
      selectId: '',
      // 发布
      isShowpostNew: false,
      // 预览
      isshowMessage: false,
      // 复制
      duplicateId: '',
      rules: {
        titile: [{ required: true, message: '请输入信息资源名称', trigger: 'blur' }],
        msgContent: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
        userIds: [{ type: 'array', required: true, message: '请至少选择一个发布范围', trigger: 'change' }],
        // file: [
        //   {
        //     required: true,
        //     message: '请至少选择上传一个文件',
        //     trigger: 'change'
        //   }
        // ]
      },
      daterules: {
        appointTime: [{ required: true, message: '请选择预约发布时间', trigger: 'change' }],
      },
      loadSave: false,
      loadhandle: false,
      // 加载
      drawerLoading: false,
    }
  },
  mounted() {
    this.getAllRoleList()
  },
  methods: {
    handleChange(file, fileList) {
      let resFileName = file.name.split('.')
      this.fileName.fileName = resFileName[0]
    },
    //   取消预约发布的 此刻
    focus() {
      this.$nextTick(() => {
        document.getElementsByClassName('el-button--text')[0].setAttribute('style', 'display:none')
      })
    },
    getAllRoleList() {
      getAllRole().then((res) => {
        if (res.success) {
          this.allRoleList = res.result
          this.allRoleList.forEach((item) => {
            this.form.userIds.push(item.id)
          })
          this.checkAll = true
        } else {
          this.$message.error('发布范围请求失败')
        }
      })
    },
    // 预览
    preview() {
      this.isshowMessage = true
      this.$refs.content.announcementpreview(this.form, 'new')
    },
    // 复制/在编辑
    duplicateAnnounce(row) {
      this.drawerLoading = true
      this.duplicateId = row.id
      queryById(row.id).then((res) => {
        if (res.success) {
          this.form = res.result
          // this.form.titile = res.result.titile
          // this.form.msgContent = res.result.msgContent
          // this.form.uploadFileName = res.result.uploadFileName
          this.form.userIds = res.result.userIdList
          // this.form.userIds = JSON.parse(this.form.userIds)
          if (res.result.uploadFileName != null && res.result.uploadFileName != '') {
            let UploadFileName = res.result.uploadFileName.indexOf('[')
            if (UploadFileName != -1) {
              let resUploadFileName = JSON.parse(res.result.uploadFileName)
              // let resUploadFileName = res.result.uploadFileName
              resUploadFileName.forEach((v) => {
                this.fileList.push({
                  name: v,
                })
              })
            } else {
              this.fileList.push({
                name: res.result.uploadFileName,
              })
            }
            this.drawerLoading = false
          } else {
            Message.error(res.message)
            this.drawerLoading = false
          }
        }
      })
    },
    // 保存
    preserve() {
      if (this.form.titile == '') {
        Message.error('请填写公告标题')
      } else {
        this.selectId = '1'
        this.isShowSave = true
      }
    },
    save() {
      if (this.selectId == '0') {
        this.cleanUp()
        this.isShowSave = false
        this.$emit('update:visible', false)
      } else {
        postAdd(this.form).then((res) => {
          if (res.success) {
            Message({
              message: '保存成功！',
              type: 'success',
            })
            this.isShowSave = false
            this.cleanUp()
            this.$emit('update:visible', false)
            this.$emit('refresh')
          } else {
            this.isShowSave = false
            Message.error(res.message)
          }
        })
      }
    },
    // 立即发布
    postNew() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.isShowpostNew = true
        }
      })
    },
    postNewSave() {
      this.loadSave = true
      console.log(this.loadSave)
      console.log('loadSave')
      if (this.duplicateId != '') {
        postedit(this.form).then((res) => {
          if (res.success) {
            Message({
              message: res.message,
              type: 'success',
            })
            this.isShowpostNew = false
            this.cleanUp()
            this.$emit('update:visible', false)
            this.$emit('refresh')
          } else {
            this.isShowpostNew = false
            Message.error(res.message)
          }
          this.loadSave = false
        })
      } else {
        postDoReleaseData(this.form).then((res) => {
          if (res.success) {
            Message({
              message: res.message,
              type: 'success',
            })
            this.isShowpostNew = false
            this.cleanUp()
            this.$emit('update:visible', false)
            this.$emit('refresh')
          } else {
            this.isShowpostNew = false
            Message.error(res.message)
          }
          this.loadSave = false
        })
      }
    },
    cancelNew() {
      this.isShowpostNew = false
    },

    // 取消保存
    cancelSave() {
      this.isShowSave = false
    },
    cleanUp() {
      this.form = {
        titile: '',
        msgContent: '',
        uploadFileName: [],
        userIds: [],
        appointTime: '',
      }
      this.duplicateId = ''
      this.dateForm.appointTime = ''
      this.fileList = []
    },
    // 取消
    closeNewsAdd() {
      this.selectId = '0'
      this.isShowSave = true
    },
    // 文件上传失败
    xiaHandleExceed(err, file, fileList) {
      Message.error(err)
    },
    // 文件上传成功
    fileSuccess(res, file, fileList) {
      this.form.uploadFileName.push(file.name)
      this.fileList = fileList
      if (res.success) {
        Message.success('上传成功')
      } else {
        Message.error('上传失败')
      }
    },
    // 预约发布
    subscribe() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.dialogVisible = true
        }
      })
    },
    onCancel() {
      this.form.appointTime = ''
      this.dialogVisible = false
      this.resetUser()
    },
    handleSubmit() {
      this.loadhandle = true
      console.log(this.loadhandle)
      this.$refs['dateForm'].validate((valid) => {
        if (valid) {
          this.form.appointTime = this.dateForm.appointTime
          if (this.duplicateId != '') {
            postedit(this.form)
              .then((res) => {
                if (res.success) {
                  Message({
                    message: res.message,
                    type: 'success',
                  })
                  this.dialogVisible = false
                  this.cleanUp()
                  this.$emit('update:visible', false)
                  this.$emit('refresh')
                } else {
                  this.dialogVisible = false
                  Message.error(res.message)
                }
                this.loadhandle = false
              })
              .catch(() => {
                Message.error('请求失败')
              })
          } else {
            postDoReleaseData(this.form).then((res) => {
              if (res.success) {
                Message({
                  message: res.message,
                  type: 'success',
                })
                this.dialogVisible = false
                this.cleanUp()
                this.$emit('update:visible', false)
                this.$emit('refresh')
              } else {
                this.dialogVisible = false
                Message.error(res.message)
              }
            })
          }
        }
      })
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.form.userIds = val ? this.allRoleList.map((item) => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let { allRoleList } = this
      let { userIds } = this.form
      this.checkAll = userIds.length === allRoleList.length && allRoleList.length > 0
      this.isIndeterminate = userIds.length > 0 && userIds.length < allRoleList.length
    },
  },
}
</script>

<style lang="less" scoped>
// /deep/.el-card__body {
//   padding: 0;
// }
.titleflex {
  margin: 20px 20px 15px 20px;
  display: flex;
  justify-content: space-between;
  .titlep {
    font-size: 16px;
    height: 35px;
    font-weight: 600;
    line-height: 35px;
    margin: 0;
  }
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
}
.bodydiv {
  margin: 15px 20px 20px 20px;
}
.newbutflex {
  display: flex;
  flex-direction: row-reverse;
  .butfromccwei {
    margin-left: 15px;
  }
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  margin: 0;
}
.dialogbody {
  display: flex;
  justify-content: center;
}
.datepicker {
  // width: 300px;
  margin: 70px 0;
}
.dialogcenter {
  text-align: center;
  line-height: 200px;
  font-size: 16px;
  color: #000;
}
</style>
