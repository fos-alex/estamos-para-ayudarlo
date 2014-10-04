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
        var that = this;
        var points = [];

        positions = this.orderRoutes(positions);
        $.each(positions, function (ix, position) {
            if (!positions[ix + 1]) {
                return;
            }

            $.fn.canvasMap.findRoute(position, positions[ix + 1]);

            //points.push(position.x);
            //points.push(position.y);
        });
        /*var line = new Kinetic.Line({
            points: points,
            stroke: 'red',
            strokeWidth: 10,
            lineCap: 'round',
            lineJoin: 'round',
            id: that.createId(),
            name: 'route'
        });
        canvas.layer.add(line);
        canvas.stage.draw();*/
    };

    $.fn.canvasMap.shapeInPoint = function (point) {
        var shapeInPoint = false;
        $.each(canvas.stage.find('.shape'), function () {
            if (this.intersects(point)) {
                shapeInPoint = true;
            }
        });
        return shapeInPoint;
    };

    $.fn.canvasMap.markPoint = function (position, options) {
        var defaultOptions = {
            color: '#145fd7',
            radius: 4
        }
        options = $.extend(defaultOptions, options);

        var user = new Kinetic.Circle({
            x: position.x,
            y: position.y,
            stroke: '#B8D2FF',
            fill: options.color,
            strokeWidth: 1,
            radius: options.radius,
            name: 'mark'
        });
        canvas.layer.add(user);
        return canvas.stage.draw();
    };

    $.fn.canvasMap.findRoute = function (origin, dest) {
        var step = 15;
        var loopCounter = 0;
        var position = origin;
        var lastPosition = null;
        var axis = "x";
        var forceMoveUp = false,
            forceMoveDown = false;
        var path = [];
        console.log("Origin");
        console.log(origin);
        $.fn.canvasMap.markPoint(origin, {color:"red", radius: 6});
        console.log("Destination");
        console.log(dest);
        $.fn.canvasMap.markPoint(dest, {color:"red", radius: 6});
        while (!$.fn.canvasMap.hasArrivedToPosition (position, dest) &&
                (position.x != dest.x || position.y != dest.y)) {
            ++loopCounter;
            $.fn.canvasMap.markPoint(position);
            path.push($.extend(true, {}, position));
            if (dest[axis] > origin[axis] && (dest[axis] - origin[axis]) > step  && !forceMoveUp || forceMoveDown && !forceMoveUp) {
                debugger;
                // Going forwards
                if (step < 0) {
                    step = -step;
                }
                position[axis] += step;
                if (forceMoveDown) {
                    var tmpposition = $.extend(true, {}, position);
                    tmpposition[$.fn.canvasMap.switchAxis(forceMoveDown)] += step;
                    if (!$.fn.canvasMap.shapeInPoint(tmpposition)) {
                        forceMoveDown = false;
                        axis = $.fn.canvasMap.switchAxis(axis);
                    }
                }

            } else if (dest[axis] < origin[axis] && (origin[axis] - dest[axis]) > step && !forceMoveDown || forceMoveUp && !forceMoveDown) {
                debugger;
                // Going backwards
                if (step > 0) {
                    step = -step;
                }
                position[axis] += step;
                if (forceMoveUp) {
                    var tmpposition = $.extend(true, {}, position);
                    tmpposition[$.fn.canvasMap.switchAxis(forceMoveUp)] += step;
                    if (!$.fn.canvasMap.shapeInPoint(tmpposition)) {
                        forceMoveUp = false;
                        axis = $.fn.canvasMap.switchAxis(axis);
                    }
                }
            } else {
                debugger;
                if (dest[axis] != position[axis]) {
                    if (dest[axis] < origin[axis]) {
                        forceMoveUp = axis;
                    } else {
                        forceMoveDown = axis;
                    }
                } else {
                    axis = $.fn.canvasMap.switchAxis(axis);
                }
                continue;
            }

            if ($.fn.canvasMap.shapeInPoint(position) || position[axis] <= 0) {
                debugger;
                path.push($.extend(true, {}, position));
                position[axis] -= step;
                axis = $.fn.canvasMap.switchAxis(axis);
            }

            console.log(position);
            if (loopCounter > 300) {
                console.log("break!!!");
                break;
            }
        }
        $.fn.canvasMap.markPoint(position);
        debugger;
    };

    $.fn.canvasMap.hasArrivedToPosition = function (position, dest) {
        var minArriveDistance = {
            x: 80,
            y: 60
        };

        if (Math.abs(position.x - dest.x) < minArriveDistance.x
            && Math.abs(position.y - dest.y) < minArriveDistance.y) {
            console.log("Llegó!");
            console.log("Posición:");
            console.log(position);
            console.log("Destino:");
            console.log(dest);
            return true;
        }
    };

    $.fn.canvasMap.switchAxis = function (axis) {
        if (axis == "x") {
            return "y";
        }
        return "x";
    };


    $.fn.canvasMap.orderRoutes = function(positions){
        // Asumme first position is starting point
        var orderedArray = positions.splice(0,1);
        var pivot = orderedArray[0];
        $.each(positions, function () {
            var bestDistanceToPivot = 99999;
            var nextPositionIndex = null;
            $.each(positions, function (ix) {
                if (this.x === pivot.x && this.y === pivot.y) {
                    return;
                }
                var distance = Math.sqrt(Math.pow(pivot.x - this.x, 2) + Math.pow(pivot.y - this.y, 2));
                if (distance < bestDistanceToPivot) {
                    bestDistanceToPivot = distance;
                    nextPositionIndex = ix;
                }
            });
            var nextElement = positions[nextPositionIndex];
            delete positions[nextPositionIndex];
            orderedArray.push(nextElement);
            pivot = nextElement;
        });
        return orderedArray;
    };

    $.fn.canvasMap.getCoords = function (name) {
        var coords = null;
        $.each(canvas.objects.shells, function () {
            if (!this.categoria || this.categoria.nombre != name) {
                return;
            }
            var shell = canvas.layer.find('#'+this.id)[0].parent.children[0];
            var shellPos = shell.getAbsolutePosition();
            coords = {
                x: shellPos.x + shell.getWidth() / 2,
                y: shellPos.y + shell.getHeight() / 2
            };

            debugger;
        });
        return coords;
    };

    $.fn.canvasMap.getAllCoords = function (shells) {
        var that = this;
        var response = [];
        $.each(shells, function() {
            response.push(that.getCoords(this));
        });
        return response;
    };

    $.fn.canvasMap.positionUser = function(position) {
        this.removeShape('.user');
        var user = this.getUserShape(position);
        canvas.layer.add(user);
        canvas.stage.draw();
        var coords = this.getAllCoords(['Carniceria', 'Enlatados']);
        var routePoints = [position].concat(coords);
        this.drawRoute(routePoints);
    };

}( jQuery ));