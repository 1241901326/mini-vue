import { ReactiveEffect } from "./effect";

class ComputedRefImpl {
  private _update: boolean = true;
  private _value: any;
  private _effect: any;
  constructor(getter) {
    this._effect = new ReactiveEffect(getter, () => {
      if (!this._update) {
        this._update = true;
      }
    });
  }
//逻辑思想就是effct更新完了以后执行 effect的第二个参数schedluer 当再次调用computed的时候进行更新
  get value() {
    if (this._update) {
      this._update = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
