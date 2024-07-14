<!--
 * @Author: 码上talk|RC
 * @Date: 2021-12-13 08:20:39
 * @LastEditTime: 2022-03-19 09:32:57
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/stock.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-stock">
    <div class="s-block">
      <fragment-board :type="1" :config="page.fn.loadConfig(page.result)"></fragment-board>
      <fragment-category-list :type="1" @select="page.attr.category = $event"></fragment-category-list>
    </div>
    <fragment-goods-list :type="1" :category="page.attr.category"></fragment-goods-list>
  </div>
</template>

<script>
  import fragmentBoard from './board';
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
                  imgUrl: 'datav/stock/background-stock.png',
                  label: '可用总数',
                  value: this.$_.get(res, 'stockValidQuantity', 0),
                  color: '#29B86A'
                },
                {
                  imgUrl: 'datav/stock/background-swe-stock.png',
                  label: '预售总数',
                  value: this.$_.get(res, 'stockPresaleQuantity', 0),
                  color: '#FF2E2E'
                }
              ];
            }
          },
          result: {},
        }
      }
    },
    created() {
      this.getPageInfo()
    },
    methods: {
      getPageInfo() {
        DatavBo.sendApi('pageInfo', {
          params: {
            page: 'stockStatistics'
          },
          data: {}
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
  .datav-stock {
    .s-block {
      display: flex;
      justify-content: space-evenly;
    }
  }
</style>