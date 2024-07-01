<template>
  <div class="business-tree-page">
    <!-- 搜索栏 -->
    <div class="query">
      <a-input class="queryInput" v-model="businessText">
        <a-icon slot="suffix" type="search" />
      </a-input>
    </div>
    <!-- 组织树 -->
    <div class="tree-box">
      <a-tree
        v-if="reset"
        :expanded-keys="expandedKeys"
        :default-expand-all="true"
        @expand="onExpand"
        :tree-data="realityData"
        :auto-expand-parent="autoExpandParent"
        @select="clickTree"
        :default-selected-keys="[defaultSelect]"
      >
        <!-- 自定义节点名称，实现搜索、右键 -->
        <template slot="title" slot-scope="{ title, key, level, status, type, isLeaf }">
          <div class="tree-title">
            <!-- 不启用右键功能 -->
            <span v-if="type == 1">
              <img  src="@/assets/file_icon.svg" class="logo logo-img" alt="logo">
            </span>
            <span v-if="type == 2">
              <img  src="@/assets/yw_icon.svg" class="logo logo-img" alt="logo">
            </span>
           
            <!-- <div v-if="!isRMenu || type != 2"> -->
            <div>
              <span v-if="title.indexOf(businessText) > -1">
                <span v-if="status">
                  <span v-show="status == '1'" class="up"></span>
                  <span v-show="status == '2'" class="out"></span>
                </span>
                <span v-if="type == 3">
                  <img  src="@/assets/js_icon.svg" class="logo logo-img" alt="logo">
                </span>
                {{ title.substr(0, title.indexOf(businessText)) }}
                <span style="color: #f50">{{ businessText }}</span>
                {{ title.substr(title.indexOf(businessText) + businessText.length) }}
              </span>
                <span v-else>
                <span v-if="status">
                  <span v-show="status == '1'" class="up"></span>
                  <span v-show="status == '2'" class="out"></span>
                </span>
                {{ title }}
                <a-icon type="more" />
              </span>
            </div>
            
            <!-- 启用右键功能 -->
            <!-- <a-dropdown :trigger="['contextmenu']" v-else>
              
              <span v-if="title.indexOf(businessText) > -1">
                <span v-if="status">
                  <span v-show="status == '1'" class="up"></span>
                  <span v-show="status == '2'" class="out"></span>
                </span>
                {{ title.substr(0, title.indexOf(businessText)) }}
                <span style="color: #f50">{{ businessText }}</span>
                {{ title.substr(title.indexOf(businessText) + businessText.length) }}
              </span>
              <span v-else>
                <span v-if="status">
                  <span v-show="status == '1'" class="up"></span>
                  <span v-show="status == '2'" class="out"></span>
                </span>
                {{ title }}
              </span>
              
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="() => addIndex(key)">新建计算指标</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown> -->
            <!-- 新建计算指标 -->
            <a-popover v-if="isRMenu && type == 2" class="more-menu" :title="null" trigger="click" placement="right">
              <template slot="content">
                <p class="menu-option-no" @click="() => addIndex(key)" >新建计算指标</p>
              </template>
              <a-icon type="more" @click.stop="moreMenu()" />
            </a-popover>

            <a-popover v-if="isRMenu && type == 3" class="more-menu" :title="null" trigger="click" placement="right">
              <template slot="content" v-if="status == 1">
                <p class="menu-option-no" @click="() => changIndex(key,'offine')" >下线</p>
              </template>
              <template slot="content" v-if="status == 2">
                <p class="menu-option" @click="() => changIndex(key,'online')" >上线</p>
                <p class="menu-option-no" @click="() => changIndex(key,'deleted')" >删除</p>
              </template>
              <a-icon type="more" @click.stop="moreMenu()" />
            </a-popover>
            <!-- 组织树增删改 -->
            <a-popover v-if="isEditTree && level < 3" class="more-menu" :title="null" trigger="click" placement="right">
              <template slot="content">
                <p class="menu-option" @click="changeTreeIndex('add', key)" v-if="level < 2">新增</p>
                <p :class="!isLeaf?'menu-option-no':'menu-option'" @click="changeTreeIndex('edit', key)">编辑</p>
                <p class="menu-option-no" @click="changeTreeIndex('deleted', key)" v-if="isLeaf">删除</p>
              </template>
              <a-icon type="more" @click.stop="moreMenu()" />
            </a-popover>

          </div>
        </template>
      </a-tree>
    </div>

    <!-- 指标开发-新建弹窗 -->
    <a-modal title="新建计算指标" :visible="addVisible" @ok="addOk" @cancel="addClose">
      <a-form-model
        :model="form"
        :rules="rules"
        ref="form"
        :label-col="{ span: 4, sm: { span: 4 } }"
        :wrapper-col="{ span: 18, sm: { span: 18 } }"
      >
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入指标名称" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 组织树增改弹窗 -->
    <a-modal
      :title="isTreeEdit ? '编辑树节点' : '添加树节点'"
      :visible="treeVisible"
      okText="保存"
      @ok="treeOk"
      @cancel="treeClose"
    >
      <a-form-model
        :model="treeForm"
        :rules="treeRules"
        ref="treeForm"
        :label-col="{ span: 8, sm: { span: 8 } }"
        :wrapper-col="{ span: 12, sm: { span: 12 } }"
      >
        <a-form-model-item label="节点名称" prop="domainName">
          <a-input ref="tree" v-model="treeForm.domainName" placeholder="请输入节点名称" />
        </a-form-model-item>
        <!-- <a-form-model-item label="是否为叶子节点" prop="isLeafNode">
          <a-radio-group v-model="treeForm.isLeafNode" >
            <a-radio :value="true"> 是 </a-radio>
            <a-radio :value="false"> 否 </a-radio>
          </a-radio-group>
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { myMethods } from '@/mixins/myMethods'
export default {
  name: 'BusinessTree',
  components: {},
  mixins: [myMethods],
  props: {
    // 业务树数据
    treeData: {
      type: Array,
      default: [],
    },
    // 是否启用右键菜单
    isRMenu: {
      type: Boolean,
      default: false,
    },
    // 组织树是否可编辑
    isEditTree: {
      type: Boolean,
      default: false,
    },
    defaultValue:{
      default:null
    }
  },
  data() {
    return {
      reset:true,
      // 展开项
      expandedKeys: [],
      // 父节点是否展开
      autoExpandParent: true,
      // 搜索数据
      businessText: '',
      // 实际组织树数据
      realityData: [],
      // 全部节点数据
      allNode: [],
      // 新建弹窗
      addVisible: false,
      // 表单数据
      form: {
        name: '',
      },
      // 表单校验规则
      rules: {
        name: [{ required: true, message: '请输入新建指标名称！', trigger: 'blur' }],
      },
      // 新建指标信息
      addData: {},
      // ====树节点增删改相关====
      // 新增/编辑树节点判断
      isTreeEdit: false,
      // 弹窗状态
      treeVisible: false,
      // 当前数据
      treeOnData: {},
      // 表单数据
      treeForm: {
        domainName: '',
        isLeafNode: true,
      },
      // 校验规则
      treeRules: {
        name: [{ required: true, message: '请输入新建指标名称！', trigger: 'blur' }],
      },
      // ===END===
      defaultSelect:'all',
    }
  },
  computed: {},

  watch: {
    // 输入框数据
    businessText(newV, oldV) {
      console.log(newV)
      const expandedKeys = []
      this.allNode.map((item) => {
        if (item.title.indexOf(newV) > -1) {
          expandedKeys.push(item.key)
        }
        return null
      })
      Object.assign(this, {
        expandedKeys,
        autoExpandParent: true,
      })
    },
    // 组织树传入数据
    treeData(newVal) {
      // console.log(newVal)
      let newTree = { ...this.getTreeData(this.treeData) }
      // 更新组织树数据
      this.realityData = [{
        // title:'全部'+`（${newTree.data.length}）`,
        title:'全部',
        key:'all',
        havaChildren:'true',
        level:-1,
        children:newTree.data,
        parentId:'-1',
        domainId:'all',
        scopedSlots: { title: 'title',level:'level',icon:'business' },
      }]
  
      this.allNode = newTree.allnode      
    },
  },
  created() {
    this.defaultSelect = this.defaultValue
    // console.log(this.realityData)
    // console.log(this.treeData)
    let newTree = { ...this.getTreeData(this.treeData) }
    // 初始化组织树数据
    this.realityData = [
      {
        // title: '全部' + `（${newTree.data.length}）`,
        title:'全部',
        key: 'all',
        havaChildren: 'true',
        level: -1,
        children: newTree.data,
        parentId: '-1',
        domainId: 'all',
        scopedSlots: { title: 'title', level: 'level', icon: 'business' },
      },
    ]
    // console.log(this.realityData)
    this.allNode = newTree.allnode
    this.expandedKeys = ['all']
    this.allNode.map((item) => {
      this.expandedKeys.push(item.key)
    })
    // console.log(this.getTreeData(this.treeData))
  },
  methods: {
    // 树点击
    clickTree(tree, e) {
      let data = JSON.parse(JSON.stringify(e.selectedNodes[0].data.props))
      delete data.dataRef
      this.$emit('clickTree', data)
      console.log(tree,data)
    },
    // 右键
    // rightClick(e){
    //   this.$emit('rightClick',e)
    //   // console.log(e,n)
    // },
    // 树节点展开/关闭
    onExpand(openValue) {
      this.expandedKeys = openValue
      this.autoExpandParent = false
    },
    // 原始树数据结构调整
    // getTreeData(data,allnode,treeI){
    //   if(allnode){
    //     treeI ++
    //   }else{
    //     allnode = []
    //     treeI = 0
    //   }
    //   data.map((item,index) => {
    //     Object.assign(item,{scopedSlots: { title: 'title' },title:item.domainName,key:item.domainId})
    //     if(treeI == 2){
    //       Object.assign(item,{type: 'business'})
    //     }
    //     allnode.push({title:item.domainName,key:item.domainId,level:index})
    //     if(item.children){
    //       Object.assign(allnode,this.getTreeData(item.children,allnode,treeI).allnode)
    //     }else{

    //     }
    //   })
    //   let backData  = {
    //     data,
    //     allnode
    //   }
    //   return backData
    // },
    // 点击新建
    addIndex(key) {
      this.addData = []
      this.addVisible = true
      let that = this
      this.allNode.map((item) => {
        if (item.key == key) {
          that.addData = item
          return item
        }
        return null
      })
    },
    // 上线、下线、删除指标
    changIndex(key,type){
      let changeData = []
      this.allNode.map((item) => {
        if (item.key == key) {
          changeData = item
          return item
        }
        return null
      })
      this.$emit('changeIndex', changeData, type)
    },
    // 新建完成
    addOk() {
      // this.addVisible = false
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('addIndex', this.form, this.addData)
          this.addVisible = false
        } else {
          return false
        }
      })
    },
    addClose() {
      this.addVisible = false
    },
    moreMenu() {
      console.log('点击菜单')
    },
    // 树结构增删改
    changeTreeIndex(type, key) {
      this.treeForm = {}
      this.isTreeEdit = false
      this.treeOnData = {}
      let treeOrg = ''
      this.getTreeOrg(this.realityData, key, (data) => {
        treeOrg = data
      })
      // 存储选中节点信息
      this.treeOnData = JSON.parse(JSON.stringify(treeOrg))
      if (type == 'add') {
        // console.log('新增树',key,this.realityData,treeOrg)
        this.treeVisible = true
      }
      if (type == 'edit') {
        console.log('编辑树', this.treeOnData)
        this.treeVisible = true
        this.isTreeEdit = true
        Object.assign(this.treeForm, {
          domainName: this.treeOnData.domainName,
          isLeafNode: true,
        })
      }
      if (type == 'deleted') {
        console.log('删除树')
        this.$emit('changeTreeData', 'deleted', this.treeOnData)
      }
    },
    // 查询符合值的数据
    getTreeOrg(data, key, callback) {
      let treeOrg = ''
      data.map((item) => {
        if (item.key == key) {
          treeOrg = item
          callback(treeOrg)
          return
        } else if (item.children && item.children.length > 0) {
          this.getTreeOrg(item.children, key, (data) => {
            treeOrg = data
            if (treeOrg != 'error') {
              callback(treeOrg)
              return
            }
          })
        } else {
        }
      })
    },
    // 新增/编辑树节点确认
    treeOk() {
      this.$refs.treeForm.validate((valid) => {
        if (valid) {
          // console.log(this.treeForm,'校验通过',this.treeOnData)
          Object.assign(this.treeForm, {
            parentId: this.treeOnData.parentId,
            level: this.treeOnData.level + 1,
            parentIds: this.treeOnData.parentIds,
            id: this.treeOnData.key,
          })
          if (this.isTreeEdit) {
            Object.assign(this.treeForm, {
              domainId: this.treeOnData.domainId,
              parentIds: this.treeOnData.parentIds,
            })
          }
          this.$emit('changeTreeData', this.isTreeEdit ? 'edit' : 'add', this.treeForm)
          this.treeVisible = false
        } else {
          this.treeVisible = false
          return false
        }
      })
    },
    treeClose() {
      this.treeVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.business-tree-page {
  border: 1px solid #f2f2f2;
  margin-right: 10px;
  background-color: #fff;
  width: 230px;
  .query {
    .queryInput {
      /deep/ input {
        border: none;
        border-radius: 0;
      }
    }
    display: flex;
    > button {
      border: none;
      /deep/ i {
        line-height: 1;
      }
    }
    border-bottom: 2px solid #f2f2f2;
  }
  .tree-box{
    // height: calc(100% - 44px);
    height: 50%;
    min-height:520px;
    margin: 5px 10px;
    overflow: auto;
  }
  .myPop {
    display: flex;
  }

  .up {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #00cc99;
  }
  .out {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #999;
  }
  /deep/ .tree-title {
    display: flex;
  }
}
.more-menu {
  line-height: 29px;
  margin-left: 5px;
  // position: relative;
  // top:-22px;
  // right: -100px;
  // .menu-list{
  //   padding: 10px;
  // }
  
}
</style>
