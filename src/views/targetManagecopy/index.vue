<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsList" :key="index" :label="item.categoryName" :name="item.id">
        <el-card>
          <el-tree :data="dataTreeList" node-key="id" default-expand-alle="false" :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="treelabelfont">{{ data.categoryName }}</span>
              <span>
                <i class="el-icon-edit iconsize" size="mini" @click="() => update(node, data)"></i>
                <i class="el-icon-remove-outline iconsize" @click="() => remove(node, data)"></i>
                <i class="el-icon-circle-plus-outline iconsize" @click="() => open(node, data)"></i>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { addNewNodes, getTargetcopy, getNodes, updateNodes } from '@/api/api'
import { deleteAction } from '@/api/department'
import { MessageBox, Message } from 'element-ui'

export default {
  name: 'targetManagecopy',

  data() {
    return {
      // tabs的id
      activeName: '101',
      tabsList: [],
      dataTreeList: []
    }
  },
  created() {
    // 页面树状结构数据
    this.getTargetcopyList()
  },
  methods: {
    // 页面树状结构数据
    async getTargetcopyList() {
      // 最上面tabs的数据
      getNodes(-1).then(res => {
        if (res.success) {
          this.tabsList = res.body
        }
      })
      // tabs下面的树状结构图
      let ctoryId = this.activeName
      let res = await getTargetcopy(ctoryId)
      if (res.success) {
        // console.log(res)
        this.dataTreeList = res.body.children
      }
    },

    // tablebar切换
    handleClick(tab, event) {
      // console.log(tab, event)
    },

    // 点击修改
    update(node, data) {
      this.$prompt('修改类目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不能为空'
      })
        .then(({ value }) => {
          console.log(value)
          console.log(data)
          var params = { categoryName: value, categoryCode: data.categoryCode, id: data.id, parentId: this.activeName }

          updateNodes(params)
          // 修改成功调用数据请求
          this.getTargetcopyList()

          // 发提交请求
          Message({
            type: 'success',
            message: '保存成功'
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
          })
        })
    },

    // 点击——删除
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      console.log(node, data)
      let ctoryId = data.id
      console.log(ctoryId)
      deleteAction(ctoryId).then(res => {
        if (res.success) {
          // this.getTargetcopyList()
          console.log(25)
        }
      })
    },
    addnode(params) {
      console.log('pinfo', params)
    },
    // 点击添加的弹窗
    async open(node, data) {
      this.$prompt('类目名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '不能为空'
      })
        .then(({ value }) => {
          var that = this
          let uucode = 100
          var newChild = { categoryName: value, parentId: this.activeName, category_code: uucode++ }

          that.dataTreeList.push(newChild)

          let params = newChild

          addNewNodes(params)

          // 发提交请求
          Message({
            type: 'success',
            message: '保存成功'
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  // flex: 1;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.treelabelfont {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.iconsize {
  width: 16px;
  height: 16px;
  margin-left: 3px;
}
</style>
