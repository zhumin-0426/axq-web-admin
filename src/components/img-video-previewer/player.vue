<!--
 * @Author: 码上talk|RC/3189482282@qq.com
 * @Date: 2021-11-06 10:51:09
 * @LastEditTime: 2021-11-11 09:56:06
 * @LastEditors: 码上talk|RC
 * @Description: 
 * @FilePath: /web-admin/src/components/img-video-previewer/player.vue
-->
<template>
  <div class="player">
    <video id="player"></video>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  props: ['type', 'src'],
  watch: {
    src: function (e) {

    }
  },
  methods: {
    init () {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('player');
        var flvPlayer = flvjs.createPlayer({
          type: this.type,
          url: this.src
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.player {
  width: 100%;
  video {
    width: 100%;
  }
}
</style>