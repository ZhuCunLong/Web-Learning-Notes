import Vue from 'vue'
import { addClass, removeClass } from '@/utils'

Vue.directive('img-fit', {
  bind: (el, binding, vnode) => {
    el.onload = () => {
      const { naturalWidth, naturalHeight } = el
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
    }
  }
})
