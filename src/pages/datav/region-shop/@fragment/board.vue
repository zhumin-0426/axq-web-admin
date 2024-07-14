<template>
  <div class="datav-board">
    <div class="b-left">
      <div class="l-item" v-for="(item,i) in config" :key="i">
        <img :src="item.imgUrl | prefixOssUrl" alt="" />
        <div class="i-label">{{ item.label }}</div>
        <div class="i-value">{{ item.value }}</div>
      </div>
    </div>
    <div class="b-right">
      <div class="r-title">店铺数据</div>
      <div class="r-list">
        <div class="l-item" v-for="(item,i) in shopData" :key="i">
          <img :src="`datav/region-shop/background-shop-data${i}.png` | prefixOssUrl " alt="" />
          <div class="i-content">
            <div class="c-label">{{ item.typeText }}</div>
            <div class="c-value">{{ item.sum }}</div>
            <div class="c-compare" v-if=" i < 3 ">
              较昨日{{ item.increase > 0 ? '+' + item.increase : item.increase }}
              <i v-if="item.increase > 0" class="iconfont icon-xiangshangbeifen up"></i>
              <i v-if="item.increase < 0" class="iconfont icon-xiangxia down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Array,
      shopData:Array
    }
  }
</script>
<style lang="less" scoped>
  .datav-board {
    display: flex;
    align-items: center;

    .b-left {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      margin-right: 20px;
      width: 540px;
      height: 246px;
      background: #FFFFFF;
      box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);

      .l-item {
        position: relative;
        width: 260px;
        height: 114px;
        color: #FFFFFF;

        img {
          width: 260px;
          height: 114px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 1;
        }

        .i-label {
          position: absolute;
          top: 25px;
          left: 20px;
          font-size: 16px;
          z-index: 99;
        }

        .i-value {
          position: absolute;
          top: 55px;
          left: 20px;
          font-size: 20px;
          z-index: 99;
        }

        &:nth-child(2n-1) {
          margin-right: 15px;
          margin-bottom: 15px;
        }
      }
    }

    .b-right {
      width: 974px;
      height: 256px;
      padding: 15px;
      background: #FFFFFF;
      box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);

      .r-title {
        position: relative;
        height: 14px;
        padding-left: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #515A6E;

        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 3px;
          left: 0;
          width: 4px;
          height: 15px;
          background: #515A6E;
          border-radius: 6px;
        }
      }

      .r-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        width: 984px;
        height: 220px;

        .l-item {
          position: relative;
          width: 314px;
          height: 104px;
          margin-bottom: 10px;

          &:not(&:nth-child(3n)) {
            margin-right: 13px;
          }

          img {
            width: 316px;
            height: 104px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
          }

          .i-content {
            height: 70px;
            position: absolute;
            top: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .c-label {
              font-size: 14px;
              z-index: 99;
            }

            .c-value {
              font-size: 18px;
              font-weight: bold;
              z-index: 99;
            }

            .c-compare {
              display: flex;
              align-items: center;
              transform: scale(0.8);
              transform-origin: left;
              color: #999999;
              z-index: 99;

              .up {
                color: #3fd03c;
              }

              .down {
                color: #ff0000;
              }
            }
          }
        }
      }
    }
  }
</style>