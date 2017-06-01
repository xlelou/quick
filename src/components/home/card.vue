<template>
    <mu-card>
        <mu-card-header title="Xlelou" subTitle="网站前端开发者">
            <mu-avatar :src="myron" slot="avatar"/>
        </mu-card-header>
        <mu-card-media title="可惜我没有车" subTitle="有车我也顺风车">
            <img :src="img" />
        </mu-card-media>
        <mu-card-text>
            网约车已经合法了，顺风车的时代已经到来！
        </mu-card-text>
    </mu-card>
</template>
<style>
    .mu-card{
        margin:12px auto;
    }
</style>
<script>
    import img from '../../assets/timg.jpg'
    import myron from '../../assets/index.png'
    export default {
      data () {
        return {
          img,
          myron
        }
      }
    }
</script>
