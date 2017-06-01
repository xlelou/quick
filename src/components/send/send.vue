<template>
    <div class='container-body send-body'>
        日期：<mu-date-picker hintText='选择乘车日期 '  fullWidth :minDate='minDate'/><br/>
        出发时间：<mu-time-picker hintText='出发时间' format='24hr' fullWidth /><br/>
        <mu-raised-button label='选择出发地地' @click='checkCity' fullWidth  />
        <mu-text-field  :value='address[1]' hintText='选择目的地' @click='checkCity' @blur='isShow=false' disabled  fullWidth /><br/>
        <mu-picker v-if='isShow' :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="address"/>
        <mu-raised-button class='sure-go' label='确认' v-if='isShow'  @click='isShow=false' fullWidth primary />

        <mu-raised-button label='目的地' @click='checkDCity' fullWidth  />
        <mu-text-field  :value='arrive[1]' hintText='目的地' @click='checkDCity' @blur='DIsShow=false' disabled  fullWidth /><br/>
        <mu-picker v-if='DIsShow' :slots="arriveSlots" :visible-item-count="5" @change="arriveChange" :values="arrive"/>
        <mu-raised-button class='sure-go' label='确认' v-if='DIsShow'  @click='DIsShow=false' fullWidth primary />

        <mu-raised-button label='查询' fullWidth secondary />
    </div>
</template>
<style lang='css'>
    .send-body{
         width:95%;
        margin: 56px auto 0px;
    }
    .mu-select-field{
        width:100%;
    }
    .sure-go{
        margin-bottom: 30px;
    }
</style>
<script>
    const address = {
      '东营': ['仙河镇', '孤岛', '陈庄', '西城', '东城', '利津', '垦利', '牛庄', '广饶'],
      '济南': ['火车站', '历下区', '历城区', '高新区'],
      '滨州': ['爱上', '阿什顿', '阿斯达', '自行车'],
      '淄博': ['爱上', '阿什顿', '阿斯达', '自行车']
    }
    const arrive = {
      '东营': ['仙河镇', '孤岛', '陈庄', '西城', '东城', '利津', '垦利', '牛庄', '广饶'],
      '济南': ['火车站', '历下区', '历城区', '高新区'],
      '滨州': ['爱上', '阿什顿', '阿斯达', '自行车'],
      '淄博': ['爱上', '阿什顿', '阿斯达', '自行车']
    }
    export default{
      data () {
        return {
          isShow: false,
          DIsShow: false,
          DCity: '',
          minDate: '',
          addressSlots: [
            {
              width: '100%',
              textAlign: 'right',
              values: Object.keys(address)
            }, {
              width: '100%',
              textAlign: 'left',
              values: ['仙河镇', '孤岛', '陈庄', '西城', '东城', '利津', '垦利', '牛庄', '广饶']
            }
          ],
          arriveSlots: [
            {
              width: '100%',
              textAlign: 'right',
              values: Object.keys(arrive)
            }, {
              width: '100%',
              textAlign: 'left',
              values: ['仙河镇', '孤岛', '陈庄', '西城', '东城', '利津', '垦利', '牛庄', '广饶']
            }
          ],
          arrive: ['东营', '仙河镇'],
          address: ['东营', '仙河镇'],
          addressProvince: '东营',
          addressCity: '仙河镇',
          arriveProvince: '东营',
          arriveCity: '西城'
        }
      },
      created () {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDate()
        let time = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
        this.minDate = time
      },
      computed: {
      },
      methods: {
        addressChange (value, index) {
          switch (index) {
            case 0:
              this.addressProvince = value
              const arr = address[value]
              this.addressSlots[1].values = arr
              this.addressCity = arr[0]
              break
            case 1:
              this.addressCity = value
              break
          }
          this.address = [this.addressProvince, this.addressCity]
        },
        arriveChange (value, index) {
          switch (index) {
            case 0:
              this.arriveProvince = value
              const arr = arrive[value]
              this.arriveSlots[1].values = arr
              this.arriveCity = arr[0]
              break
            case 1:
              this.arriveCity = value
              break
          }
          this.arrive = [this.arriveProvince, this.arriveCity]
        },
        checkCity () {
          this.isShow = !this.isShow
        },
        checkDCity () {
          this.DIsShow = !this.DIsShow
        }
      }
    }
</script>
