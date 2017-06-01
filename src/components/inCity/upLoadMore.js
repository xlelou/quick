import message from "../assets/js/components/message"
import {loader} from "../util/util"

module.exports = {
	data() {
		return {
			post: [],
			isAjaxLoad : true,
			currentPage: 0,
			totalPage : null,
			pullUpEl : null,
			pullUpHeight: null,
			pullUpPlaceText: "上拉加载更多",
			pullUpLoadingText: "努力加载中...",
			pullUpNoInfoText: "没有更多信息了",
			getParams : {
				currentPage : 1
			},
			getUrl : '',
			pullUpConfig : {
				text  : '上拉加载更多',
				class : '',
			}
		}
	},
	created() {
		let vm = this
		vm.getPost()
	},
	mounted() {
	},
	watch: {
		'$route' (to, from) {
			this.getPost()
		},
		'totalPage' :  function(val) {
			let vm = this
			if(val){

				vm.$nextTick(() => {
					vm.pullUpEl = document.querySelector("#pullUp")
					vm.pullUpHeight = vm.pullUpEl.offsetHeight
					vm.eventScroll()
					vm.eventScrollEnd()
					vm.eventRefresh()
				})
				if((vm.currentPage) >= vm.totalPage){
					vm.pullUpConfig = {
						text  : '没有更多信息了',
						class : 'noinfo',
					}
				}else{

				}
			}
		},
	},
	methods :{
		eventRefresh() {
			let vm = this
			vm.pageScroll.on('refresh', function(){
		        if(vm.pullUpEl.className.match('loading') && vm.currentPage < vm.totalPage) {
		            vm.pullUpEl.className = 'pullAction'
		            vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpPlaceText
		        }else if(vm.pullUpEl.className.match('loading') && vm.currentPage >= vm.totalPage) {
		            vm.pullUpEl.style.display = 'none'
		            vm.pullUpEl.className = 'pullAction noinfo'
		            vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpNoInfoText;
		            vm.pageScroll.refresh()
		            console.log(vm.pullUpEl.className)
		            console.log(vm.currentPage+'，'+vm.totalPage)
		        }else{}
		    })
		},
		eventScroll() {
			let vm = this
			console.log('scroll：' + vm.currentPage+","+vm.totalPage)
			vm.pageScroll.on('scroll', function() {
				if(this.y < (this.maxScrollY - 25) && !vm.pullUpEl.className.match('flip') && vm.currentPage < vm.totalPage) {
					vm.pullUpEl.style.display = 'block'
					vm.pullUpEl.className = 'pullAction flip'
					vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpLoadingText
					this.maxScrollY = this.maxScrollY
				} else if(this.y > (this.maxScrollY + 10) && vm.pullUpEl.className.match('flip')) {
					vm.pullUpEl.style.display = 'block'
					vm.pullUpEl.className = 'pullAction'
					vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpPlaceText
					console.log(vm.pullUpPlaceText)
					this.maxScrollY = vm.pullUpHeight
				} else if(this.y < (this.maxScrollY - 25) && !vm.pullUpEl.className.match('flip') && vm.currentPage >= vm.totalPage) {
					vm.pullUpEl.style.display = 'block'
					vm.pullUpEl.className = 'pullAction noinfo'
					vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpNoInfoText
					this.maxScrollY = this.maxScrollY
				}
			})
		},
		eventScrollEnd() {
			let vm = this
			vm.pageScroll.on('scrollEnd', function() {
				console.log('scrollEnd：' + vm.currentPage+","+vm.totalPage)
				if (vm.pullUpEl.className.match('flip')) {
		            vm.pullUpEl.className = 'pullAction loading'
		            vm.pullUpEl.querySelector('.pullLabel').innerHTML = vm.pullUpLoadingText
		            vm.pullUpAction()
		        }
			})
		},
		getPost() {
			let vm = this
			vm.isAjaxLoad = false
			vm.refresh = false
			vm.$http.get(vm.getPostUrl)
            .then((response) => {
                if(response.data.status === 200){
            		vm.post = vm.post.concat(response.data.data)
					vm.totalPage = response.data.totalPage
					vm.currentPage += 1;
					vm.refresh = true
                }else{
                	vm.error = "数据获取失败"
                	message({
						content: vm.error
					});
					vm.totalPage = 0
                }
                vm.isAjaxLoad = true
            })
            .catch(function(response) {
            	vm.error = "数据异常"
            	message({
					content: vm.error
				});
            })
		},
		pullUpAction(){
			let vm = this
			if(vm.currentPage < vm.totalPage && !!vm.isAjaxLoad){
				vm.getPost();
			}
		}
	}
}