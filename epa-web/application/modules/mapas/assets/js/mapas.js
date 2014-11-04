
$(document).ready(function () {
    $('#map-container').canvasMap({
        url: "http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app",
        url_mapa: '/mapas/' + $('#id_sucursal').val()
    });
});