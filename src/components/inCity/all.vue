<template>
    <div class="demo-infinite-container demo-refresh-container">

        <mu-list>
            <template v-for="(item, index) in list">
                <mu-list-item :title="item.name"  @click="addCart(index,item.id)">
                    <p>年龄: {{ item.age }}&nbsp;&nbsp;&nbsp;&nbsp;驾龄: {{ item.driveAge }}</p>
                    <p>常跑时间:
                            <span>{{ item.startTime }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </p>
                    <p>常跑区域:
                        <template v-for="address in item.address">
                            <span>{{ address.position }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </template>
                    </p>
                </mu-list-item>
                <mu-divider />
            </template>
        </mu-list>
    </div>
</template>

<script>
import Bus from '../bus.js'
const ERR_OK = 0
let content = ''
// let drivers = []
let list = []
export default {
  data () {
    return {
      oneTime: true,
      list,
      loading: false,
      scroller: null,
      flag: null,
      refreshing: false,
      trigger: null
    }
  },
  created () {
    this.$http.get('./static/data.json').then((response) => {
      list = []
      let resData = response.data.driver
      console.log(response.data.errno)
      if (response.data.errno === ERR_OK) {
        this.drivers = resData.lists
        for (let i = 0; i < this.drivers.length; i++) {
          this.list.push(this.drivers[i])
        }
      }
    })
  },
  mounted () {
    this.scroller = this.$el
    this.trigger = this.$el
  },
  destroyed () {
    Bus.$emit('getTar', content)
  },
  methods: {
    addCart (index, id) {
      this.$router.push('/inCity/detail/' + id)
      content = this.drivers[index]
    }
  }
}
</script>

<style lang="css">
    .demo-infinite-container{
        position: absolute;
        top:55px;
        bottom: 0px;
        width:100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        border: 1px solid #d9d9d9;
    }
    .mu-snackbar{
        z-index: 99999999;
    }
</style>
