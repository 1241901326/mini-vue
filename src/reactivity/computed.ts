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
