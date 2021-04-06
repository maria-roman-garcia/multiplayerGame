const BALL_SPEED = 10;
const BALL_RADIOUS = 1; // Percent

export class Ball {
    position_X = 0;
    position_Y = 0;
    speed = BALL_SPEED;
    direction_X = 0;
    direction_Y = 0;
    radious = BALL_RADIOUS;

    fieldDimensions = null;

    reset = () => {
        this.position_X = this.fieldDimensions.position_X / 2;
        this.position_Y = this.fieldDimensions.position_Y / 2;

        this.direction_X = Math.floor(Math.random() * (10 + 10 + 1)) - 10;
        this.direction_Y = Math.floor(Math.random() * (10 + 10 + 1)) - 10;
    }

    updatePosition = () => {
        this.position_X = this.position_X + (this.direction_X * this.speed);
        this.position_Y = this.position_Y + (this.direction_Y * this.speed);
    }
}

