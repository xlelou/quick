<template>
    <div class="demo-infinite-container" id="all" ref="all">
        <mu-list>
            <template v-for="(item, index) in list">
                <mu-list-item :title="item.name"   @click="addCart(index)">
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
        </mu-list>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Bus from '../bus.js'
import BScroll from 'better-scroll'
const ERR_OK = 0
let listNum = 4
let list = []
let defaultNum = 5
let content = ''
let boxHeight
export default {
  data () {
    return {
      list,
      loading: false,
      scroller: null,
      scrollY: 0,
      listHeight: [],
      boxHeight
    }
  },
  created () {
    this.$http.get('./static/data.json').then((response) => {
      list = []
      const resData = response.data.driver
      console.log(response.data.errno)
      if (response.data.errno === ERR_OK) {
        this.drivers = resData.lists
        listNum = this.drivers.length
        for (let i = 0; i < defaultNum; i++) {
          this.list.push(this.drivers[i])
          boxHeight = this.$refs.all.getElementsByClassName('mu-list').clientHeight
        }
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    })
  },
  mounted () {
    this.scroller = this.$el
  },
  destroyed () {
    Bus.$emit('getTar', content)
  },
  methods: {
    _initScroll () {
      this.allScroll = new BScroll(this.$refs.all, {
        click: true,
        probeType: 1
      })
      this.allScroll.on('touchend', (pos) => {
        if (pos.y < -150 || this.flag) {
          clearTimeout(this.flag)
          this.loadMore()
          this.allScroll.refresh()
        }
      })
    },
    addCart (index) {
      this.$router.push('/inCity/detail')
      console.log(this.drivers[index])
      content = this.drivers[index]
    },
    loadMore (pos) {
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
            }, 2000)
          } else if (listNum < defaultNum || pos.y < -150) {
            setTimeout(() => {
              Toast({
                message: '没有更多数据了',
                position: 'middle',
                duration: 1000
              })
              this.loading = false
            }, 2000)
            return false
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
        top:105px;
        bottom: 0px;
        width:100%;
        border: 1px solid #d9d9d9;
    }
    #all{
        overflow: hidden;
    }
    .mu-snackbar{
        z-index: 99999999;
    }
</style>
