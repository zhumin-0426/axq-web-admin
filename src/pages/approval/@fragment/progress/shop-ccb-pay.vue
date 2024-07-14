<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2021-08-11 14:20:23
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/shop-ccb-pay.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_shop-ccb-pay">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <template v-if="approval.status === 1">
        <div class="title">
          <div class="t-left">
            <span>店铺系统收款申请信息：</span>
          </div>
          <div class="t-right"></div>
        </div>
        <div class="content">
          <p>店主姓名/电话：{{ $_.get(approval, `approvalSubShopCcbPay.shop.holder.nickname`) }}</p>
          <p>商户名称：{{ $_.get(approval, `approvalSubShopCcbPay.shop.name`) }}</p>
          <p>商户号：{{ $_.get(approval, `approvalSubShopCcbPay.merchanseId`) }}</p>
          <p>电话号码：{{ $_.get(approval, `approvalSubShopCcbPay.shop.mobile`) }}</p>
          <p>柜台号：{{ $_.get(approval, `approvalSubShopCcbPay.postId`) }}</p>
          <p>分行号：{{ $_.get(approval, `approvalSubShopCcbPay.brachId`) }}</p>
          <p>公钥：{{ $_.get(approval, `approvalSubShopCcbPay.pubKey`, '').hideStr(5, 5) }}</p>
          <p>
            支付验证：{{ $_.get(approval, `approvalSubShopCcbPay.verifyStatus`) | verifyStatus }}
            <el-button
              style="marginLeft: 10px;"
              size="mini"
              type="primary"
              @click.native="$refs.popupConfirmCCBVerify.open()"
            >验证</el-button>
          </p>
        </div>
      </template>
      <template v-else>
        <div class="ok" v-if="approval.status === 2">
          <i class="iconfont icon-chenggong"></i>
          <p>审核已通过</p>
        </div>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>备注：{{ blankGet($_.get(approval.approvalTimelineList, '[0].remark')) }}</p>
          <div class="c-item">
            <div class="i-lable">附件：</div>
            <div class="i-value">
              <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
            </div>
          </div>
        </div>
        <div class="error" v-if="approval.status === 4">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
    <popup-confirm ref="popupConfirmCCBVerify" title="验证建行支付配置">
      <div class="popup-confirm_ccb-verify">
        <cell-group>
          <cell-item label="支付金额：">
            <span>￥0.01</span>
          </cell-item>
          <cell-item label="扫码枪扫码支付：">
            <el-input
              size="small"
              placeholder="请使用扫码枪扫码验证"
              v-model="popup.ccbVerify.attr.value"
              @keyup.native="popup.ccbVerify.fn.keyupHandler"
            ></el-input>
          </cell-item>
          <cell-item label="提示：">
            <p style="color:#F56C6C;">验证过程需要支付￥0.01，此过程金额无法原路返回！</p>
          </cell-item>
        </cell-group>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import popupConfirm from '@/components/popup/type/confirm';
import filePreviewer from '@/components/file-previewer';
import cellGroup from '@/components/cell/group';
import cellItem from '@/components/cell/item';

import { model } from '@/model';
const { Approval } = model.collection;

export default {
  components: {
    popupConfirm,
    filePreviewer,
    cellGroup,
    cellItem
  },
  props: {
    approval: {
      type: Object,
      default () {
        return {
          approvalWorkflowList: [],
          workflowId: -1
        };
      }
    }
  },
  data () {
    return {
      type: Number(this.$route.query.type),
      popup: {
        ccbVerify: {
          attr: {
            value: ''
          },
          fn: {
            keyupHandler: (e) => {
              if (e.key == 'Enter') {
                Approval.sendApi('shopCcbConfigVerify', { params: { id: Number(this.$route.params.id), code: this.popup.ccbVerify.attr.value }, data: {} }).then(res => {
                  this.popup.ccbVerify.attr.value = '';
                  const { status, data } = res;
                  this.$emit('update');
                  if (status) {
                    this.$message.success('验证成功');
                    this.$refs.popupConfirmCCBVerify.close();
                  } else {
                    this.$message.error('验证失败');
                  }
                });
              }
            }
          }
        }
      }
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = ['创建店铺开通系统支付申请'];
      const last = ['已通过'];
      return total.concat(pre).concat(this.approval.approvalWorkflowList.map(i => i.name)).concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return this.approval.approvalWorkflowList.map(i => i.id).indexOf(this.approval.workflowId) + 2;
    }
  },
  filters: {
    verifyStatus (e) {
      if (e === 1) {
        return '未验证';
      }
      if (e === 2) {
        return '验证成功';
      }
      if (e === 3) {
        return '验证失败';
      }
    }
  },
  methods: {
    _checkEnableSubmit () {
      let ok = true;
      let message = '';
      if (this.$_.get(this.approval, 'approvalSubShopCcbPay.verifyStatus') === 1) {
        ok = false;
        message = '支付尚未验证，请验证后再提交通过';
      }
      if (this.$_.get(this.approval, 'approvalSubShopCcbPay.verifyStatus') === 3) {
        ok = false;
        message = '支付验证失败，请验证后再提交通过';
      }
      return {
        ok,
        message
      };
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_shop-ccb-pay {
    .p-info {
      .c-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .i-value {
          i {
            color: #515a6e;
            font-size: 22px;
          }
        }
      }
    }
    .popup-confirm {
      &_ccb-verify {
        padding: 20px;
      }
    }
  }
}
</style>
