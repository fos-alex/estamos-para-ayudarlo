angular.module('EPA.directives', [
])


.directive('ngRaphaelSquare', function(){
    return {
        link: function(scope, element, attrs) {
            var r = Raphael(element[0]);
            var s = r.set();
            var squares = [
                {type:"rect", x:0, y:0,   width:100, height:60, r:5 },
                {type:"rect", x:100, y:0, width:100, height:60, r:5 },
                {type:"rect", x:200, y:0, width:100, height:60, r:5 },
                {type:"rect", x:400, y:0, width:100, height:60, r:5 },
                {type:"rect", x:500, y:0, width:100, height:60, r:5 },
                {type:"rect", x:600, y:0, width:100, height:60, r:5 },
                {type:"rect", x:0, y:130, width:100, height:60, r:5 },
                {type:"rect", x:100, y:130, width:100, height:60, r:5 },
                {type:"rect", x:200, y:130, width:100, height:60, r:5 },
                {type:"rect", x:400, y:130, width:100, height:60, r:5 },
                {type:"rect", x:500, y:130, width:100, height:60, r:5 },
                {type:"rect", x:600, y:130, width:100, height:60, r:5 },
                {type:"rect", x:0, y:190, width:100, height:60, r:5 },
                {type:"rect", x:100, y:190, width:100, height:60, r:5 },
                {type:"rect", x:200, y:190, width:100, height:60, r:5 },
                {type:"rect", x:400, y:190, width:100, height:60, r:5 },
                {type:"rect", x:500, y:190, width:100, height:60, r:5 },
                {type:"rect", x:600, y:190, width:100, height:60, r:5 },
                {type:"rect", x:0, y:280, width:100, height:60, r:5 },
                {type:"rect", x:100, y:280, width:100, height:60, r:5 },
                {type:"rect", x:200, y:280, width:100, height:60, r:5 },
                {type:"rect", x:400, y:280, width:100, height:60, r:5 },
                {type:"rect", x:500, y:280, width:100, height:60, r:5 },
                {type:"rect", x:600, y:280, width:100, height:60, r:5 },
                {type:"rect", x:0, y:340, width:100, height:60, r:5 },
                {type:"rect", x:100, y:340, width:100, height:60, r:5 },
                {type:"rect", x:200, y:340, width:100, height:60, r:5 },
                {type:"rect", x:400, y:340, width:100, height:60, r:5 },
                {type:"rect", x:500, y:340, width:100, height:60, r:5 },
                {type:"rect", x:600, y:340, width:100, height:60, r:5 },
                {type:"rect", x:0, y:430, width:100, height:60, r:5 },
                {type:"rect", x:100, y:430, width:100, height:60, r:5 },
                {type:"rect", x:200, y:430, width:100, height:60, r:5 },
                {type:"rect", x:400, y:430, width:100, height:60, r:5 },
                {type:"rect", x:500, y:430, width:100, height:60, r:5 },
                {type:"rect", x:600, y:430, width:100, height:60, r:5 },
                {type:"rect", x:0, y:490, width:100, height:60, r:5 },
                {type:"rect", x:100, y:490, width:100, height:60, r:5 },
                {type:"rect", x:200, y:490, width:100, height:60, r:5 },
                {type:"rect", x:400, y:490, width:100, height:60, r:5 },
                {type:"rect", x:500, y:490, width:100, height:60, r:5 },
                {type:"rect", x:600, y:490, width:100, height:60, r:5 },



                {type:"rect", x:800, y:0,   width:100, height:60, r:5 },
                {type:"rect", x:900, y:0, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:0, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:0, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:0, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:0, width:100, height:60, r:5 },
                {type:"rect", x:800, y:130, width:100, height:60, r:5 },
                {type:"rect", x:900, y:130, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:130, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:130, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:130, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:130, width:100, height:60, r:5 },
                {type:"rect", x:800, y:190, width:100, height:60, r:5 },
                {type:"rect", x:900, y:190, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:190, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:190, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:190, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:190, width:100, height:60, r:5 },
                {type:"rect", x:800, y:280, width:100, height:60, r:5 },
                {type:"rect", x:900, y:280, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:280, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:280, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:280, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:280, width:100, height:60, r:5 },
                {type:"rect", x:800, y:340, width:100, height:60, r:5 },
                {type:"rect", x:900, y:340, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:340, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:340, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:340, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:340, width:100, height:60, r:5 },
                {type:"rect", x:800, y:430, width:100, height:60, r:5 },
                {type:"rect", x:900, y:430, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:430, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:430, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:430, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:430, width:100, height:60, r:5 },
                {type:"rect", x:800, y:490, width:100, height:60, r:5 },
                {type:"rect", x:900, y:490, width:100, height:60, r:5 },
                {type:"rect", x:1000, y:490, width:100, height:60, r:5 },
                {type:"rect", x:1200, y:490, width:100, height:60, r:5 },
                {type:"rect", x:1300, y:490, width:100, height:60, r:5 },
                {type:"rect", x:1400, y:490, width:100, height:60}


            ];

            angular.forEach(squares, function (value, key){
                this.s.push(
                    this.r.rect(value.x, value.y, value.width, value.height, value.r)
                );
            }, {s: s, r: r});

            s.attr({fill: 'grey'});

            var c = r.circle(150,80,10,10,10);
            c.glow({color:'blue'});
            c.attr({fill:'blue'});
        }
    };
});