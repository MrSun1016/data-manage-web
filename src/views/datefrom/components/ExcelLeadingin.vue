<template>
  <!-- 数据编目--编目列表-新增/编辑-excel导入  -->
  <div>
    <el-dialog
      title="批量导入数据项"
      :visible.sync="isExcleLeadingin"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-divider></el-divider>
      <div class="dialogmarg centerupload">
        <el-upload
          class="upload-demo"
          drag
          ref="uploadExclel"
          :headers="headerObj"
          action="/dtwave-om/api/cataLog/importDataExcel"
          accept=".xls,.xlsx"
          multiple
          :on-success="fileUploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">点击图标选择Excel文件上传</div>
          <div class="el-upload__tip exceluploaddiv" slot="tip">
            点击
            <span @click="onDownloadTemp" style="cursor: pointer; color: #589df8">模版 </span>下载数据项模版点击上传
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer excelbutweizhi">
        <el-button size="small" @click="changeExcleL">取 消</el-button>
        <el-button size="small" type="primary" @click="onExcelSumbit" :disabled="disabled">{{
          upload ? '解析中...' : '提交解析'
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDictItems } from '@/api/api'
import { download } from '@/api/manage'
import { Message } from 'element-ui'
export default {
  name: 'ExcelLeadingin',
  props: ['isExcleLeadingin', 'requestType'],
  data() {
    return {
      // fileName: {
      //   fileName: '',
      // },
      // 导入模板
      impTemplate: 'import_template_file_name',
      id: [],
      downloadName: '数据项导入模板.xlsx',
      disabled: true,
      upload: false,
      fileName: '',
      ressult: '',
      localPathUrl: false,
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value
      },
      importExcel: {}
    }
  },
  mounted() {
    this.dictionaryList()
  },
  methods: {
    // handleChange(file, fileList) {
    //   let resFileName = file.name.split('.')
    //   this.fileName.fileName = resFileName[0]
    // },
    dictionaryList() {
      getDictItems(this.impTemplate).then(res => {
        // 数据项导入模板
        let downloadName = res.result.find(fileName => {
          return fileName.text == '数据项导入模板'
        })
        this.downloadName = `${downloadName.text}.xlsx`
      })
    },
    //模板下载
    onDownloadTemp() {
      download({ fileName: this.downloadName })
        .then(res => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8'
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = this.downloadName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch(error => {
          this.$message.warning('模板导出失败')
        })
    },
    onExcelSumbit() {
      this.upload = true
      if (this.ressult) {
        this.upload = false
        // this.requestType()
        this.$emit('changeExcleLeadingin', false)
        this.$emit('importExcelList', this.importExcel)
        this.$message.success(`${this.fileName}上传成功`)
      } else {
        this.upload = false
        this.$message.warning(`${this.fileName}上传失败`)
      }
      this.$refs.uploadExclel.clearFiles()
    },
    fileUploadSuccess(res, file, fileList) {
      this.disabled = true
      this.fileName = file.name
      if (res.result.success) {
        if (res.result.result == null) {
          this.$emit('changeExcleLeadingin', false)
          Message.error('模板为空，请选择正确模板')
          this.$refs.uploadExclel.clearFiles()
        } else {
          this.disabled = false
          this.ressult = res.result.success
          this.importExcel = res.result.result
        }
      } else {
        this.$emit('changeExcleLeadingin', false)
        Message.error(res.result.message)
      }
    },
    handleClose(done) {
      done()
      this.$emit('changeExcleLeadingin', false)
    },
    changeExcleL() {
      this.$refs.uploadExclel.clearFiles()
      this.$emit('changeExcleLeadingin', false)
    }
  }
}
</script>

<style lang="less" scoped>
.dialogmarg {
  margin: 32px 40px 0 40px;
}
.centerupload {
  text-align: center;
}
.mbcolor {
  color: #1890ff;
}
.butonqumarg {
  margin-right: 10px;
}
</style>
