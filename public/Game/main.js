var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var backgroundMusic;
var gameOver;
var youWin;
var swatter;
var person;
var pandas;
var beastPanda;
var score = 50;
var timer;
var total = 1000;
var bitPerson;

function preload() {
    game.load.image('background', '../images/bamboo.jpg');
    game.load.spritesheet('gameOver', '../images/gameOver.png');
    game.load.spritesheet('youWin', '../images/youWin.png');
    game.load.image('zookeeper', '../images/zookeeper.png');
    game.load.image('heart', '../images/heart.png');
    game.load.audio('gameSound', '../audio/gameSound.mp3');
    game.load.audio('meow', '../audio/meow1.mp3');
    game.load.image('swatter', '../images/pandaSwatter.png');
    game.load.spritesheet('pandas', '../images/pandas.png');
    game.load.spritesheet('beastPanda', '../images/beastPanda.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.width = 1000;
    background.height = 600;
    background.anchor.setTo(0.5, 0.5);

    gameOver = game.add.sprite(450, 250, 'gameOver');
    gameOver.width = 650;
    gameOver.height = 500;
    gameOver.anchor.setTo(0.40, 0.45);
    gameOver.kill();

    youWin = game.add.sprite(450, 250, 'youWin');
    youWin.anchor.setTo(0.40, 0.45);
    youWin.kill();

    backgroundMusic = game.add.audio('gameSound')
    backgroundMusic.play();

    person = game.add.sprite(450, 250, 'zookeeper');
    person.width = 100;
    person.height = 100;
    person.health = 50;

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

    beastPanda = game.add.emitter(1000, 600, 250);
    beastPanda.makeParticles('beastPanda', 1000, 10, true, true);
    beastPanda.maxParticleSpeed.setTo(200, -800);
    beastPanda.bounce.setTo(1, 1);
    beastPanda.angularDrag = 100;
    beastPanda.start(false, 8000, 400);
    beastPanda.lifespan = 0;

    game.physics.enable(swatter);
    swatter.body.allowRotation = false;
}

function update() {
    swatter.rotation = game.physics.arcade.moveToPointer(swatter, 1000, game.input.activePointer, 100);

    if (total > 0 && score > 0) {
        total--
    }
    else if (total > 0 && score <= 0) {
        person.destroy();
        timer.destroy();
        pandas.destroy();
        beastPanda.destroy();
        swatter.destroy();
        gameOver.revive();
    } else if (total <= 0 && score !== 0) {
        person.destroy();
        pandas.destroy();
        beastPanda.destroy();
        swatter.destroy();
        youWin.revive();
    }

    pandas.children.forEach(child => {
        game.physics.arcade.collide( swatter, child, () => {
            child.kill();
        })
    })

    beastPanda.children.forEach(child => {
        game.physics.arcade.collide( swatter, child, () => {
            child.kill();
        })
    })

    game.physics.arcade.collide(pandas, person, () => {
        setTimeout((() => {
            person.tint = 0xffffff;
        }), 20);
        person.tint = 0xff0000
        bitPerson = game.add.audio('meow');
        bitPerson.play()
        person.damage(1);
        score -= 1;
    })

    game.physics.arcade.collide(beastPanda, person, () => {
        setTimeout((() => {
            person.tint = 0xffffff;
        }), 10);
        person.tint = 0xff0000
        bitPerson = game.add.audio('meow');
        bitPerson.play()
            if (person.health < 10 && score < 10) {
                person.health = 0;
                score = 0;
            } else {
                person.damage(10);
                score -= 10;
            }
    })
}

function render() {
    game.debug.text(`Life Remaining: ${score}`, 750, 40);
    game.debug.text(`Time Remaining: ${total}`, 750, 60);
}
