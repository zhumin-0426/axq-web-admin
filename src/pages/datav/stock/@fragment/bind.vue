<!--
 * @Author: 码上talk|RC
 * @Date: 2021-12-13 08:24:11
 * @LastEditTime: 2022-03-19 16:58:34
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/bind.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-bind">
    <fragment-query label="绑码人" @query="page.fn.handleQuery($event)" @reset="page.fn.handleReset()">
    </fragment-query>
    <fragment-board :type="5" :config="page.fn.loadConfig(page.result)"></fragment-board>
  </div>
</template>

<script>
  import fragmentBoard from './board';
  import fragmentQuery from './query';

  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;
  export default {
    components: {
      fragmentBoard,
      fragmentQuery
    },
    data() {
      return {
        page: {
          attr: {
            categoryId: ''
          },
          fn: {
            loadConfig: (res) => {
              return [{
                imgUrl: 'datav/stock/background-bind.png',
                label: '绑码数量',
                value: this.$_.get(res, 'quantity', 0)
              }];
            },
            handleQuery: (e) => {
              const {
                id,
                startTime,
                endTime
              } = e || {};
              this.page.form.query.startTime = startTime;
              this.page.form.query.endTime = endTime;
              this.page.form.query.operatorId = id;
              this.getPageInfo();
            },
            handleReset: () => {
              this.init();
            }
          },
          form: {
            query: {
              startTime: '',
              endTime: '',
              operatorId: ''
            }
          },
          result: {}
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
        this.page.form.query.operatorId = '';
        this.getPageInfo();
      },
      getPageInfo() {
        DatavBo.sendApi('pageInfo', {
          params: {
            page: 'captchaBindStatistics'
          },
          data: this.page.form
        }).then(res => {
          const {
            status,
            data
          } = res;
          if (status) {
            this.page.result = data
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .datav-bind {}
</style>