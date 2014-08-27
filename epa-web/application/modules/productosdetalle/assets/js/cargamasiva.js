$(document).ready(function()
{
	$("#fileuploader").uploadFile({
	url:"/admin/content/productosdetalle/uploadFile",
	fileName:"myfile"
	});
});