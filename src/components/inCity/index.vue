<template>
	<div class="m-redemption">
		<div class="m-points-total">
			<p class="tit">目前为止，您拥有积分：</p>
			<p class="number" v-if="baseInfo">{{baseInfo.user.points}}</p>
			<p class="tip">
				<router-link :to="{name:'points'}" class="f-light">积分明细</router-link>
			</p>
		</div>
		<moudle-category :categoryData=baseInfo.redemption.category v-if="baseInfo"></moudle-category>
		<div class="list-redemption">
			<ul id="thelist" v-if="post.length > 0">
				<li class="f-clearfix" v-for="item in post">
					<router-link :to="{name:'redemptionView', params: {id:item.id,type:item.type}}">
						<div class="thumb">
							<img :src="item.thumb" alt="">
						</div>
						<div class="meta">
							<h2>{{item.name}}</h2>
							<p>
								<span class="number">{{item.price}}</span> 积分
							</p>
						</div>
						<span class="buy">兑换</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div id="pullUp" class="pullAction" :class=pullUpConfig.class v-if=totalPage>
			<div class="pullIcon">
				<div class="ball-spin-fade-loader">
					<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
				</div>
	        <div class="pullLabel">{{pullUpConfig.text}}</div>
	    </div>
	</div>
</template>

<script>
	import '../../assets/css/components/list.scss'
	import '../../assets/css/pages/integral.scss'
	import '../../assets/css/pages/redemption.scss'

	import mixinsRefresh from "../../mixins/refresh"
	import mixinsUpLoadMore from "../../mixins/upLoadMore"

	export default {
		mixins : [mixinsRefresh,mixinsUpLoadMore],
		data() {
			return {
				refresh : false,
				baseInfo: this.$store.state.app.baseInfo,
				getPostUrl : '/static/data/redemption.json',
			}
		},
		created() {
		},
		mounted() {

		},
		updated() {
		},
		methods: {
		},
		components: {
			"moudle-category"             : require('./category'),
		},
	}
</script>
<style scoped>

</style>
