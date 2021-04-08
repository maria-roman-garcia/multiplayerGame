// import Phaser from 'phaser';


// var WINDOW_HEIGHT = 400,
//     WINDOW_WIDTH = 600,
//     SPEED = 300;


// const game = {
//     width: WINDOW_WIDTH,
//     height: WINDOW_HEIGHT,
//     type: Phaser.AUTO,
//     scene: {
//         preload: function () {
//             this.game.load.crossOrigin = 'anonymous';

//             this.game.load.image('wall', 'https://i.imgur.com/WQUKFVC.png');
//             this.game.load.image('ball', 'https://i.imgur.com/xtFdsIU.png');

//         },

//         create: function () {
//             // this.game key input
//             // Arrows
//             this.game.physics.startSystem(Phaser.Physics.ARCADE);

//             this.game.physics.arcade.checkCollision.right = false;
//             this.game.physics.arcade.checkCollision.left = false;

//             this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN,
//             Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
//             this.cursor = this.game.input.keyboard.createCursorKeys();

//             // WASD
//             this.wasd = {
//                 up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
//                 down: this.game.input.keyboard.addKey(Phaser.Keyboard.S)
//             };

//             // Load player
//             this.player = this.game.add.sprite(30, this.game.world.centerY, 'wall');
//             this.player.anchor.setTo(0.5, 0.5);
//             this.player.scale.x = 0.55;
//             this.player.scale.y = 0.25;
//             this.game.physics.arcade.enable(this.player);
//             this.player.body.collideWorldBounds = true;
//             this.player.body.immovable = true;

//             // Load enemy 
//             this.enemy = this.game.add.sprite(WINDOW_WIDTH - 30, this.game.world.centerY, 'wall');
//             this.enemy.anchor.setTo(0.5, 0.5);
//             this.enemy.scale.x = 0.55;
//             this.enemy.scale.y = 0.25;
//             this.game.physics.arcade.enable(this.enemy);
//             this.enemy.body.collideWorldBounds = true;
//             this.enemy.body.immovable = true;

//             this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
//             this.game.physics.arcade.enable(this.ball);
//             this.ball.body.velocity.set(-200, 0);
//             this.ball.onPaddlePlayer = false;
//             this.ball.onPaddleEnemy = false;
//             this.ball.body.bounce.set(1);
//             this.ball.body.collideWorldBounds = true;
//         },

//         update: function () {

//             // Check for keyboard input, either arrows for player, wasd for enemy
//             this.movePlayer();
//             this.moveEnemy();
//             this.ballCollision();

//             if (this.ball.onPaddlePlayer) {
//                 this.ball.body.velocity.y = ((Math.random() * 50) + this.player.body.velocity.y);
//                 this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x;
//                 this.ball.onPaddlePlayer = false;
//             }
//             else if (this.ball.onPaddleEnemy) {
//                 this.ball.body.velocity.y = ((Math.random() * 50) + this.enemy.body.velocity.y);
//                 this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x;
//                 this.ball.onPaddleEnemy = false;
//             }

//             if (this.ball.x >= this.game.width) {
//                 this.ballLost();
//             }
//             else if (this.ball.x <= 0) {
//                 this.ballLost();
//             }

//         },

//         movePlayer: function () {
//             if (this.wasd.up.isDown) {
//                 this.player.body.velocity.y = -1 * SPEED;
//             }
//             else if (this.wasd.down.isDown) {
//                 this.player.body.velocity.y = SPEED;
//             }
//             else {
//                 this.player.body.velocity.y = 0;
//             }
//         },

//         moveEnemy: function () {
//             if (this.cursor.up.isDown) {
//                 this.enemy.body.velocity.y = -SPEED;
//             }
//             else if (this.cursor.down.isDown) {
//                 this.enemy.body.velocity.y = SPEED;
//             }
//             else {
//                 this.enemy.body.velocity.y = 0;
//             }
//         },

//         ballCollision: function () {
//             this.ball.onPaddlePlayer = this.ball.onPaddleEnemy = false;
//             this.game.physics.arcade.collide(this.player, this.ball, function () { this.ball.onPaddlePlayer = true; }, null, this);
//             this.game.physics.arcade.collide(this.enemy, this.ball, function () { this.ball.onPaddleEnemy = true; }, null, this);
//         },

//         ballLost: function () {
//             this.ball.reset(this.game.world.centerX, this.game.world.centerY);
//             this.game.time.events.add(2000, function () { this.ball.body.velocity.set(-200, 0); }, this);
//         }
//     }
// };


// export default game;