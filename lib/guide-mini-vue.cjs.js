'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function creatVNode(type, prop, chinldren) {
    const vnode = {
        type,
        prop,
        chinldren
    };
    return vnode;
}

function h(type, props, children) {
    return creatVNode(type, props, children);
}

exports.creatVNode = creatVNode;
exports.h = h;
