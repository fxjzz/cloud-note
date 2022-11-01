<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => this.notes = val"/>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期:{{ curNote.createdAtFriendly }}</span>
          <span>更新日期:{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowMD=!isShowMD"></span>
        </div>
        <div class="note-title">
          <input v-model:value="curNote.title" @keydown="statusText='正在输入...'" @input="onUpdateNote" type="text"
                 placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-show="!isShowMD" v-model:value="curNote.content" @keydown="statusText='正在输入...'"
                    @input="onUpdateNote" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="toggleMD" v-show="isShowMD"></div>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
import Auth from "../apis/auth";
import NoteSidebar from './NoteSidebar'
import Bus from "../helpers/bus";
import _ from 'lodash'
import Notes from "../apis/notes";
import MarkdownIt from 'markdown-it'
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

const md = new MarkdownIt()
export default {
  components: {NoteSidebar},
  data() {
    return {
      statusText: '笔记未改动',
      isShowMD: false
    }
  },
  computed: {
    ...mapGetters([
      'notebooks',
      'curNote'
    ]),
    toggleMD() {
      return md.render(this.curNote.content || '')
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote'
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content})
        .then(data => {
          this.statusText = '笔记已保存'
        }).catch(err => {
        this.statusText = '保存出错'
      })
    }, 300),
    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id})
        .then(data => {
          this.$router.replace({path: '/note'})
        })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId})
    next()
  }
}
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

</style>
