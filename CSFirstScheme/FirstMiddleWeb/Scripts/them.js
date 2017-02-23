$(function(){
	//设置footer位置
	if($("body").height() < $(window).height()){
		$("footer.footer").css({"position":"fixed","bottom":"0","left":"0"})
	}
	$("button").each(function(){
		$(this).focus(function(){
			$(this).blur();
		})
	});
	var $text  = '';
	var $iconGray = $(".tab-pane .nwqd-them-themname");
	$iconGray.each(function() {
		var $this = $(this);
		$this.hover(function() {
			$(this).parents(".theme-mess").siblings().find(".theme-progres").addClass("fadeout");
		}, function() {
			$(this).parents(".theme-mess").siblings().find(".theme-progres").removeClass("fadeout");
		});
	});
	//展开收起标签
	var $modelTab = $("ul.modelTab");
//	if($("li",$modelTab).length > 22 && showMoreTag){
//		$("#up").show().addClass("slidetoggle");
//		$("li:gt(22)",$modelTab).not("li:last-child").hide();
//	}else{
//		$("#up").hide();
//	}
	
	$modelTab.on("click","#up",function(){
		$("li:gt(22)",$modelTab).not("li:last-child").toggle();
		$(this).toggleClass("slidetoggle");
	})
	//创建二维码
	 $(".mobil-page-list li.ewm").each(function(){
	 	//$(this).attr("hrefLine");
	 	var $obj = $(this);
	 	$obj.empty();
	 	$obj.qrcode({ 
		    render: "canvas", //table方式 
		    width: 110, //宽度 
		    height:110, //高度 
		    text: $(this).attr("hrefLine") //任意内容 
		}); 
	 });
	 
	var $ulModel = $("ul.modelTab"),
		$groupId = $("#groupId").val(),
		$displayMode = $("#displayMode").val();
	//点击时的显示效果
	$(window).load(function(){
		//$('body').scrollTop(260);
		var $urlTagsVal = $.getUrlParam('tags');
		encodeURI($urlTagsVal);
	});
	$ulModel.on("click","li.th-item", function() {
		 var $this = $(this);
		$text = $this.text();
		var $true = false;
		$this.addClass("active");
		$this.siblings().removeClass("active");
		location.href = location.pathname+"?tags="+$text+"&groupId="+$groupId+"&displayMode="+$displayMode;

	});
	//终端显示 showType
	$(document).on("click",".showType li",function(){
		$displayMode = $.trim($(this).attr("model"));
		$(".showType li").removeClass("active");
		$(this).addClass("active");
		location.href = location.pathname+"?tags="+$text+"&groupId="+$groupId+"&displayMode="+$displayMode;
	})
	//模版类型选择 tags
	$("#myTab li span").on("click",function(){
		var url = $(this).attr("linkhref");
		if($(".checked-eleg li").length){
			var arguments = "?tags=";
			for(i = 0; i < $(".checked-eleg li").length; i++){
				arguments += (i == $(".checked-eleg li").length-1 ? $(".checked-eleg li").eq(i).text() : $(".checked-eleg li").eq(i).text()+",");
			}
		}else{
			var arguments = "";
		}
		location.href = url+arguments+"&groupId="+$groupId;
	});
});
//获取网址参数
$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);		
	if (r!=null) return (decodeURIComponent(r[2])); return null;
}
