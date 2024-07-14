/*
 * @Author: 码上talk|RC
 * @Date: 2021-09-04 22:29:16
 * @LastEditTime: 2021-09-04 23:02:30
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/public/js/upgrading-tip.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
((win) => {
  win.addEventListener('load', () => {
    const eleBody = document.querySelector('body');
    const eleUpgradingTip = document.createElement('div');
    eleUpgradingTip.style = `
        position: fixed;
        top:0;
        bottom:0;
        width:100%;
        z-index:9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: RGBA(0, 0, 0, .3);
        `;
    eleUpgradingTip.innerHTML = `
      <div style="
      display:flex;
      flex-direction: column;
      align-items: center;
      width:500px;
      padding: 50px 0;
      background: white
      ">
        <img src="/image/upgrading_tip.png"
        style="
        width:70%;
        "
        >
        <h3 yle="text-align: center;color:#409EFF;">系统升级中...</h3>
        <p style="
        padding: 0 20px;
        margin-top: 50px;
        text-align: center;
        color: #333;
        ">2021年9月6日 12:00-18:00 傲雪棋ERP系统处于数据迁移过程中，期间停止业务服务，给同事们带来工作上的不便，敬请谅解！</p>
    </div>
        `;
    eleBody && eleBody.appendChild(eleUpgradingTip);
  });
})(window)