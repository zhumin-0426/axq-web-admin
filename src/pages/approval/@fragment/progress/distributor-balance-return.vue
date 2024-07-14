<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-11 11:31:40
 * @LastEditTime: 2021-08-11 14:19:52
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/progress/distributor-balance-return.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="progress progress_distributor-balance-return">
    <div class="p-step">
      <el-steps :active="active - 1" finish-status="success">
        <el-step :title="item" :key="key" v-for="(item, key) in list"></el-step>
      </el-steps>
    </div>
    <div class="p-info">
        <div class="content">
        <template v-if="approval.approvalSubDistributorBalanceChange.type===4">
               <header>奖励划转信息</header>
               <div class="content">
                  <div>
                    <div>
                      新店主姓名：{{$_.get(approval,`approvalSubDistributorBalanceChange.distributor.nickname`)}}/{{$_.get(approval,`approvalSubDistributorBalanceChange.distributor.id`)}}
                    </div>
                  </div>
                  <div>
                    <div>
                      划转金额：{{$_.get(approval,`approvalSubDistributorBalanceChange.amount`)}}元
                    </div>
                  </div>
               </div>
               <header>接收店主信息</header>
               <div>
                  <div>
                    <div>
                     上级店主姓名： {{$_.get(approval,`approvalSubDistributorBalanceChange.receiver.nickname`)}}/{{$_.get(approval,`approvalSubDistributorBalanceChange.receiver.id`)}}
                    </div>
                  </div>
                  <div label="接收金额：">
                    <div>
                      接收金额：{{$_.get(approval,`approvalSubDistributorBalanceChange.amount`)}}元
                    </div>
                  </div>
                  <div label="接收后剩余余额：">
                      <div v-if="this.approval.status < 2">
                          接收后剩余余额：{{( $_.get(approval,'approvalSubDistributorBalanceChange.amount') +$_.get(approval,'approvalSubDistributorBalanceChange.receiver.memberAccount.balance') + $_.get(approval,'approvalSubDistributorBalanceChange.receiver.memberAccount.balanceFreeze')) | amountFormat(2, ",")
                          }}元
                      </div>
                  </div>
               </div>
               <div class="content">
                  <div >
                    <div c->
                      备注信息：{{$_.get(approval,`approvalSubDistributorBalanceChange.remark`)}} 
                    </div>
                  </div>
               </div>
               <template v-if="$_.get(approval, 'approvalSubDistributorBalanceChange.type') === 4&&$_.get(approval,`approvalTimelineList`).length>0">
                  <header>审核信息</header>
                  <div>
                      <div>
                        <div>
                          审核人：{{$_.get(approval,`approvalTimelineList`)[$_.get(approval,`approvalTimelineList`).length-1].checker.nickname}}
                        </div>
                      </div>
                      <div>
                        <div>
                          审核时间：{{$_.get(approval,`approvalTimelineList`)[$_.get(approval,`approvalTimelineList`).length-1].createTime}}</div>
                      </div>
                  </div>
                  <div>
                      <div>
                          备注：{{$_.get(approval,`approvalTimelineList`)[$_.get(approval,`approvalTimelineList`).length-1].remark}}</div>
                      </div>
               </template>
        </template>
        <template v-if="$_.get(approval, 'approvalSubDistributorBalanceChange.type') === 1">
          <header>充值信息</header>
          <div>
            <div>店主姓名：{{ $_.get(approval,
                `approvalSubDistributorBalanceChange.distributor.nickname`) + '/' + $_.get(approval,
                  `approvalSubDistributorBalanceChange.distributor.id`)
            }}</div>
            <div>余额类型：{{ ({ 1: '傲雪棋余额', 2: '思雪余额' })[$_.get(approval,
                `approvalSubDistributorBalanceChange.balanceType`)]
            }}
            </div>
            <div>充值方式：{{ ({ 1: '现金', 2: '销售奖励', 3: '转账' })[$_.get(approval,
                `approvalSubDistributorBalanceChange.topUpType`)]
            }}</div>
            <template v-if="$_.get(approval, `approvalSubDistributorBalanceChange.topUpType`) === 3">
              <div>充值时间：{{ $_.get(approval, `approvalSubDistributorBalanceChange.transferData.time`) }}</div>
              <div>公户名称：{{ $_.get(approval,
                  `approvalSubDistributorBalanceChange.transferData.axqSelfEmployedLaborerName`)
              }}</div>
              <div style="display: flex;">充值凭证：
                <file-previewer
                  :value="JSON.stringify(($_.get(approval, 'approvalSubDistributorBalanceChange.transferData.fileJson') || []).map(item => JSON.parse(item)))">
                </file-previewer>
              </div>
            </template>
            <div>充值金额：{{ $_.get(approval, `approvalSubDistributorBalanceChange.amount`) | amountFormat(2, ",") }}元
            </div>
            <div v-if="this.approval.status !== 2">充值后金额：{{ ($_.get(approval,
                `approvalSubDistributorBalanceChange.amount`) + $_.get(approval,
                  `approvalSubDistributorBalanceChange.changeBalance.${balanceName}`) + $_.get(approval,
                    `approvalSubDistributorBalanceChange.changeBalance.${balanceName}Freeze`)) | amountFormat(2, ",")
            }}元</div>
            <div v-else>充值后金额：{{ ($_.get(approval, `approvalSubDistributorBalanceChange.amount`) +
                accountDistributorPre[balanceName] + accountDistributorPre[balanceName + 'Freeze']) | amountFormat(2, ",")
            }}</div>
            <div style="grid-column-start: span 3;">
              备注信息：{{ $_.get(approval, `approvalSubDistributorBalanceChange.remark`) || '--' }}</div>
          </div>

          <template v-if="active > 2 || approval.status === 3">
            <header class="activeHeader">审核信息</header>
            <div>
              <div>审核人：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length - 1}].checker.nickname`)
              }}</div>
              <div>审核时间：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length - 1}].createTime`)
              }}</div>
              <div style="grid-column-start: span 3;" v-if="approval.status === 3">
                备注信息：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length -
                    1}].remark`) || '--'
                }}</div>
            </div>
          </template>
        </template>
        <template v-if="$_.get(approval, 'approvalSubDistributorBalanceChange.type') === 2">
          <header>余额转让店主信息</header>
          <div>
            <div>
              店主姓名：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.distributor.nickname') + '/' +
                  $_.get(approval,
                    'approvalSubDistributorBalanceChange.distributor.id')
              }}
            </div>
            <div>
              转出余额：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.amount') | amountFormat(2, ",") }}元
            </div>
            <div v-if="this.approval.status !== 2">
              转出后剩余余额：{{ ($_.get(approval, `approvalSubDistributorBalanceChange.changeBalance.${balanceName}`) +
                  $_.get(approval, `approvalSubDistributorBalanceChange.changeBalance.${balanceName}Freeze`) - $_.get(approval,
                    `approvalSubDistributorBalanceChange.amount`)) | amountFormat(2, ",")
              }}元
            </div>
            <div v-else>
              转出后剩余余额：{{ (accountDistributorPre[balanceName] + accountDistributorPre[balanceName + 'Freeze'] - $_.get(approval,
                  'approvalSubDistributorBalanceChange.amount')) | amountFormat(2, ",")
              }}元
            </div>
          </div>
          <header class="activeHeader">余额接收店主信息</header>
          <div>
            <div>
              店主姓名：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.receiver.nickname') + '/' + $_.get(approval,
                  'approvalSubDistributorBalanceChange.receiver.id')
              }}
            </div>
            <div>
              接收余额：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.amount') | amountFormat(2, ",") }}元
            </div>
            <div v-if="this.approval.status !== 2">
              接收后剩余余额：{{ ($_.get(approval, `approvalSubDistributorBalanceChange.receiverBalance.${balanceName}`) +
                  $_.get(approval, `approvalSubDistributorBalanceChange.receiverBalance.${balanceName}Freeze`) + $_.get(approval,
                    `approvalSubDistributorBalanceChange.amount`)) | amountFormat(2, ",")
              }}元
            </div>
            <div v-else>
              接收后剩余余额：{{ (receiverDistributorPre[balanceName] + receiverDistributorPre[balanceName + 'Freeze'] + $_.get(approval,
                  'approvalSubDistributorBalanceChange.amount')) | amountFormat(2, ",")
              }}元
            </div>
            <div style="grid-column-start: span 3;">
              备注信息：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.remark') || '--' }}
            </div>
          </div>
          <template v-if="active > 2 || approval.status === 3">
            <header class="activeHeader">审核信息</header>
            <div>
              <div>审核人：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length - 1}].checker.nickname`)
              }}</div>
              <div>审核时间：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length - 1}].createTime`)
              }}</div>
              <div style="grid-column-start: span 3;" v-if="approval.status === 3">
                备注信息：{{ $_.get(approval, `approvalTimelineList[${approval.approvalTimelineList.length -
                    1}].remark`) || '--'
                }}</div>
            </div>
          </template>
        </template>
        <template v-if="$_.get(approval, 'approvalSubDistributorBalanceChange.type') === 3">
          <header>余额退回店主信息</header>
          <div>
            <div>店主姓名：{{ $_.get(approval,
                `approvalSubDistributorBalanceChange.distributor.nickname`) + '/' + $_.get(approval,
                  `approvalSubDistributorBalanceChange.distributor.id`)
            }}</div>
            <div>退回余额：{{ $_.get(approval, 'approvalSubDistributorBalanceChange.amount') | amountFormat(2, ",") }}元</div>
            <div v-if="(approval.status === 3 || approval.status === 1) && active < 3">
              退回后剩余余额：{{ ($_.get(approval, `approvalSubDistributorBalanceChange.changeBalance.${balanceName}`) +
                  $_.get(approval, `approvalSubDistributorBalanceChange.changeBalance.${balanceName}Freeze`) - $_.get(approval,
                    `approvalSubDistributorBalanceChange.amount`)) | amountFormat(2, ",")
              }}元
            </div>
            <div v-else>
              退回后剩余余额：{{ (accountDistributorPre[balanceName] + accountDistributorPre[balanceName + 'Freeze'] - $_.get(approval,
                  'approvalSubDistributorBalanceChange.amount')) | amountFormat(2, ",")
              }}元
            </div>
          </div>
          <header class="activeHeader">店主收款信息</header>
          <div>
            <div>收款人：{{ $_.get(approval, `approvalSubDistributorBalanceChange.returnData.accountOwner`) }}</div>
            <div>开户行：{{ $_.get(approval, `approvalSubDistributorBalanceChange.returnData.accountOpen`) }}</div>
            <div>银行卡号：{{ $_.get(approval, `approvalSubDistributorBalanceChange.returnData.account`) }}</div>
            <div style="grid-column-start: span 3;">
              备注信息：{{ $_.get(approval, `approvalSubDistributorBalanceChange.remark`) || '--' }}</div>
            </div>
          <template v-if="active > 2 || approval.status === 3">
            <header class="activeHeader">财务审核信息</header>
            <div>
              <div>审核人：{{ $_.get(approval, `approvalTimelineList[${this.approval.approvalTimelineList.length -1}].checker.nickname`)
              }}</div>
              <div>审核时间：{{ $_.get(approval, `approvalTimelineList[${this.approval.approvalTimelineList.length -1}].createTime`)
              }}</div>
              <div style="grid-column-start: span 3;" v-if="approval.status === 3">
                备注信息：{{ $_.get(approval, `approvalTimelineList[${this.approval.approvalTimelineList.length -1}].remark`) || '--'
                }}</div>
            </div>
            <header class="activeHeader" v-if="active > 2">出纳审核信息</header>
            <div v-if="active === 3">
              <div style="grid-column-start: span 3;display: flex;">退回转账凭证：<file-uploader :value="fileJson"
                  ref="sendBackFileUploader" :max="1" @change="sendBackFileUploader"></file-uploader>
              </div>
            </div>
            <div v-if="active === 5">
              <div style="grid-column-start: span 3;display: flex;">退回转账凭证：<file-previewer
                  :value="JSON.stringify(sendBackFileJson.map(item => JSON.parse(item)))">
                </file-previewer>
              </div>
              <div>审核人：{{ $_.get(approval, `approvalTimelineList[0].checker.nickname`)
              }}</div>
              <div>审核时间：{{ $_.get(approval, `approvalTimelineList[0].createTime`)
              }}</div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import filePreviewer from '@/components/file-previewer';
import fileUploader from '@/components/file-uploader';
import { formToolkit } from '@/model/form-toolkit';
import { model } from '@/model';
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
const {
  RevertForm,
  Approval,
  ApprovalSubDistributorBalanceChange,
} = model.collection;

export default {
  components: {
    filePreviewer,
    fileUploader,
    grid,
    gridItem
  },
  props: {
    approval: {
      type: Object,
      default() {
        return {
          approvalWorkflowList: [],
          workflowId: -1
        };
      }
    }
  },
  data() {
    return {
      type: Number(this.$route.query.type),
      entitys: {
        RevertForm
      },
      sendBackFileJson: []
    };
  },
  computed: {
    list() {
      const total = [];
      const pre = this.approval.approvalSubDistributorBalanceChange.type === 4 ? ['创建奖励划转申请'] : [`创建余额${({1:'充值',2:'转账',3:'退款'})[this.approval.approvalSubDistributorBalanceChange.type]}申请`];
      const last = ['已通过'];
      total.push(...pre);
      let optionsId = +JSON.parse(this.approval.options || "{}").ignoreWorkflowIds;
      for (let item of this.approval.approvalWorkflowList) {
        if (item.id === optionsId) {
          continue;
        }
        total.push(item.name);
      }
      total.push(...last);
      return total;
    },
    active() {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 3;
      }
      return this.approval.approvalWorkflowList.map(i => i.id).indexOf(this.approval.workflowId) + 2;
    },
    accountDistributorPre() {
      return JSON.parse(this.approval.approvalSubDistributorBalanceChange.accountDistributorPre || '{}')
    },
    receiverDistributorPre() {
      return JSON.parse(this.approval.approvalSubDistributorBalanceChange.receiverDistributorPre || '{}')
    },
    fileJson() {
      return JSON.stringify(this.sendBackFileJson.map(item => JSON.parse(item)));
    },
    balanceName(){
      return ({1:'balance', 2:'sixueBalance'})[  this.$_.get(this.approval,`approvalSubDistributorBalanceChange.balanceType`)]
    },
  },
  mounted() {
    if (this.$_.get(this.approval, 'approvalSubDistributorBalanceChange.type') === 3) {
      this.sendBackFileJson = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.returnData.fileJson`) || [];
    }
  },
  methods: {
    sendBackFileUploader(e) {
      let fileJson = JSON.parse(e).map(item => {
        return JSON.stringify(item);
      })
      if (!fileJson.length) {
        this.sendBackFileJson = [];
        return
      }
      if (this.sendBackFileJson.length &&  JSON.parse(fileJson[0]).oss.filename === JSON.parse(this.sendBackFileJson[0]).oss.filename) {
        return
      }

      let info = (() => {
        const f1 = Approval.formUtil().generator(
          "update",
          "approvalSubDistributorBalanceChange"
        );
        const f2 = ApprovalSubDistributorBalanceChange.formUtil().generator(
          "update",
          "default"
        );
        f1.approvalSubDistributorBalanceChange.value = f2;
        return f1;
      })();
      info.approvalSubDistributorBalanceChange.value.id.value = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.id`);
      info.approvalSubDistributorBalanceChange.value.amount.value = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.amount`);
      info.approvalSubDistributorBalanceChange.value.balanceType.value = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.balanceType`);
      info.approvalSubDistributorBalanceChange.value.distributorId.value = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.distributorId`);
      info.approvalSubDistributorBalanceChange.value.remark.value = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.remark`);
      info.approvalSubDistributorBalanceChange.value.returnData.value = {
        account: this.$_.get(this.approval, `approvalSubDistributorBalanceChange.returnData.account`),
        accountOpen: this.$_.get(this.approval, `approvalSubDistributorBalanceChange.returnData.accountOpen`),
        accountOwner: this.$_.get(this.approval, `approvalSubDistributorBalanceChange.returnData.accountOwner`),
        fileJson
      }
      const { ok, form } = formToolkit.validate(info);
      if (ok) {
        Object.assign(form, {
          id: this.approval.id,
          status: this.approval.status,
          typeId: this.approval.typeId,
          workflowId: this.approval.workflowId,
        });
        form.approvalSubDistributorBalanceChange.operatorId = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.operatorId`);
        form.approvalSubDistributorBalanceChange.type = this.$_.get(this.approval, `approvalSubDistributorBalanceChange.type`);
        Approval.sendApi("update", {
          params: {
            id: this.approval.id
          },
          data: form,
        }).then((res) => {
          const { status, data } = res;
          if (status) {
            this.$message({
              message: "退回转账凭证上传成功",
              type: "success",
            });
            this.sendBackFileJson = info.approvalSubDistributorBalanceChange.value.returnData.value.fileJson;
          } else {
            this.$refs.sendBackFileUploader.remove(0);
            this.$message({
              message: "退回转账凭证上传失败",
              type: "error",
            });
          }
        });
      }
    },
    _checkEnableSubmit() {
      let r = {
        ok: true,
        message: ''
      }
      if (this.$_.get(this.approval, 'approvalSubDistributorBalanceChange.type') === 3 && !this.sendBackFileJson.length && this.active === 3) {
        return {
          ok: false,
          message: '退回转账凭证不能为空'
        }
      }
      return r;
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");

.progress {
  &_distributor-balance-return {
    .p-info {
      .content {
        .activeHeader {
          margin-top: 13px;
        }

        >header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: bold;
          color: #515A6E;

          &::before {
            content: '';
            display: block;
            margin-right: 11px;
            width: 3px;
            height: 13px;
            background: #515A6E;
          }
        }

        >div {
          display: grid;
          grid-row-gap: 14px;
          grid-template-columns: repeat(3, 1fr);

          >div {
            font-size: 14px;
            font-weight: 400;
            color: #333;
          }
        }
      }

      .error {
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
    }
  }
}
</style>
