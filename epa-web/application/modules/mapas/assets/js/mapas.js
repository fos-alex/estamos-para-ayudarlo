
$(document).ready(function () {
    $('#map-container').canvasMap({
        url: "http://local.epa-web.com/app",
        url_mapa: '/mapas/' + $('#id_sucursal').val()
    });
});