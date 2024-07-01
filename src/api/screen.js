import Vue from 'vue'
import { axios } from '@/utils/request'
const api = {
  getService: '/water/theme/getService',
  getManage: '/water/theme/getManage',
  getProduction: '/water/theme/getProduction',
  getWaterQuality: '/water/theme/getWaterQuality'
}

export function getService(parameter) {
  return axios({
    url: api.getService,
    method: 'get',
    params: parameter
  })
}
export function getManage(parameter) {
  return axios({
    url: api.getManage,
    method: 'get',
    params: parameter
  })
}
export function getProduction(parameter) {
  return axios({
    url: api.getProduction,
    method: 'get',
    params: parameter
  })
}
export function getWaterQuality(parameter) {
  return axios({
    url: api.getWaterQuality,
    method: 'get',
    params: parameter
  })
}
export function getTotal(parameter) {
  return axios({
    url: "/water/kpi/getTotalKeyIndicators",
    method: 'get',
    params: parameter
  })
}

export function getCard1(parameter) {
  return axios({
    url: "/water/kpi/getTreatmentScale",
    method: 'get',
    params: parameter
  })
}

export function getCard2(parameter) {
  return axios({
    url: "/water/kpi/getTotalWaterSales",
    method: 'get',
    params: parameter
  })
}
export function getCard3(parameter) {
  return axios({
    url: "/water/kpi/getServiceArea",
    method: 'get',
    params: parameter
  })
}
export function getCard4(parameter) {
  return axios({
    url: "/water/kpi/getWaterRate",
    method: 'get',
    params: parameter
  })
}
export function getCard5(parameter) {
  return axios({
    url: "/water/kpi/getLeakrate",
    method: 'get',
    params: parameter
  })
}
export function getCard6(parameter) {
  return axios({
    url: "/water/kpi/getComplain",
    method: 'get',
    params: parameter
  })
}