var n = 3;
var grid = "";
for(let i = 0; i < n; i++){
    for(let j = 0; j <= n; j++){
        if(j == n){
            grid += "\n";
        }
        else{
            var stet = Math.floor(Math.random() * 2);
            if(stet == 0){
                grid += "-";
            }
            else{
                grid += "d";
            }
        }
    }
}
var r = Math.floor(Math.random() * n);
var c = Math.floor(Math.random() * n);
clean = 
`---
---
---
`;
opt1 =
`ddd
--d
---`;
opt2 = 
`d-d
ddd
ddd`;
//opt1 = 
//`---
//d--
//---`;
var opts = [opt1, opt2,grid]
var R = [1, 0, r];
var C = [1, 1, c];
var choice = 0;
grid = opts[choice];
r = R[choice];
c = C[choice];
var hsteps = 0;
var galaw = 0;
//console.log(grid);

function bfs(){
    console.log("BFS");
    grid = opts[choice].slice();
    r = R[choice];
    c = C[choice];
    var tabL = document.getElementsByTagName("table")[0].remove();
    generate_table(game(""));
    let unempty = 1;
    let pila = [[grid,[r,c].slice(),[].slice(),[r,c].slice()]];
    let acts = ["FUEL","LEFT","RIGHT","UP","DOWN"];
    let best = [];
    let step = 0;
    while(Boolean(unempty)){
        console.log("Dequeuing node");
        step++;
        let node = pila.shift().slice();
        let grrd = node[0].slice();
        let prev = node[3].slice();
        console.log("Goal checking the node " + node[2]);
        step++
        if(grrd == clean){
            console.log("Goal check = pass");
            step++
            unempty = 0;
            best = node[2].slice();
            break;
        }
        console.log("Goal check = fail");
        step++
        console.log("Expanding node");
        step++
        for(act of acts){
            let x = node[1][0];
            let y = node[1][1];
            let X = x;
            let Y = y;
            if(act == "LEFT"){
                if(y-1 >= 0){
                    y = y-1;
                    if(y==prev[1]){
                        console.log("This move just goes back to where agent was one move ago. Don't enqueue.");
                        step++;
                        continue;
                    }
                }
                else{
                    console.log("This move goes out of the grid. Don't enqueue");
                    step++;
                    continue;
                }
            }
            if(act == "RIGHT"){
                if(y+1 < n){
                    y = y+1;
                    if(y==prev[1]){
                        console.log("This move just goes back to where agent was one move ago. Don't enqueue.");
                        step++;
                        continue;
                    }
                }
                else{
                    console.log("This move goes out of the grid. Don't enqueue");
                    step++;
                    continue;
                }
            }
            if(act == "UP"){
                if(x-1>=0){
                    x = x-1;
                    if(x==prev[0]){
                        console.log("This move just goes back to where agent was one move ago. Don't enqueue.");
                        step++;
                        continue;
                    }
                }
                else{
                    console.log("This move goes out of the grid. Don't enqueue");
                    step++;
                    continue;
                }
            }
            if(act == "DOWN"){
                if(x+1 < n){
                    x = x+1;
                    if(x==prev[0]){
                        console.log("This move just goes back to where agent was one move ago. Don't enqueue.");
                        step++;
                        continue;
                    }
                }
                else{
                    console.log("This move goes out of the grid. Don't enqueue");
                    step++;
                    continue;
                }
            }
            let GRID = grrd;
            let isDirt = 0;
            if(act == "FUEL"){
                GRID = "";
                let dirt = grrd.split("\n")[x][y];
                //console.log(dirt);
                if(dirt != 'd'){
                    console.log("This move just goes back to where agent was one move ago. Don't enqueue.")
                    step++;
                    continue;
                }
                isDirt = 1;
                for(let i = 0; i < n; i++){
                    if(i!=x){
                        GRID += grrd.split("\n")[i];
                        GRID += "\n";
                        continue;
                    }
                    for(let j = 0; j <= n; j++){
                        if(j == n){
                            GRID += "\n";
                        }
                        else{
                            if(j==y){
                                GRID += "-";
                            }
                            else{
                                GRID += grrd.split("\n")[i][j];
                            }
                        }
                    }
                }
                //console.log(GRID);
            }
            let nod2 = node[2].slice();
            let nude = [GRID,[x,y].slice(),nod2,[X,Y].slice()];
            nude[2].push(act);
            pila.push(nude);
            console.log("Enqueueing node " + nude[2]);
            step++;
            if(Boolean(isDirt)){
                console.log("Current node is occupied, other moves will not be explored");
                step++;
                break;
            }
        }
    }
    console.log("Solution found in "+step+" steps");
    console.log("Solution takes "+best.length+" moves");
    BFSmuve(r,c,best);
}


function nextMove(input) {
    var input = input.split("\n");
    var board = input.slice(1,input.length);
    var posr = parseInt(input[0].split(" ")[0]);
    var posc = parseInt(input[0].split(" ")[1]);

    var mindist = 100000000;
    var minedge = 100000000;
    var dirs = [-1,1];
    let move = "DONE";
    if(board[posr][posc]=='d'){
        console.log("Check if current cell is occupied... Occupied, FUEL the car");
        hsteps++;
        galaw++;
        return "FUEL";
    }
    console.log("Scanning grid for nearest occupied cell with the least adjacent occupied cells");
    hsteps++;
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            if(board[i][j]=='d'){
                var edges = 0;
                for(dir of dirs){
                    //console.log(i+dir);
                    if(i+dir < board.length && i+dir >=0){
                        if(board[i+dir][j] == 'd'){
                            edges=edges+1;
                        }
                    }
                    if(j+dir < board[i].length && j+dir >=0){
                        if(board[i][j+dir] == 'd'){
                            edges=edges+1;
                        }
                    }
                }
                var dist = Math.abs(posr-i) + Math.abs(posc-j);
                if(dist < mindist){
                    mindist = dist;
                    minedge = edges;
                    if(posc-j<0){
                        move = "RIGHT";
                    }
                    else if(posc-j>0){
                        move = "LEFT";
                    }
                    if(posr-i<0){
                        move = "DOWN";
                    }
                    else if(posr-i>0){
                        move = "UP";
                    }
                }
                else if(dist == mindist && edges < minedge){
                    minedge = edges;
                    if(posc-j<0){
                        move = "RIGHT";
                    }
                    else if(posc-j>0){
                        move = "LEFT";
                    }
                    if(posr-i<0){
                        move = "DOWN";
                    }
                    else if(posr-i>0){
                        move = "UP";
                    }
                }
            }
        }
    }
    if (move != "DONE"){
        console.log("Found target occupied cell");
        hsteps++;
        console.log("Move " + move);
        galaw++;
        hsteps++;
    }
    else{
        console.log("Goal state check: pass");
        hsteps++;
        console.log("Solution found in "+hsteps+" steps");
        console.log("Solution take "+galaw+" moves");
    }
    return move;
}

function game(move){
    if(move == "LEFT"){
        if(c-1 >= 0){
            c = c-1;
        }
    }
    if(move == "RIGHT"){
        if(c+1 < n){
            c = c+1;
        }
    }
    if(move == "UP"){
        if(r-1>=0){
            r = r-1;
        }
    }
    if(move == "DOWN"){
        if(r+1 < n){
            r = r+1;
        }
    }
    if(move == "FUEL"){
        var GRID = "";
        for(let i = 0; i < n; i++){
            if(i!=r){
                GRID += grid.split("\n")[i];
                GRID += "\n";
                continue;
            }
            for(let j = 0; j <= n; j++){
                if(j == n){
                    GRID += "\n";
                }
                else{
                    if(j==c){
                        GRID += "-";
                    }
                    else{
                        GRID += grid.split("\n")[i][j];
                    }
                }
            }
        }
        grid = GRID;
    }
    var input = "";
    input += r.toString()+" "+c.toString()+"\n";
    input += grid;
    //console.log(input);
    return input;
}

function generate_table(input) {
  // get the reference for the body
  var input = input.split("\n");
  var board = input.slice(1,input.length);
  var posr = parseInt(input[0].split(" ")[0]);
  var posc = parseInt(input[0].split(" ")[1]);
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < n; i++) {
    // creates a table row
    var row = document.createElement("tr");
    row.style.height = "200 px";
    row.style.width = "1000 px";
    //row.style.border = "2px solid #666";
    for (var j = 0; j < n; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      cell.className = "cell "+i.toString()+"-"+j.toString()+" ";
      if(board[i][j]=='d'){
        cell.className += "dirty";
      }
      if(posr == i && posc == j){
        cell.className += "bot";
      }
      //cell.style.height = "200 px";
      //cell.style.width = "200 px";
      //cell.style.border = "2px solid #666";
      //var celltext = document.createTextNode("&nbsp;");
      //cell.appendChild(celltext);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  //tbl.setAttribute("border", "2");
}

function myMuve(input) {
    var Input = input;
    var input = input.split("\n");
    var board = input.slice(1,input.length);
    var posr = parseInt(input[0].split(" ")[0]);
    var posc = parseInt(input[0].split(" ")[1]);
  let id = null;  
  clearInterval(id);
  id = setInterval(frame, 500);
  let muve = "";
  //generate_table(Input);
  function frame() {
    var _input = game(muve);
    var tabl = document.getElementsByTagName("table")[0].remove();
    generate_table(_input);
    muve = nextMove(_input);
    //console.log(muve);
    if(muve == "DONE"){
        clearInterval(id);
    }
  }
}

function BFSmuve(rr, cc, best){
    let id = null;   
    clearInterval(id);
    id = setInterval(frame, 500);
    //generate_table(game(""));
    var Input = "";
    r = rr;
    c = cc;
    Input += rr.toString()+" "+cc.toString()+"\n";
    Input += grid;
    var k = 0;
    function frame() {
      //console.log(best[k]);
      var _input = game(best[k]);
      k++;
      var tabl = document.getElementsByTagName("table")[0].remove();
      generate_table(_input);
      if(k == best.length){
          clearInterval(id);
      }
    }
}
function show_table(){
    generate_table(game(""));
}
function start(){
    grid = opts[choice];
    r = R[choice];
    c = C[choice];
    hsteps = 0;
    galaw = 0;
    console.log("Heuristic");
    myMuve(game(""));
}

function choose0(){
    choice = 0;
    grid = opts[choice];
    r = R[choice];
    c = C[choice];
    var tabL = document.getElementsByTagName("table")[0].remove();
    generate_table(game(""));
}
function choose1(){
    choice = 1;
    grid = opts[choice];
    r = R[choice];
    c = C[choice];
    var tabL = document.getElementsByTagName("table")[0].remove();
    generate_table(game(""));
}
function chooseRandom(){
    choice = 2;
    grid = opts[choice];
    r = R[choice];
    c = C[choice];
    var tabL = document.getElementsByTagName("table")[0].remove();
    generate_table(game(""));
}







