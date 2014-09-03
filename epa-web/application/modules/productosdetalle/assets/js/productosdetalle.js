$(document).ready(function()
{
	if( $("#fileuploader").length > 0 ){
		$("#fileuploader").uploadFile({
			url:"/admin/content/productosdetalle/uploadFile",
			allowedTypes:"xls",
			fileName:"productos",
			dragDropStr: "<span><b>Arrojar los archivos</b></span>",
			abortStr:"Detener",
			cancelStr:"Cancelar",
			doneStr:"Listo",
			multiDragErrorStr: "Error Multi Drag.",
			extErrorStr:"Error en la carga:",
			sizeErrorStr:"Error en el tamaño:",
			uploadErrorStr:"Error en la subida",
			uploadStr:"Examinar",
			onSubmit:function(files){

			},
			onSuccess:function(files,data,xhr){
				var objResponse = $.parseJSON(data);
				if(objResponse.CORRECTOS>0){
					var divmsj = $('<div class="alert alert-block alert-success fade in"><a class="close" data-dismiss="alert">&times;</a></div>');
					divmsj.append('<h4 class="alert-heading">'+objResponse.CORRECTOS+' Productos se cargaron con exito</h4>');
					$('.div-carga').append(divmsj);
				}
				if(objResponse.FALLIDOS>0){
					var divmsj = $('<div class="alert alert-block alert-error fade in"><a class="close" data-dismiss="alert">&times;</a></div>');
					divmsj.append('<h4 class="alert-heading">'+objResponse.FALLIDOS+' Productos fallaron </h4>Por favor revisar que respeten el modelo de planilla.');
					$('.div-carga').append(divmsj);
				}
				
			}

		});
	}
});