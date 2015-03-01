$(document).on('click', ".dropdown" ,function(e){
    $(this).next().slideToggle();
    $(this).toggleClass("active");
})

$(document).on('click', "a[rel=login-func]" ,function(e){
		url = $(this).attr("href");
		e.preventDefault();
		$.ajax({
			url: './modules/session.php'
		})
		.done(function(data) {
			e.preventDefault();
			if(data == 1){
				window.location.href = url;
			}else{
				//隠しリンクを踏む。
				$("#modal-login-hiddenLink").trigger("click").leanModal({
					overlay:0.5
				});;
			}
		})
		.fail(function(errorThrown) {
			alert(errorThrown);
		})
	}
)
/*
loginボタンを押した後の挙動。
*/
$(document).on('click', ".button-panel" ,function(e){
	e.preventDefault();
	$.ajax({
		url: './modules/login_nomysql.php',
		type: 'POST',
		data: { "userid" : $('#userid').val(), "password": $('#password').val() }
	})
	.done(function(data) {
		if(data == 1){
			window.location.href = url;
		}else{
			$('#modal-login').effect("shake");
		}
	})
	.fail(function(errorThrown) {
		alert(errorThrown);
	})
})

function side(){
	$.ajax({
		url: 'side.html',
		type: 'GET',
		dataType: 'html',
	})
	.done(function(data) {
		$('#contents').append(data);
	})
	.fail(function(data) {
		alert(error.messeage);
	})
}
