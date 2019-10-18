import Vue from 'vue'
import toastComponent from '@/components/Toast.vue'

export default function () {
  function showToast(type, text, icon = 'info', duration = 4000, callBack) {
    const ToastConstructor = Vue.extend(toastComponent)
    const toastDom = new ToastConstructor({
      el: document.createElement('div'),
      data() {
        return {
          type,
          icon,
          text,
          isShow: true
        }
      }
    })
    document.body.appendChild(toastDom.$el)
    setTimeout(() => {
      toastDom.isShow = false
      callBack && (typeof callBack === 'function') && callBack()
    }, duration)
    setTimeout(() => {
      document.body.removeChild(toastDom.$el)
    }, duration + 1000)
  }

  Vue.prototype.$toast = {
    info(text, callBack) {
      if (!text) return
      showToast('info', text, callBack)
    },
    success(text, callBack) {
      if (!text) return
      showToast('success', text, callBack)
    },
    error(text, callBack) {
      if (!text) return
      showToast('error', text, callBack)
    },
    warning(text, callBack) {
      if (!text) return
      showToast('warning', text, callBack)
    }
  }
}
