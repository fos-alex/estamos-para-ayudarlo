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
        var that = this;
        $('body').css({
            margin: '0px',
            padding: '0px'
        });

        element.append(
            '<div id="main-map-container" class="container-fluid">' +
                '<div class="row-fluid">' +
                    '<div id="internal-map-container" class="span10" style="border: 1px solid grey;" onmousedown="return false;"></div>' +
                '</div>' +
            '</div>'
        );

        this.loadMap(function () {
            // Position user at exit
            var entrancePosition = canvas.stage.find('.exit')[0].getPosition();
            // Adjust position to entrance's center
            entrancePosition.x -= 10;
            entrancePosition.y += 30;
            that.positionUser(entrancePosition);
        });
    };

    $.fn.canvasMap.removeElement = function () {
        var element = canvas.selectedElement;
        element.remove();
        canvas.stage.draw();

    };

    $.fn.canvasMap.createId = function (length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length? length: 6;
        for ( var i=0; i < length; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    $.fn.canvasMap.loadMap = function (callback){
        var that = this;
        $.getJSON(opts.url + opts.url_mapa, function (response) {
            // Check if response empty
            if (!response.data || Object.keys(response.data).length === 0) {
                alert('La sucursal no tiene mapa.');
                return that.newMap();
            }
            var mapa = response.data.mapaJSON;
            canvas.objects = response.data.objects;
            canvas.stage = Kinetic.Node.create(mapa, 'internal-map-container');
            canvas.stage.draw();
            canvas.layer = canvas.stage.getLayers()[0];
            that.loadImages(canvas.layer);
            callback();
        });
    };

    $.fn.canvasMap.loadImages = function(layer){
        var stage = layer.getStage();
        var that = this;
        var images = stage.find('.image');
        $.each(images, function () {
            that.createImage(stage, this);
        });
        stage.draw();
    };

    $.fn.canvasMap.createImage = function(stage, image){
        var url = canvas.objects.images[image.getId()]['url'];
        var oImage = new Image();
        oImage.onload = function () {
            image.image(oImage);
            stage.draw();
        };
        oImage.src = url;
    };


    $.fn.canvasMap.adaptToMobile = function (){


    };

    $.fn.canvasMap.removeShape = function (selector, options){
        var defaultOptions = {
            multiple: false
        }
        options = $.extend(defaultOptions, options);

        var shape = canvas.stage.find(selector);
        if (!options.multiple && shape.length > 1) {
            console.log("Trying to delete multiple items with multiple:false. Only first one deleted.");
            shape = [shape[0]];
        }

        $.each(shape, function() {
            var id = this.getId();
            if (id) {
                for (var collection in canvas.objects) {
                    if (collection[id]) {
                        delete collection[id];
                    }
                }
            }
            shape.remove();
        });
    };

    $.fn.canvasMap.getUserShape = function(position){
        var newGroup = new Kinetic.Group({
            x: 0,
            y: 0,
            id: this.createId(),
            name: 'userGroup'
        });

        var user = new Kinetic.Circle({
            x: position.x,
            y: position.y,
            stroke: '#B8D2FF',
            fill: '#145fd7',
            strokeWidth: 2,
            radius: 10,
            name: 'user'
        });

        return newGroup.add(user);
    };

    $.fn.canvasMap.drawRoute = function(positions){
        var newGroup = new Kinetic.Group({
            x: 0,
            y: 0,
            id: this.createId(),
            name: 'route'
        });

        $.each(positions, function (ix, position) {
            debugger;
            if (typeof positions[ix + 1] === 'undefined') {
                return;
            }
            var o = position;
            var d = positions[ix + 1];
            var path = new Kinetic.Path({
                x: o.x,
                y: o.y,
                data: 'M'+o.x+' '+o.y+',L'+d.x+' '+o.y,
                fill: 'green'
            });

            newGroup.add(path);
        });
        canvas.layer.add(newGroup);
        canvas.stage.draw();
    };


    $.fn.canvasMap.positionUser = function(position) {
        this.removeShape('.user');
        var user = this.getUserShape(position);
        canvas.layer.add(user);
        canvas.stage.draw();
        this.drawRoute([{x:100, y:100},{x:200, y:200}, {x:300, y:300}]);
    };

}( jQuery ));