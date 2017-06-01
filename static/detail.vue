<template>
    <div class="container-body tab-body">
        {{ name }}
        {{age}}
    </div>
</template>
<style>
</style>
<script>
    import Bus from '../bus.js'
    export default{
      data () {
        return {
          name: '',
          age: ''
        }
      },
      components: {
      },
      created () {
        Bus.$on('getTar', event => {
          this.age = event.age
          this.name = event.name
          console.log(1)
        })
      }
    }
</script>
