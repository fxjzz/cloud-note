<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h2>笔记本列表({{notebooks.length}})</h2>
        <div class="book-list">
          <router-link :key="n.id" v-for="n in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{n.title}}
              <span>{{n.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(n)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(n)">删除</span>
              <span class="date">{{n.friendlyCreateAt}}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import Auth from "../apis/auth";
import Notebooks from '../apis/notebooks'

export default {
  data() {
    return {
      notebooks:[]
    }
  },
  methods: {
    onCreate() {
      const title = window.prompt('请输入笔记本名字')
      Notebooks.addNotebook({title})
        .then(res=>{
          alert(res.msg)
          this.notebooks.unshift(res.data)
        })
    },
    onEdit(notebook) {
      const title = window.prompt('修改笔记本名字',notebook.title)
      Notebooks.updateNotebook(notebook.id,{title})
        .then(res=>{
          notebook.title=title
          alert(res.msg)
        })
    },
    onDelete(notebook) {
      Notebooks.deleteNotebook(notebook.id)
        .then(res=>{
          alert('删除成功')
          this.notebooks=this.notebooks.filter(n=>n.id!==notebook.id)
        })
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Notebooks.getAll()
      .then(res=>{
        this.notebooks=res.data
      })

  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
