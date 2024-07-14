<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-20 22:26:50
 * @LastEditTime: 2022-06-22 11:08:42
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/shop/_id.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="shop-info">
    <div class="i-block i-block_base">
      <div class="b-title">
        <span>店铺信息</span>
      </div>
      <div class="b-content">
        <grid :col="3" class="c-grid">
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺名称:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.name')"></el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="!checkAccessNode('SHOP.update')" @click.native="
                    $refs.popupConfirmShopUpdate.open({
                      triggerOpen: popup.shopUpdate.fn.openHandler,
                      triggerClose: popup.shopUpdate.fn.closeHandler,
                      params: { title: '修改名称', type: 1 },
                    })
                  ">
                  修改</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>代理区域:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.regionAllocate.name')"></el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="
                    !checkAccessNode('SHOP.update') && infoGet('info.regionAllocateId')
                  " @click.native="
                    $refs.popupConfirmShopUpdate.open({
                      triggerOpen: popup.shopUpdate.fn.openHandler,
                      triggerClose: popup.shopUpdate.fn.closeHandler,
                      params: { title: '修改区域', type: 9 },
                    })
                  ">
                  修改</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺地址:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.fullAddress')"></el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="!checkAccessNode('SHOP.update')" @click.native="
                    $refs.popupConfirmShopUpdate.open({
                      triggerOpen: popup.shopUpdate.fn.openHandler,
                      triggerClose: popup.shopUpdate.fn.closeHandler,
                      params: { title: '修改地址', type: 2 },
                    })
                  ">
                  修改</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺面积:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.shopProfile.addressArea')"></el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店主:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.holder.nickname')"></el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="
                    !checkAccessNode('SHOP.update') ||
                    (infoGet('info.approval', '') &&
                      infoGet('info.approval.status') !== 2)
                  " @click.native="
                    $refs.popupConfirmShopChange.open({
                      triggerOpen: popup.approvalSubShopChange.fn.openHandler,
                      triggerClose: popup.approvalSubShopChange.fn.closeHandler,
                    })
                  ">转让</el-button>
                <el-button type="primary" size="mini" style="marginleft: 10px" @click.native="go(`/member/${infoGet('info.holder.id')}`)">查看详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>保证金:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.shopDeposit.amount')"></el-input>
                <el-button size="mini" type="primary" style="marginleft: 10px" :disabled="
                    !checkAccessNode('SHOP.update') || infoGet('info.status') === 2
                  " @click.native="
                    $refs.popupConfirmshopDeposit.open({
                      triggerOpen: popup.shopDeposit.fn.openHandler,
                      triggerClose: popup.shopDeposit.fn.closeHandler,
                      params: { type: 1, title: '保证金缴纳' },
                    })
                  " v-if="
                    !infoGet('info.shopDeposit') ||
                    [0, 1].includes(infoGet('info.shopDeposit.status'))
                  ">缴纳
                </el-button>
                <el-button size="mini" type="primary" style="marginleft: 10px" :disabled="!checkAccessNode('SHOP.update')" @click.native="
                    $refs.popupConfirmshopDeposit.open({
                      triggerOpen: popup.shopDeposit.fn.openHandler,
                      triggerClose: popup.shopDeposit.fn.closeHandler,
                      params: { type: 2, title: '保证金详情' },
                    })
                  " v-if="[2].includes(infoGet('info.shopDeposit.status'))">详情
                </el-button>
                <span style="whitespace: nowrap; marginleft: 10px">{{
                  infoGet("info.shopDeposit.status") | depositStatusFilter
                }}</span>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺员工:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled value="5人"></el-input>
                <el-button size="mini" style="marginleft: 10px">详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺库存:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="500"></el-input>
                <el-button size="mini" style="marginleft: 10px">详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺订单:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="302"></el-input>
                <el-button size="mini" style="marginleft: 10px">详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>开店时间:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.createTime')"></el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>修改会员积分:</span>
                </div>
                <div class="i-value">
                  <switch-selector :mode="2" :disabled="!checkAccessNode('SHOP.update')" tip="是否切换修改会员积分权限" :config="{
                      selectorList: [
                        { label: '是', value: 1 },
                        { label: '否', value: 0 },
                      ],
                      value: infoGet('info.accessModifyMemberIntegral') ? true : false,
                    }" @change="
                      (e) => {
                        this.switchSelector.fn.updateShopAccessModifyMember(
                          6,
                          e.value,
                          e.ok,
                          e.error
                        );
                      }
                    ">
                  </switch-selector>
                </div>
              </div>
              <div class="f-item" style="paddingleft: 10px">
                <div class="i-label">
                  <span>修改等级权限:</span>
                </div>
                <div class="i-value">
                  <switch-selector :mode="2" :disabled="!checkAccessNode('SHOP.update')" tip="是否切换修改会员等级权限" :config="{
                      selectorList: [
                        { label: '是', value: 1 },
                        { label: '否', value: 0 },
                      ],
                      value: infoGet('info.accessModifyMemberLevel') ? true : false,
                    }" @change="
                      (e) => {
                        this.switchSelector.fn.updateShopAccessModifyMember(
                          7,
                          e.value,
                          e.ok,
                          e.error
                        );
                      }
                    ">
                  </switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>修改余额权限:</span>
                </div>
                <div class="i-value">
                  <switch-selector :mode="2" :disabled="!checkAccessNode('SHOP.update')" tip="是否切换修改会员店铺余额权限" :config="{
                      selectorList: [
                        { label: '是', value: 1 },
                        { label: '否', value: 0 },
                      ],
                      value: infoGet('info.accessModifyMemberBalance') ? true : false,
                    }" @change="
                      (e) => {
                        this.switchSelector.fn.updateShopAccessModifyMember(
                          8,
                          e.value,
                          e.ok,
                          e.error
                        );
                      }
                    ">
                  </switch-selector>
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>店铺状态:</span>
              </div>
              <div class="i-value">
                <switch-selector :mode="1" :disabled="!checkAccessNode('SHOP.update')" tip="是否启用店铺，开启后店铺可以正常使用" :config="{
                    selectorList: entitys.Shop._options.status,
                    value: infoGet('info.status'),
                  }" @change="switchSelector.fn.updateShopStatus"></switch-selector>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>系统收款:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.shopPay.ccbStatus') === 1 ? '已开通' : '未开通'">
                </el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="!checkAccessNode('SHOP.update')" @click.native="
                    $refs.popupConfirmApprovalSubShopCcbPayAdd.open({
                      triggerOpen: popup.approvalSubShopCcbPayAdd.fn.openHandler,
                      triggerClose: popup.approvalSubShopCcbPayAdd.fn.closeHandler,
                      triggerHidden: popup.approvalSubShopCcbPayAdd.fn.hiddenHandler
                    })
                  ">
                  {{
                    infoGet("info.shopPay.ccbStatus") === 1 ? "修改" : "开通"
                  }}</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="c-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>备注:</span>
              </div>
              <div class="i-value">
                <el-input type="textarea" :rows="5" disabled :value="infoGet('info.remark')"></el-input>
                <el-button type="primary" size="mini" style="marginleft: 10px" :disabled="!checkAccessNode('SHOP.update')" @click.native="
                    $refs.popupConfirmShopUpdate.open({
                      triggerOpen: popup.shopUpdate.fn.openHandler,
                      triggerClose: popup.shopUpdate.fn.closeHandler,
                      params: { title: '修改备注', type: 11 },
                    })
                  ">
                  修改</el-button>
              </div>
            </div>
          </grid-item>
        </grid>
      </div>
    </div>
    <div class="i-block i-block_contract">
      <div class="b-title">
        <span>合同管理</span>
      </div>
      <div class="b-content">
        <div class="b-content_tabs">
          <div class="t-tab" :class="{ 't-tab--active': shopContract.attr.tab === 1 }" @click="shopContract.fn.onChangeTab(1)">
            线上合同
          </div>
          <div class="t-tab" :class="{ 't-tab--active': shopContract.attr.tab === 2 }" @click="shopContract.fn.onChangeTab(2)">
            线下合同
          </div>
        </div>
        <div class="b-content_options">
          <div class="o-left">
            <el-input size="mini" style="width: 160px" placeholder="请输入合同编号" v-model="shopContract.attr.form.query.keyword" clearable></el-input>
            <el-date-picker v-if="shopContract.attr.tab === 2" size="mini" style="marginleft: 20px" placeholder="签约时间" value-format="yyyy-MM-dd" v-model="shopContract.attr.form.query.signTime"></el-date-picker>
            <el-button size="mini" style="marginleft: 20px" type="primary" @click="shopContract.fn.query">
              搜索
            </el-button>
          </div>
          <el-button size="mini" v-show="shopContract.attr.tab === 1" type="primary" v-submit="{
              action: () => {
                $refs.popupConfirmonlineContract.open({
                  triggerOpen: popup.onlineContract.fn.openHandler,
                  triggerClose: popup.onlineContract.fn.closeHandler,
                  params: { title: '生成新合同', type: 1 },
                });
              },
            }">生成新合同</el-button>
          <el-button size="mini" v-show="shopContract.attr.tab === 2" type="primary" v-submit="{
              action: () => {
                $refs.popupConfirmOfflineContractAdd.open({
                  triggerOpen: popup.offlineContractAdd.fn.openHandler,
                  triggerClose: popup.offlineContractAdd.fn.closeHandler,
                  triggerHidden: popup.offlineContractAdd.fn.hiddenHandler
                });
              },
            }">添加合同</el-button>
        </div>
        <el-table v-show="shopContract.attr.tab === 1" border :data="
            shopContract.attr.axqContractList.length
              ? shopContract.attr.axqContractList
              : axqContractList
          " style="width: 100%">
          <el-table-column align="center" prop="id" label="ID"> </el-table-column>
          <el-table-column align="center" label="合同类型">
            <span>合作项目系列合同书</span>
          </el-table-column>
          <el-table-column align="center" label="合同编号">
            <template slot-scope="scope">
              <span>{{ scope.row.sn }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同状态">
            <template slot-scope="scope">
              <span>{{ entitys.AxqContract.filter("status", scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="签署信息">
            <template slot-scope="scope">
              <span>{{
                entitys.AxqContract.filter("esignStatus", scope.row.esignStatus)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同有效期">
            <template slot-scope="scope">
              <span>{{
                  scope.row.startTime
                    ? $dayjs(scope.row.startTime).format("YYYY-MM-DD")
                    : ""
                }}-{{
                  scope.row.endTime ? $dayjs(scope.row.endTime).format("YYYY-MM-DD") : ""
                }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope" v-if="scope.row.status === 2">
              <el-button size="mini" type="primary" @click="
                    $refs.popupConfirmonlineContract.open({
                      triggerOpen: popup.onlineContract.fn.openHandler,
                      triggerClose: popup.onlineContract.fn.closeHandler,
                      params: { row: scope.row, title: '编辑合同', type: 2 },
                    })
                  ">
                编辑
              </el-button>
              <el-button size="mini" type="primary" @click="
                    () => {
                      $confirm('是否发起签署?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                      })
                        .then(() => {
                          popup.onlineContract.fn.contractDoWorkflowHandler(scope.row);
                        })
                        .catch(() => {});
                    }
                  ">发起签署
              </el-button>
              <el-button size="mini" type="danger" @click="
                    () => {
                      $confirm('是否删除合同?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                      })
                        .then(() => {
                          popup.onlineContract.fn.contractDelete(scope.row);
                        })
                        .catch(() => {});
                    }
                  ">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="shopContract.attr.tab === 2" :data="
            shopContract.attr.axqOfflineContractList.length
              ? shopContract.attr.axqOfflineContractList
              : axqOfflineContractList
          " border style="width: 100%">
          <el-table-column align="center" prop="id" label="ID"> </el-table-column>
          <el-table-column align="center" label="合同类型">
            <span>合作项目系列合同书</span>
          </el-table-column>
          <el-table-column align="center" label="系统编号">
            <template slot-scope="scope">
              <span>{{ scope.row.sn }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同编号">
            <template slot-scope="scope">
              <span>{{ scope.row.offlineSn }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同状态">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime | validtimeFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="签约时间">
            <template slot-scope="scope">
              <span>{{
                scope.row.signTime ? $dayjs(scope.row.signTime).format("YYYY-MM-DD") : ""
              }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合同有效期">
            <template slot-scope="scope">
              <span>{{
                  scope.row.startTime
                    ? $dayjs(scope.row.startTime).format("YYYY-MM-DD")
                    : ""
                }}-{{
                  scope.row.endTime ? $dayjs(scope.row.endTime).format("YYYY-MM-DD") : ""
                }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="i-block i-block_sale">
      <div class="b-title">
        <span>营业额</span>
      </div>
      <div class="b-content">
        <div class="s-switch">
          <div class="s-item">
            <span>日</span>
          </div>
          <div class="s-item">
            <span>月</span>
          </div>
        </div>
        <div class="s-chart">
          <antv-interval :data="chartStatisticsVisit" :config="{ chart: { padding: 0 } }"></antv-interval>
        </div>
      </div>
    </div>
    <div class="i-others">
      <div class="o-item">
        <div class="i-title">
          <span>店铺会员分析</span>
        </div>
        <div class="i-content">
          <antv-pie :data="memberTypeCount" :config="{
              radius: 0.8,
            }"></antv-pie>
        </div>
      </div>
      <div class="o-item">
        <div class="i-title">
          <span>店铺预存信息</span>
        </div>
        <div class="i-content">
          <antv-line :data="chartSaleVisit" :config="{
              axis: {
                label: function label(text, index, total) {
                  const textCfg = {};
                  if (index === 0) {
                    textCfg.textAlign = 'left';
                  } else if (index === total - 1) {
                    textCfg.textAlign = 'right';
                  }
                  return textCfg;
                },
              },
            }"></antv-line>
        </div>
      </div>
      <div class="o-item">
        <div class="i-title">
          <span>市场股东保证金</span>
        </div>
        <div class="i-content">
          <antv-pie :data="stockholderDeposit" :config="{
              radius: 0.8,
              innerRadius: 0.6,
            }"></antv-pie>
        </div>
      </div>
    </div>
    <popup-confirm ref="popupConfirmShopUpdate" :title="popup.shopUpdate.attr.title">
      <div class="popup-confirm_shop-update">
        <div class="u-tab">
          <div class="t-item" :class="{ 't-item-active': popup.shopUpdate.attr.tab === 1 }" @click="popup.shopUpdate.attr.tab = 1">
            <span>更新</span>
          </div>
          <div class="t-item" :class="{ 't-item-active': popup.shopUpdate.attr.tab === 2 }" @click="popup.shopUpdate.attr.tab = 2">
            <span>修改记录</span>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.shopUpdate.attr.tab === 1 && popup.shopUpdate.attr.type === 1">
          <div class="f-item">
            <div class="i-label">
              <span>店铺名称：</span>
            </div>
            <div class="i-value">
              <el-input v-model="popup.shopUpdate.attr.type2form[1].data.value"></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[1].data.remark"></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.shopUpdate.attr.tab === 1 && popup.shopUpdate.attr.type === 2">
          <div class="f-item">
            <div class="i-label">
              <span>区域：</span>
            </div>
            <div class="i-value">
              <options-selector :mode="3" :config="{ key: 'sysRegion',value:`${infoGet('info.provinceName') || ''}/${infoGet('info.cityName') || ''}/${infoGet('info.districtName')|| ''}` }" @change="popup.shopUpdate.fn.regionChangeHandler"></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>详细地址：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[2].data.fullAddress">
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[2].data.remark"></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.shopUpdate.attr.tab === 1 && popup.shopUpdate.attr.type === 5">
          <div class="f-item">
            <div class="i-label">
              <span>店铺面积：</span>
            </div>
            <div class="i-value">
              <el-input type="number" v-model="popup.shopUpdate.attr.type2form[5].data.value"></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[5].data.remark"></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.shopUpdate.attr.tab === 1 && popup.shopUpdate.attr.type === 9">
          <div class="f-item">
            <div class="i-label">
              <span>代理区域：</span>
            </div>
            <div class="i-value">
              <options-selector :mode="4" :config="{ req: popup.shopUpdate.fn.regionAllocateQuery }" @change="popup.shopUpdate.attr.type2form[9].data.value = $event"></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[9].data.remark"></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.shopUpdate.attr.tab === 1 && popup.shopUpdate.attr.type === 11">
          <div class="f-item">
            <div class="i-label">
              <span>修改备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[11].data.value"></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input type="textarea" :rows="5" v-model="popup.shopUpdate.attr.type2form[11].data.remark"></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_history" v-if="popup.shopUpdate.attr.tab === 2">
          <div class="h-list">
            <el-table :data="popup.shopUpdate.attr.history.list" stripe style="width: 100%">
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改前">
                <template slot-scope="props">
                  <p>
                    {{
                      popup.shopUpdate.fn.getValue4JSON(
                        props.row,
                        popup.shopUpdate.attr.type
                      ).old
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改后">
                <template slot-scope="props">
                  <p>
                    {{
                      popup.shopUpdate.fn.getValue4JSON(
                        props.row,
                        popup.shopUpdate.attr.type
                      ).new
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="操作人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.shopUpdate.attr.tab === 2">
        共
        <em>{{ popup.shopUpdate.attr.history.total }}记录</em>
      </p>
      <el-pagination background layout="prev, pager, next" :total="popup.shopUpdate.attr.history.total" @current-change="popup.shopUpdate.fn.historyPageChangeHandler" slot="footer-right" v-if="popup.shopUpdate.attr.tab === 2"></el-pagination>
    </popup-confirm>
    <popup-confirm ref="popupConfirmShopChange" title="店铺转让" :config="{ width: 800, height: 500 }">
      <div class="popup-confirm_shop-change">
        <div class="a-tab">
          <div class="t-item" :class="{ 't-item-active': popup.approvalSubShopChange.attr.tab === 1 }" @click="popup.approvalSubShopChange.attr.tab = 1">
            <span>转让</span>
          </div>
          <div class="t-item" :class="{ 't-item-active': popup.approvalSubShopChange.attr.tab === 2 }" @click="popup.approvalSubShopChange.attr.tab = 2">
            <span>转让记录</span>
          </div>
        </div>
        <div class="a-box a-box_field" v-if="popup.approvalSubShopChange.attr.tab === 1">
          <form-validate-field label="接收店主姓名/电话：" :field="
              popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveId
            ">
            <options-selector :mode="4" placeholder="请输入姓名/手机号" :config="{ req: popup.approvalSubShopChange.fn.distributorQuery }" @change="popup.approvalSubShopChange.fn.distributorChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="原店铺会员是否挪动：" :field="
              popup.approvalSubShopChange.attr.form.approvalSubShopChange.value
                .isTransferShopMember
            ">
            <el-radio-group v-model="
                popup.approvalSubShopChange.attr.form.approvalSubShopChange.value
                  .isTransferShopMember.value
              ">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field v-if="
              popup.approvalSubShopChange.attr.form.approvalSubShopChange.value
                .isTransferShopMember.value === 0
            " :field="
              popup.approvalSubShopChange.attr.shopList.length > 1
                ? popup.approvalSubShopChange.attr.form.approvalSubShopChange.value
                    .receiveShopId
                : ''
            " label="会员归属店铺：">
            <options-selector :mode="4" :config="{ req: popup.approvalSubShopChange.fn.transferShopMemberQuery }" @change="popup.approvalSubShopChange.fn.transferShopMemberChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="备注：">
            <el-input type="textarea" v-model="
                popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.remark
                  .value
              ">
            </el-input>
          </form-validate-field>
        </div>
        <div class="a-box t-box_history" v-if="popup.approvalSubShopChange.attr.tab === 2">
          <div class="h-list">
            <el-table :data="popup.approvalSubShopChange.attr.history.list" stripe style="width: 100%">
              <el-table-column prop="id" label="序号"> </el-table-column>
              <el-table-column label="转让店主姓名/电话">
                <template slot-scope="props">
                  <p>
                    {{ blankGet(props.row.transferNickname) }}/{{
                      blankGet(props.row.transferUsername)
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="接收店主姓名/电话">
                <template slot-scope="props">
                  <p>
                    {{ blankGet(props.row.receiveNickname) }}/{{
                      blankGet(props.row.receiveUsername)
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="props">
                  <p>{{ entitys.Approval.filter("status", props.row.status) }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="操作人">
                <template slot-scope="props">
                  <p>{{ blankGet(props.row.nickname) }}</p>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="props">
                  <p>{{ blankGet(props.row.remark) }}</p>
                </template>
              </el-table-column>
              <el-table-column label="申请时间">
                <template slot-scope="props">
                  <p>{{ blankGet(props.row.createTime) }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.approvalSubShopChange.attr.tab === 2">
        共<em>{{ popup.approvalSubShopChange.attr.history.total }}记录</em>
      </p>
      <el-pagination background layout="prev, pager, next, jumper" :total="popup.approvalSubShopChange.attr.history.total" @current-change="popup.approvalSubShopChange.fn.historyPageChangeHandler" slot="footer-right" v-if="popup.approvalSubShopChange.attr.tab === 2"></el-pagination>
    </popup-confirm>
    <popup-confirm ref="popupConfirmshopDeposit" :title="popup.shopDeposit.attr.title">
      <div class="popup-confirm_approval-sub-shop-deposit-add">
        <form-validate ref="regionShopApplyUpdate" :form="popup.shopDeposit.attr.form" :validator="entitys.Shop.formUtil().validate">
          <template v-if="popup.shopDeposit.attr.type === 1">
            <form-validate-field label="保证金：">
              <span>5000元</span>
            </form-validate-field>
            <form-validate-field label="付款人：" :field="popup.shopDeposit.attr.form.paymentPayer">
              <el-input size="small" style="width: 150px" placeholder="请输入" v-model="popup.shopDeposit.attr.form.paymentPayer.value">
              </el-input>
            </form-validate-field>
            <form-validate-field label="付款方式：" :field="popup.shopDeposit.attr.form.paymentType">
              <el-select size="small" style="width: 150px" v-model="popup.shopDeposit.attr.form.paymentType.value" placeholder="请选择">
                <el-option v-for="item in popup.shopDeposit.attr.paymentTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </form-validate-field>
            <form-validate-field label="缴纳时间：" :field="popup.shopDeposit.attr.form.paymentTime">
              <el-date-picker size="small" style="width: 150px" value-format="yyyy-MM-dd" v-model="popup.shopDeposit.attr.form.paymentTime.value">
              </el-date-picker>
            </form-validate-field>
            <form-validate-field label="上传凭证：" :field="popup.shopDeposit.attr.form.fileJson">
              <file-uploader :max="2" @change="
                  (e) => {
                    popup.shopDeposit.attr.form.fileJson.value = e;
                  }
                ">
              </file-uploader>
            </form-validate-field>
          </template>
          <template v-else>
            <form-validate-field label="保证金：">
              <span>5000元</span>
            </form-validate-field>
            <form-validate-field label="付款人：">
              <span>{{ infoGet("info.shopDeposit.paymentPayer") }}</span>
            </form-validate-field>
            <form-validate-field label="付款方式：">
              <span>{{
                infoGet("info.shopDeposit.paymentType") | paymentTypeFilter
              }}</span>
            </form-validate-field>
            <form-validate-field label="缴纳时间：">
              <span>{{
                infoGet("info.shopDeposit.paymentTime", "")
                  ? $dayjs(infoGet("info.shopDeposit.paymentTime")).format("YYYY-MM-DD")
                  : ""
              }}</span>
            </form-validate-field>
            <form-validate-field label="缴纳凭证：">
              <file-previewer :value="infoGet('info.shopDeposit.fileJson')">
              </file-previewer>
            </form-validate-field>
          </template>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmApprovalSubShopCcbPayAdd" title="更新系统收款信息">
      <div class="popup-confirm_approval-sub-shop-ccb-pay-add">
        <div class="a-tab">
          <div class="t-item" :class="{ 't-item-active': popup.approvalSubShopCcbPayAdd.attr.tab === 1 }" @click="popup.approvalSubShopCcbPayAdd.attr.tab = 1">
            <span>更新</span>
          </div>
          <div class="t-item" :class="{ 't-item-active': popup.approvalSubShopCcbPayAdd.attr.tab === 2 }" @click="popup.approvalSubShopCcbPayAdd.attr.tab = 2">
            <span>修改记录</span>
          </div>
        </div>
        <div class="a-box a-box_field" v-if="popup.approvalSubShopCcbPayAdd.attr.tab === 1">
          <form-validate :form="popup.approvalSubShopCcbPayAdd.attr.form">
            <grid :col="2" class="c-grid">
              <grid-item class="c-grid-item">
                <form-validate-field label="户名：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .merchanseName
                  ">
                  <el-input size="small" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .merchanseName.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
              <grid-item class="c-grid-item">
                <form-validate-field label="手机号码：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .merchanseMobile
                  ">
                  <el-input size="small" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .merchanseMobile.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
              <grid-item class="c-grid-item">
                <form-validate-field label="商户号：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .merchanseId
                  ">
                  <el-input size="small" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .merchanseId.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
              <grid-item class="c-grid-item">
                <form-validate-field label="柜台号：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .postId
                  ">
                  <el-input size="small" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .postId.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
              <grid-item class="c-grid-item">
                <form-validate-field label="分行号：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .branchId
                  ">
                  <el-input size="small" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .branchId.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
              <grid-item class="c-grid-item">
                <form-validate-field label="公钥：" :field="
                    popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                      .pubKey
                  ">
                  <el-input type="textarea" size="small" style="height: 30px" :rows="5" v-model="
                      popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value
                        .pubKey.value
                    ">
                  </el-input>
                </form-validate-field>
              </grid-item>
            </grid>
          </form-validate>
        </div>
        <div class="u-box u-box_history" v-if="popup.approvalSubShopCcbPayAdd.attr.tab === 2">
          <div class="h-list">
            <el-table :data="popup.approvalSubShopCcbPayAdd.attr.history.list" stripe style="width: 100%">
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改前">
                <template>
                  <p>/</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改后">
                <template>
                  <p>/</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="操作人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.approvalSubShopCcbPayAdd.attr.tab === 2">
        共
        <em>{{ popup.approvalSubShopCcbPayAdd.attr.history.total }}记录</em>
      </p>
      <el-pagination background layout="prev, pager, next" :total="popup.approvalSubShopCcbPayAdd.attr.history.total" @current-change="popup.approvalSubShopCcbPayAdd.fn.historyPageChangeHandler" slot="footer-right" v-if="popup.approvalSubShopCcbPayAdd.attr.tab === 2"></el-pagination>
    </popup-confirm>
    <popup-confirm ref="popupConfirmonlineContract" :title="popup.onlineContract.attr.title">
      <div class="popup-confirm_online-contract-update">
        <form-validate :form="popup.onlineContract.attr.form">
          <form-validate-field label="代理姓名：">
            <span>{{ infoGet("info.holder.nickname") }}</span>
          </form-validate-field>
          <form-validate-field label="身份证姓名：">
            <span>{{ infoGet("info.holder.realName") }}</span>
          </form-validate-field>
          <form-validate-field label="身份证号码：">
            <span>{{ infoGet("info.holder.idCardNumber") }}</span>
          </form-validate-field>
          <form-validate-field label="经营地址：">
            <el-input clearable disabled :value="popup.onlineContract.attr.provinces">
            </el-input>
          </form-validate-field>
          <form-validate-field label="详细地址：">
            <el-input clearable disabled :value="popup.onlineContract.attr.form.esignConfig[3].value">
            </el-input>
          </form-validate-field>
          <form-validate-field label="店铺面积：">
            <el-input clearable disabled :value="infoGet('info.shopProfile.addressArea')">
              <template slot="append">㎡</template>
            </el-input>
          </form-validate-field>
          <form-validate-field label="合同有效期：">
            <el-date-picker type="daterange" value-format="yyyy-MM-dd hh:mm:ss" v-model="popup.onlineContract.attr.validTime" @change="popup.onlineContract.fn.dateChangeHandler">
            </el-date-picker>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmOfflineContractAdd" title="添加合同">
      <div class="popup-confirm_offline-contract-add">
        <form-validate ref="regionShopApplyUpdate" :form="popup.offlineContractAdd.attr.form" :validator="entitys.Shop.formUtil().validate">
          <form-validate-field label="合同编号：">
            <el-input style="width: 300px" placeholder="请输入" v-model="popup.offlineContractAdd.attr.form.offlineSn">
            </el-input>
          </form-validate-field>
          <form-validate-field label="签署时间：">
            <el-date-picker style="width: 300px" placeholder="请选择时间" value-format="yyyy-MM-dd hh:mm:ss" v-model="popup.offlineContractAdd.attr.form.signTime">
            </el-date-picker>
          </form-validate-field>
          <form-validate-field label="合同有效期：">
            <el-date-picker style="width: 300px" type="daterange" value-format="yyyy-MM-dd hh:mm:ss" start-placeholder="签署日期" end-placeholder="合同终止期" v-model="popup.offlineContractAdd.attr.validTime" @change="popup.offlineContractAdd.fn.dateChangeHandler">
            </el-date-picker>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import infoMixin from "@/mixins/type/info";
import popupConfirm from "@/components/popup/type/confirm";
import optionsSelector from "@/components/options-selector";
import fileUploader from "@/components/file-uploader";
import filePreviewer from "@/components/file-previewer";
import imgVideoPreviewer from "@/components/img-video-previewer";
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import switchSelector from "@/components/switch-selector";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import timePicker from "@/components/time-picker";
import { formToolkit } from "@/model/form-toolkit";
import { antvPie, antvLine, antvInterval } from "@/libs/antv";

import { model } from "@/model";
import ImgVideoPreviewer from "@/components/img-video-previewer/index.vue";

const {
  Oss,
  Shop,
  ShopDeposit,
  Member,
  AxqContract,
  Approval,
  ApprovalSubShopChange,
  ApprovalSubShopCcbPay,
  RegionAllocate,
} = model.collection;

export default {
  components: {
    antvLine,
    antvInterval,
    optionsSelector,
    fileUploader,
    filePreviewer,
    imgVideoPreviewer,
    popupConfirm,
    formValidate,
    formValidateField,
    switchSelector,
    grid,
    gridItem,
    timePicker,
    antvPie,
    ImgVideoPreviewer,
  },
  mixins: [infoMixin],
  data () {
    return {
      info: {
        config: {
          entity: "Shop",
          action: "info",
          noConvert2Entity: true,
        },
        result: {},
      },
      entitys: {
        Shop,
        Approval,
        AxqContract,
      },
      popup: {
        shopUpdate: {
          attr: {
            title: "",
            type: 1,
            tab: 1,
            type2form: {
              1: {
                params: {
                  id: this.$route.params.id,
                  type: 1,
                },
                data: {
                  value: "",
                  remark: "",
                },
              },
              2: {
                params: {
                  id: this.$route.params.id,
                  type: 2,
                },
                data: {
                  provinceId: 0,
                  provinceName: "",
                  cityId: 0,
                  cityName: "",
                  districtId: 0,
                  districtName: "",
                  fullAddress: "",
                  remark: "",
                },
              },
              5: {
                params: {
                  id: this.$route.params.id,
                  type: 5,
                },
                data: {
                  value: "",
                  remark: "",
                },
              },
              9: {
                params: {
                  id: this.$route.params.id,
                  type: 9,
                },
                data: {
                  value: "",
                  remark: "",
                },
              },
              11: {
                params: {
                  id: this.$route.params.id,
                  type: 11,
                },
                data: {
                  value: "",
                  remark: "",
                },
              },
            },
            history: {
              total: 0,
              list: [],
              params: {
                pageIndex: 1,
                pageSize: 10,
              },
            },
          },
          fn: {
            fill: () => {
              for (let i in this.popup.shopUpdate.attr.type2form) {
                i = Number(i);
                if (i === 1) {
                  this.popup.shopUpdate.attr.type2form[i].data.value = this.infoGet(
                    "info.name"
                  );
                }
                if (i === 2) {
                  this.popup.shopUpdate.attr.type2form[i].data.provinceId = this.infoGet("info.provinceId");
                  this.popup.shopUpdate.attr.type2form[i].data.provinceName = this.infoGet("info.provinceName");
                  this.popup.shopUpdate.attr.type2form[i].data.cityId = this.infoGet("info.cityId");
                  this.popup.shopUpdate.attr.type2form[i].data.cityName = this.infoGet("info.cityName");
                  this.popup.shopUpdate.attr.type2form[i].data.districtId = this.infoGet("info.districtId");
                  this.popup.shopUpdate.attr.type2form[i].data.districtName = this.infoGet("info.districtName");
                  this.popup.shopUpdate.attr.type2form[i].data.fullAddress = this.infoGet("info.fullAddress");
                }
                if (i === 9) {
                  this.popup.shopUpdate.attr.type2form[i].data.value = this.infoGet(
                    "info.regionAllocateId"
                  );
                }
                if (i === 11) {
                  this.popup.shopUpdate.attr.type2form[i].data.value = this.infoGet(
                    "info.remark"
                  );
                }
              }
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.shopUpdate.attr.history.params.pageIndex = pageIndex;
              this.popup.shopUpdate.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Shop.sendApi("updateLogPage", {
                params: this.popup.shopUpdate.attr.history.params,
                data: {
                  query: {
                    shopId: this.$route.params.id,
                    type: this.popup.shopUpdate.attr.type,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.shopUpdate.attr.history.list = data;
                  this.popup.shopUpdate.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "店铺信息更新失败",
                    type: "error",
                  });
                }
              });
            },
            getValue4JSON: (row, type) => {
              const newObj = JSON.parse(row.jsonNew);
              const oldObj = JSON.parse(row.jsonOld);
              if (type === 1) {
                return {
                  new: newObj.name,
                  old: oldObj.name,
                };
              }
              if (type === 2) {
                return {
                  new: newObj.fullAddress,
                  old: oldObj.fullAddress,
                };
              }
              if (type === 9) {
                return {
                  new: this.$_.get(newObj, "regionAllocate.name"),
                  old: this.$_.get(oldObj, "regionAllocate.name"),
                };
              }
              if (type === 11) {
                return {
                  new: this.$_.get(newObj, "remark"),
                  old: this.$_.get(oldObj, "remark"),
                };
              }
            },
            regionAllocateQuery: (e, ok) => {
              RegionAllocate.sendApi(
                "allocatePage",
                {
                  params: {},
                  data: {
                    query: {
                      keyword: e,
                      isEnableRegionApply: 1,
                    },
                  },
                },
                {
                  errorTip: "获取区域信息失败",
                }
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  ok(
                    data.map((i) => ({
                      value: i.id,
                      label: i.name,
                    }))
                  );
                }
              });
            },
            regionChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i.id);
              const [provinceName, cityName, districtName] = e.map((i) => i._raw.name);
              this.popup.shopUpdate.attr.type2form[2].data.provinceId = provinceId;
              this.popup.shopUpdate.attr.type2form[2].data.provinceName = provinceName;
              this.popup.shopUpdate.attr.type2form[2].data.cityId = cityId;
              this.popup.shopUpdate.attr.type2form[2].data.cityName = cityName;
              this.popup.shopUpdate.attr.type2form[2].data.districtId = districtId;
              this.popup.shopUpdate.attr.type2form[2].data.districtName = districtName;
            },
            distributorQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    type: 7,
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.mobile}`,
                  }))
                );
              });
            },
            openHandler: (ok, params) => {
              const { title, type } = params;
              this.popup.shopUpdate.attr.title = title;
              this.popup.shopUpdate.attr.type = type;
              this.popup.shopUpdate.fn.fill();
              this.popup.shopUpdate.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              Shop.sendApi(
                "updateSingleField",
                this.popup.shopUpdate.attr.type2form[this.popup.shopUpdate.attr.type]
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: "店铺信息更新成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  error();
                  this.$message({
                    message: "店铺信息更新失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        shopDeposit: {
          attr: {
            type: 1,
            title: "",
            paymentTypeList: [
              {
                label: "转账",
                value: 1,
              },
              {
                label: "现金",
                value: 2,
              },
              {
                label: "刷卡",
                value: 3,
              },
            ],
            form: ShopDeposit.formUtil().generator("add", "default"),
          },
          fn: {
            openHandler: (ok, params) => {
              this.popup.shopDeposit.attr.type = params.type;
              this.popup.shopDeposit.attr.title = params.title;
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              if (this.popup.shopDeposit.attr.type === 1) {
                const { ok, form } = formToolkit.validate(
                  this.popup.shopDeposit.attr.form
                );
                if (ok) {
                  Shop.sendApi("depositAdd", {
                    params: {
                      shopId: Number(this.$route.params.id),
                    },
                    data: form,
                  }).then((res) => {
                    const { status } = res;
                    if (status) {
                      okCallback();
                      this.$message({
                        message: "保证金缴纳申请提交成功",
                        type: "success",
                      });
                      this._boot();
                    } else {
                      errorCallback();
                      this.$message({
                        message: "保证金缴纳申请提交失败",
                        type: "error",
                      });
                    }
                  });
                } else {
                  errorCallback();
                  this.$message({
                    message: "请确认信息",
                    type: "warning",
                  });
                }
              } else {
                okCallback();
              }
            },
          },
        },
        approvalSubShopChange: {
          attr: {
            tab: 1,
            shopList: [],
            form: (() => {
              const f1 = Approval.formUtil().generator("add", "approvalSubShopChange");
              const f2 = ApprovalSubShopChange.formUtil().generator("add", "default");
              f1.approvalSubShopChange.value = f2;
              return f1;
            })(),
            history: {
              total: 0,
              list: [],
              params: {
                pageIndex: 1,
                pageSize: 10,
              },
            },
          },
          fn: {
            historyPageChangeHandler: (pageIndex) => {
              this.popup.approvalSubShopChange.attr.history.params.pageIndex = pageIndex;
              this.popup.approvalSubShopChange.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.approvalSubShopChange.attr.history.params,
                data: {
                  order: {
                    createTime: "desc",
                  },
                  query: {
                    shopId: this.$route.params.id,
                    typeId: 17,
                    type: 1,
                    transferId: this.infoGet("info.holderId"),
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.approvalSubShopChange.attr.history.list = data;
                  this.popup.approvalSubShopChange.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "该店铺转让信息获取失败",
                    type: "error",
                  });
                }
              });
            },
            distributorQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    type: 7,
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.mobile}`,
                  }))
                );
              });
            },
            distributorChangeHandler: (e) => {
              this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveId.value = e;
            },
            transferShopMemberQuery: (e, ok) => {
              Shop.sendApi("page", {
                params: {},
                data: {
                  query: {
                    memberId: this.infoGet("info.holder.id"),
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data
                    .map((i) => ({
                      value: i.id,
                      label: i.name,
                    }))
                    .filter((v) => v.value !== this.infoGet("info.id"))
                );
              });
            },
            transferShopMemberChangeHandler: (e) => {
              this.popup.approvalSubShopChange.attr.form.approvalSubShopChange.value.receiveShopId.value = e;
            },
            openHandler: (ok) => {
              let approvalSubShopChangeForm = this.popup.approvalSubShopChange.attr.form
                .approvalSubShopChange.value;
              approvalSubShopChangeForm.type.value = 1;
              approvalSubShopChangeForm.shopId.value = Number(this.$route.params.id);
              approvalSubShopChangeForm.transferId.value = this.infoGet("info.holder.id");
              approvalSubShopChangeForm.shopDepositId.value = this.infoGet("info.depositId");
              this.popup.approvalSubShopChange.fn.getUpdateHistory();
              Shop.sendApi("page", {
                params: {},
                data: {
                  query: {
                    memberId: this.infoGet("info.holder.id"),
                    keyword: "",
                  },
                },
              }).then((res) => {
                const { data } = res;
                this.popup.approvalSubShopChange.attr.shopList = data;
              });
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              let approvalSubShopChangeForm = this.popup.approvalSubShopChange.attr.form
                .approvalSubShopChange.value;
              if (approvalSubShopChangeForm.isTransferShopMember.value === 1) {
                approvalSubShopChangeForm.receiveShopId.value = this.infoGet("info.id");
              }
              const { form } = formToolkit.validate(
                this.popup.approvalSubShopChange.attr.form
              );
              if (!form.approvalSubShopChange.receiveId) {
                errorCallback();
                this.$message.warning("请填写接收店主姓名/电话");
                return;
              }
              if (
                this.popup.approvalSubShopChange.attr.shopList.length > 1 &&
                form.approvalSubShopChange.isTransferShopMember === 0 &&
                !form.approvalSubShopChange.receiveShopId
              ) {
                errorCallback();
                this.$message.warning("请选择会员归属店铺");
                return;
              }
              Approval.sendApi(
                "add",
                {
                  params: {},
                  data: form,
                },
                {
                  showLoading: true,
                }
              ).then((res) => {
                const { status, message } = res;
                if (status) {
                  okCallback();
                  this.$message({
                    message: "店铺转让提交审核成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  errorCallback();
                  this.$message({
                    message: message ? message : "店铺转让提交审核失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        approvalSubShopCcbPayAdd: {
          attr: {
            tab: 1,
            form: (() => {
              const f1 = Approval.formUtil().generator("add", "approvalSubShopCcbPay");
              const f2 = ApprovalSubShopCcbPay.formUtil().generator("add", "default");
              f1.approvalSubShopCcbPay.value = f2;
              return f1;
            })(),
            history: {
              total: 0,
              list: [],
              params: {
                pageIndex: 1,
                pageSize: 10,
              },
            },
          },
          fn: {
            historyPageChangeHandler: (pageIndex) => {
              this.popup.approvalSubShopCcbPayAdd.attr.history.params.pageIndex = pageIndex;
              this.popup.approvalSubShopCcbPayAdd.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.approvalSubShopCcbPayAdd.attr.history.params,
                data: {
                  query: {
                    shopId: this.$route.params.id,
                    typeId: 14,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.approvalSubShopCcbPayAdd.attr.history.list = data;
                  this.popup.approvalSubShopCcbPayAdd.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "获取店铺系统收款配置记录失败",
                    type: "error",
                  });
                }
              });
            },
            openHandler: (ok) => {
              this.popup.approvalSubShopCcbPayAdd.fn.getUpdateHistory();
              this.popup.approvalSubShopCcbPayAdd.attr.form.approvalSubShopCcbPay.value.shopId.value = Number(
                this.$route.params.id
              );
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(
                this.popup.approvalSubShopCcbPayAdd.attr.form
              );
              if (ok) {
                Approval.sendApi("add", {
                  params: {},
                  data: form,
                }).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    okCallback();
                    this.$message({
                      message: "店铺系统收款配置已提交审核",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: "店铺系统收款配置提交审核失败",
                      type: "error",
                    });
                  }
                });
              } else {
                errorCallback();
                this.$message.warning("请校验输入信息");
              }
            },
            hiddenHandler:()=>{
              this.popup.approvalSubShopCcbPayAdd.attr.form = (() => {
                const f1 = Approval.formUtil().generator("add", "approvalSubShopCcbPay");
                const f2 = ApprovalSubShopCcbPay.formUtil().generator("add", "default");
                f1.approvalSubShopCcbPay.value = f2;
                return f1;
              })();
            }
          },
        },
        onlineContract: {
          attr: {
            row: {},
            title: "",
            type: 1,
            validTime: [this.$dayjs().toDate(), this.$dayjs().add(1, "y").toDate()],
            provinces: "",
            params: {
              type: 1,
              templateId: 1,
              memberId: 0,
              shopId: 0,
            },
            form: {
              esignConfig: [
                {
                  label: "province_name",
                  value: 0,
                },
                {
                  label: "city_name",
                  value: 0,
                },
                {
                  label: "district_name",
                  value: 0,
                },
                {
                  label: "full_address",
                  value: "",
                },
                {
                  label: "part_b_mobile",
                  key: "",
                  value: "",
                },
                {
                  label: "part_b_real_name",
                  value: "",
                },
                {
                  label: "part_b_id_number",
                  value: "",
                },
                {
                  label: "part_b_live_address",
                  value: "",
                },
                {
                  label: "contract_sn",
                  value: "",
                },
              ],
              sn: "",
              signTime: "",
              startTime: this.$dayjs().format("YYYY-MM-DD hh:mm:ss"),
              endTime: this.$dayjs().add(1, "y").format("YYYY-MM-DD hh:mm:ss"),
            },
          },
          fn: {
            regionChangeHandler: (e) => {
              const l = e.map((i) => i._raw);
              this.popup.onlineContract.attr.form.esignConfig[0].value = l[0].name;
              this.popup.onlineContract.attr.form.esignConfig[1].value = l[1].name;
              this.popup.onlineContract.attr.form.esignConfig[2].value = l[2].name;
            },
            dateChangeHandler: () => {
              this.popup.onlineContract.attr.form.startTime = this.popup.onlineContract.attr.validTime[0];
              this.popup.onlineContract.attr.form.endTime = this.popup.onlineContract.attr.validTime[1];
            },
            openHandler: (ok, params) => {
              if (!this.infoGet("info.holder.isCertificate")) {
                this.$message.warning("未实名认证，不可创建合同！");
                return;
              }
              this.popup.onlineContract.attr.title = params.title;
              this.popup.onlineContract.attr.type = params.type;
              this.popup.onlineContract.attr.params.shopId = Number(
                this.$route.params.id
              );
              this.popup.onlineContract.attr.params.memberId = this.infoGet(
                "info.holder.id"
              );
              this.popup.onlineContract.attr.provinces = [
                this.infoGet("info.provinceName", ""),
                this.infoGet("info.cityName", ""),
                this.infoGet("info.districtName", ""),
              ]
                .toString()
                .replace(/,/g, "/");
              this.popup.onlineContract.attr.form.esignConfig[0].value = this.infoGet(
                "info.provinceName",
                ""
              );
              this.popup.onlineContract.attr.form.esignConfig[1].value = this.infoGet(
                "info.cityName",
                ""
              );
              this.popup.onlineContract.attr.form.esignConfig[2].value = this.infoGet(
                "info.districtName",
                ""
              );
              this.popup.onlineContract.attr.form.esignConfig[3].value = this.infoGet("info.fullAddress", "");
              this.popup.onlineContract.attr.form.esignConfig[4].value = this.infoGet(
                "info.holder.mobile",
                ""
              );
              this.popup.onlineContract.attr.form.esignConfig[5].value = this.infoGet(
                "info.holder.realName"
              );
              this.popup.onlineContract.attr.form.esignConfig[6].value = this.infoGet(
                "info.holder.idCardNumber"
              );
              this.popup.onlineContract.attr.form.esignConfig[7].value = this.infoGet(
                "info.holder.liveAddress",
                ""
              );
              if (params.type === 2) {
                this.popup.onlineContract.attr.row = params.row;
                this.popup.onlineContract.attr.form.esignConfig[3].value = params.row.esignConfig.find(
                  (v) => v.label === "full_address"
                ).value;
              }
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              if(!this.popup.onlineContract.attr.form.esignConfig[0].value || !this.popup.onlineContract.attr.form.esignConfig[1].value || !this.popup.onlineContract.attr.form.esignConfig[2].value ) {
                this.$message({
                  message: "经营地址不能为空",
                  type: "warning",
                });
                errorCallback();
                return;
              }
              if(!this.popup.onlineContract.attr.form.esignConfig[3].value) {
                this.$message({
                  message: "详细地址不能为空",
                  type: "warning",
                });
                errorCallback();
                return;
              }
              if (this.popup.onlineContract.attr.type === 1) {
                AxqContract.sendApi(
                  "contractAdd",
                  {
                    params: this.popup.onlineContract.attr.params,
                    data: this.popup.onlineContract.attr.form,
                  },
                  {
                    showLoading: true,
                  }
                ).then((res) => {
                  const { status } = res;
                  if (status) {
                    okCallback();
                    this.$message({
                      message: "新合同生成成功",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: "新合同生成失败",
                      type: "error",
                    });
                  }
                });
              } else {
                AxqContract.sendApi(
                  "contractUpdate",
                  {
                    params: {
                      id: this.popup.onlineContract.attr.row.id,
                    },
                    data: this.popup.onlineContract.attr.form,
                  },
                  {
                    showLoading: true,
                  }
                ).then((res) => {
                  const { status } = res;
                  if (status) {
                    okCallback();
                    this.$message({
                      message: "合同更新成功",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: "合同更新失败",
                      type: "error",
                    });
                  }
                });
              }
            },
            contractDoWorkflowHandler: (e) => {
              AxqContract.sendApi(
                "contractDoWorkflow",
                {
                  params: {
                    id: e.id,
                  },
                  data: {
                    startTime: e.startTime,
                    endTime: e.endTime,
                  },
                },
                {
                  showLoading: true,
                }
              ).then((res) => {
                const { status } = res;
                if (status) {
                  this.$message({
                    message: "发起签署成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  this.$message({
                    message: "发起签署失败",
                    type: "error",
                  });
                }
              });
            },
            contractDelete: (e) => {
              AxqContract.sendApi(
                "contractDelete",
                {
                  params: {
                    id: e.id,
                  },
                  data: {},
                },
                {
                  showLoading: true,
                }
              ).then((res) => {
                const { status } = res;
                if (status) {
                  this.$message({
                    message: "合同删除成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  this.$message({
                    message: "合同删除失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        offlineContractAdd: {
          attr: {
            params: {
              type: 2,
              templateId: 1,
              memberId: 0,
              shopId: 0,
            },
            form: {
              esignConfig: [
                {
                  label: "part_b_real_name",
                  key: "58155cb8f7a5446cb844d70f18d0d0ee",
                  value: "",
                },
                {
                  label: "part_b_id_number",
                  key: "1788debfc9a848e4886ff291bcde4734",
                  value: "",
                },
              ],
              offlineSn: "",
              signTime: "",
              startTime: "",
              endTime: "",
            },
            validTime: [],
          },
          fn: {
            dateChangeHandler: () => {
              this.popup.offlineContractAdd.attr.form.startTime = this.popup.offlineContractAdd.attr.validTime[0];
              this.popup.offlineContractAdd.attr.form.endTime = this.popup.offlineContractAdd.attr.validTime[1];
            },
            openHandler: (ok) => {
              this.popup.offlineContractAdd.attr.params.shopId = Number(
                this.$route.params.id
              );
              this.popup.offlineContractAdd.attr.params.memberId = this.infoGet(
                "info.holder.id"
              );
              this.popup.offlineContractAdd.attr.form.esignConfig[0].value = this.infoGet(
                "info.holder.realName"
              );
              this.popup.offlineContractAdd.attr.form.esignConfig[1].value = this.infoGet(
                "info.holder.idCardNumber"
              );
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              if (!this.popup.offlineContractAdd.attr.form.signTime) {
                this.$message({
                  message: "请输入签署时间",
                  type: "warning",
                });
                errorCallback();
                return;
              }
              if (!this.popup.offlineContractAdd.attr.form.startTime) {
                this.$message({
                  message: "请输入合同有效时间",
                  type: "warning",
                });
                errorCallback();
                return;
              }
              AxqContract.sendApi(
                "contractAdd",
                {
                  params: this.popup.offlineContractAdd.attr.params,
                  data: this.popup.offlineContractAdd.attr.form,
                },
                {
                  showLoading: true,
                }
              ).then((res) => {
                const { status } = res;
                if (status) {
                  okCallback();
                  this.$message({
                    message: "添加合同成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  errorCallback();
                  this.$message({
                    message: "添加合同失败",
                    type: "error",
                  });
                }
              });
            },
            hiddenHandler:()=>{
              this.popup.offlineContractAdd.attr.form = {
                esignConfig: [
                  {
                    label: "part_b_real_name",
                    key: "58155cb8f7a5446cb844d70f18d0d0ee",
                    value: "",
                  },
                  {
                    label: "part_b_id_number",
                    key: "1788debfc9a848e4886ff291bcde4734",
                    value: "",
                  },
                ],
                offlineSn: "",
                signTime: "",
                startTime: "",
                endTime: "",
              };
            }
          },
        },
        contractPre: {
          attr: {},
          fn: {
            openHandler: (ok, props) => {
              this.popup.contractPre.attr = props;
              ok();
            },
          },
        },
      },
      switchSelector: {
        fn: {
          updateShopAccessModifyMember: (type, v, ok, error) => {
            Shop.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type,
              },
              data: {
                value: v,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "修改店铺权限成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "修改店铺权限失败",
                  type: "error",
                });
              }
            });
          },
          updateShopStatus: (e) => {
            const { value, ok, error } = e;
            Shop.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 4,
              },
              data: {
                value: value,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "切换店铺状态成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "切换店铺状态失败",
                  type: "error",
                });
              }
            });
          },
        },
      },
      shopContract: {
        attr: {
          tab: 1,
          form: {
            query: {
              keyword: "",
              signTime: "",
            },
          },
          axqContractList: [],
          axqOfflineContractList: [],
        },
        fn: {
          onChangeTab: (e) => {
            this.shopContract.attr.tab = e;
            this.shopContract.attr.form.query.keyword = "";
            this.shopContract.attr.form.query.signTime = "";
            this.shopContract.attr.axqContractList = [];
            this.shopContract.attr.axqOfflineContractList = [];
          },
          query: () => {
            if (this.shopContract.attr.tab === 1) {
              this.shopContract.attr.axqContractList = this.axqContractList.filter((i) =>
                i.sn
                  ? i.sn.indexOf(this.shopContract.attr.form.query.keyword) > -1
                  : false
              );
              if (!this.shopContract.attr.axqContractList.length) {
                this.$message.warning("查询不到相关信息，请重新搜索！");
              }
            } else {
              this.shopContract.attr.axqOfflineContractList = this.axqOfflineContractList.filter(
                (i) =>
                  (i.sn && !!this.shopContract.attr.form.query.keyword
                    ? i.sn.indexOf(this.shopContract.attr.form.query.keyword) > -1
                    : false) ||
                  this.$dayjs(i.signTime).format("YYYY-MM-DD") ===
                  this.shopContract.attr.form.query.signTime
              );
              if (!this.shopContract.attr.axqOfflineContractList.length) {
                this.$message.warning("查询不到相关信息，请重新搜索！");
              }
            }
          },
        },
      },
    };
  },
  computed: {
    axqContractList () {
      return this.infoGet("axqContractList", []);
    },
    axqOfflineContractList () {
      return this.infoGet("axqOfflineContractList", []);
    },
    chartStatisticsVisit () {
      return [
        {
          x: "2016-08-08 00:00:00",
          y: 10,
        },
        {
          x: "2016-08-08 00:10:00",
          y: 22,
        },
        {
          x: "2016-08-08 00:30:00",
          y: 16,
        },
        {
          x: "2016-08-09 00:35:00",
          y: 26,
        },
        {
          x: "2016-08-09 01:00:00",
          y: 12,
        },
        {
          x: "2016-08-09 01:20:00",
          y: 26,
        },
        {
          x: "2016-08-10 01:40:00",
          y: 18,
        },
        {
          x: "2016-08-10 02:00:00",
          y: 26,
        },
        {
          x: "2016-08-10 02:20:00",
          y: 12,
        },
        {
          x: "2017-08-08 00:30:00",
          y: 16,
        },
        {
          x: "2017-08-09 00:35:00",
          y: 26,
        },
        {
          x: "2017-08-09 01:00:00",
          y: 12,
        },
        {
          x: "2017-08-09 01:20:00",
          y: 26,
        },
        {
          x: "2017-08-10 01:40:00",
          y: 18,
        },
        {
          x: "2016-08-10 02:00:00",
          y: 26,
        },
        {
          x: "2017-08-10 02:20:00",
          y: 12,
        },
      ];
    },
    memberTypeCount () {
      return [
        {
          x: "市场股东",
          y: 2150,
        },
        {
          x: "至尊会员",
          y: 29,
        },
      ];
    },
    chartSaleVisit () {
      return [
        {
          x: "2016-08-01",
          y: 23,
        },
        {
          x: "2016-08-02",
          y: 22,
        },
        {
          x: "2016-08-03",
          y: 23,
        },
        {
          x: "2016-08-04",
          y: 26,
        },
        {
          x: "2016-08-05",
          y: 34,
        },
        {
          x: "2016-08-06",
          y: 26,
        },
        {
          x: "2016-08-07",
          y: 18,
        },
        {
          x: "2016-08-08",
          y: 54,
        },
        {
          x: "2016-08-09",
          y: 12,
        },
      ];
    },
    stockholderDeposit () {
      return [
        {
          x: "市场股东A",
          y: 314,
        },
        {
          x: "市场股东B",
          y: 628,
        },
        {
          x: "市场股东C",
          y: 1050,
        },
        {
          x: "市场股东D",
          y: 113,
        },
      ];
    },
  },
  filters: {
    paymentTypeFilter (v) {
      if (v === 1) return "转账";
      if (v === 2) return "现金";
      if (v === 3) return "刷卡";
      if (v === 5) return "支付宝";
      return "--";
    },
    depositStatusFilter (v) {
      if (v === 2) return "已缴纳";
      if (v === 3) return "已退回";
      if (v === 4) return "审核中";
      return "未缴纳";
    },
    previewPDF (v) {
      return /^http/.test(v.esignDownUrl)
        ? v.esignDownUrl
        : new Oss({
          filename: v.esignDownUrl,
        }).fullUrl();
    },
  },
};
</script>

<style lang="less">
.shop-info {
  .i-block {
    background: white;

    .b-title {
      position: relative;
      display: flex;
      align-items: center;
      height: 100px;
      padding-left: 40px;

      &::before {
        position: absolute;
        content: "";
        top: 30px;
        left: 20px;
        width: 5px;
        height: 40px;
        background: #1890ff;
      }
    }

    .b-content {
      padding: 20px;

      .c-grid {
        .c-grid-item {
          .f-item {
            display: flex;

            .i-label {
              display: flex;
              align-items: center;
            }

            .i-value {
              display: flex;
              align-items: center;
              padding-left: 10px;

              .el-input.is-disabled .el-input__inner {
                color: #000000;
              }
            }
          }
        }

        &:not(:last-child) {
          td {
            padding-bottom: 16px;
          }
        }
      }
    }

    &_contract {
      .b-content {
        padding: 0 30px 30px 30px;

        &_tabs {
          display: flex;
          align-items: center;
          height: 60px;
          border-bottom: 1px solid #ebeef5;

          .t-tab {
            margin-right: 50px;
            cursor: pointer;

            &--active {
              position: relative;

              &::after {
                position: absolute;
                left: -2px;
                bottom: -23px;
                content: "";
                width: 68px;
                height: 4px;
                background: #1890ff;
              }
            }
          }
        }

        &_options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 0;

          &-left {
            display: flex;
            align-items: center;
          }
        }
      }
    }

    &_sale {
      .b-content {
        position: relative;

        .s-switch {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;

          .s-item {
            width: 50px;
            height: 30px;
          }
        }

        .s-chart {
          height: 300px;
        }
      }
    }

    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  .i-others {
    display: flex;
    margin-top: 20px;

    .o-item {
      flex: 1;
      background: white;

      .i-title {
        position: relative;
        display: flex;
        align-items: center;
        height: 100px;
        padding-left: 40px;

        &::before {
          position: absolute;
          content: "";
          top: 30px;
          left: 20px;
          width: 5px;
          height: 40px;
          background: #1890ff;
        }
      }

      .i-content {
        height: 300px;
      }
    }
  }

  .popup-confirm {
    &_shop-update {
      padding-top: 50px;

      .u-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;

        .t-item {
          position: relative;
          height: 30px;
          padding: 0 20px;

          .i-label {
            display: flex;
            align-items: center;
            height: 30px;
          }

          &-active {
            &::before {
              position: absolute;
              content: "";
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #1890ff;
            }
          }

          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }

      .u-box {
        padding: 20px;

        &_field {
          .f-item {
            .i-label {
              display: flex;
              align-items: center;
              height: 40px;
            }

            &:not(:first-child) {
              margin-top: 20px;
            }
          }
        }
      }
    }

    &_holder-update {
      padding: 20px;

      .u-item {
        display: flex;
        align-items: center;

        .i-label {
          width: 100px;
        }

        .i-value {
          display: flex;
          align-items: center;
          flex: 1;
        }

        &:not(:first-child) {
          margin-top: 20px;
        }
      }
    }

    &_shop-change {
      padding: 20px;

      .a-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        cursor: pointer;

        .t-item {
          position: relative;
          height: 30px;
          padding: 0 20px;

          .i-label {
            display: flex;
            align-items: center;
            height: 30px;
          }

          &-active {
            &::before {
              position: absolute;
              content: "";
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #1890ff;
            }
          }

          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }

      .a-box {
        padding: 20px;
        margin-top: 20px;

        &_field {
        }
      }
    }

    &_approval-sub-shop-deposit-add {
      padding: 20px;
    }

    &_approval-sub-shop-ccb-pay-add {
      padding-top: 50px;

      .a-tab {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;

        .t-item {
          position: relative;
          height: 30px;
          padding: 0 20px;

          .i-label {
            display: flex;
            align-items: center;
            height: 30px;
          }

          &-active {
            &::before {
              position: absolute;
              content: "";
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #1890ff;
            }
          }

          &:not(:first-child) {
            margin-left: 20px;
          }
        }
      }

      .a-box {
        padding: 20px;

        &_field {
        }
      }
    }

    &_online-contract-update {
      padding: 20px;
    }

    &_offline-contract-add {
      padding: 20px;
    }

    &_contract-pre {
      position: relative;
      padding: 20px;
      height: 100%;
    }
  }
}
</style>
