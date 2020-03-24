<template>
  <div>
    <div class="container">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><span style="color:000">生成报告二维码</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-form
          ref="form"
          :model="form"
          label-width="105px"
          :rules="rules"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item
                label="正评号"
                prop="zph"
              >
                <el-input v-model="form.zph"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="项目名称"
                prop="xmmc"
              >
                <el-input v-model="form.xmmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="评估值"
                prop="pgz"
              >
                <el-input v-model="form.pgz"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="基准日"
                prop="jzr"
              >
                <el-date-picker v-model="form.jzr" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <el-button style="margin: 30px 0 0 40%" type="primary" @click="showQRCode">生成报告二维码</el-button>
      <el-dialog
        width="30%"
        @close="closeQRCode"
        :visible.sync="innerVisible"
        append-to-body
      >
        <div
          id="qrcode"
          ref="qrcode"
          style="margin-left:27%"
        ></div>
      </el-dialog>
    </div>
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
      innerVisible: false,
      form: {
        zph: '',
        xmmc: '',
        pgz: '',
        jzr: ''
      }
    }
  },
  methods: {
    showQRCode() {
      // this.qrcode = 'hi'
      this.innerVisible = true
      this.$nextTick(() => {
        this.creatQRCode()
      })
    },
    creatQRCode() {
      this.qr = new QRCode('qrcode', {
        width: '150',
        height: '150',
        text: this.form.zph + this.form.xmmc + this.form.pgz + this.form.jzr
      })
    },
    closeQRCode() {
      console.log('close')
      this.$refs.qrcode.innerHTML = ''
		},
		downs() {
			
		}
  }
}
</script>

<style scoped>
.container{
  padding-bottom: 30px;
}
.qrcode {
    width: 300px;
    margin: 10px 0 0 10px;
}
</style>