<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val"/>
    <div class="note-detail">
     <div class="note-empty" v-show="false">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span>创建日期:{{curNote.createdAtFriendly}}</span>
          <span>更新日期:{{curNote.updatedAtFriendly}}</span>
          <span>已保存</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input v-model:value="curNote.title" type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea v-model:value="curNote.content" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="" v-show="false"></div>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
import Auth from "../apis/auth";
import NoteSidebar from './NoteSidebar'
export default {
  name: 'Login',
  components:{NoteSidebar},
  data() {
    return {
      curNote:{},
      notes:[]
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
  beforeRouteUpdate(to,from,next){
    this.curNote=this.notes.find(note=>note.id==to.query.noteId)
    console.log(this.curNote)
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
