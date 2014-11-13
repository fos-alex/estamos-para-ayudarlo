(function ( $ ) {
    var defaultCanvas = {
        objects: {
            products: {},
            shells: {},
            images: {}
        },
        stage: {},
        layer: {},
        editable: true
    },
    categorias = null,
    opts = {},
    canvas = jQuery.extend(true, {}, defaultCanvas);

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
                    '<div id="view-panel" class="main-panel-container span2 text-center">' +
                        '<div class="row-fluid">' +
                            '<div class="panel-header span12">' +
                                '<h2>Descripción de Elemento</h2>' +
                            '</div>' +
                            '<div class="panel-body span12 text-left">' +
                                '<div class="row">' +
                                    '<div class="element-name-container span12">' +
                                        '<span>Elemento: </span>' +
                                        '&nbsp;' +
                                        '<span class="element-name"></span>' +
                                    '</div>' +
                                    '<div class="element-description-container span12">' +
                                        '<span>Descripción: </span>' +
                                        '&nbsp;' +
                                        '<span class="element-description"></span>' +
                                    '</div>' +
                                    '<div class="element-delete-container span12">' +
                                        '<button id="map-element-delete-button">Borrar</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="controlers" class="row-fluid">' +
                    '<div class="span12">' +
                        '<button id="map-new-button" >Nuevo Mapa</button>' +
                        '<button id="map-save-button" >Guardar Mapa</button>' +
                        '<button id="map-add-rect-button" >Agregar Góndola</button>' +
                        '<button id="map-add-entrance-button" >Agregar Entrada</button>' +
                        '<button id="map-add-exit-button" >Agregar Salida</button>' +
                        '<button id="map-disable-edit-button" >Editar</button>' +
                        '<select id="map-categorias-select"></select>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );

        $('#map-new-button').click(this.newMap.bind(this));
        $('#map-save-button').click(this.save.bind(this));
        $('#map-add-rect-button').click(this.addRect.bind(this));
        $('#map-add-exit-button').click(this.addExit.bind(this));
        $('#map-add-entrance-button').click(this.addEntrance.bind(this));
        $('#map-element-delete-button').click(this.removeElement.bind(this));
        $('#map-disable-edit-button').click(this.disableEdit.bind(this));

        $.getJSON(opts.url + '/categorias', function (response) {
            var options = $("#map-categorias-select");
            categorias = response.data;
            $.each(categorias, function(ix, el) {
                options.append($("<option />").val(ix).text(el.nombre));
            });
        });

        this.loadMap();

    };

    $.fn.canvasMap.removeElement = function () {
        var element = canvas.selectedElement;
        element.remove();
        canvas.stage.draw();
    };

    $.fn.canvasMap.save = function () {
        // save stage as a json string
        $.fn.canvasMap.disableEdit();
        var mapa = {
            mapaJSON: canvas.stage.toJSON(),
            objects: canvas.objects
        };
        $.ajax({
            url: opts.url + opts.url_mapa,
            type: 'PUT',
            data: JSON.stringify(mapa),
            success: function (response) {
                if (response.codigo == 0) {
                    alert("El mapa se guardó satisfactoriamente.");
                }
                $.fn.canvasMap.enableEdit();
            }
        });
    };

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
                canvas.objects = $.extend(canvas.objects, response.data.objects);
                canvas.stage = Kinetic.Node.create(mapa, 'internal-map-container');
                canvas.stage.draw();
                canvas.layer = canvas.stage.getLayers()[0];
                that.addBehaviour(canvas.layer);
                that.loadImages(canvas.layer);
                if (canvas.editable) {
                    that.enableEdit();
                }
            } else {
                that.newMap();
            }
        });
    };

    $.fn.canvasMap.newMap = function () {
        canvas = $.extend(true, {}, defaultCanvas);

        canvas.stage = new Kinetic.Stage({
            container: 'internal-map-container',
            width: 1000,
            height: 550
        });

        canvas.layer = new Kinetic.Layer();
        canvas.stage.add(canvas.layer);
    };

    $.fn.canvasMap.createId = function (length){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length? length: 6;

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

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
        var oImage = new Image();
        oImage.onload = function () {
            image.image(oImage);
            stage.draw();
        };
        oImage.src = url;
    };

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
    };

    $.fn.canvasMap.addAnchors = function(group, data){
        this.addAnchor(group, data.x, data.y, 'topLeft');
        this.addAnchor(group, (data.x + data.width), data.y, 'topRight');
        this.addAnchor(group, (data.x + data.width), (data.y + data.height), 'bottomRight');
        this.addAnchor(group, data.x, (data.y + data.height), 'bottomLeft');
    };

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
    };

    $.fn.canvasMap.addExit = function(data){
        data.exit = true;
        this.addDoors(data);
    };
    $.fn.canvasMap.addEntrance = function(data){
        this.addDoors(data);
    };

    $.fn.canvasMap.addDoors = function(data){
        var that = this;
        var defaultData = {
            x: 0,
            y: 0,
            width: 50,
            height: 60,
            name: 'image',
            stroke: 'black',
            strokeWidth: 5,
            draggable: canvas.editable,
            exit: false
        };

        data = _.extend(defaultData, data);

        var newGroup = new Kinetic.Group({
            x: data.x,
            id: this.createId(),
            name: data.exit?'exit':'entrance',
            y: data.y,
            draggable: data.draggable
        });

        var info = {
            text: 'Entrada',
            description: 'Por aquí entrarán los usuarios.',
            image: $.fn.canvasMap.defaults.url + '/../assets/images/entrada.png'
        };
        if (data.exit) {
            info.text = 'Salida';
            info.description = 'Por aquí saldrán los usuarios.';
            info.image = $.fn.canvasMap.defaults.url + '/../assets/images/salida.png';
        }
        canvas.layer.add(newGroup);

        var imageObj = new Image();
        imageObj.src = info.image;

        imageObj.onload = function () {
            var img = new Kinetic.Image({
                x: data.x,
                y: data.y,
                id: that.createId(),
                width: data.width,
                height: data.height,
                name: data.name,
                image: imageObj
            });

            canvas.objects.images[img.getId()] = {
                id: img.getId(),
                url: imageObj.src,
                type: 'door'
            };
            newGroup.add(img);
            that.addGroupBindings(newGroup);

            canvas.stage.draw();
        };
    };

    $.fn.canvasMap.addGroupBindings = function(group){
        var that = this;

        group.on('click', function() {
            that.selectElement(this);
        });

        group.on('dragstart', function() {
            this.moveToTop();
        });
    };

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
    $.fn.canvasMap.enableEdit = function(data){
        var stage = canvas.layer.getStage();
        var that = this;
        // Edit mode to all shapes
        // Add anchors
        $.each(['.shape'],
            function (ix, el) {
                var element = stage.find(el);
                element.each(function (el) {
                    var group = el.parent;
                    that.addAnchors(group, {
                        x: el.position().x,
                        y: el.position().y,
                        width: el.width(),
                        height: el.height()
                    });
                });
            });
        // Make draggable
        $.each(['.shape', '.image'],
            function (ix, el) {
                var element = stage.find(el);
                element.each(function (el) {
                    var group = el.parent;
                    group.draggable(true);
                    that.addGroupBindings(group);
                });
            });

        canvas.stage.draw();
    };

    $.fn.canvasMap.disableEdit = function(data){
        var stage = canvas.layer.getStage();
        canvas.editable = false;
        var that = this;
        // Delete anchors
        $.each(['.topLeft',
            '.topRight',
            '.bottomRight',
            '.bottomLeft'],
            function (ix, el) {
                that.removeShape(el, {multiple: true});
            });
        // Make not draggable
        $.each(['.shape', '.image'],
            function (ix, el) {
                var element = stage.find(el);
                element.each(function (el) {
                    var group = el.parent;
                    group.draggable(false);
                });
            });

        canvas.stage.draw();
    };

    $.fn.canvasMap.addRect = function(data) {
        var that = this;
        var categoria = categorias? categorias[$("#map-categorias-select").val()]: {color: 'black', nombre: 'N/A'};
        var defaultData = {
            x: 0,
            y: 0,
            width: 140,
            height: 80,
            name: 'shape',
            stroke: categoria.color,
            strokeWidth: 5,
            draggable: false,
            fill: categoria.color
        };

        data = _.extend(defaultData, data);

        var newGroup = new Kinetic.Group({
            x: data.x,
            y: data.y,
            id: this.createId(),
            name: 'rect',
            draggable: data.draggable
        });

        var rect = new Kinetic.Rect({
            id: this.createId(),
            x: data.x,
            y: data.y,
            width: data.width,
            height: data.height,
            name: data.name,
            stroke: data.stroke,
            strokeWidth: data.strokeWidth,
            fill: data.fill
        });
        var rectangleData = {
            id: rect.getId(),
            type: 'Góndola',
            description: 'Góndola de ' + categoria.nombre,
            categoria: categoria,
            image: 'http://localhost/EPA-WEB/epa-web/public/assets/images/categorias/' + categoria.nombre.toLowerCase().replace(/\s+/g, '') + '.png'
        };
        canvas.layer.add(newGroup);

        var imageObj = new Image();
        imageObj.src = rectangleData.image;

        newGroup.add(rect);
        canvas.objects.shells[rect.getId()] = rectangleData;

        if (canvas.editable) {
            newGroup.draggable(true);
            that.addAnchors(newGroup, data);
        }
        that.addGroupBindings(newGroup);

        canvas.layer.add(newGroup);

        imageObj.onload = function () {
            var img = new Kinetic.Image({
                x: data.x + data.width * 0.25,
                y: data.y + data.height * 0.75 * 0.25,
                id: that.createId(),
                width: data.width * 0.5,
                height: data.height * 0.75,
                name: data.name,
                image: imageObj
            });

            canvas.objects.images[img.getId()] = {
                id: img.getId(),
                url: imageObj.src,
                type: 'categoria'
            };

            newGroup.add(img);

            canvas.stage.draw();
        };
    };

    $.fn.canvasMap.selectElement = function(element){
        canvas.selectedElement = element;
        var object = canvas.objects.shells[element.getId()];
        $('.element-name').text(object.type);
        $('.element-description').text(object.description);
    };

}( jQuery ));