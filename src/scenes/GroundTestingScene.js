import Phaser from 'phaser';
import { createAligned } from './utils';

const DUDE_KEY = 'dude';

export default class GameTestingScene extends Phaser.Scene {
  constructor() {
    super('game');
    this.player = undefined;
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image('sky', 'src/assets/sky-warm.png');
    this.load.image('mountains1', 'src/assets/mountains1.png');
    this.load.image('mountains2', 'src/assets/mountains2.png');
    this.load.image('plateau', 'src/assets/hills.png');
    this.load.image('grass1', 'src/assets/grass1.png');
    this.load.image('grass2', 'src/assets/grass2.png');
    this.load.image('ground', 'src/assets/ground.png');

    this.load.spritesheet(DUDE_KEY, 'src/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1920 * 2, 600);
    this.physics.world.setBounds(0, 0, 1920 * 2, 600);

    this.cameras.main.setZoom(1);
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * width;
    this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);

    createAligned(this, totalWidth, 'mountains1', 0.3);
    createAligned(this, totalWidth, 'mountains2', 0.15);
    createAligned(this, totalWidth, 'plateau', 0.5);
    createAligned(this, totalWidth, 'grass1', 0.1116);
    createAligned(this, totalWidth, 'ground', 1);

    this.createPlayer();
  }

  update() {
    const cam = this.cameras.main;
    const speed = 5;

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
    if (this.cursors.right.isDown) {
      cam.scrollX += speed;
    } else if (this.cursors.left.isDown) {
      cam.scrollX -= speed;
    }
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(100, 450, DUDE_KEY)
      .setCollideWorldBounds(true);
    this.player.setBounce(0.2);
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

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }
}
