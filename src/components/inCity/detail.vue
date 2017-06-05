<template>
    <div class="container-body tab-body">
        <p>{{content.name}}</p>
        <p>{{content.age}}</p>
        <p>{{content.driveAge}}</p>
        <li  v-for='item in content.startTime'>{{item}}</li>
        <li v-for='item in content.address'>{{item.position}}</li>
        <p>{{content.sex}}</p>
        <p>{{content.tel}}</p>
    </div>
</template>
<style>
</style>
<script>
    const ERR_OK = 0
    export default{
      data () {
        return {
          id: 0,
          content: ''
        }
      },
      components: {
      },
      created () {
        this.id = this.$route.params.id
        console.log(this.$route.params.id)
        this.getDetails(this.id)
      },
      methods: {
        getDetails (id) {
          this.$http.get('./static/data.json', {'id': id}).then((res) => {
            let resData = res.data.driver.lists
            console.log(typeof parseInt(id))
            if (res.data.errno === ERR_OK) {
              this.content = resData[ id - 1 ]
            }
          })
        }
      }
    }
</script>
