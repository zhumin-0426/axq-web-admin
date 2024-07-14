<template>
  <div class="progress progress_shop-apply">
    <div class="p-step">
      <el-steps :active="active + moveStep - 1" finish-status="success">
        <el-step
          :title="item"
          :description="active - 1 === key ? '最新审核节点' : ''"
          :key="key"
          v-for="(item, key) in list"
        ></el-step>
      </el-steps>
    </div>
    <div class="p-info">
      <div class="i-move-btn">
        <el-button type="primary" size="mini" @click.native="doMoveStep(-1)">上一步</el-button>
        <el-button type="primary" size="mini" @click.native="doMoveStep(1)">下一步</el-button>
      </div>
      <template v-if="active + moveStep < 7">
        <template v-if="$_.get(approval, 'approvalTimelineList[0].status') === 2">
          <div class="error">
            <i class="iconfont icon-shibai1"></i>
            <template v-if="active + moveStep > 2">
              <p>请查看核对备注信息并修改信息后，再重新提交</p>
              <el-button type="primary" @click.native="doUpdate(active + moveStep)">重新修改</el-button>
            </template>
            <p v-else>审核不通过</p>
            <div class="e_remark">
              <div class="r-item">
                <div class="i-label">
                  <span>备注：</span>
                </div>
                <div
                  class="i-value"
                >{{blankGet($_.get(approval.approvalTimelineList, "[0].remark"))}}</div>
              </div>
              <div class="r-item" v-if="$_.get(approval.approvalTimelineList, '[0].fileJson')">
                <div class="i-label">
                  <span>附件：</span>
                </div>
                <div class="i-value">
                  <file-previewer :value="$_.get(approval.approvalTimelineList, '[0].fileJson')"></file-previewer>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <template v-if="active + moveStep === 2">
            <div class="title">
              <div class="t-left">
                <span v-if="approval.typeId === 1" class="node-name">区域申请：</span>
                <span v-else-if="approval.typeId === 2" class="node-name">店铺申请：</span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <p>
                申请地区：{{
                `${$_.get(
                this.adaptor.fn.getApprovalSub(),
                "regionAllocate.provinceName"
                )}-${$_.get(
                this.adaptor.fn.getApprovalSub(),
                "regionAllocate.cityName"
                )}-${$_.get(
                this.adaptor.fn.getApprovalSub(),
                "regionAllocate.districtName"
                )}-${$_.get(
                this.adaptor.fn.getApprovalSub(),
                "regionAllocate.name"
                )}-${$_.get(
                this.adaptor.fn.getApprovalSub(),
                "regionAllocate.remark"
                )}`
                }}
              </p>
              <p>
                区域所有人/电话:{{
                $_.get(
                this.adaptor.fn.getApprovalSub(),
                `regionAllocate.regionAllocateAgent.member.nickname`
                )
                }}/{{
                $_.get(
                this.adaptor.fn.getApprovalSub(),
                `regionAllocate.regionAllocateAgent.member.mobile`
                )
                }}
              </p>
              <p></p>
              <p>
                申请人：{{
                $_.get(this.adaptor.fn.getApprovalSub(), `applier.nickname`)
                }}
              </p>
              <p>
                联系电话：{{
                $_.get(this.adaptor.fn.getApprovalSub(), `applier.mobile`)
                }}
              </p>
              <p>
                上级推荐人：{{
                $_.get(
                this.adaptor.fn.getApprovalSub(),
                `inviteMember.nickname`
                )
                }}
              </p>
              <p>
                上级总代理：{{
                $_.get(
                this.adaptor.fn.getApprovalSub(),
                `superiorDistributor.nickname`
                )
                }}
              </p>
              <p>
                团队领导人 ：{{
                $_.get(
                this.adaptor.fn.getApprovalSub(),
                `topDistributor.nickname`
                )
                }}
              </p>
              <div class="c-item c-item_file-authorize-agreement" v-if="this.approval.typeId === 2">
                <div class="i-lable">区域授权书附件：</div>
                <div class="i-value">
                  <file-previewer
                    :value="
                      $_.get(
                        this.adaptor.fn.getApprovalSub(),
                        'fileAuthorizeAgreement'
                      )
                    "
                  ></file-previewer>
                </div>
              </div>
              <p>
                审核人：{{
                $_.get(getUniqueTimeline(approval, 0), `checker.nickname`)
                }}
              </p>
              <p>
                审核时间：{{
                $_.get(getUniqueTimeline(approval, 0), `createTime`)
                }}
              </p>
            </div>
          </template>
          <template v-if="active + moveStep === 3">
            <template
              v-if="
                approval.typeId === 1 ||
                  $_.get(this.adaptor.fn.getApprovalSub(), `depositIsRequire`)
              "
            >
              <div class="title">
                <div class="t-left">
                  <span class="node-name">保证金缴纳：</span>
                  <span class="link" @click="doUpdate(3)" v-if="approval.status === 1">修改保证金信息></span>
                </div>
                <div class="t-right"></div>
              </div>
              <div class="content">
                <p>
                  市场保证金：{{
                  $_.get(this.adaptor.fn.getApprovalSub(), `depositAmount`)
                  }}元
                </p>
                <p>
                  付款方式：{{
                  $_.get(
                  this.adaptor.fn.getApprovalSub(),
                  `depositPaymentType`
                  )
                  | customizeOptionFilter(
                  popup.regionShopApplyUpdate.attr.paymentTypeList
                  )
                  }}
                </p>
                <p>
                  付款人：{{
                  $_.get(this.adaptor.fn.getApprovalSub(), `depositPayer`)
                  }}
                </p>
                <p>
                  付款时间：{{
                  $_.get(this.adaptor.fn.getApprovalSub(), `depositPayTime`)
                  }}
                </p>
                <div class="c-item c-item_deposit-img">
                  <div class="i-lable">保证金附件：</div>
                  <div class="i-value">
                    <file-previewer
                      :value="
                        $_.get(this.adaptor.fn.getApprovalSub(), 'fileDeposit')
                      "
                    ></file-previewer>
                  </div>
                </div>
                <p>
                  审核人：{{
                  $_.get(getUniqueTimeline(approval, 1), `checker.nickname`)
                  }}
                </p>
                <p>
                  审核时间：{{
                  $_.get(getUniqueTimeline(approval, 1), `createTime`)
                  }}
                </p>
              </div>
            </template>
            <template v-else>
              <div class="title">
                <div class="t-left">
                  <span>保证金缴纳：</span>
                  <span class="link" @click="doUpdate(3)" v-if="approval.status === 1">修改保证金信息></span>
                </div>
              </div>
              <div class="content">
                <p>不需要缴纳保证金</p>
              </div>
            </template>
          </template>
          <template v-if="active + moveStep === 4">
            <div class="title">
              <div class="t-left">
                <span class="node-name">地址申请：</span>
                <span class="link" @click="doUpdate(4)" v-if="approval.status === 1">修改地址信息></span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <p>
                店铺地址：{{
                $_.get(this.adaptor.fn.getApprovalSub(), `addressFull`)
                }}
              </p>
              <p>
                店铺面积：{{
                $_.get(this.adaptor.fn.getApprovalSub(), `addressArea`)
                }}
              </p>
              <p>
                街道电话：{{
                $_.get(this.adaptor.fn.getApprovalSub(), `addressContact`)
                }}
              </p>
              <p>
                审核人：{{
                $_.get(getUniqueTimeline(approval, 2), `checker.nickname`)
                }}
              </p>
              <p>
                审核时间：{{
                $_.get(getUniqueTimeline(approval, 2), `createTime`)
                }}
              </p>
            </div>
          </template>
          <template v-if="active + moveStep === 5">
            <div class="title">
              <div class="t-left">
                <span class="node-name">签约申请：</span>
                <span class="link" @click="doUpdate(5)" v-if="approval.status === 1">修改签约信息></span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <div class="c-item c-item_tenancy-img">
                <div class="i-lable">
                  <span>租赁合同：</span>
                </div>
                <div class="i-value">
                  <file-previewer
                    :value="
                      $_.get(
                        this.adaptor.fn.getApprovalSub(),
                        'fileTenancyAgreement'
                      )
                    "
                  ></file-previewer>
                </div>
              </div>
              <p>
                审核人：{{
                $_.get(getUniqueTimeline(approval, 3), `checker.nickname`)
                }}
              </p>
              <p>
                审核时间：{{
                $_.get(getUniqueTimeline(approval, 3), `createTime`)
                }}
              </p>
            </div>
          </template>
          <template v-if="active + moveStep === 6">
            <div class="title">
              <div class="t-left">
                <span class="node-name">装修申请：</span>
                <span class="link" @click="doUpdate(6)" v-if="approval.status === 1">修改装修信息></span>
              </div>
              <div class="t-right"></div>
            </div>
            <div class="content">
              <div class="c-item c-item_fixture-img">
                <div class="i-lable">
                  <span>装修照片：</span>
                </div>
                <div class="i-value">
                  <file-previewer
                    :value="
                      $_.get(this.adaptor.fn.getApprovalSub(), 'fileFixture')
                    "
                  ></file-previewer>
                </div>
              </div>
              <p>
                审核人：{{
                $_.get(getUniqueTimeline(approval, 4), `checker.nickname`)
                }}
              </p>
              <p>
                审核时间：{{
                $_.get(getUniqueTimeline(approval, 4), `createTime`)
                }}
              </p>
            </div>
          </template>
        </template>
      </template>
      <template v-if="approval.status === 2 && active + moveStep === 7">
        <div class="ok">
          <i class="iconfont icon-chenggong"></i>
          <p>审核已通过</p>
          <p>开店时间：{{ blankGet($_.get()) }}</p>
          <p>
            审核人：{{
            $_.get(getUniqueTimeline(approval, 4), `checker.nickname`)
            }}
          </p>
          <p>审核时间:{{ $_.get(getUniqueTimeline(approval, 4), `createTime`) }}</p>
        </div>
        <div class="error" v-if="approval.status === 3">
          <i class="iconfont icon-shibai1"></i>
          <p>审核不通过</p>
          <p>
            备注：{{
            blankGet($_.get(approval.approvalTimelineList, "[0].remark"))
            }}
          </p>
          <div class="i-lable">
            <span>附件：</span>
          </div>
          <div class="i-value">
            <file-previewer
              :value="
                $_.get(
                  this.adaptor.fn.getApprovalSub(),
                  'fileAuthorizeAgreement'
                )
              "
            ></file-previewer>
          </div>
          <p>
            审核人：{{
            $_.get(getUniqueTimeline(approval, 4), `checker.nickname`)
            }}
          </p>
          <p>审核时间:{{ $_.get(getUniqueTimeline(approval, 4), `createTime`) }}</p>
        </div>
        <div class="error" v-if="approval.status === 4">
          <i class="iconfont icon-shibai1"></i>
          <p>审核已取消</p>
        </div>
      </template>
    </div>
    <popup-confirm
      ref="popupConfirmShopApplyUpdate"
      :title="popup.regionShopApplyUpdate.attr.title"
      :config="{ width: 900, height: 500 }"
    >
      <div class="form-table popup-confirm_shop-apply-update">
        <form-validate
          ref="regionShopApplyUpdate"
          :form="popup.regionShopApplyUpdate.attr.form"
          :validator="entitys.Approval.formUtil().validate"
          :fill="popup.regionShopApplyUpdate.fn.fill"
        >
          <template v-if="popup.regionShopApplyUpdate.attr.type === 1">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item v-if="approval.typeId === 2">
                <form-validate-field label="是否需要保证金：">
                  <el-radio-group
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.depositIsRequire.value
                    "
                  >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </form-validate-field>
              </grid-item>
              <template
                v-if="
                  approval.typeId === 1 ||
                    (approval.typeId === 2 && popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositIsRequire.value)
                "
              >
                <grid-item>
                  <form-validate-field label="付款方式："
                  :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPaymentType">
                    <el-select
                      size="small"
                      class="el-select"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPaymentType.value
                      "
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in popup.regionShopApplyUpdate.attr
                          .paymentTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款时间："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPayTime">
                    <el-date-picker
                      size="small"
                      class="el-date-picker"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPayTime.value
                      "
                    ></el-date-picker>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款人："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositPayer">
                    <el-input
                      size="small"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositPayer.value
                      "
                    ></el-input>
                  </form-validate-field>
                </grid-item>
                <grid-item>
                  <form-validate-field label="付款金额："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositAmount">
                    <el-input
                      size="small"
                      v-model="
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.depositAmount.value
                      "
                    ></el-input>
                  </form-validate-field>
                </grid-item>
                <grid-item style="margintop: 10px" class="g-item-upload">
                  <form-validate-field label="上传凭证："
                    :field="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.depositAmount">
                    <file-uploader
                      :max="10"
                      @change="
                        (e) => {
                          popup.regionShopApplyUpdate.attr.form[
                            adaptor.fn.getFormSub()
                          ].value.fileDeposit.value = e;
                        }
                      "
                    ></file-uploader>
                  </form-validate-field>
                </grid-item>
              </template>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 2">
            <grid :col="2">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="地址：">
                  <options-selector 
                    :mode="3" 
                    :config="{ key: 'sysRegion',value:`${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.provinceName.value|| ''}${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.cityName.value || ''}-${popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.districtName.value || ''}`}"
                    @change="options.fn.regionChangeHandler"></options-selector>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="详细地址：">
                  <el-input
                    v-model="popup.regionShopApplyUpdate.attr.form[adaptor.fn.getFormSub()].value.addressFull.value"
                  ></el-input>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="街道电话：">
                  <el-input
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.addressContact.value
                    "
                  ></el-input>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="店铺面积：">
                  <el-input
                    v-model="
                      popup.regionShopApplyUpdate.attr.form[
                        adaptor.fn.getFormSub()
                      ].value.addressArea.value
                    "
                  ></el-input>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 3">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item class="g-item-upload">
                <form-validate-field label="签约文件：">
                  <file-uploader
                    :max="10"
                    @change="
                      (e) => {
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.fileTenancyAgreement.value = e;
                      }
                    "
                  ></file-uploader>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
          <template v-if="popup.regionShopApplyUpdate.attr.type === 4">
            <grid :col="1">
              <grid-item>
                <form-validate-field label="申请人：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `applier.nickname`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item>
                <form-validate-field label="申请区域：">
                  <p>
                    {{
                    $_.get(
                    this.adaptor.fn.getApprovalSub(),
                    `regionAllocate.name`
                    )
                    }}
                  </p>
                </form-validate-field>
              </grid-item>
              <grid-item class="g-item-upload">
                <form-validate-field label="装修照片：">
                  <file-uploader
                    :max="10"
                    @change="
                      (e) => {
                        popup.regionShopApplyUpdate.attr.form[
                          adaptor.fn.getFormSub()
                        ].value.fileFixture.value = e;
                      }
                    "
                  ></file-uploader>
                </form-validate-field>
              </grid-item>
            </grid>
          </template>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import popupConfirm from '@/components/popup/type/confirm';
import imgVideoUploader from '@/components/img-video-uploader';
import imgVideoPreviewer from '@/components/img-video-previewer';
import fileUploader from '@/components/file-uploader';
import filePreviewer from '@/components/file-previewer';
import optionsSelector from '@/components/options-selector';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';
const { Approval, ApprovalSubRegionAllocateAgent, ApprovalSubShop } =
  model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    popupConfirm,
    imgVideoUploader,
    imgVideoPreviewer,
    fileUploader,
    filePreviewer,
    optionsSelector,
    grid,
    gridItem
  },
  inject: ['getUniqueTimeline'],
  props: {
    approval: {
      type: Object,
      default () {
        return {
          workflowList: [],
          workflowId: -1
        };
      }
    }
  },
  data () {
    return {
      moveStep: 0,
      entitys: {
        Approval
      },
      adaptor: {
        fn: {
          getFormSub: () => {
            if (this.approval.typeId === 1) {
              return 'approvalSubRegionAllocateAgent';
            }
            if (this.approval.typeId === 2) {
              return 'approvalSubShop';
            }
          },
          getApprovalSub: () => {
            if (this.approval.typeId === 1) {
              return this.approval.approvalSubRegionAllocateAgent;
            }
            if (this.approval.typeId === 2) {
              return this.approval.approvalSubShop;
            }
          },
          getApprovalTimelineList: () => {
            return this.approval.approvalTimelineList;
          }
        }
      },
      options:{
        fn: {
          regionChangeHandler: (e) => {
            const [provinceId, cityId, districtId] = e.map(i => i.id);
            const [provinceName, cityName, districtName] = e.map(i => i._raw.name);
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.provinceId.value = provinceId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.cityId.value = cityId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.districtId.value = districtId;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.provinceName.value = provinceName;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.cityName.value = cityName;
            this.popup.regionShopApplyUpdate.attr.form[this.adaptor.fn.getFormSub()].value.districtName.value = districtName;
          }
        }
      },
      popup: {
        regionShopApplyUpdate: {
          attr: {
            title: '',
            paymentTypeList: [
              {
                label: '转账',
                value: 1
              },
              {
                label: '现金',
                value: 2
              },
              {
                label: '刷卡',
                value: 3
              },
              {
                label: '微信',
                value: 4
              },
              {
                label: '支付宝',
                value: 5
              }
            ],
            form: (() => {
              let f = {};
              if (this.approval.typeId === 1) {
                f = Approval.formUtil().generator(
                  'update',
                  'approvalSubRegionAllocateAgent'
                );
                f.approvalSubRegionAllocateAgent.value =
                  ApprovalSubRegionAllocateAgent.formUtil().generator(
                    'update',
                    'default'
                  );
              } else {
                f = Approval.formUtil().generator('update', 'approvalSubShop');
                f.approvalSubShop.value = ApprovalSubShop.formUtil().generator(
                  'update',
                  'default'
                );
              }
              return f;
            })()
          },
          fn: {
            fill: (callback) => {
              callback(Approval, this.approval);
            },
            openHandler: (ok, params) => {
              this.popup.regionShopApplyUpdate.attr.type = params.type;
              this.popup.regionShopApplyUpdate.attr.title = params.title;
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.regionShopApplyUpdate.validate().then((result) => {
                const { ok, form } = result;
                  Approval.sendApi('update', {
                    params: { id: Number(this.$route.params.id) },
                    data: form
                  }).then((res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$emit('update');
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '修改失败',
                        type: 'warning'
                      });
                    }
                  });

              });
            }
          }
        }
      }
    };
  },
  computed: {
    list () {
      const total = [];
      const pre = [
        this.approval.typeId === 1 ? '创建区域审核' : '创建店铺审批'
      ];
      const last = [this.approval.status === 2 ? '已通过' : '未通过'];
      return total
        .concat(pre)
        .concat(this.approval.approvalWorkflowList.map((i) => i.name))
        .concat(last);
    },
    active () {
      if (this.approval.status === 2) {
        return this.approval.approvalWorkflowList.length + 2;
      }
      return (
        this.approval.approvalWorkflowList
          .map((i) => i.id)
          .indexOf(this.approval.workflowId) + 2
      );
    }
  },
  methods: {
    doUpdate (s) {
      const step2config = {
        3: {
          title: '修改保证金',
          type: 1
        },
        4: {
          title: '修改地址',
          type: 2
        },
        5: {
          title: '修改签约信息',
          type: 3
        },
        6: {
          title: '装修申请',
          type: 4
        }
      };
      this.$refs.popupConfirmShopApplyUpdate.open({
        triggerOpen: this.popup.regionShopApplyUpdate.fn.openHandler,
        triggerClose: this.popup.regionShopApplyUpdate.fn.closeHandler,
        params: step2config[s]
      });
    },
    doMoveStep (n) {
      if (this.active + this.moveStep === 2 && n === -1) {
        this.$message({
          message: '当前为初始化节点',
          type: 'warning'
        });
        return;
      }
      if (this.moveStep === 0 && n === 1) {
        this.$message({
          message: '当前节点为审核最新状态',
          type: 'warning'
        });
        return;
      }
      this.moveStep = this.moveStep + n;
    }
  }
};
</script>

<style lang="less">
@import url("./less/index.less");
.progress {
  &_shop-apply {
    .p-info {
      .error {
        .e_remark {
          margin-top: 10px;
          .r-item {
            display: flex;
            .i-label {
              width: 100px;
            }
            .i-value {
              flex: 1;
            }
            &:not(:first-child) {
              margin-top: 10px;
            }
          }
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .t-left {
          .node-name {
            font-weight: bold;
          }
          .link {
            font-size: 14px;
            color: #1890ff;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .t-right {
        }
      }
      .content {
        .content-remark {
          display: flex;
          justify-content: flex-start;
          .content-remark-text {
            display: inline-block;
            width: 350px;
            height: 90px;
            background: #ffffff;
            border: 1px solid #c0c4cc;
          }
        }
        .c-item {
          &_file-authorize-agreement {
            display: flex;
            align-items: flex-start;
            .i-value {
              width: 400px;
            }
          }
          &_deposit-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              width: 400px;
            }
          }
          &_tenancy-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              display: flex;
              align-items: center;
              width: 400px;
            }
          }
          &_fixture-img {
            display: flex;
            align-items: flex-start;
            .i-label {
            }
            .i-value {
              width: 400px;
            }
          }
        }
      }
    }
    .popup-confirm {
      &_shop-apply-update {
        padding: 20px;
        .el-select {
          width: 100px;
        }
        .el-date-picker {
          width: 200px;
        }
        .g-item-upload {
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
