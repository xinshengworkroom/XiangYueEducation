$(function() {
    var bdhtml = '<div class="bdsharebuttonbox" data-tag="share_1" style="position:absolute;bottom:0;right:0;display:none;"><a class="bds_sqq" data-cmd="sqq"></a><a class="bds_weixin" data-cmd="weixin" href="#"></a><a class="bds_tsina" data-cmd="tsina"></a><a class="bds_baidu" data-cmd="baidu"></a><a class="bds_renren" data-cmd="renren"></a><a class="bds_qzone" data-cmd="qzone"></a><a class="bds_tqq" data-cmd="tqq"></a><a class="bds_tieba" data-cmd="tieba"></a><a class="bds_count" data-cmd="count"></a></div>';
    $('body').append(bdhtml);
    function share() {
        var description = title = $("[shareText]").attr("shareText");
        window._bd_share_config = {
            common: {
                bdText: title,
                bdDesc: description,
                bdUrl:   window.location.href,
                bdPic: $("[erweima]").attr("erweima")
            },
            share: [{
                "bdSize": 16
            }]
        };
        with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
    };
    share();
    //分享设置
    $('.wqd-share span:eq(1)').on('click', function() {
        $('a.bds_sqq')[0].click();
    });
    // $('.wqd-share span:eq(2)').on('click', function() {
    //     $('a.bds_weixin')[0].click();
    // });
    $('.wqd-share span:eq(2)').on('click', function() {
        $('a.bds_tsina')[0].click();
    });
    $("body").append("<div style='width:240px;height:270px;position:absolute;display:none;top:50%;left:50%;box-shadow: 1px 1px 21px 2px;z-index:99;border-radius: 8px;' class='follow_box'><span class='follow_txt' style='float:left;margin: 10px 0 0 10px'>分享到朋友圈</span><span class='follow_close' style='float:right;margin:10px 10px 0 0'><i class='fa fa-remove' style='font-size: 22px;'></i></span></div>")
    
});
