/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export const on = (function () {
  if (typeof window === 'undefined') {
    return
  }
  if (window.addEventListener) {
    return function (el, event, fn, capture = false) {
      el.addEventListener(event, fn, capture)
    }
  } else {
    return function (el, event, fn) {
      if (!fn.prototype[`$$${event}`]) {
        fn.prototype[`$$${event}`] = {
          $$function: function (event) {
            fn.call(el, event)
          },
          $$el: [el]
        }
        el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function)
      } else {
        let hasListener = true
        for (const i in fn.prototype[`$$${event}`].$$el) {
          if (fn.prototype[`$$${event}`].$$el[i] === el) {
            hasListener = false
            break
          }
        }
        if (hasListener === true) {
          el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function)
        } else {
          let hasListener = true
          for (const i in fn.prototype[`$$${event}`].$$el) {
            if (fn.prototype[`$$${event}`].$$el[i] === el) {
              hasListener = false
              break
            }
          }
          if (hasListener === true) {
            el.attachEvent(`on${event}`, fn.prototype[`$$${event}`].$$function)
            fn.prototype[`$$${event}`].$$el.push(el)
          }
        }
      }
    }
  }
})()

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      console.log(context)
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function myDebounce (callback, wait) {
  let timeout = null
  return function () {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(callback, wait)
  }
}

export function vueDebounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func(args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      console.log(context)
      result = func(args)
      context = args = null
    }

    return result
  }
}

export function throttle (callback, wait) {
  let canRun = true
  return function () {
    if (canRun) {
      setTimeout(() => {
        callback()
        canRun = true
      }, wait)
      canRun = false
    }
  }
}

export class ResizeHandler {
  constructor (resizeEvent) {
    this.$_sidebarElm = null
    this.$_resizeHandler = null
    this.resize = resizeEvent
  }

  // eslint-disable-next-line camelcase
  $_sidebarResizeHandler = e => {
    if (e.propertyName === 'width') {
      this.$_resizeHandler()
    }
  }

  initListener () {
    this.$_resizeHandler = debounce(() => {
      this.resize()
    }, 500)
    window.addEventListener('resize', this.$_resizeHandler)

    this.$_sidebarElm = document.getElementsByClassName('h-page-menu')[0]
    this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
  }

  destroyListener () {
    window.removeEventListener('resize', this.$_resizeHandler)
    this.$_resizeHandler = null

    this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
  }
}
