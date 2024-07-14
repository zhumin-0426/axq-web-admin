<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-22 11:49:23
 * @LastEditTime: 2022-03-12 15:58:28
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/goods/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page goods-list">
    <div class="l-list">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$_.get(axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 ? null : go('/goods/add')"
        @form-reset="page.fn.resetHandler"
      >
        <template slot="query">
          <div class="q-block">
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="typeOptionsSelector"
                placeholder="品牌"
                :config="{entity: 'Goods', type: 'type'}"
                @change="page.form.query.type = $event"
              ></options-selector>
            </div>
            <div class="b-item">
              <options-selector
                :mode="1"
                ref="statusOptionsSelector"
                placeholder="在售情况"
                :config="{entity: 'Goods', type: 'status'}"
                @change="page.form.query.status = $event"
              ></options-selector>
            </div>
          </div>
          <div class="q-block">
            <div class="b-item">
              <el-input size="small" placeholder="商品/编号" v-model="page.form.query.keyword"></el-input>
            </div>
          </div>
        </template>
        <template slot="action">
          <el-button type="danger" size="small">下架</el-button>
        </template>
      </list-page>
    </div>
  </div>
</template>

<script>

import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import switchSelector from '@/components/switch-selector';
import imgVideoPreviewer from '@/components/img-video-previewer';
import { model } from '@/model';

const { Goods } = model.collection;

export default {
  components: {
    listPage,
    optionsSelector,
    switchSelector,
    imgVideoPreviewer
  },
  data () {
    return {
      options: {
        fn: {
          regionChangeHandler: (e) => {
            const [provinceId, cityId, districtId] = e;
            this.page.form.query.provinceId = provinceId;
            this.page.form.query.cityId = cityId;
            this.page.form.query.districtId = districtId;
          }
        }
      },
      page: {
        config: {
          entity: 'Goods',
          action: 'page',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'name',
              label: '名称',
              width: 110
            },
            {
              prop: 'name',
              label: '封面',
              width: 110,
              VNodes: [
                ({ h, props }) => {
                  return h(imgVideoPreviewer, {
                    props: {
                      src: props.row.thumbnail
                    }
                  });
                }
              ]
            },
            {
              prop: 'amount',
              label: '售价'
            },
            {
              prop: '',
              label: '库存',
              VNodes: [
                ({ h, props }) => {
                  return h('p', props.row._raw.stock);
                }
              ]
            },
            {
              prop: '',
              label: '是否可兑换',
              VNodes: [
                ({ h, props }) => {
                  return h('p', props.row._raw.isExchange ? '是' : '否');
                }
              ]
            },
            {
              prop: '',
              label: '是否可售',
              width: 110,
              VNodes: [
                ({ h, props }) => {
                  return h(switchSelector, {
                    props: {
                      mode: 2,
                      tip: '更改商品售卖状态，是否继续？',
                      config: { value: !!props.row._raw.status }
                    },
                    on: {
                      change: (e) => {
                        this.switchSelector.fn.updateStatus(props.row, e);
                      }
                    }
                  });
                }
              ]
            },
            {
              prop: '',
              label: '店铺是否可见',
              width: 110,
              VNodes: [
                ({ h, props }) => {
                  return h(switchSelector, {
                    props: {
                      mode: 2,
                      tip: '更改商品店铺可见状态状态，是否继续？',
                      config: { value: !!props.row._raw.isShowOnShop }
                    },
                    on: {
                      change: (e) => {
                        this.switchSelector.fn.updateIsShowOnShop(props.row, e);
                      }
                    }
                  });
                }
              ]
            },
            {
              prop: '',
              label: '小程序是否可售',
              width: 110,
              VNodes: [
                ({ h, props }) => {
                  return h(switchSelector, {
                    props: {
                      mode: 2,
                      tip: '更改商品小程序售卖状态，是否继续？',
                      config: { value: !!props.row._raw.isShowOnMa }
                    },
                    on: {
                      change: (e) => {
                        this.switchSelector.fn.updateIsShowOnMp(props.row, e);
                      }
                    }
                  });
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
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.go(`/goods/${props.row.id}`);
                        }
                      }
                    },
                    '查看');
                },
                ({ h, props }) => {
                  return h('el-button', {
                    props: { type: 'primary', size: 'mini', disabled: this.$_.get(this.axqStaffInfo, 'accessExtraJson.allowedModifyGoodsModule') !== 1 },
                    nativeOn: {
                      click: () => { this.go(`/goods/update/${props.row.id}`); }
                    }
                  }, '编辑');
                }
              ]
            }
          ],
          selectable: true
        },
        form: {
          query: {
            type: '',
            status: '',
            keyword: ''
          },
          order: {}
        },
        fn: {
          resetHandler: () => {
            this.$refs.typeOptionsSelector.reset();
            this.$refs.statusOptionsSelector.reset();
          }
        }
      },
      switchSelector: {
        fn: {
          updateStatus: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            Goods.sendApi('updateSingleField', { params: { id, type: 1 }, data: { value: value ? 1 : 0, remark: '' } }).then(res => {
              const { status } = res;
              if (status) {
                ok();
                this.$message({
                  message: '更新商品状态成功',
                  type: 'success'
                });
                this.$refs.listPage.query();
              } else {
                error();
                this.$message({
                  message: '更新商品状态失败',
                  type: 'error'
                });
              }
            });
          },
          updateIsShowOnShop: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            Goods.sendApi('updateSingleField', { params: { id, type: 2 }, data: { value: value ? 1 : 0, remark: '' } }).then(res => {
              const { status } = res;
              if (status) {
                ok();
                this.$message({
                  message: '更新商品店铺显示状态成功',
                  type: 'success'
                });
                this.$refs.listPage.query();
              } else {
                error();
                this.$message({
                  message: '更新商品店铺显示状态失败',
                  type: 'error'
                });
              }
            });
          },
          updateIsShowOnMp: (row, e) => {
            const { id } = row._raw;
            const { value, ok, error } = e;
            Goods.sendApi('updateSingleField', { params: { id, type: 4 }, data: { value: value ? 1 : 0, remark: '' } }).then(res => {
              const { status } = res;
              if (status) {
                ok();
                this.$message({
                  message: '更新商品小程序显示状态成功',
                  type: 'success'
                });
                this.$refs.listPage.query();
              } else {
                error();
                this.$message({
                  message: '更新商品小程序显示状态失败',
                  type: 'error'
                });
              }
            });
          }
        }
      }
    };
  }
};
</script>

<style lang="less">
.goods-list {

  .img-video-previewer {
    width: 100px;
    height: 100px;
  }
}
</style>
