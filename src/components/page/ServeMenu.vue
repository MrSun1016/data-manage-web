<template>
  <div id="ServeMenu">
    <div class="trees">
      <el-tree
        ref="treeRef"
        highlight-current
        class="tree-line"
        :data="citys"
        node-key="id"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <!-- :default-expanded-keys="['001']"
         :current-node-key="currentNodeKey"
          :default-checked-keys="[3]" -->
        <template slot-scope="{ node }">
          <el-tooltip effect="dark" :content="node.label" placement="top">
            <div style="overflow: hidden; text-overflow: ellipsis">{{ node.label }}</div>
          </el-tooltip>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mechanismTree2 } from '@/api/api'
export default {
  name: 'ServeMenu',
  data() {
    return {
      currentNodeKey: '',
      // isCitysOpen:false,
      citys: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  created() {
    this.chanismTree()
  },
  // watch: {
  //   $route: 'chanismTree',
  // },
  methods: {
    // 默认高亮显示
    chanismTree() {
      mechanismTree2().then((res) => {
        if (res.success) {
          this.citys = res.body
        }
        if (this.citys.length > 0) {
          this.currentNodekey = this.citys[0]
          this.$nextTick(() => {
            this.$refs.treeRef.setCurrentKey(this.currentNodekey)
          })
        }
      })
    },
    handleNodeClick(itemData) {
      if (itemData.name === '湖北省') {
        this.$bus.$emit('handleNode', '')
        this.$bus.$emit('changeHandleNode', '')
      } else {
        this.$bus.$emit('handleNode', itemData.name)
        this.$bus.$emit('changeHandleNode', itemData.name)
      }
    },
  },
}
</script>
<style lang="less" scoped>
#ServeMenu {
  width: 288px;
  // height: 100vh;
  .trees {
    width: 288px;
    height: 100%;
    // height: 1400px;
    // overflow: hidden;
    // overflow-y: scroll;
  }
  //  /deep/.el-tree-node__children{
  //     height: 1400px;
  //     overflow: hidden;
  //     overflow-y: scroll;
  //   }
  /deep/.tree-line {
    // width: 288px;
    padding-top: 20px;
    .el-tree-node {
      position: relative;
      padding-left: 7px; // 缩进量
    }
    // .el-tree-node__children {
    //   padding-left: 16px; // 缩进量
    // }

    // 竖线
    .el-tree-node::before {
      content: '';
      height: 100%;
      width: 1px;
      position: absolute;
      left: 15px;
      // left: -3px;
      top: -26px;
      border-width: 1px;
      border-left: 1px dashed #52627c;
    }
    // 当前层最后一个节点的竖线高度固定
    .el-tree-node:last-child::before {
      height: 38px; // 可以自己调节到合适数值
    }

    // 横线
    //   .el-tree-node::after {
    //     content: "";
    //     width: 24px;
    //     height: 20px;
    //     position: absolute;
    //     left: -3px;
    //     top: 12px;
    //     border-width: 1px;
    //     border-top: 1px dashed #52627C;
    //   }

    // 去掉最顶层的虚线，放最下面样式才不会被上面的覆盖了
    & > .el-tree-node::after {
      border-top: none;
    }
    & > .el-tree-node::before {
      border-left: none;
    }
    // 展开关闭的icon
    .el-tree-node__expand-icon {
      font-size: 16px;
      // 叶子节点（无子节点）
      &.is-leaf {
        color: transparent;
        display: none; // 也可以去掉
      }
    }
  }
  // 自定义图标
  /deep/.el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  /deep/.el-tree .el-icon-caret-right:before {
    background: url('../../assets/add.png') no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 25px;
    font-size: 18px;
    background-size: 18px;
  }
  /deep/.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    background: url('../../assets/minus.png') no-repeat 0 3px;
    content: '';
    display: block;
    width: 18px;
    height: 25px;
    font-size: 18px;
    background-size: 18px;
  }
  /deep/.el-tree-node__expand-icon.is-leaf::before {
    display: none;
  }
  /* 点击节点时的选中颜色 */
  /deep/ .el-tree-node.is-current > .el-tree-node__content {
    color: #1890ff !important;
  }
  /deep/.el-tree .tree-line {
    overflow: hidden !important;
  }
  /deep/.el-tree-node__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  // /deep/.el-tree-node__label:hover{
  //   color: red;
  // }
}
</style>
