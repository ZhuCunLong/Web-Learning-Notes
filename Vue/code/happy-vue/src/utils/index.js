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
