import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}  // 路由重复
export default new Router({
  routes: [
    {
      path: '/',
      alias:'/login',
      component: ()=>import('../components/Login.vue')
    },
    {
      path: '/notebooks',
      component: ()=>import('../components/NotebookList.vue')
    },
    {
      path: '/note',
      component: ()=>import('../components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: ()=>import('../components/TrashDetail.vue')
    }
  ]
})
