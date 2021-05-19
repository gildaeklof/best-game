import Phaser from 'phaser';
import { createAligned } from './utils';
import ScoreLabel from './ScoreLabel';

const PLATFORM_W = 252;

const DUDE_KEY = 'dude';
const GROUND_KEY = 'ground';
const COIN_KEY = 'coin';
const BUNNY_KEY = 'bunny';
const JEWEL_KEY = 'jewel';
const COIN_SOUND = 'coinSound';
const JEWEL_SOUND = 'jewelSound';
const DAMAGE_SOUND = 'damageSound';
const ENEMY_SPEED = 150;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('gamescene');
    this.player = undefined;
    this.enemies = [];
    this.scoreLabel = undefined;
    this.debugLabel = undefined;
    this.gameOver = false;
    this.gameWin = false;
    this.style = { fontSize: '32px', fill: '#000' };
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image('sky', '/sky-warm.png');
    this.load.image('mountains1', '/mountains1.png');
    this.load.image('mountains2', '/mountains2.png');
    this.load.image('plateau', '/hills.png');
    this.load.image('grass1', '/grass1.png');
    this.load.image('grass2', '/grass2.png');
    this.load.image(GROUND_KEY, '/ground.png');
    this.load.image('platform', '/platform.png');
    this.load.image(COIN_KEY, '/coin.png');
    this.load.image(JEWEL_KEY, '/jewel.png');

    this.load.spritesheet(DUDE_KEY, '/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.spritesheet(BUNNY_KEY, '/bunny.png', {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.audio(COIN_SOUND, ['/coin.mp3']);
    this.load.audio(JEWEL_SOUND, ['/jewel.mp3']);
    this.load.audio(DAMAGE_SOUND, ['/damage.mp3']);
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
    const platforms = this.createPlatforms();
    const fallingCoins = this.createFallingCoins();
    const bottomCoins = this.createBottomCoins();

    this.createPlayer();

    platforms.getChildren().forEach((platform) => {
      this.createEnemy(platform.x, platform.y - 100);
    });

    this.sound.add(COIN_SOUND, { loop: false });
    this.sound.add(JEWEL_SOUND, { loop: false });
    this.sound.add(DAMAGE_SOUND, { loop: false });

    this.scoreLabel = this.createScoreLabel(16, 16, 0).setScrollFactor(0);
    this.debugLabel = new Phaser.GameObjects.Text(
      this,
      16,
      50,
      'X, Y',
      this.style
    ).setScrollFactor(0);
    this.add.existing(this.debugLabel);

    this.physics.add.collider(this.player, platforms);

    this.physics.add.overlap(
      this.player,
      fallingCoins,
      this.collectFalling,
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
    this.enemies.forEach((enemy) => {
      this.physics.add.overlap(
        this.player,
        enemy,
        this.collideEnemy,
        null,
        this
      );
    });

    this.physics.add.collider(fallingCoins, platforms);
    this.physics.add.collider(bottomCoins, platforms);
    this.enemies.forEach((enemy) =>
      this.physics.add.collider(enemy, platforms)
    );
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

  collectFalling(player, fallingCoin) {
    this.sound.play(JEWEL_SOUND);
    fallingCoin.disableBody(true, true);
    this.scoreLabel.add(15);
  }

  collectBottom(player, bottomCoin) {
    this.sound.play(COIN_SOUND);
    bottomCoin.disableBody(true, true);
    this.scoreLabel.add(5);
  }

  createScoreLabel(x, y, score) {
    const label = new ScoreLabel(this, x, y, score, this.style);

    this.add.existing(label);

    return label;
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    platforms
      .create(460, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);
    platforms
      .create(1700, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);

    platforms
      .create(3200, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);

    platforms
      .create(3800, 568, GROUND_KEY, 1)
      .setScale(1)
      .refreshBody()
      .setScrollFactor(1);

    platforms.create(0, 150, 'platform');
    platforms.create(400, 260, 'platform');
    platforms.create(800, 400, 'platform');
    platforms.create(1200, 300, 'platform');
    platforms.create(1700, 400, 'platform');
    platforms.create(2400, 390, 'platform');
    platforms.create(2800, 280, 'platform');
    platforms.create(3200, 210, 'platform');

    return platforms;
  }

  createEnemy(x, y) {
    let enemy = this.physics.add
      .sprite(x, y, BUNNY_KEY)
      .setCollideWorldBounds(false);
    enemy.setBounce(1);
    enemy.setScrollFactor(1);
    enemy.startX = x;
    enemy.startY = y;

    this.anims.create({
      key: 'e_left',
      frames: this.anims.generateFrameNumbers(BUNNY_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'e_turn',
      frames: [{ key: BUNNY_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'e_right',
      frames: this.anims.generateFrameNumbers(BUNNY_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    enemy.setVelocityX(ENEMY_SPEED);
    enemy.anims.play('e_right', true);
    this.enemies.push(enemy);
  }

  collideEnemy(player, enemy) {
    this.sound.play(DAMAGE_SOUND);
    enemy.disableBody(false, false);
    player.setTint(0xff0000);
    setTimeout(() => {
      player.clearTint();
    }, 400);
    this.scoreLabel.add(-1);
  }

  update(time, delta) {
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
    const speed = 300;
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
    if (this.scoreLabel.score < 0) {
      this.gameOver = true;
      this.scene.start('gameover');
      this.gameOver = false;
    }
    if (this.player.y > 600) {
      this.gameOver = true;
      this.scene.start('gameover');
      this.gameOver = false;
    }

    if (this.player.x > 3733) {
      this.gameWin = true;
      this.scene.start('gamewin');
      this.gameWin = false;
    }

    // update enemies

    let rightCol = false;
    let leftCol = false;
    this.enemies.forEach((enemy) => {
      const x = enemy.x;
      const startX = enemy.startX;
      const w = 32 / 2;
      const pWidth = PLATFORM_W / 2;

      if (x + w >= startX + pWidth) {
        rightCol = true;
        enemy.setVelocityX(-ENEMY_SPEED);
        enemy.anims.play('e_left', true);
      } else if (x <= startX - pWidth) {
        leftCol = true;
        enemy.setVelocityX(ENEMY_SPEED);
        enemy.anims.play('e_right', true);
      }
    });

    this.debugLabel.setText(
      'X=' +
        Math.ceil(this.player.x) +
        ', Y=' +
        Math.ceil(this.player.y) +
        ', W=' +
        this.player.width +
        ' Screen Width=' +
        this.cameras.main.getBounds().width +
        '\nleftCol = ' +
        leftCol +
        '\nrightCol = ' +
        rightCol
    );
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
