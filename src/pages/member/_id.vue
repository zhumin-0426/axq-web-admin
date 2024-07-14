<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-18 16:48:48
 * @LastEditTime: 2022-06-25 16:04:49
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/member/_id.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="member-info">
    <div class="i-block i-block_base">
      <div class="b-title">
        <span>基本信息</span>
      </div>
      <div class="b-content">
        <grid :col="4" class="b-grid">
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>姓名：</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.nickname')"
                ></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  style="marginleft: 10px"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  @click.native="
                    $refs.popupConfirmMemberUpdate.open({
                      triggerOpen: popup.memberUpdate.fn.openHandler,
                      triggerClose: popup.memberUpdate.fn.closeHandler,
                      params: { title: '修改姓名', type: 15 },
                    })
                  "
                >
                  修改</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>电话:</span>
              </div>
              <div class="i-value">
                <template v-if="isEnableViewIdCard">
                    <el-input size="mini" disabled :value="infoGet('info.mobile')"></el-input>
                </template>
                <template v-else>
                   <el-input size="mini" disabled :value="infoGet('info.mobile') | encryptPhone"></el-input>
                </template>
                <el-button
                  type="primary"
                  size="mini"
                  style="marginleft: 10px"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  @click.native="
                    $refs.popupConfirmMemberUpdate.open({
                      triggerOpen: popup.memberUpdate.fn.openHandler,
                      triggerClose: popup.memberUpdate.fn.closeHandler,
                      params: { title: '修改电话', type: 1 },
                    })
                  "
                >
                  修改</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>注册时间:</span>
                </div>
                <div class="i-value">
                  <el-input
                    size="mini"
                    disabled
                    :value="infoGet('info.createTime')"
                  ></el-input>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>会员类型:</span>
                </div>
                <div class="i-value">
                  <el-input
                    size="mini"
                    disabled
                    :value="blankGet(entitys.Member.filter('type', infoGet('info.type')))"
                  >
                  </el-input>
                  <el-button
                    type="primary"
                    size="mini"
                    style="marginleft: 10px"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    @click.native="
                      $refs.popupConfirmMemberUpdate.open({
                        triggerOpen: popup.memberUpdate.fn.openHandler,
                        triggerClose: popup.memberUpdate.fn.closeHandler,
                        params: { title: '修改类型', type: 2 },
                      })
                    "
                  >
                    修改</el-button
                  >
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>性别:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.sex') === 1 ? '男' : '女'"
                ></el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>ID:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.id')"
                ></el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>升级店主时间:</span>
                </div>
                <div class="i-value">
                  <el-input
                    size="mini"
                    disabled
                    :value="infoGet('info.createTime')"
                  ></el-input>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>生日:</span>
                </div>
                <div class="i-value">
                  <el-input
                    size="mini"
                    disabled
                    :value="infoGet('info.birthday')"
                  ></el-input>
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>身份证号:</span>
              </div>
              <div class="i-value">
                <template v-if="isEnableViewIdCard">
                  <el-input
                    size="mini"
                    disabled
                    :value="infoGet('info.idCardNumber')"
                  ></el-input>
                </template>
                <template v-else>
                  <el-input
                    size="mini"
                    disabled
                    :value="infoGet('info.idCardNumber') | encryptCertificate"
                  ></el-input>
                </template>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>地址:</span>
              </div>
              <div class="i-value">
                <el-input size="mini" disabled :value="infoGet('info.liveAddress')">
                </el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>上级与推荐人/电话:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.parent.nickname')"
                ></el-input>
                <el-button
                  size="mini"
                  type="primary"
                  style="marginleft: 10px"
                  @click.native="go(`/member/${infoGet('info.parent.id')}`)"
                  v-if="infoGet('info.parent.id')"
                  >详情
                </el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>上级店主/电话:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.distributor.nickname')"
                ></el-input>
                <el-button
                  size="mini"
                  style="marginleft: 10px"
                  @click.native="go(`/member/${infoGet('info.distributor.id')}`)"
                  v-if="infoGet('info.distributor.id')"
                >
                  详情</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>团队领导人/电话:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.teamLeader.nickname')"
                ></el-input>
                <el-button
                  size="mini"
                  type="primary"
                  style="marginleft: 10px"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  @click.native="
                    $refs.popupConfirmMemberUpdate.open({
                      triggerOpen: popup.memberUpdate.fn.openHandler,
                      triggerClose: popup.memberUpdate.fn.closeHandler,
                      params: { title: '修改团队领导人', type: 13 },
                    })
                  "
                >
                  修改</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>专属客服:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.customerService.nickname')"
                ></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  style="marginleft: 10px"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  @click.native="
                    $refs.popupConfirmMemberUpdate.open({
                      triggerOpen: popup.memberUpdate.fn.openHandler,
                      triggerClose: popup.memberUpdate.fn.closeHandler,
                      params: { title: '修改专属客服', type: 4 },
                    })
                  "
                >
                  修改</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>下级店主:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  nickname
                  :value="`${infoGet('info.subDistributorCount')}人`"
                >
                </el-input>
                <el-button size="mini" style="marginleft: 10px">详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>下级会员:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="`${infoGet('info.subMemberCount')}人`"
                ></el-input>
                <el-button size="mini" style="marginleft: 10px">详情</el-button>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>关联个体户:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.axqSelfEmployedLaborer.name')"
                ></el-input>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>是否为团队领导人:</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否切换为团队领导人"
                    :config="{
                      selectorList: entitys.Member._options.isTeamLeader,
                      value: infoGet('info.isTeamLeader') ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsTeamLeader"
                  ></switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>是否启用代理权限:</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否启用代理权限，开启后代理可正常下单"
                    :config="{
                      selectorList: entitys.Member._options.isValidDistributor,
                      value: infoGet('info.isValidDistributor') ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsLockDistributor"
                  ></switch-selector>
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>是否在代理关系中隐藏：</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否启用代理隐藏功能，开启后代理在代理关系树中不可见！"
                    :config="{
                      selectorList: entitys.Member._options.isHiddenDistributor,
                      value: infoGet('info.isHiddenDistributor') ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsHiddenDistributor"
                  ></switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>加入黑名单：</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否将会员加入黑名单，该操作会使下属会员挪动至上级店主，谨慎操作！"
                    :config="{
                      value: infoGet('info.status') === 3 ? true : false,
                    }"
                    @change="switchSelector.fn.updateMember2blackList"
                  ></switch-selector>
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>是否允许查看团队业绩：</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否切换查看团队业绩，该操作会使该会员查看下级团队业绩功能发生变化！"
                    :config="{
                      value: infoGet('info.achieveQueryIsEnable') === 1 ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberAchieveQueryIsEnable"
                  ></switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>是否为新店主：</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否切换是否新店主，该操作影响下单业绩结算！"
                    :config="{
                      value: infoGet('info.isNewDistributor') === 1 ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsNewDistributor"
                  ></switch-selector>
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>开启直播:</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="切换会员直播权限，是否继续？"
                    :config="{
                      value: infoGet('info.liveIsEnable') === 1 ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberLiveIsEnable"
                  ></switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>录制空间:</span>
                </div>
                <div class="i-value">
                  <el-input
                    size="mini"
                    disabled
                    :value="`${
                      infoGet('info.liveRecordSizeLimit') / (1024 * 1024 * 1024)
                    }/GB`"
                  ></el-input>
                  <el-button
                    type="primary"
                    size="mini"
                    style="marginleft: 10px"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    @click.native="
                      $refs.popupConfirmMemberUpdate.open({
                        triggerOpen: popup.memberUpdate.fn.openHandler,
                        triggerClose: popup.memberUpdate.fn.closeHandler,
                        params: { title: '修改直播录制空间', type: 17 },
                      })
                    "
                  >
                    修改</el-button
                  >
                </div>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>是否开启小程序店主下单权限：</span>
              </div>
              <div class="i-value">
                <switch-selector
                  :mode="2"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  tip="是否开启店主端小程序代理下单权限，开启后代理可在小程序正常下单！"
                  :config="{
                    value: infoGet('info.isEnableMaAddPurchanse') === 1 ? true : false,
                  }"
                  @change="switchSelector.fn.updateMemberIsEnableMaAddPurchanse"
                ></switch-selector>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>实名认证：</span>
                <span>{{
                  infoGet("info.isCertificate") === 0 ? "未认证" : "已认证"
                }}</span>
              </div>
              <div class="i-value" v-show="infoGet('info.isCertificate')&&isEnableViewIdCard">
                <el-image
                  style="width: 100px; height: 64px"
                  :style="!index && 'margin-right: 21px'"
                  v-for="(item, index) in JSON.parse(infoGet('info.idCardJson', '[]'))"
                  :key="index"
                  :src="item.url | suffixOssUrl"
                  :preview-src-list="[suffixOssUrl(item.url)]"
                  :fit="'contain'"
                >
                </el-image>
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div class="f-item">
              <div class="i-label">
                <span>会员归属店铺:</span>
              </div>
              <div class="i-value">
                <el-input
                  size="mini"
                  disabled
                  :value="infoGet('info.shop.name')"
                ></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  style="marginleft: 10px"
                  :disabled="!checkAccessNode('MEMBER.update')"
                  @click.native="
                    $refs.popupConfirmMemberUpdate.open({
                      triggerOpen: popup.memberUpdate.fn.openHandler,
                      triggerClose: popup.memberUpdate.fn.closeHandler,
                      params: { title: '修改会员归属店铺', type: 22 },
                    })
                  "
                  >修改</el-button
                >
              </div>
            </div>
          </grid-item>
          <grid-item class="b-grid-item">
            <div style="display: flex">
              <div class="f-item">
                <div class="i-label">
                  <span>是否允许登录店主小程序:</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否切换登录店主小程序权限"
                    :config="{
                      selectorList: entitys.Member._options.isEnableMaDistributorLogin,
                      value: infoGet('info.isEnableMaDistributorLogin') ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsEnableMaDistributorLogin"
                  ></switch-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span>是否允许登录会员小程序:</span>
                </div>
                <div class="i-value">
                  <switch-selector
                    :mode="2"
                    :disabled="!checkAccessNode('MEMBER.update')"
                    tip="是否切换登录会员小程序权限"
                    :config="{
                      selectorList: entitys.Member._options.isEnableMaMemberLogin,
                      value: infoGet('info.isEnableMaMemberLogin') ? true : false,
                    }"
                    @change="switchSelector.fn.updateMemberIsEnableMaMemberLogin"
                  ></switch-selector>
                </div>
              </div>
            </div>
          </grid-item>
        </grid>
      </div>
    </div>
    <div class="i-block i-block_chian_blacklist">
      <div class="b-title">
        <span>业绩关系链黑名单（仅在小程序有效）</span>
        <el-button
          type="primary"
          size="small"
          @click.native="
            $refs.popupConfirmMemberChainBlacklistAdd.open({
              triggerClose: popup.memberChainBlacklist.fn.closeHandler,
            })
          "
        >
          添加</el-button
        >
      </div>
      <div class="b-content">
        <el-table
          :data="infoGet('memberChainBlacklistList', [])"
          stripe
          style="width: 100%"
        >
          <el-table-column label="会员编号">
            <template slot-scope="props">
              <p>{{ props.row.blackId }}</p>
            </template>
          </el-table-column>
          <el-table-column label="会员姓名">
            <template slot-scope="props">
              <p>{{ props.row.blackNickname }}</p>
            </template>
          </el-table-column>
          <template v-if="isEnableViewIdCard">
            <el-table-column label="拉黑会员/手机号">
              <template slot-scope="props">
                <p>{{props.row.blackMobile}}</p>
              </template>
            </el-table-column>
          </template>
          <template v-else>
<el-table-column label="拉黑会员/手机号">
              <template slot-scope="props">
                <p>{{props.row.blackMobile | encryptPhone}}</p>
              </template>
            </el-table-column>
          </template>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="props">
              <el-button
                type="danger"
                size="small"
                @click.native="popup.memberChainBlacklist.fn.delete(props.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="i-block i-block_account">
      <div class="b-title">
        <span>分号绑定（允许该用户登录授权会员的小程序/店铺）</span>
        <el-button
          type="primary"
          size="small"
          @click.native="
            $refs.popupConfirmMemberLoginAuthorizeAdd.open({
              triggerClose: popup.memberLoginAuthorize.fn.closeHandler,
            })
          "
        >
          添加</el-button
        >
      </div>
      <div class="b-content">
        <el-table
          :data="infoGet('info.memberLoginAuthorizeList', [])"
          stripe
          style="width: 100%"
        >
          <el-table-column label="会员编号">
            <template slot-scope="props">
              <p>{{ props.row.authorizeMember.id }}</p>
            </template>
          </el-table-column>
          <el-table-column label="会员姓名">
            <template slot-scope="props">
              <p>{{ props.row.authorizeMember.nickname }}</p>
            </template>
          </el-table-column>
            <template v-if="isEnableViewIdCard">
              <el-table-column label="手机号">
                <template slot-scope="props">
                  <p>{{ props.row.authorizeMember.mobile}}</p>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column label="手机号">
                <template slot-scope="props">
                  <p>{{ props.row.authorizeMember.mobile | encryptPhone}}</p>
                </template>
              </el-table-column>
            </template>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="props">
              <el-button
                type="danger"
                size="small"
                @click.native="popup.memberLoginAuthorize.fn.delete(props.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="i-block i-block_shop">
      <div class="b-title">
        <span>店铺信息</span>
      </div>
      <div class="b-content">
        <el-table :data="infoGet('shopList', [])" stripe style="width: 100%">
          <el-table-column label="店铺ID">
            <template slot-scope="props">
              <p>{{ props.row.id }}</p>
            </template>
          </el-table-column>
          <el-table-column label="店铺编号">
            <template slot-scope="props">
              <p>{{ props.row.sn }}</p>
            </template>
          </el-table-column>
          <el-table-column label="店铺名称">
            <template slot-scope="props">
              <p>{{ props.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="店主">
            <template slot-scope="props">
              <p>{{ props.row.holder.nickname }}</p>
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <template slot-scope="props">
              <p>{{ props.row.holder.fullAddress }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="props">
              <el-button
                type="primary"
                size="small"
                @click.native="go(`/shop/${props.row.id}`)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="i-account">
      <div class="a-section">
        <div class="s-title">
          <span>预存余额</span>
        </div>
        <div class="s-content">
          <div class="c-item">
            <div class="i-icon">
              <i class="iconfont icon-yue1" style="color: #2d8cf0"></i>
            </div>
            <div class="i-name">
              <span>余额</span>
            </div>
            <div class="i-balance">
              <span
                >￥{{
                  infoGet("info.memberAccount.balance", 0) | amountFormat(2, ",")
                }}元</span
              >
              <span
                >(实际余额：￥{{
                  (infoGet("info.memberAccount.balance", 0) +
                    infoGet("info.memberAccount.balanceFreeze", 0))
                    | amountFormat(2, ",")
                }}元)</span
              >
            </div>
            <div class="i-link" v-if="checkAccessNode('MEMBER.update')">
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAccountUpdate.open({
                    triggerOpen: popup.memberAccountUpdate.fn.openHandler,
                    triggerClose: popup.memberAccountUpdate.fn.closeHandler,
                    params: { title: '修改账户余额', type: 1 },
                  })
                "
              >
                <span>修改</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmapprovalSubDistributorBalanceChangeAdd.open({
                    triggerOpen:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.openHandler,
                    triggerClose:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.closeHandler,
                    triggerHidden:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.hiddenHandler,
                    params: { title: '余额退回申请', type: 1 },
                  })
                "
              >
                <span>退回</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAccountTopUpAdd.open({
                    triggerOpen: popup.memberAccountTopUpAdd.fn.openHandler,
                    triggerClose: popup.memberAccountTopUpAdd.fn.closeHandler,
                    params: { title: '余额充值', type: 1 },
                  })
                "
              >
                <span>充值</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmBalanceTransferAdd.open({
                    triggerOpen: popup.balanceTransferAdd.fn.openHandler,
                    triggerClose: popup.balanceTransferAdd.fn.closeHandler,
                    params: { type: 1 },
                  })
                "
              >
                <span>转让</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberBalanceChangeLog.open({
                    triggerOpen: popup.memberBalanceChangeLog.fn.openHandler,
                    triggerClose: popup.memberBalanceChangeLog.fn.closeHandler,
                    params: { type: 6 },
                  })
                "
              >
                <span>明细</span>
              </div>
            </div>
          </div>
          <div class="c-item">
            <div class="i-icon">
              <i class="iconfont icon-zuhe" style="color: #2d8cf0"></i>
            </div>
            <div class="i-name">
              <span>预存组合</span>
            </div>
            <div class="i-balance">
              <span
                >{{
                  infoGet("info.memberGoodsSeriesPrestoreList", 0) | addUp("quantity")
                }}件</span
              >
              <span
                >(实际组合：{{
                  (infoGet("info.memberGoodsSeriesPrestoreList", []) || []).reduce(
                    (num, item) => {
                      return num + item.quantity + item.quantityFreeze;
                    },
                    0
                  )
                }}件)</span
              >
            </div>
            <div class="i-link" v-if="checkAccessNode('MEMBER.update')">
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberGoodsSeriesPrestoreInfo.open({
                    triggerOpen: popup.memberGoodsSeriesPrestoreInfo.fn.openHandler,
                  })
                "
              >
                <span>详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a-section">
        <div class="s-title">
          <span>思雪余额</span>
        </div>
        <div class="s-content">
          <div class="c-item">
            <div class="i-icon">
              <i class="iconfont icon-yue2" style="color: #db639b"></i>
            </div>
            <div class="i-name">
              <span>思雪余额</span>
            </div>
            <div class="i-balance">
              <span
                >￥{{
                  infoGet("info.memberAccount.sixueBalance", 0) | amountFormat(2, ",")
                }}元</span
              >
              <span
                >(实际思雪余额：￥{{
                  (infoGet("info.memberAccount.sixueBalance", 0) +
                    infoGet("info.memberAccount.sixueBalanceFreeze", 0))
                    | amountFormat(2, ",")
                }}元)</span
              >
            </div>
            <div class="i-link" v-if="checkAccessNode('MEMBER.update')">
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAccountUpdate.open({
                    triggerOpen: popup.memberAccountUpdate.fn.openHandler,
                    triggerClose: popup.memberAccountUpdate.fn.closeHandler,
                    params: { title: '修改思雪余额', type: 2 },
                  })
                "
              >
                <span>修改</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmapprovalSubDistributorBalanceChangeAdd.open({
                    triggerOpen:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.openHandler,
                    triggerClose:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.closeHandler,
                    triggerHidden:
                      popup.approvalSubDistributorBalanceChangeAdd.fn.hiddenHandler,
                    params: { title: '思雪余额退回申请', type: 2 },
                  })
                "
              >
                <span>退回</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAccountTopUpAdd.open({
                    triggerOpen: popup.memberAccountTopUpAdd.fn.openHandler,
                    triggerClose: popup.memberAccountTopUpAdd.fn.closeHandler,
                    params: { title: '思雪余额充值', type: 2 },
                  })
                "
              >
                <span>充值</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmBalanceTransferAdd.open({
                    triggerOpen: popup.balanceTransferAdd.fn.openHandler,
                    triggerClose: popup.balanceTransferAdd.fn.closeHandler,
                    params: { type: 2 },
                  })
                "
              >
                <span>转让</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberBalanceChangeLog.open({
                    triggerOpen: popup.memberBalanceChangeLog.fn.openHandler,
                    triggerClose: popup.memberBalanceChangeLog.fn.closeHandler,
                    params: { type: 7 },
                  })
                "
              >
                <span>明细</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a-section">
        <div class="s-title">
          <span>本月业绩</span>
        </div>
        <div class="s-content">
          <div class="c-item">
            <div class="i-icon">
              <i class="iconfont icon-yingxiao" style="color: #e0620d"></i>
            </div>
            <div class="i-name">
              <span>业绩</span>
            </div>
            <div class="i-balance">
              <span
                >{{
                  infoGet("info.memberAchieve.integral", 0) | amountFormat(2, ",")
                }}积分</span
              >
              <span
                >(实际业绩：{{
                  (infoGet("info.memberAchieve.integral", 0) +
                    infoGet("info.memberAchieve.integralFreeze", 0))
                    | amountFormat(2, ",")
                }})</span
              >
            </div>
            <div class="i-link" v-if="checkAccessNode('MEMBER.update')">
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAchieveList.open({
                    triggerOpen: popup.memberAchieveList.fn.openHandler,
                  })
                "
              >
                <span>全部业绩</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmApprovalSubAchieveTransferAdd.open({
                    triggerOpen: popup.approvalSubAchieveTransferAdd.fn.openHandler,
                    triggerClose: popup.approvalSubAchieveTransferAdd.fn.closeHandler,
                  })
                "
              >
                <span>业绩转让</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberAchieveUpdate.open({
                    triggerOpen: popup.memberAchieveUpdate.fn.openHandler,
                    triggerClose: popup.memberAchieveUpdate.fn.closeHandler,
                  })
                "
              >
                <span>修改业绩</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a-section">
        <div class="s-title">
          <span>新店主钱包</span>
        </div>
        <div class="s-content">
          <div class="c-item">
            <div class="i-icon">
              <i class="iconfont icon-yue1" style="color: #e0620d"></i>
            </div>
            <div class="i-name">
              <span>钱包</span>
            </div>
            <div class="i-balance">
              <span
                >{{
                  (infoGet("info.memberAccount.balanceNewDistributor", 0) - infoGet("info.memberAccount.balanceNewDistributorUsed", 0))
                    | amountFormat(2, ",")
                }}元</span
              >
            </div>
            <div class="i-link" v-if="checkAccessNode('MEMBER.update')">
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberTransferMoney.open({
                    triggerOpen: popup.popupConfirmMemberTransferMoney.fn.openHandle,
                    triggerClose: popup.popupConfirmMemberTransferMoney.fn.closeHandle,
                    triggerHidden: popup.popupConfirmMemberTransferMoney.fn.hiddenHandle,
                    params: { type: 4 },
                  })
                "
              >
                <span>划转</span>
              </div>
              <div
                class="l-item"
                @click="
                  $refs.popupConfirmMemberWalletDetail.open({
                    triggerOpen: popup.popupConfirmMemberWalletDetail.fn.openHandle,
                    params: { type: 8 },
                  })
                "
              >
                <span>明细</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup-confirm ref="popupConfirmMemberUpdate" :title="popup.memberUpdate.attr.title">
      <div class="popup-confirm_member-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberUpdate.attr.tab === 1 }"
            @click="popup.memberUpdate.attr.tab = 1"
          >
            <span>更新</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberUpdate.attr.tab === 2 }"
            @click="popup.memberUpdate.attr.tab = 2"
          >
            <span>修改记录</span>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 1"
        >
          <div class="f-item">
            <div class="i-label">
              <span>会员手机号：</span>
            </div>
            <div class="i-value">
              <el-input
                v-model="popup.memberUpdate.attr.type2form[1].data.value"
              ></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[1].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 2"
        >
          <div class="f-item">
            <div class="i-label">
              <span>会员类型：</span>
            </div>
            <div class="i-value">
              <el-radio-group v-model="popup.memberUpdate.attr.type2form[2].data.type">
                <el-radio :label="7">店主</el-radio>
                <el-radio :label="8">至尊会员</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[2].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 4"
        >
          <div class="f-item">
            <div class="i-label">
              <span>专属客服：</span>
            </div>
            <div class="i-value">
              <options-selector
                :mode="4"
                placeholder="职员/手机号"
                :config="{ req: popup.memberUpdate.fn.axqStaffQuery }"
                @change="
                  (e) => {
                    this.popup.memberUpdate.fn.axqStaffChangeHandler(4, e);
                  }
                "
              ></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[4].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 13"
        >
          <div class="f-item">
            <div class="i-label">
              <span>团队领导人：</span>
            </div>
            <div class="i-value">
              <options-selector
                :mode="4"
                placeholder="名称/手机号"
                :config="{ req: popup.memberUpdate.fn.teamLeaderQuery }"
                @change="
                  (e) => {
                    this.popup.memberUpdate.fn.teamLeaderChangeHandler(13, e);
                  }
                "
              ></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[13].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 14"
        >
          <div class="f-item">
            <div class="i-label">
              <span>会员生日：</span>
            </div>
            <div class="i-value">
              <time-picker
                type="date"
                @change="popup.memberUpdate.attr.type2form[14].data.value = $event"
              >
              </time-picker>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[14].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 15"
        >
          <div class="f-item">
            <div class="i-label">
              <span>会员姓名：</span>
            </div>
            <div class="i-value">
              <el-input
                v-model="popup.memberUpdate.attr.type2form[15].data.value"
              ></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[15].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 17"
        >
          <div class="f-item">
            <div class="i-label">
              <span>直播空间大小/GB：</span>
            </div>
            <div class="i-value">
              <el-input
                v-model="popup.memberUpdate.attr.type2form[17].data.value"
              ></el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[17].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div
          class="u-box u-box_field"
          v-if="popup.memberUpdate.attr.tab === 1 && popup.memberUpdate.attr.type === 22"
        >
          <div class="f-item">
            <div class="i-label">
              <span>会员归属店铺：</span>
            </div>
            <div class="i-value">
              <options-selector
                :mode="4"
                :config="{ req: popup.memberUpdate.fn.transferShopMemberQuery }"
                @change="
                  (e) => {
                    this.popup.memberUpdate.fn.transferShopMemberChangeHandler(22, e);
                  }
                "
              ></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberUpdate.attr.type2form[22].data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_history" v-if="popup.memberUpdate.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.memberUpdate.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改前">
                <template slot-scope="props">
                  <p>
                    {{
                      popup.memberUpdate.fn.getValue4JSON(
                        props.row,
                        popup.memberUpdate.attr.type
                      ).old
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="修改后">
                <template slot-scope="props">
                  <p>
                    {{
                      popup.memberUpdate.fn.getValue4JSON(
                        props.row,
                        popup.memberUpdate.attr.type
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
              <el-table-column prop="name" label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.memberUpdate.attr.tab === 2">
        共
        <em>{{ popup.memberUpdate.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="popup.memberUpdate.attr.history.total"
        slot="footer-right"
        v-if="popup.memberUpdate.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberChainBlacklistAdd"
      title="添加关系链黑名单"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-chain-blacklist-add">
        <cell-group>
          <cell-item label="选择会员：">
            <options-selector
              :mode="4"
              placeholder="店主/手机号"
              :config="{ req: popup.memberChainBlacklist.fn.distributorQuery }"
              @change="popup.memberChainBlacklist.attr.form.blackId = $event"
            ></options-selector>
          </cell-item>
          <cell-item label="注意：">
            <p style="color: #f56c6c">选择黑名单后，会员无法查看改黑名单业绩</p>
          </cell-item>
        </cell-group>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberLoginAuthorizeAdd"
      title="添加分号"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-login-authorize-add">
        <cell-group>
          <cell-item label="选择会员：">
            <options-selector
              :mode="4"
              placeholder="会员/手机号"
              :config="{ req: popup.memberLoginAuthorize.fn.distributorQuery }"
              @change="popup.memberLoginAuthorize.attr.form.authorizeMemberId = $event"
            ></options-selector>
          </cell-item>
          <cell-item label="注意：">
            <p style="color: #f56c6c">
              选择代理后，被授权会员可以登录该代理小程序/店铺系统
            </p>
          </cell-item>
        </cell-group>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberAccountUpdate"
      :confirm-disabled="!isDistributor"
      :title="popup.memberAccountUpdate.attr.title"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-account-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAccountUpdate.attr.tab === 1 }"
            @click="popup.memberAccountUpdate.attr.tab = 1"
          >
            <span>更新</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAccountUpdate.attr.tab === 2 }"
            @click="popup.memberAccountUpdate.attr.tab = 2"
          >
            <span>修改记录</span>
          </div>
        </div>
        <template
          v-if="
            popup.memberAccountUpdate.attr.tab === 1 &&
            popup.memberAccountUpdate.attr.type === 1
          "
        >
          <div class="u-box u-box_field">
            <div class="f-item">
              <div class="i-label">
                <span>现有余额：</span>
              </div>
              <div class="i-value">
                <span
                  >￥{{
                    infoGet("info.memberAccount.balance", 0) | amountFormat(2, ",")
                  }}元</span
                >
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>修改余额：</span>
              </div>
              <div class="i-value">
                <el-input
                  v-model="popup.memberAccountUpdate.attr.type2form[1].data.value"
                ></el-input>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.memberAccountUpdate.attr.type2form[1].data.remark"
                ></el-input>
              </div>
            </div>
          </div>
        </template>
        <template
          v-if="
            popup.memberAccountUpdate.attr.tab === 1 &&
            popup.memberAccountUpdate.attr.type === 2
          "
        >
          <div class="u-box u-box_field">
            <div class="f-item">
              <div class="i-label">
                <span>现有思雪余额：</span>
              </div>
              <div class="i-value">
                <span
                  >￥{{
                    infoGet("info.memberAccount.sixueBalance", 0) | amountFormat(2, ",")
                  }}元</span
                >
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>修改思雪余额：</span>
              </div>
              <div class="i-value">
                <el-input
                  v-model="popup.memberAccountUpdate.attr.type2form[2].data.value"
                ></el-input>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.memberAccountUpdate.attr.type2form[2].data.remark"
                ></el-input>
              </div>
            </div>
          </div>
        </template>
        <div class="u-box u-box_history" v-if="popup.memberAccountUpdate.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.memberAccountUpdate.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改前">
                <template slot-scope="props">
                  <p>{{ props.row.valueOld }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改后">
                <template slot-scope="props">
                  <p>{{ props.row.valueNew }}</p>
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
              <el-table-column label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <template v-if="popup.memberAccountUpdate.attr.tab === 2">
        <p slot="footer-left">
          共
          <em>{{ popup.memberAccountUpdate.attr.history.total }}条记录</em>
        </p>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="popup.memberAccountUpdate.attr.history.total"
          @current-change="popup.memberAccountUpdate.fn.historyPageChangeHandler"
          slot="footer-right"
        ></el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmapprovalSubDistributorBalanceChangeAdd"
      :confirm-disabled="!isDistributor"
      :title="popup.approvalSubDistributorBalanceChangeAdd.attr.title"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_approval-sub-distributor-balance-reutrn-add">
        <div class="a-tab">
          <div
            class="t-item"
            :class="{
              't-item-active':
                popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 1,
            }"
            @click="popup.approvalSubDistributorBalanceChangeAdd.attr.tab = 1"
          >
            <span>余额退回</span>
          </div>
          <div
            class="t-item"
            :class="{
              't-item-active':
                popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 2,
            }"
            @click="popup.approvalSubDistributorBalanceChangeAdd.attr.tab = 2"
          >
            <span>记录</span>
          </div>
        </div>
        <div
          class="a-box a-box_field form-table"
          v-if="
            popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 1 &&
            popup.approvalSubDistributorBalanceChangeAdd.attr.balanceType === 1
          "
        >
          <div class="f-item">
            <div class="i-label">
              <span class="required">退回金额:</span>
            </div>
            <div class="i-value">
              <el-input
                  size="samll"
                  v-model="
                    popup.approvalSubDistributorBalanceChangeAdd.attr.form
                      .approvalSubDistributorBalanceChange.value.amount.value
                  "
                  type="text"
                  oninput="this.value = (this.value.match(/^(0|[1-9]\d*)(\.\d{0,2})?/) || [''])[0]"
                >
              </el-input>
            </div>
            <p style="paddingleft: 100px">
              注意：最大可退款金额￥{{
                infoGet("info.memberAccount.balance", 0) | amountFormat
              }}
            </p>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">收款人:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.accountOwner
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">银行卡号:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.account
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">开户行:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.accountOpen
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注:</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.remark.value
                "
              >
              </el-input>
            </div>
          </div>
        </div>
        <div
          class="a-box a-box_field form-table"
          v-if="
            popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 1 &&
            popup.approvalSubDistributorBalanceChangeAdd.attr.balanceType === 2
          "
        >
          <div class="f-item">
            <div class="i-label">
              <span class="required">退回金额:</span>
            </div>
            <div class="i-value">
              <el-input
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.amount.value
                "
                type="text"
                oninput="this.value = (this.value.match(/^(0|[1-9]\d*)(\.\d{0,2})?/) || [''])[0]"
              >
              </el-input>
            </div>
            <p style="paddingleft: 100px">
              注意：最大可退款金额￥{{
                infoGet("info.memberAccount.sixueBalance", 0) | amountFormat
              }}
            </p>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">收款人:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.accountOwner
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">银行卡号:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.account
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">开户行:</span>
            </div>
            <div class="i-value">
              <el-input
                size="samll"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.returnData.value.accountOpen
                "
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注:</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="
                  popup.approvalSubDistributorBalanceChangeAdd.attr.form
                    .approvalSubDistributorBalanceChange.value.remark.value
                "
              >
              </el-input>
            </div>
          </div>
        </div>
        <div
          class="a-box a-box_history"
          v-if="popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 2"
        >
          <div class="h-list">
            <el-table
              :data="popup.approvalSubDistributorBalanceChangeAdd.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="name" label="退回金额">
                <template slot-scope="props">
                  <p>{{ props.row.amount }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="收款人">
                <template slot-scope="props">
                  <p>{{ JSON.parse(props.row.returnData || "{}").accountOwner }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="提交人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="状态">
                <template slot-scope="props">
                  <p>{{ props.row.workflowId === 42 && props.row.status === 1 ? '待退回' : ({1:'审核中',2:'已退回',3:'不通过'})[props.row.status] }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="退回凭证">
                <template slot-scope="props">
                  <img-video-previewer  style="height: 74px;" v-if="JSON.parse(props.row.returnData).fileJson.length" :isRawUrl="true" :src="JSON.parse( JSON.parse(props.row.returnData).fileJson[0]).oss.url" ></img-video-previewer><p v-else>--</p>
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
      <p
        slot="footer-left"
        v-if="popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 2"
      >
        共
        <em>{{ popup.approvalSubDistributorBalanceChangeAdd.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="popup.approvalSubDistributorBalanceChangeAdd.attr.history.total"
        @current-change="
          popup.approvalSubDistributorBalanceChangeAdd.fn.historyPageChangeHandler
        "
        slot="footer-right"
        v-if="popup.approvalSubDistributorBalanceChangeAdd.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberGoodsSeriesPrestoreInfo"
      title="组合详情"
      :confirm-disabled="!isDistributor"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-goods-series-prestore-info">
        <el-table
          :data="popup.memberGoodsSeriesPrestoreInfo.attr.page.list"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="date" label="序号">
            <template slot-scope="props">
              <p>{{ props.row.goodsSeries.id }}</p>
            </template>
          </el-table-column>
          <el-table-column label="组合">
            <template slot-scope="props">
              <p>{{ props.row.goodsSeries.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="可用数量">
            <template slot-scope="props">
              <p>{{ props.row.quantity }}</p>
            </template>
          </el-table-column>
          <el-table-column label="冻结数量">
            <template slot-scope="props">
              <p>{{ props.row.quantityFreeze }}</p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="props">
              <el-button
                type="primary"
                size="mini"
                :disabled="!isDistributor"
                @click.native="
                  $refs.popupConfirmMemberGoodsSeriesPrestoreUpdate.open({
                    triggerOpen: popup.memberGoodsSeriesPrestoreUpdate.fn.openHandler,
                    triggerClose: popup.memberGoodsSeriesPrestoreUpdate.fn.closeHandler,
                    params: props.row,
                  })
                "
              >
                修改</el-button
              >
              <el-button
                type="primary"
                size="mini"
                style="marginleft: 10px"
                @click.native="
                  $refs.popupConfirmGoodsSeriesPrestoreChangeLog.open({
                    triggerOpen: popup.memberGoodsSeriesPrestoreChangeLog.fn.openHandler,
                    params: props.row,
                  })
                "
              >
                明细</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p slot="footer-left">
        共
        <em>{{ popup.memberGoodsSeriesPrestoreInfo.attr.page.total }}条</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="popup.memberGoodsSeriesPrestoreInfo.attr.page.total"
        slot="footer-right"
        @current-change="popup.memberGoodsSeriesPrestoreInfo.fn.pageChangeHandler"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberGoodsSeriesPrestoreUpdate"
      :confirm-disabled="!isDistributor"
      :title="`修改（${popup.memberGoodsSeriesPrestoreUpdate.attr.row.goodsSeries.name}）预存组合`"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-goods-series-prestore-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{
              't-item-active': popup.memberGoodsSeriesPrestoreUpdate.attr.tab === 1,
            }"
            @click="popup.memberGoodsSeriesPrestoreUpdate.attr.tab = 1"
          >
            <span>修改</span>
          </div>
          <div
            class="t-item"
            :class="{
              't-item-active': popup.memberGoodsSeriesPrestoreUpdate.attr.tab === 2,
            }"
            @click="popup.memberGoodsSeriesPrestoreUpdate.attr.tab = 2"
          >
            <span>修改记录</span>
          </div>
        </div>
        <template v-if="popup.memberGoodsSeriesPrestoreUpdate.attr.tab === 1">
          <div class="u-box u-box_field">
            <div class="f-item">
              <span
                >修改前数量：{{
                  popup.memberGoodsSeriesPrestoreUpdate.attr.row.quantity
                }}</span
              >
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>修改后数量：</span>
              </div>
              <div class="i-value">
                <el-input
                  placeholder="请输入组合数量"
                  class="el-input"
                  v-model="popup.memberGoodsSeriesPrestoreUpdate.attr.form.data.value"
                ></el-input>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.memberGoodsSeriesPrestoreUpdate.attr.form.data.remark"
                >
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="u-box u-box_history">
            <el-table
              :data="popup.memberGoodsSeriesPrestoreUpdate.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改前">
                <template slot-scope="props">
                  <p>{{ props.row.valueOld }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改后">
                <template slot-scope="props">
                  <p>{{ props.row.valueNew }}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </div>
      <template v-if="popup.memberGoodsSeriesPrestoreUpdate.attr.tab === 2">
        <p slot="footer-left">
          共
          <em>{{ popup.memberGoodsSeriesPrestoreUpdate.attr.history.total }}条记录</em>
        </p>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="popup.memberGoodsSeriesPrestoreUpdate.attr.history.total"
          slot="footer-right"
          @current-change="
            popup.memberGoodsSeriesPrestoreUpdate.fn.historyPageChangeHandler
          "
        >
        </el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmGoodsSeriesPrestoreChangeLog"
      title="组合明细"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-goods-series-change-log">
        <div class="l-tab">
          {{ popup.memberGoodsSeriesPrestoreChangeLog.attr.row.goodsSeries.name }}组合
          ：{{ popup.memberGoodsSeriesPrestoreChangeLog.attr.row.quantity }}件
        </div>
        <div class="l-box l-box_history">
          <div class="b-list">
            <el-table
              :data="popup.memberGoodsSeriesPrestoreChangeLog.attr.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="变更类型" width="250">
                <template slot-scope="props">
                  <p class="l-name" v-if="props.row.type === 1">
                    <template v-if="props.row.value > 0">
                      预存:{{ blankGet(props, "row.purchanse.sn") }}
                    </template>
                    <template v-else>
                      消费-{{
                        blankGet(props, "row.purchanse.type") === 1 ? "新订单" : "预售"
                      }}：{{ blankGet(props, "row.purchanse.sn") }}
                    </template>
                  </p>
                  <p class="l-name" v-if="props.row.type === 2">
                    转存-调换货订单：{{ blankGet(props, "row.revertForm.sn") }}
                  </p>
                  <p class="l-name" v-if="props.row.type === 3">
                    转存-异常/废弃订单:{{ blankGet(props, "row.purchanse.sn") }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="变更数量">
                <template slot-scope="props">
                  <p :class="props.row.value > 0 ? 'add' : 'decrease'">
                    {{ props.row.value > 0 ? "+" + props.row.value : props.row.value }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="剩余数量">
                <template slot-scope="props">
                  <p>
                    {{
                      props.row.newJson
                        ? blankGet(JSON.parse(blankGet(props, "row.newJson")), "quantity")
                        : "--"
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="100">
                <template slot-scope="props">
                  <p>{{ blankGet(props, "row.createTime") }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left">
        共
        <em>{{ popup.memberGoodsSeriesPrestoreChangeLog.attr.total }}条</em>
      </p>
      <template slot="footer-right">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="popup.memberGoodsSeriesPrestoreChangeLog.attr.total"
          @current-change="
            popup.memberGoodsSeriesPrestoreChangeLog.fn.historyPageChangeHandler
          "
        ></el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberAccountTopUpAdd"
      :confirm-disabled="!isDistributor"
      :title="popup.memberAccountTopUpAdd.attr.title"
      :config="{ width: 700, height: 600 }"
    >
      <div class="popup-confirm_member-account-top-up-add">
        <div class="a-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAccountTopUpAdd.attr.tab === 1 }"
            @click="popup.memberAccountTopUpAdd.attr.tab = 1"
          >
            <span>充值</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAccountTopUpAdd.attr.tab === 2 }"
            @click="popup.memberAccountTopUpAdd.attr.tab = 2"
          >
            <span>充值记录</span>
          </div>
        </div>
        <template
          v-if="
            popup.memberAccountTopUpAdd.attr.tab === 1 &&
            popup.memberAccountTopUpAdd.attr.balanceType === 1
          "
        >
          <div class="a-box a-box_field">
            <div class="f-item">
              <div class="i-label">
                <span class="required">充值方式:</span>
              </div>
              <div class="i-value">
                <el-select
                  size="small"
                  class="el-select"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[1].data.topUpType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in popup.memberAccountTopUpAdd.attr.paymentTypeList"
                    :key="item.topUpType"
                    :label="item.label"
                    :value="item.topUpType"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span class="required">充值余额:</span>
              </div>
              <div class="i-value">
                <el-input
                  type="text"
                  class="el-input"
                  placeholder="请输入充值余额"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[1].data.amount"
                  oninput="this.value = (this.value.match(/^(0|[1-9]\d*)(\.\d{0,2})?/) || [''])[0]"
                ></el-input>
              </div>
            </div>

            <template
              v-if="popup.memberAccountTopUpAdd.attr.type2form[1].data.topUpType === 3"
            >
              <div class="f-item">
                <div class="i-label">
                  <span class="required">转账日期:</span>
                </div>
                <div class="i-value">
                  <el-date-picker
                    style="width: 100%"
                    v-model="
                      popup.memberAccountTopUpAdd.attr.type2form[1].data.transferData.time
                    "
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择转账日期"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span class="required">公户名称:</span>
                </div>
                <div class="i-value">
                  <options-selector
                    :mode="1"
                    placeholder="选择到账的公户名称"
                    :config="{
                      req: popup.memberAccountTopUpAdd.fn.axqEmployedLaborerQuery,
                    }"
                    @change="
                      popup.memberAccountTopUpAdd.fn.axqEmployedLaborerChangeHandler
                    "
                  ></options-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span class="required">上传凭证:</span>
                </div>
                <div class="i-value">
                  <file-uploader
                    :max="5"
                    @change="
                      (e) => {
                        popup.memberAccountTopUpAdd.attr.type2form[1].data.transferData.fileJson = e;
                      }
                    "
                  ></file-uploader>
                </div>
              </div>
            </template>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[1].data.remark"
                >
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <template
          v-if="
            popup.memberAccountTopUpAdd.attr.tab === 1 &&
            popup.memberAccountTopUpAdd.attr.balanceType === 2
          "
        >
          <div class="a-box a-box_field">
            <div class="f-item">
              <div class="i-label">
                <span class="required">充值方式:</span>
              </div>
              <div class="i-value">
                <el-select
                  size="small"
                  class="el-select"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[2].data.topUpType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in popup.memberAccountTopUpAdd.attr.paymentTypeList"
                    :key="item.topUpType"
                    :label="item.label"
                    :value="item.topUpType"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span class="required">思雪充值余额:</span>
              </div>
              <div class="i-value">
                <el-input
                  type="text"
                  class="el-input"
                  placeholder="请输入充值余额"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[2].data.amount"
                  oninput="this.value = (this.value.match(/^(0|[1-9]\d*)(\.\d{0,2})?/) || [''])[0]"
                ></el-input>
              </div>
            </div>
            <template
              v-if="popup.memberAccountTopUpAdd.attr.type2form[2].data.topUpType === 3"
            >
              <div class="f-item">
                <div class="i-label">
                  <span class="required">转账日期:</span>
                </div>
                <div class="i-value">
                  <el-date-picker
                    style="width: 100%"
                    v-model="
                      popup.memberAccountTopUpAdd.attr.type2form[2].data.transferData.time
                    "
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择转账日期"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span class="required">公户名称:</span>
                </div>
                <div class="i-value">
                  <options-selector
                    :mode="1"
                    placeholder="选择到账的公户名称"
                    :config="{
                      req: popup.memberAccountTopUpAdd.fn.axqEmployedLaborerQuery,
                    }"
                    @change="
                      popup.memberAccountTopUpAdd.fn.axqEmployedLaborerChangeHandler
                    "
                  ></options-selector>
                </div>
              </div>
              <div class="f-item">
                <div class="i-label">
                  <span class="required">上传凭证:</span>
                </div>
                <div class="i-value">
                  <file-uploader
                    :max="5"
                    @change="
                      (e) => {
                        popup.memberAccountTopUpAdd.attr.type2form[2].data.transferData.fileJson = e;
                      }
                    "
                  ></file-uploader>
                </div>
              </div>
            </template>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.memberAccountTopUpAdd.attr.type2form[2].data.remark"
                >
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <div
          class="a-box a-box_history"
          v-if="popup.memberAccountTopUpAdd.attr.tab === 2"
        >
          <div class="h-list">
            <el-table
              :data="popup.memberAccountTopUpAdd.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="充值金额">
                <template slot-scope="props">
                  <p>{{ props.row.amount }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="topUpType" label="充值方式">
                <template slot-scope="props">
                  <p>
                    {{ { 1: "现金", 2: "销售奖励", 3: "转账" }[props.row.topUpType] }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="提交人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="props">
                  <p>{{ { 1: "审核中", 2: "已通过", 3: "未通过" }[props.row.status] }}</p>
                </template>
              </el-table-column>
              <el-table-column label="申请时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.memberAccountTopUpAdd.attr.tab === 2">
        共
        <em>{{ popup.memberAccountTopUpAdd.attr.history.total }}条</em>
      </p>
      <el-pagination
        background
        v-if="popup.memberAccountTopUpAdd.attr.tab === 2"
        layout="prev, pager, next"
        :total="popup.memberAccountTopUpAdd.attr.history.total"
        slot="footer-right"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberBalanceChangeLog"
      :title="popup.memberBalanceChangeLog.attr.form.type === 6?'傲雪棋余额明细':'思雪余额明细'"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-balance-change-log">
        <div class="l-tab">
          当前余额：{{
            popup.memberBalanceChangeLog.attr.form.type === 6
              ? infoGet("info.memberAccount.balance", 0)
              : infoGet("info.memberAccount.sixueBalance", 0)
          }}元
        </div>
        <div class="l-box l-box_history">
          <div class="b-list">
            <el-table
              :data="popup.memberBalanceChangeLog.attr.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="变更类型" width="250">
                <template slot-scope="props">
                  <p v-if="props.row.triggerType === 31">
                    充值-{{
                      blankGet(props, "row.memberAccountTopUp.paymentType")
                        | playmentTypeFilter
                    }}：{{ blankGet(props, "row.memberAccountTopUp.transitionSn") }}
                  </p>
                  <p v-if="props.row.triggerType === 32">
                    转让-{{
                      blankGet(props, "row.memberBalanceTransfer.recipientNickname")
                    }}/{{ blankGet(props, "row.memberBalanceTransfer.recipientMobile") }}
                  </p>
                  <p v-if="props.row.triggerType === 33">
                    受让-{{ blankGet(props, "row.memberBalanceTransfer.nickname") }}/{{
                      blankGet(props, "row.memberBalanceTransfer.mobile")
                    }}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 34">
                    {{ props.row.value > 0 ? "转存" : "消费" }}-{{
                      entitys.Purchanse.filter("type", props.row.purchanse.type)
                    }}：{{ blankGet(props, "row.purchanse.sn") }}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 35">
                    {{ props.row.value > 0 ? "转存" : "消费" }}-袋子费：{{
                      blankGet(props, "row.revertForm.sn")
                    }}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 36">
                    转存-调换货订单：{{ blankGet(props, "row.revertForm.sn") }}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 37">
                    转存-异常/废弃订单:{{
                      blankGet(props, "row.approvalSubCancelPurchanse.purchanseSn")
                    }}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 38">退回</p>
                  <p v-if="props.row.triggerType === 39">修改</p>
                  <p class="l-name" v-if="props.row.triggerType === 40">
                    充值{{({ 1: "现金", 2: "销售奖励", 3: "转账" })[$_.get(props,"row.approvalSubDistributorBalanceChange.topUpType")]}}
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 41">
                    转让
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 42">
                    退款
                  </p>
                  <p class="l-name" v-if="props.row.triggerType === 43">
                    开拓奖励
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="变更金额">
                <template slot-scope="props">
                  <p :class="props.row.value > 0 ? 'add' : 'decrease'">
                    {{ props.row.value > 0 ? "+" + props.row.value : props.row.value }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="剩余金额">
                <template slot-scope="props">
                  <p v-if="popup.memberBalanceChangeLog.attr.form.type === 6">
                    {{ blankGet(props, "row.newJson", {}) | nowBalanceFilter }}
                  </p>
                  <p v-else>
                    {{ blankGet(props, "row.newJson", {}) | nowSixueBalanceFilter }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="时间" width="100">
                <template slot-scope="props">
                  <p>{{ blankGet(props, "row.createTime") }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left">
        共
        <em>{{ popup.memberBalanceChangeLog.attr.total }}条</em>
      </p>
      <template slot="footer-right">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="popup.memberBalanceChangeLog.attr.total"
          @current-change="popup.memberBalanceChangeLog.fn.historyPageChangeHandler"
        ></el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmApprovalSubAchieveTransferAdd"
      title="转让代理业绩申请"
      :confirm-disabled="!isDistributor"
      :config="{ width: 900, height: 500 }"
    >
      <div class="popup-confirm_approval-sub-achieve-transfer-add">
        <div class="t-tab">
          <div
            class="t-item"
            :class="{
              't-item-active': popup.approvalSubAchieveTransferAdd.attr.tab === 1,
            }"
            @click="popup.approvalSubAchieveTransferAdd.attr.tab = 1"
          >
            <span>添加</span>
          </div>
          <div
            class="t-item"
            :class="{
              't-item-active': popup.approvalSubAchieveTransferAdd.attr.tab === 2,
            }"
            @click="popup.approvalSubAchieveTransferAdd.attr.tab = 2"
          >
            <span>转让记录</span>
          </div>
        </div>
        <div
          class="t-box t-box_field"
          v-if="popup.approvalSubAchieveTransferAdd.attr.tab === 1"
        >
          <grid :col="2" title="转让方">
            <grid-item label="姓名：">
              <span>{{ infoGet("info.nickname") }}</span>
            </grid-item>
            <grid-item label="业绩时间：">
              <time-picker
                type="month"
                @change="popup.approvalSubAchieveTransferAdd.fn.giveTimeChangeHandler"
              >
              </time-picker>
            </grid-item>
            <grid-item label="业绩：">
              <el-input
                type="number"
                v-model="
                  popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer
                    .value.integral.value
                "
                width="100"
                :max="popup.approvalSubAchieveTransferAdd.attr.validAchieve"
              ></el-input>
              <span
                >当前最大转让积分：{{
                  popup.approvalSubAchieveTransferAdd.attr.validAchieve
                }}</span
              >
            </grid-item>
          </grid>
          <grid :col="2" title="接收方">
            <grid-item label="姓名：">
              <options-selector
                :mode="4"
                placeholder="职员/手机号"
                :config="{ req: popup.approvalSubAchieveTransferAdd.fn.distributorQuery }"
                @change="popup.approvalSubAchieveTransferAdd.fn.distributorChangeHandler"
              ></options-selector>
            </grid-item>
            <grid-item label="业绩时间：">
              <time-picker
                type="month"
                @change="popup.approvalSubAchieveTransferAdd.fn.achieveTimeChangeHandler"
              >
              </time-picker>
            </grid-item>
          </grid>
          <grid title="备注">
            <el-input
              slot="noGrid"
              type="textarea"
              v-model="
                popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer
                  .value.remark.value
              "
            >
            </el-input>
          </grid>
        </div>
        <div
          class="t-box t-box_history"
          v-if="popup.approvalSubAchieveTransferAdd.attr.tab === 2"
        >
          <div class="h-list">
            <el-table
              :data="popup.approvalSubAchieveTransferAdd.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column label="接收店主">
                <template slot-scope="props">
                  <p>{{ props.row.recipientName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="props">
                  <p>{{ entitys.Approval.filter("status", props.row.status) }}</p>
                </template>
              </el-table-column>
              <el-table-column label="转让业绩">
                <template slot-scope="props">
                  <p>{{ props.row.integral }}</p>
                </template>
              </el-table-column>
              <el-table-column label="业绩时间">
                <template slot-scope="props">
                  <p>{{ props.row.achieveTime | timeFormat("YYYY-MM") }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="制单人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="提交时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.approvalSubAchieveTransferAdd.attr.tab === 2">
        共
        <em>{{ popup.approvalSubAchieveTransferAdd.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next , jumper"
        :total="popup.approvalSubAchieveTransferAdd.attr.history.total"
        @current-change="popup.approvalSubAchieveTransferAdd.fn.historyPageChangeHandler"
        slot="footer-right"
        v-if="popup.approvalSubAchieveTransferAdd.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberAchieveUpdate"
      title="代理业绩修改"
      :confirm-disabled="!isDistributor"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-achieve-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAchieveUpdate.attr.tab === 1 }"
            @click="popup.memberAchieveUpdate.attr.tab = 1"
          >
            <span>修改</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.memberAchieveUpdate.attr.tab === 2 }"
            @click="popup.memberAchieveUpdate.attr.tab = 2"
          >
            <span>修改记录</span>
          </div>
        </div>
        <div class="u-box u-box_field" v-if="popup.memberAchieveUpdate.attr.tab === 1">
          <div class="f-item">
            <div class="i-label">
              <span>业绩时间：</span>
            </div>
            <div class="i-value">
              <time-picker
                type="month"
                @change="popup.memberAchieveUpdate.fn.timeChangeHandler"
              ></time-picker>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>修改业绩：</span>
            </div>
            <div class="i-value">
              <el-input
                type="number"
                placeholder="输入修改后业绩"
                v-model="popup.memberAchieveUpdate.attr.form.data.value"
              >
              </el-input>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.memberAchieveUpdate.attr.form.data.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="u-box u-box_history" v-if="popup.memberAchieveUpdate.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.memberAchieveUpdate.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
                </template>
              </el-table-column>
              <el-table-column label="业绩时间">
                <template slot-scope="props">
                  <p>{{ props.row.year + "/" + props.row.month }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改前">
                <template slot-scope="props">
                  <p>{{ props.row.valueOld }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改后">
                <template slot-scope="props">
                  <p>{{ props.row.valueNew }}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column label="修改时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.memberAchieveUpdate.attr.tab === 2">
        共
        <em>{{ popup.memberAchieveUpdate.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="popup.memberAchieveUpdate.attr.history.total"
        slot="footer-right"
        @current-change="popup.memberAchieveUpdate.fn.historyPageChangeHandler"
        v-if="popup.memberAchieveUpdate.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberAchieveList"
      title="代理业绩查询"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-achieve-list">
        <div class="l-query">
          <span>选择年份：</span>
          <time-picker
            type="year"
            @change="popup.memberAchieveList.fn.timeChangeHandler"
          ></time-picker>
        </div>
        <div class="l-main">
          <elastic-table
            :table-data="popup.memberAchieveList.attr.list"
            :table-height="350"
          >
            <el-table-column label="年">
              <template slot-scope="props">
                <p>{{ props.row.year }}</p>
              </template>
            </el-table-column>
            <el-table-column label="月">
              <template slot-scope="props">
                <p>{{ props.row.month }}</p>
              </template>
            </el-table-column>
            <el-table-column label="积分">
              <template slot-scope="props">
                <p>{{ props.row.integral }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="props">
                <el-button
                  size="mini"
                  type="primary"
                  @click="
                    $refs.popupConfirmMemberAchieveChangeLog.open({
                      triggerOpen: popup.memberAchieveChangeLog.fn.openHandler,
                      triggerClose: popup.memberAchieveChangeLog.fn.closeHandler,
                      params: props.row,
                    })
                  "
                  >查看</el-button
                >
              </template>
            </el-table-column>
          </elastic-table>
        </div>
      </div>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberAchieveChangeLog"
      title="业绩详情"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-achieve-change-log">
        <div class="l-tab">
          {{ popup.memberAchieveChangeLog.attr.year }}年{{
            popup.memberAchieveChangeLog.attr.month
          }}月业绩：{{ popup.memberAchieveChangeLog.attr.integral }}
        </div>
        <div class="l-box l-box_history">
          <div class="b-list">
            <el-table
              :data="popup.memberAchieveChangeLog.attr.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="变更类型" width="250">
                <template slot-scope="props">
                  <p v-if="props.row.type === 1">
                    {{ entitys.Purchanse.filter("type", props.row.purchanse.type) }}：{{
                      blankGet(props, "row.purchanse.sn")
                    }}
                  </p>
                  <p v-if="props.row.type === 2">
                    转让-{{
                      blankGet(props, "row.approvalSubAchieveTransfer.recipientNickname")
                    }}/{{
                      blankGet(props, "row.approvalSubAchieveTransfer.recipientMobile")
                    }}
                  </p>
                  <p v-if="props.row.type === 3">
                    受让-{{
                      blankGet(props, "row.approvalSubAchieveTransfer.nickname")
                    }}/{{ blankGet(props, "row.approvalSubAchieveTransfer.mobile") }}
                  </p>
                  <p v-if="props.row.type === 4">修改</p>
                </template>
              </el-table-column>
              <el-table-column label="业绩">
                <template slot-scope="props">
                  <p :class="props.row.value > 0 ? 'add' : 'decrease'">
                    {{ props.row.value > 0 ? "+" + props.row.value : props.row.value }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="时间">
                <template slot-scope="props">
                  <p>{{ blankGet(props, "row.createTime") }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left">
        共
        <em>{{ popup.memberAchieveChangeLog.attr.total }}条</em>
      </p>
      <template slot="footer-right">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="popup.memberAchieveChangeLog.attr.total"
          @current-change="popup.memberAchieveChangeLog.fn.historyPageChangeHandler"
        ></el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmBalanceTransferAdd"
      :title="
        popup.balanceTransferAdd.attr.form.balanceType === 1 ? '余额转让' : '思雪余额转让'
      "
      :confirm-disabled="!isDistributor"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_balance-transfer-add">
        <div class="t-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.balanceTransferAdd.attr.tab === 1 }"
            @click="popup.balanceTransferAdd.attr.tab = 1"
          >
            <span>添加</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.balanceTransferAdd.attr.tab === 2 }"
            @click="popup.balanceTransferAdd.attr.tab = 2"
          >
            <span>转让记录</span>
          </div>
        </div>
        <div class="t-box t-box_field" v-if="popup.balanceTransferAdd.attr.tab === 1">
          <div class="f-item">
            <div class="i-label">
              <span>转让店主：</span>
            </div>
            <div class="i-value">
              <span>{{ infoGet("info.nickname")+'/'+infoGet("info.id") }}</span>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">接收店主:</span>
            </div>
            <div class="i-value">
              <options-selector
                :mode="4"
                placeholder="姓名/ID"
                :config="{ req: popup.balanceTransferAdd.fn.distributorQuery }"
                @change="popup.balanceTransferAdd.fn.distributorChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span class="required">转让金额:</span>
            </div>
            <div class="i-value">
              <el-input
                type="text"
                v-model="popup.balanceTransferAdd.attr.form.amount"
                width="100"
                oninput="this.value = (this.value.match(/^(0|[1-9]\d*)(\.\d{0,2})?/) || [''])[0]"
              ></el-input>
              <p>
                当前最大转让金额：{{
                  popup.balanceTransferAdd.attr.form.balanceType === 1
                    ? infoGet("info.memberAccount.balance", 0)
                    : infoGet("info.memberAccount.sixueBalance", 0)
                }}
              </p>
            </div>
          </div>
          <div class="f-item">
            <div class="i-label">
              <span>备注：</span>
            </div>
            <div class="i-value">
              <el-input
                type="textarea"
                v-model="popup.balanceTransferAdd.attr.form.remark"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="t-box t-box_history" v-if="popup.balanceTransferAdd.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.balanceTransferAdd.attr.history.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="转让店主">
                <template slot-scope="props">
                  <p>{{ props.row.distributorName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="接收店主">
                <template slot-scope="props">
                  <p>{{ props.row.receiverName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="转让余额">
                <template slot-scope="props">
                  <p>{{ props.row.amount }}</p>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="提交人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="状态">
                <template slot-scope="props">
                  <p>{{ { 1: "审核中", 2: "已通过", 3: "未通过" }[props.row.status] }}</p>
                </template>
              </el-table-column>
              <el-table-column label="申请时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left" v-if="popup.balanceTransferAdd.attr.tab === 2">
        共
        <em>{{ popup.balanceTransferAdd.attr.history.total }}记录</em>
      </p>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="popup.balanceTransferAdd.attr.history.total"
        @current-change="popup.balanceTransferAdd.fn.historyPageChangeHandler"
        slot="footer-right"
        v-if="popup.balanceTransferAdd.attr.tab === 2"
      ></el-pagination>
    </popup-confirm>
    <popup-confirm
      ref="popupConfirmMemberWalletDetail"
      title="钱包明细"
      :config="{ width: 700, height: 500 }"
    >
      <div class="popup-confirm_member-Wallet-fetail-log">
        <div class="l-box l-box_history">
          <div class="b-list">
            <el-table
              :data="popup.popupConfirmMemberWalletDetail.attr.list"
              stripe
              style="width: 100%"
            >
              <el-table-column label="订单编号">
                <template slot-scope="props">
                  {{ blankGet(props, "row.purchanse.sn") }}
                </template>
              </el-table-column>
              <el-table-column label="业绩积分">
                <template slot-scope="props">
                  {{ blankGet(props, "row.purchanse.integralAchieveGive") }}
                </template>
              </el-table-column>
              <el-table-column label="金额">
                <template slot-scope="props">
                  {{ blankGet(props, "row.value") }}
                </template>
              </el-table-column>
              <el-table-column label="申请时间">
                <template slot-scope="props">
                  {{ blankGet(props, "row.purchanse.createTime") }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <p slot="footer-left">
        共
        <em>{{ popup.popupConfirmMemberWalletDetail.attr.total }}条</em>
      </p>
      <template slot="footer-right">
        <el-pagination
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="popup.popupConfirmMemberWalletDetail.attr.total"
          @current-change="
            popup.popupConfirmMemberWalletDetail.fn.historyPageChangeHandler
          "
        ></el-pagination>
      </template>
    </popup-confirm>
    <popup-confirm  
      ref="popupConfirmMemberTransferMoney"
      title="余额划转"
      :config="{ width: 700, height: 500 }">
        <div class="popup-confirm_member-account-update">
        <div class="u-tab">
          <div
            class="t-item"
            :class="{ 't-item-active': popup.popupConfirmMemberTransferMoney.attr.tab === 1 }"
            @click="popup.popupConfirmMemberTransferMoney.attr.tab = 1"
          >
            <span>划转申请</span>
          </div>
          <div
            class="t-item"
            :class="{ 't-item-active': popup.popupConfirmMemberTransferMoney.attr.tab === 2 }"
            @click="popup.popupConfirmMemberTransferMoney.attr.tab = 2"
          >
            <span>申请记录</span>
          </div>
        </div>
        <template
          v-if="
            popup.popupConfirmMemberTransferMoney.attr.tab === 1
          "
        >
          <div class="u-box u-box_field">
            <div class="f-item">
              <div class="i-label">
                <span>接收店主：{{infoGet('info.distributor.nickname')}}</span>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>划转余额：￥{{infoGet("info.memberAccount.balanceNewDistributor", 0)
                    | amountFormat(2, ",")}}元</span>
              </div>
            </div>
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input
                  type="textarea"
                  v-model="popup.popupConfirmMemberTransferMoney.attr.remark"
                ></el-input>
              </div>
            </div>
            <div class="promps">注意：请确认上级店主信息是否正确；接收店主为上级店主！</div>
          </div>
        </template>
        <div class="u-box u-box_history" v-if="popup.popupConfirmMemberTransferMoney.attr.tab === 2">
          <div class="h-list">
            <el-table
              :data="popup.popupConfirmMemberTransferMoney.attr.list"
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="接收店主">
                <template slot-scope="props">
                  <p>{{ props.row.receiverName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="金额">
                <template slot-scope="props">
                  <p>{{ props.row.amount }}</p>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="props">
                  <p>{{ props.row.remark || '无' }}</p>
                </template>
              </el-table-column>
              <el-table-column label="提交人">
                <template slot-scope="props">
                  <p>{{ props.row.operatorName }}</p>
                </template>
              </el-table-column>
              <el-table-column label="审核状态">
                <template slot-scope="props">
                  <p>{{ props.row.status===1?'在审核':props.row.status===2?'已通过':'不通过' }}</p>
                </template>
              </el-table-column>
              <el-table-column label="申请时间">
                <template slot-scope="props">
                  <p>{{ props.row.createTime }}</p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <template v-if="popup.popupConfirmMemberTransferMoney.attr.tab === 2">
        <p slot="footer-left">
          共
          <em>{{ popup.popupConfirmMemberTransferMoney.attr.total }}条记录</em>
        </p>
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="popup.popupConfirmMemberTransferMoney.attr.total"
          @current-change="popup.popupConfirmMemberTransferMoney.fn.historyPageChangeHandler"
          slot="footer-right"
        ></el-pagination>
      </template>
    </popup-confirm>
  </div>
</template>

<script>
import infoMixin from "@/mixins/type/info";
import popupConfirm from "@/components/popup/type/confirm";
import optionsSelector from "@/components/options-selector";
import formValidate from "@/components/form-validate";
import formValidateField from "@/components/form-validate/field";
import switchSelector from "@/components/switch-selector";
import { formToolkit } from "@/model/form-toolkit";
import grid from "@/components/grid";
import gridItem from "@/components/grid/item";
import cellGroup from "@/components/cell/group";
import cellItem from "@/components/cell/item";
import timePicker from "@/components/time-picker";
import elasticTable from "@/components/elastic-table";
import fileUploader from "@/components/file-uploader";
import imgVideoPreviewer from '@/components/img-video-previewer';
import { model } from "@/model";

const {
  Member,
  MemberAchieve,
  MemberAchieveUpdateLog,
  Shop,
  AxqStaff,
  AxqSelfEmployedLaborer,
  Approval,
  ApprovalSubDistributorBalanceChange,
  ApprovalSubAchieveTransfer,
  GoodsSeries,
  Purchanse,
} = model.collection;
export default {
  components: {
    popupConfirm,
    optionsSelector,
    formValidate,
    formValidateField,
    switchSelector,
    grid,
    gridItem,
    cellGroup,
    cellItem,
    timePicker,
    elasticTable,
    fileUploader,
    imgVideoPreviewer
  },
  mixins: [infoMixin],
  data() {
    return {
      info: {
        config: {
          entity: "Member",
          action: "info",
          noConvert2Entity: true,
        },
        result: {},
      },
      entitys: {
        Member,
        Shop,
        Approval,
        Purchanse,
      },
      popup: {
        memberUpdate: {
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
                  type: 1,
                  levelId: 1,
                  remark: "",
                },
              },
              4: {
                params: {
                  id: this.$route.params.id,
                  type: 4,
                },
                data: {
                  value: 0,
                  remark: "",
                },
              },
              13: {
                params: {
                  id: this.$route.params.id,
                  type: 13,
                },
                data: {
                  value: 0,
                  remark: "",
                },
              },
              15: {
                params: {
                  id: this.$route.params.id,
                  type: 15,
                },
                data: {
                  value: "",
                  remark: "",
                },
              },
              17: {
                params: {
                  id: this.$route.params.id,
                  type: 17,
                },
                data: {
                  value: 0,
                  remark: "",
                },
              },
              22: {
                params: {
                  id: this.$route.params.id,
                  type: 22,
                },
                data: {
                  value: 0,
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
              for (let i in this.popup.memberUpdate.attr.type2form) {
                i = Number(i);
                if (i === 1) {
                  this.popup.memberUpdate.attr.type2form[i].data.value = this.infoGet(
                    "info.mobile"
                  );
                }
                if (i === 2) {
                  this.popup.memberUpdate.attr.type2form[i].data.type = this.infoGet(
                    "info.type"
                  );
                  this.popup.memberUpdate.attr.type2form[i].data.levelId = this.infoGet(
                    "info.levelId"
                  );
                }
              }
            },
            getUpdateHistory: () => {
              Member.sendApi("updateLogPage", {
                params: this.popup.memberUpdate.attr.history.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                    type: this.popup.memberUpdate.attr.type,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberUpdate.attr.history.list = data;
                  this.popup.memberUpdate.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "获取会员信息更新失败",
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
                  new: newObj.mobile,
                  old: oldObj.mobile,
                };
              }
              if (type === 2) {
                return {
                  new: this.entitys.Member.filter("type", newObj.type),
                  old: this.entitys.Member.filter("type", oldObj.type),
                };
              }
              if (type === 4) {
                return {
                  new: this.$_.get(newObj, "customerService.nickname"),
                  old: this.$_.get(oldObj, "customerService.nickname"),
                };
              }
              if (type === 13) {
                return {
                  new: this.$_.get(newObj, "teamLeaderId"),
                  old: this.$_.get(oldObj, "teamLeaderId"),
                };
              }
              if (type === 15) {
                return {
                  new: this.$_.get(newObj, "nickname"),
                  old: this.$_.get(oldObj, "nickname"),
                };
              }
              if (type === 17) {
                return {
                  new: this.$_.get(newObj, "liveRecordSizeLimit"),
                  old: this.$_.get(oldObj, "liveRecordSizeLimit"),
                };
              }

              if (type === 22) {
                return {
                  new: this.$_.get(newObj, "shopId"),
                  old: this.$_.get(oldObj, "shopId"),
                };
              }
            },
            regionChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map((i) => i.id);
              const [provinceName, cityName, districtName] = e.map((i) => i._raw.name);
              this.popup.memberUpdate.attr.type2form[3].data.provinceId = provinceId;
              this.popup.memberUpdate.attr.type2form[3].data.provinceName = provinceName;
              this.popup.memberUpdate.attr.type2form[3].data.cityId = cityId;
              this.popup.memberUpdate.attr.type2form[3].data.cityName = cityName;
              this.popup.memberUpdate.attr.type2form[3].data.districtId = districtId;
              this.popup.memberUpdate.attr.type2form[3].data.districtName = districtName;
            },
            teamLeaderQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                    isTeamLeader: true,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: i.nickname,
                  }))
                );
              });
            },
            teamLeaderChangeHandler: (i, e) => {
              this.popup.memberUpdate.attr.type2form[i].data.value = e;
            },
            transferShopMemberQuery: (e, ok) => {
              Shop.sendApi("page", {
                params: {},
                data: {
                  query: {
                    memberId: this.infoGet("info.distributorPId"),
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: i.name,
                  }))
                );
              });
            },
            transferShopMemberChangeHandler: (i, e) => {
              this.popup.memberUpdate.attr.type2form[i].data.value = e;
            },
            axqStaffQuery: (e, ok) => {
              AxqStaff.sendApi("staffPage", {
                params: {},
                data: {
                  query: {
                    keyword: e,
                  },
                },
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: i.nickname,
                  }))
                );
              });
            },
            axqStaffChangeHandler: (i, e) => {
              this.popup.memberUpdate.attr.type2form[i].data.value = e;
            },
            openHandler: (ok, params) => {
              const { title, type } = params;
              this.popup.memberUpdate.attr.title = title;
              this.popup.memberUpdate.attr.type = type;
              this.popup.memberUpdate.fn.fill();
              this.popup.memberUpdate.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              Member.sendApi(
                "updateSingleField",
                this.popup.memberUpdate.attr.type2form[this.popup.memberUpdate.attr.type]
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: "会员信息更新成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  error();
                  this.$message({
                    message: "会员信息更新失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        memberChainBlacklist: {
          attr: {
            form: {
              memberId: "",
              blackId: "",
            },
          },
          fn: {
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
            closeHandler: (ok, error) => {
              this.popup.memberChainBlacklist.attr.form.memberId = this.infoGet(
                "info.id"
              );
              if (!this.popup.memberChainBlacklist.attr.form.blackId) {
                this.$message.warning("请选择拉黑用户");
                error();
                return;
              }
              Member.sendApi("chainBlacklistAdd", {
                params: {},
                data: this.popup.memberChainBlacklist.attr.form,
              }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.$message.success("添加成功");
                  this._boot();
                  ok();
                } else {
                  error();
                  this.$message.error("添加关系链黑名单失败");
                }
              });
            },
            delete: (row) => {
              this.$confirm("删除该授权用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  Member.sendApi("chainBlacklistDelete", {
                    params: {
                      id: row.id,
                    },
                    data: {},
                  }).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      this.$message.success("删除成功");
                      this._boot();
                    } else {
                      this.$message.error("删除关系链黑名单失败");
                    }
                  });
                })
                .catch(() => {});
            },
            hiddenHandler: () => {
              this.popup.memberChainBlacklist.attr.form = {
                memberId: "",
                blackId: "",
              };
            },
            hiddenHandler: () => {
              this.popup.memberChainBlacklist.attr.form = {
                memberId: "",
                blackId: "",
              };
            },
          },
        },
        memberLoginAuthorize: {
          attr: {
            form: {
              memberId: "",
              authorizeMemberId: "",
            },
          },
          fn: {
            distributorQuery: (e, ok) => {
              Member.sendApi("page", {
                params: {},
                data: {
                  query: {
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
            closeHandler: (ok, error) => {
              this.popup.memberLoginAuthorize.attr.form.memberId = this.infoGet(
                "info.id"
              );
              if (!this.popup.memberLoginAuthorize.attr.form.authorizeMemberId) {
                this.$message.warning("请选择授权用户");
                error();
                return;
              }
              Member.sendApi("loginAuthorizeAdd", {
                params: {},
                data: this.popup.memberLoginAuthorize.attr.form,
              }).then((res) => {
                const { status, data } = res;
                if (status) {
                  this.$message.success("添加成功");
                  this._boot();
                  ok();
                } else {
                  error();
                  this.$message.error("添加授权用户失败");
                }
              });
            },
            delete: (row) => {
              this.$confirm("删除该授权用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  Member.sendApi("loginAuthorizeDelete", {
                    params: {
                      id: row.id,
                    },
                    data: {},
                  }).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      this.$message.success("删除成功");
                      this._boot();
                    } else {
                      this.$message.error("删除授权用户失败");
                    }
                  });
                })
                .catch(() => {});
            },
            hiddenHandler: () => {
              this.popup.memberLoginAuthorize.attr.form = {
                memberId: "",
                authorizeMemberId: "",
              };
            },
            hiddenHandler: () => {
              this.popup.memberLoginAuthorize.attr.form = {
                memberId: "",
                authorizeMemberId: "",
              };
            },
          },
        },
        memberAccountUpdate: {
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
              for (let i in this.popup.memberAccountUpdate.attr.type2form) {
                i = Number(i);
                if (i === 1) {
                  this.popup.memberAccountUpdate.attr.type2form[
                    i
                  ].data.value = this.infoGet("info.memberAccount.balance", 0);
                }
                if (i === 2) {
                  this.popup.memberAccountUpdate.attr.type2form[
                    i
                  ].data.value = this.infoGet("info.memberAccount.sixueBalance", 0);
                }
              }
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberAccountUpdate.attr.history.params.pageIndex = pageIndex;
              this.popup.memberAccountUpdate.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Member.sendApi("accountUpdateLogPage", {
                params: this.popup.memberAccountUpdate.attr.history.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                    type: this.popup.memberAccountUpdate.attr.type,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberAccountUpdate.attr.history.list = data;
                  this.popup.memberAccountUpdate.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "会员账户信息更新记录获取失败",
                    type: "error",
                  });
                }
              });
            },
            openHandler: (ok, params) => {
              const { title, type } = params;
              this.popup.memberAccountUpdate.attr.title = title;
              this.popup.memberAccountUpdate.attr.type = type;
              this.popup.memberAccountUpdate.fn.fill();
              this.popup.memberAccountUpdate.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              Member.sendApi(
                "accountUpdate",
                this.popup.memberAccountUpdate.attr.type2form[
                  this.popup.memberAccountUpdate.attr.type
                ]
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: "会员账户更新成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  error();
                  this.$message({
                    message: "会员账户更新失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        approvalSubDistributorBalanceChangeAdd: {
          attr: {
            title: "",
            tab: 1,
            balanceType: 1,
            form: (() => {
              const f1 = Approval.formUtil().generator(
                "add",
                "approvalSubDistributorBalanceChange"
              );
              const f2 = ApprovalSubDistributorBalanceChange.formUtil().generator(
                "add",
                "default"
              );
              f1.approvalSubDistributorBalanceChange.value = f2;
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
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.history.params.pageIndex = pageIndex;
              this.popup.approvalSubDistributorBalanceChangeAdd.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.approvalSubDistributorBalanceChangeAdd.attr.history
                  .params,
                data: {
                  query: {
                    distributorId: this.$route.params.id,
                    typeId: 11,
                    type: 3,
                    balanceType: this.popup.approvalSubDistributorBalanceChangeAdd.attr.balanceType,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.approvalSubDistributorBalanceChangeAdd.attr.history.list = data;
                  this.popup.approvalSubDistributorBalanceChangeAdd.attr.history.total =
                    page.total;
                } else {
                  this.$message({
                    message: "获取会员余额退回记录失败",
                    type: "error",
                  });
                }
              });
            },
            openHandler: (ok, params) => {
              const { type, title } = params;
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.form.approvalSubDistributorBalanceChange.value.distributorId.value = Number(
                this.$route.params.id
              );
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.form.approvalSubDistributorBalanceChange.value.balanceType.value = type;
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.balanceType = type;
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.title = title;
              this.popup.approvalSubDistributorBalanceChangeAdd.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (okCallbak, errorCallback) => {
              const { ok, form } = formToolkit.validate(
                this.popup.approvalSubDistributorBalanceChangeAdd.attr.form
              );
              form.approvalSubDistributorBalanceChange.type = 3;
              if(
                !form.approvalSubDistributorBalanceChange.returnData.account || 
                !form.approvalSubDistributorBalanceChange.returnData.accountOpen || 
                !form.approvalSubDistributorBalanceChange.returnData.accountOwner
              ){
                errorCallback();
                this.$message.warning("请校验输入信息");
                return
              }
              if (ok) {
                Approval.sendApi("add", {
                  params: {},
                  data: form,
                }).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    okCallbak();
                    this.$message({
                      message: "余额退回申请提交成功",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: "余额退回申请提交失败",
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
            },
            hiddenHandler: () => {
              this.popup.approvalSubDistributorBalanceChangeAdd.attr.form = (() => {
                const f1 = Approval.formUtil().generator(
                  "add",
                  "approvalSubDistributorBalanceChange"
                );
                const f2 = ApprovalSubDistributorBalanceChange.formUtil().generator(
                  "add",
                  "default"
                );
                f1.approvalSubDistributorBalanceChange.value = f2;
                return f1;
              })();
            },
          },
        },
        memberAccountTopUpAdd: {
          attr: {
            title: "",
            balanceType: 1,
            tab: 1,
            paymentTypeList: [
              {
                topUpType: 1,
                label: "现金",
              },
              {
                topUpType: 2,
                label: "销售奖励",
              },
              {
                topUpType: 3,
                label: "转账",
              },
            ],
            type2form: {
              1: {
                data: {
                  balanceType: 1,
                  distributorId: this.$route.params.id,
                  topUpType: 1,
                  amount: 0,
                  type: 1,
                  transferData: {
                    axqSelfEmployedLaborerId: null,
                    axqSelfEmployedLaborerName: null,
                    fileJson: "",
                    time: "",
                  },
                  remark: "",
                },
              },
              2: {
                data: {
                  balanceType: 2,
                  distributorId: this.$route.params.id,
                  topUpType: 1,
                  type: 1,
                  amount: 0,
                  transferData: {
                    axqSelfEmployedLaborerId: null,
                    axqSelfEmployedLaborerName: null,
                    fileJson: "",
                    time: "",
                  },
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
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberAccountTopUpAdd.attr.history.params.pageIndex = pageIndex;
              this.popup.memberAccountTopUpAdd.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.memberAccountTopUpAdd.attr.history.params,
                data: {
                  query: {
                    distributorId: this.$route.params.id,
                    typeId: 11,
                    type: 1,
                    balanceType: this.popup.memberAccountTopUpAdd.attr.balanceType,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberAccountTopUpAdd.attr.history.list = data;
                  this.popup.memberAccountTopUpAdd.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "会员账户充值记录获取失败",
                    type: "error",
                  });
                }
              });
            },
            axqEmployedLaborerQuery: (ok) => {
              AxqSelfEmployedLaborer.sendApi("selfEmployedLaborerPage", {
                params: {},
                data: {
                  query: {
                    keyword: "",
                  },
                },
              }).then((res) => {
                const { data } = res;
                this.popup.memberAccountTopUpAdd.selfEmployedLaborerPage = data.map(
                  (i) => ({
                    value: i.id,
                    label: i.name,
                  })
                );
                ok(this.popup.memberAccountTopUpAdd.selfEmployedLaborerPage);
              });
            },
            axqEmployedLaborerChangeHandler: (e) => {
              let item = this.popup.memberAccountTopUpAdd.selfEmployedLaborerPage.find(
                (item) => {
                  return item.value === e;
                }
              );
              let transferData = this.popup.memberAccountTopUpAdd.attr.type2form[
                this.popup.memberAccountTopUpAdd.attr.balanceType
              ].data.transferData;
              transferData.axqSelfEmployedLaborerId = item?.value;
              transferData.axqSelfEmployedLaborerName = item?.label;
            },
            openHandler: (ok, params) => {
              const { title, type } = params;
              this.popup.memberAccountTopUpAdd.attr.title = title;
              this.popup.memberAccountTopUpAdd.attr.balanceType = type;
              this.popup.memberAccountTopUpAdd.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              let type = this.popup.memberAccountTopUpAdd.attr.balanceType;
              let form = this.popup.memberAccountTopUpAdd.attr.type2form[type];

              if (!Number(form.data.amount)) {
                error();
                this.$message({
                  message: "充值金额必须大于0",
                  type: "warning",
                });
                return;
              }

              if (
                this.popup.memberAccountTopUpAdd.attr.type2form[type].data.topUpType === 3
              ) {
                if (!form.data.transferData.time) {
                  error();
                  this.$message.warning("请校验输入信息");
                  return;
                }
                if (!form.data.transferData.axqSelfEmployedLaborerId) {
                  error();
                  this.$message.warning("请校验输入信息");
                  return;
                }
                if (!form.data.transferData.fileJson) {
                  error();
                  this.$message.warning("请校验输入信息");
                  return;
                }
                form.data.transferData.fileJson = JSON.parse(form.data.transferData.fileJson).map(item=>{
                  return JSON.stringify(item);
                });
              } else {
                delete form.data.transferData;
              }

              let approvalSubDistributorBalanceChange = form.data;
              form.data = {
                approvalSubDistributorBalanceChange,
                typeId: 11,
                options:'{\"ignoreWorkflowIds\":'+'\"'+42+'\"}',
              };

              Approval.sendApi(
                "add",
                this.popup.memberAccountTopUpAdd.attr.type2form[type]
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  ok();
                  this.$message({
                    message: "会员账户充值成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  error();
                  this.$message({
                    message: "会员账户充值失败",
                    type: "error",
                  });
                }
              });
            },
            hiddenHandler: () => {
              this.popup.memberAccountTopUpAdd.attr.type2form = {
                [this.popup.memberAccountTopUpAdd.attr.balanceType]: {
                  data: {
                    balanceType: 1,
                    distributorId: this.$route.params.id,
                    topUpType: 1,
                    type: 1,
                    amount: 0,
                    transferData: {
                      axqSelfEmployedLaborerId: null,
                      axqSelfEmployedLaborerName: null,
                      fileJson: '',
                      time: ''
                    },
                    remark: "",
                  },
                },
              };
            },
          },
        },
        memberBalanceChangeLog: {
          attr: {
            form: {
              type: 6,
            },
            total: 0,
            list: [],
            params: {
              pageIndex: 1,
              pageSize: 10,
            },
          },
          fn: {
            openHandler: (ok, params) => {
              this.popup.memberBalanceChangeLog.attr.form.type = params.type;
              this.popup.memberBalanceChangeLog.attr.params.pageIndex = 1;
              this.popup.memberBalanceChangeLog.fn.getBalanceChangeLog();
              ok();
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberBalanceChangeLog.attr.params.pageIndex = pageIndex;
              this.popup.memberBalanceChangeLog.fn.getBalanceChangeLog();
            },
            getBalanceChangeLog: () => {
              Member.sendApi("accountChangeLogPage", {
                params: this.popup.memberBalanceChangeLog.attr.params,
                data: {
                  query: {
                    type: this.popup.memberBalanceChangeLog.attr.form.type,
                    memberId: this.infoGet("info.id"),
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberBalanceChangeLog.attr.list = data;
                  this.popup.memberBalanceChangeLog.attr.total = page.total;
                }
              });
            },
          },
        },
        memberGoodsSeriesPrestoreInfo: {
          attr: {
            page: {
              total: 0,
              list: [],
              params: {
                pageIndex: 1,
                pageSize: 10,
              },
            },
          },
          fn: {
            openHandler: (ok) => {
              this.popup.memberGoodsSeriesPrestoreInfo.attr.page.params.pageIndex = 1;
              this.popup.memberGoodsSeriesPrestoreInfo.fn
                .getGoodsSeriesList()
                .then(() => {
                  ok();
                });
            },
            getGoodsSeriesList: () => {
              return GoodsSeries.sendApi(
                "seriesPage",
                {
                  params: this.popup.memberGoodsSeriesPrestoreInfo.attr.page.params,
                  data: {},
                },
                {
                  errorTip: "获取组合列表失败",
                }
              ).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberGoodsSeriesPrestoreInfo.attr.page.list = data.map(
                    (i) => {
                      const tar = this.$_.find(
                        this.infoGet("info.memberGoodsSeriesPrestoreList"),
                        (x) => {
                          return x.goodsSeries.id === i.id;
                        }
                      );
                      return {
                        id: tar ? tar.id : "",
                        goodsSeries: i,
                        quantity: tar ? tar.quantity : 0,
                        quantityFreeze: tar ? tar.quantityFreeze : 0,
                      };
                    }
                  );
                  this.popup.memberGoodsSeriesPrestoreInfo.attr.page.total = page.total;
                }
              });
            },
            pageChangeHandler: (pageIndex) => {
              this.popup.memberGoodsSeriesPrestoreInfo.attr.page.params.pageIndex = pageIndex;
              this.popup.memberGoodsSeriesPrestoreInfo.fn.getGoodsSeriesList();
            },
          },
        },
        memberGoodsSeriesPrestoreUpdate: {
          attr: {
            tab: 1,
            row: {
              goodsSeries: {},
            },
            form: {
              params: {
                goodsSeriesId: 0,
                memberId: Number(this.$route.params.id),
              },
              data: {
                value: 0,
                remark: "",
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
            openHandler: (ok, params) => {
              const { goodsSeries, quantity } = params;
              this.popup.memberGoodsSeriesPrestoreUpdate.attr.row = params;
              this.popup.memberGoodsSeriesPrestoreUpdate.attr.form.params.goodsSeriesId =
                goodsSeries.id;
              this.popup.memberGoodsSeriesPrestoreUpdate.attr.form.data.value = quantity;
              this.popup.memberGoodsSeriesPrestoreUpdate.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              Member.sendApi(
                "goodsSeriesPrestoreUpdate",
                this.popup.memberGoodsSeriesPrestoreUpdate.attr.form,
                {
                  errorTip: "更新代理组合失败",
                }
              ).then((res) => {
                const { status } = res;
                if (status) {
                  this.$message.success("更新成功");
                  ok();
                  this._boot().then(() => {
                    this.popup.memberGoodsSeriesPrestoreInfo.fn.getGoodsSeriesList();
                  });
                } else {
                  error();
                }
              });
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberGoodsSeriesPrestoreUpdate.attr.history.params.pageIndex = pageIndex;
              this.popup.memberGoodsSeriesPrestoreUpdate.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              const goodsSeriesId = this.popup.memberGoodsSeriesPrestoreUpdate.attr.form
                .params.goodsSeriesId;
              Member.sendApi("goodsSeriesPrestoreUpdateLogPage", {
                params: this.popup.memberGoodsSeriesPrestoreUpdate.attr.history.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                    goodsSeriesId,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberGoodsSeriesPrestoreUpdate.attr.history.list = data;
                  this.popup.memberGoodsSeriesPrestoreUpdate.attr.history.total =
                    page.total;
                  ok();
                } else {
                  this.$message({
                    message: "获取修改组合记录失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        memberGoodsSeriesPrestoreChangeLog: {
          attr: {
            row: {
              goodsSeries: {},
            },
            total: 0,
            list: [],
            params: {
              pageIndex: 1,
              pageSize: 10,
            },
          },
          fn: {
            openHandler: (ok, params) => {
              this.popup.memberGoodsSeriesPrestoreChangeLog.attr.params.pageIndex = 1;
              this.popup.memberGoodsSeriesPrestoreChangeLog.attr.row = params;
              this.popup.memberGoodsSeriesPrestoreChangeLog.fn.getGoodsSeriesPrestoreChangeLog();
              ok();
            },
            getGoodsSeriesPrestoreChangeLog: () => {
              Member.sendApi("goodsSeriesPrestoreChangeLogPage", {
                params: this.popup.memberGoodsSeriesPrestoreChangeLog.attr.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                    goodsSeriesId: this.popup.memberGoodsSeriesPrestoreChangeLog.attr.row
                      .goodsSeries.id,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberGoodsSeriesPrestoreChangeLog.attr.list = data;
                  this.popup.memberGoodsSeriesPrestoreChangeLog.attr.total = page.total;
                } else {
                  this.$message({
                    message: "获取组合变更记录失败",
                    type: "error",
                  });
                }
              });
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberGoodsSeriesPrestoreChangeLog.attr.params.pageIndex = pageIndex;
              this.popup.memberGoodsSeriesPrestoreChangeLog.fn.getGoodsSeriesPrestoreChangeLog();
            },
          },
        },
        approvalSubAchieveTransferAdd: {
          attr: {
            title: "",
            tab: 1,
            validAchieve: 0,
            form: (() => {
              const f1 = Approval.formUtil().generator(
                "add",
                "approvalSubAchieveTransfer"
              );
              const f2 = ApprovalSubAchieveTransfer.formUtil().generator(
                "add",
                "default"
              );
              f1.approvalSubAchieveTransfer.value = f2;
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
              this.popup.approvalSubAchieveTransferAdd.attr.history.params.pageIndex = pageIndex;
              this.popup.approvalSubAchieveTransferAdd.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.approvalSubAchieveTransferAdd.attr.history.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                    typeId: 15,
                  },
                  order: {
                    createTime: "desc",
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.approvalSubAchieveTransferAdd.attr.history.list = data;
                  this.popup.approvalSubAchieveTransferAdd.attr.history.total =
                    page.total;
                } else {
                  this.$message({
                    message: "店主业绩转让信息获取失败",
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
                    label: i.nickname,
                  }))
                );
              });
            },
            distributorChangeHandler: (e) => {
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.recipientId.value = e;
            },
            giveTimeChangeHandler: (e) => {
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.giveTime.value = e;
              this.popup.approvalSubAchieveTransferAdd.fn.getAchieveInfo();
            },
            achieveTimeChangeHandler: (e) => {
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.achieveTime.value = e;
            },
            getAchieveInfo: () => {
              const memberId = this.popup.approvalSubAchieveTransferAdd.attr.form
                .approvalSubAchieveTransfer.value.giveId.value;
              const year = this.getYear(
                this.popup.approvalSubAchieveTransferAdd.attr.form
                  .approvalSubAchieveTransfer.value.giveTime.value
              );
              const month = this.getMonth(
                this.popup.approvalSubAchieveTransferAdd.attr.form
                  .approvalSubAchieveTransfer.value.giveTime.value
              );
              Member.sendApi(
                "achieveInfo",
                {
                  params: {},
                  data: {
                    query: {
                      memberId,
                      year,
                      month,
                    },
                  },
                },
                {
                  errorTip: "获取业绩当前月份业绩失败",
                }
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  const { integral } = data;
                  this.popup.approvalSubAchieveTransferAdd.attr.validAchieve = integral;
                }
              });
            },
            openHandler: (ok) => {
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.giveId.value = Number(
                this.$route.params.id
              );
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.giveTime.value = this.$dayjs().format(
                "YYYY-MM-DD"
              );
              this.popup.approvalSubAchieveTransferAdd.attr.form.approvalSubAchieveTransfer.value.achieveTime.value = this.$dayjs().format(
                "YYYY-MM-DD"
              );
              this.popup.approvalSubAchieveTransferAdd.fn.getUpdateHistory();
              this.popup.approvalSubAchieveTransferAdd.fn.getAchieveInfo();
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              console.log(this.popup.approvalSubAchieveTransferAdd.attr.form)
              const { ok, form } = formToolkit.validate(
                this.popup.approvalSubAchieveTransferAdd.attr.form
              );
              if (
                form.approvalSubAchieveTransfer.giveId ===
                  form.approvalSubAchieveTransfer.receiverId &&
                form.approvalSubAchieveTransfer.giveTime ===
                  form.approvalSubAchieveTransfer.achieveTime
              ) {
                errorCallback();
                this.$message({
                  message: "业绩不能转让给同月份自己，请重新选择",
                  type: "error",
                });
              }
              if (ok) {
                Approval.sendApi("add", {
                  params: {},
                  data: form,
                }).then((res) => {
                  const { status } = res;
                  if (status) {
                    okCallback();
                    this.$message({
                      message: "业绩转让申请提交成功",
                      type: "success",
                    });
                    this._boot();
                  } else {
                    errorCallback();
                    this.$message({
                      message: "业绩转让申请提交失败",
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
            },
            hiddenHandler: () => {
              this.popup.approvalSubAchieveTransferAdd.attr.form = (() => {
                const f1 = Approval.formUtil().generator(
                  "add",
                  "approvalSubAchieveTransfer"
                );
                const f2 = ApprovalSubAchieveTransfer.formUtil().generator(
                  "add",
                  "default"
                );
                f1.approvalSubAchieveTransfer.value = f2;
                return f1;
              })();
            },
          },
        },
        memberAchieveUpdate: {
          attr: {
            tab: 1,
            form: {
              params: {
                memberId: this.$route.params.id,
                year: this.getYear(),
                month: this.getMonth(),
              },
              data: {
                value: 0,
                remark: "",
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
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberAchieveUpdate.attr.history.params.pageIndex = pageIndex;
              this.popup.memberAchieveUpdate.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              MemberAchieveUpdateLog.sendApi("achieveUpdateLogPage", {
                params: this.popup.memberAchieveUpdate.attr.history.params,
                data: {
                  query: {
                    memberId: this.$route.params.id,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberAchieveUpdate.attr.history.list = data;
                  this.popup.memberAchieveUpdate.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "店主业绩修改信息获取失败",
                    type: "error",
                  });
                }
              });
            },
            timeChangeHandler: (e) => {
              this.popup.memberAchieveUpdate.attr.form.params.year = this.getYear(e);
              this.popup.memberAchieveUpdate.attr.form.params.month = this.getMonth(e);
              this.popup.memberAchieveUpdate.fn.getMemberAchieveInfo();
            },
            getMemberAchieveInfo: () => {
              const { year, month } = this.popup.memberAchieveUpdate.attr.form.params;
              MemberAchieve.sendApi(
                "achieveInfo",
                {
                  params: {},
                  data: {
                    query: {
                      memberId: this.$route.params.id,
                      year,
                      month,
                    },
                  },
                },
                {
                  errorTip: "获取代理业绩信息失败",
                }
              ).then((res) => {
                const { status, data } = res;
                if (status) {
                  const { integral = 0 } = data || {};
                  this.popup.memberAchieveUpdate.attr.form.data.value = integral;
                }
              });
            },
            openHandler: (ok) => {
              this.popup.memberAchieveUpdate.fn.getUpdateHistory();
              this.popup.memberAchieveUpdate.fn.getMemberAchieveInfo();
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              const { params, data } = this.popup.memberAchieveUpdate.attr.form;
              if (this.isObjHasBlank(params)) {
                this.$message.warning("请确认输入信息");
                return;
              }

              MemberAchieve.sendApi("achieveUpdate", {
                params,
                data,
              }).then((res) => {
                const { status } = res;
                if (status) {
                  okCallback();
                  this.$message({
                    message: "业绩修改成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  errorCallback();
                  this.$message({
                    message: "业绩修改失败",
                    type: "error",
                  });
                }
              });
            },
          },
        },
        memberAchieveList: {
          attr: {
            list: [],
          },
          fn: {
            queryMemberAchieveList: (y) => {
              this.popup.memberAchieveList.attr.list = [];
              return new Promise((resolve) => {
                MemberAchieve.sendApi(
                  "achieveList",
                  {
                    params: {},
                    data: {
                      query: {
                        memberId: this.$route.params.id,
                        year: y,
                      },
                    },
                  },
                  {
                    errorTip: "获取代理业绩列表失败",
                  }
                ).then((res) => {
                  const { status, data } = res;
                  if (status) {
                    for (let i = 0; i < 12; i++) {
                      this.popup.memberAchieveList.attr.list.push({
                        year: y,
                        month: i + 1,
                        integral:
                          this.$_.get(
                            this.$_.find(data, (x) => {
                              return x.month === i + 1;
                            }),
                            "integral"
                          ) || 0,
                      });
                    }
                    resolve();
                  }
                });
              });
            },
            timeChangeHandler: (e) => {
              this.popup.memberAchieveList.fn.queryMemberAchieveList(this.getYear(e));
            },
            openHandler: (ok) => {
              this.popup.memberAchieveList.fn
                .queryMemberAchieveList(this.getYear())
                .then(() => {
                  ok();
                });
            },
          },
        },
        memberAchieveChangeLog: {
          attr: {
            integral: 0,
            year: "",
            month: "",
            params: {
              pageIndex: 1,
              pageSize: 10,
            },
            time: "",
            total: 0,
            list: [],
          },
          fn: {
            openHandler: (ok, params) => {
              const { year, month, integral } = params;
              this.popup.memberAchieveChangeLog.attr.integral = integral;
              this.popup.memberAchieveChangeLog.attr.year = year;
              this.popup.memberAchieveChangeLog.attr.month = month;
              this.popup.memberAchieveChangeLog.attr.time =
                String(year) + "-" + (month < 10 ? "0" + month : month);
              this.popup.memberAchieveChangeLog.attr.params.pageIndex = 1;
              this.popup.memberAchieveChangeLog.fn.getAchieveChangeLog();
              ok();
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.memberAchieveChangeLog.attr.params.pageIndex = pageIndex;
              this.popup.memberAchieveChangeLog.fn.getAchieveChangeLog();
            },
            getAchieveChangeLog: () => {
              Member.sendApi("achieveChangeLogPage", {
                params: this.popup.memberAchieveChangeLog.attr.params,
                data: {
                  query: {
                    memberId: this.infoGet("info.id"),
                    achieveTime: this.popup.memberAchieveChangeLog.attr.time,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.memberAchieveChangeLog.attr.list = data;
                  this.popup.memberAchieveChangeLog.attr.total = page.total;
                }
              });
            },
          },
        },
        balanceTransferAdd: {
          attr: {
            tab: 1,
            form: {
              balanceType: "",
              distributorId: 0,
              receiverId: 0,
              amount: 0,
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
            historyPageChangeHandler: (pageIndex) => {
              this.popup.balanceTransferAdd.attr.history.params.pageIndex = pageIndex;
              this.popup.balanceTransferAdd.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              Approval.sendApi("page", {
                params: this.popup.balanceTransferAdd.attr.history.params,
                data: {
                  query: {
                    typeId: 11,
                    type: 2,
                    memberId: this.$route.params.id,
                    balanceType: this.popup.balanceTransferAdd.attr.form.balanceType,
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.balanceTransferAdd.attr.history.list = data;
                  this.popup.balanceTransferAdd.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "店主余额转让信息获取失败",
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
                    label: i.nickname,
                  }))
                );
              });
            },
            distributorChangeHandler: (e) => {
              this.popup.balanceTransferAdd.attr.form.receiverId = e;
            },
            openHandler: (ok, params) => {
              const { type } = params;
              this.popup.balanceTransferAdd.attr.form.distributorId = Number(
                this.$route.params.id
              );
              this.popup.balanceTransferAdd.attr.form.balanceType = type;
              this.popup.balanceTransferAdd.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              let form = this.popup.balanceTransferAdd.attr.form;
              if (!Number(form.amount)) {
                errorCallback();
                this.$message.warning("转让金额必须大于0");
                return;
              }
              if (!form.receiverId) {
                errorCallback();
                this.$message.warning("请校验输入信息");
                return;
              }
              if (form.distributorId === form.receiverId) {
                errorCallback();
                this.$message({
                  message: "金额不能转让给自己，请重新选择接受店主",
                  type: "error",
                });
              }
              Approval.sendApi("add", {
                params: {},
                data: {
                  approvalSubDistributorBalanceChange: {
                    ...this.popup.balanceTransferAdd.attr.form,
                    type: 2,
                  },
                  options: '{\"ignoreWorkflowIds\":'+'\"'+42+'\"}',
                  typeId: 11,
                },
              }).then((res) => {
                const { status, data } = res;
                if (status) {
                  okCallback();
                  this.$message({
                    message: "余额转让提交成功",
                    type: "success",
                  });
                  this._boot();
                } else {
                  errorCallback();
                  this.$message({
                    message: "余额转让提交失败",
                    type: "error",
                  });
                }
              });
            },
            hiddenHandler: () => {
              this.popup.balanceTransferAdd.attr.form = {
                balanceType: "",
                distributorId: 0,
                receiverId: 0,
                amount: 0,
              };
            },
          },
        },
        popupConfirmMemberWalletDetail: {
          attr: {
            form: {
              type: 6,
            },
            total: 0,
            list: [],
            params: {
              pageIndex: 1,
              pageSize: 10,
            },
          },
          fn: {
            openHandle: (ok, params) => {
              this.popup.popupConfirmMemberWalletDetail.attr.form.type = params.type;
              this.popup.popupConfirmMemberWalletDetail.attr.params.pageIndex = 1;
              this.popup.popupConfirmMemberWalletDetail.fn.getWalletDetail();
              ok();
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.popupConfirmMemberWalletDetail.attr.params.pageIndex = pageIndex;
              this.popup.popupConfirmMemberWalletDetail.fn.getWalletDetail();
            },
            getWalletDetail: () => {
              Member.sendApi("accountChangeLogPage", {
                params: this.popup.popupConfirmMemberWalletDetail.attr.params,
                data: {
                  query: {
                    type: this.popup.popupConfirmMemberWalletDetail.attr.form.type,
                    memberId: this.infoGet("info.id"),
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.popupConfirmMemberWalletDetail.attr.list = data;
                  this.popup.popupConfirmMemberWalletDetail.attr.total = page.total;
                }
              });
            },
          },
        },
        popupConfirmMemberTransferMoney: {
          attr: {
            tab:1,
            remark:"",
            list:[],
            total:null,
            form: {
              type: 6,
            },
            params: {
              pageIndex: 1,
              pageSize: 10,
            },
          },
          fn: {
            openHandle: (ok, params) => {
              this.popup.popupConfirmMemberTransferMoney.attr.form.type = params.type;
              this.popup.popupConfirmMemberTransferMoney.attr.params.pageIndex = 1;
              this.popup.popupConfirmMemberTransferMoney.fn.getTransferMoney();
              ok();
            },
            closeHandle: (okCallback, errorCallback) => {
              const money =  this.infoGet("info.memberAccount.balanceNewDistributor", 0)
              if(money<35000){
                this.$message({
                  message: "划转失败，您的钱包不够35000元",
                  type: "error",
                })
                errorCallback()
                return
              }
              const form = {
                options:'{\"ignoreWorkflowIds\":'+'\"'+42+'\"}',
                typeId: 11,
                approvalSubDistributorBalanceChange: {
                    distributorId: this.$route.params.id,
                    type: 4,
                    remark: this.popup.popupConfirmMemberTransferMoney.attr.remark
                }
              }
              Approval.sendApi('add',{
                params: {},
                data: form,
              }).then(res => {
                if(res.status) {
                  this.$message({
                    message: "划转成功！",
                    type: "success",
                  });
                  okCallback()
                }else {
                  this.$message({
                    message: "划转失败！",
                    type: "error",
                  });
                  okCallback()
                }
              })
            },
            hiddenHandle: () => {
                this.popup.popupConfirmMemberTransferMoney.attr.tab = 1
            },
            historyPageChangeHandler: (pageIndex) => {
              this.popup.popupConfirmMemberTransferMoney.attr.params.pageIndex = pageIndex;
              this.popup.popupConfirmMemberTransferMoney.fn.getTransferMoney();
            },
            getTransferMoney: () => {
              Approval.sendApi("page", {
                params: this.popup.popupConfirmMemberTransferMoney.attr.params,
                data: {
                  query: {
                    type: this.popup.popupConfirmMemberTransferMoney.attr.form.type,
                    typeId:11,
                    distributorId: this.infoGet("info.id"),
                  },
                },
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.popupConfirmMemberTransferMoney.attr.list = data;
                  this.popup.popupConfirmMemberTransferMoney.attr.total = page.total;
                }
              });
            },
          },
        }
      },
      switchSelector: {
        fn: {
          updateMemberIsTeamLeader: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 8,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "设置团队领导人成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "设置团队领导人失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsLockDistributor: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 9,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "切换代理权限成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "切换代理权限失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsHiddenDistributor: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 12,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "切换代理隐藏状态成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "切换代理隐藏状态失败",
                  type: "error",
                });
              }
            });
          },
          updateMember2blackList: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 10,
              },
              data: {
                value: value ? 3 : 1,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新黑名单成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "更新黑名单失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberLiveIsEnable: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 16,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新直播权限成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "更新直播权限失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberAchieveQueryIsEnable: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 19,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新查看团队业绩权限成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "更新查看团队业绩权限权限失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsNewDistributor: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 20,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新新店主成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "更新新店主失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsEnableMaAddPurchanse: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 21,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "更新小程序店主下单权限成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "更新小程序店主下单权限失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsEnableMaDistributorLogin: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 23,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "设置是否运行登录店主小程序成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "设置是否运行登录店主小程序失败",
                  type: "error",
                });
              }
            });
          },
          updateMemberIsEnableMaMemberLogin: (e) => {
            const { value, ok, error } = e;
            Member.sendApi("updateSingleField", {
              params: {
                id: this.$route.params.id,
                type: 24,
              },
              data: {
                value: value ? 1 : 0,
                remark: "",
              },
            }).then((res) => {
              const { status, data } = res;
              if (status) {
                ok();
                this.$message({
                  message: "设置是否运行登录会员小程序成功",
                  type: "success",
                });
                this._boot();
              } else {
                error();
                this.$message({
                  message: "设置是否运行登录会员小程序失败",
                  type: "error",
                });
              }
            });
          },
        },
      },
    };
  },
  computed: {
    isDistributor() {
      return this.infoGet("info.type") === 7;
    },
    isEnableViewIdCard() {
      return !!this.$_.get(this.axqStaffInfo, 'accessExtraJson.isEnableViewIdCard')
    }
  },
  filters: {
    nowBalanceFilter(s) {
      return s ? JSON.parse(s).balance : 0;
    },
    nowSixueBalanceFilter(s) {
      return s ? JSON.parse(s).sixueBalance : 0;
    },
    encryptPhone:function(value){
        const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        if(value&&value!=='--'&&phoneReg.test(value)){
          return value.slice(0,3) + '****'+ value.slice(7,11)
        }else {
          return value
        }
    },
    encryptCertificate:function(value){
        if(value&&value!=='--'){
          return value.slice(0,15) + '****'
        }else{
          return value
        }
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.reloadPage();
  },
};
</script>

<style lang="less">
.promps {
  margin-top: 20px;
  color: #FF3838;
}
.member-info {
  .i-block {
    background: white;

    .b-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      padding: 0 40px;

      &::before {
        position: absolute;
        content: "";
        top: 15px;
        left: 20px;
        width: 5px;
        height: 40px;
        background: #1890ff;
      }
    }

    .b-content {
      padding: 20px 0;

      .b-grid {
        width: 100%;

        .b-grid-item {
          height: 60px;
          margin-bottom: 20px;

          .f-item {
            padding-left: 20px;

            .i-label {
              display: flex;
              align-items: center;
              height: 40px;
            }

            .i-value {
              display: flex;
              align-items: center;

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

    &_shop,
    &_account,
    &_chian_blacklist {
      .b-content {
        padding: 20px;
      }
    }

    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  .i-account {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;

    .a-section {
      background: white;
      margin-bottom: 20px;

      .s-title {
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

      .s-content {
        display: flex;
        padding: 20px 0;

        .c-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 400px;

          .i-icon {
            i {
              font-size: 40px;
            }
          }

          .i-balance {
            padding-top: 20px;
            text-align: center;
            span {
              font-size: 25px;
              font-weight: 600;
            }
            > span:last-child {
              display: block;
              font-size: 14px;
              font-weight: 500;
              color: #f00;
            }
          }

          .i-link {
            display: flex;
            align-items: center;
            padding-top: 20px;

            .l-item {
              span {
                color: #1890ff;

                &:hover {
                  cursor: pointer;
                }
              }

              &:not(:first-child) {
                margin-left: 20px;
              }
            }
          }

          &:not(:first-child) {
            border-left: 1px solid #f7f7f7;
          }
        }
      }
    }
  }

  .popup-confirm {
    &_member-update {
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

    &_member-login-authorize-add,
    &_member-chain-blacklist-add,
    &_member-goods-series-prestore-info {
      padding: 20px;
    }

    &_member-account-update,
    &_member-goods-series-prestore-update {
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
          cursor: pointer;

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

    &_approval-sub-distributor-balance-reutrn-add {
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
        padding: 0 20px;

        &_field {
          .f-item {
            margin-top: 7px;
            .i-label {
              display: flex;
              align-items: center;
              height: 27px;
              .required {
                &::after {
                  content: "*";
                  color: #ff0707;
                }
              }
            }

            &:not(:first-child) {
              margin-top: 10px;
            }
          }
        }
      }
    }

    &_approval-sub-achieve-transfer-add {
      padding-top: 50px;

      .t-tab {
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

      .t-box {
        padding: 20px;

        &_field {
          .grid {
            .g-title {
              font-size: 14px;
            }
          }
        }
      }
    }

    &_member-account-top-up-add {
      padding-top: 30px;

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
          padding: 10px 20px;

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
          .f-item {
            margin-top: 7px;
            .i-label {
              display: flex;
              align-items: center;
              height: 40px;

              .required {
                &::after {
                  content: "*";
                  color: #ff0707;
                }
              }

              .el-input {
                width: 100px;
              }

              .el-select {
                width: 100px;
              }
            }
          }
        }
      }
    }

    &_member-balance-change-log,
    &_member-achieve-change-log,
    &_member-goods-series-change-log {
      padding: 20px;

      .l-tab {
        padding-left: 10px;
        font-size: 15px;
        font-weight: bold;
      }

      .l-box {
        .b-list {
          .add {
            color: #1dd76c;
          }

          .decrease {
            color: #fb3a4d;
          }

          .l-name {
            color: #179bfe;
          }
        }
      }
    }

    &_member-achieve-update {
      padding-top: 30px;

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
          padding: 10px 20px;

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
            margin-top: 20px;

            .i-label {
              display: flex;
              align-items: center;
              height: 40px;

              .el-input {
                width: 100px;
              }

              .el-select {
                width: 100px;
              }
            }
          }
        }
      }
    }

    &_member-achieve-list {
      display: flex;
      flex-direction: column;

      .l-query {
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: 20px;

        span {
          padding-right: 10px;
          white-space: nowrap;
        }

        .time-picker {
          width: 200px;
        }
      }

      .l-main {
        flex: 1;
        padding: 0 20px;
      }
    }

    &_balance-transfer-add {
      padding: 20px;

      .t-tab {
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

      .t-box {
        padding: 20px;

        &_field {
          .f-item {
            .i-label {
              display: flex;
              align-items: center;
              height: 40px;
              .required {
                &::after {
                  content: "*";
                  color: #ff0707;
                }
              }
            }

            &:not(:first-child) {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
