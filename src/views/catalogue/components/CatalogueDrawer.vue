<template>
  <!-- :modal="false" -->
  <el-drawer
    id="CatalogueDrawer"
    size="60%"
    :z-index="8888"
    :append-to-body="true"
    :visible.sync="drawer"
    :withHeader="false"
    :wrapperClosable="false"
  >
    <div v-loading="drawerLoading">
      <div class="title">
        {{ catalogName }}-<span>{{ title }}</span
        >资源-共享申请
      </div>
      <el-form
        inline
        ref="catalogueformRules"
        class="form-data-box"
        :rules="catalogueformRules"
        label-position="left"
        label-width="149px"
        :model="catalogueData.catalogueApplyData"
      >
        <el-row
          style="margin-left: 0px !important; margin-right: 0px !important; padding: 32px 32px 0 32px"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="申请标题：">
              <el-input
                size="small"
                disabled
                clearable
                v-model="catalogueData.catalogueApplyData.title"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用系统：">
              <el-input
                disabled
                size="small"
                clearable
                v-model="catalogueData.catalogueApplyData.appSystem"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数源单位：">
              <el-input
                disabled
                size="small"
                clearable
                v-model="catalogueData.catalogueApplyData.applyDept"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主题分类：">
              <el-input
                size="small"
                clearable
                disabled
                v-model="catalogueData.catalogueApplyData.keyAreasType"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="是否永久申请：" prop="ifForever">
              <el-radio-group v-model="catalogueData.catalogueApplyData.ifForever">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="使用应用系统：" prop="useAppSystem">
              <el-select
                @visible-change="visibleChange"
                ref="refSelect"
                clearable
                size="small"
                placeholder="请选择"
                v-model="catalogueData.catalogueApplyData.useAppSystem"
              >
                <el-option v-for="item in sourceList" :key="item.id" :label="item.appName" :value="item.appName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启动时间：" prop="startTime">
              <el-date-picker
                style="width: 192.5px"
                v-model="catalogueData.catalogueApplyData.startTime"
                type="date"
                size="small"
                placeholder="选择启动时间"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="14">
            <el-form-item label="结束时间：" prop="endTime">
              <el-date-picker
                style="width: 192.5px"
                v-model="catalogueData.catalogueApplyData.endTime"
                type="date"
                size="small"
                placeholder="选择结束时间"
                :picker-options="pickerOptions1"
              >
              </el-date-picker>
        <el-button style="margin-left:12px" size="small" @click="catalogueData.catalogueApplyData.endTime=Date.parse(new Date('2099-12-31'))">永久</el-button>

            </el-form-item>
          </el-col>
          <el-col :span="24" style="position: relative">
            <el-form-item label="资源服务申请表：" prop="applyFileName" label-width="161px" class="apply-ipt">
              <el-input
                @click.native="handleFileUp"
                
                size="small"
                class="link-ping"
                v-model="catalogueData.catalogueApplyData.applyFileName"
                placeholder="请上传"
              >
                <template slot="append"><img src="~@/assets/link.png" alt="" /></template>
              </el-input>
            </el-form-item>
            <p class="download">
              点击
              <span style="color: #1890ff; cursor: pointer" @click="onDownload">模版</span>
              下载《孝感市政务信息资源使用申请表》，申请审批盖章后上传
            </p>
          </el-col>
          <el-col :span="24" style="margin-top: 20px">
            <el-form-item label="申请说明：" prop="applyRemark" class="expl-df">
              <el-input
                type="textarea"
                minlength="20"
                maxlength="500"
                clearable
                v-model.trim="catalogueData.catalogueApplyData.applyRemark"
                placeholder="请输入20-500字"
                show-word-limit
                :rows="3"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item
              v-if="title != '接口'"
              label="申请数据项："
              class="check-df"
              prop="checkedList"
              label-width="100%"
            >
              <!-- <span style="position: absolute; top: -40px; left: 100px; display: inline-block"
                >（提示：<span style="color: #d40000">红色文字</span>为不予共享；<span style="color: #1890ff"
                  >蓝色文字</span
                >为有条件共享；黑色文字为无条件共享）</span
              > -->
              <span style="position: absolute; top: -40px; left: 100px; display: inline-block; font-size: 12px"
                >（提示：<span style="color: #1890ff">蓝色文字</span>为有条件共享；<span style="color: black"
                  >黑色文字</span
                >
                为无条件共享；<span style="color: red">红色文字</span
                >为不予共享，若需要共享请线下协调数源部门授权共享）</span
              >
              <!-- 复选框 -->
              <div class="checkboxs">
                <el-checkbox-group v-model="catalogueData.catalogueApplyData.checkedList">
                  <el-checkbox
                    class="itemss"
                    v-for="item in catalogueCataData"
                    :key="item.name"
                    :label="item.name"
                    :disabled="item.shareProperty == '30' ? true : false"
                    ><span
                      :style="
                        item.shareProperty == '30'
                          ? 'color:red'
                          : item.shareProperty == '20'
                          ? 'color:#1890FF'
                          : 'color:black;'
                      "
                      >{{ item.name }}</span
                    ></el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 承诺/协议书 -->
      <div class="protocol" style="display: flex">
        <el-checkbox @change="handeSubmitBtn($event)" v-model="checke">已仔细阅读并确认</el-checkbox>
        <div @click="protocolDrawer = true" style="cursor: pointer">
          <span class="font">《孝感市大数据能力平台使用安全协议书》</span
          ><span class="font">《孝感市大数据能力平台安全保密承诺书》</span>
        </div>
      </div>
      <div class="btns">
        <el-button size="small" @click="handeleBtns(false)" class="cancel-btn">取消</el-button>
        <el-button type="primary" size="small" :disabled="disabled" :loading="loading" @click="handeleBtns(true)"
          >提交
        </el-button>
      </div>
    </div>
    <!-- :z-index="200" -->
    <el-dialog
      title="提示"
      class="small-mask"
      :visible.sync="drawerSmallMask"
      :append-to-body="true"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="small-mask-info">
        <i class="el-icon-warning" style="color: #155bd4; font-size: 32px; margin-right: 10px"></i
        ><span style="color: #000000">取消后数据不保存，是否取消申请?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="drawerSmallMask = false">不取消</el-button>
        <el-button size="small" @click="handeleAffirmSubmit" type="primary">确认取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      class="small-mask"
      :append-to-body="true"
      :visible.sync="drawerSmallMask2"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="small-mask-info">
        <i class="el-icon-warning" style="color: #155bd4; font-size: 32px; margin-right: 10px"></i
        ><span style="color: #000000">是否确认提交申请?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" @click="handleCatalogSubmit" :loading="loading1" type="primary">确认提交</el-button>
      </span>
    </el-dialog>
    <!-- 承诺书弹窗 -->
    <el-drawer
      class="protocolDrawer"
      :append-to-body="true"
      :visible.sync="protocolDrawer"
      size="60%"
      :with-header="false"
    >
      <div class="info" style="padding: 0 32px">
        <h1 style="font-size: 32px; text-align: center; margin: 80px 0 28px 0">孝感市大数据能力平台安全保密承诺书</h1>
        <p>
          为规范孝感市政务信息资源交换共享管理，提高市大数据能力平台运行效率，本人就参与和使用政务数据交换共享工作作出如下承诺：
        </p>
        <p>
          1.严格遵守《湖北省政务信息资源共享管理办法》的规定，遵循《孝感市政务信息资源交换共享技术标准》，规范使用孝感市大数据能力平台系统中数据信息；积极推进本部门项目的数据信息交换和共享。
        </p>
        <p>
          2.合法、安全使用数据信息，不以任何形式非法转让、违规公布、违规共享数据信息，防止数据信息泄露。如由于本人过失而导致政务信息泄露，愿承担相应责任。
        </p>
        <p>3.不得利用市大数据能力平台系统从事危害国家安全、损害社会公共利益、侵害其他单位或个人合法权益的活动。</p>
        <p>4.在市大数据能力平台系统中获取的数据信息只能用于依法履行职责或本人行政管理参考，不得作为他用。</p>
        <p>
          5.本人使用数据信息自愿接受市政务服务和大数据管理局的监督。如本人有违反相关规定的，市政务服务和大数据管理局有权暂停本人通过市大数据能力平台系统获取数据信息的权限，并承担相应责任。
        </p>
        <p>
          6.本人知晓本部门与孝感市政务服务和大数据管理局签订了《孝感市大数据能力平台使用安全协议书》，并愿意承担协议书中的使用安全和保密义务，如因本人原因利用信息系统造成危害的，本人同意承担相应责任。
        </p>
        <p>以上承诺长期有效。</p>
        <p>特此承诺。</p>
      </div>
      <div class="btn" style="position: absolute; bottom: 32px; right: 32px">
        <el-button type="primary" @click="onProtocolDrawer">确认</el-button>
      </div>
    </el-drawer>
    <!-- 文件上传 -->
    <el-dialog :visible.sync="upFileVisible" title="资源服务申请表上传" width="30%" :append-to-body="true">
      <el-upload
        ref="excleUpload"
        class="upload-demo"
        drag
        :data="fileName"
        :on-change="handleChange"
        :show-file-list="showFile"
        action="/dtwave-om/api/file/upload"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleUploadCancel" size="small">取 消</el-button>
        <!-- <el-button @click="upFileVisible = false" size="small">取 消</el-button> -->
        <el-button type="primary" @click="upLoadSubm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </el-drawer>
</template>

<script>
import { Message } from 'element-ui'
import { queryAppName } from '@/api/api'
import {
  getShareSave,
  getApplyDefaultInfo,
  getDataItemInfo,
  getApplyInfo,
  getStartShareApply,
  getShareUpdate,
  getCompleteByDateId,
  getDictItems,
} from '@/api/api'
import { download } from '@/api/manage'
export default {
  name: 'CatalogueDrawer',
  data() {
    return {
      drawerLoading: false,
      pickerOptions: {
        //返回true不可选，返回false可选
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      pickerOptions1: {
        //返回true不可选，返回false可选
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        },
      },
      sourceList: [],
      showFile: true,
      checked: false,
      loading1: false,
      fileName: {
        fileName: '',
      },
      upFileVisible: false,
      downloadName: '孝感市政务信息资源使用申请表.doc',
      catalogName: '',
      protocolDrawer: false,
      sumbitBtn: '',
      drawerSmallMask: false,
      drawerSmallMask2: false,
      disabled: true,
      checke: false,
      loading: false,
      applyId: null,
      cataId: '',
      rejectStatus: 0,
      catalogueData: {
        catalogueApplyData: {
          title: '',
          appSystem: '',
          applyDept: '',
          keyAreasType: '',
          ifForever: '0',
          useAppSystem: '',
          startTime: new Date(),
          endTime: '',
          applyFileName: '',
          applyRemark: '',
          // 复选框选中的值
          checkedList: [],
        },
      },
      catalogueCataData: [
        {
          catalogId: '',
          dataDictionary: null,
          dataLength: 0,
          dataLevel: '',
          dataObject: '',
          dataType: '',
          defaultValue: '',
          enName: '',
          fieldDescription: '',
          itemId: '',
          isShow: '',
          name: '',
          nullValue: '',
          openAttribute: '',
          primaryKey: '',
          serialNumber: 0,
          shareProperty: '',
          sharingCondition: null,
        },
      ],
      catalogId: '',
      checked: '',
      itemData: [],
      // 主题分类
      themeClassify: [],
      themeClassifyValue: [],
      title: '',
      drawer: false,
      submitData: {
        autoCreateTask: '', //自动创建交换任务
        appSystem: '', //使用应用系统
        applyDept: '', //数源单位
        applyFileName: '', //上传文件名
        applyId: '',
        applyRemark: '', //申请说明
        applyUser: '',
        catalogId: '',
        keyAreasType: '', //主题分类
        createdBy: '',
        createdTime: '',
        endTime: '', //结束时间
        gxApplyFiledItemBoList: [], //数据项
        ifForever: '0', //是否永久申请
        openingTime: '',
        // revision: 'revision',
        shareOff: '0',
        shareType: '',
        startTime: '', //启动时间
        tenantId: '',
        title: '', //申请标题
        updatedBy: '',
        updatedTime: '',
        useAppSystem: '', //使用应用系统
        usingTime: '',
        visitNum: 'visitNum',
      },
      catalogueformRules: {
        title: [
          {
            required: true,
          },
        ],
        appSystem: [
          {
            required: true,
          },
        ],
        applyDept: [
          {
            required: true,
          },
        ],
        // ifForever: [
        //   {
        //     required: true,
        //     message: '请选择',
        //     trigger: 'change',
        //   },
        // ],
        startTime: [
          {
            type: 'date',
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        endTime: [
          {
            type: 'date',
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        applyFileName: [
          {
            required: true,
            message: '请上传',
            trigger: 'blur',
          },
        ],
        shareOff: [
          {
            required: true,
            message: '请输入',
            trigger: 'change',
          },
        ],
        applyRemark: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur',
          },
          {
            min: 20,
            max: 500,
            message: '长度在 20 到 500 个字数',
            trigger: 'blur',
          },
        ],
        useAppSystem: [
          {
            required: false,
            message: '请输入',
            trigger: 'blur',
          },
        ],
        checkedList: [
          {
            required: true,
            message: '请至少选择一个数据项',
            trigger: 'change',
          },
        ],
      },
      rejectStatus: 0,
      processCode: '',
      // 导入模板
      impTemplate: 'import_template_file_name',
      queryType: '',
      checkFlag: false,
      catalogId: '',
      applyId: '',
    }
  },
  activated() {
    this.fetchQueryAppName()
    this.dictionaryList()
  },
  mounted() {},
  watch: {
    drawer(newVal) {
      if (!newVal) {
        this.catalogId = ''
        this.applyId = ''
      } else {
        this.showFile = true
      }
    },
  },
  methods: {
    handleChange(file, fileList) {
      let resFileName = file.name.split('.')
      //带文件名上传会覆盖模板（适用于更换模板操作）
      // this.fileName.fileName = resFileName[0]
      //不带文件名上传不会覆盖模板
      this.fileName.fileName = ''
    },
    handleUploadCancel() {
      this.upFileVisible = false
      this.showFile = false
      this.$refs.excleUpload.clearFiles()
    },
    fetchApplyInfo() {
      getApplyInfo(this.applyId)
        .then((res) => {
          if (res.code == 200) {
            this.catalogName = res.result.title
            this.catalogueData.catalogueApplyData.title = res.result.title
            this.catalogueData.catalogueApplyData.appSystem = res.result.appSystem
            this.catalogueData.catalogueApplyData.applyDept = res.result.applyDept
            this.catalogueData.catalogueApplyData.keyAreasType = res.result.keyAreasType
            this.catalogueData.catalogueApplyData.checkedList = []
            // 是否永久申请
            // this.$set(this.catalogueData.catalogueApplyData, 'ifForever', res.result.ifForever)
            // 启动时间
            this.$set(this.catalogueData.catalogueApplyData, 'startTime', res.result.startTime)
            // 结束时间
            this.$set(this.catalogueData.catalogueApplyData, 'endTime', res.result.endTime)
            // 上传文件名
            this.$set(this.catalogueData.catalogueApplyData, 'applyFileName', res.result.applyFileName)
            // 使用应用系统
            this.$set(this.catalogueData.catalogueApplyData, 'useAppSystem', res.result.useAppSystem)
            // 说明
            this.$set(this.catalogueData.catalogueApplyData, 'applyRemark', res.result.applyRemark)
            this.submitData.shareType = res.result.shareType
            // this.catalogueData.catalogueApplyData = res.result
          } else {
            Message({
              message: res.header.message,
              type: 'error',
              customClass: 'messageIndex',
            })
          }
        })
        .catch((err) => {})
    },
    handleCancel() {
      this.drawerSmallMask2 = false
      // this.drawer = false
      // this.$refs.excleUpload.clearFiles()
      // this.clearDrawerData()
    },
    // 使用应用系统底部添加加号
    visibleChange(visible) {
      if (visible) {
        // 获取element select组件DOM结构
        let bkpRef = this.$refs.refSelect.popperElm
        if (!Array.from(bkpRef.children).some((v) => v.className === 'bkp_add_fixed_bottom_select')) {
          // 创建元素获取元素
          const el = document.createElement('div')
          el.className = 'bkp_add_fixed_bottom_select'
          el.style = `
                          font-size: 14px;
                          font-weight: 500;
                          height: 42px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          cursor: pointer;
                          padding-top:4px;
                          border-top:1px solid rgb(240 242 245)
                    `
          el.innerHTML = `
                          <span style="margin-right:8px">
                            <i class="el-icon-plus"></i>
                           </span>
                          <span>新增</span>
                      `
          bkpRef.appendChild(el)
          el.onclick = () => {
            // 底部按钮的点击事件 点击后想触发的逻辑也可以直接写在这
            this.onClickAdd()
            // 以下代码实现点击后弹层隐藏 不需要可以删掉
            if (bkpRef.toggleDropDownVisible) {
              bkpRef.toggleDropDownVisible(false)
            } else {
              bkpRef.visible = false
            }
          }
        }
      }
    },
    onClickAdd() {
      this.$router.push({
        path: '/systemmaintenance',
        query: {
          flag: true,
          add: '新增',
        },
      })
      this.drawer = false
    },
    // 使用应用系统
    fetchQueryAppName() {
      queryAppName().then((res) => {
        this.sourceList = res.body
      })
    },
    upLoadSubm() {
      this.upFileVisible = false
      this.showFile = false
      this.$refs.excleUpload.clearFiles()
    },
    dictionaryList() {
      getDictItems(this.impTemplate).then((res) => {
        // console.log(this.fileName.fileName)
        // 目录下架申请模板
        let downloadName = res.result.find((fileName) => {
          return fileName.text == '孝感市政务信息资源使用申请表'
        })
        this.downloadName = `${downloadName.text}.doc`
      })
    },
    handleFileUp() {
      this.upFileVisible = true
      this.showFile = true
    },
    // 上传成功的回调
    fileUploadSuccess(res, file, fileList) {
      if (res.success) {
        Message({
          message: `上传${res.header.message}`,
          type: 'success',
          customClass: 'messageIndex',
        })
        this.catalogueData.catalogueApplyData.applyFileName = file.response.body
      } else {
        Message({
          message: res.header.message,
          type: 'error',
          customClass: 'messageIndex',
        })
      }
    },
    fileUploadError(err, file, fileList) {
      console.log(err)
    },
    onDownload() {
      download({
        fileName: this.downloadName,
      })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = this.downloadName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },
    onProtocolDrawer() {
      this.protocolDrawer = false
      this.checke = true
      this.disabled = false
    },
    interfaceInit() {
      this.fetchApplyDefaultInfo()
    },
    clearDrawerData() {
      this.ProtocolDrawer = false
      this.isOpen = false
      this.showFile = false
      this.checked = false
      this.drawer = false
      this.checke = false
      this.disabled = true
      this.loading = false
      this.loading1 = false
      this.upFileVisible = false
      this.drawerSmallMask = false
      this.catalogueData.catalogueApplyData.ifForever = '0'
      this.catalogueData.catalogueApplyData.useAppSystem = ''
      this.catalogueData.catalogueApplyData.startTime = ''
      this.catalogueData.catalogueApplyData.endTime = ''
      this.catalogueData.catalogueApplyData.applyRemark = ''
      this.catalogueData.catalogueApplyData.applyFileName = ''
      this.$refs.catalogueformRules.resetFields()
    },
    //确认取消
    handeleAffirmSubmit() {
      this.upFileVisible = false
      this.drawer = false
      this.drawerSmallMask = false
      this.drawerSmallMask2 = false
      this.ProtocolDrawer = false
      this.clearDrawerData()
    },
    // 确认提交
    handleCatalogSubmit() {
      this.$refs.catalogueformRules.validate((valid) => {
        if (valid) {
          this.loading1 = true
          this.loading = true
          this.submitData.catalogId = this.catalogId
          this.submitData.shareType = this.title
          this.submitData.useAppSystem = this.catalogueData.catalogueApplyData.useAppSystem
          this.submitData.appSystem = this.catalogueData.catalogueApplyData.appSystem
          this.submitData.title = this.catalogueData.catalogueApplyData.title
          this.submitData.applyDept = this.catalogueData.catalogueApplyData.applyDept
          this.submitData.keyAreasType = this.catalogueData.catalogueApplyData.keyAreasType
          // this.submitData.ifForever = this.catalogueData.catalogueApplyData.ifForever
          this.submitData.endTime = this.catalogueData.catalogueApplyData.endTime
          this.submitData.startTime = this.catalogueData.catalogueApplyData.startTime
          this.submitData.applyFileName = this.catalogueData.catalogueApplyData.applyFileName
          this.submitData.applyRemark = this.catalogueData.catalogueApplyData.applyRemark
          this.handleGxApplyFiledItemBoList()
          if (this.queryType === '编辑') {
            this.fetchShareUpdate()
          } else {
            this.fetchShareSave()
          }
        } else {
          // return
          this.drawerSmallMask2 = false
          this.upFileVisible = false
        }
      })
      // setTimeout(() => {
      //   this.$emit('onInquire');//刷新驳回页面
      // }, 1000);
    },
    handleGxApplyFiledItemBoList() {
      this.submitData.gxApplyFiledItemBoList = []
      this.catalogueCataData.forEach((v) => {
        if (this.catalogueData.catalogueApplyData.checkedList.indexOf(v.name) != -1) {
          this.submitData.gxApplyFiledItemBoList.push(v)
        }
      })
    },
    handeSubmitBtn(e) {
      if (e) this.disabled = false
      else this.disabled = true
    },
    //审批任务
    fetchCompleteByDateId() {
      getCompleteByDateId({
        processCode: this.processCode,
      }).then((res) => {
        if (res.code == 200) {
          this.handeleAffirmSubmit()
          this.loading = false
          this.upFileVisible = false
          this.loading1 = false
          this.drawerSmallMask2 = false
          this.drawer = false
          this.$bus.$emit('handleUpdate')
        } else {
          this.upFileVisible = false
          this.drawerSmallMask2 = false
          this.drawer = false
        }
      })
    },
    //更新数据
    fetchShareUpdate() {
      getShareUpdate(this.submitData).then((res) => {
        if (res.success) {
          // this.applyId = res.applyId
          this.upFileVisible = false
          this.drawer = false
          this.drawerSmallMask2 = false
          this.fetchCompleteByDateId()
          this.handeleAffirmSubmit()
          Message({
            message: res.message,
            type: 'success',
            customClass: 'messageIndex',
          })
          setTimeout(() => {
            this.$emit('onInquire');//刷新驳回页面
          }, 1000);
        } else {
          Message({
            message: res.header.message,
            type: 'error',
            customClass: 'messageIndex',
          })
          this.drawerSmallMask2 = false
          this.loading = false
          this.loading1 = false
        }
      })
    },
    // 查询共享申请默认内容
    fetchApplyDefaultInfo() {
      getApplyDefaultInfo(this.catalogId).then((res) => {
        if (res.success) {
          this.catalogueData.catalogueApplyData.title = res.result.title
          this.catalogueData.catalogueApplyData.appSystem = res.result.appSystem
          this.catalogueData.catalogueApplyData.applyDept = res.result.applyDept
          this.catalogueData.catalogueApplyData.keyAreasType = res.result.keyAreasType
        } else {
          Message({
            message: res.header.message,
            type: 'error',
            customClass: 'messageIndex',
          })
        }
      })
    },
    // 查询关联的复选框数据项
    fetchDataItemInfo() {
      getDataItemInfo(this.catalogId, this.applyId).then((res) => {
        if (res.success) {
          this.catalogueCataData = res.result
          this.catalogueCataData.forEach((v) => {
            if (v.isShow == '1') {
              this.catalogueData.catalogueApplyData.checkedList.push(v.name)
            }
          })
        }
      })
    },
    //发起共享申请
    fetchStartShareApply() {
      getStartShareApply(this.submitData).then((res) => {
        if (res.success) {
          // Message({
          //   message: `操作${res.header.message}`,
          //   type: 'success',
          //   customClass: 'messageIndex',
          // })
          this.loading = false
          this.loading1 = false
          this.drawerSmallMask2 = false
          this.drawer = false
          this.handeleAffirmSubmit()
        } else {
          Message({
            message: res.header.message,
            type: 'error',
            customClass: 'messageIndex',
          })
          this.loading = false
          this.loading1 = false
          this.drawerSmallMask2 = false
        }
      })
    },
    //新增数据
    fetchShareSave() {
      getShareSave(this.submitData).then(async (res) => {
        if (res.code == 200) {
          this.catalogueData.catalogueApplyData.useAppSystem = res.result.useAppSystem
          this.catalogueData.catalogueApplyData.ifForever = '0'
          this.catalogueData.catalogueApplyData.applyFileName = res.result.applyFileName
          this.catalogueData.catalogueApplyData.startTime = res.result.startTime
          this.catalogueData.catalogueApplyData.endTime = res.result.endTime
          this.catalogueData.catalogueApplyData.applyRemark = res.result.applyRemark
          this.submitData.applyId = res.result.applyId
          this.loading1 = false
          this.loading = false
          this.upFileVisible = false
          Message({
            message: res.message,
            type: 'success',
            customClass: 'messageIndex',
          })
          this.handeleAffirmSubmit()
          this.fetchStartShareApply()
          setTimeout(() => {
            this.$emit('onInquire');//刷新驳回页面
          }, 1000);
        } else if (res.code === 500) {
          this.loading1 = false
          this.loading = false
          this.upFileVisible = false
          Message({
            message: res.message,
            type: 'error',
            customClass: 'messageIndex',
          })
        }
      })
    },
    // 取消/提交
    handeleBtns(flag) {
      flag ? (this.drawerSmallMask2 = true) : (this.drawerSmallMask = true)
    },
  },
}
</script>

<style lang="less" scoped>
#CatalogueDrawer {
  /deep/.title {
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    padding-left: 32px;
    font-weight: 500;
    border-bottom: 1px solid #1890ff;
  }

  .form-data-box {
    position: relative;

    .download {
      position: absolute;
      top: 60px;
      left: 156px;
      font-size: 12px;
      // width: 307px;
    }
  }

  .checkboxs {
    background: #f8fafb;
    padding: 32px;

    .itemss {
      height: 50px;
    }

    .items {
      word-break: break-word;
      white-space: pre-wrap;
    }
  }

  .protocol {
    padding: 32px;
    font-size: 14px;

    .font {
      color: #1890ff !important;
      font-weight: 400;
    }
  }

  .btns {
    text-align: end;
    padding: 20px 32px;
  }

  .protocolDrawer {
    .info {
      font-size: 16px;
      line-height: 22px;
    }
  }

  /deep/.link-ping .el-input__inner {
    // background: url(~@/assets/link.png) no-repeat 10px center;
    // background-position-x: 160px;
    cursor: pointer;
    height: 30px;
    width: 100%;
  }

  /deep/.el-form-item {
    margin-right: 0px !important;
  }
}

/deep/ .el-dialog__body {
  padding: 0 0;
}

/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  // height: 64px;
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
}

/deep/.el-dialog__title {
  color: #1890ff;
}

/deep/.cancel-btn {
  margin-left: 10px !important;
}

/deep/.upload-demo {
  text-align: center;
  padding: 24px 24px;
}

/deep/.el-dialog__footer {
  text-align: right;
  box-sizing: border-box;
  padding: 0 24px 24px 0;
}

.title-mask {
  height: 54px;
  border-bottom: 1px solid #418ff7;
  color: #418ff7;
}

.small-mask-info {
  display: flex;
  height: 200px;
  align-items: center;
  text-align: center;
  justify-content: center;
}

/deep/.is-required {
  width: 100%;
}
.expl-df {
  display: flex;
  /deep/.el-form-item__content {
    width: 100%;
  }
}
.check-df {
  /deep/.el-form-item__content {
    width: 100%;
  }
}
.apply-ipt {
  display: flex;
  /deep/.el-form-item__content {
    width: 100%;
    padding-top: 5px;
  }
  // .el-input__inner{
  //   width: 100% !important;
  // }
}
</style>
