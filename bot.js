var n = 5;
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
console.log(grid);


function nextMove(input) {
    var input = input.split("\n");
    var board = input.slice(1,input.length);
    var posr = parseInt(input[0].split(" ")[0]);
    var posc = parseInt(input[0].split(" ")[1]);

    var mindist = 100000000;
    let move = "DONE";

    if(board[posr][posc]=='d'){
        //console.log("CLEAN");
        return "CLEAN";
    }

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j]=='d'){
                var dist = Math.abs(posr-i) + Math.abs(posc-j);
                if(dist < mindist){
                    mindist = dist;
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
    //console.log(move);
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
    if(move == "CLEAN"){
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
    console.log(input);
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
  const rows = document.getElementsByTagName("tr");   
  clearInterval(id);
  id = setInterval(frame, 500);
  let muve = "";
  //generate_table(Input);
  function frame() {
    var _input = game(muve);
    var tabl = document.getElementsByTagName("table")[0].remove();
    generate_table(_input);
    muve = nextMove(_input);
    console.log(muve);
    if(muve == "DONE"){
        clearInterval(id);
    }
  }
}
function show_table(){
    generate_table(game(""));
}
function start(){
    myMuve(game(""));
}






