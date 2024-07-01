<template>
  <div id="menus-left">
    <!-- :default-active="activeIndex" -->
    <div class="menusSearch">
      <el-input class="menusInput" placeholder="请输入关键字" suffix-icon="el-icon-search" v-model="filterText">
      </el-input>
    </div>
    <el-tree
      :data="tabsList"
      :props="defaultProps"
      node-key="id"
      accordion
      :current-node-key="currentNodeKey"
      :highlight-current="true"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      ref="tree"
    >
      <!-- @check-change="handleRoleChange" -->
    </el-tree>
  </div>
</template>

<script>
import MenuTree from '@/components/page/MenuTree'
import { getTargetcopy, getNodesShare, queryDeptTreeList, getRootNodeId } from '@/api/api'
export default {
  name: 'SideMenu',
  components: {
    MenuTree
  },
  data() {
    return {
      activeTextColor: '#1890FF',
      currentNodeKey: 0,
      // activeIndex: '1',
      tabsList: [],
      defaultProps: {
        children: 'children',
        label: 'categoryName'
      },
      dataTreeList: [],
      indexId: '',
      isShowItem: false,
      keyPathId: '',
      loading: false,
      filterText: ''
    }
  },
  activated() {
    this.getTargetcopyList()
  },
  mounted() {
    this.$bus.$on('closename', () => {
      // console.log('currentNodeKey')
      this.$refs.tree.setCurrentKey(null)
      const nodes = this.$refs.tree.store._getAllNodes()
      nodes.forEach(item => {
        item.expanded = false
      })
      this.filterText = ''
      this.currentNodeKey = 0
    })
  },
  beforeDestroy() {
    this.$bus.$off('closename')
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.path == '/service/serviceitem') {
          this.$refs.menu.close(this.indexId)
          this.$refs.menu.activeIndex = null
        }
      },
      // 深度观察监听
      deep: true
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    treeToArr(data) {
      data.forEach(item => {
        this.$set(item, 'categoryName', item.departName)
        if (item.children && item.children.length !== 0) {
          // item.categoryName = item.categoryName + '(' + item.children.length + ')'
          this.treeToArr(item.children)
        }
      })
      return data
    },
    // 页面树状结构数据
    getTargetcopyList() {
      this.loading = true
      // 最上面tabs的数据
      this.tabsList = []
      getNodesShare(10).then(res => {
        if (res.success) {
          this.tabsList = res.body
          this.tabsList.map((item, index) => {
            item.id = item.id + ''
          })
          this.loading = false
          this.handleOpen()
        }
      })
    },
    // tabs下面的树状结构图
    async handleOpen() {
      // 部门
      await queryDeptTreeList().then(res => {
        if (res.success) {
          this.tabsList[2].children = this.treeToArr(res.result)
          // this.isShowItem = false
        }
      })
      // 区县
      let keyId = '100000'
      getRootNodeId(keyId).then(res => {
        if (res.success) {
          this.tabsList[3].children = this.treeToArr(res.body)
          // this.tabsList[2].children = treeToArr(res.result)

          // this.isShowItem = false
          this.addQuantity()
        }
      })
    },
    addQuantity() {
      function treeToArrList(data) {
        var that = this
        data.forEach(item => {
          // that.$set(item, 'category', item.categoryName)
          item.category = item.categoryName
          // that.$set(item, 'categoryName', item.departName)
          if (item.children && item.children.length !== 0) {
            item.categoryName = item.categoryName + '(' + item.children.length + ')'
            treeToArrList(item.children)
          }
        })
        return data
      }
      this.tabsList = treeToArrList(this.tabsList)
      console.log('this.tabsList', this.tabsList)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    handleNode(data, keyPath) {
      console.log('111111', data, keyPath)
      this.currentNodeKey = data.id
      let keyNameList = {
        keyName: data.category,
        treeItemId: ''
      }
      if (keyPath == '基础信息资源目录' || keyPath == '主题信息资源目录') {
        // this.dataTreeList.map(item => {
        //   if (item.categoryName == key) {
        keyNameList.keyName = data.id
        //   }
        // })
        keyNameList.treeItemId = '1'
      } else if (keyPath == '部门信息资源目录') {
        keyNameList.treeItemId = '2'
      } else if (keyPath == '区县信息资源目录') {
        keyNameList.treeItemId = '3'
      }
      if (
        keyNameList.keyName != '基础信息资源目录' &&
        keyNameList.keyName != '主题信息资源目录' &&
        keyNameList.keyName != '部门信息资源目录' &&
        keyNameList.keyName != '区县信息资源目录'
      ) {
        this.$bus.$emit('code', keyNameList)
      }
    },
    handleNodeClick(item, data) {
      this.parentTreeNodeList = []
      this.getParent(data)
      var num = this.parentTreeNodeList.length - 1
      var name = this.parentTreeNodeList[num].category
      this.handleNode(item, name)
    },
    // 根据当前获取的tree节点信息查找父节点
    getParent(node) {
      if (node.isLeaf == false && node.parent.parent == null) {
        //
        this.parentTreeNodeList.push(node.data)
      } else {
        if (node.isLeaf == false && node.parent.parent != null) {
          //
          this.parentTreeNodeList.push(node.data)
          this.getParent(node.parent)
        } else if (node.isLeaf == true && node.parent.parent != null) {
          this.parentTreeNodeList.push(node.data)
          this.getParent(node.parent)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#menus-left {
  width: 100%;
  height: calc(100vh - 64px);
  .menusSearch {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #dde1e7;
    .menusInput {
      width: 90%;
    }
  }

  /deep/ .el-tree {
    width: 288px;
    background-color: #f5f5f5;
  }
  /deep/ .el-tree-node {
    width: 100%;
    // height: 40px;
    // line-height: 40px;
    padding: 15px !important;
    // margin-bottom: 15px;
    border-top: 1px solid #dcdee0;
  }
  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: transparent; //背景色
    color: #1890ff;
  }
}
</style>
