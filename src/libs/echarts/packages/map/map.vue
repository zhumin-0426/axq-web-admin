<template>
  <div class="map" ref="map" />
</template>

<script>
  import './js/china.js';
  import './js/province/anhui.js';
  import './js/province/aomen.js';
  import './js/province/beijing.js';
  import './js/province/chongqing.js';
  import './js/province/fujian.js';
  import './js/province/guangdong.js';
  import './js/province/guangxi.js';
  import './js/province/guizhou.js';
  import './js/province/hainan.js';
  import './js/province/hebei.js';
  import './js/province/heilongjiang.js';
  import './js/province/henan.js';
  import './js/province/hubei.js';
  import './js/province/hunan.js';
  import './js/province/jiangsu.js';
  import './js/province/jiangxi.js';
  import './js/province/jilin.js';
  import './js/province/liaoning.js';
  import './js/province/neimenggu.js';
  import './js/province/ningxia.js';
  import './js/province/qinghai.js';
  import './js/province/shandong.js';
  import './js/province/shanghai.js';
  import './js/province/shanxi.js';
  import './js/province/shanxi1.js';
  import './js/province/sichuan.js';
  import './js/province/taiwan.js';
  import './js/province/tianjin.js';
  import './js/province/xianggang.js';
  import './js/province/xinjiang.js';
  import './js/province/xizang.js';
  import './js/province/yunnan.js';
  import './js/province/zhejiang.js';
  export default {
    props: {
      mapData: Array,
      mapType:{
        type:String,
        default:'china'
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const option = {
          title: {
            text: "全国店铺分布图",
          },
          series: [{
            type: 'map',
            map: this.mapType,
            label: {
              show: true,
              color: '#001529',
              fontSize: 8
            },
            itemStyle: {
              areaColor: '#eee'
            },
            roam: false,
            zoom: 1.1,
            emphasis: {
              label: {
                color: '#fff',
                fontSize: 12,
              },
              itemStyle: {
                areaColor: '#f7c8de',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            },
            data: this.mapData
          }],
          visualMap: [{
            type: 'piecewise',
            show: true,
            pieces: [{
                min: 300,
                color: '#ff33a0'
              },
              {
                min: 100,
                max: 299,
                color: '#ff68b5'
              },
              {
                min: 10,
                max: 99,
                color: '#ff9acc'
              },
              {
                min: 1,
                max: 9,
                color: '#ffcde5'
              },
              {
                min: 0,
                max: 0,
                color: '#fef3f7'
              }
            ],
            inRange: {
              symbol: 'rect',
              color: [
                '#ffc0b1',
                '#9c0505',
              ]
            },
            itemWidth: 20
          }],
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(50,50,50,0.7)',
            textStyle: {
              color: '#fff',
              fontSize: 12
            },
            formatter: function (params) {
              return params.name + '<br />' + '店铺数量：' + params.value;
            }
          }
        }
        this.mapcharts = this.$echarts.init(this.$refs.map);
        this.mapcharts.setOption(option)
      },
    }
  };
</script>
<style lang="less">
  .map {
    position: relative;
    justify-content: center;
    width: 650px;
    height: 650px;
  }
</style>