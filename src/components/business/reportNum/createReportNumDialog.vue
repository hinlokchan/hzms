<template>
  <el-dialog
      title="获取报告号"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="30%"
      @close="onClose"
  >
<!--    <span>请选择报告号类型-->
<!--      <span style="float: right" v-if="this.selectedNode.length !== 0 && this.selectedNode !== undefined">已选择：-->
<!--        <b>-->
<!--        {{this.$refs["selector"].getCheckedNodes()[0].label}}-->
<!--        </b>-->
<!--      </span>-->
<!--    </span>-->
    <span>请选择报告号类型</span>
    <el-cascader-panel
        :options="options"
        ref="selector"
        v-model="selectedNode">
    </el-cascader-panel>
    <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取 消</el-button>
    <el-button type="primary" @click="handleCreateReportNum" :disabled="selectedNode === undefined" >确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { createReportNum } from '../../../api';
export default {
  name: 'createReportNumDialog',
  inject: ['reload'],
  props: {
    show: { type: Boolean, default: false },
    projId: { type: Number },
    projType: { type: Number },
    reportNumType: { type: Number },
    reportNumList:{ type: Object}
  },
  data() {
    return {
      info: {
        projType: undefined,
        projId: undefined,
        reportNumList: {}
      },
      dialogVisible: false,
      selectedNode: undefined,
      options: [
        {
          value: 0,
          label: '初评号',
          disabled: false,
          children: [
            {
              value: 1011,
              label: '房地产初评/F',
              disabled: true
            },
            {
              value: 1021,
              label: '资产初评/Z',
              disabled: true
            },
            {
              value: 1031,
              label: '土地初评/T',
              disabled: true
            }
          ]
        },
        {
          value: 1,
          label: '正评号',
          disabled: false,
          children: [
            {
              value: 1012,
              label: '房地产正评/FG',
              disabled: true
            },
            {
              value: 1022,
              label: '资产正评/ZP',
              disabled: true
            },
            {
              value: 1032,
              label: '土地正评/TG',
              disabled: true
            },
            {
              value: 1013,
              label: '房地产咨询/FZ',
              disabled: true
            },
            {
              value: 1023,
              label: '资产咨询/ZZ',
              disabled: true
            },
            {
              value: 1033,
              label: '土地咨询/TZ',
              disabled: true
            },
            {
              value: 1061,
              label: '房地产复审/FSF',
              disabled: true
            },
            {
              value: 1062,
              label: '资产复审/FSZ',
              disabled: true
            },
            {
              value: 1063,
              label: '土地复审/FST',
              disabled: true
            },
            {
              value: 1050,
              label: 'PPP/PPP',
              disabled: true
            },
            {
              value: 1070,
              label: '外协/WX',
              disabled: true
            },
            {
              value: 1071,
              label: '协外/XW',
              disabled: true
            },
            {
              value: 1080,
              label: '政策修订/ZC',
              disabled: true
            },
            {
              value: 1090,
              label: '绩效/JX',
              disabled: true
            }
          ]
        },
        {
          value: 2,
          label: '其他（包含回函号）',
          disabled: false,
          children: [
            {
              value: 1100,
              label: '其他/QT',
              disabled: true
            }
          ]
        }
      ],
      reportNumTypeScope: {
        1010: [1011, 1012, 1013, 1100],
        1020: [1021, 1022, 1023, 1100],
        1030: [1031, 1032, 1033, 1100],
        1041: [1013, 1100],
        1042: [1023, 1100],
        1043: [1033, 1100],
        1050: [1050, 1100],
        1061: [1061, 1100],
        1062: [1062, 1100],
        1063: [1063, 1100],
        1070: [1070, 1012, 1022, 1032, 1013, 1023, 1033, 1100],
        1071: [1071, 1100],
        1080: [1080, 1013, 1023, 1033, 1100],
        1090: [1090],
        1100: [1100]
      }
    };
  },
  watch: {
    show: {
      immediate: true,
      deep: true,
      handler(show) {
        this.dialogVisible = show
        this.info.projType = this.projType
        this.info.projId = this.projId
        this.info.reportNumList = this.reportNumList
        this.setScope()
      }
    },
    projType(val) {
      this.projType = val
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false);
    },
    setScope() {
      var scope = this.reportNumTypeScope[this.info.projType]
      console.log(scope)
      var father
      var children
      if (this.info.reportNumList.cph !== '') {
        this.options[0].disabled = true
      }
      if (this.info.reportNumList.zph !== '') {
        this.options[1].disabled = true
      }
      if (this.info.reportNumList.hhh !== '') {
        this.options[2].disabled = true
      }
      for (let i = 0; i < this.options.length; i++) {
        console.log(i);
        father = this.options[i].children;
        for (let j = 0; j < father.length; j++) {
          if (scope.indexOf(father[j].value) >= 0) {
            console.log(father[j].label);
            father[j].disabled = false
          }
        }
      }
    },
    handleCreateReportNum() {

      let nodeValue = this.selectedNode[this.selectedNode.length - 1]
      console.log(typeof nodeValue !== 'number')
      if (typeof nodeValue !== 'number' || nodeValue < 1000) {
        this.message.error('类型错误  ' + nodeValue);
        return
      }

      createReportNum({ projId: this.info.projId, reportNumType: nodeValue }).then(
          res => {
            console.log(res);
            this.$message.success('获取成功');
            this.onClose()
            this.$emit('response')
          }
      ).catch(
          err => {
            if (err.statusCode == '5001') {
              this.$message.warning('获取失败：该类型报告号已存在');
            } else {
              this.$message.error('获取失败')
            }
          }
      );


    },


  }
};
</script>

<style scoped>

</style>