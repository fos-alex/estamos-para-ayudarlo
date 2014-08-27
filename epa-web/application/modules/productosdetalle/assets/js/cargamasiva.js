$(document).ready(function()
{
	$("#fileuploader").uploadFile({
	url:"/admin/content/productosdetalle/uploadFile",
	allowedTypes:"xls",
	fileName:"productos"
	});
});