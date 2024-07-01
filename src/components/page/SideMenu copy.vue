<template>
  <div id="menus-left">
    <!-- :default-active="activeIndex" -->
    <el-menu
      ref="menu"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333333"
      :active-text-color="activeTextColor"
      @open="handleOpen"
      @select="handleSelect"
    >
      <!-- @close="close" -->
      <el-submenu :index="item.categoryName" v-for="item in tabsList" :key="item.id">
        <template slot="title">
          <span style="margin-left: 12px">{{ item.categoryName }}</span>
        </template>
        <div class="diving" v-show="isShowItem">数据加载中...</div>
        <!-- <el-menu-item :index="item2.id" v-for="item2 in dataTreeList" :key="item2.id">
          <span>{{ item2.categoryName }}</span></el-menu-item
        > -->
        <MenuTree :dataTreeList="dataTreeList"></MenuTree>
      </el-submenu>
    </el-menu>
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
      // activeIndex: '1',
      tabsList: [],
      dataTreeList: [],
      indexId: '',
      isShowItem: false,
      keyPathId: ''
    }
  },
  activated() {
    this.getTargetcopyList()
    // this.$refs.menu.close(this.index)
  },
  mounted() {
    // this.getTargetcopyList()
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
    }
  },
  methods: {
    // 页面树状结构数据
    getTargetcopyList() {
      // 最上面tabs的数据
      getNodesShare(10).then(res => {
        if (res.success) {
          this.tabsList = res.body
          this.tabsList.map((item, index) => {
            item.id = item.id + ''
          })
        }
      })
    },
    // tabs下面的树状结构图
    handleOpen(key, keyPath) {
      this.indexId = key
      if (key == '部门信息资源目录') {
        this.isShowItem = true
        this.keyPathId = key
        this.dataTreeList = []
        queryDeptTreeList().then(res => {
          if (res.success) {
            // this.dataTreeList = res.result
            // this.dataTreeList.map((item, index) => {
            //   this.$set(item, 'categoryName', item.departName)
            //   item.id = item.id + ''
            // })
            let that = this
            function treeToArr(data) {
              data.forEach(item => {
                that.$set(item, 'categoryName', item.departName)
                if (item.children && item.children.length !== 0) {
                  treeToArr(item.children)
                }
              })
              return data
            }
            this.dataTreeList = treeToArr(res.result)
            this.isShowItem = false
          }
        })
      } else if (key == '区县信息资源目录') {
        this.isShowItem = true
        this.keyPathId = key
        this.dataTreeList = []
        let keyId = '100000'
        getRootNodeId(keyId).then(res => {
          if (res.success) {
            // this.dataTreeList = res.body
            // this.dataTreeList.map((item, index) => {
            //   this.$set(item, 'categoryName', item.departName)
            //   item.id = item.id + ''
            // })
            let that = this
            function treeToArr(data) {
              data.forEach(item => {
                that.$set(item, 'categoryName', item.departName)
                if (item.children && item.children.length !== 0) {
                  treeToArr(item.children)
                }
              })
              return data
            }
            this.dataTreeList = treeToArr(res.body)
            this.isShowItem = false
          }
        })
      } else if (key == '基础信息资源目录' || key == '主题信息资源目录') {
        this.isShowItem = true
        this.keyPathId = key
        let idKeyPath
        this.tabsList.map((item, index) => {
          if (item.categoryName == key) idKeyPath = item.id
        })
        this.dataTreeList = []
        getTargetcopy(idKeyPath).then(res => {
          if (res.success) {
            this.dataTreeList = res.body.children
            this.dataTreeList.map((item, index) => {
              item.id = item.id + ''
            })
            this.isShowItem = false
          }
        })
      }
    },
    handleSelect(key, keyPath) {
      // console.log('1111', key, keyPath)
      let keyNameList = {
        keyName: key,
        treeItemId: ''
      }
      if (keyPath[0] == '基础信息资源目录' || keyPath[0] == '主题信息资源目录') {
        this.dataTreeList.map(item => {
          if (item.categoryName == key) {
            keyNameList.keyName = item.id
          }
        })
        // console.log(keyNameList.keyName)
        keyNameList.treeItemId = '1'
      } else if (keyPath[0] == '部门信息资源目录') {
        keyNameList.treeItemId = '2'
      } else if (keyPath[0] == '区县信息资源目录') {
        keyNameList.treeItemId = '3'
      }
      if (
        keyNameList.keyName != '基础信息资源目录' &&
        keyNameList.keyName != '主题信息资源目录' &&
        keyNameList.keyName != '部门信息资源目录' &&
        keyNameList.keyName != '区县信息资源目录'
      ) {
        // console.log("'code'keyNameList", keyNameList)
        this.$bus.$emit('code', keyNameList)
      }
    }
    // close(){
    //   this.dataTreeList = []
    // }
  }
}
</script>

<style lang="less" scoped>
#menus-left {
  width: 288px;
  height: calc(100vh - 64px);
  .el-menu-vertical-demo {
    width: 288px;
    height: 100%;
    /deep/.el-submenu__title {
      border-bottom: 1px solid #dcdee0;
      height: 60px;
    }
    .diving {
      margin-left: 100px;
      color: #1890ff;
    }
    /deep/ .el-icon-arrow-down {
      margin-right: 32px;
    }
    // /deep/.el-submenu .el-menu-item {
    //   border-bottom: 1px solid #dcdee0;
    // }
  }
}
</style>
