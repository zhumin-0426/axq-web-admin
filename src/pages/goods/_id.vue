<template>
  <div class="info-base goods-info">
    <div class="b-block">
      <div class="b-title">
        <span>商品详情详情</span>
      </div>
      <div class="b-box">
        <grid :col="3" class="b-grid">
          <grid-item label="名称：">
            <span>{{ infoGet('name') }}</span>
          </grid-item>
          <grid-item label="售价：">
            <span>{{ infoGet('amount') }}</span>
          </grid-item>
          <grid-item label="成本价：">
            <span>{{ infoGet('amountCost') }}</span>
          </grid-item>
        </grid>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>商品规格</span>
      </div>
      <div class="b-box">
        <el-table :data="infoGet('goodsItemsList', [])">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <p>{{ scope.row.id }}</p>
            </template>
          </el-table-column>
          <el-table-column label="封面">
            <template slot-scope="scope">
              <div style="width: 100px;height:100px;">
                <img-video-previewer :src="scope.row._raw.thumbnail"></img-video-previewer>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <p>{{ scope.row.specJson2str() }}</p>
            </template>
          </el-table-column>
          <el-table-column label="零售价">
            <template slot-scope="scope">
              <p>￥{{ scope.row.amount | amountFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="成本价">
            <template slot-scope="scope">
              <p>￥{{ scope.row.amountCost + scope.row.amountCostAbove | amountFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="成本溢价">
            <template slot-scope="scope">
              <p>￥{{ scope.row.amountCostAbove | amountFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="赠送业绩">
            <template slot-scope="scope">
              <p>{{ [scope.row.integralGiveDividend, scope.row.integralGiveDivisor] | divisorFilter }}</p>
            </template>
          </el-table-column>
          <el-table-column label="赠送店铺积分">
            <template slot-scope="scope">
              <p>{{ scope.row.integralShopGive | amountFormat }}</p>
            </template>
          </el-table-column>
          <el-table-column label="赠送兑换积分">
            <template slot-scope="scope">
              <p>{{ scope.row.integralExchangeGive | amountFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="兑换所需积分">
            <template slot-scope="scope">
              <p>{{ scope.row.integralExchangeRequire | amountFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="条形码">
            <template slot-scope="scope">
              <p>{{ scope.row.barCode }}</p>
            </template>
          </el-table-column>
          <el-table-column label="库存">
            <template slot-scope="scope">
              <p>{{ scope.row.stock }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="b-block">
      <div class="b-title">
        <span>图文详情</span>
      </div>
      <div class="b-box">
        <text-previewer :content="infoGet('detailMobileText')"></text-previewer>
      </div>
    </div>
  </div>
</template>

<script>
import infoMixin from '@/mixins/type/info';
import imgVideoPreviewer from '@/components/img-video-previewer';
import textPreviewer from '@/components/text-previewer';
import grid from '@/components/grid';
import gridItem from '@/components/grid/item';

export default {
  mixins: [infoMixin],
  components: {
    imgVideoPreviewer,
    textPreviewer,
    grid,
    gridItem
  },
  data () {
    return {
      info: {
        config: {
          entity: 'Goods',
          action: 'info'
        },
        result: {}
      }
    };
  }
};
</script>

<style lang="less">
.goods-info {
  .b-block {
    .b-box {
      .b-grid {
        padding: 0 10px;
      }
    }
  }
}
</style>
