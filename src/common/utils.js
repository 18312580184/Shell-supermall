/* utils 封装公共的方法 */
/* 防抖函数 */
export function debounce(func, delay = 50) { /* 两个参数：1 函数 2 时间 */
  let timer = null;    /* 声明一个timer 空 */
  return function (...args) { /* 返回一个函数 */
    if (timer) clearTimeout(timer); /* 如果timer不为空 就清除timer */
    timer = setTimeout(() => {   /* 声明一个定时器名为 timer */
      func.apply(this, args);
    }, delay);
  };
}

export function formatDate(date, fmt) {
  // 1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.M+获取1个或者多个
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

