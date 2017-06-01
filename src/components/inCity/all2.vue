<template>
    <div class="demo-infinite-container demo-refresh-container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list>
            <template v-for="(item, index) in list">
                <mu-list-item :title="item.name"  @click="addCart(index)">
                    <p>年龄: {{ item.age }}&nbsp;&nbsp;&nbsp;&nbsp;驾龄: {{ item.driveAge }}</p>
                    <p>常跑时间:
                        <template v-for="time in item.time">
                            <span>{{ time.timeStart }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </template>
                    </p>
                    <p>常跑区域:
                        <template v-for="address in item.address">
                            <span>{{ address.position }} &nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </template>
                    </p>
                </mu-list-item>
                <mu-divider />
            </template>
            <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
        </mu-list>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Bus from '../bus.js'
const ERR_OK = 0
let listNum = 4
let content = ''
// let drivers = []
let list = []
let defaultNum = 5
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
      const resData = response.data.driver
      console.log(response.data.errno)
      if (response.data.errno === ERR_OK) {
        console.log(1)
        this.drivers = resData.lists
        listNum = this.drivers.length
        for (let i = 0; i < defaultNum; i++) {
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
    },
    /* addCart (index) {
      this.$router.push('/inCity/detail')
      console.log(this.drivers[index].name)
      content = this.drivers[index]
      console.log(content)
    }, */
    refresh () {
      this.refreshing = true
      defaultNum = 5
      setTimeout(() => {
        this.$http.get('./static/data.json').then((response) => {
          this.list = []
          const resData = response.data.driver
          console.log(response.data.errno)
          if (response.data.errno === ERR_OK) {
            console.log(1)
            this.drivers = resData.lists
            listNum = this.drivers.length
            for (let i = 0; i < defaultNum; i++) {
              this.list.push(this.drivers[i])
            }
          }
        })
        this.list = list
        this.num += 10
        this.refreshing = false
      }, 1000)
    },
    loadMore () {
      this.loading = true
      this.$http.get('./static/data.json').then((response) => {
        const resData = response.data.driver
        if (response.data.errno === ERR_OK) {
          this.drivers = resData.lists
          if (listNum >= defaultNum) {
            setTimeout(() => {
              if (listNum < defaultNum + 3) {
                for (let i = defaultNum; i < listNum; i++) {
                  this.list.push(this.drivers[i])
                }
              } else {
                for (let i = defaultNum; i < defaultNum + 3; i++) {
                  this.list.push(this.drivers[i])
                }
              }
              defaultNum += 3
              this.loading = false
            }, 1000)
          } else {
            setTimeout(() => {
              Toast({
                message: '没有更多数据了',
                position: 'middle',
                duration: 1000
              })
              this.loading = false
            }, 1000)
          }
        }
      })
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
