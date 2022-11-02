import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";

Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}  // 路由重复
export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }
  ]
})
