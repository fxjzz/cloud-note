import Notebooks from "../../apis/notebooks";
import {Message} from "element-ui";

const state = {
  notebooks: []
}

const getters = {
  notebooks: state => state.notebooks
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },
  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },
  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(n => n.id !== payload.notebookId)
  },
  updateNotebook(state, payload) {
    let notebook = state.notebooks.filter(n => n.id === payload.notebookId)[0]
    notebook.title = payload.title
  }
}

const actions = {
  getNotebooks({commit}) {
    Notebooks.getAll()
      .then(res =>{
        commit('setNotebooks',{notebooks:res.data})
      })
  },
  addNotebook({commit},payload) {
    Notebooks.addNotebook({title:payload.title})
      .then(res=>{
        commit('addNotebook',{notebook:res.data})
        Message.success(res.msg)
      })
  },
  updateNotebook({commit},payload) {
    Notebooks.updateNotebook(payload.notebookId,{title:payload.title})
      .then(res=>{
        commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
        Message.success(res.msg)
      })
  },
  deleteNotebook({commit},payload){
    Notebooks.deleteNotebook(payload.notebookId)
      .then(res=>{
        commit('deleteNotebook',{notebookId:payload.notebookId})
        Message.success(res.msg)
      })
  },
}
export default {
  state,
  getters,
  mutations,
  actions
}
