(function ( $ ) {
    var canvas = {
        objects: {
            products: {},
            shells: {},
            routes: []
        },
        stage: {},
        layer: {}
    },
        categorias = null,
        opts = {};


    $.fn.canvasMap = function (options, callback) {
        opts = $.fn.canvasMap.options = $.extend( {}, $.fn.canvasMap.defaults, options );

        this.each(function() {
            $.fn.canvasMap.init($(this), callback);
        });
    };

    $.fn.canvasMap.defaults = {
        url: 'http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app'
    };

    $.fn.canvasMap.init = function (element, callback) {
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

        this.loadMap(callback);
    };

    $.fn.canvasMap.createRoute = function(categories, position, options) {
        var defaultOptions = {
            finishInExit:    true
        }
        options = $.extend(defaultOptions, options);


        if (!position || position === "entrance") {
            // Position user at entrance by default
            position = canvas.stage.find('.entrance')[0].getPosition();
            // Adjust position to entrance's center
            position.x -= 10;
            position.y += 30;
        } else if (position  && !(position.x && position.y)) {
            position = $.fn.canvasMap.getCoords(position);
            if (!position || !position.x || !position.y) {
                return false;
            }
        }

        var finalPosition;
        if (options.finishInExit) {
            finalPosition = canvas.stage.find('.exit')[0].getPosition();
            // Adjust position to exit's center
            finalPosition.x -= 10;
            finalPosition.y += 30;
        }

        return $.fn.canvasMap.drawPathFromCategories(categories, position, finalPosition);
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
            canvas.objects = $.extend(canvas.objects, response.data.objects);
            canvas.stage = Kinetic.Node.create(mapa, 'internal-map-container');
            canvas.stage.draw();
            canvas.layer = canvas.stage.getLayers()[0];
            that.loadImages(canvas.layer);
            if (callback) {
                callback();
            }
        });
    };

    $.fn.canvasMap.loadImages = function(layer){
        var stage = layer.getStage();
        var that = this;
        var images = stage.find('Image');
        $.each(images, function () {
            that.createImage(stage, this);
        });
        stage.draw();
    };

    $.fn.canvasMap.createImage = function(stage, image){
        var url = canvas.objects.images[image.getId()]['url'];
        var splittedUrl = url.split("/");
        var imageName = splittedUrl[splittedUrl.length - 1];
        imageName = "./img/" + imageName;

        var oImage = new Image();
        oImage.onload = function () {
            image.image(oImage);
            stage.draw();
        };
        oImage.src = imageName;
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
        var routes = [],
            maxTries = 5;

        $.each(positions, function (ix, position) {
            if (!positions[ix + 1]) {
                return;
            }
            var lastRoute = {
                finished: false
            };
            routes[ix] = [];
            while (!lastRoute.finished && routes[ix].length < maxTries) {
                var options = {
                    routeName:  "route" + ix + "-" + position.x + position.y + positions[ix + 1].x + positions[ix + 1].y,
                    startDirection: routes[ix].length % 2? "x" : "y",
                    preferTurn: [routes[ix].length % 4 >= 2? "up" : "down"]
                };
                if (routes[ix].length == 0) {
                    options.preferTurn = [];
                }
                lastRoute = $.fn.canvasMap.findRoute(position, positions[ix + 1], options);
                routes[ix].push(lastRoute);
            }
            canvas.objects.routes.push(lastRoute);
            $.fn.canvasMap.drawRouteInLines(lastRoute);
            positions[ix + 1] = lastRoute.finalPosition;
        });
    };

    $.fn.canvasMap.drawRouteInLines = function (route) {
        var linePoints = [],
            that = this;
        $.each(route.path, function (ix, el) {
            var prevEl = route[ix - 1];
            var nextEl = route[ix + 1];
            if (!prevEl || !nextEl || el.y === prevEl.y && el.y !== nextEl.y || el.x === prevEl.x && el.x !== nextEl.x ) {
              linePoints.push(el);
            }
        });
        $.each(linePoints, function (ix) {
            var prevPoint = linePoints[ix - 1];
            if (!prevPoint) {
                return;
            }
            canvas.layer.add(new Kinetic.Line({
                points: [prevPoint.x, prevPoint.y, this.x, this.y],
                stroke: 'red',
                strokeWidth: 10,
                lineCap: 'round',
                lineJoin: 'round',
                id: that.createId(),
                name: route.routeName
            }));
        });
        canvas.stage.draw();
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
            radius: 4,
            name:  "mark"
        };
        options = $.extend(defaultOptions, options);

        var user = new Kinetic.Circle({
            x: position.x,
            y: position.y,
            stroke: '#B8D2FF',
            fill: options.color,
            strokeWidth: 1,
            radius: options.radius,
            name: options.name
        });
        canvas.layer.add(user);
        return canvas.stage.draw();
    };

    $.fn.canvasMap.deleteRoute = function (name) {
        this.removeShape('.' + name, {multiple: true});
        return canvas.stage.draw();
    };

    $.fn.canvasMap.findRoute = function (origin, dest, options) {
        var defaultOptions = {
            routeName:           "routeName",
            startDirection: "x",
            preferTurn:     [],
            step: 25
        };
        options = $.extend(defaultOptions, options);

        var step = options.step,
            loopCounter = 0,
            position = $.extend(true, {}, origin),
            axis = options.startDirection,
            forceMoveUp = false,
            forceMoveDown = false,
            path = [],
            pathLength = 0;
        //$.fn.canvasMap.markPoint(origin, {color:"red", radius: 6, name: options.routeName});
        $.fn.canvasMap.markPoint(dest, {color:"red", radius: 6, name: options.routeName});
        while (!$.fn.canvasMap.hasArrivedToPosition (position, dest) &&
                (position.x != dest.x || position.y != dest.y)
        ) {
            ++loopCounter;
            //$.fn.canvasMap.markPoint(position, {name: options.routeName});
            path.push($.extend(true, {}, position));
            if (!forceMoveUp && (dest[axis] > position[axis] && Math.abs(dest[axis] - position[axis]) >= step  || forceMoveDown)) {
                //debugger;
                // Going forwards
                if (step < 0) {
                    step = -step;
                }
                position[axis] += step;
                pathLength += Math.abs(step);
                if (forceMoveDown) {
                    var tmpposition = $.extend(true, {}, position);
                    tmpposition[$.fn.canvasMap.switchAxis(forceMoveDown)] += step * 2;
                    if (!$.fn.canvasMap.shapeInPoint(tmpposition)) {
                        forceMoveDown = false;
                        axis = $.fn.canvasMap.switchAxis(axis);
                    }
                }

            } else if (!forceMoveDown && (dest[axis] < position[axis] && Math.abs(dest[axis] - position[axis]) >= step || forceMoveUp)) {
                //debugger;
                // Going backwards
                if (step > 0) {
                    step = -step;
                }
                position[axis] += step;
                pathLength += Math.abs(step);
                if (forceMoveUp) {
                    var tmpposition = $.extend(true, {}, position);
                    tmpposition[$.fn.canvasMap.switchAxis(forceMoveUp)] += step  * 2;
                    if (!$.fn.canvasMap.shapeInPoint(tmpposition)) {
                        forceMoveUp = false;
                        axis = $.fn.canvasMap.switchAxis(axis);
                    }
                }
            } else {
                //debugger;
                if (Math.abs(dest[axis] - position[axis]) >= step) {
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

            if ($.fn.canvasMap.shapeInPoint(position) && !$.fn.canvasMap.hasArrivedToPosition(position, dest) || position[axis] <= 0) {
                //debugger;
                position[axis] -= step * 2;
                pathLength -= Math.abs(step * 2);
                path.pop();
                axis = $.fn.canvasMap.switchAxis(axis);
                if (options.preferTurn.length > 0) {
                    var turn = options.preferTurn.pop();
                    if (turn === "up") {
                        forceMoveUp = axis;
                    } else {
                        forceMoveDown = axis;
                    }
                }

            }
            if (loopCounter > 60) {
                console.log("break!!!");
                break;
            }
        }
        return {
            routeName:      options.routeName,
            origin:         origin,
            destination:    dest,
            finalPosition:  position,
            path:           path,
            pathLength:     pathLength,
            finished:       $.fn.canvasMap.hasArrivedToPosition(position, dest)
        };
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
        return false;
    };

    $.fn.canvasMap.switchAxis = function (axis) {
        if (axis == "x") {
            return "y";
        }
        return "x";
    };


    $.fn.canvasMap.orderRoutes = function (positions) {
        // Asumme first position is starting point
        var orderedArray = positions.splice(0,1);
        var pivot = orderedArray[0];
        $.each(positions, function () {
            var bestDistanceToPivot = 99999,
                nextPositionIndex = null;
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
            var shell = canvas.layer.find('#'+this.id);
            if (!shell || !shell.length > 0) {
                return;
            }
            shell = shell[0].parent.children[0];
            var shellPos = shell.getAbsolutePosition();
            coords = {
                x: shellPos.x + shell.getWidth() / 2,
                y: shellPos.y + shell.getHeight() / 2
            };
        });
        return coords;
    };

    $.fn.canvasMap.getAllCoords = function (shells) {
        // Get position of different categories in an array
        var that = this;
        var response = [];
        $.each(shells, function() {
            if (!(this instanceof String)) { 
                return;
            }
            if ($.inArray(this, shells)) {
                return;
            }
            response.push(that.getCoords(this));
        });
        return response;
    };

    $.fn.canvasMap.positionUser = function(position) {
        // Delete existing user shape and create new one in position
        this.removeShape('.user');
        var user = this.getUserShape(position);
        canvas.layer.add(user);
        canvas.stage.draw();
    };

    $.fn.canvasMap.deleteExistingRoutes = function (routes) {
        if (!routes) {
            routes = canvas.objects.routes;
        }
        // Iterate through routes and delete each one
        if (routes.length > 0) {
            $.each(routes, function () {
                $.fn.canvasMap.deleteRoute(this.routeName);
            });
            routes = [];
        }
    };

    $.fn.canvasMap.drawPathFromCategories = function(categories, initialPosition, finalPosition) {
        // Delete existing routes if any
        $.fn.canvasMap.deleteExistingRoutes();

        // Move user to position
        $.fn.canvasMap.positionUser(initialPosition);

        if (!categories || categories.length === 0) {
            return false;
        }
        // Dedupe categories
        categories = $.unique(categories);
        // Get categories coordinates and sort them
        var coords = this.getAllCoords(categories);
        // Order routes
        coords = this.orderRoutes(coords);
        // Add initial position
        var routePoints = [initialPosition].concat(coords);
        // Add final position
        routePoints.push(finalPosition);
        // Draw route to different coordinates
        this.drawRoute(routePoints);
    };

}( jQuery ));