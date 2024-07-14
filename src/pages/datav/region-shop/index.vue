<template>
  <div class="shop-datav">

    <div class="d-query">
      <div class="q-block">
        <span class="b-name">选择地区：</span>
        <options-selector :mode="3"
          :config="{ key: 'sysRegion',  checkStrictly: true ,endValue:'city'}"
          @change="options.fn.regionChangeHandler"></options-selector>
      </div>
      <div class="q-block">
        <el-button type="primary" size="small" @click="page.fn.handleSearch">搜索</el-button>
        <el-button size="small" @click="page.fn.handleReset">重置</el-button>
      </div>
    </div>

    <fragment-board :config="page.fn.loadConfig(page.result)" :shop-data="page.result.shopData"></fragment-board>

    <div class="d-map">
      <echarts-map class="m-map" v-if="page.form.query.level !== 'district' && mapData.length !== 0" :mapData="mapData"
        :mapType="page.attr.mapType">
      </echarts-map>
      <div class="m-region_table">
        <div class="t-title">{{ page.attr.currentName }}店铺分析</div>
        <table class="t-table">
          <thead>
            <tr>
              <th>地区</th>
              <th>
                <fragment-sort label="区域数量" @toggleSort="page.fn.handleSort($event,1)">
                </fragment-sort>
              </th>
              <th>
                <fragment-sort label="店铺数量" @toggleSort="page.fn.handleSort($event,2)">
                </fragment-sort>
              </th>
            </tr>
          </thead>
          <template v-if="page.form.query.level !== 'district'">
            <tbody v-for="(item1,index1) in provinceList" :key="index1">
              <tr @click="page.fn.handleProvinceSelect(item1)"
                :class="page.attr.isActive && page.attr.activeIndex === item1.id ? 'active' : '' "
                style="height: 50px;">
                <td>
                  {{ $_.get(item1,'name') }}
                  <i class="iconfont" :class="page.attr.isActive && page.attr.activeIndex === item1.id ? 
                'icon-xiangxiajiantou' : 'icon-youjiantou' "></i>
                </td>
                <td>{{  $_.get(item1,'regionAllocateCount') }}</td>
                <td>{{ $_.get(item1,'shopCount') }}</td>
              </tr>
              <template v-if="page.attr.isActive && page.attr.activeIndex === item1.id ">
                <tr v-for="(item2,index2) in listData" :key="index2" style="height: 40px;"
                  @click="page.fn.handleCitySelect(item2)">
                  <td style="padding-left:20px;">
                    {{ $_.get(item2,'name') }}
                    <i class="iconfont icon-youjiantou"></i>
                  </td>
                  <td>{{  $_.get(item2,'regionAllocateCount') }}</td>
                  <td>{{ $_.get(item2,'shopCount') }}</td>
                </tr>
              </template>
            </tbody>
          </template>
          <template v-else>
            <tbody v-for="(item,index) in listData" :key="index">
              <tr style="height: 50px;">
                <td>{{ $_.get(item,'name') }}</td>
                <td>{{ $_.get(item,'regionAllocateCount') }}</td>
                <td>{{ $_.get(item,'shopCount') }}</td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import fragmentBoard from './@fragment/board';
  import fragmentSort from './@fragment/sort.vue';
  import optionsSelector from '@/components/options-selector';
  import { echartsMap } from '@/libs/echarts';

  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;

  export default {
    components: {
      fragmentBoard,
      fragmentSort,
      optionsSelector,
      echartsMap
    },
    data() {
      return {
        options: {
          attr: {
            name: '',
            adcode:''
          },
          form: {
            query: {
              level: '',
              pId: 0
            },
          },
          fn: {
            regionChangeHandler: (e) => {
              if (e.length !== 0) {
                const {
                  id,
                  _raw
                } = e[e.length - 1]
                this.options.form.query.pId = id;
                this.options.attr.name = _raw.name;
                this.options.attr.adcode = _raw.adcode;
                this.options.form.query.level = e.length === 1 ? 'city' : 'district';
                return
              }
              this.options.attr.name = '全国';
              this.options.form.query.pId = 0;
              this.options.form.query.level = 'province'
            }
          }
        },
        page: {
          attr: {
            isActive: false,
            activeIndex: -1,
            currentName: '全国',
            mapType:'china'
          },
          form: {
            query: {
              level: 'province',
              pId: 0
            },
            order: {
              regionAllocateCount: 'desc',
              shopCount: ''
            }
          },
          fn: {
            loadConfig: (res) => {
              return [{
                  imgUrl: 'datav/region-shop/background-region-num.png',
                  label: '区域数量',
                  value: this.$_.get(res, 'regionAllocateCount', 0),
                },
                {
                  imgUrl: 'datav/region-shop/background-authorized-region-num.png',
                  label: '已授权区域',
                  value: this.$_.get(res, 'regionAllocateAuthorizeCount', 0),
                },
                {
                  imgUrl: 'datav/region-shop/background-can-apply-region-num.png',
                  label: '可申请区域',
                  value: this.$_.get(res, 'regionAllocateCanApplyCount', 0),
                },
                {
                  imgUrl: 'datav/region-shop/background-shop-num.png',
                  label: '店铺数量',
                  value: this.$_.get(res, 'shopCount', 0)
                }
              ]
            },
            handleSearch: () => {
              this.page.form.query.level = this.options.form.query.level
              this.page.form.query.pId = this.options.form.query.pId
              this.page.attr.currentName = this.options.attr.name;
              this.page.attr.mapType = this.options.form.query.level === 'province' ? 'china' :
              this.formatProvince(this.options.attr.name);
              this.getRegion();
              this.getPageInfo();

            },
            handleReset: () => {
              this.page.attr.currentName = '全国';
              this.page.form.query.level = 'province';
              this.page.form.query.pId = 0;
              this.page.attr.mapType = 'china'
              this.getRegion();
              this.getPageInfo();
            },
            handleSort: (e, n) => {
              if (n === 1) {
                this.page.form.order.regionAllocateCount = e;
                this.page.form.order.shopCount = '';
              } else {
                this.page.form.order.regionAllocateCount = '';
                this.page.form.order.shopCount = e;
              }
              if (!this.page.attr.isActive) {
                this.page.form.query.pId = 0;
                this.page.form.query.level = 'province';
              }
              this.getRegion();
            },
            handleProvinceSelect: (item) => {
              const {
                id,
                name
              } = item;
              this.page.attr.currentName = name;
              this.page.attr.mapType = this.formatProvince(name)
              if (this.page.attr.activeIndex !== id) {
                this.page.form.query.pId = id
                this.page.form.query.level = 'city'
                this.page.attr.activeIndex = id;
                this.page.attr.isActive = this.page.attr.isActive === false ? true : false;
                this.getRegion();
                this.getPageInfo();
              } else {
                this.page.attr.isActive = !this.page.attr.isActive
              }
            },
            handleCitySelect: (item) => {
              const {
                id,
                name
              } = item
              this.page.attr.currentName = name;
              this.page.form.query.pId = id;
              this.page.form.query.level = 'district';
              this.getRegion();
              this.getPageInfo();
            }
          },
          result: {}
        },
        provinceList: [],
        listData: [],
        mapData: []
      }
    },
    created() {
      this.getPageInfo();
      this.getRegion();
    },
    methods: {
      getPageInfo() {
        DatavBo.sendApi('pageInfo', {
          params: {
            page: 'applyStatistics'
          },
          data: {
            query: this.page.form.query
          }
        }).then(res => {
          const {
            status,
            data
          } = res;
          if (status) {
            this.page.result = data
          }
        });
      },
      getRegion() {
        this.mapData = [];
        DatavBo.sendApi('regionList', {
          params: {},
          data: this.page.form
        }).then(res => {
          const {
            status,
            data
          } = res || {}
          if (status) {
            data.map( v => { 
              let areaName = this.page.form.query.level === 'province' ? this.formatProvince(v.name) : v.name;
              this.mapData.push({
                name: areaName,
                value:v.shopCount
              })
            })
            if (this.page.form.query.level === 'province') {
              this.provinceList = data
            }else {
              this.listData = data
            }
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .shop-datav {
    .d-query {
      display: flex;
      align-items: center;
      margin: 20px 0;
      height: 66px;
      line-height: 66px;
      background: #fff;
      box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);

      .q-block {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;

        .b-name {
          font-size: 14px;
          font-weight: 300;
          color: #778095;
        }

        .b-select {
          width: 150px;
        }
      }
    }

    .d-map {
      display: flex;
      // align-items: center;
      margin-top: 20px;
      background: #FFFFFF;
      box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);

      .m-map {
        margin-top: 20px;
        width: 850px;
        height: 580px;
      }

      .m-region_table {
        flex: 1;

        .t-title {
          position: relative;
          padding-top: 20px;
          padding-left: 25px;
          font-size: 18px;
          font-weight: bold;

          &::before {
            content: '';
            display: block;
            position: absolute;
            top: 24px;
            left: 16px;
            width: 4px;
            height: 18px;
            background: #515A6E;
            border-radius: 6px;
          }
        }

        .t-table {
          width: 97%;
          margin: 10px 20px;
          border-collapse: collapse;
          border-spacing: 0;
          empty-cells: show;
          border: 1px solid #cbcbcb;
          cursor: pointer;

          thead {
            width: 100%;
            height: 39px;
            background: #f7f7f7;

            tr {
              th {
                padding-left: 10px;
                border-right: 1px solid #cbcbcb;
                text-align: left;
              }
            }
          }

          tbody {
            tr {
              td {
                padding-left: 10px;
                border-top: 1px solid #cbcbcb;
                border-right: 1px solid #cbcbcb;
              }

            }

            .active {
              background: #edf6ff;
              color: #66b1ff;
            }
          }
        }

      }
    }

  }
</style>