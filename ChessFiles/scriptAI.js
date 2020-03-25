var AI;
//Activates the "AI"
function activateActivation() {
  AI = true;
  document.getElementById("AIID").disabled = true;
  document.getElementById("AIID").innerHTML = "AI Activated"
}

function activateAI() {
  var kingXai;
  var kingYai;
  for (l = 1; l < 9; l++) {
    for (v = 1; v < 9; v++) {
      if (document.getElementById(l + "." + v).value === "wK") {
        kingXai = l
        kingYai = v
      }
    }
  }
  document.getElementById("turn").value = "w";
  enableAll();
  disableBlack();
  if (turn === "black") {
    document.getElementById("AIID").disabled = true;
    document.getElementById("AIID").innerHTML = "AI Activated"
    var pointsAI = 0;
    var tempPoints;
    var oldIdAi;
    var eatenAI;
    var distance;
    var valueXai;
    var valueYai;
    var playValue;
    var maxPlayValue;
    var eaten;
    var dead;
    for (i = 1; i < 9; i++) {
      for (j = 1; j < 9; j++) {
        let idAI = i + "." + j
        let valueAI = document.getElementById(idAI).value;
        let colorAI = valueAI.slice(0, 1);
          if (colorAI == "b") {
            var deathPoints = 0;
            tempPoints = 0;
            let typeAI = valueAI.slice(1, 2);
            if (typeAI === "P") {
              pawnAI(idAI);
            } else if (typeAI === "B") {
              bishopAI(idAI);
            } else if (typeAI === "R") {
              rookAI(idAI);
            } else if (typeAI === "H") {
              horseAI(idAI);
            } else if (typeAI === "Q") {
              //queenAI(idAI);
            } else if (typeAI === "K") {
              //whiteKing(id);
            }
          }
      }
    }

    function pawnAI(id) {
     playValue = "bP"
     valueXai = document.getElementById(id).id.slice(0, 1);
     valueYai = document.getElementById(id).id.slice(2, 3);
     if (checkIfDead(valueXai, valueYai) === true) {
       deathPoints = 1
     }
     for (k = 0; k < 4; k++) {
      tempPoints = 1 + deathPoints;
      if (valueYai !== "1") {
        if (k == "0") {
          if (valueYai === "7" && valueYai !== "2") {
            if ((document.getElementById(valueXai + "." + (Number(valueYai) - 2)).value === " ") && (document.getElementById(valueXai + "." + (Number(valueYai) - 1)).value === " ")) {
              moveID = valueXai + "." + (Number(valueYai) - 2)
              pointSystem(moveID, 1);
            }
          }
        }
        if (k == "1") { 
          if (document.getElementById(valueXai + "." + (Number(valueYai) - 1)).value === " ") {
            moveID = valueXai + "." + (Number(valueYai) - 1);
            pointSystem(moveID, 1);
          } 
        }
        if (k == "2") {
          if (valueXai !== "1") {
            if (document.getElementById((Number(valueXai) - 1) + "." + (Number(valueYai) - 1)).value.slice(0, 1) === "w") {
              moveID = (Number(valueXai) - 1) + "." + (Number(valueYai) - 1);
              pointSystem(moveID, 1);
            }
          }
        }
        if (k == "3") {
          if (valueXai !== "8") {
            if (document.getElementById((Number(valueXai) + 1) + "." + (Number(valueYai) - 1)).value.slice(0, 1) === "w") {
              moveID = (Number(valueXai) + 1) + "." + (Number(valueYai) - 1);
              pointSystem(moveID, 1);
            }
          }
        }
      }
    }
    }

    function horseAI(id) {
     playValue = "bH"
     valueXai = document.getElementById(id).id.slice(0, 1);
     valueYai = document.getElementById(id).id.slice(2, 3);
     if (checkIfDead(valueXai, valueYai) === true) {
      deathPoints = 3.2
     }
     for (k = 0; k < 8; k++) {
      tempPoints = 3.2 + deathPoints;
      if (valueYai >= 3) {
        if (valueXai >= 2 && k == "0") {
          // horse moves DOWN and LEFT
          if (document.getElementById((Number(valueXai) - 1) + "." + (Number(valueYai) - 2)).value.slice(0, 1) != "b") {
            moveID = (Number(valueXai) - 1) + "." + (Number(valueYai) - 2);
            pointSystem(moveID, 3.2);
          }
        }
        if (valueXai <= 7 && k == "1") {
          //horse moves DOWN and RIGHT
          if (document.getElementById((Number(valueXai) + 1) + "." + (Number(valueYai) - 2)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) + 1) + "." + (Number(valueYai) - 2);
            pointSystem(moveID, 3.2);
          } 
        }
      }
      if (valueYai <= 6) {
        if (valueXai >= 2 && k == "2") {
          //horse moves UP and LEFT
          if (document.getElementById((Number(valueXai) - 1) + "." + (Number(valueYai) + 2)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) - 1) + "." + (Number(valueYai) + 2);
            pointSystem(moveID, 3.2);
          }
        }
        if (valueXai <= 7 && k == "3") {
          //horse moves UP and RIGHT
          if (document.getElementById((Number(valueXai) + 1) + "." + (Number(valueYai) + 2)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) + 1) + "." + (Number(valueYai) + 2);
            pointSystem(moveID, 3.2);
          } 
        }
      }
      if (valueXai >= 3) {
        if (valueYai <= 7 && k == "4") {
          //horse moves LEFT and UP
          if (document.getElementById((Number(valueXai) - 2) + "." + (Number(valueYai) + 1)).value.slice(0, 1) != "b") {
            moveID = (Number(valueXai) - 2) + "." + (Number(valueYai) + 1);
            pointSystem(moveID, 3.2);
          }
        }
        if (valueYai >= 2 && k == "5") {
          //horse moves LEFT and DOWN
          if (document.getElementById((Number(valueXai) - 2) + "." + (Number(valueYai) - 1)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) - 2) + "." + (Number(valueYai) - 1);
            pointSystem(moveID, 3.2);
          } 
        }
      }
      if (valueXai <= 6) {
        if (valueYai <= 7 && k == "6") {
          //horse moves RIGHT and UP
          if (document.getElementById((Number(valueXai) + 2) + "." + (Number(valueYai) + 1)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) + 2) + "." + (Number(valueYai) + 1);
            pointSystem(moveID, 3.2);
          }
        }
        if (valueYai >= 2 && k == "7") {
          //horse moves RIGHT and DOWN
          if (document.getElementById((Number(valueXai) + 2) + "." + (Number(valueYai) - 1)).value.slice(0, 1) != "b") { 
            moveID = (Number(valueXai) + 2) + "." + (Number(valueYai) - 1);
            pointSystem(moveID, 3.2);
            } 
          }
        }
      }
    }

    function bishopAI(id) {
      playValue = "bB"
      valueXai = document.getElementById(id).id.slice(0, 1);
      valueYai = document.getElementById(id).id.slice(2, 3);
      if (checkIfDead(valueXai, valueYai) === true) {
        deathPoints = 3.33
      }
      for (k = 0; k < 4; k++) {
        tempPoints = 3.33 + deathPoints;
        if (k == "0") {
          let xB = + valueXai
          let yB = + valueYai
          while (xB < 8 && yB > 1) {
            xB += 1
            yB -= 1
            if (document.getElementById(xB + "." + yB).value.slice(0, 1) != "b") {
              moveID = (xB + "." + yB);
              pointSystem(moveID, 3.33)
              tempPoints = 3.33 + deathPoints;
              if (document.getElementById(moveID).value.slice(0, 1) === "w") {
                break
              }
            } else {
              break;
            }
          }
        }
        if (k == "1") {
          let xB = + valueXai
          let yB = + valueYai
          while (xB > 1 && yB > 1) {
            xB -= 1
            yB -= 1
            if (document.getElementById(xB + "." + yB).value.slice(0, 1) != "b") {
              moveID = (xB + "." + yB);
              pointSystem(moveID, 3.33)
              tempPoints = 3.33 + deathPoints;
              if (document.getElementById(moveID).value.slice(0, 1) === "w") {
                break
              }
            } else {
              break;
            }
          }
        }
        if (k == "2") {
          let xB = + valueXai
          let yB = + valueYai
          while (xB > 1 && yB < 8) {
            xB -= 1
            yB += 1
            if (document.getElementById(xB + "." + yB).value.slice(0, 1) != "b") {
              moveID = (xB + "." + yB);
              pointSystem(moveID, 3.33)
              tempPoints = 3.33 + deathPoints;
              if (document.getElementById(moveID).value.slice(0, 1) === "w") {
                break
              }
            } else {
              break;
            }
          }
        }
        if (k == "3") {
          let xB = + valueXai
          let yB = + valueYai
          while (xB < 8 && yB < 8) {
            xB += 1
            yB += 1
            if (document.getElementById(xB + "." + yB).value.slice(0, 1) != "b") {
              moveID = (xB + "." + yB);
              pointSystem(moveID, 3.33)
              tempPoints = 3.33 + deathPoints;
              if (document.getElementById(moveID).value.slice(0, 1) === "w") {
                break
              }
            } else {
              break;
            }
          }
        }
      }
    }
    
    function rookAI(id) {
      playValue = "bR"
      valueXai = document.getElementById(id).id.slice(0, 1);
      valueYai = document.getElementById(id).id.slice(2, 3);
      if (checkIfDead(valueXai, valueYai) === true) {
        deathPoints = 5.1;
      }
      for (k = 0; k < 4; k++) {
        tempPoints = 5.1 + deathPoints;
        if (k == "0") {
          let yR = + valueYai
          if (valueYai != 1) {
            while (yR > 1) {
              yR -= 1 
              if (document.getElementById(valueXai + "." + yR).value.slice(0, 1) === " ") {
                moveID = (valueXai + "." + yR);
                pointSystem(moveID, 5.1)
                tempPoints = 5.1 + deathPoints;     
              } else if (document.getElementById(valueXai + "." + yR).value.slice(0, 1) === "w") {
                moveID = (valueXai + "." + yR);
                pointSystem(moveID, 5.1)
                break;
              } else {
                break;
              }
            }
          }
        }
        if (k == "1") {
          let yR = + valueYai
          if (valueYai != 8) {
            while (yR < 8) {
              yR += 1 
              if (document.getElementById(valueXai + "." + yR).value.slice(0, 1) === " ") {
                moveID = (valueXai + "." + yR);
                pointSystem(moveID, 5.1);
                tempPoints = 5.1 + deathPoints;
              } else if (document.getElementById(valueXai + "." + yR).value.slice(0, 1) === "w") {
                moveID = (valueXai + "." + yR);
                pointSystem(moveID, 5.1)
                break;
              } else {
                break;
              }
            }
          }
        }
        if (k == "2") {
          let xR = + valueXai
          if (valueXai != 8) {
            while (xR < 8) {
              xR += 1 
              if (document.getElementById(xR + "." + valueYai).value.slice(0, 1) === " ") {
                moveID = (xR + "." + valueYai);
                pointSystem(moveID, 5.1);
                tempPoints = 5.1 + deathPoints;
              } else if (document.getElementById(xR + "." + valueYai).value.slice(0, 1) === "w") {
                moveID = (xR + "." + valueYai);
                pointSystem(moveID, 5.1);
                break;
              } else {
                break;
              }
            }
          }
        }
        if (k == "3") {
          let xR = + valueXai
          if (valueXai != 1) {
            while (xR > 1) {
              xR -= 1 
              if (document.getElementById(xR + "." + valueYai).value.slice(0, 1) === " ") {
                moveID = (xR + "." + valueYai);
                pointSystem(moveID, 5.1);
                tempPoints = 5.1 + deathPoints;
              } else if (document.getElementById(xR + "." + valueYai).value.slice(0, 1) === "w") {
                moveID = (xR + "." + valueYai);
                pointSystem(moveID, 5.1);
                break;
              } else {
                break;
              }
            }
          }
        }
      }
    } 

    
    function checkIfDead(x, y) {
      dead = false;
      //Checks if a Pawn can kill it
      if (y != 1) {
        if (x >= 2 && x <= 7) {
          if ((document.getElementById((Number(x) + 1) + "." + (Number(y) - 1)).value === "wP") || (document.getElementById((Number(x) - 1) + "." + (Number(y) - 1)).value === "wP")) {
            dead = true;
          }
        } else if (x == 1) {
          if (document.getElementById((Number(x) + 1) + "." + (Number(y) - 1)).value === "wP") {
            dead = true;
          }
        } else if (x == 8) {
          if (document.getElementById((Number(x) - 1) + "." + (Number(y) - 1)).value === "wP") {
            dead = true;
          }
        }
      }
      //Checks if a Horse can kill it
      if (y >= 3) {
        if (x >= 2) {
          if (document.getElementById((Number(x) - 1) + "." + (Number(y) - 2)).value === "wH") {
            dead = true;
          }
        }
        if (x <= 7) {
          if (document.getElementById((Number(x) + 1) + "." + (Number(y) - 2)).value === "wH") {
            dead = true;
          }
        }
      } else if (y <= 6) {
        if (x >= 2) {
          if (document.getElementById((Number(x) - 1) + "." + (Number(y) + 2)).value === "wH") {
            dead = true;
          }
        }
        if (x <= 7) {
          if (document.getElementById((Number(x) + 1) + "." + (Number(y) + 2)).value === "wH") {
            dead = true;
          }
        }
      }
      if (x >= 3) {
        if (y >= 2) {
          if (document.getElementById((Number(x) - 2) + "." + (Number(y) - 1)).value === "wH") {
            dead = true;
          }
        } else if (y <= 7) {
          if (document.getElementById((Number(x) - 2) + "." + (Number(y) + 1)).value === "wH") {
            dead = true;
          }
        }
      } else if (x <= 6) {
        if (y >= 2) {
          if (document.getElementById((Number(x) + 2) + "." + (Number(y) - 1)).value === "wH") {
            dead = true;
          }
        } else if (y <= 7) {
          if (document.getElementById((Number(x) + 2) + "." + (Number(y) + 1)).value === "wH") {
            dead = true;
          }
        }
      }
      //Checks if a Bishop or the Queen can kill it
      if (x < 8 && y > 1) {
        let deadX = + x
        let deadY = + y
        while (deadX < 8 && deadY > 1) {
          deadX += 1
          deadY -= 1
          if (document.getElementById(deadX + "." + deadY).value === "wB" || document.getElementById(deadX + "." + deadY).value === "wQ") {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + deadY).value != " ") {
            break;
          }
        }
      }
      if (x > 1 && y > 1) {
        let deadX = + x
        let deadY = + y
        while (deadX > 1 && deadY > 1) {
          deadX -= 1
          deadY -= 1
          if (document.getElementById(deadX + "." + deadY).value === "wB" || document.getElementById(deadX + "." + deadY).value === "wQ") {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + deadY).value != " ") {
            break;
          }
        } 
      }
      if (x > 1 && y < 8) {
        let deadX = + x
        let deadY = + y
        while (deadX > 1 && deadY < 8) {
          deadX -= 1
          deadY += 1
          if (document.getElementById(deadX + "." + deadY).value === "wB" || document.getElementById(deadX + "." + deadY).value === "wQ") {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + deadY).value != " ") {
            break;
          }
        }
      }
      if (x < 8 && y < 8) {
        let deadX = + x
        let deadY = + y
        while (deadX < 8 && deadY < 8) {
          deadX += 1
          deadY += 1
          if (document.getElementById(deadX + "." + deadY).value === "wB" || document.getElementById(deadX + "." + deadY).value === "wQ") {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + deadY).value != " ") {
            break;
          }
        }
      } 
      //checks if a Rook or the Queen can kill it
      if (x != 8) {
        let deadX = + x
        while (deadX < 8) {
          deadX += 1
          if (document.getElementById(deadX + "." + y).value === "wR" || document.getElementById(deadX + "." + y).value === "wQ")  {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + y).value != " ") {
            break;
          }
        }
      }
      if (x != 1) {
        let deadX = + x
        while (deadX > 1) {
          deadX -= 1
          if (document.getElementById(deadX + "." + y).value === "wR" || document.getElementById(deadX + "." + y).value === "wQ")  {
            dead = true;
            break;
          } else if (document.getElementById(deadX + "." + y).value != " ") {
            break;
          }
        }
      }
      if (y != 8) {
        let deadY = + y
        while (deadY < 8) {
          deadY += 1
          if (document.getElementById(x + "." + deadY).value === "wR" || document.getElementById(x + "." + deadY).value === "wQ")  {
            dead = true;
            break;
          } else if (document.getElementById(x + "." + deadY).value != " ") {
            break;
          }
        }
      }
      if (y != 1) {
        let deadY = + y
        while (deadY > 1) {
          deadY -= 1
          if (document.getElementById(x + "." + deadY).value === "wR" || document.getElementById(x + "." + deadY).value === "wQ")  {
            dead = true;
            break;
          } else if (document.getElementById(x + "." + deadY).value != " ") {
            break;
          }
        }
      }
      //Checks if the King can kill it
      if (y >= 2) {
        if (document.getElementById(x + "." + String(Number(y) - 1)).value === "wK") {
          dead = true;
        }
        if (x <= 7) {
          if (document.getElementById(String(Number(x) + 1) + "." + String(Number(y) - 1)).value === "wK") {
            dead = true;
          }
        }
        if (x >= 2) {
          if (document.getElementById(String(Number(x) - 1) + "." + String(Number(y) - 1)).value === "wK") {
            dead = true;
          }
        }
      }
      if (y <= 7) {
        if (document.getElementById(x + "." + String(Number(y) + 1)).value === "wK") {
          dead = true;
        }
        if (x <= 7) {
          if (document.getElementById(String(Number(x) + 1) + "." + String(Number(y) + 1)).value === "wK") {
            dead = true;
          }
        }
        if (x >= 2) {
          if (document.getElementById(String(Number(x) - 1) + "." + String(Number(y) + 1)).value === "wK") {
            dead = true;
          }
        }
      }
      if (x >= 2) {
        if (document.getElementById(String(Number(x) - 1) + "." + y).value === "wK") {
          dead = true;
        }
      }
      if (x <= 7) {
        if (document.getElementById(String(Number(x) + 1) + "." + y).value === "wK") {
          dead = true;
        }
      }
      return dead;
    }

    function checkScore(id) {
      eaten = document.getElementById(id).value.slice(1, 2);
      eatSystem(eaten);
      if (tempPoints > pointsAI) {
        pointsAI = tempPoints;
        eatenAI = moveID;
        oldIdAi = valueXai + "." + valueYai
        maxPlayValue = playValue;
      }
    }

    function scoreSystem(x, y) {
      distance = Math.sqrt(Math.pow(x - kingXai, 2) + Math.pow(y - kingYai, 2));
      if (playValue === "bP") {
        tempPoints += (9 - distance)
      } else {
        tempPoints += (9 - distance) / 2
      }
    }

    function pointSystem(id, value) {
      let pointX = id.slice(0, 1);
      let pointY = id.slice(2, 3);
      scoreSystem(pointX, pointY);
      if (checkIfDead(pointX, pointY) === true) {
        tempPoints = tempPoints - value
      }
      checkScore(id);
    }

    function eatSystem(type) {
    if (type === "P") {
      tempPoints += 1
    } else if(type === "B") {
      tempPoints += 3.33
    } else if(type === "H") {
      tempPoints += 3.2
    } else if(type === "R") {
      tempPoints += 5.1
    } else if(type === "Q") {
      tempPoints += 8.8
    } else if(type === "K") {
      tempPoints += 100
    }
    return tempPoints;
    }

    movementAI(maxPlayValue);

    function movementAI(typeValue) {
      document.getElementById(oldIdAi).value = " ";
      let iconAI = document.getElementById(oldIdAi).innerHTML
      document.getElementById(oldIdAi).innerHTML = "&nbsp;"
      document.getElementById(eatenAI).value = typeValue;
      document.getElementById(eatenAI).innerHTML = iconAI
      document.getElementById(eatenAI).style = "background-color:#8c2e00;background-image:url(http://www.transparenttextures.com/patterns/wood-pattern.png);color:black;width:40px;height:40px;"
      turn = "white"
      clear();
      disableBlack();
    }
  }
}
