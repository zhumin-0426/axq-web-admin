<!--
 * @Author: 码上talk|RC
 * @Date: 2021-04-27 16:57:48
 * @LastEditTime: 2022-06-02 14:36:35
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/goods/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="page goods-add">
    <div class="a-wrap">
      <form-validate ref="goodsAdd" type="step" :form="form.value" :force-valid-field="form.forceValidField"
        :step-config="form.stepConfig" @ok="form.fn.okHandler">
        <div class="w-goods" slot="step-0">
          <form-validate-field label="品牌" :field="form.value.type">
            <el-radio-group v-model="form.value.type.value">
              <el-radio :label="1">傲雪棋</el-radio>
              <el-radio :label="2">思雪</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="分类" :field="form.value.categoryId">
            <options-selector :mode="3" placeholder="商品分类" :config="{key: 'goodsCategory'}"
              @change="options.fn.goodsCategoryChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="规格分类" :field="form.value.specCategoryId">
            <options-selector :mode="3" placeholder="规格分类" :config="{key: 'goodsSpecCategory'}"
              @change="options.fn.goodsSpecCategoryChangeHandler"></options-selector>
          </form-validate-field>
          <form-validate-field label="名称" :field="form.value.name">
            <el-input v-model="form.value.name.value"></el-input>
          </form-validate-field>
          <form-validate-field label="标题" :field="form.value.title">
            <el-input v-model="form.value.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="form.value.description">
            <el-input type="textarea" :rows="5" v-model="form.value.description.value"></el-input>
          </form-validate-field>
          <form-validate-field label="成本价" :field="form.value.amountCost">
            <el-input v-model="form.value.amountCost.value"></el-input>
          </form-validate-field>
          <form-validate-field label="零售价" :field="form.value.amount">
            <el-input v-model="form.value.amount.value"></el-input>
          </form-validate-field>
          <template v-if="form.value.type.value === 1">
            <form-validate-field label="是否兑换" :field="form.value.isExchange">
              <el-radio-group v-model="form.value.isExchange.value">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </form-validate-field>
          </template>
          <form-validate-field label="是否在售" :field="form.value.status">
            <el-radio-group v-model="form.value.status.value">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="是否小程序显示" :field="form.value.isShowOnMa">
            <el-radio-group v-model="form.value.isShowOnMa.value">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="是否活动商品" :field="form.value.isInActivity">
            <el-radio-group v-model="form.value.isInActivity.value">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="封面">
            <img-video-uploader :max="1" @upload-success="options.fn.thumbnailChangeHandler"></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="轮播图">
            <img-video-uploader :max="10" @upload-success="options.fn.galleryChangeHandler"></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="图文详情">
            <text-editor @change="options.fn.textEditorChangeHandler"></text-editor>
          </form-validate-field>
        </div>
        <div class="w-goods-items" slot="step-1">
          <div class="i-table">
            <form-validate-field>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="名称" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="form.value.goodsItemsList.value[scope.$index].name.value"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="规格" width="150">
                  <template slot-scope="scope">
                    <div :key="key" v-for="(item, key) in options.attr.goodsSpec">
                      <el-select size="small" style="width:100px"
                        v-model="options.attr.defaultValue.goodsItemsSpec[scope.$index][key].value_id"
                        @change="(val) => {options.fn.goodsItemsSpecChangeHandler(scope.$index, key, item, val)}">
                        <el-option v-for="(item1, key1) in item.children" :label="item1.name" :value="item1.id"
                          :key="key1"></el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="封面图">
                  <template slot-scope="scope">
                    <img-video-uploader :max="1"
                      :value="[form.value.goodsItemsList.value[scope.$index].thumbnail.value]"
                      @upload-success="(e) => {options.fn.goodsItemsThumbnailChangeHandler(scope.$index, e)}">
                    </img-video-uploader>
                  </template>
                </el-table-column>
                <el-table-column label="条形码" width="150">
                  <template slot-scope="scope">
                    <el-input v-model="form.value.goodsItemsList.value[scope.$index].barCode.value"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="零售价">
                  <template slot-scope="scope">
                    <el-input v-model="form.value.goodsItemsList.value[scope.$index].amount.value"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="成本价" v-if="form.value.type.value === 2">
                  <template slot-scope="scope">
                    <el-input v-model="form.value.goodsItemsList.value[scope.$index].amountCost.value"></el-input>
                  </template>
                </el-table-column>
                <template v-if="form.value.type.value === 1">
                  <el-table-column label="组合" width="150">
                    <template slot-scope="scope">
                      <options-selector :mode="3" placeholder="组合" :config="{key:'goodsSeries'}" 
                      @change=" (e) => {options.fn.calcAmountCost(1, scope.$index, e)}"></options-selector>
                    </template>
                  </el-table-column>
                  <el-table-column label="赠送业绩" width="250">
                    <template slot-scope="scope">
                      <input-divisor
                        :value="[form.value.goodsItemsList.value[scope.$index].integralGiveDividend.value,form.value.goodsItemsList.value[scope.$index].integralGiveDivisor.value]
                        | divisorFilter"
                        @divisor-value="(e) => {options.fn.calcAmountCost(2, scope.$index, e)}"></input-divisor>
                    </template>
                  </el-table-column>
                  <el-table-column label="成本价">
                    <template slot-scope="scope">
                      <span>{{ form.value.goodsItemsList.value[scope.$index].amountCost.value | amountFormat }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="成本溢价">
                    <template slot-scope="scope">
                      <el-input v-model="form.value.goodsItemsList.value[scope.$index].amountCostAbove.value">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="店铺积分">
                    <template slot-scope="scope">
                      <el-input v-model="form.value.goodsItemsList.value[scope.$index].integralShopGive.value">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="赠送兑换积分">
                    <template slot-scope="scope">
                      <el-input v-model="form.value.goodsItemsList.value[scope.$index].integralExchangeGive.value">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="兑换所需积分">
                    <template slot-scope="scope">
                      <el-input v-model="form.value.goodsItemsList.value[scope.$index].integralExchangeRequire.value">
                      </el-input>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click.native="deleteGoodsItems(scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </form-validate-field>
          </div>
          <div class="i-btn" @click="addGoodsItems()">
            <span>增加商品规格</span>
          </div>
        </div>
        <div class="w-result" slot="result">
          <div class="r-icon">
            <i class="iconfont icon-chenggong"></i>
          </div>
          <div class="r-text">
            <span>添加商品成功</span>
          </div>
          <div class="r-description">
            <p>
              提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用
              Message
              全局提示反馈即可。灰色区域可以显示一些补充的信息。
            </p>
          </div>
          <div class="r-link">
            <el-button type="primary" style="margin-left: 8px" @click.native="rep(`/goods/${goods.id}`)">查看商品
            </el-button>
            <el-button style="margin-left: 8px" @click.native="rep(`/goods/list`)">返回列表</el-button>
          </div>
        </div>
      </form-validate>
    </div>
  </div>
</template>

<script>
  import formValidate from '@/components/form-validate';
  import formValidateField from '@/components/form-validate/field';
  import optionsSelector from '@/components/options-selector';
  import imgVideoUploader from '@/components/img-video-uploader';
  import textEditor from '@/components/text-editor';
  import input from '@/components/input';
  import {
    Request
  } from '@/model/request';
  import {
    model
  } from '@/model';

  const {
    Goods,
    GoodsItems
  } = model.collection;

  const {
    inputDivisor
  } = input;

  export default {
    components: {
      formValidate,
      formValidateField,
      optionsSelector,
      imgVideoUploader,
      textEditor,
      inputDivisor
    },
    data() {
      return {
        request: new Request(),
        goods: new Goods(),
        options: {
          attr: {
            defaultValue: {
              category: [],
              specCategory: [],
              thumbnail: [],
              goodsItemsSpec: [],
              goodsItemsThumbnail: []
            },
            goodsSpec: []
          },
          fn: {
            goodsCategoryChangeHandler: (val) => {
              this.options.attr.defaultValue.category = val.map(i => i.id);
              this.form.value.categoryId.value = val.map(i => i.id).join('>');
            },
            goodsSpecCategoryChangeHandler: (val) => {
              this.options.attr.defaultValue.specCategory = val.map(i => i.id);
              this.form.value.specCategoryId.value = val.map(i => i.id)[0];
            },
            thumbnailChangeHandler: (e) => {
              this.form.value.thumbnail.value = this.$_.get(e, '[0].filename', '');
            },
            galleryChangeHandler: (e) => {
              this.form.value.gallery.value = JSON.stringify(e.map(i => i.fullUrl()));
            },
            textEditorChangeHandler: (e) => {
              this.form.value.detailMobileText.value = e;
            },
            goodsItemsSpecChangeHandler: (index, key, item, val) => {
              const g = this.options.attr.defaultValue.goodsItemsSpec[index][key]
              g.key = item.name;
              g.value = item.children.filter(i => i.id === val)[0].name;
              g.value_id = val;
              this.form.value.goodsItemsList.value[index].specJson.value = JSON.stringify(this.options.attr
                .defaultValue.goodsItemsSpec[index]);
            },
            goodsItemsThumbnailChangeHandler: (index, e) => {
              this.form.value.goodsItemsList.value[index].thumbnail.value = this.$_.get(e, '[0].filename', '');
            },
            calcAmountCost: (type, index, e) => {
              const goodsItems = this.form.value.goodsItemsList.value[index];
              let goodsSeries = goodsItems.goodsSeries.value
              goodsItems.amountCost.value = 0;
              if (type === 1) {
                goodsSeries.amount = this.$_.get(e, '[0]._raw.amount');
                goodsItems.seriesId.value = this.$_.get(e, '[0].id');
              } else if (type === 2) {
                goodsItems.integralGiveDividend.value = e[0];
                goodsItems.integralGiveDivisor.value = e[1] || 1;
              }
              if (goodsSeries) {
                goodsItems.amountCost.value = goodsSeries.amount * (goodsItems.integralGiveDividend.value /
                  goodsItems.integralGiveDivisor.value);
              }
            }
          }
        },
        form: {
          value: Goods.formUtil().generator('add', 'default'),
          forceValidField: () => {
            const type = this.form.value.type.value;
            if (type === 1) {
              return ['amount'];
            }
            return [];
          },
          stepConfig: {
            list: [{
                _validateField: ['name', 'categoryId', 'amountCost'],
                _nextCallback: () => {
                  return new Promise((resolve) => {
                    this.request.do('open', 'enum', 'lst', {
                      params: {
                        key: 'goodsSpec'
                      },
                      data: {
                        query: {
                          specCategoryId: this.form.value.specCategoryId.value
                        }
                      }
                    }).then(res => {
                      const {
                        stauts,
                        data
                      } = res;
                      this.options.attr.goodsSpec = data;
                      resolve();
                    });
                  });
                },
                title: '步骤一',
                description: '填写商品信息'
              },
              {
                title: '步骤二',
                description: '添加商品规格',
                btnText: '添加商品'
              }
            ]
          },
          fn: {
            update: (f) => {
              this.form.value = f;
              this.$refs.goodsAdd.update();
            },
            okHandler: (ev) => {
              this.addGoods(ev);
            }
          }
        },
        tableData: []
      };
    },
    watch: {
      'form.value.type.value': function (e) {
        const f = Goods.formUtil().generator('add', 'default');
        f.type.value = e;
        this.form.fn.update(f);
      },
      'form.value.goodsItemsList.value': function (e) {
        this.tableData = [];
        e.forEach(i => {
          this.tableData.push({});
        });
      },
      'form.value.amount.value': function (e) {
        this.$_.get(this.form.value, 'goodsItemsList.value', []).forEach(i => {
          i.amount.value = Number(e);
        });
      },
      'form.value.name.value': function (e) {
        this.$_.get(this.form.value, 'goodsItemsList.value', []).forEach(i => {
          i.name.value = e;
        });
      }
    },
    methods: {
      deleteGoodsItems(props) {
        this.options.attr.defaultValue.goodsItemsSpec.splice(props.$index, 1);
        this.form.value.goodsItemsList.value.splice(props.$index, 1);
      },
      addGoodsItems() {
        if (_.uniq(this.form.value.goodsItemsList.value.map(i => i.barCode.value)).length !== this.form.value
          .goodsItemsList.value.map(i => i.barCode.value).length) {
          this.$message({
            message: '请勿填写重复条形码',
            type: 'warning'
          });
          return;
        }
        if (_.uniq(this.form.value.goodsItemsList.value.map(i => i.specJson.value)).length !== this.form.value
          .goodsItemsList.value.map(i => i.specJson.value).length) {
          this.$message({
            message: '请勿填写重复规格',
            type: 'warning'
          });
          return;
        }
        this.options.attr.defaultValue.goodsItemsSpec.push(this.options.attr.goodsSpec.map(i => ({
          key: '',
          value: '',
          value_id: ''
        })));
        const f = GoodsItems.formUtil().generator('add', 'default');
        const len = this.form.value.goodsItemsList.value.length
        f.name.value = this.form.value.name.value;
        f.amount.value = this.form.value.amount.value;
        f.thumbnail.value = this.form.value.thumbnail.value;
        if (len) {
          const item = this.form.value.goodsItemsList.value[len - 1];
          f.amountCost.value = item.amountCost.value;
          f.barCode.value = item.barCode.value;
          f.integralGiveDividend.value = item.integralGiveDividend.value;
          f.integralGiveDivisor.value = item.integralGiveDivisor.value;
          f.amountCostAbove.value = item.amountCostAbove.value;
          f.integralShopGive.value = item.integralShopGive.value;
          f.integralExchangeGive.value = item.integralExchangeGive.value;
          f.integralExchangeRequire.value = item.integralExchangeRequire.value;
        }
        this.form.value.goodsItemsList.value.push(f);
      },
      addGoods(ev) {
        const {
          form,
          callback
        } = ev;
        Goods.sendApi('add', {
          params: {},
          data: form
        }, {
          showLoading: true
        }).then(res => {
          const {
            status,
            data
          } = res;
          if (status) {
            this.goods = new Goods(data);
            callback();
          } else {
            this.$message({
              message: '商品添加失败，请检查条形码是否与系统内商品有冲突~',
              type: 'error'
            });
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .goods-add {
    .a-wrap {
      width: 90%;
      margin: 0 auto;

      .w-goods {
        .ql-container {
          height: 500px;
        }
      }

      .w-goods-items {
        .i-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          margin-top: 20px;
          border: 1px dashed #e9e9e9;
          cursor: pointer;
        }
      }

      .w-result {
        display: flex;
        flex-direction: column;
        align-items: center;

        .r-icon {
          i {
            font-size: 100px;
            color: #19be6b;
          }
        }

        .r-text {
          font-size: 18px;
          color: #000;
        }

        .r-description {
          padding: 20px 0;
        }
      }
    }
  }
</style>