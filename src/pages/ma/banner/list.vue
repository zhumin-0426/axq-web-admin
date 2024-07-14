<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:30
 * @LastEditTime: 2022-03-22 14:40:13
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/ma/banner/list.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="ma-banner-list">
    <list-page
      ref="listPage"
      :config="page.config"
      :form="page.form"
      @add="$refs.popupConfirmMaBannerAdd.open({triggerClose: popup.bannerAdd.fn.closeHandler,triggerHidden: popup.bannerAdd.fn.hiddenHandler})"
      @form-reset="page.fn.resetHandler"
    >
      <template slot="query">
        <div class="q-block">
          <div class="b-item">
            <options-selector
              :mode="1"
              ref="typeOptionsSelector"
              placeholder="轮播类型"
              :config="{entity: 'MaBanner', type: 'type'}"
              @change="(e) => {page.form.query.type = e;}"
            ></options-selector>
          </div>
        </div>
        <div class="q-block">
          <div class="b-item">
            <el-input size="small" placeholder="关键字/编号" v-model="page.form.query.keyword"></el-input>
          </div>
        </div>
      </template>
    </list-page>
    <popup-confirm ref="popupConfirmMaBannerAdd" title="轮播图添加">
      <div class="popup-confirm_ma-banner-add">
        <form-validate ref="bannerAdd" :form="popup.bannerAdd.attr.form">
          <form-validate-field label="名称" :field="popup.bannerAdd.attr.form.title">
            <el-input v-model="popup.bannerAdd.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="popup.bannerAdd.attr.form.description">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.bannerAdd.attr.form.description.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="轮播图">
            <img-video-uploader
              :max="1"
              @upload-success="popup.bannerAdd.attr.form.imgUrl.value = $event ? $event[0].fullUrl() : ''"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="排序" :field="popup.bannerAdd.attr.form.priority">
            <el-input type="number" v-model="popup.bannerAdd.attr.form.priority.value"></el-input>
          </form-validate-field>
          <form-validate-field label="类型" :field="popup.bannerAdd.attr.form.type">
            <el-radio-group v-model="popup.bannerAdd.attr.form.type.value">
              <el-radio :label="1">商品</el-radio>
              <el-radio :label="2">小程序页面</el-radio>
              <el-radio :label="3">活动H5</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="商品/地址">
            <options-selector
              :mode="4"
              :config="{ req: popup.bannerAdd.fn.goodsQuery }"
              @change="popup.bannerAdd.fn.goodsChangeHandler"
              v-if="popup.bannerAdd.attr.form.type.value === 1"
            ></options-selector>
            <el-input v-else></el-input>
          </form-validate-field>
          <form-validate-field label="是否过期" :field="popup.bannerAdd.attr.form.isExpire">
            <el-radio-group v-model="popup.bannerAdd.attr.form.isExpire.value">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field
            label="过期日期"
            :field="popup.bannerAdd.attr.form.expireTime"
            v-if="popup.bannerAdd.attr.form.isExpire.value"
          >
            <el-radio-group>
              <el-date-picker type="date" placeholder="选择日期" v-model="popup.bannerAdd.attr.form.expireTime.value">
              </el-date-picker>
            </el-radio-group>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
    <popup-confirm ref="popupConfirmMaBannerUpdate" title="轮播图更新">
      <div class="popup-confirm_ma-banner-update">
        <form-validate
          ref="bannerUpdate"
          :form="popup.bannerUpdate.attr.form"
          :fill="popup.bannerUpdate.fn.fill"
        >
          <form-validate-field label="名称" :field="popup.bannerUpdate.attr.form.title">
            <el-input v-model="popup.bannerUpdate.attr.form.title.value"></el-input>
          </form-validate-field>
          <form-validate-field label="描述" :field="popup.bannerUpdate.attr.form.description">
            <el-input
              type="textarea"
              :rows="5"
              v-model="popup.bannerUpdate.attr.form.description.value"
            ></el-input>
          </form-validate-field>
          <form-validate-field label="轮播图">
            <img-video-uploader
              :max="1"
              @upload-success="popup.bannerUpdate.attr.form.imgUrl.value = $event ? $event[0].fullUrl() : ''"
            ></img-video-uploader>
          </form-validate-field>
          <form-validate-field label="排序" :field="popup.bannerUpdate.attr.form.priority">
            <el-input type="number" v-model="popup.bannerUpdate.attr.form.priority.value"></el-input>
          </form-validate-field>
          <form-validate-field label="类型" :field="popup.bannerUpdate.attr.form.type">
            <el-radio-group v-model="popup.bannerUpdate.attr.form.type.value">
              <el-radio :label="1">商品</el-radio>
              <el-radio :label="2">小程序页面</el-radio>
              <el-radio :label="3">活动H5</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field label="商品/地址">
            <options-selector
              :mode="4"
              :config="{ req: popup.bannerUpdate.fn.goodsQuery }"
              @change="popup.bannerUpdate.fn.goodsChangeHandler"
              v-if="popup.bannerUpdate.attr.form.type.value === 1"
            ></options-selector>
            <el-input v-else></el-input>
          </form-validate-field>
          <form-validate-field label="是否过期" :field="popup.bannerUpdate.attr.form.isExpire">
            <el-radio-group v-model="popup.bannerUpdate.attr.form.isExpire.value">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </form-validate-field>
          <form-validate-field
            label="过期日期"
            :field="popup.bannerUpdate.attr.form.expireTime"
            v-if="popup.bannerUpdate.attr.form.isExpire.value"
          >
            <el-radio-group>
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                v-model="popup.bannerUpdate.attr.form.expireTime.value">
              </el-date-picker>
            </el-radio-group>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import popupConfirm from '@/components/popup/type/confirm';
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import imgVideoUploader from '@/components/img-video-uploader';
import listPage from '@/components/list-page';
import optionsSelector from '@/components/options-selector';
import imgVideoPreviewer from '@/components/img-video-previewer/viewer.vue';

import { model } from '@/model';
const { MaBanner, Goods } = model.collection;
import { formToolkit } from '@/model/form-toolkit';

export default {
  components: {
    popupConfirm,
    formValidate,
    formValidateField,
    imgVideoUploader,
    listPage,
    optionsSelector,
    imgVideoPreviewer
  },
  data () {
    return {
      page: {
        config: {
          entity: 'MaBanner',
          action: 'bannerPage',
          column: [
            {
              prop: 'id',
              label: 'ID'
            },
            {
              prop: 'name',
              label: '轮播图',
              width: 300,
              VNodes: [
                ({ h, props }) => {
                  return h(imgVideoPreviewer, {
                    props: {
                      src: props.row.imgUrl
                    }
                  });
                }
              ]
            },
            {
              label: '类型',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, MaBanner.filter('type', props.row.type));
                }
              ]
            },
            {
              label: '名称',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, props.row.title);
                }
              ]
            },
            {
              label: '描述',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, props.row.description);
                }
              ]
            },
            {
              prop: 'expireTime',
              label: '过期时间',
              VNodes: [
                ({ h, props }) => {
                  return h('p', {}, '--');
                }
              ]
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              fixed: 'right',
              prop: 'action',
              label: '操作',
              width: '160',
              VNodes: [
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'primary', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.$refs.popupConfirmMaBannerUpdate.open({ triggerOpen: this.popup.bannerUpdate.fn.openHandler, triggerClose: this.popup.bannerUpdate.fn.closeHandler, params: props });
                        }
                      }
                    },
                    '编辑');
                },
                ({ h, props }) => {
                  return h('el-button',
                    {
                      props: { type: 'danger', size: 'mini' },
                      nativeOn: {
                        click: () => {
                          this.bannerDelete(props);
                        }
                      }
                    },
                    '删除');
                }
              ]
            }
          ],
          selectable: true
        },
        form: {
          query: {
            status: '',
            districtId: '',
            type: '',
            keyword: ''
          },
          order: {}
        },
        fn:{
          resetHandler: () => {
            this.$refs.typeOptionsSelector.reset();
            this.page.form.query.keyword = '';
          }
        }
      },
      popup: {
        bannerAdd: {
          attr: {
            form: MaBanner.formUtil().generator('add', 'default')
          },
          fn: {
            goodsQuery: (e, ok) => {
              Goods.sendApi('page', { params: {}, data: { query: { keyword: e, status: 1, type: 1 } } }).then(res => {
                const { data } = res;
                ok(data.map(i => ({ value: i.id, label: i.name })));
              });
            },
            goodsChangeHandler: (e) => {
              this.popup.bannerAdd.attr.form.goodsId.value = e;
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.bannerAdd.attr.form);
              if (ok) {
                MaBanner.sendApi('bannerAdd', { params: {}, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '轮播图添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '轮播图添加失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback();
                this.$message({
                  message: '请确认信息',
                  type: 'warning'
                });
              }
            },
            hiddenHandler:()=>{
              this.popup.bannerAdd.attr.form = MaBanner.formUtil().generator('add', 'default');
            }
          }
        },
        bannerUpdate: {
          attr: {
            info: {},
            form: MaBanner.formUtil().generator('update', 'default')
          },
          fn: {
            goodsQuery: (e, ok) => {
              Goods.sendApi('page', { params: {}, data: { query: { keyword: e, status: 1, type: 1 } } }).then(res => {
                const { data } = res;
                ok(data.map(i => ({ value: i.id, label: i.name })));
              });
            },
            goodsChangeHandler: (e) => {
              this.popup.bannerUpdate.attr.form.goodsId.value = e;
            },
            fill: (callback) => {
              callback(MaBanner, this.popup.bannerUpdate.attr.info);
            },
            openHandler: (ok, params) => {
              MaBanner.sendApi('bannerInfo', { params: {}, data: { query: { id: params.row._raw.id } } }).then(res => {
                const { status, data } = res;
                if (status) {
                  this.popup.bannerUpdate.attr.info = data;
                  ok();
                } else {
                  this.$message({
                    message: '获取轮播图信息失败',
                    type: 'warning'
                  });
                }
              });
            },
            closeHandler: (okCallback, errorCallback) => {
              const { ok, form } = formToolkit.validate(this.popup.bannerUpdate.attr.form);
              if (ok) {
                MaBanner.sendApi('bannerUpdate', { params: { id: this.popup.bannerUpdate.attr.info.id }, data: form }).then(
                  (res) => {
                    const { status, data } = res;
                    if (status) {
                      okCallback();
                      this.$refs.listPage.query();
                      this.$message({
                        message: '轮播图添加成功',
                        type: 'success'
                      });
                    } else {
                      errorCallback();
                      this.$message({
                        message: '轮播图添加失败',
                        type: 'warning'
                      });
                    }
                  }
                );
              } else {
                errorCallback();
                this.$message({
                  message: '请确认信息',
                  type: 'warning'
                });
              }
            }
          }
        }
      }
    };
  },
  methods: {
    bannerDelete (params) {
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        MaBanner.sendApi('bannerDelete', { params: { id: params.row._raw.id }, data: {} }, { errorTip: '删除轮播图失败' }).then(res => {
          const { status } = res;
          if (status) {
            this.$refs.listPage.query();
            this.$message.success('删除成功');
          }
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style lang="less">
.ma-banner-list {
  padding: 20px;
  background: white;
  .img-video-previewer {
    widows: 100px;
    height: 100px;
  }
  .popup-confirm {
    &_ma-banner-add {
      padding: 20px;
    }
    &_ma-banner-udpate {
      padding: 20px;
    }
  }
}
</style>
