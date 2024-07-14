
import F2 from '@antv/f2';
import G6 from '@antv/g6';
import {
  Choropleth
} from '@antv/l7plot';
import { Chart as G2Chart } from '@antv/g2';
const _ = require('lodash');
export const mixins = {
  props: ['data', 'defs'],
  data () {
    return {
      cId: `${this.$options.name}_${this._uid}`,
      width: 0,
      height: 0,
      throttleRender: _.throttle(this.resizeRender, 500),
      antPackage: ((name) => {
        const n2p = {
          antvInterval: 'F2',
          antvLine: 'F2',
          antvNode: 'G6',
          antvPie: 'G2',
          antvChinaMap: 'L7plot'
        };
        return n2p[name];
      })(this.$options.name),
      F2: {
        chart: null,
        fn: {
          ready: () => {
            this.F2.chart = new F2.Chart(Object.assign({
              id: this.cId,
              pixelRatio: window.devicePixelRatio,
              width: this.width,
              height: this.height
            }, this.config.chart));
            this.F2.chart.source(this.data, this.defs);
            this.F2.chart.axis(false);
            if (this.config.axis) {
              this.F2.chart.axis('x', this.config.axis);
            }
            this.render(this.F2.chart);
          },
          changeSize: () => {
            this.F2.chart.changeSize(this.width, this.height);
          }
        }
      },
      G6: {
        chart: null,
        fn: {
          ready: () => {
            this.G6.chart = new G6.TreeGraph(Object.assign({
              container: this.cId,
              width: this.width,
              height: this.height
            }, this.config.chart));

            if (this.config.register) {
              this.config.register.forEach(i => {
                G6.registerNode(i.name, i.cfg(G6, this.G6.chart));
              });
            }

            this.G6.chart.data(this.data);
            this.G6.chart.render(this.G6.chart);
            this.G6.chart.fitView();
          },
          changeSize: () => {

          }
        }
      },
      G2: {
        chart: null,
        fn: {
          ready: () => {
            this.G2.chart = new G2Chart(Object.assign({
              container: this.cId,
              width: this.width,
              height: this.height
            }, this.config.chart));
            this.G2.chart.data(this.data);
            this.render(this.G2.chart);
          },
          changeSize: () => {
            this.G2.chart.changeSize(this.width, this.height);
          }
        }
      },
      L7plot: {
        chart: null,
        fn: {
          ready: () => {
            this.L7plot.chart = new Choropleth(this.cId, {
              map: {
                type: 'mapbox',
                style: 'blank',
                center: [120.19382669582967, 30.258134],
                zoom: 0,
                pitch: 0
              },
              source: {
                data: this.data,
                joinBy: {
                  sourceField: 'adcode',
                  geoField: 'adcode',
                },
              },
              viewLevel: {
                level: 'country',
                adcode: 100000,
              },
              autoFit: true,
              color: {
                field: 'shopCount',
                value: ['#fbf5f7', '#ffcde6', '#ff9acc', '#ff68b5', '#ff339f'],
                scale: { type: 'quantize' },
              },
              style: {
                opacity: 1,
                stroke: '#ccc',
                lineWidth: 0.6,
                lineOpacity: 1,
              },
              label: {
                visible: true,
                field: 'name',
                style: {
                  fill: '#000',
                  opacity: 0.8,
                  fontSize: 10,
                  stroke: '#fff',
                  strokeWidth: 1,
                  textAllowOverlap: false,
                  padding: [5, 5],
                },
              },
              state: {
                active: { 
                  fill: '#ff339f',
                  stroke: '#ff339f', 
                  lineWidth: 0.8, 
                  lineOpacity: 0.8
                }
              },
              chinaBorder: {
                national:{
                  color: '#ccc', 
                  width: 1, 
                  opacity: 1
                },
                coast :{
                  color: '#ccc',
                  width: 1,
                  opacity: 1
                }
              },
              tooltip: {
                customTitle: (data) => {
                  return `<span>${ data.name}</span><br/>
                  <span>店铺数量：${data.shopCount}</span>`
                }
              },
              legend: {
                position: 'bottomleft',
                items:[
                  {
                    value:'>300',
                    min:300,
                    color:'#ff339f'
                  },
                  {
                    value:'100-299',
                    min: 100,
                    max:299,
                    color:'#ff68b5'
                  },
                  {
                    value:'10-99',
                    min: 10,
                    max:99,
                    color:'#ff9acc'
                  },
                  {
                    value:'1-9',
                    min: 1,
                    max:9,
                    color:'#ffcde6'
                  },
                  {
                    value:'0',
                    min: 0,
                    max:0,
                    color:'#fbf5f7'
                  }
                ]
              },
            });
            this.L7plot.chart.setMapStatus({
              dragEnable: false, //是否允许地图拖拽
              keyboardEnable: false, // 是否允许形键盘事件
              doubleClickZoom: false, // 双击放大
              zoomEnable: false, // 滚动缩放
              rotateEnable: false // 旋转
            })
          }
        }
      }
    };
  },
  methods: {
    listenResize () {
      window.addEventListener('resize', () => {
        this.fixedWidthAndHeight();
        this.throttleRender();
      });
    },
    fixedWidthAndHeight () {
      this.width = Number(window.getComputedStyle(this.$el).width.split('px')[0]);
      this.height = Number(window.getComputedStyle(this.$el).height.split('px')[0]);
    },
    ready () {
      this[this.antPackage].fn.ready();
    },
    resizeRender () {
      this[this.antPackage].chart.changeSize(this.width, this.height);
    }
  },
  mounted () {
    this.fixedWidthAndHeight();
    this.ready();
    this.listenResize();
  }
};
