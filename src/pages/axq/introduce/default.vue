<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-07 15:24:13
 * @LastEditTime: 2022-03-18 11:13:01
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/axq/introduce/default.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="axq-introduce">
    <div class="i-toolbar">
      <div class="t-left">
        <span>企业介绍</span>
      </div>
      <div class="t-right">
        <el-button-group>
          <el-button type="primary" size="small" @click.native="update">更新</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="i-main">
      <text-editor :content="form.content" @change="form.content = $event"></text-editor>
    </div>
  </div>
</template>

<script>
import formValidate from '@/components/form-validate';
import formValidateField from '@/components/form-validate/field';
import textEditor from '@/components/text-editor';

import { model } from '@/model';
const { AxqIntroduce } = model.collection;
export default {
  components: {
    formValidate,
    formValidateField,
    textEditor
  },
  data () {
    return {
      entitys: {
        AxqIntroduce
      },
      form: {
        content: ''
      }
    };
  },
  methods: {
    update () {
      AxqIntroduce.sendApi('introduceUpdate', { params: { id: 1 }, data: this.form }, { errorTip: '更新公司介绍失败' }).then(res => {
        const { status, data } = res;
        if (status) {
          this.$message.success('更新成功');
        }
      })
    }
  },
  created () {
    AxqIntroduce.sendApi('introduceInfo', { params: {}, data: { qeury: { id: 1 } } }, { errorTip: '获取公司介绍失败' }).then(res => {
      const { status, data } = res;
      if (status) {
        this.form = data;
      }
    });
  }
};
</script>

<style lang="less">
.axq-introduce {
  background: white;
  padding: 20px;
  .i-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
  }
  .i-main {
    .ql-container {
      height: 500px;
    }
  }
}
</style>
