<!--
 * @Author: 码上talk|RC
 * @Date: 2021-12-13 08:21:57
 * @LastEditTime: 2022-03-19 09:31:41
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/delivery.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-delivery">
    <fragment-query :hiddenAxqStaff="true" ref="query" @query="page.fn.handleQuery($event)"
      @reset="page.fn.handleReset()">
    </fragment-query>
    <div class="d-block">
      <fragment-board :type="4" :config="page.fn.loadConfig(page.result)" @toGoodsInfo="page.attr.step = 2">
      </fragment-board>
      <fragment-category-list :type="4" label="商品数量" :form="page.form.query" @select="page.attr.category = $event">
      </fragment-category-list>
    </div>
    <fragment-goods-list :type="4" :category="page.attr.category" :form="page.form.query"></fragment-goods-list>
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
            category: {}
          },
          fn: {
            loadConfig: (res) => {
              return [{
                  imgUrl: 'datav/stock/background-delivery.png',
                  label: '送货单数量',
                  value: this.$_.get(res, 'stockDeliveryQuantity', 0),
                  color: '#5F75FE'
                },
                {
                  imgUrl: 'datav/stock/background-goods-number.png',
                  label: '商品数量',
                  value: this.$_.get(res, 'stockDeliveryGoodsItemsQuantity', 0),
                  color: '#7F4DCD'
                }
              ];
            },
            handleQuery: (e) => {
              this.page.attr.categoryId = ''
              const {
                startTime,
                endTime
              } = e || {};
              this.page.form.query.startTime = startTime;
              this.page.form.query.endTime = endTime;
              this.getPageInfo();
            },
            handleReset: () => {
              this.init();
            }
          },
          form: {
            query: {
              startTime: '',
              endTime: ''
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
        this.getPageInfo();
      },
      getPageInfo() {
        DatavBo.sendApi('pageInfo', {
          params: {
            page: 'stockDeliveryStatistics'
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
  .datav-delivery {
    .d-block {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
  }
</style>