var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var backgroundMusic;
var pandaPersonCollision;
var swatter;
var person;
var pandas;
var pandas2;
var gameOver = {end: false};
var score = 100;
var scoreText;
var timer;
var total = 2000;

function preload() {
    game.load.image('background', '../images/bamboo.jpg');
    game.load.image('zookeeper', '../images/zookeeper.png');
    game.load.image('heart', '../images/heart.png');
    game.load.audio('gameSound', '../audio/gameSound.mp3');
    game.load.audio('meow', '../audio/meow1.mp3');
    game.load.image('swatter', '../images/pandaSwatter.png');
    game.load.spritesheet('pandas', '../images/pandas.png');
    game.load.image('gameOver', '../images/Game_Over.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.width = 1000;
    background.height = 600;
    background.anchor.setTo(0.5, 0.5);

    backgroundMusic = game.add.audio('gameSound')
    backgroundMusic.play();

    person = game.add.sprite(450, 250, 'zookeeper');
    person.width = 100;
    person.height = 100;
    person.health = 100;

    game.physics.enable(person)
    person.body.immovable = true;

    swatter = game.add.sprite(400, 300, 'swatter');
    swatter.width = 90;
    swatter.height = 80;
    swatter.anchor.setTo(0, 0);

    timer = game.time.create(false);
    timer.start();

    pandas = game.add.emitter(0, 0, 250);
    pandas.makeParticles('pandas', 1000, 100, true, true);
    pandas.maxParticleSpeed.setTo(200, -400);
    pandas.bounce.setTo(1, 1);
    pandas.angularDrag = 30;
    pandas.start(false, 8000, 400);
    pandas.lifespan = 0;

    pandas2 = game.add.emitter(1000, 600, 250);
    pandas2.makeParticles('pandas', 1000, 100, true, true);
    pandas2.maxParticleSpeed.setTo(200, -400);
    pandas2.bounce.setTo(1, 1);
    pandas2.angularDrag = 30;
    pandas2.start(false, 8000, 400);
    pandas2.lifespan = 0;

    game.physics.enable(swatter);

    swatter.body.allowRotation = false;

    scoreText = game.add.text(700, 10, `Life Remaining: ${person.health}`, { fontSize: '32px', fill: '#000' });
    scoreText.addColor("#fff", 0);
}

function update() {
    swatter.rotation = game.physics.arcade.moveToPointer(swatter, 1000, game.input.activePointer, 100);

    game.physics.arcade.collide(pandas, person, () => {
        setTimeout((() => {
            person.tint = 0xffffff;
        }), 20);
        person.tint = 0xff0000
            person.damage(1);
            score -= 1;
        })

    game.physics.arcade.collide(pandas2, person, () => {
            setTimeout((() => {
                person.tint = 0xffffff;
                // person.tint = 0xff0000
            }), 10);
            // person.tint = 0xffffff;
            person.tint = 0xff0000
                person.damage(1);
                score -= 1;
        })

    scoreText.text = `Life Remaining: ${score}`;

    pandas.children.forEach(child => {
        game.physics.arcade.collide( swatter, child, () => {
            child.kill();
        })
    })

    pandas2.children.forEach(child => {
        game.physics.arcade.collide( swatter, child, () => {
            child.kill();
        })
    })

    if (total && person.health) {
        total--
    } else if (total && person.health === 0) {
        // game over (stop time)
        game.stop(null, true)
    }
    // else if (!total && person.health !== 0) {

    // } // you win! Stop time (stop game)
}

function render() {
    game.debug.text(`Time Remaining: ${total}`, 700, 80);
    // game.debug.text(`Life Remaining: ${}`);

}



// want to add GAME OVER if life remaining === 0 AND time remaining !== 0
// want to add YOU WIN if life remaining !== 0 AND time remaining === 0
// want to add start button

// if (total && person.health === 0) gameOver and stop time
// else if (!total && person.health !== 0) you win and stop life
// else if (total && person.health) total--