<!--
 * @Author: 码上talk|RC
 * @Date: 2021-07-20 16:37:54
 * @LastEditTime: 2021-08-19 16:24:49
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/cash-register/@fragment/ext-screen-material.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="case-register_ext-screen-material">
    <block title="显示中素材">
      <div class="list-selected">
        <div
          class="material-card material-card_1"
          :key="key"
          v-for="(item, key) in materialSelectedList"
        >
          <img-video-previewer :is-raw-url="true" :src="item.url"></img-video-previewer>
          <div class="c-delete" @click="doMaterialSelect(item.id, item.isSelected ? 0 : 1)">
            <img src="/image/label_delete.png" alt />
          </div>
        </div>
      </div>
    </block>
    <block title="素材库">
      <list-page
        ref="listPage"
        :config="page.config"
        :form="page.form"
        @add="$refs.popupConfirmAdd.open({triggerClose: popup.add.fn.closeHandler,triggerHidden: popup.add.fn.hiddenHandler})"
      >
        <el-radio-group slot="query">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
        <div class="material-card material-card_2" slot="list" slot-scope="{item}">
          <img class="pic" :src="item._raw.url" alt />
          <div class="c-mask">
            <div class="m-btns">
              <div class="b-item" @click="doDeleteMaterialDelete(item.id)">
                <i class="iconfont icon-shanchu2"></i>
              </div>
              <div class="b-item">
                <i class="iconfont icon-yulan"></i>
              </div>
              <div
                class="b-item"
                @click="doMaterialSelect(item._raw.id, item._raw.isSelected ? 0 : 1)"
              >
                <i
                  class="iconfont"
                  :class="{'icon-ziyuan':  !item._raw.isSelected, 'icon-shibai1': item._raw.isSelected}"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </list-page>
    </block>
    <popup-confirm ref="popupConfirmAdd" title="添加收银机素材">
      <div class="popup-confirm_add">
        <form-validate>
          <form-validate-field label="素材：">
            <img-video-uploader
              :max="1"
              @upload-success="popup.add.attr.form.url = $event.length ? $event[0].fullUrl() : ''"
            ></img-video-uploader>
          </form-validate-field>
        </form-validate>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import block from '@/components/block';
import listPage from '@/components/list-page';
import popupConfirm from '@/components/popup/type/confirm';
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import imgVideoUploader from '@/components/img-video-uploader';
import imgVideoPreviewer from '@/components/img-video-previewer';

import { model } from '@/model';

const { CashRegisterExtScreenMaterial } = model.collection;

export default {
  components: {
    block,
    listPage,
    popupConfirm,
    imgVideoUploader,
    formValidate,
    formValidateField,
    imgVideoPreviewer
  },
  data () {
    return {
      materialSelectedList: [],
      page: {
        config: {
          entity: 'CashRegisterExtScreenMaterial',
          action: 'extScreenMaterialPage',
          column: [

          ]
        },
        form: {
          query: {
            keyword: ''
          },
          order: {}
        }
      },
      popup: {
        add: {
          attr: {
            form: {
              url: ''
            }
          },
          fn: {
            closeHandler: (ok, error) => {
              if (!this.popup.add.attr.form.url) {
                this.$message.warning('请上传素材');
                error();
                return;
              }
              CashRegisterExtScreenMaterial.sendApi('extScreenMaterialAdd', { params: {}, data: this.popup.add.attr.form }).then(res => {
                const { status, data } = res;
                if (status) {
                  ok();
                  this.$refs.listPage.query();
                  this.$message.success('素材添加成功');
                } else {
                  error();
                  this.$message.error('素材添加失败');
                }
              });
            },
            hiddenHandler:()=>{
              this.popup.add.attr.form = {
                url: ''
              };
            }
          }
        }
      }
    };
  },
  methods: {
    getMaterialSelectedList () {
      CashRegisterExtScreenMaterial.sendApi('extScreenMaterialList', { params: {}, data: { query: { isSelected: 1 } } }).then(res => {
        const { status, data } = res;
        if (status) {
          this.materialSelectedList = data;
        } else {
          this.$message.error('获取选中素材列表失败');
        }
      });
    },
    doMaterialSelect (id, selected) {
      let tip = '选中该素材在收银机扩展屏显示，是否继续？';
      if (!selected) {
        tip = '取消该素材在收银机扩展屏显示，是否继续？';
      }
      this.$confirm(tip, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CashRegisterExtScreenMaterial.sendApi('extScreenMaterialSelect', { params: { id, selected }, data: {} }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message.success('更新收银机显示素材成功');
            this.$refs.listPage.query();
            this.getMaterialSelectedList();
          } else {
            this.$message.error('更新收银机显示素材失败');
          }
        });
      }).catch(() => {
      });
    },
    doDeleteMaterialDelete (id) {
      this.$confirm('删除该素材，同时会取消该素材在收银机显示', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        CashRegisterExtScreenMaterial.sendApi('extScreenMaterialDelete', { params: { id }, data: {} }).then(res => {
          const { status, data } = res;
          if (status) {
            this.$message.success('删除素材成功');
            this.$refs.listPage.query();
            this.getMaterialSelectedList();
          } else {
            this.$message.error('删除素材失败');
          }
        });
      }).catch(() => {
      });
    }
  },
  created () {
    this.getMaterialSelectedList();
  }
};
</script>

<style lang="less">
.case-register_ext-screen-material {
  .block {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .list-selected {
    display: flex;
    .material-card {
      &:not(:nth-child(5n)) {
        margin-right: 20px;
      }
    }
  }
  .list-page {
    .p-table {
      .t-content {
        display: flex;
        .material-card {
          &:not(:nth-child(5n)) {
            margin-right: 20px;
          }
        }
      }
    }
  }
  .material-card {
    position: relative;
    width: 254px;
    height: 182px;
    overflow: hidden;
    .pic {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
    }
    &_1 {
      .c-delete {
        position: absolute;
        top: -5px;
        right: -2px;
        width: 40px;
        height: 40px;
        display: none;
        img {
          width: 100%;
        }
      }
      &:hover {
        cursor: pointer;
        .c-delete {
          display: block;
        }
      }
    }
    &_2 {
      .c-mask {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        display: none;
        align-items: center;
        justify-content: center;
        background: RGBA(0, 0, 0, 0.3);
        .m-btns {
          display: flex;
          align-items: center;
          .b-item {
            i {
              font-size: 30px;
              color: white;
            }
            &:hover {
              i {
                color: #1890ff;
              }
              cursor: pointer;
            }
            &:not(:first-child) {
              margin-left: 20px;
            }
          }
        }
      }
      &:hover {
        .c-mask {
          display: flex;
        }
      }
    }
  }
  .popup-confirm {
    &_add {
      padding: 20px;
      .img-video-uploader {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
