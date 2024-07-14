<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-17 16:36:56
 * @LastEditTime: 2022-02-28 14:38:34
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/components/axq/printer/type/purchanse.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="printer-purchanse">
    <template v-for="(item, key) in splitPurchanseList">
      <fragment-purchanse-axq
        :key="key"
        :config="item.config"
        :purchanse="item.purchanse"
        :force-status="forceStatus"
        :is-show-wx-entry="true"
        v-if="[1, 2, 4, 5].includes($_.get(purchanse, 'type'))"
      ></fragment-purchanse-axq>
      <fragment-purchanse-sixue
        :config="item.config"
        :purchanse="item.purchanse"
        :key="key"
        :force-status="forceStatus"
        :is-show-wx-entry="true"
        v-else-if="[6, 7].includes($_.get(purchanse, 'type'))"
      ></fragment-purchanse-sixue>
      <fragment-purchanse-goods-series
        :config="item.config"
        :purchanse="item.purchanse"
        :key="key"
        v-else
      ></fragment-purchanse-goods-series>
    </template>
  </div>
</template>

<script>
import fragmentPurchanseAxq from "./@fragment/purchanse-axq";
import fragmentPurchanseSixue from "./@fragment/purchanse-sixue";
import fragmentPurchanseGoodsSeries from "./@fragment/purchanse-goods-series";
import { model } from "@/model";

const { Purchanse } = model.collection;

export default {
  components: {
    fragmentPurchanseAxq,
    fragmentPurchanseSixue,
    fragmentPurchanseGoodsSeries,
  },
  props: ["id", "autoPrint", "forceStatus"],
  data() {
    return {
      purchanse: null,
    };
  },
  computed: {
    splitPurchanseList() {
      let l = [];
      if (!this.purchanse) {
        return l;
      }
      const p = this.$_.cloneDeep(this.purchanse);
      if (
        this.$_.get(this.purchanse, "isNewDistributor") &&
        this.purchanse.type !== 3 &&
        this.$_.get(this.purchanse, "printType") === 1
      ) {
        const lItem = {
          config: {
            noPrice: false,
            extraTitle: "",
            isAdd35: false,
          },
          purchanse: new Purchanse(this.$_.cloneDeep(this.purchanse)),
        };
        const { type, purchanseGoodsItemsList, purchanseGoodsSeriesList } = p;
        const overPricePerIntegral =
          [1, 2].includes(type) && p.integralAchieveGive > 0 ? 35 : 0;
        if (overPricePerIntegral) {
          lItem.config.isAdd35 = true;
          p.amount = p.amount + overPricePerIntegral * p.integralAchieveGive;
          (purchanseGoodsItemsList || []).forEach((i) => {
            i.amountCost =
              i.amountCost +
              overPricePerIntegral * (i.integralGiveDividend / i.integralGiveDivisor);
            i.goodsItems.amountCost =
              i.goodsItems.amountCost +
              overPricePerIntegral *
                (i.goodsItems.integralGiveDividend / i.goodsItems.integralGiveDivisor);
          });
          (purchanseGoodsSeriesList || []).forEach((i) => {
            i.goodsSeries.amount = i.goodsSeries.amount + overPricePerIntegral;
          });
        }
        l.push(lItem);
      }
      const purchanse = new Purchanse(p);
      if (purchanse.type === 3) {
        l.push({
          type: 3,
          config: {
            noPrice: false,
            extraTitle: "",
          },
          purchanse: this.$_.cloneDeep(purchanse),
        });
        return l;
      }
      const { purchanseGoodsItemsList = [], purchanseGiftList = [] } = purchanse;
      const buyQ = Array.from(
        new Set(purchanseGoodsItemsList.map((i) => i.goodsItems._raw.goodsId))
      );
      const giftQ = Array.from(
        new Set(purchanseGiftList.map((i) => i.goodsItems._raw.goodsId))
      );
      if (this.$_.get(purchanse, "_raw.type") === 2 && buyQ.length + giftQ.length > 1) {
        const { purchanseGoodsItemsList = [], purchanseGiftList = [] } = purchanse;
        let buySplitIndex = 1;
        let giftSplitIndex = 1;
        l.push({
          type: 0,
          config: { noPrice: false, extraTitle: "（总单）" },
          purchanse: this.$_.cloneDeep(purchanse),
        });
        purchanseGoodsItemsList.forEach((i, index) => {
          const tar = this.$_.find(l, (x) => {
            return (
              x.type === 1 &&
              x.purchanse.purchanseGoodsItemsList
                .map((y) => y.goodsItems._raw.goodsId)
                .includes(i.goodsItems._raw.goodsId)
            );
          });
          if (tar) {
            tar.purchanse.purchanseGoodsItemsList.push(i);
            return;
          }
          const p = this.$_.cloneDeep(purchanse);
          p.purchanseGiftList = [];
          p.purchanseGoodsItemsList = [i];
          l.push({
            type: 1,
            config: {
              noPrice: false,
              extraTitle: `购买分单（${buySplitIndex}/${buyQ.length}）`,
            },
            purchanse: p,
          });
          buySplitIndex++;
        });

        purchanseGiftList.forEach((i, index) => {
          const tar = this.$_.find(l, (x) => {
            return (
              x.type === 2 &&
              x.purchanse.purchanseGiftList
                .map((y) => y.goodsItems._raw.goodsId)
                .includes(i.goodsItems._raw.goodsId)
            );
          });
          if (tar) {
            tar.purchanse.purchanseGiftList.push(i);
            return;
          }
          const p = this.$_.cloneDeep(purchanse);
          p.purchanseGiftList = [i];
          p.purchanseGoodsItemsList = [];
          l.push({
            type: 2,
            config: {
              noPrice: false,
              extraTitle: `赠送分单（${giftSplitIndex}/${giftQ.length}）`,
            },
            purchanse: p,
          });
          giftSplitIndex++;
        });
      } else {
        l.push({
          config: {
            noPrice: false,
            extraTitle: "",
          },
          purchanse: this.$_.cloneDeep(purchanse),
        });
      }
      if (this.$_.get(purchanse, "_raw.printType") === 2) {
        const t = this.$_.cloneDeep(l);
        l[0].config.noPriceShowIntegral = l[0].purchanse._raw.isNewDistributor && (l[0].purchanse.integralAchieveGive > 0) && l[0].purchanse.achievePDistributorAllocateJson;
        t.forEach((i) => {
          i.config.noPrice = true;
        });
        l = l.concat(t);
      }
      return l;
    },
  },
  methods: {
    getPurchanse() {
      Purchanse.sendApi("info", {
        params: {},
        data: { query: { id: this.id || -1 }, extra: { isLogPrintTimes: 1 } },
      }).then((res) => {
        const { status, data } = res;
        if (status) {
          this.purchanse = data;
          if (this.autoPrint) {
            setTimeout(() => {
              this.$emit("ok");
            }, 3000);
            return;
          }
          if (this.$listeners.ok) {
            const h = this.$createElement;
            this.$msgbox({
              title: "提示",
              message: h("div", null, [
                h("p", { style: "color: teal" }, "确认是否连接打印机，是否继续？"),
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "打印机加载中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      this.$emit("ok");
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              },
            });
          }
        } else {
          this.$message({
            message: "获取订单信息失败",
            type: "error",
          });
        }
      });
    },
  },
  created() {
    this.getPurchanse();
  },
};
</script>

<style lang="less"></style>
