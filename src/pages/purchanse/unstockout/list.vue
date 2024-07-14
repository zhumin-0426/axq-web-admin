<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2021-10-16 11:03:54
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/purchanse/unstockout/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page purchanse-unstockout-list">
    <div class="l-overview"></div>
    <div class="l-list">
      <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="['add']">
        <template slot="query">
          <div class="q-block">
            <div class="b-item" style="width:200px;">
              <time-picker ref="timePicker" @change="options.fn.timeChangeHandler"></time-picker>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="typeOptionsSelector"
                placeholder="订单类型"
                :config="{options: entitys.Purchanse._options.type, hidden: [3]}"
                @change="options.fn.typeChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="订单状态"
                :config="{options: entitys.Purchanse._options.status, hidden: [0, 1, 2, 5, 6, 7, 8, 9]}"
                @change="options.fn.statusChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item" style="width: 150px;">
              <options-selector
                :mode="4"
                ref="distributorOptionsSelector"
                placeholder="店主/ID/手机号"
                :config="{req: options.fn.distributorQuery}"
                @change="options.fn.distributorChangeHandler"
              ></options-selector>
            </div>
            <div class="b-item" style="width: 150px;">
              <options-selector
                :mode="4"
                placeholder="制单人"
                :config="{req: options.fn.documentMakerQuery}"
                @change="options.fn.documentMakerChangeHandler"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="订单/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
          <div class="q-block">
            <list-sort
              ref="listSort"
              :sort-list="options.fn.loadSortConfig"
              :order="page.form.order"
            ></list-sort>
          </div>
        </template>
        <template slot="action">
          <el-button size="small">批量打印</el-button>
        </template>
      </list-page>
    </div>
  </div>
</template>

<script>
import listPage from '@/components/list-page';
import listSort from '@/components/list-sort';
import optionsSelector from '@/components/options-selector';
import timePicker from '@/components/time-picker';
import { model } from '@/model';
import Printer from '@/components/axq/printer';

const { Purchanse, Member, AxqStaff } = model.collection;

const limitQueryType = [1, 2, 5, 6, 7];

export default {
  components: {
    listPage,
    listSort,
    optionsSelector,
    timePicker
  },
  data () {
    return {
      entitys: {
        Purchanse
      },
      options: {
        fn: {
          typeChangeHandler: (e) => {
            this.page.form.query.type = e || limitQueryType.join(',');
          },
          statusChangeHandler: (e) => {
            this.page.form.query.status = e || '3,4';
          },
          distributorQuery: (e, ok) => {
            Member.sendApi('page', { params: {}, data: { query: { type: 7, keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.nickname })));
            });
          },
          distributorChangeHandler: (e) => {
            this.page.form.query.memberId = e;
          },
          documentMakerQuery: (e, ok) => {
            AxqStaff.sendApi('staffPage', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: i.nickname })));
            });
          },
          documentMakerChangeHandler: (e) => {
            this.page.form.query.documentMakerId = e;
          },
          timeChangeHandler: (e) => {
            const [startTime, endTime] = e;
            this.page.form.query.approvedStartTime = startTime;
            this.page.form.query.approvedEndTime = endTime;
          },
          loadSortConfig: () => {
            const s = [{ label: '审核时间', value: 'approvedTime', order: 'desc' }];
            return s;
          }
        }
      },
      page: {
        config: {
          entity: 'Purchanse',
          action: 'page',
          column: [
            {
              fixed: true,
              prop: 'id',
              label: 'ID',
              width: '100'
            },
            {
              prop: 'sn',
              label: '编号'
            },
            {
              prop: '',
              label: '类型',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.entitys.Purchanse.filter('type', this.$_.get(props, 'row._raw.type')));
                }
              ]
            },
            {
              prop: 'amount',
              label: '售价'
            },
            {
              prop: '',
              label: '商品数量',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.$_.get(props, 'row._raw.goodsItemsQuantity')));
                }
              ]
            },
            {
              columns: (props) => {
                if (this.page.form.query.type !== 5) {
                  return [
                    {
                      prop: 'nickname',
                      label: '店主/ID',
                      VNodes: [
                        ({ h, props }) => {
                          const content = `${$_.get(props, 'row._raw.distributorName')}/${$_.get(props, 'row._raw.distributorId')}`
                          return h('p', content);
                        }
                      ]
                    },
                  ];
                } else {
                  return [
                    {
                      prop: 'recipient',
                      label: '收件人',
                      VNodes: [
                        ({ h, props }) => {
                          return h('p', this.blankGet(this.$_.get(props, 'row._raw.recipient')));
                        }
                      ]
                    }
                  ];
                }
              }
            },
            {
              prop: 'status',
              label: '状态',
              VNodes: [
                ({ h, props }) => {
                  return h('p',
                    {
                    }, this.entitys.Purchanse.filter('status', props.row.status));
                }
              ]
            },
            {
              columns: () => {
                if (this.page.form.query.type !== 5) {
                  return [
                    {
                      prop: 'integralAchieveGive',
                      label: '赠送业绩'
                    }
                  ];
                }
              }
            },
            {
              prop: '',
              label: '制单人',
              VNodes: [
                ({ h, props }) => {
                  return h('p',
                    {
                    }, this.blankGet(props.row._raw.documentMakerName));
                }
              ]
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              prop: '',
              label: '审核时间',
              VNodes: [
                ({ h, props }) => {
                  return h('p', this.blankGet(this.$_.get(props, 'row._raw.approvedTime')));
                }
              ]
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: (props) => {
                let btns = [
                  ({ h, props }) => {
                    return h('el-button', {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => { this.go(`/stock-out/add?purchanseId=${props.row.id}`); }
                      }
                    }, '去出库');
                  },
                  ({ h, props }) => {
                    return h('el-button',
                      {
                        props: { type: 'primary', size: 'mini' },
                        nativeOn: {
                          click: () => {
                            this.go(`/purchanse/${props.row.id}?type=${props.row._raw.type}&from=unstockout`);
                          }
                        }
                      },
                      '查看');
                  }
                ];
                if (this.$_.get(this.axqStaffInfo, 'accessExtraJson.allowedDoPrintInStockHouse') === 1) {
                  btns.push(
                    ({ h, props }) => {
                      return h('el-button',
                        {
                          props: { size: 'mini' },
                          nativeOn: {
                            click: () => {
                              this.printer.fn.do(props);
                            }
                          }
                        },
                        '打印');
                    },
                  );
                }
                return btns;
              }
            }
          ],
          selectable: true
        },
        form: {
          query: {
            type: limitQueryType.join(','),
            status: '3,4',
            memberId: '',
            documentMakerId: '',
            keyword: '',
            approvedStartTime: '',
            approvedEndTime: ''
          },
          order: {
            approvedTime: 'desc'
          }
        }
      },
      printer: {
        fn: {
          do: (props) => {
            new Printer(1).run({}, { purchanseId: props.row._raw.id });
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.purchanse-unstockout-list {
  background: white;
}
</style>
