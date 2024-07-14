<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:30
 * @LastEditTime: 2021-08-18 08:48:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/cash-register/@fragment/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="case-register_list">
    <list-page ref="listPage" :config="page.config" :form="page.form" :hidden-action="['add']">
      <template slot="query">
        <div class="q-block">
          <div class="b-item">
            <options-selector
              :mode="1"
              placeholder="收银机状态"
              :config="{entity: 'CashRegister', type: 'status'}"
              @change="() => {}"
            ></options-selector>
          </div>
        </div>
        <div class="q-block">
          <div class="b-item">
            <el-input size="small" placeholder="店铺/收银编号" v-model="page.form.query.keyword"></el-input>
          </div>
        </div>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';

export default {
  components: {
    listPage,
    optionsSelector
  },
  data () {
    return {
      page: {
        config: {
          entity: 'CashRegister',
          action: 'page',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'sn',
              label: '编号',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, 'XKSD-92342341231231-1232');
                }
              ]
            },
            {
              prop: 'name',
              label: '店铺',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, '小Q的店铺');
                }
              ]
            },
            {
              prop: 'status',
              label: '最新上线时间',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, '2021-07-21 12:43');
                }
              ]
            },
            {
              prop: 'status',
              label: '状态',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, '在线');
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
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {

                        }
                      }
                    },
                    '查看');
                }
              ]
            }
          ],
          selectable: true
        },
        form: {
          query: {
            status: '',
            districtId: '',
            type: '',
            keyword: ''
          },
          order: {}
        }
      }
    };
  }
};
</script>
