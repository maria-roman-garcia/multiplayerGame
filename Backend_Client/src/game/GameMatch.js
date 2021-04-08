const { v4 } = require("uuid");
const { Ball } = require("./Ball");
const { Player } = require("./Player");

const TOTAL_SCORE = 10;

const PLAYER = {
  P1: 0,
  P2: 1,
};

module.exports = class GameMatch {
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
    this.gameMatchId = v4();
    this.player1 = player1;
    this.ball = new Ball();
  }

  //Methods
  joinPlayer = (player2) => {
    this.player2 = player2;
  };

  //TODO: Remove? it shoukd go in the front?
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
        if (player.position_Y < this.fieldDimensions.heigth_Y - 100) {
          // 100 = player height
          return actualPosition + 1;
        }
        break;
    }
  };

  detectCollision = () => {
    if (this.ball.position_Y + ball.radius <= 0) {
      // check if ball hits top wall
      this.ball.direction_Y = this.ball.direction_Y * -1;
      this.ball.position_Y = this.ball.direction_Y;
    } else if (this.ball.position_Y >= this.fieldDimensions.heigth_Y) {
      // check if ball hits bottoms wall
      this.ball.direction_Y = this.ball.direction_Y * -1;
      this.ball.position_Y =
        this.fieldDimensions.heigth_Y + this.ball.direction_Y;
    } else if (
      this.ball.position_X + ball.radius >=
      this.fieldDimensions.width_X
    ) {
      // if ball hit on right wall = gamer2
      //If player 2 has the bar in the same position as the ball
      if (
        this.ball.position_Y < player.position_Y ||
        this.ball.position_Y < player.position_Y - 100
      ) {
        this.ball.direction_X = this.ball.direction_X * -1;
      } else {
        //point up player1
        this.pointUp(PLAYER.P1);
        this.reset();
      }
    } else if (this.ball.position_X - ball.radius <= 0) {
      // if ball hit on left wall = gamer1
      //If player 1 has the bar in the same position as the ball
      if (
        this.ball.position_Y < player.position_Y ||
        this.ball.position_Y < player.position_Y - 100
      ) {
        this.ball.direction_X = this.ball.direction_X * -1;
      } else {
        //point up player2
        this.pointUp(PLAYER.P2);
        this.reset();
      }
    }
  };

  pointUp = (playerThatScores) => {
    if (playerThatScores == PLAYER.P1) {
      this.player1Score += 1;
    } else {
      this.player2Score += 1;
    }
    this.reset();
  };

  updatePlayerPostion = (player, position) => {
    if (player === PLAYER.P1) {
      this.player1Position += position;
    } else {
      this.player2Position += position;
    }
  };

  // reset the ball
  reset() {
    // reset ball's value to initial values
    this.ball.reset();
  }

  // update function, to update things position
  update() {
    this.ball.updatePosition();

    this.detectCollision();

    if (this.player.score + this.player2.score === this.totalscore) {
      this.endGame();
    } else {
      this.update();
    }
  }

  startGame = () => {
    if (this.player2 !== null) {
      this.isGameStarted = true;
    }
  };

  resetPlayer = (player) => {
    if (player === PLAYER.P1) {
      this.player1Position = 0;
    } else {
      this.player2Position = 0;
    }
  };

  endGame = () => {
    this.isGameStarted = false;

    this.player1Score = 0;
    this.player2Score = 0;

    this.resetPlayer(PLAYER.P1);
    this.resetPlayer(PLAYER.P2);

    this.ball.reset();
  };
}
