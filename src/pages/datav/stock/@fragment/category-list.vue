<template>
  <div class="category-list">
    <div class="l-item" v-for="(item,i) in categoryList" :key="i" @click="handleSelect(item,i)">
      <img :src="`datav/stock/background-category${i % 10}.png` | prefixOssUrl " alt="">
      <div class="i-active" :class=" activeIndex === i ?  `color${i % 10}` : '' "></div>
      <div class="i-top">
        <div class="t-name">{{$_.get(item,'name')}}</div>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="i-bottom">
        <template v-if="type === 1">
          <div class="b-item">
            <div class="i-value">{{ $_.get(item,'stockValid',0) }}</div>
            <div class="i-label">可用数量</div>
          </div>
          <div class="b-item">
            <div class="i-value">{{ $_.get(item,'stockPresale',0) }}</div>
            <div class="i-label">预售数量</div>
          </div>
        </template>
        <template v-else>
          <div class="b-label">{{ label }}</div>
          <div class="b-value">{{ $_.get(item,'quantity',0) }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;
  export default {
    props: {
      type: Number,
      label: String,
      form: Object
    },
    data() {
      return {
        activeIndex: -1,
        categoryList: []
      }
    },
    created() {
      this.getCategoryList();
    },
    watch: {
      'type': {
        handler(v, o) {
          if (v !== o) {
            this.activeIndex = -1
          }
        }
      },
      'form': {
        handler(v, o) {
          this.getCategoryList();
        },
        deep:true
      }
    },
    methods: {
      getCategoryList() {
        DatavBo.sendApi('goodsCategoryList', {
          params: {},
          data: {
            query: {
              type: this.type,
              pId: 0,
              ...this.form
            }
          }
        }).then(res => {
          const {
            status,
            data
          } = res || {}
          if (status) {
            this.categoryList = data
          }
        })
      },
      handleSelect(e, i) {
        this.activeIndex = i
        this.$emit('select', e);
      }
    }
  }
</script>
<style lang="less">
  .category-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    padding: 20px 10px;
    width: 1150px;
    background-color: #fff;
    box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);

    .l-item {
      position: relative;
      margin-bottom: 10px;
      margin-left: 15px;
      padding: 15px 20px;
      width: 172px;
      height: 84px;
      color: #FFF;
      cursor: pointer;

      img {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 212px;
        height: 114px;
        z-index: 1;
      }

      .i-top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .t-name {
          font-size: 16px;
          z-index: 2;
        }

        i {
          z-index: 2;
        }
      }

      .i-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .b-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;

          .i-value {
            z-index: 1;
            font-size: 20px;
            font-weight: bold;
            
          }

          .i-label {
            z-index: 1;
            margin-top: 3px;
            font-size: 14px;
          }
        }

        .b-label {
          z-index: 2;
          margin-top: 20px;
          font-size: 14px;
        }

        .b-value {
          z-index: 2;
          width: 80px;
          margin-top: 20px;
          font-size: 20px;
          text-align: center;
        }
      }

      .i-active {
        position: absolute;
        top: -8px;
        left: -9px;
        width: 230px;
        height: 130px;
        z-index: 0;
      }

      .color0 {
        background: #ffd3d8;
      }

      .color1 {
        background: #e1d3ff;
      }

      .color2 {
        background: #e8e7e5;
      }

      .color3 {
        background: #d8cfc3;
      }

      .color4 {
        background: #ffd5cd;
      }

      .color5 {
        background: #cdfff2;
      }

      .color6 {
        background: #ffd3ec;
      }

      .color7 {
        background: #e6fbcf;
      }

      .color8 {
        background: #e4dafd;
      }

      .color9 {
        background: #fff7d1;
      }
    }

  }
</style>