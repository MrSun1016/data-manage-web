<template>
  <!-- 数据编目--类目管理 -->
  <div class="targetManagecopy">
    <el-card class="card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabsList"
          :key="item.id"
          :label="item.categoryName"
          :name="item.categoryName"
          v-loading="loading"
        >
          <el-button
            class="el-icon-plus addBtn"
            type="primary"
            size="small"
            @click="addToCategory = true"
            v-has="'management:addCategory'"
            >添加类目</el-button
          >
          <!-- v-show="item.categoryName == '基础库'" -->
          <el-tree
            :data="dataTreeList"
            node-key="id"
            default-expand-alle="false"
            :expand-on-click-node="false"
            class="tree"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="treelabelfont">{{ data.categoryName }}</span>
              <span>
                <i
                  class="el-icon-edit iconsize"
                  size="mini"
                  @click="() => update(node, data)"
                  v-has="'management:modify'"
                ></i>
                <i class="el-icon-delete iconsize" @click="() => remove(node, data)" v-has="'management:delete'"></i>
                <!-- <i class="el-icon-delete iconsize" @click="() => open(node, data)"></i> -->
              </span>
            </span>
          </el-tree>
          <!-- <div v-else class="no-data">暂无数据</div> -->
        </el-tab-pane>
      </el-tabs>
      <!-- 添加 -->
      <el-dialog title="添加" :visible.sync="addToCategory" width="30%" class="dialogbody">
        <el-divider class="dividerhrcol"></el-divider>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="80px" class="formwei">
          <el-form-item label="类目名称" class="onformitem" prop="addToName">
            <el-input v-model.trim="formData.addToName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="addToCategory = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addToCategoryitem('formData')">确 认</el-button>
        </span>
      </el-dialog>

      <!-- 修改 -->
      <el-dialog title="修改" :visible.sync="modifyCategory" width="30%" class="dialogbody">
        <el-divider class="dividerhrcol"></el-divider>
        <el-form :model="formData" :rules="rules" ref="formData" label-width="80px" class="formwei">
          <el-form-item label="类目名称" class="onformitem" prop="modifyName">
            <el-input v-model.trim="formData.modifyName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="modifyCategory = false">取 消</el-button>
          <el-button size="small" type="primary" @click="modifyCategoryitem('formData')">确 认</el-button>
        </span>
      </el-dialog>

      <!-- 点击删除 -->
      <el-dialog title="提示" :visible.sync="deleteDraft" width="30%">
        <el-divider class="dividerhrcol"></el-divider>
        <p class="dialogcenter"><i class="el-icon-info iconcolor"></i> 是否确认删除该目录？</p>
        <span slot="footer">
          <el-button size="small" @click="deleteDraft = false">取 消</el-button>
          <el-button size="small" type="primary" @click="deleteDraftli">确 认</el-button>
        </span>
      </el-dialog>
      <!-- 点击最近更新日期弹出更新记录 -->
      <el-drawer title :visible.sync="exceldrawer" direction="rtl" ref="exceldrawer" size="36%">
        <!-- <div class=" drawerdivposi"> -->
        <template slot="title">
          <div class="titleItem">{{ titleItem }}更新记录</div>
        </template>
        <el-divider></el-divider>
        <el-timeline class="timelinemargin">
          <el-timeline-item
            v-for="(item, index) in activities"
            :key="index"
            type="primary"
            color="#409EFF"
            placement="top"
          >
            <div class="timelineItem">
              <div class="year">{{ item.importTime || '-' }}</div>
              <!-- <div class="year">{{ item.address }}</div> -->
              <div class="item">
                <div style="margin-bottom: 5px">
                  <span>更新数据量：{{ item.importNum || '-' }}</span>
                </div>
                <div class="yearFlex">
                  <div>
                    <span>操作人：</span>
                    <span class="flexItem">{{ item.operator || '-' }}</span>
                  </div>
                  <div>
                    <span>操作部门：</span>
                    <span class="flexItem">{{ item.departName || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { addNewNodes, getTargetcopy, getNodes, updateNodes, getRootNodeId } from '@/api/api'
import { deleteAction } from '@/api/department'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'targetManagecopy',

  data() {
    return {
      // tabs的id
      activeName: '',
      // 点击的父节点id
      activeId: '',
      tabsList: [],
      dataTreeList: [],
      dataTreeid: '',
      loading: true,
      formData: {
        addToName: '',
        modifyName: ''
      },
      addToCategory: false,
      modifyCategory: false,
      dataId: '',
      // 删除的弹窗
      deleteDraft: false,
      treeItemId: '',
      rules: {
        addToName: [
          { required: true, message: '类目名称不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 判断是否重复
              let valveItem = this.dataTreeList.every(item => {
                return item.categoryName != value
              })
              if (!valveItem) {
                callback(new Error('类目名称重复，请重新输入'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ],
        modifyName: [
          { required: true, message: '类目名称不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              // 判断是否重复
              let valveItem = this.dataTreeList.every(item => {
                return item.categoryName != value
              })
              if (!valveItem) {
                callback(new Error('类目名称重复，请重新输入'))
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    // 页面树状结构数据
    this.getTargetcopyList()
  },
  methods: {
    // 页面树状结构数据
    getTargetcopyList() {
      // 最上面tabs的数据
      getNodes(10).then(res => {
        if (res.success) {
          this.tabsList = res.body
          this.activeName = this.tabsList[0].categoryName
          this.activeId = this.tabsList[0].id
        }
        this.getBranch()
      })
    },
    // tabs下面的树状结构图
    getBranch() {
      this.loading = true
      let ctoryId = this.activeId
      // if (ctoryId == '14') {
      //   let keyId = '100000'
      //   getRootNodeId(keyId).then(res => {
      //     if (res.success) {
      //       this.dataTreeList = res.body
      //       // this.dataTreeList.map((item, index) => {
      //       //   this.$set(item, 'categoryName', item.departName)
      //       //   item.id = item.id + ''
      //       // })

      //       let that = this
      //       function treeToArr(data) {
      //         data.forEach(item => {
      //           that.$set(item, 'categoryName', item.departName)
      //           if (item.children && item.children.length !== 0) {
      //             treeToArr(item.children)
      //           }
      //         })
      //         return data
      //       }
      //       this.dataTreeList = treeToArr(res.body)

      //       this.loading = false
      //     }
      //   })
      // } else {
        getTargetcopy(ctoryId).then(res => {
          if (res.success) {
            this.dataTreeList = res.body.children
          }
          this.loading = false
        })
      // }
    },

    // tablebar切换
    handleClick(tab, event) {
      let id = ''
      this.tabsList.map(item => {
        if (item.categoryName === tab.name) {
          id = item.id
        }
      })
      this.activeId = id
      console.log('this.activeId', this.activeId)
      this.getBranch()
    },

    // 点击修改
    update(node, data) {
      this.modifyCategory = true
      this.dataId = data.id
      this.formData.modifyName = data.categoryName
    },
    // 点击修改确认
    modifyCategoryitem(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            categoryName: this.formData.modifyName,
            id: this.dataId,
            parentId: this.activeId
          }
          updateNodes(params).then(res => {
            if (res.success) {
              Message({
                type: 'success',
                message: '修改成功'
              })
              this.getBranch()
            } else {
              Message({
                type: 'info',
                message: '修改失败'
              })
            }
            this.modifyCategory = false
            this.formData.modifyName = ''
          })
        } else {
          console.log('为空')
          return false
        }
      })
    },
    // 点击——删除
    remove(node, data) {
      this.deleteDraft = true
      this.treeItemId = data.id
    },
    deleteDraftli() {
      deleteAction(this.treeItemId).then(res => {
        if (res.success) {
          Message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          Message.warning(res.message)
        }
        this.deleteDraft = false
        this.getBranch()
        this.treeItemId = ''
      })
    },

    // 添加
    addToCategoryitem(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let newChild = {
            categoryName: this.formData.addToName,
            parentId: this.activeId
          }
          addNewNodes(newChild).then(res => {
            if (res.success) {
              // 发提交请求
              Message({
                type: 'success',
                message: '添加成功'
              })
              this.getBranch()
            } else {
              Message({
                type: 'info',
                message: '添加失败'
              })
            }
            this.addToCategory = false
            this.formData.addToName = ''
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  position: relative;
  min-height: 500px;
  .addBtn {
    margin: 24px 0;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #909399;
  }
}

// .tree{
//   padding: 16px 0;
// }
/deep/ .el-tree-node__content {
  height: 35px !important;
}
/deep/ .el-tree-node:focus > .el-tree-node__content {
  background: rgba(24, 144, 255, 0.12) !important;
}

/deep/ .el-tree-node:focus > .el-tree-node__content .el-tree-node__expand-icon {
  color: rgba(24, 144, 255, 0.12) !important;
}
.custom-tree-node {
  // flex: 1;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.treelabelfont {
  height: 50px !important;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  margin-right: 32px;
  // line-height: 20px;
}
.iconsize {
  width: 16px;
  height: 16px;
  margin-left: 3px;
  color: #1890ff;
}
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
}

/deep/.el-dialog__body {
  padding: 0;
}
.dialogbody {
  /deep/.el-dialog__body {
    padding: 0;
  }
}

.el-divider--horizontal {
  margin: 0 0 5px 0;
}
.formwei {
  width: 100%-20px;
  margin: auto;
  padding: 60px 0;
}
.onformitem {
  margin-top: 40px;
}
.formitemmargn {
  margin: 100px 0 0 200px;
}
.dialogcenter {
  padding: 100px 0;
  text-align: center;
  font-size: 16px;
  color: #000000;
}
/deep/.el-dialog__footer {
  padding: 10px 33px 20px;
}
.dialog-footer {
  margin-top: 100px;
}
</style>
