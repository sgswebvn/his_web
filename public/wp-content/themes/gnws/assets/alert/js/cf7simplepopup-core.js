document.addEventListener(
	'wpcf7submit',
	function (event) {
		if (event.detail.status == 'validation_failed') {
			Swal.fire('', event.detail.apiResponse.message, 'error');
		} else {
			Swal.fire({
				title: 'GỬI THÔNG TIN THÀNH CÔNG',
				text: 'Cảm ơn bạn đã tin tưởng Mistory! Chúng mình đã tiếp nhận thông tin và sẽ sớm liên hệ lại với bạn để hỗ trợ giải quyết vấn đề trong thời gian ngắn nhất.',
				icon: 'success',
			});
		}
	},
	false
);
