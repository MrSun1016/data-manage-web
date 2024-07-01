<template>
  <div>
    <el-card class="cardhei">
      <div>新增资料</div>
      <el-divider></el-divider>
      <div class="divbody">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="left"
          size="small"
          v-loading="drawerLoading"
          label-width="120px"
        >
          <el-form-item label="资料管理类型" prop="dataManagementType">
            <el-select v-model="form.dataManagementType" clearable placeholder="请选择" size="small">
              <el-option
                :label="manag.text"
                :value="manag.value"
                v-for="manag in datefromList.management"
                :key="manag.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资料名称" prop="dataName">
            <el-input v-model="form.dataName"></el-input>
          </el-form-item>

          <el-form-item label="上传文档" prop="uploadFileName">
            <!-- multiple -->
            <el-upload
              
              class="upload-demo"
              name="file"
              action="/dtwave-om/api/file/uploadManage"
              accept=".xls,.xlsx,.doc,.docx"
              :data="fileName"
              :headers="headerObj"
              :on-error="xiaHandleExceed"
              :on-success="fileSuccess"
              :on-change="handleChange"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上 传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="发布范围" prop="releaseScope">
            <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group class="checkboxFlex" v-model="form.releaseScope" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in allRoleList" :label="city.id" :key="city.id">{{
                  city.roleName
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>

          <el-form-item label="是否置顶">
            <el-switch v-model="form.isTop"></el-switch>
          </el-form-item>
        </el-form>
        <div class="butPosition">
          <el-button size="small" @click="cancelNewData">取消</el-button>
          <el-button type="primary" size="small" @click="onNewData">立即发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getAllRole, studyWorldSave, putUpdate, getStudyWorldInfo } from '@/api/api'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'LearningNewData',
  props: ['datefromList'],
  data() {
    return {
      fileName: {
        fileName: '',
      },
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value,
      },
      form: {
        dataName: '',
        endDate: '',
        dataManagementType: '',
        id: 0,
        orderByField: '',
        pageNum: 0,
        pageSize: 0,
        releaseScope: [],
        rowStart: 0,
        startDate: '',
        uploadFileName: '',
        isTop: false,
      },
      reviseId: '',
      //文件  上传
      file: '',
      filename: '',
      fileList: [],
      errmesg: [],
      result: '',
      fileName1: '',
      //  发布范围
      allRoleList: [],
      checkedCities: [],
      checkAll: false,
      isIndeterminate: false,
      rules: {
        dataManagementType: [{ required: true, message: '请选择资料管理类型', trigger: 'change' }],
        dataName: [{ required: true, message: '请输入资料名称', trigger: 'blur' }],
        uploadFileName: [
          {
            required: true,
            message: '请至少选择上传一个文件',
            trigger: 'change',
          },
        ],
        releaseScope: [{ type: 'array', required: true, message: '请至少选择一个发布范围', trigger: 'change' }],
      },
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
    getAllRoleList() {
      getAllRole().then((res) => {
        if (res.success) {
          this.allRoleList = res.result
          this.allRoleList.map((item) => {
            this.form.releaseScope.push(item.id)
          })
          this.checkAll = true
        } else {
          this.$message.warning('发布范围请求失败')
        }
      })
    },
    // 文件上传失败
    xiaHandleExceed(err, file, fileList) {
      Message.error(err)
    },
    // 文件上传成功
    fileSuccess(res, file, fileList) {
      this.form.uploadFileName = file.name
      // this.fileName.fileName = file.name
      console.log(file.name, '------')
      this.fileList = fileList
      if (res.success) {
        Message.success(`${this.fileName.fileName}上传成功`)
      } else {
        Message.error(res.header.message)
      }
    },
    onNewData() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.uploadFileName != '') {
            if (this.form.isTop) {
              this.form.isTop = '1'
            } else {
              this.form.isTop = '0'
            }
            if (this.reviseId === '') {
              studyWorldSave(this.form).then((res) => {
                if (res.success) {
                  Message({
                    message: '发布成功！',
                    type: 'success',
                  })
                  this.$emit('isShowNewData', false)
                  this.clean()
                } else {
                  Message.warning(res.message)
                }
              })
            } else {
              putUpdate(this.form).then((res) => {
                if (res.success) {
                  Message({
                    message: '发布成功！',
                    type: 'success',
                  })
                  this.$emit('isShowNewData', false)
                  this.clean()
                } else {
                  Message.warning(res.message)
                }
              })
            }
            this.reviseId = ''
          } else {
            Message.error('上传文件为空，请上传正确文件')
          }
        }
      })
    },
    // 点击修改
    reviseDate(id) {
      this.drawerLoading = true
      this.reviseId = id
      getStudyWorldInfo(id).then((res) => {
        if (res.success) {
          this.form = res.result
          let fileName1 = { name: res.result.uploadFileName }
          this.fileList.push(fileName1)
          if (res.result.isTop == '1') {
            this.form.isTop = true
          } else {
            this.form.isTop = false
          }
          this.drawerLoading = false
        } else {
          Message.warning(res.header.message)
        }
      })
    },
    clean() {
      this.form = {
        dataName: '',
        endDate: '',
        dataManagementType: '',
        id: 0,
        orderByField: '',
        pageNum: 0,
        pageSize: 0,
        releaseScope: [],
        rowStart: 0,
        startDate: '',
        uploadFileName: '',
        isTop: false,
      }
      this.fileList = []
      this.reviseId = ''
    },
    cancelNewData() {
      this.clean()
      this.$emit('isShowNewData', false)
    },
    handleCheckAllChange(val) {
      console.log(val)
      this.form.releaseScope = val ? this.allRoleList.map((item) => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let { allRoleList } = this
      let { releaseScope } = this.form
      this.checkAll = releaseScope.length === allRoleList.length && allRoleList.length > 0
      this.isIndeterminate = releaseScope.length > 0 && releaseScope.length < allRoleList.length
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-divider--horizontal {
  background-color: #1890ff;
}
/deep/.el-card__body {
  width: 100%;
  height: 100%;
}
.cardhei {
  height: 100%;
  .divbody {
    width: 100%;
    height: 100%;
    position: relative;
    .butPosition {
      display: flex;
      justify-content: flex-end;
    }
  }
}
.checkboxFlex {
  display: flex;
  flex-direction: column;
}
</style>
