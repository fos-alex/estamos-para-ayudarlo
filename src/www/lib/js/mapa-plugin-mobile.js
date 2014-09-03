(function ( $ ) {
    var canvas = {
        objects: {
            products: {},
            shells: {}
        },
        stage: {},
        layer: {}
    },
        categorias = null,
        opts = {};


    $.fn.canvasMap = function (options) {
        opts = $.fn.canvasMap.options = $.extend( {}, $.fn.canvasMap.defaults, options );

        return this.each(function() {
            $.fn.canvasMap.init($(this));
        });
    };

    $.fn.canvasMap.defaults = {
        url: 'http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app'
    };

    $.fn.canvasMap.init = function (element) {
        $('body').css({
            margin: '0px',
            padding: '0px'
        });

        element.append(
            '<div id="main-map-container" class="container-fluid">' +
                '<div class="row-fluid">' +
                    '<div id="internal-map-container" class="span10" style="overflow:scroll; border: 1px solid grey;" onmousedown="return false;"></div>' +
                '</div>' +
            '</div>'
        );

        this.loadMap();
    }

    $.fn.canvasMap.removeElement = function () {
        var element = canvas.selectedElement;
        element.remove();
        canvas.stage.draw();

    }

    $.fn.canvasMap.loadMap = function (){
        var that = this;
        $.getJSON(opts.url + opts.url_mapa, function (response) {
            // Check if response empty
            if (!response.data || Object.keys(response.data).length === 0) {
                alert('La sucursal no tiene mapa.');
                return that.newMap();
            }
            var mapa;
            if (mapa = response.data.mapaJSON) {
                canvas.objects = response.data.objects;
                canvas.stage = Kinetic.Node.create(mapa, 'internal-map-container');
                canvas.stage.draw();
                canvas.layer = canvas.stage.getLayers()[0];
                that.addBehaviour(canvas.layer);
            } else {
                that.newMap();
            }
        });
    }
}( jQuery ));