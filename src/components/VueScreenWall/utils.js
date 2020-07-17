/**
 * @desc  简单函数防抖
 **/
export const debounce = (targetFun, delay = 500) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        targetFun.apply(context, args)
      }, delay);
  }
}
/**
 * @desc  简单函数节流
 **/
export const throttle = (targetFun, interval = 500) => {
  let lastTime = +new Date(0)
  return function () {
    let current = +new Date();
    let context = this;
    let args = arguments;
    if ((current - lastTime) > interval) {
      lastTime = current
      targetFun.apply(context, args)
    }
  }
}
