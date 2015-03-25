
var DTOR = Math.PI / 180;
var RTOD = 180 / Math.PI;

function RandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[4 + Math.floor(Math.random() * 12)];
    }
    return color;
}

Vec2 = function(x, y) {
    this.x = (x == undefined) ? 0: x;
    this.y = (y == undefined) ? 0: y;
}

Vec2.prototype.Length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vec2.prototype.Add = function(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
}

Vec2.prototype.Sub = function(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
}

Vec2.prototype.Scale = function(f) {
    this.x *= f;
    this.y *= f;
}

Vec2.prototype.ScaleToLength = function(newLength) {
    length = this.Length();
    if (length > 0.001) {
        this.Scale(newLength / length);
    }
}

Vec2.prototype.Normalize = function() {
    this.ScaleToLength(1);
}

Vec2.prototype.Dot = function(other) {
    return this.x * other.x + this.y * other.y;
}

// set this to projection of a onto b
Vec2.prototype.Project = function(a, b) {
    var f = b.Dot(a) / b.Dot(b);
    this.x = b.x * f;
    this.y = b.y * f;
}

// set this to reflection of i about n
Vec2.prototype.Reflect = function(i, n) {    
    this.Project(i, n);
    this.Scale(-2);
    this.Add(this, i);
}

Vec2.prototype.toString = function() {
    return( this.x + ", " + this.y );
}


var Text = function(text, pos, size, color, id) {
    this.text = text;
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.alpha = 1.0;
    this.id = id;
}

Text.prototype.AddToSVG = function(svg) {
	svg.text(this.pos.x, this.pos.y, this.text, 
        {
            fill: this.color, 
            stroke: this.color, 
            opacity: this.alpha,
            strokeOpacity: this.alpha,
            fontFamily: "Verdana",
            fontSize: this.size,
            textAnchor: "middle",
            id: this.id
         });
    
    this.svgLink = svg.getElementById(this.id);
}

Text.prototype.Update = function(svg) {
  
    svg.change(this.svgLink, {"x": this.pos.x});
    svg.change(this.svgLink, {"y": this.pos.y});
    svg.change(this.svgLink, {"opacity": this.alpha});
    svg.change(this.svgLink, {"strokeOpacity": this.alpha});    

    this.svgLink.textContent = this.text;

}

function ClickCB(e) {
    CurrentGameState = Playing;

    var svg = $('#gameBox').svg('get'); 
    IntroText.alpha = 0.0;
    IntroText.Update(svg);

    Gravity = InitialGravity;
    CDrag = InitialDrag;

    StartTime = new Date();

}

var Circle = function(pos, vel, r, color, id, cb) {
    this.pos = pos;
    this.vel = vel;
    this.r = r;
    this.color = color;
    this.alpha = 1.0;
    this.id = id;
    this.active = 1;
    this.cb = cb;
}


Circle.prototype.AddToSVG = function(svg) {
	svg.circle(this.pos.x, this.pos.y, this.r, 
        {
            fill: this.color, 
            stroke: this.color, 
            opacity: this.alpha,
            strokeOpacity: this.alpha,
            id: this.id,
            onclick: this.cb
            });
    
    this.svgLink = svg.getElementById(this.id);
}


Circle.prototype.Update = function(acc, dt, svg) {
    // vel = vel + acc * dt
    // pos = pos + vel * dt

    this.vel.x = this.vel.x + acc.x * dt;
    this.vel.y = this.vel.y + acc.y * dt;
    this.pos.x = this.pos.x + this.vel.x * dt;
    this.pos.y = this.pos.y + this.vel.y * dt;
    
    svg.change(this.svgLink, {"cx": this.pos.x});
    svg.change(this.svgLink, {"cy": this.pos.y});
    svg.change(this.svgLink, {"opacity": this.alpha});
    svg.change(this.svgLink, {"strokeOpacity": this.alpha});
    
}

CircleList = function(size, holePos) {
    this.holeIndex = 0;
    
    this.list = [];
    
    for (i=0; i < size; i++) {
        if (i==this.holeIndex) {
            this.list.push(new Circle(holePos, new Vec2(0, 0), 20, "black", i.toString(), "ClickCB(evt)"));
        }
        else {
            var rnRadius = 100 + Math.random() * 100;
            var rnAngle = Math.random() * 360;

            var rnPos = new Vec2(holePos.x + rnRadius * Math.cos(rnAngle * DTOR), 
                                 holePos.y + rnRadius * Math.sin(rnAngle * DTOR));

            var rnVel = new Vec2(Math.sin(rnAngle * DTOR), 
                                 Math.cos(rnAngle * DTOR));
            rnVel.Scale(100 + Math.random() * 100);



            this.list.push(new Circle(rnPos, rnVel, 3, RandomColor(), i.toString()));
        }
    }
}

CircleList.prototype.Init = function() {
    var holePos = this.list[this.holeIndex].pos;
    for (i=0; i < this.list.length; i++) {
        if (i==this.holeIndex) {
        }
        else {
            var rnRadius = 100 + Math.random() * 100;
            var rnAngle = Math.random() * 360;

            var rnPos = new Vec2(holePos.x + rnRadius * Math.cos(rnAngle * DTOR), 
                                 holePos.y + rnRadius * Math.sin(rnAngle * DTOR));

            var rnVel = new Vec2(Math.sin(rnAngle * DTOR), 
                                 Math.cos(rnAngle * DTOR));
            rnVel.Scale(100 + Math.random() * 100);

            this.list[i].pos = rnPos;
            this.list[i].vel = rnVel;
            this.list[i].alpha = 1.0;
            this.list[i].active = 1;
        }
    }
}

CircleList.prototype.AddToSVG = function(svg) {
    for (i=0; i < this.list.length; i++) {
        //console.log(this.list[i]);
        this.list[i].AddToSVG(svg);
    }
}

CircleList.prototype.ActiveCount = function(svg) {
    var count = 0;
    for (i=0; i < this.list.length; i++) {
        if (this.list[i].active > 0) {
            count++;
        }
    }
    return count;
}


CircleList.prototype.Update = function(dt, svg) {
    var disp = new Vec2();
    var acc = new Vec2();
    var drag = new Vec2();
    var msAcc = new Vec2();

    var dist;

    for (i=0; i < this.list.length; i++) {
		if (i == this.holeIndex) {
		}
		else {
            var bh = this.list[this.holeIndex];
            var c = this.list[i];


			disp.Sub(bh.pos, c.pos);
            dist = disp.Length();
            if (dist < bh.r + c.r) {
                c.alpha = 0.0;
                c.active = 0;
            }
            else {
                acc = new Vec2(disp.x, disp.y);
                acc.ScaleToLength(Gravity);

                drag = new Vec2(c.vel.x, c.vel.y);
                drag.Scale(CDrag);
                acc.Add(acc, drag);

                disp.Sub(c.pos, MousePos);
                dist = Math.max(disp.Length(), 1.0);
                msAcc = new Vec2(disp.x, disp.y);
                msAcc.ScaleToLength(UserForce / (dist));
                acc.Add(acc, msAcc);

                //console.log("f " + msAcc.Length().toString());

            }

            c.Update(acc, dt, svg);        
		}
    }
}


