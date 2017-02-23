/*  
	update	 : daimingru
	date     : 2016-12-07
	function : 修改了表单验证相关JS
			   优化提交
			   增加极验
	
*/

function checkForm(option){
	this.errormsg	  = {
		'msg' 		  : "请填写",
		'msgError'	  : "格式有误，请重新输入",
		'msgPhone' 	  : "该手机号已被注册！",
		'msgMail' 	  : "该邮箱已被注册！",
		'msgValidate' : "您的验证码有误，请重新输入",
		'msgPop'	  : "<section class='Popup_section'><div class='Popup'><i>X</i><div></div><p>您提交的信息有误，请重新提交</p></div><section>"
	};
	this.sendFlag 	  = false;
	this.timer		  = null;
	this._form 		  = option.form;
	this._inputlist   = [];
	this.init();
}

checkForm.prototype.init = function(){
	this.scrollTo();
	this.getinput();
	this.bindsubmit();
	this.bindUnempty();
	this.bindvalidate();
	this.bindCheckphone();
	this.bindCheckemail();
	this.bindCheckqq();
	this.bindSenmsg();
}

//判断直接跳到指定位置
checkForm.prototype.scrollTo = function(){
	if($("#validate").val() == "验证码错误"){
		$("body").scrollTop(5469);
		$(document).scrollTop(5469);//当前的位置距离body的scrollTop值
	}
}

//验证码获取焦点
checkForm.prototype.bindvalidate = function(){
	var _self 	 = this;
	var _sendBtn = $('#short_but');
	$("#validate").on('focus',function(){
		if(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test($('#phone').val())){
			_sendBtn.addClass('showsendBtn');
		}else{
			_sendBtn.removeClass('showsendBtn');
		}
	})
}

//获取所有input缓存
checkForm.prototype.getinput = function(){
	var _self = this;
	_self._form.find('input').each(function(){
		_self._inputlist.push($(this));
	})
	//最后一个是提交按钮，所以删除了
	_self._inputlist.pop();
}

//绑定blur事件判断是否为空
checkForm.prototype.bindUnempty = function(){
	var _self = this;
	for(var i = 0 ; i < _self._inputlist.length ; i++){

		//提交按钮和短信不加事件
		if(_self._inputlist[i].attr('id') != 'validate' && _self._inputlist[i].attr('id') != 'butn' && _self._inputlist[i].attr('id') != 'message'){
			_self._inputlist[i].on('blur',function(){
				var val = $(this).val();
				if(val == '' || val.length == 0){
					_self.Emptyerror($(this));
					return false;
				}
			})
		}

		//错误获得焦点清空input值
		_self._inputlist[i].on('focus',function(){
			var $_ = $(this);
			if($_.hasClass('error')){
				$_.removeClass('error').val('');
			}
		})
		
		//限制输入字符
		_self._inputlist[i].on("input propertychange", function(e) {
			var val = $.trim($(this).val());
			if (/[^\dA-Za-z\@\_\#\_\(\)\（\）\.\u4e00-\u9fa5]/g.test(val)) {
				$(this).val(val.replace(/[^\dA-Za-z\@\_\#\_\(\)\（\）\.\u4e00-\u9fa5]/g, ""))
			}
		})
	}
}

//发送短信 and 极致验证
checkForm.prototype.bindSenmsg = function(){
	var _self = this;
    wqdGeetest({
        clickEle:"#short_but",//点击元素
        captchaInter:"/captcha/send",//发送短信接口
        secondCheckInter:"/geet/validate.html",//FF二次验证
        changeClass:"disbtn",//添加移除的样式
        parameter: function(){
        	return {"emailOrPhone":$("#phone").val()}; //参数
        },
        callFun:function(ele,go){
			if($(ele).hasClass('disbtn')){
				go.isgoon=false;
				return false;
			}
			$(ele).addClass('disbtn');
        }
    });

}

//点击提交判断是否为空
checkForm.prototype.eachIsempty = function(){
	var _self = this;
	var flag  = true;
	for(var i = 0 ; i < _self._inputlist.length ; i++){
		var val = _self._inputlist[i].val();
		if((val == '' || val.length == 0 || _self._inputlist[i].hasClass('error')) && _self._inputlist[i].attr('id') != 'message'){
			_self.Emptyerror(_self._inputlist[i]);
			flag = false;
		}
	}
	return flag;
}

//绑定表单提交事件
checkForm.prototype.bindsubmit = function(){
	var _self = this;
	//绑定表单提交事件
	_self._form.on("submit", function() {
		if(!_self.eachIsempty()){
			$(_self.errormsg.msgPop).appendTo($("body"));
			return false;
		}
	})
	//绑定关闭错误弹框
	$("body").on("click", ".Popup_section i,.Popup_sectionSub i", function(e) {
		e.stopPropagation();
		$(this).parents("section").remove();
	})
}

//验证手机号是否正确
checkForm.prototype.bindCheckphone = function(){
	var _self = this;
	var _sendBtn = $('#short_but');
	$('body').on('blur','#phone',function(){
		var val = $(this).val();
		if(!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val)){
			$(this).addClass('error');
			_self.Checkerror($(this));
			return false;
		}else{
			_self.checkregist($(this),'isExistPhone');
		}
	})
}

//验证邮箱是否正确
checkForm.prototype.bindCheckemail = function(){
	var _self = this;
	$('body').on('blur','#email',function(){
		var val = $(this).val();
		if(!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(val) && val != ''){
			$(this).addClass('error');
			_self.Checkerror($(this));
			return false;
		}else if(val == ''){
			_self.Emptyerror($(this));
			return false;
		}
		_self.checkregist($(this),'isExistEmail');
	})
}

//验证QQ号是否正确
checkForm.prototype.bindCheckqq = function(){
	var _self = this;
	$('body').on('blur','#qqNumber',function(){
		var val = $(this).val();
		if(!/^\d{5,15}$/.test(val) && val != ''){
			$(this).addClass('error');
			_self.Checkerror($(this));
			return false;
		}
	})
}

//验证手机号邮箱是否被注册
checkForm.prototype.checkregist = function($_,type){
	var _self = this;
	var data  = {};
	var _sendBtn;
	if(type == 'isExistPhone'){
		data.phone = $_.val();
		 _sendBtn = $('#short_but');
	}else{
		data.email = $_.val();
	}
	$.ajax({
		url: "/check/" + type,
		type: "get",
		data: data,
		success: function(data) {
			if (data.status == 200) {
				$_.removeClass('error');
				if(_sendBtn){
					_sendBtn.addClass('showsendBtn');
				}
			} else {
				if(type == 'isExistPhone'){
					$_.addClass('error').val(_self.errormsg.msgPhone);
				}else{
					$_.addClass('error').val(_self.errormsg.msgMail);
				}
				if(_sendBtn){
					_sendBtn.removeClass('showsendBtn');
				}
			}
		}
	})
}

//为空时候的错误提示
checkForm.prototype.Emptyerror = function($_){
	var _self = this;
	$_.addClass('error').val(_self.errormsg.msg + $_.attr('placeholder'));
}

//验证的错误提示
checkForm.prototype.Checkerror = function($_){
	var _self = this;
	$_.addClass('error').val($_.attr('placeholder') + _self.errormsg.msgError);
}


new checkForm({
	'form':$('#formsub')
});





