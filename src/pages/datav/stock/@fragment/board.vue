<template>
  <div class="datav-board">
    <div class="b-main" v-if="config">
      <template v-if="[1,4].includes(type)">
        <div class="m-item" v-for="(item,i) in config" :key="i" :style="'color:'+item.color">
          <img :src=" item.imgUrl | prefixOssUrl" alt="">
          <div class="i-title">
            <i class="iconfont icon-shuliang"></i>
            {{ item.label }}
          </div>
          <div class="i-num">{{ item.value | amountFormat(0,',') }}</div>
        </div>
      </template>
      <template v-else>
        <div class="m-content">
          <img :src="config[0].imgUrl | prefixOssUrl" alt="">
          <div class="i-title">
            <i class="iconfont icon-shuliang"></i>
            {{ config[0].label }}
          </div>
          <div class="i-num">{{ config[0].value | amountFormat(0,',') }}</div>
          <button class="i-btn" v-if="[2,3].includes(type)" @click="$emit('toGoodsInfo')">
            查看明细
            <i class="iconfont icon-youjiantou"></i>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type: [Number, String],
      config: [Array]
    }
  }
</script>
<style lang="less" scoped>
  .datav-board {
    user-select: none;

    .b-main {
      .m-item {
        position: relative;
        width: 420px;
        height: 155px;

        img {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 420px;
          height: 155px;
        }

        .i-title {
          position: absolute;
          left: 30px;
          top: 35px;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          z-index: 1;

          i {
            margin-right: 10px;
          }
        }

        .i-num {
          position: absolute;
          left: 35px;
          bottom: 40px;
          font-size: 24px;
          font-weight: bold;
          z-index: 1;
        }
      }
      .m-content {
        position: relative;
        width: 370px;
        height: 286px;
        background: #FFF;
        box-shadow: 0px 0px 7px 1px rgba(50, 50, 50, 0.1);
        color: #FFF;

        img {
          position: absolute;
          left: 20px;
          top: 20px;
          right: 0;
          bottom: 0;
          width: 380px;
          height: 246px;
        }

        .i-title {
          position: absolute;
          left: 45px;
          top: 35px;
          display: flex;
          align-items: center;
          font-size: 20px;
          z-index: 1;

          i {
            margin-right: 10px;
          }
        }

        .i-num {
          position: absolute;
          left: 45px;
          top: 100px;
          font-size: 30px;
          z-index: 1;
        }

        .i-btn {
          position: absolute;
          right: 30px;
          top: 105px;
          width: 107px;
          height: 35px;
          border: 1px solid #D0CBFF;
          border-radius: 10px;
          background: transparent;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          color: #FFF;
          z-index: 1;

          i {
            font-size: 14px;
          }

          &:hover {
            cursor: pointer;
          }

          &:active {
            border: 1px solid #0168ff;
          }
        }
      }
    }

  }
</style>