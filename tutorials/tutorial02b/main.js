let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    draw5Circles();
    drawNCircles(5);
    draw5CirclesWhile();
    draw5RedSquares();
    draw5CirclesFor();
    drawGrid(canvasWidth, canvasHeight);
    drawNCirclesFlexible(10, 50, 800, 300);
    drawNShapesFlexible(10, 50, 900, 300, 'circle');
    drawNShapesDirectionFlexible(10, 50, 1100, 300, 's', 'left');
    drawNShapesDirectionFlexible(10, 100, 1100, 500, 's', 'left');
}

// my first function
function draw5Circles() {
   //noFill();
     fill('blue');
    circle(100, 200, 50); // centerX, centerY, radius
    circle(100, 250, 50);
    circle(100, 300, 50);
    circle(100, 350, 50);
    circle(100, 400, 50);
}
function draw5CirclesWhile(){
    fill('green');
    let count = 0;
    let x = 500;
    let y = 300;
    while(count<5){
        circle(x, y, 50);
        count++;
        y-=50;
    }

}
function draw5CirclesFor(){
    fill('yellow');
    let x = 600;
    let y = 300;
    for(let i=0;i<5;i++){
        circle(x, y, 50);
        
        y-=50;
    }
}

function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}
function drawNCircles(n){
    fill('orange');
    let x = 700;
    let y = 300;
    for(let i=n;i>0;i--){
        circle(x, y, 50);
        
        y-=50;
    }
}
function drawNCirclesFlexible(n, size, x, y){
    fill('purple');
    for(let i=n;i>0;i--){
        circle(x, y, size);
        
        y-=50;
    }
}
function drawNShapesFlexible(n, size, x, y, shape){
    let type= shape;
    fill('black');
    if(type === 'circle'){
        for(let i=n;i>0;i--){
            circle(x, y, size);
            
            y-=size;
        } 
    }
        else {
            type='square';
            for(let i=n;i>0;i--){
                square(x, y, size);
                
                y-=size;
            } 
        }
    }
   function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
    let type= shape;
    fill('green');
    let compass= direction;
    if(type === 'circle'){
        if(compass==='down'){
        for(let i=n;i>0;i--){
            circle(x, y, size);
            
            y-=size;
        } 
    }
    if(compass==='up'){
        for(let i=n;i>0;i--){
            circle(x, y, size);
            
            y+=size;
        } 
    }
    if(compass==='right'){
        for(let i=n;i>0;i--){
            circle(x, y, size);
            
            x+=size;
        } 
    }
    if(compass==='left'){
        for(let i=n;i>0;i--){
            circle(x, y, size);
            
            x-=size;
        } 
    }
    }
        else {
            type='square';
            if(compass==='down'){
            for(let i=n;i>0;i--){
                square(x, y, size);
                
                y-=size;
            } 
        }
        if(compass==='up'){
            for(let i=n;i>0;i--){
                square(x, y, size);
                
                y+=size;
            } 
        }
        if(compass==='right'){
            for(let i=n;i>0;i--){
                square(x, y, size);
                
                x+=size;
            } 
        }
        if(compass==='left'){
            for(let i=n;i>0;i--){
                square(x, y, size);
                
                x-=size;
            } 
        }
        }
    }

