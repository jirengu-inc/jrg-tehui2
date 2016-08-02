define(['jquery'],function(){
			function Waterfall($ct,$nodes){

					this.$wrap = $ct;
					this.$nodes = $nodes;
					this.itemWidth = $nodes.outerWidth(true);
					this.imgOK = false;
					this.colsHeightArr = [];
					this.init()

			 }

			Waterfall.prototype.init=function(){
				this.start()
			}

			Waterfall.prototype.start = function(){
				this.colsNum = Math.floor((this.$wrap.width()/this.itemWidth));
				if(this.colsHeightArr.length === 0 ){
					for(var i=0;i<this.colsNum;i++){
						this.colsHeightArr.push(0)
					}
				}
			}

			Waterfall.prototype.getMinHeightIdx = function(){
					var minHeight = this.colsHeightArr[0];
					var minHeightIdx = 0;
					for(var i=0;i<this.colsNum;i++){
						if(minHeight > this.colsHeightArr[i]){
							minHeight = this.colsHeightArr[i];
							minHeightIdx = i;
						}
					}
					return minHeightIdx;
			}

			Waterfall.prototype.render = function(nodes){
				var me = this;
				var $nodes = null;
				if(!nodes){
					$nodes = this.$nodes;
				}else{
					$nodes = $(nodes)
					this.$wrap.append($nodes)
				}
				if(!$nodes){return}
					$nodes.each(function(){
						var idx = me.getMinHeightIdx();
						$(this).css({ left:me.itemWidth * idx,top:me.colsHeightArr[idx]});
						me.colsHeightArr[idx] += $(this).outerHeight(true);
						me.$wrap.height(Math.max.apply(null,me.colsHeightArr))
					})
			}

			return Waterfall
})
