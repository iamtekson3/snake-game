//window onload event
window.onload = function () {
    canv = document.getElementById('gc');
    ctx = canv.getContext('2d');
    score = document.getElementById('score'); //Score of the game 
    document.addEventListener('keydown', keyPush); //added key control functions
    setInterval(game, 1000/10); //run the game function in every 1000/5 ms interval
}

//Defining defalut variables
px=py=10; // Default position of head of the snake
gs=tc=20; // tc: tile 
ax=ay=15; // Position of the dot
xv=yv=0; // Direction of snake head
trail = []; //Collects the x,y position of snake head
tail = 5; //Grid of the snake length

//Main function
function game() {
    px+=xv;
    py+=yv;

    //When snake cross the wall it appear from opposite wall. The required condition
    if(px<0) {
        px = tc-1;
    }
    if(px>tc-1) {
        px = 0;
    }
    if(py<0) {
        py = tc-1;
    }
    if(py>tc-1) {
        py = 0;
    }

    //Background of the gamming window
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canv.width,canv.height);

    //Snake main function for move the graphics
    ctx.fillStyle = 'blue';
    for(var i=0; i<trail.length; i++){
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        score.innerHTML = `YOUR SCORE: ${trail.length-5}`; //Score of the player
        if(trail[i].x==px && trail[i].y==py){
            tail = 5;
        }
    }

    //Dot color
    ctx.fillstyle = 'red';
    ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);

    //To add the x,y value to trail array and remove old value
    trail.push({x:px, y:py});
    while(trail.length>tail){
        trail.shift();
    }

    //If the snake body overlap, the game will reset to its initial position
    if(ax==px && ay==py){
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
    }
}
    
//Fuction for control the snake direction
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37: //The keycode of left button
            xv =-1; yv = 0;
            break;
        case 38: //The keycode of buttom button
            xv =0; yv = -1;
            break;
        case 39: //The keycode of right button
            xv =1; yv = 0;
            break;
        case 40: //The keycode of top button
            xv =0; yv = 1;
            break;
    }
}
