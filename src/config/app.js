/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:29
 * @LastEditTime: 2021-11-29 10:08:37
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/config/app.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

export const appConfig = {
  tokenKey: 'user-access-token',
  staticUrl: 'https://aoxqwl-static.oss-cn-shenzhen.aliyuncs.com/image/web-admin/',
  ossUrl: {
    dev: '//aoxqwl-imgtest.oss-cn-shenzhen.aliyuncs.com/',
    test: '//aoxqwl-imgtest.oss-cn-shenzhen.aliyuncs.com/',
    prod: '//aoxqwl-img.oss-cn-shenzhen.aliyuncs.com/'
  },
  wsUrl: {
    dev: '//localhost:8200',
    test: '//wstest.aoxqwl.com',
    prod: '//ws.aoxqwl.com'
  },
  livePlayUrl: (() => {
    const cfg = {
      dev: 'http://player.live.aoxqwl.com/mpdev/',
      test: 'http://player.live.aoxqwl.com/mptest/',
      prod: 'http://player.live.aoxqwl.com/mp/'
    };
    let url = cfg.dev;
    if (process.env.NODE_ENV === 'test') {
      url = cfg.test;
    }

    if (process.env.NODE_ENV === 'production') {
      url = cfg.prod;
    }
    return url;
  })(),
};
