
import store from '@/store/'
import { USER_AUTH } from "@/store/mutation-types"

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    // const roles = JSON.parse(sessionStorage.getItem(USER_AUTH) || "[]")
    const permissionRoles = value
    // console.log("roles",roles);

    const hasRole = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasRole) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`)
    return false
  }
}