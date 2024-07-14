<!--
 * @Author: 码上talk|RC
 * @Date: 2021-03-02 17:55:47
 * @LastEditTime: 2021-12-25 10:15:59
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/trace/query.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="trace-query">
    <div class="q-search">
      <div class="s-box">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="请输入溯源防伪码/使用扫码枪扫码" v-model="code" />
      </div>
      <div class="s-btn" @click="doQuery">
        <span>查询</span>
      </div>
    </div>
    <div class="q-result">
      <div class="r-no" v-if="!isOk || !goodsItems.id">
        <img src="/image/404.png" alt />
        <p>暂无查询到信息</p>
      </div>
      <div class="r-detail" v-else>
        <div class="d-section d-section-outline">
          <div class="s-title">
            <div class="t-left">
              <span>商品规格</span>
            </div>
          </div>
          <div class="s-content">
            <div class="o-left">
              <img-video-previewer :src="goodsItems.thumbnail"></img-video-previewer>
            </div>
            <div class="o-right">
              <grid :col="2">
                <grid-item label="商品规格">
                  <span>{{ `${goodsItems.name} ${goodsItems.specJson2str()}` }}</span>
                </grid-item>
                <grid-item label="条形码">
                  <span>{{ goodsItems.barCode }}</span>
                </grid-item>
                <grid-item label="零售价">
                  <span>￥{{ goodsItems.amount | amountFormat }}</span>
                </grid-item>
              </grid>
            </div>
          </div>
        </div>
        <div class="d-section d-section-timeline">
          <div class="s-title">
            <div class="t-left">
              <span>溯源信息</span>
            </div>
          </div>
          <div class="s-content">
            <el-timeline>
              <template v-for="(item, key) in traceLog.traceCode2LogInfoNodeList">
                <el-timeline-item :key="key" v-if="item.type === 1">
                  <p class="time">{{ item.type | type2str }}</p>
                  <p
                    class="content"
                  >入库人：{{ blankGet($_.get(item, 'info.stockIn.documentMaker.nickname')) }}</p>
                  <p class="content">仓库入库时间：{{ blankGet($_.get(item, 'info.stockIn.createTime')) }}</p>
                </el-timeline-item>
                <el-timeline-item :key="key" v-if="item.type === 2">
                  <p class="time">{{ item.type | type2str }}</p>
                  <p
                    class="content"
                  >出库人：{{ blankGet($_.get(item, 'info.stockOut.documentMaker.nickname')) }}</p>
                  <p class="content">出库时间：{{ blankGet($_.get(item, 'info.stockOut.createTime')) }}</p>
                  <p
                    class="content"
                  >收件人：{{ blankGet($_.get(item, 'info.stockOut.purchanse.recipient')) }}</p>
                  <p
                    class="content"
                  >下单时间：{{ blankGet($_.get(item, 'info.stockOut.purchanse.createTime')) }}</p>
                  <p
                    class="content"
                  >下单客服：{{ blankGet($_.get(item, 'info.stockOut.purchanse.documentMaker.nickname')) }}</p>
                  <p
                    class="content"
                  >收货地址：{{ blankGet($_.get(item, 'info.stockOut.purchanse.fullAddress')) }}-{{ blankGet($_.get(item, 'info.stockOut.purchanse.recipient')) }}/{{blankGet($_.get(item, 'info.stockOut.purchanse.recipientMobile')) }}
                  </p>
                </el-timeline-item>
                <el-timeline-item :key="key" v-if="item.type === 3">
                  <p class="time">{{ item.type | type2str }}</p>
                  <p class="content">入库店铺：{{ blankGet($_.get(item, 'info.shop.name')) }}</p>
                  <p class="content">入库人：{{ blankGet($_.get(item, 'info.operator.nickname')) }}</p>
                  <p class="content">入库时间：{{ blankGet($_.get(item, 'info.createTime')) }}</p>
                </el-timeline-item>
                <el-timeline-item :key="key" v-if="item.type === 4">
                  <p class="time">{{ item.type | type2str }}</p>
                  <p class="content">出库库店铺：{{ blankGet($_.get(item, 'info.shop.name')) }}</p>
                  <p class="content">出库人：{{ blankGet($_.get(item, 'info.operator.nickname')) }}</p>
                  <p class="content">出库库时间：{{ blankGet($_.get(item, 'info.createTime')) }}</p>
                  <p class="content">消费会员：{{ blankGet($_.get(item, 'info.member.nickname')) }}</p>
                </el-timeline-item>
              </template>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import imgVideoPreviewer from '@/components/img-video-previewer';
import { Request } from '@/model/request';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';
import GoodsItems from '@/model/entity/goods/goodsItems';

export default {
  components: {
    imgVideoPreviewer,
    grid,
    gridItem
  },
  data () {
    return {
      request: new Request(),
      isOk: false,
      code: '',
      traceLog: {}
    };
  },
  computed: {
    goodsItems () {
      return new GoodsItems(this.traceLog.goodsItems);
    }
  },
  filters: {
    type2str (t) {
      const t2s = {
        1: '产品入库',
        2: '产品出库',
        3: '店铺入库',
        4: '店铺出库'
      };
      return t2s[t];
    }
  },
  methods: {
    doQuery () {
      if (!this.code) {
        this.$message({
          message: '请输入溯源防伪码',
          type: 'warning'
        });
        return;
      }
      let qrCode = null;
      let captcha = null;
      if (this.isTraceCode(this.code).b) {
        qrCode = this.isTraceCode(this.code).t;
      } else if (this.isTraceCaptcha(this.code).b) {
        captcha = this.isTraceCaptcha(this.code).t;
      } else {
        this.$message.warning('请输入正确信息~');
        return;
      }
      this.isOk = false;
      this.traceLog = {};
      this.request.do('open', 'trace', 'logInfo', { params: { isQueryAll: 1 }, data: { query: { qrCode, captcha } } }).then(res => {
        const { status, data } = res;
        if (status) {
          this.$message({
            message: '获取溯源信息成功',
            type: 'success'
          });
          this.traceLog = data;
          this.isOk = true;
        } else {
          this.$message({
            message: '获取溯源信息失败',
            type: 'error'
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.trace-query {
  background: white;
  .q-search {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .s-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 400px;
      height: 50px;
      background: #f7f7f7;
      i {
        font-size: 20px;
      }
      input {
        width: 200px;
        height: 40px;
        border: none;
        outline: none;
        background: none;
      }
    }
    .s-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 50px;
      background: #1890ff;
      span {
        color: white;
      }
    }
  }
  .q-result {
    padding: 20px 0 100px 0;
    .r-detail {
      width: 700px;
      margin: 0 auto;
      .d-section {
        .s-title {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;
          .t-left {
            span {
              padding-left: 10px;
            }
            &:before {
              position: absolute;
              content: "";
              top: 5px;
              left: 0;
              height: 30px;
              width: 5px;
              background: #2d8cf0;
            }
          }
        }
        .s-content {
          padding: 20px 0;
        }
        &-outline {
          .s-content {
            display: flex;
            .o-left {
              width: 100px;
              height: 100px;
              flex-shrink: 0;
            }
            .o-right {
              flex: 1;
              padding: 10px;
              margin-left: 10px;
              background: #f7f7f7;
            }
          }
        }
      }
    }
    .r-no {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 300px;
      }
      p {
        padding-top: 20px;
      }
    }
  }
}
</style>
