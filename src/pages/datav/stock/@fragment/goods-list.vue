<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:30
 * @LastEditTime: 2022-03-19 16:54:25
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/goods-list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-goods_list">
    <div class="l-query">
      <div class="q-block">
        <el-autocomplete class="b-input" size="small" prefix-icon="el-icon-search" v-model="options.attr.value"
          :debounce="0" :fetch-suggestions="options.fn.querySearch" placeholder="请输入内容" :trigger-on-focus="false"
          @select="options.fn.handleSelect" @input="options.fn.handleInput">
        </el-autocomplete>
        <el-button type="primary" size="small" @click.native="options.fn.query">查询</el-button>
        <el-button size="small" @click.native="options.fn.reset">重置</el-button>
      </div>
      <div class="q-block" v-if="step === 2">
        <el-button class="b-back" type="primary" size="small" icon="el-icon-arrow-left" @click="$emit('back')">返回
        </el-button>
      </div>
    </div>
    <div class="l-nav" v-if="step === 1">
      导航：<span v-for="(item,i) in goods.attr.navList" :key="i">{{item}}></span>
    </div>
    <table class="l-table">
      <thead>
        <tr>
          <th class="th-name">名称</th>
          <template v-if="type===1">
            <th class="th-num">
              <sort label="可用数量" @toggleSort="goods.fn.handleSort($event,1)"></sort>
            </th>
            <th class="th-num">
              <sort label="预售数量" @toggleSort="goods.fn.handleSort($event,2)"></sort>
            </th>
          </template>
          <template v-if="type===2">
            <th class="th-num">
              <sort label="进仓数量" @toggleSort="goods.fn.handleSort($event)"></sort>
            </th>
          </template>
          <template v-if="type===3">
            <th class="th-num">
              <sort label="出仓数量" @toggleSort="goods.fn.handleSort($event)"></sort>
            </th>
          </template>
          <template v-if="type===4">
            <th class="th-num">
              <sort label="商品数量" @toggleSort="goods.fn.handleSort($event)"></sort>
            </th>
          </template>
          <th class="th-operation">操作</th>
        </tr>
      </thead>
      <tbody v-for="(item,i) in goodsList" :key="i">
        <tr :class="{'active' : goods.attr.activeindex === item.id}">
          <td>{{ $_.get(item,'name') }}</td>
          <template v-if="type===1">
            <td>{{ $_.get(item,'stockValid') }}</td>
            <td class="t-owe-stock">{{ $_.get(item,'stockPresale') }}</td>
          </template>
          <template v-else>
            <td>{{ $_.get(item,'quantity') }}</td>
          </template>
          <td>
            <div class="t-operation" @click="goods.fn.getGoodsInfo(item)">
              点击查看
              <i class="iconfont" :class="goods.attr.isGoodsItemShow && goods.attr.activeindex === item.id ? 
                'icon-xiangxiajiantou' : 'icon-youjiantou' "></i>
            </div>
          </td>
        </tr>
        <tr v-if="goods.attr.isGoodsItemShow && goods.attr.activeindex === item.id">
          <td class="goods-item" colspan="4">
            <goods-table :type="type" :goodsInfo="goodsInfo"></goods-table>
          </td>
        </tr>
      </tbody>
      <tbody v-if="goodsList.length === 0">
        <tr class="t-empty">
          <td colspan="4">暂无数据~</td>
        </tr>
      </tbody>
    </table>
    <el-pagination class="l-pagination" background layout="total, prev, pager, next, jumper"
      :total="page.pageTotal" @current-change="page.fn.handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
  import sort from './sort.vue';
  import goodsTable from './goods-table.vue'
  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;

  export default {
    components: {
      sort,
      goodsTable
    },
    props: {
      step: {
        type: Number,
        default: 1
      },
      category: Object,
      type: Number,
      form: Object
    },
    data() {
      return {
        options: {
          attr: {
            value: '',
            isDisable: true,
          },
          fn: {
            querySearch: (queryString, cb) => {
              if (!this.category.id && this.step === 1) {
                this.$message.warning('请先选择产品分类');
                return;
              }
              this.goods.form.query.keyword = queryString;
              let restaurants = [];
              this.goodsList.map(i => {
                restaurants.push({
                  value: i.name,
                  id: i.id
                })
              })
              let results = queryString ? restaurants.filter(this.options.fn.createFilter(queryString)) : restaurants;
              cb(results);
            },
            createFilter: (queryString) => {
              return (restaurant) =>  (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            },
            handleSelect: (e) => {
              const {
                id,
                value
              } = e
              this.goods.attr.activeindex = id
              this.goods.form.query.keyword = value
            },
            handleInput: (e) => {
              if (!this.category.id && this.step === 1) {
                this.$message.warning('请先选择产品分类');
                return;
              }
              this.goods.form.query.keyword = e
            },
            query: () => {
              if (!this.category.id && this.step === 1) {
                this.$message.warning('请先选择产品分类');
                return;
              }
              this.goods.attr.activeindex = -1;
              this.goods.fn.getGoodsPage();
            },
            reset: () => {
              if (!this.category.id && this.step === 1) return this.$message.warning('请先选择产品分类');
              this.options.attr.value = '';
              this.goods.form.query.keyword = '';
              this.page.params.pageIndex = 1;
              this.goods.attr.activeindex = -1;
              this.goods.fn.getGoodsPage();
            }
          }
        },
        page: {
          params: {
            pageIndex: 1,
            pageSize: 10
          },
          pageTotal: 0,
          fn: {
            handlePageChange: (e) => {
              this.page.params.pageIndex = e;
              this.goods.fn.getGoodsPage();
            }
          }
        },
        goods: {
          attr: {
            step: 1,
            navList: [],
            activeindex: -1,
            isGoodsItemShow: false
          },
          form: {
            query: {
              type: 1,
              categoryId: '',
              keyword: '',
              startTime: '',
              endTime: '',
              documentMakerId: '',
            },
            order: {
              stockValid: '',
              stockPresale: '',
              quantity: ''
            },
          },
          fn: {
            handleSort: (e, n) => {
              if (n && n === 1) {
                this.goods.form.order.stockValid = e;
                this.goods.form.order.stockPresale = '';
              } else if (n && n === 2) {
                this.goods.form.order.stockValid = '';
                this.goods.form.order.stockPresale = e;
              } else {
                this.goods.form.order.stockValid = '';
                this.goods.form.order.stockPresale = '';
                this.goods.form.order.quantity = e
              }
              this.goods.fn.getGoodsPage();
            },
            getSubCategory: (item) => {
              const {
                id,
                name
              } = item || {};
              this.goods.attr.categoryId = id;
              this.goods.attr.navList.splice(1, 1, name);
              this.goods.fn.getGoodsPage();
            },
            getGoodsPage: () => {
              DatavBo.sendApi('goodsPage', {
                params: this.page.params,
                data: this.goods.form
              }).then(res => {
                const {
                  status,
                  data,
                  page
                } = res || {}
                if (status) {
                  this.goodsList = data;
                  this.page.pageTotal = page.total;
                }
              })
            },
            getGoodsInfo: (item) => {
              const {
                id
              } = item
              if (this.goods.attr.activeindex !== id) {
                if (this.goods.attr.isGoodsItemShow === false) {
                  this.goods.attr.isGoodsItemShow = true;
                }
                this.goods.attr.activeindex = id ;
              } else {
                this.goods.attr.isGoodsItemShow = !this.goods.attr.isGoodsItemShow;
              }
              DatavBo.sendApi('goodsInfo', {
                params: {},
                data: {
                  query: {
                    type: this.type,
                    id,
                    startTime: this.goods.form.query.startTime,
                    endTime: this.goods.form.query.endTime,
                    documentMakerId: this.goods.form.query.documentMakerId
                  }
                }
              }).then(res => {
                const {
                  status,
                  data
                } = res || {};
                status && (this.goodsInfo = data);
              })
            }
          }
        },
        goodsList: [],
        goodsInfo: {}
      };
    },
    watch: {
      'type': {
        handler(v, o) {
          if (v !== o && this.step !== 2) {
            this.page.pageTotal = 0;
            this.page.params.pageIndex = 1;
            this.goods.form.query.type = v;
            this.goods.attr.value = '' ;
            this.goods.form.query.keyword = '';
            this.goods.form.query.startTime = '' ;
            this.goods.form.query.endTime = '' ;
            this.goods.form.query.documentMakerId = '';
            this.goods.form.query.operatorId = '';
            this.goodsList = [];
          }
        }
      },
      'category': {
        handler(v, o) {
          if (v && v !== o) {
            this.options.attr.value = '';
            this.goods.attr.step = 1;
            this.goods.attr.navList = [];
            this.goods.attr.navList.push(v.name);
            this.page.params.pageIndex = 1;
            this.goods.form.query.keyword = '';
            this.goods.form.query.categoryId = v.id;
            if (this.form) {
              this.goods.form.query.startTime = this.form.startTime;
              this.goods.form.query.endTime = this.form.endTime;
              this.goods.form.query.documentMakerId = this.form.documentMakerId;
            }
            this.goods.fn.getGoodsPage();
          }
        },
        deep: true
      },
      'form': {
        handler(v, o) {
          this.page.pageTotal = 0;
          this.page.params.pageIndex = 1;
          this.goodsList = [];
        },
        deep: true
      },
      'step': {
        handler(v, o) {
          this.goodsList = [];
          this.page.pageTotal = 0;
          this.page.params.pageIndex = 1;
          if (v === 2) {
            this.goods.attr.categoryId = '';
            this.goods.form.query.startTime = this.form.startTime;
            this.goods.form.query.endTime = this.form.endTime;
            this.goods.form.query.documentMakerId = this.form.documentMakerId;
            this.goods.fn.getGoodsPage();
          }
        }
      }
    },
    created() {
      this.goods.form.query.type = this.type;
    }
  };
</script>

<style lang="less" scoped>
  .datav-goods_list {
    margin: 20px 0;
    padding: 20px 0;
    background: #fff;

    .l-query {
      padding: 0 20px;
      height: 66px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .q-block {

        .b-input {
          margin-right: 20px;
          width: 250px;
        }

        .b-back {
          margin-right: 10px;
        }
      }

    }

    .l-nav {
      padding: 0 20px;
      display: flex;
    }

    .l-table {
      width: 97%;
      margin: 10px 20px;
      border-collapse: collapse;
      border-spacing: 0;
      empty-cells: show;
      border: 1px solid #cbcbcb;

      thead {
        width: 100%;
        height: 39px;
        background: #faf7f8;

        tr {
          th {
            padding-left: 10px;
            border-right: 1px solid #cbcbcb;
            text-align: left;
          }

          .th-num {
            width: 300px;
          }

          .th-operation {
            width: 200px;
          }
        }
      }

      tbody {
        tr {
          height: 42px;

          td {
            padding-left: 10px;
            border-top: 1px solid #cbcbcb;
            border-right: 1px solid #cbcbcb;

            .t-operation {
              color: #2D8CF0;
            }
          }

          .t-owe-stock {
            color: #ff2f2f;
          }

          .t-goods-item {
            overflow: hidden;
          }

        }

        .t-empty {
          text-align: center;
        }

        .active {
          background: #edf6ff;
        }
      }
    }

    .l-pagination {
      margin: 10px 20px;
    }
  }
</style>