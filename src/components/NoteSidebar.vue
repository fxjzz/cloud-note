<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title"  placement="bottom">
      <span class="el-dropdown-link">
       1 <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item ></el-dropdown-item>
        <el-dropdown-item  command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li >
        <router-link to="/1">
          <span class="date">123</span>
          <span class="title">456</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>

</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);

</style>
