import request from "../helpers/request";
import {friendlyDate} from "../helpers/util";

const URL = {   //增删改查
  GET: '/notebooks',
  ADD: '/notebooks',
  DELETE: '/notebooks/:id',
  UPDATE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      return request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1)
          res.data.forEach(n => {
            n.createdAtFriendly=friendlyDate(n.createdAt)
            n.updatedAtFriendly=friendlyDate(n.updatedAt)
          })
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve,reject)=>{
      request(URL.ADD, 'POST', {title})
        .then(res=>{
          res.data.createdAtFriendly=friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly=friendlyDate(res.data.updatedAt)
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  }
}
