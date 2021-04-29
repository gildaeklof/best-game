import Phaser from 'phaser';

export default class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet('ship', 'src/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.tilemapTiledJSON(
      'map',
      'https://labs.phaser.io/assets/tilemaps/maps/super-mario.json'
    );
    this.load.image(
      'tiles1',
      'https://labs.phaser.io/assets/tilemaps/tiles/super-mario.png'
    );
  }

  create() {
    this.cameras.main.setBounds(0, 0, 3392, 100);
    this.physics.world.setBounds(0, 0, 3392, 240);

    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
    var layer = map.createLayer('World1', tileset, 0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.ship = this.physics.add
      .image(400, 100, 'ship')
      .setAngle(0)
      .setCollideWorldBounds(true);
    // this.ship = this.add.image(400, 100, 'ship').setAngle(90);

    this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);

    this.cameras.main.setZoom(4);
  }

  update() {
    let velX = 0.0;
    const velY = -330;
    let anim = 'turn';

    if (this.cursors.left.isDown) {
      velX = -160;
      anim = 'left';
      this.player.anims.play('left', true);
    }
    if (this.cursors.right.isDown) {
      velX = 160;
      anim = 'right';
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(velY);
    }

    this.player.setVelocityX(velX);
    this.player.anims.play(anim, true);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
  },
  scene: [Example],
};

const game = new Phaser.Game(config);
