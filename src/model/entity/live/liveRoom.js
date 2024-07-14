/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 09:21:08
 * @LastEditTime: 2021-11-11 09:48:56
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/src/model/entity/live/liveRoom.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */
import _ from 'lodash'
import Entity from '../../entity.class.js';
import options from '../../json/options/live/liveRoom';

const _tableField = {
    memberId: {
        type: 'int',
        default: 0
    },
    title: {
        type: 'string',
        default: ''
    },
    maxWatch: {
        type: 'int',
        default: 0
    },
    status: {
        type: 'int',
        default: 0
    },
    description: {
        type: 'string',
        default: ''
    },
    rtmpPushUrl: {
        type: 'string',
        default: ''
    },
    onlineSize: {
        type: 'int',
        default: 0
    }
};
class LiveRoom extends Entity {
    static _requestConfig = {
        app: 'admin',
        domain: 'live'
    }

    static _form = {}

    static _options = options

    constructor (liveRoom) {
        super(liveRoom, { _tableField });
    }

}

export default LiveRoom;
