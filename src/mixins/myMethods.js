const myMethods = {
  methods:{
    // 原始树数据结构调整
    getTreeData(data,allnode,treeI,parentIds,isValue,isType){
      // data:树数据，allnode：全部指标，treeI:层级,parentIds:父节点集合,isValue:是否需要value,isType:是否区分类型
      if(allnode){
        treeI ++
      }else{
        allnode = []
        treeI = 0
      }
      data.map((item,index) => {
        // 是否需要value字段
        if(isValue){
          Object.assign(item,{value:item.domainId})
        }
        // 判断是否具有状态字段
        if(item.status){
          Object.assign(item,{scopedSlots: { title: 'title',status:'status' },title:item.domainName,key:item.domainId,level:treeI,})
        }else{
          Object.assign(item,{scopedSlots: { title: 'title',level:'level',icon:'icons',type:'type' },title:item.domainName,key:item.domainId,level:treeI,})
        }
        // 判断是否有父节点集
        if(parentIds != undefined){
          Object.assign(item,{parentIds:parentIds + ',' + item.parentId})
        }else{
          Object.assign(item,{parentIds:'-1'})
        }
        // if(treeI == 2){
        //   Object.assign(item,{type: 'business'})
        // }
        let i = ''
        // 业务域
        if(item.type&&item.type == 1){
          Object.assign(item,{slots:{icon:'business'},key:'a'+item.domainId})
          i = 'a'+item.domainId
        }
        // 业务指标
        if(item.type&&item.type == 2){
          Object.assign(item,{slots:{icon:'bIndex'},key:'b'+item.domainId})
          i = 'b'+item.domainId
        }
        // 计算指标
        if(item.type&&item.type == 3){
          Object.assign(item,{slots:{icon:'cIndex'},key:'c'+item.domainId})
          i = 'c'+item.domainId
        }
        allnode.push({title:item.domainName,key:item.type?i:item.domainId,level:treeI,upId:item.parentId,})
        if(item.children.length>0){
          let childrenData = this.getTreeData(item.children,allnode,treeI,item.parentIds,isValue)
          // item.title = item.title + "（"+ childrenData.data.length +"）"
          Object.assign(allnode,childrenData.allnode)
          Object.assign(item,{isLeaf:false})
        }else{
          Object.assign(item,{isLeaf:true})
        }
      })
      let backData  = {
        data,
        allnode
      }
      return backData
    },
  }
}

export  { myMethods }