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
            '<div id="container" onmousedown="return false;" style="display: inline-block; float:left;"></div>'
        );

        element.append(
            '<div id="view-panel" class="main-panel-container" style="float: right; width:20%; text-align: center; display:inline-block;">' +
                '<div class="panel-header">' +
                '<h2>Descripción de Elemento</h2>' +
                '</div>' +
                '<div class="panel-body" style="text-align: left;">' +
                '<div class="element-name-container">' +
                    '<span>Elemento: </span>' +
                    '&nbsp;' +
                    '<span class="element-name"></span>' +
                '</div>' +
                '<div class="element-description-container">' +
                    '<span>Descripción: </span>' +
                    '&nbsp;' +
                    '<span class="element-description"></span>' +
                '</div>' +
                '<div class="element-delete-container">' +
                    '<button id="map-element-delete-button">Borrar</button>' +
                '</div>' +
            '</div>'
        );

        element.append(
            '<div id="controlers" style="clear:both;">' +
                '<button id="map-new-button" >Nuevo Mapa</button>' +
                '<button id="map-save-button" >Guardar Mapa</button>' +
                '<button id="map-add-rect-button" >Agregar Góndola</button>' +
                '<button id="map-add-exit-button" >Agregar Entrada/Salida</button>' +
                '<select id="map-categorias-select"></select>' +
            '</div>'
        );

        $('#map-new-button').click(this.newMap.bind(this));
        $('#map-save-button').click(this.save.bind(this));
        $('#map-add-rect-button').click(this.addRect.bind(this));
        $('#map-add-exit-button').click(this.addExit.bind(this));
        $('#map-element-delete-button').click(this.removeElement.bind(this));

        $.getJSON(opts.url + '/categorias', function (response) {
            var options = $("#map-categorias-select");
            categorias = response.data;
            $.each(categorias, function(ix, el) {
                options.append($("<option />").val(ix).text(el.nombre));
            });
        });

        this.loadMap();

    }

    $.fn.canvasMap.removeElement = function () {
        var element = canvas.selectedElement;
        element.remove();
        canvas.stage.draw();

    }

    $.fn.canvasMap.save = function () {
        // save stage as a json string
        var mapa = {
            mapaJSON: canvas.stage.toJSON(),
            objects: canvas.objects
        };

        $.ajax({
            url: 'http://ec2-54-187-58-168.us-west-2.compute.amazonaws.com/app/mapas/1',
            type: 'PUT',
            data: JSON.stringify(mapa),
            success: function (response) {
                if (response.codigo == 0) {
                    alert("El mapa se guardó satisfactoriamente.");
                }
            }
        });
    }

    $.fn.canvasMap.loadMap = function (){
        var that = this;
        $.getJSON(opts.url + '/mapas/1', function (response) {
            if (!response.data) {
                alert('La sucursal no tiene mapa.');
                return that.newMap();
            }
            var mapa;
            if (mapa = response.data.mapaJSON) {
                canvas.objects = response.data.objects;
                canvas.stage = Kinetic.Node.create(mapa, 'container');
                canvas.stage.draw();
                canvas.layer = canvas.stage.getLayers()[0];
                that.addBehaviour(canvas.layer);
            } else {
                that.newMap();
            }
        });
    }

    $.fn.canvasMap.newMap = function (){
        canvas = {
            objects: {
                products: {},
                shells: {}
            },
            stage: {},
            layer: {}
        };

        canvas.stage = new Kinetic.Stage({
            container: 'container',
            width: 1000,
            height: 550
        });

        canvas.layer = new Kinetic.Layer();
        canvas.stage.add(canvas.layer);
    }

    $.fn.canvasMap.createId = function (length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length? length: 6;

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $.fn.canvasMap.update = function(activeAnchor){
        var group = activeAnchor.getParent();

        var topLeft = group.find('.topLeft')[0];
        var topRight = group.find('.topRight')[0];
        var bottomRight = group.find('.bottomRight')[0];
        var bottomLeft = group.find('.bottomLeft')[0];
        var shape = group.find('.shape')[0];

        var anchorX = activeAnchor.x();
        var anchorY = activeAnchor.y();

        // update anchor positions
        switch (activeAnchor.name()) {
            case 'topLeft':
                topRight.y(anchorY);
                bottomLeft.x(anchorX);
                break;
            case 'topRight':
                topLeft.y(anchorY);
                bottomRight.x(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.y(anchorY);
                topRight.x(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.y(anchorY);
                topLeft.x(anchorX);
                break;
        }

        shape.setPosition(topLeft.getPosition());

        var width = topRight.x() - topLeft.x();
        var height = bottomLeft.y() - topLeft.y();
        if(width && height) {
            shape.setSize({width:width, height: height});
        }
    }


    $.fn.canvasMap.addBehaviour = function(layer){
        var stage = layer.getStage();
        var that = this;
        // Add bindings to circles
        $.each(['.topLeft',
            '.topRight',
            '.bottomRight',
            '.bottomLeft'],
            function (ix, el) {
                var anchor = stage.find(el);
                anchor.each(function (el) {
                    that.addBindings(el);
                });
            });

        $.each(layer.children, function () {
            that.addGroupBindings(this);
        });
    }

    $.fn.canvasMap.addAnchors = function(group, data){
        this.addAnchor(group, data.x, data.y, 'topLeft');
        this.addAnchor(group, (data.x + data.width), data.y, 'topRight');
        this.addAnchor(group, (data.x + data.width), (data.y + data.height), 'bottomRight');
        this.addAnchor(group, data.x, (data.y + data.height), 'bottomLeft');
    }
    $.fn.canvasMap.addAnchor = function(group, x, y, name){
        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 4,
            name: name,
            draggable: true,
            dragOnTop: false
        });

        this.addBindings(anchor);
        group.add(anchor);
    }

    $.fn.canvasMap.addExit = function(data){
        var defaultData = {
            x: 0,
            y: 0,
            width: 70,
            height: 20,
            name: 'shape',
            stroke: 'black',
            strokeWidth: 5,
            draggable: true
        };

        data = _.extend(defaultData, data);

        var newGroup = new Kinetic.Group({
            x: data.x,
            id: this.createId(),
            name: 'exit',
            y: data.y,
            draggable: data.draggable
        });

        canvas.objects.shells[newGroup.getId()] = {
            id: newGroup.getId(),
            type: 'Entrada/Salida',
            description: 'Por aquí entrarán y saldrán los usuarios.'
        };
        canvas.layer.add(newGroup);

        var rect = new Kinetic.Rect({
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            name: data.name,
            stroke: data.stroke,
            strokeWidth: data.strokeWidth
        });

        newGroup.add(rect);
        this.addAnchors(newGroup, data);
        this.addGroupBindings(newGroup);

        canvas.stage.draw();
    }

    $.fn.canvasMap.addGroupBindings = function(group){
        var that = this;

        group.on('click', function() {
            that.selectElement(this);
        });

        group.on('dragstart', function() {
            this.moveToTop();
        });
    }

    $.fn.canvasMap.addBindings = function(anchor){
        var that = this;
        anchor.on('dragmove', function() {
            that.update(this);
            this.getLayer().draw();
        });
        anchor.on('mousedown touchstart', function() {
            // Parent should be group
            this.parent.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            // Parent should be group
            this.parent.setDraggable(true);
            this.getLayer().draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            this.getLayer().draw();
        });
        anchor.on('mouseout', function() {
            document.body.style.cursor = 'default';
            this.strokeWidth(2);
            this.getLayer().draw();
        });

    }

    $.fn.canvasMap.addRect = function(data){
        var categoria = categorias? categorias[$("#map-categorias-select").val()]: {color: 'black', nombre: 'N/A'};
        var defaultData = {
            x: 0,
            y: 0,
            width: 140,
            height: 80,
            name: 'shape',
            stroke: categoria.color,
            strokeWidth: 5,
            draggable: true
        };

        data = _.extend(defaultData, data);

        var newGroup = new Kinetic.Group({
            x: data.x,
            id: this.createId(),
            name: 'rect',
            y: data.y,
            draggable: data.draggable
        });

        canvas.objects.shells[newGroup.getId()] = {
            id: newGroup.getId(),
            type: 'Góndola',
            description: 'Góndola de ' + categoria.nombre
        };
        canvas.layer.add(newGroup);

        var rect = new Kinetic.Rect({
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            name: data.name,
            stroke: data.stroke,
            strokeWidth: data.strokeWidth
        });

        newGroup.add(rect);
        this.addAnchors(newGroup, data);
        this.addGroupBindings(newGroup);

        canvas.stage.draw();
    }

    $.fn.canvasMap.selectElement = function(element){
        canvas.selectedElement = element;
        var object = canvas.objects.shells[element.getId()];
        $('.element-name').text(object.type);
        $('.element-description').text(object.description);
    }
}( jQuery ));