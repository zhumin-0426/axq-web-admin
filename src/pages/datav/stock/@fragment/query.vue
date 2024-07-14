<!--
 * @Author: 码上talk|RC
 * @Date: 2021-11-30 11:43:32
 * @LastEditTime: 2022-03-19 09:24:39
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/pages/datav/stock/@fragment/query.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="datav-query">
    <div class="q-block" v-if="!hiddenAxqStaff">
      <span class="b-name">{{label}}：</span>
      <el-select class="b-select" size="small" v-model="axqStaffNickname" clearable placeholder="全部" filterable
        @change="form.id = $event">
        <el-option v-for="item in options" :key="item.id" :label="item.nickname" :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="q-block">
      <span class="b-name">选择时间：</span>
      <el-date-picker size="small" v-model="dateTime" type="datetimerange" start-placeholder="开始时间"
        end-placeholder="结束时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" @change="selectDateTime">
      </el-date-picker>
    </div>
    <div class="q-block">
      <el-button type="primary" size="small" @click.native="$emit('query',form)">搜索</el-button>
      <el-button size="small" @click.native="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import {
    model
  } from '@/model';

  const {
    DatavBo
  } = model.collection;
  export default {
    components: {},
    props: {
      label: String,
      hiddenAxqStaff: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        axqStaffNickname: '',
        options: [],
        dateTime: [],
        params: {
          pageIndex: 1,
          pageSize: 100
        },
        form: {
          id: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    created() {
      this.getAxqStaff()
      this.dateTime.push(this.$dayjs().format('YYYY-MM-DD 00:00'),this.$dayjs().format('YYYY-MM-DD HH:mm'));
      this.form.startTime = this.$dayjs().format('YYYY-MM-DD 00:00');
      this.form.endTime = this.$dayjs().format('YYYY-MM-DD HH:mm');
    },
    methods: {
      getAxqStaff() {
        DatavBo.sendApi('axqStaff', {
          params: this.params,
          data: {}
        }).then(res => {
          const {
            status,
            data
          } = res || {};
          status && (this.options = data);
        })
      },
      selectDateTime(e) {
        if(e) {
          this.form.startTime = e[0]
          this.form.endTime = e[1]
        }
      },
      handleReset() {
        this.axqStaffNickname = ''
        this.dateTime = ''
        this.form.id = '',
        this.form.startTime = '';
        this.form.endTime = '';
        this.$emit('reset','')
      }
    }
  }
</script>

<style lang="less" scoped>
  .datav-query {
    display: flex;
    align-items: center;
    margin: 20px 0;
    height: 66px;
    line-height: 66px;
    background: #fff;

    .q-block {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;

      .b-name {
        font-size: 14px;
        font-weight: 300;
        color: #778095;
      }
      .b-select {
        width: 150px;
      }
    }
  }
</style>