
let moving = false;
var turn = "white";
var castling = false;
var whiteleft = false;
var whiteright = false;
var blackright = false;
var blackleft = false;

function onClick(id) {
  var tempWhiteKingX;
  var tempWhiteKingY;
  var tempBlackKingX;
  var tempBlackKingY;
  for (l = 1; l < 9; l++) {
    for (v = 1; v < 9; v++) {
      if (document.getElementById(l + "." + v).value === "wK") {
        tempWhiteKingX = l
        tempWhiteKingY = v
      } else if (document.getElementById(l + "." + v).value === "bK") {
        tempBlackKingX = l
        tempBlackKingY = v
      }
    }
  }
  checkIfMoved()
  if (moving === false) {
    moving = true;
    if (turn === "white") {
      disableBlack()
      turn = "black";
      let value = document.getElementById(id).value;
      movingValue = value;
      let type = value.slice(1, 2);
      moveBox = "background-color:yellow;color:black;width:40px;height:40px;";
      figurePosition = document.getElementById(id).id;
      if (type === "P") {
        whitePawn(id);
      } else if (type === "B") {
        whiteBishop(id);
      } else if (type === "R") {
        whiteRook(id);
      } else if (type === "H") {
        whiteHorse(id);
      } else if (type === "Q") {
        whiteQueen(id);
      } else if (type === "K") {
        whiteKing(id);
      }
    } else if (turn === "black") {
        turn = "white";
        let value = document.getElementById(id).value;
        movingValue = value
        let type = value.slice(1, 2);
        moveBox = "background-color:yellow;color:white;width:40px;height:40px;"
        figurePosition = document.getElementById(id).id;
        if (type === "P") {
          blackPawn(id);
        } else if (type === "B") {
          blackBishop(id);
        } else if (type === "R") {
          blackRook(id);
        } else if (type === "H") {
          blackHorse(id);
        } else if (type === "Q") {
          blackQueen(id);  
        } else if (type === "K") {
          blackKing(id);
        }
      }
  } else if (moving === true) { 
      moving = false;
      document.getElementById(id).value = movingValue;
      document.getElementById(oldValueX + "." + oldValueY).value = " ";
      var icon = document.getElementById(oldValueX + "." + oldValueY).innerHTML
      document.getElementById(id).innerHTML = icon
      document.getElementById(oldValueX + "." + oldValueY).innerHTML = "&nbsp;"
      clear();
      enableAll();
      turnChange();
      checkIfQueen(id);
      if (castling === true && whiteleft === true && id === "3.1") {
        castling = false;
        document.getElementById("1.1").value = " "
        document.getElementById("1.1").innerHTML = "&nbsp;"
        document.getElementById("4.1").value = "wR"
        document.getElementById("4.1").style = "background-color:#ffb84d;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:white;width:40px;height:40px;"
        document.getElementById("4.1").innerHTML = "<i class=\"fas fa-chess-rook\"></i>"
      }
      if (castling === true && whiteright === true && id === "7.1") {
        castling = false;
        document.getElementById("8.1").value = " "
        document.getElementById("8.1").innerHTML = "&nbsp;"
        document.getElementById("6.1").value = "wR"
        document.getElementById("6.1").style = "background-color:#ffb84d;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:white;width:40px;height:40px;"
        document.getElementById("6.1").innerHTML = "<i class=\"fas fa-chess-rook\"></i>"
      }
      if (castling === true && blackleft === true && id === "3.8") {
        castling = false;
        document.getElementById("1.8").value = " "
        document.getElementById("1.8").innerHTML = "&nbsp;"
        document.getElementById("4.8").value = "bR"
        document.getElementById("4.8").style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;"
        document.getElementById("4.8").innerHTML = "<i class=\"fas fa-chess-rook\"></i>"
      }
      if (castling === true && blackright === true && id === "7.8") {
        castling = false;
        document.getElementById("8.8").value = " "
        document.getElementById("8.8").innerHTML = "&nbsp;"
        document.getElementById("6.8").value = "bR"
        document.getElementById("6.8").style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;"
        document.getElementById("6.8").innerHTML = "<i class=\"fas fa-chess-rook\"></i>"
      }
      if (id === "1.1") {
         document.getElementById("1.1").title = "touched"
        }
      if (id === "8.1") {
         document.getElementById("8.1").title = "touched"
        }
      if (id === "5.1") {
         document.getElementById("1.1").title = "touched"
         document.getElementById("8.1").title = "touched"
         document.getElementById("5.1").title = "touched"
        }
      if (id === "1.8") {
         document.getElementById("1.8").title = "touched"
        }
      if (id === "5.8") {
         document.getElementById("8.8").title = "touched"
         document.getElementById("1.8").title = "touched"
         document.getElementById("5.8").title = "touched"
        }
      if (id === "8.8") {
         document.getElementById("8.8").title = "touched"
        }
      if (AI === true) {
        activateAI()
      } else {
        if (checkIfDead(tempWhiteKingX, tempWhiteKingY, "b", -1)) {
          alert("The White King is being threatened")
        }
        if (checkIfDead(tempBlackKingX, tempBlackKingY)) {
          alert("The Black King is being threatened")
        }
      }
    }
  }

function whitePawn(id) {
  Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
    if ((valueY === "2") && (document.getElementById(valueX + "." + (Number(valueY) + 1)).value === " ") && (document.getElementById(valueX + "." + (Number(valueY) + 2)).value === " ")) {
      for (valueY = 2; valueY < 4; valueY++) {
        newValueY = String(Number(valueY) + 1)
        document.getElementById(valueX + "." + newValueY).style = moveBox;
        document.getElementById(valueX + "." + newValueY).disabled = false;;
      }
    } else if ((document.getElementById(valueX + "." + (Number(valueY) + 1)).value === " ")) {
    let newValueY = String(Number(valueY) + 1);
    document.getElementById(valueX + "." + newValueY).style = moveBox;
    for (i = 1; i < 9; i++) {
      for (j = 1; j < 9; j++) {
        document.getElementById(i + "." + j).disabled=true;
        }
      }
    document.getElementById(valueX + "." + newValueY).disabled=false;
    }
  if (valueX != "8") {
    let boxValue = (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1))).value;
    let pawnColor = boxValue.slice(0, 1);
    if (pawnColor === "b") {
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  if (valueX != "1") {
    let boxValue = (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1))).value;
    let pawnColor = boxValue.slice(0, 1);
    if (pawnColor === "b") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  checkIfStuck();
}

function blackPawn(id) {
  Color = "b"
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  if (valueY === "7" && (document.getElementById(valueX + "." + (Number(valueY) - 1)).value === " ") && (document.getElementById(valueX + "." + (Number(valueY) - 2)).value === " ")) {
    for (valueY = 7; valueY > 5; valueY = valueY - 1) {
      newValueY = String(Number(valueY - 1));
      document.getElementById(valueX + "." + newValueY).style = moveBox;
      document.getElementById(valueX + "." + newValueY).disabled = false;
    }
  } else if ((document.getElementById(valueX + "." + (Number(valueY) - 1)).value === " ")) {
  let newValueY = String(Number(valueY) - 1);
  document.getElementById(valueX + "." + newValueY).style = moveBox;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
      }
    }
  document.getElementById(valueX + "." + newValueY).disabled=false;
  }
  if (valueX != "8") {
    let boxValue = (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1))).value;
    let pawnColor = boxValue.slice(0, 1);
    if (pawnColor === "w") {
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).style = moveBox
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  if (valueX != "1") {
    let boxValue = (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1))).value;
    let pawnColor = boxValue.slice(0, 1);
    if (pawnColor === "w") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  checkIfStuck()
}

function whiteBishop(id) {
  Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  bishopFood = false;
  i = Number(oldValueX) + 1;
  j = Number(oldValueY) + 1;
    for (k = 0; k < 8; k++) {
     if (i === 9 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1;
      j = j + 1;
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) + 1;
    for (k = 0; k < 8 - Number(oldValueY); k++) {
     if (i === 0 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1
      j = j + 1
    }
    bishopFood = false;
    i = Number(oldValueX) + 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 9 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1
      j = j - 1
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 0 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1
      j = j - 1
    }
  checkIfStuck();
}

function blackBishop(id) {
  Color = "b";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  bishopFood = false;
  i = Number(oldValueX) + 1;
  j = Number(oldValueY) + 1;
    for (k = 0; k < 8; k++) {
     if (i === 9 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1
      j = j + 1
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) + 1;
    for (k = 0; k < 8 - Number(oldValueY); k++) {
     if (i === 0 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1;
      j = j + 1;
    }
    bishopFood = false;
    i = Number(oldValueX) + 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 9 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1;
      j = j - 1;
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 0 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1;
      j = j - 1;
    }
  checkIfStuck();
}

function whiteRook(id) {
  Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  for (j = Number(oldValueY) + 1; j < 9; j++) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (j = Number(oldValueY) - 1; j > 0; j = j - 1) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (i = Number(oldValueX) + 1; i < 9; i++) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (i = Number(oldValueX) - 1; i > 0; i = i - 1) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
  }
  checkIfStuck();
}
    
function blackRook(id) {
  Color = "b";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  for (j = Number(oldValueY) + 1; j < 9; j++) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (j = Number(oldValueY) - 1; j > 0; j = j - 1) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (i = Number(oldValueX) + 1; i < 9; i++) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (i = Number(oldValueX) - 1; i > 0; i = i - 1) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
  }
  checkIfStuck();
}

function whiteHorse(id) {
 Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  //pa?? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) + 2) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).disabled = false;
    }
  }
  //pa?? a??ste?a
  if (((Number(oldValueX) - 1) >= 1) && (Number(oldValueY) + 2) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).disabled = false;
    }
  }
  //de??a pa??
  if (((Number(oldValueX) + 2) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //a??ste?a pa??
  if (((Number(oldValueX) - 2) >= 1) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //de??a ?at?
  if (((Number(oldValueX) + 2) <= 8) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).style = moveBox;
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //a??te?a ?at?
  if (((Number(oldValueX) - 2) >= 1) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? a??ste?a 
  if (((Number(oldValueX) - 1) >= 1) && (Number(oldValueY) - 2) >= 1) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).disabled = false;
    }
  }
  //?at? de??a
  if (((Number(oldValueX) + 1) <= 8) && (Number(oldValueY) - 2) >= 1) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).value.slice(0, 1) != "w") {
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).style = moveBox;
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).disabled = false;
    }
  }
  checkIfStuck();
}

function blackHorse(id) {
  Color = "b";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  //pa?? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) + 2) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).style = moveBox;
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 2)).disabled = false;
    }
  }
  //pa?? a??ste?a
  if (((Number(oldValueX) - 1) >= 1) && (Number(oldValueY) + 2) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 2)).disabled = false;
    }
  }
  //de??a pa??
  if (((Number(oldValueX) + 2) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //a??ste?a pa??
  if (((Number(oldValueX) - 2) >= 1) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //de??a ?at?
  if (((Number(oldValueX) + 2) <= 8) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).style = moveBox;
      document.getElementById((Number(oldValueX) + 2) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //a??te?a ?at?
  if (((Number(oldValueX) - 2) >= 1) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).style = moveBox;
      document.getElementById((Number(oldValueX) - 2) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? a??ste?a 
  if (((Number(oldValueX) - 1) >= 1) && (Number(oldValueY) - 2) >= 1) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).style = moveBox;
      document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 2)).disabled = false;
    }
  }
  //?at? de??a
  if (((Number(oldValueX) + 1) <= 8) && (Number(oldValueY) - 2) >= 1) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).value.slice(0, 1) != "b") {
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).style = moveBox;
      document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 2)).disabled = false;
    }
  }
  checkIfStuck()
}

function whiteQueen(id) {
 Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  for (j = Number(oldValueY) + 1; j < 9; j++) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (j = Number(oldValueY) - 1; j > 0; j = j - 1) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (i = Number(oldValueX) + 1; i < 9; i++) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
  }
  for (i = Number(oldValueX) - 1; i > 0; i = i - 1) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
  }
  bishopFood = false;
  i = Number(oldValueX) + 1;
  j = Number(oldValueY) + 1;
    for (k = 0; k < 8; k++) {
     if (i === 9 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1;
      j = j + 1;
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) + 1;
    for (k = 0; k < 8 - Number(oldValueY); k++) {
     if (i === 0 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1;
      j = j + 1;
    }
    bishopFood = false;
    i = Number(oldValueX) + 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 9 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1;
      j = j - 1;
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 0 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1;
      j = j - 1;
    }
  checkIfStuck();
}

function blackQueen(id) {
  Color = "b"
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      document.getElementById(i + "." + j).disabled=true;
    }
  }
  for (j = Number(oldValueY) + 1; j < 9; j++) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (j = Number(oldValueY) - 1; j > 0; j = j - 1) {
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(oldValueX + "." + j).style = moveBox;
    document.getElementById(oldValueX + "." + j).disabled = false;
    if (document.getElementById(oldValueX + "." + j).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (i = Number(oldValueX) + 1; i < 9; i++) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
  }
  for (i = Number(oldValueX) - 1; i > 0; i = i - 1) {
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "b") {
      break;
    }
    document.getElementById(i + "." + oldValueY).style = moveBox;
    document.getElementById(i + "." + oldValueY).disabled = false;
    if (document.getElementById(i + "." + oldValueY).value.slice(0, 1) === "w") {
      break;
    }
  }
  bishopFood = false;
  i = Number(oldValueX) + 1;
  j = Number(oldValueY) + 1;
    for (k = 0; k < 8; k++) {
     if (i === 9 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1;
      j = j + 1;
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) + 1;
    for (k = 0; k < 8 - Number(oldValueY); k++) {
     if (i === 0 || j === 9) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1
      j = j + 1
    }
    bishopFood = false;
    i = Number(oldValueX) + 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 9 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i + 1
      j = j - 1
    }
    bishopFood = false;
    i = Number(oldValueX) - 1;
    j = Number(oldValueY) - 1;
    for (k = 0; k < Number(oldValueY); k++) {
     if (i === 0 || j === 0) {
       break;
     } else {
     if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        bishopFood = true;
      }
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
       break;
      }
      document.getElementById(i + "." + j).style = moveBox;
      document.getElementById(i + "." + j).disabled=false;
      if (bishopFood === true) {
        document.getElementById(i + "." + j).style = moveBox;
        document.getElementById(i + "." + j).disabled=false;
        break;
      }
      }
      i = i - 1;
      j = j - 1;
    }
  checkIfStuck();
}

function whiteKing(id) {
  
  Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  doCastling();
  //pa?? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //pa?? µes?
  if (((Number(oldValueX)) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //pa?? a??ste?a
  if (((Number(oldValueX) - 1) >= 1 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //de??a 
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY)) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).disabled = false;
    }
  }
  //a??ste?a
  if (((Number(oldValueX) - 1) > 0 ) && (Number(oldValueY)) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).disabled = false;
    }
  }
  //?at? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? µes?
  if (((Number(oldValueX)) <= 8 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? a??ste?a 
  if (((Number(oldValueX) - 1) >= 1 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "w") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  checkIfStuck();
}

function blackKing(id) {
   Color = "w";
  disableAll();
  let valueX = document.getElementById(id).id.slice(0, 1);
  oldValueX = valueX;
  let valueY = document.getElementById(id).id.slice(2, 3);
  oldValueY = valueY;
  doCastling();
  //pa?? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //pa?? µes?
  if (((Number(oldValueX)) <= 8 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX)) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //pa?? a??ste?a
  if (((Number(oldValueX) - 1) >= 1 ) && (Number(oldValueY) + 1) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) + 1)).disabled = false;
    }
  }
  //de??a 
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY)) <= 8) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY))).disabled = false;
    }
  }
  //a??ste?a
  if (((Number(oldValueX) - 1) >= 0 ) && (Number(oldValueY)) <= 8) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY))).disabled = false;
    }
  }
  //?at? de??a
  if (((Number(oldValueX) + 1) <= 8 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) + 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? µes?
  if (((Number(oldValueX)) <= 8 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) ) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  //?at? a??ste?a 
  if (((Number(oldValueX) - 1) >= 1 ) && (Number(oldValueY) - 1) >= 1) {
    if (document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).value.slice(0, 1) != "b") {
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).style = moveBox;
    document.getElementById((Number(oldValueX) - 1) + "." + (Number(oldValueY) - 1)).disabled = false;
    }
  }
  checkIfStuck();
}

//?a?e? ta ???µp?a t? default ???µa ->
function clear() {
  for (i = 1; i < 9; i++) {
    for (j = 1; j < 9; j++) {
      if (document.getElementById(i + "." + j).value.slice(0, 1) === "w") {
        if (document.getElementById(i + "." + j).name === "white") {
          document.getElementById(i + "." + j).style = "background-color:#ffb84d;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:white;width:40px;height:40px;";
        } else if (document.getElementById(i + "." + j).name === "") {
          document.getElementById(i + "." + j).style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:white;width:40px;height:40px;";
        }
      } else if (document.getElementById(i + "." + j).value.slice(0, 1) === "b") {
        if (document.getElementById(i + "." + j).name === "white") {
          document.getElementById(i + "." + j).style = "background-color:#ffb84d;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;";
        } else if (document.getElementById(i + "." + j).name === "") {
          document.getElementById(i + "." + j).style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;";
        }
      } else if (document.getElementById(i + "." + j).value.slice(0, 1) === " ") {
        if (document.getElementById(i + "." + j).name === "white") {
          document.getElementById(i + "." + j).style = "background-color:#ffb84d;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;";
        } else if (document.getElementById(i + "." + j).name === "") {
          document.getElementById(i + "." + j).style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;";
        }
      }
    }
  }
}

function checkIfQueen(id) {
  if (turn === "black") {
    if (document.getElementById(id).value.slice(1, 2) === "P") {
      if (document.getElementById(id).id.slice(2, 3) === "8") {
        document.getElementById(id).value = "wQ";
        document.getElementById(id).innerHTML = "<i class=\"fas fa-chess-queen\"></i>";
      }
    }
  }
  if (turn === "white") {
    if (document.getElementById(id).value.slice(1, 2) === "P") {
      if (document.getElementById(id).id.slice(2, 3) === "1") {
        document.getElementById(id).value = "bQ";
        document.getElementById(id).innerHTML = "<i class=\"fas fa-chess-queen\"></i>";
      }
    }
  }
}

