import Phaser from 'phaser';
import { createAligned, coinCollector } from './utils';
import ScoreLabel from './ScoreLabel';

const DUDE_KEY = 'dude';
const GROUND_KEY = 'ground';
const COIN_KEY = 'coin';
const JEWEL_KEY = 'jewel';
const SPIKES_KEY = 'spikes';

export default class Doom extends Phaser.Scene {
  constructor() {
    super('game');
    this.player = undefined;
    this.scoreLabel = undefined;
    this.debugLabel = undefined;
    this.gameOver = false;
    this.gameOverLabel = undefined;
    this.style = { fontSize: '32px', fill: '#000' };
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
    this.load.image(GROUND_KEY, 'src/assets/ground.png');
    this.load.image('platform', 'src/assets/platform.png');
    this.load.image(COIN_KEY, 'src/assets/coin.png');
    this.load.image(JEWEL_KEY, 'src/assets/jewel.png');
    this.load.image(SPIKES_KEY, 'src/assets/spikes.png');

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
    this.createPlayer();
    const platforms = this.createPlatforms();
    const fallingCoins = this.createFallingCoins();
    const bottomCoins = this.createBottomCoins();
    // const spikes = this.createSpikes();

    this.scoreLabel = this.createScoreLabel(16, 16, 0).setScrollFactor(0);
    this.debugLabel = new Phaser.GameObjects.Text(
      this,
      16,
      50,
      'X, Y',
      this.style
    ).setScrollFactor(0);
    this.gameOverLabel = new Phaser.GameObjects.Text(
      this,
      -120,
      -150,
      'GAME OVER',
      this.style
    ).setScrollFactor(0);

    this.add.existing(this.debugLabel);
    this.add.existing(this.gameOverLabel);

    this.physics.add.collider(this.player, platforms);
    // this.physics.add.collider(this.player, spikes);
    // const collectFalling = coinCollector(this, this.player, fallingCoins, 15);

    this.physics.add.overlap(
      this.player,
      fallingCoins,
      coinCollector(this, this.player, fallingCoins, 15),
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      bottomCoins,
      this.collectBottom,
      null,
      this
    );

    this.physics.add.collider(fallingCoins, platforms);
    this.physics.add.collider(bottomCoins, platforms);
  }

  createBottomCoins() {
    return this.physics.add.group({
      key: COIN_KEY,
      repeat: 15,
      setXY: { x: 256, y: 523, stepX: 256 },
    });
  }

  createFallingCoins() {
    const fallingCoins = this.physics.add.group({
      key: JEWEL_KEY,
      repeat: 9,
      setXY: { x: 20, y: 0, stepX: 384 },
    });

    fallingCoins.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return fallingCoins;
  }

  collectBottom(player, bottomCoin) {
    bottomCoin.disableBody(true, true);
    this.scoreLabel.add(5);
  }

  createScoreLabel(x, y, score) {
    const label = new ScoreLabel(this, x, y, score, this.style);

    this.add.existing(label);

    return label;
  }

  createSpikes() {
    const spikes = this.physics.add.staticGroup();

    spikes
      .create(2050, 568, SPIKES_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);

    return spikes;
  }

  createPlatforms() {
    const width = this.scale.width;
    const height = this.scale.height;
    const platforms = this.physics.add.staticGroup();

    platforms
      .create(900, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);
    platforms
      .create(3200, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);

    platforms.create(500, 450, 'platform');
    platforms.create(800, 360, 'platform');
    platforms.create(400, 260, 'platform');
    platforms.create(1200, 300, 'platform');
    platforms.create(1700, 400, 'platform');
    platforms.create(2400, 290, 'platform');
    platforms.create(2800, 380, 'platform');
    platforms.create(3200, 410, 'platform');
    return platforms;
  }

  update(time, delta) {
    if (this.gameOver) {
      this.gameOverLabel.x = 150;
      this.gameOverLabel.y = 120;
      return;
    }

    this.debugLabel.setText(
      'X=' +
        Math.ceil(this.player.x) +
        ', Y=' +
        Math.ceil(this.player.y) +
        ', W=' +
        this.player.width +
        ' Screen Width=' +
        this.cameras.main.getBounds().width
    );

    let velX = 0.0;
    const speed = 400;
    const velY = -330;

    let anim = 'turn';

    this.physics.add.collider(this.player, 'ground');

    if (this.player.x - this.player.width / 2 <= 0) {
      this.player.x = this.player.width / 2;
    }
    if (
      this.player.x + this.player.width / 2 >=
      this.cameras.main.getBounds().width
    ) {
      this.player.x =
        this.cameras.main.getBounds().width - this.player.width / 2;
    }

    if (this.cursors.left.isDown) {
      velX = -speed;
      anim = 'left';
    }
    if (this.cursors.right.isDown) {
      velX = speed;
      anim = 'right';
    }

    this.player.setVelocityX(velX);

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(velY);
    }

    this.player.anims.play(anim, true);

    // Check if fell off platform
    if (this.scoreLabel === 0) {
      this.gameOver = true;
    }
    if (this.player.y > 600) {
      this.gameOver = true;
    }
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(100, 450, DUDE_KEY)
      .setCollideWorldBounds(false);
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