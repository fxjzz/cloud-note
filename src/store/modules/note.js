import Note from "../../apis/notes";
import {Message} from "element-ui";

const state = {
  notes: [],
  curNoteId:{}
}

const getters = {
  notes: state => state.notes,
  curNoteId: state=> state.curNoteId
}

const mutations = {
  setNote(state, payload) {
    state.notes = payload.notes
  },
  addNote(state, payload) {
    state.notes.unshift(payload.note)
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter(n => n.id !== payload.noteId)
  },
  updateNote(state, payload) {
    let note = state.notes.filter(n => n.id === payload.noteId)[0]
    note.title = payload.title
    note.content=payload.content
  }
}

const actions = {
  getNotes({ commit }, { notebookId }) {
    return Note.getAll({ notebookId })
      .then(res => {
        commit('setNote', { notes: res.data })
      })
  },
  addNote({commit},{notebookId,title,content}) {
    Note.addNote({notebookId},{title,content})
      .then(res=>{
        commit('addNote',{note:res.data})
        Message.success(res.msg)
      })
  },
  updateNote({commit}, {noteId,title,content}) {
    Note.updateNote({noteId}, {title,content })
      .then(res=>{
        commit('updateNote',{noteId,title,content})
        Message.success(res.msg)
      })
  },
  deleteNote({commit}, {noteId}){
    Note.deleteNote({noteId})
      .then(res=>{
        commit('deleteNote',{noteId})
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
