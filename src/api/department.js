import api from './index'
import { axios } from '@/utils/request'


export function deleteAction(ctoryId) {
  return axios({
    url: `/api/category/deleteNodes?id=${ctoryId}`,
    method: 'delete',
  })
}
export function getExportXls(parameter) {
  return axios({
    url: '/api/cataLog/exportXls',
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  })
}
export function exportDraftsXls(parameter) {
  return axios({
    url: '/api/cataLog/exportDraftsXls',
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  })
}
// 数据项模板下载
export function downloadShare(parameter) {
  return axios({
    url: '/api/datacollection/downloadShare',
    params: parameter,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  })
}
// 消息通知
// 消息通知
export function viewSingle(params) {
  return axios({
    url: "/api/news/viewSingle",
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
// raw
// 数据归集
// 时间线
export function updateList(catalogId) {
  return axios({
    url: '/api/cataLog/updateList',
    method: 'post',
    data: catalogId,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// 库表更新管理
// 时间线
// export function updateLog(catalogId) {
//   return axios({
//     url: '/api/datacollection/updateLog',
//     method: 'post',
//     data: catalogId,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }
// 库表管理--转接口挂载
export function interfaceMountSave(catalogId) {
  return axios({
    url: '/api/cataLog/interfaceMountSave',
    method: 'post',
    data: catalogId,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// 删除资料管理
export function deleteStudyWorld(parameter) {
  return axios({
    url: '/api/studyWorld/deleteStudyWorld',
    method: 'delete',
    data: parameter,
  })
}
// 删除发布公告
export function deleteBatch(ids) {
  return axios({
    url: `/sys/annountCement/deleteBatch?ids=${ids}`,
    method: 'delete',
    // data: parameter,
  })
}
// 编目日志
export function logList(condition) {
  return axios({
    url: '/api/cataLog/logList',
    method: 'post',
    data: condition,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}