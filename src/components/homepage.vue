<template>
    <div class="container-body">
        <swipe class='swipe'></swipe>
        <div class="container">
            <section class="section1">
                <h2>欢迎使用<b>急速拼车</b>平台</h2>
                <p>随着现在人们生活节奏的加快，拼车已经成为一种常见现象，几个人一起拼车回家，既节省时间也节省车费。</p>
            </section>
            <mu-raised-button label='市内' class='demo-raised-button start-button' primary/>
            <mu-raised-button label='市外' class='demo-raised-button start-button' secondary/>
            <section class="section2">
                <h3>安全</h3>
                <p>高驾龄、经验丰富的司机师傅，在往返途中安全驾驶。</p>
            </section>
            <section class="section2">
                <h3>便捷</h3>
                <p>点对点接送，直至将您从出发地送达目的地的便捷服务。</p>
            </section>
            <section class="section2">
                <h3>稳定</h3>
                <p>每天、每个时间段都有司机师傅往返于不同目的地的行程。</p>
            </section>
            <section class="section2">
                <h3>快速</h3>
                <p>选择合适以及合理的路线以最快的方式将您送达目的地的。</p>
            </section>
            <card></card>
        </div>
    </div>
</template>
<style>
.swipe{
    height:15rem;
}
</style>
<script>
    import swipe from './home/swipe.vue'
    import card from './home/card.vue'
    export default {
      components: {
        swipe, card
      }
    }
</script>
