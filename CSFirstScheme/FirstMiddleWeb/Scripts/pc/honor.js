$(function() {
	var pay = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			//点击导航显示对应
			var idx = 0,
				self = this;
			$("body").on("click", ".honorList>li", function() {
				    if($(this).hasClass("active")) return;
					var Idx = $(this).index();
					idx = 0;
					$(this).addClass("active").siblings().removeClass("active");
					$(".honor-wrapper").find(".honor-items").eq(Idx).addClass("active").siblings().removeClass("active");
					$(".honor-wrapper").find("div.active .honorListitems").css("margin-left",0).end().find("div.active .honor-btns li").eq(0).addClass('on').siblings().removeClass('on');
					$(".honor-wrapper").find("div.active .prev").removeClass("on");
				})
				.on("click", ".honor-btns li", function() {
					var W = $(this).parents(".honor-items").find(".honor-left").width(),
						Idx = $(this).index(),
						len = $(this).parent().find("li").length;
					idx = Idx;
					if (Idx == 0) $(".honor-left").find(".prev").removeClass("on").end().find(".next").addClass("on");
					else if (Idx == len - 1) {
						$(".honor-left").find(".next").removeClass("on").end().find(".prev").addClass("on");
					}
					else{
						$(".honor-left").find(".next").addClass("on").end().find(".prev").addClass("on");
					}
					$(this).addClass("on").siblings().removeClass("on").parents(".honor-items").find(".honorListitems").css("margin-left", -idx * W)
				})
				//点击左侧按钮
				.on("click", ".honor-left .prev", function() {
					if ($(this).parents(".honor-items").is(":visible")) {
						var W = $(this).parents(".honor-items").find(".honor-left").width(),len = $(this).parent().next().find("li").length;
						idx == 0 ? 0 : idx--;
						if (idx <= 0) $(".honor-left").find(".prev").removeClass("on").end().find(".next").addClass("on");
						else if(idx>=1&&idx!=len-1){
							$(".honor-left").find(".prev").addClass("on").end().find(".next").addClass("on");
						}
						$(this).parents(".honor-items").find(".honorListitems").css("margin-left", -idx * W).end().find(".honor-btns li").eq(idx).addClass("on").siblings().removeClass("on");
					}
				})
				//点击右侧按钮
				.on("click", ".honor-left .next", function() {
					if ($(this).parents(".honor-items").is(":visible")) {
						var W = $(this).parents(".honor-items").find(".honor-left").width(),
							len = $(this).parent().next().find("li").length;
						idx >= len - 1 ? len - 1 : idx++;
						if (idx == len - 1) {
							$(".honor-left").find(".next").removeClass("on").end().find(".prev").addClass("on");
						}
						else if(idx>=1&&idx != len - 1){
							$(".honor-left").find(".prev").addClass("on").end().find(".prev").addClass("on");
						}
						else if(idx==0)$(".honor-left").find(".prev").removeClass("on").end().find(".next").addClass("on");
						$(this).parents(".honor-items").find(".honorListitems").css("margin-left", -idx * W).end().find(".honor-btns li").eq(idx).addClass("on").siblings().removeClass("on");
					}
				})
		}
	}
	return pay.init();
})

!function(){

	function imgPopup(){

		this.init();

	}

	imgPopup.prototype = {

		init : function(){

			this.bindEvent();

		},

		createDom : function($_){

			var $dom = '<div class="imgPopup"><div class="Popupparent"><div class="popupclose"></div><div class="left-btn"></div><div class="right-btn"></div><ul class="honorListitems">' + $_ + '</ul></div></div>';
			
			return $($dom);

		},

		bindEvent : function(){
			
			var _self = this;

			$(document).on('click','.honorListitems img',function(){

				if($('.imgPopup').length) return false;

				var _index = $(this).parent('li').index();
				
				var $_ = $(this).closest('.honorListitems').html();

				var $_ = _self.createDom($_);

				$('body').append($_);

				$('.Popupparent').find('li').eq(_index).addClass('on');

			})

			$(document).on('click','.popupclose',function(e){

				_self.close();
				
			})
			
			$(document).on('click','.left-btn',function(){

				$('.honorListitems').find('.on').prev().addClass('on').siblings('li').removeClass('on');

			})

			$(document).on('click','.right-btn',function(){

				$('.honorListitems').find('.on').next().addClass('on').siblings('li').removeClass('on');

			})
			
		},
		close : function(){

			$('.imgPopup').remove();

		}
	}
	
	new imgPopup();

}(window);