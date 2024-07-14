<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-05-24 09:46:35
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/region/allocate/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page region-allocate-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form" @add="$refs.popupConfirmRegionAllocateAdd.open({
        triggerClose: popup.regionAllocateAdd.fn.closeHandler,
        triggerHidden: popup.regionAllocateAdd.fn.hiddenHandler
      })">
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector :mode="3" :config="{ key: 'sysRegion', checkStrictly: true }"
                @change="options.fn.regionChangeHandler"></options-selector>
            </div>
            <div class="b-item">
              <options-selector :mode="1" placeholder="类型" :config="{ entity: 'RegionAllocate', type: 'type' }"
                @change="page.form.query.type = $event"></options-selector>
            </div>
            <div class="b-item">
              <options-selector :mode="1" placeholder="申请状态" :config="{ entity: 'RegionAllocate', type: 'status' }"
                @change="options.fn.statusChangeHandler"></options-selector>
            </div>
            <div class="b-item" style="width: 150px;">
              <options-selector :mode="4" placeholder="店主/ID" :config="{ req: options.fn.distributorQuery }"
                @change="options.fn.distributorChangeHandler"></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="区域/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
      </list-page>
    </div>
    <popup-confirm ref="popupConfirmRegionAllocateAdd" title="添加区域" :config="{ width: 700, height: 400 }">
      <div class="popup-confirm_region-allocate-add">
        <form-validate ref="regionAllocateAdd" :form="popup.regionAllocateAdd.attr.form"
          :validator="entitys.RegionAllocate.formUtil().validate">
          <form-validate-field label="类型" :field="popup.regionAllocateAdd.attr.form.type">
            <el-radio-group v-model="popup.regionAllocateAdd.attr.form.type.value">
              <el-radio :label="1">县级代理</el-radio>
              <el-radio :label="2">市级代理</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="城市" :field="popup.regionAllocateAdd.attr.form.provinceId">
            <options-selector :mode="3"
              :config="{ key: 'sysRegion', endValue: popup.regionAllocateAdd.attr.form.type.value === 2 ? 'city' : '' }"
              @change="popup.regionAllocateAdd.fn.provinceChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="区域" :field="popup.regionAllocateAdd.attr.form.name">
            <el-input v-model="popup.regionAllocateAdd.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="是否可见" :field="popup.regionAllocateAdd.attr.form.visible">
            <el-radio-group v-model="popup.regionAllocateAdd.attr.form.visible.value">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="状态" :field="popup.regionAllocateAdd.attr.form.status">
            <options-selector :mode="1" :config="{ options: entitys.RegionAllocate._options.status }"
              @change="popup.regionAllocateAdd.attr.form.status.value = $event"></options-selector>
          </form-validate-field>
          <form-validate-field label="代理人" :field="popup.regionAllocateAdd.attr.form.regionAllocateAgent"
            v-if="popup.regionAllocateAdd.attr.form.status.value !== 1">
            <options-selector :mode="4" placeholder="店主/手机号"
              :config="{ req: popup.regionAllocateAdd.fn.distributorQuery }"
              @change="popup.regionAllocateAdd.fn.distributorChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="街道" :field="popup.regionAllocateAdd.attr.form.remark">
            <el-input type="textarea" :rows="5" v-model="popup.regionAllocateAdd.attr.form.remark.value"></el-input>
          </form-validate-field>
          <form-validate-field label="备注">
            <el-input type="textarea" :rows="5" v-model="popup.regionAllocateAdd.attr.form.note.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmRegionAllocateInfo" title="区域信息">
      <div class="popup-confirm_region-allocate-info">
        <grid :col="3" title="区域信息" border>
          <grid-item label="城市：">
            <span>{{ `${$_.get(popup.regionAllocateInfo.attr.info,
                'provinceName')}/${$_.get(popup.regionAllocateInfo.attr.info,
                  'cityName')}/${$_.get(popup.regionAllocateInfo.attr.info, 'districtName')}`
            }}</span>
          </grid-item>
          <grid-item label="区域：">
            <span>{{ $_.get(popup.regionAllocateInfo.attr.info, 'name') }}</span>
          </grid-item>
          <grid-item label="街道：">
            <span>{{ $_.get(popup.regionAllocateInfo.attr.info, 'remark') }}</span>
          </grid-item>
          <grid-item label="区域状态：">
            <span>{{ entitys.RegionAllocate.filter('status', $_.get(popup.regionAllocateInfo.attr.info, 'status'))
            }}</span>
          </grid-item>
          <grid-item label="是否显示：">
            <span>{{ $_.get(popup.regionAllocateInfo.attr.info, 'visible') === 1 ? '是' : '否' }}</span>
          </grid-item>
          <grid-item label="店主/ID：">
            <span>{{ blankGet($_.get(popup.regionAllocateInfo.attr.info, 'regionAllocateAgent.member.nickname'))
            }}/{{ blankGet($_.get(popup.regionAllocateInfo.attr.info, 'regionAllocateAgent.member.id'))
            }}</span>
          </grid-item>
          <grid-item label="备注：">
            <span>{{ blankGet($_.get(popup.regionAllocateInfo.attr.info, 'note')) }}</span>
          </grid-item>
        </grid>
        <grid title="店铺列表">
          <el-table slot="noGrid" :data="$_.get(popup.regionAllocateInfo.attr.info, 'shopList')" stripe
            style="width: 100%">
            <el-table-column label="店铺id">
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
            <el-table-column label="地址">
              <template slot-scope="props">
                <p>{{ blankGet(props.row.fullAddress) }}</p>
              </template>
            </el-table-column>
            <el-table-column label="店主/ID">
              <p slot-scope="props">{{ blankGet($_.get(props.row, 'holder.nickname')) }}/{{ blankGet($_.get(props.row, 'holder.id')) }}</p>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="props">
                <el-button type="text" size="small" @click.native="go(`/shop/${props.row.id}`)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </grid>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmRegionAllocateUpdate" title="区域更新" :config="{ width: 700, height: 400 }">
      <div class="popup-confirm_region-allocate-udpate">
        <form-validate ref="regionAllocateUpdate" :form="popup.regionAllocateUpdate.attr.form"
          :validator="entitys.RegionAllocate.formUtil().validate" :fill="popup.regionAllocateUpdate.fn.fill">
          <form-validate-field label="类型" :field="popup.regionAllocateUpdate.attr.form.type">
            <el-radio-group v-model="popup.regionAllocateUpdate.attr.form.type.value">
              <el-radio :label="1">县级代理</el-radio>
              <el-radio :label="2">市级代理</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="城市" :field="popup.regionAllocateUpdate.attr.form.provinceId">
            <options-selector :mode="3"
              :config="{ key: 'sysRegion', value: `${popup.regionAllocateUpdate.attr.info.provinceName}/${popup.regionAllocateUpdate.attr.info.cityName}/${popup.regionAllocateUpdate.attr.info.districtName}`, endValue: popup.regionAllocateUpdate.attr.form.type.value === 2 ? 'city' : '' }"
              @change="popup.regionAllocateUpdate.fn.provinceChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="区域" :field="popup.regionAllocateUpdate.attr.form.name">
            <el-input v-model="popup.regionAllocateUpdate.attr.form.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="是否可见" :field="popup.regionAllocateUpdate.attr.form.visible">
            <el-radio-group v-model="popup.regionAllocateUpdate.attr.form.visible.value">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="街道" :field="popup.regionAllocateUpdate.attr.form.remark">
            <el-input type="textarea" :rows="5" v-model="popup.regionAllocateUpdate.attr.form.remark.value"></el-input>
          </form-validate-field>
          <form-validate-field label="备注">
            <el-input type="textarea" :rows="5" v-model="popup.regionAllocateUpdate.attr.form.note.value"></el-input>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmRegionAllocateAgentAdd" title="添加区域拥有人" :config="{ width: 700, height: 400 }">
      <div class="popup-confirm_region-allocate-agent-add">
        <form-validate ref="regionAllocateAgentAdd">
          <form-validate-field label="区域名称：">
            <p>{{ popup.regionAllocateAgentAdd.attr.info.name }}</p>
          </form-validate-field>
          <form-validate-field label="拥有人：">
            <options-selector :mode="4" placeholder="店主/手机号"
              :config="{ req: popup.regionAllocateAgentAdd.fn.distributorQuery }"
              @change="popup.regionAllocateAgentAdd.fn.distributorChangeHandler"></options-selector>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmRegionAllocateApply" title="区域申请历史" :config="{ width: 700, height: 400 }">
      <div class="popup-confirm_region-allocate-apply">
        <list-page :hiddenToolbar="true" :config="popup.regionAllocateApply.attr.page.config"
          :form="popup.regionAllocateApply.attr.page.form"></list-page>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmRegionAllocateReleasePage" :title="popup.regionAllocateReleasePage.attr.title"
      :config="{ width: 700, height: 500 }">
      <div class="popup-confirm_region-allocate-release-page">
        <div class="u-tab">
          <div class="t-item" :class="{ 't-item-active': popup.regionAllocateReleasePage.attr.tab === 1 }"
            @click="popup.regionAllocateReleasePage.attr.tab = 1">
            <span>更新</span>
          </div>
          <div class="t-item" :class="{ 't-item-active': popup.regionAllocateReleasePage.attr.tab === 2 }"
            @click="popup.regionAllocateReleasePage.attr.tab = 2">
            <span>修改记录</span>
          </div>
        </div>
        <template v-if="
          popup.regionAllocateReleasePage.attr.tab === 1
        ">
          <div class="u-box u-box_field">
            <div class="f-item">
              <div class="i-label">
                <span>备注：</span>
              </div>
              <div class="i-value">
                <el-input type="textarea" v-model="popup.regionAllocateReleasePage.attr.type2form[1].data.remark">
                </el-input>
              </div>
            </div>
          </div>
        </template>
        <div class="u-box u-box_history" v-if="popup.regionAllocateReleasePage.attr.tab === 2">
          <div class="h-list">
            <el-table :data="popup.regionAllocateReleasePage.attr.history.list" stripe style="width: 100%">
              <el-table-column prop="date" label="序号">
                <template slot-scope="props">
                  <p>{{ props.row.id }}</p>
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
      <template v-if="popup.regionAllocateReleasePage.attr.tab === 2">
        <p slot="footer-left">
          共
          <em>{{ popup.regionAllocateReleasePage.attr.history.total }}条记录</em>
        </p>
        <el-pagination background layout="prev, pager, next, jumper"
          :total="popup.regionAllocateReleasePage.attr.history.total"
          @current-change="popup.regionAllocateReleasePage.fn.historyPageChangeHandler" slot="footer-right">
        </el-pagination>
      </template>
    </popup-confirm>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import popupConfirm from '@/components/popup/type/confirm';
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

import { model } from '@/model';

const { RegionAllocate, RegionAllocateAgent, Member, Approval } = model.collection;

export default {
  components: {
    formValidate,
    formValidateField,
    popupConfirm,
    listPage,
    optionsSelector,
    grid,
    gridItem,
    popupConfirm
  },
  data() {
    return {
      entitys: {
        RegionAllocate,
        Approval
      },
      options: {
        fn: {
          statusChangeHandler: (e) => {
            this.page.form.query.status = e;
          },
          regionChangeHandler: (e) => {
            const [provinceId, cityId, districtId] = e.map(i => i.id);
            this.page.form.query.provinceId = provinceId;
            this.page.form.query.cityId = cityId;
            this.page.form.query.districtId = districtId;
          },
          distributorQuery: (e, ok) => {
            Member.sendApi('page', {
              params: {},
              data: { query: { keyword: e, type: 7 } }
            }).then((res) => {
              const { data } = res;
              ok(
                data.map((i) => ({
                  value: i.id,
                  label: `${i.nickname}/${i.id}`
                }))
              );
            });
          },
          distributorChangeHandler: (e) => {
            this.page.form.query.memberId = e;
          },
        }
      },
      page: {
        config: {
          entity: 'RegionAllocate',
          action: 'allocatePage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'provinceName',
              label: '省份'
            },
            {
              prop: 'cityName',
              label: '市'
            },
            {
              prop: 'districtName',
              label: '县/区'
            },
            {
              prop: 'name',
              label: '区域'
            },
            {
              prop: 'remark',
              label: '街道'
            },
            {
              prop: '',
              label: '店主/ID',
              VNodes: [
                ({ h, props }) => {
                  return h('p', props.row._raw.regionAllocateAgentName ? props.row._raw.regionAllocateAgentName + "/" + props.row._raw.regionAllocateAgentId : '--');
                }
              ]
            },
            {
              prop: '',
              label: '备注',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(props.row,'_raw.note'));
                }
              ]
            },
            {
              prop: '',
              label: '是否显示',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.$_.get(props.row._raw, 'visible') ? '是' : '否');
                }
              ]
            },
            {
              prop: '',
              label: '申请状态',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.entitys.RegionAllocate.filter('status', props.row._raw.status));
                }
              ]
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: (props) => {
                const btn = [
                  ({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRegionAllocateInfo.open({
                            triggerOpen: this.popup.regionAllocateInfo.fn.openHandler, params: props
                          });
                        }
                      }
                    }, '查看');
                  },
                  ({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRegionAllocateUpdate.open({
                            triggerOpen: this.popup.regionAllocateUpdate.fn.openHandler,
                            triggerClose: this.popup.regionAllocateUpdate.fn.closeHandler,
                            params: props
                          });
                        }
                      }
                    }, '编辑');
                  },
                  ({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRegionAllocateApply.open({
                            triggerOpen: this.popup.regionAllocateApply.fn.openHandler,
                            params: props
                          });
                        }
                      }
                    }, '区域申请记录');
                  }
                ];
                if (props.row._raw.status === 4) {
                  btn.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'danger', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRegionAllocateReleasePage.open({
                            triggerOpen: this.popup.regionAllocateReleasePage.fn.openHandler,
                            triggerClose: this.popup.regionAllocateReleasePage.fn.closeHandler,
                            params: props.row
                          });
                        }
                      }
                    }, '释放区域');
                  });
                }
                if (props.row._raw.status === 1) {
                  btn.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmRegionAllocateAgentAdd.open({
                            triggerOpen: this.popup.regionAllocateAgentAdd.fn.openHandler,
                            triggerClose: this.popup.regionAllocateAgentAdd.fn.closeHandler,
                            triggerHidden: this.popup.regionAllocateAgentAdd.fn.hiddenHandler,
                            params: props.row
                          });
                        }
                      }
                    }, '添加区域拥有人');
                  });
                  btn.push(({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'danger', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.delete(props.row);
                        }
                      }
                    }, '删除');
                  });
                }
                return btn;
              }
            }
          ],
          selectable: true
        },
        form: {
          query: {
            type: '',
            status: '',
            provinceId: '',
            cityId: '',
            districtId: '',
            keyword: '',
            memberId: ''
          },
          order: {}
        }
      },
      popup: {
        regionAllocateAdd: {
          attr: {
            form: RegionAllocate.formUtil().generator('add', 'default')
          },
          fn: {
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map(i => i._raw.id);
              const [provinceName, cityName, districtName] = e.map(i => i._raw.name);
              this.popup.regionAllocateAdd.attr.form.provinceId.value = provinceId;
              this.popup.regionAllocateAdd.attr.form.cityId.value = cityId;
              this.popup.regionAllocateAdd.attr.form.districtId.value = districtId;
              this.popup.regionAllocateAdd.attr.form.provinceName.value = provinceName;
              this.popup.regionAllocateAdd.attr.form.cityName.value = cityName;
              this.popup.regionAllocateAdd.attr.form.districtName.value = districtName;
            },
            distributorQuery: (e, ok) => {
              Member.sendApi('page', {
                params: {},
                data: { query: { keyword: e, type: 7 } }
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.mobile}`
                  }))
                );
              });
            },
            distributorChangeHandler: (e) => {
              this.popup.regionAllocateAdd.attr.form.regionAllocateAgent.value.memberId.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.regionAllocateAdd.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  RegionAllocate.sendApi('allocateAdd', { params: {}, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: '区域添加成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '区域添加失败',
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
              });
            },
            hiddenHandler:()=>{
              this.popup.regionAllocateAdd.attr.form = RegionAllocate.formUtil().generator('add', 'default');
            }
          }
        },
        regionAllocateInfo: {
          attr: {
            info: {}
          },
          fn: {
            openHandler: (ok, params) => {
              RegionAllocate.sendApi('allocateInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.regionAllocateInfo.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取区域信息失败',
                    type: 'error'
                  });
                }
              });
            }
          }
        },
        regionAllocateUpdate: {
          attr: {
            info: {},
            form: RegionAllocate.formUtil().generator('update', 'default')
          },
          fn: {
            fill: (callback) => {
              callback(RegionAllocate, this.popup.regionAllocateUpdate.attr.info);
            },
            provinceChangeHandler: (e) => {
              const [provinceId, cityId, districtId] = e.map(i => i._raw.id);
              const [provinceName, cityName, districtName] = e.map(i => i._raw.name);
              this.popup.regionAllocateUpdate.attr.form.provinceId.value = provinceId;
              this.popup.regionAllocateUpdate.attr.form.cityId.value = cityId;
              this.popup.regionAllocateUpdate.attr.form.districtId.value = districtId;
              this.popup.regionAllocateUpdate.attr.form.provinceName.value = provinceName;
              this.popup.regionAllocateUpdate.attr.form.cityName.value = cityName;
              this.popup.regionAllocateUpdate.attr.form.districtName.value = districtName ? districtName : '';
            },
            openHandler: (ok, params) => {
              RegionAllocate.sendApi('allocateInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.regionAllocateUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取区域信息失败',
                    type: 'error'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              this.$refs.regionAllocateUpdate.validate().then((result) => {
                const { ok, form } = result;
                if (ok) {
                  RegionAllocate.sendApi('allocateUpdate', { params: { id: this.popup.regionAllocateUpdate.attr.info.id }, data: form }).then(
                    (res) => {
                      const { status, data } = res;
                      if (status) {
                        okCallback();
                        this.$refs.listPage.query();
                        this.$message({
                          message: '区域更新成功',
                          type: 'success'
                        });
                      } else {
                        errorCallback();
                        this.$message({
                          message: '区域更新失败',
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
              });
            }
          }
        },
        regionAllocateAgentAdd: {
          attr: {
            info: {},
            form: {
              allocateId: 0,
              memberId: 0
            }
          },
          fn: {
            distributorQuery: (e, ok) => {
              Member.sendApi('page', {
                params: {},
                data: { query: { keyword: e, type: 7 } }
              }).then((res) => {
                const { data } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: `${i.nickname}/${i.mobile}`
                  }))
                );
              });
            },
            distributorChangeHandler: (e) => {
              this.popup.regionAllocateAgentAdd.attr.form.memberId = e;
            },
            openHandler: (ok, params) => {
              const { id } = params;
              this.popup.regionAllocateAgentAdd.attr.info = params;
              this.popup.regionAllocateAgentAdd.attr.form.memberId = null;
              this.popup.regionAllocateAgentAdd.attr.form.allocateId = id;
              ok();
            },
            closeHandler: (okCallback, errorCallback) => {
              if (this.isObjHasBlank(this.popup.regionAllocateAgentAdd.attr.form)) {
                this.$message.warning('确认拥有人信息');
                errorCallback();
                return;
              }
              RegionAllocateAgent.sendApi('allocateAgentAdd', { params: this.popup.regionAllocateAgentAdd.attr.form, data: {} }).then(
                (res) => {
                  const { status, data } = res;
                  if (status) {
                    okCallback();
                    this.$refs.listPage.query();
                    this.$message({
                      message: '添加区域拥有人成功',
                      type: 'success'
                    });
                  } else {
                    errorCallback();
                    this.$message({
                      message: '添加区域拥有人失败',
                      type: 'warning'
                    });
                  }
                }
              );
            },
            hiddenHandler:()=>{
              this.popup.regionAllocateAgentAdd.attr.form = {
                allocateId: 0,
                memberId: 0
              };
            }
          }
        },
        regionAllocateApply: {
          attr: {
            page: {
              config: {
                entity: 'Approval',
                action: 'page',
                column: [
                  {
                    prop: 'id',
                    label: 'ID'
                  },
                  {
                    prop: '',
                    label: '申请人/ID',
                    VNodes: [
                      ({ h, props }) => {
                        return h('p', `${props.row._raw.applierName}/${props.row._raw.applierMemberId}`);
                      }
                    ]
                  },
                  {
                    prop: 'status',
                    label: '审核状态',
                    VNodes: [
                      ({ h, props }) => {
                        return h(
                          'p',
                          {
                            style: (() => {
                              let color = '';
                              if (props.row.status === 2) {
                                color = '#67C23A';
                              }
                              if (props.row.status === 3) {
                                color = '#E6A23C';
                              }
                              if (props.row.status === 4) {
                                color = '#F56C6C';
                              }
                              return {
                                color
                              };
                            })()
                          },
                          this.entitys.Approval.filter('status', props.row.status)
                        );
                      }
                    ]
                  },
                  {
                    prop: '',
                    label: '备注',
                    VNodes: [
                      ({ h, props }) => {
                        return h('p', props.row._raw.remark);
                      }
                    ]
                  },
                  {
                    prop: 'createTime',
                    label: '创建时间'
                  }
                ],
              },
              form: {
                query: {
                  typeId: 1,
                  regionAllocateId: 0
                },
                order: {
                  createTime: 'desc'
                }
              }
            }
          },
          fn: {
            openHandler: (ok, params) => {
              this.popup.regionAllocateApply.attr.page.form.query.regionAllocateId = params.row.id;
              ok();
            }
          }
        },
        regionAllocateReleasePage: {
          attr: {
            title: "释放区域",
            tab: 1,
            type2form: {
              1: {
                data: {
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
              data: {
                query: {
                  allocateId: 0
                }
              },
            },
          },
          fn: {
            historyPageChangeHandler: (pageIndex) => {
              this.popup.regionAllocateReleasePage.attr.history.params.pageIndex = pageIndex;
              this.popup.regionAllocateReleasePage.fn.getUpdateHistory();
            },
            getUpdateHistory: () => {
              RegionAllocate.sendApi("allocateReleasePage", {
                params: this.popup.regionAllocateReleasePage.attr.history.params,
                data: this.popup.regionAllocateReleasePage.attr.history.data,
              }).then((res) => {
                const { status, data, page } = res;
                if (status) {
                  this.popup.regionAllocateReleasePage.attr.history.list = data;
                  this.popup.regionAllocateReleasePage.attr.history.total = page.total;
                } else {
                  this.$message({
                    message: "释放区域修改记录获取失败",
                    type: "error",
                  });
                }
              });
            },
            openHandler: (ok, params) => {
              let { tab, type2form, history } = this.popup.regionAllocateReleasePage.attr;
              type2form[tab].data.remark = '';
              history.data.query.allocateId = params.id;
              this.popup.regionAllocateReleasePage.fn.getUpdateHistory();
              ok();
            },
            closeHandler: (ok, error) => {
              let { tab, type2form } = this.popup.regionAllocateReleasePage.attr;
              if (tab === 1) {
                error();
                this.release(this.$refs.popupConfirmRegionAllocateReleasePage.openOptions.params, type2form[tab].data.remark, ok)
              } else {
                ok()
              }
            },
          },
        },
      }
    };
  },
  watch: {
    'popup.regionAllocateAdd.attr.form.status.value': function (e) {
      this.popup.regionAllocateAdd.attr.form.regionAllocateAgent.value = null
      if (e !== 1) {
        this.popup.regionAllocateAdd.attr.form.regionAllocateAgent.value = RegionAllocateAgent.formUtil().generator('add', 'default');
      }
    }
  },
  methods: {
    release(row, remark, ok) {
      this.$confirm(`是否释放“${row.name}”，该操作无法返回。`, '释放区域', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        RegionAllocate.sendApi('allocateReleaseAdd', { params: { id: Number(row.id) }, data: { remark } }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message({
              message: '区域已释放',
              type: 'success'
            });
            this.$refs.listPage.query();
            ok();
          } else {
            this.$message({
              message: '区域释放失败',
              type: 'error'
            });
          }
        });
      }).catch((e) => {
        console.log(e)
      });
    },
    delete(row) {
      this.$confirm(`是否删除“${row.name}”，该操作无法返回。`, '删除区域', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        RegionAllocate.sendApi('allocateDelete', { params: { id: Number(row.id) }, data: {} }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message({
              message: '区域已删除',
              type: 'success'
            });
            this.$refs.listPage.query();
          } else {
            this.$message({
              message: '区域删除失败',
              type: 'error'
            });
          }
        });
      }).catch((e) => {
        console.log(e)
      });
    }
  }
};
</script>

<style lang="less">
.region-allocate-list {
  background: white;

  .popup-confirm {
    &_region-allocate-add {
      padding: 20px;
    }

    &_region-allocate-info {
      padding: 20px;
    }

    &_region-allocate-udpate {
      padding: 20px;
    }

    &_region-allocate-agent-add {
      padding: 20px;
    }

    &_region-allocate-apply {
      padding: 20px;
    }

    &_region-allocate-release-page {
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
  }
}
</style>
