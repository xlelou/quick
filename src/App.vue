<template>
  <div id="app">
    <top-bar></top-bar>
    <!--<div class="body-content" ref="content">-->
    <!--<transition>-->
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    <!--</transition>-->
    <!--</div>-->
    <!--<footBar></footBar>-->
  </div>
</template>

<script>
import topBar from './components/home/header.vue'
import footBar from './components/home/footer.vue'
// import BScroll from 'better-scroll‘
export default {
  name: 'app',
  components: {
    topBar, footBar
  }
  /* ,
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      this.contentScroll = new BScroll(this.$refs.content, {

      })
    }
  } */
}
</script>

<style>
#app {
  font-family:sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
