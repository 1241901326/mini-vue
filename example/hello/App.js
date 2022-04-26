import { h } from '../../lib/guide-mini-vue.esm.js';

export const App = {
  render() {
    return h('div', { class: 'red' }, [
      h('p', { class: 'blue' }, '第一个'),
      h('p', { class: 'black' }, '第二个')
    ]);
  },
  setup() {
    return {
      msg: 'world'
    };
  }
};
