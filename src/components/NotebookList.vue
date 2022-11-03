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
              <span class="date">创建时间 : {{ n.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  methods: {
    ...mapActions([
      'getNotebooks',
      'updateNotebook',
      'deleteNotebook',
      'addNotebook',
      'checkLogin'
    ]),
    onCreate() {
      this.$prompt('笔记本名字', '输入', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本名字不能为空，且不能超过30个字'
      }).then(({value}) => {
        this.addNotebook({title:value})
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入笔记本名字', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '笔记本名字不能为空，且不能超过30个字'
      }).then(({value}) => {
        title = value
        this.updateNotebook({notebookId:notebook.id,title:value})
      })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId:notebook.id})
      })
    }
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  created() {
    this.checkLogin({path: '/login'})
    this.getNotebooks()
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
