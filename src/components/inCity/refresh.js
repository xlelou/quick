module.exports = {
	data() {
		return {
			pageScroll : this.$root.$data.pageScroll,
			refresh : true,
		}
	},
	watch: {
		//状态监视
		'refresh' (val) {
			//刷新列表
			val && this.iscrollRefresh()
		},
	},
	created() {
		this.refresh && this.iscrollRefresh()
	},
	methods: {
		iscrollRefresh() {
			let vm = this
			vm.$nextTick(() => {
				setTimeout(()=>{
					vm.pageScroll.refresh()
				},500)
			})
		}
	}
}