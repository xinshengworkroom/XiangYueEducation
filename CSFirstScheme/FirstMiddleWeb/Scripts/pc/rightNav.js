
$(function(){
	$(".tab").on("click","li",function(){
		var $this = $(this);
		$this.addClass("active").siblings().removeClass("active");
		$this.parent().siblings().find(".tab-item").eq($this.index()).show().siblings().hide();
	});
	$("a[data-toggle='tab']").on("click",function(){
		$("a[data-toggle='tab']").removeClass("on")
		$(this).addClass('on');
	})

	// 右侧分类标签显示全部或者收起
	$(document).on("click",".more",function(){
		if($(this).hasClass("up")){
			$(".tipList>li.moreButhide").addClass("hide");
			$(this).removeClass("up hide").html("更多<span></span>");
		}else{
			$(".tipList>li.moreButhide").removeClass("hide");
			$(this).addClass("up").html("收起<span></span>");
		}
	})

	//右侧列表模板推荐轮播图数据显示
	toAjax(url+"/theme/recommend?pageNo=1&pageSize=6&displayMode=pc","GET",function(data){
		showDataPc(data.data.data);
	});
	toAjax(url+"/theme/recommend?pageNo=1&pageSize=8&displayMode=phone","GET",function(data){
		showDataPhone(data.data.data);
	});
	function  toAjax(urlPath,type,callback){
		$.ajax({
			url : urlPath,
			type :type,
			dataType :"JSON",
			success:function(data){
				callback(data);
			}
		})
	}
	//右侧列表模板推荐轮播图数据显示 PC端
	function showDataPc(data){
		var html = '';//templatePC
		var isActive='';
		var len =  (data.length > 6) ? 6 : data.length;
		for(var i = 0 ; i < len ; i ++){
			i==0 ? isActive = "active" : isActive = "";
			html += '<div class="item templateCell '+isActive+'">';
			html += '<i class="nwqd nwqd-them-produc"></i>';
			html += '<a href="/theme/preview.html?url='+data[i].siteUrl+'&id='+data[i].id+'&displayMode=pc" target="_blank"><img src="'+data[i].icon+'" ></a>';
			html += '<a href="/theme/preview.html?url='+data[i].siteUrl+'&id='+data[i].id+'&displayMode=pc" target="_blank" class="title">'+data[i].name+'</a>';
			html += '<p class="name">设计师：<span>'+data[i].author+'</span></p>';
			html += '<p class="name">使用量：<span>'+data[i].total+'</span></p>';
			html += '<div class="free">'+data[i].price+'</div>';
			html += '</div>';
		}
		$(".myCarousel .templatePC").empty().append(html);
	}
	//右侧列表模板推荐轮播图数据显示 手机端
	function showDataPhone(data){
		var html = '';//templatePC
		var isActive='';
		var len =  (data.length > 8) ? 8 : data.length;
		for(var i = 0 ; i < len; i ++){
			i==0 ? isActive = "active" : isActive = "";
			html += '<div class="item  '+isActive+'">';
			html += '<div class="templateCellLeft templateCell">';
			html += '<a href="/theme/preview.html?url='+data[i].siteUrl+'&id='+data[i].id+'&displayMode=phone" target="_blank"><img src="'+data[i].icon+'" ></a>';
			html += '<a href="/theme/preview.html?url='+data[i].siteUrl+'&id='+data[i].id+'&displayMode=phone" target="_blank" class="title">'+data[i].name+'</a>';
			html += '<p class="name">设计师：<span>'+data[i].author+'</span></p>';
			html += '<p class="name">使用量：<span>'+data[i].total+'</span></p>';
			html += '<div class="free">'+data[i].price+'</div>';
			html += '</div>';
			html += '<div class="templateCellRight templateCell">';
			html += '<a href="/theme/preview.html?url='+data[i+1].siteUrl+'&id='+data[i+1].id+'&displayMode=phone" target="_blank"><img src="'+data[i+1].icon+'" ></a>';
			html += '<a href="/theme/preview.html?url='+data[i+1].siteUrl+'&id='+data[i+1].id+'&displayMode=phone" target="_blank" class="title">'+data[i+1].name+'</a>';
			html += '<p class="name">设计师：<span>'+data[i+1].author+'</span></p>';
			html += '<p class="name">使用量：<span>'+data[i+1].total+'</span></p>';
			html += '<div class="free">'+data[i+1].price+'</div>';
			html += '</div></div>';
			i++;
		}
		$(".myCarousel .templatePhone").empty().append(html);
	}
})