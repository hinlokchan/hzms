<template>
  <div>
    <div class="qrcode">
      <div class="qrcode-item">
        <div>正评号</div>
        <el-input v-model="faNum" clearable></el-input>
      </div>
			<div class="qrcode-item">
        <div>项目名称</div>
        <el-input v-model="projName" clearable></el-input>
      </div>
			<div class="qrcode-item">
        <div>评估值</div>
        <el-input v-model="assemValue" clearable=""></el-input>
      </div>
			<div class="qrcode-item">
        <div>基准日</div>
        <el-date-picker v-model="baseDate" value-format="yyyy-MM-dd"></el-date-picker>
      </div>
    </div>
    <el-button @click="showQRCode">生成报告二维码</el-button>
    <el-dialog
      width="30%"
      @close="closeQRCode"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div
        id="qrcode"
        ref="qrcode"
      ></div>
			<div @click="downs()">下载图片</div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'qrcode',
  data() {
    return {
			faNum: '',
			projName: '',
			assemValue: '',
			baseDate: '',
      innerVisible: false
    }
  },
  methods: {
    showQRCode() {
      this.innerVisible = true
      // this.qrcode = 'hi'
      this.$nextTick(() => {
        this.creatQRCode()
      })
    },
    creatQRCode() {
      this.qr = new QRCode('qrcode', {
        width: '150',
        height: '150',
        text: this.faNum + this.projName + this.assemValue + this.baseDate
      })
    },
    closeQRCode() {
      this.$ref.qrcode.innerHTML = ''
		},
		downs() {
			
		}
  }
}
</script>

<style scoped>
.qrcode {
    width: 300px;
    margin: 10px 0 0 10px;
}
</style>