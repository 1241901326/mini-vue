import { creatVNode } from "./vnode";

export function h(type, props?, children?) {
  return creatVNode(type, props, children);
}
