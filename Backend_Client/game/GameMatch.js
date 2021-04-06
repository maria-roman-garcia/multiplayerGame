import { v4 as uuidv4 } from 'uuid';
import { Ball } from "./Ball";
import { Player } from "./Player";

const TOTAL_SCORE = 10;

const PLAYER = {
    P1: 0,
    P2: 1
};

export class GameMatch {

    gameMatchId = -1;
    totalscore = TOTAL_SCORE;
    fieldDimension = null;

    player1 = null;
    player2 = null;

    player1Score = 0;
    player2Score = 0;
    
    player1Position = null;
    player2Position = null;
    
    ball = null;
    isGameStarted = false;

    constructor(player1) {
        //Properties
        this.gameMatchId = uuidv4();
        this.player1 = player1;
        this.ball = new Ball();
    }

    //Methods
    joinPlayer = (player2) => {
        this.player2 = player2
    }

    //TODO: Remove
    newPositionOfPlayer = (event, player) => {
        switch (event.keyCode) {
            // "up arrow" key
            case 38:
                if (player.position_Y > 0) {
                    return actualPosition + 1;
                }
                break;
            // "down arrow" key
            case 40:
                if (player.position_Y < this.fieldDimensions.heigth_Y - 100) { // 100 = player height
                    return actualPosition + 1;
                }
                break;
        }
    }    

    detectCollision = () => {
        if (this.ball.position_Y + ball.radius <= 0) { // check if ball hits top or bottom wall
            this.ball.direction_Y = this.ball.direction_Y * -1;
            this.ball.position_Y = this.ball.direction_Y;
        } else if (this.ball.position_Y >= this.fieldDimensions.heigth_Y) { // La bola se sale por abajo
            this.ball.direction_Y = this.ball.direction_Y * -1;
            this.ball.position_Y = this.fieldDimensions.heigth_Y + this.ball.direction_Y;
        } else if (this.ball.position_X + ball.radius >= this.fieldDimensions.width_X) { // if ball hit on right wall = gamer2
            //Si el player 2 tiene la barrita en la posición por la que se está saliendo, que rebote:

            // HE VISTO ESTA FormData, NOSOTROS NO CALCULAMOS EL ANGULO...
            // let angle = 0;
            // // if ball hit the top of paddle
            // if (getBall().y < (player.y + player.height / 2)) {
            //     // then -1 * Math.PI / 4 = -45deg
            //     angle = -1 * Math.PI / 4;
            // } else if (getBall().y > (player.y + player.height / 2)) {
            //     // if it hit the bottom of paddle
            //     // then angle will be Math.PI / 4 = 45deg
            //     angle = Math.PI / 4;
            // }
            // // change velocity of ball according to on which paddle the ball hitted
            // getBall().velocityX = (player === getUser1() ? 1 : -1) * getBall().speed * Math.cos(angle);
            // getBall().velocityY = getBall().speed * Math.sin(angle);

            // //increase ball speed
            // getBall().speed += 0.2;

            if (this.ball.position_Y < player.position_Y || this.ball.position_Y < player.position_Y - 100) {
                this.ball.direction_X = this.ball.direction_X * -1;
            } else { //que sume punto al player1
                this.pointUp(PLAYER.P1);
                this.reset();
            }
        } else if (this.ball.position_X - ball.radius <= 0) { // if ball hit on left wall = gamer1
            //Si el player 1 tiene la barrita en la posición por la que se está saliendo, que rebote:
            if (this.ball.position_Y < player.position_Y || this.ball.position_Y < player.position_Y - 100) {
                this.ball.direction_X = this.ball.direction_X * -1;
            } else { //que sume punto al player2
                this.pointUp(PLAYER.P2);
                this.reset();
            }
        }
    }

    pointUp = (playerThatScores) => {
        if (playerThatScores == PLAYER.P1) {
            this.player1Score += 1;
        } else {
            this.player2Score += 1;
        }
        this.reset();
    }

    updatePlayerPostion = (player, position) => {
        if(player ===  PLAYER.P1) {
            this.player1Position += position;
        } else {
            this.player2Position += position;
        }
    } 

    // reset the ball
    reset() {
        // reset ball's value to initial values
        this.ball.reset();
    }

    // update function, to update things position
    update() {
        //3. mover la pelota (sumar a la posición actual x la direcciónx * speed y supmar a la posición actual y la direccióny * speed)
        this.ball.updatePosition();

        //4. detectar colisiones (llamar a la función que automáticamente detecta si se ha salido la pelota)
        this.detectCollision();

        //6. Si algun jugador ha llegado a score 10, terminar el juego y mostrar quién ha ganado else, volver a llamar a la función update()
        if (this.player.score + this.player2.score === this.totalscore) {
            this.endGame();
        } else {
            this.update();
        }
    }

    startGame = () => {
        if(this.player2 !== null) {
            this.isGameStarted = true;
        }
    }

    resetPlayer = (player) => {
        if(player === PLAYER.P1) {
            this.player1Position = 0;
        } else {
            this.player2Position = 0;
        }
    }

    endGame = () => {
        this.isGameStarted = false;
        
        this.player1Score = 0;
        this.player2Score = 0;
        
        this.resetPlayer(PLAYER.P1);
        this.resetPlayer(PLAYER.P2);

        this.ball.reset();
    }
};