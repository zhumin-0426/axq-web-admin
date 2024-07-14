<!--
 * @Author: 码上talk|RC
 * @Date: 2021-12-13 08:21:45
 * @LastEditTime: 2022-03-19 09:33:18
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/stock-in.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-stock-in">
    <template v-if="page.attr.step === 1">
      <fragment-query label="进仓人" ref="query" @query="page.fn.handleQuery($event)" @reset="init">
      </fragment-query>
      <div class="i-block">
        <fragment-board :type="2" :config="page.fn.loadConfig(page.result)"
          @toGoodsInfo="page.attr.step = 2">
        </fragment-board>
        <fragment-category-list :type="2" label="进仓数量" :form="page.form.query" @select="page.attr.category = $event">
        </fragment-category-list>
      </div>
    </template>
    <fragment-goods-list :step="page.attr.step" :type="2" :category="page.attr.category" :form="page.form.query"
      @back="page.fn.handleBack()">
    </fragment-goods-list>
  </div>
</template>

<script>
  import fragmentBoard from './board';
  import fragmentQuery from './query';
  import fragmentGoodsList from './goods-list';
  import fragmentCategoryList from './category-list';

  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;
  export default {
    components: {
      fragmentBoard,
      fragmentQuery,
      fragmentGoodsList,
      fragmentCategoryList
    },
    data() {
      return {
        page: {
          attr: {
            step: 1,
            category: {}
          },
          fn: {
            loadConfig: (res) => {
              return [{
                imgUrl: 'datav/stock/background-stock-in.png',
                label: '进仓总数',
                value: this.$_.get(res, 'stockInQuantity', 0)
              }];
            },
            handleQuery: (e) => {
              this.page.attr.category = {}
              const {
                id,
                startTime,
                endTime
              } = e || {};
              this.page.form.query.startTime = startTime;
              this.page.form.query.endTime = endTime;
              this.page.form.query.documentMakerId = id
              this.getPageInfo();
            },
            handleBack: () => {
              this.page.attr.step = 1;
              this.page.attr.category = {};
              this.init();
            }
          },
          form: {
            query: {
              startTime: '',
              endTime: '',
              documentMakerId: ''
            }
          },
          result: {},
        }
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.page.form.query.startTime = this.$dayjs().format('YYYY-MM-DD 00:00');
        this.page.form.query.endTime = this.$dayjs().format('YYYY-MM-DD HH:mm');
        this.page.form.query.documentMakerId = ''
        this.getPageInfo();
      },
      getPageInfo() {
        DatavBo.sendApi('pageInfo', {
          params: {
            page: 'stockInStatistics'
          },
          data: this.page.form
        }).then(res => {
          const {
            status,
            data
          } = res;
          status && (this.page.result = data);
        });
      }
    }
  }
</script>
<style lang="less">
  .datav-stock-in {
    .i-block {
      display: flex;
      justify-content: space-evenly;
    }
  }
</style>