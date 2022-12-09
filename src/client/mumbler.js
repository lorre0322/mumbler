import Main from './view/mumbler/mumbler.svelte';
import { options } from './lib/stores'
import gif1px from 'min-1px';
let app
function init(opt) {
  opt = opt || {}
  const MConfig = {
    master: "我的",
    stick: "置顶",
    ph: "快来评论吧",
    path: location.pathname,
    visitStat: true,
    imgLoading: gif1px.GIF
  }
  options.set(Object.assign(MConfig, opt))
  app && app.$destroy()
  app = new Main({
    target: document.querySelector(opt.el)
  })
}

export default window.mumbler = {
  init
}