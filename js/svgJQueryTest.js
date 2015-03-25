// simple black hole game
// globals


var Waiting = "Waiting";
var Playing = "Playing";
var CurrrentGameState;


// frame time in ms
var DTms = 20;
var NumWorlds = 65;

var Gravity;
var InitialGravity = 100;
var DGravity = 0.7;
var CDrag;
var InitialDrag = -0.001;
var DDrag = -0.001;
var MaxDrag = -0.5

var UserForce = 10000.0;

var RemainingText;
var TimeText;
var IntroText;

var StartTime;

var MousePos = new Vec2();




// circle list
var cList;








// when page is loaded init an svg item in a div
$(function() {
	$('#gameBox').svg({onLoad: Init});


   
});

function Init(svg) {
    $("#gameBox").svg();
    
    domSVG   = document.getElementsByTagName('svg')[0];
    
    pt = domSVG.createSVGPoint();
    
    $("svg:first").mousemove(function( e) {    
        
        pt.x = e.clientX;
        pt.y = e.clientY;
        
        MousePos = pt.matrixTransform(domSVG.getScreenCTM().inverse());
    
        //console.log(e.clientX + ", ", e.clientY);
        //MousePos.x = e.clientX;
        //MousePos.y = e.clientY;

        //console.log(MousePos.x + ", " + MousePos.y);
    });

    
    CurrentGameState = Waiting;

    //wd = document.getElementById("gameBox").clientWidth;
    //ht = document.getElementById("gameBox").clientHeight;
    wd = svg.width();
    ht = svg.height();  
    

    //console.log("wd " + wd);

	cList =  new CircleList(NumWorlds, new Vec2(wd/2, ht/2));

    cList.AddToSVG(svg);

    RemainingText = new Text((NumWorlds-1).toString(), new Vec2(20, 30), 15, "blue", "RemainingText");
    TimeText = new Text("", new Vec2(wd - 80, 30), 15, "blue", "TimeText ");

    IntroText = new Text("How long can you protect your worlds from the black hole?  Click to start.", new Vec2(wd/2, ht/2 - 50), 15, "blue", "IntroText");


    RemainingText.AddToSVG(svg);
    TimeText.AddToSVG(svg);
    IntroText.AddToSVG(svg);

    StartTime = new Date();
    
    setInterval(update, DTms);
    
}

function update() {
    var svg = $('#gameBox').svg('get'); 



    if (CurrentGameState == Waiting) {
    }
    else {
        Gravity += DGravity;
        CDrag = Math.max(CDrag + DDrag, MaxDrag);

        //console.log("g " + Gravity);


        cList.Update(DTms / 1000.0, svg);

        worldsLeft = cList.ActiveCount();
        RemainingText.text = (worldsLeft - 1).toString();
        RemainingText.Update(svg);

        var elapsedTime = new Date();
        var now = new Date(); 
        var diffms = now.getTime() - StartTime.getTime();
        elapsedTime.setTime(diffms);
        var dm = elapsedTime.getMinutes();
        var ds = elapsedTime.getSeconds();
        TimeText.text = ("0" + dm).slice(-2) + ":" + ("0" + ds).slice(-2);
        TimeText.pos.x = svg.width() - 80;
        TimeText.Update(svg);

        // black hole is first world
        if (worldsLeft == 1) {
            CurrentGameState = Waiting;
            IntroText.alpha = 1.0;
            IntroText.Update(svg);

            cList.Init();

        }

    }


}



