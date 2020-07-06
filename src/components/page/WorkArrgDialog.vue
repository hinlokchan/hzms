<template>
  <el-dialog title="工作安排" :visible.sync="workArrgVisible" width="80%">
    <el-form :model="workArrgForm" :rules="arrgRules"
      ref="workArrgForm"></el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'WorkArrgDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    projId: { type: Number },
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
      }
    }
  }
}
</script>

<style>
</style>