$(document).ready(function() {
	// 上传图片
	$('#file').unbind('change').bind('change', function() {
		event.stopPropagation();
		uploadFile('img');
		return;
	});
	// 头像图片
	var artImg;

	function uploadFile(type) {
		event.stopPropagation();
		let formData = new FormData();
		if (type == "img") {
			formData.append('file', $('#file')[0].files[0]);
		}
		$.ajax({
			url: './upload.html',
			type: 'POST',
			cache: false,
			data: formData,
			processData: false,
			dataType: "json",
			contentType: false
		}).done(function(res) {
			if (res.error == "0") {
				if (type == "img") {
					$('.uploadImg img').attr('src', res.result.path);
					$('#photo').val(res.result.path);
					return artImg = res.result.path;
				}
			} else {
				alert("上传失败！" + res.result.msg)
			}
		}).fail(function(res) {
			console.log("文件请求失败");
		});
	}
})
