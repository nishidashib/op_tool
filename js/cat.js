function select(){
	$.getJSON('./modules/dirSearch.php', null, function(data, textStatus) {
		for(var i in data){
		$('select').append("<option value='" + data[i].name + "'>" + data[i].name + "</option>")
		}
	});
}
$(function(){
	$('select').change(function() {
		var loading = $("<div id='loading_window'></div>");
		$("body").append(loading);
		$(loading).css({"display":"block",opacity:0}).fadeTo(100,0.95);
		$(loading).html('<img id="loading" src=./img/loading.gif>')
		$("option[value = 'select']").remove();
		var server = $('select option:selected').text();
			$.ajax({
				url: './modules/dir_tree.php',
	    		type: 'POST',
	    		datatype: 'html',
	    		data:{"server_name": server},
	    		cache: false,
			})
			.done(function(data,datatype) {
				//alert(data);
				$(loading).remove();
				// console.log(server);
	    		$('#dir_tree').remove();
	    		$('select').after($(data));
			})
			.fail(function(errorThrown) {
				alert(errorThrown.message);
			})
			.always(function(data) {
	        	$("span.dir").css("cursor", "pointer").prepend("+ ").click(function() {
					$(this).next().toggle("fast");
					var v = $(this).text().substring( 0, 1 );
					if ( v == "+" )
						$(this).text( "-" + $(this).text().substring( 1 ) );
					else if ( v == "-" )
						$(this).text( "+" + $(this).text().substring( 1 ) );
				}).next().hide();

    			$("#dir_tree a, #dir_tree span.dir").hover(
		    		function() {
		        		$(this).css("font-weight", "bold");
		    		},
		    		function() {
		        		$(this).css("font-weight", "normal");
		    		}
    			);
			});
	});
	$(document).on('click', "a[rel=leanModal]",function(e) {
		$('body').css({"overflow": "hidden"});
		e.preventDefault();
		//alert($(this).attr('name'));//ファイルをフルパスで表示する。
		$.ajax({
			url: './modules/show_source.php',
			type: 'POST',
    		cache : false,
			data: {'source': $(this).attr("name")},
			datatype: 'html',
		})
		.done(function(data,datatype) {
			/*
			ajaxで取得してきた要素に対して、leanmodalを使用できなかったため、
			元からある隠しリンクを踏ませるように設定。
			*/
			$('#modal-source-hiddenLink').trigger("click");
			$('#modal_insert').html(data);

			return false;
		})
		.fail(function(errorThrown) {
	        alert(errorThrown.message);
		})
		.always(function() {
			//console.log("complete");
		});
	});
	$('#modal-source-hiddenLink').leanModal({
	    top: 10,
	    overlay : 0.95,
	    closeButton: ".modal_close"
	  });
});
