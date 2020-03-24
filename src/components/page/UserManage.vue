<template>
  <div class="container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span style="vertical-align: middle">用户管理</span>
          <el-button
            type="primary"
            icon="el-icon-plus"
            style="height:auto;padding: 0px 8px 8px 8px;margin-left:15px"
            @click="handleAdd"
          ><span style="font-size:14px;color:#fff;">新增用户</span></el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'usermanage',
  data() {
    return {

    }
  }
}
</script>

<style>
</style>