import Vue from 'vue'
import { addClass, removeClass, ResizeHandler } from '@/utils'

Vue.directive('img-fit', {
  bind: (el, binding, vnode) => {
    const resizeEvent = () => {
      const { naturalWidth, naturalHeight, offsetWidth, offsetHeight } = el
      const { clientWidth, clientHeight } = el.parentElement
      const naturalScale = naturalWidth / naturalHeight
      const parentScale = clientWidth / clientHeight
      if (parentScale < naturalScale) {
        addClass(el, 'l-img-fit-width-100')
        removeClass(el, 'l-img-fit-height-100')
      } else {
        addClass(el, 'l-img-fit-height-100')
        removeClass(el, 'l-img-fit-width-100')
      }
      // 非必要
      if (binding.arg === 'resize') {
        vnode.context.imgSize = {
          w: offsetWidth,
          h: offsetHeight
        }
      }
    }
    if (binding.arg === 'resize') {
      const resizeHandler = new ResizeHandler(resizeEvent)
      resizeHandler.initListener()
      vnode.context.imgFitResizeHandler = resizeHandler
    }
    el.onload = resizeEvent
  },
  unbind: (el, binding, vnode) => {
    binding.arg === 'resize' &&
    vnode.context.imgFitResizeHandler &&
    vnode.context.imgFitResizeHandler.destroyListener()
  }
})
