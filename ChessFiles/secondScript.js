for (i = 1; i < 9; i++) {
  for (j = 3; j < 9; j++) {
    document.getElementById(i + "." + j).disabled=true;
  }
}

function disableBlack() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      let tool = document.getElementById(i + "." + j).value;
      if (tool.slice(0, 1) != "w") { 
      document.getElementById(i + "." + j).disabled=true;
      }  
    }
  }
}

function disableWhite() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      let tool = document.getElementById(i + "." + j).value;
      if (tool.slice(0, 1) != "b") { 
        document.getElementById(i + "." + j).disabled=true;
      }
    }
  }
}

function enableYellow() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      if (document.getElementById(i + "." + j).style === "background-color:yellow;color:black;width:40px;height:40px;") {
        document.getElementById(i + "." + j).disabled=false;
      }
    }
  }
}

function disableAll() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
    document.getElementById(i + "." + j).disabled = true;
    }
  }
}

function turnChange() {
  if (turn === "white") {
    document.getElementById("turn").value = "w";
    disableBlack();
    } else {
    document.getElementById("turn").value = "b";
    disableWhite();
    }
}

function enableAll() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
    document.getElementById(i + "." + j).disabled = false;
    }
  }
}

function checkIfStuck() {
  let stuck = 0
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      if (document.getElementById(i + "." + j).disabled === false) {
        stuck = stuck
      } else {
        stuck = stuck + 1
      }
    }
  }
  if (stuck === 64) {
    enableAll();
    moving = false;
    if (turn === "black") {
      disableBlack();
      turn = "white"
    } else if (turn === "white") {
      disableWhite();
      turn = "black"
    }
  }
}

function doCastling() {
  if (turn === "black") {
    if (document.getElementById("1.1").value === "wR" && document.getElementById("1.1").title === "untouched") {
      if (document.getElementById("2.1").value === " " && document.getElementById("3.1").value === " " && document.getElementById("3.1").value === " ") {
      document.getElementById("3.1").style = moveBox
      document.getElementById("3.1").disabled = false;
      castling = true;
      whiteleft = true;
    }
  }     
  if (document.getElementById("8.1").value === "wR" && document.getElementById("8.1").title === "untouched") {
    if (document.getElementById("6.1").value === " " && document.getElementById("7.1").value === " ") {
      document.getElementById("7.1").style = moveBox
      document.getElementById("7.1").disabled = false;
      castling = true;
      whiteright = true;
    }
  }
  } else if (turn === "white") {
    if (document.getElementById("1.8").value === "bR" && document.getElementById("1.8").title === "untouched") {
      if (document.getElementById("2.8").value === " " && document.getElementById("3.8").value === " " && document.getElementById("3.1").value === " ") {
      document.getElementById("3.8").style = moveBox
      document.getElementById("3.8").disabled = false;
      castling = true;
      blackleft = true;
    }
  }     
  if (document.getElementById("8.8").value === "bR" && document.getElementById("8.8").title === "untouched") {
    if (document.getElementById("6.8").value === " " && document.getElementById("7.8").value === " ") {
      document.getElementById("7.8").style = moveBox
      document.getElementById("7.8").disabled = false;
      castling = true;
      blackright = true;
    }
  }
  }
}
function checkIfMoved() {
  if (document.getElementById("1.1").value != "wR") {
    document.getElementById("1.1").title = "touched"
  }
   if (document.getElementById("8.1").value != "wR") {
    document.getElementById("8.1").title = "touched"
  }
   if (document.getElementById("5.1").value != "wK") {
    document.getElementById("1.1").title = "touched"
    document.getElementById("8.1").title = "touched"
    document.getElementById("5.1").title = "touched"
  }
   if (document.getElementById("1.8").value != "bR") {
    document.getElementById("1.8").title = "touched"
  }
   if (document.getElementById("8.8").value != "bR") {
    document.getElementById("8.8").title = "touched"
  }
   if (document.getElementById("5.8").value != "bK") {
    document.getElementById("8.8").title = "touched"
    document.getElementById("1.8").title = "touched"
    document.getElementById("5.8").title = "touched"
  }
}

