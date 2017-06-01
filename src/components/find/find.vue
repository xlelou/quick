<template>
    <div class="container-body send-body">
        {{msg}}
        <mu-text-field hintText="姓名" v-model="name" :errorText="inputErrorText" fullWidth @textOverflow='checka'  :maxLength='10' /><br/>
        <mu-text-field hintText="年龄" :errorText='tips' fullWidth v-model='pickerVisible' /><br/>
        <mu-text-field hintText="电话" fullWidth /><br/>
        <mu-select-field v-model="sex" errorText  label="性别" >
            <mu-menu-item value="1" title="男"/>
            <mu-menu-item value="2" title="女"/>
        </mu-select-field>
        <mu-text-field hintText="驾龄" fullWidth /><br/>
        <mu-raised-button label="提交" fullWidth secondary @click='openPicker' />
        <mt-datetime-picker
                ref="picker"
                v-model="pickerVisible"
                type="time"
                @confirm="handleConfirm">
        </mt-datetime-picker>
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
</style>
<script>
    export default{
      data () {
        return {
          msg: 'hello vue',
          sex: '',
          name: '',
          inputErrorText: '',
          tips: '',
          pickerVisible: ''
        }
      },
      computed: {
        errorText () {
          return this.sex ? '' : '这是必选项'
        }
      },
      methods: {
        openPicker () {
          this.$refs.picker.open()
        },
        handleConfirm (pickerVisible) {
          console.log(pickerVisible)
        },
        check () {
          if (this.sex === '') {
            console.log(1)
            return this.sex ? '' : '这是必选项'
          } else {
            console.log(2)
          }
        },
        checka (isOverflow) {
          this.inputErrorText = isOverflow ? '超出了' : ''
        }
      }
    }
</script>
