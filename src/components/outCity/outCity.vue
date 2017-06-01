<template>
    <div class="container-body tab-body">
        <all></all>
    </div>
</template>
<style lang="css">
    .tab-body{
        width:100%;
        height:100%;
    }
    .tabs-class{
        position: fixed;
        top:56px;
        left:0px;
    }
    .tab-class .mu-list{
        padding: 0px;
    }
</style>
<script>
    import all from '../total/all.vue'
    // import today from '../total/today.vue'
    export default{
      data () {
        return {
          activeTab: 'all'
        }
      },
      components: {
        all
      },
      methods: {
        handleTabChange (val) {
          this.activeTab = val
        }
      }
    }
</script>
