<!--
 * @Author: your name
 * @Date: 2021-07-21 09:35:04
 * @LastEditTime: 2021-07-23 21:07:37
 * @LastEditors: 码上talk|RC
 * @Description: In User Settings Edit
 * @FilePath: /web-admin/src/components/axq/printer/type/achieve-transfer.vue
-->
<template>
  <div class="achive-transfer">
    <h2 style="width: 1100px; text-align: center">业绩转让申请表</h2>
    <p style="width: 1100px">申请编号：{{ $_.get(approval, "_raw.sn") }}</p>
    <table
      border
      cellspacing="0"
      cellpadding="0"
      style="
        font-size: 15px;
        margin-top: 20px;
        table-layout: fixed;
        min-width: 1100px;
      "
    >
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 40px">
            转让人：{{
            $_.get(approval, "_raw.approvalSubAchieveTransfer.give.nickname")
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            受让人：{{
            $_.get(
            approval,
            "_raw.approvalSubAchieveTransfer.recipient.nickname"
            )
            }}
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 40px">
            转让数量：{{
            $_.get(approval, "_raw.approvalSubAchieveTransfer.integral")
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">业绩时间：</td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left">提交人：</td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left"
          >提交时间：{{ $_.get(approval, "_raw.createTime") }}</td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" colspan="2" style="text-align: left; height: 80px">部门经理意见：</td>
        </tr>
      </tbody>
    </table>
    <h2 style="width: 1100px; text-align: center">业绩受让申请表</h2>
    <p style="width: 1100px">申请编号：{{ $_.get(approval, "_raw.sn") }}</p>
    <table
      border
      cellspacing="0"
      cellpadding="0"
      style="
        font-size: 15px;
        margin-top: 20px;
        table-layout: fixed;
        min-width: 1100px;
      "
    >
      <tbody>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 40px">
            受让人：{{
            $_.get(
            approval,
            "_raw.approvalSubAchieveTransfer.recipient.nickname"
            )
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">
            转让人：{{
            $_.get(approval, "_raw.approvalSubAchieveTransfer.give.nickname")
            }}
          </td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left; height: 40px">
            转让数量：{{
            $_.get(approval, "_raw.approvalSubAchieveTransfer.integral")
            }}
          </td>
          <td nowrap="nowrap" scope="col" style="text-align: left">业绩时间：</td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" style="text-align: left">提交人：</td>
          <td
            nowrap="nowrap"
            scope="col"
            style="text-align: left"
          >提交时间：{{ $_.get(approval, "_raw.createTime") }}</td>
        </tr>
        <tr>
          <td nowrap="nowrap" scope="col" colspan="2" style="text-align: left; height: 80px">部门经理意见：</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { model } from '@/model';

const { Approval } = model.collection;

export default {
  props: ['id', 'autoPrint'],
  data () {
    return {
      approval: new Approval()
    };
  },
  methods: {
    getApproval () {
      Approval.sendApi('info', {
        params: { type: 15 },
        data: { query: { id: this.id || -1 } }
      }).then((res) => {
        const { status, data } = res;
        if (status) {
          this.approval = new Approval(data);
          if (this.autoPrint) {
            setTimeout(() => {
              this.$emit('ok');
            }, 2000);
            return;
          }
          const h = this.$createElement;
          this.$msgbox({
            title: '消息',
            message: h('div', null, [
              h('p', { style: 'color: teal' }, '是否打印当前业绩转让申请？')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '打印机加载中...';
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    this.$emit('ok');
                    instance.confirmButtonLoading = false;
                  }, 300);
                }, 1000);
              } else {
                done();
              }
            }
          });
        } else {
          this.$message({
            message: '获取业绩转让信息失败',
            type: 'error'
          });
        }
      });
    }
  },
  created () {
    this.getApproval();
  }
};
</script>
