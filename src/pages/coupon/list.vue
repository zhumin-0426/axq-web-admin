<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-18 17:26:09
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/coupon/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page coupon-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmCouponAdd.open({triggerClose: popup.couponAdd.fn.closeHandler,triggerHidden: popup.couponAdd.fn.hiddenHandler})"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="状态"
                :config="{entity: 'GoodsCategory', type: 'status'}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="代金券/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmCouponAdd" title="代金券添加">
      <div class="popup-confirm_coupon-add">
        <form-validate ref="couponAdd" :form="popup.couponAdd.attr.form">
          <form-validate-field label="代金券名称" :field="popup.couponAdd.attr.form.title">
            <el-input v-model="popup.couponAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="popup.couponAdd.attr.form.description">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.couponAdd.attr.form.description.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="是否过期" :field="popup.couponAdd.attr.form.isExpire">
            <el-radio-group v-model="popup.couponAdd.attr.form.isExpire.value">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="过期日期" :field="popup.couponAdd.attr.form.expireDate">
            <el-radio-group>
              <el-date-picker v-model="popup.couponAdd.attr.form.expireDate.value" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="金额类型" :field="popup.couponAdd.attr.form.couponItemsList">
            <div class="a-coupon-items">
              <div class="i-talbe">
                <el-table
                  :data="popup.couponAdd.attr.form.couponItemsList.value"
                  border
                  style="width: 100%"
                >
                  <el-table-column fixed label="序号" width="150">
                    <template slot-scope="props">
                      <p>{{ props.$index + 1 }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额">
                    <template slot-scope="props">
                      <el-input
                        type="number"
                        v-model="popup.couponAdd.attr.form.couponItemsList.value[props.$index].amount.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="数量">
                    <template slot-scope="props">
                      <el-input
                        type="number"
                        v-model="popup.couponAdd.attr.form.couponItemsList.value[props.$index].quantity.value"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="props">
                      <el-button
                        type="text"
                        size="small"
                        @click.native="popup.couponAdd.fn.deleteCouponItems(props.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="i-btn" @click="popup.couponAdd.fn.addCouponItems">
                <span>添加</span>
              </div>
            </div>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmCouponInfo" title="代金券详情">
      <div class="popup-confirm_coupon-info">
        <grid :col="2" title="代金券信息" border>
          <grid-item label="代金券名称：">
            <span>{{$_.get(popup.couponInfo.attr.info, 'title')}}</span>
          </grid-item>
          <grid-item label="数量：">{{$_.get(popup.couponInfo.attr.info, 'quantity')}}</grid-item>
        </grid>
        <grid title="代金券码">
          <elastic-table
            slot="noGrid"
            :table-data="$_.get(popup.couponInfo.attr.info, 'couponItemsList', [])"
          >
            <el-table-column label="金额">
              <template v-slot="{row}">{{row.amount}}</template>
            </el-table-column>
            <el-table-column label="数量">
              <template v-slot="{row}">{{row.quantity}}</template>
            </el-table-column>
          </elastic-table>
        </grid>
      </div>
    </popup-confirm>
  </div>
</template>

<script>

import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import popupConfirm from '@/components/popup/type/confirm';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import elasticTable from '@/components/elastic-table';
import { formToolkit } from '@/model/form-toolkit';
import { Request } from '@/model/request';
import downloader from '@/utils/downloader';

import { model } from '@/model';
const { Coupon, CouponItems } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    listPage,
    optionsSelector,
    popupConfirm,
    grid,
    gridItem,
    elasticTable
  },
  data () {
    return {
      request: new Request(),
      exportLoading: false,
      options: {
        fn: {
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          }
        }
      },
      page: {
        config: {
          entity: 'Coupon',
          action: 'page',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'title',
              label: '名称'
            },
            {
              prop: 'description',
              label: '描述'
            },
            {
              prop: 'quantity',
              label: '数量'
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmCouponInfo.open({ triggerOpen: this.popup.couponInfo.fn.openHandler, params: props.row._raw })
                        }
                      }
                    },
                    '查看');
                },
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.request.do('py', 'file', 'couponItemCodeExcel', { params: { id: props.row.id }, data: {} }, { showLoading: true }).then(res => {
                            const { success, data } = res;
                            if (success) {
                              const { oss_url } = data;
                              downloader.do(oss_url);
                            } else {
                              error();
                              this.$message({
                                message: '文件下载失败',
                                type: 'error'
                              });
                            }
                          });
                        }
                      }
                    },
                    '导出');
                }
              ]
            }
          ]
        },
        form: {
          query: {
            status: '',
            keyword: ''
          },
          order: {}
        },
        fn: {
          resetHandler: () => {
            this.$refs.statusOptionsSelector.reset();
          }
        }
      },
      popup: {
        couponAdd: {
          attr: {
            form: Coupon.formUtil().generator('add', 'default')
          },
          fn: {
            addCouponItems: () => {
              this.popup.couponAdd.attr.form.couponItemsList.value.push(CouponItems.formUtil().generator('add', 'default'));
            },
            deleteCouponItems: (index) => {
              this.popup.couponAdd.attr.form.couponItemsList.value.splice(index, 1);
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.couponAdd.attr.form);
              if (ok) {
                Coupon.sendApi('add', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '代金券添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '代金券添加失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback();
                this.$message({
                  message: '请确认信息',
                  type: 'warning'
                });
              }
            },
            hiddenHandler:()=>{
              this.popup.couponAdd.attr.form = Coupon.formUtil().generator('add', 'default');
            }
          }
        },
        couponInfo: {
          attr: {
            info: {}
          },
          fn: {
            openHandler: (ok, params) => {
              Coupon.sendApi('info', { params: {}, data: { query: { id: params.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.couponInfo.attr.info = data;
                  ok();
                } else {
                  this.$message.error('获取代金券详情失败');
                }
              })
              ok();
            }
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.coupon-list {
  background: white;
  .popup-confirm {
    &_coupon-add {
      padding: 20px;
      .a-coupon-items {
        .i-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 20px;
          border: 1px dashed #e9e9e9;
        }
      }
    }
    &_coupon-update {
      padding: 20px;
    }
    &_coupon-info {
      padding: 20px;
    }
  }
}
</style>
