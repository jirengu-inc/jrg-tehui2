var GetChannel = {
        init:function($node,$ct){
            this.$node = $node;
            this.$ct = $ct;
            this.bind();
        },
        bind:function(){
            var _this = this;
            this.$node.on('click',function(){
                var idx = $(this).index();
                _this.idx = idx;
                _this.send();
            })
        },
        send:function(){
            var _this = this;
            $.ajax({
                url:'../../json/channel.json',
                dataType:'json',
                Method:'GET',
                Arguments: 'None',
                success:function (response){
                    var channelArr = response.channels;
                    var htmls = '',
                        $htmls;
                    for(var i=0;i<channelArr.length;i++){
                        htmls +=
                            '<li class="music-type" channel_id ="'
                                +channelArr[i].channel_id+
                            '"><a href="#"><div class="triangle"></div>'
                                +channelArr[i].name+
                            '</a></li>'
                        };
                    $htmls = $(htmls);
                    _this.$ct.eq(_this.idx).children('.list-ct').empty();//先清空再append，比状态锁在这好一些
                    _this.$ct.eq(_this.idx).children('.list-ct').append($htmls);
                },
                error:function (){
                    alert('除了一点故障');
                }
            });
        }
}