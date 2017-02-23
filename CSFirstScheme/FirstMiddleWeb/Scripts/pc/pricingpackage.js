(function() {

    //版本标题滚动固定
    var oTop = $(".con-header").offset().top,
        sTop = 0;
    $(window).scroll(function() {
        sTop = $(this).scrollTop();
        if (sTop >= oTop) {
            $(".con-header").addClass("con-header-fixed");
        } else {
            $(".con-header").removeClass("con-header-fixed");
        }
    });

    var pricingPage = {},
        packageId, flag = true,
        optionType = "none",
        deg = 0,
        ary = ['one', 'two', 'four', 'five'],
        ary2 = ['one','onlyTwo','onlyThree','onlyFour','onlyFive'],
        termType = ary[0],
        regTel = /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
        pwd = /[a-zA-Z0-9\!\(\)\-\~\@\.\_\^\#\%\&\*]{6,20}$/;

    //各版本中的立即购买
    pricingPage.edition = function() {
        $(".con-header li a").on("click", function() {
            var ary = [10002, 10003, 10004, 10005, 10006, 10007],
                _this = $(this);
            if ($(this).text() == "免费使用") {
                return;
            } else {
                $(".buy-now-bg").show();
                $(".modalBox").show();
                $("#buy-type").text($(this).prev().text());
                packageId = $(this).attr("packageId");
                if (packageId == "10007") {
                    $(".buy-year li").eq(1).hide();
                }
  
                if(packageId == "10002"||packageId == "10003"){
                    $(".buy-year li:eq(0)").find(".buy-option").html("");
                    $(".buy-year li:eq(0)").find(".buy-option").html("<a href='javascript:;' class='active'>1年<em></em></a><a href='javascript:;'>2年<em></em></a><a href='javascript:;'>3年<em></em></a><a href='javascript:;'>4年<em></em></a><a href='javascript:;'>5年<em></em></a>");
                    $(".modalBox .buy-year li:eq(0)").find(".buy-option").html("");
                    $(".modalBox .buy-year li:eq(0)").find(".buy-option").html("<a href='javascript:;' class='active'>1年<em></em></a><a href='javascript:;'>2年<em></em></a><a href='javascript:;'>3年<em></em></a><a href='javascript:;'>4年<em></em></a><a href='javascript:;'>5年<em></em></a>");  
                }else{
                    $(".buy-year li:eq(0)").find(".buy-option").html("");
                    $(".buy-year li:eq(0)").find(".buy-option").html('<a href="javascript:;" class="active">1年<em></em></a><a href="javascript:;">买2年赠2年<b>（热卖）</b><em></em></a><a href="javascript:;">买4年赠4年<em></em></a><a href="javascript:;">买5年赠5年<em></em></a>');
                    $(".modalBox .buy-year li:eq(0)").find(".buy-option").html("");
                    $(".modalBox .buy-year li:eq(0)").find(".buy-option").html('<a href="javascript:;" class="active">1年<em></em></a><a href="javascript:;">买2年赠2年<b>（热卖）</b><em></em></a><a href="javascript:;">买4年赠4年<em></em></a><a href="javascript:;">买5年赠5年<em></em></a>');
                }
                $.ajax({
                    url: "/drtPackage/getDefaultInfo",
                    type: "get",
                    data: {
                        "packageId": packageId
                    },
                    success: function(data) {
                        if (data.status== "200") {
                           pricingPage.randerDom(data.data, "buy-now", function(result) {
                                if(packageId == "10002"||packageId == "10003"){
                                     $(".modalBox #buy-info").find("li:eq(1) .buy-option").text(result.expireDate).end().find("li:eq(2) .buy-option").html('<h4>￥<b>' + result.price + '</b> </h4>');
                                }else{
                                     $(".modalBox #buy-info").find("li:eq(1) .buy-option").text(result.expireDate).end().find("li:eq(2) .buy-option").html('<h4>￥<b>' + result.price + '</b> </h4><h5><em>原价：￥' + result.fullPrice + '</em>节省：￥' + result.benefitPrice + '</h5>');
                                }
                               
                                if (packageId == "10007") {
                                    $(".modalBox .buy-year li").eq(1).hide();
                                } else {
                                    $(".modalBox .buy-year li").eq(1).show();
                                }
                                $(".modalBox  #buy-type").text(_this.prev().text());
                            }) 
                           //pricingPage.randerDom(data.data, "version-upgrade");
                        }else if(data.status == "500"){
                            pricingPage.randerDom(data.data, "version-upgrade");
                        }
                    }
                })
            }
        })
    }
    pricingPage.edition();

    // 点击版本中的立即购买的数据绑定
    pricingPage.randerDom = function(result, className, callBack) {
        var str = $("." + className).html();

        if ($(".modalBox").hasClass(className)) {
            typeof callBack == "function" && callBack(result);
            return;
        } else {
            $(".modalBox").attr("class", "modalBox " + className).html(str);
            $(".modalBox").filter("." + className).show().siblings().hide();
            typeof callBack == "function" && callBack(result);
        };
    }
    
    pricingPage.ajaxEvent = function(url, type, parameter, callBack){
        $.ajax({
            url: url,
            type: type,
            data: parameter,
            success: function(data) {
               callBack(data);
            }
        })
    }

    //各按钮事件（除手机登录和关闭按钮）
    pricingPage.elementEvents = function() {

        $("body").on("click", ".modalBox .buy-year a", function() { //各版本中年限与可信验证的切换
            if ($(this).parent().hasClass("buy-years")) {
                if (flag) {
                    $(this).addClass("active");
                    flag = false;
                    optionType = "auth";
                } else {
                    $(this).removeClass("active");
                    flag = true;
                    optionType = "none";
                }
            } else {
                $(this).addClass("active").siblings().removeClass("active");
               if(packageId == "10002"||packageId == "10003"){
                    termType = ary2[$(this).index()];
               }else{
                    termType = ary[$(this).index()];
               }
                
            }
            //console.log(packageId,optionType,termType)
            $.ajax({
                url: "/drtPackage/getInfo",
                type: "get",
                data: {
                    "packageId": packageId,
                    "optionType": optionType,
                    "termType": termType
                },
                success: function(data) {
                    pricingPage.randerDom(data.data, "buy-now", function(result) {
                        if(packageId == "10002"||packageId == "10003"){
                            $(".modalBox #buy-info").find("li:eq(1) .buy-option").text(result.expireDate).end().find("li:eq(2) .buy-option").html('<h4>￥<b>' + result.price + '</b></h4>');
                        }else{
                           $(".modalBox #buy-info").find("li:eq(1) .buy-option").text(result.expireDate).end().find("li:eq(2) .buy-option").html('<h4>￥<b>' + result.price + '</b></h4><h5><em>原价：￥' + result.fullPrice + '</em>节省：￥' + result.benefitPrice + '</h5>'); 
                        }
                        
                    })
                }
            })
        }).on("click", ".modalBox a.buy-button", function() { //立即购买按钮
            $.ajax({
                url: "/pricingpackage/purchase",
                type: "post",
                data: {
                    "packageId": packageId,
                    "optionType": optionType,
                    "termType": termType
                },
                success: function(data) {
                    if (data.status == "10301") { //登录-起点币
                        pricingPage.randerDom(data.data, "buy-payfor", function(result) {
                            //alert(result.consumeGold)
                            var price = result.weixinPrice,
                            priceNum = price > 0 ? "余额不足": result.consumeGold,
                            priceClass = price > 0 ? "red": "",
                            pay = price > 0 ? "充值并支付": "支付",
                            payHref = "javascript:;";
                            $(".modalBox ").find(".payfor-title b").text(result.price).end().find(".payfor-spending").html('<li> <span class="payfor-left">消费金币</span> <span class="payfor-right ' + priceClass + '">' + priceNum + '</span> </li> <li> <span class="payfor-left">消费企点币<em>（最多抵扣' + result.priceForCoin + '）</em></span> <span class="payfor-right ">' + result.consumeCoin + '</span> </li>').end().find(".payfor-info").html('<li> <span class="payfor-left">服      务</span> <span class="payfor-right">' + result.desc + '</span> </li> <li> <span class="payfor-left">提 供 方</span> <span class="payfor-right">微企点</span> </li> <li> <span class="payfor-left">创建时间</span> <span class="payfor-right">' + result.time + '</span> </li> <li> <span class="payfor-left">金币余额</span> <span class="payfor-right">' + result.gold + '</span> </li> <li> <span class="payfor-left">企点币余额</span> <span class="payfor-right">' + result.coin + '</span></li>').end().find(".payfor-btn a").text(pay).attr("href", payHref);

                        })
                    } else if (data.status == "10300") { //未登陆微信支付
                        pricingPage.randerDom(data.data, "buy-weixin", function(result) {
                            $('.modalBox').find("#qrcode").html("").qrcode({ //生成二维码
                                render: "table",
                                width: 150,
                                height: 150,
                                text: result.codeUrl
                            }).end().find("h4 em").text(result.weixinPrice);
                        })

                        var timer = setInterval(function() { //轮询
                            $.ajax({
                                url: "/pricingpackage/isPaySuccess",
                                type: "post",
                                success: function(data) {
                                    if (data.status == "200") { //支付成功 进入可微信扫码注册或登陆
                                        clearInterval(timer);
                                        $.ajax({
                                            url: "/pricingpackage/weixinLogin",
                                            type: "post",
                                            success: function(data) {
                                                $(".modalBox").find(".pay-img").attr("id", "wxload");
                                                var obj = new WxLogin({
                                                    id: "wxload",
                                                    appid: data.data.appid,
                                                    scope: data.data.scope,
                                                    redirect_uri: data.data.redirect_uri,
                                                    state: data.data.state,
                                                    style: "black",
                                                    href: ""
                                                });
                                            }
                                        });
                                        pricingPage.randerDom(data.data, "pay-code");
                                    }
                                }
                            })
                        },
                        3000)
                    }
                }
            })
        }).on("click", ".modalBox .pay-code .pay-changeBtn ", function() { //未登陆的情况下，微信登陆与手机登录切换
            var _this = $(this),
            timer,
            $payCode = $(".pay-code");
            timer = setInterval(function() {
                deg += 2;
                $payCode.css("transform", "rotateY(" + deg + "deg)");
                if ((deg / 90) % 2 == 1) {
                    deg += 180;
                    var $siblings = $payCode.find(".on").siblings();
                    $payCode.find(".on").removeClass("on");
                    $siblings.addClass("on");
                } else if ((deg / 90) % 2 == 0) {
                    clearInterval(timer);
                };
            },
            10);
        }).on("click", ".payfor-btn a", function() { //登陆下的支付按钮
            $.ajax({
                url: "/pricingpackage/loginPay",
                type: "post",
                data: {
                    "packageId": packageId,
                    "optionType": optionType,
                    "termType": termType
                },
                success: function(data) {
                    if (data.status == "10400") { //支付成功并跳到“我的站点”页面
                        pricingPage.randerDom(data.data, "pay-success");
                        /*setTimeout(function() {
                            window.location.href = memerLink
                        },
                        200)*/

                    } else if (data.status == "10401") { //出现微信支付窗口
                        pricingPage.randerDom(data.data, "buy-weixin",
                        function(result) {
                            $('.modalBox').find("#qrcode").html("").qrcode({
                                render: "table",
                                //也可以替换为table
                                width: 150,
                                height: 150,
                                text: result.codeUrl
                            }).end().find("h4 em").text(result.weinxinPrice);

                        });
                        var timer = setInterval(function() {
                            $.ajax({
                                url: "/pricingpackage/isPaySuccess",
                                type: "post",
                                success: function(data) {
                                    if (data.status == "200") {
                                         clearInterval(timer);
                                        pricingPage.randerDom(data.data, "pay-success");
                                        /*setTimeout(function() {
                                            window.location.href = memerLink
                                        },
                                        200)*/
                                    }
                                }
                            })
                        },
                        3000)

                    } else if (data.status == "500") { //出现支付失败
                        pricingPage.randerDom(data.data, "pay-error");
                    }
                }
            })
        })
    }
    pricingPage.elementEvents();

    //关闭按钮
    pricingPage.closeWindow = function() {
        $(document).off("click").on("click", ".closeBtn", function() {
            optionType = "none";
            flag = true;
            termType = ary[0];
            $(".modalBox .buy-year span.buy-option a").eq(0).addClass("active").siblings().removeClass("active");
            $(".modalBox .buy-year .buy-years a").removeClass("active");
            $(".buy-now-bg,.modalBox").css("display", "none");
        })
    }
    pricingPage.closeWindow();

    //手机登录
    pricingPage.phoneLogin = function() {
        $("body").on("click", ".modalBox #admin_btns", function() {
            if (! (pricingPage.chkPhone() && pricingPage.chkPwd())) return;
            var password = $(".modalBox #password").val(),
            loginId = $(".modalBox #loginId").val();
            $(".modalBox .pay-message").html("");
            $.ajax({
                url: "/pricingpackage/login",
                type: "POST",
                data: {
                    "loginId": loginId,
                    "password": password
                },
                success: function(data) {
                    if (data.status == "200") {
                        window.location.href = memerLink
                    } else {
                        $(".modalBox .pay-message").html("! 用户不存在/密码错误");
                    }
                }
            });
        }).on("blur", ".modalBox #loginId", function() {
            pricingPage.chkPhone();

        }).on("focus", ".modalBox #loginId", function() {
            $(".modalBox #password").removeClass("paylogin-error");

        }).on("blur", ".modalBox #password", function() {
            pricingPage.chkPwd();

        }).on("focus", ".modalBox #password", function() {
            $(".modalBox #password").removeClass("paylogin-error");

        }).on("keydown", ".modalBox input", function(e) {
            if (e.keyCode == 13) {
                $(".modalBox #admin_btns").trigger("click")
            }
        });
    }
    pricingPage.phoneLogin();

    //手机号码验证
    pricingPage.chkPhone = function() {
        var account = $(".modalBox #loginId").val();
        if (account == "") {
            $(".modalBox .pay-message").html("! 请输入手机号码");
            $(".modalBox #loginId").addClass("paylogin-error");
            return false;
        }
        if (!regTel.test(account)) {
            $(".modalBox .pay-message").html("! 请输入正确的手机号");
            $(".modalBox #loginId").addClass("paylogin-error");
            return false;
        }
        $(".modalBox #loginId").removeClass("paylogin-error");
        $(".modalBox .pay-message").html("");
        return true;
    }
    //密码验证
    pricingPage.chkPwd = function() {
        var passwd = $(".modalBox #password").val();
        if (passwd == "" || passwd == null) {
            $(".modalBox .pay-message").html("! 请输入密码");
            $(".modalBox #password").addClass("paylogin-error");
            return false;
        }
        if (!pwd.test(passwd)) {
            $(".modalBox .pay-message").html("! 请输入6-12位的密码");
            $(".modalBox #password").addClass("paylogin-error");
            return false;
        }
        $(".modalBox #password").removeClass("paylogin-error");
        $(".modalBox .pay-message").html("");
        return true;
    }
})()