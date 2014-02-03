(function() {
	"use strict";

	jQuery('document').ready(function() {
		var initialized = false, active = false, designer = null, editor, style, editing;
		
		$(window).on('action:connected', function() {
			if (app.isAdmin && !initialized) {
				initialized = true;	

				$('body').on('contextmenu', function(ev) {
					if (active) {
						var parents = $(ev.target).parents(),
							nodelist = [];

						for (var p in parents) {
							if (parents.hasOwnProperty(p)) {
								var id, className, type;

								if (id = parents[p].id) {
									nodelist.push("#" + id);
								} else if (className = parents[p].className) {
									nodelist.push("." + className.replace(/ /g,  '.'));
								} else if (parents[p].nodeName) {
									nodelist.push(parents[p].nodeName);
								}
							}

							if (parents[p].nodeName === 'HTML') break;
						}

						nodelist = nodelist.reverse().join(' ');
						editing = nodelist;

						editor.getSession().setValue(editing + ' {\n\n}');

						ev.preventDefault();
					}
				});

				$('body').append('<div class="designer"><div id="editor"></div><i class="fa fa-pencil-square fa-2x"></i></div>');
				$('head').append('<style type="text/css" id="designer-style"></style>')

				style = $('#designer-style');
				designer = $('.designer i').on('click', function() {
					active = $(this).parent().toggleClass('active').hasClass('active');
				});

				editor = ace.edit("editor");
			    editor.setTheme("ace/theme/monokai");
			    editor.getSession().setMode("ace/mode/css");

			    editor.getSession().on('change', function(){
			    	var regex = new RegExp(editing + "[\\s\\S]*?}", 'gi'),
			    		html = style.html();

			    	if (html.match(regex)) {
			    		console.log('replacing');
			    		//style.html(html + '\n' + editor.getValue());
			    		style.html(html.replace(regex, editor.getValue()));
			    		console.log(style.html());
			    	} else {
			    		console.log('creating');
			    		style.html(html + '\n' + editor.getValue());
			    	}
					
				});
			}
		});
	});
}());