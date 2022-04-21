import { h } from '../../lib/guide-mini-vue.cjs.js';

export const App = {
  render() {
    return h('div', 'hello' + this.msg);
  },
  setup() {
    return {
      msg: 'world'
    };
  }
};
