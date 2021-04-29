import Phaser from 'phaser';

const DUDE_KEY = 'dude';
const GROUND_KEY = 'ground';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super();
    this.player = undefined;
    this.cursors = undefined;
  }

  preload() {
    this.load.image('sky', 'src/assets/sky.png');
    this.load.spritesheet(DUDE_KEY, 'src/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image(GROUND_KEY, 'src/assets/platform.png');
  }

  create() {
    this.createSky();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.createPlayer();
    this.createCams();
    const platforms = this.createPlatforms();
    this.physics.add.collider(this.player, platforms);
  }

  createSky() {
    const sky = this.physics.add.staticGroup();
    sky.create(400, 568, 'sky').setScale(2).refreshBody().setScrollFactor(0);
  }

  createCams() {
    this.cameras.main.startFollow(this.player);
    const speed = 5;

    // if (this.cursors.right.isDown) {
    //   cam.scrollX += speed;
    // }
    // if (this.cursors.left.isDown) {
    //   cam.scrollX -= speed;
    // }
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

    return platforms;
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

    // console.log({ x: this.player.x, y: this.player.y });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, DUDE_KEY);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScrollFactor(1);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
