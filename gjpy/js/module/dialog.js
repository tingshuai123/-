define(['jquery'],function($){
	$.HHL = $.HHL|| {versions: "huhongliang1.0"};
	$.HHL.dialogMask = {
		dialogHtml: ['<div id="dialog" class="dialog fade"><div class="dialogBg"></div><div class="dialog_main">',
		'</div></div>'].join(''),

		dialogBox : ['<div class="dialog_box" id="dialog_box">',
		'<div class="dialog_content pr z222"><a href="javascript://" class="close icon_common js_close_dialog">X</a>',
		'<div class="dialog_box_title"><span>&nbsp;</span></div>',
		'<div class="dialog_box_pack"></div></div>',
		'</div></div></div>'].join(''),

		// 配置弹层内容，并且显示
		// 调用方法 $.HHL.dialogMask.dialog_main(obj)
		dialog_main : function(obj){
			var _this = this,
				html = obj.content || "",
				title = obj.title || false,
				width = obj.width,
				callback = obj.callback;
			_this.dialog_setMaskShow();
			$(".dialog_main").html(_this.dialogBox);
			$(".dialog_box_pack").html(html);
			$dialogBox = $("#dialog_box");
			_this.dialog_title(title);
			width?$dialogBox.width(width):"";
			_this.dialog_close();
			callback && callback()
		},

		// 显示遮罩层
		// 调用方法 $.HHL.dialogMask.dialog_setMaskShow(id,callback)
		dialog_setMaskShow:function(id,callback){
			var _this = this;
			if(!$(".dialog").length>0) {
				$("body").append(_this.dialogHtml);
			}
			$("body").addClass("model_open");
			$("#dialog").show().addClass("in");
			if(id) { $("#"+id).show();}
			callback && callback()
		},

		// 隐藏遮罩层
		// 调用方法 $.HHL.dialogMask.dialog_setMaskHide(id,callback)
		dialog_setMaskHide:function(id,callback){
			var _this = this;
			$("#dialog").removeClass("in").remove();
			$("body").removeClass("model_open");
			if(id) { $("#"+id).hide();}
			callback && callback()
		},

		// 弹层标题
		// 调用方法 $.HHL.dialogMask.dialog_title(title)
		dialog_title:function(title){
			var $title = $(".dialog_box_title span");
			if(title) {
				$title.html(title).show();
			} else {
				$title.html("").hide();
			}
		},

		// 配置弹层的关闭事件
		// 调用方法 $.HHL.dialogMask.dialog_close()
		dialog_close : function(){
			var _this = this;
			$("#dialog_box .js_close_dialog").off("click").on("click",function(){
				_this.dialog_setMaskHide();
			})
		},

		// ajax
		// 调用方法 $.HHL.dialogMask.ajax(obj);
        ajax:function(obj){
			var _this = this,
        		url = obj.url,
        		data = obj.data || "",
        		ajaxtype = obj.type || "post",
        		dataType = obj.dataType || "json",
        		ajaxSuccess = obj.ajaxSuccess,
        		ajaxError = obj.ajaxError;
        	$.ajax({
	            type: ajaxtype,
	            url: url,
	            dataType: dataType,
	            data: data,
	            success: function (json) {
            		ajaxSuccess && ajaxSuccess(json)
	            },
	            error: function () {
	                console.log("ajaxError!");
	                ajaxError && ajaxError();
	            }
	        });
        },

		imgload : function(obj,callback){
			var i = obj.length;
			if(i){
				obj.load(function(i){
					if(!--i){callback && callback()}
				})	
			} else {
				callback && callback()
			}
		},

		// 弹层结果提示
		// 调用方法 $.HHL.dialogMask.dialogResult(obj);
		// obj.state: true 成功; false 失败
		// obj.text: 提示文字 非必填
		// obj.closeTime: 自动关闭时间
		dialogResult:function(obj){
			var _this = this;
			var text = obj.text?obj.text:obj.state? "提交成功":"提交失败",
				state = obj.state? "success":"faild",
				closeTime = obj.closeTime?obj.closeTime:"5000",
				callback = obj.callback,
				dialog_result = '<div id="dialog_result" class="borbox tc dialog_tip"><div class="icon_'+state+'"></div><p>'+text+'</p></div>';
			$("#dialog_result").remove();
			$("body").append(dialog_result);
			_this.dialog_setMaskShow("dialog_result");
			setTimeout(function(){
				_this.dialog_setMaskHide("dialog_result");
				callback && callback()
			},closeTime);
		},

		// 显示loading
		// 调用方法 $.HHL.dialogMask.loadingShow(text);
		// text为显示文字
        loadingShow : function(text){
			var _this = this,
				text = text || "请等待",
				dialog_loading = '<div id="dialog_loading" class="borbox tc loading"><div class="loadingImg"></div><p>'+text+'</p></div>';
			$("#dialog_loading").remove();
			$("body").append(dialog_loading);
			_this.dialog_setMaskShow("dialog_loading");
		},

		// 隐藏loading
		// 调用方法 $.HHL.dialogMask.loadingHide(callback);
		loadingHide : function(callback){
			var _this = this;
			setTimeout(function(){
				_this.dialog_setMaskHide("dialog_loading");
				callback && callback()
			},500);
		},

		// 显示遮罩层
		// 调用方法 $.HHL.dialogMask.show(id);id可选
		// id为显示的layer
	    show : function(id){
			var _this = this;
	    	if(!$("#dialogMask").length>0) {
	    		$("body").append("<div id='dialogMask' class='dialogMask'></div>");	
	    	}
			var $dialogMask = $("#dialogMask");
			$dialogMask.show();
			if(id) {
				setTimeout(function(){
					$("#"+id).show();
					_this.moveLay(id);
				});
				$(window).on("resize",function(){_this.moveLay(id);})
			}
	    },

		// 隐藏遮罩层
		// 调用方法 $.HHL.dialogMask.show(id);id可选
		// id为显示的layer
	    hide : function(id){
			$("#dialogMask").hide().remove();
			if(id) {$("#"+id).hide();}
	    },
	    moveLay : function(id){
	    	var marginleft = -($("#"+id).width()/2),
				marginheight = -($("#"+id).height()/2),
				top = ($(window).height())/2,
				left = ($(window).width())/2 + $(window).scrollLeft();
			$("#"+id).css({
				'position':"fixed",
				'margin-left': marginleft,
				'margin-top': marginheight,
				'top': top,
				'left': left,
				"z-index": 999999
			});
	    },

	    // 功能：加载图片
		// 调用方法：$.HHL.dialogMask.loadImg(pic,callback);
		// 参数：pic图片数组,callback回调事件
	    loadImg : function(picList,callback){
	        if (picList=="" || !(picList instanceof Array)) {
	            console.log("图片加载错误");
	            return false;
	        }
	        var index = 0, len = picList.length, img = new Image(),
	        load = function(){
	            img.src = picList[index];
	            img.onload = function() {
	              img.onload = null;
	                index ++ ;
	                if (index < len) {load();}else{
	                    callback && callback(json)
	                }
	            }
	            return img;
	        };
	        if(len > 0){load();}
	        return {
	            picList: picList,
	            load: load
	        };
	    }
	}
});

