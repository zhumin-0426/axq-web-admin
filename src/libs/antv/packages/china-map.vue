<template>
  <div :id="cId" class="china-map">
  </div>
</template>

<script>
  import {
    mixins
  } from '../mixins/index';

  export default {
    name: 'antvChinaMap',
    mixins: [mixins],
    components: {},
    props: {
      config: {
        type: Object,
        default () {
          return {
          }
        }
      }
    },
    data() {
      return {
        cId: `${this.$options.name}_${this._uid}`
      };
    },
    methods: {
      changeView(level, adcode, config = {}) {
        this.L7plot.chart.changeView({
          level,
          adcode
        },config);
      }
    }
  };
</script>
<style lang="less" scoped>
  @import '../less/index.less';

  .antv-china-map {
    .antv;

    canvas {
      .antv-canvas;
    }
  }
</style>