define(['jquery','dialog'],function($,dialog){
	$.gj={
		// 滚动条事件》。。。。。。。。。。。。。。。。。
		scrollbar:function(){
			$('.gj_list>ul').scrollTop(1);
			var isScroll1=$('.gj_list>ul').scrollTop();
			if (isScroll1) {
				$('.scroll_bar#s_bar_1>aside').css('opacity', '1');
				var h_li=$('.gj_list > ul>li').length*$('.gj_list > ul>li').height();
				var h_ul=$('.gj_list > ul').height();
				$('.scroll_bar#s_bar_1>aside').height((h_ul/h_li*h_ul-26));
				$('.gj_list > ul').scroll(function(event) {
					/* Act on the event */
					var top=$('.gj_list > ul').scrollTop();
					$('.scroll_bar#s_bar_1>aside').css('top', top);
				});
			}
			$('.ar_lists>ul').scrollTop(1);
			var isScroll2=$('.ar_lists>ul').scrollTop();
			if (isScroll2) {
				$('#s_bar_2>aside').css('opacity', '1');
				var h_par=$('.ar_lists').height();
				var h_ul=$('.ar_lists > ul>li').height()*$('.ar_lists > ul>li').length;
				// alert("h_par:"+h_par+"h_ul:"+h_ul)
				$('#s_bar_2>aside').height((h_par/h_ul*h_par-26));
				$('.ar_lists>ul').scroll(function(event) {
					/* Act on the event */
					var top=$('.ar_lists>ul').scrollTop();
					$('#s_bar_2>aside').css('top', top);
				});
			}
		},
		// 搜索框的显示与隐藏..........................
		v_search:function(){
			var text='';
			$('.icon_search').on('click', function(event) {
				event.preventDefault();
				text=$('.gj_b0>span').text();
				/* Act on the event */					
				$('.ss').css('display', 'inline-block').animate({"width":"100%","left":"0"}, 150);
				$('.gj_b0>span').text('搜索结果');
				$('.icon_delate').css('opacity', '1');
			});
			$('.icon_delate').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$('.ss').animate({"width":"0","left":"180px"}, 150,function(){
					$(this).css('display', 'none');
					$('.gj_b0>span').text(text);
					$('.icon_delate').css('opacity', '0');
				});
			});
		},
		// 显示批阅与未批阅的状态
		py:function(){
			console.log()
			$('.py0').each(function(index, el) {
				console.log('.py')
				if ($(this).attr('data-sts')==0) {
					$(this).addClass('no_py').next('.icon_eye').addClass('no_py');
				}else if ($(this).attr('data-sts')==1) {
					$(this).removeClass('no_py').next('.icon_eye').removeClass('no_py');
				}
			});
		},
		// 列表选中与鼠标经过的状态》。。。。。。。。。。。
		li_bg:function(){
			$('.py_lists,.py_month').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$(this).addClass('li_bg').siblings('li').removeClass('li_bg');
			});
			$('.py_lists,.py_month').hover(function() {
				$(this).css('background-color', '#fafafa');
			}, function() {
				$(this).css('background-color', 'white');
			});
		},
		// 初始化下拉树》。。。。。。。。。。。。
		tree_add_file:function(){
			// 新增稿件批阅树列表...............
			$('.expandable').children('ul').css('display', 'none');
			$('.hitarea').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				if ($(this).hasClass('expandable-hitarea')) {
					$(this).removeClass('expandable-hitarea').addClass('collapsable-hitarea').siblings('ul').css('display', 'block');
				}else{
					$(this).addClass('expandable-hitarea').removeClass('collapsable-hitarea').siblings('ul').css('display', 'none');
				}
			});
			$('.my_tree a').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				if (!$(this).parent('li').hasClass('expandable')) {
					$('.tar').removeClass('tar');
					$(this).addClass('tar');
					var msg="id:"+$(this).attr('id')+"    value:"+$(this).text();
					$(this).closest('.p_pop0').find('.ipt_partment1').val(msg);
				}
			});
			$('.icon_d').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				if ($(this).hasClass('a')) {
					$(this).closest('.p_pop0').find('.pop_tree').slideUp(200);
					$(this).removeClass('a');
				}else{
					$(this).closest('.p_pop0').find('.pop_tree').slideDown(200);
					$(this).addClass('a');
				}
			});
		},
		// 点击关闭让弹层消失.................
		de_pop:function(){
			$('.close_me,.btn_yes').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$('.p_pop0').css('display', 'none');
			});
		},
		// 弹出弹窗*2.....................
		pop_add:function(){
			// 弹出新增稿件批阅弹层.....................
			$('.icon_plus').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$('#pop_add').css('display', 'block');
				$('.pop_tree').slideUp(0);
			});
			//弹出上传文件弹窗.....................
			$('.upload').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$('#pop_upload').css('display', 'block');
				$('.pop_tree').slideUp(0);
			});
		},
		// 弹出进度条......................
		pro:function(){
			$('#pop_progress').css('display', 'block');
			$.gj.progressbar({
				parent_width:300,			//父元素的宽度默认500............
				width:"50%",             //上传进度百分数................
				callback:function(){
					var text='文件已上传'+ " " + "50%";
					$('.w_pr>span').text(text)
				}
			})
		},
		// 弹出成功弹层........................
		pop_s:function(){
			$('#pop_s0').css('display', 'block');
			function no(){
				$('#pop_s0').css('display', 'none');
			}
			setTimeout(no,2000);
		},
		// 弹出失败弹层................................
		pop_f:function(){
			$('#pop_f0').css('display', 'block');
			function no(){
				$('#pop_f0').css('display', 'none');
			}
			setTimeout(no,2000);
		},
		// 进度条动画................................
		progressbar:function(obj){
			var $w,$l1,$l2;
			$('#progressbar_halo>div').append('<img src="./img/liuguang.png">');
			$w=obj.parent_width || 500;
			$('div.ui-progressbar').width($w);
			$('.ui-progressbar-value').width(obj.width)
			$l1=$w+300;
			console.log($l1)
			$('div.ui-progressbar div.ui-progressbar-value>img').css('left', -$l1);
			function interval(){
				$('div.ui-progressbar div.ui-progressbar-value>img').stop().animate({"left":$l1},1800,function(){
					$(this).css('left', -$l1);
				});
			};
			interval();
			var set=setInterval(interval,2000);
			obj.callback() || '';
		},
		// 填充选择文件后的文件名.................................
		cho_file:function(){
			$('input[type="file"]').change(function(event) {
				/* Act on the event */
				$(this).siblings('input[type="text"]').val($(this).val())
			});
		},
		// 清空输入框......................
		null_put:function(){
			$('.icon_x').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				$(this).prev('input[type="text"]').val('')
			});
		},
		// 初始化组件.............................
		init:function(){
			$.gj.scrollbar();       // 滚动条事件》。。。。。。。。。。。。。。。。。
			$.gj.v_search();        // 搜索框的显示与隐藏..........................
			$.gj.py();              // 显示批阅与未批阅的状态
			$.gj.li_bg();           // 列表选中与鼠标经过的状态。。。。。。。。。。。
			$.gj.tree_add_file();   // 初始化下拉树》。。。。。。。。。。。。
			$.gj.null_put();
			$.gj.cho_file();        // 填充选择文件后的文件名.................................
			$.gj.de_pop();          // 点击关闭或提交让弹层消失.................
			$.gj.pop_add();         // 弹出 新增稿件批阅弹层 || 弹出上传文件弹窗 绑定事件.....................
			//$.gj.pro();           // 弹出 进度条......................
			//$.gj.pop_f();           // 弹出 失败弹层................................
			//$.gj.pop_s();           // 弹出 成功弹层................................
		}
	}
	$.gj.init();
})