import { getAction, deleteAction, putAction, postAction, httpAction, postDataAction, postBodyAction } from '@/api/manage'
import Vue from 'vue'
import { UI_CACHE_DB_DICT_DATA } from "@/store/mutation-types"

//主题管理配置
const addTheme = (params) => postAction("/table/theme/saveThemeInfo", params);
const editTheme = (params) => postAction("/table/theme/updateThemeInfo", params);

//online
const addOnline = (params) => postAction("/table/fromConfig/addFromConfigListInfo", params);
const editOnline = (params) => putAction("/table/fromConfig/editFromConfigListInfo", params);
//表单类型新增与修改
const addFormType = (params) => postAction("/table/fromType/saveFromTypeInfo", params);
const editFormType = (params) => postAction("/table/fromType/updateFromTypeInfo", params);

//上报类型新增与修改
const addReport = (params) => postAction("/table/report/saveReportTypeInfo", params);
const editReport = (params) => postAction("/table/report/updateReportTypeInfo", params);

//角色管理
const addRole = (params) => postAction("/sys/role/add", params);
const editRole = (params) => putAction("/sys/role/edit", params);
const editRole1 = (params) => putAction("/sys/sysDepartRole/edit", params);
const checkRoleCode = (params) => getAction("/sys/role/checkRoleCode", params);
const queryall = (params) => getAction("/sys/role/queryall", params);

//用户管理
const addUser = (params) => postAction("/sys/user/add", params);
const editUser = (params) => putAction("/sys/user/edit", params);
const queryUserRole = (params) => getAction("/sys/user/queryUserRole", params);
const getUserList = (params) => getAction("/sys/user/list", params); //IDM用户列表
const getIDMUserList = (params) => postAction("/imd/user/queryList", params); //授权
// const getAuthorization = (params) => postAction("/imd/user/authorization", params);
const getAuthorization = (params) => postBodyAction("/imd/user/authorization", params);
const frozenBatch = (params) => putAction("/sys/user/frozenBatch", params);
//验证用户是否存在
const checkOnlyUser = (params) => getAction("/sys/user/checkOnlyUser", params);
//改变密码
const changePassword = (params) => putAction("/sys/user/changePassword", params);

//权限管理
const addPermission = (params) => postAction("/sys/permission/add", params);
const editPermission = (params) => putAction("/sys/permission/edit", params);
const getPermissionList = (params) => getAction("/sys/permission/list", params);
/*update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params) => getAction("/sys/permission/getSystemMenuList", params);
const getSystemSubmenu = (params) => getAction("/sys/permission/getSystemSubmenu", params);
const getSystemSubmenuBatch = (params) => getAction('/sys/permission/getSystemSubmenuBatch', params)

const queryTreeList = (params) => getAction("/sys/permission/queryTreeList", params);
const queryTreeListForRole = (params) => getAction("/sys/role/queryTreeList", params);
const queryListAsync = (params) => getAction("/sys/permission/queryListAsync", params);
const queryRolePermission = (params) => getAction("/sys/permission/queryRolePermission", params);
const queryDepartRoleList = (params) => getAction("/sys/sysDepartRole/queryDepartRoleList", params);
const saveRolePermission = (params) => postAction("/sys/permission/saveRolePermission", params);
const sysDepartRoleAdd = (params) => postAction("/sys/sysDepartRole/add", params);
const sysDepartRoleEdit = (params) => postAction("/sys/sysDepartRole/edit", params);
const queryPermissionsByUser = (params) => getAction("/sys/permission/getUserPermissionByToken", params);
const loadAllRoleIds = (params) => getAction("/sys/permission/loadAllRoleIds", params);
const getPermissionRuleList = (params) => getAction("/sys/permission/getPermRuleListByPermId", params);
const queryPermissionRule = (params) => getAction("/sys/permission/queryPermissionRule", params);

// 部门管理
const queryDepartTreeList = (params) => getAction("/sys/sysDepart/queryTreeList", params);
const queryDimTreeList = (params) => getAction("/sys/sysDepart/queryDimTreeList", params);
const queryIdTree = (params) => getAction("/sys/sysDepart/queryIdTree", params);
const queryParentName = (params) => getAction("/sys/sysDepart/queryParentName", params);
const searchByKeywords = (params) => getAction("/sys/sysDepart/searchBy", params);
const deleteByDepartId = (params) => deleteAction("/sys/sysDepart/delete", params);

//二级部门管理
const queryDepartPermission = (params) => getAction("/sys/permission/queryDepartPermission", params);
const saveDepartPermission = (params) => postAction("/sys/permission/saveDepartPermission", params);
const queryTreeListForDeptRole = (params) => getAction("/sys/sysDepartPermission/queryTreeListForDeptRole", params);
const queryDeptRolePermission = (params) => getAction("/sys/sysDepartPermission/queryDeptRolePermission", params);
const saveDeptRolePermission = (params) => postAction("/sys/sysDepartPermission/saveDeptRolePermission", params);
const queryMyDepartTreeList = (params) => getAction("/sys/sysDepart/queryMyDeptTreeList", params);

//日志管理
const getLogList = (params) => postAction("/sys/log/list", params);
const deleteLog = (params) => deleteAction("/sys/log/delete", params);
const deleteLogList = (params) => deleteAction("/sys/log/deleteBatch", params);


//数据字典
const addDict = (params) => postAction("/sys/dict/add", params);
const editDict = (params) => putAction("/sys/dict/edit", params);
const treeList = (params) => getAction("/sys/dict/treeList", params);
const addDictItem = (params) => postAction("/sys/dictItem/add", params);
const editDictItem = (params) => putAction("/sys/dictItem/edit", params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params) => getAction(`/sys/dict/getDictItems/${code}`, params);
//从缓存中获取字典配置
function getDictItemsFromCache(dictCode) {
    if (Vue.ls.get(UI_CACHE_DB_DICT_DATA) && Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]) {
        let dictItems = Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode];
        // console.log("-----------getDictItemsFromCache----------dictCode="+dictCode+"---- dictItems=",dictItems)
        return dictItems;
    }
}

//系统通告
const doReleaseData = (params) => getAction("/sys/annountCement/doReleaseData", params);
const doReovkeData = (params) => getAction("/sys/annountCement/doReovkeData", params);
//获取系统访问量
const getLoginfo = (params) => getAction("/sys/loginfo", params);
const getVisitInfo = (params) => getAction("/sys/visitInfo", params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params) => getAction("/sys/user/queryUserByDepId", params);

// 重复校验
const duplicateCheck = (params) => getAction("/sys/duplicate/check", params);
// 加载分类字典
const loadCategoryData = (params) => getAction("/sys/category/loadAllData", params);
const checkRuleByCode = (params) => getAction('/sys/checkRule/checkByCode', params)
//加载我的通告信息
const getUserNoticeInfo = (params) => getAction("/sys/sysAnnouncementSend/getMyAnnouncementSend", params);
const getTransitURL = url => `/sys/common/transitRESTful?url=${encodeURIComponent(url)}`
//指标开发
const getclatree = (params) => getAction("/api/claIndex/query/cla_tree", params); //获取计算指标树
const addclaindex = (params) => postAction("/asset-cla-index/save", params); //新增指标开发
const getclainfo = (params) => getAction("/asset-cla-index/queryByObj", params); //查询指标开发详情
const updateclainfo = (params) => postAction("/asset-cla-index/update", params); //更新指标开发
const offLineclainfo = (params) => postAction("/asset-cla-index/offLine", params); //技术指标下线接口
const deleteclainfo = (params) => postAction("/asset-cla-index/delete", params); //技术指标删除接口
const onLineclainfo = (params) => postAction("/asset-cla-index/onLine", params); //技术指标上线接口


//指标管理
const getdomaintree = (params) => getAction("/api/asset/domain/domain_tree", params); //指标开发树
const getdomainAssetTree = (params) => getAction("/api/asset/index/domain_asset_tree", params); //获取业务域指标树
const gettargetdeatil = (indexCode, params) => getAction(`/api/asset/index/getAssetIndexByCode?indexCode=${indexCode}`, null);
const gettargetlist = (params) => postAction("/api/asset/index/list", params); //查询指标列表
const gettargetpage = (params) => postAction("/api/asset/index/page", params); //查询指标列表分页
const savetargeinfo = (params) => postAction("/api/asset/index/save", params); //新增assetIndex
const updatetargeinfo = (params) => postAction("/api/asset/index/update", params); //编辑assetIndex
const deletetargeinfo = (params) => deleteAction("/api/asset/index/delete", params); //删除assetIndex
const savedomain = (params) => postAction("/api/asset/domain/save", params); //新增业务域
const updatedomain = (params) => postAction("/api/asset/domain/update", params); //编辑业务域
const deletedomain = (params) => deleteAction("/api/asset/domain/delete", params); //删除业务域接口
//任务维护
//运行作业

const gettaskSelect = (params) => postAction("/api/kpi/subject/task/list", params); //查询任务列表 下拉框
const gettaskpage = (params) => postAction("/api/kpi/subject/task/page", params); //查询任务列表分页
const runTask = (params) => postAction("/api/kpi/subject/task/runTask", params); //批量运行任务
const stopTask = (params) => postAction("/api/kpi/subject/task/stopTask", params); //批量运行任务

//任务实例
const gettaskexamplespage = (params) => postAction("/api/cla/index/instance/page", params); //查询任务实例列表分页
const runTaskInstance = (params) => postAction("/api/cla/index/instance/runTaskInstance", params); //批量运行任务实例
const stopTaskInstance = (params) => postAction("/api/cla/index/instance/stopTaskInstance", params); //批量停止任务实例
const getTaskInstanceStatusList = (params) => getAction('/api/cla/index/instance/getTaskInstanceStatusList', params) //获取实例状态下拉列表
const getTaskInstanceLog = (params) => getAction('/api/cla/index/instance/getTaskInstanceLog', params) //获取实例运行日志
const gettaskInstancedetail = (taskInstanceId) => getAction(`/api/cla/index/instance/get/${taskInstanceId}`); //根据taskInstanceId获取任务实例详情接口

// ===绩效管理===
// 获取组织树信息
const getPerformanceTree = (params) => getAction('/api/claIndex/query/orgTree', params)
// 获取模板列表
const getModelLIst = (params) => postAction('/kpi/kpiSubject/list', params)
// 模板上线
const upOnline = (params) => postDataAction('/kpi/kpiSubject/online', params)
// 模板下线
const beOffine = (params) => postDataAction('/kpi/kpiSubject/offine', params)
// 删除模板
const deletedModel = (params) => postDataAction('/kpi/kpiSubject/delete', params)
// 添加指标
const getAddTarget = (params) => getAction('/kpi/kpiSubject/buildKpiConfigParam', params)
// 获取模板详情-查看与编辑
const getSubjectDetail = (params) => getAction('/kpi/kpiSubject/getSubjectDetail', params)
// 复制模板
const copyModel = (params) => postAction('/kpi/kpiSubject/copyKpiSubject', params)
// 根据业务域获取指标列表
const getModelTarget = (params) => postAction('/asset-cla-index/page', params)
// 保存考核主题
const saveModel = (params) => postAction('/kpi/kpiSubject/save', params)
// 获取模板版本信息
const getVer = (params) => postDataAction('/kpi/kpiSubject/queryVersionList', params)
// 版本切换
const switchedVer = (params) => postBodyAction('/kpi/kpiSubject/recoveryVersion', params)
// 保存新版本
const saveNewVer = (params) => postAction('/kpi/kpiSubject/copyNewVersion', params)
// 获取引用模板列表
const getQuoteModelList = (params) => postAction('/kpi/kpiSubject/querySubjectAssetList', params)
// const  = (params) => getAction('', params)


// 类目管理的树状结构的请求
// 获取树状结构上面tabs的数据
const getNodes = (nodeId, params) => putAction(`/api/category/getNodes?id=${nodeId}`, null)
// 四个
const getNodesShare = (nodeId, params) => putAction(`/api/category/getNodesShare?id=${nodeId}`, null)
// 获取页面数据渲染
const getTargetcopy = (ctoryId, params) => getAction(`/api/category/getDirectoryId?id=${ctoryId}`, null)
const getRootNodeId = (ctoryId, params) => getAction(`/api/category/getRootNodeId?parentId=${ctoryId}`, null)
const queryDeptTreeList = (params) => getAction('/sys/sysDepart/queryDeptTreeList', null)
// 修改节点
const updateNodes = (params) => postAction('/api/category/updateNodes', params)
// 新增
const addNewNodes = (params) => postAction('/api/category/addNodes', params) //数据编目的新增
// 编辑
const getaddNewget = (nodeId, params) => postAction(`/api/cataLog/get?id=${nodeId}`, null) //数据编目的编辑//数字
const getaddNewNodeList = (nodeId, params) => postAction(`/api/cataLog/view?id=${nodeId}`, null) //数据编目的编辑//中文

// const getaddNewNodeList = (params) => postAction('/api/cataLog/get', params) //数据编目的编辑


// 数据编目的请求
// 数据字典请求最上面的框
const getDictItems = (dictCode, params) => getAction(`/sys/dict/getDictItems/${dictCode}`, null)
// 数据编目主页面list数据
const postDataFromList = (params) => postAction('/api/cataLog/list', params)
// 数据编目主页面list数据分页
const postDataFromPage = (params) => postAction('/api/cataLog/page', params)


// 数据编目-新增页面-数据格式-数据库选择框-数据库名接口
// 库名
const postlistDatabase = (params) => postAction('/api/dataBase/listDatabase', params)
// 表名
const postRelationType = (params) => postAction('/api/dataBase/queryDataRelationByDataIdAndRelationTypeCopy', params)
// const postRelationTypeCopy = (params) => postAction('/api/dataBase/queryDataRelationByDataIdAndRelationTypeCopy', params)

const getDestTableFields = (params) => postAction('/api/shareData/getDestTableFields', params)
// 编目新增保存草稿箱的请求
const postAddSave = (params) => postAction('/api/cataLog/save', params)
// 编目新增编辑再保存的请求
const postUpdate = (params) => postAction('/api/cataLog/update', params)
// 编目新增提交审核的请求
const postsubmitCatalog = (params) => postAction('/api/flowcatalog/submitCatalog', params)
// 编目删除的请求
const postdeleteBatch = (params) => postAction('/api/cataLog/deleteBatch', params)
// 编目恢复的请求
const processRecovery = (params) => postAction('/api/flowcatalog/processRecovery', params)
// 编目批量导入模板
const postdownload = (dataName) => postAction(`/api/cataLog/download/${dataName}`, null)
// 编目复制
const copyCatalog = (params) => postAction('/api/cataLog/copyCatalog', params)
// 编目导出的数据请求
const getCataLogDataItem = (params) => postAction('/api/cataLog/getCataLogDataItem', null)
const getCataLogIndexItem = (params) => postAction('/api/cataLog/getCataLogIndexItem', null)
// const getExportXls = (params) => postAction('/api/cataLog/exportXls', params)
// 编目申请下架
const submitCatalogOffShelf = (params) => postAction('/api/flowcatalog/submitCatalogOffShelf', params)
// 编目发布申请
const submitCatalogUpShelf = (params) => postAction('/api/flowcatalog/submitCatalogUpShelf', params)
// 新增接口删除
const deleteParameter = (params) => postAction('/api/cataLog/deleteParameter', params)
// 编目日志
// const logList = (params) => postAction('/api/cataLog/logList', params)
const getLogById = (params) => postAction('/api/cataLog/getLogById', params)


// 草稿箱请求
const postDraftsList = (params) => postAction('/api/cataLog/draftsList', params)
// 分页
const postDraftsPage = (params) => postAction('/api/cataLog/draftsPage', params)
// 草稿箱删除
const deleteDraftsDel = (params) => postAction('/api/cataLog/draftsDel', params)
//查询申请接口/库表弹窗数据
const getApplyInfo = (applyId) => getAction(`/api/share/getApplyInfo?applyId=${applyId}`)
// 申请数据项
const getDataItemInfo = (catalogId, applyId) => getAction(`/api/share/getDataItemInfo?catalogId=${catalogId}&applyId=${applyId}`)
//更新数据
const getShareUpdate = (params) => putAction('/api/share/update', params)

// 资源管理
// 查询数据源
// const getListByUnitOne = (params) => postAction('/api/DataSource/getListByUnitOne', params)
const getListByUnitOne = (params) => postAction('/api/DataSource/page', params)

// 新增数据源
const getDataSource = (params) => postAction('/api/DataSource/addDataSource', params)
// 分页查询
const getDatapage = (params) => postAction('/api/DataSource/page', params)

// 公告发布
// 新增保存
const postAdd = (params) => postAction('/sys/annountCement/add', params)
// 复制/编辑
const postedit = (params) => putAction('/sys/annountCement/edit', params)
// 详情
const queryById = (id) => getAction(`/sys/annountCement/queryById?id=${id}`)
// 查询
const getTableList = (params) => postAction('/sys/annountCement/list', params)
// 立即发布
const postDoReleaseData = (params) => postAction('/api/news/doReleaseData', params)


// 修改数据源
const getEditOrigin = (params) => postAction('/api/DataSource/edit', params)
// 删除数据源
const deleteServiceMatters = (params) => deleteAction("/api/DataSource/deleteServiceMatters/", params);
//主题分类
const getTheme = (id) => getAction(`/api/share/getTheme?id=${id}`, null);
// 新增数据
const getShareSave = (params) => postAction('/api/share/save', params);
// 测试新增数据源
const getTestConnect = (params) => postAction('/api/dataBase/testConnect', params)

// 消息通知
// 分页查询请求
const pageUserMessage = (params) => postAction('/api/news/pageUserMessage', params)
// 删除/批量删除
const deleteBatchMessage = (params) => postAction('/api/news/deleteBatchMessage', params)
// 批量已读
const readBatchMessage = (params) => postAction('/api/news/readBatchMessage', params)
// 查看
// const viewSingle = (params) => postAction('/api/news/viewSingle', params)
// 未读消息条数
const getUnreadMessageQuantity = (params) => postAction('/api/news/getUnreadMessageQuantity', params)




// 工单处理
// 查询工单处理
const getWorkcaTalog = (params) => postAction('/api/workcatalog/list', params)
//获取工单列表
const getWorkTypeList = (type) => getAction(`/api/workcatalog/getWorkTypeList?type=${type}`, null)
//审批工单
// const geApprovalData = (id) => postAction(`/api/cataLog/get?id=${id}`, null)
const geApprovalData = (id, processDefinitionKey, processCode, taskNameId, endTime, startTime, executionId) => postAction(`/api/cataLog/view?id=${id}&processDefinitionKey=${processDefinitionKey}&processCode=${processCode}&taskNameId=${taskNameId}&endTime=${endTime}&startTime=${startTime}&executionId=${executionId}`, null)

// 查看下架
const getShelfApplication = (params) => postAction('/api/workcatalog/shelfApplication', params)

//数据项导入
const getImportDataExcel = (params) => postAction('/api/cataLog/importDataExcel', params)

// 数据项模板下载
const getDownloadName = (downloadName) => getAction(`/api/cataLog/download/${downloadName}`, null)
// 数据项excel下载
const getDownloadExcel = (params) => getAction('/api/file/download', params)
// 工单审批通过
const getCompleteByDateId = (params) => postAction('/flowable/task/completeByDateId', params)
// 工单批量审批
const batchCompleteByDateId = (params) => postAction('/flowable/task/batchCompleteByDateId', params)

//工单驳回

// 数据归集
// excel数据上报
const postPageQuery = (params) => postAction('/api/cataLog/pageQuery', params)
const updateLog = (params) => postAction('/api/datacollection/updateLog', params)

// 模板下载
// const downloadShare = (dataId,params) => getAction(`/api/cataLog/downloadShare/${dataId}`, null)
// 接口发布
const pageInterface = (params) => postAction('/api/cataLog/pageInterface', params)
const syncApi = (params) => postAction('/api/cataLog/syncApi', null)

// 重新挂载   取消挂载
const interfaceMount = (params) => postAction('/api/cataLog/interfaceMount', params)
// 库表更新
const pageQueryList = (params) => postAction('/api/cataLog/pageQueryList', params)
// 库表更新管理员
const pageTableUpdate = (params) => postAction('/api/cataLog/pageTableUpdate', params)
// 重新挂载   取消挂载
const tableMount = (params) => postAction('/api/cataLog/tableMount', params)
// 转接口挂载列表
const interfaceMountList = (params) => postAction('/api/cataLog/interfaceMountList', params)
// 库表管理--取消转接口挂载
const cancelInterfaceMount = (params) => postAction('/api/cataLog/cancelInterfaceMount', params)


// 查询共享申请默认内容
const getApplyDefaultInfo = (catalogId) => getAction(`/api/share/getApplyDefaultInfo?catalogId=${catalogId}`, null)
//发起共享申请
const getStartShareApply = (params) => postAction('/api/share/startShareApply', params)
//我的/申请数据列表分页
const getshareDataPage = (params) => postAction('/api/shareData/page', params)
//工单驳回
const getTaskRejectByDataId = (params) => postAction('/flowable/task/taskRejectByDataId', params)
//工单批量驳回
const batchTaskRejectByDataId = (params) => postAction('/flowable/task/batchTaskRejectByDataId', params)
//释放数据
const getreleaseData = (applyId) => postAction(`/api/shareData/releaseData?applyId=${applyId}`, null)

// 学习天地
// 分页
const studyWorldPage = (params) => postAction('/api/studyWorld/page', params)
// const deleteStudyWorld = (params) => postAction('/api/studyWorld/deleteStudyWorld', params)
// 角色查询
const getAllRole = (params) => getAction('/api/studyWorld/getAllRole', null)
const getStudyWorldInfo = (studyWorldId) => getAction(`/api/studyWorld/getStudyWorldInfo?studyWorldId=${studyWorldId}`, null)
// 新增
const studyWorldSave = (params) => postAction('/api/studyWorld/save', params)
// 更新
const putUpdate = (params) => putAction('/api/studyWorld/update', params)
const queryUserUnit = (params) => postAction('/api/cataLog/queryUserUnit', null)
const queryUserMassge = (params) => postAction('/api/cataLog/queryUserMassge', null)

// 前台
// 数据目录
const ResourceMarketpage = (params) => postAction('/api/resourceMarket/page', params)
// 服务事项列表分页
const ServiceMatterspage = (params) => postAction('/api/ServiceMatters/page', params)
// 使用记录
const getUsageRecord = (params) => postAction('/api/config/getList', params)

// 服务事项
// 左边树结构
const mechanismTree = (params) => postAction('/api/ServiceMatters/mechanismTree', null)
const mechanismTree2 = (params) => postAction('/api/ServiceMatters/mechanismTree2', null)
//数据共享详情基本信息
const getDataUseInfo = (catalogId) => getAction(`/api/shareData/getDataUseInfo?catalogId=${catalogId}`, null)
// 数据共享API接口信息
const getDataUseApiInterfaceInfo = (catalogId) => getAction(`/api/shareData/getDataUseApiInterfaceInfo?catalogId=${catalogId}`, null)
//数据共享API授权信息
const getAuthorizeInfo = (apiName, applyId) => getAction(`/api/shareData/getAuthorizeInfo?apiName=${apiName}&applyId=${applyId}`, null)
// 预览SQL
const getAddTableConfig = (params) => postAction('/api/config/addTableConfig', params)
// 新增交换资源
const getAddTable = (params) => postAction('/api/config/addTable', params)
//共享数据目录详情
const getResourceMarket = (id) => postAction(`/api/resourceMarket/get?id=${id}`, null)
// 前台事项服务目录列表详情
const getMatters = (id) => postAction(`/api/ServiceMatters/getMatters?id=${id}`, null)
// 编目共享类型数据数量
// const getCatalogAmount = (params) => postAction('/api/resourceMarket/getCatalogAmount', params)
const getCatalogAmount = (categoryCode, treeItemId,catalogName) => postAction(`/api/resourceMarket/getCatalogAmount?categoryCode=${categoryCode}&treeItemId=${treeItemId}&catalogName=${catalogName}`, null)
// 服务事项共享类型数据数量
const getServiceAmount = (params) => postAction('/api/resourceMarket/getServiceAmount', params)
// 申请归集
const getApplyNotionalPooling = (catalogId) => postAction(`/api/share/applyNotionalPooling?catalogId=${catalogId}`, null)
// 系统维护列表查询
const getPageTableSystem = (params) => postAction('/api/system/pageTableSystem', params)
// 系统维护批量删除
const getDeleteBatchSystem = (params) => postAction('/api/system/deleteBatchSystem', params)
// 系统维护新增
const getaddSystem = (params) => postAction('/api/system/addSystem', params)
// 系统维护复制
const getCopySystem = (params) => postAction('/api/system/copySystem', params)
// 系统维护编辑
const getDataSourceEdit = (params) => postAction('/api/system/editModify', params)
// 修改系统维护状态
const getModifyState = (params) => postAction('/api/system/modifyState', params)
// 数源单位
const queryAppName = (params) => postAction('/api/system/queryAppName', null)
// 所有数源应用系统
const queryAllAppName = (params) => postAction('/api/system/queryAllAppName', null)
// 共享审批流程详情
const getSourceDepartmentApproval = (processCode) => getAction(`/api/workcatalog/sourceDepartmentApproval?processCode=${processCode}`, null)
// 共享审批
const getUpdateShareNodeData = (params) => putAction('/api/workcatalog/updateShareNodeData', params)
// 后台已发布数据目录
const getDataCataloging = (params) => postAction('/api/cataLog/getDataCataloging', params)
// 后台已归集数据目录
const getDataCollection = (params) => postAction('/api/cataLog/getDataCollection', params)
// 后台待处理工单
const getWorkOrder = (params) => postAction('/api/workcatalog/getWorkOrder', params)
// 后台待办事项
const getToDo = (params) => postAction('/api/workcatalog/getToDo', params)
// 后台数据共享查询
const getDataApply = (params) => postAction('/api/shareData/getDataApply', params)
// 最新数据
const getLatestData = (params) => postAction('/api/shareData/getLatestData', null)
// 热门申请
const getHotApply = (params) => postAction('/api/shareData/getHotApply', null)
// 更多浏览
const getHotBrowse = (params) => postAction('/api/shareData/getHotBrowse', null)
// Excel归集情况
const getCollectNum = (params) => postAction('/api/IndexPage/collectNum', null)
// 前台首页搜索
const getIndexSelPage = (params) => postAction('/api/IndexPage/selPage', params)
// 前台数据汇总查询
const getindexNum = (params) => postAction('/api/IndexPage/indexNum', null)
// 后台我的共享
const getMyApply = (params) => postAction('/api/shareData/getMyApply', null)
// 后台我的数据
const getMyDataPage = (params) => postAction('/api/IndexPage/myDataPage', params)
// 组织架构行政区划
const getGovAreaList = (params) => getAction('/sys/sysDepart/getGovAreaList', params)

// 组织架构
const getDataSourceById = (id, params) => getAction(`/api/DataSource/getDataSourceById?id=${id}`, null)
const getDataSourceList = (params) => getAction('/api/DataSource/getDataSourceList', null)

// 获取当前登录人部门
const getDepartList = (userName) => getAction(`/sys/getDepartList?userName=${userName}`, null)
const ChangeCheckCode = (ticket, service) => postAction(`/third/sso/auth?ticket=${ticket}&service=${service}`, null)
// 获取源头表
const getSourceTableFields = (applyId) => postAction(`/api/shareData/getSourceTableFields?applyId=${applyId}`, null)
// 自动创建交换任务
const getExchangetaskAdd = (params) => postAction('/api/exchange/task/add', params)


// 更新时间统计
const tableAlertList = (params) => postAction('/api/IndexPage/tableAlertList', params)

// 查询轮播图

const getPictures = (params) => postAction('/sys/common/picture/query', null)

// 删除轮播图
const getPictureDel = (id) => postAction(`/sys/common/picture/del?id=${id}`, null)

// 我提供的服务
const getMyProvideService = (params) => postAction('/api/shareData/getMyProvideService', null)

// 我使用的服务
const getMyUseService = (params) => postAction('/api/shareData/getMyUseService', null)
// 轮播图排序

const getSequence = (params) => postAction('/sys/common/picture/reset/sequence', params)

// 后台首页数据服务
const getDataService = (params) => getAction('/api/IndexPage/getDataService', null)

// 后台首页数据统计
const getDataStatistics = (params) => getAction('/api/IndexPage/getDataStatistics', null)

// 前台首页热门浏览
const getHomeHotBrowse = (params) => postAction('/api/shareData/getHotBrowse', null)


// 前台首页最新数据
const getHomeLatestData = (params) => postAction('/api/shareData/getLatestData', null)

// 前台首页热门申请
const getHomeHotApply = (params) => postAction('/api/shareData/getHotApply', null)

//纠错
const setDataErrorCorrection = (params) => postAction('/api/shareData/dataErrorCorrection', params)

//用户信息生成Token(数据安全平台)
const getUserInfoToken = (applyId) => getAction(`/third/sso/userInfoGenerateToken`, null)
//用户信息生成(可信系统)
const getUserInfosso = (applyId) => getAction(`/v1/third/sso/getUserInfo`, null)
//用户信息生成(数据安全平台)
const getUserInfosso2 = (applyId) => getAction(`/v1/third/sso/getUserInfo2`, null)


const catalogUpdateBadList = (params) => postAction('/api/IndexPage/catalogUpdateBadList', params)
const updateBadDetailList = (params) => postAction('/api/IndexPage/updateBadDetailList', params)

const importExcel = (params) => postAction('/api/datacollection/importExcel', params)

// 获取所有可更换授权项目列表
const getAuthProjectList = (projectName,pageNum,pageSize) => getAction(`/api/shareData/getAuthProjectList?projectName=${projectName}&pageNum=${pageNum}&pageSize=${pageSize}`, null)
// 获取当前授权项目名称
const getCurrentAuthProjectName = (applyId) => getAction(`/api/shareData/getCurrentAuthProjectName?applyId=${applyId}`, null)
//更换授权项目
const modifyAuthProject = (params) => postAction('/api/shareData/modifyAuthProject', params)





// 中转HTTP请求
export const transitRESTful = {
    get: (url, parameter) => getAction(getTransitURL(url), parameter),
    post: (url, parameter) => postAction(getTransitURL(url), parameter),
    put: (url, parameter) => putAction(getTransitURL(url), parameter),
    http: (url, parameter) => httpAction(getTransitURL(url), parameter),
}
export {
    importExcel,
    catalogUpdateBadList,
    updateBadDetailList,
    //用户信息生成(可信系统)
    getUserInfosso,
    //用户信息生成(数据安全平台)
    getUserInfosso2,
    // 数据纠错
    setDataErrorCorrection,
    // 前台热门申请
    getHomeHotApply,
    // 前台最新数据
    getHomeLatestData,
    // 前台热门浏览
    getHomeHotBrowse,
    // 后台数据统计
    getDataStatistics,
    // 后台首页数据服务
    getDataService,
    // 轮播图排序
    getSequence,
    // 我使用的服务
    getMyUseService,
    // 我提供的服务
    getMyProvideService,
    // 删除轮播图
    getPictureDel,
    // 查询轮播图
    getPictures,
    getDestTableFields,
    // 自动创建交换任务
    getExchangetaskAdd,
    // 获取源头表
    getSourceTableFields,
    // 更新时间统计
    tableAlertList,
    ChangeCheckCode,
    // 获取当前登录人部门
    getDepartList,
    // 组织架构
    getDataSourceById,
    getDataSourceList,
    // 组织架构行政区划
    getGovAreaList,
    // 后台数据共享
    getDataApply,
    // 后台已发布数据目录
    getDataCataloging,
    // 后台已归集数据目录
    getDataCollection,
    // 后台待处理工单
    getWorkOrder,
    // 后台已办事项
    getToDo,
    // 后台我的共享
    getMyApply,
    // 后台我的数据
    getMyDataPage,
    // 前台数据汇总查询
    getindexNum,
    // Excel归集情况
    getCollectNum,
    // 最新数据
    getLatestData,
    // 热门申请
    getHotApply,
    // 更多浏览
    getHotBrowse,
    // 搜索查询
    getIndexSelPage,
    // 前台
    // 共享审批
    getUpdateShareNodeData,
    // 共享审批流程详情
    getSourceDepartmentApproval,
    queryAppName,
    queryAllAppName,
    // 修改状态接口
    getModifyState,
    // 系统维护编辑
    getDataSourceEdit,
    // 系统维护数据复制
    getCopySystem,
    // 系统维护新增
    getaddSystem,
    // 系统维护批量删除
    getDeleteBatchSystem,
    // 系统维护查询
    getPageTableSystem,
    // 申请归集
    getApplyNotionalPooling,
    // 前台事项服务目录列表详情
    getMatters,
    // 服务事项共享类型数据数量
    getServiceAmount,
    // 编目共享类型数据数量
    getCatalogAmount,
    //共享数据目录详情
    getResourceMarket,
    // 新增交换资源
    getAddTable,
    // 预览SQL
    getAddTableConfig,
    // 使用记录
    getUsageRecord,
    // 数据目录
    ResourceMarketpage,
    // 服务事项列表分页
    ServiceMatterspage,
    //数据共享API授权信息
    getAuthorizeInfo,
    // 数据共享API接口信息
    getDataUseApiInterfaceInfo,
    // 数据共享详情基本信息
    getDataUseInfo,
    // 释放数据
    getreleaseData,
    mechanismTree,
    mechanismTree2,
    //我的/申请数据列表分页
    getshareDataPage,
    //更新数据
    getShareUpdate,
    //发起共享申请
    getStartShareApply,
    // 查询共享申请默认内容
    getApplyDefaultInfo,
    // 新增数据
    getShareSave,
    //主题分类
    getTheme,
    // 数据归集
    postPageQuery,
    updateLog,
    // updateList,
    pageInterface,
    syncApi,
    interfaceMount,
    pageQueryList,
    pageTableUpdate,
    tableMount,
    interfaceMountList,
    cancelInterfaceMount,
    // downloadShare,
    // 学习天地
    studyWorldPage,
    // deleteStudyWorld,
    studyWorldSave,
    putUpdate,
    queryUserUnit,
    queryUserMassge,
    getAllRole,
    getStudyWorldInfo,

    pageUserMessage,
    deleteBatchMessage,
    readBatchMessage,
    // viewSingle,
    getUnreadMessageQuantity,

    // 工单下架查看
    getShelfApplication,
    // 工单审批通过
    getCompleteByDateId,
    //工单批量审批
    batchCompleteByDateId,
    //工单列表
    getWorkTypeList,
    //查询接口//库表弹窗数据
    getApplyInfo,
    //申请数据项
    getDataItemInfo,
    //工单驳回
    getTaskRejectByDataId,
    //工单批量驳回
    batchTaskRejectByDataId,
    getDownloadExcel,
    //数据项导入
    getImportDataExcel,
    // 资源管理
    // 数据源管理
    getListByUnitOne,
    // 新增数据源
    getDataSource,
    // 修改数据源
    getEditOrigin,
    // 分页查询
    getDatapage,
    // 发布公告
    postAdd,
    postedit,
    queryById,
    getTableList,
    postDoReleaseData,
    // 删除数据源
    deleteServiceMatters,
    // 查询工单
    getWorkcaTalog,
    //审批工单
    geApprovalData,
    // 测试新增数据源
    getTestConnect,
    //数据项模板下载
    getDownloadName,
    // 数据编目的请求
    getDictItems,
    postDataFromList,
    postDataFromPage,
    postdeleteBatch,
    postdownload,
    getCataLogDataItem,
    getCataLogIndexItem,
    // getExportXls,
    copyCatalog,
    submitCatalogOffShelf,
    submitCatalogUpShelf,
    processRecovery,

    // 编目新增
    postlistDatabase,
    postRelationType,
    postAddSave,
    postUpdate,
    getaddNewNodeList,
    getaddNewget,
    postsubmitCatalog,
    deleteParameter,
    // logList,
    getLogById,

    // 草稿箱请求
    postDraftsList,
    postDraftsPage,
    deleteDraftsDel,

    // 类目管理的树状结构
    getNodes,
    getNodesShare,
    getTargetcopy,
    // getRootNodeId,
    queryDeptTreeList,
    addNewNodes,
    updateNodes,

    addTheme,
    editTheme,
    addFormType,
    editFormType,
    addReport,
    editReport,
    addRole,
    editRole,
    editRole1,
    checkRoleCode,
    addUser,
    editUser,
    queryUserRole,
    getUserList,
    getIDMUserList,
    getAuthorization,
    queryall,
    frozenBatch,
    checkOnlyUser,
    changePassword,
    getPermissionList,
    addPermission,
    editPermission,
    getRootNodeId,
    queryTreeList,
    queryListAsync,
    queryRolePermission,
    queryDepartRoleList,
    saveRolePermission,
    sysDepartRoleAdd,
    sysDepartRoleEdit,
    queryPermissionsByUser,
    loadAllRoleIds,
    getPermissionRuleList,
    queryPermissionRule,
    queryDepartTreeList,
    queryDimTreeList,
    queryIdTree,
    queryParentName,
    searchByKeywords,
    deleteByDepartId,
    deleteLog,
    getLogList,
    deleteLogList,
    addDict,
    editDict,
    treeList,
    addDictItem,
    editDictItem,
    doReleaseData,
    doReovkeData,
    getLoginfo,
    getVisitInfo,
    queryUserByDepId,
    duplicateCheck,
    queryTreeListForRole,
    getSystemMenuList,
    getSystemSubmenu,
    getSystemSubmenuBatch,
    loadCategoryData,
    checkRuleByCode,
    queryDepartPermission,
    saveDepartPermission,
    queryTreeListForDeptRole,
    queryDeptRolePermission,
    saveDeptRolePermission,
    queryMyDepartTreeList,
    getUserNoticeInfo,
    getDictItemsFromCache,
    addOnline,
    editOnline,

    // 指标开发
    getclatree,
    addclaindex,
    getclainfo,
    updateclainfo,
    offLineclainfo,
    deleteclainfo,
    onLineclainfo,
    // 指标管理
    getdomaintree,
    getdomainAssetTree,
    gettargetdeatil,
    gettargetlist,
    gettargetpage,
    savetargeinfo,
    updatetargeinfo,
    deletetargeinfo,
    savedomain,
    updatedomain,
    deletedomain,
    //任务作业
    gettaskSelect,
    gettaskpage,
    runTask,
    stopTask,
    //任务实例
    gettaskexamplespage,
    runTaskInstance,
    stopTaskInstance,
    getTaskInstanceStatusList,
    getTaskInstanceLog,
    gettaskInstancedetail,
    // ===绩效管理===
    getSubjectDetail,
    getAddTarget,
    getModelLIst,
    getPerformanceTree,
    upOnline,
    beOffine,
    deletedModel,
    copyModel,
    getModelTarget,
    saveModel,
    getVer,
    switchedVer,
    saveNewVer,
    getQuoteModelList,
    getUserInfoToken,
    getAuthProjectList,
    getCurrentAuthProjectName,
    modifyAuthProject,
}



