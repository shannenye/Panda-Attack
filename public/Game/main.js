var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var swatter;

function preload() {
    game.load.image('background', '../images/bamboo.jpg');
    game.load.image('swatter', '../images/pandaSwatter.png');
    game.load.image('panda', '../images/pandas.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    var background = game.add.sprite(game.world.centerX, game.world.centerY, 'background');
    background.width = 1000;
    background.height = 600;
    background.anchor.setTo(0.5, 0.5);

    swatter = game.add.sprite(400, 300, 'swatter');
    swatter.width = 90;
    swatter.height = 80;
    swatter.anchor.setTo(0.5, 0.5);

    //  Enable Arcade Physics for the sprite
    game.physics.enable(swatter, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    swatter.body.allowRotation = false;
}

function update() {
    swatter.rotation = game.physics.arcade.moveToPointer(swatter, 60, game.input.activePointer, 500);
}

function render() {
    game.debug.spriteInfo(swatter, 32, 32);
}
