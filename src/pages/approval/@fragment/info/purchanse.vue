<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-13 16:33:00
 * @LastEditTime: 2021-10-26 11:46:19
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/approval/@fragment/info/cancel-purchanse.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="info-purchanse">
    <div class="b-block">
      <div class="b-title">
        <span>订单清单：</span>
      </div>
      <div class="b-box">
        <div class="b-wrap">
          <purchanse
            :id="purchanseId"
            :force-status="$_.get(approval, 'typeId') === 8 ? null : 1"
          ></purchanse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import purchanse from "@/components/axq/printer/type/purchanse";
import { model } from "@/model";

const { Purchanse, GoodsItems } = model.collection;

export default {
  components: {
    purchanse,
  },
  props: {
    purchanseId: {
      type: Number,
    },
    approval: {
      type: Object,
      default() {
        return {
          approvalWorkflowList: [],
          workflowId: -1,
        };
      },
    },
  },
  methods: {
    init() {},
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less">
.info-purchanse {
  .b-box {
    .b-wrap {
      width: 200mm;
      margin: 0 auto;
    }
  }
}
</style>
