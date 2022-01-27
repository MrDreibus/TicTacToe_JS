var turn = 0
var gameType = null
var win = false
var dificulty = null

//segun la posicion recibida la manda a la funcion para cambiar las casillas
function set(a) {
    changeButton(a)
}

//funcion que cambia las casillas
function changeButton(position) {
    //si no se selecciono el modo de juego, se manda una alerta
    if (gameType == null) {
        alert("Debes seleccionar un modo de juego")

    //si se selecciona el modo de juego como Multijugador
    } else if (gameType == "Multiplayer") {
        var names = document.getElementById("button_pos" + position).name

        //si la casilla que seleccionas esta vacia
        if(names == "white"){
            //si es turno de la X
            if (turn == 0){
                //pone la x en su posicion
                document.getElementById("button_pos" + position).src = "resources/cross.png"
                document.getElementById("button_pos" + position).name = "cross"

                //cambia la raya a la parte del circulo
                document.getElementById("horizontalCircle").style.visibility = "visible"
                document.getElementById("horizontalCross").style.visibility = "hidden"

                //comprobacion de victoria
                checkWins("cross")

                //cambia el turno al del circulo
                turn = 1
            
            //si es turno de la O
            } else if (turn == 1) {
                //pone la O en su posicion
                document.getElementById("button_pos" + position).src = "resources/circle.webp"
                document.getElementById("button_pos" + position).name = "circle" 

                //cambia la raya a la parte de la X
                document.getElementById("horizontalCircle").style.visibility = "hidden"
                document.getElementById("horizontalCross").style.visibility = "visible"

                //comprobacion de victoria
                checkWins("circle")

                //cambia el turno al de la X
                turn = 0 
            }
        }

    //si es en modo un jugador
    } else if (gameType == "Singleplayer"){
        var names = document.getElementById("button_pos" + position).name

        //si las casillas estan en blanco
        if (names == "white") {
            //si no selecciono modo de juego ejecuta la alerta
            if (dificulty == null) {
                alert("Debes seleccionar una dificultad")
                
                //si la partida esta en facil
            } else if (dificulty == 0){
                //pone la X
                putCross(position)
    
                //si no se ha ganado, se ejecuta el bot facil
                if (!win) {
                    botEasy()
                }

                //si la partida esta en normal
            } else if (dificulty == 1){
                //pone la X
                putCross(position)
    
                //si no se ha ganado, se ejecuta el bot normal
                if (!win) {
                    botTurn()
                }

                //si la partida esta en imposible
            } else if (dificulty == 2){
                //pone la X
                putCross(position)

                //si no se ha ganado, se ejecuta el bot facil
                if (!win) {
                    botHardcore()
                }
            }
        }
    }
    
}

//funcion para poner el x
function putCross(position){
    //pone la imagen del x
    document.getElementById("button_pos" + position).src = "resources/cross.png"
    document.getElementById("button_pos" + position).name = "cross"

    //pone la raya bajo el x
    document.getElementById("horizontalCircle").style.visibility = "visible"
    document.getElementById("horizontalCross").style.visibility = "hidden"

    //comprueba si ha ganado
    checkWins("cross")
}

//funcion para comprobar las posiciones de victorias segun el simbolo
function checkWins(simbol) {
    
    var images = document.getElementsByClassName("buttons")
    var cont = 0

    //si la posicion es ganadora, se mandara una notificacion a la funcion winNotify y esta posicion
    //se pondrá en verde y como ganadora
    if (images[0].name == simbol && images[1].name == simbol && images[2].name == simbol) {
        winNotify([0, 1, 2], simbol)

    } else if (images[0].name == simbol && images[4].name == simbol && images[8].name == simbol) {
        winNotify([0, 4, 8], simbol)

    } else if (images[0].name == simbol && images[3].name == simbol && images[6].name == simbol) {
        winNotify([0, 3, 6], simbol)
        
    } else if (images[1].name == simbol && images[4].name == simbol && images[7].name == simbol) {
        winNotify([1, 4, 7], simbol)
        
    } else if (images[2].name == simbol && images[5].name == simbol && images[8].name == simbol) {
        winNotify([2, 5, 8], simbol)
        
    } else if (images[6].name == simbol && images[7].name == simbol && images[8].name == simbol) {
        winNotify([6, 7, 8], simbol)
        
    } else if (images[3].name == simbol && images[4].name == simbol && images[5].name == simbol) {
        winNotify([3, 4, 5], simbol)
        
    } else if (images[6].name == simbol && images[4].name == simbol && images[2].name == simbol) {
        winNotify([6, 4, 2], simbol)
        
    }

    //Comprueba si las imagenes son distinta de white
    for (let index = 0; index < images.length; index++) {
        if (images[index].name != "white") {
            cont++
        }
    }

    //si hay 9 que no sean "white" hace la funcion de empate
    if (cont == 9) {
        empate()
    }
}

//Funcion para empates
function empate() {
    //pone el boton de reset en visible
    document.getElementById("resetButton").style.visibility = "visible"

    //pone la variable como true (necesario para el bot)
    win = true
    
}

//funcion que cambia los colores si es gana
function winNotify(winCombination, simbol) {
    var ext
    //si el simbolo que recibe es X pone una extension, si no, pone otra
    if (simbol == "cross") {
        ext = ".png"
    } else {
        ext = ".webp"
    }

    //pone la posicion ganadora en verde
    for (let index = 0; index < winCombination.length; index++) {
        document.getElementById("button_pos" + winCombination[index]).src = "resources/win" + simbol + ext
    }

    //si gana, se pone true
    win = true
    
    //Suma los puntos al contador
    var count = parseInt(document.getElementById(simbol + "Points").textContent) + 1
    document.getElementById(simbol + "Points").textContent = count

    //pone el boton de resetear tablero visible
    document.getElementById("resetButton").style.visibility = "visible"

    var images = document.getElementsByClassName("buttons")

    //pone todos los botones en estado win
    for (let index = 0; index < images.length; index++) {
        images[index].name = "win"
    }

}

//funcion que limpia el tablero
function clearBoard() {
    var images = document.getElementsByClassName("buttons")

    document.getElementById("resetButton").style.visibility = "hidden"

    //pone todas las casillas a blanco
    for (let index = 0; index < images.length; index++) {
        images[index].name = "white"
        images[index].src = ""
    }
    
    if (gameType == "Multiplayer") {
        //si el turno es de la X 
        if(turn == 0){
            //Pone el turno a 1 para que empiece los circulos
            turn = 1

            //cambia la rayida del circulo del marcador
            document.getElementById("horizontalCircle").style.visibility = "hidden"
            document.getElementById("horizontalCross").style.visibility = "visible"

        } else {
            //Pone el turno a 0 para que empiece las cruces
            turn = 0

            //cambia la rayida de la cruz del marcador
            document.getElementById("horizontalCircle").style.visibility = "visible"
            document.getElementById("horizontalCross").style.visibility = "hidden"
        }
        
    } else {
        //pone el turno a 0 si es multijugador
        turn = 0

        document.getElementById("horizontalCircle").style.visibility = "visible"
        document.getElementById("horizontalCross").style.visibility = "hidden"
    }

    win = false

}

//funcion para limpiar el marcador
function clearMarcador() {
    document.getElementById("circlePoints").textContent = "0"
    document.getElementById("crossPoints").textContent = "0"

    clearBoard()

}

//funcion de sleep
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  //funcion para aplicar el modo de juego
  function changeGameType(type) {
    if (type == "Multiplayer") {
        gameType = "Multiplayer"
        document.getElementById("gameSelector").style.visibility = "collapse"
        document.getElementById("options").style.visibility = "visible"

    } else {
        gameType = "Singleplayer"
        document.getElementById("gameSelector").style.visibility = "collapse"
        document.getElementById("botSelector").style.visibility = "visible"
    }
}

//funcion para aplicar la dificultad elegida
function changeDificulty(n) {
    dificulty = n
    document.getElementById("botSelector").style.visibility = "collapse"
    document.getElementById("options").style.visibility = "visible"
}

//botón para volver al menu para elegir 1 jugador o 2
function volver() {
    gameType = null
    document.getElementById("gameSelector").style.visibility = "visible"
    document.getElementById("options").style.visibility = "collapse"

    clearMarcador()
    
}    

function botEasy() {
    var list = document.getElementsByClassName("buttons")

        //bucle que busca una casilla vacia
    do {
        setIn = Math.floor(Math.random() * (8 - 0)) + 0;

        //si la casilla esta como "win" (quiere decir que acabo la partida) asi que sale del bucle
        if (list[setIn].name == "win") {
            break;
        }

        //si detecta una casilla vacia sale del bucle cogiendo esta casilla
    } while (list[setIn].name != "white");

    //si la casilla no esta marcada como win, pone un circulo
    if (list[setIn].name != "win") {
        document.getElementById("button_pos" + setIn).src = "resources/circle.webp"
        document.getElementById("button_pos" + setIn).name = "circle"
    }

    //pone la raya bajo el circulo marcando el turno
    document.getElementById("horizontalCircle").style.visibility = "hidden"
    document.getElementById("horizontalCross").style.visibility = "visible"

    //comprueba si gano el bot
    checkWins("circle");
}

function botHardcore() {
    //comprueba todas las posiciones en busca de una casilla buena para bloquear al contrincante o
    //para que el bot gane la partida en caso contrario, osea, que no hay ninguna posicion puesta, la pone 
    selectCasilla()

    //pone la raya sobre el circulo
    document.getElementById("horizontalCircle").style.visibility = "hidden"
    document.getElementById("horizontalCross").style.visibility = "visible"

    //comprueba si el bot ganó
    checkWins("circle");
}

//bot normal
function botTurn() {
    var setIn = 0

    //selecciona una opcion aleatoria para dar la oportunidad al bot de que haga una jugada aleatoria en vez
    //de una jugada buena comprobando las casillas suyas y del contrincante
    var random = Math.floor(Math.random() * (3 - 1)) + 1 
    var cont = 0
    var list = document.getElementsByClassName("buttons")

    //si el random es distinto de 2(si es 2 es jugada aleatoria) hace una buena jugada haciendo la funcion que
    //comprueba todas las casillas
    if (random != 2) {
        selectCasilla()
        
    } else{
        //bucle que busca una casilla vacia
        do {
            setIn = Math.floor(Math.random() * (8 - 0)) + 0;

            //si la casilla esta como "win" (quiere decir que acabo la partida) asi que sale del bucle
            if (list[setIn].name == "win") {
                break;
            }

            //si detecta una casilla vacia sale del bucle cogiendo esta casilla
        } while (list[setIn].name != "white");

        //si la casilla no esta asignada como que la partida termino ("win") se pone el circulo en la posicion
        if (list[setIn].name != "win") {
            document.getElementById("button_pos" + setIn).src = "resources/circle.webp"
            document.getElementById("button_pos" + setIn).name = "circle"
        }
    }

    //pone la raya en la parte del circulo para marcar el turno
    document.getElementById("horizontalCircle").style.visibility = "hidden"
    document.getElementById("horizontalCross").style.visibility = "visible"

    //comprueba si el circulo ha ganado
    checkWins("circle");


}

//funcion que ejecuta los bots Normal e Imposible para comprobar las opciones posibles de todas las
//casillas para poder poner el circulo en la posicion correcta para ganar o impedir la victoria del otro jugador
function selectCasilla() {
    var casillas = document.getElementsByClassName("buttons")

    //if para hacer las comprobaciones
    if (casillas[0].name == "cross" && casillas[1].name == "cross" || 
            casillas[0].name == "circle" && casillas[1].name == "circle") {
            setBotSimbol(2)

    } else if (casillas[1].name == "cross" && casillas[2].name == "cross" || 
        casillas[1].name == "circle" && casillas[2].name == "circle") {
            setBotSimbol(0)

    } else if (casillas[3].name == "cross" && casillas[4].name == "cross" || 
        casillas[3].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(5)

    } else if (casillas[5].name == "cross" && casillas[4].name == "cross" || 
        casillas[5].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(2)

    } else if (casillas[6].name == "cross" && casillas[7].name == "cross" || 
        casillas[6].name == "circle" && casillas[7].name == "circle") {
            setBotSimbol(8)

    } else if (casillas[7].name == "cross" && casillas[8].name == "cross" || 
        casillas[7].name == "circle" && casillas[8].name == "circle") {
            setBotSimbol(6)

    } else if (casillas[0].name == "cross" && casillas[3].name == "cross" || 
        casillas[0].name == "circle" && casillas[3].name == "circle") {
            setBotSimbol(6)

    } else if (casillas[1].name == "cross" && casillas[4].name == "cross" || 
        casillas[1].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(7)

    } else if (casillas[2].name == "cross" && casillas[5].name == "cross" || 
        casillas[2].name == "circle" && casillas[5].name == "circle") {
            setBotSimbol(8)

    } else if (casillas[6].name == "cross" && casillas[3].name == "cross" || 
        casillas[6].name == "circle" && casillas[3].name == "circle") {
            setBotSimbol(0)

    } else if (casillas[7].name == "cross" && casillas[4].name == "cross" || 
        casillas[7].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(1)

    } else if (casillas[8].name == "cross" && casillas[5].name == "cross" || 
        casillas[8].name == "circle" && casillas[5].name == "circle") {
            setBotSimbol(2)

    }  else if (casillas[0].name == "cross" && casillas[4].name == "cross" || 
        casillas[0].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(8)

    } else if (casillas[8].name == "cross" && casillas[4].name == "cross" || 
        casillas[8].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(0)

    } else if (casillas[6].name == "cross" && casillas[4].name == "cross" || 
        casillas[6].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(2)

    } else if (casillas[2].name == "cross" && casillas[4].name == "cross" || 
        casillas[2].name == "circle" && casillas[4].name == "circle") {
            setBotSimbol(6)

    }  else if (casillas[0].name == "cross" && casillas[2].name == "cross" || 
        casillas[0].name == "circle" && casillas[2].name == "circle") {
            setBotSimbol(1)

    }  else if (casillas[3].name == "cross" && casillas[5].name == "cross" || 
        casillas[3].name == "circle" && casillas[5].name == "circle") {

            setBotSimbol(4)

    }  else if (casillas[6].name == "cross" && casillas[8].name == "cross" || 
        casillas[6].name == "circle" && casillas[8].name == "circle") {
            setBotSimbol(7)

    }  else if (casillas[0].name == "cross" && casillas[6].name == "cross" || 
        casillas[0].name == "circle" && casillas[6].name == "circle") {
            setBotSimbol(3)

    }  else if (casillas[1].name == "cross" && casillas[7].name == "cross" || 
        casillas[1].name == "circle" && casillas[7].name == "circle") {
            setBotSimbol(4)

    }  else if (casillas[2].name == "cross" && casillas[8].name == "cross" || 
        casillas[2].name == "circle" && casillas[8].name == "circle") {
            setBotSimbol(5)

    }   else if (casillas[0].name == "cross" && casillas[8].name == "cross" || 
        casillas[0].name == "circle" && casillas[8].name == "circle") {
            setBotSimbol(4)

    }  else if (casillas[2].name == "cross" && casillas[6].name == "cross" || 
        casillas[2].name == "circle" && casillas[6].name == "circle") {
            setBotSimbol(4)
    } else {
        //si no se ejecuta ninguna opcion de las anteriores es que no hay posibilidad de ganar
        //por lo que comprueba si estamos jugando en imposible, si no hay opciones, tendremos que poner una
        //casilla aleatoria por lo que usamos el bot simple
        if (dificulty == 2) {
            botEasy()

        } else {
            //si no jugamos en imposible (Solo es posible entrar aqui si jugamos en normal o dificil)
            //ejecutamos el bot normal
            botTurn()
        }
    }
}

//Funcion creada para descargar de contenido a la funcion anterior (Select casilla)
function setBotSimbol(num) {
    var casillas = document.getElementsByClassName("buttons")

    //si la casilla esta vacia pone el circulo
    if (casillas[num].name == "white") {
        document.getElementById("button_pos" + num).src = "resources/circle.webp"
        document.getElementById("button_pos" + num).name = "circle"

    //si no, vuelve a ejecutar el bot para comprobar otra casilla    
    } else {
        botTurn()
    }
}