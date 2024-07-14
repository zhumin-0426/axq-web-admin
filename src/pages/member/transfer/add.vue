<!--
 * @Author: 码上talk|RC
 * @Date: 2021-05-18 13:49:16
 * @LastEditTime: 2022-05-25 08:52:15
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/pages/member/transfer/add.vue
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
-->
<template>
  <div class="member-transfer_add">
    <div class="a-from">
      <div class="f-query">
        <div class="q-type">
          <el-radio-group v-model="from.attr.formQueryType">
            <el-radio :label="1">会员</el-radio>
            <el-radio :label="2">查询下级</el-radio>
          </el-radio-group>
        </div>
        <div class="q-input">
          <options-selector
            :mode="from.attr.formQueryType === 1 ? 5 : 4"
            placeholder="会员/ID"
            :config="{ req: from.attr.formQueryType === 1 ? (e) => {this.from.attr.page.data.keyword = e} : options.fn.memberQuery }"
            @change="(e, _raw) => {this.options.fn.memberChangeHandler(1, e, _raw)}"
          ></options-selector>
        </div>
      </div>
      <div class="f-info">
        <span>已选（{{ to.attr.list.length }}）人</span>
      </div>
      <div class="f-result">
        <div class="r-list">
          <el-table
            ref="fromTable"
            :data="from.attr.list"
            tooltip-effect="dark"
            style="width: 100%"
            @select="from.fn.changeHandler"
            @select-all="from.fn.changeHandler"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="会员姓名/ID">
              <template slot-scope="props">
                <p>{{ props.row.nickname }}/{{ props.row.id }}</p>
              </template>
            </el-table-column>
            <el-table-column label="会员类型">
              <template slot-scope="props">
                <p>{{props.row.typeStr}}</p>
              </template>
            </el-table-column>
            <el-table-column label="下级人数">
              <template slot-scope="props">
                <p>{{ props.row.submemberCount }}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="r-page">
          <div class="p-left">
            <span>
              共有
              <em>{{ from.attr.page.total }}</em>结果
            </span>
          </div>
          <div class="p-link">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="from.attr.page.total"
              @current-change="from.attr.page.params.pageIndex = $event"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="a-to">
      <div class="t-query">
        <options-selector
          :mode="4"
          placeholder="会员/ID"
          :config="{ req: options.fn.memberQuery }"
          @change="(e, _raw) => {this.options.fn.memberChangeHandler(2, e, _raw)}"
        ></options-selector>
      </div>
      <div class="t-toolbar">
        <div class="t-left">
          <p v-if="!to.attr.member">请选择团队接收人</p>
          <p v-else>
            团队接收人：
            <span style="color: #F56C6C;">{{ to.attr.member.nickname }}</span>
            <span style="marginLeft: 10px;color: #F56C6C;" v-if="error.status">{{error.tip}}</span>
          </p>
        </div>
        <div class="t-right">
          <el-button-group>
            <el-button size="small" @click.native="to.fn.flush">清空</el-button>
            <el-button
              type="primary"
              size="small"
              @click.native="$refs.popupConfirmMembersMove.open({
                triggerOpen: popup.membersMove.fn.openHandler, 
                triggerClose: popup.membersMove.fn.closeHandler,
                triggerHidden: popup.membersMove.fn.hiddenHandler
              })"
              :disabled="error.status === 1"
            >确定挪动</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="t-result">
        <div class="r-list">
          <el-table :data="toPageList" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="会员姓名/ID">
              <template slot-scope="props">
                <p>{{ props.row.nickname }}/{{ props.row.id }}</p>
              </template>
            </el-table-column>
            <el-table-column label="会员类型">
              <template slot-scope="props">
                <p>{{props.row.typeStr}}</p>
              </template>
            </el-table-column>
            <el-table-column label="下级人数">
              <template slot-scope="props">
                <p>{{ props.row.submemberCount }}</p>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="props">
                <el-button type="danger" size="mini" @click.native="to.fn.delete(props.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="r-page">
          <div class="p-left">
            <span>
              共有
              <em>{{ to.attr.list.length }}</em>结果
            </span>
          </div>
          <div class="p-link">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="to.attr.list.length"
              @current-change="to.attr.page.params.pageIndex = $event"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <popup-confirm ref="popupConfirmMembersMove" title="会员挪动" :config="{ width: 900, height: 500 }">
      <div class="popup-confirm_members-move">
        <div style="justify-self: flex-end;">会员归属店铺：</div>
        <options-selector :mode="4" :config="{ req: popup.membersMove.fn.transferShopMemberQuery }"
          @change="this.popup.membersMove.fn.transferShopMemberChangeHandler">
        </options-selector>
        <div style="justify-self: flex-end;">是否同意挪动代理：</div>
         <el-radio-group v-model="form.isTransferSubDistributor"  style="align-self: center;">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        <div class="tip">
          <div>
            <i class="iconfont icon-jinggao"></i>
            是否同时挪动代理规则：
          </div>
          <ul>
            <li>是：当被挪动的会员或代理下级存在代理时，此时下级的代理同时被挪走。</li>
            <li>否：当被挪动的会员或代理下级存在代理时，此时下级的代理不会被挪走。</li>
          </ul>
          <div>注：会员挪动操作不可逆，请谨慎操作！</div>
        </div>
      </div>
    </popup-confirm>
  </div>
</template>

<script>
import optionsSelector from '@/components/options-selector';
import popupConfirm from '@/components/popup/type/confirm';
import { model } from '@/model';

const {
  Member,
  MemberTransfer,
  Shop
} = model.collection;

export default {
  components: { optionsSelector, popupConfirm },
  data () {
    return {
      error: {
        status: 0,
        tip: ''
      },
      form: {
        recipientId: 0,
        memberTransferMemberList: [],
        isTransferSubDistributor: 0,
        recipientShopId: 0,
      },
      options: {
        fn: {
          memberQuery: (e, ok) => {
            Member.sendApi('page', { params: {}, data: { query: { keyword: e } } }).then(res => {
              const { data } = res;
              ok(data.map(i => ({ value: i.id, label: `${i.nickname}/${i.id}`, _raw: i })));
            });
          },
          memberChangeHandler: (type, e, _raw) => {
            if (type === 1) {
              if (this.from.attr.formQueryType === 1) {
                this.from.attr.page.data.keyword = e;
              }
              if (this.from.attr.formQueryType === 2) {
                this.from.attr.page.data.pId = e;
              }
            }
            if (type === 2) {
              const { id = 0 } = _raw || {};
              this.to.attr.member = _raw;
              this.form.recipientId = id;
            }
          }
        }
      },
      from: {
        attr: {
          formQueryType: 2,
          page: {
            total: 0,
            params: {
              pageIndex: 1,
              pageSize: 10
            },
            data: {
              pId: '',
              keyword: ''
            }
          },
          list: []
        },
        fn: {
          query: () => {
            Member.sendApi('page', { params: this.from.attr.page.params, data: { query: this.from.attr.page.data } }, { parse4Entity: true }).then(res => {
              const { status, data, page } = res;
              if (status) {
                this.from.attr.list = data;
                this.from.attr.page.total = page.total;
                this.$nextTick(() => {
                  this.from.attr.list.forEach(i => {
                    if (this.to.attr.list.map(j => j.id).includes(i.id)) {
                      this.$refs.fromTable.toggleRowSelection(i, true);
                    }
                  })
                })
              } else {
                this.$message({
                  message: '会员查询错误',
                  type: 'warning'
                });
              }
            });
          },
          changeHandler: (e) => {
            this.to.attr.list = this.to.attr.list.filter(i => {
              return !this.from.attr.list.map(i => i.id).includes(i.id);
            });
            e.forEach(i => {
              this.to.attr.list.push(this.$_.cloneDeep(i));
            })
          }
        }
      },
      to: {
        attr: {
          member: null,
          page: {
            total: 0,
            params: {
              pageIndex: 1,
              pageSize: 10
            }
          },
          list: []
        },
        fn: {
          flush: () => {
            this.$confirm('是否清空当前选择挪动会员？', '清空挪动信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.to.attr.list = [];
            }).catch(() => {
            });
          },
          delete: (id) => {
            this.to.attr.list = this.to.attr.list.filter(i => {
              if (i.id === id) {
                const tar = this.$_.find(this.from.attr.list, x => { return x.id === id });
                if (tar) {
                  this.$refs.fromTable.toggleRowSelection(tar, false);
                }
                return false;
              }
              return true;
            });
          }
        }
      },
      popup:{
        membersMove:{
          fn: {
            transferShopMemberQuery: (e, ok) => {
              const member = this.to.attr.member;
              Shop.sendApi("page", {
                params: {},
                data: {
                  query: Object.assign({ keyword: e }, member.type === 7 ? {memberId: member.id} : {id: member.shopId || 0}),     
                },
              }).then((res) => {
                const {
                  data
                } = res;
                ok(
                  data.map((i) => ({
                    value: i.id,
                    label: i.name,
                  }))
                );
              });
            },
            transferShopMemberChangeHandler: (e) => {
              this.form.recipientShopId = e;
            },
            openHandler: (ok)=>{
              if (this.to.attr.list.findIndex(item=>item.id === this.to.attr.member.id) > -1){
                 this.$message({
                  message: '被挪动的会员不能有团队接收人',
                  type: 'warning'
                });
                return;
              }
              
              if (!this.to.attr.member) {
                this.$message({
                  message: '请选择团队接收人',
                  type: 'warning'
                });
                return;
              }
              if (!this.to.attr.list.length) {
                this.$message({
                  message: '请选择挪动会员',
                  type: 'warning'
                });
                return;
              }
             
              ok();
            },
            closeHandler:(ok,error)=>{
              this.$confirm('此操作将永久更改会员关系, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.form.memberTransferMemberList = this.to.attr.list.map(i => ({ memberId: i.id }));
                MemberTransfer.sendApi('transferAdd', { params: {}, data: this.form }).then(res => {
                  const { status, data } = res;
                  if (status) {
                    this.form.recipientShopId = 0;
                    this.form.isTransferSubDistributor = 0;
                    this.from.attr.page.params.pageIndex = 1;
                    this.from.attr.list = [];
                    this.to.attr.member = null;
                    this.to.attr.list = [];
                    ok();
                    this.$message({
                      message: '会员挪动成功',
                      type: 'success'
                    });
                  } else {
                    this.$message({
                      message: '会员挪动错误',
                      type: 'error'
                    });
                  }
                });
              }).catch(error);
            },
            hiddenHandler:()=>{
              this.form.recipientShopId = 0;
            }
           }
        }
      }
    };
  },
  computed: {
    toPageList () {
      return this.to.attr.list.slice((this.to.attr.page.params.pageIndex - 1) * this.to.attr.page.params.pageSize, this.to.attr.page.params.pageIndex * this.to.attr.page.params.pageSize);
    }
  },
  watch: {
    'from.attr.formQueryType': function (e) {
      this.from.attr.page.data.pId = '';
      this.from.attr.page.data.keyword = '';
    },
    'from.attr.page.params': {
      handler: function (e) {
        this.from.attr.list = [];
        this.from.fn.query();
      }, deep: true
    },
    'from.attr.page.data': {
      handler: function (e) {
        this.from.attr.list = [];
        this.from.fn.query();
      }, deep: true
    },
    'form.recipientId': function (e) {
      this._checkError();
    },
    'to.attr.list': {
      handler: function (e) {
        this._checkError();
      },
      deep: true
    },
  },
  methods: {
    _checkError () {
      this.error.status = 0;
      this.error.tip = '';
      if (!this.to.attr.member) {
        return;
      }
      if (!this.to.attr.list.length) {
        return;
      }
      const { relationChainIds } = this.to.attr.member;
      const rl = (relationChainIds.split('>') || []).map(i => Number(i));
      const tl = this.to.attr.list.map(i => i.id);
      if (this.$_.differenceWith(rl, tl).length !== rl.length) {
        this.error.status = 1;
        this.error.tip = '上级会员不能挪至下级会员下面~';
      }
    },
  }
};
</script>

<style lang="less">
.member-transfer_add {
  display: flex;
  .a-from {
    flex: 50%;
    background: white;
    .f-query {
      display: flex;
      align-items: center;
      height: 100px;
      padding-left: 20px;
      .q-input {
        padding-left: 20px;
      }
    }
    .f-info {
      display: flex;
      align-items: center;
      height: 100px;
      padding-left: 20px;
    }
    .f-result {
      padding: 0 20px;
      .r-page {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
      }
    }
  }
  .a-to {
    flex: 50%;
    margin-left: 20px;
    background: white;
    .t-query {
      display: flex;
      align-items: center;
      height: 100px;
      padding-left: 20px;
    }
    .t-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      padding-left: 20px;
    }
    .t-result {
      padding: 0 20px;
      .r-page {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
      }
    }
  }
  .popup-confirm_members-move{
    display: grid;
    grid-template-columns: 0.215fr 1fr;
    grid-column-gap: 18px;
    grid-row-gap: 17px;
    margin-top: 27px;
    .tip{
      grid-column-start: 1;
      grid-column-end: 3;
      margin: 0 30px;
      height: 148px;
      background: #F8F8F8;
      border-radius: 4px;
      >div:first-child{
        display: flex;
        align-items: center;
        padding-top: 16px;
        .icon-jinggao{
          margin: 0 6px 0 20px;
          font-size: 19px;
          color:#ff8800;
        }
        color:#4A5060;
      }
      ul{
        list-style-type: disc;
        margin-top: 7px;
        li{
          &::marker{
            font-size: 8px;
            color: #666;
          }
          color:#ff8800;
          &:not(:first-child){
            margin-top: 6px;
          }
        }
      }

      ul+div{
        margin: -4px 0 0 21px;
         color:#ff8800;
      }

    }
  }
}
</style>
