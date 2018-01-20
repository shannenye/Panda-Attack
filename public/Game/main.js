var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var swatter;
var person;
var pandas;
var gameOver;
var score = 100;
var scoreText;
var timer;
var total = 2000;

function preload() {
    game.load.image('background', '../images/bamboo.jpg');
    game.load.image('zookeeper', '../images/zookeeper.png');
    game.load.image('heart', '../images/heart.png');
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
    pandas.makeParticles('pandas', 10, 200, true, true);
    pandas.maxParticleSpeed.setTo(200, -400);
    pandas.bounce.setTo(1, 1);
    pandas.angularDrag = 30;
    pandas.start(false, 8000, 400);
    pandas.lifespan = 0;

    game.physics.enable(swatter);

    swatter.body.allowRotation = false;

    scoreText = game.add.text(700, 10, `Life Remaining: ${person.health}`, { fontSize: '32px', fill: '#000' });
    scoreText.addColor("#fff", 0);

    gameOver = game.add.sprite();
}

function update() {
    swatter.rotation = game.physics.arcade.moveToPointer(swatter, 60, game.input.activePointer, 500);

    game.physics.arcade.collide(pandas, person, () => {
        // person.tint = 0xff0000;
        person.damage(1);
        score -= 1;
        scoreText.text = `Life Remaining: ${score}`;
        // person.tint = 0xffffff;
    })


    pandas.children.forEach(child => {
        game.physics.arcade.collide( swatter, child, () => {
            child.kill();
        })
    })
    if (total) total--
    else total = 0
}

function render() {
    // game.debug.spriteInfo(swatter, 32, 32);
    game.debug.text(`Time Remaining: ${total}`, 700, 80)
}
