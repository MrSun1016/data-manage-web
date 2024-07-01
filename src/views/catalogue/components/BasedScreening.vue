<template>
  <div id="BasedScreening">
    <div class="data-format">
      <ul class="search-criteria">
        <li style="color: #333333; margin-right: 32px">数据格式</li>
        <li
          class="items"
          :class="itemlist.isSelected ? 'active' : ' '"
          @click="changeresource(index, itemlist)"
          v-for="(itemlist, index) in resource.dataFormat"
          :key="itemlist.value"
        >
          <span>
            <span> {{ itemlist.title }} （{{ itemlist.title == '全部' ? allNum : gatherNum[index - 1] || '0' }}）</span>
          </span>
          <!-- <span> {{ itemlist.total }}</span> -->
        </li>
      </ul>
      <ul class="search-criteria">
        <li style="color: #333333; margin-right: 32px">共享类型</li>
        <li
          class="items"
          @click="changeShare(index, itemlist)"
          :class="itemlist.isSelected ? 'active' : ' '"
          v-for="(itemlist, index) in share.dataFormat"
          :key="itemlist.value"
        >
          <span>{{ itemlist.title }}（{{ itemlist.title == '全部' ? allNum : dataTypeNum[index - 1] || '0' }}）</span>
        </li>
      </ul>
      <ul class="search-criteria">
        <li style="color: #333333; margin-right: 32px">开放类型</li>
        <li
          class="items"
          @click="changeOpen(index, itemlist)"
          :class="itemlist.isSelected ? 'active' : ' '"
          v-for="(itemlist, index) in open.dataFormat"
          :key="itemlist.value"
        >
          <span>{{ itemlist.title }}（{{ itemlist.title == '全部' ? allNum : open_type[index - 1] || '0' }}）</span>
          <!-- <span> {{ itemlist.total }}</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDictItems, getCatalogAmount } from '@/api/api'
import qs from 'qs'
export default {
  name: 'BasedScreening',
  // props: {
  //   searchParams: {
  //     type: Object
  //   }
  // },
  data() {
    return {
      allNum: 0,
      dataTypeNumList: [],
      dataTypeNum: [],
      open_type: [],
      gatherNum: [],
      // 数据字典
      dataDictionary: {
        // 数据格式
        datatype: 'data_type',
        // 共享类型
        sharetype: 'share_type',
        // 开放类型
        opentype: 'open_type'
      },
      isActive: 0,
      resourceType: [],
      shareType: [],
      openType: [],

      resource: {
        title: '数据格式',
        dataFormat: []
      },
      share: {
        title: '共享类型',
        dataFormat: []
      },
      open: {
        title: '开放类型',
        dataFormat: []
      },
      categoryCode: '',
      treeItemId: ''
    }
  },
  activated() {
    this.categoryCode = ''
    this.fetchCatalogAmount()
  },
  created() {
    this.dictionaryList()
  },
  mounted() {
    this.$bus.$on('onReset', _ => {
      // this.resourceType = ['']
      // this.shareType = ['']
      // this.openType =['']
    })
    // 编目共享类型数据数量
    this.$bus.$on('code', keyNameList => {
      console.log(keyNameList, '======')
      // this.categoryCode = qs.stringify({ categoryCode: keyNameList.keyName })
      // this.treeItemId = qs.stringify({ treeItemId:keyNameList.treeItemId})
      this.categoryCode = keyNameList.keyName
      this.treeItemId = keyNameList.treeItemId
      this.fetchCatalogAmount()
      // getCatalogAmount(categoryCode).then((res) => {
      //   console.log(res,'基本搜索')
      //   if (res.success) {
      //     this.dataTypeNumList = res.body.dataTypeNumList
      //     this.allNum = res.body.allNum
      //     // 共享类型
      //     this.dataTypeNum = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('share_type'))
      //       .map((x) => Object.values(x)[0])
      //     // 开放类型
      //     this.open_type = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('open_type'))
      //       .map((x) => Object.values(x)[0])
      //     let tableAmount = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('tableAmount'))
      //       .map((x) => Object.values(x)[0])
      //     let apiAmount = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('apiAmount'))
      //       .map((x) => Object.values(x)[0])
      //     let collectNoAmount = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('collectNoAmount'))
      //       .map((x) => Object.values(x)[0])
      //     this.gatherNum = [...tableAmount, ...apiAmount, ...collectNoAmount]
      //   }
      // })
    })
  },
  // watch: {
  //   '$route.query.search': {
  //     handler(val, oldVal) {
  //       if (val != null) {
  //         this.fetchCatalogAmount( val)
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   },
  // },
  beforeDestroy() {
    this.$bus.$off('code')
  },
  methods: {
    // 重置
    resetBased() {
      this.resource.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.share.dataFormat.forEach(list => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.open.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.resourceType = []
      this.shareType = []
      this.openType = []
    },
    fetchCatalogAmount(val) {
      this.catalogName = val
      if (this.catalogName == undefined) {
        this.catalogName = ''
      }
      getCatalogAmount(this.categoryCode, this.treeItemId, this.catalogName).then(res => {
        if (res.success) {
          this.dataTypeNumList = res.body.dataTypeNumList
          this.allNum = res.body.allNum
          // 共享类型
          this.dataTypeNum = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('share_type'))
            .map(x => Object.values(x)[0])
          // 开放类型
          this.open_type = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('open_type'))
            .map(x => Object.values(x)[0])
          let tableAmount = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('tableAmount'))
            .map(x => Object.values(x)[0])
          let apiAmount = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('apiAmount'))
            .map(x => Object.values(x)[0])
          let collectNoAmount = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('collectNoAmount'))
            .map(x => Object.values(x)[0])
          this.gatherNum = [...tableAmount, ...apiAmount, ...collectNoAmount]
        }
      })
    },
    dictionaryList() {
      let { datatype, sharetype, opentype } = this.dataDictionary
      // 数据格式
      getDictItems(datatype).then(res => {
        if (res.success) {
          this.resource.dataFormat = res.result
          this.resource.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.resource.dataFormat.unshift(obj)
        }
      })
      // 共享类型
      // this.$store.dispatch('getSharetypeList', sharetype)
      getDictItems(sharetype).then(res => {
        if (res.success) {
          this.share.dataFormat = res.result
          this.share.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.share.dataFormat.unshift(obj)
        }
      })
      // 开放类型
      // this.$store.dispatch('getOpentypeList', opentype)
      getDictItems(opentype).then(res => {
        if (res.success) {
          this.open.dataFormat = res.result
          this.open.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.open.dataFormat.unshift(obj)
        }
      })
    },
    changeresource(index, itemlist) {
      // this.isActive = index
      if (itemlist.title == '全部') {
        this.resourceType = []
        this.resource.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.resourceType.indexOf(itemlist.title)
        if (ind === -1) {
          this.resourceType.push(itemlist.title)
        } else {
          this.resourceType.splice(ind, 1)
        }

        if (this.resourceType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            // let whole = this.resourceType.indexOf('全部')
            // this.resourceType.splice(whole, 1)
            this.resource.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('changeResource', this.resourceType)
    },
    changeShare(index, itemlist) {
      console.log(index, itemlist)
      if (itemlist.title == '全部') {
        this.shareType = []
        this.share.dataFormat.forEach(list => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.shareType.indexOf(itemlist.value)
        if (ind === -1) {
          this.shareType.push(itemlist.value)
        } else {
          this.shareType.splice(ind, 1)
        }

        if (this.shareType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            this.share.dataFormat.forEach(list => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('changeShare', this.shareType)
    },
    changeOpen(index, itemlist) {
      if (itemlist.title == '全部') {
        this.openType = []
        this.open.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.openType.indexOf(itemlist.value)
        if (ind === -1) {
          this.openType.push(itemlist.value)
        } else {
          this.openType.splice(ind, 1)
        }

        if (this.openType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            this.open.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('changeOpen', this.openType)
    }
  }
}
</script>

<style lang="less" scoped>
#BasedScreening {
  padding: 0 32px;
  .data-format {
    .search-criteria {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      //   height: 70px;
      margin: 0;
      padding: 15px 0;
      list-style: none;
      border-bottom: 1px solid #dcdee0;
      .items {
        margin-right: 16px;
        cursor: pointer;
      }
    }
  }
  .active {
    color: #1890ff;
  }
}
</style>

