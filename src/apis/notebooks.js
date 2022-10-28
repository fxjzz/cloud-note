import request from "../helpers/request";

const URL = {   //增删改查
  GET: '/notebooks',
  ADD: '/notebooks',
  DELETE: '/notebooks/:id',
  UPDATE: '/notebooks/:id'
}

export default {
  getAll() {
    return request(URL.GET)
  },
  addNotebook({title = ''} = {title: ''}) {
    return request(URL.ADD, 'POST', {title})
  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  }
}
