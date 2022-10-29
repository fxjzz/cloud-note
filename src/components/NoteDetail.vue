<template>
  <div id="note" class="detail">
    <note-sidebar/>
    <div class="note-detail">
      <div class="note-empty">请选择笔记</div>
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 1</span>
          <span class="iconfont icon-delete"></span>
          <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea></textarea>
          <div class="preview markdown-body">
          </div>
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
      msg: "笔记详情页"
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
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
