<!--
 * @Author: 码上talk|RC
 * @Date: 2021-06-29 16:33:16
 * @LastEditTime: 2021-08-26 10:51:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/trace/flush.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="trace-flush">
    <div class="f-toolbar">
      <div class="t-left">
        <axq-code-scanner :mode="6" required-status="ALL" @ok="scannerOkHandler"></axq-code-scanner>
      </div>
      <div class="t-right">
        <el-button-group>
          <el-button type="danger" size="small" @click.native="flush">清空</el-button>
          <el-button type="primary" size="small" @click.native="add">清空溯源</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="f-table">
      <el-table :data="list" style="width: 100%" max-height="550">
        <el-table-column fixed prop="date" label="序号" width="150">
          <template slot-scope="props">
            <p>{{ props.$index + 1 }}</p>
          </template>
        </el-table-column>
        <el-table-column label="溯源码">
          <template slot-scope="props">
            <p>{{ props.row.qrCode }}</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="props">
            <el-button type="text" size="small" @click.native="list.splice(props.$index, 1)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axqCodeScanner from '@/components/axq/code-scanner';
import { model } from '@/model';

const {
  TraceCode
} = model.collection;

export default {
  components: {
    axqCodeScanner
  },
  data () {
    return {
      list: []
    };
  },
  methods: {
    scannerOkHandler (e) {
      const { qrCode, qrCodeId } = e;
      if (this.$_.find(this.list, i => { return i.qrCode === qrCode; })) {
        this.$message.warning('请勿重复扫入溯源码！');
        return;
      }
      this.list.unshift({
        qrCode,
        qrCodeId
      });
    },
    flush () {
      this.$confirm('是否清除当前扫码信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list = [];
      }).catch(() => {
      });
    },
    add () {
      this.$confirm('是否清除扫码列表所有溯源信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        TraceCode.sendApi('logFlush', { params: { codeIds: this.list.map(i => i.qrCodeId).join(',') }, data: {} }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message.success('清除溯源码成功');
            this.list = [];
          } else {
            this.$message.error('清除溯源码失败');
          }
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang="less">
.trace-flush {
  height: 70vh;
  padding: 20px;
  background: white;
  .f-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
