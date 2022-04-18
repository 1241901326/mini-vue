//公共方法

export function isObject(value){
  return value!=null&& typeof value == 'object'
}
export const extend = Object.assign;