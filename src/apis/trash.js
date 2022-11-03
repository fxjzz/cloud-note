import request from "../helpers/request";
import {friendlyDate} from "../helpers/util";

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      return request(URL.GET)
        .then(res => {
          res.data = res.data.sort((note1, note2) => note1.updatedAt < note2.updatedAt ? 1 : -1)
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
  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },
  revertNote({ noteId }) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  }
}
