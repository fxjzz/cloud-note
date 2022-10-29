<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h2>笔记本列表({{ notebooks.length }})</h2>
        <div class="book-list">
          <router-link :key="n.id" v-for="n in notebooks" :to="`/note?notebookId=${n.id}`" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>{{ n.title }}
              <span>笔记数 : {{ n.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(n)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(n)">删除</span>
              <span class="date">创建时间 : {{ n.friendlyCreateAt }}</span>
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
import {friendlyDate} from "../apis/util";

export default {
  data() {
    return {
      notebooks: []
    }
  },
  methods: {
    onCreate() {
      this.$prompt('笔记本名字', '输入', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本名字不能为空，且不能超过30个字'
      }).then(({value}) => {
        return Notebooks.addNotebook({title: value})  //return
      }).then(res => {
        this.$message.success(res.msg)
        this.notebooks.unshift(res.data)
        res.data.friendlyCreateAt = friendlyDate(res.data.createdAt)
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本名字', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue:notebook.title,
        inputErrorMessage: '笔记本名字不能为空，且不能超过30个字'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, {title})  //return
      }).then(res => {
        this.$message.success(res.msg)
        notebook.title = title
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebook(notebook.id)
      })
        .then(res => {
          this.$message.success(res.msg)
          this.notebooks = this.notebooks.filter(n => n.id !== notebook.id)
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
      .then(res => {
        this.notebooks = res.data
      })

  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
